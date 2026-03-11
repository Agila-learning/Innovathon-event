'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './ResultAnnouncement.module.css';

gsap.registerPlugin(ScrollTrigger);

const ResultAnnouncement = () => {
    const sectionRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo('.result-content',
                { scale: 0.9, opacity: 0 },
                {
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top 95%',
                        once: true
                    },
                    scale: 1,
                    opacity: 1,
                    duration: 1,
                    ease: 'power3.out'
                }
            );
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className={styles.results} id="results">
            <div className={`${styles.card} glass result-content`}>
                <h2 className="gradient-text">Result Announcement</h2>
                <p>
                    The results will be officially announced within 7 days after the idea submission deadline.
                    Stay tuned to your registered email and our official portal for the announcement of the top-performing teams and individuals.
                </p>
                <div className={styles.badge}>Coming Soon - 2026</div>
            </div>
        </section>
    );
};

export default ResultAnnouncement;
