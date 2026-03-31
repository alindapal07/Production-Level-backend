import User from "../models/user.model.js";

export const verifyEmail = async (req, res) => {
  try {
    const { token } = req.params;

    //  Find user by token
    const user = await User.findOne({ verificationToken: token });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired verification token",
      });
    }

    //  Verify user
    user.isVerified = true;
    user.verificationToken = null;

    await user.save();

    return res.status(200).json({
      success: true,
      message: "Email verified successfully 🎉",
    });

  } catch (error) {
    console.error("Verify Email Error:", error);

    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};