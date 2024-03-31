import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, View, TextInput, Button, FlatList } from 'react-native';
import Constants from 'expo-constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import WeatherBox from './WeatherBox';

export default function App() {
  const [cities, setCities] = useState([]);
  const [newCity, setNewCity] = useState('');

  useEffect(() => {
    const loadCities = async () => {
      try {
        const savedCities = await AsyncStorage.getItem('cities');
        if (savedCities) {
          setCities(JSON.parse(savedCities));
        }
      } catch (error) {
        console.error('Error loading cities:', error);
      }
    };

    loadCities();
  }, []);

  useEffect(() => {
    const saveCities = async () => {
      try {
        await AsyncStorage.setItem('cities', JSON.stringify(cities));
      } catch (error) {
        console.error('Error saving cities:', error);
      }
    };

    saveCities();
  }, [cities]);

  const addCity = () => {
    if (newCity.trim()) {
      setCities([...cities, newCity.trim()]);
      setNewCity('');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.innerContainer}>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={newCity}
            onChangeText={setNewCity}
            placeholder="Enter a city name"
          />
          <Button title="Add City" onPress={addCity} />
        </View>
        <FlatList
          data={cities}
          renderItem={({ item }) => <WeatherBox key={item} city={item} />}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: Constants.statusBarHeight,
  },
  innerContainer: {
    flex: 1,
    padding: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  input: {
    flex: 1,
    marginRight: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
});
