# 🌤️ Weather App

A simple weather app I made as a mini project to learn how APIs work. It fetches real-time weather data using the OpenWeatherMap API and shows temperature, humidity, and wind speed for any city.

---

## ✅ Features

- Search weather for any city in the world
- Shows temperature, weather condition, humidity, and wind speed
- Displays an error message if the city name is wrong
- Remembers the last searched city using localStorage
- Loading indicator while fetching data
- Responsive design — works on mobile and desktop
- Smooth CSS animations

---

## 🛠️ Tech Used

- HTML
- CSS
- JavaScript (Vanilla, no frameworks)
- [OpenWeatherMap API](https://openweathermap.org/api) (free tier)

---

## ⚙️ How to Run It

**Step 1:** Download or clone this repo

```bash
git clone https://github.com/YOUR_USERNAME/weather-app.git
cd weather-app
```

**Step 2:** Get your free API key

1. Go to [https://openweathermap.org](https://openweathermap.org)
2. Create a free account
3. Go to **API Keys** and copy your key
4. Wait 10-15 minutes for it to activate (they say this on the website)

**Step 3:** Add your API key

Open `script.js` and find this line near the top:

```js
const API_KEY = "YOUR_API_KEY_HERE";
```

Replace `YOUR_API_KEY_HERE` with your actual key.

**Step 4:** Open `index.html` in your browser

That's it! No installations needed.

---

## 📂 File Structure

```
weather-app/
│
├── index.html    ← Main HTML structure
├── style.css     ← All the styling and animations
├── script.js     ← API calls and logic
└── README.md     ← This file
```

---

## 📌 How the API Works (what I learned)

The API URL looks like this:

```
https://api.openweathermap.org/data/2.5/weather?q=London&appid=YOUR_KEY&units=metric
```

- `q=London` → city name
- `appid=YOUR_KEY` → your API key
- `units=metric` → gives temperature in Celsius

It returns a JSON object and I pick the parts I need like `data.main.temp` for temperature.

---

## ⚠️ Known Issues / TODO

- [ ] Add a 5-day forecast section
- [ ] Add °C / °F toggle button
- [ ] Maybe add a background that changes based on weather

---

## 👨‍💻 Author

**Aastha Shukla**
B.Tech — Adina Institute of Science and Technology

---

*This project was built to practice JavaScript and API integration.*
