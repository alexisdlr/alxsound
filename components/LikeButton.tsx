"use client";

import { useSessionContext } from "@supabase/auth-helpers-react";
import useAuthModal from "@/hooks/useAuthModal";
import { useRouter } from "next/navigation";

import { RxHeart } from "react-icons/rx";
import { useUser } from "@/hooks/useUser";
import { useEffect, useState } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { toast } from "react-hot-toast";
interface LikeButtonProps {
  songId: string;
}

const LikeButton = ({ songId }: LikeButtonProps) => {
  const router = useRouter();
  const { supabaseClient } = useSessionContext();

  const authModal = useAuthModal();
  const { user } = useUser();

  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    if (!user?.id) {
      return;
    }

    const fetchData = async () => {
      const { data, error } = await supabaseClient
        .from("liked_songs")
        .select("*")
        .eq("user_id", user.id)
        .eq("songs_id", songId)
        .single();

      if (!error && data) {
        setIsLiked(true);
      }
    };
    fetchData();
  }, [user, supabaseClient, songId]);

  const Icon = isLiked ? AiFillHeart : AiOutlineHeart;

  const handleLike = async () => {
    if (!user) {
      return authModal.onOpen();
    }

    if (isLiked) {
      const { error } = await supabaseClient
        .from("liked_songs")
        .delete()
        .eq("user_id", user.id)
        .eq("song_id", songId);

      if (error) {
        toast.error(error.message);
      } else {
        toast.success("Disliked!");
        setIsLiked(false);
        return;
      }
    }
    const { error } = await supabaseClient.from("liked_songs").insert({
      song_id: songId,
      user_id: user.id,
    });

    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Liked!");
      setIsLiked(true);
    }

    router.refresh();
  };
  return (
    <button onClick={handleLike}>
      <Icon
        className={`
          hover:opacity-75
          transition
          ${isLiked ? "text-sky-500" : "text-white"}
        `}
        size={27}
      />
    </button>
  );
};

export default LikeButton;
