module.exports = (app, crud) =>
{  
 app.get("/", function(req, res) {
  if (req.session.loggedin)
  {
   res.sendFile(app.root+"/views/index.html");
  }
  else
  {
   res.redirect("/login")
  }
 });
  
 app.get("/login", function(req, res) {
  res.sendFile(app.root+"/views/login.html");
 });
 app.get("/register", function(req, res) {
  res.sendFile(app.root+"/views/register.html");
 });
  
 app.post("/authlogin", async function(req, res) 
 {
	var username = req.body.username;
	var password = req.body.password;
	let user = await crud.UserCRUD.getByUsername(username);
  if (user == null) {res.redirect("/login?NO_EXISTE_EL_USUARIO");} else
  {
   if (user.password == password)
   {
    req.session.loggedin = true;
    req.session.user = {
      _id: user._id,
      username: user.username,
      name: user.name,
      lastname: user.lastname
    };
    res.redirect("/");
   }
   else
   {
    res.redirect("/login?CONTRASEÑA_INCORRECTA");  
   }
  }
 });
  
 app.post("/authregister", function(req, res) 
 {        
  var name = req.body.name;
  var lastname = req.body.lastname;
  var phone = req.body.phone;
  var email = req.body.email;
	var username = req.body.username;
	var password = req.body.password;
	
  crud.UserCRUD.create(name, lastname, phone, email, username, password).then(data =>{
    if (data == true) {res.redirect("/login")} else {res.redirect("/register?ERROR._INTENTE_DE_NUEVO")}
   }
  )
 });
  
 app.post("/logout", async function(req, res) {        
 req.session.loggedin = false;
 req.session.user = null;
 res.redirect("/login");
 });
  
 app.post("/cultivar", function(req, res) 
 {        
  if (req.session.loggedin)
  {
   var name = req.body.name;
   var type = req.body.type;
   var seedDate = new Date(req.body.seedDate);
   var harvestDate = new Date(req.body.harvestDate);
   var location = req.body.location;
    
   crud.CropCRUD.create(name, type, location, seedDate, harvestDate, req.session.user).then(data =>{
    if (data == true) {res.redirect("/?Cultivo_registrado.")} else {res.redirect("/?Error._Intente_de_nuevo.")}
   }
  )
  }
  else
  {
   res.redirect("/login?ERROR._NO_HA_INICIADO_SESION");
  }
 });
}