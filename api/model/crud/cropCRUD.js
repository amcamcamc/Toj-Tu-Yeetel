const Usuario = require("../schemas/User");
const Cultivo = require("../schemas/Crop");
const Reporte = require("../schemas/Report");

function create(name, type, location, seedDate, harvestDate, creator) {
 var crop = new Cultivo
 (
  {
   name: name,
   type: type,
   location: location,
   seedDate: seedDate,
   harvestDate: harvestDate,
   creator: creator
  }
 )
 return crop.save().then(function (savedData) {
  return true;
 }).catch(function (e) {
  console.log("Error saving crop. "+e);
  return false;
 });
}

function destroy(id){
 Cultivo.findOne({ _id: id }, function(e, crop){
   crop.remove();
 });
}

async function getByName(name) {
 let crop = await Cultivo.findOne({ name: name }).lean().exec();
 return crop;
}

async function getByCreator(id) {
 let crop = await Cultivo.find({ creator: id }).lean().exec();
 return crop;
}

module.exports =
{
 create,
 destroy,
 getByName,
 getByCreator
}