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
        <div class="modal fade" id="reservationModal" tabindex="-1" aria-labelledby="reservationModalLabel" aria-hidden="true">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="reservationModalLabel">Nuova Prenotazione</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body">
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
                </form>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Annulla</button>
                <button type="button" class="btn btn-primary" id="submit">Prenota</button>
              </div>
            </div>
          </div>
        </div>
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
            const modal = new bootstrap.Modal(document.querySelector("#reservationModal"));
            modal.hide();
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
