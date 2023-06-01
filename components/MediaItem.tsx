"use client";

import useImageLoad from "@/hooks/useImageLoad";
import { Song } from "@/types";
import Image from "next/image";

interface MediaItemProps {
  data: Song;
  onClick?: (id: string) => void;
}
const MediaItem = ({ data, onClick }: MediaItemProps) => {
  const imageUrl = useImageLoad(data);

  const handleClick = () => {
    if (onClick) {
      return onClick(data.id);
    }
  };
  return (
    <div
      className="
        flex
        items-center
        gap-x-3
        cursor-pointer
        transition
        hover:bg-slate-800/50
        w-full
        p-2
        rounded-md
      "
    >
      <div
        className="
          relative
          rounded-md
          min-h-[48px]
          min-w-[48px]
          overflow-hidden

        "
      >
        <Image
          fill
          src={imageUrl || "/images/liked.png"}
          alt="image song"
          className="object-cover"
        />
      </div>
      <div
        className="
          flex
          flex-col
          gap-y-1
          overflow-hidden
        "
      >
        <p className="text-white truncate">{data.title}</p>
        <p className="text-neutra-400 text-sm truncate">{data.author}</p>
      </div>
    </div>
  );
};

export default MediaItem;
