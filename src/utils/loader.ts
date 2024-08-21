import { marked } from "marked";

// ===== archive =====
type PoemArchive = {
    date: number
    total: number
    items: {
        title: string
        filename: string
    }[]
}

type ProseArchive = {
    date: number
    total: number
    items: {
        title: string
        filename: string
        created: string
        updated: string | null
    }[]
}

type ProjectArchive = {
    date: number
    total: number
    items: {
        title: string
        description: string
        repository?: string | null
        website?: string | null
    }[]
}

// overload signature of archiveLoader
interface ArchiveLoader {
    (category: 'poem'): Promise<PoemArchive | null>

    (category: 'prose'): Promise<ProseArchive | null>

    (category: 'project'): Promise<ProjectArchive | null>
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
        console.error(`[poemLoader] ${ path }`, err)
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
    PoemArchive,
    ProseArchive,
    ProjectArchive,
    RawConfig,
    ProseConfig,
}

export {
    archiveLoader,
    rawLoader,
    proseLoader,
}
