const axios = require("axios");
const {API_AUTH_KEY} = require("../../consts/api.const");

const InstanceType = {
  STEAM_POWERED: 1,
  OPEN_DOTA: 2,
};

const instance = axios.create({
  baseURL: "https://api.steampowered.com/",
  timeout: 30000,
  headers: {
    "X-Custom-Header": "foobar",
    Accept: "application/vnd.api+json",
  },
});

const openDotaInstance = axios.create({
  baseURL: "https://api.opendota.com/api/",
  timeout: 30000,
  headers: {
    "X-Custom-Header": "foobar",
    Accept: "application/vnd.api+json",
  },
});

const get = async (
  url,
  authen = false,
  type = InstanceType.STEAM_POWERED,
  repeat = 3
) => {
  let getInstance =
    type === InstanceType.STEAM_POWERED ? instance : openDotaInstance;

  getInstance.interceptors.request.use(
    function (req) {
      req.time = {startTime: new Date()};
      if (authen) {
        req.headers["Authorization"] = "Bearer " + API_AUTH_KEY;
      }
      return req;
    },
    (err) => {
      return Promise.reject(err);
    }
  );

  getInstance.interceptors.response.use(
    async (res) => {
      res.config.time[`endTime`] = new Date();
      res.duration = res.config.time.endTime - res.config.time.startTime;
      return res;
    },
    async (err) => {
      // console.log(err)
      return Promise.reject(err);
    }
  );

  return await getInstance.get(url);
};

module.exports = {
  get,
  InstanceType,
};
