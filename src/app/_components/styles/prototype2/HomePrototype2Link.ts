'use client';

import { makeStyles, shorthands, tokens } from '@fluentui/react-components';

/** Tokenized styles for the home-screen banner that links to the prototype2 screens. */
export const useHomePrototype2LinkStyles = makeStyles({
    banner: {
        alignItems: 'center',
        backgroundImage: `linear-gradient(140deg, ${tokens.colorBrandBackground2}, ${tokens.colorNeutralBackground2})`,
        ...shorthands.border('1px', 'solid', tokens.colorBrandStroke2),
        borderRadius: tokens.borderRadiusLarge,
        boxShadow: tokens.shadow4,
        display: 'flex',
        flexWrap: 'wrap',
        gap: tokens.spacingHorizontalM,
        justifyContent: 'space-between',
        marginInline: 'auto',
        maxWidth: '1180px',
        ...shorthands.margin(tokens.spacingVerticalL, 'auto', 0),
        ...shorthands.padding(tokens.spacingVerticalM, tokens.spacingHorizontalL),
        width: '100%'
    },
    text: {
        display: 'flex',
        flexDirection: 'column',
        rowGap: tokens.spacingVerticalXXS
    },
    title: {
        color: tokens.colorNeutralForeground1,
        fontSize: tokens.fontSizeBase400,
        fontWeight: tokens.fontWeightSemibold,
        lineHeight: tokens.lineHeightBase400,
        margin: 0
    },
    subtitle: {
        color: tokens.colorNeutralForeground2,
        fontSize: tokens.fontSizeBase200,
        lineHeight: tokens.lineHeightBase200,
        margin: 0
    },
    actions: {
        display: 'flex',
        flexShrink: 0,
        flexWrap: 'wrap',
        gap: tokens.spacingHorizontalS
    }
});
