'use client';

import { makeStyles, shorthands, tokens } from '@fluentui/react-components';

/** Tokenized styles for the additive prototype2 overview screen. */
export const usePrototype2OverviewStyles = makeStyles({
    root: {
        display: 'flex',
        flexDirection: 'column',
        marginInline: 'auto',
        maxWidth: '1180px',
        rowGap: tokens.spacingVerticalXL,
        width: '100%'
    },
    pageHead: {
        alignItems: 'flex-start',
        display: 'flex',
        gap: tokens.spacingHorizontalL,
        justifyContent: 'space-between'
    },
    pageHeadText: {
        display: 'flex',
        flexDirection: 'column',
        rowGap: tokens.spacingVerticalXXS
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
        margin: 0
    },
    pageActions: {
        display: 'flex',
        flexShrink: 0,
        gap: tokens.spacingHorizontalS
    },
    statGrid: {
        display: 'grid',
        gap: tokens.spacingHorizontalM,
        gridTemplateColumns: 'repeat(4, minmax(0, 1fr))'
    },
    statCard: {
        backgroundImage: `linear-gradient(140deg, ${tokens.colorNeutralBackground1}, ${tokens.colorBrandBackground2})`,
        ...shorthands.border('1px', 'solid', tokens.colorNeutralStroke2),
        borderRadius: tokens.borderRadiusLarge,
        boxShadow: tokens.shadow4,
        display: 'flex',
        flexDirection: 'column',
        gap: tokens.spacingVerticalXS,
        ...shorthands.padding(tokens.spacingVerticalL, tokens.spacingHorizontalL)
    },
    statLabel: {
        color: tokens.colorNeutralForeground3,
        fontSize: tokens.fontSizeBase200,
        lineHeight: tokens.lineHeightBase200
    },
    statValue: {
        fontSize: tokens.fontSizeHero700,
        fontWeight: tokens.fontWeightSemibold,
        letterSpacing: '-0.02em',
        lineHeight: tokens.lineHeightHero700
    },
    statValueCritical: {
        color: tokens.colorPaletteRedForeground1
    },
    statValueHigh: {
        color: tokens.colorPaletteDarkOrangeForeground1
    },
    statValueNeutral: {
        color: tokens.colorNeutralForeground1
    },
    statValuePositive: {
        color: tokens.colorPaletteGreenForeground1
    },
    statHint: {
        color: tokens.colorNeutralForeground3,
        fontFamily: tokens.fontFamilyMonospace,
        fontSize: tokens.fontSizeBase100,
        lineHeight: tokens.lineHeightBase100
    },
    twoCol: {
        alignItems: 'start',
        display: 'grid',
        gap: tokens.spacingHorizontalL,
        gridTemplateColumns: '1.5fr 1fr'
    },
    panel: {
        backgroundImage: `linear-gradient(145deg, ${tokens.colorNeutralBackground3}, ${tokens.colorNeutralBackground2})`,
        ...shorthands.border('1px', 'solid', tokens.colorNeutralStroke2),
        borderRadius: tokens.borderRadiusLarge,
        boxShadow: tokens.shadow4,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        padding: 0
    },
    panelHead: {
        alignItems: 'center',
        ...shorthands.borderBottom('1px', 'solid', tokens.colorNeutralStroke2),
        display: 'flex',
        justifyContent: 'space-between',
        ...shorthands.padding(tokens.spacingVerticalM, tokens.spacingHorizontalL)
    },
    panelTitle: {
        color: tokens.colorNeutralForeground1,
        fontSize: tokens.fontSizeBase400,
        fontWeight: tokens.fontWeightSemibold,
        lineHeight: tokens.lineHeightBase400,
        margin: 0
    },
    feedRow: {
        alignItems: 'center',
        backgroundColor: tokens.colorTransparentBackground,
        ...shorthands.border('0'),
        ...shorthands.borderBottom('1px', 'solid', tokens.colorNeutralStroke2),
        color: tokens.colorNeutralForeground1,
        cursor: 'pointer',
        display: 'flex',
        gap: tokens.spacingHorizontalM,
        ...shorthands.padding(tokens.spacingVerticalM, tokens.spacingHorizontalL),
        textAlign: 'left',
        width: '100%',
        ':hover': {
            backgroundColor: tokens.colorNeutralBackground1Hover
        }
    },
    feedRowLast: {
        ...shorthands.borderBottom('0')
    },
    feedMarker: {
        borderRadius: tokens.borderRadiusCircular,
        flexShrink: 0,
        height: '8px',
        width: '8px'
    },
    feedMarkerCritical: {
        backgroundColor: tokens.colorPaletteRedBackground3
    },
    feedMarkerHigh: {
        backgroundColor: tokens.colorPaletteDarkOrangeBackground3
    },
    feedMarkerMedium: {
        backgroundColor: tokens.colorPaletteYellowBackground3
    },
    feedMarkerLow: {
        backgroundColor: tokens.colorPaletteMarigoldBackground3
    },
    feedText: {
        color: tokens.colorNeutralForeground1,
        flexGrow: 1,
        fontSize: tokens.fontSizeBase300,
        lineHeight: tokens.lineHeightBase300,
        minWidth: 0
    },
    feedMeta: {
        color: tokens.colorNeutralForeground3,
        flexShrink: 0,
        fontFamily: tokens.fontFamilyMonospace,
        fontSize: tokens.fontSizeBase200,
        lineHeight: tokens.lineHeightBase200
    },
    riskName: {
        color: tokens.colorNeutralForeground1,
        flexGrow: 1,
        fontWeight: tokens.fontWeightSemibold,
        minWidth: 0,
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap'
    }
});
