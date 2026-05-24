'use client';

import { makeStyles, tokens } from '@fluentui/react-components';

/** List of CSS styles for the global layout component. */
export const useStyleList = makeStyles({
    'body': {
        'backgroundColor': tokens.colorNeutralBackground1,
        'margin': 0
    },
    'html': {
        'backgroundColor': tokens.colorNeutralBackground1,
        'overflow': 'hidden',
        'scrollbarGutter': 'unset'
    }
});
