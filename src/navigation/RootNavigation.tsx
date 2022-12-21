import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StackAuth } from './StackAuth';


export const RootNavigation = () => {
  return (
    <NavigationContainer>
        <StackAuth/>
    </NavigationContainer>
  )
}
