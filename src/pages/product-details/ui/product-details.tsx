import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router";
import type { IProductDetailsProps } from "../models/model";
import { useAuth } from "../../../shared/hooks/use-auth";
import { useCart } from "../../../features/cart/hooks/use-cart";
import { paths } from "../../../shared/constants";
import toast from "react-hot-toast";
import { ProductHeader } from "./product-header";
import { ColorSelector } from "./color-selector";
import { SizeSelector } from "./size-selector";
import { QuantitySelector } from "./quantity-selector";
import { AddToCartButton } from "./add-to-cart-button";

export const ProductDetails = ({ product, currentImageIndex, onPhotoChange }: IProductDetailsProps) => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { addToCart } = useCart();

  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [quantity, setQuantity] = useState<number>(1);

  const sizes = useMemo(() => {
    const fallback = ["XS", "S", "M", "L", "XL"];
    return product.available_sizes && product.available_sizes.length > 0 ? product.available_sizes : fallback;
  }, [product.available_sizes]);

  const maxQuantity = useMemo(() => Math.max(1, product.quantity || 5), [product.quantity]);

  useEffect(() => {
    if (product.available_colors && product.available_colors.length > 0 && !selectedColor) {
      setSelectedColor(product.available_colors[0]);
      onPhotoChange(0);
    }
    if (sizes.length > 0 && !selectedSize) {
      setSelectedSize(sizes[0]);
    }
  }, [product, selectedColor, selectedSize, sizes, onPhotoChange]);

  const handleColorChange = (color: string, index: number) => {
    setSelectedColor(color);
    onPhotoChange(index);
  };

  const handleAddToCart = () => {
    if (!isAuthenticated) {
      toast.error("Please sign in to add items to your cart");
      navigate(paths.signIn);
      return;
    }
    if (!selectedColor || !selectedSize) {
      toast.error("Please select color and size");
      return;
    }
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      selectedColor,
      selectedSize,
      selectedImage: product.images[currentImageIndex],
      quantity,
    });
  };

  return (
    <div className="w-1/2">
      <ProductHeader name={product.name} price={product.price} />

      <ColorSelector
        colors={product.available_colors || []}
        selectedColor={selectedColor}
        onChange={handleColorChange}
      />

      <SizeSelector
        sizes={sizes}
        selectedSize={selectedSize}
        onChange={(size: string) => setSelectedSize(size)}
      />

      <QuantitySelector
        quantity={quantity}
        maxQuantity={maxQuantity}
        onChange={(q: number) => setQuantity(q)}
      />

      <AddToCartButton
        disabled={!selectedColor || !selectedSize}
        onClick={handleAddToCart}
      />
      <hr className="my-14 border-gray-300" />
      <div className="flex items-center justify-between mb-6">
        <span className="font-poppins block font-normal text-[#10151F] text-lg">Details</span>
        <img src={product?.brand?.image} alt={product?.brand?.name || "brand"} width={38} height={38} />
      </div>
      <span className="text-[#3E424A] mb-5 block">Brand: {product?.brand?.name || "No brand"}</span>
      <p className="text-[#3E424A]">{product.description || "No description"}</p>
    </div>
  );
};
