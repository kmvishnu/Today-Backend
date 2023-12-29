import { usersTable } from "../models/userTable";
import bcrypt from "bcryptjs";

export const createUser = async (name: string, email: string, password: string): Promise<boolean> => {
  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const newData = await usersTable.create({
      name: name,
      email: email,
      password: hashedPassword,
    });

    return true;
  } catch (error) {
    console.error("Error adding data:", error);

    return false;
  }
};

export const verifyUser = async (email:string)=>{
    const user = await usersTable.findOne({
        where: { email: email },
      });
      return user;
}