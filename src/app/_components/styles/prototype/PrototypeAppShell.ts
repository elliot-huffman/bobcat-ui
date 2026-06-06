'use client';

import { makeStyles, shorthands, tokens } from '@fluentui/react-components';

/** Tokenized styles for the additive application shell prototype. */
export const usePrototypeAppShellStyles = makeStyles({
    app: {
        backgroundImage: `radial-gradient(circle at 10% 10%, ${tokens.colorBrandBackground2} 0%, ${tokens.colorNeutralBackground1} 42%), radial-gradient(circle at 90% 90%, ${tokens.colorNeutralBackground3} 0%, ${tokens.colorNeutralBackground1} 48%)`,
        backgroundSize: 'cover',
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100dvh',
        width: '100%'
    },
    body: {
        backgroundColor: tokens.colorTransparentBackground,
        display: 'flex',
        flexDirection: 'column',
        minWidth: 0
    },
    content: {
        display: 'flex',
        flexDirection: 'column',
        rowGap: tokens.spacingVerticalM,
        ...shorthands.padding(0, tokens.spacingHorizontalL, tokens.spacingVerticalL)
    },
    card: {
        backgroundImage: `linear-gradient(145deg, ${tokens.colorNeutralBackground3}, ${tokens.colorNeutralBackground2})`,
        ...shorthands.border('1px', 'solid', tokens.colorNeutralStroke2),
        borderRadius: tokens.borderRadiusLarge,
        boxShadow: tokens.shadow4,
        display: 'flex',
        flexDirection: 'column',
        gap: tokens.spacingVerticalM,
        ...shorthands.padding(tokens.spacingVerticalL, tokens.spacingHorizontalL)
    },
    clickableCard: {
        cursor: 'pointer',
        transitionDuration: tokens.durationNormal,
        transitionProperty: 'transform, box-shadow, border-color',
        transitionTimingFunction: tokens.curveEasyEase,
        ':hover': {
            ...shorthands.borderColor(tokens.colorBrandStroke1),
            boxShadow: tokens.shadow8,
            transform: 'translateY(-2px)'
        }
    },
    header: {
        alignItems: 'center',
        backdropFilter: 'blur(10px)',
        backgroundColor: tokens.colorNeutralBackground1,
        ...shorthands.border('1px', 'solid', tokens.colorNeutralStroke2),
        borderRadius: tokens.borderRadiusLarge,
        display: 'flex',
        gap: tokens.spacingHorizontalM,
        justifyContent: 'space-between',
        minHeight: '56px',
        padding: `${tokens.spacingVerticalS} ${tokens.spacingHorizontalL}`,
        ...shorthands.margin(tokens.spacingVerticalS, 0, tokens.spacingVerticalM, 0)
    },
    headerStack: {
        display: 'flex',
        flexDirection: 'column',
        ...shorthands.padding(0, tokens.spacingHorizontalL)
    },
    topNavTabs: {
        backdropFilter: 'blur(10px)',
        backgroundColor: tokens.colorNeutralBackground1,
        ...shorthands.border('1px', 'solid', tokens.colorNeutralStroke2),
        borderRadius: tokens.borderRadiusLarge,
        display: 'flex',
        ...shorthands.padding(tokens.spacingVerticalXS, tokens.spacingHorizontalS)
    },
    emptyState: {
        color: tokens.colorNeutralForeground3,
        margin: 0
    },
    list: {
        display: 'flex',
        flexDirection: 'column',
        rowGap: tokens.spacingVerticalS
    },
    overviewDetailGrid: {
        display: 'grid',
        gap: tokens.spacingHorizontalM,
        gridTemplateColumns: 'repeat(2, minmax(0, 1fr))'
    },
    activityList: {
        display: 'flex',
        flexDirection: 'column',
        rowGap: tokens.spacingVerticalXS
    },
    activityItem: {
        alignItems: 'center',
        backgroundColor: tokens.colorTransparentBackground,
        ...shorthands.border('0'),
        borderRadius: tokens.borderRadiusMedium,
        color: tokens.colorNeutralForeground1,
        cursor: 'pointer',
        display: 'flex',
        justifyContent: 'space-between',
        ...shorthands.padding(tokens.spacingVerticalS, tokens.spacingHorizontalS),
        textAlign: 'left',
        width: '100%',
        ':hover': {
            backgroundColor: tokens.colorNeutralBackground1Hover
        }
    },
    reposHeader: {
        ...shorthands.borderBottom('1px', 'solid', tokens.colorNeutralStroke2),
        ...shorthands.margin(0, 0, tokens.spacingVerticalS, 0),
        paddingBottom: tokens.spacingVerticalS
    },
    pageHead: {
        alignItems: 'flex-start',
        display: 'flex',
        gap: tokens.spacingHorizontalM,
        justifyContent: 'space-between',
        marginBottom: tokens.spacingVerticalM
    },
    pageTitle: {
        color: tokens.colorNeutralForeground1,
        fontSize: tokens.fontSizeHero800,
        fontWeight: tokens.fontWeightSemibold,
        lineHeight: tokens.lineHeightHero800,
        margin: 0
    },
    pageSubtitle: {
        color: tokens.colorNeutralForeground2,
        margin: `${tokens.spacingVerticalXS} 0 0`
    },
    reposToolbar: {
        alignItems: 'center',
        display: 'flex',
        gap: tokens.spacingHorizontalS,
        marginBottom: tokens.spacingVerticalM
    },
    scopeDropdown: {
        minWidth: '220px'
    },
    reposSearch: {
        flexGrow: 1
    },
    table: {
        backgroundImage: `linear-gradient(180deg, ${tokens.colorNeutralBackground2}, ${tokens.colorNeutralBackground1})`,
        ...shorthands.border('1px', 'solid', tokens.colorNeutralStroke2),
        borderRadius: tokens.borderRadiusLarge,
        overflow: 'hidden'
    },
    tableHeader: {
        backgroundColor: tokens.colorNeutralBackground3,
        color: tokens.colorNeutralForeground2,
        display: 'grid',
        fontSize: tokens.fontSizeBase200,
        fontWeight: tokens.fontWeightSemibold,
        gridTemplateColumns: '120px minmax(0, 1.5fr) 120px minmax(0, 1fr) 120px',
        letterSpacing: '0.02em',
        lineHeight: tokens.lineHeightBase200,
        ...shorthands.padding(tokens.spacingVerticalS, tokens.spacingHorizontalM)
    },
    tableRow: {
        alignItems: 'center',
        backgroundColor: tokens.colorTransparentBackground,
        ...shorthands.border('0'),
        ...shorthands.borderTop('1px', 'solid', tokens.colorNeutralStroke2),
        color: tokens.colorNeutralForeground1,
        cursor: 'pointer',
        display: 'grid',
        gap: tokens.spacingHorizontalS,
        gridTemplateColumns: '120px minmax(0, 1.5fr) 120px minmax(0, 1fr) 120px',
        ...shorthands.padding(tokens.spacingVerticalS, tokens.spacingHorizontalM),
        textAlign: 'left',
        width: '100%',
        ':hover': {
            backgroundColor: tokens.colorNeutralBackground1Hover
        }
    },
    privacyCell: {
        color: tokens.colorNeutralForeground3,
        fontSize: tokens.fontSizeBase200,
        lineHeight: tokens.lineHeightBase200
    },
    nameCell: {
        color: tokens.colorNeutralForeground1,
        fontWeight: tokens.fontWeightSemibold
    },
    typeCell: {
        color: tokens.colorNeutralForeground2,
        textTransform: 'capitalize'
    },
    alertCell: {
        alignItems: 'center',
        display: 'flex',
        gap: tokens.spacingHorizontalXS
    },
    depCell: {
        color: tokens.colorNeutralForeground2,
        fontFamily: tokens.fontFamilyMonospace
    },
    repoGrid: {
        display: 'grid',
        gap: tokens.spacingVerticalM,
        gridTemplateColumns: 'repeat(2, minmax(0, 1fr))'
    },
    repoScanCard: {
        backgroundImage: `linear-gradient(135deg, ${tokens.colorNeutralBackground2}, ${tokens.colorNeutralBackground1})`,
        ...shorthands.border('1px', 'solid', tokens.colorNeutralStroke2),
        borderRadius: tokens.borderRadiusLarge,
        boxShadow: tokens.shadow8,
        display: 'flex',
        flexDirection: 'column',
        rowGap: tokens.spacingVerticalM,
        ...shorthands.padding(tokens.spacingVerticalL, tokens.spacingHorizontalL)
    },
    repoScanHeader: {
        alignItems: 'center',
        display: 'flex',
        justifyContent: 'space-between'
    },
    repoScanTitle: {
        alignItems: 'center',
        display: 'flex',
        gap: tokens.spacingHorizontalS
    },
    repoScanBraces: {
        color: tokens.colorBrandForeground1,
        fontFamily: tokens.fontFamilyMonospace,
        fontWeight: tokens.fontWeightSemibold
    },
    repoScanBody: {
        alignItems: 'stretch',
        display: 'grid',
        gap: tokens.spacingHorizontalL,
        gridTemplateColumns: 'minmax(0, 1fr) auto minmax(0, 1fr)'
    },
    repoView: {
        display: 'flex',
        flexDirection: 'column',
        gap: tokens.spacingVerticalS
    },
    repoMeta: {
        display: 'flex',
        flexDirection: 'column',
        rowGap: tokens.spacingVerticalS
    },
    repoMetaLine: {
        color: tokens.colorNeutralForeground2,
        fontFamily: tokens.fontFamilyMonospace,
        margin: 0
    },
    serverField: {
        display: 'flex',
        flexDirection: 'column',
        gap: tokens.spacingVerticalXXS
    },
    serverLabel: {
        color: tokens.colorNeutralForeground3,
        fontFamily: tokens.fontFamilyMonospace,
        fontSize: tokens.fontSizeBase200,
        lineHeight: tokens.lineHeightBase200,
        textTransform: 'uppercase'
    },
    serverDropdown: {
        minWidth: '280px'
    },
    repoScanDivider: {
        backgroundColor: tokens.colorNeutralStroke2,
        width: '1px'
    },
    scanGroupList: {
        display: 'flex',
        flexDirection: 'column',
        rowGap: tokens.spacingVerticalS
    },
    scanGroupItem: {
        alignItems: 'center',
        display: 'flex',
        gap: tokens.spacingHorizontalS
    },
    scanCount: {
        alignItems: 'center',
        backgroundColor: tokens.colorBrandBackground2,
        ...shorthands.border('1px', 'solid', tokens.colorBrandStroke1),
        borderRadius: tokens.borderRadiusCircular,
        color: tokens.colorBrandForeground1,
        display: 'inline-flex',
        fontFamily: tokens.fontFamilyMonospace,
        fontWeight: tokens.fontWeightSemibold,
        height: '32px',
        justifyContent: 'center',
        minWidth: '32px',
        ...shorthands.padding(0, tokens.spacingHorizontalS)
    },
    rowCard: {
        alignItems: 'center',
        backgroundColor: tokens.colorNeutralBackground2,
        ...shorthands.border('1px', 'solid', tokens.colorNeutralStroke2),
        borderRadius: tokens.borderRadiusLarge,
        display: 'flex',
        justifyContent: 'space-between',
        ...shorthands.padding(tokens.spacingVerticalM, tokens.spacingHorizontalM)
    },
    rowMain: {
        display: 'flex',
        flexDirection: 'column',
        rowGap: tokens.spacingVerticalXXS
    },
    rowMeta: {
        color: tokens.colorNeutralForeground2,
        fontFamily: tokens.fontFamilyMonospace,
        fontSize: tokens.fontSizeBase200,
        lineHeight: tokens.lineHeightBase200
    },
    markdownPreviewCard: {
        backgroundImage: `linear-gradient(145deg, ${tokens.colorNeutralBackground2}, ${tokens.colorNeutralBackground1})`,
        ...shorthands.border('1px', 'solid', tokens.colorNeutralStroke2),
        borderRadius: tokens.borderRadiusLarge,
        boxShadow: tokens.shadow4,
        display: 'flex',
        flexDirection: 'column',
        gap: tokens.spacingVerticalS,
        ...shorthands.padding(tokens.spacingVerticalL, tokens.spacingHorizontalL)
    },
    markdownPreviewHeader: {
        alignItems: 'center',
        display: 'flex',
        justifyContent: 'space-between'
    },
    alertRow: {
        alignItems: 'flex-start',
        borderBottomColor: tokens.colorNeutralStroke2,
        borderBottomStyle: 'solid',
        borderBottomWidth: '1px',
        display: 'flex',
        gap: tokens.spacingHorizontalS,
        paddingBlock: tokens.spacingVerticalS
    },
    alertMethodTag: {
        flexShrink: 0,
        fontFamily: tokens.fontFamilyMonospace,
        fontWeight: tokens.fontWeightSemibold,
        minWidth: '58px',
        textAlign: 'center'
    },
    alertMid: {
        display: 'flex',
        flexDirection: 'column',
        flexGrow: 1,
        gap: '2px',
        minWidth: 0
    },
    alertEndpoint: {
        color: tokens.colorNeutralForeground1,
        fontFamily: tokens.fontFamilyMonospace,
        fontSize: tokens.fontSizeBase200,
        lineHeight: tokens.lineHeightBase200,
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap'
    },
    alertDetailText: {
        color: tokens.colorNeutralForeground2,
        fontSize: tokens.fontSizeBase200,
        lineHeight: tokens.lineHeightBase200
    },
    scanDetailGrid: {
        display: 'grid',
        gap: tokens.spacingHorizontalM,
        gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
        marginBottom: tokens.spacingVerticalM
    },
    scanDetailItem: {
        display: 'flex',
        flexDirection: 'column',
        gap: tokens.spacingVerticalXXS
    },
    scanDetailLabel: {
        color: tokens.colorNeutralForeground3,
        fontFamily: tokens.fontFamilyMonospace,
        fontSize: tokens.fontSizeBase100,
        letterSpacing: '0.08em',
        textTransform: 'uppercase'
    },
    scanDetailValue: {
        color: tokens.colorNeutralForeground1,
        fontFamily: tokens.fontFamilyMonospace,
        fontSize: tokens.fontSizeBase300,
        fontWeight: tokens.fontWeightSemibold,
        lineHeight: tokens.lineHeightBase300
    },
    scanServerList: {
        borderTopColor: tokens.colorNeutralStroke2,
        borderTopStyle: 'solid',
        borderTopWidth: '1px',
        display: 'flex',
        flexDirection: 'column',
        gap: tokens.spacingVerticalXXS,
        paddingTop: tokens.spacingVerticalS
    },
    scanServerRow: {
        alignItems: 'center',
        display: 'flex',
        gap: tokens.spacingHorizontalM
    },
    cardToggleButton: {
        alignItems: 'center',
        backgroundColor: tokens.colorTransparentBackground,
        ...shorthands.border('0'),
        color: tokens.colorNeutralForeground1,
        cursor: 'pointer',
        display: 'flex',
        justifyContent: 'space-between',
        textAlign: 'left',
        width: '100%'
    },
    markdownPreviewBody: {
        ...shorthands.borderTop('1px', 'solid', tokens.colorNeutralStroke2),
        marginTop: tokens.spacingVerticalS,
        paddingTop: tokens.spacingVerticalS
    },
    findingClassBanner: {
        alignItems: 'center',
        backgroundColor: tokens.colorBrandBackground2,
        ...shorthands.border('1px', 'solid', tokens.colorBrandStroke1),
        borderRadius: tokens.borderRadiusMedium,
        color: tokens.colorNeutralForeground1,
        display: 'flex',
        gap: tokens.spacingHorizontalS,
        justifyContent: 'space-between',
        ...shorthands.padding(tokens.spacingVerticalS, tokens.spacingHorizontalM)
    },
    sectionLabel: {
        color: tokens.colorNeutralForeground3,
        fontFamily: tokens.fontFamilyMonospace,
        fontSize: tokens.fontSizeBase100,
        letterSpacing: '0.1em',
        margin: `${tokens.spacingVerticalS} 0 ${tokens.spacingVerticalXXS}`,
        textTransform: 'uppercase'
    },
    testInfoGrid: {
        display: 'grid',
        gap: tokens.spacingHorizontalS,
        gridTemplateColumns: 'repeat(4, minmax(0, 1fr))'
    },
    testInfoCard: {
        backgroundImage: `linear-gradient(145deg, ${tokens.colorNeutralBackground2}, ${tokens.colorNeutralBackground1})`,
        ...shorthands.border('1px', 'solid', tokens.colorNeutralStroke2),
        borderRadius: tokens.borderRadiusLarge,
        display: 'flex',
        flexDirection: 'column',
        gap: tokens.spacingVerticalXS,
        ...shorthands.padding(tokens.spacingVerticalM, tokens.spacingHorizontalM)
    },
    testInfoHeader: {
        alignItems: 'center',
        display: 'flex',
        justifyContent: 'space-between'
    },
    severityMarker: {
        borderRadius: tokens.borderRadiusCircular,
        display: 'inline-block',
        height: '8px',
        width: '8px'
    },
    severityCritical: {
        backgroundColor: tokens.colorPaletteRedBackground3
    },
    severityHigh: {
        backgroundColor: tokens.colorPaletteDarkOrangeBackground3
    },
    severityMedium: {
        backgroundColor: tokens.colorPaletteYellowBackground3
    },
    severityLow: {
        backgroundColor: tokens.colorPaletteMarigoldBackground3
    },
    testInfoCount: {
        color: tokens.colorNeutralForeground1,
        fontFamily: tokens.fontFamilyMonospace,
        fontSize: tokens.fontSizeHero700,
        fontWeight: tokens.fontWeightSemibold,
        lineHeight: tokens.lineHeightHero700,
        margin: 0
    },
    testInfoDescription: {
        color: tokens.colorNeutralForeground3,
        fontSize: tokens.fontSizeBase100,
        lineHeight: tokens.lineHeightBase100,
        margin: 0
    },
    endpointPanel: {
        ...shorthands.border('1px', 'solid', tokens.colorNeutralStroke2),
        borderRadius: tokens.borderRadiusLarge,
        display: 'flex',
        justifyContent: 'center',
        ...shorthands.padding(tokens.spacingVerticalM, tokens.spacingHorizontalM)
    },
    endpointPanelCopy: {
        color: tokens.colorNeutralForeground3,
        fontFamily: tokens.fontFamilyMonospace,
        fontSize: tokens.fontSizeBase200,
        lineHeight: tokens.lineHeightBase200
    },
    root: {
        backgroundColor: tokens.colorNeutralBackground1,
        width: '100%'
    },
    summary: {
        display: 'grid',
        gap: tokens.spacingHorizontalM,
        gridTemplateColumns: 'repeat(4, minmax(0, 1fr))'
    },
    summaryCard: {
        backgroundImage: `linear-gradient(140deg, ${tokens.colorNeutralBackground1}, ${tokens.colorBrandBackground2})`,
        ...shorthands.border('1px', 'solid', tokens.colorNeutralStroke2),
        borderRadius: tokens.borderRadiusMedium,
        display: 'flex',
        flexDirection: 'column',
        gap: tokens.spacingVerticalXS,
        ...shorthands.padding(tokens.spacingVerticalL, tokens.spacingHorizontalL)
    },
    summaryLabel: {
        color: tokens.colorNeutralForeground2,
        fontSize: tokens.fontSizeBase200,
        lineHeight: tokens.lineHeightBase200
    },
    summaryValue: {
        color: tokens.colorBrandForeground1,
        fontSize: tokens.fontSizeHero700,
        fontWeight: tokens.fontWeightSemibold,
        lineHeight: tokens.lineHeightHero700
    }
});