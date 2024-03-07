import jwt from "jsonwebtoken";
import { Config } from "../common/config";
import bcrypt from "bcryptjs";
import { QueryTypes } from "sequelize";
import { verifyUser } from "../Components/v2UserComponent";


export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user:any = await verifyUser(email)
    

    if (user === null) {
      return res.status(401).json({ error: "Invalid email or password" }); // Return unauthorized response
    }
    
    console.log("loginn",user);
    
    const hashedPassword = user?user.password:'';
    

    // Compare the provided password with the hashed password
    const passwordMatch = await bcrypt.compare(password, hashedPassword);

    if (!passwordMatch) {
      return res.status(401).json({ error: "Invalid email or password" }); // Return unauthorized response
    }

    const jwtSecretKey = process.env.JWT_SECRET_KEY;
    const data = {
      time: Date(),
      name: user.name,
      id: user._id,
      exp: Math.floor(Date.now() / 1000) + Number(process.env.EXPIRESIN),
    };
    const token = jwt.sign(data, jwtSecretKey);

    res.status(200).json({ status: "success", token: token , name:user?user.name:''});
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
