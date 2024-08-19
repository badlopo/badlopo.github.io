import { marked } from "marked";

// ===== archive =====
type PoemArchive = {
    date: number
    total: number
    items: {
        title: string
        path: string
    }[]
}

type ProseArchive = {
    // TODO: prose archive
}

type ProjectArchive = {
    // TODO: project archive
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
    createTime: Date
    modifyTime: Date
    content: string
}

/**
 * @param path path to the source file
 */
const proseLoader = async (path: string): Promise<ProseConfig | null> => {
    try {
        const raw = await fetch(path).then(r => r.text())

        const segments = []
        let ptr = 0;
        for (let i = 0; i < raw.length; i++) {
            if(raw[i] === '\n') {
                segments.push(raw.slice(ptr, i))
                ptr = i + 1
                if(segments.length === 3) break
            }
        }
        const [ title, cTime, mTime ] = segments
        const content = raw.slice(ptr)
        return {
            title,
            createTime: new Date(cTime),
            modifyTime: new Date(mTime),
            content: marked.parse(content) as string,
        }
    } catch (err) {
        console.error(`[contentLoader] ${ path }`, err)
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
