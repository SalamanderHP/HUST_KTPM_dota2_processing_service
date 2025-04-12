require("dotenv").config();
const CronJob = require("cron").CronJob;
const db = require("../configs/db/mongo/index");
const {pullMessage} = require("../configs/pubsub");
db.connect();

const job = new CronJob("*/10 * * * * *", async function () {
  console.log("Pulling DOTA2 data...");
  let data = await pullMessage(50);
  if (!data) return;

  data.forEach((msg) => {
    const message = msg.message;
    const dataString = message.data.toString();
    let dataJson = null;
    try {
      dataJson = JSON.parse(dataString);
    } catch (err) {
      console.error("Invalid JSON:", err);
    }

    const attributes = message.attributes || {};

    console.log("JSON:", dataJson);
    console.log("Attributes:", attributes);
  });
});

job.start();
