// controllers/carsController.js
let cars = [
    { id: 1, brand: 'Toyota', model: 'Corolla', year: 2020, price: 20000 },
    { id: 2, brand: 'Honda', model: 'Civic', year: 2019, price: 19000 }
];

// Get all cars
exports.getAllCars = (req, res) => {
    res.json(cars);
};

// Get a car by id
exports.getCarById = (req, res) => {
    const car = cars.find(c => c.id === parseInt(req.params.id));
    if (!car) return res.status(404).send('Car not found');
    res.json(car);
};

// Add a new car
exports.addCar = (req, res) => {
    const newCar = {
        id: cars.length + 1,
        brand: req.body.brand,
        model: req.body.model,
        year: req.body.year,
        price: req.body.price
    };
    cars.push(newCar);
    res.status(201).json(newCar);
};

// Update a car by id
exports.updateCar = (req, res) => {
    const car = cars.find(c => c.id === parseInt(req.params.id));
    if (!car) return res.status(404).send('Car not found');
    car.brand = req.body.brand;
    car.model = req.body.model;
    car.year = req.body.year;
    car.price = req.body.price;
    res.json(car);
};

// Delete a car by id
exports.deleteCar = (req, res) => {
    const carIndex = cars.findIndex(c => c.id === parseInt(req.params.id));
    if (carIndex === -1) return res.status(404).send('Car not found');
    cars.splice(carIndex, 1);
    res.status(204).send();
};
