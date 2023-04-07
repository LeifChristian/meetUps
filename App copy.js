import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

import Icon from 'react-native-vector-icons/Ionicons';
import HomeScreen from './HomeScreen';
import CreateEvent from './CreateEvent';
import InviteScreen from './InviteScreen';
import SettingsScreen from './SettingsScreen';
import CustomCalendar from './Calendar';
import { View, Text, useColorScheme } from 'react-native';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const App = () => {
  const colorScheme = useColorScheme();
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="HomeScreen"
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            switch (route.name) {
              case 'HomeScreen':
                iconName = focused ? 'search' : 'search-outline';
                break;
              case 'CreateEvent':
                iconName = focused ? 'add-circle' : 'add-circle-outline';
                break;
              case 'Invite':
                iconName = focused ? 'people' : 'people-outline';
                break;
              case 'Calendar':
                iconName = focused ? 'calendar' : 'calendar-outline';
                break;
              case 'Settings':
                iconName = focused ? 'settings' : 'settings-outline';
                break;
            }

            return <Icon name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: 'blue',
          inactiveTintColor: 'gray',
        }}
      >
      <Tab.Screen
  name="HomeScreen"
  component={HomeScreen}
  options={{ 
    title: 'Explore',
    tabBarStyle: { backgroundColor: 'black' }
  }}
/>

        <Tab.Screen
          name="CreateEvent"
          component={CreateEvent}
          options={{ title: 'Create Event',  tabBarStyle: { backgroundColor: 'black' } }}
          
        />
        <Tab.Screen
          name="Invite"
          component={InviteScreen}
          options={{ title: 'Invite',  tabBarStyle: { backgroundColor: 'black' } }}
        />
        <Tab.Screen
          name="Calendar"
          component={CustomCalendar}
          options={{ title: 'Calendar',  tabBarStyle: { backgroundColor: 'black' } }}
        />
        <Tab.Screen
          name="Settings"
          component={SettingsScreen}
          options={{ title: 'Settings',  tabBarStyle: { backgroundColor: 'black' } }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;
