'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './ProgramProcedure.module.css';

gsap.registerPlugin(ScrollTrigger);

const ProgramProcedure = () => {
  const sectionRef = useRef(null);

  const steps = [
    {
      step: 'Step 1',
      title: 'Registration',
      desc: 'Participants must enroll through the official registration form provided by Antigraviity.'
    },
    {
      step: 'Step 2',
      title: 'Registration Fee',
      desc: 'A participation fee of ₹250 is required to confirm the registration.'
    },
    {
      step: 'Step 3',
      title: 'Project Development',
      desc: 'Build a real-time solution based on current societal problems using IT, AI, ML, or Data Science.'
    },
    {
      step: 'Step 4',
      title: 'Submission Requirements',
      desc: 'Submit GitHub repository link, Live deployed URL, and a Project explanation video.'
    }
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.timeline-item',
        { opacity: 0, y: 50 },
        {
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 95%',
            once: true
          },
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: 'power3.out'
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className={styles.procedure}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className="gradient-text">Program Procedure</h2>
          <p>Your journey from registration to innovation.</p>
        </div>

        <div className={styles.timeline}>
          {steps.map((item, index) => (
            <div key={index} className={`${styles.item} timeline-item`}>
              <div className={styles.dotWrapper}>
                <div className={styles.dot}></div>
                {index !== steps.length - 1 && <div className={styles.line}></div>}
              </div>
              <div className={`${styles.content} glass`}>
                <span className={styles.stepLabel}>{item.step}</span>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProgramProcedure;
