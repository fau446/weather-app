import weatherData from "./weatherData";

const screenController = () => {
  const weather = weatherData();

  const locationInput = document.querySelector("#location");
  const submitButton = document.querySelector("#submit");
  // have something to switch between metric and imperial

  function fillLocationHeader() {
    const locationHeader = document.querySelector("#location-header");
    locationHeader.innerHTML = `${weather.getCityName()}, ${weather.getCountryCode()}`;
  }

  function capatalizeFirstLetter(str) {
    const newStr = str.split(" ");

    for (let i = 0; i < newStr.length; i++) {
      newStr[i] = newStr[i].charAt(0).toUpperCase() + newStr[i].slice(1);
    }

    return newStr.join(" ");
  }

  function fillWeatherInfo() {
    const currentTemp = document.querySelector("#current-temp");
    const weatherCondition = document.querySelector("#weather-condition");
    const maxTemp = document.querySelector("#max-temp");
    const minTemp = document.querySelector("#min-temp");
    const feelsTemp = document.querySelector("#feels-temp");
    const humidity = document.querySelector("#humidity");
    const wind = document.querySelector("#wind");

    currentTemp.innerText = `${Math.floor(weather.getCurrentTemp())}\u00B0C`;
    weatherCondition.innerText = capatalizeFirstLetter(weather.getWeather());
    maxTemp.innerText = `Max: ${Math.floor(weather.getMaxTemp())}\u00B0C`;
    minTemp.innerText = `Min: ${Math.floor(weather.getMinTemp())}\u00B0C`;
    feelsTemp.innerText = `Feels Like: ${Math.floor(
      weather.getFeelsLikeTemp()
    )}\u00B0C`;
    humidity.innerText = `Humidity: ${weather.getHumidity()}%`;
    wind.innerText = `Wind Speed: ${weather.getWindSpeed()} meters/second`;
  }

  function resetInputField() {
    locationInput.value = "";
  }

  async function displayData() {
    await weather.getWeatherData(locationInput.value);
    fillLocationHeader();
    fillWeatherInfo();
    resetInputField();
  }

  function submitLocationInput(event) {
    if (event.keyCode === 13) {
      event.preventDefault();
      displayData();
    }
  }

  submitButton.addEventListener("click", displayData);
  locationInput.addEventListener("keyup", submitLocationInput);
};

export default screenController;
