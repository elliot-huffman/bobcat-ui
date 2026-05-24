'use client';

import { makeStyles, tokens } from '@fluentui/react-components';

/** List of CSS styles for the navigation menu. */
export const useStyleList = makeStyles({
    'colorFix': {
        ':hover': {
            'backgroundColor': tokens.colorBrandBackground
        },
        'backgroundColor': 'initial'
    },
    'navContainer': {
        'backgroundColor': tokens.colorNeutralBackground2,
        'minWidth': '17%'
    }
});
