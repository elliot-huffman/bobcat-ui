'use client';

import type { ReactNode } from 'react';
import { PrototypeAppShell } from '../_components/elements/prototype/PrototypeAppShell';

/** Dedicated scans route for the Bobcat prototype shell. */
export default function ScansPage(): ReactNode {
    return <PrototypeAppShell initialPage="scans" />;
}
