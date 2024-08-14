import { marked } from "marked";

type PostConfig = {
    title: string
    createTime: Date
    modifyTime: Date
    content: string
}

/**
 * @param path path to the source file
 */
const postLoader = async (path: string): Promise<PostConfig | null> => {
    try {
        const raw = await fetch(path).then(r => r.text())
        console.log(raw)
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
    PostConfig,
}

export {
    postLoader,
}
