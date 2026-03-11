import Link from 'next/link';
import styles from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.cta}>
        <h2 className="gradient-text">Join Innovathon 2026</h2>
        <p>
          Antigraviity invites all tech enthusiasts, developers, designers, and innovators to participate in this exciting event and showcase their creativity.
        </p>
        <p className={styles.highlight}>
          Your idea could be the next breakthrough innovation that changes society.
        </p>
        <Link href="/register" className="glow-btn">Register Now and Turn Your Vision into Reality</Link>
      </div>

      <div className={styles.quotes}>
        <div className={`${styles.quoteCard} glass`}>
          <p>“Ideas are powerful, but implementation makes them extraordinary.”</p>
        </div>
        <div className={`${styles.quoteCard} glass`}>
          <p>“Do not wait for opportunities — create them.”</p>
        </div>
        <div className={`${styles.quoteCard} glass`}>
          <p>“The next big innovation could come from you.”</p>
        </div>
      </div>

      <div className={styles.bottom}>
        <div className={styles.brand}>
          <h3>Antigraviity</h3>
          <p>Empowering Ideas. Building the Future.</p>
        </div>
        <div className={styles.copyright}>
          &copy; {new Date().getFullYear()} Antigraviity. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
