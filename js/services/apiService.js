// Importerar Recipe-klassen som används för att skapa receptobjekt
import { Recipe } from 'models/Recipe.js';

/**
 * Söker efter recept baserat på en sökterm (query).
 * Hämtar data från TheMealDB API och returnerar en lista av Recipe-objekt.
 * @param {string} query - Söksträng från användaren
 * @returns {Promise<Array<Recipe>>} Lista av recept (kan vara tom)
 */
export async function searchRecipes(query) {

    // Säkerställer att användaren faktiskt skrev något
    if (!query) throw new Error('Sökterm krävs');

    // API-länken, med söktermen korrekt kodad för URL
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${encodeURIComponent(query)}`;

    try {
        // Hämtar API-data
        const response = await fetch(url);

        // Kastar eget fel om API-anropet misslyckades (t.ex. 404, 500)
        if (!response.ok) throw new Error('API-fel');

        // Tolkar svaret som JSON
        const data = await response.json();

        // Om API:t hittar recept → gör om varje objekt till en Recipe-instans
        // Om inga recept hittas → returnera tom array
        return data.meals ? data.meals.map(meal => new Recipe(meal)) : [];

    } catch (error) {
        // Loggar eventuella fel i konsolen (bra för utvecklare/debugging)
        console.error(error);

        // Skickar vidare felet så andra delar av appen kan hantera det
        throw error;
    }
}
