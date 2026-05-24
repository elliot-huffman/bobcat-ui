'use client';

import { Card } from '@fluentui/react-components';
import { useStyleList } from '../styles/pages/Home';

/**
 * Placeholder section for check-in content.
 * @returns Rendered check-in section container.
 */
export function CheckInSection(): React.ReactNode {
    /** Compiled CSS styles for the page. */
    const computedStyles = useStyleList();

    return (
        <Card id="check-in" className={ computedStyles.sectionCard }>
            <p className={ computedStyles.sectionEyebrow }>Section 2</p>
            <h2 className={ computedStyles.sectionTitle }>Check-In</h2>
            <p className={ computedStyles.sectionCopy }>Placeholder content for check-in workflows.</p>
        </Card>
    );
}

/**
 * Placeholder section for add/remove content.
 * @returns Rendered add/remove section container.
 */
export function AddRemoveSection(): React.ReactNode {
    /** Compiled CSS styles for the page. */
    const computedStyles = useStyleList();

    return (
        <Card id="add-remove" className={ computedStyles.sectionCard }>
            <p className={ computedStyles.sectionEyebrow }>Section 3</p>
            <h2 className={ computedStyles.sectionTitle }>Add / Remove</h2>
            <p className={ computedStyles.sectionCopy }>Placeholder content for member add and remove actions.</p>
        </Card>
    );
}

/**
 * Placeholder section for sync content.
 * @returns Rendered sync section container.
 */
export function SyncSection(): React.ReactNode {
    /** Compiled CSS styles for the page. */
    const computedStyles = useStyleList();

    return (
        <Card id="sync" className={ computedStyles.sectionCard }>
            <p className={ computedStyles.sectionEyebrow }>Section 4</p>
            <h2 className={ computedStyles.sectionTitle }>Sync</h2>
            <p className={ computedStyles.sectionCopy }>Placeholder content for synchronization and import status.</p>
        </Card>
    );
}

/**
 * Placeholder section for about content.
 * @returns Rendered about section container.
 */
export function AboutSection(): React.ReactNode {
    /** Compiled CSS styles for the page. */
    const computedStyles = useStyleList();

    return (
        <Card id="about" className={ computedStyles.sectionCard }>
            <p className={ computedStyles.sectionEyebrow }>Section 5</p>
            <h2 className={ computedStyles.sectionTitle }>About</h2>
            <p className={ computedStyles.sectionCopy }>Placeholder content for general app information.</p>
        </Card>
    );
}