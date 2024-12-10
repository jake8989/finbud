import React, { ReactNode } from "react";
import { User } from "@/utils/types";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
interface UserContextProps {
  user: User | null;
  loginUserMethod: (user: User) => void;
  logoutUserMethod: () => void;
  userLoading: boolean;
}
const UserContext = React.createContext<UserContextProps | undefined>(
  undefined
);

export const UserContextProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = React.useState<User | null>(null);
  const [userLoading, setUserLoading] = React.useState<boolean>(true);
  const router = useRouter();
  React.useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
      } catch (error) {
        console.error("Invalid JSON in localStorage 'user':", error);
        localStorage.removeItem("user");
        Cookies.remove("OTP_OPEN");
      }
    }
    setUserLoading(false);
  }, []);
  const loginUserMethod = (user: User) => {
    setUser(user);
    console.log(user);
    localStorage.setItem("user", JSON.stringify(user));
  };
  const logoutUserMethod = () => {
    setUser(null);
    localStorage.removeItem("user");
    Cookies.remove("token");
    router.push("/");
    localStorage.removeItem("apollo-cache-persist");
  };
  return (
    <UserContext.Provider
      value={{ user, loginUserMethod, logoutUserMethod, userLoading }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = React.useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
