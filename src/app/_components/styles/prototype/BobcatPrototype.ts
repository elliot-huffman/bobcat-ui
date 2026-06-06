'use client';

import { makeStyles, tokens } from '@fluentui/react-components';

/** Shared layout styles for the additive Bobcat prototype wrapper. */
export const useBobcatPrototypeStyles = makeStyles({
    root: {
        backgroundColor: tokens.colorNeutralBackground1,
        color: tokens.colorNeutralForeground1,
        minHeight: '100dvh',
        width: '100%'
    }
});