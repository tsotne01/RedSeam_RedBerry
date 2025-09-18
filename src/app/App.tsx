import { AppRouter } from "./router";
import "./styles/App.css";
import { AuthProvider } from "../shared/hooks/use-auth";

export const App = () => {
  return (
    <AuthProvider>
      <AppRouter />
    </AuthProvider>
  );
};
