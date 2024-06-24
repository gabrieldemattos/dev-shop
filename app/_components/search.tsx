"use client";

import { SearchCheck, SearchIcon } from "lucide-react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useState } from "react";

const Search = () => {
  const [search, setSearch] = useState<string>("");

  const router = useRouter();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!search) {
      return;
    }

    router.push(`/search/?q=${search}`);

    setSearch("");
  };

  return (
    <form
      className="relative flex w-full items-center rounded-full border-none"
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        placeholder="O que você está procurando?"
        className="w-full rounded-md border-none bg-background p-2 px-12 outline-none"
        onChange={handleChange}
        value={search}
      />

      <SearchCheck className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-opacity-80" />

      <Button size="icon" type="submit" className="absolute -right-1">
        <SearchIcon size={20} />
      </Button>
    </form>
  );
};

export default Search;
