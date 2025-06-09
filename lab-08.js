/* 
    CIT 281 Lab 8
    Author: Mikayla Gooodi 
*/

const express = require('express');
const path = require('path');

const app = express();
const PORT = 8080;
const HOST = 'localhost';

// #3: TODO:
// Serve static files from public subfolder using .use(), express.static(), and path.join().
// Rather than __dirname, use process.cwd()
app.use(express.static(path.join(process.cwd(), 'public')));

app.get("/photos", (request, response) => {
  // #1 TODO:
  // Retrieve JSONPlaceholder photos using fetch() and return first 20 photos as JSON.
  fetch('https://jsonplaceholder.typicode.com/photos')
  // You must use fetch () chain method with two .then() and a .catch().
  // The first .then() must convert from JSON.
    .then(res => res.json())
  // The second .then() must return first 20 photos with status of 200 as JSON array of photo objects.
    .then(data => {
        const first20 = data.slice(0, 20);
        console.log(first20);
        response.status(200).json(first20);
    })
  // The .catch() must return code 500 with any error message as JSON and an error property.
    .catch(error => {
        console.error('Fetch error:', error.message);
        response.status(500).json({ error: error.message });
    });
});

app.get("/photos/:id", (request, response) => {
  // #2 TODO:
  // Retrieve a single photo given information given id from JSONPlaceholder and return as JSON
  const photoId = request.params.id;
  // You must use fetch () chain method with two .then() and a .catch().
  fetch(`https://jsonplaceholder.typicode.com/photos/${photoId}`)
  // The first .then() must convert from JSON.
    .then(res => res.json())
    // The second .then() must return photos with status of 200 as JSON single photo object.
    .then(data => {
        console.log(data);
        response.status(200).json(data);
    })
    // The .catch() must return code 500 with any error message as JSON and an error property.
    .catch(error => {
        console.error('Fetch error:', error.message);
        response.status(200).json(data);
    });
});

// Handle 404 for unknown routes
app.use((request, response) => {
  response.status(404).json({ error: 'Route not found' });
});

// Start server
app.listen(PORT, HOST, () => {
  console.log('Working directory:', process.cwd());
  console.log(`Server running at http://${HOST}:${PORT}`);
});

