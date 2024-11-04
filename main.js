import { createForm } from "./modale.js";
import { createTable } from "./table.js";

const form = createForm(document.querySelector("#modaleDiv"));
const table = createTable(document.getElementById("tableDiv"));
const tableComponent = createTable();

tableComponent.renderButtons();
tableComponent.selectedTipologia = tableComponent.tipologieVisite[0];
tableComponent.loadAppointments(tableComponent.selectedTipologia);
setInterval(tableComponent.updateTable, 300000);

form.onsubmit(() => {
    tableComponent.renderTable();
});
form.render();
