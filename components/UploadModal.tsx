"use client";

import { useState } from "react";
import { useUser } from "@/hooks/useUser";
import { toast } from "react-hot-toast";
import { FieldValues, useForm, SubmitHandler } from "react-hook-form";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import uniqid from "uniqid";
import useUploadModal from "@/hooks/useUploadModal";
import Modal from "./Modal";
import Input from "./Input";
import Button from "./Button";
import { useRouter } from "next/navigation";

const UploadModal = () => {
  const router = useRouter();
  const UploadModal = useUploadModal();
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useUser();
  const supabaseClient = useSupabaseClient();

  const { register, handleSubmit, reset } = useForm<FieldValues>({
    defaultValues: {
      author: "",
      title: "",
      song: null,
      images: null,
    },
  });
  const onChange = (open: boolean) => {
    if (!open) {
      reset();
      UploadModal.onClose;
    }
  };

  const onSubmit: SubmitHandler<FieldValues> = async (values) => {
    try {
      setIsLoading(true);

      const image = values.image?.[0];
      const song = values.song?.[0];

      if (!image || !song || !user) {
        toast.error("Missing files");
        return;
      }
      const uniqueId = uniqid();

      const { data: songData, error: songError } = await supabaseClient.storage
        .from("songs")
        .upload(`song-${values.title}-${uniqueId}`, song, {
          upsert: false,
          cacheControl: "3600",
        });

      if (songError) {
        setIsLoading(false);
        return toast.error("Song upload failed");
      }

      const { data: imageData, error: imageError } =
        await supabaseClient.storage
          .from("images")
          .upload(`image-${values.title}-${uniqueId}`, image, {
            upsert: false,
            cacheControl: "3600",
          });

      if (imageError) {
        setIsLoading(false);
        return toast.error("Image upload failed");
      }

      const { error: supabaseError } = await supabaseClient
        .from("songs")
        .insert({
          user_id: user.id,
          title: values.title,
          author: values.author,
          image_path: imageData.path,
          song_path: songData.path,
        });

      if (supabaseError) {
        setIsLoading(false);
        return toast.error(supabaseError.message);
      }
      router.refresh();
      setIsLoading(false);
      toast.success("Song uploaded");
      reset();
      UploadModal.onClose();
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal
      title="Add a Song"
      description="Upload an mp3 file"
      isOpen={UploadModal.isOpen}
      onChange={onChange}
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-y-4 mt-2"
      >
        <Input
          id="title"
          disabled={isLoading}
          {...register("title", { required: true })}
          placeholder="Song title"
        />
        <Input
          id="author"
          disabled={isLoading}
          {...register("author", { required: true })}
          placeholder="Author title"
        />
        <div>
          <span className="pb-1">Select a song file</span>
          <Input
            id="song"
            disabled={isLoading}
            type="file"
            accept=".mp3"
            {...register("song", { required: true })}
          />
        </div>
        <div>
          <span className="pb-1">Select an Image</span>
          <Input
            id="image"
            disabled={isLoading}
            type="file"
            accept="image/*"
            {...register("image", { required: true })}
          />
        </div>
        <Button type="submit" disabled={isLoading} className="text-black">
          Create
        </Button>
      </form>
    </Modal>
  );
};

export default UploadModal;
