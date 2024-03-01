// app.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const routes = require('./server/routes'); // Adjusted path

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

// Mount the routes defined in routes.js
app.use('/', routes);

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
