import React, { useState, useEffect } from 'react';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ActivityIndicator, View, Text } from 'react-native';



import LoginScreen from './screens/LoginScreen';
import MainScreen from './screens/MainScreen';
import CreateAccountScreen from './screens/CreateAccountScreen';
import SettingsScreen from './screens/SettingsScreen';
import DeckScreen from './screens/DeckScreen';
import ReviewDeckScreen from './screens/ReviewDeckScreen';

const Stack = createNativeStackNavigator();

function AuthFlow() {
  const [authState, setAuthState] = useState('Loading...');
  const navigation = useNavigation();

  useEffect(() => {
    const checkAuthToken = async () => {
      try {
        const token = await AsyncStorage.getItem('authToken');
        if (token) {
          setAuthState('LoggedIn');
          navigation.navigate('Main');
        } else {
          setAuthState('NotLoggedIn');
          navigation.navigate('Login');
        }
      } catch (error) {
        console.error('Error checking auth token:', error);
        setAuthState('Error');
        navigation.navigate('Login');
      }
    };

    checkAuthToken();
  }, [navigation]);

  if (authState === 'Loading...') {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return null; // Still returning null - consider what you want to render here if needed
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Auth" component={AuthFlow} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="CreateAccount" component={CreateAccountScreen} />
        <Stack.Screen name="Main" component={MainScreen} />
        <Stack.Screen name="Settings" component={SettingsScreen} />
        <Stack.Screen name="Deck" component={DeckScreen} />
        <Stack.Screen name="ReviewDeck" component={ReviewDeckScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}