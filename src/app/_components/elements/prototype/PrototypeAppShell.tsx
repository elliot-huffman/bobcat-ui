'use client';

import { Badge, Button, Card, Dropdown, Option } from '@fluentui/react-components';
import { useEffect, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import { Layout } from '../LayoutSystem';
import { usePrototypeAppShellStyles } from '../../styles/prototype/PrototypeAppShell';
import { useMockAppData } from '../../sdk/useMockAppData';
import type { FindingClass } from '../../sdk/mockAppData';

type PrototypeAppPage = 'overview' | 'repos' | 'repo' | 'alerts' | 'scans' | 'threat';


export interface PrototypeAppShellProps {
    onNewScan?: () => void;
    initialPage?: PrototypeAppPage;
}

/** Additive app shell for the Bobcat prototype. */
export function PrototypeAppShell(props: PrototypeAppShellProps): ReactNode {
    const styles = usePrototypeAppShellStyles();
    const { repos, activity, alertsByRepoId, scanByRepoId, totalCritical, totalHigh, totalEndpoints } = useMockAppData();
    const [page, setPage] = useState<PrototypeAppPage>(props.initialPage ?? 'overview');
    const [serverFilter, setServerFilter] = useState<string>('all');
    const [selectedRepoId, setSelectedRepoId] = useState(() => repos[0]?.id ?? '');
    const [selectedServerUrl, setSelectedServerUrl] = useState(() => repos[0]?.servers[0]?.url ?? '');
    const [expandedAlertCardIds, setExpandedAlertCardIds] = useState<string[]>([]);
    const [expandedScanCardIds, setExpandedScanCardIds] = useState<string[]>([]);
    const [highlightedFindingClass, setHighlightedFindingClass] = useState<FindingClass | null>(null);

    useEffect(() => {
        if (!props.initialPage) {
            return;
        }

        setPage(props.initialPage);
    }, [props.initialPage]);

    const serverOptions = useMemo(() => {
        const uniqueServers = new Map<string, { environment: string; url: string }>();

        for (const repo of repos) {
            for (const server of repo.servers) {
                if (!uniqueServers.has(server.url)) {
                    uniqueServers.set(server.url, {
                        environment: server.environment,
                        url: server.url
                    });
                }
            }
        }

        return Array.from(uniqueServers.values());
    }, [repos]);

    const serverScopedRepos = useMemo(() => {
        if (serverFilter === 'all') {
            return repos;
        }

        return repos.filter((repo) => repo.servers.some((server) => server.url === serverFilter));
    }, [repos, serverFilter]);

    const filteredRepos = useMemo(() => serverScopedRepos, [serverScopedRepos]);

    const serverAdjustedFilteredRepos = useMemo(() => {
        if (serverFilter === 'all') {
            return filteredRepos;
        }

        return filteredRepos.map((repo) => {
            const seed = `${ serverFilter }::${ repo.id }`.split('').reduce((sum, char) => sum + char.charCodeAt(0), 0);
            const criticalDelta = seed % 2;
            const highDelta = seed % 3 === 0 ? 1 : 0;
            const mediumDelta = seed % 4 === 0 ? 1 : 0;
            const lowDelta = seed % 5 === 0 ? 1 : 0;
            const endpointsDelta = (seed % 11) - 5;

            return {
                ...repo,
                critical: Math.max(0, repo.critical + criticalDelta),
                high: Math.max(0, repo.high + highDelta),
                medium: Math.max(0, repo.medium + mediumDelta),
                low: Math.max(0, repo.low + lowDelta),
                endpoints: Math.max(1, repo.endpoints + endpointsDelta)
            };
        });
    }, [filteredRepos, serverFilter]);

    const selectedRepo = useMemo(() => {
        return repos.find((repo) => repo.id === selectedRepoId) ?? repos[0]!;
    }, [repos, selectedRepoId]);

    useEffect(() => {
        const hasServer = selectedRepo.servers.some((server: { url: string }) => server.url === selectedServerUrl);

        if (!hasServer) {
            const firstUrl = selectedRepo.servers[0]?.url;

            if (firstUrl) {
                setSelectedServerUrl(firstUrl);
            }
        }
    }, [selectedRepo, selectedServerUrl]);

    const openRepoDetail = (repoId: string): void => {
        const repo = repos.find((entry) => entry.id === repoId);

        if (repo) {
            const matchedServer = serverFilter === 'all'
                ? repo.servers[0]
                : repo.servers.find((server) => server.url === serverFilter) ?? repo.servers[0];

            if (matchedServer) {
                setSelectedServerUrl(matchedServer.url);
            }
        }

        setSelectedRepoId(repoId);
        setPage('repo');
    };

    const openAlertForFinding = (repoId: string, findingClass: FindingClass): void => {
        setExpandedAlertCardIds((previous) => {
            return previous.includes(repoId) ? previous : [...previous, repoId];
        });
        setHighlightedFindingClass(findingClass);
        setPage('alerts');
    };

    const toggleAlertCard = (repoId: string): void => {
        setExpandedAlertCardIds((previous) => {
            return previous.includes(repoId)
                ? previous.filter((id) => id !== repoId)
                : [...previous, repoId];
        });
    };

    const toggleScanCard = (repoId: string): void => {
        setExpandedScanCardIds((previous) => {
            return previous.includes(repoId)
                ? previous.filter((id) => id !== repoId)
                : [...previous, repoId];
        });
    };

    const topRiskRepos = useMemo(() => {
        return [...repos].sort((first, second) => {
            return (second.critical * 10 + second.high) - (first.critical * 10 + first.high);
        }).slice(0, 4);
    }, [repos]);

    const content = useMemo((): ReactNode => {
        if (page === 'overview') {
            return (
                <>
                    <Layout className={ styles.summary }>
                        <Card className={ styles.summaryCard }>
                            <span className={ styles.summaryLabel }>Open critical</span>
                            <strong className={ styles.summaryValue }>{ totalCritical }</strong>
                        </Card>
                        <Card className={ styles.summaryCard }>
                            <span className={ styles.summaryLabel }>Open high</span>
                            <strong className={ styles.summaryValue }>{ totalHigh }</strong>
                        </Card>
                        <Card className={ styles.summaryCard }>
                            <span className={ styles.summaryLabel }>Endpoints tested</span>
                            <strong className={ styles.summaryValue }>{ totalEndpoints }</strong>
                        </Card>
                        <Card className={ styles.summaryCard }>
                            <span className={ styles.summaryLabel }>Specs in sync</span>
                            <strong className={ styles.summaryValue }>12/14</strong>
                        </Card>
                    </Layout>

                    <Layout className={ styles.repoGrid }>
                        {repos.map((repo) => (
                            <Card key={ repo.id } className={ `${ styles.card } ${ styles.clickableCard }` } onClick={ () => { openRepoDetail(repo.id); } }>
                                <strong>{ repo.name }</strong>
                                <span>{ repo.critical } critical · { repo.high } high</span>
                                <span>{ repo.endpoints.toLocaleString() } endpoints</span>
                            </Card>
                        )) }
                    </Layout>

                    <Layout className={ styles.overviewDetailGrid }>
                        <Card className={ styles.card }>
                            <strong>Recent activity</strong>
                            <Layout className={ styles.activityList }>
                                {activity.map((item) => (
                                    <button key={ item.id } className={ styles.activityItem } type="button" onClick={ () => { openRepoDetail(item.repoId); } }>
                                        <span>{ item.message }</span>
                                        <span className={ styles.rowMeta }>{ item.at }</span>
                                    </button>
                                )) }
                            </Layout>
                        </Card>

                        <Card className={ styles.card }>
                            <strong>Top risk by repository</strong>
                            <Layout className={ styles.activityList }>
                                {topRiskRepos.map((repo) => (
                                    <button key={ repo.id } className={ styles.activityItem } type="button" onClick={ () => { openRepoDetail(repo.id); } }>
                                        <span>{ repo.name }</span>
                                        <span className={ styles.rowMeta }>{ repo.critical } critical · { repo.high } high</span>
                                    </button>
                                )) }
                            </Layout>
                        </Card>
                    </Layout>
                </>
            );
        }

        if (page === 'repos') {
            return (
                <>
                    <Layout className={ styles.pageHead }>
                        <Layout>
                            <h2 className={ styles.pageTitle }>Specs</h2>
                            <p className={ styles.pageSubtitle }>Every repo Bobcat watches. Select one to open its spec scan.</p>
                        </Layout>
                    </Layout>

                    <Layout className={ styles.reposToolbar }>
                        <Dropdown
                            value={ serverFilter === 'all' ? 'All servers' : serverOptions.find((server) => server.url === serverFilter)?.url ?? 'All servers' }
                            selectedOptions={ [serverFilter] }
                            onOptionSelect={ (_, data) => {
                                const selected = data.optionValue;

                                if (selected) {
                                    setServerFilter(selected);
                                }
                            } }
                            className={ styles.scopeDropdown }
                        >
                            <Option value="all">All servers</Option>
                            {serverOptions.map((server) => (
                                <Option key={ server.url } value={ server.url } text={ server.url }>
                                    {server.environment}: {server.url}
                                </Option>
                            ))}
                        </Dropdown>
                    </Layout>

                    <Layout className={ styles.table }>
                        <Layout className={ styles.tableHeader }>
                            <span>Privacy</span>
                            <span>Name</span>
                            <span>Type</span>
                            <span>Alerts</span>
                            <span>Dependencies</span>
                        </Layout>
                        {serverAdjustedFilteredRepos.map((repo) => (
                            <button key={ repo.id } type="button" className={ styles.tableRow } onClick={ () => { openRepoDetail(repo.id); } }>
                                <span className={ styles.privacyCell }>{ repo.isPrivate ? 'Private' : 'Public' }</span>
                                <span className={ styles.nameCell }>{ repo.name }</span>
                                <span className={ styles.typeCell }>{ repo.type }</span>
                                <span className={ styles.alertCell }>
                                    <Badge appearance="filled" size="extra-small" { ...(repo.critical > 0 ? { color: 'danger' as const } : {}) }>{ repo.critical }</Badge>
                                    <Badge appearance="filled" size="extra-small" { ...(repo.high > 0 ? { color: 'warning' as const } : {}) }>{ repo.high }</Badge>
                                    <Badge appearance="filled" size="extra-small">{ repo.medium }</Badge>
                                    <Badge appearance="filled" size="extra-small">{ repo.low }</Badge>
                                </span>
                                <span className={ styles.depCell }>{ repo.endpoints }</span>
                            </button>
                        )) }
                    </Layout>

                    {serverAdjustedFilteredRepos.length === 0 ? <p className={ styles.emptyState }>No repositories matched your selected server.</p> : null}
                </>
            );
        }

        if (page === 'repo') {
            const repoAlerts = alertsByRepoId.get(selectedRepo.id) ?? [];
            const testInfoCards: Array<{ id: string; label: FindingClass; count: number; description: string; severity: 'critical' | 'high' | 'medium' | 'low' }> = [
                { id: 'bola', label: 'BOLA', count: repoAlerts.filter((a) => a.findingClass === 'BOLA').length, description: 'Broken Object Level Authorization', severity: 'critical' },
                { id: 'idor', label: 'IDOR', count: repoAlerts.filter((a) => a.findingClass === 'IDOR').length, description: 'Insecure Direct Object Reference', severity: 'high' },
                { id: 'bfla', label: 'BFLA', count: repoAlerts.filter((a) => a.findingClass === 'BFLA').length, description: 'Broken Function Level Authorization', severity: 'high' },
                { id: 'overexposure', label: 'Overexposure', count: repoAlerts.filter((a) => a.findingClass === 'Overexposure').length, description: 'Excessive Data Exposure', severity: 'medium' },
                { id: 'ssrf', label: 'SSRF', count: repoAlerts.filter((a) => a.findingClass === 'SSRF').length, description: 'Server-Side Request Forgery', severity: 'critical' },
                { id: 'mass-assign', label: 'Mass Assign', count: repoAlerts.filter((a) => a.findingClass === 'Mass Assign').length, description: 'Mass Assignment', severity: 'medium' },
                { id: 'broken-auth', label: 'Broken Auth', count: repoAlerts.filter((a) => a.findingClass === 'Broken Auth').length, description: 'Broken Authentication', severity: 'high' },
                { id: 'validation', label: 'Validation', count: repoAlerts.filter((a) => a.findingClass === 'Validation').length, description: 'Missing Input Validation', severity: 'low' }
            ];
            const selectedServer = selectedRepo.servers.find((server) => server.url === selectedServerUrl) ?? selectedRepo.servers[0]!;

            return (
                <Layout className={ styles.repoView }>
                    <Card className={ styles.repoScanCard }>
                        <Layout className={ styles.repoScanHeader }>
                            <Layout className={ styles.repoScanTitle }>
                                <span className={ styles.repoScanBraces }>{ '{ spec }' }</span>
                                <strong>{ selectedRepo.name }</strong>
                            </Layout>
                            <Button appearance="secondary" onClick={ () => { setPage('repos'); } }>Back to specs</Button>
                        </Layout>

                        <Layout className={ styles.repoMeta }>
                            <p className={ styles.repoMetaLine }>Endpoints: { selectedRepo.endpoints } total</p>
                            <p className={ styles.repoMetaLine }>Repo: { selectedRepo.name }</p>
                            <p className={ styles.repoMetaLine }>Branch: { selectedRepo.branch }</p>
                            <p className={ styles.repoMetaLine }>Spec: { selectedRepo.spec }</p>
                            <p className={ styles.repoMetaLine }>Last scan: { selectedRepo.scanned }</p>
                            <Layout className={ styles.serverField }>
                                <span className={ styles.serverLabel }>Server</span>
                                <Dropdown
                                    value={ selectedServer.url }
                                    selectedOptions={ [selectedServer.url] }
                                    onOptionSelect={ (_, data) => {
                                        if (data.optionValue) {
                                            setSelectedServerUrl(data.optionValue);
                                        }
                                    } }
                                    className={ styles.serverDropdown }
                                >
                                    {selectedRepo.servers.map((server) => (
                                        <Option key={ server.url } value={ server.url } text={ server.url }>
                                            {server.url} ({server.environment})
                                        </Option>
                                    )) }
                                </Dropdown>
                            </Layout>
                        </Layout>
                    </Card>

                    <p className={ styles.sectionLabel }>Findings by class</p>
                    <Layout className={ styles.testInfoGrid }>
                        {testInfoCards.map((card) => (
                            <Card
                                key={ card.id }
                                className={ `${ styles.testInfoCard } ${ styles.clickableCard }` }
                                onClick={ () => { openAlertForFinding(selectedRepo.id, card.label); } }
                            >
                                <Layout className={ styles.testInfoHeader }>
                                    <strong>{ card.label }</strong>
                                    <span
                                        className={ `${ styles.severityMarker } ${
                                            card.severity === 'critical'
                                                ? styles.severityCritical
                                                : card.severity === 'high'
                                                    ? styles.severityHigh
                                                    : card.severity === 'medium'
                                                        ? styles.severityMedium
                                                        : styles.severityLow
                                        }` }
                                    />
                                </Layout>
                                <p className={ styles.testInfoCount }>{ Math.round(card.count) }</p>
                                <p className={ styles.testInfoDescription }>{ card.description }</p>
                            </Card>
                        )) }
                    </Layout>

                    <p className={ styles.sectionLabel }>Endpoints flagged</p>
                    <Card className={ styles.endpointPanel }>
                        <span className={ styles.endpointPanelCopy }>No endpoints flagged in this class. Clean.</span>
                    </Card>
                </Layout>
            );
        }

        if (page === 'alerts') {
            return (
                <Layout className={ styles.list }>
                    {highlightedFindingClass ? (
                        <Layout className={ styles.findingClassBanner }>
                            <span>Showing <strong>{ highlightedFindingClass }</strong> findings</span>
                            <Button appearance="subtle" size="small" onClick={ () => { setHighlightedFindingClass(null); setExpandedAlertCardIds([]); } }>Clear filter</Button>
                        </Layout>
                    ) : null}
                    {repos.map((repo) => {
                        const repoAlertList = alertsByRepoId.get(repo.id) ?? [];
                        const visibleAlerts = highlightedFindingClass
                            ? repoAlertList.filter((a) => a.findingClass === highlightedFindingClass)
                            : repoAlertList;
                        const isExpanded = expandedAlertCardIds.includes(repo.id);

                        return (
                            <Card key={ repo.id } className={ styles.markdownPreviewCard }>
                                <button type="button" className={ styles.cardToggleButton } onClick={ () => { toggleAlertCard(repo.id); } }>
                                    <Layout className={ styles.rowMain }>
                                        <strong>{ repo.name }</strong>
                                        <span>{ visibleAlerts.length }{ highlightedFindingClass ? ` ${ highlightedFindingClass }` : '' } alert{ visibleAlerts.length === 1 ? '' : 's' }</span>
                                    </Layout>
                                    <Layout className={ styles.rowMeta }>{ isExpanded ? 'Hide details' : `${ repo.critical } critical · ${ repo.high } high` }</Layout>
                                </button>

                                {isExpanded ? (
                                    <Layout className={ styles.markdownPreviewBody }>
                                        {visibleAlerts.length === 0 ? (
                                            <span className={ styles.emptyState }>No matching alerts for this repository.</span>
                                        ) : visibleAlerts.map((alert) => {
                                            const methodColor = alert.method === 'GET'
                                                ? 'informative' as const
                                                : alert.method === 'POST'
                                                    ? 'success' as const
                                                    : alert.method === 'DELETE'
                                                        ? 'danger' as const
                                                        : 'warning' as const;
                                            const severityProps = alert.severity === 'critical'
                                                ? { color: 'danger' as const }
                                                : alert.severity === 'high'
                                                    ? { color: 'warning' as const }
                                                    : {};

                                            return (
                                                <Layout key={ alert.id } className={ styles.alertRow }>
                                                    <Badge appearance="tint" color={ methodColor } className={ styles.alertMethodTag }>{ alert.method }</Badge>
                                                    <Layout className={ styles.alertMid }>
                                                        <span className={ styles.alertEndpoint }>{ alert.endpoint }</span>
                                                        <span className={ styles.alertDetailText }>{ alert.title }</span>
                                                    </Layout>
                                                    <Badge appearance="filled" { ...severityProps }>{ alert.severity }</Badge>
                                                </Layout>
                                            );
                                        }) }
                                    </Layout>
                                ) : null}
                            </Card>
                        );
                    }) }
                </Layout>
            );
        }

        if (page === 'scans') {
            return (
                <Layout className={ styles.list }>
                    {repos.map((repo) => {
                        const scan = scanByRepoId.get(repo.id);
                        const isExpanded = expandedScanCardIds.includes(repo.id);

                        return (
                            <Card key={ repo.id } className={ styles.markdownPreviewCard }>
                                <button type="button" className={ styles.cardToggleButton } onClick={ () => { toggleScanCard(repo.id); } }>
                                    <Layout className={ styles.rowMain }>
                                        <strong>{ repo.name }</strong>
                                        <span>Last scan { repo.scanned }</span>
                                    </Layout>
                                    <Layout className={ styles.rowMeta }>{ isExpanded ? 'Hide details' : `${ repo.endpoints.toLocaleString() } endpoints scanned` }</Layout>
                                </button>

                                {isExpanded && scan ? (
                                    <Layout className={ styles.markdownPreviewBody }>
                                        <Layout className={ styles.scanDetailGrid }>
                                            <Layout className={ styles.scanDetailItem }>
                                                <span className={ styles.scanDetailLabel }>Completed</span>
                                                <span className={ styles.scanDetailValue }>{ scan.completedAt }</span>
                                            </Layout>
                                            <Layout className={ styles.scanDetailItem }>
                                                <span className={ styles.scanDetailLabel }>Endpoints</span>
                                                <span className={ styles.scanDetailValue }>{ scan.endpointsTested } / { scan.endpointsTotal }</span>
                                            </Layout>
                                            <Layout className={ styles.scanDetailItem }>
                                                <span className={ styles.scanDetailLabel }>Findings</span>
                                                <span className={ styles.scanDetailValue }>{ scan.findingsTotal }</span>
                                            </Layout>
                                            <Layout className={ styles.scanDetailItem }>
                                                <span className={ styles.scanDetailLabel }>Duration</span>
                                                <span className={ styles.scanDetailValue }>{ scan.duration }</span>
                                            </Layout>
                                            <Layout className={ styles.scanDetailItem }>
                                                <span className={ styles.scanDetailLabel }>Status</span>
                                                <span className={ styles.scanDetailValue }>{ scan.status }</span>
                                            </Layout>
                                        </Layout>
                                        <Layout className={ styles.scanServerList }>
                                            {repo.servers.map((server) => (
                                                <Layout key={ server.url } className={ styles.scanServerRow }>
                                                    <span className={ styles.scanDetailLabel }>{ server.environment }</span>
                                                    <span className={ styles.repoMetaLine }>{ server.url }</span>
                                                </Layout>
                                            ))}
                                        </Layout>
                                    </Layout>
                                ) : null}
                            </Card>
                        );
                    }) }
                </Layout>
            );
        }

        return (
            <Card className={ styles.card }>
                <strong>Threat intel is coming soon</strong>
                <span>Use this space for emerging API attack patterns and recommended mitigations.</span>
            </Card>
        );
    }, [activity, alertsByRepoId, expandedAlertCardIds, expandedScanCardIds, highlightedFindingClass, page, repos, scanByRepoId, selectedRepo, serverAdjustedFilteredRepos, serverFilter, serverOptions, styles, topRiskRepos, totalCritical, totalEndpoints, totalHigh]);

    return (
        <Layout className={ styles.app }>
            <Layout className={ styles.body }>
                <header className={ styles.headerStack }>
                    <Layout className={ styles.header }>
                        <Button appearance="secondary" onClick={ props.onNewScan }>New scan</Button>
                    </Layout>
                </header>

                <section className={ styles.content }>
                    {content}
                </section>
            </Layout>
        </Layout>
    );
}