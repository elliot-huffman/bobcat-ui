'use client';

import { Button, Input } from '@fluentui/react-components';
import type { ReactNode } from 'react';
import { Layout } from '../LayoutSystem';
import { usePrototypeSigninStyles } from '../../styles/prototype/PrototypeSignin';

export interface PrototypeSigninProps {
    onContinue?: () => void;
}

/** Additive sign-in screen for the Bobcat prototype. */
export function PrototypeSignin(props: PrototypeSigninProps): ReactNode {
    const styles = usePrototypeSigninStyles();

    return (
        <Layout className={ styles.page }>
            <Layout className={ styles.card }>
                <img src="/logo.png" alt="Bobcat" className={ styles.logo } />
                <p className={ styles.eyebrow }>Sign in</p>
                <h1 className={ styles.title }>Install the GitHub App</h1>
                <p className={ styles.text }>Bobcat starts testing every endpoint on every push once the app is connected.</p>
                <Input placeholder="Work or school account" />
                <Button appearance="primary" onClick={ props.onContinue }>Continue with GitHub</Button>
            </Layout>
        </Layout>
    );
}