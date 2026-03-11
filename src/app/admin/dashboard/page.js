'use client';
import { useState, useEffect } from 'react';
import styles from './AdminDashboard.module.css';
import * as XLSX from 'xlsx';

export default function AdminDashboard() {
    const [registrations, setRegistrations] = useState([]);
    const [filtered, setFiltered] = useState([]);
    const [search, setSearch] = useState('');
    const [filterStatus, setFilterStatus] = useState('all');
    const [isLoading, setIsLoading] = useState(true);
    const [stats, setStats] = useState({ total: 0, completed: 0, revenue: 0 });
    const [settings, setSettings] = useState({ deadline: '', announcement: '' });

    useEffect(() => {
        const token = localStorage.getItem('admin_token');
        if (!token) {
            window.location.href = '/admin/login';
            return;
        }
        fetchRegistrations();
        fetchSettings();
    }, []);

    const fetchSettings = async () => {
        try {
            const res = await fetch('/api/admin/settings');
            const data = await res.json();
            if (data.success) {
                const s = {};
                data.settings.forEach(item => s[item.key] = item.value);
                setSettings(prev => ({ ...prev, ...s }));
            }
        } catch (error) {
            console.error(error);
        }
    };

    const updateSetting = async (key, value) => {
        try {
            const res = await fetch('/api/admin/settings', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ key, value }),
            });
            if (res.ok) fetchSettings();
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        let result = registrations;
        if (search) {
            result = result.filter(reg =>
                reg.fullName.toLowerCase().includes(search.toLowerCase()) ||
                reg.emailAddress.toLowerCase().includes(search.toLowerCase()) ||
                reg.registrationId?.toLowerCase().includes(search.toLowerCase())
            );
        }
        if (filterStatus === 'shortlisted') {
            result = result.filter(reg => reg.shortlisted);
        } else if (filterStatus !== 'all') {
            result = result.filter(reg => reg.paymentStatus === filterStatus);
        }
        setFiltered(result);
    }, [search, filterStatus, registrations]);

    const fetchRegistrations = async () => {
        setIsLoading(true);
        try {
            const res = await fetch('/api/admin/registrations');
            const data = await res.json();
            if (data.success) {
                setRegistrations(data.registrations);
                setFiltered(data.registrations);
                calculateStats(data.registrations);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    const calculateStats = (data) => {
        const total = data.length;
        const completed = data.filter(r => r.paymentStatus === 'completed').length;
        const revenue = completed * 250;
        setStats({ total, completed, revenue });
    };

    const toggleShortlist = async (id, current) => {
        try {
            const res = await fetch('/api/admin/registrations', {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id, updates: { shortlisted: !current } }),
            });
            const data = await res.json();
            if (data.success) {
                setRegistrations(prev => prev.map(reg => reg._id === id ? { ...reg, shortlisted: !current } : reg));
            }
        } catch (error) {
            console.error(error);
        }
    };

    const updateStatus = async (id, status) => {
        try {
            const res = await fetch('/api/admin/registrations', {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id, updates: { paymentStatus: status } }),
            });
            const data = await res.json();
            if (data.success) {
                setRegistrations(prev => prev.map(reg => reg._id === id ? { ...reg, paymentStatus: status } : reg));
                calculateStats(registrations.map(reg => reg._id === id ? { ...reg, paymentStatus: status } : reg));
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('admin_token');
        window.location.href = '/admin/login';
    };

    const exportToExcel = () => {
        const dataToExport = registrations.map(reg => ({
            'Registration ID': reg.registrationId,
            'Full Name': reg.fullName,
            'Email': reg.emailAddress,
            'Mobile': reg.mobileNumber,
            'College': reg.collegeName,
            'Department': reg.department,
            'Year': reg.yearOfStudy,
            'Project Title': reg.projectTitle,
            'Idea Description': reg.shortIdeaDescription,
            'Status': reg.paymentStatus,
            'Shortlisted': reg.shortlisted ? 'Yes' : 'No',
            'Submission Date': new Date(reg.createdAt).toLocaleDateString()
        }));

        const worksheet = XLSX.utils.json_to_sheet(dataToExport);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Registrations");
        XLSX.writeFile(workbook, "Innovathon_2026_Full_Data.xlsx");
    };

    if (isLoading) return <div className={styles.loading}>Loading Dashboard...</div>;

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <div className={styles.brand}>
                    <h1 className="gradient-text">Innovathon 2026 Admin</h1>
                    <p>Total Registrations: {stats.total} | Revenue: ₹{stats.revenue}</p>
                </div>
                <div className={styles.actions}>
                    <button onClick={exportToExcel} className={styles.exportBtn}>Download Full Data (Excel)</button>
                    <button onClick={handleLogout} className={styles.logoutBtn}>Logout</button>
                </div>
            </header>

            <div className={styles.adminControls}>
                <div className={`${styles.controlCard} glass`}>
                    <h3>Submission Deadline</h3>
                    <input
                        type="date"
                        value={settings.deadline}
                        onChange={(e) => updateSetting('deadline', e.target.value)}
                    />
                </div>
                <div className={`${styles.controlCard} glass`}>
                    <h3>Global Announcement</h3>
                    <div className={styles.announcementRow}>
                        <textarea
                            value={settings.announcement}
                            onChange={(e) => setSettings(prev => ({ ...prev, announcement: e.target.value }))}
                            placeholder="Live announcement text..."
                        />
                        <button onClick={() => updateSetting('announcement', settings.announcement)}>Post</button>
                    </div>
                </div>
            </div>

            <div className={styles.filters}>
                <input
                    type="text"
                    placeholder="Search name, email, or ID..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className={`${styles.search} glass`}
                />
                <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className={`${styles.select} glass`}
                >
                    <option value="all">All Status</option>
                    <option value="shortlisted">Shortlisted</option>
                    <option value="completed">Completed</option>
                    <option value="pending">Pending</option>
                    <option value="failed">Failed</option>
                </select>
            </div>

            <div className={`${styles.tableWrapper} glass`}>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Participant</th>
                            <th>College</th>
                            <th>Status</th>
                            <th>Shortlist</th>
                            <th>Project & Report</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filtered.map((reg) => (
                            <tr key={reg._id}>
                                <td>{reg.registrationId || 'N/A'}</td>
                                <td>
                                    <div className={styles.nameCell}>
                                        <strong>{reg.fullName}</strong>
                                        <span>{reg.emailAddress}</span>
                                    </div>
                                </td>
                                <td>{reg.collegeName}</td>
                                <td>
                                    <span className={`${styles.statusBadge} ${styles[reg.paymentStatus]}`}>
                                        {reg.paymentStatus}
                                    </span>
                                </td>
                                <td>
                                    <button
                                        onClick={() => toggleShortlist(reg._id, reg.shortlisted)}
                                        className={`${styles.shortlistBtn} ${reg.shortlisted ? styles.active : ''}`}
                                    >
                                        {reg.shortlisted ? '★' : '☆'}
                                    </button>
                                </td>
                                <td>
                                    <div className={styles.projectCell}>
                                        <strong>{reg.projectTitle}</strong>
                                        <div className={styles.links}>
                                            {reg.githubLink && <a href={reg.githubLink} target="_blank">GitHub</a>}
                                            {reg.reportPdf && (
                                                <a href={reg.reportPdf} target="_blank" className={styles.pdfLink}>Report (PDF)</a>
                                            )}
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <div className={styles.tableActions}>
                                        <button onClick={() => updateStatus(reg._id, 'completed')} className={styles.completeBtn} title="Complete">✓</button>
                                        <button onClick={() => updateStatus(reg._id, 'failed')} className={styles.failBtn} title="Fail">✗</button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
