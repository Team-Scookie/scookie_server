const queryString = require("queryString")
const fetch = require("node-fetch")
const statusCode = require("./statusCode")
const authUtil = require("./authUtil")
const responseMessage = require("./responseMessage")

const baseUrl = "https://dapi.kakao.com/v2/local/"
const COUNT = 10

const kakaoUtil = {
  suggestPlace: async address => {
    const places = await fetch(`${baseUrl}search/keyword.json?size=${COUNT}&sort=accuracy&query=${queryString.parse(address)}`, {
      method: "GET",
      headers: { Authorization: `KakaoAK ${process.env.KAKAO_KEY}` },
    })
    const placeList = await places.json()
    if (!placeList.documents) {
      return {
          code: statusCode.BAD_REQUEST,
          json: authUtil.successFalse(responseMessage.OUT_OF_VALUE),
      }
    }
    return {
      code: statusCode.OK,
      json: authUtil.successTrue(responseMessage.X_READ_SUCCESS("Places"), placeList.documents),
    }
  }
}
module.exports = kakaoUtil
