/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/modules/screenController.js":
/*!*****************************************!*\
  !*** ./src/modules/screenController.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _weatherData__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./weatherData */ "./src/modules/weatherData.js");


const screenController = () => {
  const weather = (0,_weatherData__WEBPACK_IMPORTED_MODULE_0__["default"])();

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

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (screenController);


/***/ }),

/***/ "./src/modules/weatherData.js":
/*!************************************!*\
  !*** ./src/modules/weatherData.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
// General weather conditions: Thunderstorm, Drizzle, Rain, Snow, Clear, Clouds, Mist, Fog, "Extreme"

const weatherData = () => {
  let data;
  let previousData;

  async function getWeatherData(city, country = "") {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&APPID=7beebc66d917cf8c09ef1a89928c158d&units=metric`,
      { mode: "cors" }
    );
    data = await response.json();
    if (data.cod !== 200) {
      let error = data.message;
      if (error === "bad query") error = "Location cannot be blank.";
      data = previousData;
      throw new Error(error);
    }

    previousData = data;
    console.log(data);
  }

  function getCurrentTemp() {
    return data.main.temp;
  }

  function getFeelsLikeTemp() {
    return data.main.feels_like;
  }

  function getMaxTemp() {
    return data.main.temp_max;
  }

  function getMinTemp() {
    return data.main.temp_min;
  }

  function getHumidity() {
    return data.main.humidity;
  }

  function getWeather() {
    return data.weather[0].description;
  }

  function getGeneralWeather() {
    return data.weather[0].main;
  }

  function getWindSpeed() {
    return data.wind.speed;
  }

  function getCityName() {
    return data.name;
  }

  function getCountryCode() {
    return data.sys.country;
  }

  return {
    getWeatherData,
    getCurrentTemp,
    getFeelsLikeTemp,
    getMaxTemp,
    getMinTemp,
    getHumidity,
    getWeather,
    getGeneralWeather,
    getWindSpeed,
    getCityName,
    getCountryCode,
    data,
  };
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (weatherData);


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_screenController__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/screenController */ "./src/modules/screenController.js");


(0,_modules_screenController__WEBPACK_IMPORTED_MODULE_0__["default"])();

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBd0M7O0FBRXhDO0FBQ0Esa0JBQWtCLHdEQUFXOztBQUU3QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBLGtDQUFrQyxzQkFBc0IsSUFBSSx5QkFBeUI7QUFDckY7O0FBRUE7QUFDQTs7QUFFQSxvQkFBb0IsbUJBQW1CO0FBQ3ZDO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsaUNBQWlDO0FBQ2pDO0FBQ0EsUUFBUTtBQUNSLGtDQUFrQztBQUNsQztBQUNBLFFBQVE7QUFDUixrQ0FBa0M7QUFDbEM7QUFDQSxRQUFRO0FBQ1IsMkNBQTJDO0FBQzNDO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQSxRQUFRO0FBQ1IsTUFBTTtBQUNOLGlDQUFpQyxxQ0FBcUM7QUFDdEUsa0NBQWtDLGlDQUFpQztBQUNuRSxrQ0FBa0MsaUNBQWlDO0FBQ25FLDJDQUEyQztBQUMzQztBQUNBLFFBQVE7QUFDUixzQ0FBc0Msd0JBQXdCO0FBQzlEO0FBQ0E7QUFDQSxzQ0FBc0Msc0JBQXNCO0FBQzVEOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsaUVBQWUsZ0JBQWdCLEVBQUM7Ozs7Ozs7Ozs7Ozs7OztBQzdJaEM7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSwyREFBMkQsS0FBSyxHQUFHLFFBQVE7QUFDM0UsUUFBUTtBQUNSO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsaUVBQWUsV0FBVyxFQUFDOzs7Ozs7O1VDL0UzQjtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7O0FDTjBEOztBQUUxRCxxRUFBZ0IiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL3NyYy9tb2R1bGVzL3NjcmVlbkNvbnRyb2xsZXIuanMiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvLi9zcmMvbW9kdWxlcy93ZWF0aGVyRGF0YS5qcyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3dlYXRoZXItYXBwLy4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB3ZWF0aGVyRGF0YSBmcm9tIFwiLi93ZWF0aGVyRGF0YVwiO1xuXG5jb25zdCBzY3JlZW5Db250cm9sbGVyID0gKCkgPT4ge1xuICBjb25zdCB3ZWF0aGVyID0gd2VhdGhlckRhdGEoKTtcblxuICAvLyBjYWNoZSBET01cbiAgY29uc3QgYm9keSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJib2R5XCIpO1xuICBjb25zdCBsb2NhdGlvbklucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5sb2NhdGlvblwiKTtcbiAgY29uc3Qgc3VibWl0QnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5zdWJtaXRcIik7XG4gIGNvbnN0IGNvbnZlcnRVbml0c0J1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY29udmVydC11bml0c1wiKTtcbiAgY29uc3QgY3VycmVudFRlbXAgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmN1cnJlbnQtdGVtcFwiKTtcbiAgY29uc3Qgd2VhdGhlckNvbmRpdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIud2VhdGhlci1jb25kaXRpb25cIik7XG4gIGNvbnN0IG1heFRlbXAgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLm1heC10ZW1wXCIpO1xuICBjb25zdCBtaW5UZW1wID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5taW4tdGVtcFwiKTtcbiAgY29uc3QgZmVlbHNUZW1wID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5mZWVscy10ZW1wXCIpO1xuICBjb25zdCBodW1pZGl0eSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuaHVtaWRpdHlcIik7XG4gIGNvbnN0IHdpbmQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLndpbmRcIik7XG5cbiAgbGV0IGN1cnJlbnRVbml0cyA9IFwibWV0cmljXCI7XG5cbiAgZnVuY3Rpb24gZmlsbExvY2F0aW9uSGVhZGVyKCkge1xuICAgIGNvbnN0IGxvY2F0aW9uSGVhZGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5sb2NhdGlvbi1oZWFkZXJcIik7XG4gICAgbG9jYXRpb25IZWFkZXIuaW5uZXJIVE1MID0gYCR7d2VhdGhlci5nZXRDaXR5TmFtZSgpfSwgJHt3ZWF0aGVyLmdldENvdW50cnlDb2RlKCl9YDtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNhcGF0YWxpemVGaXJzdExldHRlcihzdHIpIHtcbiAgICBjb25zdCBuZXdTdHIgPSBzdHIuc3BsaXQoXCIgXCIpO1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBuZXdTdHIubGVuZ3RoOyBpKyspIHtcbiAgICAgIG5ld1N0cltpXSA9IG5ld1N0cltpXS5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSArIG5ld1N0cltpXS5zbGljZSgxKTtcbiAgICB9XG5cbiAgICByZXR1cm4gbmV3U3RyLmpvaW4oXCIgXCIpO1xuICB9XG5cbiAgZnVuY3Rpb24gZmlsbFdlYXRoZXJJbmZvKHVuaXRzKSB7XG4gICAgaWYgKHVuaXRzID09PSBcImltcGVyaWFsXCIpIHtcbiAgICAgIGN1cnJlbnRUZW1wLmlubmVyVGV4dCA9IGAke01hdGguZmxvb3IoXG4gICAgICAgICh3ZWF0aGVyLmdldEN1cnJlbnRUZW1wKCkgKiA5KSAvIDUgKyAzMlxuICAgICAgKX1cXHUwMEIwRmA7XG4gICAgICBtYXhUZW1wLmlubmVyVGV4dCA9IGBNYXg6ICR7TWF0aC5mbG9vcihcbiAgICAgICAgKHdlYXRoZXIuZ2V0TWF4VGVtcCgpICogOSkgLyA1ICsgMzJcbiAgICAgICl9XFx1MDBCMEZgO1xuICAgICAgbWluVGVtcC5pbm5lclRleHQgPSBgTWluOiAke01hdGguZmxvb3IoXG4gICAgICAgICh3ZWF0aGVyLmdldE1pblRlbXAoKSAqIDkpIC8gNSArIDMyXG4gICAgICApfVxcdTAwQjBGYDtcbiAgICAgIGZlZWxzVGVtcC5pbm5lclRleHQgPSBgRmVlbHMgTGlrZTogJHtNYXRoLmZsb29yKFxuICAgICAgICAod2VhdGhlci5nZXRGZWVsc0xpa2VUZW1wKCkgKiA5KSAvIDUgKyAzMlxuICAgICAgKX1cXHUwMEIwRmA7XG4gICAgICB3aW5kLmlubmVyVGV4dCA9IGBXaW5kIFNwZWVkOiAke1xuICAgICAgICBNYXRoLnJvdW5kKHdlYXRoZXIuZ2V0V2luZFNwZWVkKCkgKiAyLjIzNyAqIDEwMCkgLyAxMDBcbiAgICAgIH0gbWlsZXMvaG91cmA7XG4gICAgfSBlbHNlIGlmICh1bml0cyA9PT0gXCJtZXRyaWNcIikge1xuICAgICAgY3VycmVudFRlbXAuaW5uZXJUZXh0ID0gYCR7TWF0aC5mbG9vcih3ZWF0aGVyLmdldEN1cnJlbnRUZW1wKCkpfVxcdTAwQjBDYDtcbiAgICAgIG1heFRlbXAuaW5uZXJUZXh0ID0gYE1heDogJHtNYXRoLmZsb29yKHdlYXRoZXIuZ2V0TWF4VGVtcCgpKX1cXHUwMEIwQ2A7XG4gICAgICBtaW5UZW1wLmlubmVyVGV4dCA9IGBNaW46ICR7TWF0aC5mbG9vcih3ZWF0aGVyLmdldE1pblRlbXAoKSl9XFx1MDBCMENgO1xuICAgICAgZmVlbHNUZW1wLmlubmVyVGV4dCA9IGBGZWVscyBMaWtlOiAke01hdGguZmxvb3IoXG4gICAgICAgIHdlYXRoZXIuZ2V0RmVlbHNMaWtlVGVtcCgpXG4gICAgICApfVxcdTAwQjBDYDtcbiAgICAgIHdpbmQuaW5uZXJUZXh0ID0gYFdpbmQgU3BlZWQ6ICR7d2VhdGhlci5nZXRXaW5kU3BlZWQoKX0gbWV0ZXJzL3NlY29uZGA7XG4gICAgfVxuICAgIHdlYXRoZXJDb25kaXRpb24uaW5uZXJUZXh0ID0gY2FwYXRhbGl6ZUZpcnN0TGV0dGVyKHdlYXRoZXIuZ2V0V2VhdGhlcigpKTtcbiAgICBodW1pZGl0eS5pbm5lclRleHQgPSBgSHVtaWRpdHk6ICR7d2VhdGhlci5nZXRIdW1pZGl0eSgpfSVgO1xuICB9XG5cbiAgZnVuY3Rpb24gY2hhbmdlQmFja2dyb3VuZEltYWdlKCkge1xuICAgIHN3aXRjaCAod2VhdGhlci5nZXRHZW5lcmFsV2VhdGhlcigpKSB7XG4gICAgICBjYXNlIFwiQ2xlYXJcIjpcbiAgICAgICAgYm9keS5zdHlsZS5iYWNrZ3JvdW5kSW1hZ2UgPSBcInVybCgnaW1ncy9jbGVhci5qcGcnKVwiO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgXCJSYWluXCI6XG4gICAgICBjYXNlIFwiRHJpenpsZVwiOlxuICAgICAgICBib2R5LnN0eWxlLmJhY2tncm91bmRJbWFnZSA9IFwidXJsKCdpbWdzL3JhaW4uanBnJylcIjtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFwiQ2xvdWRzXCI6XG4gICAgICAgIGJvZHkuc3R5bGUuYmFja2dyb3VuZEltYWdlID0gXCJ1cmwoJ2ltZ3MvY2xvdWRzLmpwZycpXCI7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBcIlNub3dcIjpcbiAgICAgICAgYm9keS5zdHlsZS5iYWNrZ3JvdW5kSW1hZ2UgPSBcInVybCgnaW1ncy9zbm93LmpwZycpXCI7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBcIkZvZ1wiOlxuICAgICAgY2FzZSBcIk1pc3RcIjpcbiAgICAgIGNhc2UgXCJIYXplXCI6XG4gICAgICAgIGJvZHkuc3R5bGUuYmFja2dyb3VuZEltYWdlID0gXCJ1cmwoJ2ltZ3MvZm9nLmpwZycpXCI7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBcIlRodW5kZXJzdG9ybVwiOlxuICAgICAgICBib2R5LnN0eWxlLmJhY2tncm91bmRJbWFnZSA9IFwidXJsKCdpbWdzL3RodW5kZXJzdG9ybS5qcGcnKVwiO1xuICAgICAgICBicmVhaztcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIGJvZHkuc3R5bGUuYmFja2dyb3VuZEltYWdlID0gXCJ1cmwoJ2ltZ3MvdGh1bmRlcnN0b3JtLmpwZycpXCI7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gcmVzZXRJbnB1dEZpZWxkKCkge1xuICAgIGxvY2F0aW9uSW5wdXQudmFsdWUgPSBcIlwiO1xuICB9XG5cbiAgYXN5bmMgZnVuY3Rpb24gZGlzcGxheURhdGEoKSB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IGxvY2F0aW9uVmFsdWVzID0gbG9jYXRpb25JbnB1dC52YWx1ZS5zcGxpdChcIixcIik7XG4gICAgICBhd2FpdCB3ZWF0aGVyLmdldFdlYXRoZXJEYXRhKGxvY2F0aW9uVmFsdWVzWzBdLCBsb2NhdGlvblZhbHVlc1sxXSk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGFsZXJ0KGVycm9yKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb252ZXJ0VW5pdHNCdXR0b24uY2xhc3NMaXN0LnJlbW92ZShcImhpZGRlblwiKTtcbiAgICBmaWxsTG9jYXRpb25IZWFkZXIoKTtcbiAgICBmaWxsV2VhdGhlckluZm8oY3VycmVudFVuaXRzKTtcbiAgICBjaGFuZ2VCYWNrZ3JvdW5kSW1hZ2UoKTtcbiAgICByZXNldElucHV0RmllbGQoKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHN1Ym1pdExvY2F0aW9uSW5wdXQoZXZlbnQpIHtcbiAgICBpZiAoZXZlbnQua2V5Q29kZSA9PT0gMTMpIHtcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICBkaXNwbGF5RGF0YSgpO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIG1ldHJpY1RvSW1wZXJpYWwoKSB7XG4gICAgY3VycmVudFVuaXRzID0gXCJpbXBlcmlhbFwiO1xuICAgIGZpbGxXZWF0aGVySW5mbyhjdXJyZW50VW5pdHMpO1xuICAgIGNvbnZlcnRVbml0c0J1dHRvbi5pbm5lclRleHQgPSBcIk1ldHJpY1wiO1xuICAgIGNvbnZlcnRVbml0c0J1dHRvbi5yZW1vdmVFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgbWV0cmljVG9JbXBlcmlhbCk7XG4gICAgY29udmVydFVuaXRzQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBpbXBlcmlhbFRvTWV0cmljKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGltcGVyaWFsVG9NZXRyaWMoKSB7XG4gICAgY3VycmVudFVuaXRzID0gXCJtZXRyaWNcIjtcbiAgICBmaWxsV2VhdGhlckluZm8oY3VycmVudFVuaXRzKTtcbiAgICBjb252ZXJ0VW5pdHNCdXR0b24uaW5uZXJUZXh0ID0gXCJJbXBlcmlhbFwiO1xuICAgIGNvbnZlcnRVbml0c0J1dHRvbi5yZW1vdmVFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgaW1wZXJpYWxUb01ldHJpYyk7XG4gICAgY29udmVydFVuaXRzQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBtZXRyaWNUb0ltcGVyaWFsKTtcbiAgfVxuXG4gIHN1Ym1pdEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZGlzcGxheURhdGEpO1xuICBsb2NhdGlvbklucHV0LmFkZEV2ZW50TGlzdGVuZXIoXCJrZXl1cFwiLCBzdWJtaXRMb2NhdGlvbklucHV0KTtcbiAgY29udmVydFVuaXRzQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBtZXRyaWNUb0ltcGVyaWFsKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IHNjcmVlbkNvbnRyb2xsZXI7XG4iLCIvLyBHZW5lcmFsIHdlYXRoZXIgY29uZGl0aW9uczogVGh1bmRlcnN0b3JtLCBEcml6emxlLCBSYWluLCBTbm93LCBDbGVhciwgQ2xvdWRzLCBNaXN0LCBGb2csIFwiRXh0cmVtZVwiXG5cbmNvbnN0IHdlYXRoZXJEYXRhID0gKCkgPT4ge1xuICBsZXQgZGF0YTtcbiAgbGV0IHByZXZpb3VzRGF0YTtcblxuICBhc3luYyBmdW5jdGlvbiBnZXRXZWF0aGVyRGF0YShjaXR5LCBjb3VudHJ5ID0gXCJcIikge1xuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goXG4gICAgICBgaHR0cHM6Ly9hcGkub3BlbndlYXRoZXJtYXAub3JnL2RhdGEvMi41L3dlYXRoZXI/cT0ke2NpdHl9LCR7Y291bnRyeX0mQVBQSUQ9N2JlZWJjNjZkOTE3Y2Y4YzA5ZWYxYTg5OTI4YzE1OGQmdW5pdHM9bWV0cmljYCxcbiAgICAgIHsgbW9kZTogXCJjb3JzXCIgfVxuICAgICk7XG4gICAgZGF0YSA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcbiAgICBpZiAoZGF0YS5jb2QgIT09IDIwMCkge1xuICAgICAgbGV0IGVycm9yID0gZGF0YS5tZXNzYWdlO1xuICAgICAgaWYgKGVycm9yID09PSBcImJhZCBxdWVyeVwiKSBlcnJvciA9IFwiTG9jYXRpb24gY2Fubm90IGJlIGJsYW5rLlwiO1xuICAgICAgZGF0YSA9IHByZXZpb3VzRGF0YTtcbiAgICAgIHRocm93IG5ldyBFcnJvcihlcnJvcik7XG4gICAgfVxuXG4gICAgcHJldmlvdXNEYXRhID0gZGF0YTtcbiAgICBjb25zb2xlLmxvZyhkYXRhKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGdldEN1cnJlbnRUZW1wKCkge1xuICAgIHJldHVybiBkYXRhLm1haW4udGVtcDtcbiAgfVxuXG4gIGZ1bmN0aW9uIGdldEZlZWxzTGlrZVRlbXAoKSB7XG4gICAgcmV0dXJuIGRhdGEubWFpbi5mZWVsc19saWtlO1xuICB9XG5cbiAgZnVuY3Rpb24gZ2V0TWF4VGVtcCgpIHtcbiAgICByZXR1cm4gZGF0YS5tYWluLnRlbXBfbWF4O1xuICB9XG5cbiAgZnVuY3Rpb24gZ2V0TWluVGVtcCgpIHtcbiAgICByZXR1cm4gZGF0YS5tYWluLnRlbXBfbWluO1xuICB9XG5cbiAgZnVuY3Rpb24gZ2V0SHVtaWRpdHkoKSB7XG4gICAgcmV0dXJuIGRhdGEubWFpbi5odW1pZGl0eTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGdldFdlYXRoZXIoKSB7XG4gICAgcmV0dXJuIGRhdGEud2VhdGhlclswXS5kZXNjcmlwdGlvbjtcbiAgfVxuXG4gIGZ1bmN0aW9uIGdldEdlbmVyYWxXZWF0aGVyKCkge1xuICAgIHJldHVybiBkYXRhLndlYXRoZXJbMF0ubWFpbjtcbiAgfVxuXG4gIGZ1bmN0aW9uIGdldFdpbmRTcGVlZCgpIHtcbiAgICByZXR1cm4gZGF0YS53aW5kLnNwZWVkO1xuICB9XG5cbiAgZnVuY3Rpb24gZ2V0Q2l0eU5hbWUoKSB7XG4gICAgcmV0dXJuIGRhdGEubmFtZTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGdldENvdW50cnlDb2RlKCkge1xuICAgIHJldHVybiBkYXRhLnN5cy5jb3VudHJ5O1xuICB9XG5cbiAgcmV0dXJuIHtcbiAgICBnZXRXZWF0aGVyRGF0YSxcbiAgICBnZXRDdXJyZW50VGVtcCxcbiAgICBnZXRGZWVsc0xpa2VUZW1wLFxuICAgIGdldE1heFRlbXAsXG4gICAgZ2V0TWluVGVtcCxcbiAgICBnZXRIdW1pZGl0eSxcbiAgICBnZXRXZWF0aGVyLFxuICAgIGdldEdlbmVyYWxXZWF0aGVyLFxuICAgIGdldFdpbmRTcGVlZCxcbiAgICBnZXRDaXR5TmFtZSxcbiAgICBnZXRDb3VudHJ5Q29kZSxcbiAgICBkYXRhLFxuICB9O1xufTtcblxuZXhwb3J0IGRlZmF1bHQgd2VhdGhlckRhdGE7XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCBzY3JlZW5Db250cm9sbGVyIGZyb20gXCIuL21vZHVsZXMvc2NyZWVuQ29udHJvbGxlclwiO1xuXG5zY3JlZW5Db250cm9sbGVyKCk7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=