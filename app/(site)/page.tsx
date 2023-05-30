import Header from "@/components/Header";
import ListItem from "@/components/ListItem";

export default function Home() {
  return (
    <div
      className="
        bg-slate-900 
        h-full
        w-full
        overflow-hidden
        overflow-y-auto
        rounded-lg
      "
    >
      <Header>
        <div className="mb-4">
          <h1
            className="
              text-3xl
              font-semibold
            "
          >
            {" "}
            Welcome to AlxSound!
          </h1>
        </div>
        <div
          className="
            grid
            grid-cols-1
            sm:grid-cols-2
            xl:grid-cols-3
            2xl:grid-cols-4
            gap-3
            mt-4
          "
        >
          <ListItem image="/images/heart.png" name="Liked Songs" href="liked" />
        </div>
      </Header>
      <div className="mt-2 mb-7 px-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold">Newest Songs</h2>
        </div>
        <div>List of songs!</div>
      </div>
    </div>
  );
}
