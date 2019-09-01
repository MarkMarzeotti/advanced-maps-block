function gutenGoogleMapInit() {
	var maps = document.getElementsByClassName( 'guten-google-maps' );

	Array.prototype.forEach.call( maps, function( mapItem ) {
		var markers = JSON.parse( mapItem.dataset.markers ),
			center = JSON.parse( mapItem.dataset.center ),
			zoom = JSON.parse( mapItem.dataset.zoom ),
			scrollwheel = JSON.parse( mapItem.dataset.scrollwheel ),
			disableDefaultUI = JSON.parse( mapItem.dataset.disabledefaultui ),
			styles = JSON.parse( mapItem.dataset.styles );

		var map = new google.maps.Map( mapItem, {
			scrollwheel: scrollwheel,
			disableDefaultUI: disableDefaultUI,
			styles: styles,
		} );

		var marker, i;
		var bounds = new google.maps.LatLngBounds();
		for ( i = 0; i < markers.length; i++ ) {
			if ( markers[ i ].lat && markers[ i ].lng ) {
				marker = new google.maps.Marker( {
					position: new google.maps.LatLng( markers[ i ].lat, markers[ i ].lng ),
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

		var listener = google.maps.event.addListener( map, 'bounds_changed', function() {
			if ( map.getZoom() !== zoom ) map.setZoom( zoom );
			google.maps.event.removeListener( listener );
		} );
	} );
}
