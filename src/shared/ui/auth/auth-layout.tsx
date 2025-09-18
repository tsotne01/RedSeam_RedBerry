import type { ReactNode } from "react";
import authImage from "../../../assets/auth/auth_photo.png";
export const AuthLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex justify-end items-center h-full">
      <div>
        <img
          src={authImage}
          alt="auth image"
          width={948}
          className="max-w-1/2 h-full overflow-hidden absolute top-20 left-0 -z-10"
        />
      </div>
      <div className="h-fit">{children}</div>
    </div>
  );
};
