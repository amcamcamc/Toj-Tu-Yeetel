const Usuario = require("../schemas/User");
const Cultivo = require("../schemas/Crop");
const Reporte = require("../schemas/Report");

function create(name, lastname, phone, email, username, password) {
 var user = new Usuario
 (
  {
   name: name,
   lastname: lastname,
   phone: phone,
   email: email,
   username: username,
   password: password,
  }
 )
 return user.save().then(function (savedData) {
  return true;
 }).catch(function (e) {
  console.log("Error saving user. "+e);
  return false;
 });
}

async function getByUsername(name) {
 let user = await Usuario.findOne({ username: name }).lean().exec();
 return user;
}

async function getByEmail(mail) {
 let user = await Usuario.findOne({ email: mail }).lean().exec();
 return user;
}

async function getById(id) {
 let user = await Usuario.findById(id).lean().exec();
 return user;
}

module.exports =
{
 create,
 getByUsername,
 getByEmail,
 getById,
}