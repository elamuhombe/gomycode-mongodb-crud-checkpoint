const { MongoClient } = require('mongodb');

const uri = 'mongodb://localhost:27017';
const dbName = 'contact';

async function connectToMongoDB() {
    const client = new MongoClient(uri);

    try {
        await client.connect();
        const database = client.db(dbName);
        console.log(`Connected to database "${dbName}"`);
        return database;
    } catch (err) {
        console.error('Error connecting to database:', err);
        throw err;
    }
}

async function createCollection(database) {
    try {
        const collections = await database.listCollections().toArray();
        const collectionNames = collections.map(collection => collection.name);
        
        if (!collectionNames.includes('contactlist')) {
            await database.createCollection('contactlist');
            console.log('Collection "contactlist" created.');
        } else {
            console.log('Collection "contactlist" already exists.');
        }
    } catch (err) {
        console.error('Error creating collection:', err);
        throw err;
    }
}

async function insertData(database, collectionName, data) {
    const collection = database.collection(collectionName);
    try {
        const result = await collection.insertMany(data);
        console.log(`${result.insertedCount} documents inserted.`);
    } catch (err) {
        console.error('Error inserting data:', err);
        throw err;
    }
}

async function displayAllContacts(collection) {
    try {
        const allContacts = await collection.find().toArray();
        console.log('All contacts:');
        console.log(allContacts);
    } catch (err) {
        console.error('Error displaying all contacts:', err);
        throw err;
    }
}

async function app() {
    try {
        const database = await connectToMongoDB();
        if (database) {
            await createCollection(database);
            await insertData(database, 'contactlist', data);
            await displayAllContacts(database.collection('contactlist'));
        } else {
            console.error('Error connecting to database.');
        }
    } catch (err) {
        console.error('An unexpected error occurred:', err);
    }
}

const data = [
    {
        LastName: 'Ben Lahmer',
        FirstName: 'Fares',
        Email: 'fares@gmail.com',
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

app();
