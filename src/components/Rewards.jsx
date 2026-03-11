'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Trophy, Star, Briefcase, GraduationCap, FileCheck, TrendingUp } from 'lucide-react';
import styles from './Rewards.module.css';

gsap.registerPlugin(ScrollTrigger);

const Rewards = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.reward-card',
        { y: 60, opacity: 0 },
        {
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 95%',
            once: true
          },
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out'
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const rewards = [
    { title: 'Best Idea Winner', icon: <Trophy size={48} />, desc: 'Recognition for the most impactful solution.' },
    { title: 'Direct Job Offer', icon: <GraduationCap size={48} />, desc: 'Exclusive job opportunities at Antigraviity.' },
    { title: 'Highest Salary Package', icon: <TrendingUp size={48} />, desc: 'Competitive packages for top-performing candidates.' },
    { title: 'Internship Offers', icon: <Briefcase size={48} />, desc: 'Hands-on experience with the Antigraviity team.' },
    { title: 'E-Certificate', icon: <FileCheck size={48} />, desc: 'Official participation certificate for everyone.' },
    { title: 'Future Eligibility', icon: <Star size={48} />, desc: 'Preferred status for future roles at Antigraviity.' }
  ];

  return (
    <section className={styles.rewards}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className="gradient-text">Rewards & Opportunities</h2>
          <p>Excellence deserves exceptional recognition.</p>
        </div>

        <div className={styles.grid}>
          {rewards.map((reward, index) => (
            <div key={index} className={`${styles.card} glass reward-card`}>
              <div className={styles.icon}>{reward.icon}</div>
              <h3>{reward.title}</h3>
              <p>{reward.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Rewards;
