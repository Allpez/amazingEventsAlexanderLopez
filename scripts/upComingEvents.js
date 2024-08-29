import { loadEventsUpcoming, initialize } from "../modules/functions.js";

document.addEventListener('DOMContentLoaded', () => {
    loadEventsUpcoming();
    initialize();
});







// const cardContainer = document.getElementById("card-container");
// const checkboxContainer = document.getElementById("inputs");
// const searchInput = document.getElementById("search");
// const searchButton = document.getElementById("searchButton");
// const arrow = document.getElementById("arrow");

// // Función para crear los checkboxes de categorías
// function createCategoryCheckboxes() {
//     const categories = [...new Set(data.events.map(event => event.category))];
//     checkboxContainer.innerHTML = '';

//     categories.forEach(category => {
//         const checkbox = document.createElement('div');
//         checkbox.className = 'form-check';
//         checkbox.innerHTML = `
//             <input class="form-check-input" type="checkbox" value="${category}" id="${category}">
//             <label class="form-check-label" for="${category}"><span class="p_check">${category}</span></label>
//         `;
//         checkboxContainer.appendChild(checkbox);
//     });

//     // Añadir el evento de cambio a cada checkbox
//     checkboxContainer.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
//         checkbox.addEventListener('change', filterEvents);
//     });
// }

// // Función para filtrar y mostrar eventos
// function filterEvents() {
//     // Obtener categorías seleccionadas
//     const selectedCategories = Array.from(checkboxContainer.querySelectorAll('input[type="checkbox"]:checked')).map(checkbox => checkbox.value);

//     // Obtener el texto de búsqueda
//     const searchText = searchInput.value.toLowerCase();

//     // Limpiar el contenedor
//     cardContainer.innerHTML = '';

//     // Filtrar eventos según las categorías seleccionadas y el texto de búsqueda
//     const filteredEvents = data.events.filter(event => {
//         const isCategoryMatch = selectedCategories.length === 0 || selectedCategories.includes(event.category);
//         const isSearchMatch = event.name.toLowerCase().includes(searchText) || event.description.toLowerCase().includes(searchText) || event.price.toString().includes(searchText);
//         const isDateMatch = data.currentDate < event.date;
//         return isCategoryMatch && isSearchMatch && isDateMatch;
//     });

//     // Mostrar los eventos filtrados
//         if (filteredEvents.length === 0) {
//             const noResultsMessage = document.createElement('div');
//             noResultsMessage.className = 'no-results-message text-center';
//             noResultsMessage.innerHTML = '<H2>No se encontraron resultados.</H2><p>Por favor intenta con una nueva busqueda.</p>';
//             cardContainer.appendChild(noResultsMessage);
//     }else{
//         filteredEvents.forEach(event => {
//             let card = document.createElement("div");
//             card.className = "card";
//             card.innerHTML = `
//             <img class="card-img" src="${event.image}">
//             <div class="card-body p-1 mt-2">
//             <h5 class="card-title">${event.name}</h5>
//             <p class="card-text">${event.description}</p>
//             <div class="d-flex justify-content-between align-items-center mb-2">
//             <p class="m-0">${event.price} $</p>
//             <a href="./details.html?id=${event._id}" class="btn button_card">Details</a>
//             </div>
//             </div>`;
//             cardContainer.appendChild(card);
//         });
//     }
// }

// window.addEventListener('scroll', () => {
//     if (window.scrollY > 500) { // Mostrar la flecha si has hecho scroll más de 500px
//         arrow.style.display = 'block';
//     } else {
//         arrow.style.display = 'none';
//     }
// });

// // Añadir el evento de entrada al boton de busqueda.
// searchButton.addEventListener('click', filterEvents);

// // Inicializar checkboxes y eventos
// createCategoryCheckboxes();
// filterEvents(); // Mostrar eventos al cargar la página