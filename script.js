const inputBox = document.querySelector('.input-box');
const searchBtn = document.getElementById('searchBtn');
const weather_img = document.querySelector('.weather-img');
const temperature = document.querySelector('.temperature');
const description = document.querySelector('.description');
const humidity = document.getElementById('humidity');
const wind_speed = document.getElementById('wind-speed');

const location_not_found = document.querySelector('.location-not-found');
const weather_body = document.querySelector('.weather-body');

async function checkWeather(city) {
  const api_key = "ebbd5ec9cdb5d089b4352f18f9a3a883"; 
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`;

  try {
    const response = await fetch(url);
    const weather_data = await response.json();

    if (weather_data.cod === "404") {
      location_not_found.style.display = "flex";
      weather_body.style.display = "none";
      console.log("Error: Location not found");
      return;
    }

    location_not_found.style.display = "none";
    weather_body.style.display = "flex";
    temperature.innerHTML = `${Math.round(weather_data.main.temp - 273.15)}°C`;
    description.innerHTML = `${weather_data.weather[0].description}`;
    humidity.innerHTML = `${weather_data.main.humidity}%`;
    wind_speed.innerHTML = `${weather_data.wind.speed}Km/H`;

    switch (weather_data.weather[0].main) {
      case 'Clouds':
        weather_img.src = "cloud (1).png";
        break;
      case 'Clear':
        weather_img.src = "clear (1).png";
        break;
      case 'Rain':
        weather_img.src = "rain (1).png";
        break;
      case 'Mist':
        weather_img.src = "mist (1).png";
        break;
      case 'Snow':
        weather_img.src = "snow (1).png";
        break;
      default:
        weather_img.src = "cloud (1).png";
    }

    console.log(weather_data);
  } catch (error) {
    console.error("Error fetching weather data:", error);
  }
}

searchBtn.addEventListener('click', () => {
  const city = inputBox.value.trim();
  if (city !== "") {
    checkWeather(city);
  }
});
