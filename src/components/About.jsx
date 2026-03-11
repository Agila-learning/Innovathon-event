'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './About.module.css';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const sectionRef = useRef(null);
  const quoteRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.about-content > *', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          once: true
        },
        y: 80,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: 'power4.out'
      });

      gsap.from(quoteRef.current, {
        scrollTrigger: {
          trigger: quoteRef.current,
          start: 'top 90%',
          once: true
        },
        y: 100,
        opacity: 0,
        duration: 1.2,
        ease: 'back.out(1.2)'
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className={styles.about} id="about">
      <div className={`${styles.container} about-content`}>
        <div className={styles.badge}>Our Vision</div>
        <h2 className="gradient-text">Fostering The Next <br /> Wave of Innovation</h2>

        <div className={styles.mainContent}>
          <div className={styles.description}>
            <h3>About Innovathon 2026</h3>
            <p>
              Innovathon 2026 is a premier Pan-India technology innovation event designed for visionary students and developers.
              Our mission is to bridge the gap between imagination and implementation.
            </p>
            <p>
              We focus on original, high-impact solutions that solve real-world problems. Whether it's AI, Robotics,
              or Sustainability, we provide the platform to showcase your breakthrough.
            </p>
          </div>

          <div className={styles.description}>
            <h3>Organized by Antigraviity</h3>
            <p>
              Antigraviity is an emerging technology startup dedicated to delivering innovative digital solutions.
              We empower ideas and build the future with a strong foundation in tech and creativity.
            </p>
            <div className={styles.offices}>
              <div className={styles.officeCard}>
                <h4>Bangalore</h4>
                <p>Tech Hub Office</p>
              </div>
              <div className={styles.officeCard}>
                <h4>Chennai</h4>
                <p>Strategic Hub</p>
              </div>
            </div>
          </div>
        </div>

        <div ref={quoteRef} className={`${styles.quoteCard} glass`}>
          <div className={styles.quoteItem}>
            <p>“Innovation begins with a single idea, but it transforms the world when collective minds ignite.”</p>
          </div>
          <div className={styles.divider}></div>
          <div className={styles.quoteItem}>
            <p>“Technology is our tool; empowering people to build a better tomorrow is our purpose.”</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
