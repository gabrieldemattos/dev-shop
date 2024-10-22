import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/app/_components/ui/sheet";
import { Button } from "@/app/_components/ui/button";
import { Separator } from "@/app/_components/ui/separator";
import { useState } from "react";
import { ArrowDownUp } from "lucide-react";
import { FILTERS } from "../_constants/filters";

interface FilterComponentProps {
  selectedFilter: string;
  onFilterChange: (filter: string) => void;
  onClearFilters: () => void;
}

const Filters = ({
  selectedFilter,
  onFilterChange,
  onClearFilters,
}: FilterComponentProps) => {
  const [openFilter, setOpenFilter] = useState<boolean>(false);

  const handleFilterClick = (filter: string) => {
    onFilterChange(filter);
    setOpenFilter(false);
  };

  const handleClearFilters = () => {
    onClearFilters();
    setOpenFilter(false);
  };

  return (
    <div className="w-flex flex items-center gap-3 md:w-fit">
      <span className="hidden md:flex">Ordenar por</span>
      <Sheet open={openFilter} onOpenChange={setOpenFilter}>
        <SheetTrigger asChild>
          <Button
            variant="outline"
            className="w-full justify-between border-black bg-transparent font-bold hover:bg-transparent md:w-fit md:gap-5"
          >
            {selectedFilter === "empty" ? "Sem Filtro" : selectedFilter}
            <ArrowDownUp size={18} />
          </Button>
        </SheetTrigger>
        <SheetContent className="w-[80vw] bg-[#f3f3f3]" side="right">
          <SheetHeader>
            <SheetTitle className="text-left">Ordenar</SheetTitle>
            <SheetDescription />
          </SheetHeader>
          <Separator />

          <div className="mt-4 flex flex-col gap-3">
            {FILTERS.map((filter) => (
              <label
                key={filter}
                className="flex w-fit cursor-pointer items-center"
              >
                <input
                  type="radio"
                  name="filter"
                  className="h-5 w-5"
                  readOnly
                  checked={selectedFilter === filter}
                  onClick={() => handleFilterClick(filter)}
                />
                <span className="ml-2 text-base capitalize">{filter}</span>
              </label>
            ))}

            <Button
              className="mt-4 uppercase md:w-fit"
              onClick={handleClearFilters}
            >
              Limpar Filtro
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default Filters;
