/* eslint-disable no-debugger */
import {
  getOtpFromFirebase,
  sendOtpMail,
  verifyEmail,
  verifyEmailV2,
} from "../Components/emailComponent";
import { createUser } from "../Components/v2UserComponent";

export const sendOtp = async (req, res) => {
  const status = await verifyEmailV2(req.body.email);

  if (status === true) {
    return res.status(400).json({
      status: "false",
      message: "User already exists, Please Proceed to login ",
    });
  }

  const emailStatus = await sendOtpMail(req.body.email);
  if (emailStatus) {
    return res.status(200).json({
      status: "success",
      message: "OTP has been sent to the provided email.",
    });
  }

  return res.status(500).json({
    status: "failed",
    message: "Unable to send email at the momment",
  });
};

export const verifyOtp = async (req, res) => {
  // Retrieve email and OTP from request object
  const { email, otp, password, name } = req.body;

  // Retrieve the OTP details from the database
  const emailOtp = await getOtpFromFirebase(email);

  // Check if this record exists and proceed
  if (emailOtp.exists) {
    // Retrieve the expiry date
    const date = emailOtp.data().expiry;

    // Check if OTP has expired
    if (Date.now() > date) {
      return res.json({
        status: "failed",
        message: "Sorry this otp has expired!",
      });
    } else {
      // Retrieve OTP code from database
      const rOtp = emailOtp.data().otp;

      // Compare OTP for match
      if (otp == rOtp) {
        const result = await createUser(name, email, password);
        if (result) {
          return res
            .status(200)
            .json({ status: "otpSuccess", message: "User Created" });
        }
      }

      return res
        .status(400)
        .json({
          status: "otpFalse",
          message: "Sorry, the otp provided is not valid",
        });
    }
  }

  return res
    .status(500)
    .json({
      status: "otpFailed",
      message: "OTP cannot be verified at the moment!",
    });
};
