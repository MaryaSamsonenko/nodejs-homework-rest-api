const { User } = require("../../models/user");

const { RequestError } = require("../../helpers");

const verify = async (req, res, next) => {
  const { verificationToken } = req.params;
  try {
    const user = await User.findOne({ verificationToken });
    if (!user) {
      throw RequestError(404);
    }
    await User.findByIdAndUpdate(user._id, {
      verify: true,
      verificationToken: "",
    });
    res.status(200).json({
      message: "Email verify success",
    });
  } catch (error) {
    next(error);
  }
};
module.exports = verify;
