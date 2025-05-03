import React from 'react';

function Sidebar({ menuItems, setActiveFeature, activeFeature }) {
    return (
        <div className="sidebar">
            <h2>Quản Lý</h2>
            <ul>
                {menuItems.map((item) => (
                    <li
                        key={item.feature}
                        className={activeFeature === item.feature ? 'active' : ''}
                        onClick={() => setActiveFeature(item.feature)}
                    >
                        {item.label}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Sidebar;