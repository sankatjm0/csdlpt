import React, { useState, useEffect } from 'react';
// import './ApartmentPanel.css';

const ApartmentPanel = () => {
  const [apartments, setApartments] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [newApartment, setNewApartment] = useState({
    photos: '',
    name: '',
    address: '',
    status: 'Con trong',
    price: '',
    branch_id: ''
  });
  const [editApartment, setEditApartment] = useState(null);

  // Fetch all apartments on component mount
  useEffect(() => {
    fetchApartments();
  }, []);

  const fetchApartments = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/apartments');
      const data = await response.json();
      setApartments(data);
    } catch (error) {
      console.error('Error fetching apartments:', error);
    }
  };

  const handleSearch = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/apartments/search?name=${searchTerm}`);
      const data = await response.json();
      setApartments(data);
    } catch (error) {
      console.error('Error searching apartments:', error);
    }
  };

  const handleAddApartment = async () => {
    try {
      await fetch('http://localhost:5000/api/apartments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newApartment),
      });
      setNewApartment({
        photos: '',
        name: '',
        address: '',
        status: 'Con trong',
        price: '',
        branch_id: ''
      });
      fetchApartments();
    } catch (error) {
      console.error('Error adding apartment:', error);
    }
  };

  const handleUpdateApartment = async () => {
    try {
      await fetch(`http://localhost:5000/api/apartments/${editApartment.apartment_id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editApartment),
      });
      setEditApartment(null);
      fetchApartments();
    } catch (error) {
      console.error('Error updating apartment:', error);
    }
  };

  const handleDeleteApartment = async (id) => {
    try {
      await fetch(`http://localhost:5000/api/apartments/${id}`, {
        method: 'DELETE',
      });
      fetchApartments();
    } catch (error) {
      console.error('Error deleting apartment:', error);
    }
  };

  return (
    <div className="apartment-panel">
      <h2>Apartment Management</h2>

      {/* Search Bar */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search by name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className="btn-blue" onClick={handleSearch}>
          Search
        </button>
      </div>

      {/* Add Apartment Form */}
      <div className="add-apartment">
        <h3>Add New Apartment</h3>
        <input
          type="text"
          placeholder="Photo Link"
          value={newApartment.photos}
          onChange={(e) => setNewApartment({ ...newApartment, photos: e.target.value })}
        />
        <input
          type="text"
          placeholder="Name"
          value={newApartment.name}
          onChange={(e) => setNewApartment({ ...newApartment, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Address"
          value={newApartment.address}
          onChange={(e) => setNewApartment({ ...newApartment, address: e.target.value })}
        />
        <select
          value={newApartment.status}
          onChange={(e) => setNewApartment({ ...newApartment, status: e.target.value })}
        >
          <option value="Con trong">Con trong</option>
          <option value="Da thue">Da thue</option>
        </select>
        <input
          type="number"
          placeholder="Price"
          value={newApartment.price}
          onChange={(e) => setNewApartment({ ...newApartment, price: e.target.value })}
        />
        <input
          type="number"
          placeholder="Branch ID"
          value={newApartment.branch_id}
          onChange={(e) => setNewApartment({ ...newApartment, branch_id: e.target.value })}
        />
        <button className="btn-green" onClick={handleAddApartment}>
          Add Apartment
        </button>
      </div>

      {/* Edit Apartment Form */}
      {editApartment && (
        <div className="edit-apartment">
          <h3>Edit Apartment</h3>
          <input
            type="text"
            value={editApartment.photos}
            onChange={(e) => setEditApartment({ ...editApartment, photos: e.target.value })}
          />
          <input
            type="text"
            value={editApartment.name}
            onChange={(e) => setEditApartment({ ...editApartment, name: e.target.value })}
          />
          <input
            type="text"
            value={editApartment.address}
            onChange={(e) => setEditApartment({ ...editApartment, address: e.target.value })}
          />
          <select
            value={editApartment.status}
            onChange={(e) => setEditApartment({ ...editApartment, status: e.target.value })}
          >
            <option value="Con trong">Con trong</option>
            <option value="Da thue">Da thue</option>
          </select>
          <input
            type="number"
            value={editApartment.price}
            onChange={(e) => setEditApartment({ ...editApartment, price: e.target.value })}
          />
          <input
            type="number"
            value={editApartment.branch_id}
            onChange={(e) => setEditApartment({ ...editApartment, branch_id: e.target.value })}
          />
          <input
            type="datetime-local"
            value={editApartment.updatedtime || ''}
            onChange={(e) => setEditApartment({ ...editApartment, updatedtime: e.target.value })}
          />
          <button className="btn-green" onClick={handleUpdateApartment}>
            Update
          </button>
          <button className="btn-red" onClick={() => setEditApartment(null)}>
            Cancel
          </button>
        </div>
      )}

      {/* Apartment List */}
      <ul className="apartment-list">
        {apartments.map((apartment) => (
          <li key={apartment.apartment_id}>
            <span>
              {apartment.name} - {apartment.address} - {apartment.status} - {apartment.price}
            </span>
            <button
              className="btn-blue"
              onClick={() => setEditApartment(apartment)}
            >
              Edit
            </button>
            <button
              className="btn-red"
              onClick={() => handleDeleteApartment(apartment.apartment_id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ApartmentPanel;