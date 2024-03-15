const mongoose = require("mongoose");
const linkRegex = /^https?:\/\//;

const cardSchema = new mongoose.Schema({
  name: {
    type: string,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  link: {
    type: string,
    required: true,
    validate: {
      validator: (v) => {
        return linkRegex.test(v);
      },
      message: (props) => `${props.value} is not a url válido!`,
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  likes: [
    { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  ],
  createdAt: {
    type: Date,
  },
});

module.exports("card", cardSchema);
