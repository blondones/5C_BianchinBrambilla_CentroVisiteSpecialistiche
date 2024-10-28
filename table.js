let availabilityData = {};

const roomConfig = {  
  singola: 10,
  doppia: 5,
  suite: 3
};

const initializeAvailability = () => {
  const dates = fDates();
  for (let i = 0; i < dates.length; i++) {
    availabilityData[dates[i]] = {
      singola: roomConfig.singola,
      doppia: roomConfig.doppia,
      suite: roomConfig.suite
    };
  }

  sendReservation(availabilityData);
};

const fDates = () => {
  const dates = [];
  const today = new Date();

  for (let i = 0; i < 30; i++) {
    const newDate = new Date();
    newDate.setDate(today.getDate() + i);

    const day = ('0' + newDate.getDate()).slice(-2);
    const month = ('0' + (newDate.getMonth() + 1)).slice(-2);
    const year = newDate.getFullYear();

    const formattedDate = year + "-" + month + "-" + day;
    dates.push(formattedDate);
  }

  return dates;
};

const createTable = (information) => {
  updateTable();
  const div = document.getElementById("TableID");
  let tableHTML = 
    "<table border='1'>" +
      "<thead>" +
        "<tr>" +
          "<th>Data</th>" +
          "<th>Singola</th>" +
          "<th>Doppia</th>" +
          "<th>Suite</th>" +
        "</tr>" +
      "</thead>" +
      "<tbody>";

  const dates = fDates();
  for (let i = 0; i < dates.length; i++) {
    //console.log(information[dates[i]]);
    console.log(i);
    tableHTML += 
      "<tr>" +
        "<td>" + dates[i] + "</td>" +
        "<td>" + information[dates[i]].singola + "</td>" +
        "<td>" + information[dates[i]].doppia + "</td>" +
        "<td>" + information[dates[i]].suite + "</td>" +
      "</tr>";
  }

  tableHTML +=
      "</tbody>" +
    "</table>";

  div.innerHTML = tableHTML;
};

const addReservation = (reservation) => {
  const date = reservation.date;

  if (!availabilityData[date]) {
    console.error("Data " + date + " non trovata nel sistema di disponibilità.");
    return;
  }

  const roomsBooked = reservation.roomsBooked;

  for (let i = 0; i < roomsBooked.length; i++) {
    const roomType = roomsBooked[i].room;
    const quantity = roomsBooked[i].quantity;

    if (availabilityData[date][roomType] < quantity) {
      console.error("Non ci sono abbastanza stanze di tipo " + roomType + " disponibili per la data " + date + ".");
      continue;
    }
    try{
      availabilityData[date][roomType] -= quantity;
    } catch (e){
      console.log(e);
    }
    
  }
  console.log(availabilityData);
  sendReservation(availabilityData);
  createTable(availabilityData);
};

initializeAvailability();
createTable(availabilityData);

const exampleReservation = {
  date: "2024-11-05",
  roomsBooked: [
    { room: "singola", quantity: 2 },
    { room: "suite", quantity: 1 }
  ]
};

addReservation(exampleReservation);
