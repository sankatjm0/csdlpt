import React, { useState } from 'react';
import { getEmployees, addEmployee, deleteEmployee } from '../services/ApartmentManager';

function EmployeePanel() {
    const [employeeData, setEmployeeData] = useState({ name: '', position: '' });
    const employees = getEmployees();

    const handleAdd = () => {
        addEmployee(employeeData);
        setEmployeeData({ name: '', position: '' });
    };

    return (
        <div className="panel">
            <h2>Nhân Viên</h2>
            <div>
                <input
                    placeholder="Tên"
                    value={employeeData.name}
                    onChange={e => setEmployeeData({ ...employeeData, name: e.target.value })}
                />
                <input
                    placeholder="Chức vụ"
                    value={employeeData.position}
                    onChange={e => setEmployeeData({ ...employeeData, position: e.target.value })}
                />
                <button className="btn-green" onClick={handleAdd}>Thêm</button>
            </div>
            <ul>
                {employees.map(e => (
                    <li key={e.id}>
                        {e.name} - {e.position}
                        <button className="btn-red" onClick={() => deleteEmployee(e.id)}>Xóa</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default EmployeePanel;