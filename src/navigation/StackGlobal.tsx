import { createStackNavigator } from "@react-navigation/stack";
import { TabsNavigation } from './TabsNavigation';
import { colores } from '../theme/Colores';;
import { EditProfile } from '../screens/setting/EditProfile';
import { UsersSetting } from '../screens/setting/UsersSetting';


export type RootStack = {
    HomeScreen: undefined,
    EditProfile: undefined
    UsersSetting: undefined
}




const Stack = createStackNavigator<RootStack>();

export const StackGlobal = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
                headerStyle: {
                    backgroundColor: colores.primary,
                },
                headerTitleStyle: {
                    color: colores.white
                },
                headerTintColor: colores.white
            }}
        >
            <Stack.Screen
                name="HomeScreen"
                component={TabsNavigation}
            // options={{
            //     title: "Cédulas",
            //     headerRight: () => <MenuComponents />
            // }}
            />

            <Stack.Screen

                name="EditProfile"
                component={EditProfile}
                options={{
                    title: "Editar Perfil",
                    headerShown: true,
                }}
            />



            <Stack.Screen
                name="UsersSetting"
                component={UsersSetting}
                options={{
                    title: "Usuarios",
                    headerShown: true,
                }}
            />

        </Stack.Navigator>
    )
}
