'use client';

import type { BadgeProps } from '@fluentui/react-components';
import type { AlertSeverity, FindingClass, HttpMethod, MockAlert } from '../../sdk/mockAppData';

/** Fluent Badge color for each alert severity tier (mirrors the Bobcat severity ladder). */
export const SEVERITY_BADGE_COLOR: Record<AlertSeverity, NonNullable<BadgeProps['color']>> = {
    critical: 'danger',
    high: 'severe',
    medium: 'warning',
    low: 'informative'
};

/** Fluent Badge color for each HTTP method. */
export const METHOD_BADGE_COLOR: Record<HttpMethod, NonNullable<BadgeProps['color']>> = {
    GET: 'informative',
    POST: 'success',
    PUT: 'brand',
    PATCH: 'warning',
    DELETE: 'danger'
};

/** Numeric rank used to sort alerts by severity (critical first). */
export const SEVERITY_RANK: Record<AlertSeverity, number> = {
    critical: 3,
    high: 2,
    medium: 1,
    low: 0
};

/** Human-readable full names for each finding class, shown in the drawer PR comment. */
const FINDING_CLASS_FULL_NAME: Record<FindingClass, string> = {
    'BOLA': 'Broken Object Level Authorization',
    'IDOR': 'Insecure Direct Object Reference',
    'BFLA': 'Broken Function Level Authorization',
    'Overexposure': 'Excessive Data Exposure',
    'SSRF': 'Server-Side Request Forgery',
    'Mass Assign': 'Mass Assignment',
    'Broken Auth': 'Broken Authentication',
    'Validation': 'Naive Input Validation'
};

/** Suggested remediation steps for each finding class. */
const FINDING_CLASS_FIX: Record<FindingClass, string[]> = {
    'BOLA': ['check tenant ownership before the lookup', 'return 404 for inaccessible objects', 'add an auth regression test'],
    'IDOR': ['scope the query to the authenticated principal', 'use opaque, unguessable identifiers', 'rate-limit the affected route'],
    'BFLA': ['verify the caller holds the required role', 'return 403 on privilege mismatch', 'add an integration test for the gate'],
    'Overexposure': ['define an explicit response schema', 'drop internal fields from the serializer', 'snapshot-test the public shape'],
    'SSRF': ['allow-list outbound hosts', 'block link-local and metadata ranges', 'fetch through an egress proxy'],
    'Mass Assign': ['allow-list mutable fields', 'reject unknown keys with 422', 'never spread the request body into the model'],
    'Broken Auth': ['set a rolling token expiry', 'revoke on logout and rotation', 'add brute-force protection'],
    'Validation': ['validate and coerce every input', 'reject out-of-range values', 'add a fuzz test for this route']
};

/** Derived detail fields presented in the finding drawer. */
export interface Prototype2FindingDetail {
    /** Full human-readable name of the finding class. */
    fullName: string;
    /** Confidence label derived from the finding severity. */
    confidence: 'high' | 'medium' | 'low';
    /** Synthesized source location reference for the finding. */
    location: string;
    /** PR-comment body text describing the finding. */
    prBody: string;
    /** Ordered suggested remediation steps. */
    fix: string[];
}

/**
 * Synthesizes the richer detail fields the drawer needs from a base alert record.
 * Keeps the shared mock SDK untouched by deriving confidence, location, and fixes deterministically.
 * @param alert The base alert record selected from a list.
 * @returns The derived detail fields for the drawer.
 */
export function buildFindingDetail(alert: MockAlert): Prototype2FindingDetail {
    const confidence = alert.severity === 'critical' || alert.severity === 'high' ? 'high' : 'medium';
    const fix = FINDING_CLASS_FIX[alert.findingClass];
    const fileSeed = alert.endpoint.replace(/[^a-z0-9]/gi, '').length;
    const location = `routes/${ alert.findingClass.toLowerCase().replace(/\s+/g, '-') }.ts:${ 20 + fileSeed }`;
    const prBody = `Bobcat found a ${ alert.findingClass } pattern on this endpoint.\n${ alert.description }`;

    return {
        fullName: FINDING_CLASS_FULL_NAME[alert.findingClass],
        confidence,
        location,
        prBody,
        fix
    };
}
