import cron from "node-cron";
import { Config } from "../common/config";

const runScheduledJob = async () => {
  try {
    await Config.todosDB.query(
      "DELETE FROM todos WHERE done = 1 AND constant = 0"
    );
    await Config.todosDB.query("UPDATE todos SET done = 0 WHERE constant = 1");

    console.log("Database operations completed successfully at:", new Date());
  } catch (error) {
    console.error("Error performing database operations:", error.message);
  }
};

// Schedule the job to run every day at a specific time (e.g., midnight)
cron.schedule("0 0 * * *", () => {
  runScheduledJob();
});
