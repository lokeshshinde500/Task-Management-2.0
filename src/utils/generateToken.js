import jwt from "jsonwebtoken";
import constant from "../config/constant.js";

const generateToken = async (payload) => {
  const token = await jwt.sign({ userId: payload }, constant.JWT_SECRET_KEY, {
    expiresIn: "5h",
  });

  return token;
};

export default generateToken;
