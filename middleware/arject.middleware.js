import aj from "../config/arject.js";

const arjectMiddleware = async (req, res, next) => {
  try {
    const decision = await aj.protect(req);

    // 🚫 If blocked
    if (decision.isDenied()) {
      // 🛡️ Rate limit
      if (decision.reason.isRateLimit()) {
        return res.status(429).json({
          success: false,
          message: "Too many requests. Please try again later.",
        });
      }

      // 🤖 Bot detection
      if (decision.reason.isBot()) {
        return res.status(403).json({
          success: false,
          message: "Forbidden: Bot traffic is not allowed.",
        });
      }

      // ⚠️ Generic fallback
      return res.status(403).json({
        success: false,
        message: "Access denied",
      });
    }

    // ✅ Allowed → go to next middleware
    next();
  } catch (error) {
    console.error("Error in arject middleware:", error);
    next(error);
  }
};

export default arjectMiddleware;
