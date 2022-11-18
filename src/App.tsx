import React, { useCallback, useState } from 'react';
import './App.css';
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
  { id: "1", position: { x: 20, y: 20 }, data: { label: "Node 1" } },
  { id: "2", position: { x: 50, y: 100 }, data: { label: "Node 2" } },
  { id: "3", position: { x: 100, y: 200 }, data: { label: "Node 3" } },
  { id: "4", position: { x: 150, y: 400 }, data: { label: "Node 4" } },
  { id: "5", position: { x: 200, y: 300 }, data: { label: "Node 5" } },
];

const initialEdges = [
  { id: "e1-2", source: "1", target: "2", label: "to", type: "step" },
  { id: "e1-5", source: "1", target: "5", label: "to", type: "step" },
  { id: "e3-5", source: "3", target: "5", label: "to", type: "step" },
  { id: "e2-3", source: "2", target: "3", label: "to", type: "step" },
];

function App() {

  let fileReader: any;

  const fileRead = (e: any) => {
    const content = fileReader.result;
    console.log(content);
    const data= eval(content)
    setNodes(() => data)
  };

  const fileChosen = (file: any) => {
    fileReader = new FileReader();
    fileReader.onloadend = fileRead;
    fileReader.readAsText(file.target.files[0]);
  };

  const [name,setName]= useState('');
  const [posX, setPosX] = useState('');
  const [posY, setPosY] = useState('');


  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback((params:any) => setEdges((eds) => addEdge(params, eds)),[setEdges]);

  const clearNode = () => {
    setNodes(() => []);
  }

  const addNode = () => {
    console.log(name,posX,posY)
    setNodes((nodes) => {
      return [
        ...nodes,
        {
          id: name,
          position: { x: parseInt(posX), y: parseInt(posY) },
          data: { label: name },
        },
      ];
    })
  }

  const displaySchema = () => {
    console.log(nodes)
  }

  return (
    <>
      <div className="main">
        <div className="sidediv">
          <button className="button" onClick={() => clearNode()}>
            Clear
          </button>
          <br></br>
          <button
            className="button"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
          >
            Add
          </button>
          <br></br>
          <button className="button" onClick={() => displaySchema()}>
            Schema
          </button>
          <br></br>
          <div
            className="modal fade"
            id="exampleModal"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h1 className="modal-title fs-5" id="exampleModalLabel">
                    Add Node
                  </h1>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">
                  <input
                    className="form"
                    type="text"
                    placeholder="Node Name"
                    onChange={(e) => setName(e.target.value)}
                  />
                  <br></br>
                  <input
                    className="form"
                    type="number"
                    placeholder="Position X"
                    onChange={(e) => setPosX(e.target.value)}
                  />
                  <br></br>
                  <input
                    className="form"
                    type="number"
                    placeholder="Position Y"
                    onChange={(e) => setPosY(e.target.value)}
                  />
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    Close
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary"
                    data-bs-dismiss="modal"
                    onClick={() => addNode()}
                  >
                    Add
                  </button>
                </div>
              </div>
            </div>
          </div>
          <label htmlFor="file-input" className="labelLoad">
            Load
          </label>
          <input
            type="file"
            id="file-input"
            accept=".txt"
            onChange={(e) => fileChosen(e)}
          />
        </div>
        <div>
          <div className="form-floating">
            <textarea
              className="form-control"
              placeholder="Leave a comment here"
              id="floatingTextarea2"
              style={{ height: "980px", width: 400 }}
              value={JSON.stringify(nodes)}
            ></textarea>
            <label htmlFor="floatingTextarea2">Schema</label>
          </div>
        </div>
        <div style={{ height: 950, width: 800 }}>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
          >
            <MiniMap />
            <Controls />
            <Background />
          </ReactFlow>
        </div>
      </div>
    </>
  );
}

export default App;
