/* Cache Remota */

const sendReservation = (reservation) => {
    console.log(reservation);
    fetch('https://ws.cipiaceinfo.it/cache/set', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'key': '3d60697b-92ca-435d-85b4-33e5d6abe5a4'
        },
        body: JSON.stringify({
            key: 'prenotazione',
            value: reservation
        })
    })
    .then(response => response.json())
    .then(data => {
        console.log('Prenotazione inviata:', data);
        updateTable();
    })
    .catch(error => {
        console.log('Errore nell\'invio della prenotazione:', error);
    });
}

const updateTable = () => {
    fetch('https://ws.cipiaceinfo.it/cache/get', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'key': '3d60697b-92ca-435d-85b4-33e5d6abe5a4'
        },
        body: JSON.stringify({
            key: 'prenotazione'
        })
    })
    .then(response => response.json())
    .then(data => {
        console.log(data.result);
        //createTable(data.result);
    })
    .catch(error => {
        console.log('Errore nel caricamento della tabella:', error);
    });
}

form.onsubmit = (data) => {
    const reservation = {
        date: data.availableDate,
        roomsBooked: data.roomsBooked
    };
    sendReservation(reservation);
};

updateTable();
