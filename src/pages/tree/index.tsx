import { archiveLoader, ProseArchive } from "@/utils/loader.ts";
import { useEffect } from "react";
import { TreeNodeLv1, TreeNodeLv3 } from "@/utils/tree/type.ts";
import { useLoaderData } from "react-router-dom";

type TreePageLoaderData = {
    tree: TreeNodeLv1
}

const TreePage = () => {
    const { tree } = useLoaderData() as TreePageLoaderData

    useEffect(() => {
        // TODO: render tree
        console.log('tree:', tree)
    }, [])

    return (
        <div className={ 'tree-container' }>
            {/* TODO: svg element (.tree-root) */ }
        </div>
    )
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
