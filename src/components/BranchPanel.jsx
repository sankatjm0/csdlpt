
import React, { useState, useEffect } from 'react';
import {
    getBranches,
    addBranch,
    deleteBranch,
    updateBranch
} from '../services/ApartmentDataService';

const BranchPanel = () => {
    const [branches, setBranches] = useState([]);
    const [editingId, setEditingId] = useState(null);
    const [newBranch, setNewBranch] = useState({ name: '', address: '' });

    useEffect(() => {
        setBranches(getBranches());
    }, []);

    const handleEdit = (id) => {
        setEditingId(id);
    };

    const handleSave = (id) => {
        const branch = branches.find(b => b.id === id);
        updateBranch(id, branch);
        setEditingId(null);
    };

    const handleDelete = (id) => {
        deleteBranch(id);
        setBranches(getBranches());
    };

    const handleChange = (id, field, value) => {
        setBranches(branches.map(branch =>
            branch.id === id ? { ...branch, [field]: value } : branch
        ));
    };

    const handleNewChange = (field, value) => {
        setNewBranch({ ...newBranch, [field]: value });
    };

    const handleAdd = () => {
        if (!newBranch.name || !newBranch.address) return;
        addBranch(newBranch);
        setBranches(getBranches());
        setNewBranch({ name: '', address: '' });
    };

    return (
        <div>
            <h2>Quản lý Chi nhánh</h2>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Tên</th>
                        <th>Địa chỉ</th>
                        <th>Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {branches.map(branch => (
                        <tr key={branch.id}>
                            <td>{branch.id}</td>
                            <td>
                                {editingId === branch.id ? (
                                    <input
                                        value={branch.name}
                                        onChange={(e) => handleChange(branch.id, 'name', e.target.value)}
                                    />
                                ) : (
                                    branch.name
                                )}
                            </td>
                            <td>
                                {editingId === branch.id ? (
                                    <input
                                        value={branch.address}
                                        onChange={(e) => handleChange(branch.id, 'address', e.target.value)}
                                    />
                                ) : (
                                    branch.address
                                )}
                            </td>
                            <td>
                                {editingId === branch.id ? (
                                    <button onClick={() => handleSave(branch.id)}>Lưu</button>
                                ) : (
                                    <button onClick={() => handleEdit(branch.id)}>Sửa</button>
                                )}
                                <button onClick={() => handleDelete(branch.id)}>Xóa</button>
                            </td>
                        </tr>
                    ))}
                    <tr>
                        <td>--</td>
                        <td>
                            <input
                                value={newBranch.name}
                                onChange={(e) => handleNewChange('name', e.target.value)}
                                placeholder="Tên chi nhánh"
                            />
                        </td>
                        <td>
                            <input
                                value={newBranch.address}
                                onChange={(e) => handleNewChange('address', e.target.value)}
                                placeholder="Địa chỉ"
                            />
                        </td>
                        <td>
                            <button onClick={handleAdd}>Thêm</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default BranchPanel;
