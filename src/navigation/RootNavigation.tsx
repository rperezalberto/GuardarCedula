import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StackAuth } from './StackAuth';
import { useAppSelector } from '../hook/hook';
// import { TabsNavigation } from './TabsNavigation';
import { StackGlobal } from './StackGlobal';


export const RootNavigation = () => {
  return (
    <NavigationContainer>
      <_NavigationActive />
    </NavigationContainer>
  )
}


const _NavigationActive = () => {
  const { token } = useAppSelector(state => state.auth);
  return (token) ? <StackGlobal /> : <StackAuth />
}