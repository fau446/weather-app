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
// Weather conditions: clear sky, few clouds, scattered clouds, broken clouds, shower rain, rain, thunderstorm, snow, mist

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBd0M7O0FBRXhDO0FBQ0Esa0JBQWtCLHdEQUFXOztBQUU3QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQSxrQ0FBa0Msc0JBQXNCLElBQUkseUJBQXlCO0FBQ3JGOztBQUVBO0FBQ0E7O0FBRUEsb0JBQW9CLG1CQUFtQjtBQUN2QztBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGlDQUFpQztBQUNqQztBQUNBLFFBQVE7QUFDUixrQ0FBa0M7QUFDbEM7QUFDQSxRQUFRO0FBQ1Isa0NBQWtDO0FBQ2xDO0FBQ0EsUUFBUTtBQUNSLDJDQUEyQztBQUMzQztBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0EsUUFBUTtBQUNSLE1BQU07QUFDTixpQ0FBaUMscUNBQXFDO0FBQ3RFLGtDQUFrQyxpQ0FBaUM7QUFDbkUsa0NBQWtDLGlDQUFpQztBQUNuRSwyQ0FBMkM7QUFDM0M7QUFDQSxRQUFRO0FBQ1Isc0NBQXNDLHdCQUF3QjtBQUM5RDtBQUNBO0FBQ0Esc0NBQXNDLHNCQUFzQjtBQUM1RDs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGlFQUFlLGdCQUFnQixFQUFDOzs7Ozs7Ozs7Ozs7Ozs7QUMvR2hDOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsMkRBQTJELEtBQUssR0FBRyxRQUFRO0FBQzNFLFFBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGlFQUFlLFdBQVcsRUFBQzs7Ozs7OztVQy9FM0I7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7OztBQ04wRDs7QUFFMUQscUVBQWdCIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvLi9zcmMvbW9kdWxlcy9zY3JlZW5Db250cm9sbGVyLmpzIiwid2VicGFjazovL3dlYXRoZXItYXBwLy4vc3JjL21vZHVsZXMvd2VhdGhlckRhdGEuanMiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3dlYXRoZXItYXBwL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgd2VhdGhlckRhdGEgZnJvbSBcIi4vd2VhdGhlckRhdGFcIjtcblxuY29uc3Qgc2NyZWVuQ29udHJvbGxlciA9ICgpID0+IHtcbiAgY29uc3Qgd2VhdGhlciA9IHdlYXRoZXJEYXRhKCk7XG5cbiAgLy8gY2FjaGUgRE9NXG4gIGNvbnN0IGxvY2F0aW9uSW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmxvY2F0aW9uXCIpO1xuICBjb25zdCBzdWJtaXRCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnN1Ym1pdFwiKTtcbiAgY29uc3QgY29udmVydFVuaXRzQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5jb252ZXJ0LXVuaXRzXCIpO1xuICBjb25zdCBjdXJyZW50VGVtcCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY3VycmVudC10ZW1wXCIpO1xuICBjb25zdCB3ZWF0aGVyQ29uZGl0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi53ZWF0aGVyLWNvbmRpdGlvblwiKTtcbiAgY29uc3QgbWF4VGVtcCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIubWF4LXRlbXBcIik7XG4gIGNvbnN0IG1pblRlbXAgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLm1pbi10ZW1wXCIpO1xuICBjb25zdCBmZWVsc1RlbXAgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmZlZWxzLXRlbXBcIik7XG4gIGNvbnN0IGh1bWlkaXR5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5odW1pZGl0eVwiKTtcbiAgY29uc3Qgd2luZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIud2luZFwiKTtcblxuICBsZXQgY3VycmVudFVuaXRzID0gXCJtZXRyaWNcIjtcblxuICBmdW5jdGlvbiBmaWxsTG9jYXRpb25IZWFkZXIoKSB7XG4gICAgY29uc3QgbG9jYXRpb25IZWFkZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmxvY2F0aW9uLWhlYWRlclwiKTtcbiAgICBsb2NhdGlvbkhlYWRlci5pbm5lckhUTUwgPSBgJHt3ZWF0aGVyLmdldENpdHlOYW1lKCl9LCAke3dlYXRoZXIuZ2V0Q291bnRyeUNvZGUoKX1gO1xuICB9XG5cbiAgZnVuY3Rpb24gY2FwYXRhbGl6ZUZpcnN0TGV0dGVyKHN0cikge1xuICAgIGNvbnN0IG5ld1N0ciA9IHN0ci5zcGxpdChcIiBcIik7XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IG5ld1N0ci5sZW5ndGg7IGkrKykge1xuICAgICAgbmV3U3RyW2ldID0gbmV3U3RyW2ldLmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpICsgbmV3U3RyW2ldLnNsaWNlKDEpO1xuICAgIH1cblxuICAgIHJldHVybiBuZXdTdHIuam9pbihcIiBcIik7XG4gIH1cblxuICBmdW5jdGlvbiBmaWxsV2VhdGhlckluZm8odW5pdHMpIHtcbiAgICBpZiAodW5pdHMgPT09IFwiaW1wZXJpYWxcIikge1xuICAgICAgY3VycmVudFRlbXAuaW5uZXJUZXh0ID0gYCR7TWF0aC5mbG9vcihcbiAgICAgICAgKHdlYXRoZXIuZ2V0Q3VycmVudFRlbXAoKSAqIDkpIC8gNSArIDMyXG4gICAgICApfVxcdTAwQjBGYDtcbiAgICAgIG1heFRlbXAuaW5uZXJUZXh0ID0gYE1heDogJHtNYXRoLmZsb29yKFxuICAgICAgICAod2VhdGhlci5nZXRNYXhUZW1wKCkgKiA5KSAvIDUgKyAzMlxuICAgICAgKX1cXHUwMEIwRmA7XG4gICAgICBtaW5UZW1wLmlubmVyVGV4dCA9IGBNaW46ICR7TWF0aC5mbG9vcihcbiAgICAgICAgKHdlYXRoZXIuZ2V0TWluVGVtcCgpICogOSkgLyA1ICsgMzJcbiAgICAgICl9XFx1MDBCMEZgO1xuICAgICAgZmVlbHNUZW1wLmlubmVyVGV4dCA9IGBGZWVscyBMaWtlOiAke01hdGguZmxvb3IoXG4gICAgICAgICh3ZWF0aGVyLmdldEZlZWxzTGlrZVRlbXAoKSAqIDkpIC8gNSArIDMyXG4gICAgICApfVxcdTAwQjBGYDtcbiAgICAgIHdpbmQuaW5uZXJUZXh0ID0gYFdpbmQgU3BlZWQ6ICR7XG4gICAgICAgIE1hdGgucm91bmQod2VhdGhlci5nZXRXaW5kU3BlZWQoKSAqIDIuMjM3ICogMTAwKSAvIDEwMFxuICAgICAgfSBtaWxlcy9ob3VyYDtcbiAgICB9IGVsc2UgaWYgKHVuaXRzID09PSBcIm1ldHJpY1wiKSB7XG4gICAgICBjdXJyZW50VGVtcC5pbm5lclRleHQgPSBgJHtNYXRoLmZsb29yKHdlYXRoZXIuZ2V0Q3VycmVudFRlbXAoKSl9XFx1MDBCMENgO1xuICAgICAgbWF4VGVtcC5pbm5lclRleHQgPSBgTWF4OiAke01hdGguZmxvb3Iod2VhdGhlci5nZXRNYXhUZW1wKCkpfVxcdTAwQjBDYDtcbiAgICAgIG1pblRlbXAuaW5uZXJUZXh0ID0gYE1pbjogJHtNYXRoLmZsb29yKHdlYXRoZXIuZ2V0TWluVGVtcCgpKX1cXHUwMEIwQ2A7XG4gICAgICBmZWVsc1RlbXAuaW5uZXJUZXh0ID0gYEZlZWxzIExpa2U6ICR7TWF0aC5mbG9vcihcbiAgICAgICAgd2VhdGhlci5nZXRGZWVsc0xpa2VUZW1wKClcbiAgICAgICl9XFx1MDBCMENgO1xuICAgICAgd2luZC5pbm5lclRleHQgPSBgV2luZCBTcGVlZDogJHt3ZWF0aGVyLmdldFdpbmRTcGVlZCgpfSBtZXRlcnMvc2Vjb25kYDtcbiAgICB9XG4gICAgd2VhdGhlckNvbmRpdGlvbi5pbm5lclRleHQgPSBjYXBhdGFsaXplRmlyc3RMZXR0ZXIod2VhdGhlci5nZXRXZWF0aGVyKCkpO1xuICAgIGh1bWlkaXR5LmlubmVyVGV4dCA9IGBIdW1pZGl0eTogJHt3ZWF0aGVyLmdldEh1bWlkaXR5KCl9JWA7XG4gIH1cblxuICBmdW5jdGlvbiByZXNldElucHV0RmllbGQoKSB7XG4gICAgbG9jYXRpb25JbnB1dC52YWx1ZSA9IFwiXCI7XG4gIH1cblxuICBhc3luYyBmdW5jdGlvbiBkaXNwbGF5RGF0YSgpIHtcbiAgICB0cnkge1xuICAgICAgY29uc3QgbG9jYXRpb25WYWx1ZXMgPSBsb2NhdGlvbklucHV0LnZhbHVlLnNwbGl0KFwiLFwiKTtcbiAgICAgIGF3YWl0IHdlYXRoZXIuZ2V0V2VhdGhlckRhdGEobG9jYXRpb25WYWx1ZXNbMF0sIGxvY2F0aW9uVmFsdWVzWzFdKTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgYWxlcnQoZXJyb3IpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnZlcnRVbml0c0J1dHRvbi5jbGFzc0xpc3QucmVtb3ZlKFwiaGlkZGVuXCIpO1xuICAgIGZpbGxMb2NhdGlvbkhlYWRlcigpO1xuICAgIGZpbGxXZWF0aGVySW5mbyhjdXJyZW50VW5pdHMpO1xuICAgIHJlc2V0SW5wdXRGaWVsZCgpO1xuICB9XG5cbiAgZnVuY3Rpb24gc3VibWl0TG9jYXRpb25JbnB1dChldmVudCkge1xuICAgIGlmIChldmVudC5rZXlDb2RlID09PSAxMykge1xuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgIGRpc3BsYXlEYXRhKCk7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gbWV0cmljVG9JbXBlcmlhbCgpIHtcbiAgICBjdXJyZW50VW5pdHMgPSBcImltcGVyaWFsXCI7XG4gICAgZmlsbFdlYXRoZXJJbmZvKGN1cnJlbnRVbml0cyk7XG4gICAgY29udmVydFVuaXRzQnV0dG9uLmlubmVyVGV4dCA9IFwiTWV0cmljXCI7XG4gICAgY29udmVydFVuaXRzQnV0dG9uLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBtZXRyaWNUb0ltcGVyaWFsKTtcbiAgICBjb252ZXJ0VW5pdHNCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGltcGVyaWFsVG9NZXRyaWMpO1xuICB9XG5cbiAgZnVuY3Rpb24gaW1wZXJpYWxUb01ldHJpYygpIHtcbiAgICBjdXJyZW50VW5pdHMgPSBcIm1ldHJpY1wiO1xuICAgIGZpbGxXZWF0aGVySW5mbyhjdXJyZW50VW5pdHMpO1xuICAgIGNvbnZlcnRVbml0c0J1dHRvbi5pbm5lclRleHQgPSBcIkltcGVyaWFsXCI7XG4gICAgY29udmVydFVuaXRzQnV0dG9uLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBpbXBlcmlhbFRvTWV0cmljKTtcbiAgICBjb252ZXJ0VW5pdHNCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIG1ldHJpY1RvSW1wZXJpYWwpO1xuICB9XG5cbiAgc3VibWl0QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBkaXNwbGF5RGF0YSk7XG4gIGxvY2F0aW9uSW5wdXQuYWRkRXZlbnRMaXN0ZW5lcihcImtleXVwXCIsIHN1Ym1pdExvY2F0aW9uSW5wdXQpO1xuICBjb252ZXJ0VW5pdHNCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIG1ldHJpY1RvSW1wZXJpYWwpO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgc2NyZWVuQ29udHJvbGxlcjtcbiIsIi8vIFdlYXRoZXIgY29uZGl0aW9uczogY2xlYXIgc2t5LCBmZXcgY2xvdWRzLCBzY2F0dGVyZWQgY2xvdWRzLCBicm9rZW4gY2xvdWRzLCBzaG93ZXIgcmFpbiwgcmFpbiwgdGh1bmRlcnN0b3JtLCBzbm93LCBtaXN0XG5cbmNvbnN0IHdlYXRoZXJEYXRhID0gKCkgPT4ge1xuICBsZXQgZGF0YTtcbiAgbGV0IHByZXZpb3VzRGF0YTtcblxuICBhc3luYyBmdW5jdGlvbiBnZXRXZWF0aGVyRGF0YShjaXR5LCBjb3VudHJ5ID0gXCJcIikge1xuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goXG4gICAgICBgaHR0cHM6Ly9hcGkub3BlbndlYXRoZXJtYXAub3JnL2RhdGEvMi41L3dlYXRoZXI/cT0ke2NpdHl9LCR7Y291bnRyeX0mQVBQSUQ9N2JlZWJjNjZkOTE3Y2Y4YzA5ZWYxYTg5OTI4YzE1OGQmdW5pdHM9bWV0cmljYCxcbiAgICAgIHsgbW9kZTogXCJjb3JzXCIgfVxuICAgICk7XG4gICAgZGF0YSA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcbiAgICBpZiAoZGF0YS5jb2QgIT09IDIwMCkge1xuICAgICAgbGV0IGVycm9yID0gZGF0YS5tZXNzYWdlO1xuICAgICAgaWYgKGVycm9yID09PSBcImJhZCBxdWVyeVwiKSBlcnJvciA9IFwiTG9jYXRpb24gY2Fubm90IGJlIGJsYW5rLlwiO1xuICAgICAgZGF0YSA9IHByZXZpb3VzRGF0YTtcbiAgICAgIHRocm93IG5ldyBFcnJvcihlcnJvcik7XG4gICAgfVxuXG4gICAgcHJldmlvdXNEYXRhID0gZGF0YTtcbiAgICBjb25zb2xlLmxvZyhkYXRhKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGdldEN1cnJlbnRUZW1wKCkge1xuICAgIHJldHVybiBkYXRhLm1haW4udGVtcDtcbiAgfVxuXG4gIGZ1bmN0aW9uIGdldEZlZWxzTGlrZVRlbXAoKSB7XG4gICAgcmV0dXJuIGRhdGEubWFpbi5mZWVsc19saWtlO1xuICB9XG5cbiAgZnVuY3Rpb24gZ2V0TWF4VGVtcCgpIHtcbiAgICByZXR1cm4gZGF0YS5tYWluLnRlbXBfbWF4O1xuICB9XG5cbiAgZnVuY3Rpb24gZ2V0TWluVGVtcCgpIHtcbiAgICByZXR1cm4gZGF0YS5tYWluLnRlbXBfbWluO1xuICB9XG5cbiAgZnVuY3Rpb24gZ2V0SHVtaWRpdHkoKSB7XG4gICAgcmV0dXJuIGRhdGEubWFpbi5odW1pZGl0eTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGdldFdlYXRoZXIoKSB7XG4gICAgcmV0dXJuIGRhdGEud2VhdGhlclswXS5kZXNjcmlwdGlvbjtcbiAgfVxuXG4gIGZ1bmN0aW9uIGdldEdlbmVyYWxXZWF0aGVyKCkge1xuICAgIHJldHVybiBkYXRhLndlYXRoZXJbMF0ubWFpbjtcbiAgfVxuXG4gIGZ1bmN0aW9uIGdldFdpbmRTcGVlZCgpIHtcbiAgICByZXR1cm4gZGF0YS53aW5kLnNwZWVkO1xuICB9XG5cbiAgZnVuY3Rpb24gZ2V0Q2l0eU5hbWUoKSB7XG4gICAgcmV0dXJuIGRhdGEubmFtZTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGdldENvdW50cnlDb2RlKCkge1xuICAgIHJldHVybiBkYXRhLnN5cy5jb3VudHJ5O1xuICB9XG5cbiAgcmV0dXJuIHtcbiAgICBnZXRXZWF0aGVyRGF0YSxcbiAgICBnZXRDdXJyZW50VGVtcCxcbiAgICBnZXRGZWVsc0xpa2VUZW1wLFxuICAgIGdldE1heFRlbXAsXG4gICAgZ2V0TWluVGVtcCxcbiAgICBnZXRIdW1pZGl0eSxcbiAgICBnZXRXZWF0aGVyLFxuICAgIGdldEdlbmVyYWxXZWF0aGVyLFxuICAgIGdldFdpbmRTcGVlZCxcbiAgICBnZXRDaXR5TmFtZSxcbiAgICBnZXRDb3VudHJ5Q29kZSxcbiAgICBkYXRhLFxuICB9O1xufTtcblxuZXhwb3J0IGRlZmF1bHQgd2VhdGhlckRhdGE7XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCBzY3JlZW5Db250cm9sbGVyIGZyb20gXCIuL21vZHVsZXMvc2NyZWVuQ29udHJvbGxlclwiO1xuXG5zY3JlZW5Db250cm9sbGVyKCk7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=