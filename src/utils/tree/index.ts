import { TreeNode, TreeNodeLv1, TreeNodeLv2, TreeNodeLv3 } from "@/utils/tree/type.ts";
import {
    BaseType,
    create, hierarchy,
    HierarchyLink,
    HierarchyNode,
    Link,
    linkHorizontal, select,
    Selection, Transition, tree, TreeLayout,
    zoom,
    ZoomBehavior,
    zoomIdentity
} from "d3";
import { TreeConfig } from "@/utils/tree/config.ts";

declare module "d3" {
    interface HierarchyNode<Datum> {
        // id?: string | undefined;
        x0?: number
        y0?: number
        // as_source?: boolean
        _children?: HierarchyNode<Datum>[]
    }
}

const calc_node_id = (node: HierarchyNode<TreeNode>) => {
    switch(node.depth) {
        case 0:
            return 'root'
        case 1:
            return (node.data as TreeNodeLv2).category
        case 2:
            return (node.data as TreeNodeLv3).detail.filename
        default:
            return 'unknown'
    }
}

/**
 * build node depends on depth
 */
const build_node = (selection: Selection<SVGGElement, TreeNode, null, undefined>, node: HierarchyNode<TreeNode>) => {
    selection
        .append('text')
        .text(`Level ${ node.depth }`)
        .attr('x', 15)
        .attr('y', 5)
    selection.append('circle')
        .attr('r', 10)
        .attr('stroke', 'steelblue')
        .attr('fill', 'white')
}

class TreeRenderer {
    /**
     * 容器
     */
    readonly #host: HTMLElement

    /**
     * 原始数据
     */
    readonly #treeData: TreeNodeLv1

    /**
     * 连接线生成函数
     */
    readonly #linker: Link<any, HierarchyLink<TreeNode>, HierarchyNode<TreeNode>>
    /**
     * 布局函数
     */
    readonly #layoutFn: TreeLayout<TreeNode>

    /**
     * svg 元素
     */
    readonly #svg: Selection<SVGSVGElement, undefined, null, undefined>
    readonly #linkGroup: Selection<SVGGElement, undefined, null, undefined>
    readonly #nodeGroup: Selection<SVGGElement, undefined, null, undefined>
    /**
     * 缩放行为
     */
    readonly #zoom: ZoomBehavior<SVGSVGElement, undefined>

    /**
     * 层级化的数据 (因为数据不会变化, 所以只计算一次)
     */
    readonly #hierarchicalData: HierarchyNode<TreeNode>

    /**
     * 布局后的数据 (HierarchyPointNode<TreeNode>)
     */
    #laidOutData!: HierarchyNode<TreeNode>

    /**
     * 过渡
     */
    #transition!: Transition<BaseType, undefined, null, undefined>

    constructor(host: HTMLElement, treeData: TreeNodeLv1) {
        this.#host = host
        this.#treeData = treeData

        // 创建连接线生成函数
        this.#linker = linkHorizontal<unknown, HierarchyLink<TreeNode>, HierarchyNode<TreeNode>>()
            .x(d => d.y!)
            .y(d => d.x!)
        this.#layoutFn = tree<TreeNode>().nodeSize(TreeConfig.NODE_SIZE)

        // 创建 svg 元素
        const _svg = create('svg')
            .attr('class', 'tree-root')
            // .attr('width', TreeConfig.GRAPH_WIDTH)
            .attr('width', '100%')
        // .attr('height', '100%')
        const _linkGroup = _svg.append('g').attr('class', 'tree-links')
        const _nodeGroup = _svg.append('g').attr('class', 'tree-nodes')
        const _zoom = zoom<SVGSVGElement, undefined>()
            .scaleExtent([ 0.5, 2 ])
            .filter(ev => {
                // 不是鼠标滚轮事件 & 是左键点击事件
                const isTarget = ev.type !== 'wheel' && ev.type !== 'dblclick' && ev.button === 0

                // 阻止默认行为
                if(isTarget) ev.preventDefault()
                return isTarget
            })
            .on('zoom', ev => {
                _nodeGroup.attr('transform', ev.transform)
                _linkGroup.attr('transform', ev.transform)
            })
        _svg.call(_zoom)

        this.#svg = _svg
        this.#linkGroup = _linkGroup
        this.#nodeGroup = _nodeGroup
        this.#zoom = _zoom

        // 层级化
        const _hierarchicalData = hierarchy<TreeNode>(this.#treeData)
        _hierarchicalData.each(d => {
            // @ts-ignore
            d.id = calc_node_id(d)
            d._children = d.children
        })
        this.#hierarchicalData = _hierarchicalData
    }

    /**
     * 布局
     */
    private _layout() {
        const _laidOutData = this.#layoutFn(this.#hierarchicalData)
        const _constraint = { min: Infinity, max: -Infinity }
        _laidOutData.each(d => {
            if(d.x! < _constraint.min) _constraint.min = d.x!
            else if(d.x! > _constraint.max) _constraint.max = d.x!
        })
        this.#laidOutData = _laidOutData

        this.#transition = this.#svg.transition().duration(TreeConfig.TRANSITION_DURATION) as unknown as Transition<BaseType, undefined, null, undefined>
        const GRAPH_HEIGHT = _constraint.max - _constraint.min + TreeConfig.NODE_SIZE_Y * 2
        this.#svg
            .transition(this.#transition)
            .attr('height', GRAPH_HEIGHT)
            .attr('viewBox', [
                -TreeConfig.NODE_SIZE_Y, _constraint.min - TreeConfig.NODE_SIZE_Y,
                TreeConfig.GRAPH_WIDTH + TreeConfig.NODE_SIZE_Y * 2, GRAPH_HEIGHT
            ].join(' '))
    }

    private _renderLinks(eventNode: HierarchyNode<TreeNode>) {
        // 当前的连接线
        const treeLinks = this.#linkGroup.selectAll<SVGPathElement, HierarchyLink<TreeNode>>('path')
            .data(this.#laidOutData.links(), d => d.target.id!)

        // 连接线: 新增的连接线
        const enterLinks = treeLinks.enter()
            .append('path')
            .attr('class', ({ target }) => `tree-link tree-link-${ target.depth }`)
            .attr('d', () => {
                const prev = { ...eventNode, x: eventNode.x0, y: eventNode.y0 }
                return this.#linker({ source: prev, target: prev } as HierarchyLink<TreeNode>)
            })

        // 连接线: 更新的连接线
        treeLinks.merge(enterLinks)
            .transition(this.#transition)
            .attr('d', this.#linker)

        // 连接线: 移除的连接线
        treeLinks
            .exit()
            .attr('d', () => {
                const prev = { ...eventNode, x: eventNode.x0, y: eventNode.y0 }
                return this.#linker({ source: prev, target: prev } as HierarchyLink<TreeNode>)
            })
            .remove()
    }

    private _renderNodes(eventNode: HierarchyNode<TreeNode>) {
        // 当前的节点
        const treeNodes = this.#nodeGroup.selectAll<SVGGElement, HierarchyNode<TreeNode>>('g')
            .data(this.#laidOutData.descendants(), d => d.id!)

        // 节点: 新增的节点
        const enterNodes = treeNodes.enter()
            .append('g')
            .attr('class', ({ depth }) => `tree-node tree-node-${ depth }`)
            .attr('transform', `translate(${ eventNode.y0 }, ${ eventNode.x0 })`)
            .attr('fill-opacity', 0)
            .attr('stroke-opacity', 0)
            .each(function (d) {
                build_node(select(this), d)
            })

        // 节点: 更新的节点
        treeNodes.merge(enterNodes)
            .transition(this.#transition)
            .attr('transform', d => `translate(${ d.y }, ${ d.x })`)
            .attr('fill-opacity', 1)
            .attr('stroke-opacity', 1)

        // 节点: 移除的节点
        treeNodes
            .exit()
            .transition(this.#transition)
            .attr('transform', `translate(${ eventNode.y }, ${ eventNode.x })`)
            .attr('fill-opacity', 0)
            .attr('stroke-opacity', 0)
            .remove()

        // 事件绑定
        const instance = this
        enterNodes.on('click', function (_, d) {
            if(d.depth === 1) {
                d.children = d.children ? undefined : d._children
                instance._layout()
                instance._render(d)
            }
        })
    }

    private _render(eventNode: HierarchyNode<TreeNode>) {
        this._renderLinks(eventNode)
        this._renderNodes(eventNode)

        // 更新 x0, y0
        this.#laidOutData.each(d => {
            d.x0 = d.x
            d.y0 = d.y
        })
    }

    public zoomIn() {
        this.#svg.transition(this.#transition)
            // TODO: set duration
            .call(this.#zoom.scaleBy, 1.2)
    }

    public zoomOut() {
        this.#svg.transition(this.#transition)
            // TODO: set duration
            .call(this.#zoom.scaleBy, 0.8)
    }

    public zoomReset() {
        this.#svg.transition(this.#transition)
            .call(this.#zoom.transform, zoomIdentity)
    }

    public render() {
        // 布局
        this._layout()
        // 第一次渲染前, 设置每个点的 x0, y0
        this.#laidOutData.each(d => {
            d.x0 = d.x
            d.y0 = d.y
        })
        // 渲染
        this._render(this.#laidOutData)
        // 添加到容器
        this.#host.appendChild(this.#svg.node()!)
    }

    public dispose() {
        this.#svg.remove()
    }
}

export {
    TreeRenderer,
}
