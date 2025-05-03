import React, { useState } from 'react';
import { calculateRevenue } from '../services/ApartmentManager';

function RevenuePanel() {
    const [branch, setBranch] = useState('');
    const [revenue, setRevenue] = useState(0);

    const handleCalculate = () => {
        const result = calculateRevenue(branch, 'month');
        setRevenue(result);
    };

    return (
        <div className="panel">
            <h2>Doanh Thu</h2>
            <input
                placeholder="Tên chi nhánh"
                value={branch}
                onChange={(e) => setBranch(e.target.value)}
            />
            <button className="btn-blue" onClick={handleCalculate}>Tính</button>
            <p>Doanh thu: {revenue} VND</p>
        </div>
    );
}

export default RevenuePanel;