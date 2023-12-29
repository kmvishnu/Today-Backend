import { Sequelize } from "sequelize";
import * as dotenv from "dotenv";

// Load variables from .env into process.env
dotenv.config({
  encoding: "utf8",
});

export module Config {
  export const MySqlDB = new Sequelize(
    process.env.MYSQL_DB_NAME,
    process.env.MYSQL_DB_USER,
    process.env.MYSQL_DB_PASS,
    {
      host: process.env.MYSQL_DB_HOST,
      dialect: "mssql", //actually mssql
      logging: false,
    }
  );

  // export const todosDB = new Sequelize(process.env.TODO_DB_NAME, process.env.TODO_DB_USER, process.env.TODO_DB_PASS, {
  // 	host: process.env.TODO_DB_HOST,
  // 	dialect: 'mssql',
  // 	logging: false
  //   });

  export const todosDB = new Sequelize(
    <string>process.env.TODO_DB_NAME,
    <string>process.env.TODO_DB_USER,
    <string>process.env.TODO_DB_PASS,
    {
      host: <string>process.env.TODO_DB_HOST,
      dialect: "mssql",
      pool: { max: 10, min: 0, acquire: 300000, idle: 100000 },
      dialectOptions: {
        encrypt: true,
        options: {
          requestTimeout: 300000,
        },
        flags: "-FOUND_ROWS",
      },
      logging: false,
    }
  );
  
}
