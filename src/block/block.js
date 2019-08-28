/**
 * BLOCK: Guten Google Map
 */

//  Import CSS.
import './editor.scss';
import './style.scss';

import Geocode from 'react-geocode';
import axios from 'axios';

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
 * Register: Guten Google Maps Block.
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
		apiKey: {
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
		__( 'google maps' ),
	],
	edit: class extends Component {
		constructor() {
			super( ...arguments );

			const locations = JSON.parse( this.props.attributes.locations );

			const advancedStyleJSON = this.props.attributes.advancedStyle ? JSON.parse( this.props.attributes.advancedStyle ) : [];
			const mapStyles = this.props.attributes.quickStyle !== 'standard' && ! this.props.attributes.advancedStyle ? defaultStyles[ this.props.attributes.quickStyle ] : [ ...advancedStyleJSON ];

			this.state = {
				apiKey: gutenGoogleMapsGlobal.apiKey, // AIzaSyCb0NahCEnubhm0zEaBcJKF4nPgrSZ3IQM
				apiKeyUpdated: false,
				locations,
				locationsUpdated: false,
				mapStyles,
			};

			if ( gutenGoogleMapsGlobal.apiKey ) {
				Geocode.setApiKey( gutenGoogleMapsGlobal.apiKey );
			}
		}

		componentDidMount() {
			this.handleCreateGoogleMap();
		}

		handleCreateGoogleMap() {
			const mapItem = document.body.querySelector( '[data-block="' + this.props.clientId + '"] div div' );

			console.log( this.state.locations );

			const markers = this.state.locations,
				zoom = this.props.attributes.zoom,
				scrollwheel = this.props.attributes.allowScrolling,
				disableDefaultUI = this.props.attributes.defaultUI,
				styles = this.state.mapStyles;

			const map = new google.maps.Map( mapItem, {
				scrollwheel: scrollwheel,
				disableDefaultUI: disableDefaultUI,
				styles: styles,
			} );

			let marker, i;
			let bounds = new google.maps.LatLngBounds();
			for ( i = 0; i < markers.length; i++ ) {
				marker = new google.maps.Marker( {
					position: new google.maps.LatLng( markers[ i ].lat, markers[ i ].lng ),
					map: map,
				} );
				bounds.extend( marker.getPosition() );
			}
			map.fitBounds( bounds );

			let listener = google.maps.event.addListener( map, 'bounds_changed', function() {
				if ( map.getZoom() !== zoom ) map.setZoom( zoom );
				google.maps.event.removeListener( listener );
			} );
		}

		handleUpdateApiKey() {
			axios( { // not sending key as post - still get
				method: 'post',
				url: gutenGoogleMapsGlobal.ajaxUrl,
				params: {
					action: 'guten_google_maps_update_api_key',
					_ajax_nonce: gutenGoogleMapsGlobal.nonce,
					guten_google_maps_api_key: this.state.apiKey,
				},
			} )
				.then( function( response ) {
					Geocode.setApiKey( this.state.apiKey );
					this.props.setAttributes( { apiKey: this.state.apiKey } );
				} )
				.catch( function( error ) {
					console.log( error );
				} );
		}

		handleAddLocation() {
			let locations = this.state.locations;

			if ( locations.length ) {
				locations.push( {
					lat: 35.2270869,
					lng: -80.8431267,
					address: '',
				} );
			} else {
				locations = [ {
					lat: 35.2270869,
					lng: -80.8431267,
					address: '',
				} ];
			}

			this.setState( {
				locations,
				locationsUpdated: true,
			} );

			this.handleCreateGoogleMap();
		}

		handleRemoveLocation( index ) {
			const locations = this.state.locations;
			locations.splice( index, 1 );

			this.setState( { locations } );
			this.props.setAttributes( { locations: JSON.stringify( locations ) } );

			this.handleCreateGoogleMap();
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

						this.props.setAttributes( { locations: JSON.stringify( locations ) } );
						this.setState( {
							locations,
							locationsUpdated: false,
						} );

						this.handleCreateGoogleMap();
					},
					error => {
						console.log( error );
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
							className="guten-google-maps__marker-address"
							placeholder="350 Fifth Avenue New York NY"
							value={ this.state.locations[ index ].address }
							onChange={ ( address ) => this.handleLocationChange( address, index ) }
						/>
						<IconButton
							className="guten-google-maps__remove-marker-address"
							icon="no-alt"
							label="Delete Marker"
							onClick={ () => this.handleRemoveLocation( index ) }
						/>
					</Fragment>;
				} );
			}

			const map = <div style={ { height: this.props.attributes.mapHeight + 'px' } } />;

			const emptyPanel = <p>Please add a <a href="https://developers.google.com/maps/documentation/javascript/get-api-key" target="_blank" rel="noopener noreferrer">Google Maps API key</a>.</p>;

			const mapDefaultsPanel = this.state.apiKey ? <Fragment>
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
			</Fragment> : emptyPanel;

			const mapMarkersPanel = this.state.apiKey ? <Fragment>
				{ markerFields }
				<Button
					isDefault
					onClick={ this.handleAddLocation.bind( this ) }
				>
					{ __( 'Add Marker' ) }
				</Button>
				{ this.state.locationsUpdated && <Button
					isPrimary
					style={ { marginLeft: '10px' } }
					onClick={ this.handleUpdateLocations.bind( this ) }
				>
					{ __( 'Apply Updates' ) }
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
				onChange={ ( quickStyle ) => this.props.setAttributes( { quickStyle } ) }
			/> : emptyPanel;

			const advancedStylePalettePanel = this.state.apiKey ? <Fragment>
				<TextareaControl
					label={ __( 'JSON Style Profile' ) }
					value={ this.props.attributes.advancedStyle }
					onChange={ ( advancedStyle ) => this.props.setAttributes( { advancedStyle } ) }
				/>
				<p>Write your own style profile or use <a href="https://mapstyle.withgoogle.com/" target="_blank" rel="noopener noreferrer">Google&apos;s Styling Wizard</a> to generate one. Paste the generated code here. A value here will override the Map Style set in Quick Style Palettes.</p>
			</Fragment> : emptyPanel;

			return [
				<InspectorControls key="1">
					<PanelBody
						title={ __( 'Google Maps API Key' ) }
						initialOpen={ ! gutenGoogleMapsGlobal.apiKey }
					>
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
					</PanelBody>
					<PanelBody
						title={ __( 'Map Defaults' ) }
					>
						{ mapDefaultsPanel }
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
