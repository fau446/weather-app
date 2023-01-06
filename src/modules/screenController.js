import weatherData from "./weatherData";

const screenController = () => {
  const weather = weatherData();

  // cache DOM
  const body = document.querySelector("body");
  const locationInput = document.querySelector(".location");
  const submitButton = document.querySelector(".submit");
  const convertUnitsButton = document.querySelector(".convert-units");
  const currentTemp = document.querySelector(".current-temp");
  const weatherCondition = document.querySelector(".weather-condition");
  const maxTemp = document.querySelector(".max-temp");
  const minTemp = document.querySelector(".min-temp");
  const feelsTemp = document.querySelector(".feels-temp");
  const humidity = document.querySelector(".humidity");
  const wind = document.querySelector(".wind");

  let currentUnits = "metric";

  function fillLocationHeader() {
    const locationHeader = document.querySelector(".location-header");
    locationHeader.innerHTML = `${weather.getCityName()}, ${weather.getCountryCode()}`;
  }

  function capatalizeFirstLetter(str) {
    const newStr = str.split(" ");

    for (let i = 0; i < newStr.length; i++) {
      newStr[i] = newStr[i].charAt(0).toUpperCase() + newStr[i].slice(1);
    }

    return newStr.join(" ");
  }

  function fillWeatherInfo(units) {
    if (units === "imperial") {
      currentTemp.innerText = `${Math.floor(
        (weather.getCurrentTemp() * 9) / 5 + 32
      )}\u00B0F`;
      maxTemp.innerText = `Max: ${Math.floor(
        (weather.getMaxTemp() * 9) / 5 + 32
      )}\u00B0F`;
      minTemp.innerText = `Min: ${Math.floor(
        (weather.getMinTemp() * 9) / 5 + 32
      )}\u00B0F`;
      feelsTemp.innerText = `Feels Like: ${Math.floor(
        (weather.getFeelsLikeTemp() * 9) / 5 + 32
      )}\u00B0F`;
      wind.innerText = `Wind Speed: ${
        Math.round(weather.getWindSpeed() * 2.237 * 100) / 100
      } miles/hour`;
    } else if (units === "metric") {
      currentTemp.innerText = `${Math.floor(weather.getCurrentTemp())}\u00B0C`;
      maxTemp.innerText = `Max: ${Math.floor(weather.getMaxTemp())}\u00B0C`;
      minTemp.innerText = `Min: ${Math.floor(weather.getMinTemp())}\u00B0C`;
      feelsTemp.innerText = `Feels Like: ${Math.floor(
        weather.getFeelsLikeTemp()
      )}\u00B0C`;
      wind.innerText = `Wind Speed: ${weather.getWindSpeed()} meters/second`;
    }
    weatherCondition.innerText = capatalizeFirstLetter(weather.getWeather());
    humidity.innerText = `Humidity: ${weather.getHumidity()}%`;
  }

  function changeBackgroundImage() {
    switch (weather.getGeneralWeather()) {
      case "Clear":
        body.style.backgroundImage = "url('imgs/clear.jpg')";
        break;
      case "Rain":
      case "Drizzle":
        body.style.backgroundImage = "url('imgs/rain.jpg')";
        break;
      case "Clouds":
        body.style.backgroundImage = "url('imgs/clouds.jpg')";
        break;
      case "Snow":
        body.style.backgroundImage = "url('imgs/snow.jpg')";
        break;
      case "Fog":
      case "Mist":
      case "Haze":
        body.style.backgroundImage = "url('imgs/fog.jpg')";
        break;
      case "Thunderstorm":
        body.style.backgroundImage = "url('imgs/thunderstorm.jpg')";
        break;
      default:
        body.style.backgroundImage = "url('imgs/thunderstorm.jpg')";
    }
  }

  function resetInputField() {
    locationInput.value = "";
  }

  async function displayData() {
    try {
      const locationValues = locationInput.value.split(",");
      await weather.getWeatherData(locationValues[0], locationValues[1]);
    } catch (error) {
      alert(error);
      return;
    }

    convertUnitsButton.classList.remove("hidden");
    fillLocationHeader();
    fillWeatherInfo(currentUnits);
    changeBackgroundImage();
    resetInputField();
  }

  function submitLocationInput(event) {
    if (event.keyCode === 13) {
      event.preventDefault();
      displayData();
    }
  }

  function metricToImperial() {
    currentUnits = "imperial";
    fillWeatherInfo(currentUnits);
    convertUnitsButton.innerText = "Metric";
    convertUnitsButton.removeEventListener("click", metricToImperial);
    convertUnitsButton.addEventListener("click", imperialToMetric);
  }

  function imperialToMetric() {
    currentUnits = "metric";
    fillWeatherInfo(currentUnits);
    convertUnitsButton.innerText = "Imperial";
    convertUnitsButton.removeEventListener("click", imperialToMetric);
    convertUnitsButton.addEventListener("click", metricToImperial);
  }

  submitButton.addEventListener("click", displayData);
  locationInput.addEventListener("keyup", submitLocationInput);
  convertUnitsButton.addEventListener("click", metricToImperial);
};

export default screenController;
