import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import RevenuePanel from '../components/RevenuePanel';
import ContractPanel from '../components/SalesPanel';
import ApartmentPanel from '../components/ApartmentPanel';
import EmployeePanel from '../components/EmployeePanel';
import BranchPanel from '../components/BranchPanel';


// import '../styles/Contact.css'

function ManagementPage() {
    const [activeFeature, setActiveFeature] = useState('revenue');

    const menuItems = [
        { label: 'Doanh Thu', feature: 'revenue' },
        { label: 'Chi Nhánh', feature: 'branch' },
        { label: 'Hợp Đồng', feature: 'contracts' },
        { label: 'Căn Hộ', feature: 'apartments' },
        { label: 'Nhân Viên', feature: 'employees' },
    ];

    const renderContent = () => {
        switch (activeFeature) {
            case 'revenue':
                return <RevenuePanel />;
            case 'branch':
                return <BranchPanel />
            case 'contracts':
                return <ContractPanel />;
            case 'apartments':
                return <ApartmentPanel />;
            case 'employees':
                return <EmployeePanel />

            default:
                return <RevenuePanel />;
        }
    };

    return (
        <div className="app">
            <Sidebar menuItems={menuItems} setActiveFeature={setActiveFeature} activeFeature={activeFeature} />
            <div className="content">
                {renderContent()}
            </div>
        </div>
    );
}

export default ManagementPage;