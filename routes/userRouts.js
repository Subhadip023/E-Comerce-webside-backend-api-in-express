import { Router } from "express";
import User from "../models/userModel.js";

const router = Router();

router.get('/', (req, res) => {
  res.json("This is User Route");
});

router.post('/register', async (req, res, next) => {
  try {
    // console.log(req.body)
    const { name, email, password, avatar, address } = req.body;
    if (!name || !email || !password || !avatar || !address) {
      return res.status(422).json("Fill in all fields.");
    }

    const newUser = await User.create({
      name, email, password, address, avatar
    });

    res.status(201).json(`New User ${newUser.name} Registered`);
  } catch (error) {
    res.status(500).json("User registration failed. Please try again later.");
  }
});

export default router;
