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
/******/ 	return __webpack_require__(__webpack_require__.s = 375);
/******/ })
/************************************************************************/
/******/ ({

/***/ 375:
/*!*************************!*\
  !*** ./src/frontend.js ***!
  \*************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {

eval("function gutenGoogleMapInit() {\n\tconsole.log('running');\n\tvar maps = document.getElementsByClassName('guten-google-maps');\n\n\tArray.prototype.forEach.call(maps, function (mapItem) {\n\t\tvar markers = JSON.parse(mapItem.dataset.markers),\n\t\t    zoom = JSON.parse(mapItem.dataset.zoom),\n\t\t    scrollwheel = JSON.parse(mapItem.dataset.scrollwheel),\n\t\t    disableDefaultUI = JSON.parse(mapItem.dataset.disabledefaultui),\n\t\t    styles = JSON.parse(mapItem.dataset.styles);\n\n\t\tvar map = new google.maps.Map(mapItem, {\n\t\t\tscrollwheel: scrollwheel,\n\t\t\tdisableDefaultUI: disableDefaultUI,\n\t\t\tstyles: styles\n\t\t});\n\n\t\tvar marker, i;\n\t\tvar bounds = new google.maps.LatLngBounds();\n\t\tfor (i = 0; i < markers.length; i++) {\n\t\t\tmarker = new google.maps.Marker({\n\t\t\t\tposition: new google.maps.LatLng(markers[i].lat, markers[i].lng),\n\t\t\t\tmap: map\n\t\t\t});\n\t\t\tbounds.extend(marker.getPosition());\n\t\t}\n\t\tmap.fitBounds(bounds);\n\n\t\tvar listener = google.maps.event.addListener(map, 'bounds_changed', function () {\n\t\t\tif (map.getZoom() !== zoom) map.setZoom(zoom);\n\t\t\tgoogle.maps.event.removeListener(listener);\n\t\t});\n\t});\n}//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiMzc1LmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vc3JjL2Zyb250ZW5kLmpzPzdmMmMiXSwic291cmNlc0NvbnRlbnQiOlsiZnVuY3Rpb24gZ3V0ZW5Hb29nbGVNYXBJbml0KCkge1xuXHRjb25zb2xlLmxvZygncnVubmluZycpO1xuXHR2YXIgbWFwcyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2d1dGVuLWdvb2dsZS1tYXBzJyk7XG5cblx0QXJyYXkucHJvdG90eXBlLmZvckVhY2guY2FsbChtYXBzLCBmdW5jdGlvbiAobWFwSXRlbSkge1xuXHRcdHZhciBtYXJrZXJzID0gSlNPTi5wYXJzZShtYXBJdGVtLmRhdGFzZXQubWFya2VycyksXG5cdFx0ICAgIHpvb20gPSBKU09OLnBhcnNlKG1hcEl0ZW0uZGF0YXNldC56b29tKSxcblx0XHQgICAgc2Nyb2xsd2hlZWwgPSBKU09OLnBhcnNlKG1hcEl0ZW0uZGF0YXNldC5zY3JvbGx3aGVlbCksXG5cdFx0ICAgIGRpc2FibGVEZWZhdWx0VUkgPSBKU09OLnBhcnNlKG1hcEl0ZW0uZGF0YXNldC5kaXNhYmxlZGVmYXVsdHVpKSxcblx0XHQgICAgc3R5bGVzID0gSlNPTi5wYXJzZShtYXBJdGVtLmRhdGFzZXQuc3R5bGVzKTtcblxuXHRcdHZhciBtYXAgPSBuZXcgZ29vZ2xlLm1hcHMuTWFwKG1hcEl0ZW0sIHtcblx0XHRcdHNjcm9sbHdoZWVsOiBzY3JvbGx3aGVlbCxcblx0XHRcdGRpc2FibGVEZWZhdWx0VUk6IGRpc2FibGVEZWZhdWx0VUksXG5cdFx0XHRzdHlsZXM6IHN0eWxlc1xuXHRcdH0pO1xuXG5cdFx0dmFyIG1hcmtlciwgaTtcblx0XHR2YXIgYm91bmRzID0gbmV3IGdvb2dsZS5tYXBzLkxhdExuZ0JvdW5kcygpO1xuXHRcdGZvciAoaSA9IDA7IGkgPCBtYXJrZXJzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRtYXJrZXIgPSBuZXcgZ29vZ2xlLm1hcHMuTWFya2VyKHtcblx0XHRcdFx0cG9zaXRpb246IG5ldyBnb29nbGUubWFwcy5MYXRMbmcobWFya2Vyc1tpXS5sYXQsIG1hcmtlcnNbaV0ubG5nKSxcblx0XHRcdFx0bWFwOiBtYXBcblx0XHRcdH0pO1xuXHRcdFx0Ym91bmRzLmV4dGVuZChtYXJrZXIuZ2V0UG9zaXRpb24oKSk7XG5cdFx0fVxuXHRcdG1hcC5maXRCb3VuZHMoYm91bmRzKTtcblxuXHRcdHZhciBsaXN0ZW5lciA9IGdvb2dsZS5tYXBzLmV2ZW50LmFkZExpc3RlbmVyKG1hcCwgJ2JvdW5kc19jaGFuZ2VkJywgZnVuY3Rpb24gKCkge1xuXHRcdFx0aWYgKG1hcC5nZXRab29tKCkgIT09IHpvb20pIG1hcC5zZXRab29tKHpvb20pO1xuXHRcdFx0Z29vZ2xlLm1hcHMuZXZlbnQucmVtb3ZlTGlzdGVuZXIobGlzdGVuZXIpO1xuXHRcdH0pO1xuXHR9KTtcbn1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9mcm9udGVuZC5qc1xuLy8gbW9kdWxlIGlkID0gMzc1XG4vLyBtb2R1bGUgY2h1bmtzID0gMSJdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///375\n");

/***/ })

/******/ });