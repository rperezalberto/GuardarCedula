import { createStackNavigator } from "@react-navigation/stack";
import { SignIn } from '../screens/auth/SignIn';
import { SignUp } from '../screens/auth/SignUp';

const Stack = createStackNavigator();

export const StackAuth = () => {
  return (
    <Stack.Navigator
      initialRouteName="SignIn"
      screenOptions={{
        headerShown: false
      }}
    >
      <Stack.Screen
        name="SignIn"
        component={SignIn}
      />

      <Stack.Screen
        name="SignUp"
        component={SignUp}
      />
    </Stack.Navigator>
  )
}
