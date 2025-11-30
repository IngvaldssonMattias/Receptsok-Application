import { createRecipeCard } from "./components/recipeCard.js"
import { Recipe } from "./models/recipe.js"
import { searchRecipes } from "./services/apiService.js"



const form = document.getElementById('searchInput')
const results = document.getElementById('results')
const loading = document.getElementById('loading')
const modal = document.getElementById('modal')
const modalTitle = document.getElementById('modalTitle')
const modalContent = document.getElementById('modalContent')
const closeModal = document.getElementById('closeModal')
const favoriteSection = document.getElementById('favorites')
const favoriteHeader = document.getElementById('favoriteHeader')
const favoriteDivider = document.getElementById('favoriteDivider')

form.addEventListener('submit', async (e) => {
    e.preventDefault(); // förhindra omladdning (UX)
    const query = form.searchInput.value.trim();
    if (!query) return; // Validering
    loading.hidden = false; // Feedback (UX)

    try {
        const recipes = await searchRecipes(query);
        results.innerHTML = '' // rensar gammalt
        recipes.forEach(recipe => {
            results.appendChild(createRecipeCard(recipe, showDetails, addFavorite));
        })
        form.searchInput.value = ''; // rensar sökrutan efter sök
        } catch (error) {
            results.innerHTML = '<p> Fel vid sökning. Försök igen.</p>'; // felhantering
        } finally {
            loading.hidden = true;
        }});

        function showDetails(recipe) {
            modalTitle.textContent = recipe.name;
            modalContent.textContent = recipe.getDetails();
            modal.showModal(); // öppnar modal
        }

        closeModal.addEventListener('click', () => modal.close())

        // Favoritfunktioner med localStorage
        function addFavorite(recipe) {
            let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
            if (!favorites.some(f => f.idMeal === recipe.id)) {
                // serialisera recept till JSON
                const recipeData = {
                    idMeal:  recipe.id,
                    strMeal: recipe.name,
                    strMealThumb: recipe.image,
                    strInstructions: recipe.instructions
                };
                for (let i = 0; i < recipe.ingredients.length; i++){
                    const ing = recipe.ingredients[i].split(' - ');
                    recipeData['strInstructions ${i+1}'] = ing[0];
                    recipeData['strMeasure${i+1}'] = ing[1];
                }
                favorites.push(recipeData)
                localStorage.setItem('favorites', JSON.stringify(favorites));
                renderFavorites();
            }
        }






        function removeFavorite(id) {
let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
favorites = favorites.filter(f => f.idMeal !== id);
localStorage.setItem('favorites', JSON.stringify(favorites));
renderFavorites();
}
function renderFavorites() {
let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
favoritesSection.innerHTML = '';
if (favorites.length > 0) {
favoritesHeader.hidden = false;
favoritesDivider.hidden = false;
favorites.forEach(data => {
const recipe = new Recipe(data);
const card = createRecipeCard(recipe, showDetails, () => {},
true); // isFavorite = true
const removeBtn = document.createElement('button');
removeBtn.textContent = 'Ta bort';
removeBtn.setAttribute('aria-label', `Ta bort ${recipe.name}
från favoriter`);
removeBtn.addEventListener('click', () =>
removeFavorite(recipe.id));
card.appendChild(removeBtn);
favoritesSection.appendChild(card);
});
} else {
favoritesHeader.hidden = true;
favoritesDivider.hidden = true;
}
}
renderFavorites()