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
            Welcome back
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
          <ListItem image="/images/liked.png" />
        </div>
      </Header>
    </div>
  );
}
