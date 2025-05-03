import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ManagementPage from './pages/ManagementPage';
import HomePage from './pages/HomePage';

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