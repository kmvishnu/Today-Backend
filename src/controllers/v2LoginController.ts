import jwt from "jsonwebtoken";
import { Config } from "../common/config";
import bcrypt from "bcryptjs";
import { QueryTypes } from "sequelize";
import { verifyUser } from "../Components/v2UserComponent";
import { saveRefreshToken, verifyRefreshToken } from "../common/redisClient";


export const login = async (req, res) => {
  const { email, password } = req.body;


  try {
    const user:any = await verifyUser(email)
    

    if (user === null) {
      return res.status(401).json({ error: "Invalid email or password" }); // Return unauthorized response
    }
    
    
    const hashedPassword = user?user.password:'';
    

    const passwordMatch = await bcrypt.compare(password, hashedPassword);

    if (!passwordMatch) {
      return res.status(401).json({ error: "Invalid email or password" }); // Return unauthorized response
    }

    const jwtSecretKey = process.env.JWT_SECRET_KEY;
    const jwtRefreshKey = process.env.JWT_REFRESH_KEY;

    const data = {
      time: Date(),
      name: user.name,
      id: user._id,
      exp: Math.floor(Date.now() / 1000) + Number(process.env.EXPIRESIN),
    };

    const refreshData = {
      time: Date(),
      name: user.name,
      id: user._id,
      exp: Math.floor(Date.now() / 1000) + Number(process.env.REFRESH_TOKEN_EXPIRESIN),
    };
    const token = jwt.sign(data, jwtSecretKey);
    const refreshToken = jwt.sign(refreshData, jwtRefreshKey);
    saveRefreshToken(refreshToken, user._id, Number(process.env.REFRESH_TOKEN_EXPIRESIN));

    res.status(200).json({ status: "success", token , refreshToken, name:user?user.name:''});
  } catch (error) {
    console.error("Error during login:", error);
    return res.status(500).json({ error: "Internal server error" }); // Return generic error response
  }
};

export const profile = (req, res) => {
  const decodedToken = req["user"];

  res.status(200).json({ name: decodedToken.name });
};

export const signUp = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const existingUserRows = await Config.MySqlDB.query(
      "SELECT id FROM testUsers WHERE email =:email ",
      { replacements: { email: email }, type: QueryTypes.SELECT }
    );

    if (existingUserRows.length > 0) {
      return res.status(400).json({ error: "Email already exists" }); // Return error response
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert user information into the users table
    await Config.MySqlDB.query(
      "INSERT INTO testUsers (name, email, password) VALUES (:name, :email, :password)",
      { replacements: { email: email, name: name, password: hashedPassword } }
    );

    return res.status(201).json({ message: "User signed up successfully" }); // Return success response
  } catch (error) {
    console.error("Error signing up user:", error);
    return res.status(500).json({ error: "Internal server error" }); // Return generic error response
  }
};

export const refreshToken = async (req, res) => {
  const { refreshToken } = req.body; // Extract the refreshToken from the request body
  const jwtSecretKey = process.env.JWT_SECRET_KEY;
  const jwtRefreshKey = process.env.JWT_REFRESH_KEY;
  if (!refreshToken) return res.status(401); // If no refreshToken is provided, send a 401 Unauthorized status

  // Verify the refresh refreshToken using Redis
  const userId = await verifyRefreshToken(refreshToken);
  if (!userId) return res.status(403); // If the refreshToken is not valid, send a 403 Forbidden status

  // Verify the refresh refreshToken's integrity
  jwt.verify(refreshToken, jwtRefreshKey, async (err, user) => {
    if (err || !user) return res.status(403); // If token verification fails, send a 403 Forbidden status

    console.log(user);
    
   
    const data = {
      time: Date(),
      name: user.name,
      id: user.id,
      exp: Math.floor(Date.now() / 1000) + Number(process.env.EXPIRESIN),
    };

    const token = jwt.sign(data, jwtSecretKey);

    // Respond with the new access token and the new refresh token (optional)
    res.json({ token});
  });
};