import { useState, useCallback, useMemo } from "react";
import { useSearchParams } from "react-router";
import { Button } from "../../../shared/ui";

import filterIcon from "../../../assets/icons/filter_icon.svg"

export type TSortingOptions = "price" | "-price" | "created_at" | "-created_at";

export interface IFilterOptions {
  price_from?: number;
  price_to?: number;
}

interface IProductFilterProps {
  resultsCount?: {
    from: number;
    to: number;
    total: number;
  };
}

export const ProductFilter = ({
  resultsCount,
}: IProductFilterProps) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isOpen, setIsOpen] = useState(false);

  const sortOption = (searchParams.get("sort") as TSortingOptions) || undefined;
  const priceFrom = searchParams.get("price_from") || "";
  const priceTo = searchParams.get("price_to") || "";

  const [localPriceFrom, setLocalPriceFrom] = useState<string>(priceFrom);
  const [localPriceTo, setLocalPriceTo] = useState<string>(priceTo);

  const handleFilterToggle = useCallback(() => {
    setIsOpen(prev => !prev);
  }, []);

  const handleApplyFilters = useCallback(() => {
    const priceFromNum = localPriceFrom === "" ? undefined : Number(localPriceFrom);
    const priceToNum = localPriceTo === "" ? undefined : Number(localPriceTo);

    if ((priceFromNum !== undefined && priceToNum === undefined) ||
      (priceFromNum === undefined && priceToNum !== undefined)) {
      return;
    }

    const newParams: { [key: string]: string } = {};
    searchParams.forEach((value, key) => {
      if (key !== 'price_from' && key !== 'price_to' && key !== 'page') {
        newParams[key] = value;
      }
    });
    if (priceFromNum !== undefined && priceToNum !== undefined) {
      newParams.price_from = priceFromNum.toString();
      newParams.price_to = priceToNum.toString();
    }
    setSearchParams(newParams);
    setIsOpen(false);
  }, [localPriceFrom, localPriceTo, searchParams, setSearchParams]);

  const handleSortChange = useCallback((value: string) => {
    const newParams: { [key: string]: string } = {};
    searchParams.forEach((paramValue, key) => {
      if (key !== 'sort' && key !== 'page') {
        newParams[key] = paramValue;
      }
    });
    newParams.sort = value;
    setSearchParams(newParams);
  }, [searchParams, setSearchParams]);

  const resultsText = useMemo(() => {
    if (!resultsCount) return "";
    return `Showing ${resultsCount.from}-${resultsCount.to} of ${resultsCount.total} results`;
  }, [resultsCount]);

  return (
    <div className="flex gap-2 items-center">
      <span className="text-sm text-[#3E424A]">{resultsText}</span>
      <div className="bg-[#E1DFE1] mx-3 min-h-[20px] w-[1px]" />

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
                value={localPriceFrom}
                placeholder="*from"
                onChange={(e) => setLocalPriceFrom(e.target.value)}
              />
              <label htmlFor="price_to"></label>
              <input
                type="number"
                title="price_to"
                id="price_to"
                className="rounded-lg border-1 border-[#E1DFE1] px-3 py-2.5"
                placeholder="*to"
                value={localPriceTo}
                onChange={(e) => setLocalPriceTo(e.target.value)}
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

      <div>
        <select
          title="sort"
          name="sort"
          className="h-10 w-30 rounded-[8px] border border-[#E1DFE1] px-3 bg-white"
          value={sortOption || ""}
          onChange={(e) => handleSortChange(e.target.value)}
        >
          <option value="" disabled>Sort By</option>
          <option value="created_at">New products first</option>
          <option value="price">Price, low to high</option>
          <option value="-price">Price, high to low</option>
        </select>
      </div>
    </div>
  );
};