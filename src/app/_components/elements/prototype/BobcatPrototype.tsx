'use client';

import type { ReactNode } from 'react';
import { Layout } from '../LayoutSystem';
import { useBobcatPrototypeStyles } from '../../styles/prototype/BobcatPrototype';

export type BobcatPrototypeScreen = 'landing' | 'signin' | 'app' | 'scan';

export interface BobcatPrototypeProps {
    screen?: BobcatPrototypeScreen;
    landing?: ReactNode;
    signin?: ReactNode;
    app?: ReactNode;
    scan?: ReactNode;
}

/** Additive wrapper that can host the new Bobcat prototype screens without touching legacy components. */
export function BobcatPrototype(props: BobcatPrototypeProps): ReactNode {
    const styles = useBobcatPrototypeStyles();

    return (
        <Layout className={ styles.root }>
            {props.screen === 'signin' ? props.signin : void 0}
            {props.screen === 'app' ? props.app : void 0}
            {props.screen === 'scan' ? props.scan : void 0}
            {!props.screen || props.screen === 'landing' ? props.landing : void 0}
        </Layout>
    );
}