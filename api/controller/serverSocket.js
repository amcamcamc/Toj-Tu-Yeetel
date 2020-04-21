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
   
   socket.on("RequestMapCrops", function()
   {
    console.log(socket.id+" has requested to load map crops");
    cruds.CropCRUD.getByCreator(socket.user._id).then(data =>{
      socket.emit("LoadMapCrops", data);
    })
   })
   
   socket.on("RequestReports", function()
   {
    console.log(socket.id+" has requested to load reports");
    cruds.ReportCRUD.getAll().then(data =>{
      socket.emit("LoadReports", data);
    })
   })
   
   socket.on("DeleteCrop", function(id){
    cruds.CropCRUD.destroy(id);
   })
   
   socket.on("DeleteReport", function(id, creator, requester){
    console.log("creator "+creator);
    console.log("requester "+io.sockets.connected[requester].user._id);
    if(io.sockets.connected[requester].user._id == creator)
    {
     cruds.ReportCRUD.destroy(id);
    }
    else
    {
     console.log("Not creator of report. Sorry");
    }
   })   
   
 })
}