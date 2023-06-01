import getLikedSongs from "@/actions/getLikedSongs";
import Header from "@/components/Header";
import Image from "next/image";
import LikedContent from "./components/LikedContent";

export const revalidate = 0;

const page = async () => {
  const songs = await getLikedSongs();

  return (
    <div
      className="
    bg-slate-900 
      rounded-lg
      h-full
      w-full
      overflow-hidden
      overflow-y-auto
    "
    >
      <Header>
        <div className="mt-20">
          <div className="flex flex-col md:flex-row items-center gap-x-5">
            <div className="relative h-32 w-32 lg:w-44 lg:h-44">
              <Image
                fill
                src="/images/heart.png"
                alt="playlist"
                className="object-cover"
              />
            </div>
            <div className="flex flex-col gap-y-2 mt-4 md:mt-0">
              <p className="text-sm text-white hidden md:block font-semibold">
                Playlist
              </p>
              <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold">
                Liked songs
              </h1>
            </div>
          </div>
        </div>
      </Header>
      <LikedContent songs={songs} />
    </div>
  );
};

export default page;
