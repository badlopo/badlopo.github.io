abstract class TreeConfig {
    public static readonly GRAPH_WIDTH = 900

    public static readonly NODE_SIZE: [ number, number ] = [ 30, TreeConfig.GRAPH_WIDTH / 3 ]

    public static get NODE_SIZE_X() {
        return TreeConfig.NODE_SIZE[1]
    }

    public static get NODE_SIZE_Y() {
        return TreeConfig.NODE_SIZE[0]
    }

    public static readonly TRANSITION_DURATION = 500
}

export {
    TreeConfig,
}
