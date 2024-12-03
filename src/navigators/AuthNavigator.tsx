import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {useEffect, useState} from 'react';
import {
  ForgotPassword,
  Login,
  OnboardingScreen,
  SignUp,
  Verification,
} from '../screens';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthNavigator = () => {
  const [isExistingUser, setIsExistingUser] = useState(false);

  const Stack = createNativeStackNavigator();

  useEffect(() => {
    checkExistingUser();
  }, []);

  const checkExistingUser = async () => {
    const res = await AsyncStorage.getItem('auth');

    res && setIsExistingUser(true);
  };

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      {!isExistingUser && (
        <Stack.Screen name="OnboardingScreen" component={OnboardingScreen} />
      )}
      <Stack.Screen name="LoginScreen" component={Login} />
      <Stack.Screen name="SignUpScreen" component={SignUp} />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
      <Stack.Screen name="Verification" component={Verification} />
    </Stack.Navigator>
  );
};

export default AuthNavigator;
