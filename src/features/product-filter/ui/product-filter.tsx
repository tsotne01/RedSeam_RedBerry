import { useState, useCallback, useMemo } from "react";
import { Button } from "../../../shared/ui";

import filterIcon from "../../../assets/icons/filter_icon.svg"

export type TSortingOptions = "price" | "-price" | "created_at" | "-created_at";

export interface IFilterOptions {
  price_from?: number;
  price_to?: number;
}

interface IProductFilterProps {
  filterOptions?: IFilterOptions;
  sortOption?: TSortingOptions;
  onFilterChange: (filters: IFilterOptions | undefined) => void;
  onSortChange: (sort: TSortingOptions | undefined) => void;
  onPageReset: () => void;
  resultsCount?: {
    from: number;
    to: number;
    total: number;
  };
}

export const ProductFilter = ({
  sortOption,
  onFilterChange,
  onSortChange,
  onPageReset,
  resultsCount,
}: IProductFilterProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [priceFrom, setPriceFrom] = useState<string>("");
  const [priceTo, setPriceTo] = useState<string>("");

  // Memoized handlers to prevent unnecessary re-renders
  const handleFilterToggle = useCallback(() => {
    setIsOpen(prev => !prev);
  }, []);

  const handleApplyFilters = useCallback(() => {
    const priceFromNum = priceFrom === "" ? undefined : Number(priceFrom);
    const priceToNum = priceTo === "" ? undefined : Number(priceTo);

    // Prevent setting only one filter - both from and to must be provided or both empty
    if ((priceFromNum !== undefined && priceToNum === undefined) ||
      (priceFromNum === undefined && priceToNum !== undefined)) {
      return;
    }

    if (priceFromNum !== undefined && priceToNum !== undefined) {
      const newFilters: IFilterOptions = {
        price_from: priceFromNum,
        price_to: priceToNum,
      };
      onFilterChange(newFilters);
    } else {
      onFilterChange(undefined);
    }

    setIsOpen(false);
    onPageReset();
  }, [priceFrom, priceTo, onFilterChange, onPageReset]);

  const handleSortChange = useCallback((value: string) => {
    const sortValue = value as TSortingOptions;
    onSortChange(sortValue);
    onPageReset();
  }, [onSortChange, onPageReset]);

  const resultsText = useMemo(() => {
    if (!resultsCount) return "";
    return `Showing ${resultsCount.from}-${resultsCount.to} of ${resultsCount.total} results`;
  }, [resultsCount]);

  return (
    <div className="flex gap-2 items-center">
      <span className="text-sm text-[#3E424A]">{resultsText}</span>
      <div className="bg-[#E1DFE1] mx-3 min-h-[20px] w-[1px]" />

      {/* Filter Dropdown */}
      <div className="relative">
        <button className="cursor-pointer flex gap-4 font-poppins text-base text-[#10151F]" onClick={handleFilterToggle}>
          <img src={filterIcon} alt="filter" />
          <span>Filter</span>
        </button>
        {isOpen && (
          <div className="absolute z-10 -translate-x-[95%] border-1 border-[#E1DFE1] bg-white rounded-lg p-5 flex flex-col gap-5">
            <h2 className="font-poppins font-semibold text-base">
              Select price
            </h2>
            <div className="flex gap-2.5">
              <label htmlFor="price_from"></label>
              <input
                id="price_from"
                title="price_from"
                type="number"
                className="rounded-lg border-1 border-[#E1DFE1] px-3 py-2.5"
                value={priceFrom}
                placeholder="*from"
                onChange={(e) => setPriceFrom(e.target.value)}
              />
              <label htmlFor="price_to"></label>
              <input
                type="number"
                title="price_to"
                id="price_to"
                className="rounded-lg border-1 border-[#E1DFE1] px-3 py-2.5"
                placeholder="*to"
                value={priceTo}
                onChange={(e) => setPriceTo(e.target.value)}
              />
            </div>
            <Button
              size="small"
              className="w-[124px]"
              onClick={handleApplyFilters}
            >
              Apply
            </Button>
          </div>
        )}
      </div>

      {/* Sort Dropdown */}
      <div>
        <select
          title="sort"
          name="sort"
          className="h-10 w-30 rounded-[8px] border border-[#E1DFE1] px-3 bg-white"
          value={sortOption || "created_at"}
          onChange={(e) => handleSortChange(e.target.value)}
        >
          <option value="created_at">New products first</option>
          <option value="price">Price, low to high</option>
          <option value="-price">Price, high to low</option>
        </select>
      </div>
    </div>
  );
};