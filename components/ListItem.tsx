"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { FaPlay } from "react-icons/fa";
interface ListItemPros {
  image: string;
  name: string;
  href: string;
}
const ListItem = ({ image, href, name }: ListItemPros) => {
  const router = useRouter();

  const onClick = () => {
    router.push(href);
  };
  return (
    <button
      onClick={onClick}
      className="
        relative
        group
        flex
        items-center
        rounded-md
        overflow-hidden
        gap-x-4
        bg-neutral-100/10
        hover:bg-neutral-100/20
        transition
        pr-4
      "
    >
      <div
        className="
          relative
          min-h-[64px]
          min-w-[64px]
        "
      >
        <Image fill src={image} alt="liked" />
      </div>
      <p className="truncate font-medium py-5">{name}</p>
      <div
        className="
          absolute
          transition
          opacity-0
          flex
          items-center 
          justify-center 
          rounded-full 
          bg-sky-500 
          p-4
          drop-shadow-md
          right-5
          group-hover:opacity-100
          hover:scale-110
        "
      >
        <FaPlay className="text-black" />
      </div>
    </button>
  );
};

export default ListItem;
