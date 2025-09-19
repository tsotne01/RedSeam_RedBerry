/* eslint react-refresh/only-export-components: off */
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  type ReactNode,
} from "react";
import { toast } from "react-hot-toast";
import { useLocallyStoredState } from "../../../shared/hooks/use-locally-stored-state";
import { client } from "../../../shared/api";
import { ZodError } from "zod";

export interface ICartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  selectedColor: string;
  selectedSize: string;
  selectedImage: string;
}

interface ICartContext {
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
  setCartItemQuantity: (
    productId: string,
    options: { color: string; size: string },
    quantity: number
  ) => void;
  clearCart: () => void;
}

const CartContext = createContext<ICartContext | null>(null);

const STORAGE_KEY = "cart_items";

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems, clearStorage] = useLocallyStoredState<
    ICartItem[]
  >(STORAGE_KEY, []);

  const addToCart = useCallback(
    async (payload: {
      id: string;
      name: string;
      price: number;
      selectedColor: string;
      selectedSize: string;
      selectedImage: string;
      quantity?: number;
    }) => {
      const { id, name, price, selectedColor, selectedSize, selectedImage } =
        payload;
      const quantityToAdd = Math.max(1, payload?.quantity ?? 1);
      try {
        const response = await client.post(`/cart/products/${id}`, {
          color: selectedColor,
          size: selectedSize,
          quantity: quantityToAdd,
        });
        console.log(response);
        toast.success("Added to cart");
        setCartItems((prev) => {
          const idx = prev.findIndex(
            (it) =>
              it.id === id &&
              it.selectedColor === selectedColor &&
              it.selectedSize === selectedSize
          );
          if (idx === -1) {
            return [
              ...prev,
              {
                id,
                name,
                price,
                quantity: quantityToAdd,
                selectedColor,
                selectedSize,
                selectedImage,
              },
            ];
          }
          const updated = [...prev];
          const newQty = updated[idx].quantity + quantityToAdd;
          updated[idx] = { ...updated[idx], quantity: newQty };
          return updated;
        });
      } catch (error) {
        if (error instanceof ZodError) {
          toast.error("Failed to add to cart: " + error.message);
          return;
        }
        toast.error("Failed to add to cart");
      }
    },
    [setCartItems]
  );

  const incrementCartItemQuantity = useCallback(
    async (
      productId: string,
      options: { color: string; size: string },
      step: number = 1
    ) => {
      try {
        setCartItems((prev) =>
          prev.map((it) => {
            if (
              it.id === productId &&
              it.selectedColor === options.color &&
              it.selectedSize === options.size
            ) {
              (async () => {
                await client.patch(`/cart/products/${productId}`, {
                  quantity: it.quantity + Math.max(1, step),
                });
              })();
            }
            return it.id === productId &&
              it.selectedColor === options.color &&
              it.selectedSize === options.size
              ? { ...it, quantity: it.quantity + Math.max(1, step) }
              : it;
          })
        );
      } catch (error) {
        if (error instanceof ZodError) {
          toast.error(
            "Failed to increment cart item quantity: " + error.message
          );
          return;
        }
        toast.error("Failed to increment cart item quantity");
      }
    },
    [setCartItems]
  );

  const decrementCartItemQuantity = useCallback(
    (
      productId: string,
      options: { color: string; size: string },
      step: number = 1
    ) => {
      setCartItems((prev) =>
        prev.map((it) =>
          it.id === productId &&
          it.selectedColor === options.color &&
          it.selectedSize === options.size
            ? { ...it, quantity: Math.max(1, it.quantity - Math.max(1, step)) }
            : it
        )
      );
    },
    [setCartItems]
  );

  const setCartItemQuantity = useCallback(
    (
      productId: string,
      options: { color: string; size: string },
      quantity: number
    ) => {
      const safeQty = Math.max(1, quantity);
      setCartItems((prev) =>
        prev.map((it) =>
          it.id === productId &&
          it.selectedColor === options.color &&
          it.selectedSize === options.size
            ? { ...it, quantity: safeQty }
            : it
        )
      );
    },
    [setCartItems]
  );

  const removeFromCart = useCallback(
    (productId: string, options?: { color?: string; size?: string }) => {
      try {
        (async () => {
          await client.delete(`/cart/products/${productId}`);
        })();
        setCartItems((prev) =>
          prev.filter((it) => {
            if (it.id !== productId) return true;
            if (options?.color && it.selectedColor !== options.color)
              return true;
            if (options?.size && it.selectedSize !== options.size) return true;
            return false;
          })
        );
      } catch (error) {
        if (error instanceof ZodError) {
          toast.error("Failed to remove from cart: " + error.message);
          return;
        }
        toast.error("Failed to remove from cart");
      }
    },
    [setCartItems]
  );

  const clearCart = useCallback(() => {
    setCartItems([]);
    clearStorage();
  }, [clearStorage, setCartItems]);

  const totalQuantity = useMemo(
    () => cartItems.reduce((sum, it) => sum + it.quantity, 0),
    [cartItems]
  );
  const subtotalPrice = useMemo(
    () => cartItems.reduce((sum, it) => sum + it.price * it.quantity, 0),
    [cartItems]
  );

  const value = useMemo<ICartContext>(
    () => ({
      cartItems,
      totalQuantity,
      subtotalPrice,
      addToCart,
      removeFromCart,
      incrementCartItemQuantity,
      decrementCartItemQuantity,
      setCartItemQuantity,
      clearCart,
    }),
    [
      cartItems,
      totalQuantity,
      subtotalPrice,
      addToCart,
      removeFromCart,
      incrementCartItemQuantity,
      decrementCartItemQuantity,
      setCartItemQuantity,
      clearCart,
    ]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within a CartProvider");
  return ctx;
};
