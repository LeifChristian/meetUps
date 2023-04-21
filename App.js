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
import Setlist from './Setlist'
import { View, Text, useColorScheme } from 'react-native';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const App = () => {
  const colorScheme = useColorScheme();

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: 'black',
            headerStatusBarHeight: 0,
          },
          headerTintColor: 'black',
          headerTitleAlign: 'center',
        }}
      >
        <Stack.Screen
          name="Tabs"
          component={TabNavigator}
          options={({ route }) => ({
            title: null
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const TabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="HomeScreen"
      screenOptions={({ route }) => ({
        headerStyle: {
          backgroundColor: 'black', 
          headerStatusBarHeight: 0,
        }, headerTitleAlign: 'center',
        // headerTitleStyle: {
        //   borderBottomWidth: 0,
        //   borderTopWidth: 0,
        // },

        headerTitleStyle: {
          color: 'white', // set the color of the header title text to white
        },
        headerTitleContainerStyle: {
          borderBottomWidth: 0,
          borderTopWidth: 0,
        },
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
              case 'Setlist':
                iconName = focused ? 'musical-notes' : 'musical-notes-outline';
                return <Icon name={iconName} size={size} color={color} />;
                break;
            }
            return <Icon name={iconName} size={size} color={color} />;
          },
      })}
      tabBarOptions={{
        activeTintColor: 'blue',
        inactiveTintColor: 'gray',
      }}
      // add header background color here
    >
      {/* remove title prop from HomeScreen */}
      <Tab.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          tabBarStyle: { backgroundColor: 'black' },
          headerStyle: { backgroundColor: 'black' },
        }}
      />
      <Tab.Screen
        name="CreateEvent"
        component={CreateEvent}
        options={{
          title: 'Create Event',
          tabBarStyle: { backgroundColor: 'black' },
        }}
      />
      <Tab.Screen
        name="Invite"
        component={InviteScreen}
        options={{
          title: 'Invite',
          tabBarStyle: { backgroundColor: 'black' },
        }}
      />
      <Tab.Screen
        name="Calendar"
        component={CustomCalendar}
        options={{
          title: 'Calendar',
          tabBarStyle: { backgroundColor: 'black' },
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          title: 'Settings',
          tabBarStyle: { backgroundColor: 'black' },
        }}
      />

<Tab.Screen
        name="Setlist"
        component={Setlist}
        options={{
          tabBarStyle: { backgroundColor: 'black' },
          headerStyle: { backgroundColor: 'black' },
        }}
      />
    </Tab.Navigator>
  );
};


const getHeaderTitle = (route) => {
  const routeName = route.state
    ? route.state.routes[route.state.index].name
    : 'HomeScreen';

  return (
    <View style={{ backgroundColor: 'white', padding: 16 }}>
      <Text style={{ color: 'black', fontWeight: 'bold', textAlign: 'left' }}>
        {routeName}
      </Text>
    </View>
  );
};

export default App