const Point = require("../models/point")
const { authUtil, responseMessage, statusCode } = require("../tools")

async function updatePoint(req, res) {
    try {
        // update 방식 findbyidupdate? findbyid save return은..?
        await Point.update(req.body)
        return res
            .status(statusCode.OK)
            .send(authUtil.successTrue(responseMessage.X_UPDATE_SUCCESS("POINT")))    
    
    } catch (err) {
        return res
            .status(statusCode.INTERNAL_SERVER_ERROR)
            .send(authUtil.successFalse(responseMessage.INTERNAL_SERVER_ERROR))
    
    }
}

async function deletePoint(req, res) {
    try {
        await Point.deleteOne(req.body)
        return res
            .status(statusCode.OK)
            .send(authUtil.successTrue(responseMessage.X_DELETE_SUCCESS("POINT")))    
    
    } catch (err) {
        return res
            .status(statusCode.INTERNAL_SERVER_ERROR)
            .send(authUtil.successFalse(responseMessage.INTERNAL_SERVER_ERROR))
    
    }
}

module.exports = {
    updatePoint,
    deletePoint
}