'use client';

import { makeStyles, shorthands, tokens } from '@fluentui/react-components';

/** List of CSS styles for the Home page. */
export const useStyleList = makeStyles({
    'anchorLink': {
        'backgroundColor': tokens.colorNeutralBackground1,
        ...shorthands.border('1px', 'solid', tokens.colorNeutralStroke1),
        'borderRadius': tokens.borderRadiusMedium,
        'color': tokens.colorNeutralForeground1,
        'fontWeight': tokens.fontWeightSemibold,
        'textDecorationLine': 'none',
        ...shorthands.padding(tokens.spacingVerticalS, tokens.spacingHorizontalM),
        ':hover': {
            'backgroundColor': tokens.colorNeutralBackground1Hover,
            'color': tokens.colorBrandForeground1
        }
    },
    'anchorLinks': {
        'marginTop': tokens.spacingVerticalL,
        'rowGap': tokens.spacingVerticalS,
        'columnGap': tokens.spacingHorizontalS,
        'flexWrap': 'wrap'
    },
    'cardBase': {
        'minHeight': '600px',
        'width': '100%'
    },
    'heroSection': {
        'backgroundColor': tokens.colorNeutralBackground3,
        'boxShadow': tokens.shadow16,
        'scrollMarginTop': tokens.spacingVerticalXL,
        ...shorthands.padding(tokens.spacingVerticalXXL, tokens.spacingHorizontalXXL)
    },
    'heroLogoContainer': {
        'display': 'flex',
        'justifyContent': 'center',
        'marginBottom': tokens.spacingVerticalL,
        'width': '100%'
    },
    'heroLogo': {
        'height': 'auto',
        'maxWidth': '100%',
        'width': 'min(360px, 70vw)'
    },
    'requestOutputSection': {
        'backgroundColor': tokens.colorPaletteBerryBackground2,
        ...shorthands.border('1px', 'solid', tokens.colorPaletteBerryBorder2),
        'boxShadow': tokens.shadow8,
        'scrollMarginTop': tokens.spacingVerticalXL,
        ...shorthands.padding(tokens.spacingVerticalXXL, tokens.spacingHorizontalXXL)
    },
    'heroText': {
        'color': tokens.colorNeutralForeground2,
        'fontSize': tokens.fontSizeBase400,
        'lineHeight': tokens.lineHeightBase400,
        'marginTop': tokens.spacingVerticalM
    },
    'heroTitle': {
        'fontSize': tokens.fontSizeHero800,
        'fontWeight': tokens.fontWeightSemibold,
        'lineHeight': tokens.lineHeightHero800,
        'marginTop': tokens.spacingVerticalS
    },
    'inputStack': {
        'display': 'grid',
        'gap': tokens.spacingVerticalS,
        'marginTop': tokens.spacingVerticalL,
        'maxWidth': '420px'
    },
    'outputActions': {
        'display': 'flex',
        'justifyContent': 'flex-end',
        'marginTop': tokens.spacingVerticalL
    },
    'outputCodeBlock': {
        'backgroundColor': tokens.colorNeutralBackground1,
        ...shorthands.border('1px', 'solid', tokens.colorNeutralStroke2),
        'borderRadius': tokens.borderRadiusMedium,
        'color': tokens.colorNeutralForeground1,
        'fontFamily': 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, Liberation Mono, Courier New, monospace',
        'fontSize': tokens.fontSizeBase200,
        'lineHeight': tokens.lineHeightBase300,
        'marginTop': 0,
        'overflowX': 'auto',
        ...shorthands.padding(tokens.spacingVerticalM, tokens.spacingHorizontalM),
        'whiteSpace': 'pre'
    },
    'outputCodeContainer': {
        'marginTop': tokens.spacingVerticalM,
        'position': 'relative'
    },
    'outputCopyButton': {
        'position': 'absolute',
        'right': tokens.spacingHorizontalXS,
        'top': tokens.spacingVerticalS,
        'zIndex': 1
    },
    'root': {
        'margin': '0 auto',
        'maxWidth': '980px',
        'paddingBottom': 0,
        'paddingLeft': tokens.spacingHorizontalXXL,
        'paddingRight': tokens.spacingHorizontalXXL,
        'paddingTop': tokens.spacingVerticalXXL,
        'width': '100%'
    },
    'userInputSection': {
        'backgroundColor': tokens.colorPaletteSeafoamBackground2,
        ...shorthands.border('1px', 'solid', tokens.colorPaletteSeafoamBorderActive),
        'boxShadow': tokens.shadow8,
        'scrollMarginTop': tokens.spacingVerticalXL,
        ...shorthands.padding(tokens.spacingVerticalXXL, tokens.spacingHorizontalXXL)
    },
    'sectionCard': {
        'backgroundColor': tokens.colorNeutralBackground2,
        'borderLeftColor': tokens.colorBrandStroke1,
        'borderLeftStyle': 'solid',
        'borderLeftWidth': '4px',
        'minHeight': '100dvh',
        'scrollMarginTop': tokens.spacingVerticalXL,
        ...shorthands.padding(tokens.spacingVerticalXL, tokens.spacingHorizontalXL)
    },
    'sectionCopy': {
        'color': tokens.colorNeutralForeground2,
        'fontSize': tokens.fontSizeBase300,
        'lineHeight': tokens.lineHeightBase300,
        'marginTop': tokens.spacingVerticalM
    },
    'sectionEyebrow': {
        'color': tokens.colorBrandForeground1,
        'fontSize': tokens.fontSizeBase200,
        'fontWeight': tokens.fontWeightSemibold,
        'letterSpacing': '0.08em',
        'textTransform': 'uppercase'
    },
    'sectionTitle': {
        'fontSize': tokens.fontSizeHero700,
        'fontWeight': tokens.fontWeightSemibold,
        'lineHeight': tokens.lineHeightHero700,
        'marginTop': tokens.spacingVerticalS
    },
    'wizardActions': {
        'alignItems': 'center',
        'columnGap': tokens.spacingHorizontalS,
        'display': 'flex',
        'flexWrap': 'wrap',
        'marginTop': tokens.spacingVerticalL
    },
    'wizardLayout': {
        'alignItems': 'flex-start',
        'columnGap': tokens.spacingHorizontalL,
        'display': 'flex',
        'flexWrap': 'wrap',
        'rowGap': tokens.spacingVerticalL,
        'width': '100%'
    },
    'wizardLeftRail': {
        'display': 'flex',
        'flexBasis': '300px',
        'flexDirection': 'column',
        'flexGrow': 0,
        'flexShrink': 0,
        'minWidth': '260px',
        'rowGap': tokens.spacingVerticalM
    },
    'wizardRightPanel': {
        'display': 'flex',
        'flexBasis': '0%',
        'flexDirection': 'column',
        'flexGrow': 1,
        'minWidth': '0'
    },
    'wizardShell': {
        'backgroundColor': tokens.colorNeutralBackground1,
        ...shorthands.border('1px', 'solid', tokens.colorNeutralStroke2),
        'boxShadow': tokens.shadow4,
        ...shorthands.padding(tokens.spacingVerticalXL, tokens.spacingHorizontalXL),
        'width': '100%'
    },
    'wizardStepButton': {
        'alignItems': 'flex-start',
        'backgroundColor': tokens.colorNeutralBackground2,
        ...shorthands.border('1px', 'solid', tokens.colorNeutralStroke2),
        'borderRadius': tokens.borderRadiusLarge,
        'cursor': 'pointer',
        'display': 'flex',
        'flexBasis': 'auto',
        'flexDirection': 'column',
        'flexGrow': 0,
        'gap': tokens.spacingVerticalXXS,
        'minHeight': '120px',
        'textAlign': 'left',
        'transitionDuration': tokens.durationNormal,
        'transitionProperty': 'transform, border-color, box-shadow, background-color',
        'transitionTimingFunction': tokens.curveEasyEase,
        'width': '100%',
        ...shorthands.padding(tokens.spacingVerticalL, tokens.spacingHorizontalL),
        ':hover': {
            'backgroundColor': tokens.colorNeutralBackground2Hover,
            'boxShadow': tokens.shadow8,
            'transform': 'translateY(-2px)'
        }
    },
    'wizardStepButtonActive': {
        'backgroundColor': tokens.colorBrandBackground2,
        'boxShadow': tokens.shadow8
    },
    'wizardStepButtonComplete': {
        'backgroundColor': tokens.colorPaletteSeafoamBackground2
    },
    'wizardStepDescription': {
        'color': tokens.colorNeutralForeground2,
        'fontSize': tokens.fontSizeBase200,
        'lineHeight': tokens.lineHeightBase200
    },
    'wizardStepIndex': {
        'color': tokens.colorBrandForeground1,
        'fontSize': tokens.fontSizeBase200,
        'fontWeight': tokens.fontWeightSemibold,
        'letterSpacing': '0.08em',
        'textTransform': 'uppercase'
    },
    'wizardStepList': {
        'display': 'flex',
        'flexDirection': 'column',
        'flexWrap': 'nowrap',
        'rowGap': tokens.spacingVerticalM,
        'width': '100%'
    },
    'wizardStepTitle': {
        'color': tokens.colorNeutralForeground1,
        'fontSize': tokens.fontSizeBase500,
        'fontWeight': tokens.fontWeightSemibold,
        'lineHeight': tokens.lineHeightBase500
    }
});
