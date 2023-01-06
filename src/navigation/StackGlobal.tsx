import { createStackNavigator } from "@react-navigation/stack";
import { AddPhoto } from '../screens/home/AddPhoto';
import { TabsNavigation } from './TabsNavigation';
import { HomeScreen } from '../screens/home/HomeScreen';
import { colores } from '../theme/Colores';
import { MenuComponents } from "../components/MenuComponents";
import { InfoDocScreen } from "../screens/home/InfoDocScreen";
import { ActivityScreen } from '../screens/activity/ActivityScreen';
import { SettingScreen } from '../screens/home/SettingScreen';
import { EditProfile } from '../screens/setting/EditProfile';


export type RootStack = {
    HomeScreen: undefined,
    SettingScreen: undefined
    AddPhoto: undefined,
    InfoDocumento: undefined
    EditProfile: undefined
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



            {/* <Stack.Screen
                name="SettingScreen"
                component={SettingScreen}
            />


            <Stack.Screen
                name="AddPhoto"
                component={AddPhoto}
            />

            <Stack.Screen
                name="InfoDocumento"
                component={InfoDocScreen}
            />


            <Stack.Screen
                name="ActivityScreen"
                component={ActivityScreen}
            /> */}



        </Stack.Navigator>
    )
}
