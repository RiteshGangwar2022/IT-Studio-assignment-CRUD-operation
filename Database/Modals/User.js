const mongoose = require("mongoose");

const Userschema = mongoose.Schema(
  {
    name: { 
        type: String, 
        required: true 
    },
    phone: {
         type: String, 
         required: true 
        },
    email: { 
        type: String,
         required: true
         },
    hobbies: {
         type: String, 
         required: true
         },
  },
  { timestaps: true 
  }
);

const User = mongoose.model("User", Userschema);
module.exports = User;
