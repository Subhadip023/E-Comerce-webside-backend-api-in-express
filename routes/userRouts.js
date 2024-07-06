import { Router } from "express";
import User from "../models/userModel.js";
import camelCase from "../ownFunctions/camilCase.js";
import transporter from '../ownFunctions/sendMail.js'
import generateOTP from '../ownFunctions/genOtp.js';
import multer from 'multer';
import { v4 as uuidv4 } from 'uuid';


import bcrypt from 'bcrypt';
async function convert_to_hash_s10(password) {
  const hashedPassword = await bcrypt.hash(password, 10); // 10 is the saltRounds parameter
  return hashedPassword;
}

let otp;
let userData = {};

const router = Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, 'Avatar' + '-' +uuidv4()+'.jpg' );
  }
});

const upload = multer({ storage: storage });

router.get('/', (req, res) => {
  res.json("This is User Route");
});

router.post('/register', upload.single('avatar'), async (req, res, next) => {
  try {
    // console.log(req.body);
    const { name, email, confirmEmail, password, confirmPassword, address } = req.body;
    const avatar = req.file;

    if (!name || !email || !confirmEmail || !password || !confirmPassword || !avatar || !address) {
      return res.status(422).json("Fill in all fields.");
    }

    if (password !== confirmPassword) {
      return res.status(402).json("Password not matched.");
    }

    let formattedName = camelCase(name);
    let lowerCaseEmail = email.toLowerCase();

    const emailExist = await User.findOne({ email: lowerCaseEmail });
    if (emailExist) {
      return res.status(422).json("Email already exists.");
    }

    if (email !== confirmEmail) {
      return res.status(422).json("Email not matched.");
    }

    let hashedPassword = await convert_to_hash_s10(password);

    userData = {
      name: formattedName,
      email: lowerCaseEmail,
      password: hashedPassword,
      avatar: avatar.filename,
      address,
      emailVerified: false
    };
    otp = generateOTP(4);

    const mailOptions = {
      from: 'gyaanhub8@gmail.com',
      to: lowerCaseEmail,
      subject: "OTP Verification",
      text: `Hello, ${formattedName}\n\nPlease use the following OTP to verify your account: ${otp}\n\nBest regards,\ Team Subhadip`
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return res.status(500).json("Error sending email.");
      }
      res.status(200).json("OTP sent to email. Verify it.");
    });
  } catch (error) {
    res.status(500).json("User registration failed. Please try again later.");
  }
});

router.post('/verify-email', async (req, res) => {
  try {
    const { otp: userOtp } = req.body;
    if (userOtp === otp) {
      userData.emailVerified = true; // Set emailVerified to true
      const newUser = await User.create(userData);
      if (!newUser) {
        return res.status(500).json("Error adding user.");
      }
      // res.status(201).json(`User ${newUser.name} registered and email verified.`);
      const mailOptions = {
        from: 'gyaanhub8@gmail.com',
        to: userData.email,
        subject: "OTP Verification",
        subject: "Registration Successful",
        text: `Hello, ${newUser.name}\n\nYour email has been successfully verified and your registration is complete.\n\nBest regards,\nTeam Subhadip`
      };
    
  
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          return res.status(500).json("Error sending email.");
        }
        res.status(200).json("sent to email..");
      });
    } else {
      res.status(400).json("Invalid OTP.");
    }
  } catch (error) {
    res.status(500).json("Verification failed. Please try again later.");
  }
});


export default router;