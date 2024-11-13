import './index.css'

import { archiveLoader, ProseArchive } from "@/utils/loader.ts";
import { useEffect, useRef } from "react";
import { TreeNodeLv0, TreeNodeLv2 } from "@/utils/tree/type.ts";
import { useLoaderData, useSearchParams } from "react-router-dom";
import { TreeAnchorTarget, TreeRenderer } from "@/utils/tree";

type TreeviewPageLoaderData = {
    tree: TreeNodeLv0
}

const TreeviewPage = () => {
    const { tree } = useLoaderData() as TreeviewPageLoaderData
    const [ searchParam ] = useSearchParams()
    const target = searchParam.get('target') as TreeAnchorTarget ?? '_blank'

    const hostRef = useRef<HTMLDivElement | null>(null)
    const trRef = useRef<TreeRenderer | null>(null)

    useEffect(() => {
        const tr = new TreeRenderer(hostRef.current!, tree, target)
        tr.render()
        trRef.current = tr

        return () => {
            trRef.current = null
            tr.dispose()
        }
    }, [])

    return <div ref={ hostRef } className={ 'tree-container' }>
        <section className={ 'operation-panel' }>
            <button className={ 'zoom-in' } onClick={ () => trRef.current?.zoomIn() }>Zoom In</button>
            <button className={ 'zoom-out' } onClick={ () => trRef.current?.zoomOut() }>Zoom Out</button>
            <button className={ 'zoom-reset' } onClick={ () => trRef.current?.zoomReset() }>Reset</button>
        </section>
    </div>
}

const treeBuilder = (archive: ProseArchive): TreeNodeLv0 => {
    const categories: { [category: string]: { count: number, children: TreeNodeLv2[] } } = {}

    for (const category in archive.statistics) {
        categories[category] = {
            count: archive.statistics[category],
            children: [],
        }
    }
    for (const item of archive.items) {
        categories[item.category].children.push({ detail: item })
    }

    return {
        date: archive.date,
        children: Object.entries(categories)
            .map(([ category, { count, children } ]) => {
                return { category, count, children }
            })
    }
}

TreeviewPage.loader = async (): Promise<TreeviewPageLoaderData> => {
    const proses = (await archiveLoader('prose'))!

    // TODO: process
    console.log('got prose archive:', proses)

    return { tree: treeBuilder(proses) }
}

export {
    TreeviewPage,
}
