'use client';

import { makeStyles, shorthands, tokens } from '@fluentui/react-components';

/** Tokenized styles shared by the prototype2 alerts and scans screens. */
export const usePrototype2FindingListStyles = makeStyles({
    root: {
        display: 'flex',
        flexDirection: 'column',
        marginInline: 'auto',
        maxWidth: '1180px',
        rowGap: tokens.spacingVerticalL,
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
    toolbar: {
        alignItems: 'center',
        display: 'flex',
        gap: tokens.spacingHorizontalS
    },
    search: {
        maxWidth: '100%',
        width: '100%'
    },
    findList: {
        backgroundImage: `linear-gradient(180deg, ${tokens.colorNeutralBackground2}, ${tokens.colorNeutralBackground1})`,
        ...shorthands.border('1px', 'solid', tokens.colorNeutralStroke2),
        borderRadius: tokens.borderRadiusLarge,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden'
    },
    findRow: {
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
    findRowLast: {
        ...shorthands.borderBottom('0')
    },
    methodTag: {
        flexShrink: 0,
        fontFamily: tokens.fontFamilyMonospace,
        fontWeight: tokens.fontWeightSemibold,
        justifyContent: 'center',
        minWidth: '58px'
    },
    findMid: {
        display: 'flex',
        flexDirection: 'column',
        flexGrow: 1,
        gap: '2px',
        minWidth: 0
    },
    findPath: {
        alignItems: 'baseline',
        color: tokens.colorNeutralForeground1,
        display: 'flex',
        flexWrap: 'wrap',
        fontFamily: tokens.fontFamilyMonospace,
        fontSize: tokens.fontSizeBase300,
        gap: tokens.spacingHorizontalXS,
        lineHeight: tokens.lineHeightBase300
    },
    findRepo: {
        color: tokens.colorNeutralForeground4,
        fontFamily: tokens.fontFamilyMonospace,
        fontSize: tokens.fontSizeBase200,
        lineHeight: tokens.lineHeightBase200
    },
    findTitle: {
        color: tokens.colorNeutralForeground2,
        fontSize: tokens.fontSizeBase200,
        lineHeight: tokens.lineHeightBase200
    },
    findLocation: {
        color: tokens.colorNeutralForeground3,
        flexShrink: 0,
        fontFamily: tokens.fontFamilyMonospace,
        fontSize: tokens.fontSizeBase200,
        lineHeight: tokens.lineHeightBase200
    },
    chevron: {
        color: tokens.colorNeutralForeground3,
        flexShrink: 0,
        fontSize: tokens.fontSizeBase400
    },
    scanMarker: {
        borderRadius: tokens.borderRadiusCircular,
        flexShrink: 0,
        height: '10px',
        width: '10px'
    },
    scanMarkerCritical: {
        backgroundColor: tokens.colorPaletteRedBackground3
    },
    scanMarkerHigh: {
        backgroundColor: tokens.colorPaletteDarkOrangeBackground3
    },
    scanMarkerClean: {
        backgroundColor: tokens.colorPaletteGreenBackground3
    },
    scanName: {
        color: tokens.colorNeutralForeground1,
        fontWeight: tokens.fontWeightSemibold
    },
    emptyState: {
        color: tokens.colorNeutralForeground3,
        fontFamily: tokens.fontFamilyMonospace,
        fontSize: tokens.fontSizeBase200,
        margin: 0,
        ...shorthands.padding(tokens.spacingVerticalXXL, tokens.spacingHorizontalL),
        textAlign: 'center'
    }
});
