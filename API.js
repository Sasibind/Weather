const API_KEY = '49a965df1e194cf29c3205652243003';

export const fetchWeatherData = async (city) => {
  try {
    const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(`Error fetching weather data: ${error.message}`);
  }
};
