const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
const hbs = require('hbs');
const router = require('./routes/route');

app.use(express.json()); // for JSON requests
app.use(express.urlencoded({ extended: true }));

app.use('/', router);

// Set up view engine
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
