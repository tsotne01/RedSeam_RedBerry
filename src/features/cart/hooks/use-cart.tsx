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
import { ZodError } from "zod";
import type { ICartContext, ICartItem } from "../model/model";
import { addItemToServer, deleteItemFromServer, updateItemOnServer } from "../api/api";



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
        await addItemToServer({
          id,
          name,
          price,
          selectedColor,
          selectedSize,
          selectedImage,
          quantity: quantityToAdd,
        });
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
      const foundItem = cartItems.find(
        (item) =>
          item.id === productId &&
          item.selectedColor === options.color &&
          item.selectedSize === options.size
      );
      if (!foundItem) return;
      const newQty = Math.max(1, foundItem.quantity + Math.max(1, step));
      const resp = await updateItemOnServer(foundItem.id, {
        quantity: newQty,
      });

      if (resp.status !== 200) {
        toast.error("Failed To Increment Item Quantity");
        return;
      }
      setCartItems((prev) =>
        prev.map((item) => {
          if (
            item.id === productId &&
            item.selectedColor === options.color &&
            item.selectedSize === options.size
          ) {
            const newQty = item.quantity + Math.max(1, step);
            return { ...item, quantity: newQty };
          }
          return item;
        })
      );
      toast.success("Item Quantity Incremented!");
    },
    [setCartItems, cartItems]
  );

  const removeFromCart = useCallback(
    async (productId: string, options?: { color?: string; size?: string }) => {
      const resp = await deleteItemFromServer(productId);
      if (resp.status !== 204 || !resp) {
        toast.error("Failed To remove Item");
        return;
      }
      setCartItems((prev) =>
        prev.filter((it) => {
          if (it.id !== productId) return true;
          if (options?.color && it.selectedColor !== options.color) return true;
          if (options?.size && it.selectedSize !== options.size) return true;
          return false;
        })
      );
      toast.success("Removed Item From Cart!");
    },
    [setCartItems]
  );

  const decrementCartItemQuantity = useCallback(
    async (
      productId: string,
      options: { color: string; size: string },
      step: number = 1
    ) => {
      const foundItem = cartItems.find(
        (item) =>
          item.id === productId &&
          item.selectedColor === options.color &&
          item.selectedSize === options.size
      );
      if (!foundItem) return;
      
      if (foundItem.quantity <= 1) {
        await removeFromCart(productId, options);
        return;
      }

      const newQty = foundItem.quantity - Math.max(1, step);

      const resp = await updateItemOnServer(foundItem.id, {
        quantity: newQty,
      });

      if (resp.status !== 200) {
        toast.error("Failed To Decrement Item Quantity");
        return;
      }
      setCartItems((prev) =>
        prev.map((item) => {
          if (
            item.id === productId &&
            item.selectedColor === options.color &&
            item.selectedSize === options.size
          ) {
            return { ...item, quantity: newQty };
          }
          return item;
        })
      );
      toast.success("Item Quantity Decremented!");
    },
    [setCartItems, cartItems, removeFromCart]
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
