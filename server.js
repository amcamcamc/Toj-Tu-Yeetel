const express = require("express");
const app = express();
app.root = __dirname;
const http = require("http").Server(app);

const io = require("socket.io")(http);
const bodyParser = require("body-parser");

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
mongoose.set("useFindAndModify", false);

const UserCRUD = require("./api/model/crud/userCRUD");
const CropCRUD = require("./api/model/crud/cropCRUD");
const ReportCRUD = require("./api/model/crud/reportCRUD");

const CRUDs =
{
 UserCRUD,
 CropCRUD,
 ReportCRUD
}

const port = process.env.PORT || 3000;

const session = require("express-session");
const sharedsession = require("express-socket.io-session");

app.use(express.static("public"));
app.use("/views", express.static("views"));
app.use(bodyParser.urlencoded({ extended: false }));

var esession = session({
	secret: "churrumais",
	resave: true,
	saveUninitialized: true
})

app.use(esession);

io.use(sharedsession(esession, {autoSave: true,}));

require("./api/controller/serverSocket")(io, CRUDs);
require("./api/routes/routes")(app, CRUDs);

mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser: true, useUnifiedTopology: true})
.then(()=>
      {
       http.listen(port, function(){
         console.log("Server listening. Port: "+port);
         console.log("Database ready: "+mongoose.connection.readyState);
       })
      }
     ).catch((e) => 
             {
              console.log("Error connecting to the database: "+e.message);
              process.exit(1);
             }
            )