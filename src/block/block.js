/**
 * BLOCK: Advanced Gutenberg Google Map
 */

import './editor.scss';
import './style.scss';

import Geocode from 'react-geocode';
import axios from 'axios';

import scriptjs from 'scriptjs';

import defaultStyles from './default-styles.json';

const {
	__,
} = wp.i18n;
const {
	registerBlockType,
} = wp.blocks;
const {
	Button,
	IconButton,
	PanelBody,
	RadioControl,
	RangeControl,
	TextareaControl,
	TextControl,
	ToggleControl,
} = wp.components;
const {
	InspectorControls,
} = wp.editor;
const {
	Component,
	Fragment,
} = wp.element;

/**
 * Register: Advanced Gutenberg Google Maps Block.
 *
 * @link https://wordpress.org/gutenberg/handbook/block-api/
 * @param  {string}   name     Block name.
 * @param  {Object}   settings Block settings.
 * @return {?WPBlock}          The block, if it has been successfully
 *                             registered; otherwise `undefined`.
 */
registerBlockType( 'aggm/advanced-gutenberg-google-maps', {
	title: __( 'Advanced Gutenberg Google Map' ),
	icon: 'location',
	category: 'common',
	attributes: {
		apiKey: {
			type: 'string',
			default: '',
		},
		mapCenter: {
			type: 'string',
			default: '{}',
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
		__( 'google maps' ),
	],
	edit: class extends Component {
		constructor() {
			super( ...arguments );

			const locations = JSON.parse( this.props.attributes.locations );

			const mapCenter = JSON.parse( this.props.attributes.mapCenter );

			const advancedStyleJSON = this.props.attributes.advancedStyle ? JSON.parse( this.props.attributes.advancedStyle ) : [];
			const mapStyles = this.props.attributes.quickStyle !== 'standard' && ! this.props.attributes.advancedStyle ? defaultStyles[ this.props.attributes.quickStyle ] : [ ...advancedStyleJSON ];

			const apiKey = advancedGutenbergGoogleMapsGlobal.apiKey;

			this.state = {
				apiKey,
				locations,
				locationsUpdated: false,
				mapCenter,
				mapCenterUpdated: false,
				mapStyles,
				mapShouldUpdate: false,
			};
		}

		componentDidMount() {
			if ( this.state.apiKey ) {
				this.handleApplyApiKey( this.state.apiKey );
			}
		}

		componentDidUpdate() {
			if ( this.state.apiKey && this.state.mapShouldUpdate ) {
				this.setState( { mapShouldUpdate: false } );
				this.handleCreateGoogleMap();
			}
		}

		handleUpdateApiKey() {
			axios( {
				method: 'post',
				url: advancedGutenbergGoogleMapsGlobal.ajaxUrl,
				params: {
					action: 'advanced_gutenberg_google_maps_update_api_key',
					_ajax_nonce: advancedGutenbergGoogleMapsGlobal.nonce,
					advanced_gutenberg_google_maps_api_key: this.state.apiKey,
				},
			} )
				.then( response => {
					this.handleApplyApiKey( this.state.apiKey );
				} )
				.catch( error => {
					console.log( error );
				} );
		}

		handleApplyApiKey( apiKey ) {
			const googleMapsApi = document.querySelectorAll( '[href*="https://maps.googleapis.com/maps/api/js?key="' );
			if ( googleMapsApi.length ) {
				document.body.removeChild( googleMapsApi );
			}

			if ( apiKey ) {
				scriptjs.get( 'https://maps.googleapis.com/maps/api/js?key=' + apiKey, () => {
					Geocode.setApiKey( apiKey );
					this.props.setAttributes( { apiKey } );
					this.handleCreateGoogleMap();
				} );
			} else {
				this.props.setAttributes( { apiKey: '' } );
			}
		}

		handleMapCenterChange( address ) {
			const mapCenter = {
				lat: 0,
				long: 0,
				address,
			};
			this.setState( {
				mapCenter,
				mapCenterUpdated: true,
			} );
			this.props.setAttributes( { mapCenter: JSON.stringify( mapCenter ) } );
		}

		handleUpdateMapCenter() {
			let mapCenter = this.state.mapCenter;
			Geocode.fromAddress( mapCenter.address ).then(
				response => {
					mapCenter = {
						lat: response.results[ 0 ].geometry.location.lat,
						lng: response.results[ 0 ].geometry.location.lng,
						address: response.results[ 0 ].formatted_address,
					};

					this.props.setAttributes( { mapCenter: JSON.stringify( mapCenter ) } );
					this.setState( {
						mapCenter,
						mapCenterUpdated: false,
						mapShouldUpdate: true,
					} );
				},
				error => {
					console.error( error );
				}
			);
		}

		handleCreateGoogleMap() {
			const mapItem = document.body.querySelector( '[data-block="' + this.props.clientId + '"] .advanced-gutenberg-google-map' );

			const markers = this.state.locations,
				center = this.state.mapCenter,
				zoom = this.props.attributes.zoom,
				scrollwheel = this.props.attributes.allowScrolling,
				disableDefaultUI = ! this.props.attributes.defaultUI,
				styles = this.state.mapStyles;

			const map = new google.maps.Map( mapItem, {
				scrollwheel: scrollwheel,
				disableDefaultUI: disableDefaultUI,
				styles: styles,
			} );

			let marker, i;
			let bounds = new google.maps.LatLngBounds();
			for ( i = 0; i < markers.length; i++ ) {
				if ( markers[ i ].lat && markers[ i ].lng ) {
					marker = new google.maps.Marker( {
						position: { lat: markers[ i ].lat, lng: markers[ i ].lng },
						map: map,
					} );
					bounds.extend( marker.getPosition() );
				}
			}
			if ( ! center.lat && ! center.lng ) {
				map.fitBounds( bounds );
			} else {
				map.setCenter( { lat: center.lat, lng: center.lng } );
			}

			let listener = google.maps.event.addListener( map, 'bounds_changed', function() {
				if ( map.getZoom() !== zoom ) map.setZoom( zoom );
				google.maps.event.removeListener( listener );
			} );
		}

		handleAddLocation() {
			let locations = this.state.locations;

			if ( locations.length ) {
				locations.push( {
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

			this.setState( {
				locations,
				locationsUpdated: true,
			} );
		}

		handleRemoveLocation( index ) {
			const locations = this.state.locations;
			locations.splice( index, 1 );

			this.props.setAttributes( { locations: JSON.stringify( locations ) } );
			this.setState( {
				locations,
				mapShouldUpdate: true,
			} );
		}

		handleLocationChange( address, index ) {
			const locations = this.state.locations;
			locations[ index ].address = address;
			this.setState( {
				locations,
				locationsUpdated: true,
			} );
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

						if ( index === locations.length - 1 ) {
							this.props.setAttributes( { locations: JSON.stringify( locations ) } );
							this.setState( {
								locations,
								locationsUpdated: false,
								mapShouldUpdate: true,
							} );
						}
					},
					error => {
						console.error( error );
					}
				);
			} );
		}

		render() {
			let markerFields = null;

			const locations = this.state.locations;

			if ( locations.length ) {
				markerFields = locations.map( ( location, index ) => {
					return <Fragment key={ index }>
						<TextControl
							data-index={ index }
							className="advanced-gutenberg-google-maps__marker-address"
							placeholder="350 Fifth Avenue New York NY"
							value={ this.state.locations[ index ].address }
							onChange={ ( address ) => this.handleLocationChange( address, index ) }
						/>
						<IconButton
							className="advanced-gutenberg-google-maps__remove-marker-address"
							icon="no-alt"
							label="Delete Marker"
							onClick={ () => this.handleRemoveLocation( index ) }
						/>
					</Fragment>;
				} );
			}

			const map = this.props.attributes.apiKey ? <div className="advanced-gutenberg-google-map" style={ { height: this.props.attributes.mapHeight + 'px' } } /> : <div className="empty-api">
				<div className="advanced-gutenberg-google-maps__overlay">
					<h3>Advanced Gutenberg Google Maps</h3>
					<p>Please add your <a href="https://developers.google.com/maps/documentation/javascript/get-api-key" target="_blank" rel="noopener noreferrer">Google Maps API Key</a> to use the Advanced Gutenberg Google Map block and all its tasty features.</p>
					<TextControl
						label={ __( 'API Key' ) }
						value={ this.state.apiKey }
						onChange={ ( apiKey ) => this.setState( { apiKey } ) }
					/>
					<Button
						isDefault
						onClick={ this.handleUpdateApiKey.bind( this ) }
					>
						{ __( 'Apply API Key' ) }
					</Button>
				</div>
			</div>;

			const emptyPanel = <p>Please add a <a href="https://developers.google.com/maps/documentation/javascript/get-api-key" target="_blank" rel="noopener noreferrer">Google Maps API key</a>.</p>;

			const mapDefaultsPanel = this.state.apiKey ? <Fragment>
				<TextControl
					label={ __( 'Map Height' ) }
					type="number"
					value={ this.props.attributes.mapHeight }
					onChange={ ( mapHeight ) => {
						this.props.setAttributes( { mapHeight: JSON.parse( mapHeight ) } );
						this.setState( { mapShouldUpdate: true } );
					} }
				/>
				<RangeControl
					label={ __( 'Zoom' ) }
					value={ this.props.attributes.zoom }
					onChange={ ( zoom ) => {
						this.props.setAttributes( { zoom } );
						this.setState( { mapShouldUpdate: true } );
					} }
					min={ 1 }
					max={ 20 }
				/>
				<ToggleControl
					label={ __( 'Show Default UI' ) }
					help={ this.props.attributes.defaultUI ? 'Default UI is enabled.' : 'Default UI is disabled.' }
					checked={ this.props.attributes.defaultUI }
					onChange={ () => {
						this.props.setAttributes( { defaultUI: ! this.props.attributes.defaultUI } );
						this.setState( { mapShouldUpdate: true } );
					} }
				/>
				<ToggleControl
					label={ __( 'Allow Scrolling' ) }
					help={ this.props.attributes.allowScrolling ? 'Scrolling is allowed.' : 'Scrolling is not allowed.' }
					checked={ this.props.attributes.allowScrolling }
					onChange={ () => {
						this.props.setAttributes( { allowScrolling: ! this.props.attributes.allowScrolling } );
						this.setState( { mapShouldUpdate: true } );
					} }
				/>
			</Fragment> : emptyPanel;

			const mapCenterPanel = this.state.apiKey ? <Fragment>
				<p>Map center will be determined based on marker locations if one is not specified. Use this field if you are not going to use any markers on the map or you wish to override the determined center.</p>
				<TextControl
					label={ __( 'Map Center' ) }
					placeholder="New York NY"
					value={ this.state.mapCenter.address }
					onChange={ ( mapCenter ) => this.handleMapCenterChange( mapCenter ) }
				/>
				{ this.state.mapCenterUpdated && <Button
					isPrimary
					onClick={ this.handleUpdateMapCenter.bind( this ) }
				>
					{ __( 'Apply Map Center Update' ) }
				</Button> }
			</Fragment> : emptyPanel;

			const mapMarkersPanel = this.state.apiKey ? <Fragment>
				{ markerFields }
				<Button
					isDefault
					style={ { marginRight: '10px' } }
					onClick={ this.handleAddLocation.bind( this ) }
				>
					{ __( 'Add Marker' ) }
				</Button>
				{ this.state.locationsUpdated && <Button
					isPrimary
					style={ { marginTop: '10px' } }
					onClick={ this.handleUpdateLocations.bind( this ) }
				>
					{ __( 'Apply Marker Updates' ) }
				</Button> }
			</Fragment> : emptyPanel;

			const quickStylePalettesPanel = this.state.apiKey ? <RadioControl
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
				onChange={ ( quickStyle ) => {
					const advancedStyleJSON = this.props.attributes.advancedStyle ? JSON.parse( this.props.attributes.advancedStyle ) : [];
					const mapStyles = quickStyle !== 'standard' && ! this.props.attributes.advancedStyle ? defaultStyles[ quickStyle ] : [ ...advancedStyleJSON ];

					this.props.setAttributes( { quickStyle } );
					this.setState( { mapStyles, mapShouldUpdate: true } );
				} }
			/> : emptyPanel;

			const advancedStylePalettePanel = this.state.apiKey ? <Fragment>
				<TextareaControl
					label={ __( 'JSON Style Profile' ) }
					value={ this.props.attributes.advancedStyle }
					onChange={ ( advancedStyle ) => {
						const advancedStyleJSON = advancedStyle ? JSON.parse( advancedStyle ) : [];
						const mapStyles = this.props.attributes.quickStyle !== 'standard' && ! advancedStyle ? defaultStyles[ this.props.attributes.quickStyle ] : [ ...advancedStyleJSON ];

						this.props.setAttributes( { advancedStyle } );
						this.setState( { mapStyles, mapShouldUpdate: true } );
					} }
				/>
				<p>Write your own style profile or use <a href="https://mapstyle.withgoogle.com/" target="_blank" rel="noopener noreferrer">Google&apos;s Styling Wizard</a> to generate one. Paste the generated code here. A value here will override the Map Style set in Quick Style Palettes.</p>
			</Fragment> : emptyPanel;

			return [
				<InspectorControls key="1">
					<PanelBody
						title={ __( 'Google Maps API Key' ) }
						initialOpen={ ! advancedGutenbergGoogleMapsGlobal.apiKey }
					>
						<TextControl
							label={ __( 'API Key' ) }
							value={ this.state.apiKey }
							onChange={ ( apiKey ) => this.setState( { apiKey } ) }
						/>
						{ this.state.apiKey !== this.props.attributes.apiKey ? <Button
							isDefault
							onClick={ this.handleUpdateApiKey.bind( this ) }
						>
							{ __( 'Apply API Key' ) }
						</Button> : null }
					</PanelBody>
					<PanelBody
						title={ __( 'Map Defaults' ) }
					>
						{ mapDefaultsPanel }
					</PanelBody>
					<PanelBody
						title={ __( 'Map Center' ) }
					>
						{ mapCenterPanel }
					</PanelBody>
					<PanelBody
						title={ __( 'Map Markers' ) }
					>
						{ mapMarkersPanel }
					</PanelBody>
					<PanelBody
						title={ __( 'Quick Style Palettes' ) }
						initialOpen={ false }
					>
						{ quickStylePalettesPanel }
					</PanelBody>
					<PanelBody
						title={ __( 'Advanced Style Palette' ) }
						initialOpen={ false }
					>
						{ advancedStylePalettePanel }
					</PanelBody>
				</InspectorControls>,
				<div key="2" className={ this.props.className }>
					{ map }
				</div>,
			];
		}
	},
	save: ( props ) => { // fix parse stringify here
		const advancedStyleJSON = props.attributes.advancedStyle ? JSON.parse( props.attributes.advancedStyle ) : [];
		const mapStyles = props.attributes.quickStyle !== 'standard' && ! props.attributes.advancedStyle ? defaultStyles[ props.attributes.quickStyle ] : [ ...advancedStyleJSON ];

		return (
			<div className={ props.className }>
				<div className="advanced-gutenberg-google-maps"
					style={ { height: props.attributes.mapHeight + 'px' } }
					data-markers={ props.attributes.locations }
					data-center={ props.attributes.mapCenter }
					data-zoom={ props.attributes.zoom }
					data-scrollwheel={ props.attributes.allowScrolling }
					data-disabledefaultui={ ! props.attributes.defaultUI }
					data-styles={ JSON.stringify( mapStyles ) }
				></div>
			</div>
		);
	},
} );
