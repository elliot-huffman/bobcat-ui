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

type MockResponse = {
    requestId: string;
    status: 'success' | 'partial' | 'error';
    processedAt: string;
    user: {
        id: string;
        firstInput: string;
        secondInput: string;
    };
    summary: {
        totalRecords: number;
        accepted: number;
        rejected: number;
    };
    message: string;
};

type MockResponseTemplate = {
    status: MockResponse['status'];
    summary: MockResponse['summary'];
    message: string;
};

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

/**
 * Renders the main/home page of the application.
 * @returns Rendered main page for the application.
 */
export default function Page(): React.ReactNode {
    /** Compiled CSS styles for the page. */
    const computedStyles = useStyleList();
    const [copied, setCopied] = useState(false);
    const [firstInput, setFirstInput] = useState('');
    const [secondInput, setSecondInput] = useState('');
    const [requestOutput, setRequestOutput] = useState(mockOutput);
    const [requestStatus, setRequestStatus] = useState<MockResponse['status'] | 'idle'>('idle');
    const [mockResponseIndex, setMockResponseIndex] = useState(0);

    const isMockMode = true;

    const mockSendRequest = async (): Promise<MockResponse> => {
        await new Promise((resolve) => { window.setTimeout(resolve, 700); });

        const template = getMockResponseTemplate(mockResponseIndex);

        return {
            requestId: `req_${ Date.now() }`,
            status: template.status,
            processedAt: new Date().toISOString(),
            user: {
                id: 'usr_1024',
                firstInput: firstInput || 'alpha-team',
                secondInput: secondInput || 'morning-shift'
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
            setRequestOutput(JSON.stringify(response, null, 2));
            setRequestStatus(response.status);
            setMockResponseIndex((previous) => {
                return (previous + 1) % mockResponseTemplates.length;
            });
        } catch {
            setRequestStatus('error');
        }
    };

    const handleCopyOutput = async (): Promise<void> => {
        await navigator.clipboard.writeText(requestOutput);
        setCopied(true);
        window.setTimeout(() => { setCopied(false); }, 2000);
    };

    // Render the home page
    return (
        <Layout direction="column" gap="large" className={ computedStyles.root }>
            <Card id="home" className={ mergeClasses(computedStyles.cardBase, computedStyles.heroSection) }>
                <div className={ computedStyles.heroLogoContainer }>
                    <Image
                        src="/logo.png"
                        alt="Bobcat logo"
                        width={ 360 }
                        height={ 360 }
                        priority
                        className={ computedStyles.heroLogo }
                    />
                </div>         
            </Card>
            <Card id="userInput" className={ mergeClasses(computedStyles.cardBase, computedStyles.userInputSection) }>
                <p className={ computedStyles.sectionEyebrow }>User Input</p>
                <h2 className={ computedStyles.heroTitle }>User Input Section</h2>
                <p className={ computedStyles.heroText }>Capture and review user-provided data before sending a request.</p>
                <Layout className={ computedStyles.inputStack }>
                    <Label htmlFor="firstUserInput">Storage link</Label>
                    <Input
                        id="firstUserInput"
                        appearance="filled-darker"
                        placeholder="https://example.com/storage-link"
                        value={ firstInput }
                        onChange={ (_, data) => { setFirstInput(data.value); } }
                    />
                    <Label htmlFor="secondUserInput">Request URL</Label>
                    <Input
                        id="secondUserInput"
                        appearance="filled-darker"
                        placeholder="api.example.com"
                        value={ secondInput }
                        onChange={ (_, data) => { setSecondInput(data.value); } }
                    />
                    <Button appearance="primary" onClick={ handleSendRequest }>Send Request</Button>
                </Layout>
            </Card>
            <Card id="requestOutput" className={ mergeClasses(computedStyles.cardBase, computedStyles.requestOutputSection) }>
                <p className={ computedStyles.sectionEyebrow }>Request Output</p>
                <h2 className={ computedStyles.heroTitle }>Request Output Section</h2>
                <p className={ computedStyles.heroText }>Display API responses and output details after processing.</p>
                <Layout className={ computedStyles.outputActions }>
                    <Badge
                        color={ requestStatus === 'success' ? 'success' : requestStatus === 'partial' ? 'warning' : requestStatus === 'error' ? 'danger' : 'informative' }
                        appearance="filled"
                        style={ { width: '16.6667%' } }
                    >
                        { requestStatus === 'idle' ? 'No request yet' : `Status: ${ requestStatus }` }
                    </Badge>
                </Layout>
                <div className={ computedStyles.outputCodeContainer }>
                    <pre className={ computedStyles.outputCodeBlock }>{ requestOutput }</pre>
                    <Button
                        appearance="subtle"
                        size="small"
                        icon={ <ClipboardRegular /> }
                        className={ computedStyles.outputCopyButton }
                        aria-label={ copied ? 'Output copied' : 'Copy output' }
                        title={ copied ? 'Copied' : 'Copy output' }
                        onClick={ handleCopyOutput }
                    />
                </div>
            </Card>
        </Layout>
    );
}
