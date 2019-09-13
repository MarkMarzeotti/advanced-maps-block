<?php
/**
 * Blocks Initializer
 *
 * Enqueue CSS/JS of all the blocks.
 *
 * @since   0.1.0
 * @package Advanced_Maps_Block
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Enqueue Gutenberg block assets for both frontend + backend.
 *
 * Assets enqueued:
 * 1. dist/blocks.build.js - Backend.
 * 2. dist/blocks.editor.build.css - Backend.
 *
 * @uses {wp-blocks} for block type registration & related functions.
 * @uses {wp-element} for WP Element abstraction — structure of blocks.
 * @uses {wp-i18n} to internationalize the block's text.
 * @uses {wp-editor} for WP editor styles.
 * @since 1.0.0
 */
function advanced_maps_block_block_assets() { // phpcs:ignore
	$key = get_option( 'advanced_maps_block_api_key' );

	// Register block editor script for backend.
	wp_register_script(
		'advanced-maps-block-block-js',
		plugins_url( '/dist/blocks.build.js', dirname( __FILE__ ) ),
		array( 'wp-blocks', 'wp-i18n', 'wp-element', 'wp-editor' ),
		'0.2.0',
		true
	);

	// Register block editor styles for backend.
	wp_register_style(
		'advanced-maps-block-block-editor-css',
		plugins_url( 'dist/blocks.editor.build.css', dirname( __FILE__ ) ),
		array( 'wp-edit-blocks' ),
		'0.2.0'
	);

	if ( is_admin() ) {
		// WP Localized globals.
		wp_localize_script(
			'advanced-maps-block-block-js',
			'advancedMapsBlockGlobal',
			[
				'apiKey'  => get_option( 'advanced_maps_block_api_key', '' ),
				'ajaxUrl' => admin_url( 'admin-ajax.php' ),
				'nonce'   => wp_create_nonce( 'advanced_maps_block_api_key_nonce' ),
			]
		);
	}

	/**
	 * Register block on server-side.
	 *
	 * Register the block on server-side to ensure that the block
	 * scripts and styles for both frontend and backend are
	 * enqueued when the editor loads.
	 *
	 * @link https://wordpress.org/gutenberg/handbook/blocks/writing-your-first-block-type#enqueuing-block-scripts
	 * @since 1.16.0
	 */
	register_block_type(
		'amb/advanced-maps-block', array(
			// Enqueue blocks.build.js in the editor only.
			'editor_script' => 'advanced-maps-block-block-js',
			// Enqueue blocks.editor.build.css in the editor only.
			'editor_style'  => 'advanced-maps-block-block-editor-css',
		)
	);
}
add_action( 'init', 'advanced_maps_block_block_assets' );

/**
 * Enqueue map scripts on frontend.
 */
function advanced_maps_block_enqueue_map_scripts() {
	$key = get_option( 'advanced_maps_block_api_key' );

	wp_enqueue_script(
		'advanced-maps-block-frontend-js',
		plugins_url( '/src/frontend.js', dirname( __FILE__ ) ),
		array(),
		'0.2.0',
		true
	);

	// Register Google Maps API for frontend and backend.
	wp_enqueue_script(
		'google-maps',
		'https://maps.googleapis.com/maps/api/js?key=' . $key . '&callback=advancedMapsBlockInit',
		array( 'advanced-maps-block-frontend-js' ),
		'0.2.0',
		true
	);
}
add_action( 'wp_enqueue_scripts', 'advanced_maps_block_enqueue_map_scripts' );

/**
 * AJAX script to update Google Maps API Key option.
 */
function advanced_maps_block_update_api_key( $response ) {
	check_ajax_referer( 'advanced_maps_block_api_key_nonce' );

	$advanced_maps_block_api_key = sanitize_text_field( $_GET['advanced_maps_block_api_key'] ); // maybe want to send as post
	update_option( 'advanced_maps_block_api_key', $advanced_maps_block_api_key );

	$response = json_encode( 'success' );
	echo $response;
	die();
}
add_action( 'wp_ajax_advanced_maps_block_update_api_key', 'advanced_maps_block_update_api_key' );
