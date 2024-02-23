# MongoDB CRUD Project
## Objective:
This checkpoint aims to practice MongoDB CRUD operations by manipulating a database called "contact" and a collection called "contactlist".

## Getting Started
To get started with the MongoDB CRUD operations checkpoint, you'll need to have MongoDB installed on your system. 
If you haven't installed MongoDB yet, you can download and install it from the official MongoDB website: MongoDB Download Center.

To integrate MongoDB CRUD operations with Node.js and Express, you'll need to install the required packages and set up your project. 
Here's a step-by-step guide:
1. Initialize your Node.js project
   If you haven't already, create a new directory for your project and initialize a new Node.js project using npm.
   Open your terminal or command prompt and run the following commands:

bash
Copy code
mkdir mongodb-express-crud
cd mongodb-express-crud
npm init -y

2. Install dependencies
   Install the necessary npm packages including Express.js, MongoDB driver for Node.js, and any other packages you may need. Run the following command:

Copy code
npm install express mongodb

3. Create a file named app.js in your project directory and set up a basic Express server. This file will handle your HTTP requests and responses.
4. Implement CRUD operations
5. Run your server
   node src/app.js
7. Test your endpoints
   Use tools like Postman or curl to test your endpoints for CRUD operations.

## Project Structure
![project-structure](https://github.com/elamuhombe/gomycode-mongodb-crud-checkpoint/assets/10416177/ef60f23b-f772-4274-84ee-e6c384ae8de8)


## Screenshots
### Connection to database and creation of collection
output in console:
![db-connection-and-create-collection](https://github.com/elamuhombe/gomycode-mongodb-crud-checkpoint/assets/10416177/1c0b7cce-96e5-4f60-a124-e2ef6ecb5b1d)

### Information about only one person using his ID.
output in console:
![contact-found](https://github.com/elamuhombe/gomycode-mongodb-crud-checkpoint/assets/10416177/5d3ed061-db27-40d1-8c53-f93bd81cff18)

### All contacts of persons > 18 years of age
output in console:
![contacts-greater-than-18](https://github.com/elamuhombe/gomycode-mongodb-crud-checkpoint/assets/10416177/22337eff-ad83-4a15-b69c-cf23f92e587b)

### All contacts of persons > 18 years of age and name containing 'ah'
output in console:
![contain-ah](https://github.com/elamuhombe/gomycode-mongodb-crud-checkpoint/assets/10416177/68d1d4b4-cbdc-49ba-aea5-bea6c03a8dca)

### Deletion of contacts < 5
output in console:
![delete-contact](https://github.com/elamuhombe/gomycode-mongodb-crud-checkpoint/assets/10416177/6e4bb929-b95b-4601-b7fb-fd6c0f6bc4a6)

### All contact list
output in console:
![all-contacts](https://github.com/elamuhombe/gomycode-mongodb-crud-checkpoint/assets/10416177/702c5a5e-c170-4e32-94c0-9527ee2f6f32)


## Dependencies
- Express: This is a fast, unopinionated, minimalist web framework for Node.js. It simplifies the process of building web applications and APIs by providing a robust set of features for handling HTTP requests and responses.
- MongoDB driver for Node.js: This is the official MongoDB driver for Node.js. It allows your Node.js application to interact with a MongoDB database.

## Technologies

- Node.js: A JavaScript runtime environment that allows you to execute JavaScript code server-side.

- Express.js: A minimal and flexible Node.js web application framework that provides a robust set of features for building web applications and APIs.

- MongoDB: A NoSQL database that uses a document-oriented data model. MongoDB is highly scalable and flexible, making it suitable for a wide range of applications.

- MongoDB Node.js Driver: The official MongoDB driver for Node.js, which allows your Node.js application to interact with MongoDB databases.

- npm (Node Package Manager): The default package manager for Node.js, used to install, manage, and publish Node.js packages and dependencies.

- JavaScript (ES6+): The programming language used for writing server-side logic, handling HTTP requests and responses, and interacting with the MongoDB database. E.g use of async and await

## Autho
Elaine Muhombe

## Acnowledgements
- cloud.mongodb.com
- medium.com website: https://medium.com/@skhans/how-to-build-a-basic-node-js-crud-app-with-mongoose-and-mongodb-3e958a36001d#:~:text=and%20scalable%20applications.-,Node.,%2C%20and%20delete%20(CRUD).
- https://blog.avneesh.tech/building-a-crud-api-with-nodejs-and-mongodb
- https://youtu.be/_7UQPve99r4
  
