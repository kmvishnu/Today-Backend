import jwt from "jsonwebtoken";

export const validateToken = (req, res, next) => {

    let authToken = req.headers.authorization;

    if (!authToken) {
        res.status(401).json({ status: "failed", message: "Invalid Token!" })
    }
    authToken = authToken.includes("Bearer ")
        ? authToken.split("Bearer ")[1]
        : authToken;

    try {
        const key = process.env.JWT_SECRET_KEY;

        return jwt.verify(authToken, key, (err, decoded) => {
            if (err) {
                console.log(err);
                return res
                    .status(401)
                    .json({ success: false, message: "Invalid token!" });
            }
            req['user'] = decoded;
            return next();
        });

    }
    catch (e) {
        console.log(e);

        return res
            .status(401)
            .json({ success: false, message: "Invalid token!" });
    }
}
