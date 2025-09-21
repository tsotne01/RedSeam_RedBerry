import type { IQuantitySelectorProps } from "../models/model";

export const QuantitySelector = ({ quantity, maxQuantity, onChange }: IQuantitySelectorProps) => (
  <div className="flex flex-col gap-3.5 mb-12">
    <span className="inline-block mb-4 font-poppins font-normal">Quantity</span>
    <select
      className="w-[70px] px-[15px] py-[9px] border-1 border-[#E1DFE1] rounded-[10px]"
      title="quantity"
      name="quantity"
      id="quantity"
      value={quantity}
      onChange={(e) => onChange(Number(e.target.value))}
    >
      {Array.from({ length: maxQuantity }).map((_, index) => {
        const val = index + 1;
        return (
          <option key={val} value={val}>
            {val}
          </option>
        );
      })}
    </select>
  </div>
);