import type { ReactNode } from "react";
import { Header } from "../header/header";

export const AuthLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      {children}
    </div>
  );
};
