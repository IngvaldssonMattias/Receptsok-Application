// Klassen Recipe representerar ett recept och strukturerar om data
// från t.ex. ett API (som TheMealDB) till ett mer lättanvänt objekt.
export class Recipe {

    /**
     * Konstruktor som tar in rå data och skapar ett receptobjekt.
     * @param {Object} data - Rå receptdata från API:t.
     */
    constructor(data) {
        this._id = data.idMeal;               // Unikt ID för receptet
        this.name = data.strMeal;             // Receptets namn
        this.image = data.strMealThumb;       // Bild-URL till receptet
        this.instructions = data.strInstructions; // Instruktionstext
        this.ingredients = this._extractIngredients(data); // Genererar ingredienslista
    }

    /**
     * Getter för receptets ID.
     * Används om man vill hämta id utan att ge direkt åtkomst till _id.
     */
    get id() {
        return this._id;
    }

    /**
     * Privat metod (konvention med "_") som extraherar upp till 20 ingredienser
     * från API-datat och parar ihop ingrediensnamn med mängd.
     * @param {Object} data - Rå receptdata från API:t
     * @returns {Array<string>} En lista med ingredienser i formatet
     * "Ingrediens - Mängd"
     */
    _extractIngredients(data) {
        let ingredients = [];

        // TheMealDB använder strIngredient1...strIngredient20
        for (let i = 1; i <= 20; i++) {
            // Om ingrediensen finns, lägg till den med tillhörande mått
            if (data[`strIngredient${i}`]) {
                ingredients.push(`${data[`strIngredient${i}`]} - ${data[`strMeasure${i}`]}`);
            }
        }

        return ingredients;
    }

    /**
     * Returnerar detaljer som en färdig textsträng med både instruktioner
     * och ingredienser – användbart för visningsfunktioner i UI.
     * @returns {string}
     */
    getDetails() {
        return `Instruktioner: ${this.instructions}\nIngredienser: ${this.ingredients.join(', ')}`;
    }
}
