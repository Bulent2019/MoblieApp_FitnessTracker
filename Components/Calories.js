import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function Calories() {

  const [distance, setDistance] = useState(0);
  const perkm = 62.5;

  return (
    <View style={styles.container}>
        <Text style={{fontSize: 32}}>Burned Calories: </Text>
        <Text style={{fontSize: 46, color: 'green', marginTop: 30}}>{distance * perkm}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});