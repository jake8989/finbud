import Image from "next/image";
import React from "react";
import { useUser } from "@/context/userContext";
import { Loading } from "../Loading/Loading";
import { useMutation } from "@apollo/client";
import { VERIFY_OTP } from "@/lib/mutations/OTPMutations";
import { useToast } from "@/context/customToastContext";
import Cookie from "js-cookie";
import { User } from "@/utils/types";
import { GENERATE_AND_SEND_OTP } from "@/lib/mutations/OTPMutations";
interface OTPPros {
  shouldOpenOTP: boolean;
  handleOTPClose: () => void;
}

export const OTP: React.FC<OTPPros> = ({ shouldOpenOTP, handleOTPClose }) => {
  if (!shouldOpenOTP) return null;
  const { toast } = useToast();
  const { user, loginUserMethod, logoutUserMethod, userLoading } = useUser();
  //   const { user, userLoading } = useUser();
  const [otp, setOtp] = React.useState<string>("");
  const [verifyOTP, { data, loading, error }] = useMutation(VERIFY_OTP);
  const [
    generateAndSendOTP,
    { loading: GENERATEOTPLOADING, error: GENERATEOTPERROR },
  ] = useMutation(GENERATE_AND_SEND_OTP);
  const handleChange = (e: any) => {
    e.preventDefault();
    setOtp(e.target.value);
  };
  const handleVerifyOTP = async () => {
    try {
      const trimmedOTP = otp.trim();
      console.log("Validating OTP:", trimmedOTP);

      if (trimmedOTP === "" || trimmedOTP.length !== 6) {
        toast("Enter Valid OTP!", "error", 2000);
        return false;
      }

      const userEmail = Cookie.get("user_email");
      if (!userEmail) {
        toast("Email not found. Please try again.", "error", 2000);
        return false;
      }

      const { data: verificationData } = await verifyOTP({
        variables: {
          otp: {
            otp: trimmedOTP,
            email: userEmail,
          },
        },
      });

      if (!verificationData?.verifyOTP) {
        toast("Server Error", "error", 2000);
        return false;
      }

      if (!verificationData.verifyOTP.success) {
        toast(verificationData.verifyOTP.message, "error", 3000);
        return false;
      }

      console.log(verificationData);
      const newUser: User = {
        user: {
          username: verificationData.verifyOTP.user.username,
          email: verificationData.verifyOTP.user.email,
        },
      };

      // Step 6: Login user and show success message
      loginUserMethod(newUser);
      toast(verificationData.verifyOTP.message, "success", 3000);
      handleOTPClose();
      // Clean up OTP-related cookies
      Cookie.remove("OTP_OPEN");

      return true;
    } catch (error) {
      console.error("OTP verification error:", error);
      toast("An unexpected error occurred", "error", 3000);
      return false;
    }
  };
  const handleSendAgain = async () => {
    const { data: OTPGenerationAndSendData } = await generateAndSendOTP({
      variables: {
        otp: {
          email: Cookie.get("user_email"),
        },
      },
    });
    console.log(OTPGenerationAndSendData);
    if (!OTPGenerationAndSendData?.generateAndSendOTP) {
      toast("Server Error", "error", 2000);
      return false;
    }

    if (!OTPGenerationAndSendData.generateAndSendOTP.success) {
      toast(OTPGenerationAndSendData.generateAndSendOTP.message, "error", 3000);
      return false;
    }
    if (OTPGenerationAndSendData.generateAndSendOTP.success) {
      toast("OTP send Succesfully to your Email Address", "success", 2000);
    }
  };
  if (userLoading) {
    return <Loading></Loading>;
  }
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
                name="otp"
                value={otp}
                onChange={handleChange}
                // required
                // onChange={handleEditFormChange}
              />
            </label>

            <div className="mt-2"></div>
            <button
              className="btn btn-primary"
              onClick={handleVerifyOTP}
              disabled={loading || GENERATEOTPLOADING}
            >
              {loading ? "Loading..." : "Meowww"}
            </button>
            <button
              className="btn btn-warning ml-2"
              onClick={handleSendAgain}
              disabled={loading || GENERATEOTPLOADING}
            >
              {GENERATEOTPLOADING ? "Loading..." : "Meowww"}
            </button>
            <button
              className="btn ml-2"
              onClick={() => handleOTPClose()}
              disabled={loading || GENERATEOTPLOADING}
            >
              Close
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
};
