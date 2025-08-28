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
        <>

            <section>
                <div className="container py-4">
                    <h4 className="mb-4 fw-bold text-primary text-center">Manage Stats</h4>
                    {/* Form */}
                    <div className="row justify-content-center">
                        <div className="col-md-12 col-12">
                            <div className="card shadow-sm border mb-4">
                                <div className="card-body">
                                    <div className="mb-3">
                                        <label className="form-label fw-semibold">
                                            Icon <span className="text-danger">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="e.g., bi bi-person, bi bi-book"
                                            value={form.icon}
                                            onChange={(e) =>
                                                setForm({ ...form, icon: e.target.value })
                                            }
                                            required
                                        />
                                    </div>

                                    <div className="mb-3">
                                        <label className="form-label fw-semibold">
                                            Value <span className="text-danger">*</span>
                                        </label>
                                        <input
                                            className="form-control"
                                            placeholder="Value"
                                            type="number"
                                            value={form.value}
                                            onChange={(e) =>
                                                setForm({ ...form, value: +e.target.value })
                                            }
                                        />
                                    </div>

                                    <div className="mb-3">
                                        <label className="form-label fw-semibold">
                                            Label <span className="text-danger">*</span>
                                        </label>
                                        <input
                                            className="form-control"
                                            placeholder="Label"
                                            value={form.label}
                                            onChange={(e) =>
                                                setForm({ ...form, label: e.target.value })
                                            }
                                        />
                                    </div>

                                    <div className="d-flex gap-2">
                                        <button className="btn btn-primary" onClick={handleSubmit}>
                                            {form._id ? "Update" : "Add"} Stat
                                        </button>
                                        {form._id && (
                                            <button
                                                className="btn btn-secondary"
                                                onClick={() =>
                                                    setForm({ icon: "", value: 0, label: "" })
                                                }
                                            >
                                                Cancel
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                   

                    {/* Stats Cards */}
                    <div className="row">
                        {stats.map((stat) => (
                            <div
                                key={stat._id}
                                className="col-xl-3 col-lg-4 col-md-6 col-12 mb-4"
                            >
                                <div className="card border-0 shadow-sm h-100 text-center">
                                    <div className="card-body">
                                        <i className={`${stat.icon} fs-1 text-primary mb-2`}></i>
                                        <h5 className="fw-bold">{stat.value.toLocaleString()}+</h5>
                                        <p className="text-muted">{stat.label}</p>
                                        <div className="d-flex justify-content-center gap-2 mt-2">
                                            <button
                                                onClick={() => handleEdit(stat)}
                                                className="btn btn-sm btn-warning"
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => handleDelete(stat._id!)}
                                                className="btn btn-sm btn-danger"
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    
                </div>
            </section>


        </>
    );
}
