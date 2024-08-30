const apiUrl = `https://aulamindhub.github.io/amazing-api/events.json`;

let tableContainer = document.getElementById("tableContainer");
let events = [];
let currentDate = '';

function fetchData() {
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            events = data.events;
            currentDate = data.currentDate;
            console.log(currentDate);
            createTable(events);
        })
        .catch(error => console.error("Error al obtener los datos:", error)
        );
}

// Funcion para estadisticas del eventos destacados
function featuredEvent(statistics) {
    if (statistics.length === 0)
        return {};

    const eventHighestAssistance = statistics.reduce((max, event) => {
        const percentage = (event.assistance * 100) / event.capacity;
        return percentage > max.percentage ? { event, percentage } : max;
    }, { event: null, percentage: -Infinity });

    const eventLowestAssistance = statistics.reduce((min, event) => {
        const percentage = (event.assistance * 100) / event.capacity;
        return percentage < min.percentage ? { event, percentage } : min;
    }, { event: null, percentage: Infinity });

    const eventlargestCapacity = statistics.reduce((max, event) => {
        return event.capacity > max.capacity ? event : max;
    }, { capacity: -Infinity });

    return {
        highest: eventHighestAssistance,
        lowest: eventLowestAssistance,
        largestCapacity: eventlargestCapacity
    }
}

// function statisticsByCategory(upcoming, past) {
//     let categories = [...new Set(events.map(event => event.category))];

//     let assisOrEstim =


//     let revenues = event.assistance * event.price
//     let assistance = (event.assistance * 100) / event.capacity;

//     categories.sort((a, b) => a.ibu - b.ibu).slice(0, 10)
// }

// categories.sort(event => {
//     if (upcoming = currentDate < event.date) {
//         categories
//     }




// });

// }









function createTable(statistics) {
    tableContainer.innerHTML = '';

    const { highest, lowest, largestCapacity } = featuredEvent(statistics);

    const table = document.createElement("table");
    table.className = "table my-3 ";
    table.innerHTML = `                
        <thead>
            <tr>
                <th colspan="3" class="bg-warning bg-opacity-50 text-center">Event Statisctis</th>
            </tr>
            <tr>
                <td>Evente with highest % of assistance</td>
                <td>Evente with lowest % of assistance</td>
                <td>Evente with larger capacity</td>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>${highest ? `${highest.event.name}: ${highest.percentage.toFixed(2)}%` : 'N/A'}</td>
                <td>${lowest ? `${lowest.event.name}: ${lowest.percentage.toFixed(2)}%` : 'N/A'}</td>
                <td>${largestCapacity ? `${largestCapacity.name}: ${largestCapacity.capacity} Persons` : 'N/A'}</td>
            </tr>
        </tbody>
        <thead>
            <tr>
                <th colspan="3" class="bg-warning bg-opacity-50 text-center">Upcomin events statistics by category</th>
            </tr>
            <tr>
                <td>Categories</td>
                <td>Revenues</td>
                <td>Percntage of assistance</td>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>categoryUpcomung</td>
                <td> $</td>
                <td>Persons</td>
            </tr>
        </tbody>
        <thead>
            <tr>
                <th colspan="3" class="bg-warning bg-opacity-50 text-center">Past events statistics by category</th>
            </tr>
            <tr>
                <td>Categories</td>
                <td>Revenues</td>
                <td>Percntage of assistance</td>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>categoryPast</td>
                <td> $</td>
                <td>Persons</td>
            </tr>
        </tbody>
    `;
    tableContainer.appendChild(table);
};



document.addEventListener("DOMContentLoaded", fetchData);
