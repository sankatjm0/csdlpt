import React, { useState } from 'react';
import { getApartments, addApartment, deleteApartment } from '../services/ApartmentManager';

function ApartmentPanel() {
    const [apartmentData, setApartmentData] = useState({ name: '', price: 0 });
    const apartments = getApartments();

    const handleAdd = () => {
        addApartment(apartmentData);
        setApartmentData({ name: '', price: 0 });
    };

    return (
        <div className="panel">
            <h2>Căn Hộ</h2>
            <div>
                <input
                    placeholder="Tên căn hộ"
                    value={apartmentData.name}
                    onChange={e => setApartmentData({ ...apartmentData, name: e.target.value })}
                />
                <input
                    type="number"
                    placeholder="Giá"
                    value={apartmentData.price}
                    onChange={e => setApartmentData({ ...apartmentData, price: Number(e.target.value) })}
                />
                <button className="btn-green" onClick={handleAdd}>Thêm</button>
            </div>
            <ul>
                {apartments.map(a => (
                    <li key={a.id}>
                        {a.name} - {a.price} VND
                        <button className="btn-red" onClick={() => deleteApartment(a.id)}>Xóa</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ApartmentPanel;