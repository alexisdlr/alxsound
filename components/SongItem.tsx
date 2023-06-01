"use client";

import useImageLoad from "@/hooks/useImageLoad";
import { Song } from "@/types";
import Image from "next/image";
import PlayButton from "./PlayButton";

interface SongItemProps {
  data: Song;
  onClick: (id: string) => void;
}
const SongItem = ({ data, onClick }: SongItemProps) => {
  const imagePath = useImageLoad(data);
  return (
    <div
      onClick={() => onClick(data.id)}
      className="
        relative 
        group
        flex 
        flex-col
        items-center
        justify-center
        rounded-md
        overflow-hidden
        gap-x-4
        bg-neutral-400/5
        cursor-pointer
        transition
        p-3
        hover:bg-neutral-400/10
    "
    >
      <div
        className="
          relative 
          aspect-square 
          w-full
          h-full 
          rounded-md 
          overflow-hidden
        "
      >
        <Image
          className="object-cover"
          src={imagePath || "/images/music-placeholder.png"}
          fill
          alt="Image"
        />
      </div>
      <div className="flex flex-col items-start w-full p-3 gap-y-1">
        <p className="truncate w-full font-semibold">{data.title}</p>
        <p className="text-sm text-neutral-400 truncate w-full pb-4">
          By {data.author}
        </p>
      </div>
      <div className="absolute bottom-24 right-4">
        <PlayButton />
      </div>
    </div>
  );
};

export default SongItem;
