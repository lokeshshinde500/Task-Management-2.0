import userModel from "../models/userModel.js";
import bcrypt from "bcrypt";
import generateToken from "../utils/generateToken.js";

// register
export const register = async (req, res) => {
  try {
    const { name, email, role, password } = req.body;
    // All fields are required
    if (!name || !email || !role || !password) {
      return res.status(400).json({
        message: "All fields are required!",
        success: false,
      });
    }

    // check valid email address
    const emailRegX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!emailRegX.test(email)) {
      return res.status(400).json({
        message: "invalid email!",
        success: false,
      });
    }

    //is email already registered
    const verifyEmail = await userModel.findOne({ email: email });

    if (verifyEmail) {
      return res.status(400).json({
        message: "Email already registered!",
        success: false,
      });
    }

    // password length >= 3
    if (password.length < 3) {
      return res.status(400).json({
        message: "password must be at least 3 characters!",
        success: false,
      });
    }

    // create new user
    const encryptPass = await bcrypt.hash(password, 10);

    const newUser = {
      name,
      email,
      role,
      password: encryptPass,
    };

    const createUser = await userModel.create(newUser);

    return res.status(201).json({
      message: "User Register successfully.",
      user: { ...createUser._doc, password: "" },
      success: true,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal server error! register user!",
      success: false,
    });
  }
};

// login
export const login = async (req, res) => {
  try {
    const { email, role, password } = req.body;
    // All fields are required
    if (!email || !role || !password) {
      return res.status(400).json({
        message: "All fields are required!",
        success: false,
      });
    }

    // email not registered
    const verifyUser = await userModel.findOne({ email: email });

    if (!verifyUser) {
      return res.status(400).json({
        message: "Email not registered!",
        success: false,
      });
    }

    // valid password
    const verifyPass = await bcrypt.compare(password, verifyUser.password);

    if (!verifyPass) {
      return res.status(400).json({
        message: "Invalid credentials!",
        success: false,
      });
    }

    // valid role
    if (verifyUser.role !== role) {
      return res.status(400).json({
        message: "Account doesn't exists with current role!",
        success: false,
      });
    }

    // valid user
    // generate token
    const token = await generateToken(verifyUser.id);

    return res.status(200).json({
      message: "Login successfully",
      token: token,
      user: { ...verifyUser._doc, password: "" },
      success: true,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal server error! Login!",
      success: false,
    });
  }
};
