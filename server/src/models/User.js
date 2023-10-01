import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  name: {
    type: String,
    min:3,
    max:30
  },

  username: {
    type: String,
    required: true,
    min: 3,
    max: 35,
  },

  password: {
    type: String,
    required: true,
    min: 3,
    max: 35,
  },

  email: {
    type: String,
    required: true,
    min: 5,
    max: 35,
  },
  todos: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Todo",
    },
  ],

  date: {
    type: Date,
    default: Date.now(),
  },
});

export default mongoose.model("User", userSchema);
