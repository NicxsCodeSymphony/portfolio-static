import {Canvas} from "@react-three/fiber";
import {Stars} from "@react-three/drei";

const StarsBg = () => {

        return(
            <Canvas style={{position: 'fixed', inset: 0}}>
                <Stars
                radius={100}
                depth={50}
                count={5000}
                factor={4}
                saturation={0}
                fade
                speed={1}
                />
            </Canvas>
        )

}

export default StarsBg