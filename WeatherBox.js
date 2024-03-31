import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { fetchWeatherData } from './API';

const WeatherBox = ({ city }) => {
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchWeatherData(city);
        setWeatherData(data);
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    };

    fetchData();
  }, [city]);

  return (
    <View style={styles.container}>
      {weatherData && (
        <>
          <Text style={styles.city}>
            {weatherData.location.name}, {weatherData.location.country}
          </Text>
          <Text style={styles.description}>{weatherData.current.condition.text}</Text>
          <Text style={styles.temperature}>{weatherData.current.temp_c}°C</Text>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    padding: 20,
    marginVertical: 10,
  },
  city: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  temperature: {
    fontSize: 16,
  },
  description: {
    fontSize: 16,
    fontStyle: 'italic',
  },
});

export default WeatherBox;
