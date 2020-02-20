const mongoose = require("mongoose");

const ReportSchema = new mongoose.Schema
(
 {
  title:
  {
   type: String, 
  },
  description:
  {
   type: String,
  },
  type:
  {
   type: String,
  },
  date:
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

module.exports = mongoose.model("REPORTE", ReportSchema, "reportes")