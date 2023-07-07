import { SVGProps, useMemo, useState } from "react";
import { NodeStructure } from "../types";
import { calculatePath, getFullSize, updateNode } from "../util";
import Node, { NodeProps } from "./Node";

export interface MindmapProps extends Omit<NodeProps, 'node' | 'onDrag'> {
    nodes: NodeStructure[];
    path?: Omit<SVGProps<SVGPathElement>, 'd' | 'fill'>;
}

export default function Mindmap({
    nodes: initialNodes,
    path: pathProps,
    ...nodeProps
}: MindmapProps) {
    const [nodes, setNodes] = useState<NodeStructure[]>(initialNodes);

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
        <div style={getFullSize()}>
            <svg style={{ ...getFullSize(), zIndex: 25 }}>
                <path d={path} stroke={"black"} strokeWidth={2} fill={"transparent"} {...pathProps} />
            </svg>
            {!nodes ? null :
                nodes.map((node) => <Node key={node.id} node={node} onDrag={onNodeDrag} {...nodeProps} />)}
        </div>
    )
}