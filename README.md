# react-mindmap

[![Build][build-badge]][build]
[![Downloads][downloads-badge]][downloads]
[![Size][size-badge]][size]

A simple base framework/starter package intended to assist developers with the creation and visualisation of interactive MindMaps in React.

## Contents

*   [What is this?](#what-is-this)
*   [Install](#install)
*   [Usage](#usage)
*   [Examples](#examples)
*   [Screenshots](#screenshots)
*   [License](#license)

## What is this?

This package is a [React][] component that renders and manages interactive Mindmaps. This is a simple tool in early development 
which allows users to create draggable, dynamic and interactive Mindmaps simply.

## Install

This package is installable with [npm] or [yarn]. Supporting the latest versions of Node.js. 
```sh
npm install @rileyy29/react-mindmap
yarn add @rileyy29/react-mindmap
```

You may also be required to install peer dependencies if you do not already have them installed.
```sh
npm install react-draggable
yarn add react-draggable
```

## Usage

### `Mindmap Props`
*   `defaultNodes` (`Array<NodeStructure>`, default: `[]`)\
    Use the Mindmap in an uncontrolled state, with state being managed by the Mindmap itself.
*   `nodes` (`Array<NodeStructure>`, default: `[]`)\
    Use the Mindmap in a controlled state, with the state being managed by yourself.
    This requires the use of onNodesChange for drag operations etc.
*   `onNodesChange` (`Array<NodeStructure>`, default: `[]`)\
    Specify a function to be invoked when the node set is changed, during drag operations etc.
*   `line` (`SVGProps<SVGPathElement>`, default: `undefined`)\
    Specify props to be passed to the mindmap connector line (pathing).
*   `noLine` (`boolean`, default: `false`)\
    Specify whether the mindmap connector line (pathing) should be hidden.
*   `nodeClassName` (`string`, default: `''`)\
    Specify a classname for the parent <div /> element for each Node.
*   `draggable` (`boolean`, default: `true`)\
    Specify whether all nodes should be draggable.
*   `draggableFn` (`(node: NodeStructure) => boolean`, default: `undefined`)\
    Specify whether a node should be draggable using a per node reference.
*   `renderNode` (`(node: NodeStructure) => ReactNode | ReactElement | JSX.Element`, default: `undefined`, required)\
    Specify a renderer for the node.

## Examples

### Simple Root and Child
This example shows how to create a simple root -> child Mindmap with draggable functionality. By default, a connecting line will be rendered between the nodes. All styling can be customised with the `renderNode` prop or the `line` prop. 

This is using the Mindmap in a controlled state, if you do not want to control the state of nodes yourself, you can use the `defaultNodes` prop instead of `nodes` and `onNodesChange`.

```tsx
import { Mindmap, type NodeStructure } from "@rileyy29/react-mindmap";
import { useState } from "react";

export default function Example() {
    const [nodes, setNodes] = useState<NodeStructure[]>([{
        id: 1,
        x: 455,
        y: 0,
        width: 200,
        height: 100,
        type: "ROOT",
        node: { title: 'Root Node' },
        childNodes: [
            {
                id: 2,
                x: 455,
                y: 150,
                width: 200,
                height: 100,
                type: "CHILD",
                node: { title: 'Child Node' },
                childNodes: []
            }
        ]
    }]);

    return <Mindmap draggable={true} renderNode={(node) => <div>{node.node.title}</div>} nodes={nodes} onNodesChange={setNodes} />
}
```
### Multiple Root and Child Node
This example shows how to create a multi root -> multi child Mindmap with draggable functionality. By default, a connecting line will be rendered between the nodes. All styling can be customised with the `renderNode` prop or the `line` prop. 

This is using the Mindmap in a controlled state, if you do not want to control the state of nodes yourself, you can use the `defaultNodes` prop instead of `nodes` and `onNodesChange`.

```tsx
import { Mindmap, type NodeStructure } from "@rileyy29/react-mindmap";
import { useState } from "react";

export default function Example() {
    const [nodes, setNodes] = useState<NodeStructure[]>([
        {
            id: 6,
            x: 455,
            y: 0,
            width: 200,
            height: 100,
            type: "ROOT",
            node: { title: 'Root Node 2' },
            childNodes: [
                {
                    id: 10,
                    x: 455,
                    y: 150,
                    width: 200,
                    height: 100,
                    type: "CHILD",
                    node: { title: 'Child Node 1 (Root 2)' },
                    childNodes: []
                }
            ]
        },
        {
            id: 1,
            x: 225,
            y: 0,
            width: 200,
            height: 100,
            type: "ROOT",
            node: { title: 'Root Node' },
            childNodes: [
                {
                    id: 2,
                    x: 225,
                    y: 150,
                    width: 200,
                    height: 100,
                    type: "CHILD",
                    node: { title: 'Child Node 1' },
                    childNodes: [
                        {
                            id: 3,
                            x: 15,
                            y: 280,
                            width: 200,
                            height: 100,
                            type: "CHILD",
                            node: { title: 'Child Node 2' },
                            childNodes: [],
                        },
                        {
                            id: 4,
                            x: 255,
                            y: 300,
                            width: 200,
                            height: 100,
                            type: "CHILD",
                            node: { title: 'Child Node 3' },
                            childNodes: [
                                {
                                    id: 23,
                                    x: 255,
                                    y: 420,
                                    width: 200,
                                    height: 100,
                                    type: "CHILD",
                                    node: { title: 'Child Node 4' },
                                    childNodes: [
                                        {
                                            id: 33,
                                            x: 255,
                                            y: 540,
                                            width: 125,
                                            height: 55,
                                            type: "CHILD",
                                            node: { title: 'Child Node 5' },
                                            childNodes: [],
                                        },
                                        {
                                            id: 36,
                                            x: 390,
                                            y: 540,
                                            width: 125,
                                            height: 55,
                                            type: "CHILD",
                                            node: { title: 'Child Node 6' },
                                            childNodes: [],
                                        },
                                        {
                                            id: 37,
                                            x: 525,
                                            y: 540,
                                            width: 125,
                                            height: 55,
                                            type: "CHILD",
                                            node: { title: 'Child Node 7' },
                                            childNodes: [],
                                        }
                                    ],
                                }
                            ],
                        }
                    ],
                },
            ],
        }
    ]);

    return <Mindmap draggable={true} renderNode={(node) => <div>{node.node.title}</div>} nodes={nodes} onNodesChange={setNodes} />
}

```

## Screenshots

![Nodes Screenshot](https://github.com/rileyy29/react-mindmap/assets/68727407/f1479b95-7e49-4652-bc94-cd819cda3f2b)


## License

[MIT][license] © Riley Rogerson

[build-badge]: https://github.com/rileyy29/react-mindmap/workflows/master/badge.svg
[build]: https://github.com/rileyy29/react-mindmap/actions

[downloads-badge]: https://img.shields.io/npm/dm/@rileyy29/react-mindmap.svg
[downloads]: https://www.npmjs.com/package/@rileyy29/react-mindmap

[size-badge]: https://img.shields.io/bundlephobia/minzip/@rileyy29/react-mindmap.svg
[size]: https://bundlephobia.com/package/@rileyy29/react-mindmap

[react]: http://reactjs.org
[npm]: https://docs.npmjs.com/cli/install
[yarn]: https://classic.yarnpkg.com/
[license]: license
