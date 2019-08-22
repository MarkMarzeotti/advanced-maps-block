/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 346);
/******/ })
/************************************************************************/
/******/ ({

/***/ 346:
/*!*************************!*\
  !*** ./src/frontend.js ***!
  \*************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {

eval("function gutenGoogleMapInit() {\n\tvar maps = document.getElementsByClassName('guten-google-map');\n\n\tArray.prototype.forEach.call(maps, function (mapItem) {\n\t\tvar map = new google.maps.Map(mapItem, {\n\t\t\tzoom: JSON.parse(mapItem.dataset.zoom),\n\t\t\tcenter: JSON.parse(mapItem.dataset.center),\n\t\t\tscrollwheel: JSON.parse(mapItem.dataset.scrollwheel),\n\t\t\tdisableDefaultUI: JSON.parse(mapItem.dataset.disabledefaultui),\n\t\t\tstyles: JSON.parse(mapItem.dataset.styles)\n\t\t});\n\n\t\tvar marker = new google.maps.Marker({\n\t\t\tposition: JSON.parse(mapItem.dataset.marker),\n\t\t\tmap: map\n\t\t});\n\t});\n}//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiMzQ2LmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vc3JjL2Zyb250ZW5kLmpzPzdmMmMiXSwic291cmNlc0NvbnRlbnQiOlsiZnVuY3Rpb24gZ3V0ZW5Hb29nbGVNYXBJbml0KCkge1xuXHR2YXIgbWFwcyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2d1dGVuLWdvb2dsZS1tYXAnKTtcblxuXHRBcnJheS5wcm90b3R5cGUuZm9yRWFjaC5jYWxsKG1hcHMsIGZ1bmN0aW9uIChtYXBJdGVtKSB7XG5cdFx0dmFyIG1hcCA9IG5ldyBnb29nbGUubWFwcy5NYXAobWFwSXRlbSwge1xuXHRcdFx0em9vbTogSlNPTi5wYXJzZShtYXBJdGVtLmRhdGFzZXQuem9vbSksXG5cdFx0XHRjZW50ZXI6IEpTT04ucGFyc2UobWFwSXRlbS5kYXRhc2V0LmNlbnRlciksXG5cdFx0XHRzY3JvbGx3aGVlbDogSlNPTi5wYXJzZShtYXBJdGVtLmRhdGFzZXQuc2Nyb2xsd2hlZWwpLFxuXHRcdFx0ZGlzYWJsZURlZmF1bHRVSTogSlNPTi5wYXJzZShtYXBJdGVtLmRhdGFzZXQuZGlzYWJsZWRlZmF1bHR1aSksXG5cdFx0XHRzdHlsZXM6IEpTT04ucGFyc2UobWFwSXRlbS5kYXRhc2V0LnN0eWxlcylcblx0XHR9KTtcblxuXHRcdHZhciBtYXJrZXIgPSBuZXcgZ29vZ2xlLm1hcHMuTWFya2VyKHtcblx0XHRcdHBvc2l0aW9uOiBKU09OLnBhcnNlKG1hcEl0ZW0uZGF0YXNldC5tYXJrZXIpLFxuXHRcdFx0bWFwOiBtYXBcblx0XHR9KTtcblx0fSk7XG59XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvZnJvbnRlbmQuanNcbi8vIG1vZHVsZSBpZCA9IDM0NlxuLy8gbW9kdWxlIGNodW5rcyA9IDEiXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///346\n");

/***/ })

/******/ });