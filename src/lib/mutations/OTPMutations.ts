import { gql } from "@apollo/client";

export const GENERATE_AND_SEND_OTP = gql`
  mutation GenerateAndSendOTP($otp: OTPinput!) {
    generateAndSendOTP(otp: $otp) {
      success
      message
    }
  }
`;

export const VERIFY_OTP = gql`
  mutation VerifyOTP($otp: VerifyOTPType!) {
    verifyOTP(otp: $otp) {
      success
      message
      user {
        username
        email
      }
    }
  }
`;
