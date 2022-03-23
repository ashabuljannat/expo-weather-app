import { View, Text, StyleSheet, FlatList, Image } from "react-native";
import React, { useState } from "react";

export default function Hourly({ currentWeather }) {
  const [data, setData] = useState(currentWeather);

  return (
    <>
    <Text style={styles.title}>Hourly Weather</Text>
    <FlatList
    horizontal={true}
      data={data}
      keyExtractor={key => {return key.time}}      
      renderItem={({item}) => {        
        return (
          <View style={styles.container}>
            <Text>{item.time}</Text>
            <Image
            source={{ uri: `https:${item.condition.icon}` }}
            style={{ width: 50, height: 50}}
          />
            <Text>{item.temp_c} °C</Text>
            <Text>{item.condition.text}</Text>
            <Text>Cloud: {item.cloud}</Text>
          </View>
        );
      }}  
    />
    </>
  );
};
const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
   borderWidth: 2,
    borderColor: "#d3f1a3",
    paddingHorizontal: 10,
  },  
  container: {
    height: 150,
    width: 135,    
    borderWidth: 1,
    borderColor: "#d3f1a3",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
});
