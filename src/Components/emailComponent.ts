import nodemailer from "nodemailer";
import admin from "firebase-admin";
// import otpGenerator from "otp-generator";

const config = {
  type: process.env.FIREBASE_TYPE,
  project_id: process.env.FIREBASE_PROJECT_ID,
  private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
  private_key: process.env.FIREBASE_PRIVATE_KEY,
  client_email: process.env.FIREBASE_CLIENT_EMAIL,
  client_id: process.env.FIREBASE_CLIENT_ID,
  auth_uri: process.env.FIREBASE_AUTH_URI,
  token_uri: process.env.FIREBASE_TOKEN_URI,
  auth_provider_x509_cert_url: process.env.FIREBASE_AUTH_PROVIDER_CERT_URL,
  client_x509_cert_url: process.env.FIREBASE_CLIENT_CERT_URL,
  universe_domain: process.env.FIREBASE_UNIVERSE_DOMAIN,
};

admin.initializeApp({
  credential: admin.credential.cert(config as admin.ServiceAccount),
});

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    type: "OAuth2",
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    refreshToken: process.env.REFRESH_TOKEN,
  },
});

import { usersTable } from "../models/userTable";
import UserModel from "../models/userMongo";

export const verifyEmail = async (email: string): Promise<boolean> => {
  try {

    const user = await usersTable.findOne({
      where: { email: email },
    });

    // If a user with the given email is found, return true
    // Otherwise, return false
    return !!user;
  } catch (error) {
    console.error("Error verifying email:", error);
    return false;
  }
};

export const verifyEmailV2 = async (email: string): Promise<boolean> => {
  try {

    const user = await UserModel.findOne({ emailId :email});
    
    // If a user with the given email is found, return true
    // Otherwise, return false
    return !!user;
  } catch (error) {
    console.error("Error verifying email:", error);
    return false;
  }
};


export const sendOtpMail = async (email: string) => {
  try {
    // Initiliaze firestore database
    const db = admin.firestore();

    // Generate OTP code
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    // mail options object to send email
    const mailOptions = {
      from: process.env.FROM_USER,
      to: email,
      subject: "OTP To Complete Your Signup",
      html: `<html> <h1>Hi,</h1> <br/><p style="color:grey; font-size:1.2em">Please use the below OTP code to complete your account setup on My App</p><br><br><h1 style="color:orange">${code}</h1></html>`,
    };

    const expiryDate = Date.now() + 180000;


    try {
      await transporter.sendMail(mailOptions);
      await db.collection("otps").doc(email).set({
        email: email,
        otp: code,
        expiry: expiryDate,
      });
      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  } catch (e) {
      (e);
    return false;
  }
};

export const sendTestMail = async () => {
  try {
   

    
    // mail options object to send email
    const mailOptions = {
      from: process.env.FROM_USER,
      to: process.env.FROM_TEST_USER,
      subject: "This is a test email - You will receive this every 3rd day",
      html: `<html> <h1>Hi,</h1> <br/><p style="color:grey; font-size:1.2em">Please Ignore this mail</p><br><br><h1 style="color:orange"></h1></html>`,
    };


    try {
      await transporter.sendMail(mailOptions);
      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  } catch (e) {
      (e);
    return false;
  }
};



export const getOtpFromFirebase = async (email:string)=>{
    const db=admin.firestore()
    const otp = await db.collection("otps").doc(email).get()
    return otp;
}
