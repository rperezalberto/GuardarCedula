
import { Canvas, Circle, Group } from '@shopify/react-native-skia'
import { colores } from '../theme/Colores';

export const CanvasComponent = () => {
    return (
        <Canvas style={{ height: 250 }}>
            <Group blendMode='multiply'>
                <Circle cx={130} cy={-100} r={350} color={colores.primary} />
                <Circle cx={400} cy={70} r={150} color={colores.primary} />
            </Group>
        </Canvas>
    )
}
