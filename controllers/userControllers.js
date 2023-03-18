const userModel = require("../models/user");
const bcryptJs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const chattabError = require("../middlewares/error");
const login = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const fetchedUser = await userModel.findOne({
      $or: [{ email }, { username }],
    });
    if (!fetchedUser) {
      throw new chattabError("Invalid username or email", 401);
    }
    const isMatch = bcryptJs.compareSync(password, fetchedUser.password);
    if (!isMatch) {
      throw new chattabError("Invalid password", 401);
    }
    const payload = { sub: fetchedUser._id, role: "user" };
    const token = jwt.sign(payload, process.env.CHATTAB_SECRET,{
      expiresIn: "7d",
    });
    await userModel.findByIdAndUpdate(fetchedUser._id, {
      $set: { status: true },
    });
    res.status(200).json({ token });
  } catch (error) {
    res.status(error.code || 500).json({ message: error.message });
  }
};

const register = async (req, res) => {
  try {
    const {
      username,
      password,
      firstName,
      lastName,
      birthDate,
      profilePicture,
      email,
      phoneNumber,
    } = req.body;
    const fetchedUser = await userModel.findOne({
      $or: [{ email }, { username }],
    });
    if (fetchedUser) {
      throw new chattabError("User already exists", 409);
    }
    const hashedPassword = bcryptJs.hashSync(password, 10);
    const user = await userModel.create({
      username,
      password: hashedPassword,
      firstName,
      lastName,
      birthDate: new Date(birthDate),
      profilePicture,
      email,
      phoneNumber,
    });
    res.status(200).json({ user });
  } catch (error) {
    res.status(error.code || 500).json({ message: error.message });
  }
};

const logout = async (req, res) => {
  try {
    const { _id } = req.user;
    const user = await userModel.findByIdAndUpdate(_id, { $set: { status: false } });
    if (!user) {
      throw new chattabError("User not found", 404);
    }
    res.status(200).json({ message: "User logged out" });
  } catch (error) {
    res.status(error.code || 500).json({ message: error.message });
  }
}

const profile = async (req, res) => {
  try {
    if (!req.user) {
      throw new chattabError("User not found", 404);
    }
    res.status(200).json(req.user);
  } catch (error) {
    res.status(error.code || 500).json({ message: error.message });
  }
};

module.exports = {
  login,
  register,
  logout,
  profile
};
