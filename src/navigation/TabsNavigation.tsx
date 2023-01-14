import { Pressable, Text } from 'react-native';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { HomeScreen } from '../screens/home/HomeScreen';
import { SearchScreen } from '../screens/home/SearchScreen';
import { SettingScreen } from '../screens/home/SettingScreen';
import { MaterialIcons } from '@expo/vector-icons';
import { colores } from '../theme/Colores';
import { useAppDispatch } from '../hook/hook';
import { resultSearch } from '../feacture/authSlice';

const Tabs = createBottomTabNavigator();


export const TabsNavigation = () => {
    const dispatch = useAppDispatch();
    return (
        <Tabs.Navigator
            screenOptions={{
                headerStyle: {
                    backgroundColor: colores.primary,
                },
                headerTitleStyle: {
                    color: colores.white
                },
                tabBarLabelStyle: {
                    fontSize: 12,
                },
                tabBarActiveTintColor: colores.white,
                tabBarInactiveTintColor: colores.secundary,
                tabBarStyle: {
                    backgroundColor: colores.primary
                },
            }}
        >
            <Tabs.Screen
                name="Home"
                component={HomeScreen}
                options={{
                    headerTitle: 'Listado de cédulas',
                    title: 'Cédulas',
                    tabBarIcon: ({ color, size }) => <MaterialIcons name="home" size={size} color={color} />
                }}
            />
            <Tabs.Screen
                name="Search"
                component={SearchScreen}
                options={{
                    title: 'Buscar',
                    tabBarIcon: ({ color, size }) => <MaterialIcons name="search" size={size} color={color} />,
                }}
            />
            <Tabs.Screen
                name="Setting"
                component={SettingScreen}
                options={{
                    title: 'Configuracion',
                    tabBarIcon: ({ color, size }) => <MaterialIcons name="settings" size={size} color={color} />
                }}
            />
        </Tabs.Navigator>
    )
}