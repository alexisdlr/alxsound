"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

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
        <Image className="object-cover" fill src={image} alt="liked" />
      </div>
    </button>
  );
};

export default ListItem;
