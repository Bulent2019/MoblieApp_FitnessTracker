import React from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Calories from './Components/Calories';
import Map from './Components/Map';
import Home from './Components/Home';
import Timer from './Components/Timer';
import Steps from './Components/Steps';
import Calendar from './Components/Calendar';

const Stack = createStackNavigator();

export default function App() {

  return (
     <NavigationContainer style={styles.container}>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Calories" component={Calories} />
        <Stack.Screen name="Map" component={Map} />
        <Stack.Screen name="Calendar" component={Calendar} />
        <Stack.Screen name="Timer" component={Timer} />
        <Stack.Screen name="Steps" component={Steps} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    alignItems: 'flex-start',
  },
});

