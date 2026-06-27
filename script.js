
const API_KEY = "YOUR_API_KEY_HERE";

// Base URL for the API - I got this from the OpenWeatherMap docs
const API_URL = "https://api.openweathermap.org/data/2.5/weather";

// Grabbing all the HTML elements I need
const cityInput    = document.getElementById("cityInput");
const searchBtn    = document.getElementById("searchBtn");
const loader       = document.getElementById("loader");
const errorBox     = document.getElementById("errorBox");
const errorText    = document.getElementById("errorText");
const weatherCard  = document.getElementById("weatherCard");

// Elements inside the weather card
const cityName     = document.getElementById("cityName");
const countryName  = document.getElementById("countryName");
const weatherIcon  = document.getElementById("weatherIcon");
const weatherDesc  = document.getElementById("weatherDesc");
const tempValue    = document.getElementById("tempValue");
const humidity     = document.getElementById("humidity");
const windSpeed    = document.getElementById("windSpeed");
const lastUpdated  = document.getElementById("lastUpdated");



function showLoader() {
    loader.style.display = "block";
    errorBox.style.display = "none";
    weatherCard.style.display = "none";
}

function showError(message) {
    loader.style.display = "none";
    errorBox.style.display = "flex";
    errorText.textContent = message;
    weatherCard.style.display = "none";
}

function showWeatherCard() {
    loader.style.display = "none";
    errorBox.style.display = "none";
    weatherCard.style.display = "block";
}


// ---- Main function to fetch weather ----

async function getWeather(city) {

    // Don't do anything if input is empty
    if (!city.trim()) {
        showError("Please enter a city name first!");
        return;
    }

    showLoader();

    try {
        // Building the API URL with the city, API key, and metric units (for Celsius)
        const url = `${API_URL}?q=${city}&appid=${API_KEY}&units=metric`;

        const response = await fetch(url);

        // If city is not found, API returns 404
        if (response.status === 404) {
            showError("City not found! Please check the spelling.");
            return;
        }

        // If some other error happened
        if (!response.ok) {
            showError("Something went wrong. Please try again.");
            return;
        }

        // Convert response to JSON
        const data = await response.json();

        // Now fill in the weather card with real data
        displayWeather(data);

        // Save this city to localStorage so we remember it next time
        localStorage.setItem("lastCity", city);

    } catch (error) {
        // Network error or API down
        console.error("Error fetching weather:", error);
        showError("Network error! Please check your internet connection.");
    }
}


// ---- Fill the weather card with data ----

function displayWeather(data) {

    // City and country
    cityName.textContent    = data.name;
    countryName.textContent = data.sys.country;

    // Weather condition text (e.g. "clear sky")
    weatherDesc.textContent = data.weather[0].description;

    // Icon - OpenWeatherMap gives us an icon code, we build the URL from it
    const iconCode = data.weather[0].icon;
    weatherIcon.src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
    weatherIcon.alt = data.weather[0].description;

    // Temperature - round it to avoid decimals like 27.384
    tempValue.textContent = Math.round(data.main.temp);

    // Humidity percentage
    humidity.textContent = `${data.main.humidity}%`;

    // Wind speed - API gives m/s, converting to km/h
    const windKmh = Math.round(data.wind.speed * 3.6);
    windSpeed.textContent = `${windKmh} km/h`;

    // Show the time when data was last fetched
    const now = new Date();
    lastUpdated.textContent = `Updated at ${now.getHours()}:${String(now.getMinutes()).padStart(2, "0")}`;

    // Show the card
    showWeatherCard();
}


// ---- Event: clicking the Search button ----

searchBtn.addEventListener("click", function () {
    const city = cityInput.value.trim();
    getWeather(city);
});


// ---- Event: pressing Enter key in the input ----

cityInput.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        const city = cityInput.value.trim();
        getWeather(city);
    }
});


// ---- On page load: check if user searched a city before ----

window.addEventListener("load", function () {
    const savedCity = localStorage.getItem("lastCity");

    if (savedCity) {
        // Put the saved city in the input box
        cityInput.value = savedCity;
        // And automatically load its weather
        getWeather(savedCity);
    }
});
