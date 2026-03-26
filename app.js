// No API key needed — uses Open-Meteo (free, instant, no signup)
const searchBtn = document.getElementById('searchBtn');
const cityInput = document.getElementById('cityInput');
const weatherCard = document.getElementById('weatherCard');
const errorMsg = document.getElementById('errorMsg');

// WMO weather code descriptions
function getWeatherDescription(code) {
    const codes = {
        0: 'Clear sky', 1: 'Mainly clear', 2: 'Partly cloudy', 3: 'Overcast',
        45: 'Fog', 48: 'Depositing rime fog',
        51: 'Light drizzle', 53: 'Moderate drizzle', 55: 'Dense drizzle',
        61: 'Slight rain', 63: 'Moderate rain', 65: 'Heavy rain',
        71: 'Slight snow', 73: 'Moderate snow', 75: 'Heavy snow',
        80: 'Slight showers', 81: 'Moderate showers', 82: 'Violent showers',
        95: 'Thunderstorm', 96: 'Thunderstorm with hail', 99: 'Thunderstorm with heavy hail'
    };
    return codes[code] || 'Unknown';
}

async function getWeather(city) {
    // Loading state
    searchBtn.textContent = 'Loading...';
    searchBtn.disabled = true;

    try {
        // Step 1: Geocode city name → lat/lon
        const geoUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=en&format=json`;
        const geoRes = await fetch(geoUrl);
        const geoData = await geoRes.json();

        if (!geoData.results || geoData.results.length === 0) {
            throw new Error('City not found. Please check the spelling and try again.');
        }

        const { latitude, longitude, name, country } = geoData.results[0];

        // Step 2: Fetch weather using lat/lon
        const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&hourly=relativehumidity_2m&timezone=auto`;
        const weatherRes = await fetch(weatherUrl);
        const weatherData = await weatherRes.json();

        displayWeather(weatherData, name, country);

    } catch (error) {
        weatherCard.style.display = 'none';
        errorMsg.textContent = error.message;
    } finally {
        // Always reset button whether success or error
        searchBtn.textContent = 'Search';
        searchBtn.disabled = false;
    }
}

function displayWeather(data, cityName, country) {
    errorMsg.textContent = '';

    const current = data.current_weather;
    // Use current hour index for accurate humidity
    const currentHour = new Date().getHours();
    const humidity = data.hourly.relativehumidity_2m[currentHour];
    const description = getWeatherDescription(current.weathercode);

    document.getElementById('cityName').textContent = `${cityName}, ${country}`;
    document.getElementById('temperature').textContent = `🌡️ Temperature: ${current.temperature}°C`;
    document.getElementById('description').textContent = `☁️ ${description}`;
    document.getElementById('humidity').textContent = `💧 Humidity: ${humidity}%`;
    document.getElementById('wind').textContent = `💨 Wind: ${current.windspeed} km/h`;

    weatherCard.style.display = 'block';
}

// Listen for button click
searchBtn.addEventListener('click', () => {
    const city = cityInput.value.trim();
    errorMsg.textContent = ''; // Clear previous error first
    if (!city) {
        errorMsg.textContent = 'Please enter a city name.';
        return;
    }
    getWeather(city);
});

// Also search when user presses Enter
cityInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') searchBtn.click();
});