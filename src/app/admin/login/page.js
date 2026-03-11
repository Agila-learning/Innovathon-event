'use client';
import { useState } from 'react';
import styles from './AdminLogin.module.css';

export default function AdminLogin() {
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = (e) => {
        e.preventDefault();
        if (password === 'Admin@Innovathon2026') { // Hardcoded for demo/simplicity or use env
            localStorage.setItem('admin_token', 'authenticated');
            window.location.href = '/admin/dashboard';
        } else {
            setError('Invalid admin credentials');
        }
    };

    return (
        <div className={styles.container}>
            <form className={`${styles.loginCard} glass`} onSubmit={handleLogin}>
                <h1 className="gradient-text">Admin Portal</h1>
                <p>Innovathon 2026 Management</p>
                <div className={styles.inputGroup}>
                    <label>Admin Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        required
                    />
                </div>
                {error && <p className={styles.error}>{error}</p>}
                <button type="submit" className="glow-btn">Login to Dashboard</button>
            </form>
        </div>
    );
}
