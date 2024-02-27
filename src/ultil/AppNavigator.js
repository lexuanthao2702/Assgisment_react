import {StyleSheet, Text, View, Image} from 'react-native';
import React, {useContext} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Login from '../srceens/Login';
import Signup from '../srceens/Signup';
import {AppContext} from './AppContext';
import HomePage from '../srceens/HomePage';
import Profile from '../srceens/BookMark';
import BookMark from '../srceens/Profile';
import NewsDetail from '../srceens/NewsDetail';
// login sign = > stack
const Stack = createNativeStackNavigator();
const User = () => {
  return (
    <Stack.Navigator initialRouteName="Login" >
      <Stack.Screen name="Login" component={Login} options={{headerShown: false}}/>
      <Stack.Screen name="Signup" component={Signup} options={{headerShown: false}}/>
    </Stack.Navigator>
  );
};
// home  profile, => tabNavigation
const Tab = createBottomTabNavigator();
const Main = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          if (route.name === 'NewHome') {
            return (
              <Image
                source={require('../img/home.png')}
              />
            );
          } else if (route.name === 'Profile') {
            return (
              <Image
                source={require('../img/bookmark.png')}
              />
            );
          } else if (route.name === 'BookMark') {
            return (
              <Image
                source={require('../img/profile.png')}
              />
            );
          }
        },
        tabBarActiveTintColor: 'blue',
        tabBarInactiveTintColor: 'gray',
      })}>
      <Tab.Screen
        name="NewHome"
        component={NewHome}
        options={{headerShown: false, title: 'Home'}}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{headerShown: false, title: 'Bookmark'}}
      />
      <Tab.Screen
        name="BookMark"
        component={BookMark}
        options={{headerShown: false, title: 'Profile'}}
      />
    </Tab.Navigator>
  );
};
const NewHome = () => {
  return(
    <Stack.Navigator>
      <Stack.Screen name="HomePage" component={HomePage} options={{headerShown: false}}/>
      <Stack.Screen name="NewsDetail" component={NewsDetail} options={{headerShown: false}}/>
    </Stack.Navigator>
  )
}

const AppNavigator = () => {
  const {isLogin} = useContext(AppContext);
  return <>{isLogin == false ? <User /> : <Main />}</>;
};

export default AppNavigator;
