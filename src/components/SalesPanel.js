import React, { useState, useEffect } from 'react';
// import './SalesPanel.css';

const SalesPanel = () => {
  const [sales, setSales] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [newSale, setNewSale] = useState({
    employee_id: '',
    apartment_id: '',
    customer_name: '',
    sale_date: '',
    duration: '6',
    notes: '',
    amount: ''
  });
  const [editSale, setEditSale] = useState(null);
  const [apartmentName, setApartmentName] = useState('');

  // Fetch all sales on component mount
  useEffect(() => {
    fetchSales();
  }, []);

  const fetchSales = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/sales');
      const data = await response.json();
      setSales(data);
    } catch (error) {
      console.error('Error fetching sales:', error);
    }
  };

  const handleSearch = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/sales/search?name=${searchTerm}`);
      const data = await response.json();
      setSales(data);
    } catch (error) {
      console.error('Error searching sales:', error);
    }
  };

  const handleApartmentIdChange = async (e, isEdit = false) => {
    const apartment_id = e.target.value;
    if (isEdit) {
      setEditSale({ ...editSale, apartment_id });
    } else {
      setNewSale({ ...newSale, apartment_id });
    }

    if (apartment_id) {
      try {
        const response = await fetch('http://localhost:5000/api/apartments');
        const apartments = await response.json();
        const apartment = apartments.find(ap => ap.apartment_id === parseInt(apartment_id));
        setApartmentName(apartment ? apartment.name : 'Not found');
      } catch (error) {
        console.error('Error fetching apartment name:', error);
        setApartmentName('Error');
      }
    } else {
      setApartmentName('');
    }
  };

  const handleAddSale = async () => {
    try {
      await fetch('http://localhost:5000/api/sales', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newSale),
      });
      setNewSale({
        employee_id: '',
        apartment_id: '',
        customer_name: '',
        sale_date: '',
        duration: '6',
        notes: '',
        amount: ''
      });
      setApartmentName('');
      fetchSales();
    } catch (error) {
      console.error('Error adding sale:', error);
    }
  };

  const handleUpdateSale = async () => {
    try {
      await fetch(`http://localhost:5000/api/sales/${editSale.sale_id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editSale),
      });
      setEditSale(null);
      setApartmentName('');
      fetchSales();
    } catch (error) {
      console.error('Error updating sale:', error);
    }
  };

  const handleDeleteSale = async (id) => {
    try {
      await fetch(`http://localhost:5000/api/sales/${id}`, {
        method: 'DELETE',
      });
      fetchSales();
    } catch (error) {
      console.error('Error deleting sale:', error);
    }
  };

  return (
    <div className="sales-panel">
      <h2>Sales Management</h2>

      {/* Search Bar */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search by customer name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className="btn-blue" onClick={handleSearch}>
          Search
        </button>
      </div>

      {/* Add Sale Form */}
      <div className="add-sale">
        <h3>Add New Sale</h3>
        <input
          type="number"
          placeholder="Employee ID"
          value={newSale.employee_id}
          onChange={(e) => setNewSale({ ...newSale, employee_id: e.target.value })}
        />
        <input
          type="number"
          placeholder="Apartment ID"
          value={newSale.apartment_id}
          onChange={(e) => handleApartmentIdChange(e)}
        />
        <span className="apartment-name">{apartmentName}</span>
        <input
          type="text"
          placeholder="Customer Name"
          value={newSale.customer_name}
          onChange={(e) => setNewSale({ ...newSale, customer_name: e.target.value })}
        />
        <input
          type="date"
          value={newSale.sale_date}
          onChange={(e) => setNewSale({ ...newSale, sale_date: e.target.value })}
        />
        <select
          value={newSale.duration}
          onChange={(e) => setNewSale({ ...newSale, duration: e.target.value })}
        >
          <option value="6">6 months</option>
          <option value="12">12 months</option>
        </select>
        <input
          type="text"
          placeholder="Notes"
          value={newSale.notes}
          onChange={(e) => setNewSale({ ...newSale, notes: e.target.value })}
        />
        <input
          type="number"
          placeholder="Amount"
          value={newSale.amount}
          onChange={(e) => setNewSale({ ...newSale, amount: e.target.value })}
        />
        <button className="btn-green" onClick={handleAddSale}>
          Add Sale
        </button>
      </div>

      {/* Edit Sale Form */}
      {editSale && (
        <div className="edit-sale">
          <h3>Edit Sale</h3>
          <input
            type="number"
            value={editSale.employee_id}
            onChange={(e) => setEditSale({ ...editSale, employee_id: e.target.value })}
          />
          <input
            type="number"
            value={editSale.apartment_id}
            onChange={(e) => handleApartmentIdChange(e, true)}
          />
          <span className="apartment-name">{apartmentName}</span>
          <input
            type="text"
            value={editSale.customer_name}
            onChange={(e) => setEditSale({ ...editSale, customer_name: e.target.value })}
          />
          <input
            type="date"
            value={editSale.sale_date}
            onChange={(e) => setEditSale({ ...editSale, sale_date: e.target.value })}
          />
          <select
            value={editSale.duration}
            onChange={(e) => setEditSale({ ...editSale, duration: e.target.value })}
          >
            <option value="6">6 months</option>
            <option value="12">12 months</option>
          </select>
          <input
            type="text"
            value={editSale.notes}
            onChange={(e) => setEditSale({ ...editSale, notes: e.target.value })}
          />
          <input
            type="number"
            value={editSale.amount}
            onChange={(e) => setEditSale({ ...editSale, amount: e.target.value })}
          />
          <button className="btn-green" onClick={handleUpdateSale}>
            Update
          </button>
          <button className="btn-red" onClick={() => { setEditSale(null); setApartmentName(''); }}>
            Cancel
          </button>
        </div>
      )}

      {/* Sales List */}
      <ul className="sales-list">
        {sales.map((sale) => (
          <li key={sale.sale_id}>
            <span>
              Customer: {sale.customer_name} | Apartment: {sale.apartment_name} | Amount: {sale.amount}
            </span>
            <button
              className="btn-blue"
              onClick={() => setEditSale(sale)}
            >
              Edit
            </button>
            <button
              className="btn-red"
              onClick={() => handleDeleteSale(sale.sale_id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SalesPanel;