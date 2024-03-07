import bcrypt from "bcryptjs";
import UserModel from "../models/userMongo";

export const createUser = async (
  name: string,
  email: string,
  password: string
): Promise<boolean> => {
  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await UserModel.create({
      name: name,
      emailId: email,
      password: hashedPassword,
    });

    return true;
  } catch (error) {
    console.error("Error creating user:", error);4
    return false;
  }
};

export const verifyUser = async (email: string) => {
    try {
        const user = await UserModel.findOne({ emailId : email });
    
        return user
      } catch (error) {
        console.error('Error finding user:', error);
      }
};
