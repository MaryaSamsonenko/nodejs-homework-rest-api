const { RequestError, sendEmail } = require("../../helpers");
const bcript = require("bcryptjs");
const gravatar = require("gravatar");
const { nanoid } = require("nanoid");

const { BASE_URL } = process.env;

const { User } = require("../../models/user");

const register = async (req, res, next) => {
  const { email, password, subscription } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user) {
      throw RequestError(409, "Email is use");
    }

    const hashPassword = await bcript.hash(password, 10);
    const avatarURL = gravatar.url(email);
    const verificationToken = nanoid();
    const result = await User.create({
      email,
      password: hashPassword,
      subscription,
      avatarURL,
      verificationToken,
    });
    const mail = {
      to: email,
      subject: "Verify email",
      html: `<a target="_blank" href="${BASE_URL}/api/auth/verify/${verificationToken}">Click to verify you email</a>`,
    };
    await sendEmail(mail);

    res.status(201).json({
      email: result.email,
    });
  } catch (error) {
    next(error);
  }
};
module.exports = register;
