'use client';

import { makeStyles, shorthands, tokens } from '@fluentui/react-components';

/** Tokenized styles for the additive landing prototype. */
export const usePrototypeLandingStyles = makeStyles({
    brand: {
        display: 'flex',
        alignItems: 'center',
        columnGap: tokens.spacingHorizontalS
    },
    brandMark: {
        width: '40px',
        height: '40px',
        borderRadius: tokens.borderRadiusMedium
    },
    brandText: {
        display: 'flex',
        flexDirection: 'column',
        lineHeight: tokens.lineHeightBase100
    },
    eyebrow: {
        color: tokens.colorBrandForeground1,
        fontSize: tokens.fontSizeBase200,
        fontWeight: tokens.fontWeightSemibold,
        letterSpacing: '0.12em',
        textTransform: 'uppercase'
    },
    hero: {
        backgroundImage: `radial-gradient(circle at 5% 15%, ${tokens.colorBrandBackground2} 0%, ${tokens.colorTransparentBackground} 40%), radial-gradient(circle at 90% 20%, ${tokens.colorNeutralBackground3} 0%, ${tokens.colorTransparentBackground} 45%)`,
        ...shorthands.border('1px', 'solid', tokens.colorNeutralStroke2),
        borderRadius: tokens.borderRadiusXLarge,
        display: 'grid',
        gap: tokens.spacingHorizontalXXL,
        gridTemplateColumns: 'minmax(0, 1.1fr) minmax(0, 0.9fr)',
        alignItems: 'center',
        padding: `${tokens.spacingVerticalXXL} ${tokens.spacingHorizontalXL}`
    },
    heroBody: {
        display: 'flex',
        flexDirection: 'column',
        rowGap: tokens.spacingVerticalL
    },
    heroCard: {
        backgroundImage: `linear-gradient(145deg, ${tokens.colorNeutralBackground3}, ${tokens.colorNeutralBackground2})`,
        ...shorthands.border('1px', 'solid', tokens.colorNeutralStroke2),
        borderRadius: tokens.borderRadiusLarge,
        boxShadow: tokens.shadow8,
        display: 'flex',
        flexDirection: 'column',
        rowGap: tokens.spacingVerticalM,
        ...shorthands.padding(tokens.spacingVerticalXL, tokens.spacingHorizontalXL)
    },
    heroCopy: {
        color: tokens.colorNeutralForeground2,
        fontSize: tokens.fontSizeBase400,
        lineHeight: tokens.lineHeightBase400,
        marginTop: 0,
        maxWidth: '58ch'
    },
    heroTitle: {
        fontSize: tokens.fontSizeHero800,
        fontWeight: tokens.fontWeightSemibold,
        letterSpacing: tokens.letterSpacingTighter,
        lineHeight: tokens.lineHeightHero800,
        margin: 0
    },
    nav: {
        alignItems: 'center',
        backgroundImage: `linear-gradient(90deg, ${tokens.colorNeutralBackground2}, ${tokens.colorNeutralBackground1})`,
        ...shorthands.border('1px', 'solid', tokens.colorNeutralStroke2),
        borderRadius: tokens.borderRadiusCircular,
        display: 'flex',
        gap: tokens.spacingHorizontalM,
        justifyContent: 'space-between',
        padding: `${tokens.spacingVerticalM} ${tokens.spacingHorizontalL}`
    },
    navLinks: {
        alignItems: 'center',
        display: 'flex',
        flexWrap: 'wrap',
        gap: tokens.spacingHorizontalXS
    },
    page: {
        backgroundImage: `radial-gradient(circle at 0% 0%, ${tokens.colorBrandBackground2} 0%, ${tokens.colorTransparentBackground} 35%), radial-gradient(circle at 100% 100%, ${tokens.colorNeutralBackground3} 0%, ${tokens.colorTransparentBackground} 35%)`,
        display: 'flex',
        flexDirection: 'column',
        rowGap: tokens.spacingVerticalXXL,
        width: '100%'
    },
    statGrid: {
        display: 'grid',
        gap: tokens.spacingHorizontalM,
        gridTemplateColumns: 'repeat(4, minmax(0, 1fr))'
    },
    statCard: {
        backgroundImage: `linear-gradient(150deg, ${tokens.colorNeutralBackground1}, ${tokens.colorBrandBackground2})`,
        ...shorthands.border('1px', 'solid', tokens.colorNeutralStroke2),
        borderRadius: tokens.borderRadiusMedium,
        display: 'flex',
        flexDirection: 'column',
        rowGap: tokens.spacingVerticalXS,
        ...shorthands.padding(tokens.spacingVerticalL, tokens.spacingHorizontalL)
    },
    statLabel: {
        color: tokens.colorNeutralForeground2,
        fontSize: tokens.fontSizeBase200,
        lineHeight: tokens.lineHeightBase200
    },
    statValue: {
        color: tokens.colorBrandForeground1,
        fontSize: tokens.fontSizeHero700,
        fontWeight: tokens.fontWeightSemibold,
        lineHeight: tokens.lineHeightHero700
    },
    section: {
        display: 'flex',
        flexDirection: 'column',
        rowGap: tokens.spacingVerticalL
    },
    sectionTitle: {
        fontSize: tokens.fontSizeHero700,
        fontWeight: tokens.fontWeightSemibold,
        lineHeight: tokens.lineHeightHero700,
        margin: 0
    },
    sectionCopy: {
        color: tokens.colorNeutralForeground2,
        fontSize: tokens.fontSizeBase300,
        lineHeight: tokens.lineHeightBase300,
        margin: 0,
        maxWidth: '70ch'
    },
    pill: {
        backgroundColor: tokens.colorNeutralBackground2,
        ...shorthands.border('1px', 'solid', tokens.colorNeutralStroke2),
        borderRadius: tokens.borderRadiusCircular,
        color: tokens.colorNeutralForeground2,
        fontSize: tokens.fontSizeBase200,
        padding: `${tokens.spacingVerticalXS} ${tokens.spacingHorizontalM}`
    }
});