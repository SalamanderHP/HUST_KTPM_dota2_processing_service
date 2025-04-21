require("dotenv").config();
const CronJob = require("cron").CronJob;
const {pullMessage} = require("../../configs/pubsub");
const db = require("../../configs/db/mongo/index");
const {
  RETRIEVING_SERVICE_SENDER,
  SUBSCRIPTION,
} = require("../../consts/pubsub.const");
const MatchDetails = require("../../entities/match_details.entity");
const Match = require("../../entities/matches.entity");
const {getLolMatchDetails} = require("../../configs/lol/lol.api");
db.connect();

const transformMatchDetail = (matchData, matchInfo) => {
  if (!matchData) return;
  let userDataFound = matchData?.players?.find(
    (player) => player.account_id == matchInfo?.game_account?.ingame_id
  );
  if (!userDataFound) return;

  return {
    matchData: {
      match_id: matchInfo.match_info?.match_id,
      game_account: matchInfo?.game_account?._id,
      game: matchInfo?.game_account?.game?._id,
    },
    matchDetailData: {
      game: matchInfo?.game_account?.game?._id,
      matchInfo: {
        kills: userDataFound?.kills,
        assists: userDataFound?.assists,
        deaths: userDataFound?.deaths,
        gold: userDataFound?.total_gold || userDataFound?.gold,
        level: userDataFound?.level,
        tower_damage: userDataFound?.tower_damage,
        team: userDataFound?.isRadiant ? "radiant" : "dire",
        win: userDataFound?.win,
        duration: matchData?.duration,
        game_mode: matchData?.game_mode,
        start_time: matchData?.start_time,
      },
    },
  };
};

const createMatchAndDetail = async (matchData, matchDetailData) => {
  let newMatch = await Match.create([{...matchData}]);
  let newMatchDetail = await MatchDetails.create([
    {
      game: matchDetailData.game,
      match_info: matchDetailData.matchInfo,
      match: newMatch?.[0]?._id,
    },
  ]);
  await Match.findOneAndUpdate(
    {_id: newMatch?.[0]?._id},
    {match_details: newMatchDetail?.[0]?._id}
  );
  return newMatch?.[0];
};

const job = new CronJob("*/30 * * * * *", async function () {
  console.log("Pulling LOL data...");
  let data = await pullMessage(SUBSCRIPTION.LOL, 50, false);
  if (!data) return;

  try {
    data.forEach(async (msg) => {
      const message = msg.message;
      const dataString = message.data.toString();
      let dataJson;
      dataJson = JSON.parse(dataString);
      if (!dataJson) return;

      const attributes = message.attributes || {};
      const existingMatch = await Match.findOne({
        match_id: dataJson?.match_info?.match_id,
      });
      if (existingMatch) return;

      // get match detail from API & transform data
      let matchDetail = await getLolMatchDetails(
        dataJson?.game_account?.ingame_id,
        dataJson?.match_info?.match_id
      );
      if (!matchDetail) return;

      let matchTransformedData = transformMatchDetail(matchDetail, dataJson);
      if (!matchTransformedData) return;

      // create match detail
      let newMatch = await createMatchAndDetail(
        matchTransformedData.matchData,
        matchTransformedData.matchDetailData
      );
      console.log(`Match created: ${newMatch?._id}`);
    });
  } catch (error) {
    console.log("Error", error);
  }
});

job.start();
