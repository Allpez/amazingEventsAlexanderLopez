const urlParam = window.location.search;
const urlObjeto = new URLSearchParams(urlParam);
const eventId = urlObjeto.get('id');
const cardContainer = document.getElementById("card-container");
const apiUrl = `https://aulamindhub.github.io/amazing-api/events.json`;

let events = [];

function loadEvents() {
    return fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            events = data.events;
            return events;
        })
        .catch(error => {
            console.error("Error al obtener los datos:", error);
        });
}
// Crear tarjeta de detalles
function createCard(event) {
    const cardContent = document.createElement("div");
    cardContent.className = "card2 d-flex";
    cardContent.innerHTML = `
    <div class="row align-items-center m-0">
        <div class="col-md-6 col-12 mb-3 mb-md-0 d-flex justify-content-center">
            <img class="img-fluid object-fit-cover img_card_detail" src="${event.image}" alt="${event.name}">
        </div>
        <div class="col-md-6 col-12 p-0">
            <div class="card-body container-fluid">
                <h4 class="name d-card pb-2 rounded bg-success">${event.name}</h4>
                <ul class="list-group list-group-flush rounded bg-success-subtle flex-grow-1">                        
                    <li class="list-group-item rounded"><span class="fw-bold">Date: </span>${event.date}</li>
                    <li class="list-group-item rounded"><span class="fw-bold">Description: </span>${event.description}</li>
                    <li class="list-group-item rounded"><span class="fw-bold">Category: </span>${event.category}</li>
                    <li class="list-group-item rounded"><span class="fw-bold">Place: </span>${event.place}</li>
                    <li class="list-group-item rounded"><span class="fw-bold">Capacity: </span>${event.capacity}</li>
                    ${event.assistance ? `<li class="list-group-item rounded"><span class="fw-bold">Assistance: </span>${event.assistance} people</li>` : ''}
                    ${event.estimate ? `<li class="list-group-item rounded"><span class="fw-bold">Estimate: </span>${event.estimate} people</li>` : ''}
                    <li class="list-group-item rounded"><span class="fw-bold">Price: </span>${event.price} $</li>
                </ul>
            </div>
        </div>
    </div>
    `;
    cardContainer.appendChild(cardContent);
}

// Inicializar
function initialize() {
    loadEvents().then(() => {
        if (eventId) {
            const event = events.find(e => e._id === parseInt(eventId, 10));
            if (event) {
                createCard(event);
            } else {
                cardContainer.innerHTML = "<p>Evento no encontrado</p>";
            }
        } else {
            cardContainer.innerHTML = "<p>ID de evento no proporcionado</p>";
        }
    });
}

// Llama a la función de inicialización cuando el documento esté listo
document.addEventListener("DOMContentLoaded", initialize);
