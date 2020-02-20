const mongoose = require("mongoose");

const CropSchema = new mongoose.Schema
(
 {
  name:
  {
   type: String, 
  },
  type:
  {
   type: String,
  },
  location:
  {
   type: String,
  },
  seedDate:
  {
   type: Date,
   default: Date.now,
  },
  harvestDate:
  {
   type: Date,
   default: Date.now,
  },
  creator:
  {
   type: mongoose.Schema.Types.ObjectId,
   ref: "USUARIO",
  }
 }
)

module.exports = mongoose.model("CULTIVO", CropSchema, "cultivos")