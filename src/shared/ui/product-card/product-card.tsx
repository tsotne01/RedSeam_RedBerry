import { NavLink } from "react-router";
import type { IProduct } from "../../models";



export const ProductCard = (product: IProduct) => {
  return (
    <NavLink className={"shadow-sm p-2.5 rounded-2xl"} to={`/products/${product.id}`}>
      {product.images && (
        <img
          src={product.cover_image}
          alt={product.name}
          className="max-w-[420px] h-[549px] object-cover rounded"
        />
      )}
      <div className="mt-3 flex flex-col gap-1">
        <h2 className="font-medium font-poppins text-lg text-[#10151F]">
          {product.name}
        </h2>
        <p className="text-[16px] font-poppins text-[#10151F] font-medium">
          ${product.price}
        </p>
      </div>
    </NavLink>
  );
};
