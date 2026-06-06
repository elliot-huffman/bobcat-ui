'use client';

import type { ReactNode } from 'react';
import { PrototypeAppShell } from '../_components/elements/prototype/PrototypeAppShell';

/** Dedicated threat intel route for the Bobcat prototype shell. */
export default function ThreatIntelPage(): ReactNode {
    return <PrototypeAppShell initialPage="threat" />;
}
