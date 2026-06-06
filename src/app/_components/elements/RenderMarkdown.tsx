'use client';

import type { ReactNode } from 'react';

interface RenderMarkdownProps {
    content: string;
}

/**
 * Lightweight markdown fallback renderer.
 * Kept intentionally simple so prototype screens can render markdown-like content
 * without relying on external parser typings.
 */
export function RenderMarkdown(props: RenderMarkdownProps): ReactNode {
    const sections = props.content.split('\n\n').filter((section) => section.trim().length > 0);

    return (
        <div>
            {sections.map((section, sectionIndex) => {
                const lines = section.split('\n');
                const firstLine = lines[0]?.trim() ?? '';

                if (firstLine.startsWith('## ')) {
                    return (
                        <div key={ `section-${ sectionIndex }` }>
                            <h3>{ firstLine.replace('## ', '') }</h3>
                            {lines.slice(1).map((line, lineIndex) => {
                                const normalizedLine = line.trim();
                                const cleanLine = normalizedLine
                                    .replace('- **', '')
                                    .replace('** ', ' ')
                                    .replaceAll('**', '');

                                return normalizedLine.startsWith('- ')
                                    ? <p key={ `line-${ sectionIndex }-${ lineIndex }` }>• { cleanLine.replace('- ', '') }</p>
                                    : <p key={ `line-${ sectionIndex }-${ lineIndex }` }>{ cleanLine }</p>;
                            })}
                        </div>
                    );
                }

                if (firstLine.startsWith('# ')) {
                    return <h2 key={ `section-${ sectionIndex }` }>{ firstLine.replace('# ', '') }</h2>;
                }

                if (lines.every((line) => line.trim().startsWith('- '))) {
                    return (
                        <ul key={ `section-${ sectionIndex }` }>
                            {lines.map((line, lineIndex) => (
                                <li key={ `line-${ sectionIndex }-${ lineIndex }` }>{ line.trim().replace('- ', '') }</li>
                            ))}
                        </ul>
                    );
                }

                return <p key={ `section-${ sectionIndex }` }>{ section }</p>;
            })}
        </div>
    );
}
