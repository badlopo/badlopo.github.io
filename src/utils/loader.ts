import { Marked, Tokens } from "marked";
import { markedHighlight } from "marked-highlight";
import hljs from "highlight.js";

let counter: number[] = []
const marked = new Marked(
    markedHighlight({
        langPrefix: 'hljs language-',
        highlight(code, lang) {
            const language = hljs.getLanguage(lang) ? lang : 'plaintext';
            return hljs.highlight(code, { language }).value;
        }
    }),
    {
        renderer: {
            heading({ depth, text }: Tokens.Heading): string {
                if(counter[depth - 2] === undefined) counter[depth - 2] = 0
                counter[depth - 2] += 1
                const id = `heading_${ depth }_${ counter[depth - 2] }`
                return `<h${ depth } id="${ id }" class="heading-anchor">${ text }</h${ depth }>`
            },
            link({ href, title, text }: Tokens.Link): string {
                const titleAttr = title ? ` title="${ title }"` : ''
                return `<a href="${ href }"${ titleAttr } target="_blank">${ text }</a>`
            }
        }
    }
);
// hold a reference to original parse method
const parse = marked.parse
// @ts-ignore override parse method of marked to inject custom logic
marked.parse = (...args) => {
    // reset counter
    counter = []
    console.log('[marked.parse] counter reset')
    return parse(...args)
}

// ===== archive =====
type ProseArchiveItem = {
    filename: string
    title: string
    category: string
    created: string
    updated: string | null
}
type ProseArchive = {
    date: number
    statistics: { [category: string]: number }
    items: ProseArchiveItem[]
}

// overload signature of archiveLoader
interface ArchiveLoader {
    (category: 'prose'): Promise<ProseArchive | null>
}

const archiveLoader: ArchiveLoader = async (category) => {
    try {
        return fetch(`/archive/${ category }.json`).then(r => r.json())
    } catch (err) {
        console.error(`[archiveLoader] ${ category }`, err)
        return null
    }
}

// ===== raw =====
type RawConfig = {
    content: string
}

const rawLoader = async (path: string): Promise<RawConfig | null> => {
    try {
        const raw = await fetch(path).then(r => r.text())
        return { content: marked.parse(raw) as string }
    } catch (err) {
        console.error(`[rawLoader] ${ path }`, err)
        return null
    }
}

// ===== prose =====
type ProseHeading = {
    id: string
    indent: number
    text: string
}

type ProseConfig = {
    title: string
    created: string | null
    updated: string | null
    /**
     * html content of markdown
     */
    content: string
    /**
     * headings extracted from markdown, used for menu
     */
    headings: ProseHeading[] | null
}

const proseLoader = async (filename: string): Promise<ProseConfig | null> => {
    try {
        const raw = await fetch(`/source/prose/${ filename }.md`).then(r => r.text())
        const reg = /^---$\r?\n(?<frontmatter>[\s\S]*?)\r?\n^---$\r?\n/m
        const matches = raw.match(reg)
        const frontmatter = matches?.groups?.frontmatter

        // generally speaking, this condition should not be met,
        // but we still need to handle it
        if(!frontmatter) {
            console.warn('[proseLoader] frontmatter not found:', filename)
            return {
                title: filename,
                created: 'unknown',
                updated: null,
                content: marked.parse(raw) as string,
                headings: null,
            }
        }

        const config: Record<string, any> = {}
        frontmatter.split(/\r?\n/).forEach(line => {
            // skip comment line
            if(line.startsWith('#')) return

            const [ key, value ] = line.split(':').map(v => v.trim())
            if(key && value) config[key.trim()] = value.trim()
        })

        // markdown main body
        const body = raw.slice(matches["0"].length)

        const headingTokens = marked.lexer(body).filter(x => x.type === 'heading') as Tokens.Heading[]
        const headings: ProseHeading[] = []
        const counter: number[] = []
        for (const { depth, text } of headingTokens) {
            if(counter[depth - 2] === undefined) counter[depth - 2] = 0
            counter[depth - 2] += 1
            headings.push({
                id: `heading_${ depth }_${ counter[depth - 2] }`,
                indent: depth - 2,
                text,
            })
        }

        return {
            title: config.title || filename,
            created: config.created,
            updated: config.updated,
            content: marked.parse(body) as string,
            headings: headings.length > 0 ? headings : null,
        } satisfies ProseConfig
    } catch (err) {
        console.error(`[proseLoader] ${ filename }`, err)
        return null
    }
}

export type {
    ProseArchiveItem,
    ProseArchive,
    RawConfig,
    ProseConfig,
}

export {
    archiveLoader,
    rawLoader,
    proseLoader,
}
