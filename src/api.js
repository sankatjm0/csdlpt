const mysql = require('mysql2');

// MySQL configuration for XAMPP
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root', // Default XAMPP MySQL user
  password: '', // Default XAMPP MySQL password (empty unless changed)
  database: 'chdv'
});

db.connect((err) => {
  if (err) {
    console.error('Database connection failed:', err);
    return;
  }
  console.log('Connected to MySQL database');
});

// Employee Queries
const getAllEmployees = () => {
  return new Promise((resolve, reject) => {
    db.query('SELECT * FROM Employee', (err, results) => {
      if (err) reject(err);
      resolve(results);
    });
  });
};

const searchEmployees = ({ name, id }) => {
  let query = 'SELECT * FROM Employee WHERE 1=1';
  const params = [];
  if (name) {
    query += ' AND name LIKE ?';
    params.push(`%${name}%`);
  }
  if (id) {
    query += ' AND employee_id = ?';
    params.push(id);
  }
  return new Promise((resolve, reject) => {
    db.query(query, params, (err, results) => {
      if (err) reject(err);
      resolve(results);
    });
  });
};

const addEmployee = ({ name, position, birthday, phone, branch_id, joinedtime }) => {
  return new Promise((resolve, reject) => {
    db.query(
      'INSERT INTO Employee (name, position, birthday, phone, branch_id, joinedtime, status) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [name, position, birthday, phone, branch_id, joinedtime, 'Dang lam'],
      (err, result) => {
        if (err) reject(err);
        resolve({ id: result.insertId });
      }
    );
  });
};

const updateEmployee = (id, { name, position, birthday, phone, branch_id, joinedtime, status }) => {
  return new Promise((resolve, reject) => {
    db.query(
      'UPDATE Employee SET name = ?, position = ?, birthday = ?, phone = ?, branch_id = ?, joinedtime = ?, status = ? WHERE employee_id = ?',
      [name, position, birthday, phone, branch_id, joinedtime, status, id],
      (err) => {
        if (err) reject(err);
        resolve();
      }
    );
  });
};

const deleteEmployee = (id) => {
  return new Promise((resolve, reject) => {
    db.query('DELETE FROM Employee WHERE employee_id = ?', [id], (err) => {
      if (err) reject(err);
      resolve();
    });
  });
};

// Branch Queries
const getAllBranches = () => {
  return new Promise((resolve, reject) => {
    db.query('SELECT * FROM Branch', (err, results) => {
      if (err) reject(err);
      resolve(results);
    });
  });
};

const searchBranches = ({ name, id }) => {
  let query = 'SELECT * FROM Branch WHERE 1=1';
  const params = [];
  if (name) {
    query += ' AND name LIKE ?';
    params.push(`%${name}%`);
  }
  if (id) {
    query += ' AND branch_id = ?';
    params.push(id);
  }
  return new Promise((resolve, reject) => {
    db.query(query, params, (err, results) => {
      if (err) reject(err);
      resolve(results);
    });
  });
};

const addBranch = ({ name, address }) => {
  return new Promise((resolve, reject) => {
    db.query('INSERT INTO Branch (name, address) VALUES (?, ?)', [name, address], (err, result) => {
      if (err) reject(err);
      resolve({ id: result.insertId });
    });
  });
};

const updateBranch = (id, { name, address }) => {
  return new Promise((resolve, reject) => {
    db.query('UPDATE Branch SET name = ?, address = ? WHERE branch_id = ?', [name, address, id], (err) => {
      if (err) reject(err);
      resolve();
    });
  });
};

const deleteBranch = (id) => {
  return new Promise((resolve, reject) => {
    db.query('DELETE FROM Branch WHERE branch_id = ?', [id], (err) => {
      if (err) reject(err);
      resolve();
    });
  });
};

// Apartment Queries
const getAllApartments = () => {
  return new Promise((resolve, reject) => {
    db.query('SELECT * FROM Apartment', (err, results) => {
      if (err) reject(err);
      resolve(results);
    });
  });
};

const searchApartments = ({ name, id }) => {
  let query = 'SELECT * FROM Apartment WHERE 1=1';
  const params = [];
  if (name) {
    query += ' AND name LIKE ?';
    params.push(`%${name}%`);
  }
  if (id) {
    query += ' AND apartment_id = ?';
    params.push(id);
  }
  return new Promise((resolve, reject) => {
    db.query(query, params, (err, results) => {
      if (err) reject(err);
      resolve(results);
    });
  });
};

const addApartment = ({ photos, name, address, status, price, branch_id }) => {
  const updatedtime = new Date().toISOString().slice(0, 19).replace('T', ' ');
  return new Promise((resolve, reject) => {
    db.query(
      'INSERT INTO Apartment (photos, name, address, status, price, branch_id, updatedtime) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [photos, name, address, status, price, branch_id, updatedtime],
      (err, result) => {
        if (err) reject(err);
        resolve({ id: result.insertId });
      }
    );
  });
};

const updateApartment = (id, { photos, name, address, status, price, branch_id, updatedtime }) => {
  return new Promise((resolve, reject) => {
    db.query(
      'UPDATE Apartment SET photos = ?, name = ?, address = ?, status = ?, price = ?, branch_id = ?, updatedtime = ? WHERE apartment_id = ?',
      [photos, name, address, status, price, branch_id, updatedtime, id],
      (err) => {
        if (err) reject(err);
        resolve();
      }
    );
  });
};

const deleteApartment = (id) => {
  return new Promise((resolve, reject) => {
    db.query('DELETE FROM Apartment WHERE apartment_id = ?', [id], (err) => {
      if (err) reject(err);
      resolve();
    });
  });
};

// Sales Queries
const getAllSales = () => {
  return new Promise((resolve, reject) => {
    db.query('SELECT s.*, a.name AS apartment_name FROM Sales s LEFT JOIN Apartment a ON s.apartment_id = a.apartment_id', (err, results) => {
      if (err) reject(err);
      resolve(results);
    });
  });
};

const searchSales = ({ name, id }) => {
  let query = 'SELECT s.*, a.name AS apartment_name FROM Sales s LEFT JOIN Apartment a ON s.apartment_id = a.apartment_id WHERE 1=1';
  const params = [];
  if (name) {
    query += ' AND customer_name LIKE ?';
    params.push(`%${name}%`);
  }
  if (id) {
    query += ' AND sale_id = ?';
    params.push(id);
  }
  return new Promise((resolve, reject) => {
    db.query(query, params, (err, results) => {
      if (err) reject(err);
      resolve(results);
    });
  });
};

const getApartmentName = (apartment_id) => {
  return new Promise((resolve, reject) => {
    db.query('SELECT name FROM Apartment WHERE apartment_id = ?', [apartment_id], (err, results) => {
      if (err) reject(err);
      if (results.length === 0) reject(new Error('Invalid apartment_id'));
      resolve(results[0].name);
    });
  });
};

const addSale = ({ employee_id, apartment_id, customer_name, sale_date, duration, notes, amount }) => {
  return new Promise((resolve, reject) => {
    getApartmentName(apartment_id)
      .then((apartment_name) => {
        db.query(
          'INSERT INTO Sales (employee_id, apartment_id, customer_name, sale_date, duration, notes, amount) VALUES (?, ?, ?, ?, ?, ?, ?)',
          [employee_id, apartment_id, customer_name, sale_date, duration, notes, amount],
          (err, result) => {
            if (err) reject(err);
            resolve({ id: result.insertId, apartment_name });
          }
        );
      })
      .catch((err) => reject(err));
  });
};

const updateSale = (id, { employee_id, apartment_id, customer_name, sale_date, duration, notes, amount }) => {
  return new Promise((resolve, reject) => {
    db.query(
      'UPDATE Sales SET employee_id = ?, apartment_id = ?, customer_name = ?, sale_date = ?, duration = ?, notes = ?, amount = ? WHERE sale_id = ?',
      [employee_id, apartment_id, customer_name, sale_date, duration, notes, amount, id],
      (err) => {
        if (err) reject(err);
        resolve();
      }
    );
  });
};

const deleteSale = (id) => {
  return new Promise((resolve, reject) => {
    db.query('DELETE FROM Sales WHERE sale_id = ?', [id], (err) => {
      if (err) reject(err);
      resolve();
    });
  });
};

module.exports = {
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
  getApartmentName,
};