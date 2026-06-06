'use client';

export type FindingClass = 'BOLA' | 'IDOR' | 'BFLA' | 'Overexposure' | 'SSRF' | 'Mass Assign' | 'Broken Auth' | 'Validation';
export type AlertSeverity = 'critical' | 'high' | 'medium' | 'low';
export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export interface RepoSummary {
    id: string;
    name: string;
    isPrivate: boolean;
    type: 'service' | 'web' | 'library';
    critical: number;
    high: number;
    medium: number;
    low: number;
    endpoints: number;
    scanned: string;
    spec: string;
    branch: string;
    servers: Array<{ url: string; environment: string }>;
}

export interface MockAlert {
    id: string;
    repoId: string;
    findingClass: FindingClass;
    severity: AlertSeverity;
    method: HttpMethod;
    endpoint: string;
    title: string;
    description: string;
    detectedAt: string;
}

export interface MockScan {
    id: string;
    repoId: string;
    completedAt: string;
    endpointsTotal: number;
    endpointsTested: number;
    findingsTotal: number;
    duration: string;
    status: 'completed' | 'running' | 'failed';
}

export interface ActivityItem {
    id: string;
    repoId: string;
    message: string;
    at: string;
}

export const MOCK_REPOS: RepoSummary[] = [
    {
        id: 'stacc-check-in',
        name: 'stacc-check-in',
        isPrivate: false,
        type: 'service',
        critical: 1,
        high: 4,
        medium: 2,
        low: 0,
        endpoints: 142,
        scanned: '3m ago',
        spec: 'openapi/v1.yaml',
        branch: 'main',
        servers: [
            { url: 'https://api.stacc-check-in.dev', environment: 'Development' },
            { url: 'https://api.stacc-check-in.com', environment: 'Production' }
        ]
    },
    {
        id: 'payments-edge',
        name: 'payments-edge',
        isPrivate: true,
        type: 'service',
        critical: 2,
        high: 3,
        medium: 2,
        low: 0,
        endpoints: 53,
        scanned: '41m ago',
        spec: 'api/openapi.yaml',
        branch: 'release/v2',
        servers: [
            { url: 'https://sandbox.payments-edge.dev', environment: 'Sandbox' },
            { url: 'https://api.payments-edge.com', environment: 'Production' }
        ]
    },
    {
        id: 'bobcat-server',
        name: 'bobcat-server',
        isPrivate: true,
        type: 'service',
        critical: 0,
        high: 2,
        medium: 2,
        low: 0,
        endpoints: 88,
        scanned: '8m ago',
        spec: 'specs/openapi.yml',
        branch: 'main',
        servers: [
            { url: 'https://bobcat-server.internal', environment: 'Internal' },
            { url: 'https://api.bobcat.dev', environment: 'External' }
        ]
    },
    {
        id: 'groupr-api',
        name: 'Groupr-API',
        isPrivate: false,
        type: 'service',
        critical: 4,
        high: 2,
        medium: 0,
        low: 0,
        endpoints: 61,
        scanned: '27m ago',
        spec: 'openapi.yaml',
        branch: 'main',
        servers: [
            { url: 'https://staging.groupr.dev', environment: 'Staging' },
            { url: 'https://api.groupr.com', environment: 'Production' }
        ]
    }
];

export const MOCK_ALERTS: MockAlert[] = [
    // stacc-check-in (1 critical, 4 high, 2 medium)
    {
        id: 'sci-001', repoId: 'stacc-check-in', findingClass: 'BOLA', severity: 'critical',
        method: 'GET', endpoint: '/v1/bookings/{bookingId}',
        title: 'Booking returned without ownership check',
        description: 'Any authenticated user can retrieve booking details by guessing integer IDs.',
        detectedAt: '3m ago'
    },
    {
        id: 'sci-002', repoId: 'stacc-check-in', findingClass: 'IDOR', severity: 'high',
        method: 'GET', endpoint: '/v1/users/{userId}/calendar',
        title: 'Calendar entries readable across users',
        description: 'The userId parameter is not validated against the authenticated session.',
        detectedAt: '3m ago'
    },
    {
        id: 'sci-003', repoId: 'stacc-check-in', findingClass: 'IDOR', severity: 'high',
        method: 'GET', endpoint: '/v1/checkins/{checkinId}',
        title: 'Check-in record directly addressable by ID',
        description: 'Sequential integer IDs allow enumeration of all check-in records.',
        detectedAt: '3m ago'
    },
    {
        id: 'sci-004', repoId: 'stacc-check-in', findingClass: 'BFLA', severity: 'high',
        method: 'POST', endpoint: '/v1/admin/bookings',
        title: 'Admin booking endpoint reachable by standard users',
        description: 'No role check on the /admin path — any authenticated user can invoke admin actions.',
        detectedAt: '3m ago'
    },
    {
        id: 'sci-005', repoId: 'stacc-check-in', findingClass: 'Broken Auth', severity: 'high',
        method: 'POST', endpoint: '/v1/auth/refresh',
        title: 'Refresh tokens issued without expiry',
        description: 'Token refresh endpoint issues tokens with no expiration claim.',
        detectedAt: '3m ago'
    },
    {
        id: 'sci-006', repoId: 'stacc-check-in', findingClass: 'Overexposure', severity: 'medium',
        method: 'GET', endpoint: '/v1/profile',
        title: 'Profile response includes internal fields',
        description: 'Serializer returns passwordHash, internalFlags, and adminNotes to the client.',
        detectedAt: '3m ago'
    },
    {
        id: 'sci-007', repoId: 'stacc-check-in', findingClass: 'Validation', severity: 'medium',
        method: 'POST', endpoint: '/v1/checkins/search',
        title: 'Search query accepted without sanitization',
        description: 'Free-text search fields are passed directly to the query layer without validation.',
        detectedAt: '3m ago'
    },

    // payments-edge (2 critical, 3 high, 2 medium)
    {
        id: 'pe-001', repoId: 'payments-edge', findingClass: 'BOLA', severity: 'critical',
        method: 'GET', endpoint: '/v1/payments/{paymentId}',
        title: 'Payment record readable across accounts',
        description: 'The paymentId is not scoped to the authenticated account.',
        detectedAt: '41m ago'
    },
    {
        id: 'pe-002', repoId: 'payments-edge', findingClass: 'SSRF', severity: 'critical',
        method: 'POST', endpoint: '/v1/webhooks',
        title: 'Webhook URL not validated against allow-list',
        description: 'Server fetches the user-supplied URL with no scheme or host restrictions.',
        detectedAt: '41m ago'
    },
    {
        id: 'pe-003', repoId: 'payments-edge', findingClass: 'IDOR', severity: 'high',
        method: 'GET', endpoint: '/v1/accounts/{accountId}/transactions',
        title: 'Transaction list readable for any account ID',
        description: 'No ownership check on accountId — allows cross-account transaction enumeration.',
        detectedAt: '41m ago'
    },
    {
        id: 'pe-004', repoId: 'payments-edge', findingClass: 'Mass Assign', severity: 'high',
        method: 'PATCH', endpoint: '/v1/users/profile',
        title: 'Request body merged directly into user model',
        description: 'No field allow-list on the PATCH body — callers can write role and status fields.',
        detectedAt: '41m ago'
    },
    {
        id: 'pe-005', repoId: 'payments-edge', findingClass: 'Broken Auth', severity: 'high',
        method: 'POST', endpoint: '/v1/auth/token',
        title: 'Token endpoint lacks brute-force protection',
        description: 'No rate limiting or account lockout on failed authentication attempts.',
        detectedAt: '41m ago'
    },
    {
        id: 'pe-006', repoId: 'payments-edge', findingClass: 'Overexposure', severity: 'medium',
        method: 'GET', endpoint: '/v1/accounts/{accountId}',
        title: 'Account details include internal balance fields',
        description: 'Response body exposes internalLedger and riskScore fields to the client.',
        detectedAt: '41m ago'
    },
    {
        id: 'pe-007', repoId: 'payments-edge', findingClass: 'Validation', severity: 'medium',
        method: 'POST', endpoint: '/v1/payments',
        title: 'Payment amount accepted without range validation',
        description: 'Negative amounts and extremely large values are accepted without rejection.',
        detectedAt: '41m ago'
    },

    // bobcat-server (0 critical, 2 high, 2 medium)
    {
        id: 'bs-001', repoId: 'bobcat-server', findingClass: 'IDOR', severity: 'high',
        method: 'GET', endpoint: '/v1/scans/{scanId}',
        title: 'Scan result readable across organizations',
        description: 'The scanId is not scoped to the requesting org — cross-org data leakage.',
        detectedAt: '8m ago'
    },
    {
        id: 'bs-002', repoId: 'bobcat-server', findingClass: 'BFLA', severity: 'high',
        method: 'DELETE', endpoint: '/v1/scans/{scanId}',
        title: 'Scan deletion not gated on org ownership',
        description: 'Any authenticated user can delete scans belonging to other organizations.',
        detectedAt: '8m ago'
    },
    {
        id: 'bs-003', repoId: 'bobcat-server', findingClass: 'Overexposure', severity: 'medium',
        method: 'GET', endpoint: '/v1/findings',
        title: 'Findings endpoint returns raw internal metadata',
        description: 'Response includes internal scoring weights not intended for clients.',
        detectedAt: '8m ago'
    },
    {
        id: 'bs-004', repoId: 'bobcat-server', findingClass: 'Validation', severity: 'medium',
        method: 'POST', endpoint: '/v1/scans',
        title: 'Scan target URL not validated before dispatch',
        description: 'Any URL including internal addresses can be submitted as a scan target.',
        detectedAt: '8m ago'
    },

    // groupr-api (4 critical, 2 high)
    {
        id: 'ga-001', repoId: 'groupr-api', findingClass: 'BOLA', severity: 'critical',
        method: 'GET', endpoint: '/v1/groups/{groupId}/members/{memberId}',
        title: 'Member record readable without group membership',
        description: 'No check that the requesting user belongs to the group before returning member data.',
        detectedAt: '27m ago'
    },
    {
        id: 'ga-002', repoId: 'groupr-api', findingClass: 'BOLA', severity: 'critical',
        method: 'GET', endpoint: '/v1/events/{eventId}',
        title: 'Private event readable by non-members',
        description: 'Event visibility setting is ignored — all authenticated users can read private events.',
        detectedAt: '27m ago'
    },
    {
        id: 'ga-003', repoId: 'groupr-api', findingClass: 'SSRF', severity: 'critical',
        method: 'POST', endpoint: '/v1/groups/import',
        title: 'Group import fetches arbitrary URLs',
        description: 'Import endpoint fetches a server-supplied URL without host validation.',
        detectedAt: '27m ago'
    },
    {
        id: 'ga-004', repoId: 'groupr-api', findingClass: 'SSRF', severity: 'critical',
        method: 'POST', endpoint: '/v1/integrations/webhook',
        title: 'Webhook target allows internal network access',
        description: 'No SSRF protection — webhook callbacks can target internal metadata endpoints.',
        detectedAt: '27m ago'
    },
    {
        id: 'ga-005', repoId: 'groupr-api', findingClass: 'IDOR', severity: 'high',
        method: 'GET', endpoint: '/v1/messages/{messageId}',
        title: 'Direct message readable outside conversation',
        description: 'Message ID not scoped to conversation participants.',
        detectedAt: '27m ago'
    },
    {
        id: 'ga-006', repoId: 'groupr-api', findingClass: 'Broken Auth', severity: 'high',
        method: 'GET', endpoint: '/v1/groups/{groupId}/admin',
        title: 'Admin panel accessible without elevated session',
        description: 'Standard user tokens accepted on admin-only group management endpoints.',
        detectedAt: '27m ago'
    }
];

export const MOCK_SCANS: MockScan[] = [
    {
        id: 'scan-sci-1', repoId: 'stacc-check-in',
        completedAt: '3m ago', endpointsTotal: 142, endpointsTested: 137,
        findingsTotal: 7, duration: '1m 14s', status: 'completed'
    },
    {
        id: 'scan-pe-1', repoId: 'payments-edge',
        completedAt: '41m ago', endpointsTotal: 53, endpointsTested: 53,
        findingsTotal: 7, duration: '42s', status: 'completed'
    },
    {
        id: 'scan-bs-1', repoId: 'bobcat-server',
        completedAt: '8m ago', endpointsTotal: 88, endpointsTested: 88,
        findingsTotal: 4, duration: '58s', status: 'completed'
    },
    {
        id: 'scan-ga-1', repoId: 'groupr-api',
        completedAt: '27m ago', endpointsTotal: 61, endpointsTested: 59,
        findingsTotal: 6, duration: '51s', status: 'completed'
    }
];

export const MOCK_ACTIVITY: ActivityItem[] = [
    { id: 'a-1', repoId: 'groupr-api', message: 'New SSRF finding detected on avatar import endpoint', at: '27m ago' },
    { id: 'a-2', repoId: 'stacc-check-in', message: 'BOLA finding commented on active pull request', at: '3m ago' },
    { id: 'a-3', repoId: 'payments-edge', message: 'Spec drift patch suggested for openapi/v1.yaml', at: '41m ago' }
];
