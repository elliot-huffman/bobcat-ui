'use client';

import { Card, mergeClasses, useFluent } from '@fluentui/react-components';
import { useState } from 'react';
import { Layout } from '../LayoutSystem';
import { useHomeWizardStyles } from '../../styles/components/HomeWizard';
import { InputStepCard, type InputStepCardProps } from './InputStepCard';
import { IntroStepCard, type IntroStepCardProps } from './IntroStepCard';
import { OutputStepCard, type OutputStepCardProps } from './OutputStepCard';
import type {
    HomeWizardSlots,
    InputStepState,
    IntroStepState,
    OutputStepState,
    WizardStepDefinition
} from './types';

const stepDefinitions: WizardStepDefinition[] = [
    {
        description: 'Hero section and wizard intro',
        title: 'Start'
    },
    {
        description: 'Collect user inputs',
        title: 'Input'
    },
    {
        description: 'Review the generated output',
        title: 'Output'
    }
];

export interface HomeWizardProps {
    className?: string;
    inputCard?: Pick<InputStepCardProps, 'className' | 'slots'>;
    introCard?: Pick<IntroStepCardProps, 'className' | 'slots'>;
    onComplete?: (inputState: InputStepState) => void;
    outputCard?: Pick<OutputStepCardProps, 'className' | 'slots'>;
    slots?: HomeWizardSlots;
}

export function HomeWizard(props: HomeWizardProps): React.ReactNode {
    const styles = useHomeWizardStyles();
    const { targetDocument } = useFluent();

    const [currentStep, setCurrentStep] = useState(0);
    const [introStepState, setIntroStepState] = useState<IntroStepState>({ acknowledged: false });
    const [inputStepState, setInputStepState] = useState<InputStepState>({ firstInput: '', secondInput: '' });
    const [outputStepState, setOutputStepState] = useState<OutputStepState>({
        copied: false,
        outputText: ''
    });

    const handleContinueToOutput = (): void => {
        const outputPreview = JSON.stringify({
            storageLink: inputStepState.firstInput,
            requestUrl: inputStepState.secondInput
        }, void 0, 2);

        setOutputStepState((previous) => {
            return {
                ...previous,
                copied: false,
                outputText: outputPreview
            };
        });

        setCurrentStep(2);
        props.onComplete?.(inputStepState);
    };

    const handleCopyOutput = async (): Promise<void> => {
        const clipboard = targetDocument?.defaultView?.navigator?.clipboard;
        if (!clipboard) {
            return;
        }

        await clipboard.writeText(outputStepState.outputText);
        setOutputStepState((previous) => {
            return {
                ...previous,
                copied: true
            };
        });

        (targetDocument?.defaultView ?? globalThis).setTimeout(() => {
            setOutputStepState((previous) => {
                return {
                    ...previous,
                    copied: false
                };
            });
        }, 2000);
    };

    const handleInputChange = (key: keyof InputStepState, value: string): void => {
        setInputStepState((previous) => {
            return {
                ...previous,
                [key]: value
            };
        });
    };

    const handleIntroNext = (): void => {
        setIntroStepState({ acknowledged: true });
        setCurrentStep(1);
    };

    const renderStep = (): React.ReactNode => {
        if (currentStep === 0) {
            return (
                <IntroStepCard
                    acknowledged={ introStepState.acknowledged }
                    onNext={ handleIntroNext }
                    className={ props.introCard?.className }
                    slots={ props.introCard?.slots }
                />
            );
        }

        if (currentStep === 1) {
            return (
                <InputStepCard
                    state={ inputStepState }
                    onBack={ () => { setCurrentStep(0); } }
                    onChange={ handleInputChange }
                    onSubmit={ handleContinueToOutput }
                    className={ props.inputCard?.className }
                    slots={ props.inputCard?.slots }
                />
            );
        }

        return (
            <OutputStepCard
                state={ outputStepState }
                onBack={ () => { setCurrentStep(1); } }
                onCopy={ handleCopyOutput }
                className={ props.outputCard?.className }
                slots={ props.outputCard?.slots }
            />
        );
    };

    return (
        <Layout className={ mergeClasses(styles.root, props.className, props.slots?.root?.className) }>
            <Card className={ mergeClasses(styles.shell, props.slots?.shell?.className) }>
                <div className={ mergeClasses(styles.layout, props.slots?.layout?.className) }>
                    <div className={ mergeClasses(styles.leftRail, props.slots?.leftRail?.className) }>
                        <div>
                            <p className={ mergeClasses(styles.sectionEyebrow, props.slots?.sectionEyebrow?.className) }>Home Wizard</p>
                            <h1 className={ mergeClasses(styles.sectionTitle, props.slots?.sectionTitle?.className) }>Three-step guided flow</h1>
                            <p className={ mergeClasses(styles.sectionCopy, props.slots?.sectionCopy?.className) }>
                                Each step renders one of the existing home page sections and keeps its own local state object.
                            </p>
                        </div>
                        <Layout className={ mergeClasses(styles.stepList, props.slots?.stepList?.className) }>
                            { stepDefinitions.map((step, index) => {
                                const state = index < currentStep ? 'complete' : index === currentStep ? 'active' : 'upcoming';

                                return (
                                    <button
                                        key={ step.title }
                                        type="button"
                                        className={ mergeClasses(
                                            styles.stepButton,
                                            props.slots?.stepButton?.className,
                                            state === 'active' ? mergeClasses(styles.stepButtonActive, props.slots?.stepButtonActive?.className) : '',
                                            state === 'complete' ? mergeClasses(styles.stepButtonComplete, props.slots?.stepButtonComplete?.className) : ''
                                        ) }
                                        onClick={ () => { setCurrentStep(index); } }
                                    >
                                        <span className={ mergeClasses(styles.stepIndex, props.slots?.stepIndex?.className) }>0{ index + 1 }</span>
                                        <span className={ mergeClasses(styles.stepTitle, props.slots?.stepTitle?.className) }>{ step.title }</span>
                                        <span className={ mergeClasses(styles.stepDescription, props.slots?.stepDescription?.className) }>{ step.description }</span>
                                    </button>
                                );
                            }) }
                        </Layout>
                    </div>
                    <div className={ mergeClasses(styles.rightPanel, props.slots?.rightPanel?.className) }>
                        { renderStep() }
                    </div>
                </div>
            </Card>
        </Layout>
    );
}
