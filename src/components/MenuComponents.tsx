
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { colores } from '../theme/Colores';
// import { StackScreenProps } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
// import { RootStack } from '../navigation/StackGlobal';


export const MenuComponents = () => {

    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.containerIcon}>
                <AntDesign name="search1" size={20} color={colores.white} />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate('SettingScreen')}>
                <AntDesign name="menuunfold" size={20} color={colores.white} />
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        marginHorizontal: 10
    },
    containerIcon: {
        marginHorizontal: 20
    }
})