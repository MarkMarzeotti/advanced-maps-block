<?php
/**
 * Blocks Initializer
 *
 * Enqueue CSS/JS of all the blocks.
 *
 * @since   1.0.0
 * @package Guten_Google_Maps
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
function guten_google_maps_block_assets() { // phpcs:ignore
	$key = get_option( 'guten_google_maps_api_key' );

	if ( is_admin() ) {
		$style_deps         = array( 'wp-editor' );
		$google_maps_params = null;
		$google_maps_deps   = array();
		$nonce              = wp_create_nonce( 'guten_google_maps_api_key_nonce' );
	} else {
		$style_deps         = array();
		$google_maps_params = '&callback=gutenGoogleMapInit';
		$google_maps_deps   = array( 'guten-google-maps-frontend-js' );
	}

	// Register block styles for both frontend + backend.
	wp_register_style(
		'guten-google-maps-style-css',
		plugins_url( 'dist/blocks.style.build.css', dirname( __FILE__ ) ),
		$style_deps,
		null // filemtime( plugin_dir_path( __DIR__ ) . 'dist/blocks.style.build.css' )
	);
	
	// Register block editor script for backend.
	wp_register_script(
		'guten-google-maps-block-js',
		plugins_url( '/dist/blocks.build.js', dirname( __FILE__ ) ),
		array( 'wp-blocks', 'wp-i18n', 'wp-element', 'wp-editor' ),
		null, // filemtime( plugin_dir_path( __DIR__ ) . 'dist/blocks.build.js' ),
		true
	);

	// Register block editor styles for backend.
	wp_register_style(
		'guten-google-maps-block-editor-css',
		plugins_url( 'dist/blocks.editor.build.css', dirname( __FILE__ ) ),
		array( 'wp-edit-blocks' ),
		null // filemtime( plugin_dir_path( __DIR__ ) . 'dist/blocks.editor.build.css' )
	);

	if ( isset( $nonce ) && is_admin() ) {
		// WP Localized globals.
		wp_localize_script(
			'guten-google-maps-block-js',
			'gutenGoogleMapsGlobal',
			[
				'apiKey'  => get_option( 'guten_google_maps_api_key', '' ),
				'ajaxUrl' => admin_url( 'admin-ajax.php' ),
				'nonce'   => $nonce
			]
		);
	}

	// Register script for frontend.
	if ( ! is_admin() ) {
		wp_register_script(
			'guten-google-maps-frontend-js',
			plugins_url( '/src/frontend.js', dirname( __FILE__ ) ),
			array(),
			null, // filemtime( plugin_dir_path( __DIR__ ) . 'dist/blocks.build.js' ),
			true
		);

		// Register Google Maps API for frontend and backend.
		wp_register_script(
			'google-maps',
			'https://maps.googleapis.com/maps/api/js?key=' . $key . $google_maps_params,
			array( 'wp-blocks', 'wp-i18n', 'wp-element', 'wp-editor', 'guten-google-maps-frontend-js' ),
			null, // filemtime( plugin_dir_path( __DIR__ ) . 'dist/blocks.build.js' ),
			true
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
		'guten-google-maps/guten-google-maps', array(
			// Enqueue blocks.style.build.css on both frontend & backend.
			'style'         => 'guten-google-maps-style-css',
			// Enqueue blocks.build.js in the editor only.
			'editor_script' => 'guten-google-maps-block-js',
			// Enqueue blocks.editor.build.css in the editor only.
			'editor_style'  => 'guten-google-maps-block-editor-css',
			// Enqueue frontend.build.js on frontend.
			'script'        => 'guten-google-maps-frontend-js',
			// Enqueue Google Maps API on frontend.
			'script'        => 'google-maps',
		)
	);
}
add_action( 'init', 'guten_google_maps_block_assets' );

/**
 * AJAX script to update Google Maps API Key option.
 */
function guten_google_maps_update_api_key( $response ) {
	check_ajax_referer( 'guten_google_maps_api_key_nonce' );

	$guten_google_maps_api_key = sanitize_text_field( $_GET['guten_google_maps_api_key'] ); // maybe want to send as post
	update_option( 'guten_google_maps_api_key', $guten_google_maps_api_key );

	$response = json_encode( 'success' );
	echo $response;
	die();
}
add_action( 'wp_ajax_guten_google_maps_update_api_key', 'guten_google_maps_update_api_key' );
