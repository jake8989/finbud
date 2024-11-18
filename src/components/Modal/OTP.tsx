import Image from "next/image";
import React from "react";
interface OTPPros {
  shouldOpenOTP: boolean;
  handleOTPClose: () => void;
}

export const OTP: React.FC<OTPPros> = ({ shouldOpenOTP, handleOTPClose }) => {
  if (!shouldOpenOTP) return null;
  return (
    <>
      <dialog
        id="my_modal_1"
        className={`modal ${shouldOpenOTP ? "modal-open" : ""}`}
      >
        <div className="modal-box">
          <h3 className="font-bold text-lg text-center">Enter OTP</h3>
          <p className="">
            We’ve sent a One-Time Password (OTP) to your registered email
            address. Please enter the OTP below to verify your account. The OTP
            will expire in 3 minutes. If you didn't receive the email, please
            check your spam folder or request a new OTP.
          </p>

          <div className="mt-2">
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
                type="number"
                className="grow"
                placeholder="Enter OTP"
                name="goalDescription"
                required
                // onChange={handleEditFormChange}
              />
            </label>

            <div className="mt-2"></div>
            <button
              className="btn btn-primary"
              //   onClick={handleEditThisGoal}
              //   disabled={loading}
            >
              {true ? "Loading..." : "Meowww"}
            </button>
            <button
              className="btn btn-warning ml-2"
              //   onClick={handleBothModals}
              //   disabled={loading}
            >
              Delete This Goal
            </button>
            <button
              className="btn ml-2"
              onClick={() => handleOTPClose()}
              //   disabled={loading}
            >
              Close
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
};
