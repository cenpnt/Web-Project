import React, { useRef, useState, useEffect } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls, Stage, useGLTF } from "@react-three/drei";
import ReservationBox from "../reserveBox/reserveBox";
import { room1, room2, room3 } from "../../constants";
import { Box, Flex, Button, Image } from "@chakra-ui/react";
import './Coworkingspace3D.css';

function Model({ onRoomClick }) {
  const gltf = useGLTF("/models/coworking5.gltf");

  const handleClick = (roomName) => {
    onRoomClick(roomName);
  };

  return (
    <primitive
      object={gltf.scene}
      onPointerDown={(e) => {
        if (e.object.name === "Room1") handleClick("Room1");
        else if (e.object.name === "Room2") handleClick("Room2");
        else if (e.object.name === "Room3") handleClick("Room3");
      }}
    />
  );
}

function CameraController({ view, zoom, resetTrigger }) {
  const { camera, gl } = useThree();
  const controlsRef = useRef();

  useEffect(() => {
    if (controlsRef.current) {
      if (view === "top") {
        camera.position.set(0, zoom, 0);
        controlsRef.current.target.set(0, 0, 0);
      } else if (view === "front") {
        camera.position.set(10000, 0, zoom + 5);
        controlsRef.current.target.set(0, 0, 0);
      } else {
        camera.position.set(0, 10, 0);
        controlsRef.current.target.set(0, 0, 0);
      }
      controlsRef.current.update();
    }
  }, [view, zoom, camera, resetTrigger]);

  return (
    <OrbitControls
      ref={controlsRef}
      args={[camera, gl.domElement]}
      minPolarAngle={0}
      maxPolarAngle={Math.PI / 2}
      minDistance={5}
      maxDistance={30}
    />
  );
}

export default function ModelViewer() {
  const [zoom, setZoom] = useState(20);
  const [view, setView] = useState("front");
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [resetTrigger, setResetTrigger] = useState(0);

  const handleViewChange = (newView) => {
    setView(newView);
    setZoom(10);
    setResetTrigger((prev) => prev + 1);
  };

  const handleRoomClick = (roomName) => {
    if (roomName === "Room1") setSelectedRoom(room1);
    else if (roomName === "Room2") setSelectedRoom(room2);
    else if (roomName === "Room3") setSelectedRoom(room3);
  };
  
  return (
    <Flex width="98%" height="80vh" padding="10px" justifyContent="center">
      <Box width={selectedRoom ? "70%" : "100%"} transition="width 0.3s ease-in-out" sx={{
          "@media (max-width: 1800px)": {
            width: selectedRoom ? "70%" : "100%", /* Smaller width for 1800px */
          },          "@media (max-width: 1400px)": {
            width: selectedRoom ? "60%" : "100%", /* Smaller width for 1800px */
          }
        }}>
        <Box width="100%" height="70vh" borderRadius="10px" margin="20px" backgroundColor="#101010">
          <Canvas>
            <color attach="background" args={["#101010"]} />
            <ambientLight intensity={0.5} />
            <directionalLight position={[10, 10, 5]} intensity={0.2} />

            <Stage environment={"city"} shadows={false}>
              <Model
                scale={1.3}
                receiveShadow={false}
                castShadow={false}
                onRoomClick={handleRoomClick}
              />
            </Stage>

            <CameraController
              view={view}
              zoom={zoom}
              resetTrigger={resetTrigger}
            />
          </Canvas>
        </Box>

        <Flex justifyContent="center" marginTop="10px">
          <Button onClick={() => handleViewChange("front")} margin="0 10px">Front View</Button>
          <Button onClick={() => handleViewChange("top")} margin="0 10px">Top View</Button>
          <Button onClick={() => handleViewChange("fit")} margin="0 10px" display="flex" alignItems="center">
            <Image
              src="https://cdn-icons-png.flaticon.com/128/14759/14759477.png"
              alt="Front View"
              width="30px"
              height="30px"
              marginRight="5px"
            />
            Fit Screen
          </Button>
        </Flex>
      </Box>

      {selectedRoom && (
        <Box width="30%" transition="width 0.3s ease-in-out">
          <ReservationBox
            roomName={selectedRoom.roomName}
            roomImage={selectedRoom.roomImage}
            amenities={selectedRoom.amenities}
            members={selectedRoom.members}
            onCloseBox={() => setSelectedRoom(null)}
          />
        </Box>
      )}
    </Flex>
  );
}