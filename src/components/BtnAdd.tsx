import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { colores } from '../theme/Colores';


interface Btn {
    icon?: any,
    size: number,
    color: string,
    onPress: () => void
}


export const BtnAdd = ({ icon, size, color, onPress }: Btn) => {
    return (
        <TouchableOpacity style={styles.contianer} onPress={onPress}>
            <MaterialIcons name={icon} size={size} color={color} />
        </TouchableOpacity>
    )
}
const styles = StyleSheet.create({
    contianer: {
        bottom: 15,
        right: 10,
        width: 70,
        height: 70,
        position: 'absolute',
        backgroundColor: colores.secundary,
        borderRadius: 100,
        justifyContent: 'center',
        alignItems: 'center'

    }
})