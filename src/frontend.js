function gutenGoogleMapInit() {
	var maps = document.getElementsByClassName( 'guten-google-map' );

	Array.prototype.forEach.call( maps, function( mapItem ) {
		var markers = JSON.parse( mapItem.dataset.markers );

		var map = new google.maps.Map( mapItem, {
			zoom: JSON.parse( mapItem.dataset.zoom ),
			center: markers[ 0 ],
			scrollwheel: JSON.parse( mapItem.dataset.scrollwheel ),
			disableDefaultUI: JSON.parse( mapItem.dataset.disabledefaultui ),
			styles: JSON.parse( mapItem.dataset.styles ),
		} );

		Array.prototype.forEach.call( markers, function( marker ) {
			return new google.maps.Marker( {
				position: marker,
				map: map,
			} );
		} );
	} );
}
