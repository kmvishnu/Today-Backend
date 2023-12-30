import Sequelize from "sequelize";
import { Config } from "../common/config";

// Define your table model
export const usersTable = Config.todosDB.define(
  "users",
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    created_at: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
    },
  },
  {
    modelName: "todos",
    timestamps: false,
  }
);

usersTable.sync();
