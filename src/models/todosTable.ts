import Sequelize from "sequelize";
import { Config } from "../common/config";

// Define your table model
export const todosTable = Config.todosDB.define(
  "todos",
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
    details: {
      type: Sequelize.TEXT,
    },
    done: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    },
    created_at: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
    },
    constant: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    modelName: "todos",
    timestamps: false,
  }
);

todosTable.sync();
