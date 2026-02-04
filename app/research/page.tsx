'use client';

import { useState } from 'react';
import { useAuth } from '@/lib/auth';
import { FileText, Upload, Download, Eye } from 'lucide-react';
import styles from './research.module.css';

const INITIAL_PAPERS: any[] = [];

export default function ResearchPage() {
    const { user } = useAuth();
    const [papers, setPapers] = useState(INITIAL_PAPERS);

    const handleUpload = () => {
        const title = prompt("Enter paper title:");
        if (title) {
            setPapers([...papers, { id: Date.now(), title, type: 'PDF', size: '1.0 MB', progress: 0 }]);
        }
    };

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <div>
                    <h1 className={styles.title}>Research Papers</h1>
                    <p className={styles.subtitle}>Curated scientific literature for deeper understanding.</p>
                </div>
                {user?.role === 'OWNER' && (
                    <button className={styles.uploadBtn} onClick={handleUpload}>
                        <Upload size={18} /> Add Paper
                    </button>
                )}
            </header>

            <div className={styles.list}>
                {papers.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '4rem' }}>
                        <p style={{ fontSize: '1.2rem', color: 'hsl(var(--foreground))' }}>No content has been uploaded yet.</p>
                    </div>
                ) : (
                    papers.map(paper => (
                        <div key={paper.id} className={styles.paperRow}>
                            <div className={styles.iconWrapper}>
                                <FileText size={24} />
                            </div>
                            <div className={styles.info}>
                                <h3>{paper.title}</h3>
                                <div className={styles.meta}>
                                    <span className={styles.type}>{paper.type} • {paper.size}</span>
                                    {paper.progress > 0 && <span className={styles.progress}>{paper.progress}% Read</span>}
                                </div>
                            </div>
                            <div className={styles.actions}>
                                <button className={styles.iconBtn} title="View"><Eye size={20} /></button>
                                <button className={styles.iconBtn} title="Download"><Download size={20} /></button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
