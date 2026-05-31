'use client';

import { Button, Card, CardHeader } from '@fluentui/react-components';
import { ChevronDownRegular, ChevronUpRegular } from '@fluentui/react-icons';
import { useState } from 'react';
import type { DetailedAnalysisRecord } from '../sdk/mockAnalysisSdk';
import { useReflexGridStyles } from '../styles/components/ReflexGrid';

export interface AnalysisResultCardProps {
    result: DetailedAnalysisRecord;
}

export function AnalysisResultCard(props: AnalysisResultCardProps): React.ReactNode {
    /** Compiled style classes used for the detailed analysis card. */
    const styles = useReflexGridStyles();
    /** Flag indicating whether this card is currently expanded. */
    const [isExpanded, setIsExpanded] = useState(false);

    /** JSON payload shown when expanded for deeper inspection. */
    const expandedPayload = JSON.stringify(props.result, void 0, 2);

    return (
        <Card className={ styles.detailRowCard }>
            <CardHeader
                header={ <h3 className={ styles.detailRowCardHeader }>{ props.result.eventType }</h3> }
                description={ <p className={ styles.detailRowCardMeta }>State: { props.result.state }</p> }
            />
            <dl className={ styles.detailsList }>
                <div className={ styles.detailsRow }>
                    <dt className={ styles.detailsKey }>Detail ID</dt>
                    <dd className={ styles.detailsValue }>{ props.result.id }</dd>
                </div>
                <div className={ styles.detailsRow }>
                    <dt className={ styles.detailsKey }>Parent ID</dt>
                    <dd className={ styles.detailsValue }>{ props.result.parentId }</dd>
                </div>
            </dl>
            <div className={ styles.detailRowCardActions }>
                <Button
                    appearance="subtle"
                    icon={ isExpanded ? <ChevronUpRegular /> : <ChevronDownRegular /> }
                    onClick={ () => { setIsExpanded((previous) => !previous); } }
                >
                    { isExpanded ? 'Collapse' : 'Expand' }
                </Button>
            </div>
            {isExpanded ? (
                <div className={ styles.detailRowExpandedContent }>
                    <p className={ styles.detailRowExpandedTitle }>Detailed payload</p>
                    <pre className={ styles.detailRowExpandedCode }>{ expandedPayload }</pre>
                </div>
            ) : void 0}
        </Card>
    );
}
