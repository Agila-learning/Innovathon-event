'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from './Nav.module.css';

const Nav = () => {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`}>
            <div className={styles.logo}>
                <Link href="/">Innovathon <span>2026</span></Link>
            </div>
            <div className={styles.links}>
                <a href="#about">About</a>
                <a href="#benefits">Benefits</a>
                <a href="#procedure">Procedure</a>
                <Link href="/register" className={styles.navBtn}>Register Now</Link>
            </div>
        </nav>
    );
};

export default Nav;
