
import  {Sequelize}  from "sequelize";
import * as dotenv from "dotenv";

// Load variables from .env into process.env
dotenv.config({
	encoding: "utf8",
});

export module Config {

	export const MySqlDB = new Sequelize(process.env.MYSQL_DB_NAME, process.env.MYSQL_DB_USER, process.env.MYSQL_DB_PASS, {
		host: process.env.MYSQL_DB_HOST,
		dialect: 'mysql',
		logging: false
	});	
	
}
