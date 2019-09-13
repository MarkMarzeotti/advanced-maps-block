<?php
/**
 * Plugin Name: Advanced Maps Block
 * Description: Easy to use Google Maps block for the WordPress block editor featuring multiple map markers and unlimited style options. Use with a Google Maps JavaScript API key.
 * Author: Mark Marzeotti
 * Author URI: https://markmarzeotti.com/
 * Version: 0.2.0
 * Tested up to: 5.2.2
 *
 * Advanced Maps Block is free software: you can redistribute it and/or
 * modify it under the terms of the GNU General Public License as published
 * by the Free Software Foundation, either version 2 of the License, or
 * any later version.
 *
 * You should have received a copy of the GNU General Public License
 * along with Advanced Maps Block. If not, see <http://www.gnu.org/licenses/>.
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
