'use client';

import { Button, Card, mergeClasses } from '@fluentui/react-components';
import { ClipboardRegular } from '@fluentui/react-icons';
import { Layout } from '../LayoutSystem';
import { useOutputStepCardStyles } from '../../styles/components/HomeWizard';
import type { OutputStepCardSlots, OutputStepState } from './types';

export interface OutputStepCardProps {
    className?: string | undefined;
    onBack: () => void;
    onCopy: () => Promise<void>;
    slots?: OutputStepCardSlots | undefined;
    state: OutputStepState;
}

export function OutputStepCard(props: OutputStepCardProps): React.ReactNode {
    const styles = useOutputStepCardStyles();

    return (
        <Card
            id="wizardOutput"
            className={ mergeClasses(styles.root, props.className, props.slots?.root?.className) }
        >
            <p className={ mergeClasses(styles.eyebrow, props.slots?.eyebrow?.className) }>Step 3</p>
            <h2 className={ mergeClasses(styles.title, props.slots?.title?.className) }>Output Review Section</h2>
            <p className={ mergeClasses(styles.description, props.slots?.description?.className) }>
                Review the current wizard input values without sending request or response data.
            </p>
            <Layout className={ mergeClasses(styles.outputCodeContainer, props.slots?.outputCodeContainer?.className) }>
                <pre className={ mergeClasses(styles.outputCodeBlock, props.slots?.outputCodeBlock?.className) }>{ props.state.outputText || 'No output captured yet.' }</pre>
                <Button
                    appearance="subtle"
                    size="small"
                    icon={ <ClipboardRegular /> }
                    className={ mergeClasses(styles.copyButton, props.slots?.copyButton?.className) }
                    aria-label={ props.state.copied ? 'Output copied' : 'Copy output' }
                    title={ props.state.copied ? 'Copied' : 'Copy output' }
                    onClick={ () => { void props.onCopy(); } }
                />
            </Layout>
            <Layout className={ mergeClasses(styles.actions, props.slots?.actions?.className) }>
                <Button appearance="secondary" onClick={ props.onBack }>Back</Button>
            </Layout>
        </Card>
    );
}
