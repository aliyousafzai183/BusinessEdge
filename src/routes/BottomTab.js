import * as React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import {
  HomeScreen, TodoScreen,
  ContactScreen, SettingScreen
} from '../screens/index';
import RouteName from './RouteName';

const Tab = createMaterialBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name={RouteName.HOME_SCREEN}
        component={HomeScreen}
        options={{
          header: false
        }}
      />
      <Tab.Screen
        name={RouteName.TODO_SCREEN}
        component={TodoScreen}
        options={{
          header: false
        }}
      />
      <Tab.Screen
        name={RouteName.CONTACT_SCREEN}
        component={ContactScreen}
        options={{
          header: false
        }}
      />
      <Tab.Screen
        name={RouteName.SETTING_SCREEN}
        component={SettingScreen}
        options={{
          header: false
        }}
      />
    </Tab.Navigator>
  );
}