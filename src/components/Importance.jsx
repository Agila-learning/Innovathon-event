'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Lightbulb, Users, Globe, Rocket, Code, Briefcase } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);
import styles from './Importance.module.css';

const Importance = () => {
  const sectionRef = useRef(null);

  const points = [
    {
      title: 'Encouraging Innovation',
      desc: 'Nurturing the creative spark in students across India.',
      icon: <Lightbulb size={32} />
    },
    {
      title: 'Real-world Solutions',
      desc: 'Solving pressing societal problems with tech.',
      icon: <Globe size={32} />
    },
    {
      title: 'Bridging the Gap',
      desc: 'Turning hypothetical ideas into working implementations.',
      icon: <Rocket size={32} />
    },
    {
      title: 'Youth Exposure',
      desc: 'Giving young developers a platform to shine.',
      icon: <Users size={32} />
    },
    {
      title: 'Industry Ready',
      desc: 'Developing skills that matter in the modern tech era.',
      icon: <Code size={32} />
    },
    {
      title: 'Opportunity Hub',
      desc: 'Connecting top talent with professional growth.',
      icon: <Briefcase size={32} />
    }
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.importance-card',
        { y: 40, opacity: 0 },
        {
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 95%',
            once: true
          },
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out'
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className={styles.importance}>
      <div className={styles.header}>
        <h2 className="gradient-text">Why Innovathon Matters</h2>
        <p>Creating impact through technology and original thinking.</p>
      </div>

      <div className={styles.grid}>
        {points.map((point, index) => (
          <div key={index} className={`${styles.card} glass importance-card`}>
            <div className={styles.iconWrapper}>
              {point.icon}
            </div>
            <h3>{point.title}</h3>
            <p>{point.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Importance;
