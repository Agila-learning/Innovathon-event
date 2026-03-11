'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Flag, UserPlus, ShieldCheck, Cpu, PlayCircle, Star } from 'lucide-react';
import styles from './KeyAspects.module.css';

gsap.registerPlugin(ScrollTrigger);

const KeyAspects = () => {
  const sectionRef = useRef(null);

  const aspects = [
    {
      title: 'Pan India Event',
      desc: 'Nationwide participation from students across all states.',
      icon: <Flag size={24} />
    },
    {
      title: 'Flexible Participation',
      desc: 'Join individually or as a team of two members.',
      icon: <UserPlus size={24} />
    },
    {
      title: 'Original Solutions',
      desc: 'Focus on problems not yet solved in current society.',
      icon: <ShieldCheck size={24} />
    },
    {
      title: 'Cutting-Edge Tech',
      desc: 'Innovate using IT, AI, ML, or Data Science.',
      icon: <Cpu size={24} />
    },
    {
      title: 'Complete Submission',
      desc: 'Submit GitHub repo, live URL, and explanation video.',
      icon: <PlayCircle size={24} />
    },
    {
      title: 'Expert Evaluation',
      desc: 'Graded on practical impact, originality, and tech depth.',
      icon: <Star size={24} />
    }
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.aspect-item',
        { y: 30, opacity: 0 },
        {
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 95%',
            once: true
          },
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.05,
          ease: 'power2.out'
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className={styles.aspects}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className="gradient-text">Key Aspects of Innovathon</h2>
          <p>The core pillars of our innovation ecosystem.</p>
        </div>

        <div className={styles.list}>
          {aspects.map((aspect, index) => (
            <div key={index} className={`${styles.item} aspect-item`}>
              <div className={styles.iconBox}>
                {aspect.icon}
              </div>
              <div className={styles.text}>
                <h3>{aspect.title}</h3>
                <p>{aspect.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default KeyAspects;
