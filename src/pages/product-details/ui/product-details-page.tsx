import { useEffect, useState } from "react";
import { useParams } from "react-router";
import type { IProduct } from "../../../shared/models";
import { client } from "../../../shared/api";
import { Button } from "../../../shared/ui";

export const ProductDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<IProduct | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [currentColor, setCurrentColor] = useState<string | null>(null);
  const [currentSize, setCurrentSize] = useState<string | null>(null);
  useEffect(() => {
    (async () => {
      if (id) {
        const response = await client(`/products/${id}`);
        console.log(response);
        setProduct(response.data);
      }
    })();
  }, [id]);
  if (!product) {
    return <div>Loading...</div>;
  }
  return (
    <div className="flex gap-[168px]">
      <div className="flex gap-2">
        <div className="flex flex-col gap-3">
          {product.images &&
            product.images.map((img, idx) => (
              <button onClick={() => setCurrentImageIndex(idx)} key={img}>
                <img
                  className="w-[121px] h-[161px]"
                  key={img}
                  src={img}
                  alt={product.name}
                />
              </button>
            ))}
        </div>
        <div>
          {product.images && (
            <img
              className="w-[492px] h-[656px] object-cover rounded"
              src={product.images[currentImageIndex]}
              alt={product.name}
            />
          )}
        </div>
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
              product.available_colors.map((color) => (
                <button
                  type="button"
                  key={color}
                  className={`w-[38px] h-[38px] border border-gray-300 rounded-full inline-block ${
                    currentColor === color
                      ? "ring-2 ring-offset-4 ring-[#E1DFE1]"
                      : ""
                  }`}
                  style={{ backgroundColor: color }}
                  onClick={() => setCurrentColor(color)}
                  aria-label={color}
                ></button>
              ))}
          </div>
        </div>
        {product.available_sizes && (
          <div className="mb-12">
            <span className="font-poppins text-[#10151F] text-base font-normal inline-block mb-4">
              Color: {currentColor}
            </span>
            <div>
              {product.available_sizes.map((size) => (
                <button
                  type="button"
                  key={size}
                  className={`w-[38px] h-[38px] border border-gray-300 rounded-full inline-block ml-3 ${
                    currentSize === size
                      ? "ring-2 ring-offset-4 ring-[#E1DFE1]"
                      : ""
                  }`}
                  onClick={() => setCurrentSize(size)}
                  aria-label={size}
                ></button>
              ))}
            </div>
          </div>
        )}
        <div className="flex flex-col gap-3.5 mb-12">
          <span className="inline-block mb-4 font-poppins font-normal">
            Quantity
          </span>
          <select
            className="w-[70px] px-[15px] py-[9px] border-1 border-[#E1DFE1] rounded-[10px]"
            title="quantity"
            name="quantity"
            id="quantity"
          >
            {[1, 2, 3, 4, 5].map((qty) => (
              <option key={qty} value={qty}>
                {qty}
              </option>
            ))}
          </select>
        </div>
        <Button variant="primary" size="large" className="mb-12 w-full">
          Add to Cart
        </Button>
        <p>{product.description}</p>
      </div>
    </div>
  );
};
