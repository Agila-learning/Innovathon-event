'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { BrainCircuit, Network, Bot, Database, Terminal } from 'lucide-react';
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
            
            // Connectors animation
            gsap.to(`.${styles.connector}`, {
                strokeDashoffset: 0,
                duration: 2,
                repeat: -1,
                yoyo: true,
                ease: "power1.inOut",
                stagger: 0.5
            });

        }, heroRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={heroRef} className={styles.hero}>
            <div className={styles.glow1}></div>
            <div className={styles.glow2}></div>
            
            <div className={styles.binaryBg}>
                 <div className={styles.binaryColumn}>01010100 01100101 01100011 01101000</div>
                 <div className={styles.binaryColumn}>01000100 01100001 01110100 01100001</div>
                 <div className={styles.binaryColumn}>01001101 01101100 00100000 01000001</div>
            </div>

            <div className={styles.container}>
                <div className={styles.content}>
                    <div className={styles.badge}>Antigraviity Presents</div>
                    <h1 ref={titleRef} className="gradient-text">Innovathon 2026</h1>
                    <h2 ref={subtitleRef}>Empowering Ideas. Building the Future.</h2>
                    <p className={styles.tagline}>
                        The ultimate Pan-India innovation challenge for tech enthusiasts, developers, and visionaries. Transform your bold AI & Data ideas into reality.
                    </p>
                    <div ref={ctaRef} className={styles.actions}>
                        <Link href="/register" className={`${styles.btnPrimary} glow-btn`}>Secure Your Spot</Link>
                        <a href="#about" className={styles.btnSecondary}>Explore Journey</a>
                    </div>
                </div>
                <div ref={illustRef} className={styles.illustration}>
                    <div className={styles.techContainer}>
                        
                        {/* Connecting lines SVG */}
                        <svg className={styles.connectionsSvg} viewBox="0 0 500 500" xmlns="http://www.w3.org/2000/svg">
                            <line x1="250" y1="250" x2="100" y2="120" className={styles.connector} />
                            <line x1="250" y1="250" x2="400" y2="150" className={styles.connector} />
                            <line x1="250" y1="250" x2="420" y2="350" className={styles.connector} />
                            <line x1="250" y1="250" x2="80" y2="380" className={styles.connector} />
                        </svg>

                        <div className={styles.mainIconWrapper}>
                            <BrainCircuit size={100} className={styles.mainIcon} strokeWidth={1} />
                        </div>
                        <div className={styles.floatingIcon1}><Network size={36} /></div>
                        <div className={styles.floatingIcon2}><Database size={36} /></div>
                        <div className={styles.floatingIcon3}><Bot size={36} /></div>
                        <div className={styles.floatingIcon4}><Terminal size={36} /></div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
