const mongoose = require("mongoose")
const { MongoMemoryServer } = require("mongodb-memory-server")

const server = new MongoMemoryServer()

// reference: https://dev.to/paulasantamaria/testing-node-js-mongoose-with-an-in-memory-database-32np

const connect = async () => {
  const uri = await server.getUri()

  await mongoose.connect(uri, {
    useNewUrlParser: true,
    autoReconnect: true,
    reconnectTries: Number.MAX_VALUE,
    reconnectInterval: 1000,
  })
}

const close = async () => {
  await mongoose.connection.dropDatabase()
  await mongoose.connection.close()
  await server.stop()
}

const clear = () => {
  const { collections } = mongoose.connection.collections
  const keys = Object.keys(collections)

  keys.map(async key => {
    await collections[key].deleteMany()
  })
}

module.exports = {
  connect,
  close,
  clear,
}
