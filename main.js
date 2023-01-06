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
  const weatherInfo = document.querySelector(".weather-info");
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

  function changeBackgroundImageandFontColor() {
    switch (weather.getGeneralWeather()) {
      case "Clear":
        body.style.backgroundImage = "url('imgs/clear.jpg')";
        weatherInfo.style.color = "black";
        break;
      case "Rain":
      case "Drizzle":
        body.style.backgroundImage = "url('imgs/rain.jpg')";
        weatherInfo.style.color = "white";
        break;
      case "Clouds":
        body.style.backgroundImage = "url('imgs/clouds.jpg')";
        weatherInfo.style.color = "white";
        break;
      case "Snow":
        body.style.backgroundImage = "url('imgs/snow.jpg')";
        weatherInfo.style.color = "black";
        break;
      case "Fog":
      case "Mist":
      case "Haze":
        body.style.backgroundImage = "url('imgs/fog.jpg')";
        weatherInfo.style.color = "white";
        break;
      case "Thunderstorm":
        body.style.backgroundImage = "url('imgs/thunderstorm.jpg')";
        weatherInfo.style.color = "white";
        break;
      default:
        body.style.backgroundImage = "url('imgs/thunderstorm.jpg')";
        weatherInfo.style.color = "white";
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
    changeBackgroundImageandFontColor();
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBd0M7O0FBRXhDO0FBQ0Esa0JBQWtCLHdEQUFXOztBQUU3QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0Esa0NBQWtDLHNCQUFzQixJQUFJLHlCQUF5QjtBQUNyRjs7QUFFQTtBQUNBOztBQUVBLG9CQUFvQixtQkFBbUI7QUFDdkM7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxpQ0FBaUM7QUFDakM7QUFDQSxRQUFRO0FBQ1Isa0NBQWtDO0FBQ2xDO0FBQ0EsUUFBUTtBQUNSLGtDQUFrQztBQUNsQztBQUNBLFFBQVE7QUFDUiwyQ0FBMkM7QUFDM0M7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBLFFBQVE7QUFDUixNQUFNO0FBQ04saUNBQWlDLHFDQUFxQztBQUN0RSxrQ0FBa0MsaUNBQWlDO0FBQ25FLGtDQUFrQyxpQ0FBaUM7QUFDbkUsMkNBQTJDO0FBQzNDO0FBQ0EsUUFBUTtBQUNSLHNDQUFzQyx3QkFBd0I7QUFDOUQ7QUFDQTtBQUNBLHNDQUFzQyxzQkFBc0I7QUFDNUQ7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGlFQUFlLGdCQUFnQixFQUFDOzs7Ozs7Ozs7Ozs7Ozs7QUNySmhDOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsMkRBQTJELEtBQUssR0FBRyxRQUFRO0FBQzNFLFFBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGlFQUFlLFdBQVcsRUFBQzs7Ozs7OztVQy9FM0I7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7OztBQ04wRDs7QUFFMUQscUVBQWdCIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvLi9zcmMvbW9kdWxlcy9zY3JlZW5Db250cm9sbGVyLmpzIiwid2VicGFjazovL3dlYXRoZXItYXBwLy4vc3JjL21vZHVsZXMvd2VhdGhlckRhdGEuanMiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3dlYXRoZXItYXBwL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgd2VhdGhlckRhdGEgZnJvbSBcIi4vd2VhdGhlckRhdGFcIjtcblxuY29uc3Qgc2NyZWVuQ29udHJvbGxlciA9ICgpID0+IHtcbiAgY29uc3Qgd2VhdGhlciA9IHdlYXRoZXJEYXRhKCk7XG5cbiAgLy8gY2FjaGUgRE9NXG4gIGNvbnN0IGJvZHkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiYm9keVwiKTtcbiAgY29uc3QgbG9jYXRpb25JbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIubG9jYXRpb25cIik7XG4gIGNvbnN0IHN1Ym1pdEJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuc3VibWl0XCIpO1xuICBjb25zdCBjb252ZXJ0VW5pdHNCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmNvbnZlcnQtdW5pdHNcIik7XG4gIGNvbnN0IGN1cnJlbnRUZW1wID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5jdXJyZW50LXRlbXBcIik7XG4gIGNvbnN0IHdlYXRoZXJJbmZvID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi53ZWF0aGVyLWluZm9cIik7XG4gIGNvbnN0IHdlYXRoZXJDb25kaXRpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLndlYXRoZXItY29uZGl0aW9uXCIpO1xuICBjb25zdCBtYXhUZW1wID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5tYXgtdGVtcFwiKTtcbiAgY29uc3QgbWluVGVtcCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIubWluLXRlbXBcIik7XG4gIGNvbnN0IGZlZWxzVGVtcCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZmVlbHMtdGVtcFwiKTtcbiAgY29uc3QgaHVtaWRpdHkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmh1bWlkaXR5XCIpO1xuICBjb25zdCB3aW5kID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi53aW5kXCIpO1xuXG4gIGxldCBjdXJyZW50VW5pdHMgPSBcIm1ldHJpY1wiO1xuXG4gIGZ1bmN0aW9uIGZpbGxMb2NhdGlvbkhlYWRlcigpIHtcbiAgICBjb25zdCBsb2NhdGlvbkhlYWRlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIubG9jYXRpb24taGVhZGVyXCIpO1xuICAgIGxvY2F0aW9uSGVhZGVyLmlubmVySFRNTCA9IGAke3dlYXRoZXIuZ2V0Q2l0eU5hbWUoKX0sICR7d2VhdGhlci5nZXRDb3VudHJ5Q29kZSgpfWA7XG4gIH1cblxuICBmdW5jdGlvbiBjYXBhdGFsaXplRmlyc3RMZXR0ZXIoc3RyKSB7XG4gICAgY29uc3QgbmV3U3RyID0gc3RyLnNwbGl0KFwiIFwiKTtcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbmV3U3RyLmxlbmd0aDsgaSsrKSB7XG4gICAgICBuZXdTdHJbaV0gPSBuZXdTdHJbaV0uY2hhckF0KDApLnRvVXBwZXJDYXNlKCkgKyBuZXdTdHJbaV0uc2xpY2UoMSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIG5ld1N0ci5qb2luKFwiIFwiKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGZpbGxXZWF0aGVySW5mbyh1bml0cykge1xuICAgIGlmICh1bml0cyA9PT0gXCJpbXBlcmlhbFwiKSB7XG4gICAgICBjdXJyZW50VGVtcC5pbm5lclRleHQgPSBgJHtNYXRoLmZsb29yKFxuICAgICAgICAod2VhdGhlci5nZXRDdXJyZW50VGVtcCgpICogOSkgLyA1ICsgMzJcbiAgICAgICl9XFx1MDBCMEZgO1xuICAgICAgbWF4VGVtcC5pbm5lclRleHQgPSBgTWF4OiAke01hdGguZmxvb3IoXG4gICAgICAgICh3ZWF0aGVyLmdldE1heFRlbXAoKSAqIDkpIC8gNSArIDMyXG4gICAgICApfVxcdTAwQjBGYDtcbiAgICAgIG1pblRlbXAuaW5uZXJUZXh0ID0gYE1pbjogJHtNYXRoLmZsb29yKFxuICAgICAgICAod2VhdGhlci5nZXRNaW5UZW1wKCkgKiA5KSAvIDUgKyAzMlxuICAgICAgKX1cXHUwMEIwRmA7XG4gICAgICBmZWVsc1RlbXAuaW5uZXJUZXh0ID0gYEZlZWxzIExpa2U6ICR7TWF0aC5mbG9vcihcbiAgICAgICAgKHdlYXRoZXIuZ2V0RmVlbHNMaWtlVGVtcCgpICogOSkgLyA1ICsgMzJcbiAgICAgICl9XFx1MDBCMEZgO1xuICAgICAgd2luZC5pbm5lclRleHQgPSBgV2luZCBTcGVlZDogJHtcbiAgICAgICAgTWF0aC5yb3VuZCh3ZWF0aGVyLmdldFdpbmRTcGVlZCgpICogMi4yMzcgKiAxMDApIC8gMTAwXG4gICAgICB9IG1pbGVzL2hvdXJgO1xuICAgIH0gZWxzZSBpZiAodW5pdHMgPT09IFwibWV0cmljXCIpIHtcbiAgICAgIGN1cnJlbnRUZW1wLmlubmVyVGV4dCA9IGAke01hdGguZmxvb3Iod2VhdGhlci5nZXRDdXJyZW50VGVtcCgpKX1cXHUwMEIwQ2A7XG4gICAgICBtYXhUZW1wLmlubmVyVGV4dCA9IGBNYXg6ICR7TWF0aC5mbG9vcih3ZWF0aGVyLmdldE1heFRlbXAoKSl9XFx1MDBCMENgO1xuICAgICAgbWluVGVtcC5pbm5lclRleHQgPSBgTWluOiAke01hdGguZmxvb3Iod2VhdGhlci5nZXRNaW5UZW1wKCkpfVxcdTAwQjBDYDtcbiAgICAgIGZlZWxzVGVtcC5pbm5lclRleHQgPSBgRmVlbHMgTGlrZTogJHtNYXRoLmZsb29yKFxuICAgICAgICB3ZWF0aGVyLmdldEZlZWxzTGlrZVRlbXAoKVxuICAgICAgKX1cXHUwMEIwQ2A7XG4gICAgICB3aW5kLmlubmVyVGV4dCA9IGBXaW5kIFNwZWVkOiAke3dlYXRoZXIuZ2V0V2luZFNwZWVkKCl9IG1ldGVycy9zZWNvbmRgO1xuICAgIH1cbiAgICB3ZWF0aGVyQ29uZGl0aW9uLmlubmVyVGV4dCA9IGNhcGF0YWxpemVGaXJzdExldHRlcih3ZWF0aGVyLmdldFdlYXRoZXIoKSk7XG4gICAgaHVtaWRpdHkuaW5uZXJUZXh0ID0gYEh1bWlkaXR5OiAke3dlYXRoZXIuZ2V0SHVtaWRpdHkoKX0lYDtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNoYW5nZUJhY2tncm91bmRJbWFnZWFuZEZvbnRDb2xvcigpIHtcbiAgICBzd2l0Y2ggKHdlYXRoZXIuZ2V0R2VuZXJhbFdlYXRoZXIoKSkge1xuICAgICAgY2FzZSBcIkNsZWFyXCI6XG4gICAgICAgIGJvZHkuc3R5bGUuYmFja2dyb3VuZEltYWdlID0gXCJ1cmwoJ2ltZ3MvY2xlYXIuanBnJylcIjtcbiAgICAgICAgd2VhdGhlckluZm8uc3R5bGUuY29sb3IgPSBcImJsYWNrXCI7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBcIlJhaW5cIjpcbiAgICAgIGNhc2UgXCJEcml6emxlXCI6XG4gICAgICAgIGJvZHkuc3R5bGUuYmFja2dyb3VuZEltYWdlID0gXCJ1cmwoJ2ltZ3MvcmFpbi5qcGcnKVwiO1xuICAgICAgICB3ZWF0aGVySW5mby5zdHlsZS5jb2xvciA9IFwid2hpdGVcIjtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFwiQ2xvdWRzXCI6XG4gICAgICAgIGJvZHkuc3R5bGUuYmFja2dyb3VuZEltYWdlID0gXCJ1cmwoJ2ltZ3MvY2xvdWRzLmpwZycpXCI7XG4gICAgICAgIHdlYXRoZXJJbmZvLnN0eWxlLmNvbG9yID0gXCJ3aGl0ZVwiO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgXCJTbm93XCI6XG4gICAgICAgIGJvZHkuc3R5bGUuYmFja2dyb3VuZEltYWdlID0gXCJ1cmwoJ2ltZ3Mvc25vdy5qcGcnKVwiO1xuICAgICAgICB3ZWF0aGVySW5mby5zdHlsZS5jb2xvciA9IFwiYmxhY2tcIjtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFwiRm9nXCI6XG4gICAgICBjYXNlIFwiTWlzdFwiOlxuICAgICAgY2FzZSBcIkhhemVcIjpcbiAgICAgICAgYm9keS5zdHlsZS5iYWNrZ3JvdW5kSW1hZ2UgPSBcInVybCgnaW1ncy9mb2cuanBnJylcIjtcbiAgICAgICAgd2VhdGhlckluZm8uc3R5bGUuY29sb3IgPSBcIndoaXRlXCI7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBcIlRodW5kZXJzdG9ybVwiOlxuICAgICAgICBib2R5LnN0eWxlLmJhY2tncm91bmRJbWFnZSA9IFwidXJsKCdpbWdzL3RodW5kZXJzdG9ybS5qcGcnKVwiO1xuICAgICAgICB3ZWF0aGVySW5mby5zdHlsZS5jb2xvciA9IFwid2hpdGVcIjtcbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICBib2R5LnN0eWxlLmJhY2tncm91bmRJbWFnZSA9IFwidXJsKCdpbWdzL3RodW5kZXJzdG9ybS5qcGcnKVwiO1xuICAgICAgICB3ZWF0aGVySW5mby5zdHlsZS5jb2xvciA9IFwid2hpdGVcIjtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiByZXNldElucHV0RmllbGQoKSB7XG4gICAgbG9jYXRpb25JbnB1dC52YWx1ZSA9IFwiXCI7XG4gIH1cblxuICBhc3luYyBmdW5jdGlvbiBkaXNwbGF5RGF0YSgpIHtcbiAgICB0cnkge1xuICAgICAgY29uc3QgbG9jYXRpb25WYWx1ZXMgPSBsb2NhdGlvbklucHV0LnZhbHVlLnNwbGl0KFwiLFwiKTtcbiAgICAgIGF3YWl0IHdlYXRoZXIuZ2V0V2VhdGhlckRhdGEobG9jYXRpb25WYWx1ZXNbMF0sIGxvY2F0aW9uVmFsdWVzWzFdKTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgYWxlcnQoZXJyb3IpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnZlcnRVbml0c0J1dHRvbi5jbGFzc0xpc3QucmVtb3ZlKFwiaGlkZGVuXCIpO1xuICAgIGZpbGxMb2NhdGlvbkhlYWRlcigpO1xuICAgIGZpbGxXZWF0aGVySW5mbyhjdXJyZW50VW5pdHMpO1xuICAgIGNoYW5nZUJhY2tncm91bmRJbWFnZWFuZEZvbnRDb2xvcigpO1xuICAgIHJlc2V0SW5wdXRGaWVsZCgpO1xuICB9XG5cbiAgZnVuY3Rpb24gc3VibWl0TG9jYXRpb25JbnB1dChldmVudCkge1xuICAgIGlmIChldmVudC5rZXlDb2RlID09PSAxMykge1xuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgIGRpc3BsYXlEYXRhKCk7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gbWV0cmljVG9JbXBlcmlhbCgpIHtcbiAgICBjdXJyZW50VW5pdHMgPSBcImltcGVyaWFsXCI7XG4gICAgZmlsbFdlYXRoZXJJbmZvKGN1cnJlbnRVbml0cyk7XG4gICAgY29udmVydFVuaXRzQnV0dG9uLmlubmVyVGV4dCA9IFwiTWV0cmljXCI7XG4gICAgY29udmVydFVuaXRzQnV0dG9uLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBtZXRyaWNUb0ltcGVyaWFsKTtcbiAgICBjb252ZXJ0VW5pdHNCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGltcGVyaWFsVG9NZXRyaWMpO1xuICB9XG5cbiAgZnVuY3Rpb24gaW1wZXJpYWxUb01ldHJpYygpIHtcbiAgICBjdXJyZW50VW5pdHMgPSBcIm1ldHJpY1wiO1xuICAgIGZpbGxXZWF0aGVySW5mbyhjdXJyZW50VW5pdHMpO1xuICAgIGNvbnZlcnRVbml0c0J1dHRvbi5pbm5lclRleHQgPSBcIkltcGVyaWFsXCI7XG4gICAgY29udmVydFVuaXRzQnV0dG9uLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBpbXBlcmlhbFRvTWV0cmljKTtcbiAgICBjb252ZXJ0VW5pdHNCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIG1ldHJpY1RvSW1wZXJpYWwpO1xuICB9XG5cbiAgc3VibWl0QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBkaXNwbGF5RGF0YSk7XG4gIGxvY2F0aW9uSW5wdXQuYWRkRXZlbnRMaXN0ZW5lcihcImtleXVwXCIsIHN1Ym1pdExvY2F0aW9uSW5wdXQpO1xuICBjb252ZXJ0VW5pdHNCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIG1ldHJpY1RvSW1wZXJpYWwpO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgc2NyZWVuQ29udHJvbGxlcjtcbiIsIi8vIEdlbmVyYWwgd2VhdGhlciBjb25kaXRpb25zOiBUaHVuZGVyc3Rvcm0sIERyaXp6bGUsIFJhaW4sIFNub3csIENsZWFyLCBDbG91ZHMsIE1pc3QsIEZvZywgXCJFeHRyZW1lXCJcblxuY29uc3Qgd2VhdGhlckRhdGEgPSAoKSA9PiB7XG4gIGxldCBkYXRhO1xuICBsZXQgcHJldmlvdXNEYXRhO1xuXG4gIGFzeW5jIGZ1bmN0aW9uIGdldFdlYXRoZXJEYXRhKGNpdHksIGNvdW50cnkgPSBcIlwiKSB7XG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaChcbiAgICAgIGBodHRwczovL2FwaS5vcGVud2VhdGhlcm1hcC5vcmcvZGF0YS8yLjUvd2VhdGhlcj9xPSR7Y2l0eX0sJHtjb3VudHJ5fSZBUFBJRD03YmVlYmM2NmQ5MTdjZjhjMDllZjFhODk5MjhjMTU4ZCZ1bml0cz1tZXRyaWNgLFxuICAgICAgeyBtb2RlOiBcImNvcnNcIiB9XG4gICAgKTtcbiAgICBkYXRhID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xuICAgIGlmIChkYXRhLmNvZCAhPT0gMjAwKSB7XG4gICAgICBsZXQgZXJyb3IgPSBkYXRhLm1lc3NhZ2U7XG4gICAgICBpZiAoZXJyb3IgPT09IFwiYmFkIHF1ZXJ5XCIpIGVycm9yID0gXCJMb2NhdGlvbiBjYW5ub3QgYmUgYmxhbmsuXCI7XG4gICAgICBkYXRhID0gcHJldmlvdXNEYXRhO1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGVycm9yKTtcbiAgICB9XG5cbiAgICBwcmV2aW91c0RhdGEgPSBkYXRhO1xuICAgIGNvbnNvbGUubG9nKGRhdGEpO1xuICB9XG5cbiAgZnVuY3Rpb24gZ2V0Q3VycmVudFRlbXAoKSB7XG4gICAgcmV0dXJuIGRhdGEubWFpbi50ZW1wO1xuICB9XG5cbiAgZnVuY3Rpb24gZ2V0RmVlbHNMaWtlVGVtcCgpIHtcbiAgICByZXR1cm4gZGF0YS5tYWluLmZlZWxzX2xpa2U7XG4gIH1cblxuICBmdW5jdGlvbiBnZXRNYXhUZW1wKCkge1xuICAgIHJldHVybiBkYXRhLm1haW4udGVtcF9tYXg7XG4gIH1cblxuICBmdW5jdGlvbiBnZXRNaW5UZW1wKCkge1xuICAgIHJldHVybiBkYXRhLm1haW4udGVtcF9taW47XG4gIH1cblxuICBmdW5jdGlvbiBnZXRIdW1pZGl0eSgpIHtcbiAgICByZXR1cm4gZGF0YS5tYWluLmh1bWlkaXR5O1xuICB9XG5cbiAgZnVuY3Rpb24gZ2V0V2VhdGhlcigpIHtcbiAgICByZXR1cm4gZGF0YS53ZWF0aGVyWzBdLmRlc2NyaXB0aW9uO1xuICB9XG5cbiAgZnVuY3Rpb24gZ2V0R2VuZXJhbFdlYXRoZXIoKSB7XG4gICAgcmV0dXJuIGRhdGEud2VhdGhlclswXS5tYWluO1xuICB9XG5cbiAgZnVuY3Rpb24gZ2V0V2luZFNwZWVkKCkge1xuICAgIHJldHVybiBkYXRhLndpbmQuc3BlZWQ7XG4gIH1cblxuICBmdW5jdGlvbiBnZXRDaXR5TmFtZSgpIHtcbiAgICByZXR1cm4gZGF0YS5uYW1lO1xuICB9XG5cbiAgZnVuY3Rpb24gZ2V0Q291bnRyeUNvZGUoKSB7XG4gICAgcmV0dXJuIGRhdGEuc3lzLmNvdW50cnk7XG4gIH1cblxuICByZXR1cm4ge1xuICAgIGdldFdlYXRoZXJEYXRhLFxuICAgIGdldEN1cnJlbnRUZW1wLFxuICAgIGdldEZlZWxzTGlrZVRlbXAsXG4gICAgZ2V0TWF4VGVtcCxcbiAgICBnZXRNaW5UZW1wLFxuICAgIGdldEh1bWlkaXR5LFxuICAgIGdldFdlYXRoZXIsXG4gICAgZ2V0R2VuZXJhbFdlYXRoZXIsXG4gICAgZ2V0V2luZFNwZWVkLFxuICAgIGdldENpdHlOYW1lLFxuICAgIGdldENvdW50cnlDb2RlLFxuICAgIGRhdGEsXG4gIH07XG59O1xuXG5leHBvcnQgZGVmYXVsdCB3ZWF0aGVyRGF0YTtcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IHNjcmVlbkNvbnRyb2xsZXIgZnJvbSBcIi4vbW9kdWxlcy9zY3JlZW5Db250cm9sbGVyXCI7XG5cbnNjcmVlbkNvbnRyb2xsZXIoKTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==