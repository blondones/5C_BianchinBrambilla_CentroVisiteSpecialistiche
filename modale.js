import { generateFetchComponent } from "./cache.js";
import { selectedTipologia } from "./table.js";
import { createTable } from "./table.js";

const createForm = (parentElement) => {
  let labels;
  let callback = null;
  const fetchComponent = generateFetchComponent();

  return {
    setLabels: (newLabels) => { labels = newLabels; },
    onsubmit: (callbackInput) => { callback = callbackInput; },

    render: () => {
      parentElement.innerHTML = `
      <div class="ap">
        <button type="button" class="button" data-bs-toggle="modal" data-bs-target="#reservationModal">
          Aggiungi Prenotazione
        </button>
      </div>
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
              <div id="message" class="mt-3" style="display: none;"></div> <!-- Div per i messaggi -->
            </div>
            <div class="modal-footer">
              <button type="button" class="button" id="cancel" data-bs-dismiss="modal">Annulla</button>
              <button type="button" class="button" id="submit">Prenota</button>
            </div>
          </div>
        </div>
      </div>
      `;

      document.querySelector("#submit").onclick = () => {
        const formData = {
          date: document.querySelector("#date").value,
          time: document.querySelector("#time").value,
          name: document.querySelector("#name").value,
        };

        const messaggio = document.querySelector("#message");

        try {
          fetchComponent.getData().then(response => {
            const json = JSON.parse(response);
            const key = selectedTipologia + formData.date + "_" + formData.time;

            if (!json[key]) {
              json[key] = formData.name;
              fetchComponent.setData(json).then(result => {
                if (result) {
                  document.querySelector("#reservationForm").reset();
                  const modal = bootstrap.Modal.getInstance(document.querySelector("#reservationModal"));
                  if (modal) {
                    modal.hide();
                  }
                } else {
                  console.error("Errore durante il salvataggio della prenotazione.");
                  messaggio.innerText = "Errore durante il salvataggio della prenotazione.";
                  messaggio.style.display = "block";
                }
                callback();
              });
            } else {
              messaggio.innerText = "La prenotazione esiste già. Non può essere effettuata.";
              messaggio.style.display = "block";
            }
          });
        } catch (error) {
          console.error("Errore:", error);
          messaggio.innerText = "Si è verificato un errore durante l'elaborazione della prenotazione.";
          messaggio.style.display = "block";
        }
      };

      document.querySelector("#cancel").onclick = () => {
        document.querySelector("#reservationForm").reset();
        document.querySelector("#message").style.display = "none"; 
      };
    },
  };
};

const form = createForm(document.querySelector("#modaleDiv"));
form.setLabels(["Data", "Ora di Prenotazione", "Nominativo"]);
const table = createTable(document.getElementById("tableDiv"));
form.onsubmit(() => {
  table();
});
form.render();
