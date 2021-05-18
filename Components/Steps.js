import React, { useState } from "react";
import {  StatusBar, StyleSheet, Text, View } from "react-native";

export default function Steps(props) {
  const [distance, setDistance] = useState(0);
  const perOneKm = 1300;


  return (
    <View style={styles.container}>
      <Text style={{fontSize: 32}}>Steps: </Text>
      <Text style={{fontSize: 14}}>Average steps per km ~1300.</Text>
      <Text style={{fontSize: 46, color: 'green', marginTop: 30}}>{distance * perOneKm}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    padding: 5,
    marginVertical: 2,
    marginHorizontal: 20,
  },
  title: {
    fontSize: 20,
  },
});
