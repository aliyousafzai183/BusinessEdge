import * as React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import {
  HomeScreen, TodoScreen,
  ContactScreen, SettingScreen
} from '../screens/index';
import RouteName from './RouteName';
import colors from '../utils/colors';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const Tab = createMaterialBottomTabNavigator();

function BottomTab() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      activeColor={colors.background}
      inactiveColor={colors.text}
      barStyle={{ backgroundColor: colors.primary }}
    >
      <Tab.Screen
        name={RouteName.HOME_SCREEN}
        component={HomeScreen}
        options={{
          headerShown: false,
          tabBarLabel: 'P&L Report',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="chart-line" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name={RouteName.TODO_SCREEN}
        component={TodoScreen}
        options={{
          headerShown: false,
          tabBarLabel: 'Todo',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="format-list-checks" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name={RouteName.CONTACT_SCREEN}
        component={ContactScreen}
        options={{
          headerShown: false,
          tabBarLabel: 'Contacts',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="account-group" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name={RouteName.SETTING_SCREEN}
        component={SettingScreen}
        options={{
          headerShown: false,
          tabBarLabel: 'More',
          tabBarIcon: ({ color }) => (
            <FontAwesome name="gear" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default BottomTab;
