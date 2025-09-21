import { memo } from "react";
import type { IProductsMetadata } from "../models/model";
import { ProductFilter } from "../../../features/product-filter";

export const ProductsHeader = memo(({ productsMetaData }: { productsMetaData: IProductsMetadata }) => {
  const from = productsMetaData?.from ?? 0;
  const to = productsMetaData?.to ?? 0;
  const total = productsMetaData?.total ?? 0;

  return (
    <div className="flex justify-between items-center">
      <h1 className="font-semibold font-poppins text-[#10151F] text-[42px]">
        Products Page
      </h1>
      <div className="flex gap-2 items-center">
        <span className="text-sm text-[#3E424A]">
          Showing {from}-{to} of {total} results
        </span>
        <ProductFilter />
      </div>
    </div>
  );
});
