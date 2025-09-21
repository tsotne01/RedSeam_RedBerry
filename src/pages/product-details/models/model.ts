import type { IProduct } from "../../../shared/models";

export interface IProductHeaderProps {
  name: string;
  price: number;
}

export interface IColorSelectorProps {
  colors: string[];
  selectedColor: string | null;
  onChange: (color: string, index: number) => void;
}

export interface ISizeSelectorProps {
  sizes: string[];
  selectedSize: string | null;
  onChange: (size: string) => void;
}

export interface IQuantitySelectorProps {
  quantity: number;
  maxQuantity: number;
  onChange: (q: number) => void;
}

export interface IAddToCartButtonProps {
  disabled: boolean;
  onClick: () => void;
}

export interface IProductDetailsProps {
  product: IProduct;
  currentImageIndex: number;
  onPhotoChange: (index: number) => void;
}