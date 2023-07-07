import { CSSProperties } from "react";
import { NodeStructure } from "./types";

export function calculatePath(paths: string[], node: NodeStructure, parentX: number | null, parentY: number | null) {
    const nodeX = node.x + node.width / 2, nodeY = node.y + node.height / 2;

    if (parentX !== null && parentY !== null && paths !== null) {
        paths.push(`M${parentX},${parentY} L${nodeX},${nodeY}`);
    }

    if (node.childNodes && node.childNodes.length > 0) {
        node.childNodes.forEach((childNode) => calculatePath(paths, childNode, nodeX, nodeY));
    }
}

export function updateNodePosition(currentNode: NodeStructure, nodeId: NodeStructure["id"], newX: number, newY: number): NodeStructure {
    if (currentNode.id === nodeId) {
        return { ...currentNode, x: newX, y: newY };
    }

    if (currentNode.childNodes && currentNode.childNodes.length > 0) {
        return { ...currentNode, childNodes: currentNode.childNodes.map((childNode) => updateNodePosition(childNode, nodeId, newX, newY)) }
    }

    return currentNode;
}

export function updateNode(nodes: NodeStructure[], nodeId: NodeStructure["id"], newX: number, newY: number): NodeStructure[] {
    return nodes.map((node) => {

        if (node.id === nodeId) {
            return updateNodePosition(node, nodeId, newX, newY);
        }

        if (node.childNodes && node.childNodes.length > 0) {
            return { ...node, childNodes: updateNode(node.childNodes, nodeId, newX, newY) };
        }

        return node;
    });
}

export function getFullSize(): CSSProperties {
    return { width: "100%", height: "100%", position: "absolute" };
}