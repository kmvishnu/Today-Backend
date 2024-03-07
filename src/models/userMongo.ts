import mongoose, { Schema, Document } from "mongoose";
import { nanoid } from "nanoid";

interface IUser extends Document {
  _id: string;
  name: string;
  emailId: string;
  password: string;
  createDate: Date;
}

const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  emailId: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  createDate: { type: Date, default: Date.now },
});

// Add auto-increment plugin to the schema
const UserModel = mongoose.model<IUser>("User", userSchema);

export default UserModel;
