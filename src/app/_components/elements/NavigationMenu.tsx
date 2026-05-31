'use client';

import { Badge, DrawerHeaderTitle, NavDrawer, NavDrawerBody, NavDrawerHeader, NavItem, NavSectionHeader, type OnNavItemSelectData } from '@fluentui/react-components';
import { analysisScreenSelector, setAnalysisScreen } from '../../../store/components/elements/analysisScreen';
import { navigationMenuVisibleSelector, setNavigationMenuVisible } from '../../../store/components/elements/navigationMenu';
import { useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { usePathname, useRouter } from 'next/navigation';
import { useStyleList } from '../styles/elements/NavigationMenu';

/**
 * Renders the application's navigation drawer with links to shared pages.
 * @returns Rendered navigation drawer.
 */
export function NavigationMenu(): React.ReactNode {
    /** IDs for in-page section anchors. */
    const inPageSectionIds = useMemo(() => new Set(['home', 'scan-screen', 'detailed-analysis-grid', 'userInput', 'requestOutput', 'check-in', 'add-remove', 'sync']), []);

    /** Redux dispatch used to update menu visibility. */
    const dispatch = useDispatch();

    /** Router used to navigate to the selected page. */
    const router = useRouter();

    /** Current page path used to determine the selected navigation item. */
    const currentPage = usePathname();

    /** Current analysis screen mode used to map selected nav item on home. */
    const analysisScreen = useSelector(analysisScreenSelector);

    /** Compiled CSS styles for the navigation menu. */
    const compiledStyles = useStyleList();

    /** Current visibility state of the navigation drawer. */
    const isNavigationMenuVisible = useSelector(navigationMenuVisibleSelector);

    /** Navigates to the About page and closes the navigation drawer. */
    const navManager = useCallback((_event: unknown, data: OnNavItemSelectData): void => {
        if (typeof data.value !== 'string') { return; }

        if (data.value === 'add-api') {
            dispatch(setAnalysisScreen('add-api'));

            if (currentPage !== '/') {
                router.push('/');

                return;
            }

            window.history.replaceState(void 0, '', '/');

            return;
        }

        if (data.value === 'scan-screen') {
            dispatch(setAnalysisScreen('scan'));

            if (currentPage !== '/') {
                router.push('/#scan-screen');

                return;
            }

            document.getElementById('scan-screen')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
            window.history.replaceState(void 0, '', '/#scan-screen');

            return;
        }

        if (data.value === 'add/remove') {
            const targetId = 'add-remove';

            if (currentPage !== '/') {
                router.push(`/#${ targetId }`);

                return;
            }

            document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
            window.history.replaceState(void 0, '', `/#${ targetId }`);

            return;
        }

        if (inPageSectionIds.has(data.value)) {
            if (currentPage !== '/') {
                router.push(`/#${ data.value }`);

                return;
            }

            document.getElementById(data.value)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
            window.history.replaceState(void 0, '', `/#${ data.value }`);

            return;
        }

        // Navigate to the requested page if it exists
        switch (data.value) {
            case 'settings':
                // Execute page navigation
                router.push('/Settings');

                // Stop execution to prevent fallthrough
                break;
            case 'about':
                // Execute page navigation
                router.push('/About');

                // Stop execution to prevent fallthrough
                break;
            default:
                // No default navigation page, just close the menu

                // Stop execution to prevent fallthrough
                break;
        }
    }, [currentPage, dispatch, inPageSectionIds, router]);

    /** Determines the currently selected navigation item based on the current page. */
    const selectedNavItem = useMemo(() => {
        switch (currentPage) {
            case '/':
                return analysisScreen === 'add-api' ? 'add-api' : 'scan-screen';
            case '/Settings':
            case '/Settings/':
                return 'settings';
            case '/About':
            case '/About/':
                return 'about';
            default:
                return '';
        }
    }, [analysisScreen, currentPage]);

    // Render the navigation drawer with the appropriate visibility and event handlers
    return (
        <NavDrawer
            open={ isNavigationMenuVisible }
            type="inline"
            className={ compiledStyles.navContainer }
            onNavItemSelect={ navManager }
            selectedValue={ selectedNavItem }
            onOpenChange={ (_event, data): void => { dispatch(setNavigationMenuVisible(data.open)); } }
        >
            <NavDrawerHeader>
                <DrawerHeaderTitle>Navigation</DrawerHeaderTitle>
            </NavDrawerHeader>
            <NavDrawerBody>
                <NavSectionHeader>General</NavSectionHeader>
                <NavItem value="scan-screen">Scans</NavItem>
                <NavItem value="add-api">Add API</NavItem>
                <div className={ compiledStyles.comingSoonContainer }>
                    <Badge appearance="outline" color="informative">Coming soon</Badge>
                </div>
            </NavDrawerBody>
        </NavDrawer>
    );
}
