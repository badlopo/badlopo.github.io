abstract class TreeConfig {
    public static readonly GRAPH_WIDTH = 900

    public static readonly NODE_SIZE: [ number, number ] = [ 40, TreeConfig.GRAPH_WIDTH / 3 ]

    public static get NODE_SIZE_X() {
        return TreeConfig.NODE_SIZE[1]
    }

    public static get NODE_SIZE_Y() {
        return TreeConfig.NODE_SIZE[0]
    }

    public static readonly TRANSITION_DURATION = 500

    public static readonly CIRCLE_RADIUS = 10

    /**
     * depth=1 层级的节点的 文本和圆形之间的间隔 (y 轴方向)
     */
    public static readonly LV1_GAP = 5

    /**
     * depth=2 层级的节点的 文本和圆形之间的间隔 (x 轴方向)
     */
    public static readonly LV2_GAP = 5
}

export {
    TreeConfig,
}
