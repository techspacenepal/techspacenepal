'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';


interface StatItem {
    _id?: string;
    icon: string;
    value: number;
    label: string;
}

export default function StatsAdminPanel() {
    const [stats, setStats] = useState<StatItem[]>([]);
    const [form, setForm] = useState<StatItem>({ icon: '', value: 0, label: '' });

    const fetchStats = async () => {
        try {
            const { data } = await axios.get('http://localhost:5000/api/stats');
            setStats(data);
        } catch (err) {
            toast.error('Failed to load stats');
        }
    };

    useEffect(() => {
        fetchStats();
    }, []);

    const handleSubmit = async () => {
        try {
            if (form._id) {
                await axios.put(`http://localhost:5000/api/stats/${form._id}`, form);
                toast.success('Updated');
            } else {
                await axios.post('http://localhost:5000/api/stats', form);
                toast.success('Created');
            }
            setForm({ icon: '', value: 0, label: '' });
            fetchStats();
        } catch {
            toast.error('Action failed');
        }
    };

    const handleEdit = (stat: StatItem) => {
        setForm(stat);
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Delete this stat?')) return;
        await axios.delete(`http://localhost:5000/api/stats/${id}`);
        fetchStats();
    };

    return (
        <div className="container py-4">
            <h4 className="mb-4">Manage Stats</h4>
            <div className="mb-3">
                <label className="form-label fw-semibold">
                    Icon <span className="text-danger">*</span>
                </label>
                <input
                    type="text"
                    className="form-control mb-3"
                    placeholder="e.g., bi bi-person, bi bi-book"
                    value={form.icon}
                    onChange={(e) => setForm({ ...form, icon: e.target.value })}
                    required
                />

                <label className="form-label fw-semibold">
                    Value <span className="text-danger">*</span>
                </label>
                <input
                    className="form-control mb-2"
                    placeholder="Value"
                    type="number"
                    value={form.value}
                    onChange={(e) => setForm({ ...form, value: +e.target.value })}
                />

                <label className="form-label fw-semibold">
                    Label <span className="text-danger">*</span>
                </label>
                <input
                    className="form-control mb-2"
                    placeholder="Label"
                    value={form.label}
                    onChange={(e) => setForm({ ...form, label: e.target.value })}
                />

                <div className="d-flex gap-2">
                    <button className="btn btn-primary" onClick={handleSubmit}>
                        {form._id ? 'Update' : 'Add'} Stat
                    </button>
                    {form._id && (
                        <button
                            className="btn btn-secondary"
                            onClick={() => setForm({ icon: '', value: 0, label: '' })}
                        >
                            Cancel
                        </button>
                    )}
                </div>
            </div>


            <hr />
            <div className="row">
                {stats.map((stat) => (
                    <div key={stat._id} className="col-md-3 mb-3">
                        <div className="border rounded p-3 text-center">
                            <i className={`${stat.icon} fs-2 text-primary`}></i>
                            <h5>{stat.value.toLocaleString()}+</h5>
                            <p>{stat.label}</p>
                            <button onClick={() => handleEdit(stat)} className="btn btn-sm btn-warning me-2">Edit</button>
                            <button onClick={() => handleDelete(stat._id!)} className="btn btn-sm btn-danger">Delete</button>
                        </div>
                    </div>
                ))}
            </div>

        </div>

    );
}
