'use client';

import type { ReactNode } from 'react';
import { PrototypeAppShell } from '../_components/elements/prototype/PrototypeAppShell';

/** Dedicated alerts route for the Bobcat prototype shell. */
export default function AlertsPage(): ReactNode {
    return <PrototypeAppShell initialPage="alerts" />;
}
