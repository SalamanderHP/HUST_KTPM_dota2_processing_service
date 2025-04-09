const axios = require("axios");
const {LOL_ROUTING, LOL_API_KEY} = require("../../consts/api.const");

const lolInstance = axios.create({
  baseURL: LOL_ROUTING.host,
  headers: {
    "X-Riot-Token": LOL_API_KEY,
    "Accept-Charset": "application/x-www-form-urlencoded; charset=UTF-8",
    "Accept-Language": "en-US,en;q=0.9,vi;q=0.8",
  },
});

const get = async (url) => {
  return await lolInstance.get(url);
};

module.exports = {
  lolInstance,
  get,
};
