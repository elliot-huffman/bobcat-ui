'use client';

import { Button, Card, Input, mergeClasses } from '@fluentui/react-components';
import { SearchRegular } from '@fluentui/react-icons';
import type { ReactNode } from 'react';
import { Layout } from '../LayoutSystem';
import { usePrototypeLandingStyles } from '../../styles/prototype/PrototypeLanding';

export interface PrototypeLandingProps {
    onInstall?: () => void;
    onScan?: (value: string) => void;
}

const stats = [
    { label: 'API attacks absorbed', value: '150B' },
    { label: 'AI-related CVEs', value: '99%' },
    { label: 'Developers using AI assistants', value: '89%' },
    { label: 'Public API pages', value: '1 in 2' }
];

/** Additive landing screen for the Bobcat prototype. */
export function PrototypeLanding(props: PrototypeLandingProps): ReactNode {
    const styles = usePrototypeLandingStyles();

    return (
        <Layout className={ styles.page }>
            <nav className={ styles.nav }>
                <Layout className={ styles.brand }>
                    <img src="/logo.png" alt="Bobcat" className={ styles.brandMark } />
                    <Layout className={ styles.brandText }>
                        <strong>BOBCAT</strong>
                        <span>Secure every API you ship</span>
                    </Layout>
                </Layout>
                <Layout className={ styles.navLinks }>
                    <span className={ styles.pill }>Product</span>
                    <span className={ styles.pill }>Proof</span>
                    <span className={ styles.pill }>Docs</span>
                    <Button appearance="secondary" size="small" onClick={ props.onInstall }>Install the GitHub App</Button>
                </Layout>
            </nav>

            <section className={ styles.hero }>
                <Layout className={ styles.heroBody }>
                    <p className={ styles.eyebrow }>redDev for APIs</p>
                    <h1 className={ styles.heroTitle }>Secure every API you ship. At AI speed.</h1>
                    <p className={ styles.heroCopy }>
                        Bobcat tests every endpoint in your OpenAPI spec for the auth, validation, and business-logic bugs that slip through code review.
                    </p>
                    <Input
                        contentBefore={ <SearchRegular /> }
                        placeholder="Paste a public OpenAPI URL to scan it"
                        onChange={ (_, data) => { props.onScan?.(data.value); } }
                    />
                    <Layout>
                        <Button appearance="primary" onClick={ props.onInstall }>Install the GitHub App</Button>
                    </Layout>
                </Layout>

                <Card className={ styles.heroCard }>
                    <p className={ styles.eyebrow }>Real Bobcat PR comment</p>
                    <h2 className={ styles.sectionTitle }>BOLA on GET /v1/customers/:id</h2>
                    <p className={ styles.sectionCopy }>
                        The request accepts an ID and returns a customer object without proving ownership. Suggested fix: check tenant ownership before lookup.
                    </p>
                </Card>
            </section>

            <section className={ styles.section }>
                <h2 className={ styles.sectionTitle }>Why now</h2>
                <p className={ styles.sectionCopy }>
                    AI accelerated endpoint creation, but review still lags. Bobcat closes that gap where it matters.
                </p>
                <Layout className={ styles.statGrid }>
                    {stats.map((stat) => (
                        <Card key={ stat.label } className={ styles.statCard }>
                            <strong className={ styles.statValue }>{ stat.value }</strong>
                            <span className={ styles.statLabel }>{ stat.label }</span>
                        </Card>
                    )) }
                </Layout>
            </section>
        </Layout>
    );
}