import User from "../models/user.model";

export const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find().select("-password"); // Exclude password
    if (users.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No users found in the database",
      });
    }
    res.status(200).json({
      success: true,
      data: users,
    });
  } catch (error) {
    next(error);
  }
};

export const getUserById = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).select("-password"); //Exclude Password
    if (!user) {
      return res.status(404).json({
        success: false,
        message: " User not found with the provided ID",
      });
    }
    res.status(200).json({
      success: true,
      message: "User retrieved successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: " User not found with the provided ID",
      });
    }
    res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};
