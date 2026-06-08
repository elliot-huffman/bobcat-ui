'use client';

import { makeStyles, shorthands, tokens } from '@fluentui/react-components';

/** Tokenized styles for the additive prototype2 repositories screen. */
export const usePrototype2ReposStyles = makeStyles({
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
    toolbarSearch: {
        flexGrow: 1,
        maxWidth: '420px'
    },
    grid: {
        backgroundImage: `linear-gradient(180deg, ${tokens.colorNeutralBackground2}, ${tokens.colorNeutralBackground1})`,
        ...shorthands.border('1px', 'solid', tokens.colorNeutralStroke2),
        borderRadius: tokens.borderRadiusLarge,
        overflow: 'hidden'
    },
    gridRow: {
        cursor: 'pointer',
        ':hover': {
            backgroundColor: tokens.colorNeutralBackground1Hover
        }
    },
    nameTitle: {
        color: tokens.colorNeutralForeground1,
        fontWeight: tokens.fontWeightSemibold
    },
    typeCell: {
        color: tokens.colorNeutralForeground2,
        textTransform: 'capitalize'
    },
    endpointCell: {
        color: tokens.colorNeutralForeground2,
        fontFamily: tokens.fontFamilyMonospace
    },
    emptyState: {
        color: tokens.colorNeutralForeground3,
        margin: 0,
        ...shorthands.padding(tokens.spacingVerticalL, tokens.spacingHorizontalL),
        textAlign: 'center'
    }
});
