const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema
(
 {
  name:
  {
   type: String, 
  },
  lastname:
  {
   type: String,
  },
  phone:
  {
   type: String,  
  },
  email:
  {
   type: String,
  },
  username:
  {
   type: String,
  },
  password:
  {
   type: String,
  },
 }
)

module.exports = mongoose.model("USUARIO", UserSchema, "usuarios")