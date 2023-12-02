const { MongoClient } = require('mongodb');
require('dotenv').config();

async function migrateDataToMongoDB() {
  const client = new MongoClient(process.env.URL, console.log(`db is connected`), {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  try {
    await client.connect();

    const db = client.db('food'); 
    const categories = [
      { CategoryID: 1, Name: 'Cake' },
      { CategoryID: 2, Name: 'No-Bake' },
      { CategoryID: 3, Name: 'Vegetarian' },
    ];

    const ingredients = [
      { IngredientID: 1, Name: 'Condensed milk' },
      { IngredientID: 2, Name: 'Cream Cheese' },
      { IngredientID: 3, Name: 'Lemon Juice' },
      
    ];

    const steps = [
      { StepID: 1, Description: 'Beat Cream Cheese' },
      { StepID: 2, Description: 'Add condensed Milk and blend' },
      { StepID: 3, Description: 'Add Lemon Juice and blend' },
    ];

    const recipes = [
      {
        RecipeID: 1,
        Name: 'No-Bake Cheesecake',
        CategoryID: 1, 
        Steps: [
          { StepID: 1 }, { StepID: 2 }, { StepID: 3 },
         
        ],
        Ingredients: [
          { IngredientID: 1 }, { IngredientID: 2 }, { IngredientID: 3 },
        
        ],
      },
      
    ];

    const categoriesCollection = db.collection('Category');
    const ingredientsCollection = db.collection('Ingredient');
    const stepsCollection = db.collection('Step');
    const recipesCollection = db.collection('Recipe');

    await categoriesCollection.insertMany(categories);
    await ingredientsCollection.insertMany(ingredients);
    await stepsCollection.insertMany(steps);
    await recipesCollection.insertMany(recipes);

    console.log('Data migrated to MongoDB successfully.');
  } catch (err) {
    console.error('Error migrating data:', err);
  } finally {
    client.close();
  }
}

migrateDataToMongoDB();