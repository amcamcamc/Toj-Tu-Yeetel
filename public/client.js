//Contiene funciones para obtener fecha,eliminar cosecha y reporte de plaga,cargar cosechas y reportes de plaga.

function formatDate(date) 
{
 var monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
 return date.getDate()+" "+monthNames[date.getMonth()]+" "+date.getFullYear();
}

function deleteCrop(id)
{
 socket.emit("DeleteCrop", id);
}

function deleteReport(id, creator)
{
 socket.emit("DeleteReport", id, creator, socket.id);
}

function loadCrop(entry)
{
 var row = document.createElement("tr");
  
   var name_cell = document.createElement("td");
   var name = document.createTextNode(entry.name);
   name_cell.appendChild(name);
  
   var type_cell = document.createElement("td");
   var type = document.createTextNode(entry.type);
   type_cell.appendChild(type);
  
   var sDate_cell = document.createElement("td");
   var sDate = document.createTextNode(formatDate(new Date(entry.seedDate)));
   sDate_cell.appendChild(sDate);
  
   var hDate_cell = document.createElement("td");
   var hDate = document.createTextNode(formatDate(new Date(entry.harvestDate)));
   hDate_cell.appendChild(hDate);
  
   var location_cell = document.createElement("td");
   var location = document.createTextNode(entry.location);
   location_cell.appendChild(location);
  
   var progress_cell = document.createElement("td");
   var progress_bar = document.createElement("div");
   progress_bar.classList.add("meter");
   var progress_fill = document.createElement("span");
  
   var start = new Date(entry.seedDate),
   end = new Date(entry.harvestDate), 
   today = new Date();

   var timeBetweenStartAndEnd = (end - start); 
   var timeBetweenStartAndToday = (today - start);

   var progress = Math.round(timeBetweenStartAndToday / timeBetweenStartAndEnd * 100)+"%"; 
   progress_fill.style.width = progress;
   progress_bar.appendChild(progress_fill);
   progress_cell.appendChild(progress_bar);
  
   var button_cell = document.createElement("td");
   var deleteEntry = document.createElement("button");
   deleteEntry.classList.add("button_delete"); //Make our button a specific kind of button
   deleteEntry.textContent = "ELIMINAR"
   deleteEntry.setAttribute("cropId", entry._id); //Link RoomId with the button
   deleteEntry.onclick = function () { deleteCrop(entry._id) };
   button_cell.appendChild(deleteEntry);
  
 row.appendChild(name_cell);
 row.appendChild(type_cell);
 row.appendChild(sDate_cell);
 row.appendChild(hDate_cell);
 row.appendChild(location_cell);
 row.appendChild(progress_cell);
 row.appendChild(button_cell);
  
 var table = document.getElementById("tablaCosechas");
 table.appendChild(row);
}

function loadReport(entry)
{
 var row = document.createElement("tr");
  
   var title_cell = document.createElement("td");
   var title = document.createTextNode(entry.title);
   title_cell.appendChild(title);
  
   var type_cell = document.createElement("td");
   var type = document.createTextNode(entry.type);
   type_cell.appendChild(type);
  
   var description_cell = document.createElement("td");
   var description = document.createTextNode(entry.description);
   description_cell.appendChild(description);
  
   var creator_cell = document.createElement("td");
   var creator = document.createTextNode(entry.creator.name + " "+entry.creator.lastname);
   creator_cell.appendChild(creator);
  
   var sDate_cell = document.createElement("td");
   var sDate = document.createTextNode(formatDate(new Date(entry.date)));
   sDate_cell.appendChild(sDate);
  
   var button_cell = document.createElement("td");
   var deleteEntry = document.createElement("button");
   deleteEntry.classList.add("button_delete");
   deleteEntry.textContent = "ELIMINAR"
   deleteEntry.setAttribute("cropId", entry._id);
   deleteEntry.setAttribute("creator", entry.creator._id);
   deleteEntry.onclick = function () { deleteReport(entry._id, entry.creator._id) };
   button_cell.appendChild(deleteEntry);
  
 row.appendChild(title_cell);
 row.appendChild(type_cell);
 row.appendChild(description_cell);
 row.appendChild(sDate_cell);
 row.appendChild(creator_cell);
 row.appendChild(button_cell);
  
 var table = document.getElementById("tablaReportes");
 table.appendChild(row);
}

var socket = io();

function requestCrops()
{
 socket.emit("RequestCrops");
}

function requestReports()
{
 socket.emit("RequestReports");
}

function requestMapCrops()
{
 socket.emit("RequestMapCrops");
}

socket.on
("LoadCrops",
 function(data)
 {
  if (!data) return; 
  data.forEach
  (function(entry)
   {
    loadCrop(entry);
   }
  );
 }
)

socket.on
("LoadReports",
 function(data)
 {
  if (!data) return; 
  data.reverse();
  data.forEach
  (function(entry)
   {
    loadReport(entry);
   }
  );
 }
)
