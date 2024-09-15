import React, { useRef, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PresentationControls, Stage, useGLTF } from '@react-three/drei';
import './Coworkingspace.css'

function Model() {
  const gltf = useGLTF('/models/1762758.gltf'); // Adjust the path if necessary
  return <primitive object={gltf.scene} />;
}

export default function ModelViewer() {
  const orbitRef = useRef(); // Ref for OrbitControls
  const [zoom, setZoom] = useState(20); // Initial zoom distance
  const [view, setView] = useState('front'); // Default view ('front' or 'top')

  // Function to change camera view
  const handleViewChange = (view) => {
    if (orbitRef.current) {
      const camera = orbitRef.current.object; // Get camera from OrbitControls ref
      if (view === 'top') {
        setView('top');
        camera.position.set(0, 25, 0); // Move camera to top view
      } else {
        setView('front');
        camera.position.set(5, 0, 20); // Move camera to front view
      }
      orbitRef.current.update(); // Ensure the OrbitControls are updated
    }
  };

  // Function to zoom in or out
  const handleZoom = (direction) => {
    if (direction === 'in' && zoom > 5) setZoom(zoom - 1);
    if (direction === 'out' && zoom < 30) setZoom(zoom + 1);
  };

  useEffect(() => {
    if (orbitRef.current) {
      orbitRef.current.object.position.set(5, 0, zoom); // Adjust zoom
      orbitRef.current.update();
    }
  }, [zoom]);

  return (
    <div className='modelcontainer'>
      <Canvas 
        camera={{ position: [5, 0, zoom], fov: 45 }} 
        style={{ width: "1000px", height: "550px", borderRadius: "10px", margin: "20px" }}
      >
        <color attach="background" args={["#101010"]}/>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />

        <PresentationControls speed={1.0} global zoom={.5} polar={[-0.1, Math.PI/4]}>
          <Stage environment={"city"} shadows={false}>
            <Model scale={0.5} receiveShadow={false} castShadow={false} />
          </Stage>
        </PresentationControls>

        <OrbitControls 
          ref={orbitRef}
          enableZoom={false} // Disable wheel zoom, using buttons instead
          minPolarAngle={0}
          maxPolarAngle={Math.PI/2}
        />
      </Canvas>
                {/* Buttons for controlling view and zoom */}
        <div className="button-container" style={{ display: 'flex', justifyContent: 'center', marginTop: '10px'}}>
            <button onClick={() => handleViewChange('front')}>Front View</button>
            <button onClick={() => handleViewChange('top')}>Top View</button>
            <button onClick={() => handleZoom('in')}>+ Zoom In</button>
            <button onClick={() => handleZoom('out')}>- Zoom Out</button>
        </div>
    </div>
  );
}
