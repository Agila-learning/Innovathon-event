import RegistrationForm from '@/components/RegistrationForm';
import styles from './RegistrationPage.module.css';
import Script from 'next/script';

export const metadata = {
    title: 'Register | Innovathon 2026',
    description: 'Join Innovathon 2026 and showcase your innovation to the world.',
};

export default function RegisterPage() {
    return (
        <div className={styles.container}>
            <div className={styles.overlay}></div>
            <div className={styles.content}>
                <div className={styles.header}>
                    <a href="/" className={styles.backLink}>← Back to Home</a>
                    <h1 className="gradient-text">Register for Innovathon 2026</h1>
                    <p>Fill in the details below to secure your spot.</p>
                </div>
                <RegistrationForm />
            </div>
        </div>
    );
}
