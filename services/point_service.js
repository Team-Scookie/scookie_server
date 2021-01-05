const fetch = require("node-fetch")
const Point = require("../models/points_model")
const { authUtil, responseMessage, statusCode } = require("../tools")

const baseUrl = "https://dapi.kakao.com/v2/local/"

const read = async () => {
  const res = await Point.find()
  if (!res) {
    return {
      code: statusCode.INTERNAL_SERVER_ERROR,
      json: authUtil.successFalse(responseMessage.NO_X("Point")),
    }
  }
  return {
    code: statusCode.OK,
    json: authUtil.successTrue(responseMessage.X_READ_SUCCESS("Point"), res),
  }
}

const create = async body => {
  const { longitude, latitude, elapsedTime } = body

  const address = await fetch(`${baseUrl}geo/coord2address.json?input_coord=WGS84&x=${longitude}&y=${latitude}`, {
    method: "GET",
    headers: { Authorization: `KakaoAK ${process.env.KAKAO_KEY}` },
  })
  const addressResult = await address.json()

  if (!addressResult.documents) {
    return {
      code: statusCode.BAD_REQUEST,
      json: authUtil.successFalse(responseMessage.OUT_OF_VALUE),
    }
  }

  body.marker = {
    address: addressResult.documents[0].road_address.address_name,
    placeName: "",
    elapsedTime,
  }
  const res = await Point.create(body)
  if (!res) {
    return {
      code: statusCode.INTERNAL_SERVER_ERROR,
      json: authUtil.successFalse(responseMessage.X_CREATE_FAIL("Point")),
    }
  }
  return {
    code: statusCode.CREATED,
    json: authUtil.successTrue(responseMessage.X_CREATE_SUCCESS("Point"), res),
  }
}

const update = async (id, body) => {
  const res = await Point.updateOne({ _id: id }, body)
  if (!res) {
    return {
      code: statusCode.INTERNAL_SERVER_ERROR,
      json: authUtil.successFalse(responseMessage.X_UPDATE_FAIL("Point")),
    }
  }
  return {
    code: statusCode.OK,
    json: authUtil.successTrue(responseMessage.X_UPDATE_SUCCESS("Point")),
  }
}

const deletePoint = async id => {
  const res = await Point.deleteOne({ _id: id })
  if (!res) {
    return {
      code: statusCode.INTERNAL_SERVER_ERROR,
      json: authUtil.successFalse(responseMessage.X_DELETE_FAIL("Point")),
    }
  }
  if (res.deletedCount === 0) {
    return {
      code: statusCode.BAD_REQUEST,
      json: authUtil.successFalse(responseMessage.NO_X("Point")),
    }
  }
  return {
    code: statusCode.OK,
    json: authUtil.successTrue(responseMessage.X_DELETE_SUCCESS("Point")),
  }
}

module.exports = {
  read,
  create,
  update,
  deletePoint,
}
