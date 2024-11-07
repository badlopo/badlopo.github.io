import { ProseArchiveItem } from "@/utils/loader.ts";

/**
 * as base class
 */
interface TreeNode {
}

/**
 * lv1: root
 */
interface TreeNodeLv1 extends TreeNode {
    date: number
    children: TreeNodeLv2[]
}

/**
 * lv2: category
 * as final class
 */
interface TreeNodeLv2 extends TreeNode {
    category: string
    count: number
    children: TreeNodeLv3[]
}

/**
 * lv3: prose
 */
interface TreeNodeLv3 extends TreeNode {
    detail: ProseArchiveItem
}

export type {
    TreeNode,
    TreeNodeLv1,
    TreeNodeLv2,
    TreeNodeLv3,
}
