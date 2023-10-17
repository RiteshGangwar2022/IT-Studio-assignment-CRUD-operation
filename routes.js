const express = require("express");
const router = new express.Router();
const User = require("./Database/Modals/User.js");
const nodemailer = require('nodemailer');
require('dotenv').config(); 

router.post("/register", async (req, res) => {
  const { name, phone, email, hobbies } = req.body;

  //checking if any of the input is not filled
  if (!name || !email || !phone || !hobbies) {
    res.status(422).json({ error: "fill all the data properly" });
  }

  try {
    const newuser = new User({ name, phone, email, hobbies });
    const data = await newuser.save();
    res.status(201).json(data);
  } catch (err) {
    res.status(422).send(err);
  }
});

router.get("/api/data", async (req, res) => {
  try {
    const data = await User.find({});
    res.status(201).json(data);
  } catch (err) {
    res.status(422).send(err);
  }
});

router.delete("/api/deleteuser/:userId", async (req, res) => {
  const userId = req.params.userId;
  // console.log(userId)

  try {
    const deletedUser = await User.findByIdAndRemove(userId);

    if (!deletedUser) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "An error occurred" });
  }
});

router.put("/api/update/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, phone, hobbies } = req.body;
   
    const user = await User.findByIdAndUpdate(
      id,
      { name, email, phone, hobbies },
      { new: true }
    );

    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

const PASSKEY=process.env.PASSKEY;

const transporter = nodemailer.createTransport({
 
    service: "gmail",
    auth: {
      user: "riteshgangwar2020@gmail.com",
      pass: PASSKEY,
    },
  });

router.post("/api/sendemail", (req, res) => {

  const data= req.body;
 // console.log(data);
  //console.log(req.body);

  if (!Array.isArray( data)) {
    
    return res.status(400).json({ message: "Invalid data format" });
  }

  
  const emailContent =  data
    .map((row) => {
      return `
      Name: ${row.name}
      Email: ${row.email}
      Phone: ${row.phone}
      Hobbies: ${row.hobbies}
      -------------------------
    `;
    })
    .join("\n");
 
    // console.log(emailContent);

  const mailOptions = {
    from: "riteshgangwar2020@gmail.com",
    to: "info@redpositive.in",
    subject: "User data from ITSTUDIO website by Ritesh Gangwar",
    text: emailContent,
  };

  transporter.sendMail(mailOptions, (error) => {
    if (error) {
      res.status(500).json({ message: "Email sending failed" });
    } else {
    
      res.status(200).json({ message: "Email sent successfully" });
    }
  });
});

module.exports = router;
