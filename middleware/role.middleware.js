const authorizeByRole = (...allowedRoles) => {
  return (req, res, next) => {
    try {
      const userRole = req.user.role; // Assigning user role from request object (set by auth middleware)
      if (!allowedRoles.includes(userRole)) {
        return res.status(403).json({
          success: false,
          message:
            "Forbidden: You don't have permission to access this resource",
        });
      }
      next();
    } catch (error) {
      next(error);
    }
  };
};
export default authorizeByRole;
