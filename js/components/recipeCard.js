// Importerar Recipe-klassen (t.ex. en modell som beskriver hur ett recept ska se ut)
import { Recipe } from './models/Recipe.js';

/**
 * Skapar ett receptkort-element (HTML) som visar bild, titel och knappar.
 * @param {Recipe} recipe - Receptobjektet som ska visas
 * @param {Function} onClick - Funktion som körs när man klickar på "Visa"-knappen
 * @param {Function} onAddFavorite - Funktion som körs när man lägger till i favoriter
 * @param {Boolean} isFavorite - Flagga som visar om receptet redan är favorit
 * @returns {HTMLElement} - Det färdiga kortet som kan läggas in i DOM:en
 */
export function createRecipeCard(recipe, onClick, onAddFavorite, isFavorite = false) {

    // Skapar ett div-element som blir själva kortet
    const card = document.createElement('div');
    card.classList.add('card');           // Lägger till CSS-klassen "card"
    card.setAttribute('role', 'article'); // För bättre tillgänglighet
    card.setAttribute('aria-label', `Recept: ${recipe.name}`);

    // Lägger in bild, titel och "Visa"-knapp i kortet
    card.innerHTML = `
        <img src="${recipe.image}" alt="${recipe.name}" loading="lazy">
        <h3>${recipe.name}</h3>
        <button class="showDetails" aria-label="Visa detaljer för ${recipe.name}">Visa</button>
    `;

    // Om receptet inte redan är en favorit, lägg till favorit-knappen
    if (!isFavorite) {
        card.innerHTML += `
            <button class="addFav" aria-label="Lägg till ${recipe.name} som favorit">
                Lägg till favorit
            </button>
        `;

        // När man klickar på favorit-knappen anropas onAddFavorite med receptet
        card.querySelector('.addFav').addEventListener('click', () =>
            onAddFavorite(recipe)
        );
    }

    // Kopplar klickhändelsen till "Visa"-knappen
    card.querySelector('.showDetails').addEventListener('click', () =>
        onClick(recipe)
    );

    // Returnerar hela kortet så det kan läggas i DOM:en (t.ex. på sidan)
    return card;
}
