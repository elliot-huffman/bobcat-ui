'use client';

import { makeStyles, tokens } from '@fluentui/react-components';

/** Tokenized styles for the shared severity ladder and privacy markers in the prototype2 screens. */
export const usePrototype2SeverityLadderStyles = makeStyles({
    ladder: {
        alignItems: 'center',
        display: 'flex',
        gap: tokens.spacingHorizontalM
    },
    sevCount: {
        alignItems: 'center',
        display: 'inline-flex',
        fontVariantNumeric: 'tabular-nums',
        gap: tokens.spacingHorizontalXXS
    },
    sevMarker: {
        borderRadius: tokens.borderRadiusCircular,
        display: 'inline-block',
        flexShrink: 0,
        height: '8px',
        width: '8px'
    },
    sevMarkerCritical: {
        backgroundColor: tokens.colorPaletteRedBackground3
    },
    sevMarkerHigh: {
        backgroundColor: tokens.colorPaletteDarkOrangeBackground3
    },
    sevMarkerMedium: {
        backgroundColor: tokens.colorPaletteYellowBackground3
    },
    sevMarkerLow: {
        backgroundColor: tokens.colorPaletteMarigoldBackground3
    },
    sevMarkerZero: {
        backgroundColor: tokens.colorNeutralBackground4
    },
    sevCountValue: {
        color: tokens.colorNeutralForeground1,
        fontSize: tokens.fontSizeBase200,
        lineHeight: tokens.lineHeightBase200
    },
    sevCountValueZero: {
        color: tokens.colorNeutralForeground4
    },
    privacyMarker: {
        alignItems: 'center',
        color: tokens.colorNeutralForeground3,
        display: 'inline-flex',
        fontSize: tokens.fontSizeBase300
    },
    notScanned: {
        color: tokens.colorNeutralForeground4,
        fontFamily: tokens.fontFamilyMonospace,
        fontSize: tokens.fontSizeBase200,
        lineHeight: tokens.lineHeightBase200
    }
});
