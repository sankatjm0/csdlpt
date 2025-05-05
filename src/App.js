import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ManagementPage from './pages/ManagementPage';
import HomePage from './pages/HomePage';

import './styles/Branch.css'
import './styles/Sales.css'
import './styles/Apartment.css'
import './styles/Employee.css'
import './styles/Revenue.css'

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/management" element={<ManagementPage />} />
            </Routes>
        </Router>
    );
}

export default App;