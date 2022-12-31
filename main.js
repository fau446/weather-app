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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBd0M7O0FBRXhDO0FBQ0Esa0JBQWtCLHdEQUFXOztBQUU3QjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGtDQUFrQyxzQkFBc0IsSUFBSSx5QkFBeUI7QUFDckY7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQSxpRUFBZSxnQkFBZ0IsRUFBQzs7Ozs7Ozs7Ozs7Ozs7O0FDM0JoQzs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSwyREFBMkQsS0FBSyxHQUFHLFFBQVE7QUFDM0UsUUFBUTtBQUNSO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGlFQUFlLFdBQVcsRUFBQzs7Ozs7OztVQ3ZFM0I7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7OztBQ04wRDs7QUFFMUQscUVBQWdCIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvLi9zcmMvbW9kdWxlcy9zY3JlZW5Db250cm9sbGVyLmpzIiwid2VicGFjazovL3dlYXRoZXItYXBwLy4vc3JjL21vZHVsZXMvd2VhdGhlckRhdGEuanMiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3dlYXRoZXItYXBwL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgd2VhdGhlckRhdGEgZnJvbSBcIi4vd2VhdGhlckRhdGFcIjtcblxuY29uc3Qgc2NyZWVuQ29udHJvbGxlciA9ICgpID0+IHtcbiAgY29uc3Qgd2VhdGhlciA9IHdlYXRoZXJEYXRhKCk7XG5cbiAgY29uc3QgbG9jYXRpb25JbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjbG9jYXRpb25cIik7XG4gIGNvbnN0IHN1Ym1pdEJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjc3VibWl0XCIpO1xuICAvLyBoYXZlIHNvbWV0aGluZyB0byBzd2l0Y2ggYmV0d2VlbiBtZXRyaWMgYW5kIGltcGVyaWFsXG5cbiAgZnVuY3Rpb24gZmlsbExvY2F0aW9uSGVhZGVyKCkge1xuICAgIGNvbnN0IGxvY2F0aW9uSGVhZGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNsb2NhdGlvbi1oZWFkZXJcIik7XG4gICAgbG9jYXRpb25IZWFkZXIuaW5uZXJIVE1MID0gYCR7d2VhdGhlci5nZXRDaXR5TmFtZSgpfSwgJHt3ZWF0aGVyLmdldENvdW50cnlDb2RlKCl9YDtcbiAgfVxuXG4gIGZ1bmN0aW9uIHJlc2V0SW5wdXRGaWVsZCgpIHtcbiAgICBsb2NhdGlvbklucHV0LnZhbHVlID0gXCJcIjtcbiAgfVxuXG4gIGFzeW5jIGZ1bmN0aW9uIGRpc3BsYXlEYXRhKCkge1xuICAgIGF3YWl0IHdlYXRoZXIuZ2V0V2VhdGhlckRhdGEobG9jYXRpb25JbnB1dC52YWx1ZSk7XG4gICAgZmlsbExvY2F0aW9uSGVhZGVyKCk7XG4gICAgcmVzZXRJbnB1dEZpZWxkKCk7XG4gIH1cblxuICBzdWJtaXRCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGRpc3BsYXlEYXRhKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IHNjcmVlbkNvbnRyb2xsZXI7XG4iLCIvLyBXZWF0aGVyIGNvbmRpdGlvbnM6IGNsZWFyIHNreSwgZmV3IGNsb3Vkcywgc2NhdHRlcmVkIGNsb3VkcywgYnJva2VuIGNsb3Vkcywgc2hvd2VyIHJhaW4sIHJhaW4sIHRodW5kZXJzdG9ybSwgc25vdywgbWlzdFxuXG5jb25zdCB3ZWF0aGVyRGF0YSA9ICgpID0+IHtcbiAgbGV0IGRhdGE7XG5cbiAgYXN5bmMgZnVuY3Rpb24gZ2V0V2VhdGhlckRhdGEoY2l0eSwgY291bnRyeSA9IFwiXCIpIHtcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKFxuICAgICAgYGh0dHBzOi8vYXBpLm9wZW53ZWF0aGVybWFwLm9yZy9kYXRhLzIuNS93ZWF0aGVyP3E9JHtjaXR5fSwke2NvdW50cnl9JkFQUElEPTdiZWViYzY2ZDkxN2NmOGMwOWVmMWE4OTkyOGMxNThkJnVuaXRzPW1ldHJpY2AsXG4gICAgICB7IG1vZGU6IFwiY29yc1wiIH1cbiAgICApO1xuICAgIGRhdGEgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XG5cbiAgICBjb25zb2xlLmxvZyhkYXRhKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGdldEN1cnJlbnRUZW1wKCkge1xuICAgIHJldHVybiBkYXRhLm1haW4udGVtcDtcbiAgfVxuXG4gIGZ1bmN0aW9uIGdldEZlZWxzTGlrZVRlbXAoKSB7XG4gICAgcmV0dXJuIGRhdGEubWFpbi5mZWVsc19saWtlO1xuICB9XG5cbiAgZnVuY3Rpb24gZ2V0TWF4VGVtcCgpIHtcbiAgICByZXR1cm4gZGF0YS5tYWluLnRlbXBfbWF4O1xuICB9XG5cbiAgZnVuY3Rpb24gZ2V0TWluVGVtcCgpIHtcbiAgICByZXR1cm4gZGF0YS5tYWluLnRlbXBfbWluO1xuICB9XG5cbiAgZnVuY3Rpb24gZ2V0SHVtaWRpdHkoKSB7XG4gICAgcmV0dXJuIGRhdGEubWFpbi5odW1pZGl0eTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGdldFdlYXRoZXIoKSB7XG4gICAgcmV0dXJuIGRhdGEud2VhdGhlclswXS5kZXNjcmlwdGlvbjtcbiAgfVxuXG4gIGZ1bmN0aW9uIGdldEdlbmVyYWxXZWF0aGVyKCkge1xuICAgIHJldHVybiBkYXRhLndlYXRoZXJbMF0ubWFpbjtcbiAgfVxuXG4gIGZ1bmN0aW9uIGdldFdpbmRTcGVlZCgpIHtcbiAgICByZXR1cm4gZGF0YS53aW5kLnNwZWVkO1xuICB9XG5cbiAgZnVuY3Rpb24gZ2V0Q2l0eU5hbWUoKSB7XG4gICAgcmV0dXJuIGRhdGEubmFtZTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGdldENvdW50cnlDb2RlKCkge1xuICAgIHJldHVybiBkYXRhLnN5cy5jb3VudHJ5O1xuICB9XG5cbiAgcmV0dXJuIHtcbiAgICBnZXRXZWF0aGVyRGF0YSxcbiAgICBnZXRDdXJyZW50VGVtcCxcbiAgICBnZXRGZWVsc0xpa2VUZW1wLFxuICAgIGdldE1heFRlbXAsXG4gICAgZ2V0TWluVGVtcCxcbiAgICBnZXRIdW1pZGl0eSxcbiAgICBnZXRXZWF0aGVyLFxuICAgIGdldEdlbmVyYWxXZWF0aGVyLFxuICAgIGdldFdpbmRTcGVlZCxcbiAgICBnZXRDaXR5TmFtZSxcbiAgICBnZXRDb3VudHJ5Q29kZSxcbiAgICBkYXRhLFxuICB9O1xufTtcblxuZXhwb3J0IGRlZmF1bHQgd2VhdGhlckRhdGE7XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCBzY3JlZW5Db250cm9sbGVyIGZyb20gXCIuL21vZHVsZXMvc2NyZWVuQ29udHJvbGxlclwiO1xuXG5zY3JlZW5Db250cm9sbGVyKCk7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=