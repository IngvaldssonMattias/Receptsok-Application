import { searchRecipes } from '../services/apiService.js';
test('Hämtar recept', async () => {
const recipes = await searchRecipes('pasta');
expect(recipes.length).toBeGreaterThan(0);
expect(recipes[0]).toHaveProperty('name');
});