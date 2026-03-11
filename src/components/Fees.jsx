'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';
import styles from './Fees.module.css';

gsap.registerPlugin(ScrollTrigger);

const Fees = () => {
  const cardRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(cardRef.current,
        { scale: 0.9, opacity: 0 },
        {
          scrollTrigger: {
            trigger: cardRef.current,
            start: 'top 95%',
            once: true
          },
          scale: 1,
          opacity: 1,
          duration: 1,
          ease: 'power3.out'
        }
      );
    }, cardRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className={styles.fees}>
      <div ref={cardRef} className={`${styles.card} glass`}>
        <h3>Participation Fee</h3>
        <div className={styles.price}>₹250</div>
        <p className={styles.text}>
          This fee confirms your registration and supports the evaluation and development process of innovative ideas.
        </p>
        <Link href="/register" className="glow-btn">Register for Innovathon</Link>
      </div>
    </section>
  );
};

export default Fees;
