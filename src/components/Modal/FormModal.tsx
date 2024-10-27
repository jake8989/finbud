import { useState, useEffect, ChangeEvent } from "react";
import { useFormState } from "react-dom";
import { useToast } from "@/context/customToastContext";
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
  };
  const handleSubmitForm = () => {
    console.log("action type ", userFormType);
    // for login username and password are required
    if (formInputs.username.trim() === "") {
      toast("Username cannot be empty", "warning", 3000);
      return;
    }

    // for register username, password, email and confirmpassword are required
  };
  const handleInputChanges = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
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
              <button className="btn btn-primary" onClick={handleSubmitForm}>
                {isLogin ? "Login" : "Register"}
              </button>
              <button className="btn ml-2" onClick={handleModalClose}>
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
