<?php
/**
 * Plugin Name: Advanced Gutenberg Google Maps
 * Plugin URI: https://markmarzeotti.com/
 * Description: Easy to use Google Maps block for the WordPress block editor featuring multiple map markers and unlimited style options. Use with a Google Maps JavaScript API key.
 * Author: Mark Marzeotti
 * Author URI: https://markmarzeotti.com/
 * Version: 0.1.0
 * License: GPL2+
 * License URI: https://www.gnu.org/licenses/gpl-2.0.txt
 *
 * @package Advanced_Gutenberg_Google_Maps
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Block Initializer.
 */
require_once plugin_dir_path( __FILE__ ) . 'src/init.php';

/**
 * Runs during plugin activation.
 */
function activate_advanced_gutenberg_google_maps() {
	add_option( 'advanced_gutenberg_google_maps_api_key', '', '', 'yes' );
}

/**
 * Runs during plugin deactivation.
 */
function deactivate_advanced_gutenberg_google_maps() {
	delete_option( 'advanced_gutenberg_google_maps_api_key' );
}

register_activation_hook( __FILE__, 'activate_advanced_gutenberg_google_maps' );
register_deactivation_hook( __FILE__, 'deactivate_advanced_gutenberg_google_maps' );
