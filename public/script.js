const API_URL = '/api/cars';

function fetchCars() {
  fetch(API_URL)
    .then(res => res.json())
    .then(data => renderCarList(data));
}

function renderCarList(cars) {
  const list = document.getElementById('car-list');
  if (!list) return;

  list.innerHTML = '';
  if (cars.length === 0) {
    list.innerHTML = '<tr><td colspan="6">No cars found.</td></tr>';
    return;
  }

  cars.forEach(car => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${car.brand}</td>
      <td>${car.model}</td>
      <td>${car.year}</td>
      <td>${car.price}</td>
      <td><button class="btn red" onclick="deleteCar(${car.id})">Delete</button></td>
      <td><button class="btn blue" onclick="editCar(${car.id})">Edit</button></td>
    `;
    list.appendChild(row);
  });
}

function deleteCar(id) {
  fetch(`${API_URL}/${id}`, { method: 'DELETE' })
    .then(() => fetchCars());
}

function editCar(id) {
  window.location.href = `addCar.html?id=${id}`;
}

function loadCarForEdit() {
  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');
  if (!id) return;

  fetch(`${API_URL}/${id}`)
    .then(res => res.json())
    .then(car => {
      document.getElementById('brand').value = car.brand;
      document.getElementById('model').value = car.model;
      document.getElementById('year').value = car.year;
      document.getElementById('price').value = car.price;
      M.updateTextFields();
    });
}

document.getElementById('car-form')?.addEventListener('submit', (e) => {
  e.preventDefault();
  const brand = document.getElementById("brand").value;
  const model = document.getElementById("model").value;
  const year = document.getElementById("year").value;
  const price = document.getElementById("price").value;

  const car = { brand, model, year, price };
  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');

  const method = id ? 'PUT' : 'POST';
  const url = id ? `${API_URL}/${id}` : API_URL;

  fetch(url, {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(car),
  }).then(() => window.location.href = 'carList.html');
});

if (document.getElementById("car-list")) {
  fetchCars();
}
if (window.location.pathname.includes('addCar.html')) {
  loadCarForEdit();
}
