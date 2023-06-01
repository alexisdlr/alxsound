import getSongsByTitle from "@/actions/getSongsByTitle";
import Header from "@/components/Header";
import SearchContent from "@/app/(site)/search/components/SearchContent";
import SearchInput from "@/components/SearchInput";

interface SearchProps {
  searchParams: {
    title: string;
  };
}

export const revalidate = 0;

const Search = async ({ searchParams }: SearchProps) => {
  const songs = await getSongsByTitle(searchParams.title);
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
      <Header className="from-slate-950">
        <div className="mb-2 flex flex-col gap-y-6">
          <h1 className="text-3xl font-semibold">Search</h1>
        </div>
        <SearchInput />
      </Header>
      <SearchContent songs={songs} />
    </div>
  );
};

export default Search;
