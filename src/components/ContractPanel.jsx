import React, { useState } from 'react';
import { getContracts, addContract, deleteContract } from '../services/ApartmentManager';

function ContractPanel() {
    const [contractData, setContractData] = useState({ tenant: '', amount: 0, branch: '' });
    const contracts = getContracts();

    const handleAdd = () => {
        addContract(contractData);
        setContractData({ tenant: '', amount: 0, branch: '' });
    };

    return (
        <div className="panel">
            <h2>Hợp Đồng</h2>
            <div>
                <input
                    placeholder="Tên khách"
                    value={contractData.tenant}
                    onChange={e => setContractData({ ...contractData, tenant: e.target.value })}
                />
                <input
                    type="number"
                    placeholder="Số tiền"
                    value={contractData.amount}
                    onChange={e => setContractData({ ...contractData, amount: Number(e.target.value) })}
                />
                <input
                    placeholder="Chi nhánh"
                    value={contractData.branch}
                    onChange={e => setContractData({ ...contractData, branch: e.target.value })}
                />
                <button className="btn-green" onClick={handleAdd}>Thêm</button>
            </div>
            <ul>
                {contracts.map(c => (
                    <li key={c.id}>
                        {c.tenant} - {c.amount} VND
                        <button className="btn-red" onClick={() => deleteContract(c.id)}>Xóa</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ContractPanel;