/**
 * BLOCK: Guten Google Map
 */

//  Import CSS.
import './editor.scss';
import './style.scss';

import { withScriptjs, withGoogleMap, GoogleMap, Marker } from 'react-google-maps';
import Geocode from 'react-geocode';
import axios from 'axios';

import defaultStyles from './default-styles.json';

const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const {
	PanelBody,
	TextControl,
	TextareaControl,
	RangeControl,
	ToggleControl,
	RadioControl,
	Button,
} = wp.components;
const { InspectorControls } = wp.editor;
const { Component } = wp.element;

/**
 * Register: Guten Google Map Block.
 *
 * @link https://wordpress.org/gutenberg/handbook/block-api/
 * @param  {string}   name     Block name.
 * @param  {Object}   settings Block settings.
 * @return {?WPBlock}          The block, if it has been successfully
 *                             registered; otherwise `undefined`.
 */
registerBlockType( 'guten-google-maps/guten-google-maps', {
	title: __( 'Guten Google Map' ),
	icon: 'location',
	category: 'common',
	attributes: {
		APIKey: {
			type: 'string',
			default: '',
		},
		locations: {
			type: 'string',
			default: '[]',
		},
		mapHeight: {
			type: 'number',
			default: 400,
		},
		zoom: {
			type: 'number',
			default: 12,
		},
		defaultUI: {
			type: 'bool',
			default: true,
		},
		allowScrolling: {
			type: 'bool',
			default: true,
		},
		quickStyle: {
			type: 'string',
			default: 'standard',
		},
		advancedStyle: {
			type: 'string',
			default: '',
		},
	},
	supports: {
		align: [ 'wide', 'full' ],
	},
	keywords: [
		__( 'map' ),
		__( 'google' ),
		__( 'guten google map' ),
	],
	edit: class extends Component {
		constructor() {
			super( ...arguments );

			const locations = JSON.parse( this.props.attributes.locations );

			this.state = {
				locations,
				APIKey: gutenGoogleMapsGlobal.APIKey,
			};

			if ( gutenGoogleMapsGlobal.APIKey ) {
				Geocode.setApiKey( gutenGoogleMapsGlobal.APIKey );
			}
		}

		handleUpdateAPIKey() {
			axios( {
				method: 'post',
				url: gutenGoogleMapsGlobal.ajaxUrl,
				params: {
					action: 'guten_google_maps_update_api_key',
					_ajax_nonce: gutenGoogleMapsGlobal.nonce,
					guten_google_maps_api_key: this.state.APIKey,
				},
			} )
				.then( function( response ) {
					Geocode.setApiKey( this.state.APIKey );
					this.props.setAttributes( { APIKey: this.state.APIKey } );
				} )
				.catch( function( error ) {
					console.log( error );
				} );
		}

		handleAddLocation() {
			let locations = this.state.locations;

			if ( locations.length ) {
				locations.unshift( {
					lat: 0,
					lng: 0,
					address: '',
				} );
			} else {
				locations = [ {
					lat: 0,
					lng: 0,
					address: '',
				} ];
			}

			this.setState( { locations } );
		}

		handleLocationChange( address, index ) {
			const locations = this.state.locations;
			locations[ index ].address = address;
			this.setState( { locations } );
		}

		handleUpdateLocations() {
			const locations = this.state.locations;

			locations.map( ( location, index ) => {
				Geocode.fromAddress( location.address ).then(
					response => {
						locations[ index ] = {
							lat: response.results[ 0 ].geometry.location.lat,
							lng: response.results[ 0 ].geometry.location.lng,
							address: response.results[ 0 ].formatted_address,
						};
						this.props.setAttributes( { locations: JSON.stringify( locations ) } );
						this.setState( { locations } ); // somehow wait till the end to save?
					},
					error => {
						return error;
					}
				);
			} );
		}

		render() {
			let markers = null;
			let markerFields = null;

			const locations = this.state.locations;

			if ( locations.length ) {
				markers = locations.map( ( location, index ) => {
					return <Marker
						key={ index }
						position={ { lat: location.lat, lng: location.lng } }
					/>;
				} );

				markerFields = locations.map( ( location, index ) => {
					return <TextControl
						key={ index }
						label={ __( 'Address' ) }
						value={ this.state.locations[ index ].address }
						onChange={ ( address ) => this.handleLocationChange( address, index ) }
					/>;
				} );
			}

			const advancedStyleJSON = this.props.attributes.advancedStyle ? JSON.parse( this.props.attributes.advancedStyle ) : [];
			const mapStyles = this.props.attributes.quickStyle !== 'standard' && ! this.props.attributes.advancedStyle ? defaultStyles[ this.props.attributes.quickStyle ] : [ ...advancedStyleJSON ];

			const mapCenter = this.state.locations[ 0 ];

			const MapComponent = withScriptjs( withGoogleMap( () =>
				<GoogleMap
					defaultZoom={ this.props.attributes.zoom }
					defaultCenter={ mapCenter }
					defaultOptions={ {
						disableDefaultUI: ! this.props.attributes.defaultUI,
						scrollwheel: this.props.attributes.allowScrolling,
						styles: [ ...mapStyles ],
					} }
				>
					{ markers }
				</GoogleMap>
			) );

			return [
				<InspectorControls key="1">
					<PanelBody
						title={ __( 'Google Maps API Key' ) }
						initialOpen={ ! gutenGoogleMapsGlobal.APIKey }
					>
						<TextControl
							label={ __( 'API Key' ) }
							value={ this.state.APIKey }
							onChange={ ( APIKey ) => this.setState( { APIKey } ) }
						/>
						<Button
							isDefault
							onClick={ this.handleUpdateAPIKey.bind( this ) }
						>
							{ __( 'Apply API Key' ) }
						</Button>
					</PanelBody>
					<PanelBody
						title={ __( 'Map Markers' ) }
					>
						{ markerFields }
						<Button
							isDefault
							onClick={ this.handleAddLocation.bind( this ) }
						>
							{ __( 'Add Marker' ) }
						</Button>
						<Button
							isDefault
							style={ { marginLeft: '10px' } }
							onClick={ this.handleUpdateLocations.bind( this ) }
						>
							{ __( 'Apply Updates' ) }
						</Button>
					</PanelBody>
					<PanelBody
						title={ __( 'Map Defaults' ) }
					>
						<TextControl
							label={ __( 'Map Height' ) }
							type="number"
							value={ this.props.attributes.mapHeight }
							onChange={ ( mapHeight ) => this.props.setAttributes( { mapHeight: JSON.parse( mapHeight ) } ) }
						/>
						<RangeControl
							label={ __( 'Zoom' ) }
							value={ this.props.attributes.zoom }
							onChange={ ( zoom ) => this.props.setAttributes( { zoom } ) }
							min={ 1 }
							max={ 20 }
						/>
						<ToggleControl
							label={ __( 'Show Default UI' ) }
							help={ this.props.attributes.defaultUI ? 'Default UI is enabled.' : 'Default UI is disabled.' }
							checked={ this.props.attributes.defaultUI }
							onChange={ () => this.props.setAttributes( { defaultUI: ! this.props.attributes.defaultUI } ) }
						/>
						<ToggleControl
							label={ __( 'Allow Scrolling' ) }
							help={ this.props.attributes.allowScrolling ? 'Scrolling is allowed.' : 'Scrolling is not allowed.' }
							checked={ this.props.attributes.allowScrolling }
							onChange={ () => this.props.setAttributes( { allowScrolling: ! this.props.attributes.allowScrolling } ) }
						/>
					</PanelBody>
					<PanelBody
						title={ __( 'Quick Style Palettes' ) }
						initialOpen={ false }
					>
						<RadioControl
							label={ __( 'Map Style' ) }
							selected={ this.props.attributes.quickStyle }
							options={ [
								{ label: 'Standard', value: 'standard' },
								{ label: 'Silver', value: 'silver' },
								{ label: 'Retro', value: 'retro' },
								{ label: 'Dark', value: 'dark' },
								{ label: 'Night', value: 'night' },
								{ label: 'Aubergine', value: 'aubergine' },
							] }
							onChange={ ( quickStyle ) => this.props.setAttributes( { quickStyle } ) }
						/>
					</PanelBody>
					<PanelBody
						title={ __( 'Advanced Style Palette' ) }
						initialOpen={ false }
					>
						<TextareaControl
							label={ __( 'JSON Style Profile' ) }
							help={ __( 'Write your own style profile or use the Map Style Tool to generate one. Paste the generated code here. A value here will override the Map Style set in Quick Style Palettes.' ) }
							value={ this.props.attributes.advancedStyle }
							onChange={ ( advancedStyle ) => this.props.setAttributes( { advancedStyle } ) }
						/>
						<Button
							href="https://mapstyle.withgoogle.com"
							target="_blank"
							isDefault
						>
							{ __( 'Map Style Tool' ) }
						</Button>
					</PanelBody>
				</InspectorControls>,
				<div key="2" className={ this.props.className }>
					<MapComponent
						googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyCb0NahCEnubhm0zEaBcJKF4nPgrSZ3IQM"
						loadingElement={ <div style={ { height: '100%' } } /> }
						containerElement={ <div style={ { height: this.props.attributes.mapHeight + 'px' } } /> }
						mapElement={ <div style={ { height: '100%' } } /> }
					/>
				</div>,
			];
		}
	},
	save: ( props ) => { // fix parse stringify here
		const advancedStyleJSON = props.attributes.advancedStyle ? JSON.parse( props.attributes.advancedStyle ) : [];
		const mapStyles = props.attributes.quickStyle !== 'standard' && ! props.attributes.advancedStyle ? defaultStyles[ props.attributes.quickStyle ] : [ ...advancedStyleJSON ];

		return (
			<div className={ props.className }>
				<div className="guten-google-maps"
					style={ { height: props.attributes.mapHeight + 'px' } }
					data-markers={ props.attributes.locations }
					data-zoom={ props.attributes.zoom }
					data-scrollwheel={ props.attributes.allowScrolling }
					data-disabledefaultui={ ! props.attributes.defaultUI }
					data-styles={ JSON.stringify( mapStyles ) }
				></div>
			</div>
		);
	},
} );
