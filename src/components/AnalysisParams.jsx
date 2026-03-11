'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './AnalysisParams.module.css';

gsap.registerPlugin(ScrollTrigger);

const AnalysisParams = () => {
  const sectionRef = useRef(null);

  const criteria = [
    { label: 'Originality of Idea', value: 95 },
    { label: 'Real-world Relevance', value: 90 },
    { label: 'Social Impact', value: 85 },
    { label: 'Technical Feasibility', value: 80 },
    { label: 'UI/UX and Usability', value: 85 },
    { label: 'Technical Implementation', value: 90 },
    { label: 'Scalability', value: 75 },
    { label: 'Presentation Quality', value: 80 },
    { label: 'GitHub Code Quality', value: 85 },
    { label: 'Deployment & Demo', value: 95 }
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.progress-bar-fill',
        { width: 0 },
        {
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 95%',
            once: true
          },
          width: (index) => `${criteria[index].value}%`,
          duration: 1.5,
          stagger: 0.1,
          ease: 'power4.out'
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className={styles.analysis}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className="gradient-text">Analyzing Parameters</h2>
          <p>How we evaluate your innovation.</p>
        </div>

        <div className={styles.grid}>
          {criteria.map((item, index) => (
            <div key={index} className={styles.criterion}>
              <div className={styles.labelRow}>
                <span>{item.label}</span>
                <span>{item.value}%</span>
              </div>
                <div className={styles.progressBar}>
                  <div
                    className={`${styles.fill} progress-bar-fill`}
                    style={{ '--target-width': `${item.value}%`, width: '0%' }}
                  ></div>
                </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AnalysisParams;
