'use client';

import type { ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { Prototype2Overview } from '../../_components/elements/prototype2/Prototype2Overview';

/** Dedicated route that renders the prototype2 overview screen. */
export default function Prototype2OverviewPage(): ReactNode {
    /** Router used to move between the prototype2 screens. */
    const router = useRouter();

    return (
        <Prototype2Overview
            onOpenRepo={ () => { router.push('/prototype2/repos'); } }
            onNavigate={ (page) => { router.push(page === 'repos' ? '/prototype2/repos' : '/prototype2/alerts'); } }
        />
    );
}
