const User = require("../models/User");
const { createToken } = require("../services/Token");

async function handleSignup(req, res) {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });

    if (user) {
      return res
        .status(422)
        .json({ message: "User already exist, please login!" });
    }

    await User.create({ username, password });

    return res.status(201).json({ message: "User created successfully!" });
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
}

async function handleLogin(req, res) {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username, password });
    if (!user) {
      return res
        .status(404)
        .json({ message: "User doesn't exist or incorrect password!" });
    }

    const token = createToken(user);

    return res
      .status(200)
      .json({ message: "Logged In Successfully", token: token });
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong!" });
  }
}

async function handleGetUserById(req, res) {
  const id = req.user;
  try {
    const user = await User.findById(id).select("username");
    return res
      .status(200)
      .json({ message: "User fetched successfully", user: user.username });
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong!" });
  }
}

module.exports = {
  handleSignup,
  handleLogin,
  handleGetUserById,
};