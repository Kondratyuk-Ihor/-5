const express = require('express');
const router = express.Router();

let cars = [];

// GET: всі авто або з фільтром
router.get('/', (req, res) => {
  const { brand } = req.query;
  const result = brand ? cars.filter(c => c.brand === brand) : cars;
  res.json(result);
});

// GET: одне авто
router.get('/:id', (req, res) => {
  const car = cars.find(c => c.id === parseInt(req.params.id));
  if (!car) return res.status(404).json({ message: 'Car not found' });
  res.json(car);
});

// POST: додати авто
router.post('/', (req, res) => {
  const { brand, model, year, price } = req.body;
  if (!brand || !model || !year || !price) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const newCar = { id: Date.now(), brand, model, year, price };
  cars.push(newCar);
  res.status(201).json(newCar);
});

// PUT: оновити авто
router.put('/:id', (req, res) => {
  const car = cars.find(c => c.id === parseInt(req.params.id));
  if (!car) return res.status(404).json({ message: 'Car not found' });

  const { brand, model, year, price } = req.body;
  if (!brand || !model || !year || !price) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  car.brand = brand;
  car.model = model;
  car.year = year;
  car.price = price;

  res.json(car);
});

// DELETE: видалити авто
router.delete('/:id', (req, res) => {
  const index = cars.findIndex(c => c.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ message: 'Car not found' });

  cars.splice(index, 1);
  res.status(204).send();
});

module.exports = router;
