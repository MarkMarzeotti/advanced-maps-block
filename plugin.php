<?php
/**
 * Plugin Name: Advanced Maps Block
 * Plugin URI: https://markmarzeotti.com/
 * Description: Easy to use Google Maps block for the WordPress block editor featuring multiple map markers and unlimited style options. Use with a Google Maps JavaScript API key.
 * Author: Mark Marzeotti
 * Author URI: https://markmarzeotti.com/
 * Version: 0.1.0
 * License: GPL2+
 * License URI: https://www.gnu.org/licenses/gpl-2.0.txt
 *
 * @package Advanced_Maps_Block
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
function activate_advanced_maps_block() {
	add_option( 'advanced_maps_block_api_key', '', '', 'yes' );
}

/**
 * Runs during plugin deactivation.
 */
function deactivate_advanced_maps_block() {
	delete_option( 'advanced_maps_block_api_key' );
}

register_activation_hook( __FILE__, 'activate_advanced_maps_block' );
register_deactivation_hook( __FILE__, 'deactivate_advanced_maps_block' );
