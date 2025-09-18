export interface IProduct {
  id: string;
  name: string;
  description: string;
  price: number;
  available_colors: string[];
  images: string[];
  available_sizes: string[];
  cover_image: string;
}