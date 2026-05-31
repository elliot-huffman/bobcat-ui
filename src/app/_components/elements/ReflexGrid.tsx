'use client';

import {
    Button,
    Card,
    CardHeader,
    DataGrid,
    DataGridBody,
    DataGridCell,
    DataGridHeader,
    DataGridHeaderCell,
    DataGridRow,
    Dialog,
    DialogActions,
    DialogBody,
    DialogContent,
    DialogSurface,
    DialogTitle,
    Field,
    Input,
    createTableColumn,
    type TableColumnDefinition
} from '@fluentui/react-components';
import { useCallback, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AnalysisResultCard } from './AnalysisResultCard';
import { useReflexGridStyles } from '../styles/components/ReflexGrid';
import { analysisScreenSelector, setAnalysisScreen } from '../../../store/components/elements/analysisScreen';
import { mockAnalysisSdk, type AnalysisScanRecord, type DetailedAnalysisRecord } from '../sdk/mockAnalysisSdk';

type ReflexGridRow = AnalysisScanRecord;

interface ReflexGridFilters {
    customer: string;
    id: string;
    region: string;
    status: string;
}

type ReflexGridDetailRow = DetailedAnalysisRecord;

/** Default scan rows shown when no parent-provided rows are available. */
const defaultRows: ReflexGridRow[] = [
    { id: '6f84f5cc-bda6-4d50-9f03-ffb224ab9b5f', customer: 'Northwind Traders', region: 'North America', status: 'Active' },
    { id: 'f94f8dca-51cc-4674-8d6e-3ec4ff4cbf66', customer: 'Fabrikam Retail', region: 'Europe', status: 'Pending' },
    { id: 'e9f7143a-f306-4482-a9f3-d5fc2f09ff8f', customer: 'Contoso Labs', region: 'Asia Pacific', status: 'Active' },
    { id: '76806295-0468-48aa-b619-a5d95a22ce7b', customer: 'Adventure Works', region: 'North America', status: 'Blocked' },
    { id: '2c0dc8eb-2e4a-43c4-bd6f-c2b2d8ed8ca7', customer: 'Litware Group', region: 'Europe', status: 'Pending' },
    { id: '39f59a7b-1d01-44d1-933f-3054fe9620cd', customer: 'Wingtip Studio', region: 'South America', status: 'Active' }
];

export interface ReflexGridProps {
    rows?: ReflexGridRow[];
}

/** Column definitions for the primary analysis grid. */
const baseColumns: TableColumnDefinition<ReflexGridRow>[] = [
    createTableColumn<ReflexGridRow>({
        columnId: 'id',
        compare: (a, b) => a.id.localeCompare(b.id),
        renderCell: (item) => item.id,
        renderHeaderCell: () => 'ID'
    }),
    createTableColumn<ReflexGridRow>({
        columnId: 'customer',
        compare: (a, b) => a.customer.localeCompare(b.customer),
        renderCell: (item) => item.customer,
        renderHeaderCell: () => 'Customer'
    }),
    createTableColumn<ReflexGridRow>({
        columnId: 'region',
        compare: (a, b) => a.region.localeCompare(b.region),
        renderCell: (item) => item.region,
        renderHeaderCell: () => 'Region'
    }),
    createTableColumn<ReflexGridRow>({
        columnId: 'status',
        compare: (a, b) => a.status.localeCompare(b.status),
        renderCell: (item) => item.status,
        renderHeaderCell: () => 'Status'
    })
];

/**
 * Renders a filtered Fluent UI DataGrid for quick tabular exploration.
 * @returns Rendered ReflexGrid component.
 */
export function ReflexGrid(props: ReflexGridProps): React.ReactNode {
    /** Compiled style classes used throughout the grid views. */
    const styles = useReflexGridStyles();
    /** Dispatch function for writing analysis screen mode changes. */
    const dispatch = useDispatch();
    /** Current analysis screen mode from the global store. */
    const analysisScreen = useSelector(analysisScreenSelector);
    /** Selected analysis row currently shown inside the dialog. */
    const [selectedRow, setSelectedRow] = useState<ReflexGridRow | undefined>(void 0);
    /** Loaded detailed records for the selected analysis row. */
    const [detailsRows, setDetailsRows] = useState<ReflexGridDetailRow[]>([]);
    /** Flag showing whether detailed records have been loaded once. */
    const [detailsLoaded, setDetailsLoaded] = useState(false);
    /** Flag showing whether the detailed request is currently in-flight. */
    const [detailsLoading, setDetailsLoading] = useState(false);
    /** Input rows for the scan grid, from parent or local default set. */
    const rows = props.rows ?? defaultRows;
    /** Filter text values for each scan-grid column. */
    const [filters, setFilters] = useState<ReflexGridFilters>({
        customer: '',
        id: '',
        region: '',
        status: ''
    });

    /** Opens the row-details dialog and resets the prior detail result state. */
    const handleOpenRow = useCallback((row: ReflexGridRow): void => {
        // Persist the selected row so the details dialog can render its content.
        setSelectedRow(row);

        // Reset detail-loaded status so stale detail UI is not reused.
        setDetailsLoaded(false);
        
        // Clear previous detail rows before any new detail request.
        setDetailsRows([]);
    }, []);

    /** Closes the details dialog and clears any transient detailed state. */
    const handleDialogClose = useCallback((): void => {
        // Clear selected row to close the dialog surface.
        setSelectedRow(void 0);

        // Reset detail-loaded status for the next dialog open.
        setDetailsLoaded(false);

        // Remove any previously loaded detail rows.
        setDetailsRows([]);
        
        // Ensure loading indicator is turned off when dialog closes.
        setDetailsLoading(false);
    }, []);

    /** Returns from the detailed analysis screen to the scan screen. */
    const handleBackToScan = useCallback((): void => {
        dispatch(setAnalysisScreen('scan'));
    }, [dispatch]);

    /** Loads detailed records from the mock SDK using the selected scan ID. */
    const requestDetailRows = useCallback(async (rowId: string): Promise<ReflexGridDetailRow[]> => {
        return mockAnalysisSdk.getDetailedAnalysisByScanId(rowId);
    }, []);

    /** Loads details for a scan row and navigates to the detailed analysis screen. */
    const loadAndShowDetails = useCallback(async (row: ReflexGridRow): Promise<void> => {
        // Turn on the loading state while detailed records are loading.
        setDetailsLoading(true);
        /** Detail records returned for the selected row ID. */
        const responseRows = await requestDetailRows(row.id);
        // Store returned detail rows for detailed-grid rendering.
        setDetailsRows(responseRows);
        // Mark details as loaded so dependent UI can render correctly.
        setDetailsLoaded(true);
        // Turn off loading indicator after request completion.
        setDetailsLoading(false);
        // Clear selected dialog row before moving to detailed screen mode.
        setSelectedRow(void 0);
        dispatch(setAnalysisScreen('detailed'));
    }, [dispatch, requestDetailRows]);

    /** Handles View clicks by loading detail rows and switching to detailed mode. */
    const handleViewDetails = useCallback(async (): Promise<void> => {
        if (!selectedRow) {
            return;
        }

        await loadAndShowDetails(selectedRow);
    }, [loadAndShowDetails, selectedRow]);

    /** Primary analysis-grid columns including the row-level action button column. */
    const columns = useMemo<TableColumnDefinition<ReflexGridRow>[]>(() => {
        /** Extra actions column appended to the right side of the analysis grid. */
        const actionsColumn = createTableColumn<ReflexGridRow>({
            columnId: 'actions',
            compare: () => 0,
            renderCell: (item) => (
                <div className={ styles.actionCell }>
                    <Button
                        appearance="secondary"
                        size="small"
                        onClick={ (event) => {
                            event.stopPropagation();
                            handleOpenRow(item);
                        } }
                    >
                        Open
                    </Button>
                </div>
            ),
            renderHeaderCell: () => 'Actions'
        });

        return [...baseColumns, actionsColumn];
    }, [handleOpenRow, styles.actionCell]);

    /** Column definitions for the full-page detailed analysis grid. */
    const detailsColumns = useMemo<TableColumnDefinition<ReflexGridDetailRow>[]>(() => {
        return [
            createTableColumn<ReflexGridDetailRow>({
                columnId: 'detailedRecord',
                compare: (a, b) => a.eventType.localeCompare(b.eventType),
                renderCell: (item) => <AnalysisResultCard result={ item } />,
                renderHeaderCell: () => 'Detailed Record'
            })
        ];
    }, []);

    /** Rows matching the active column filters in the scan grid. */
    const filteredRows = useMemo(() => {
        return rows.filter((row) => {
            return row.id.toLowerCase().includes(filters.id.toLowerCase())
                && row.customer.toLowerCase().includes(filters.customer.toLowerCase())
                && row.region.toLowerCase().includes(filters.region.toLowerCase())
                && row.status.toLowerCase().includes(filters.status.toLowerCase());
        });
    }, [filters, rows]);

    if (analysisScreen === 'detailed') {
        return (
            <section id="detailed-analysis-grid" className={ styles.container } aria-label="Detailed Analysis Grid">
                <div>
                    <h2 className={ styles.heading }>Detailed Analysis Grid</h2>
                    <p className={ styles.copy }>Loaded detail rows tied to the selected analysis record.</p>
                </div>

                <div className={ styles.detailsActions }>
                    <Button appearance="secondary" onClick={ handleBackToScan }>Back To Scan Screen</Button>
                </div>

                <div className={ styles.gridShell }>
                    <DataGrid
                        columns={ detailsColumns }
                        getRowId={ (item) => item.id }
                        items={ detailsRows }
                        sortable
                        focusMode="composite"
                    >
                        <DataGridHeader>
                            <DataGridRow>
                                {({ renderHeaderCell }) => (
                                    <DataGridHeaderCell>{ renderHeaderCell() }</DataGridHeaderCell>
                                )}
                            </DataGridRow>
                        </DataGridHeader>
                        <DataGridBody<ReflexGridDetailRow>>
                            {({ item, rowId }) => (
                                <DataGridRow<ReflexGridDetailRow> key={ rowId }>
                                    {({ renderCell }) => (
                                        <DataGridCell className={ styles.detailGridCell }>{ renderCell(item) }</DataGridCell>
                                    )}
                                </DataGridRow>
                            )}
                        </DataGridBody>
                    </DataGrid>
                    {detailsRows.length === 0 ? (
                        <p className={ styles.noRows }>No detailed rows were returned for this record.</p>
                    ) : void 0}
                </div>
            </section>
        );
    }

    return (
        <section id="scan-screen" className={ styles.container } aria-label="Analysis Grid">
            <div>
                <h2 className={ styles.heading }>Analysis Grid</h2>
                <p className={ styles.copy }>Filter each column with Fluent text inputs.</p>
            </div>

            <div className={ styles.filters }>
                <Field label="Filter by ID">
                    <Input
                        value={ filters.id }
                        onChange={ (_, data) => {
                            // Update the ID filter value while preserving other filter fields.
                            setFilters((previous) => ({ ...previous, id: data.value }));
                        } }
                    />
                </Field>
                <Field label="Filter by customer">
                    <Input
                        value={ filters.customer }
                        onChange={ (_, data) => {
                            // Update the customer filter value while preserving other filter fields.
                            setFilters((previous) => ({ ...previous, customer: data.value }));
                        } }
                    />
                </Field>
                <Field label="Filter by region">
                    <Input
                        value={ filters.region }
                        onChange={ (_, data) => {
                            // Update the region filter value while preserving other filter fields.
                            setFilters((previous) => ({ ...previous, region: data.value }));
                        } }
                    />
                </Field>
                <Field label="Filter by status">
                    <Input
                        value={ filters.status }
                        onChange={ (_, data) => {
                            // Update the status filter value while preserving other filter fields.
                            setFilters((previous) => ({ ...previous, status: data.value }));
                        } }
                    />
                </Field>
            </div>

            <div className={ styles.gridShell }>
                <DataGrid
                    columns={ columns }
                    getRowId={ (item) => item.id }
                    items={ filteredRows }
                    sortable
                    focusMode="composite"
                >
                    <DataGridHeader>
                        <DataGridRow>
                            {({ renderHeaderCell }) => (
                                <DataGridHeaderCell>{ renderHeaderCell() }</DataGridHeaderCell>
                            )}
                        </DataGridRow>
                    </DataGridHeader>
                    <DataGridBody<ReflexGridRow>>
                        {({ item, rowId }) => (
                            <DataGridRow<ReflexGridRow> key={ rowId } onClick={ () => { void loadAndShowDetails(item); } }>
                                {({ renderCell }) => (
                                    <DataGridCell>{ renderCell(item) }</DataGridCell>
                                )}
                            </DataGridRow>
                        )}
                    </DataGridBody>
                </DataGrid>
                {filteredRows.length === 0 ? (
                    <p className={ styles.noRows }>No rows match your current filters.</p>
                ) : void 0}
            </div>

            <Dialog open={ selectedRow !== void 0 } onOpenChange={ (_, data) => { if (!data.open) { handleDialogClose(); } } }>
                <DialogSurface>
                    <DialogBody>
                        <DialogTitle>Record details</DialogTitle>
                        <DialogContent>
                            {selectedRow ? (
                                <Card className={ styles.detailsCard }>
                                    <CardHeader
                                        header={ <h3 className={ styles.detailsTitle }>Record details</h3> }
                                        description={ <p className={ styles.detailsDescription }>ID: { selectedRow.id }</p> }
                                    />
                                    <dl className={ styles.detailsList }>
                                        <div className={ styles.detailsRow }>
                                            <dt className={ styles.detailsKey }>Customer</dt>
                                            <dd className={ styles.detailsValue }>{ selectedRow.customer }</dd>
                                        </div>
                                        <div className={ styles.detailsRow }>
                                            <dt className={ styles.detailsKey }>Region</dt>
                                            <dd className={ styles.detailsValue }>{ selectedRow.region }</dd>
                                        </div>
                                        <div className={ styles.detailsRow }>
                                            <dt className={ styles.detailsKey }>Status</dt>
                                            <dd className={ styles.detailsValue }>{ selectedRow.status }</dd>
                                        </div>
                                    </dl>
                                    <div className={ styles.detailsActions }>
                                        <Button appearance="primary" onClick={ () => { void handleViewDetails(); } } disabled={ detailsLoading }>
                                            View
                                        </Button>
                                    </div>
                                </Card>
                            ) : void 0}

                            {detailsLoading ? (
                                <p className={ styles.detailsHint }>Loading related records...</p>
                            ) : void 0}

                            {detailsLoaded ? (
                                <div className={ styles.detailsGridShell }>
                                    <DataGrid
                                        columns={ detailsColumns }
                                        getRowId={ (item) => item.id }
                                        items={ detailsRows }
                                        sortable
                                        focusMode="composite"
                                    >
                                        <DataGridHeader>
                                            <DataGridRow>
                                                {({ renderHeaderCell }) => (
                                                    <DataGridHeaderCell>{ renderHeaderCell() }</DataGridHeaderCell>
                                                )}
                                            </DataGridRow>
                                        </DataGridHeader>
                                        <DataGridBody<ReflexGridDetailRow>>
                                            {({ item, rowId }) => (
                                                <DataGridRow<ReflexGridDetailRow> key={ rowId }>
                                                    {({ renderCell }) => (
                                                        <DataGridCell className={ styles.detailGridCell }>{ renderCell(item) }</DataGridCell>
                                                    )}
                                                </DataGridRow>
                                            )}
                                        </DataGridBody>
                                    </DataGrid>
                                </div>
                            ) : void 0}
                        </DialogContent>
                        <DialogActions>
                            <Button appearance="primary" onClick={ handleDialogClose }>
                                Close
                            </Button>
                        </DialogActions>
                    </DialogBody>
                </DialogSurface>
            </Dialog>
        </section>
    );
}
