'use client';

import { makeStyles, shorthands, tokens } from '@fluentui/react-components';

/** Tokenized styles for the additive sign-in prototype. */
export const usePrototypeSigninStyles = makeStyles({
    card: {
        backgroundColor: tokens.colorNeutralBackground2,
        ...shorthands.border('1px', 'solid', tokens.colorNeutralStroke2),
        borderRadius: tokens.borderRadiusLarge,
        boxShadow: tokens.shadow8,
        display: 'flex',
        flexDirection: 'column',
        gap: tokens.spacingVerticalL,
        maxWidth: '420px',
        ...shorthands.padding(tokens.spacingVerticalXXL, tokens.spacingHorizontalXXL),
        textAlign: 'center',
        width: '100%'
    },
    eyebrow: {
        color: tokens.colorBrandForeground1,
        fontSize: tokens.fontSizeBase200,
        fontWeight: tokens.fontWeightSemibold,
        letterSpacing: '0.12em',
        textTransform: 'uppercase'
    },
    logo: {
        alignSelf: 'center',
        borderRadius: tokens.borderRadiusLarge,
        height: '64px',
        width: '64px'
    },
    page: {
        minHeight: '100dvh',
        display: 'grid',
        placeItems: 'center',
        padding: tokens.spacingHorizontalL
    },
    text: {
        color: tokens.colorNeutralForeground2,
        fontSize: tokens.fontSizeBase300,
        lineHeight: tokens.lineHeightBase300,
        margin: 0
    },
    title: {
        fontSize: tokens.fontSizeHero700,
        fontWeight: tokens.fontWeightSemibold,
        lineHeight: tokens.lineHeightHero700,
        margin: 0
    }
});