import React from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  ScrollView,
  SafeAreaView,
} from "react-native";
import {
  Ionicons,
  SimpleLineIcons,
  MaterialIcons,
  Feather,
  AntDesign,
} from "@expo/vector-icons";
import Hourly from "./Hourly";


export default function Details({ currentWeather }) {
  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.container}>
          <Text style={styles.city}>{currentWeather?.location.name}</Text>
          <Text style={styles.city}>{currentWeather?.location.country}</Text>
          <Text style={styles.date}>{currentWeather?.location.localtime}</Text>
          <Image
            source={{ uri: `https:${currentWeather?.current.condition.icon}` }}
            style={{ width: 120, height: 120 }}
          />
          <Text style={styles.date}>
            Update: {currentWeather?.current.last_updated}
          </Text>
          <Text style={styles.temp}>
            {currentWeather?.current.temp_c}°C /{" "}
            {currentWeather?.current.temp_f}°F
          </Text>
          <Text style={styles.main}>
            {currentWeather?.current.condition.text}
          </Text>

          <View style={styles.rain}>
            <Ionicons name="cloud" style={styles.icon} />
            <Text style={styles.cloud}> Cloud: </Text>
            <Text style={styles.cloud}>{currentWeather?.current.cloud}%</Text>
          </View>

          <Text style={styles.todayTemp}>
            Today Temp: {currentWeather?.forecast?.forecastday[0].day.maxtemp_c}
            °C ~ {currentWeather?.forecast?.forecastday[0].day.mintemp_c}°C
          </Text>

          <View style={styles.rain}>
            <Text style={styles.paragraph}> Raining: </Text>
            <Text>
              {currentWeather?.forecast?.forecastday[0].day
                .daily_will_it_rain === 1 ? (
                <Ionicons name="umbrella" style={styles.icon} />
              ) : (
                <MaterialIcons name="umbrella" style={styles.icon} />
              )}
            </Text>
          </View>
          <Hourly currentWeather={currentWeather?.forecast?.forecastday[0].hour} />
          <View style={styles.details}>
            <View style={styles.detail}>
              <Feather name="sunrise" style={styles.icon} />
              <View>
                <Text style={styles.paragraph}>Sunrise</Text>
                <Text style={styles.paragraph}>
                  {currentWeather?.forecast?.forecastday[0].astro.sunrise}
                </Text>
              </View>
            </View>
            <View style={styles.detail}>
              <Feather name="sunset" style={styles.icon} />
              <View>
                <Text style={styles.paragraph}>Sunset</Text>
                <Text style={styles.paragraph}>
                  {currentWeather?.forecast?.forecastday[0].astro.sunset}
                </Text>
              </View>
            </View>
          </View>
          <View style={styles.details}>
            <View style={styles.detail}>
              <Ionicons name="water-outline" style={styles.icon} />
              <View>
                <Text style={styles.paragraph}> Humidity</Text>
                <Text style={styles.paragraph}>
                  {currentWeather?.current.humidity}%
                </Text>
              </View>
            </View>
            <View style={styles.detail}>
              <SimpleLineIcons name="speedometer" style={styles.icon} />
              <View>
                <Text style={styles.paragraph}> Pressure</Text>
                <Text style={styles.paragraph}>
                  {currentWeather?.current.pressure_mb}mb
                </Text>
              </View>
            </View>
          </View>
          <View style={styles.details}>
            <View style={styles.detail}>
              <Feather name="wind" style={styles.icon} />
              <View>
                <Text style={styles.paragraph}>Wind</Text>
                <Text style={styles.paragraph}>
                  {currentWeather?.current.wind_kph} kph
                </Text>
              </View>
            </View>
            <View style={styles.detail}>
              <AntDesign name="find" style={styles.icon} />
              <View>
                <Text style={styles.paragraph}>Direction</Text>
                <Text style={styles.paragraph}>
                  {currentWeather?.current.wind_degree}°{" "}
                  {currentWeather?.current.wind_dir}
                </Text>
              </View>
            </View>
          </View>
          <View style={styles.details}>
            <View style={styles.detail}>
              <Feather name="sun" style={styles.icon} />
              <View>
                <Text style={styles.paragraph}>UV Index:</Text>
                <Text
                  style={[
                    styles.paragraph,
                    {
                      color: currentWeather?.current.uv <= 7 ? "yellow" : "red",
                    },
                  ]}
                >
                  {currentWeather?.current.uv}
                </Text>
              </View>
            </View>
            <View style={styles.detail}>
              <MaterialIcons name="visibility" style={styles.icon} />
              <View>
                <Text style={styles.paragraph}> Visibility: </Text>
                <Text style={styles.paragraph}>
                  {currentWeather?.current.vis_km} km
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 15,
  },
  city: {
    fontSize: 23,
    fontWeight: "bold",
    marginVertical: 4,
  },
  date: {
    fontSize: 16,
  },
  main: {
    fontSize: 24,
    fontWeight: "bold",
    fontStyle: "italic",
  },
  description: {
    fontSize: 17,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 3,
    textTransform: "capitalize",
  },
  details: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  detail: {
    flexDirection: "row",
    height: 70,
    width: "50%",
    borderWidth: 1,
    borderColor: "#d3f1a3",
    justifyContent: "space-around",
    alignItems: "center",
  },
  rain: {
    flexDirection: "row",
    marginVertical: 10,
    justifyContent: "space-around",
    alignItems: "center",
  },
  paragraph: {
    fontSize: 18,
    textAlign: "center",
    fontWeight: "400",
  },
  icon: {
    color: "#e6f595",
    fontSize: 30,
    fontWeight: "bold",
  },
  temp: {
    fontSize: 25,
  },
  todayTemp: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 5,
  },
  cloud: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
