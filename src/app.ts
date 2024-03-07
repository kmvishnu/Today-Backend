import express from "express";
import { appRoutes } from "./routes/allRoutes";
import dotenv from "dotenv";
import { MiddleWareCollections } from "./middlewares";
import { todoRoutes } from "./routes/todoRoutes";
import { tempRoutes } from "./routes/tempRoutes";
// import "./jobs/todoReset";
import cors from "cors";
import { v2Routes } from "./routes/v2Routes";
import { db} from './common/db.config'

const app = express();
dotenv.config();

MiddleWareCollections.essentials(app);
app.use(cors());
app.use("/temp", tempRoutes);
app.use("/account", appRoutes);
app.use("/todo", todoRoutes);
app.use("/v2",v2Routes)

const PORT = process.env.PORT || 3300;
db.then(()=>{
  console.log("Mongooose");
  
})
app.listen(PORT, () => {
  return console.log(`Express is listening at http://localhost:${PORT}`);
});
