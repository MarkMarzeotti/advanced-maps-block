<?php
/**
 * Plugin Name: Easy Google Map
 * Plugin URI: https://markmarzeotti.com/
 * Description: Super simple Google Map block for the new WordPress editor.
 * Author: Mark Marzeotti
 * Author URI: https://markmarzeotti.com/
 * Version: 1.0.0
 * License: GPL2+
 * License URI: https://www.gnu.org/licenses/gpl-2.0.txt
 *
 * @package Easy Google Map
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Block Initializer.
 */
require_once plugin_dir_path( __FILE__ ) . 'src/init.php';
