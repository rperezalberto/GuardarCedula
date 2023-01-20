import { View, ActivityIndicator } from 'react-native';
import { colores } from '../../theme/Colores';

export const ActivityScreen = () => {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#F7F7F7' }}>
            {/* <Image
                style={{ width: 300, height: 300 }}
                source={require('../../assets/logo.png')}
            /> */}
            <ActivityIndicator size={'large'} color={colores.primary} />
        </View>
    )
}
