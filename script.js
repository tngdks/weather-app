const apiKey = "f2b03b95cc065505dd8fb6ab7c1507a4";

async function getWeather() {
  const city = document.getElementById("cityInput").value.trim();
  const error = document.getElementById("error");
  const weatherCard = document.getElementById("weatherCard");

  error.textContent = "";
  weatherCard.classList.add("hidden");

  if (!city) {
    error.textContent = "Please enter a city name";
    return;
  }

  try {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    const response = await fetch(url);
    const data = await response.json();

    console.log(data); // IMPORTANT: check actual API response

    if (!response.ok) {
      throw new Error(data.message || "Something went wrong");
    }

    document.getElementById("cityName").textContent = data.name;
    document.getElementById("temperature").textContent = `Temperature: ${data.main.temp}°C`;
    document.getElementById("condition").textContent = `Condition: ${data.weather[0].description}`;
    document.getElementById("humidity").textContent = `Humidity: ${data.main.humidity}%`;
    document.getElementById("wind").textContent = `Wind Speed: ${data.wind.speed} m/s`;

    weatherCard.classList.remove("hidden");

  } catch (err) {
    error.textContent = err.message;
  }
}