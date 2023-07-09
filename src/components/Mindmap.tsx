import { SVGProps, forwardRef, useMemo } from "react";
import { useControllableState } from "../hooks/useControllableState";
import { NodeStructure } from "../types";
import { calculatePath, getFullSize, updateNode } from "../util";
import Node, { NodeProps } from "./Node";

export interface MindmapProps extends Omit<NodeProps, 'node' | 'onDrag'> {
    /**
     * Specify an array of default nodes (uncontrolled state).
     */
    defaultNodes?: NodeStructure[];

    /**
     * Specify an array of nodes that are managed by another state (controlled state).
     */
    nodes?: NodeStructure[];

    /**
     * Specify a function to be invoked when the node dataset is changed, specifically during drag operations etc.
     * @param nodes 
     * @returns 
     */
    onNodesChange?: (nodes: NodeStructure[]) => void;

    /**
     * Specify props to be passed to the mindmap line (pathing).
     */
    line?: Omit<SVGProps<SVGPathElement>, 'd' | 'fill'>;

    /**
     * Specify whether the mindmap line (pathing) should be hidden.
     */
    noLine?: boolean;
}

export default forwardRef<HTMLDivElement, MindmapProps>(function Mindmap({
    defaultNodes: defaultValue,
    nodes: value,
    onNodesChange,
    line: pathProps,
    noLine,
    ...nodeProps
}: MindmapProps, ref) {
    const [nodes, setNodes] = useControllableState<NodeStructure[]>({
        value,
        defaultValue,
        onChange: (changedNodes) => {
            if (onNodesChange) onNodesChange(changedNodes);
        }
    });

    const path = useMemo(() => {
        const pathList = [] as string[];

        if (nodes && nodes.length > 0) {
            nodes.forEach((node) => calculatePath(pathList, node, null, null));
        }

        return pathList.join(' ');
    }, [nodes]);

    const onNodeDrag = (nodeId: NodeStructure["id"], newX: number, newY: number) => {
        setNodes((prevNodes) => updateNode(prevNodes, nodeId, newX, newY));
    }

    return (
        <div ref={ref} style={getFullSize()}>
            {noLine ? null : <svg style={{ ...getFullSize(), zIndex: 25 }}><path d={path} stroke={"black"} strokeWidth={2} fill={"transparent"} {...pathProps} /></svg>}
            {!nodes ? null : nodes.map((node) => <Node key={node.id} node={node} onDrag={onNodeDrag} {...nodeProps} />)}
        </div>
    )
});