const createForm = (parentElement) => {
    let labels;
    let callback = null;
  
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
              <label for="time" class="form-label">Ora di Prenotazione</label>
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
            <button type="button" class="btn btn-primary" id="submit">Invia</button>
            <button type="button" class="btn btn-secondary" id="cancel">Annulla</button>
          </form>
        `;
  
        document.querySelector("#submit").onclick = () => {
          const formData = {
            date: document.querySelector("#date").value,
            time: document.querySelector("#time").value,
            name: document.querySelector("#name").value
          };
          callback(formData);
        };
  
        document.querySelector("#cancel").onclick = () => {
          document.querySelector("#reservationForm").reset();
        };
      },
    };
  };
  
  const form = createForm(document.querySelector('#modaleDiv'));
  form.setLabels(["Data", "Ora di Prenotazione", "Nominativo"]);
  form.onsubmit(console.log);
  form.render();
  