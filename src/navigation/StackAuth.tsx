import { createStackNavigator } from "@react-navigation/stack";
import { SignIn } from '../screens/auth/SignIn'; 

const Stack = createStackNavigator();

export const StackAuth = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false
      }}
    >
        <Stack.Screen 
          name="SignIn" 
          component={SignIn} 
        />
    </Stack.Navigator>
  )
}
