'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './ParticipationProcedure.module.css';

gsap.registerPlugin(ScrollTrigger);

const ParticipationProcedure = () => {
  const sectionRef = useRef(null);

  const steps = [
    {
      num: '01',
      title: 'Fill the Form',
      desc: 'Complete the official participation form with your basic and project details.'
    },
    {
      num: '02',
      title: 'Describe Your Idea',
      desc: 'Explain your innovative idea, the problem it solves, and its societal benefits.'
    },
    {
      num: '03',
      title: 'Provide Idea Code',
      desc: 'Submit the technical concept or code repository that supports your implementation.'
    },
    {
      num: '04',
      title: 'Make Payment',
      desc: 'Pay the ₹250 participation fee through the integrated payment gateway.'
    },
    {
      num: '05',
      title: 'Submit & Confirm',
      desc: 'Submit the form and receive your official registration confirmation and ID.'
    }
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.procedure-card',
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
          stagger: 0.1,
          ease: 'power2.out'
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className={styles.procedure}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className="gradient-text">How to Participate</h2>
          <p>Follow these simple steps to join the revolution.</p>
        </div>

        <div className={styles.grid}>
          {steps.map((step, index) => (
            <div key={index} className={`${styles.card} glass procedure-card`}>
              <div className={styles.number}>{step.num}</div>
              <h3>{step.title}</h3>
              <p>{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ParticipationProcedure;
