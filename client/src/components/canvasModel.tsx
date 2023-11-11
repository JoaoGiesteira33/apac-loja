import * as THREE from 'three';
import { Suspense, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import { Box } from '@mui/material';

type ModalProps = {
    position: [number, number, number];
    url: string;
};

function Model(props: ModalProps) {
    // This reference will give us direct access to the THREE.Mesh object
    const ref = useRef<THREE.Mesh>(null!);
    // Hold state for hovered and clicked events
    //const [hovered, hover] = useState(false)
    //const [clicked, click] = useState(false)

    // Load 3D model
    const { scene } = useGLTF(props.url);

    /*return (
      <mesh
        {...props}
        ref={ref}
        onPointerOut={(event) => hover(false)}>
        geometry={nodes.shoe.geometry}
        material={materials.shoe}
      </mesh>
    )*/
    return <primitive {...props.position} ref={ref} object={scene} />;
}

export const CanvasModel = () => {
    return (
        <Box
            component="div"
            sx={{ width: '100%', height: '650px', backgroundColor: '#000000' }}>
            <Suspense fallback={<span>loading...</span>}>
                <Canvas>
                    <ambientLight intensity={Math.PI / 2} />
                    <spotLight
                        position={[10, 10, 10]}
                        angle={0.15}
                        penumbra={1}
                        decay={0}
                        intensity={Math.PI}
                    />
                    <pointLight
                        position={[-10, -10, -10]}
                        decay={0}
                        intensity={Math.PI}
                    />

                    {/* <Model position={[0, 0, -5]} url="/afgietsel_van_de_buste_van_nefertiti.glb"/>  */}
                    <Model
                        position={[0, 0, -5]}
                        url="/bread_roll_game_ready__2k_pbr.glb"
                    />

                    <OrbitControls position={[0, 0, 20]} />
                </Canvas>
            </Suspense>
        </Box>
    );
};
