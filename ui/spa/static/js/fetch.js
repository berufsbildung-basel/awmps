const openButton = document.querySelector("[data-open-modal]")
const closeButton = document.querySelector("[data-close-modal]")
const modal = document.querySelector("[data-modal]")

// openButton.addEventListener("click", () => {
//     modal.show()
// })

// closeButton.addEventListener("click", () => {
//     modal.close()
// })

function toggleNav() {
    document.getElementById("sideNav").classList.toggle("open");
}

////////////////////////////////////////////////////////////////////

async function fetchEntityById(entityName, id) {
    const response = await fetch(`http://localhost:3000/${entityName}${id}`);
    return response.json();
}

function setPotData(data, pot) {
    pot.textContent = JSON.stringify(data);
}

async function fetchAndDisplayData(event) {
    const pot = event.target;
    const potId = parseInt(pot.attributes['data-pot-id'].value);
    // fetch json data from api
    const data = await fetchEntityById('Pot', potId);
    // display data in relevant pot
    setPotData(data, event.target);
}


async function registerClickHandlers(handler) {
    const pots = await document.getElementsByClassName('pot');
    [...pots].forEach((pot) => {
        pot.addEventListener('click', handler);
    });
}

async function main() {
    await registerClickHandlers(fetchAndDisplayData);
}

main();

//////////////////////////////////////////////////////////////////

