const mongoose = require("mongoose")

mongoose.set("useCreateIndex", true)

// Define Schemes
const todoSchema = new mongoose.Schema(
  {
    todoid: { type: Number, required: true, unique: true },
    content: { type: String, required: true },
    completed: { type: String, default: false },
  },
  {
    timestamps: true,
  },
)

// Create new todo document
todoSchema.statics.create = (payload) => {
  // this === Model
  const todo = new this(payload)
  // return Promise
  return todo.save()
}

// Find All
// return promise
// V4부터 exec() 필요없음
todoSchema.statics.findAll = () => this.find({})

// Find One by todoid
todoSchema.statics.findOneByTodoid = (todoid) => this.findOne({ todoid })

// Update by todoid
// { new: true }: return the modified document rather than the original. defaults to false
// eslint-disable-next-line arrow-body-style
todoSchema.statics.updateByTodoid = (todoid, payload) => {
  return this.findOneAndUpdate({ todoid }, payload, { new: true })
}

// Delete by todoid
todoSchema.statics.deleteByTodoid = (todoid) => this.remove({ todoid })

// Create Model & Export

module.exports = mongoose.model("Todo", todoSchema)
