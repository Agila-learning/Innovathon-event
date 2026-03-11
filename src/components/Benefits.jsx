'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Award, Briefcase, GraduationCap, FileCheck, Shield, Rocket } from 'lucide-react';
import styles from './Benefits.module.css';

gsap.registerPlugin(ScrollTrigger);

const Benefits = () => {
  const sectionRef = useRef(null);

  const benefits = [
    {
      title: 'Real Innovation Ecosystem',
      desc: 'Gain exposure to how startups and innovators work.',
      icon: <Rocket size={40} />
    },
    {
      title: 'Internship Opportunities',
      desc: 'Top performers get exclusive internship offers at Antigraviity.',
      icon: <Briefcase size={40} />
    },
    {
      title: 'Direct Job Offers',
      desc: 'Exception ideas can land you a direct job role at Antigraviity.',
      icon: <GraduationCap size={40} />
    },
    {
      title: 'E-Certificates',
      desc: 'All valid participants receive a recognized e-certificate.',
      icon: <FileCheck size={40} />
    },
    {
      title: 'Recognition',
      desc: 'Get your work recognized by industry experts at Antigraviity.',
      icon: <Award size={40} />
    },
    {
      title: 'Social Impact',
      desc: 'Build something that actually helps people and society.',
      icon: <Shield size={40} />
    }
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.benefit-card', 
        { scale: 0.8, opacity: 0, y: 30 },
        {
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 95%',
            once: true
          },
          scale: 1,
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power2.out'
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className={styles.benefits}>
      <div className={styles.header}>
        <h2 className="gradient-text">Benefits of Participating</h2>
        <p>Your effort deserves exceptional rewards.</p>
      </div>

      <div className={styles.grid}>
        {benefits.map((benefit, index) => (
          <div key={index} className={`${styles.card} glass benefit-card`}>
            <div className={styles.glow}></div>
            <div className={styles.icon}>
              {benefit.icon}
            </div>
            <h3>{benefit.title}</h3>
            <p>{benefit.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Benefits;
