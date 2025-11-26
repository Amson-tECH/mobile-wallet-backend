import ratelimite from "../config/upstash.js";

const rateLimiter = async (req, res, next) => {
  try {
    // here kept it simple
    // real world app: for production put the userid or ipAddress as the key
    const { success } = await ratelimite.limit(`${req.ip}`);

    if (!success) {
      return res
        .status(429)
        .json({ message: "Too many request, try again later." });
    }

    next();
  } catch (error) {
    console.log("Rate limit error", error);
    next(error);
  }
};

export default rateLimiter;
