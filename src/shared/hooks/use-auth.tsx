/* eslint react-refresh/only-export-components: off */
import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  useCallback,
  type ReactNode,
} from "react";
import type { IUser } from "../models";
import { client } from "../api";
import { useLocallyStoredState } from "./use-locally-stored-state";

interface ILoginResponse {
  token: string;
  user: IUser;
}

interface IAuthContext {
  user: IUser | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (params: {
    username: string;
    email: string;
    password: string;
    passwordConfirmation: string;
    avatar?: File | null;
  }) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<IAuthContext | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useLocallyStoredState<IUser | null>("user",null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("auth_token");
    if (stored) {
      setToken(stored);
      client.defaults.headers.common["Authorization"] = `Bearer ${stored}`;
    }
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    const res = await client.post<ILoginResponse>("/login", {
      email,
      password,
    });
    const data = res.data;
    const user = data.user;
    console.log("User Fom api.",user);
    setUser({
      id: user.id,
      email: user.email,
      profile_photo: user.avatar,
    });
    setToken(data.token);
    localStorage.setItem("auth_token", data.token);
    client.defaults.headers.common["Authorization"] = `Bearer ${data.token}`;
  }, []);

  const register = useCallback(
    async (params: {
      username: string;
      email: string;
      password: string;
      passwordConfirmation: string;
      avatar?: File | null;
    }) => {
      const formData = new FormData();
      formData.append("username", params.username);
      formData.append("email", params.email);
      formData.append("password", params.password);
      formData.append("password_confirmation", params.passwordConfirmation);
      if (params.avatar) {
        formData.append("avatar", params.avatar);
      }
      await client.post("/register", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      await login(params.email, params.password);
    },
    [login]
  );

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("auth_token");
    delete client.defaults.headers.common["Authorization"];
  };

  const value = useMemo<IAuthContext>(
    () => ({
      user,
      token,
      isAuthenticated: Boolean(token),
      login,
      register,
      logout,
    }),
    [user, token, login, register]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return ctx;
};
