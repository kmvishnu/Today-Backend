import { sendOtpMail, verifyEmail } from "../Components/emailComponent";

export const sendOtp = async (req, res) => {
  const status = verifyEmail(req.body.email);

  if (status === true) {
    res
      .status(400)
      .json({
        status: false,
        message: "User already exists, Please Proceed to login",
      });
  }

  const emailStatus = await sendOtpMail(req.body.email);
  console.log("email status",emailStatus);
  

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
  