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

  function resetInputField() {
    locationInput.value = "";
  }

  async function displayData() {
    await weather.getWeatherData(locationInput.value);
    fillLocationHeader();
    resetInputField();
  }

  submitButton.addEventListener("click", displayData);
};

export default screenController;
