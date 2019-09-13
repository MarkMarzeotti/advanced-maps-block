=== Advanced Maps Block ===
Author URI: https://markmarzeotti.com
Contributors: mmarzeotti
Tags: Gutenberg block, WordPress block, map block, Google Maps
Requires at least: 5.0
Tested up to: 5.2.2
Stable tag: 0.2.0
Requires PHP: 5.2.4
License: GPLv2 or later
License URI: https://www.gnu.org/licenses/gpl-2.0.html

Easy to use Google Maps block for the WordPress block editor featuring multiple map markers and unlimited style options.

== Description ==

A Google Maps implementation for the WordPress block editor. This plugin has no functionality for the Classic Editor. Designed to be a feature rich implementation for Google Maps, this plugin requires a Google Maps JavaScript API key for use.

## Features

* Unlimited marker locations
    * Specific map center or based on marker locations
* Unlimited style options
    * 6 standard style options
    * Use [Google's Styling Wizard](https://mapstyle.withgoogle.com/) to generate your own styles
* Simple map options for height, zoom, default UI, and scrolling
* Align as default, wide, and full-width

== Installation ==

1. Upload the plugin files to the `/wp-content/plugins/advanced-maps-block` directory, or install the plugin through the WordPress plugins screen directly.
2. Activate the plugin through the 'Plugins' screen in WordPress
3. Aquire a [Google Maps JavaScript API key](https://developers.google.com/maps/documentation/javascript/get-api-key) from the [Google Cloud Platform Console](https://cloud.google.com/console/google/maps-apis/overview). Ensure the API key has the "Maps JavaScript API" and the "Geocoding API" enabled.
4. Add the "Advanced Map Block" to any page or post using the block editor. The block will prompt you for your API key. You will only need to add the API key once and will be able to add as many Advanced Maps Blocks as you need after adding the API key.
