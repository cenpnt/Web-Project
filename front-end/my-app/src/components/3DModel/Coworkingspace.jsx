import React, { useRef, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PresentationControls, Stage, useGLTF } from '@react-three/drei';
import './Coworkingspace.css';

function Model({ onRoomClick }) {
  const gltf = useGLTF('/models/coworking4.gltf');

  // Adding click event to each room
  const handleClick = (roomName) => {
    onRoomClick(roomName);
  };

  return (
    <primitive
      object={gltf.scene}
      onPointerDown={(e) => {
        // Check for specific clicked room by object name
        if (e.object.name === 'Room1') handleClick('Room1');
        else if (e.object.name === 'Room2') handleClick('Room2');
        else if (e.object.name === 'Room3') handleClick('Room3');
      }}
    />
  );
}

export default function ModelViewer() {
  const orbitRef = useRef();
  const [zoom, setZoom] = useState(20);
  const [view, setView] = useState('front');
  const [defaultPosition, setDefaultPosition] = useState([5, 0, 20]);
  const [defaultTarget, setDefaultTarget] = useState([0, 0, 0]);

  const handleViewChange = (view) => {
    if (orbitRef.current) {
      const controls = orbitRef.current;
      const camera = controls.object;

      if (view === 'top') {
        setView('top');
        camera.position.set(0, 25, 0);
        controls.target.set(0, 0, 0);
      } else if (view === 'front') {
        setView('front');
        camera.position.set(...defaultPosition);
        controls.target.set(...defaultTarget);
      }

      controls.update();
    }
  };

  const handleZoom = (direction) => {
    if (direction === 'in' && zoom > 5) setZoom(zoom - 1);
    if (direction === 'out' && zoom < 30) setZoom(zoom + 1);
  };

  useEffect(() => {
    if (orbitRef.current) {
      orbitRef.current.object.position.set(5, 0, zoom);
      orbitRef.current.update();
    }
  }, [zoom]);

  // Action when a room is clicked
  const handleRoomClick = (roomName) => {
    console.log(`You clicked on ${roomName}`); // Replace this with desired action
  };

  return (
    <div className="modelcontainer">
      <Canvas
        camera={{ position: [5, 0, zoom], fov: 30 }}
        style={{ width: '1000px', height: '550px', borderRadius: '10px', margin: '20px' }}
      >
        <color attach="background" args={['#101010']} />
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={0.2} />

        <PresentationControls speed={1.0} polar={[0, Math.PI / 18]}>
          <Stage environment={'city'} shadows={false}>
            <Model scale={0.4} receiveShadow={false} castShadow={false} onRoomClick={handleRoomClick} />
          </Stage>
        </PresentationControls>

        <OrbitControls
          ref={orbitRef}
          enableZoom={false}
          minPolarAngle={0}
          maxPolarAngle={Math.PI / 2}
        />
      </Canvas>

      <div className="button-container" style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
        <button onClick={() => handleViewChange('front')}>Front View</button>
        <button onClick={() => handleViewChange('top')}>Top View</button>
        <button onClick={() => handleZoom('in')}>+ Zoom In</button>
        <button onClick={() => handleZoom('out')}>- Zoom Out</button>
      </div>
    </div>
  );
}
