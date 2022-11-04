const { RequestError } = require("../../helpers");
const bcript = require("bcryptjs");
const gravatar = require("gravatar");
const { User } = require("../../models/user");

const register = async (req, res) => {
  const { email, password, subscription } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw RequestError(409, "Email is use");
  }

  const hashPassword = await bcript.hash(password, 10);
  const avatarURL = gravatar.url(email);
  const result = await User.create({
    email,
    password: hashPassword,
    subscription,
    avatarURL,
  });
  res.status(201).json({
    email: result.email,
  });
};
module.exports = register;
