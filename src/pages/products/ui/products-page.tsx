import { useEffect, useState } from "react";
import { client } from "../../../shared/api";
import { ProductCard } from "../../../shared/ui/product-card/product-card";
import type { IProduct } from "../../../shared/models";
import { ProductFilter, type TSortingOptions, type IFilterOptions } from "../../../features/product-filter";
import { Pagination } from "../../../features/pagination";

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
  const [productsMetaData, setProductsMetaData] = useState<IProductsMetadata>();
  const [page, setPage] = useState(1);
  const [filterOptions, setFilterOptions] = useState<IFilterOptions>();
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
        <div className="flex gap-2 items-center">
          <span className="text-sm text-[#3E424A]">Showing {productsMetaData && productsMetaData.from}-{productsMetaData && productsMetaData.to} of {productsMetaData?.total} results</span>
          <ProductFilter
            filterOptions={filterOptions}
            sortOption={sortOption}
            onFilterChange={(filters) => {
              setFilterOptions(filters);
              setPage(1);
            }}
            onSortChange={setSortOption}
            onPageReset={() => setPage(1)}
          />
        </div>
      </div>
      <div className="flex flex-wrap gap-[24px] mt-10">
        {products &&
          products.map((product: IProduct) => (
            <ProductCard key={product.id} {...product} />
          ))}
      </div>
      {productsMetaData && (
        <Pagination
          currentPage={page}
          totalPages={productsMetaData.last_page}
          onPageChange={setPage}
        />
      )}
    </>
  );
};
