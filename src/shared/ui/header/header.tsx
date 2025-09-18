import { NavLink, Outlet } from "react-router";
import logo from "../../../assets/logo/redseam_logo.svg";
import userIcon from "../../../assets/icons/user_icon.png";
export const Header = () => {
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
          <NavLink
            to={"/sign-in"}
            className="text-[#10151F] font-medium text-sm flex gap-2 items-center"
          >
            <img src={userIcon} alt="User Icon" width={13} height={16} />
            <span className="text-sm font-medium text-[#10151F]">Log In</span>
          </NavLink>
        </div>
      </header>
      <main className="px-[100px] py-7 h-full">
        <Outlet />
      </main>
    </div>
  );
};
