import { Recipe } from '../models/recipe.js';
/**
* Skapar ett receptkort.
* @param {Recipe} recipe - Receptobjekt.
* @param {Function} onClick - Klickhanterare för visa detaljer.
* @param {Function} onAddFavorite - Klickhanterare för lägg till favorit.
* @param {boolean} isFavorite - Flagga för om det är i favoritsektionen
addEventListener lyssnar på klick utan att blanda HTML och JS, och ARIA gör knapparna
beskrivande. Detta skapar interaktion – nu kopplar vi ihop allt!
Etapp 5: Huvudlogiken i main.js – Dirigera Hela Orkestern
Här samlar vi allt i js/main.js, som dirigenten som styr flödet. Vi hanterar events som submit,
visar laddning för UX, och använder localStorage för favoriter (persistens utan server). Detta
integrerar API, DOM och events (färdighetsmål 2), och tänk agilt: bygg i sprints (kunskapsmål
9).
(döljer add-knapp).
* @returns {HTMLElement} - Kortelement.
*/

export function createRecipeCard(recipe, onClick, onAddFavorite, isFavorite = false) {
    const card = document.createElement('div')
    card.classList.add('card');
    card.setAttribute('role', 'article');
    card.setAttribute('aria-label', `Recept: ${recipe.name}`);
    card.innerHTML = `<img src="${recipe.image}" alt="${recipe.name}" loading="lazy">
                    <h3>${recipe.name}</h3>
                    <button class="showDetails" aria-label="Visa detaljer för ${recipe.name}">Visa</button>`;
                    if (!isFavorite) {
    card.innerHTML += `
        <button class="addFav" aria-label="Lägg till ${recipe.name} som favorit">
            Lägg till favorit
        </button>`;
}

card.querySelector('.showDetails')
    .addEventListener('click', () => onClick(recipe));

if (!isFavorite) {
    card.querySelector('.addFav')
        .addEventListener('click', () => onAddFavorite(recipe));
}

return card;
                    }

