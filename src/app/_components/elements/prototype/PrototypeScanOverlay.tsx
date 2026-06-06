'use client';

import type { ReactNode } from 'react';
import { Layout } from '../LayoutSystem';
import { usePrototypeScanOverlayStyles } from '../../styles/prototype/PrototypeScanOverlay';

export interface PrototypeScanOverlayProps {
    url?: string;
}

/** Additive scan overlay for the Bobcat prototype. */
export function PrototypeScanOverlay(props: PrototypeScanOverlayProps): ReactNode {
    const styles = usePrototypeScanOverlayStyles();

    return (
        <Layout className={ styles.overlay }>
            <Layout className={ styles.modal }>
                <span className={ styles.url }>{ props.url ?? 'https://api.example.com/openapi.yaml' }</span>
                <Layout className={ styles.scanLine }><span>▸</span><span>Fetching spec...</span></Layout>
                <Layout className={ styles.scanLine }><span>✓</span><span>Found undocumented routes</span></Layout>
                <Layout className={ styles.scanLine }><span>✓</span><span>Probing authorization gaps</span></Layout>
                <Layout className={ styles.bar }><Layout className={ styles.barFill } /></Layout>
            </Layout>
        </Layout>
    );
}