import React, { useState, useEffect } from 'react';

const RevenuePanel = () => {
  const [sales, setSales] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1); // Default to current month
  const [totalRevenue, setTotalRevenue] = useState(0);

  // Fetch all sales on component mount
  useEffect(() => {
    fetchSales();
  }, []);

  const fetchSales = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/sales');
      const data = await response.json();
      setSales(data);
      calculateRevenue(data, selectedMonth);
    } catch (error) {
      console.error('Error fetching sales:', error);
    }
  };

  const calculateRevenue = (salesData, month) => {
    const filteredSales = salesData.filter(sale => {
      const saleDate = new Date(sale.sale_date);
      return saleDate.getMonth() + 1 === month;
    });
    const total = filteredSales.reduce((sum, sale) => sum + parseFloat(sale.amount || 0), 0);
    setTotalRevenue(total);
  };

  const handleMonthChange = (e) => {
    const month = parseInt(e.target.value);
    setSelectedMonth(month);
    calculateRevenue(sales, month);
  };

  return (
    <div className="content">
      <div className="revenue-panel">
        <h2>Revenue Management</h2>

        {/* Month Filter */}
        <div className="revenue-panel__month-filter">
          <label>Select Month: </label>
          <select value={selectedMonth} onChange={handleMonthChange}>
            {Array.from({ length: 12 }, (_, i) => i + 1).map(month => (
              <option key={month} value={month}>{month}</option>
            ))}
          </select>
        </div>

        {/* Sales List */}
        <ul className="revenue-panel__sales-list">
          {sales
            .filter(sale => {
              const saleDate = new Date(sale.sale_date);
              return saleDate.getMonth() + 1 === selectedMonth;
            })
            .map(sale => (
              <li key={sale.sale_id} className="revenue-panel__sales-list-item">
                <span>
                  ID: {sale.sale_id} | Customer: {sale.customer_name} | Apartment: {sale.apartment_name} | Amount: {sale.amount}
                </span>
              </li>
            ))}
        </ul>

        {/* Total Revenue */}
        <div className="revenue-panel__total-revenue">
          <h3>Total Revenue: {totalRevenue.toFixed(2)}</h3>
        </div>
      </div>
    </div>
  );
};

export default RevenuePanel;