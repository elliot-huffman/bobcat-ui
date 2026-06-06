'use client';

import { makeStyles, shorthands, tokens } from '@fluentui/react-components';

/** Tokenized styles for the additive scan overlay prototype. */
export const usePrototypeScanOverlayStyles = makeStyles({
    bar: {
        backgroundColor: tokens.colorNeutralBackground3,
        borderRadius: tokens.borderRadiusCircular,
        height: '4px',
        overflow: 'hidden',
        width: '100%'
    },
    barFill: {
        backgroundColor: tokens.colorBrandBackground,
        height: '100%',
        width: '100%'
    },
    modal: {
        backgroundColor: tokens.colorNeutralBackground2,
        ...shorthands.border('1px', 'solid', tokens.colorNeutralStroke2),
        borderRadius: tokens.borderRadiusLarge,
        boxShadow: tokens.shadow16,
        display: 'flex',
        flexDirection: 'column',
        gap: tokens.spacingVerticalL,
        maxWidth: '560px',
        ...shorthands.padding(tokens.spacingVerticalXXL, tokens.spacingHorizontalXXL),
        width: '100%'
    },
    overlay: {
        alignItems: 'center',
        backgroundColor: tokens.colorNeutralBackground1,
        ...shorthands.border('1px', 'solid', tokens.colorNeutralStroke2),
        borderRadius: tokens.borderRadiusLarge,
        display: 'grid',
        justifyItems: 'center',
        minHeight: '320px',
        padding: tokens.spacingHorizontalL,
        position: 'relative',
        width: '100%'
    },
    scanLine: {
        color: tokens.colorNeutralForeground2,
        display: 'flex',
        gap: tokens.spacingHorizontalS,
        fontFamily: tokens.fontFamilyMonospace,
        fontSize: tokens.fontSizeBase200,
        lineHeight: tokens.lineHeightBase200
    },
    url: {
        color: tokens.colorBrandForeground1,
        fontFamily: tokens.fontFamilyMonospace,
        fontSize: tokens.fontSizeBase300,
        lineHeight: tokens.lineHeightBase300,
        wordBreak: 'break-all'
    }
});