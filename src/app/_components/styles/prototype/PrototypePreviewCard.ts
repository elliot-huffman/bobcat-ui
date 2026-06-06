'use client';

import { makeStyles, shorthands, tokens } from '@fluentui/react-components';

/** Tokenized styles for the prototype preview card on the home page. */
export const usePrototypePreviewCardStyles = makeStyles({
    body: {
        display: 'flex',
        flexDirection: 'column',
        rowGap: tokens.spacingVerticalXL
    },
    controls: {
        columnGap: tokens.spacingHorizontalS,
        display: 'flex',
        flexWrap: 'wrap',
        rowGap: tokens.spacingVerticalS
    },
    header: {
        display: 'flex',
        flexDirection: 'column',
        rowGap: tokens.spacingVerticalS
    },
    root: {
        backgroundColor: tokens.colorNeutralBackground1,
        ...shorthands.border('1px', 'solid', tokens.colorNeutralStroke2),
        borderRadius: tokens.borderRadiusLarge,
        boxShadow: tokens.shadow8,
        display: 'flex',
        flexDirection: 'column',
        rowGap: tokens.spacingVerticalL,
        width: '100%',
        ...shorthands.padding(tokens.spacingVerticalXL, tokens.spacingHorizontalXL)
    },
    title: {
        color: tokens.colorNeutralForeground1,
        fontSize: tokens.fontSizeHero700,
        fontWeight: tokens.fontWeightSemibold,
        lineHeight: tokens.lineHeightHero700,
        margin: 0
    },
    copy: {
        color: tokens.colorNeutralForeground2,
        fontSize: tokens.fontSizeBase300,
        lineHeight: tokens.lineHeightBase300,
        margin: 0,
        maxWidth: '72ch'
    },
    section: {
        display: 'flex',
        flexDirection: 'column',
        rowGap: tokens.spacingVerticalM
    },
    sectionLabel: {
        color: tokens.colorBrandForeground1,
        fontSize: tokens.fontSizeBase200,
        fontWeight: tokens.fontWeightSemibold,
        letterSpacing: '0.12em',
        textTransform: 'uppercase'
    }
});