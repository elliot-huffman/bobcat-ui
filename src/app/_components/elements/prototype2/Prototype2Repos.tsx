'use client';

import {
    Button,
    createTableColumn,
    DataGrid,
    DataGridBody,
    DataGridCell,
    DataGridHeader,
    DataGridHeaderCell,
    DataGridRow,
    SearchBox,
    TableCellLayout
} from '@fluentui/react-components';
import type { TableColumnDefinition } from '@fluentui/react-components';
import { OpenRegular } from '@fluentui/react-icons';
import { useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import { Layout } from '../LayoutSystem';
import { useMockAppData } from '../../sdk/useMockAppData';
import type { RepoSummary } from '../../sdk/mockAppData';
import { Prototype2PrivacyMarker, Prototype2SeverityLadder } from './Prototype2SeverityLadder';
import { usePrototype2ReposStyles } from '../../styles/prototype2/Prototype2Repos';

/** Prop contract for the prototype2 repositories screen. */
export interface Prototype2ReposProps {
    /** Invoked when a repository row is opened. */
    onOpenRepo?: (repoId: string) => void;
    /** Invoked when the user opens repository configuration. */
    onConfigure?: () => void;
}

/** Risk score used to rank repositories by alert pressure (critical dominates). */
function repoRisk(repo: RepoSummary): number {
    return repo.critical * 1000 + repo.high * 10 + repo.medium;
}

/**
 * Additive repositories screen for the Bobcat prototype2 application surface.
 * Mirrors the `#/app/repos` route: a sortable, searchable Fluent DataGrid of every watched repository.
 * @param props Navigation and action callbacks for the repositories screen.
 * @returns Rendered repositories screen.
 */
export function Prototype2Repos(props: Prototype2ReposProps): ReactNode {
    const styles = usePrototype2ReposStyles();
    const { repos } = useMockAppData();
    const [search, setSearch] = useState('');

    const items = useMemo(() => {
        const query = search.trim().toLowerCase();

        if (!query) {
            return repos;
        }

        return repos.filter((repo) => repo.name.toLowerCase().includes(query));
    }, [repos, search]);

    const columns = useMemo((): TableColumnDefinition<RepoSummary>[] => {
        return [
            createTableColumn<RepoSummary>({
                columnId: 'privacy',
                renderHeaderCell: () => 'Privacy',
                renderCell: (repo) => (
                    <TableCellLayout>
                        <Prototype2PrivacyMarker isPrivate={ repo.isPrivate } />
                    </TableCellLayout>
                )
            }),
            createTableColumn<RepoSummary>({
                columnId: 'name',
                compare: (first, second) => first.name.localeCompare(second.name),
                renderHeaderCell: () => 'Name',
                renderCell: (repo) => (
                    <TableCellLayout>
                        <span className={ styles.nameTitle }>{ repo.name }</span>
                    </TableCellLayout>
                )
            }),
            createTableColumn<RepoSummary>({
                columnId: 'type',
                compare: (first, second) => first.type.localeCompare(second.type),
                renderHeaderCell: () => 'Type',
                renderCell: (repo) => (
                    <TableCellLayout>
                        <span className={ styles.typeCell }>{ repo.type }</span>
                    </TableCellLayout>
                )
            }),
            createTableColumn<RepoSummary>({
                columnId: 'alerts',
                compare: (first, second) => repoRisk(first) - repoRisk(second),
                renderHeaderCell: () => 'Alerts',
                renderCell: (repo) => (
                    <TableCellLayout>
                        <Prototype2SeverityLadder repo={ repo } />
                    </TableCellLayout>
                )
            }),
            createTableColumn<RepoSummary>({
                columnId: 'endpoints',
                compare: (first, second) => first.endpoints - second.endpoints,
                renderHeaderCell: () => 'Endpoints',
                renderCell: (repo) => (
                    <TableCellLayout>
                        <span className={ styles.endpointCell }>{ repo.endpoints.toLocaleString() }</span>
                    </TableCellLayout>
                )
            })
        ];
    }, [styles]);

    return (
        <Layout className={ styles.root }>
            <Layout className={ styles.pageHead }>
                <Layout className={ styles.pageHeadText }>
                    <h2 className={ styles.pageTitle }>Repositories</h2>
                    <p className={ styles.pageSubtitle }>Every repo Bobcat watches. Select one to open its spec scan.</p>
                </Layout>
                <Layout className={ styles.pageActions }>
                    <Button appearance="outline" icon={ <OpenRegular /> } onClick={ props.onConfigure }>Configure repositories</Button>
                </Layout>
            </Layout>

            <Layout className={ styles.toolbar }>
                <SearchBox
                    className={ styles.toolbarSearch }
                    placeholder="Search for a repository…"
                    value={ search }
                    onChange={ (_event, data) => { setSearch(data.value); } }
                />
            </Layout>

            <DataGrid
                items={ items }
                columns={ columns }
                sortable
                getRowId={ (repo) => repo.id }
                focusMode="composite"
                className={ styles.grid }
                columnSizingOptions={ {
                    privacy: { minWidth: 56, idealWidth: 56, defaultWidth: 56 },
                    name: { minWidth: 220, idealWidth: 260 },
                    alerts: { minWidth: 200, idealWidth: 220 }
                } }
            >
                <DataGridHeader>
                    <DataGridRow>
                        {({ renderHeaderCell }) => <DataGridHeaderCell>{ renderHeaderCell() }</DataGridHeaderCell>}
                    </DataGridRow>
                </DataGridHeader>
                <DataGridBody<RepoSummary>>
                    {({ item, rowId }) => (
                        <DataGridRow<RepoSummary>
                            key={ rowId }
                            className={ styles.gridRow }
                            onClick={ () => { props.onOpenRepo?.(item.id); } }
                        >
                            {({ renderCell }) => <DataGridCell>{ renderCell(item) }</DataGridCell>}
                        </DataGridRow>
                    )}
                </DataGridBody>
            </DataGrid>

            {items.length === 0 ? <p className={ styles.emptyState }>No repositories matched your search.</p> : null}
        </Layout>
    );
}
