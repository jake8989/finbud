import React, { ReactNode } from "react";
import { User } from "@/utils/types";
import Cookies from "js-cookie";
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
  React.useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setUserLoading(false);
  }, []);
  const loginUserMethod = (user: User) => {
    setUser(user);
    localStorage.setItem("user", JSON.stringify(user));
  };
  const logoutUserMethod = () => {
    setUser(null);
    localStorage.removeItem("user");
    Cookies.remove("token");
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
