import 'react-native-gesture-handler';
import React, { Component } from "react";
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import HomeScreen from "../content/homeScreen";
import Signup from "../content/Signup";
import Splash from "../content/splash";
import {DrawerFile} from "../content/drawer";
import Settings from "../content/settings";
import AuthDriver from "../content/AuthDriver";
import Drivers from "../content/drivers";
import Prices from "../content/prices";

const Stack = createStackNavigator();
const DrawerScreen = createDrawerNavigator();

function DrawerRoutes() {
  return (
    <DrawerScreen.Navigator
      drawerContent={props => <DrawerFile {...props} />}
      drawerStyle={{
        backgroundColor: 'rgba(0, 54, 58, 0.8)',
        // height: '70%',
        width: "70%",
        // borderBottomRightRadius: 20,
      }}>
      <DrawerScreen.Screen name="HomeScreen" component={HomeScreen} />
      <DrawerScreen.Screen name="Settings" component={Settings} />
      <DrawerScreen.Screen name="AuthDriver" component={AuthDriver} />
      <DrawerScreen.Screen name="Prices" component={Prices} />

    </DrawerScreen.Navigator>
  );
}

function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Splash" component={Splash} />
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name="HomeScreen" component={DrawerRoutes} />
        <Stack.Screen name="Drivers" component={Drivers} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Navigation;