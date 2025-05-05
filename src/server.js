const express = require('express');
const cors = require('cors');
const {
  getAllEmployees,
  searchEmployees,
  addEmployee,
  updateEmployee,
  deleteEmployee,
  getAllBranches,
  searchBranches,
  addBranch,
  updateBranch,
  deleteBranch,
  getAllApartments,
  searchApartments,
  addApartment,
  updateApartment,
  deleteApartment,
  getAllSales,
  searchSales,
  addSale,
  updateSale,
  deleteSale,
} = require('./api');

const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Employee Routes (Existing)
app.get('/api/employees', async (req, res) => {
  try {
    const results = await getAllEmployees();
    res.json(results);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.get('/api/employees/search', async (req, res) => {
  try {
    const results = await searchEmployees(req.query);
    res.json(results);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.post('/api/employees', async (req, res) => {
  try {
    const result = await addEmployee(req.body);
    res.status(201).json(result);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.put('/api/employees/:id', async (req, res) => {
  try {
    await updateEmployee(req.params.id, req.body);
    res.status(200).send('Updated successfully');
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.delete('/api/employees/:id', async (req, res) => {
  try {
    await deleteEmployee(req.params.id);
    res.status(200).send('Deleted successfully');
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// New Proxy Endpoints for EmployeePanel to Use api.js Functions
app.post('/api/employee/getAll', async (req, res) => {
  try {
    const results = await getAllEmployees();
    res.json(results);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.post('/api/employee/search', async (req, res) => {
  try {
    const { name, id } = req.body;
    const results = await searchEmployees({ name, id });
    res.json(results);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.post('/api/employee/add', async (req, res) => {
  try {
    const result = await addEmployee(req.body);
    res.status(201).json(result);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.post('/api/employee/update', async (req, res) => {
  try {
    const { id, ...employeeData } = req.body;
    await updateEmployee(id, employeeData);
    res.status(200).send('Updated successfully');
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.post('/api/employee/delete', async (req, res) => {
  try {
    const { id } = req.body;
    await deleteEmployee(id);
    res.status(200).send('Deleted successfully');
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Branch Routes
app.get('/api/branches', async (req, res) => {
  try {
    const results = await getAllBranches();
    res.json(results);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.get('/api/branches/search', async (req, res) => {
  try {
    const results = await searchBranches(req.query);
    res.json(results);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.post('/api/branches', async (req, res) => {
  try {
    const result = await addBranch(req.body);
    res.status(201).json(result);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.put('/api/branches/:id', async (req, res) => {
  try {
    await updateBranch(req.params.id, req.body);
    res.status(200).send('Updated successfully');
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.delete('/api/branches/:id', async (req, res) => {
  try {
    await deleteBranch(req.params.id);
    res.status(200).send('Deleted successfully');
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Apartment Routes
app.get('/api/apartments', async (req, res) => {
  try {
    const results = await getAllApartments();
    res.json(results);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.get('/api/apartments/search', async (req, res) => {
  try {
    const results = await searchApartments(req.query);
    res.json(results);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.post('/api/apartments', async (req, res) => {
  try {
    const result = await addApartment(req.body);
    res.status(201).json(result);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.put('/api/apartments/:id', async (req, res) => {
  try {
    await updateApartment(req.params.id, req.body);
    res.status(200).send('Updated successfully');
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.delete('/api/apartments/:id', async (req, res) => {
  try {
    await deleteApartment(req.params.id);
    res.status(200).send('Deleted successfully');
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Sales Routes
app.get('/api/sales', async (req, res) => {
  try {
    const results = await getAllSales();
    res.json(results);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.get('/api/sales/search', async (req, res) => {
  try {
    const results = await searchSales(req.query);
    res.json(results);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.post('/api/sales', async (req, res) => {
  try {
    const result = await addSale(req.body);
    res.status(201).json(result);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

app.put('/api/sales/:id', async (req, res) => {
  try {
    await updateSale(req.params.id, req.body);
    res.status(200).send('Updated successfully');
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.delete('/api/sales/:id', async (req, res) => {
  try {
    await deleteSale(req.params.id);
    res.status(200).send('Deleted successfully');
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});