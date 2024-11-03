const createForm = (parentElement) => {
  let labels;
  let callback = null;
  const fetchComponent = generateFetchComponent();
  fetchComponent.build("3d60697b-92ca-435d-85b4-33e5d6abe5a4");

  return {  
    setLabels: (newLabels) => { labels = newLabels; },  
    onsubmit: (callbackInput) => { callback = callbackInput },
    
    render: () => { 
      parentElement.innerHTML = `
        <form id="reservationForm">
          <div class="mb-3">
            <label for="date" class="form-label">Data</label>
            <input type="date" id="date" class="form-control" required>
          </div>
          <div class="mb-3">
            <label for="time" class="form-label">Ora</label>
            <select id="time" class="form-select" required>
              <option value="">Seleziona un orario</option>
              <option value="08:00">08:00</option>
              <option value="09:00">09:00</option>
              <option value="10:00">10:00</option>
              <option value="11:00">11:00</option>
              <option value="12:00">12:00</option>
            </select>
          </div>
          <div class="mb-3">
            <label for="name" class="form-label">Nominativo</label>
            <input type="text" id="name" class="form-control" required>
          </div>
          <button type="button" class="btn btn-primary" id="submit">Prenota</button>
          <button type="button" class="btn btn-secondary" id="cancel">Annulla</button>
        </form>
      `;
      
      document.querySelector("#submit").onclick = () => {
        const formData = {
          date: document.querySelector("#date").value,
          time: document.querySelector("#time").value,
          name: document.querySelector("#name").value
        };

        try {
          const result = fetchComponent.setData("reservation_" + formData.date + "_" + formData.time, formData);
          if (result) {
            console.log("Prenotazione salvata con successo!", result);
            alert("Prenotazione salvata con successo!");
            document.querySelector("#reservationForm").reset();
          } else {
            alert("Errore durante il salvataggio della prenotazione.");
          }
        } catch (error) {
          console.error("Errore:", error);
          alert("Errore durante la comunicazione con la cache remota.");
        }
        callback(formData);
      };

      document.querySelector("#cancel").onclick = () => {
        document.querySelector("#reservationForm").reset();
      };
    },
  };
};

const form = createForm(document.querySelector("#modaleDiv"));
form.setLabels(["Data", "Ora di Prenotazione", "Nominativo"]);
form.onsubmit(console.log);
form.render();
