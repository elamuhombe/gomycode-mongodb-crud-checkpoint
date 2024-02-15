// Import the required dependencies
const { MongoClient, ObjectId } = require("mongodb");

// MongoDB connection configuration
const uri = "mongodb://localhost:27017";
const dbName = "contact";

// Function to establish a connection to MongoDB
async function connectToMongoDB() {
  const client = new MongoClient(uri);

  try {
    await client.connect(); // Connect to the MongoDB server
    const database = client.db(dbName); // Get the reference to the specified database
    console.log(`Connected to database "${dbName}"`);
    return database; // Return the connected database object
  } catch (err) {
    console.error("Error connecting to database:", err);
    throw err; // Throw the error if connection fails
  }
}

// Function to create the 'contactlist' collection if it doesn't exist
async function createCollection(database) {
  try {
    // Check if the collection already exists
    const collections = await database.listCollections().toArray();
    const collectionNames = collections.map((collection) => collection.name);

    // Create the collection if it doesn't exist
    if (!collectionNames.includes("contactlist")) {
      await database.createCollection("contactlist");
      console.log('Collection "contactlist" created.');
    } else {
      console.log('Collection "contactlist" already exists.');
    }
  } catch (err) {
    console.error("Error creating collection:", err);
    throw err;
  }
}

// Function to insert data into the specified collection
async function insertData(database, collectionName, data) {
  const collection = database.collection(collectionName);
  try {
    // Insert the data into the collection
    const result = await collection.insertMany(data);
    console.log(`${result.insertedCount} documents inserted.`);
  } catch (err) {
    console.error("Error inserting data:", err);
    throw err;
  }
}

// Function to display a contact by its ObjectId
async function displayContactById(collection, id) {
  try {
    // Find the contact by ObjectId
    const contact = await collection.findOne({ _id: new ObjectId(id) });

    if (contact) {
      console.log("Contact found:");
      console.log(contact);
    } else {
      console.log("Contact not found.");
    }
  } catch (err) {
    console.error("Error displaying contact by ID:", err);
    throw err;
  }
}
// Function to display all contacts
async function displayAllContacts(collection) {
  try {
    // Retrieve all contacts from the collection
    const allContacts = await collection.find().toArray();
    console.log("All contacts:");
    console.log(allContacts);
  } catch (err) {
    console.error("Error displaying all contacts:", err);
    throw err;
  }
}

// Function to update contact's first name
async function updateContactFirstName(
  collection,
  lastName,
  oldFirstName,
  newFirstName
) {
  try {
    // Update the contact's first name
    const result = await collection.updateOne(
      { LastName: lastName, FirstName: oldFirstName },
      { $set: { FirstName: newFirstName } }
    );

    if (result.modifiedCount === 1) {
      console.log(
        `Successfully updated first name for ${lastName} from "${oldFirstName}" to "${newFirstName}".`
      );
    } else {
      console.log(
        `Contact with last name "${lastName}" and first name "${oldFirstName}" not found.`
      );
    }
  } catch (err) {
    console.error("Error updating contact first name:", err);
    throw err;
  }
}

// Function to delete contacts under a certain age
async function deleteContactsUnderAge(collection, minAge) {
  try {
    // Delete contacts under the specified age
    const result = await collection.deleteMany({ Age: { $lt: minAge } });
    console.log(
      `${result.deletedCount} contacts deleted under the age of ${minAge}.`
    );
  } catch (err) {
    console.error("Error deleting contacts under age:", err);
    throw err;
  }
}

// Function to display contacts with age > 18
async function displayContactsOver18(collection) {
  try {
    // Find and display contacts over 18 years old
    const adultContacts = await collection.find({ Age: { $gt: 18 } }).toArray();
    console.log("Contacts with age > 18:");
    console.log(adultContacts);
  } catch (err) {
    console.error("Error displaying contacts over 18:", err);
    throw err;
  }
}

// Function to display contacts with age > 18 and name containing "ah"
async function displayContactsOver18WithAh(collection) {
  try {
    // Find and display adult contacts with 'ah' in their names
    const adultContactsAh = await collection
      .find({
        $and: [
          { Age: { $gt: 18 } },
          {
            $or: [
              { LastName: { $regex: "ah", $options: "i" } },
              { FirstName: { $regex: "ah", $options: "i" } },
            ],
          },
        ],
      })
      .toArray();
    console.log('Contacts with age > 18 and name containing "ah":');
    console.log(adultContactsAh);
  } catch (err) {
    console.error('Error displaying contacts over 18 with "ah" in name:', err);
    throw err;
  }
}

// Main application logic
async function app() {
  try {
    // Connect to the MongoDB database
    const database = await connectToMongoDB();

    if (database) {
      // If connected, create the 'contactlist' collection if not exists
      await createCollection(database);
      // Insert sample data into the 'contactlist' collection
      await insertData(database, "contactlist", data);
      // Get the 'contactlist' collection reference
      const collection = database.collection("contactlist");

      // Example operations on the collection
      const contactId = "65c8a0087e57445e3fe4f149"; // Replace 'your_contact_id_here' with the actual ID
      await displayContactById(collection, contactId);
      await updateContactFirstName(collection, "Kefi", "Seif", "Anis"); // Update first name
      await deleteContactsUnderAge(collection, 5); // Delete contacts under age 5
      await displayAllContacts(collection); // Display all contacts
      await displayContactsOver18(collection); // Display adult contacts
      await displayContactsOver18WithAh(collection); // Display adult contacts with name containing "ah"
    } else {
      console.error("Error connecting to database.");
    }
  } catch (err) {
    console.error("An unexpected error occurred:", err);
  }
}

// Sample data to be inserted into the collection
const data = [
  {
    LastName: "Ben Lahmer",
    FirstName: "Fares",
    Email: "fares@gmail.com",
    Age: 26,
  },
  {
    LastName: "Smith",
    FirstName: "Alice",
    Email: "alice@example.com",
    Age: 25,
  },
  {
    LastName: "Kefi",
    FirstName: "Seif",
    Email: "kefi@gmail.com",
    Age: 15,
  },
  {
    LastName: "Fatnassi",
    FirstName: "Sarar",
    Email: "sara.f@gmail.com",
    Age: 40,
  },
  {
    LastName: "Ben Yahia",
    FirstName: "Rym",
    Age: 4,
  },
  {
    LastName: "Cherif",
    FirstName: "Sami",
    Age: 3,
  },
];

// Call the main application function to start execution
app();
