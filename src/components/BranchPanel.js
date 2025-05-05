import React, { useState, useEffect } from 'react';
// import './BranchPanel.css';

const BranchPanel = () => {
  const [branches, setBranches] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [newBranch, setNewBranch] = useState({ name: '', address: '' });
  const [editBranch, setEditBranch] = useState(null);

  // Fetch all branches on component mount
  useEffect(() => {
    fetchBranches();
  }, []);

  const fetchBranches = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/branches');
      const data = await response.json();
      setBranches(data);
    } catch (error) {
      console.error('Error fetching branches:', error);
    }
  };

  const handleSearch = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/branches/search?name=${searchTerm}`);
      const data = await response.json();
      setBranches(data);
    } catch (error) {
      console.error('Error searching branches:', error);
    }
  };

  const handleAddBranch = async () => {
    try {
      await fetch('http://localhost:5000/api/branches', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newBranch),
      });
      setNewBranch({ name: '', address: '' });
      fetchBranches();
    } catch (error) {
      console.error('Error adding branch:', error);
    }
  };

  const handleUpdateBranch = async () => {
    try {
      await fetch(`http://localhost:5000/api/branches/${editBranch.branch_id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editBranch),
      });
      setEditBranch(null);
      fetchBranches();
    } catch (error) {
      console.error('Error updating branch:', error);
    }
  };

  const handleDeleteBranch = async (id) => {
    try {
      await fetch(`http://localhost:5000/api/branches/${id}`, {
        method: 'DELETE',
      });
      fetchBranches();
    } catch (error) {
      console.error('Error deleting branch:', error);
    }
  };

  return (
    <div className="branch-panel">
      <h2>Branch Management</h2>

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

      {/* Add Branch Form */}
      <div className="add-branch">
        <h3>Add New Branch</h3>
        <input
          type="text"
          placeholder="Branch Name"
          value={newBranch.name}
          onChange={(e) => setNewBranch({ ...newBranch, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Address"
          value={newBranch.address}
          onChange={(e) => setNewBranch({ ...newBranch, address: e.target.value })}
        />
        <button className="btn-green" onClick={handleAddBranch}>
          Add Branch
        </button>
      </div>

      {/* Edit Branch Form */}
      {editBranch && (
        <div className="edit-branch">
          <h3>Edit Branch</h3>
          <input
            type="text"
            value={editBranch.name}
            onChange={(e) => setEditBranch({ ...editBranch, name: e.target.value })}
          />
          <input
            type="text"
            value={editBranch.address}
            onChange={(e) => setEditBranch({ ...editBranch, address: e.target.value })}
          />
          <button className="btn-green" onClick={handleUpdateBranch}>
            Update
          </button>
          <button className="btn-red" onClick={() => setEditBranch(null)}>
            Cancel
          </button>
        </div>
      )}

      {/* Branch List */}
      <ul className="branch-list">
        {branches.map((branch) => (
          <li key={branch.branch_id}>
            <span>
              {branch.name} - {branch.address}
            </span>
            <button
              className="btn-blue"
              onClick={() => setEditBranch(branch)}
            >
              Edit
            </button>
            <button
              className="btn-red"
              onClick={() => handleDeleteBranch(branch.branch_id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BranchPanel;