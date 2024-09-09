import { Marked } from "marked";
import { markedHighlight } from "marked-highlight";
import hljs from "highlight.js";

const marked = new Marked(
    markedHighlight({
        langPrefix: 'hljs language-',
        highlight(code, lang) {
            const language = hljs.getLanguage(lang) ? lang : 'plaintext';
            return hljs.highlight(code, { language }).value;
        }
    })
);

// ===== archive =====
type ProseArchive = {
    date: number
    statistics: { [category: string]: number }
    items: {
        filename: string
        title: string
        category: string
        created: string
        updated: string | null
    }[]
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
type ProseConfig = {
    title: string
    created: string | null
    updated: string | null
    content: string
}

const proseLoader = async (filename: string): Promise<ProseConfig | null> => {
    try {
        const raw = await fetch(`/source/prose/${ filename }.md`).then(r => r.text())
        const reg = /^---$\r?\n(?<frontmatter>[\s\S]*?)\r?\n^---$\r?\n/m
        const matches = raw.match(reg)
        const frontmatter = matches?.groups?.frontmatter
        if(!frontmatter) {
            console.warn('[proseLoader] frontmatter not found:', filename)
            return {
                title: filename,
                created: 'unknown',
                updated: null,
                content: marked.parse(raw) as string,
            }
        }

        const config: Record<string, any> = {}
        frontmatter.split(/\r?\n/).forEach(line => {
            // skip comment line
            if(line.startsWith('#')) return

            const [ key, value ] = line.split(':').map(v => v.trim())
            if(key && value) config[key.trim()] = value.trim()
        })

        return {
            title: config.title || filename,
            created: config.created,
            updated: config.updated,
            content: marked.parse(raw.slice(matches["0"].length)) as string,
        }
    } catch (err) {
        console.error(`[proseLoader] ${ filename }`, err)
        return null
    }
}

export type {
    ProseArchive,
    RawConfig,
    ProseConfig,
}

export {
    archiveLoader,
    rawLoader,
    proseLoader,
}
