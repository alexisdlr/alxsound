"use client";
import { TbPlaylist } from "react-icons/tb";
import { AiOutlinePlus } from "react-icons/ai";
import useAuthModal from "@/hooks/useAuthModal";
import { useUser } from "@/hooks/useUser";
import useUploadModal from "@/hooks/useUploadModal";
import { Song } from "@/types";
import MediaItem from "./MediaItem";

interface LibraryProps {
  songs: Song[];
}

const Library = ({ songs }: LibraryProps) => {
  const authModal = useAuthModal();
  const uploadModal = useUploadModal();
  const { user } = useUser();
  const onClick = () => {
    if (!user) {
      return authModal.onOpen();
    }

    return uploadModal.onOpen();
  };
  return (
    <div
      className="
      flex
      flex-col
    "
    >
      <div
        className="
        flex
        items-center
        justify-between
        px-5
        py-4
      "
      >
        <div className="inline-flex items-center gap-x-2">
          <TbPlaylist className="text-neutral-400" size={26} />
          <p className="text-neutral-400 font-medium text-md">Your library</p>
        </div>
        <AiOutlinePlus
          onClick={onClick}
          className="text-neutral-400 cursor-pointer hover:text-white transition"
          size={26}
        />
      </div>
      <div
        className="
          flex
          flex-col
          gap-y-2
          mt-4
          px-3
        "
      >
        {songs.map((item) => (
          <MediaItem key={item.id} data={item} onClick={onClick} />
        ))}
      </div>
    </div>
  );
};

export default Library;
