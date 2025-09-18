import { useEffect, useState } from "react";
import { client } from "../../../shared/api";
import { ProductCard } from "../../../shared/ui/product-card/product-card";
import type { IProduct } from "../../../shared/models";

export const ProductsPage = () => {
  const [products, setProducts] = useState<IProduct[] | null>(null);
  const [page, setPage] = useState(1);
  const [filterOptions, setFilterOptions] = useState<{
    price_from: number;
    price_to: number;
  }>();
  const [filterOpen, setFilterOpen] = useState(false);
  const [sortOption, setSortOption] = useState<"price" | undefined>();

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
      console.log(response);
      setProducts(response.data.data);
    })();
  }, [filterOptions, page, sortOption]);

  return (
    <>
      <div className="flex justify-between items-center">
        <h1 className="font-semibold font-poppins text-[#10151F] text-[42px]">
          Products Page
        </h1>
        <div className="relative">
          <button onClick={() => setFilterOpen((prev) => !prev)}>Filter</button>
          <div>
            {filterOpen && (
              <div className="absolute left-0">
                <label htmlFor="price_from"></label>
                <input
                  id="price_from"
                  title="price_from"
                  type="number"
                  className="rounded-lg border-1 border-[#E1DFE1] px-3 py-2.5"
                  value={filterOptions?.price_from}
                  placeholder="*from"
                  onChange={(e) =>
                    setFilterOptions((prev) => {
                      if (!prev) {
                        return {
                          price_from: Number(e.target.value),
                          price_to: Infinity,
                        };
                      }
                      return {
                        ...prev,
                        price_from: Number(e.target.value),
                      };
                    })
                  }
                />
                <label htmlFor="price_to"></label>
                <input
                  type="number"
                  title="price_to"
                  id="price_to"
                  className="rounded-lg border-1 border-[#E1DFE1] px-3 py-2.5"
                  placeholder="*to"
                  value={filterOptions?.price_to}
                  onChange={(e) =>
                    setFilterOptions((prev) => {
                      if (!prev) {
                        return {
                          price_from: 0,
                          price_to: Number(e.target.value),
                        };
                      }
                      return {
                        ...prev,
                        price_to: Number(e.target.value),
                      };
                    })
                  }
                />
                <button onClick={() => setFilterOpen(false)}>Apply</button>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="flex flex-wrap gap-10 mt-10">
        {products &&
          products.map((product: any) => (
            <ProductCard key={product.id} {...product} />
          ))}
      </div>
      <div className="mx-auto w-fit mt-10">
        <button onClick={() => setPage((prev) => Math.max(prev - 1, 1))}>
          prev
        </button>
        {[1, 2, 3, 4, 5].map((pg) => (
          <button
            key={pg}
            className={`px-4 py-2 border ${
              pg === page ? "bg-black text-white" : ""
            }`}
            onClick={() => setPage(pg)}
          >
            {pg}
          </button>
        ))}
        <button onClick={() => setPage((prev) => Math.min(prev + 1, 10))}>
          Next
        </button>
      </div>
    </>
  );
};
