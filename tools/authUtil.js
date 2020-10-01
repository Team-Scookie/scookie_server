const authUtil = {
  successTrue: (message, data) => {
    return {
      success: true,
      message,
      data,
    }
  },
  successFalse: message => {
    return {
      success: false,
      message,
    }
  },
}
module.exports = authUtil
