'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Lightbulb, Code, Rocket, BrainCircuit, Cpu } from 'lucide-react';
import styles from './Hero.module.css';
import Link from 'next/link';

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
    const heroRef = useRef(null);
    const titleRef = useRef(null);
    const subtitleRef = useRef(null);
    const ctaRef = useRef(null);
    const illustRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(titleRef.current, 
                { y: 100, opacity: 0 },
                { y: 0, opacity: 1, duration: 1.2, ease: 'power4.out', delay: 0.2 }
            );
            gsap.fromTo(subtitleRef.current,
                { y: 50, opacity: 0 },
                { y: 0, opacity: 1, duration: 1.2, ease: 'power3.out', delay: 0.5 }
            );
            gsap.fromTo(ctaRef.current,
                { y: 30, opacity: 0 },
                { y: 0, opacity: 1, duration: 1, ease: 'power2.out', delay: 0.9 }
            );

            // Enhanced floating for illustration container
            gsap.to(illustRef.current, {
                y: 20,
                duration: 4,
                repeat: -1,
                yoyo: true,
                ease: 'sine.inOut'
            });

            // Particles/Stardust-like effect (conceptual background movement)
            gsap.to(`.${styles.hero}`, {
                backgroundPosition: '100% 100%',
                duration: 20,
                repeat: -1,
                yoyo: true,
                ease: 'none'
            });
        }, heroRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={heroRef} className={styles.hero}>
            <div className={styles.glow1}></div>
            <div className={styles.glow2}></div>
            <div className={styles.container}>
                <div className={styles.content}>
                    <div className={styles.badge}>Antigraviity Presents</div>
                    <h1 ref={titleRef} className="gradient-text">Innovathon 2026</h1>
                    <h2 ref={subtitleRef}>Empowering Ideas. Building the Future.</h2>
                    <p className={styles.tagline}>
                        The ultimate Pan-India innovation challenge for tech enthusiasts, developers, and visionaries. Transform your bold ideas into reality.
                    </p>
                    <div ref={ctaRef} className={styles.actions}>
                        <Link href="/register" className={`${styles.btnPrimary} glow-btn`}>Secure Your Spot</Link>
                        <a href="#about" className={styles.btnSecondary}>Explore Journey</a>
                    </div>
                </div>
                <div ref={illustRef} className={styles.illustration}>
                    <div className={styles.techContainer}>
                        <div className={styles.mainIconWrapper}>
                            <BrainCircuit size={100} className={styles.mainIcon} strokeWidth={1} />
                        </div>
                        <div className={styles.floatingIcon1}><Lightbulb size={36} /></div>
                        <div className={styles.floatingIcon2}><Code size={36} /></div>
                        <div className={styles.floatingIcon3}><Rocket size={36} /></div>
                        <div className={styles.floatingIcon4}><Cpu size={36} /></div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
