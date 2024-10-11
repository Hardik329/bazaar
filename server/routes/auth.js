import express from "express";
import User from "../models/User.js";
import CryptoJS from "crypto-js";
import jwt from "jsonwebtoken";
import { uuid } from "uuidv4";
import PasswordReset from "../models/PasswordReset.js";
import { forgotPass } from "../utils/mail.js";

const router = express.Router();

//REGISTER
router.post("/register", async (req, res) => {
  const newUser = new User({
    id: req.body.id,
    username: req.body.username,
    email: req.body.email,
    name: req.body.name,
    lastname: req.body.lastname,
    password: CryptoJS.AES.encrypt(
      req.body.password,
      process.env.PASS_SEC
    ).toString(),
  });

  try {
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(500).json(err);
  }
});

//LOGIN

router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) return res.status(401).json("User does not exist!");

    const hashedPassword = CryptoJS.AES.decrypt(
      user.password,
      process.env.PASS_SEC
    );
    const OriginalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);

    if (OriginalPassword !== req.body.password)
      return res.status(401).json("Wrong credentials!");

    const accessToken = jwt.sign(
      {
        id: user.id,
        isAdmin: user.isAdmin,
      },
      process.env.JWT_SEC,
      { expiresIn: "3d" }
    );

    const { password, ...others } = user._doc;

    res.status(200).json({ ...others, accessToken });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/resetPassword", async (req, res) => {
  try {
    const code = uuid();
    await PasswordReset.create({ code: code, email: req.body.email });
    await forgotPass(
      req.body.email,
      "http://localhost:3000/resetPassword/" + code
    );
    res.status(200).json(code);
  } catch (error) {
    console.log("err: ", error);
    res.status(400).json(error);
  }
});
router.post("/verifyCode", async (req, res) => {
  try {
    if(!req.body.code) return res.status(400).json(new Error("Invalid link")) 
    const doc = await PasswordReset.findOne({ code: req.body.code });
    if(!doc) return res.status(400).json(new Error("Invalid link"))
    
    res.status(200).json(doc.email);
  } catch (error) {
    console.log("err: ", error);
    res.status(400).json(error);
  }
});

export default router;
