import { loadEvents, initialize } from "../modules/functions.js";

document.addEventListener('DOMContentLoaded', () => {
    loadEvents();
    initialize();
});



// fetch(variable.url)
//     .then(response => response.json())
//     .then(data => {
//         events = data.events;
//         console.log(events);
//         console.log(data.events[0].name);
//         // Inicializar checkboxes y eventos
//         variable.createCategoryCheckboxes()
//         createCards(events)
//     })
//     .catch(error => console.error("Error al obtener los datos:",
//         error)
//     );

