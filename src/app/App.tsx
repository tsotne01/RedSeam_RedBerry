import { AppRouter } from "./router";
import "./styles/App.css";
import { AuthProvider } from "../shared/hooks/use-auth";
import { Toaster } from "react-hot-toast";
import { CartProvider } from "../widgets/cart/hooks/use-cart";

export const App = () => {
  return (
    <AuthProvider>
      <CartProvider>
        <AppRouter />
        <Toaster position="top-center" />
      </CartProvider>
    </AuthProvider>
  );
};
