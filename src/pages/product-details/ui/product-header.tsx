import type { IProductHeaderProps } from "../models/model";

export const ProductHeader = ({ name, price }: IProductHeaderProps) => (
  <div className="mb-14">
    <h1 className="font-poppins font-semibold text-[32px] text-[#10151F] mb-6">{name}</h1>
    <p className="text-[32px] text-[#10151F] font-semibold font-poppins">${price}</p>
  </div>
);