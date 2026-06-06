'use client';

import { Button, Card } from '@fluentui/react-components';
import { useCallback, useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import { Layout } from '../LayoutSystem';
import { BobcatPrototype, type BobcatPrototypeScreen } from './BobcatPrototype';
import { PrototypeLanding } from './PrototypeLanding';
import { PrototypeSignin } from './PrototypeSignin';
import { PrototypeAppShell } from './PrototypeAppShell';
import { PrototypeScanOverlay } from './PrototypeScanOverlay';
import { usePrototypePreviewCardStyles } from '../../styles/prototype/PrototypePreviewCard';

/** A single card that previews the newly added prototype components on the home page. */
export function PrototypePreviewCard(): ReactNode {
    const styles = usePrototypePreviewCardStyles();
    const [screen, setScreen] = useState<BobcatPrototypeScreen>('app');

    const setScreenCallback = useCallback((nextScreen: BobcatPrototypeScreen): void => {
        setScreen(nextScreen);
    }, []);

    useEffect(() => {
        if (screen !== 'scan') {
            return;
        }

        const timer = window.setTimeout(() => {
            setScreen('app');
        }, 1400);

        return (): void => {
            window.clearTimeout(timer);
        };
    }, [screen]);

    return (
        <Card className={ styles.root }>
            <Layout className={ styles.header }>
                <p className={ styles.sectionLabel }>Prototype preview</p>
                <h2 className={ styles.title }>New additive Bobcat components</h2>
                <p className={ styles.copy }>
                    Mock mode now uses a connected prototype flow with routed screens and a nested app shell sidebar, aligned with the structure in the extra folder.
                </p>
            </Layout>

            <Layout className={ styles.controls }>
                <Button appearance={ screen === 'landing' ? 'primary' : 'secondary' } onClick={ () => { setScreenCallback('landing'); } }>Landing</Button>
                <Button appearance={ screen === 'signin' ? 'primary' : 'secondary' } onClick={ () => { setScreenCallback('signin'); } }>Sign in</Button>
                <Button appearance={ screen === 'app' ? 'primary' : 'secondary' } onClick={ () => { setScreenCallback('app'); } }>App</Button>
                <Button appearance={ screen === 'scan' ? 'primary' : 'secondary' } onClick={ () => { setScreenCallback('scan'); } }>Scan</Button>
            </Layout>

            <Layout className={ styles.body }>
                <BobcatPrototype
                    screen={ screen }
                    landing={ <PrototypeLanding onInstall={ () => { setScreenCallback('signin'); } } onScan={ () => { setScreenCallback('scan'); } } /> }
                    signin={ <PrototypeSignin onContinue={ () => { setScreenCallback('app'); } } /> }
                    app={ <PrototypeAppShell onNewScan={ () => { setScreenCallback('scan'); } } /> }
                    scan={ <PrototypeScanOverlay /> }
                />
            </Layout>
        </Card>
    );
}