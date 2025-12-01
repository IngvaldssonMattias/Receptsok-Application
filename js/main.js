// Importerar funktioner och klasser som används i appen
import { searchRecipes } from './services/apiService.js';
import { createRecipeCard } from './components/recipeCard.js';
import { Recipe } from './models/recipe.js';

// Hämtar HTML-element från DOM:en
const form = document.getElementById('searchForm');
const results = document.getElementById('results');
const loading = document.getElementById('loading');
const modal = document.getElementById('modal');
const modalTitle = document.getElementById('modalTitle');
const modalContent = document.getElementById('modalContent');
const closeModal = document.getElementById('closeModal');

const favoritesSection = document.getElementById('favorites');
const favoritesHeader = document.getElementById('favoritesHeader');
const favoritesDivider = document.getElementById('favoritesDivider');

// När användaren skickar in sökformuläret
form.addEventListener('submit', async (e) => {
    e.preventDefault(); // Stoppar sidan från att ladda om

    const query = form.searchInput.value.trim(); // Hämtar söktexten
    if (!query) return; // Om inget sökord → avbryt

    loading.hidden = false; // Visar "loading"-indikatorn

    try {
        // Hämta recept från API
        const recipes = await searchRecipes(query);

        // Töm tidigare resultat
        results.innerHTML = '';

        // Skapa och lägg till kort för varje recept
        recipes.forEach(recipe => {
            results.appendChild(createRecipeCard(recipe, showDetails, addFavorite));
        });

        // Rensa sökfältet
        form.searchInput.value = '';

    } catch (error) {
        // Om något går fel, visa felmeddelande
        results.innerHTML = '<p>Fel vid sökning. Försök igen.</p>';
    } finally {
        // Dölj loading-indikatorn oavsett om allt lyckades eller ej
        loading.hidden = true;
    }
});

// Visar detaljer i en modal-popup
function showDetails(recipe) {
    modalTitle.textContent = recipe.name;          // Sätt titel
    modalContent.textContent = recipe.getDetails(); // Sätt instruktioner + ingredienser
    modal.showModal();                             // Öppna modal
}

// Stänger modalen
closeModal.addEventListener('click', () => modal.close());


// Lägger till ett recept i favoriter (LocalStorage)
function addFavorite(recipe) {
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

    // Undvik duplicering – kontrollera om receptet redan finns
    if (!favorites.some(f => f.idMeal === recipe.id)) {

        // Skapa objekt i samma format som API:t använder
        const recipeData = {
            idMeal: recipe.id,
            strMeal: recipe.name,
            strMealThumb: recipe.image,
            strInstructions: recipe.instructions,
        };

        // Lägg till ingredienserna med rätt namnformat
        for (let i = 0; i < recipe.ingredients.length; i++) {
            const ing = recipe.ingredients[i].split(' - ');
            recipeData[`strIngredient${i+1}`] = ing[0];
            recipeData[`strMeasure${i+1}`] = ing[1];
        }

        // Spara i localStorage
        favorites.push(recipeData);
        localStorage.setItem('favorites', JSON.stringify(favorites));

        // Uppdatera favoritlistan som visas i UI
        renderFavorites();
    }
}

// Tar bort ett recept från favoriter
function removeFavorite(id) {
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

    // Filtrerar bort receptet med matchande ID
    favorites = favorites.filter(f => f.idMeal !== id);

    // Spara uppdaterad lista
    localStorage.setItem('favorites', JSON.stringify(favorites));

    // Uppdatera UI
    renderFavorites();
}

// Renderar favoritsektionen på sidan
function renderFavorites() {
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    favoritesSection.innerHTML = ''; // Töm sektionen

    if (favorites.length > 0) {
        // Visa rubriken och avdelaren
        favoritesHeader.hidden = false;
        favoritesDivider.hidden = false;

        // Skapa ett kort för varje favorit
        favorites.forEach(data => {
            const recipe = new Recipe(data); // Skapa Recipe-objekt igen
            const card = createRecipeCard(recipe, showDetails, () => {}, true);

            // Lägg till en "Ta bort"-knapp
            const removeBtn = document.createElement('button');
            removeBtn.textContent = 'Ta bort';
            removeBtn.setAttribute('aria-label', `Ta bort ${recipe.name} från favoriter`);
            removeBtn.addEventListener('click', () => removeFavorite(recipe.id));

            // Lägg knappen i kortet
            card.appendChild(removeBtn);

            // Lägg till kortet i favoritsektionen
            favoritesSection.appendChild(card);
        });

    } else {
        // Om inga favoriter → dölj rubrik och avdelare
        favoritesHeader.hidden = true;
        favoritesDivider.hidden = true;
    }
}

// Rendera favoriter direkt när sidan laddas
renderFavorites();
