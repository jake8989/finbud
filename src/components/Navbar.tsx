import React from "react";
import Image from "next/image";
import { FormModal } from "./Modal/FormModal";
import { useTheme } from "@/context/themeContext";
import { useState } from "react";
import { useUser } from "@/context/userContext";
import { useToast } from "@/context/customToastContext";
{
  /* <div className="avatar placeholder">
  <div className="bg-neutral text-neutral-content w-12 rounded-full">
    <span>SY</span>
  </div>
</div>
 */
}
import { useRouter } from "next/router";
const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const { user, userLoading, logoutUserMethod } = useUser();
  const [userFormType, setUserFormType] = useState<string>(undefined);
  const { toast } = useToast();
  const handleOpenLoginForm = () => {
    setUserFormType("login");
  };
  const handleOpenRegisterForm = () => {
    setUserFormType("register");
  };
  const handleClose = () => {
    setUserFormType(undefined);
  };
  const router = useRouter();
  if (userLoading) {
    return (
      <div className="flex justify-end items-center mt-[20px]">
        <progress className="progress w-56"></progress>
      </div>
    );
  }
  const handleLogout = async () => {
    await logoutUserMethod();
    toast("Logged Out Successfully!", "success", 3000);
  };

  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <a className="btn btn-ghost text-2xl" onClick={() => router.push("/")}>
          <Image src="logo.svg" height={40} width={40} alt="322"></Image>
          FinBud
        </a>
      </div>
      <div className="flex-none">
        {/* //reminder icons for your goals! */}
        {/* <div className="dropdown md:dropdown-end">
          <button
            className="btn btn-ghost goals-reminder"
            tabIndex={0}
            role="button"
          >
            <Image src="bell.svg" height={25} width={25} alt="no"></Image>
          </button>
          <ul
            tabIndex={0}
            className="dropdown-content menu bg-neutral rounded-box z-[1] w-[250px] p-2 shadow"
          >
            <li>
              <a>Loading...</a>
            </li>
            <li>
              <a>Loading...</a>
            </li>
          </ul>
        </div> */}
        <label className="swap swap-rotate">
          {/* this hidden checkbox controls the state */}
          <input
            type="checkbox"
            className="theme-controller"
            onClick={toggleTheme}
            checked={theme === "light"}
          />
          {/* sun icon */}
          <svg
            className={"swap-off h-6 w-6 fill-current"}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
          </svg>
          {/* moon icon */}
          <svg
            className="swap-on h-6 w-6 fill-current"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
          </svg>
        </label>
        {!user ? (
          <>
            <button
              className="btn  btn-ghost text-sm"
              onClick={handleOpenLoginForm}
            >
              Login
            </button>
            <button
              className="btn btn-ghost text-sm"
              onClick={handleOpenRegisterForm}
            >
              Register
            </button>
          </>
        ) : (
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn p-2 btn-ghost">
              {" "}
              <div className="avatar placeholder">
                <div className="bg-neutral text-neutral-content w-8 rounded-full">
                  <span>{user?.user?.username?.slice(0, 2).toUpperCase()}</span>
                </div>
              </div>
            </div>

            <ul
              tabIndex={0}
              className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
            >
              <h1 className="p-[10px]">Hello, {user.user.username}</h1>
              <li className="mt-[10px]">
                <button className="btn btn-warning" onClick={handleLogout}>
                  Logout
                </button>
              </li>
            </ul>
          </div>
        )}
        <FormModal
          userFormType={userFormType}
          handleClose={handleClose}
          setUserFormType={setUserFormType}
        ></FormModal>
      </div>
    </div>
  );
};
export default Navbar;
