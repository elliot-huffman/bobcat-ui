export interface MarkdownToken {
    type: string;
    tag: string;
    content: string;
    hidden: boolean;
    children: MarkdownToken[] | null;
    attrGet: (name: string) => string | null;
}

export type MarkdownItInstanceFactory = (
    presetName?: string,
    options?: {
        html?: boolean;
        typographer?: boolean;
    }
) => {
    parse: (source: string, environment: object) => MarkdownToken[];
};
