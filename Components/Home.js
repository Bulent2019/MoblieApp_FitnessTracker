import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Ionicons, MaterialCommunityIcons, FontAwesome, EvilIcons }  from '@expo/vector-icons';
import { Icon } from 'react-native-elements';

export default function Home( { navigation } ) {

  return (
    <View style={styles.container}>
      <View style={styles.options}>
        <Icon  name="map" size={80} color='red' title='Map' backgroundColor='grey' 
          onPress={() => {navigation.navigate('Map');}}
          />
        <EvilIcons name='calendar' size={70} color='#000'
          onPress={() => {navigation.navigate('MyCalendar');}}
        />
        <MaterialCommunityIcons name='foot-print' size={70} title='Steps' color='#000'
          onPress={() => {navigation.navigate('Steps');}}
        />
        <FontAwesome name='fire' size={50} color='#000'
          onPress={() => {navigation.navigate('Calories');}}
        />
      </View>
        
      <View style={styles.trainingStart}>
        <Ionicons
          name="stopwatch"
          title="Stop Watch"
          color="#000"
          size={120}
          onPress={() => {
            navigation.navigate('Timer');
          }}       
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#adadad',
    alignItems: 'center',
    justifyContent: 'center',
  },
  options: {
    flex: 2,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginTop: 40,
    borderRadius: 40,
  },
  trainingStart: {
    flex: 1,
    alignItems: 'center',
    marginTop: 20,
  }
});