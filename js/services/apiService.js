import { Recipe } from '../models/recipe.js'

/**
* Service för API-anrop till TheMealDB.
* @module
encodeURIComponent gör query säker för URL:en, och async/await väntar snyggt på fetch.
Om API:et misslyckas fångar vi felet, vilket håller appen stabil. Nu har vi data – dags att visa
den!
Etapp 4: Komponenter för DOM-Manipulation – Göra Appen
Levande
Här ger vi appen liv genom att dynamiskt skapa element i DOM:en baserat på data. Detta
handlar om interaktivitet (färdighetsmål 1 och 2), med eventhantering för klick (kunskapsmål 1).
Komponenter som recipeCard är återanvändbara moduler, vilket håller koden ren (kunskapsmål
3). Vi lägger till ARIA för tillgänglighet och lazy-loading för prestanda.
I js/components/recipeCard.js skapar vi en funktion som bygger ett kort med knappar för
detaljer och favoriter.
*/
/**
* Hämtar recept baserat på sökterm.
* @param {string} query - Sökterm.
* @returns {Promise<Array<Recipe>>} - Lista med recept.
*/


export async function searchRecipes (query) {
    if (!query) throw new Error('Sökterm krävs'); // Validering (säkerhet)
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${encodeURIComponent(query)}`; // Sanitera input mot XSS
    try {
        const response = await fetch(url);
        if(!response.ok) throw new Error('API-fel');
        const data = await response.json();
        return data.meals ? data.meals.map(meal => new Recipe(meal)): [];
    } catch (error) {
        console.error(error);
        throw error; // För vidarehantering
        }
    }
