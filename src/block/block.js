/**
 * BLOCK: Guten Google Map
 */

//  Import CSS.
import './editor.scss';
import './style.scss';

import { withScriptjs, withGoogleMap, GoogleMap, Marker } from 'react-google-maps';

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

/**
 * Register: Guten Google Map Block.
 *
 * @link https://wordpress.org/gutenberg/handbook/block-api/
 * @param  {string}   name     Block name.
 * @param  {Object}   settings Block settings.
 * @return {?WPBlock}          The block, if it has been successfully
 *                             registered; otherwise `undefined`.
 */
registerBlockType( 'guten-google-map/guten-google-map', {
	title: __( 'Guten Google Map' ),
	icon: 'location',
	category: 'common',
	attributes: {
		address: {
			type: 'string',
			default: '',
		},
		mapHeight: {
			type: 'integer',
			default: 400,
		},
		zoom: {
			type: 'integer',
			default: 12,
		},
		defaultUI: {
			type: 'boolean',
			default: true,
		},
		allowScrolling: {
			type: 'boolean',
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
	edit: ( props ) => {
		const advancedStyleJSON = props.attributes.advancedStyle ? JSON.parse( props.attributes.advancedStyle ) : [];
		const mapStyles = props.attributes.quickStyle !== 'standard' && ! props.attributes.advancedStyle ? defaultStyles[ props.attributes.quickStyle ] : [ ...advancedStyleJSON ];

		const MapComponent = withScriptjs( withGoogleMap( () =>
			<GoogleMap
				defaultZoom={ props.attributes.zoom }
				defaultCenter={ { lat: 35.239418, lng: -80.8455486 } }
				defaultOptions={ {
					disableDefaultUI: ! props.attributes.defaultUI,
					scrollwheel: props.attributes.allowScrolling,
					styles: [ ...mapStyles ],
				} }
			>
				<Marker position={ { lat: 35.239418, lng: -80.8455486 } } />
			</GoogleMap>
		) );

		return [
			<InspectorControls key="1">
				<PanelBody
					title={ __( 'Map Defaults' ) }
				>
					<TextControl
						label={ __( 'Map Height' ) }
						type="number"
						value={ props.attributes.mapHeight }
						onChange={ ( mapHeight ) => props.setAttributes( { mapHeight: parseInt( mapHeight ) } ) }
					/>
					<RangeControl
						label={ __( 'Zoom' ) }
						value={ props.attributes.zoom }
						onChange={ ( zoom ) => props.setAttributes( { zoom } ) }
						min={ 1 }
						max={ 20 }
					/>
					<ToggleControl
						label={ __( 'Show Default UI' ) }
						help={ props.attributes.defaultUI ? 'Default UI is enabled.' : 'Default UI is disabled.' }
						checked={ props.attributes.defaultUI }
						onChange={ () => props.setAttributes( { defaultUI: ! props.attributes.defaultUI } ) }
					/>
					<ToggleControl
						label={ __( 'Allow Scrolling' ) }
						help={ props.attributes.allowScrolling ? 'Scrolling is allowed.' : 'Scrolling is not allowed.' }
						checked={ props.attributes.allowScrolling }
						onChange={ () => props.setAttributes( { allowScrolling: ! props.attributes.allowScrolling } ) }
					/>
				</PanelBody>
				<PanelBody
					title={ __( 'Quick Style Palettes' ) }
					initialOpen={ false }
				>
					<RadioControl
						label={ __( 'Map Style' ) }
						selected={ props.attributes.quickStyle }
						options={ [
							{ label: 'Standard', value: 'standard' },
							{ label: 'Silver', value: 'silver' },
							{ label: 'Retro', value: 'retro' },
							{ label: 'Dark', value: 'dark' },
							{ label: 'Night', value: 'night' },
							{ label: 'Aubergine', value: 'aubergine' },
						] }
						onChange={ ( quickStyle ) => props.setAttributes( { quickStyle } ) }
					/>
				</PanelBody>
				<PanelBody
					title={ __( 'Advanced Style Palette' ) }
					initialOpen={ false }
				>
					<TextareaControl
						label={ __( 'JSON Style Profile' ) }
						help={ __( 'Write your own style profile or use the Map Style Tool to generate one. Paste the generated code here. A value here will override the Map Style set in Quick Style Palettes.' ) }
						value={ props.attributes.advancedStyle }
						onChange={ ( advancedStyle ) => props.setAttributes( { advancedStyle } ) }
					/>
					<Button
						href="https://mapstyle.withgoogle.com"
						target="_blank"
						isDefault>
						{ __( 'Map Style Tool' ) }
					</Button>
				</PanelBody>
			</InspectorControls>,
			<div key="2" className={ props.className }>
				<MapComponent
					googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyCb0NahCEnubhm0zEaBcJKF4nPgrSZ3IQM"
					loadingElement={ <div style={ { height: '100%' } } /> }
					containerElement={ <div style={ { height: props.attributes.mapHeight + 'px' } } /> }
					mapElement={ <div style={ { height: '100%' } } /> }
				/>
			</div>,
		];
	},
	save: ( props ) => {
		const advancedStyleJSON = props.attributes.advancedStyle ? JSON.parse( props.attributes.advancedStyle ) : [];
		const mapStyles = props.attributes.quickStyle !== 'standard' && ! props.attributes.advancedStyle ? defaultStyles[ props.attributes.quickStyle ] : [ ...advancedStyleJSON ];

		return (
			<div className={ props.className }>
				<div className="guten-google-map"
					data-center={ JSON.stringify( { lat: 35.239418, lng: -80.8455486 } ) }
					data-marker={ JSON.stringify( { lat: 35.239418, lng: -80.8455486 } ) }
					data-zoom={ props.attributes.zoom }
					data-scrollwheel={ props.attributes.allowScrolling }
					data-disabledefaultui={ props.attributes.defaultUI }
					data-styles={ JSON.stringify( mapStyles ) }
				></div>
			</div>
		);
	},
} );
