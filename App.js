import {StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';
import Login from './src/srceens/Login';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Signup from './src/srceens/Signup';
import HomePage from './src/srceens/HomePage';
import Profile from './src/srceens/BookMark';
import BookMark from './src/srceens/Profile';
import {AppContextProvider} from './src/ultil/AppContext';
import AppNavigator from './src/ultil/AppNavigator';

const App = () => {
  return (
    <AppContextProvider>
      <NavigationContainer>
          <AppNavigator/>
      </NavigationContainer>
    </AppContextProvider>


  );
};

export default App;
