'use client';

import type { ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { Prototype2Repos } from '../../_components/elements/prototype2/Prototype2Repos';

/** Dedicated route that renders the prototype2 repositories screen. */
export default function Prototype2ReposPage(): ReactNode {
    /** Router used to move between the prototype2 screens. */
    const router = useRouter();

    return (
        <Prototype2Repos
            onOpenRepo={ () => { router.push('/prototype2/overview'); } }
        />
    );
}
