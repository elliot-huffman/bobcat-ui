'use client';

import { Badge, Button, Card, Input, Label, mergeClasses } from '@fluentui/react-components';
import { ClipboardRegular } from '@fluentui/react-icons';
import Image from 'next/image';
import { useState } from 'react';
import { Layout } from './_components/elements/LayoutSystem';
import { useStyleList } from './_components/styles/pages/Home';

const mockOutput = JSON.stringify({
    requestId: 'req_01JX0A0H6M8ZV9P2T4B7K3D5QF',
    status: 'success',
    processedAt: '2026-05-16T14:22:41.000Z',
    user: {
        id: 'usr_1024',
        firstInput: 'alpha-team',
        secondInput: 'morning-shift'
    },
    summary: {
        totalRecords: 42,
        accepted: 39,
        rejected: 3
    }
}, null, 2);

interface MockResponseUser {
    id: string;
    firstInput: string;
    secondInput: string;
}

interface MockResponseSummary {
    totalRecords: number;
    accepted: number;
    rejected: number;
}

interface MockResponse {
    requestId: string;
    status: 'success' | 'partial' | 'error';
    processedAt: string;
    user: MockResponseUser;
    summary: MockResponseSummary;
    message: string;
}

interface MockResponseTemplate {
    status: MockResponse['status'];
    summary: MockResponse['summary'];
    message: string;
}

const mockResponseTemplates: MockResponseTemplate[] = [
    {
        status: 'success',
        summary: {
            totalRecords: 42,
            accepted: 39,
            rejected: 3
        },
        message: 'All records processed successfully.'
    },
    {
        status: 'partial',
        summary: {
            totalRecords: 42,
            accepted: 24,
            rejected: 18
        },
        message: 'Request completed with validation warnings.'
    },
    {
        status: 'error',
        summary: {
            totalRecords: 42,
            accepted: 0,
            rejected: 42
        },
        message: 'Request failed: downstream service unavailable.'
    }
];

const getMockResponseTemplate = (index: number): MockResponseTemplate => {
    const template = mockResponseTemplates[index];
    if (!template) {
        throw new Error('Mock response templates are not configured.');
    }

    return template;
};

interface IntroStepState {
    acknowledged: boolean;
}

interface InputStepState {
    firstInput: string;
    secondInput: string;
}

interface OutputStepState {
    copied: boolean;
    requestOutput: string;
    requestStatus: MockResponse['status'] | 'idle';
    mockResponseIndex: number;
}

interface StepDefinition {
    description: string;
    title: string;
}

interface IntroStepProps {
    computedStyles: ReturnType<typeof useStyleList>;
    onNext: () => void;
    state: IntroStepState;
}

interface InputStepProps {
    computedStyles: ReturnType<typeof useStyleList>;
    onBack: () => void;
    onChange: (key: keyof InputStepState, value: string) => void;
    onSubmit: () => Promise<void>;
    state: InputStepState;
}

interface OutputStepProps {
    computedStyles: ReturnType<typeof useStyleList>;
    onBack: () => void;
    onCopy: () => Promise<void>;
    state: OutputStepState;
}

function IntroStep(props: IntroStepProps): React.ReactNode {
    return (
        <Card id="home" className={ mergeClasses(props.computedStyles.cardBase, props.computedStyles.heroSection) }>
            <div className={ props.computedStyles.heroLogoContainer }>
                <Image
                    src="/logo.png"
                    alt="Bobcat logo"
                    width={ 360 }
                    height={ 360 }
                    priority
                    className={ props.computedStyles.heroLogo }
                />
            </div>
            <p className={ props.computedStyles.sectionEyebrow }>Step 1</p>
            <h2 className={ props.computedStyles.heroTitle }>Review the starting point</h2>
            <p className={ props.computedStyles.heroText }>
                Move through the same home page sections as a guided flow. This step keeps its own state and marks when the wizard has been acknowledged.
            </p>
            <Layout className={ props.computedStyles.wizardActions }>
                <Badge appearance="filled" color={ props.state.acknowledged ? 'success' : 'informative' }>
                    { props.state.acknowledged ? 'Ready to continue' : 'Waiting to start' }
                </Badge>
                <Button appearance="primary" onClick={ props.onNext }>
                    Continue to user input
                </Button>
            </Layout>
        </Card>
    );
}

function InputStep(props: InputStepProps): React.ReactNode {
    return (
        <Card id="userInput" className={ mergeClasses(props.computedStyles.cardBase, props.computedStyles.userInputSection) }>
            <p className={ props.computedStyles.sectionEyebrow }>Step 2</p>
            <h2 className={ props.computedStyles.heroTitle }>User Input Section</h2>
            <p className={ props.computedStyles.heroText }>Capture and review user-provided data before sending a request.</p>
            <Layout className={ props.computedStyles.inputStack }>
                <Label htmlFor="firstUserInput">Storage link</Label>
                <Input
                    id="firstUserInput"
                    appearance="filled-darker"
                    placeholder="https://example.com/storage-link"
                    value={ props.state.firstInput }
                    onChange={ (_, data) => { props.onChange('firstInput', data.value); } }
                />
                <Label htmlFor="secondUserInput">Request URL</Label>
                <Input
                    id="secondUserInput"
                    appearance="filled-darker"
                    placeholder="api.example.com"
                    value={ props.state.secondInput }
                    onChange={ (_, data) => { props.onChange('secondInput', data.value); } }
                />
                <Layout className={ props.computedStyles.wizardActions }>
                    <Button appearance="secondary" onClick={ props.onBack }>Back</Button>
                    <Button appearance="primary" onClick={ props.onSubmit }>Send Request</Button>
                </Layout>
            </Layout>
        </Card>
    );
}

function OutputStep(props: OutputStepProps): React.ReactNode {
    return (
        <Card id="requestOutput" className={ mergeClasses(props.computedStyles.cardBase, props.computedStyles.requestOutputSection) }>
            <p className={ props.computedStyles.sectionEyebrow }>Step 3</p>
            <h2 className={ props.computedStyles.heroTitle }>Request Output Section</h2>
            <p className={ props.computedStyles.heroText }>Display API responses and output details after processing.</p>
            <Layout className={ props.computedStyles.outputActions }>
                <Badge
                    color={ props.state.requestStatus === 'success' ? 'success' : props.state.requestStatus === 'partial' ? 'warning' : props.state.requestStatus === 'error' ? 'danger' : 'informative' }
                    appearance="filled"
                    style={ { width: '16.6667%' } }
                >
                    { props.state.requestStatus === 'idle' ? 'No request yet' : `Status: ${ props.state.requestStatus }` }
                </Badge>
            </Layout>
            <div className={ props.computedStyles.outputCodeContainer }>
                <pre className={ props.computedStyles.outputCodeBlock }>{ props.state.requestOutput }</pre>
                <Button
                    appearance="subtle"
                    size="small"
                    icon={ <ClipboardRegular /> }
                    className={ props.computedStyles.outputCopyButton }
                    aria-label={ props.state.copied ? 'Output copied' : 'Copy output' }
                    title={ props.state.copied ? 'Copied' : 'Copy output' }
                    onClick={ props.onCopy }
                />
            </div>
            <Layout className={ props.computedStyles.wizardActions }>
                <Button appearance="secondary" onClick={ props.onBack }>Back</Button>
            </Layout>
        </Card>
    );
}

/**
 * Renders the main/home page of the application.
 * @returns Rendered main page for the application.
 */
export default function Page(): React.ReactNode {
    const computedStyles = useStyleList();
    const [currentStep, setCurrentStep] = useState(0);
    const [introStepState, setIntroStepState] = useState<IntroStepState>({ acknowledged: false });
    const [inputStepState, setInputStepState] = useState<InputStepState>({ firstInput: '', secondInput: '' });
    const [outputStepState, setOutputStepState] = useState<OutputStepState>({
        copied: false,
        requestOutput: mockOutput,
        requestStatus: 'idle',
        mockResponseIndex: 0
    });

    const isMockMode = true;
    const steps: StepDefinition[] = [
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

    const mockSendRequest = async (): Promise<MockResponse> => {
        await new Promise((resolve) => { window.setTimeout(resolve, 700); });

        const template = getMockResponseTemplate(outputStepState.mockResponseIndex);

        return {
            requestId: `req_${ Date.now() }`,
            status: template.status,
            processedAt: new Date().toISOString(),
            user: {
                id: 'usr_1024',
                firstInput: inputStepState.firstInput || 'alpha-team',
                secondInput: inputStepState.secondInput || 'morning-shift'
            },
            summary: template.summary,
            message: template.message
        };
    };

    const handleSendRequest = async (): Promise<void> => {
        if (!isMockMode) {
            return;
        }

        try {
            const response = await mockSendRequest();
            setOutputStepState((previous) => {
                return {
                    ...previous,
                    mockResponseIndex: (previous.mockResponseIndex + 1) % mockResponseTemplates.length,
                    requestOutput: JSON.stringify(response, null, 2),
                    requestStatus: response.status
                };
            });
            setCurrentStep(2);
        } catch {
            setOutputStepState((previous) => {
                return {
                    ...previous,
                    requestStatus: 'error'
                };
            });
            setCurrentStep(2);
        }
    };

    const handleCopyOutput = async (): Promise<void> => {
        await navigator.clipboard.writeText(outputStepState.requestOutput);
        setOutputStepState((previous) => {
            return {
                ...previous,
                copied: true
            };
        });
        window.setTimeout(() => {
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
            return <IntroStep computedStyles={ computedStyles } state={ introStepState } onNext={ handleIntroNext } />;
        }

        if (currentStep === 1) {
            return (
                <InputStep
                    computedStyles={ computedStyles }
                    state={ inputStepState }
                    onBack={ () => { setCurrentStep(0); } }
                    onChange={ handleInputChange }
                    onSubmit={ handleSendRequest }
                />
            );
        }

        return (
            <OutputStep
                computedStyles={ computedStyles }
                state={ outputStepState }
                onBack={ () => { setCurrentStep(1); } }
                onCopy={ handleCopyOutput }
            />
        );
    };

    return (
        <Layout direction="column" gap="large" className={ computedStyles.root }>
            <Card className={ computedStyles.wizardShell }>
                <div className={ computedStyles.wizardLayout }>
                    <div className={ computedStyles.wizardLeftRail }>
                        <div>
                            <p className={ computedStyles.sectionEyebrow }>Home Wizard</p>
                            <h1 className={ computedStyles.sectionTitle }>Three-step guided flow</h1>
                            <p className={ computedStyles.sectionCopy }>
                                Each step renders one of the existing home page sections and keeps its own local state object.
                            </p>
                        </div>
                        <Layout className={ computedStyles.wizardStepList }>
                            { steps.map((step, index) => {
                                const state = index < currentStep ? 'complete' : index === currentStep ? 'active' : 'upcoming';

                                return (
                                    <button
                                        key={ step.title }
                                        type="button"
                                        className={ mergeClasses(
                                            computedStyles.wizardStepButton,
                                            state === 'active' ? computedStyles.wizardStepButtonActive : '',
                                            state === 'complete' ? computedStyles.wizardStepButtonComplete : ''
                                        ) }
                                        onClick={ () => { setCurrentStep(index); } }
                                    >
                                        <span className={ computedStyles.wizardStepIndex }>0{ index + 1 }</span>
                                        <span className={ computedStyles.wizardStepTitle }>{ step.title }</span>
                                        <span className={ computedStyles.wizardStepDescription }>{ step.description }</span>
                                    </button>
                                );
                            }) }
                        </Layout>
                    </div>
                    <div className={ computedStyles.wizardRightPanel }>
                        { renderStep() }
                    </div>
                </div>
            </Card>
          
        </Layout>
    );
}
