import type { IProduct } from "../../../shared/models";
import { useLoaderData } from "react-router";
import { ProductsHeader } from "./products-header";
import { ProductCards } from "./product-cards";
import { ProductsPagination } from "./products-pagination";
import type { IProductsMetadata } from "../models/model";



export const ProductsPage = () => {
  const { products, productsMetaData } = useLoaderData() as { products: IProduct[], productsMetaData: IProductsMetadata };

  return (
    <>
      <ProductsHeader productsMetaData={productsMetaData} />
      <ProductCards products={products} />
      <ProductsPagination productsMetaData={productsMetaData} />
    </>
  );
};
