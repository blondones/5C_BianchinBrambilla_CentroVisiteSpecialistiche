const createTable = (parentElement, token) => {
  let availabilityData = {};
  const fetchComponent = generateFetchComponent();
  fetchComponent.build(token);

  const tipologieVisite = ["Cardiologia", "Psicologia", "Oncologia", "Ortopedia", "Neurologia"];
  const daysOfWeek = ["Lunedì", "Martedì", "Mercoledì", "Giovedì", "Venerdì"];
  const timeSlots = [8, 9, 10, 11, 12];
  let currentWeekStartDate = new Date();
  let selectedTipologia = null; 

  const getNextMonday = (date) => {
      let result = new Date(date);
      if (result.getDay() === 0) {
          result.setDate(result.getDate() + 1);
      } else if (result.getDay() === 6) {
          result.setDate(result.getDate() + 2);
      } else {
          result.setDate(result.getDate() + (1 - result.getDay() + 7) % 7);
      }
      return result;
  };

  currentWeekStartDate = getNextMonday(currentWeekStartDate);

  const renderButtons = () => {
      let buttonsHTML = '';
      tipologieVisite.forEach(function(tipologia) {
          buttonsHTML += '<button class="tipologia-button">' + tipologia + '</button>';
      });
      document.querySelector('#buttonsDiv').innerHTML = buttonsHTML;
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
      let tableHTML = "<div><button id='prevWeek'>&lt; Precedente</button>";
      tableHTML += "<button id='nextWeek'>Successivo &gt;</button></div>";
      tableHTML += "<table class='table table-bordered'><thead><tr><th>Orario</th>";

      for (let i = 0; i < daysOfWeek.length; i++) {
          let dateKey = formatDate(addBusinessDays(currentWeekStartDate, i));
          tableHTML += "<th>" + daysOfWeek[i] + " (" + dateKey + ")</th>";
      }
      tableHTML += "</tr></thead><tbody>";

      timeSlots.forEach(function(slot) {
          tableHTML += '<tr><td>' + slot + ':00</td>';
          daysOfWeek.forEach(function(_, dayIndex) {
              let dateKey = formatDate(addBusinessDays(currentWeekStartDate, dayIndex));
              let slotKey = dateKey + '-' + slot;
              tableHTML += '<td>' + (availabilityData[slotKey] || '') + '</td>';
          });
          tableHTML += "</tr>";
      });

      tableHTML += "</tbody></table>";
      parentElement.innerHTML = tableHTML;

      const prevWeekButton = document.getElementById('prevWeek');
      const nextWeekButton = document.getElementById('nextWeek');
      prevWeekButton.onclick = () => changeWeek(-1);
      nextWeekButton.onclick = () => changeWeek(1);
  };

  const addBusinessDays = (date, days) => {
      let result = new Date(date);
      let addedDays = 0;

      while (addedDays < days) {
          result.setDate(result.getDate() + 1);
          if (result.getDay() !== 6 && result.getDay() !== 0) {
              addedDays++;
          }
      }
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

  window.changeWeek = (increment) => {
      let newDate = new Date(currentWeekStartDate);
      newDate.setDate(currentWeekStartDate.getDate() + increment * 7);
      currentWeekStartDate = newDate;
      renderTable();
  };

  renderButtons();
  updateTable();
  setInterval(updateTable, 300000);
};

createTable(document.querySelector('#tableDiv'), "3d60697b-92ca-435d-85b4-33e5d6abe5a4");
