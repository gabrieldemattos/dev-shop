import { SearchCheck } from "lucide-react";

const Search = () => {
  return (
    <form className="relative w-full rounded-full border-none bg-background">
      <input
        type="text"
        placeholder="O que você está procurando?"
        className="w-full rounded-full border-none bg-background p-4 pl-12 outline-none"
      />

      <SearchCheck className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-opacity-80" />
    </form>
  );
};

export default Search;
