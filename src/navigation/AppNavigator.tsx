import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { View, Platform } from 'react-native';

import HomeScreen from '../screens/HomeScreen';
import LeaderboardScreen from '../screens/LeaderboardScreen';
import AlertsScreen from '../screens/AlertsScreen';
import ProfileScreen from '../screens/ProfileScreen';
import SettingsScreen from '../screens/SettingsScreen';
import LandingScreen from '../screens/LandingScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import MapScreen from '../screens/MapScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function MapPlaceholder() {
  return null; // or a simple view later
}

function BottomTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
         headerShown: false,
        tabBarActiveTintColor: '#004C9D',
        tabBarInactiveTintColor: '#7A8299',
        tabBarStyle: {
          height: 88,
          paddingTop: 8,
          paddingBottom: 24,
          backgroundColor: '#FFFFFF',
          borderTopWidth: 1,
          borderTopColor: '#EEF0F5',
        },
        tabBarIcon: ({ color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap = 'home-outline';

          if (route.name === 'Home') iconName = 'home-outline';
          else if (route.name === 'Leaderboard') iconName = 'trophy-outline';
          else if (route.name === 'Alerts') iconName = 'notifications-outline';
          else if (route.name === 'Map') iconName = 'map-outline';
          else if (route.name === 'Profile') iconName = 'person-outline';
          

          return (
  <View>
    <Ionicons name={iconName} size={size} color={color} />

    {route.name === 'Alerts' && (
      <View
        style={{
          position: 'absolute',
          top: -2,
          right: -4,
          width: 9,
          height: 9,
          borderRadius: 5,
          backgroundColor: '#E8883E',
          borderWidth: 1.5,
          borderColor: '#FFFFFF',
        }}
      />
    )}
  </View>
);;
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Leaderboard" component={LeaderboardScreen} options={{ title: 'Ranks' }} />
      <Tab.Screen name="Map" component={MapScreen} />
      <Tab.Screen name="Alerts" component={AlertsScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
      
      
    </Tab.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
  initialRouteName="Landing"
  screenOptions={{ headerShown: false }}
>
  <Stack.Screen name="Landing" component={LandingScreen} />
  <Stack.Screen name="Login" component={LoginScreen} />
  <Stack.Screen name="Register" component={RegisterScreen} />
  <Stack.Screen name="MainTabs" component={BottomTabs} />
  <Stack.Screen name="Settings" component={SettingsScreen} />
    </Stack.Navigator>
    </NavigationContainer>
  );
}