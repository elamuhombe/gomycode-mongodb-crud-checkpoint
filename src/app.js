const { MongoClient } = require('mongodb');

// Connection URI
const uri = 'mongodb://localhost:27017';

// Database Name
const dbName = 'contact';

// Connect to MongoDB
async function connectToMongoDB() {
    const client = new MongoClient(uri);

    try {
        await client.connect();
        const database = client.db(dbName);
        console.log(`Connected to database "${dbName}"`);
        return database; // Return the database object
    } catch (err) {
        console.error('Error:', err);
    } finally {
        // Do not close the connection here
    }
}

async function createCollection(database) {
    try {
        // Check if the collection already exists
        const collections = await database.listCollections().toArray();
        const collectionNames = collections.map(collection => collection.name);
        
        if (!collectionNames.includes('contactlist')) {
            // Collection does not exist, so create it
            await database.createCollection('contactlist');
            console.log('Collection "contactlist" created.');
        } else {
            console.log('Collection "contactlist" already exists.');
        }
    } catch (err) {
        console.error('Error:', err);
    }
}


// Insert data into the collection
async function insertData(database, collectionName, data) {
    const collection = database.collection(collectionName);
    try {
        const result = await collection.insertMany(data);
        console.log(`${result.insertedCount} documents inserted.`);
    } catch (err) {
        console.error('Error:', err);
    }
}

// App function to call other functions
async function app() {
    const database = await connectToMongoDB();
    if (database) {
        await createCollection(database);
        await insertData(database, 'contactlist', data); // Insert data after creating collection
    } else {
        console.error('Error connecting to database.');
    }
}

// Data to be inserted
const data = [
    {
        LastName: 'Ben Lahmer',
        FirstName: 'Fares',
        Email: 'fares@gmail.com.com',
        Age: 26
    },
    {
        LastName: 'Smith',
        FirstName: 'Alice',
        Email: 'alice@example.com',
        Age: 25
    },
    {
        LastName: 'Kefi',
        FirstName: 'Seif',
        Email: 'kefi@gmail.com',
        Age: 15
    },
    {
        LastName: 'Fatnassi',
        FirstName: 'Sarar',
        Email: 'sara.f@gmail.com',
        Age: 40
    },
    {
        LastName: 'Ben Yahia',
        FirstName: 'Rym',
        Age: 4
    },
    {
        LastName: 'Cherif',
        FirstName: 'Sami',
        Age: 3
    }
];

// Call the app function to run the code
app();
