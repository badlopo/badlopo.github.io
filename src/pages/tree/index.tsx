import './index.css'

import { archiveLoader, ProseArchive } from "@/utils/loader.ts";
import { useEffect, useRef } from "react";
import { TreeNodeLv1, TreeNodeLv3 } from "@/utils/tree/type.ts";
import { useLoaderData } from "react-router-dom";
import { TreeRenderer } from "@/utils/tree";

type TreePageLoaderData = {
    tree: TreeNodeLv1
}

const TreePage = () => {
    const { tree } = useLoaderData() as TreePageLoaderData

    const ref = useRef<HTMLDivElement | null>(null)

    useEffect(() => {
        const tr = new TreeRenderer(ref.current!, tree)
        tr.render()

        return () => {
            tr.dispose()
        }
    }, [])

    return <div ref={ ref } className={ 'tree-container' }/>
}

const treeBuilder = (archive: ProseArchive): TreeNodeLv1 => {
    const categories: { [category: string]: { count: number, children: TreeNodeLv3[] } } = {}

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

TreePage.loader = async (): Promise<TreePageLoaderData> => {
    const proses = (await archiveLoader('prose'))!

    // TODO: process
    console.log('got prose archive:', proses)

    return { tree: treeBuilder(proses) }
}

export {
    TreePage,
}
