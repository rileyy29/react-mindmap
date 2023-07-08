
import React, { Fragment, ReactElement, ReactNode, memo, useMemo } from "react";
import Draggable, { DraggableEvent } from "react-draggable";
import { NodeStructure } from "../types";

export interface NodeProps {
    /**
     * Specify the node data structure to the component.
     * 
     */
    node: NodeStructure;

    /**
     * Specify a classname for the parent <div /> element.
     */
    nodeClassName?: string;

    /**
     * Specify whether the node should be draggable.
     */
    draggable?: boolean;

    /**
     * Specify whether the node should be draggable using a custom function.
     * @param node 
     * @returns 
     */
    draggableFn?: (node: Omit<NodeStructure, 'childNodes'>) => boolean;

    /**
     * Specify a renderer for the node, if nothing is provided then
     * the node will not be rendered.
     * @param node 
     * @returns 
     */
    renderNode: (node: NodeStructure) => ReactNode | ReactElement | JSX.Element;

    /**
     * Specify a function to be invoked when the node is dragged.
     * If 'draggable' is false then this is ignored.
     * @param id 
     * @param newX 
     * @param newY 
     * @returns 
     */
    onDrag?: (id: NodeStructure["id"], newX: number, newY: number) => void;
}

export default memo(function Node({
    node,
    nodeClassName,
    draggable = true,
    draggableFn,
    renderNode,
    onDrag
}: NodeProps) {
    const isDraggable = useMemo(() => {
        if (draggableFn) return draggableFn(node);
        return draggable;
    }, [draggable, draggableFn]);

    const handleDragEvent = (event: DraggableEvent) => {
        if (!isDraggable || !onDrag) {
            return;
        }

        const mouseEvent = event as React.MouseEvent;
        const newX = node.x + mouseEvent.movementX;
        const newY = node.y + mouseEvent.movementY;
        onDrag(node.id, newX, newY);
    }

    if (!renderNode) {
        throw new Error("Invalid render function provided");
    }

    return (
        <Fragment>
            <Draggable
                bounds={"parent"}
                disabled={isDraggable === false}
                defaultClassName={"node-draggable"}
                defaultClassNameDragged={"node-dragged"}
                defaultClassNameDragging={"node-dragging"}
                position={{ x: node.x, y: node.y }}
                onDrag={handleDragEvent}>
                <div style={{ zIndex: 50, position: "absolute", width: node.width, height: node.height, backgroundColor: "lightgray", cursor: "pointer" }} className={nodeClassName}>{renderNode(node)}</div>
            </Draggable>
            {!node.childNodes ? null :
                node.childNodes.map((childNode) => <Node key={childNode.id} node={childNode} nodeClassName={nodeClassName} renderNode={renderNode} onDrag={onDrag} draggable={draggable} />)}
        </Fragment>
    )
});