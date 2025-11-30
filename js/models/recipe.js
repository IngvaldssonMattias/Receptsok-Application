// JSDoc för dokumentation (kunskapsmål 10, färdighetsmål 9)
/**
 * Klass för att representera ett recept.
 * @class
 */ /**
 * @param {Object} data - API-data för receptet.
 */

export class Recipe {
  constructor(data) {
    this._id = data.idMeal; // Privat egenskap
    this.name = data.strMeal;
    this.image = data.strMealThumb;
    this.instructions = data.strInstructions;
    this.ingredients = this._extractIngredients(data);
  }
  // Getter för id

  get id() {
    return this._id;
  }
  // Metod för att extrahera ingredienser (exempel på logik)
  _extractIngredients(data) {
    let ingredients = [];
    for (let i = 1; i <= 20; i++) {
      if (data[`strIngredient${i}`]) {
        ingredients.push(`${data[`strIngredient${i}`]} -
${data[`strMeasure${i}`]}`);
      }
    }
    return ingredients;
  }
  // Metod för att hämta detaljer (används senare)
  getDetails() {
    return `Instruktioner: ${this.instructions}\nIngredienser:
${this.ingredients.join(", ")}`;
  }
}
