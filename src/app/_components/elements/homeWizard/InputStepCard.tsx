'use client';

import { Button, Card, Input, Label, mergeClasses } from '@fluentui/react-components';
import { LayoutItem } from '../LayoutSystem';
import { useInputStepCardStyles } from '../../styles/components/HomeWizard';
import type { InputStepState, InputStepCardSlots } from './types';

export interface InputStepCardProps {
    className?: string | undefined;
    onBack: () => void;
    onChange: (key: keyof InputStepState, value: string) => void;
    onSubmit: () => void;
    slots?: InputStepCardSlots | undefined;
    state: InputStepState;
}

export function InputStepCard(props: InputStepCardProps): React.ReactNode {
    const styles = useInputStepCardStyles();

    return (
        <Card
            id="userInput"
            className={ mergeClasses(styles.root, props.className, props.slots?.root?.className) }
        >
            <p className={ mergeClasses(styles.eyebrow, props.slots?.eyebrow?.className) }>Step 2</p>
            <h2 className={ mergeClasses(styles.title, props.slots?.title?.className) }>User Input Section</h2>
            <p className={ mergeClasses(styles.description, props.slots?.description?.className) }>
                Capture and review user-provided data before moving to the output step.
            </p>
            <div className={ mergeClasses(styles.inputStack, props.slots?.inputStack?.className) }>
                <Label htmlFor="firstUserInput" className={ props.slots?.firstLabel?.className }>Storage link</Label>
                <Input
                    id="firstUserInput"
                    appearance="filled-darker"
                    placeholder="https://example.com/storage-link"
                    value={ props.state.firstInput }
                    className={ props.slots?.firstInput?.className }
                    onChange={ (_, data) => { props.onChange('firstInput', data.value); } }
                />
                <Label htmlFor="secondUserInput" className={ props.slots?.secondLabel?.className }>Request URL</Label>
                <Input
                    id="secondUserInput"
                    appearance="filled-darker"
                    placeholder="api.example.com"
                    value={ props.state.secondInput }
                    className={ props.slots?.secondInput?.className }
                    onChange={ (_, data) => { props.onChange('secondInput', data.value); } }
                />
                <LayoutItem className={ mergeClasses(styles.actions, props.slots?.actions?.className) }>
                    <Button appearance="secondary" onClick={ props.onBack }>Back</Button>
                    <Button appearance="primary" onClick={ props.onSubmit }>Review Output</Button>
                </LayoutItem>
            </div>
        </Card>
    );
}
