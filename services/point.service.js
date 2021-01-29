const fetch = require("node-fetch")
const Point = require("../models/points.model")
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
  const { longitude, latitude } = body

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

  // TODO: addressResult.document에 값 없는 경우 예외처리
  const res = await Point.create({
    ...body,
    address: addressResult.documents[0].road_address
      ? addressResult.documents[0].road_address.address_name
      : addressResult.documents[0].address.address_name,
  })
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
  const res = await Point.findOneAndUpdate({ _id: id }, body, { new: true })

  if (!res) {
    return {
      code: statusCode.INTERNAL_SERVER_ERROR,
      json: authUtil.successFalse(responseMessage.X_UPDATE_FAIL("Point")),
    }
  }
  return {
    code: statusCode.OK,
    json: authUtil.successTrue(responseMessage.X_UPDATE_SUCCESS("Point"), res),
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
