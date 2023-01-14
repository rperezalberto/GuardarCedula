import { createStackNavigator } from "@react-navigation/stack";
import { TabsNavigation } from './TabsNavigation';
import { colores } from '../theme/Colores';;
import { EditProfile } from '../screens/setting/EditProfile';
import { UsersSetting } from '../screens/setting/UsersSetting';
import { AddPhoto } from "../screens/home/AddPhoto";
import { AddUser } from '../screens/setting/AddUser';
import { InfoDocScreen } from '../screens/home/InfoDocScreen';
import { InfUser } from '../screens/setting/InfUser';
import { PrivacyPolicy } from '../screens/setting/PrivacyPolicy';


export type RootStack = {
    HomeScreen: undefined
    EditProfile: undefined
    UsersSetting: undefined
    AddPhoto: undefined
    AddUser: undefined
    InfoDocumento: undefined
    InfUser: undefined
    PrivacyPolicy: undefined
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
                options={{
                    title: "Cédulas",
                    // headerRight: () => <MenuComponents />
                }}
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
            <Stack.Screen
                name="AddPhoto"
                component={AddPhoto}
                options={{
                    title: "Usuarios",
                    headerShown: true,
                }}
            />

            <Stack.Screen
                name="AddUser"
                component={AddUser}
                options={{
                    title: "Agregar Usuarios",
                    headerShown: true,
                }}
            />

            <Stack.Screen
                name="InfoDocumento"
                component={InfoDocScreen}
                options={{
                    title: "Informacion de la Cédula",
                    headerShown: true,
                }}
            />

            <Stack.Screen
                name="InfUser"
                component={InfUser}
                options={{
                    title: "Usuario",
                    headerShown: true,
                }}
            />
            <Stack.Screen
                name="PrivacyPolicy"
                component={PrivacyPolicy}
                options={{
                    title: "Política y privacidad",
                    headerShown: true,
                }}
            />



        </Stack.Navigator>
    )
}
