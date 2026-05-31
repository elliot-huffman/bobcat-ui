'use client';

import { makeStyles, shorthands, tokens } from '@fluentui/react-components';

export const useHomeWizardStyles = makeStyles({
    layout: {
        alignItems: 'flex-start',
        columnGap: tokens.spacingHorizontalL,
        display: 'flex',
        flexWrap: 'wrap',
        rowGap: tokens.spacingVerticalL,
        width: '100%'
    },
    leftRail: {
        display: 'flex',
        flexBasis: '300px',
        flexDirection: 'column',
        flexGrow: 0,
        flexShrink: 0,
        minWidth: '260px',
        rowGap: tokens.spacingVerticalM
    },
    rightPanel: {
        display: 'flex',
        flexBasis: '0%',
        flexDirection: 'column',
        flexGrow: 1,
        minWidth: '0'
    },
    root: {
        width: '100%'
    },
    sectionCopy: {
        color: tokens.colorNeutralForeground2,
        fontSize: tokens.fontSizeBase300,
        lineHeight: tokens.lineHeightBase300,
        marginTop: tokens.spacingVerticalM
    },
    sectionEyebrow: {
        color: tokens.colorBrandForeground1,
        fontSize: tokens.fontSizeBase200,
        fontWeight: tokens.fontWeightSemibold,
        letterSpacing: '0.08em',
        textTransform: 'uppercase'
    },
    sectionTitle: {
        fontSize: tokens.fontSizeHero700,
        fontWeight: tokens.fontWeightSemibold,
        lineHeight: tokens.lineHeightHero700,
        marginTop: tokens.spacingVerticalS
    },
    shell: {
        backgroundColor: tokens.colorNeutralBackground1,
        ...shorthands.border('1px', 'solid', tokens.colorNeutralStroke2),
        boxShadow: tokens.shadow4,
        ...shorthands.padding(tokens.spacingVerticalXL, tokens.spacingHorizontalXL),
        width: '100%'
    },
    stepButton: {
        alignItems: 'flex-start',
        backgroundColor: tokens.colorNeutralBackground2,
        ...shorthands.border('1px', 'solid', tokens.colorNeutralStroke2),
        borderRadius: tokens.borderRadiusLarge,
        cursor: 'pointer',
        display: 'flex',
        flexBasis: 'auto',
        flexDirection: 'column',
        flexGrow: 0,
        gap: tokens.spacingVerticalXXS,
        minHeight: '120px',
        textAlign: 'left',
        transitionDuration: tokens.durationNormal,
        transitionProperty: 'transform, border-color, box-shadow, background-color',
        transitionTimingFunction: tokens.curveEasyEase,
        width: '100%',
        ...shorthands.padding(tokens.spacingVerticalL, tokens.spacingHorizontalL),
        ':hover': {
            backgroundColor: tokens.colorNeutralBackground2Hover,
            boxShadow: tokens.shadow8,
            transform: 'translateY(-2px)'
        }
    },
    stepButtonActive: {
        backgroundColor: tokens.colorBrandBackground2,
        boxShadow: tokens.shadow8
    },
    stepButtonComplete: {
        backgroundColor: tokens.colorPaletteSeafoamBackground2
    },
    stepDescription: {
        color: tokens.colorNeutralForeground2,
        fontSize: tokens.fontSizeBase200,
        lineHeight: tokens.lineHeightBase200
    },
    stepIndex: {
        color: tokens.colorBrandForeground1,
        fontSize: tokens.fontSizeBase200,
        fontWeight: tokens.fontWeightSemibold,
        letterSpacing: '0.08em',
        textTransform: 'uppercase'
    },
    stepList: {
        display: 'flex',
        flexDirection: 'column',
        flexWrap: 'nowrap',
        rowGap: tokens.spacingVerticalM,
        width: '100%'
    },
    stepTitle: {
        color: tokens.colorNeutralForeground1,
        fontSize: tokens.fontSizeBase500,
        fontWeight: tokens.fontWeightSemibold,
        lineHeight: tokens.lineHeightBase500
    }
});

export const useIntroStepCardStyles = makeStyles({
    actions: {
        alignItems: 'center',
        columnGap: tokens.spacingHorizontalS,
        display: 'flex',
        flexWrap: 'wrap',
        marginTop: tokens.spacingVerticalL
    },
    description: {
        color: tokens.colorNeutralForeground2,
        fontSize: tokens.fontSizeBase400,
        lineHeight: tokens.lineHeightBase400,
        marginTop: tokens.spacingVerticalM
    },
    eyebrow: {
        color: tokens.colorBrandForeground1,
        fontSize: tokens.fontSizeBase200,
        fontWeight: tokens.fontWeightSemibold,
        letterSpacing: '0.08em',
        textTransform: 'uppercase'
    },
    logo: {
        height: 'auto',
        maxWidth: '100%',
        width: 'min(360px, 70vw)'
    },
    logoContainer: {
        display: 'flex',
        justifyContent: 'center',
        marginBottom: tokens.spacingVerticalL,
        width: '100%'
    },
    root: {
        backgroundColor: tokens.colorNeutralBackground3,
        boxShadow: tokens.shadow16,
        minHeight: '600px',
        scrollMarginTop: tokens.spacingVerticalXL,
        ...shorthands.padding(tokens.spacingVerticalXXL, tokens.spacingHorizontalXXL),
        width: '100%'
    },
    title: {
        fontSize: tokens.fontSizeHero800,
        fontWeight: tokens.fontWeightSemibold,
        lineHeight: tokens.lineHeightHero800,
        marginTop: tokens.spacingVerticalS
    }
});

export const useInputStepCardStyles = makeStyles({
    actions: {
        alignItems: 'center',
        columnGap: tokens.spacingHorizontalS,
        display: 'flex',
        flexWrap: 'wrap',
        marginTop: tokens.spacingVerticalL
    },
    description: {
        color: tokens.colorNeutralForeground2,
        fontSize: tokens.fontSizeBase400,
        lineHeight: tokens.lineHeightBase400,
        marginTop: tokens.spacingVerticalM
    },
    eyebrow: {
        color: tokens.colorBrandForeground1,
        fontSize: tokens.fontSizeBase200,
        fontWeight: tokens.fontWeightSemibold,
        letterSpacing: '0.08em',
        textTransform: 'uppercase'
    },
    inputStack: {
        display: 'grid',
        gap: tokens.spacingVerticalS,
        marginTop: tokens.spacingVerticalL,
        maxWidth: '420px'
    },
    root: {
        backgroundColor: tokens.colorPaletteSeafoamBackground2,
        ...shorthands.border('1px', 'solid', tokens.colorPaletteSeafoamBorderActive),
        boxShadow: tokens.shadow8,
        minHeight: '600px',
        scrollMarginTop: tokens.spacingVerticalXL,
        ...shorthands.padding(tokens.spacingVerticalXXL, tokens.spacingHorizontalXXL),
        width: '100%'
    },
    title: {
        fontSize: tokens.fontSizeHero800,
        fontWeight: tokens.fontWeightSemibold,
        lineHeight: tokens.lineHeightHero800,
        marginTop: tokens.spacingVerticalS
    }
});

export const useOutputStepCardStyles = makeStyles({
    actions: {
        alignItems: 'center',
        columnGap: tokens.spacingHorizontalS,
        display: 'flex',
        flexWrap: 'wrap',
        marginTop: tokens.spacingVerticalL
    },
    copyButton: {
        position: 'absolute',
        right: tokens.spacingHorizontalXS,
        top: tokens.spacingVerticalS,
        zIndex: 1
    },
    description: {
        color: tokens.colorNeutralForeground2,
        fontSize: tokens.fontSizeBase400,
        lineHeight: tokens.lineHeightBase400,
        marginTop: tokens.spacingVerticalM
    },
    eyebrow: {
        color: tokens.colorBrandForeground1,
        fontSize: tokens.fontSizeBase200,
        fontWeight: tokens.fontWeightSemibold,
        letterSpacing: '0.08em',
        textTransform: 'uppercase'
    },
    outputActions: {
        display: 'flex',
        justifyContent: 'flex-end',
        marginTop: tokens.spacingVerticalL
    },
    outputCodeBlock: {
        backgroundColor: tokens.colorNeutralBackground1,
        ...shorthands.border('1px', 'solid', tokens.colorNeutralStroke2),
        borderRadius: tokens.borderRadiusMedium,
        color: tokens.colorNeutralForeground1,
        fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, Liberation Mono, Courier New, monospace',
        fontSize: tokens.fontSizeBase200,
        lineHeight: tokens.lineHeightBase300,
        marginTop: 0,
        overflowX: 'auto',
        ...shorthands.padding(tokens.spacingVerticalM, tokens.spacingHorizontalM),
        whiteSpace: 'pre'
    },
    outputCodeContainer: {
        marginTop: tokens.spacingVerticalM,
        position: 'relative'
    },
    root: {
        backgroundColor: tokens.colorPaletteBerryBackground2,
        ...shorthands.border('1px', 'solid', tokens.colorPaletteBerryBorder2),
        boxShadow: tokens.shadow8,
        minHeight: '600px',
        scrollMarginTop: tokens.spacingVerticalXL,
        ...shorthands.padding(tokens.spacingVerticalXXL, tokens.spacingHorizontalXXL),
        width: '100%'
    },
    statusBadge: {
        width: '16.6667%'
    },
    title: {
        fontSize: tokens.fontSizeHero800,
        fontWeight: tokens.fontWeightSemibold,
        lineHeight: tokens.lineHeightHero800,
        marginTop: tokens.spacingVerticalS
    }
});
