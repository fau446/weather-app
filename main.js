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

  submitButton.addEventListener("click", displayData);
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

  async function getWeatherData(city, country = "") {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&APPID=7beebc66d917cf8c09ef1a89928c158d&units=metric`,
      { mode: "cors" }
    );
    data = await response.json();

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBd0M7O0FBRXhDO0FBQ0Esa0JBQWtCLHdEQUFXOztBQUU3QjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGtDQUFrQyxzQkFBc0IsSUFBSSx5QkFBeUI7QUFDckY7O0FBRUE7QUFDQTs7QUFFQSxvQkFBb0IsbUJBQW1CO0FBQ3ZDO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLCtCQUErQixxQ0FBcUM7QUFDcEU7QUFDQSxnQ0FBZ0MsaUNBQWlDO0FBQ2pFLGdDQUFnQyxpQ0FBaUM7QUFDakUseUNBQXlDO0FBQ3pDO0FBQ0EsTUFBTTtBQUNOLHNDQUFzQyxzQkFBc0I7QUFDNUQsb0NBQW9DLHdCQUF3QjtBQUM1RDs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUEsaUVBQWUsZ0JBQWdCLEVBQUM7Ozs7Ozs7Ozs7Ozs7OztBQzFEaEM7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsMkRBQTJELEtBQUssR0FBRyxRQUFRO0FBQzNFLFFBQVE7QUFDUjtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxpRUFBZSxXQUFXLEVBQUM7Ozs7Ozs7VUN2RTNCO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7QUNOMEQ7O0FBRTFELHFFQUFnQiIsInNvdXJjZXMiOlsid2VicGFjazovL3dlYXRoZXItYXBwLy4vc3JjL21vZHVsZXMvc2NyZWVuQ29udHJvbGxlci5qcyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL3NyYy9tb2R1bGVzL3dlYXRoZXJEYXRhLmpzIiwid2VicGFjazovL3dlYXRoZXItYXBwL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3dlYXRoZXItYXBwL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3dlYXRoZXItYXBwL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHdlYXRoZXJEYXRhIGZyb20gXCIuL3dlYXRoZXJEYXRhXCI7XG5cbmNvbnN0IHNjcmVlbkNvbnRyb2xsZXIgPSAoKSA9PiB7XG4gIGNvbnN0IHdlYXRoZXIgPSB3ZWF0aGVyRGF0YSgpO1xuXG4gIGNvbnN0IGxvY2F0aW9uSW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2xvY2F0aW9uXCIpO1xuICBjb25zdCBzdWJtaXRCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3N1Ym1pdFwiKTtcbiAgLy8gaGF2ZSBzb21ldGhpbmcgdG8gc3dpdGNoIGJldHdlZW4gbWV0cmljIGFuZCBpbXBlcmlhbFxuXG4gIGZ1bmN0aW9uIGZpbGxMb2NhdGlvbkhlYWRlcigpIHtcbiAgICBjb25zdCBsb2NhdGlvbkhlYWRlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjbG9jYXRpb24taGVhZGVyXCIpO1xuICAgIGxvY2F0aW9uSGVhZGVyLmlubmVySFRNTCA9IGAke3dlYXRoZXIuZ2V0Q2l0eU5hbWUoKX0sICR7d2VhdGhlci5nZXRDb3VudHJ5Q29kZSgpfWA7XG4gIH1cblxuICBmdW5jdGlvbiBjYXBhdGFsaXplRmlyc3RMZXR0ZXIoc3RyKSB7XG4gICAgY29uc3QgbmV3U3RyID0gc3RyLnNwbGl0KFwiIFwiKTtcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbmV3U3RyLmxlbmd0aDsgaSsrKSB7XG4gICAgICBuZXdTdHJbaV0gPSBuZXdTdHJbaV0uY2hhckF0KDApLnRvVXBwZXJDYXNlKCkgKyBuZXdTdHJbaV0uc2xpY2UoMSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIG5ld1N0ci5qb2luKFwiIFwiKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGZpbGxXZWF0aGVySW5mbygpIHtcbiAgICBjb25zdCBjdXJyZW50VGVtcCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjY3VycmVudC10ZW1wXCIpO1xuICAgIGNvbnN0IHdlYXRoZXJDb25kaXRpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3dlYXRoZXItY29uZGl0aW9uXCIpO1xuICAgIGNvbnN0IG1heFRlbXAgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI21heC10ZW1wXCIpO1xuICAgIGNvbnN0IG1pblRlbXAgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI21pbi10ZW1wXCIpO1xuICAgIGNvbnN0IGZlZWxzVGVtcCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjZmVlbHMtdGVtcFwiKTtcbiAgICBjb25zdCBodW1pZGl0eSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjaHVtaWRpdHlcIik7XG4gICAgY29uc3Qgd2luZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjd2luZFwiKTtcblxuICAgIGN1cnJlbnRUZW1wLmlubmVyVGV4dCA9IGAke01hdGguZmxvb3Iod2VhdGhlci5nZXRDdXJyZW50VGVtcCgpKX1cXHUwMEIwQ2A7XG4gICAgd2VhdGhlckNvbmRpdGlvbi5pbm5lclRleHQgPSBjYXBhdGFsaXplRmlyc3RMZXR0ZXIod2VhdGhlci5nZXRXZWF0aGVyKCkpO1xuICAgIG1heFRlbXAuaW5uZXJUZXh0ID0gYE1heDogJHtNYXRoLmZsb29yKHdlYXRoZXIuZ2V0TWF4VGVtcCgpKX1cXHUwMEIwQ2A7XG4gICAgbWluVGVtcC5pbm5lclRleHQgPSBgTWluOiAke01hdGguZmxvb3Iod2VhdGhlci5nZXRNaW5UZW1wKCkpfVxcdTAwQjBDYDtcbiAgICBmZWVsc1RlbXAuaW5uZXJUZXh0ID0gYEZlZWxzIExpa2U6ICR7TWF0aC5mbG9vcihcbiAgICAgIHdlYXRoZXIuZ2V0RmVlbHNMaWtlVGVtcCgpXG4gICAgKX1cXHUwMEIwQ2A7XG4gICAgaHVtaWRpdHkuaW5uZXJUZXh0ID0gYEh1bWlkaXR5OiAke3dlYXRoZXIuZ2V0SHVtaWRpdHkoKX0lYDtcbiAgICB3aW5kLmlubmVyVGV4dCA9IGBXaW5kIFNwZWVkOiAke3dlYXRoZXIuZ2V0V2luZFNwZWVkKCl9IG1ldGVycy9zZWNvbmRgO1xuICB9XG5cbiAgZnVuY3Rpb24gcmVzZXRJbnB1dEZpZWxkKCkge1xuICAgIGxvY2F0aW9uSW5wdXQudmFsdWUgPSBcIlwiO1xuICB9XG5cbiAgYXN5bmMgZnVuY3Rpb24gZGlzcGxheURhdGEoKSB7XG4gICAgYXdhaXQgd2VhdGhlci5nZXRXZWF0aGVyRGF0YShsb2NhdGlvbklucHV0LnZhbHVlKTtcbiAgICBmaWxsTG9jYXRpb25IZWFkZXIoKTtcbiAgICBmaWxsV2VhdGhlckluZm8oKTtcbiAgICByZXNldElucHV0RmllbGQoKTtcbiAgfVxuXG4gIHN1Ym1pdEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZGlzcGxheURhdGEpO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgc2NyZWVuQ29udHJvbGxlcjtcbiIsIi8vIFdlYXRoZXIgY29uZGl0aW9uczogY2xlYXIgc2t5LCBmZXcgY2xvdWRzLCBzY2F0dGVyZWQgY2xvdWRzLCBicm9rZW4gY2xvdWRzLCBzaG93ZXIgcmFpbiwgcmFpbiwgdGh1bmRlcnN0b3JtLCBzbm93LCBtaXN0XG5cbmNvbnN0IHdlYXRoZXJEYXRhID0gKCkgPT4ge1xuICBsZXQgZGF0YTtcblxuICBhc3luYyBmdW5jdGlvbiBnZXRXZWF0aGVyRGF0YShjaXR5LCBjb3VudHJ5ID0gXCJcIikge1xuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goXG4gICAgICBgaHR0cHM6Ly9hcGkub3BlbndlYXRoZXJtYXAub3JnL2RhdGEvMi41L3dlYXRoZXI/cT0ke2NpdHl9LCR7Y291bnRyeX0mQVBQSUQ9N2JlZWJjNjZkOTE3Y2Y4YzA5ZWYxYTg5OTI4YzE1OGQmdW5pdHM9bWV0cmljYCxcbiAgICAgIHsgbW9kZTogXCJjb3JzXCIgfVxuICAgICk7XG4gICAgZGF0YSA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcblxuICAgIGNvbnNvbGUubG9nKGRhdGEpO1xuICB9XG5cbiAgZnVuY3Rpb24gZ2V0Q3VycmVudFRlbXAoKSB7XG4gICAgcmV0dXJuIGRhdGEubWFpbi50ZW1wO1xuICB9XG5cbiAgZnVuY3Rpb24gZ2V0RmVlbHNMaWtlVGVtcCgpIHtcbiAgICByZXR1cm4gZGF0YS5tYWluLmZlZWxzX2xpa2U7XG4gIH1cblxuICBmdW5jdGlvbiBnZXRNYXhUZW1wKCkge1xuICAgIHJldHVybiBkYXRhLm1haW4udGVtcF9tYXg7XG4gIH1cblxuICBmdW5jdGlvbiBnZXRNaW5UZW1wKCkge1xuICAgIHJldHVybiBkYXRhLm1haW4udGVtcF9taW47XG4gIH1cblxuICBmdW5jdGlvbiBnZXRIdW1pZGl0eSgpIHtcbiAgICByZXR1cm4gZGF0YS5tYWluLmh1bWlkaXR5O1xuICB9XG5cbiAgZnVuY3Rpb24gZ2V0V2VhdGhlcigpIHtcbiAgICByZXR1cm4gZGF0YS53ZWF0aGVyWzBdLmRlc2NyaXB0aW9uO1xuICB9XG5cbiAgZnVuY3Rpb24gZ2V0R2VuZXJhbFdlYXRoZXIoKSB7XG4gICAgcmV0dXJuIGRhdGEud2VhdGhlclswXS5tYWluO1xuICB9XG5cbiAgZnVuY3Rpb24gZ2V0V2luZFNwZWVkKCkge1xuICAgIHJldHVybiBkYXRhLndpbmQuc3BlZWQ7XG4gIH1cblxuICBmdW5jdGlvbiBnZXRDaXR5TmFtZSgpIHtcbiAgICByZXR1cm4gZGF0YS5uYW1lO1xuICB9XG5cbiAgZnVuY3Rpb24gZ2V0Q291bnRyeUNvZGUoKSB7XG4gICAgcmV0dXJuIGRhdGEuc3lzLmNvdW50cnk7XG4gIH1cblxuICByZXR1cm4ge1xuICAgIGdldFdlYXRoZXJEYXRhLFxuICAgIGdldEN1cnJlbnRUZW1wLFxuICAgIGdldEZlZWxzTGlrZVRlbXAsXG4gICAgZ2V0TWF4VGVtcCxcbiAgICBnZXRNaW5UZW1wLFxuICAgIGdldEh1bWlkaXR5LFxuICAgIGdldFdlYXRoZXIsXG4gICAgZ2V0R2VuZXJhbFdlYXRoZXIsXG4gICAgZ2V0V2luZFNwZWVkLFxuICAgIGdldENpdHlOYW1lLFxuICAgIGdldENvdW50cnlDb2RlLFxuICAgIGRhdGEsXG4gIH07XG59O1xuXG5leHBvcnQgZGVmYXVsdCB3ZWF0aGVyRGF0YTtcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IHNjcmVlbkNvbnRyb2xsZXIgZnJvbSBcIi4vbW9kdWxlcy9zY3JlZW5Db250cm9sbGVyXCI7XG5cbnNjcmVlbkNvbnRyb2xsZXIoKTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==