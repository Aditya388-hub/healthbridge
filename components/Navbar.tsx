'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Heart, Brain, Calendar, Video, BookOpen, Share2, Menu, X, Bot } from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '@/lib/auth';
import styles from './Navbar.module.css';

export default function Navbar() {
    const pathname = usePathname();
    const { user } = useAuth();
    const [isOpen, setIsOpen] = useState(false);

    const isActive = (path: string) => pathname === path;

    const navItems = [
        { label: 'Physical', path: '/physical-health', icon: Heart },
        { label: 'Mental', path: '/mental-health', icon: Brain },
        { label: 'Scheduler', path: '/scheduler', icon: Calendar },
        { label: 'MedTalk', path: '/med-talk', icon: Video },
        { label: 'AI Help', path: '/ai-helper', icon: Bot },
        { label: 'Research', path: '/research', icon: BookOpen },
        { label: 'Connect', path: '/connect', icon: Share2 },
    ];

    return (
        <nav className={styles.navbar}>
            <div className={`container ${styles.container}`}>
                <Link href="/" className={styles.logo}>
                    <span className={styles.brandPrimary}>Health</span>
                    <span className={styles.brandSecondary}>Bridge</span>
                </Link>

                {/* Mobile Menu Button */}
                <button className={styles.mobileMenuBtn} onClick={() => setIsOpen(!isOpen)}>
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                </button>

                {/* Desktop Nav */}
                <div className={`${styles.navLinks} ${isOpen ? styles.show : ''}`}>
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        return (
                            <Link
                                key={item.path}
                                href={item.path}
                                className={`${styles.navLink} ${isActive(item.path) ? styles.active : ''}`}
                                onClick={() => setIsOpen(false)}
                            >
                                <Icon size={18} />
                                <span>{item.label}</span>
                            </Link>
                        );
                    })}

                    {user ? (
                        <div className={styles.userProfile}>
                            <div className={styles.avatar}>{user.username.charAt(0).toUpperCase()}</div>
                            {/* <span className={styles.username}>{user.username}</span> */}
                        </div>
                    ) : (
                        <Link href="/onboarding" className={styles.getStarted}>Get Started</Link>
                    )}
                </div>
            </div>
        </nav>
    );
}
