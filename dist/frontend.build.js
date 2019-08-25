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
/******/ 	return __webpack_require__(__webpack_require__.s = 349);
/******/ })
/************************************************************************/
/******/ ({

/***/ 349:
/*!*************************!*\
  !*** ./src/frontend.js ***!
  \*************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {

eval("function gutenGoogleMapInit() {\n\tvar maps = document.getElementsByClassName('guten-google-map');\n\n\tArray.prototype.forEach.call(maps, function (mapItem) {\n\t\tvar markers = JSON.parse(mapItem.dataset.markers);\n\n\t\tvar map = new google.maps.Map(mapItem, {\n\t\t\tzoom: JSON.parse(mapItem.dataset.zoom),\n\t\t\tcenter: markers[0],\n\t\t\tscrollwheel: JSON.parse(mapItem.dataset.scrollwheel),\n\t\t\tdisableDefaultUI: JSON.parse(mapItem.dataset.disabledefaultui),\n\t\t\tstyles: JSON.parse(mapItem.dataset.styles)\n\t\t});\n\n\t\tArray.prototype.forEach.call(markers, function (marker) {\n\t\t\treturn new google.maps.Marker({\n\t\t\t\tposition: marker,\n\t\t\t\tmap: map\n\t\t\t});\n\t\t});\n\t});\n}//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiMzQ5LmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vc3JjL2Zyb250ZW5kLmpzPzdmMmMiXSwic291cmNlc0NvbnRlbnQiOlsiZnVuY3Rpb24gZ3V0ZW5Hb29nbGVNYXBJbml0KCkge1xuXHR2YXIgbWFwcyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2d1dGVuLWdvb2dsZS1tYXAnKTtcblxuXHRBcnJheS5wcm90b3R5cGUuZm9yRWFjaC5jYWxsKG1hcHMsIGZ1bmN0aW9uIChtYXBJdGVtKSB7XG5cdFx0dmFyIG1hcmtlcnMgPSBKU09OLnBhcnNlKG1hcEl0ZW0uZGF0YXNldC5tYXJrZXJzKTtcblxuXHRcdHZhciBtYXAgPSBuZXcgZ29vZ2xlLm1hcHMuTWFwKG1hcEl0ZW0sIHtcblx0XHRcdHpvb206IEpTT04ucGFyc2UobWFwSXRlbS5kYXRhc2V0Lnpvb20pLFxuXHRcdFx0Y2VudGVyOiBtYXJrZXJzWzBdLFxuXHRcdFx0c2Nyb2xsd2hlZWw6IEpTT04ucGFyc2UobWFwSXRlbS5kYXRhc2V0LnNjcm9sbHdoZWVsKSxcblx0XHRcdGRpc2FibGVEZWZhdWx0VUk6IEpTT04ucGFyc2UobWFwSXRlbS5kYXRhc2V0LmRpc2FibGVkZWZhdWx0dWkpLFxuXHRcdFx0c3R5bGVzOiBKU09OLnBhcnNlKG1hcEl0ZW0uZGF0YXNldC5zdHlsZXMpXG5cdFx0fSk7XG5cblx0XHRBcnJheS5wcm90b3R5cGUuZm9yRWFjaC5jYWxsKG1hcmtlcnMsIGZ1bmN0aW9uIChtYXJrZXIpIHtcblx0XHRcdHJldHVybiBuZXcgZ29vZ2xlLm1hcHMuTWFya2VyKHtcblx0XHRcdFx0cG9zaXRpb246IG1hcmtlcixcblx0XHRcdFx0bWFwOiBtYXBcblx0XHRcdH0pO1xuXHRcdH0pO1xuXHR9KTtcbn1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9mcm9udGVuZC5qc1xuLy8gbW9kdWxlIGlkID0gMzQ5XG4vLyBtb2R1bGUgY2h1bmtzID0gMSJdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///349\n");

/***/ })

/******/ });