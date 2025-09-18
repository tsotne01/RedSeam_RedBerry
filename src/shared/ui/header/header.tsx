import { NavLink, Outlet } from "react-router";
import logo from "../../../assets/logo/redseam_logo.svg";
import userIcon from "../../../assets/icons/user_icon.png";
import fallbackAvatar from "../../../assets/auth/fallback_avatar.png"
import cartIconDark from "../../../assets/icons/cart_icon_dark.svg"
// cart UI moved to widget
import { useAuth } from "../../hooks/use-auth";
import { useState } from "react";
import { CartWidget } from "../../../widgets/cart";
import { useCart } from "../../../widgets/cart/hooks/use-cart";
export const Header = () => {
  const { isAuthenticated, user } = useAuth();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { totalQuantity } = useCart()
  return (
    <div className="h-screen">
      <header className="flex items-center justify-between px-[100px] h-20">
        <NavLink to={"/"} className="flex gap-1 items-center">
          <img src={logo} alt="Logo" width={16.5} height={21} />
          <span className="text-[#10151F] font-semibold text-base">
            RedSeam Clothing
          </span>
        </NavLink>
        <div>
          {!isAuthenticated ? (
            <NavLink
              to={"/sign-in"}
              className="text-[#10151F] font-medium text-sm flex gap-2 items-center"
            >
              <img src={userIcon} alt="User Icon" width={13} height={16} />
              <span className="text-sm font-medium text-[#10151F]">Log In</span>
            </NavLink>
          ) : (
            <div className="flex gap-5">
              <button
                onClick={() => setIsCartOpen(prev => !prev)}
                className="cursor-pointer relative"
              >
                <img src={cartIconDark} alt="cart" />
                {totalQuantity > 0 && (
                  <span className="absolute -top-2 -right-2 bg-[#FF4000] text-white text-[10px] leading-none rounded-full px-1.5 py-1">{totalQuantity}</span>
                )}
              </button>
              <img src={user?.profile_photo || fallbackAvatar} alt="profile" className="w-[38px] h-[38px] rounded-full" />
            </div>
          )}
        </div>
      </header>
      <main className="px-[100px] py-7 h-full">
        {isCartOpen && isAuthenticated && (
          <CartWidget onClose={() => setIsCartOpen(false)} />
        )}
        <Outlet />
      </main>
    </div>
  );
};
