export const checkboxContainer = document.getElementById("inputs");
export const searchInput = document.getElementById("search");
export const searchButton = document.getElementById("searchButton");
export const cardContainer = document.getElementById("card-container");
export const arrow = document.getElementById("arrow");

export const url = `https://aulamindhub.github.io/amazing-api/events.json`

let events = [];

// Función para crear los checkboxes de categorías
export function createCategoryCheckboxes() {
    const categories = [...new Set(events.map(event => event.category))];
    checkboxContainer.innerHTML = '';

    // Creacion de los checkboxes por cateroria sin repetir
    categories.forEach(category => {
        const checkbox = document.createElement('div');
        checkbox.className = 'form-check';
        checkbox.innerHTML = `
            <input class="form-check-input" type="checkbox" value="${category}" id="${category}">
            <label class="form-check-label" for="${category}"><span class="p_check">${category}</span></label>
        `;
        checkboxContainer.appendChild(checkbox);
    });

    // Añadir el evento de cambio a cada checkbox
    checkboxContainer.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
        checkbox.addEventListener('change', filterEvents);
    });
}

// Función mostrar eventos
export function createCards(cards) {
    cardContainer.innerHTML = '';

    cards.forEach(event => {
        let card = document.createElement("div");
        card.className = "card";
        card.innerHTML = `
        <img class="card-img" src="${event.image}">
                <div class="card-body p-1 mt-2">
                <h5 class="card-title">${event.name}</h5>
                    <p class="card-text">${event.description}</p>
                    <div class="d-flex justify-content-between align-items-center mb-2">
                    <p class="m-0">${event.price} $</p>
                    <a href="./pages/details.html?id=${event._id}" class="btn button_card">Details</a>
                    </div>
                    </div>`;
        cardContainer.appendChild(card);
    });

}

// Función para filtrar 
export function filterEvents() {
    // Obtener categorías seleccionadas
    const selectedCategories = Array
        .from(checkboxContainer.querySelectorAll('input[type="checkbox"]:checked'))
        .map(checkbox => checkbox.value);

    // Obtener el texto de búsqueda
    const searchText = searchInput.value.toLowerCase();

    // Limpiar el contenedor
    cardContainer.innerHTML = '';

    // Filtrar eventos según las categorías seleccionadas y el texto de búsqueda
    const filteredEvents = events.filter(event => {
        const isCategoryMatch = selectedCategories.length === 0 || selectedCategories.includes(event.category);
        const isSearchMatch = event.name.toLowerCase().includes(searchText) || event.description.toLowerCase().includes(searchText) || event.price.toString().includes(searchText);
        return isCategoryMatch && isSearchMatch;
    });

    if (filteredEvents.length === 0) {
        const noResultsMessage = document.createElement('div');
        noResultsMessage.className = 'no-results-message text-center';
        noResultsMessage.innerHTML = '<H2 class="text-success">No se encontraron resultados.</H2><p class"text-success-emphasis">Por favor intenta con una nueva busqueda.</p>';
        cardContainer.appendChild(noResultsMessage);
    } else {
        createCards(filteredEvents);
    }
}

// Función para inicializar los eventos
export function initialize() {
    searchButton.addEventListener('click', filterEvents);

    searchInput.addEventListener('keydown', (event) => {
        if (event.key === "Enter") {
            filterEvents();
        }
    });

    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            arrow.style.display = 'block';
        } else {
            arrow.style.display = 'none';
        }
    });
}

// Función para cargar eventos desde la API
export function loadEvents() {
    fetch(url)
        .then(response => response.json())
        .then(data => {
            events = data.events;
            createCategoryCheckboxes();
            createCards(events);
        })
        .catch(error => console.error("Error al obtener los datos:", error));
}