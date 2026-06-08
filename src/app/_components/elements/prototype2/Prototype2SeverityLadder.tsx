'use client';

import { LockClosedRegular, GlobeRegular } from '@fluentui/react-icons';
import { mergeClasses, Tooltip } from '@fluentui/react-components';
import type { ReactNode } from 'react';
import type { RepoSummary } from '../../sdk/mockAppData';
import { usePrototype2SeverityLadderStyles } from '../../styles/prototype2/Prototype2SeverityLadder';

/** Severity tiers shared across the prototype2 ladder markers. */
export type Prototype2Severity = 'critical' | 'high' | 'medium' | 'low';

/** Prop contract for a single severity count chip. */
export interface Prototype2SeverityCountProps {
    /** Severity tier the count belongs to. */
    severity: Prototype2Severity;
    /** Number of findings for the tier. */
    count: number;
}

/** Prop contract for the privacy marker. */
export interface Prototype2PrivacyMarkerProps {
    /** Whether the repository is private. */
    isPrivate: boolean;
}

/** Prop contract for the full crit/high/medium/low ladder. */
export interface Prototype2SeverityLadderProps {
    /** Repository whose severity counts are rendered. */
    repo: RepoSummary;
    /** Whether the repository has not yet been scanned. */
    unscanned?: boolean;
}

/**
 * Renders a single severity count as a colored marker plus the tally, greyed when the count is zero.
 * @param props Severity tier and count for the chip.
 * @returns Rendered severity count chip.
 */
export function Prototype2SeverityCount(props: Prototype2SeverityCountProps): ReactNode {
    const styles = usePrototype2SeverityLadderStyles();
    const hasCount = props.count > 0;

    const markerClass = !hasCount
        ? styles.sevMarkerZero
        : props.severity === 'critical'
            ? styles.sevMarkerCritical
            : props.severity === 'high'
                ? styles.sevMarkerHigh
                : props.severity === 'medium'
                    ? styles.sevMarkerMedium
                    : styles.sevMarkerLow;

    return (
        <span className={ styles.sevCount }>
            <span className={ mergeClasses(styles.sevMarker, markerClass) } />
            <span className={ mergeClasses(styles.sevCountValue, hasCount ? undefined : styles.sevCountValueZero) }>{ props.count }</span>
        </span>
    );
}

/**
 * Renders a privacy marker — a lock for private repositories and a globe for public ones.
 * @param props Privacy flag for the repository.
 * @returns Rendered privacy marker.
 */
export function Prototype2PrivacyMarker(props: Prototype2PrivacyMarkerProps): ReactNode {
    const styles = usePrototype2SeverityLadderStyles();
    const Icon = props.isPrivate ? LockClosedRegular : GlobeRegular;

    return (
        <Tooltip content={ props.isPrivate ? 'Private' : 'Public' } relationship="label">
            <span className={ styles.privacyMarker }>
                <Icon />
            </span>
        </Tooltip>
    );
}

/**
 * Renders the full critical/high/medium/low severity ladder for a repository row.
 * @param props Repository and scan state used to build the ladder.
 * @returns Rendered severity ladder or a "not scanned" caption.
 */
export function Prototype2SeverityLadder(props: Prototype2SeverityLadderProps): ReactNode {
    const styles = usePrototype2SeverityLadderStyles();

    if (props.unscanned) {
        return <span className={ styles.notScanned }>not scanned</span>;
    }

    return (
        <span className={ styles.ladder }>
            <Prototype2SeverityCount severity="critical" count={ props.repo.critical } />
            <Prototype2SeverityCount severity="high" count={ props.repo.high } />
            <Prototype2SeverityCount severity="medium" count={ props.repo.medium } />
            <Prototype2SeverityCount severity="low" count={ props.repo.low } />
        </span>
    );
}
