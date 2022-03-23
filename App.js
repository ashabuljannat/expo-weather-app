import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  ActivityIndicator,
  SafeAreaView,
  Pressable,
} from "react-native";
import * as Location from "expo-location";
import Details from "./Components/Details";
import { Picker } from "@react-native-picker/picker";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";

export default function App() {
  const [errorMessage, setErrorMessage] = useState(null);
  const [currentWeather, setCurrentWeather] = useState(null);
  const number = "41e0bdc8b801423ebca172606222003";

  useEffect(() => {
    load();
  }, []);

  async function load() {
    setCurrentWeather(null);
    setErrorMessage(null);

    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMessage("Access to location is needed to run this app");
        return;
      }
      const location = await Location.getCurrentPositionAsync();
      const { latitude, longitude } = location.coords;
      const url = `http://api.weatherapi.com/v1/forecast.json?key=${number}&q=${latitude}, ${longitude}&days=1&aqi=yes&alerts=yes`;
      // const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${number}&units=${unitsSystem}`;
      const response = await fetch(url);
      const result = await response.json();
      //  console.log("forecastday", result?.forecast?.forecastday[0]?.hour[0]);

      if (response) {
        setCurrentWeather(result);
      } else {
        setErrorMessage(result.message);
      }
    } catch (error) {
      setErrorMessage(error.message);
    }
  }

  return (
    <LinearGradient
      colors={["#95e5f3", "#51b6f1"]}
      start={{
        x: 0,
        y: 0,
      }}
      end={{
        x: 1,
        y: 1,
      }}
      style={styles.container}
    >
      {/* <Picker
        style={styles.picker}
        selectedValue={unitsSystem}
        onValueChange={(itemValue) => setUnitsSystem(itemValue)}
      >
        <Picker.Item label="C°" value="metric" />
        <Picker.Item label="F°" value="imperial" />
      </Picker> */}
      <Pressable
        style={styles.reload}
        onPress={() => {
          load();
        }}
      >
        <Ionicons name="reload" color="green" size={25} />
      </Pressable>
      <StatusBar style="auto" />
      {errorMessage ? (
        <Text style={{ textAlign: "center" }}>{errorMessage}</Text>
      ) : currentWeather ? (
        <SafeAreaView>
          <Details currentWeather={currentWeather} />
        </SafeAreaView>
      ) : (
        <ActivityIndicator size="large" color="red" />
      )}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: "12%",
    paddingBottom: "10%",
  },
  reload: {
    position: "relative",
    top: 10,
    left: 20,
    height: 50,
    width: 50,
    alignContent: "center",
    justifyContent: "center",
  },
});
