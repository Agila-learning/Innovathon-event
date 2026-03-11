'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { User, Users, ShieldAlert } from 'lucide-react';
import styles from './RegistrationDetails.module.css';

gsap.registerPlugin(ScrollTrigger);

const RegistrationDetails = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.reg-card',
        { y: 30, opacity: 0 },
        {
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 95%',
            once: true
          },
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.2,
          ease: 'power3.out'
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className={styles.details}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className="gradient-text">Participation Details</h2>
          <p>Important guidelines for all participants.</p>
        </div>

        <div className={styles.grid}>
          <div className={`${styles.card} glass reg-card`}>
            <div className={styles.icon}><Users size={32} /></div>
            <h3>Team Size</h3>
            <p>Participants can join individually or as a team of two members.</p>
          </div>
          <div className={`${styles.card} glass reg-card`}>
            <div className={styles.icon}><ShieldAlert size={32} /></div>
            <h3>Originality</h3>
            <p>The concept must be original and not implemented previously in society.</p>
          </div>
          <div className={`${styles.card} glass reg-card`}>
            <div className={styles.icon}><User size={32} /></div>
            <h3>Focus Area</h3>
            <p>The idea must focus on solving real-world societal problems using technology.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RegistrationDetails;
