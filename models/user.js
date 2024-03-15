const mongoose = require("mongoose");
const linkRegex = /^https?:\/\//;

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 30,
    },
    about: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 30,
    },
    avatar: {
      type: String,
      required: true,
      validate: {
        validator: (v) => {
          return linkRegex.test(v);
        },
        message: (props) => `${props.value} is not a url válido!`,
      },
    },
  },
  { versionKey: false }
);

module.exports = mongoose.model("user", userSchema);
