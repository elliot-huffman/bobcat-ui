'use client';

import { Badge, Button, Card, mergeClasses } from '@fluentui/react-components';
import Image from 'next/image';
import { Layout } from '../LayoutSystem';
import { useIntroStepCardStyles } from '../../styles/components/HomeWizard';
import type { IntroStepCardSlots } from './types';

export interface IntroStepCardProps {
    acknowledged: boolean;
    className?: string | undefined;
    onNext: () => void;
    slots?: IntroStepCardSlots | undefined;
}

export function IntroStepCard(props: IntroStepCardProps): React.ReactNode {
    const styles = useIntroStepCardStyles();

    return (
        <Card
            id="home"
            className={ mergeClasses(styles.root, props.className, props.slots?.root?.className) }
        >
            <div className={ mergeClasses(styles.logoContainer, props.slots?.logoContainer?.className) }>
                <Image
                    src="/logo.png"
                    alt="Bobcat logo"
                    width={ 360 }
                    height={ 360 }
                    priority
                    className={ mergeClasses(styles.logo, props.slots?.logo?.className) }
                />
            </div>
            <p className={ mergeClasses(styles.eyebrow, props.slots?.eyebrow?.className) }>Step 1</p>
            <h2 className={ mergeClasses(styles.title, props.slots?.title?.className) }>Review the starting point</h2>
            <p className={ mergeClasses(styles.description, props.slots?.description?.className) }>
                Move through the same home page sections as a guided flow. This step keeps its own state and marks when the wizard has been acknowledged.
            </p>
            <Layout className={ mergeClasses(styles.actions, props.slots?.actions?.className) }>
                <Badge
                    appearance="filled"
                    color={ props.acknowledged ? 'success' : 'informative' }
                    className={ props.slots?.statusBadge?.className }
                >
                    { props.acknowledged ? 'Ready to continue' : 'Waiting to start' }
                </Badge>
                <Button appearance="primary" onClick={ props.onNext }>
                    Continue to user input
                </Button>
            </Layout>
        </Card>
    );
}
