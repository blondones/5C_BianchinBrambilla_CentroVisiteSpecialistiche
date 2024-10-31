const createTable = (parentElement) => {
  let availabilityData = {};
  const roomConfig = {
    singola: 10,
    doppia: 5,
    suite: 3
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

  const initializeAvailability = () => {
    const dates = fDates();
    for (let i = 0; i < dates.length; i++) {
      availabilityData[dates[i]] = {
        singola: roomConfig.singola,
        doppia: roomConfig.doppia,
        suite: roomConfig.suite
      };
    }
  };

  const renderTable = () => {
    let tableHTML = 
      "<table border='1'>" +
        "<thead>" +
          "<tr>" +
            "<th></th>" +
            "<th>Lunedì</th>" +
            "<th>Martedì</th>" +
            "<th>Mercoledì</th>" +
            "<th>Giovedì</th>" +
            "<th>Venerdì</th>" +
          "</tr>" +
        "</thead>" +
        "<tbody>";

    for (let i = 8; i <= 12; i++) {
      tableHTML += 
        "<tr>" +
          "<td>" + i + "</td>" +
          "<td></td>" +
          "<td></td>" +
          "<td></td>" +
          "<td></td>" +
          "<td></td>" +
        "</tr>";
    }

    tableHTML +=
      "</tbody>" +
      "</table>";

    parentElement.innerHTML = tableHTML;
  };

  initializeAvailability();
  renderTable();
};

// Utilizzo della funzione createTable
createTable(document.querySelector('#tableDiv'));
