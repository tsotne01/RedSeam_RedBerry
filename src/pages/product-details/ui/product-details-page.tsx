import { useState } from "react";
import { useLoaderData } from "react-router";
import type { IProduct } from "../../../shared/models";
import { ProductImages } from "../../../widgets/product-images";
import { ProductDetails } from "./product-details";

export const ProductDetailsPage = () => {
  const { product } = useLoaderData<{ product: IProduct }>();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  if (!product) {
    return <div>...loading</div>;
  }

  return (
    <div className="flex gap-[168px]">
      <div className="flex gap-2">
        <ProductImages
          product={product}
          onPhotoChange={setCurrentImageIndex}
          imageIndex={currentImageIndex}
        />
      </div>
      <ProductDetails
        product={product}
        currentImageIndex={currentImageIndex}
        onPhotoChange={setCurrentImageIndex}
      />
    </div>
  );
};

