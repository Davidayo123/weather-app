# 🌤️ Weather App

A clean, lightweight weather application that shows real-time weather data for any city in the world — with **no API key required**.

## 🚀 Live Demo

> Open `index.html` in your browser to run it locally.

## ✨ Features

- 🔍 Search weather by city name
- 🌡️ Current temperature (°C)
- ☁️ Weather condition description (clear, rain, snow, etc.)
- 💧 Real-time humidity
- 💨 Wind speed (km/h)
- ⌨️ Press **Enter** to search
- ⚡ No API key needed — powered by [Open-Meteo](https://open-meteo.com/) (free & open-source)

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| HTML5 | Structure |
| CSS3 | Styling |
| JavaScript (Vanilla) | Logic & API calls |
| [Open-Meteo API](https://open-meteo.com/) | Weather data (free, no signup) |
| [Open-Meteo Geocoding API](https://open-meteo.com/en/docs/geocoding-api) | City name → coordinates |

## 📁 Project Structure

```
weather-app/
├── index.html   # Main HTML layout
├── style.css    # Styles and responsive design
└── app.js       # Weather fetching logic
```

## 🔧 How It Works

1. User enters a city name
2. The app uses the **Open-Meteo Geocoding API** to convert the city name to latitude/longitude
3. The coordinates are passed to the **Open-Meteo Forecast API** to fetch current weather
4. Results are displayed: temperature, condition, humidity, and wind speed

## 📦 Usage

No installation needed. Just clone and open:

```bash
git clone https://github.com/Davidayo123/weather-app.git
cd weather-app
# Open index.html in your browser
```

## 📄 License

MIT License — free to use and modify.
