'use client';

import { makeStyles, tokens } from '@fluentui/react-components';

/** List of CSS styles for the global template component. */
export const useStyleList = makeStyles({
    'pageContent': {
        'backgroundColor': tokens.colorNeutralBackground1,
        'flexGrow': 1,
        'minHeight': 0,
        'overflow': 'auto',
        'width': '100%'
    },
    'rootContainer': {
        'backgroundColor': tokens.colorNeutralBackground1,
        'minHeight': '100dvh'
    }
});
