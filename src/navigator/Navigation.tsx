import {View, Text} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  SharedElement,
  createSharedElementStackNavigator,
} from 'react-navigation-shared-element';

//import Screens
import LoginScreen from '../screens/LoginScreen';
import HomeScreen from '../screens/HomeScreen';
import DetailScreen from '../screens/DetailScreen';

const Navigation = () => {
  const RootStack = createSharedElementStackNavigator();

  return (
    <NavigationContainer>
      <RootStack.Navigator
        screenOptions={{headerShown: false, presentation: 'modal'}}>
        <RootStack.Screen name="LoginScreen" component={LoginScreen} />
        <RootStack.Screen name="HomeScreen" component={HomeScreen} />
        <RootStack.Screen name="DetailScreen" component={DetailScreen} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
