module.exports = (io, cruds) =>
{
 io.on("connection", function(socket){
   
   if (socket.handshake.session.user)
   {
    socket.user = socket.handshake.session.user;
    console.log(socket.user.username + " se ha conectado.");
    console.log(socket.user);
   }
   else
   {
    console.log("Ha habido un problema con el inicio de sesion");
    return;
   }
   
   socket.on("RequestCrops", function()
   {
    console.log(socket.id+" has requested to load crops");
    cruds.CropCRUD.getByCreator(socket.user._id).then(data =>{
      socket.emit("LoadCrops", data);
    })
   })
   
   socket.on("DeleteCrop", function(id){
    cruds.CropCRUD.destroy(id);
   })
   
   
 })
}