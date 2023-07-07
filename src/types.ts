//Base structure of a node
export type NodeStructure = {
    id: number | string;
    x: number;
    y: number;
    width: number;
    height: number;
    node: NodeData;
    type: NodeType;
    childNodes: NodeStructure[];
}

//Data structure of a node (highly fluid so nothing explicitly typed)
export type NodeData = {
    title?: string;
} & any;

//Define differnt possible node types
export type NodeType = "ROOT" | "CHILD";