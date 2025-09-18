import { useEffect, useState } from "react";
import { client } from "../../../shared/api";
import { ProductCard } from "../../../shared/ui/product-card/product-card";
import type { IProduct } from "../../../shared/models";
import { Button } from "../../../shared/ui";

import arrowLeft from "../../../assets/icons/arrow_left.svg";
import arrowRight from "../../../assets/icons/arrow_right.svg";

type TSortingOptions = "price" | "-price" | "created_at" | "-created_at";

interface IProductsMetadata {
  current_page: number;
  last_page: number;
  from: number;
  to: number;
  total: number;
  per_page: number;
}

export const ProductsPage = () => {
  const [products, setProducts] = useState<IProduct[] | null>(null);
  const [productsMetaData, setProductsMetaData] = useState<IProductsMetadata>()
  const [page, setPage] = useState(1);
  const [filterOptions, setFilterOptions] = useState<{
    price_from: number;
    price_to: number;
  }>();
  // TODO: move filters in separate component
  // and make it controlled component
  // to avoid tempFilterOptions state
  const [tempFilterOptions, setTempFilterOptions] = useState<{
    price_from: number | string;
    price_to: number | string;
  }>({
    price_from: "",
    price_to: "",
  });
  const [filterOpen, setFilterOpen] = useState(false);
  const [sortOption, setSortOption] = useState<TSortingOptions>();

  useEffect(() => {
    (async () => {
      const response = await client.get("/products", {
        params: {
          page: page,
          sort: sortOption ? sortOption : undefined,
          filter: {
            price_from: filterOptions?.price_from,
            price_to: filterOptions?.price_to,
          },
        },
      });
      console.log("Response with meta data", response);
      setProductsMetaData(response.data.meta)
      setProducts(response.data.data);
    })();
  }, [filterOptions, page, sortOption]);

  return (
    <>
      <div className="flex justify-between items-center">
        <h1 className="font-semibold font-poppins text-[#10151F] text-[42px]">
          Products Page
        </h1>
        <span>Showing {productsMetaData && (productsMetaData?.current_page - 1) * productsMetaData?.per_page}-{productsMetaData && (productsMetaData?.current_page - 1) * productsMetaData?.per_page + productsMetaData.per_page} of {productsMetaData?.total} results</span>
        <div className="flex gap-2 items-center">
          <div className="relative">
            <button onClick={() => setFilterOpen((prev) => !prev)}>Filter</button>
            <div>
              {filterOpen && (
                <div className="absolute z-10 -translate-x-[90%] border-1 border-[#E1DFE1] bg-white rounded-lg p-5 flex flex-col gap-5">
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
                      value={tempFilterOptions.price_from}
                      placeholder="*from"
                      onChange={(e) => {
                        setPage(1)
                        setTempFilterOptions((prev) => ({
                          ...prev,
                          price_from: e.target.value,
                        }))
                      }
                      }
                    />
                    <label htmlFor="price_to"></label>
                    <input
                      type="number"
                      title="price_to"
                      id="price_to"
                      className="rounded-lg border-1 border-[#E1DFE1] px-3 py-2.5"
                      placeholder="*to"
                      value={tempFilterOptions.price_to}
                      onChange={(e) => {
                        setPage(1)
                        setTempFilterOptions((prev) => ({
                          ...prev,
                          price_to: e.target.value,
                        }))
                      }
                      }
                    />
                  </div>
                  <Button
                    size="small"
                    className="w-fit"
                    onClick={() => {
                      const priceFrom =
                        tempFilterOptions.price_from === ""
                          ? undefined
                          : Number(tempFilterOptions.price_from);
                      const priceTo =
                        tempFilterOptions.price_to === ""
                          ? undefined
                          : Number(tempFilterOptions.price_to);

                      if (priceFrom !== undefined || priceTo !== undefined) {
                        setFilterOptions({
                          price_from: priceFrom || 0,
                          price_to: priceTo || Infinity,
                        });
                      } else {
                        setFilterOptions(undefined);
                      }

                      setFilterOpen(false);
                    }}
                  >
                    Apply
                  </Button>
                </div>
              )}
            </div>
          </div>
          <div>
            <select
              title="sort"
              name="sort"
              className="h-10 w-30 rounded-[8px] border border-[#E1DFE1] px-3 bg-white"
              onChange={(e) =>
                setSortOption(e.target.value as TSortingOptions | undefined)
              }
            >

              <option value="created_at">New products first</option>
              <option value="price">Price, low to high</option>
              <option value="-price">Price, high to low</option>
            </select>
          </div>
        </div>
      </div>
      <div className="flex flex-wrap gap-[24px] mt-10">
        {products &&
          products.map((product: IProduct) => (
            <ProductCard key={product.id} {...product} />
          ))}
      </div>
      <div className="mx-auto w-fit mt-10 flex items-center gap-2">
        <button onClick={() => setPage((prev) => Math.max(prev - 1, 1))}>
          <img src={arrowLeft} alt="Previous" className="w-4 h-4" />
        </button>
        {(() => {
          const totalPages = productsMetaData?.last_page;
          if (!totalPages) return;
          const current = page;
          const numbers = new Set<number>();

          if (totalPages <= 4) {
            for (let i = 1; i <= totalPages; i++) numbers.add(i);
          } else {
            numbers.add(1);
            numbers.add(totalPages);
            numbers.add(current);
            if (numbers.size < 4 && current - 1 >= 2) numbers.add(current - 1);
            if (numbers.size < 4 && current + 1 <= totalPages - 1) numbers.add(current + 1);
            if (numbers.size < 4 && !numbers.has(2) && totalPages > 4) numbers.add(2);
            if (numbers.size < 4 && !numbers.has(totalPages - 1) && totalPages > 4) numbers.add(totalPages - 1);
          }

          const sorted = Array.from(numbers).sort((a, b) => a - b);
          const items: (number | string)[] = [];
          for (let i = 0; i < sorted.length; i++) {
            if (i > 0 && sorted[i] - sorted[i - 1] > 1) items.push("...");
            items.push(sorted[i]);
          }

          return items.map((itm, idx) =>
            typeof itm === "number" ? (
              <button
                key={itm}
                className={`px-4 py-2 ${itm === page ? "border-1 border-[#FF4000] rounded-[4px]" : ""
                  }`}
                onClick={() => setPage(itm)}
              >
                {itm}
              </button>
            ) : (
              <span key={`ellipsis-${idx}`} className="px-2">
                {itm}
              </span>
            )
          );
        })()}
        <button onClick={() => setPage((prev) => Math.min(prev + 1, 10))}>
          <img src={arrowRight} alt="Next" className="w-4 h-4" />
        </button>
      </div>
    </>
  );
};
