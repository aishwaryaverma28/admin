import React, { useCallback } from "react";
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
} from "reactflow";

import "reactflow/dist/style.css";

const initialNodes = [
  { id: "1", position: { x: 50, y: 50 }, data: { label: "Enquiry Recieved" } },
  { id: "2", position: { x: 250, y: 50 }, data: { label: "Qualification" } },
  { id: "3", position: { x: 450, y: 50 }, data: { label: "Site Visited" } },
  { id: "4", position: { x: 650, y: 50 }, data: { label: "All docs Recieved" } },
  { id: "5", position: { x: 850, y: 50 }, data: { label: "Compliance" } },
];
const initialEdges = [{ id: "e1-2-3", source: "1", target: "2" }];

export default function EditWorkflow() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  return (
    <div style={{ width: "100%", height: "100vh"}}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
      >
        <Controls />
        <MiniMap />
        <Background variant="dots" gap={12} size={1} />
      </ReactFlow>
    </div>
  );
}
