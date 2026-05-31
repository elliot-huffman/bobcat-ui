'use client';

import { makeStyles, shorthands, tokens } from '@fluentui/react-components';

export const useReflexGridStyles = makeStyles({
    actionCell: {
        display: 'flex',
        gap: tokens.spacingHorizontalXS,
        justifyContent: 'flex-start'
    },
    container: {
        backgroundColor: tokens.colorNeutralBackground1,
        ...shorthands.border('1px', 'solid', tokens.colorNeutralStroke2),
        borderRadius: tokens.borderRadiusLarge,
        boxShadow: tokens.shadow4,
        display: 'flex',
        flexDirection: 'column',
        rowGap: tokens.spacingVerticalL,
        ...shorthands.padding(tokens.spacingVerticalL, tokens.spacingHorizontalL),
        width: '100%'
    },
    copy: {
        color: tokens.colorNeutralForeground2,
        fontSize: tokens.fontSizeBase300,
        lineHeight: tokens.lineHeightBase300,
        marginTop: tokens.spacingVerticalS
    },
    detailsCard: {
        backgroundColor: tokens.colorSubtleBackground,
        ...shorthands.border('1px', 'solid', tokens.colorNeutralStroke2),
        rowGap: tokens.spacingVerticalS
    },
    detailsActions: {
        display: 'flex',
        justifyContent: 'flex-end',
        marginTop: tokens.spacingVerticalM
    },
    detailsDescription: {
        color: tokens.colorNeutralForeground3,
        fontSize: tokens.fontSizeBase200,
        lineHeight: tokens.lineHeightBase200,
        marginTop: 0
    },
    detailGridCell: {
        ...shorthands.padding(0),
        width: '100%'
    },
    detailRowCard: {
        ...shorthands.border('1px', 'solid', tokens.colorNeutralStroke2),
        borderRadius: tokens.borderRadiusMedium,
        rowGap: tokens.spacingVerticalS,
        width: '100%'
    },
    detailRowCardActions: {
        display: 'flex',
        justifyContent: 'flex-end',
        marginTop: tokens.spacingVerticalS
    },
    detailRowCardHeader: {
        color: tokens.colorNeutralForeground1,
        fontSize: tokens.fontSizeBase300,
        fontWeight: tokens.fontWeightSemibold,
        lineHeight: tokens.lineHeightBase300,
        marginTop: 0
    },
    detailRowCardMeta: {
        color: tokens.colorNeutralForeground2,
        fontSize: tokens.fontSizeBase200,
        lineHeight: tokens.lineHeightBase200,
        marginTop: 0
    },
    detailRowExpandedCode: {
        backgroundColor: tokens.colorNeutralBackground2,
        ...shorthands.border('1px', 'solid', tokens.colorNeutralStroke2),
        borderRadius: tokens.borderRadiusSmall,
        color: tokens.colorNeutralForeground1,
        fontSize: tokens.fontSizeBase200,
        lineHeight: tokens.lineHeightBase200,
        marginBottom: 0,
        marginTop: tokens.spacingVerticalS,
        overflowX: 'auto',
        ...shorthands.padding(tokens.spacingVerticalS, tokens.spacingHorizontalS),
        width: '100%'
    },
    detailRowExpandedContent: {
        ...shorthands.borderTop('1px', 'solid', tokens.colorNeutralStroke2),
        marginTop: tokens.spacingVerticalS,
        ...shorthands.padding(tokens.spacingVerticalS, 0, 0, 0)
    },
    detailRowExpandedTitle: {
        color: tokens.colorNeutralForeground2,
        fontSize: tokens.fontSizeBase200,
        fontWeight: tokens.fontWeightMedium,
        lineHeight: tokens.lineHeightBase200,
        marginTop: 0
    },
    detailsGridShell: {
        ...shorthands.border('1px', 'solid', tokens.colorNeutralStroke2),
        borderRadius: tokens.borderRadiusMedium,
        marginTop: tokens.spacingVerticalM,
        overflowX: 'auto',
        ...shorthands.padding(tokens.spacingVerticalS, tokens.spacingHorizontalS)
    },
    detailsHint: {
        color: tokens.colorNeutralForeground3,
        fontSize: tokens.fontSizeBase200,
        lineHeight: tokens.lineHeightBase200,
        marginTop: tokens.spacingVerticalS
    },
    detailsKey: {
        color: tokens.colorNeutralForeground3,
        fontSize: tokens.fontSizeBase200,
        fontWeight: tokens.fontWeightMedium,
        lineHeight: tokens.lineHeightBase200
    },
    detailsList: {
        display: 'flex',
        flexDirection: 'column',
        rowGap: tokens.spacingVerticalS,
        marginBottom: 0,
        marginTop: 0
    },
    detailsRow: {
        alignItems: 'baseline',
        columnGap: tokens.spacingHorizontalM,
        display: 'grid',
        gridTemplateColumns: '120px 1fr',
        marginBottom: 0,
        marginLeft: 0,
        marginRight: 0,
        marginTop: 0
    },
    detailsTitle: {
        color: tokens.colorNeutralForeground1,
        fontSize: tokens.fontSizeBase400,
        fontWeight: tokens.fontWeightSemibold,
        lineHeight: tokens.lineHeightBase400,
        marginTop: 0
    },
    detailsValue: {
        color: tokens.colorNeutralForeground1,
        fontSize: tokens.fontSizeBase300,
        lineHeight: tokens.lineHeightBase300,
        marginBottom: 0,
        marginLeft: 0,
        marginRight: 0,
        marginTop: 0
    },
    filters: {
        columnGap: tokens.spacingHorizontalM,
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
        rowGap: tokens.spacingVerticalM,
        width: '100%'
    },
    gridShell: {
        overflowX: 'auto',
        width: '100%'
    },
    heading: {
        color: tokens.colorNeutralForeground1,
        fontSize: tokens.fontSizeBase600,
        fontWeight: tokens.fontWeightSemibold,
        lineHeight: tokens.lineHeightBase600,
        marginTop: 0
    },
    noRows: {
        color: tokens.colorNeutralForeground3,
        fontSize: tokens.fontSizeBase300,
        lineHeight: tokens.lineHeightBase300,
        ...shorthands.padding(tokens.spacingVerticalM, tokens.spacingHorizontalM)
    }
});
