function gutenGoogleMapInit() {
	const maps = document.getElementsByClassName( 'guten-google-map' );

	Array.prototype.forEach.call( maps, function( mapItem ) {
		const map = new google.maps.Map( mapItem, {
			zoom: JSON.parse( mapItem.dataset.zoom ),
			center: JSON.parse( mapItem.dataset.center ),
			scrollwheel: JSON.parse( mapItem.dataset.scrollwheel ),
			disableDefaultUI: JSON.parse( mapItem.dataset.disabledefaultui ),
			styles: JSON.parse( mapItem.dataset.styles ),
		} );

		const marker = new google.maps.Marker( {
			position: JSON.parse( mapItem.dataset.marker ),
			map: map,
		} );
	} );
}
