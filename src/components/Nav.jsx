'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import styles from './Nav.module.css';

const Nav = () => {
    const [scrolled, setScrolled] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleMenu = () => setIsOpen(!isOpen);

    return (
        <nav className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`}>
            <div className={styles.logo}>
                <Link href="/">Innovathon <span>2026</span></Link>
            </div>
            
            <button className={styles.hamburger} onClick={toggleMenu} aria-label="Toggle menu">
                {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            <div className={`${styles.links} ${isOpen ? styles.active : ''}`}>
                <a href="#about" onClick={() => setIsOpen(false)}>About</a>
                <a href="#benefits" onClick={() => setIsOpen(false)}>Benefits</a>
                <a href="#procedure" onClick={() => setIsOpen(false)}>Procedure</a>
                <Link href="/register" className={styles.navBtn} onClick={() => setIsOpen(false)}>Register Now</Link>
            </div>
        </nav>
    );
};

export default Nav;
