const createTable = (parentElement, token) => {
  let availabilityData = {};
  const fetchComponent = generateFetchComponent();
  fetchComponent.build(token);

  const tipologieVisite = ["Cardiologia", "Psicologia", "Oncologia", "Ortopedia", "Neurologia"];
  const daysOfWeek = ["Lunedì", "Martedì", "Mercoledì", "Giovedì", "Venerdì"];
  const timeSlots = [8, 9, 10, 11, 12];
  let currentWeekStartDate = new Date();
  let selectedTipologia = null; 

  const renderButtons = () => {
    let buttonsHTML = '';
    tipologieVisite.forEach(function(tipologia) {
        buttonsHTML += '<button class="tipologia-button">' + tipologia + '</button>';
    });

    buttonsHTML += '<button class="btn btn-primary" id="prenotaButton">PRENOTA</button>';
    document.querySelector('#buttonsDiv').innerHTML = buttonsHTML;


    document.querySelector('#prenotaButton').addEventListener('click', openReservationModal);
};


  
window.openReservationModal = () => {
  console.log('Apertura del modulo di prenotazione');
  const form = createForm(document.querySelector("#modaleDiv"));
  form.setLabels(["Data", "Ora di Prenotazione", "Nominativo"]);
  form.onsubmit(console.log);
  form.render();
};


  
  window.selectTipologia = (tipologia) => {
    selectedTipologia = tipologia; 
    renderButtons();
    loadAppointments(tipologia);
  
    const buttons = document.querySelectorAll('.tipologia-button');
    buttons.forEach(button => {
      button.style.backgroundColor = '';
      button.style.color = '';
  
      if (button.textContent === tipologia) {
        button.style.backgroundColor = 'blue'; 
        button.style.color = 'white'; 
      }
    });
  };
  
  
  

  const fetchAvailabilityData = () => {
    fetchComponent.getData("availabilityData")
      .then(function(data) {
        try {
          availabilityData = data && typeof data === "string" ? JSON.parse(data) : {};
        } catch (error) {
          console.error("Errore durante il parsing dei dati JSON:", error);
          availabilityData = {};
        }
        
        renderTable();
      })
      .catch(function(error) {
        console.error("Errore nel caricamento dei dati:", error);
        availabilityData = {};
        renderTable();
      });
  };

  const updateTable = () => {
    fetchAvailabilityData();
  };
  
  const renderTable = () => {
    let tableHTML = "<table class='table table-bordered'><thead><tr><th>Orario</th>";
    daysOfWeek.forEach(function(day) {
      tableHTML += '<th>' + day + '</th>';
    });
    tableHTML += "</tr></thead><tbody>";

    timeSlots.forEach(function(slot) {
      tableHTML += '<tr><td>' + slot + ':00</td>';
      daysOfWeek.forEach(function(_, dayIndex) {
        let dateKey = formatDate(addDays(currentWeekStartDate, dayIndex));
        let slotKey = dateKey + '-' + slot;
        tableHTML += '<td>' + (availabilityData[slotKey] || '') + '</td>';
      });
      tableHTML += "</tr>";
    });

    tableHTML += "</tbody></table>";
    parentElement.innerHTML = tableHTML;
  };

  const addDays = (date, days) => {
    let result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  };

  const formatDate = (date) => {
    let year = date.getFullYear();
    let month = ('0' + (date.getMonth() + 1)).slice(-2);
    let day = ('0' + date.getDate()).slice(-2);
    return year + '-' + month + '-' + day;
  };

  window.loadAppointments = (tipologia) => {
    console.log('Caricamento delle prenotazioni per ' + tipologia);
    fetchAvailabilityData();
  };

  renderButtons();
  updateTable();
  setInterval(updateTable, 300000);
};

createTable(document.querySelector('#tableDiv'), "3d60697b-92ca-435d-85b4-33e5d6abe5a4");
console.log("File table.js caricato correttamente.");
