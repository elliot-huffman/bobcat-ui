'use client';

import {
    Avatar,
    Badge,
    Button,
    DrawerBody,
    DrawerHeader,
    DrawerHeaderTitle,
    OverlayDrawer
} from '@fluentui/react-components';
import { CheckmarkCircleFilled, CheckmarkCircleRegular, DismissRegular } from '@fluentui/react-icons';
import { useEffect, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import type { MockAlert } from '../../sdk/mockAppData';
import { buildFindingDetail, METHOD_BADGE_COLOR, SEVERITY_BADGE_COLOR } from './findingDetail';
import { usePrototype2FindingDrawerStyles } from '../../styles/prototype2/Prototype2FindingDrawer';

/** Prop contract for the prototype2 finding detail drawer. */
export interface Prototype2FindingDrawerProps {
    /** Whether the drawer is open. */
    open: boolean;
    /** The alert whose detail is shown, or null when nothing is selected. */
    alert: MockAlert | null;
    /** Display name of the repository the alert belongs to. */
    repoName?: string;
    /** Invoked when the drawer is dismissed. */
    onClose: () => void;
}

/**
 * Finding detail drawer that slides in from the end edge, mirroring the Bobcat PR-comment panel.
 * @param props Open state, selected alert, repository name, and close callback.
 * @returns Rendered overlay drawer.
 */
export function Prototype2FindingDrawer(props: Prototype2FindingDrawerProps): ReactNode {
    const styles = usePrototype2FindingDrawerStyles();
    const [prOpened, setPrOpened] = useState(false);

    useEffect(() => {
        setPrOpened(false);
    }, [props.alert]);

    const detail = useMemo(() => {
        return props.alert ? buildFindingDetail(props.alert) : null;
    }, [props.alert]);

    if (!props.alert || !detail) {
        return (
            <OverlayDrawer
                open={ props.open }
                position="end"
                className={ styles.drawer }
                onOpenChange={ (_event, data) => { if (!data.open) { props.onClose(); } } }
            />
        );
    }

    const alert = props.alert;
    const severityLabel = alert.severity.charAt(0).toUpperCase() + alert.severity.slice(1);

    return (
        <OverlayDrawer
            open={ props.open }
            position="end"
            className={ styles.drawer }
            onOpenChange={ (_event, data) => { if (!data.open) { props.onClose(); } } }
        >
            <DrawerHeader>
                <DrawerHeaderTitle action={ <Button appearance="subtle" icon={ <DismissRegular /> } onClick={ props.onClose } /> }>
                    <span className={ styles.headerBadges }>
                        <Badge className={ styles.methodBadge } appearance="tint" color={ METHOD_BADGE_COLOR[alert.method] }>{ alert.method }</Badge>
                        <Badge appearance="tint" color={ SEVERITY_BADGE_COLOR[alert.severity] }>{ severityLabel }</Badge>
                        <Badge appearance="outline">{ alert.findingClass }</Badge>
                    </span>
                    <h2 className={ styles.headerTitle }>{ alert.title }</h2>
                </DrawerHeaderTitle>
            </DrawerHeader>
            <DrawerBody>
                <div className={ styles.metaGrid }>
                    <div className={ styles.metaBox }>
                        <span className={ styles.metaLabel }>Severity</span>
                        <span className={ styles.metaValue }>{ alert.severity }</span>
                    </div>
                    <div className={ styles.metaBox }>
                        <span className={ styles.metaLabel }>Confidence</span>
                        <span className={ styles.metaValue }>{ detail.confidence }</span>
                    </div>
                    <div className={ styles.metaBox }>
                        <span className={ styles.metaLabel }>Endpoint</span>
                        <span className={ styles.metaValueMono }>{ alert.method } { alert.endpoint }</span>
                    </div>
                    <div className={ styles.metaBox }>
                        <span className={ styles.metaLabel }>Location</span>
                        <span className={ styles.metaValueMono }>{ detail.location }</span>
                    </div>
                </div>

                <span className={ styles.sectionLabel }>Bobcat PR comment</span>
                <div className={ styles.prComment }>
                    <div className={ styles.prHead }>
                        <Avatar size={ 24 } shape="square" name="bobcat" color="colorful" />
                        <span className={ styles.prAuthor }>bobcat</span>
                        <span className={ styles.prMeta }>{ props.repoName ? `commented on ${ props.repoName }` : 'commented just now' }</span>
                    </div>
                    <div className={ styles.prBody }>
                        <span className={ styles.prTitle }>{ detail.fullName }</span>
                        <span className={ styles.prSeverityLine }>Severity: { alert.severity } · Confidence: { detail.confidence }</span>
                        <div className={ styles.codeBlock }>
                            { detail.prBody }
                            {'\n\n'}
                            <span className={ styles.codeComment }>Suggested fix:</span>
                            {'\n'}
                            {detail.fix.map((step, index) => (
                                <span key={ index } className={ styles.codeAddition }>{ index > 0 ? '\n' : '' }+ { step }</span>
                            ))}
                        </div>
                    </div>
                </div>

                <span className={ styles.sectionLabel }>Suggested fix</span>
                <div>
                    {detail.fix.map((step, index) => (
                        <div key={ index } className={ styles.fixItem }>
                            <CheckmarkCircleFilled className={ styles.fixIcon } />
                            <span className={ styles.fixText }>{ step }</span>
                        </div>
                    ))}
                </div>

                <div className={ styles.actions }>
                    <Button
                        appearance="primary"
                        icon={ prOpened ? <CheckmarkCircleRegular /> : undefined }
                        onClick={ () => { setPrOpened(true); } }
                    >
                        { prOpened ? 'Fix PR opened' : 'Open fix PR' }
                    </Button>
                    <Button appearance="outline">Ignore finding</Button>
                </div>
            </DrawerBody>
        </OverlayDrawer>
    );
}
