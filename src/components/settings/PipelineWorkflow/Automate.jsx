import React, { useState } from 'react';
import Xarrow from 'react-xarrows';
import Draggable from 'react-draggable';

const Automate = () => {
  const [arrows, setArrows] = useState([]);

  const handleArrowDrag = (index, pos) => {
    const updatedArrows = [...arrows];
    updatedArrows[index].start = pos;
    setArrows(updatedArrows);
  };

  const addArrow = (startId, endId) => {
    const updatedArrows = [
      ...arrows,
      { start: startId, end: endId },
    ];
    setArrows(updatedArrows);
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <div style={{ position: 'relative', width: '600px', height: '400px' }}>
        {arrows.map((arrow, index) => (
          <Xarrow
            key={index}
            start={arrow.start}
            end={arrow.end}
            color="blue"
          />
        ))}

        <Draggable defaultPosition={{ x: 100, y: 100 }}>
          <div style={{ width: '80px', height: '40px', background: 'lightgreen', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            Node 1
          </div>
        </Draggable>

        <Draggable defaultPosition={{ x: 300, y: 100 }}>
          <div style={{ width: '80px', height: '40px', background: 'lightgreen', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            Node 2
          </div>
        </Draggable>

        <Draggable defaultPosition={{ x: 200, y: 300 }}>
          <div style={{ width: '80px', height: '40px', background: 'lightgreen', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            Node 3
          </div>
        </Draggable>
      </div>
      <button onClick={() => addArrow(0, 1)}>Connect Node 1 and Node 2</button>
      <button onClick={() => addArrow(1, 2)}>Connect Node 2 and Node 3</button>
    </div>
  );
};

export default Automate;
