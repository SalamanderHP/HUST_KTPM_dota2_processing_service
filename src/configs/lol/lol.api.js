const {LOL_API_KEY} = require("../../consts/api.const");
const {get} = require("./api.lib");

// https://asia.api.riotgames.com/lol/match/v5/matches/by-puuid/VN2_809074725/ids?start=0&count=20&api_key=
const getLolUserMatches = async (puuid) => {
  try {
    if (!puuid) {
      return null;
    }

    let url = `/lol/match/v5/matches/by-puuid/${puuid}/ids?start=0&count=20`;
    let result = await get(url);
    return result;
  } catch (error) {
    throw error;
  }
};

const getLolMatchDetails = async (matchId) => {
  try {
    if (!matchId) {
      return null;
    }

    let url = `/lol/match/v5/matches/${matchId}`;
    let result = await get(url);
    return result;
  } catch (error) {
    throw error;
  }
};

const getLolAccountInfo = async (gameName, tagLine) => {
  try {
    if (!gameName || !tagLine) {
      return null;
    }
    let encodedGameName = encodeURIComponent(gameName);
    let encodedTagLine = encodeURIComponent(tagLine);

    let url = `/riot/account/v1/by-riot-id/${encodedGameName}/${encodedTagLine}`;
    let result = await get(url);
    return result;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getLolMatchDetails,
  getLolUserMatches,
  getLolAccountInfo,
};
