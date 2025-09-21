import { colorMap } from "../../../shared/constants/colors/colors";
import type { IColorSelectorProps } from "../models/model";

export const ColorSelector = ({ colors, selectedColor, onChange }: IColorSelectorProps) => (
  <div className="mb-12">
    <span className="font-poppins text-[#10151F] text-base font-normal inline-block mb-4">
      Color: {selectedColor ? selectedColor : "Select a color"}
    </span>
    <div className="flex gap-2">
      {colors.map((color: string, index: number) => (
        <button
          type="button"
          key={color}
          className={`w-[38px] h-[38px] border border-gray-300 rounded-full inline-block ${
            selectedColor === color ? "ring-2 ring-offset-4 ring-[#E1DFE1]" : ""
          }`}
          style={{ backgroundColor: colorMap[color] }}
          onClick={() => onChange(color, index)}
          aria-label={color}
        />
      ))}
    </div>
  </div>
);