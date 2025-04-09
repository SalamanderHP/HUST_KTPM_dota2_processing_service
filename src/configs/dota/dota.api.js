const {OPEN_DOTA_KEY} = require("../../consts/api.const");
const {get, InstanceType} = require("./api.lib");

// https://api.opendota.com/api/matches/1271872417
const getMatchDetails = async (matchId) => {
  try {
    if (!matchId) {
      return null;
    }

    let url = OPEN_DOTA_KEY
      ? `matches/${matchId}?api_key=${OPEN_DOTA_KEY}`
      : `matches/${matchId}`;
    let result = await get(url, false, InstanceType.OPEN_DOTA);
    return result;
  } catch (error) {
    throw error;
  }
};

// https://api.opendota.com/api/players/1271872417
const getPlayerDetailOpenDota = async (accountId) => {
  try {
    if (!accountId) {
      return null;
    }

    let url = OPEN_DOTA_KEY
      ? `players/${accountId}?api_key=${OPEN_DOTA_KEY}`
      : `players/${accountId}`;
    let result = await get(url, false, InstanceType.OPEN_DOTA);
    return result;
  } catch (error) {
    throw error;
  }
};

// https://api.opendota.com/api/players/1271872417/matches
const getPlayerMatches = async (accountId, limit = 20) => {
  try {
    if (!accountId) {
      return null;
    }

    let url = OPEN_DOTA_KEY
      ? `players/${accountId}/matches?api_key=${OPEN_DOTA_KEY}&limit=${limit}`
      : `players/${accountId}/matches`;
    let result = await get(url, false, InstanceType.OPEN_DOTA);
    return result?.data;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getMatchDetails,
  getPlayerMatches,
  getPlayerDetailOpenDota,
};
