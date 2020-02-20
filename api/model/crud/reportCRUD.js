const Usuario = require("../schemas/User");
const Cultivo = require("../schemas/Crop");
const Reporte = require("../schemas/Report");

function create(name, description, type, date, creator) {
 var report = new Reporte
 (
  {
   name: name,
   description: description,
   type: type,
   date: date,
   creator: creator
  }
 )
 return report.save().then(function (savedData) {
  return true;
 }).catch(function (e) {
  console.log("Error saving report. "+e);
  return false;
 });
}

async function getByCreator(id) {
 let report = await report.findById({ creator: id }).lean().exec();
 return report;
}

module.exports =
{
 create,
 getByCreator
}