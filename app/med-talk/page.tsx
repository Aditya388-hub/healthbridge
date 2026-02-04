'use client';

import { useState } from 'react';
import { useAuth } from '@/lib/auth';
import { PlayCircle, Upload, CheckCircle } from 'lucide-react';
import styles from './medtalk.module.css';

// Mock Videos (Empty initially)
const INITIAL_VIDEOS: any[] = [];

export default function MedTalkPage() {
    const { user } = useAuth();
    const [videos, setVideos] = useState(INITIAL_VIDEOS);

    // In a real app, this would open a modal
    const handleUpload = () => {
        const title = prompt("Enter video title:");
        if (title) {
            setVideos([...videos, {
                id: Date.now(),
                title,
                duration: '0:00',
                progress: 0,
                thumbnail: '#9B9B9B'
            }]);
        }
    };

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <div>
                    <h1 className={styles.title}>MedTalks</h1>
                    <p className={styles.subtitle}>Evidence-based medical discussions for everyone.</p>
                </div>
                {user?.role === 'OWNER' && (
                    <button className={styles.uploadBtn} onClick={handleUpload}>
                        <Upload size={20} />
                        Upload Video
                    </button>
                )}
            </header>

            <div className={styles.grid}>
                {videos.length === 0 ? (
                    <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '4rem', color: '#666' }}>
                        <p style={{ fontSize: '1.2rem', color: 'hsl(var(--foreground))' }}>No content has been uploaded yet.</p>
                    </div>
                ) : (
                    videos.map(video => (
                        <div key={video.id} className={styles.card}>
                            <div className={styles.thumbnail} style={{ backgroundColor: video.thumbnail }}>
                                <PlayCircle size={48} className={styles.playIcon} />
                                <span className={styles.duration}>{video.duration}</span>
                            </div>
                            <div className={styles.cardContent}>
                                <h3>{video.title}</h3>
                                <div className={styles.progressContainer}>
                                    <div className={styles.progressBar}>
                                        <div className={styles.progressFill} style={{ width: `${video.progress}%` }}></div>
                                    </div>
                                    <span className={styles.progressLabel}>{video.progress}% watched</span>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
