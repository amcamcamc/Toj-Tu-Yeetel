const Usuario = require("../schemas/User");
const Cultivo = require("../schemas/Crop");
const Reporte = require("../schemas/Report");

function create(name, description, type, creator) {
 var report = new Reporte
 (
  {
   title: name,
   description: description,
   type: type,
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

function destroy(id){
 Reporte.findOne({ _id: id }, function(e, report){
   report.remove();
 });
}

async function getAll()
{
 let reports = await Reporte.find().populate("creator").lean().exec();
 return reports;
}

async function getByCreator(id) {
 let report = await report.findById({ creator: id }).populate("creator").lean().exec();
 return report;
}

module.exports =
{
 create,
 destroy,
 getAll,
 getByCreator
}