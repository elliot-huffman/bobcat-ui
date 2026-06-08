'use client';

import type { ReactNode } from 'react';
import { Button } from '@fluentui/react-components';
import { useRouter } from 'next/navigation';
import { PrototypeAppShell } from './_components/elements/prototype/PrototypeAppShell';
import { Layout } from './_components/elements/LayoutSystem';
import { useHomePrototype2LinkStyles } from './_components/styles/prototype2/HomePrototype2Link';

/** Main route now opens the repositories experience. */
export default function Page(): ReactNode {
    /** Compiled styles for the prototype2 link banner. */
    const styles = useHomePrototype2LinkStyles();

    /** Router used to open the prototype2 screens from the home page. */
    const router = useRouter();

    return (
        <>
            <Layout className={ styles.banner }>
                <Layout className={ styles.text }>
                    <h3 className={ styles.title }>Prototype 2 screens</h3>
                    <p className={ styles.subtitle }>New overview, repositories, alerts, and scans screens built with Griffel and Fluent tokens.</p>
                </Layout>
                <Layout className={ styles.actions }>
                    <Button appearance="primary" onClick={ () => { router.push('/prototype2/overview'); } }>Overview</Button>
                    <Button appearance="secondary" onClick={ () => { router.push('/prototype2/repos'); } }>Repositories</Button>
                    <Button appearance="secondary" onClick={ () => { router.push('/prototype2/alerts'); } }>Alerts</Button>
                    <Button appearance="secondary" onClick={ () => { router.push('/prototype2/scans'); } }>Scans</Button>
                </Layout>
            </Layout>
            <PrototypeAppShell initialPage="repos" />
        </>
    );
}
