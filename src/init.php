<?php
/**
 * Blocks Initializer
 *
 * Enqueue CSS/JS of all the blocks.
 *
 * @since   1.0.0
 * @package Guten Google Map
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Enqueue Gutenberg block assets for both frontend + backend.
 *
 * Assets enqueued:
 * 1. blocks.style.build.css - Frontend + Backend.
 * 2. blocks.build.js - Backend.
 * 3. blocks.editor.build.css - Backend.
 *
 * @uses {wp-blocks} for block type registration & related functions.
 * @uses {wp-element} for WP Element abstraction — structure of blocks.
 * @uses {wp-i18n} to internationalize the block's text.
 * @uses {wp-editor} for WP editor styles.
 * @since 1.0.0
 */
function guten_google_map_block_assets() { // phpcs:ignore
	$deps = is_admin() ? array( 'wp-editor' ) : false;
	// Register block styles for both frontend + backend.
	wp_register_style(
		'guten-google-map-style-css',
		plugins_url( 'dist/blocks.style.build.css', dirname( __FILE__ ) ),
		$deps,
		null // filemtime( plugin_dir_path( __DIR__ ) . 'dist/blocks.style.build.css' )
	);

	// Register block editor script for backend.
	wp_register_script(
		'guten-google-map-block-js',
		plugins_url( '/dist/blocks.build.js', dirname( __FILE__ ) ),
		array( 'wp-blocks', 'wp-i18n', 'wp-element', 'wp-editor' ),
		null, // filemtime( plugin_dir_path( __DIR__ ) . 'dist/blocks.build.js' ),
		true
	);

	// Register block editor styles for backend.
	wp_register_style(
		'guten-google-map-block-editor-css',
		plugins_url( 'dist/blocks.editor.build.css', dirname( __FILE__ ) ),
		array( 'wp-edit-blocks' ),
		null // filemtime( plugin_dir_path( __DIR__ ) . 'dist/blocks.editor.build.css' )
	);

	// // Register script for frontend.
	// wp_register_script(
	// 	'guten-google-map-frontend-js',
	// 	plugins_url( '/dist/frontend.build.js', dirname( __FILE__ ) ),
	// 	array(),
	// 	null, // filemtime( plugin_dir_path( __DIR__ ) . 'dist/blocks.build.js' ),
	// 	true
	// );

	// Register script for frontend.
	wp_register_script(
		'guten-google-map-frontend-js',
		plugins_url( '/src/frontend.js', dirname( __FILE__ ) ),
		array(),
		null, // filemtime( plugin_dir_path( __DIR__ ) . 'dist/blocks.build.js' ),
		true
	);

	// Register Google Maps API for frontend.
	wp_register_script(
		'google-maps',
		'https://maps.googleapis.com/maps/api/js?key=AIzaSyCb0NahCEnubhm0zEaBcJKF4nPgrSZ3IQM&callback=gutenGoogleMapInit',
		array( 'guten-google-map-frontend-js' ),
		null, // filemtime( plugin_dir_path( __DIR__ ) . 'dist/blocks.build.js' ),
		true
	);

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
		'guten-google-map/guten-google-map', array(
			// Enqueue blocks.style.build.css on both frontend & backend.
			'style'         => 'guten-google-map-style-css',
			// Enqueue blocks.build.js in the editor only.
			'editor_script' => 'guten-google-map-block-js',
			// Enqueue blocks.editor.build.css in the editor only.
			'editor_style'  => 'guten-google-map-block-editor-css',
			// Enqueue frontend.build.js on frontend.
			'script'        => 'guten-google-map-frontend-js',
			// Enqueue Google Maps API on frontend.
			'script'        => 'google-maps',
		)
	);
}
add_action( 'init', 'guten_google_map_block_assets' );
