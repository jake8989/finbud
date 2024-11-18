import { gql } from "@apollo/client";

export const GENERATE_AND_SEND_OTP = gql`
  mutation GenerateAndSendOTP($otp: OTPinput!) {
    generateAndSendOTP(otp: $otp) {
      success
      message
    }
  }
`;
