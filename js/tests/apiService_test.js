// Importerar funktionen som ska testas
import { searchRecipes } from '../services/apiService.js';

// Ett testfall som kontrollerar att recept hämtas korrekt
test('Hämtar recept', async () => {

    // Anropar sökfunktionen med sökordet "pasta"
    const recipes = await searchRecipes('pasta');

    // Förväntar att minst ett recept returneras
    expect(recipes.length).toBeGreaterThan(0);

    // Första receptet ska ha egenskapen "name"
    // (vilket betyder att Recipe-objekt skapats korrekt)
    expect(recipes[0]).toHaveProperty('name');
});
