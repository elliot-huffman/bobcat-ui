declare module 'markdown-it' {
    interface MarkdownItInstance {
        parse: (source: string, environment: object) => unknown[];
    }

    interface MarkdownItFactory {
        (presetName?: string, options?: {
            html?: boolean;
            typographer?: boolean;
        }): MarkdownItInstance;
    }

    const markdownItFactory: MarkdownItFactory;
    export default markdownItFactory;
}
