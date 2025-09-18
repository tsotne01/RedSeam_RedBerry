export interface IProduct {
  id: string;
  name: string;
  description: string;
  price: number;
  available_colors: string[];
  images: string[];
  available_sizes: string[];
  cover_image: string;
  quantity: number;
  brand: {
    id: string;
    name: string;
    image: string;
  };
  release_date: string;
  total_price: number;
}