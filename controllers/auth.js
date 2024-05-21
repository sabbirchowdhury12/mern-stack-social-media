import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user.js";

export const register = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      picture,
      friends,
      location,
      occupation,
    } = req.body;

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);
    const newUser = new User({
      firstName,
      lastName,
      email,
      password: passwordHash,
      picturePath: picture,
      friends,
      location,
      occupation,

      viewedProfile: Math.floor(Math.random() * 10000),
      impressions: Math.floor(Math.random() * 10000),
    });
    const savedUser = await newUser.save();
    res.status(201).json({
      status: true,
      message: "user create successfully",
      data: savedUser,
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ status: false, message: "something wrong. try again" });
  }
};

/* LOGGING IN */
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email: email });
    if (!user)
      return res
        .status(400)
        .json({ status: false, msg: "User does not exist. " });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res
        .status(400)
        .json({ status: false, msg: "Invalid credentials. " });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    delete user.password;
    res
      .status(200)
      .json({ status: true, message: "User login successfully", token, user });
  } catch (error) {
    res
      .status(500)
      .json({ status: false, message: "something wrong. try again", error });
  }
};
