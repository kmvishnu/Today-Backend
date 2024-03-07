import mongoose, { Schema, Document } from "mongoose";

interface ITodo extends Document {
  _id: string;
  name: string;
  details:string;
  done: boolean;
  constant: boolean;
  user_id:string;
  createDate: Date;
}

const todoSchema = new Schema<ITodo>({
  name: { type: String, required: true },
  details: { type: String, required: true},
  done: { type: Boolean, required: true},
  user_id: { type: String, required: true},
  constant: { type: Boolean, required: true},
  createDate: { type: Date, default: Date.now },
});

// Add auto-increment plugin to the schema
const TodosModel = mongoose.model<ITodo>("Todos", todoSchema);

export default TodosModel;

