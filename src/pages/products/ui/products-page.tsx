import { useState } from "react";
import { ProductCard } from "../../../shared/ui/product-card/product-card";
import type { IProduct } from "../../../shared/models";
import { ProductFilter, type TSortingOptions, type IFilterOptions } from "../../../features/product-filter";
import { Pagination } from "../../../features/pagination";
import { useLoaderData } from "react-router";

interface IProductsMetadata {
  current_page: number;
  last_page: number;
  from: number;
  to: number;
  total: number;
  per_page: number;
}

export const ProductsPage = () => {

  const { products, productsMetaData } = useLoaderData() as { products: IProduct[], productsMetaData: IProductsMetadata };
  const [page, setPage] = useState(1);
  const [filterOptions, setFilterOptions] = useState<IFilterOptions>();
  const [sortOption, setSortOption] = useState<TSortingOptions>();

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
          products?.map((product: IProduct) => (
            <ProductCard key={product.id} {...product} />
          ))}
      </div>
      {productsMetaData && (
        <Pagination
          currentPage={page}
          totalPages={productsMetaData?.last_page}
          onPageChange={setPage}
        />
      )}
    </>
  );
};
