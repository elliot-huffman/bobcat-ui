'use client';

import { makeStyles, shorthands, tokens } from '@fluentui/react-components';

/** Tokenized styles for the prototype2 finding detail overlay drawer. */
export const usePrototype2FindingDrawerStyles = makeStyles({
    drawer: {
        width: 'min(560px, 96vw)'
    },
    headerBadges: {
        alignItems: 'center',
        display: 'flex',
        gap: tokens.spacingHorizontalXS,
        marginBottom: tokens.spacingVerticalXS
    },
    methodBadge: {
        fontFamily: tokens.fontFamilyMonospace,
        fontWeight: tokens.fontWeightSemibold,
        minWidth: '58px'
    },
    headerTitle: {
        color: tokens.colorNeutralForeground1,
        fontSize: tokens.fontSizeBase500,
        fontWeight: tokens.fontWeightSemibold,
        lineHeight: tokens.lineHeightBase500,
        margin: 0
    },
    metaGrid: {
        display: 'grid',
        gap: tokens.spacingHorizontalM,
        gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
        marginBottom: tokens.spacingVerticalL,
        marginTop: tokens.spacingVerticalM
    },
    metaBox: {
        backgroundColor: tokens.colorNeutralBackground2,
        ...shorthands.border('1px', 'solid', tokens.colorNeutralStroke2),
        borderRadius: tokens.borderRadiusMedium,
        display: 'flex',
        flexDirection: 'column',
        gap: tokens.spacingVerticalXXS,
        ...shorthands.padding(tokens.spacingVerticalM, tokens.spacingHorizontalM)
    },
    metaLabel: {
        color: tokens.colorNeutralForeground3,
        fontSize: tokens.fontSizeBase100,
        letterSpacing: '0.08em',
        lineHeight: tokens.lineHeightBase100,
        textTransform: 'uppercase'
    },
    metaValue: {
        color: tokens.colorNeutralForeground1,
        fontWeight: tokens.fontWeightSemibold,
        textTransform: 'capitalize'
    },
    metaValueMono: {
        color: tokens.colorNeutralForeground1,
        fontFamily: tokens.fontFamilyMonospace,
        fontSize: tokens.fontSizeBase200,
        lineHeight: tokens.lineHeightBase200
    },
    sectionLabel: {
        color: tokens.colorNeutralForeground3,
        display: 'block',
        fontSize: tokens.fontSizeBase100,
        letterSpacing: '0.1em',
        marginBottom: tokens.spacingVerticalS,
        marginTop: tokens.spacingVerticalL,
        textTransform: 'uppercase'
    },
    prComment: {
        ...shorthands.border('1px', 'solid', tokens.colorNeutralStroke2),
        borderRadius: tokens.borderRadiusLarge,
        overflow: 'hidden'
    },
    prHead: {
        alignItems: 'center',
        backgroundColor: tokens.colorNeutralBackground2,
        ...shorthands.borderBottom('1px', 'solid', tokens.colorNeutralStroke2),
        display: 'flex',
        gap: tokens.spacingHorizontalS,
        ...shorthands.padding(tokens.spacingVerticalM, tokens.spacingHorizontalM)
    },
    prAuthor: {
        color: tokens.colorNeutralForeground1,
        fontWeight: tokens.fontWeightSemibold
    },
    prMeta: {
        color: tokens.colorNeutralForeground3,
        fontFamily: tokens.fontFamilyMonospace,
        fontSize: tokens.fontSizeBase200,
        lineHeight: tokens.lineHeightBase200,
        marginLeft: 'auto'
    },
    prBody: {
        ...shorthands.padding(tokens.spacingVerticalM, tokens.spacingHorizontalM)
    },
    prTitle: {
        color: tokens.colorNeutralForeground1,
        display: 'block',
        fontWeight: tokens.fontWeightSemibold,
        marginBottom: tokens.spacingVerticalXS
    },
    prSeverityLine: {
        color: tokens.colorNeutralForeground2,
        display: 'block',
        fontFamily: tokens.fontFamilyMonospace,
        fontSize: tokens.fontSizeBase200,
        lineHeight: tokens.lineHeightBase200,
        marginBottom: tokens.spacingVerticalM
    },
    codeBlock: {
        backgroundColor: tokens.colorNeutralBackground3,
        ...shorthands.border('1px', 'solid', tokens.colorNeutralStroke2),
        borderRadius: tokens.borderRadiusMedium,
        color: tokens.colorNeutralForeground2,
        fontFamily: tokens.fontFamilyMonospace,
        fontSize: tokens.fontSizeBase200,
        lineHeight: tokens.lineHeightBase300,
        overflowX: 'auto',
        ...shorthands.padding(tokens.spacingVerticalM, tokens.spacingHorizontalM),
        whiteSpace: 'pre-wrap'
    },
    codeComment: {
        color: tokens.colorNeutralForeground4
    },
    codeAddition: {
        color: tokens.colorPaletteGreenForeground1
    },
    fixItem: {
        alignItems: 'flex-start',
        ...shorthands.borderBottom('1px', 'solid', tokens.colorNeutralStroke2),
        display: 'flex',
        gap: tokens.spacingHorizontalS,
        paddingBlock: tokens.spacingVerticalS
    },
    fixIcon: {
        color: tokens.colorPaletteGreenForeground1,
        flexShrink: 0,
        fontSize: tokens.fontSizeBase400,
        marginTop: '2px'
    },
    fixText: {
        color: tokens.colorNeutralForeground2,
        fontFamily: tokens.fontFamilyMonospace,
        fontSize: tokens.fontSizeBase300,
        lineHeight: tokens.lineHeightBase300
    },
    actions: {
        display: 'flex',
        gap: tokens.spacingHorizontalS,
        marginTop: tokens.spacingVerticalL
    }
});
