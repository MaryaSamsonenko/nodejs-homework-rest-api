const { User } = require("../../models/user");

const logout = async (req, res, next) => {
  const { _id } = req.user;
  try {
    await User.findByIdAndUpdate(_id, { token: null });

    res.status(200).json({
      message: "Logout success",
    });
  } catch (error) {
    next(error)
  }
  
};

module.exports = logout;
