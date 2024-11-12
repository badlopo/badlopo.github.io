import { ProseArchiveItem } from "@/utils/loader.ts";

/**
 * as base class
 */
interface TreeNode {
}

/**
 * lv1: root
 */
interface TreeNodeLv0 extends TreeNode {
    date: number
    children: TreeNodeLv1[]
}

/**
 * lv2: category
 * as final class
 */
interface TreeNodeLv1 extends TreeNode {
    category: string
    count: number
    children: TreeNodeLv2[]
}

/**
 * lv3: prose
 */
interface TreeNodeLv2 extends TreeNode {
    detail: ProseArchiveItem
}

export type {
    TreeNode,
    TreeNodeLv0,
    TreeNodeLv1,
    TreeNodeLv2,
}
