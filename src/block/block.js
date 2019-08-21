/**
 * BLOCK: Guten Google Map
 */

//  Import CSS.
import './editor.scss';
import './style.scss';

import { withScriptjs, withGoogleMap, GoogleMap, Marker } from 'react-google-maps';

const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const { PanelBody, TextControl, RangeControl, ToggleControl } = wp.components;
const { InspectorControls, PanelColorSettings } = wp.editor;

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
		color: {
			type: 'string',
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
		const MapComponent = withScriptjs( withGoogleMap( () =>
			<GoogleMap
				defaultZoom={ props.attributes.zoom }
				defaultCenter={ { lat: 35.239418, lng: -80.8455486 } }
				defaultOptions={ {
					disableDefaultUI: ! props.attributes.defaultUI,
					scrollwheel: props.attributes.allowScrolling,
					// styles: [
					// 	{
					// 		elementType: 'geometry',
					// 		stylers: [
					// 			{
					// 				color: '#f5f5f5',
					// 			},
					// 		],
					// 	},
					// 	{
					// 		elementType: 'labels.icon',
					// 		stylers: [
					// 			{
					// 				visibility: 'off',
					// 			},
					// 		],
					// 	},
					// 	{
					// 		elementType: 'labels.text.fill',
					// 		stylers: [
					// 			{
					// 				color: '#616161',
					// 			},
					// 		],
					// 	},
					// 	{
					// 		elementType: 'labels.text.stroke',
					// 		stylers: [
					// 			{
					// 				color: '#f5f5f5',
					// 			},
					// 		],
					// 	},
					// 	{
					// 		featureType: 'administrative.land_parcel',
					// 		elementType: 'labels.text.fill',
					// 		stylers: [
					// 			{
					// 				color: '#bdbdbd',
					// 			},
					// 		],
					// 	},
					// 	{
					// 		featureType: 'poi',
					// 		elementType: 'geometry',
					// 		stylers: [
					// 			{
					// 				color: '#eeeeee',
					// 			},
					// 		],
					// 	},
					// 	{
					// 		featureType: 'poi',
					// 		elementType: 'labels.text.fill',
					// 		stylers: [
					// 			{
					// 				color: '#757575',
					// 			},
					// 		],
					// 	},
					// 	{
					// 		featureType: 'poi.park',
					// 		elementType: 'geometry',
					// 		stylers: [
					// 			{
					// 				color: '#e5e5e5',
					// 			},
					// 		],
					// 	},
					// 	{
					// 		featureType: 'poi.park',
					// 		elementType: 'labels.text.fill',
					// 		stylers: [
					// 			{
					// 				color: '#9e9e9e',
					// 			},
					// 		],
					// 	},
					// 	{
					// 		featureType: 'road',
					// 		elementType: 'geometry',
					// 		stylers: [
					// 			{
					// 				color: '#ffffff',
					// 			},
					// 		],
					// 	},
					// 	{
					// 		featureType: 'road.arterial',
					// 		elementType: 'labels.text.fill',
					// 		stylers: [
					// 			{
					// 				color: '#757575',
					// 			},
					// 		],
					// 	},
					// 	{
					// 		featureType: 'road.highway',
					// 		elementType: 'geometry',
					// 		stylers: [
					// 			{
					// 				color: '#dadada',
					// 			},
					// 		],
					// 	},
					// 	{
					// 		featureType: 'road.highway',
					// 		elementType: 'labels.text.fill',
					// 		stylers: [
					// 			{
					// 				color: '#616161',
					// 			},
					// 		],
					// 	},
					// 	{
					// 		featureType: 'road.local',
					// 		elementType: 'labels.text.fill',
					// 		stylers: [
					// 			{
					// 				color: '#9e9e9e',
					// 			},
					// 		],
					// 	},
					// 	{
					// 		featureType: 'transit.line',
					// 		elementType: 'geometry',
					// 		stylers: [
					// 			{
					// 				color: '#e5e5e5',
					// 			},
					// 		],
					// 	},
					// 	{
					// 		featureType: 'transit.station',
					// 		elementType: 'geometry',
					// 		stylers: [
					// 			{
					// 				color: '#eeeeee',
					// 			},
					// 		],
					// 	},
					// 	{
					// 		featureType: 'water',
					// 		elementType: 'geometry',
					// 		stylers: [
					// 			{
					// 				color: '#c9c9c9',
					// 			},
					// 		],
					// 	},
					// 	{
					// 		featureType: 'water',
					// 		elementType: 'labels.text.fill',
					// 		stylers: [
					// 			{
					// 				color: '#9e9e9e',
					// 			},
					// 		],
					// 	},
					// ],
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
				<PanelColorSettings
					title={ __( 'Style Settings' ) }
					initialOpen={ false }
					colorSettings={ [
						{
							value: props.attributes.color,
							onChange: ( color ) => props.setAttributes( { color } ),
							label: __( 'Color' ),
						},
					] }
				/>
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
		return (
			<div className={ props.className }>
			</div>
		);
	},
} );
