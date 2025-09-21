export interface ICartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  selectedColor: string;
  selectedSize: string;
  selectedImage: string;
}

export interface ICartContext {
  cartItems: ICartItem[];
  totalQuantity: number;
  subtotalPrice: number;
  addToCart: (payload: {
    id: string;
    name: string;
    price: number;
    selectedColor: string;
    selectedSize: string;
    selectedImage: string;
    quantity?: number;
  }) => void;
  removeFromCart: (
    productId: string,
    options?: { color?: string; size?: string }
  ) => void;
  incrementCartItemQuantity: (
    productId: string,
    options: { color: string; size: string },
    step?: number
  ) => void;
  decrementCartItemQuantity: (
    productId: string,
    options: { color: string; size: string },
    step?: number
  ) => void;
  clearCart: () => void;
}