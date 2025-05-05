import React, { useState, useEffect } from 'react';
// import './EmployeePanel.css';

const EmployeePanel = () => {
  const [employees, setEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [newEmployee, setNewEmployee] = useState({
    name: '',
    position: 'Nhan vien kinh doanh',
    birthday: '',
    phone: '',
    branch_id: '',
    joinedtime: ''
  });
  const [editEmployee, setEditEmployee] = useState(null);

  // Fetch all employees on component mount
  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/employee/getAll', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });
      const data = await response.json();
      setEmployees(data);
    } catch (error) {
      console.error('Error fetching employees:', error);
    }
  };

  const handleSearch = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/employee/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: searchTerm }),
      });
      const data = await response.json();
      setEmployees(data);
    } catch (error) {
      console.error('Error searching employees:', error);
    }
  };

  const handleAddEmployee = async () => {
    try {
      await fetch('http://localhost:5000/api/employee/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newEmployee),
      });
      setNewEmployee({
        name: '',
        position: 'Nhan vien kinh doanh',
        birthday: '',
        phone: '',
        branch_id: '',
        joinedtime: ''
      });
      fetchEmployees();
    } catch (error) {
      console.error('Error adding employee:', error);
    }
  };

  const handleUpdateEmployee = async () => {
    try {
      await fetch('http://localhost:5000/api/employee/update', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: editEmployee.employee_id, ...editEmployee }),
      });
      setEditEmployee(null);
      fetchEmployees();
    } catch (error) {
      console.error('Error updating employee:', error);
    }
  };

  const handleDeleteEmployee = async (id) => {
    try {
      await fetch('http://localhost:5000/api/employee/delete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });
      fetchEmployees();
    } catch (error) {
      console.error('Error deleting employee:', error);
    }
  };

  return (
    <div className="employee-panel">
      <h2>Employee Management</h2>

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

      {/* Add Employee Form */}
      <div className="add-employee">
        <h3>Add New Employee</h3>
        <input
          type="text"
          placeholder="Name"
          value={newEmployee.name}
          onChange={(e) => setNewEmployee({ ...newEmployee, name: e.target.value })}
        />
        <select
          value={newEmployee.position}
          onChange={(e) => setNewEmployee({ ...newEmployee, position: e.target.value })}
        >
          <option value="Nhan vien kinh doanh">Nhan vien kinh doanh</option>
          <option value="Ke toan">Ke toan</option>
          <option value="Quan ly">Quan ly</option>
          <option value="Nhan vien ho tro">Nhan vien ho tro</option>
        </select>
        <input
          type="date"
          value={newEmployee.birthday}
          onChange={(e) => setNewEmployee({ ...newEmployee, birthday: e.target.value })}
        />
        <input
          type="text"
          placeholder="Phone"
          value={newEmployee.phone}
          onChange={(e) => setNewEmployee({ ...newEmployee, phone: e.target.value })}
        />
        <input
          type="number"
          placeholder="Branch ID"
          value={newEmployee.branch_id}
          onChange={(e) => setNewEmployee({ ...newEmployee, branch_id: e.target.value })}
        />
        <input
          type="date"
          value={newEmployee.joinedtime}
          onChange={(e) => setNewEmployee({ ...newEmployee, joinedtime: e.target.value })}
        />
        <button className="btn-green" onClick={handleAddEmployee}>
          Add Employee
        </button>
      </div>

      {/* Edit Employee Form */}
      {editEmployee && (
        <div className="edit-employee">
          <h3>Edit Employee</h3>
          <input
            type="text"
            value={editEmployee.name}
            onChange={(e) => setEditEmployee({ ...editEmployee, name: e.target.value })}
          />
          <select
            value={editEmployee.position}
            onChange={(e) => setEditEmployee({ ...editEmployee, position: e.target.value })}
          >
            <option value="Nhan vien kinh doanh">Nhan vien kinh doanh</option>
            <option value="Ke toan">Ke toan</option>
            <option value="Quan ly">Quan ly</option>
            <option value="Nhan vien ho tro">Nhan vien ho tro</option>
          </select>
          <input
            type="date"
            value={editEmployee.birthday}
            onChange={(e) => setEditEmployee({ ...editEmployee, birthday: e.target.value })}
          />
          <input
            type="text"
            value={editEmployee.phone}
            onChange={(e) => setEditEmployee({ ...editEmployee, phone: e.target.value })}
          />
          <input
            type="number"
            value={editEmployee.branch_id}
            onChange={(e) => setEditEmployee({ ...editEmployee, branch_id: e.target.value })}
          />
          <input
            type="date"
            value={editEmployee.joinedtime}
            onChange={(e) => setEditEmployee({ ...editEmployee, joinedtime: e.target.value })}
          />
          <input
            type="text"
            value={editEmployee.status}
            onChange={(e) => setEditEmployee({ ...editEmployee, status: e.target.value })}
          />
          <button className="btn-green" onClick={handleUpdateEmployee}>
            Update
          </button>
          <button className="btn-red" onClick={() => setEditEmployee(null)}>
            Cancel
          </button>
        </div>
      )}

      {/* Employee List */}
      <ul className="employee-list">
        {employees.map((employee) => (
          <li key={employee.employee_id}>
            <span>
              {employee.name} - {employee.position} - {employee.status}
            </span>
            <button
              className="btn-blue"
              onClick={() => setEditEmployee(employee)}
            >
              Edit
            </button>
            <button
              className="btn-red"
              onClick={() => handleDeleteEmployee(employee.employee_id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EmployeePanel;