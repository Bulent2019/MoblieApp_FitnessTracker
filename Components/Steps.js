import React, { useState } from "react";
import { FlatList, SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from "react-native";

// const DATA = [
//   {
//     id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
//     title: "First Item",
//   },
//   {
//     id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
//     title: "Second Item",
//   },
//   {
//     id: "58694a0f-3da1-471f-bd96-145571e29d72",
//     title: "Third Item",
//   },
// ];

// const Item = ({ item, onPress, backgroundColor, textColor }) => (
//   <TouchableOpacity onPress={onPress} style={[styles.item, backgroundColor]}>
//     <Text style={[styles.title, textColor]}>{item.title}</Text>
//   </TouchableOpacity>
// );

export default function Steps(props) {
  const [distance, setDistance] = useState(0);
  const perOneKm = 1300;


  return (
    <View style={styles.container}>
      <Text style={{fontSize: 32}}>Steps: </Text>
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
    // marginTop: StatusBar.currentHeight || 0,
  },
  // item: {
  //   padding: 5,
  //   marginVertical: 2,
  //   marginHorizontal: 20,
  // },
  // title: {
  //   fontSize: 20,
  // },
});
