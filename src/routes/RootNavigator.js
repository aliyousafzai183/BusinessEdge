import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  SplashScreen, LoginScreen,
  SignupScreen, ForgotPasswordScreen
} from '../screens/index';
import BottomTab from './BottomTab';
import RouteName from './RouteName';

const Stack = createNativeStackNavigator();

function RootNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator>

        <Stack.Screen
          name={RouteName.SPLASH_SCREEN}
          component={SplashScreen}
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen
          name={RouteName.LOGIN_SCREEN}
          component={LoginScreen}
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen
          name={RouteName.SIGNUP_SCREEN}
          component={SignupScreen}
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen
          name={RouteName.FORGOT_PASSWORD_SCREEN}
          component={ForgotPasswordScreen}
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen
          name={RouteName.BOTTOM_TAB}
          component={BottomTab}
          options={{
            headerShown: false
          }}
        />

      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default RootNavigator;