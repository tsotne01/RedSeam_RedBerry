import type { ISizeSelectorProps } from "../models/model";

export const SizeSelector = ({ sizes, selectedSize, onChange }: ISizeSelectorProps) => (
  <div className="mb-12">
    <span className="font-poppins text-[#10151F] text-base font-normal inline-block mb-4">
      Size: {selectedSize ?? "Select a size"}
    </span>
    <div className="flex flex-wrap gap-[10px]">
      {sizes.map((size: string) => (
        <button
          type="button"
          key={size}
          className={`w-[70px] h-[42px] rounded-[10px] border-1 border-[#E1DFE1] px-4 py-[9px] text-sm font-medium ${
            selectedSize === size ? "border-[#FF4000] text-[#10151F]" : "text-[#3E424A]"
          }`}
          onClick={() => onChange(size)}
          aria-label={size}
        >
          {size.toUpperCase()}
        </button>
      ))}
    </div>
  </div>
);