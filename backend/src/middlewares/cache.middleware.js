const redis = require("../config/cache");

const cacheMiddleware = (keyGenerator, ttl = 60) => {
    return async (req, res, next) => {
        try {
            // 🔑 dynamic key generate
            const cacheKey = keyGenerator(req);

            const cachedData = await redis.get(cacheKey);

            if (cachedData) {
                console.log("✅ CACHE HIT");
                return res.status(200).json(JSON.parse(cachedData));
            }

            console.log("❌ CACHE MISS");

            // 🔥 response intercept karenge
            const originalJson = res.json.bind(res);

            res.json = (data) => {
                // cache me store karo
                redis.setex(cacheKey, ttl, JSON.stringify(data));

                return originalJson(data);
            };

            next();
        } catch (err) {
            console.log(err)
            next(err);
        }
    };
};

module.exports = cacheMiddleware;