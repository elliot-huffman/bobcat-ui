'use client';

import { makeStyles, tokens } from '@fluentui/react-components';

/** List of CSS styles for the navigation menu. */
export const useStyleList = makeStyles({
    'comingSoonContainer': {
        'display': 'flex',
        'paddingLeft': tokens.spacingHorizontalM,
        'paddingTop': tokens.spacingVerticalXS
    },
    'navContainer': {
        'backgroundColor': tokens.colorNeutralBackground2,
        'height': '100%',
        'minWidth': '17%'
    }
});
