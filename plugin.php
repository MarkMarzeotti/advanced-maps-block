<?php
/**
 * Plugin Name: Guten Google Maps
 * Plugin URI: https://markmarzeotti.com/
 * Description: Super simple Google Maps block for the new WordPress editor.
 * Author: Mark Marzeotti
 * Author URI: https://markmarzeotti.com/
 * Version: 1.0.0
 * License: GPL2+
 * License URI: https://www.gnu.org/licenses/gpl-2.0.txt
 *
 * @package Guten_Google_Maps
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
function activate_guten_google_maps() {
	add_option( 'guten_google_maps_api_key', '', '', 'yes' );
}

/**
 * Runs during plugin deactivation.
 */
function deactivate_guten_google_maps() {
	delete_option( 'guten_google_maps_api_key' );
}

register_activation_hook( __FILE__, 'activate_guten_google_maps' );
register_deactivation_hook( __FILE__, 'deactivate_guten_google_maps' );
