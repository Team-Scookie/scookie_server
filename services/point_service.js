const Point = require("../models/point")
const { authUtil, responseMessage, statusCode } = require("../tools")

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
  const res = await Point.find(body)
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

const update = async id => {
  const res = await Point.update(id)
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
