import { useEffect, useState } from "react";
import { useNavigate, useLoaderData } from "react-router";
import type { IProduct } from "../../../shared/models";
import { Button } from "../../../shared/ui";
import toast from "react-hot-toast";

import cartIcon from "../../../assets/icons/cart_icon.svg"
import { useAuth } from "../../../shared/hooks/use-auth";
import { paths } from "../../../shared/constants";
import { useCart } from "../../../features/cart/hooks/use-cart";
import { ProductImages } from "../../../widgets/product-images";

export const ProductDetailsPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { product } = useLoaderData<{ product: IProduct }>();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [currentColor, setCurrentColor] = useState<string | null>(null);
  const [currentSize, setCurrentSize] = useState<string | null>(null);
  const [quantity, setQuantity] = useState<number>(1);
  const { addToCart } = useCart()

  useEffect(() => {
    if (!product) return;
    if (!currentColor && product.available_colors && product.available_colors.length > 0) {
      setCurrentColor(product.available_colors[0]);
      setCurrentImageIndex(0);
    }
    const defaultSizes = product.available_sizes && product.available_sizes.length > 0 ? product.available_sizes : ["XS", "S", "M", "L", "XL"];
    if (!currentSize && defaultSizes.length > 0) {
      setCurrentSize(defaultSizes[0]);
    }
  }, [product, currentColor, currentSize]);
  if (!product) {
    return <div>...loading</div>
  }
  if (!product) {
    return <div>No Products Found...</div>;
  }


  const addItemToCart = () => {
    // Check if user is authenticated
    if (!isAuthenticated) {
      toast.error("Please sign in to add items to your cart");
      navigate(paths.signIn);
      return;
    }

    if (!currentColor || !currentSize) {
      toast.error("Please select color and size");
      return;
    }

    addToCart({
      id: product!.id,
      name: product!.name,
      price: product!.price,
      selectedColor: currentColor,
      selectedSize: currentSize,
      selectedImage: product!.images[currentImageIndex],
      quantity: quantity,
    });
  };
  const fallbackSizes = ["XS", "S", "M", "L", "XL"];
  const sizes = product.available_sizes && product.available_sizes.length > 0 ? product.available_sizes : fallbackSizes;

  return (
    <div className="flex gap-[168px]">
      <div className="flex gap-2">
        <ProductImages product={product} onPhotoChange={setCurrentImageIndex} imageIndex={currentImageIndex} />
      </div>
      <div className="w-1/2">
        <div className="mb-14">
          <h1 className="font-poppins font-semibold text-[32px] text-[#10151F] mb-6">
            {product.name}
          </h1>
          <p className="text-[32px] text-[#10151F] font-semibold font-poppins">
            ${product.price}
          </p>
        </div>
        <div className="mb-12">
          <span className="font-poppins text-[#10151F] text-base font-normal inline-block mb-4">
            Color: {currentColor ? currentColor : "Select a color"}
          </span>
          <div className="flex gap-2">
            {product.available_colors &&
              product.available_colors.map((color, index) => (
                <button
                  type="button"
                  key={color}
                  className={`w-[38px] h-[38px] border border-gray-300 rounded-full inline-block ${currentColor === color
                    ? "ring-2 ring-offset-4 ring-[#E1DFE1]"
                    : ""
                    }`}
                  style={{ backgroundColor: color }}
                  onClick={() => {
                    setCurrentColor(color)
                    setCurrentImageIndex(index)
                  }}
                  aria-label={color}
                ></button>
              ))}
          </div>
        </div>
        <div className="mb-12">
          <span className="font-poppins text-[#10151F] text-base font-normal inline-block mb-4">
            Size: {currentSize ?? "Select a size"}
          </span>
          <div className="flex flex-wrap gap-[10px]">
            {sizes.map((size) => (
              <button
                type="button"
                key={size}
                className={`w-[70px] h-[42px] rounded-[10px] border-1 border-[#E1DFE1] px-4 py-[9px] text-sm font-medium ${currentSize === size ? "border-[#FF4000] text-[#10151F]" : "text-[#3E424A]"
                  }`}
                onClick={() => setCurrentSize(size)}
                aria-label={size}
              >{size.toUpperCase()}</button>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-3.5 mb-12">
          <span className="inline-block mb-4 font-poppins font-normal">
            Quantity
          </span>
          <select
            className="w-[70px] px-[15px] py-[9px] border-1 border-[#E1DFE1] rounded-[10px]"
            title="quantity"
            name="quantity"
            id="quantity"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
          >
            {Array.from({ length: Math.max(1, product.quantity || 5) }).map((_, index) => {
              const val = index + 1;
              return (
                <option key={val} value={val}>
                  {val}
                </option>
              );
            })}
          </select>
        </div>
        <Button onClick={addItemToCart} disabled={!currentColor || !currentSize} variant="primary" size="large" className="mb-12 w-full" icon={<img src={cartIcon} alt="cart" />}>
          Add to Cart
        </Button>
        <hr className="my-14 border-gray-300" />
        <div className="flex items-center justify-between mb-6">
          <span className="font-poppins block font-normal text-[#10151F] text-lg">Details</span>
          <img src={product?.brand?.image} alt={product?.brand?.name || "brand"} width={38} height={38} />
        </div>
        <span className="text-[#3E424A] mb-5 block">Brand: {product?.brand?.name || "No brand"}</span>
        <p className="text-[#3E424A]">{product.description || "No description"}</p>
      </div>
    </div>
  );
};
