import { useState, useEffect, ChangeEvent } from "react";
import { useFormState } from "react-dom";
import { useToast } from "@/context/customToastContext";
import { gql, useMutation } from "@apollo/client";
import {
  UserMutationResponse,
  MutationRegisterUserArgs,
  MutationLoginUserArgs,
} from "@/__generated__/graphql";

import { REGISTER_USER } from "@/lib/mutations/registerUser";
import { LOGIN_USER } from "@/lib/mutations/loginUser";
interface userFormsProps {
  userFormType: string;
  handleClose: () => void;
  setUserFormType: (type: string) => void;
}
interface UserFormInput {
  username: string | null;
  email: string | null;
  password: string;
  confirmpassword: string | null;
}

export const FormModal: React.FC<userFormsProps> = ({
  userFormType,
  handleClose,
  setUserFormType,
}) => {
  const { toast } = useToast();
  const [
    registerUser,
    { data: registerData, loading: registerLoading, error: registerError },
  ] = useMutation(REGISTER_USER);
  const [
    loginUser,
    { data: loginData, loading: loginLoading, error: loginError },
  ] = useMutation(LOGIN_USER);

  const [formInputs, setFormInputs] = useState<UserFormInput>({
    username: "",
    email: "",
    password: "",
    confirmpassword: "",
  });
  const isLogin = userFormType === "login";
  const handleModalClose = () => {
    setUserFormType(undefined); // reset form type on close
    handleClose();
    setFormInputs({
      username: "",
      email: "",
      password: "",
      confirmpassword: "",
    });
  };
  const handleSubmitForm = async () => {
    console.log("action type ", userFormType);
    // console.log(formInputs);
    // for login username and password are required
    if (
      formInputs.username.trim() === "" ||
      (formInputs.email.trim() === "" && userFormType === "register") ||
      formInputs.password.trim() === "" ||
      (formInputs.confirmpassword.trim() === "" && userFormType === "register")
    ) {
      toast("Empty Fields!", "warning", 3000);
      return;
    }
    if (formInputs.password.trim().length < 6) {
      toast(
        "The password must have a minimum length of 6 characters.",
        "warning",
        3000
      );
      return;
    }
    if (
      formInputs.password.trim() !== formInputs.confirmpassword.trim() &&
      userFormType === "register"
    ) {
      toast("Password and Confirm Password do not match!", "warning", 3000);
      return;
    }
    if (!formInputs.email.trim().includes("@") && userFormType === "register") {
      toast("Provide a valid email!", "warning", 3000);
      return;
    }
    if (userFormType === "register") {
      try {
        const userRegisterData: MutationRegisterUserArgs = {
          user: {
            username: formInputs.username,
            email: formInputs.email,
            password: formInputs.password,
          },
        };
        const { data } = await registerUser({
          variables: userRegisterData,
        });

        if (!data.success) {
          toast(data.registerUser.message, "error", 3000);
        }
      } catch (error) {
        console.log(error);
      }
    } else if (userFormType === "login") {
      try {
        const userLoginData: MutationLoginUserArgs = {
          user: {
            username: formInputs.username,
            password: formInputs.password,
          },
        };
        const { data } = await loginUser({
          variables: {
            user: {
              username: formInputs.username,
              password: formInputs.password,
            },
          },
        });
        console.log(data);
        if (data.loginUser.success) {
          toast(data.loginUser.message, "success", 2000);
          handleModalClose();
        }
        if (!data.loginUser.success) {
          toast(data.loginUser.message, "error", 2000);
        }
      } catch (error) {
        console.log(error);
        toast(error, "error", 2000);
      }
    }
  };
  const handleInputChanges = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    // console.log(event.target.value);
    setFormInputs({ ...formInputs, [event.target.name]: event.target.value });
  };
  return (
    <>
      {userFormType != undefined ? (
        <dialog
          id="my_modal_1"
          className={`modal ${userFormType !== undefined ? "modal-open" : ""}`}
        >
          <div className="modal-box">
            <h3 className="font-bold text-lg text-center">Hello!</h3>

            <div className="mt-2">
              {!isLogin && (
                <label className="input input-bordered flex items-center gap-2 mt-1.5">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    className="h-4 w-4 opacity-70"
                  >
                    <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                    <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
                  </svg>
                  <input
                    type="text"
                    className="grow"
                    name="email"
                    placeholder="Email"
                    onChange={handleInputChanges}
                  />
                </label>
              )}

              <label className="input input-bordered flex items-center gap-2 mt-1.5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="h-4 w-4 opacity-70"
                >
                  <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
                </svg>
                <input
                  type="text"
                  className="grow"
                  name="username"
                  placeholder="Username"
                  onChange={handleInputChanges}
                />
              </label>
              <label className="input input-bordered flex items-center gap-2 mt-1.5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="h-4 w-4 opacity-70"
                >
                  <path
                    fillRule="evenodd"
                    d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                    clipRule="evenodd"
                  />
                </svg>
                <input
                  type="password"
                  className="grow"
                  placeholder="Password"
                  name="password"
                  onChange={handleInputChanges}
                />
              </label>
              {!isLogin && (
                <label className="input input-bordered flex items-center gap-2 mt-1.5">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    className="h-4 w-4 opacity-70"
                  >
                    <path
                      fillRule="evenodd"
                      d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <input
                    type="password"
                    className="grow"
                    placeholder="Confirm Password"
                    name="confirmpassword"
                    onChange={handleInputChanges}
                  />
                </label>
              )}

              <div className="mt-2"></div>
              <button
                className="btn btn-primary"
                onClick={handleSubmitForm}
                disabled={loginLoading || registerLoading}
              >
                {registerLoading ||
                  (loginLoading && (
                    <span className="loading loading-spinner loading-xs"></span>
                  ))}
                {!registerLoading && !loginLoading && isLogin && "Login"}
                {!registerLoading && !loginLoading && !isLogin && "Register"}
              </button>
              <button
                className="btn ml-2"
                onClick={handleModalClose}
                disabled={loginLoading || registerLoading}
              >
                Close
              </button>
            </div>
          </div>
        </dialog>
      ) : (
        ""
      )}
    </>
  );
};
