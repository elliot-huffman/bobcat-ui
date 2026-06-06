'use client';

import type { ReactNode } from 'react';
import { PrototypeAppShell } from './_components/elements/prototype/PrototypeAppShell';

/** Main route now opens the repositories experience. */
export default function Page(): ReactNode {
    return <PrototypeAppShell initialPage="repos" />;
}
