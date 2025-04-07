const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const port = 3000;

// Статичні файли
app.use(express.static(path.join(__dirname, 'public')));

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Підключення маршрутів
const carsRouter = require('./routes/cars');
app.use('/api/cars', carsRouter);

// Запуск
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
