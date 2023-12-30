import cron from "node-cron";
import { Config } from "../common/config";

const runScheduledJob = async () => {
  try {
    await Config.todosDB.query("select * from todos");
    setTimeout(function () {
      dbFunction();
    }, 12000);
  } catch (error) {
    console.error("Error performing database operations:", error.message);
  }
};
const dbFunction = async () => {
  await Config.todosDB.query(
    "DELETE FROM todos WHERE done = 1 AND constant = 0"
  );
  await Config.todosDB.query("UPDATE todos SET done = 0 WHERE constant = 1");

  console.log(
    "Database operations completed successfully at:",
    new Date().toLocaleString()
  );
};

// Schedule the job to run every day at a specific time (e.g., midnight)
cron.schedule("33 12 * * *", () => {
  runScheduledJob();
});
