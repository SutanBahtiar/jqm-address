var defaultLatLng;

$('#addressPage').live('pageshow', function(event) {
    var id = getUrlVars()["id"];
    $.getJSON(serviceURL + 'getAddress.php?id='+id, displayAddress);
    console.log("ID ALAMAT " + id);
    
    displayMap();
});

function displayAddress(data) {
    var address = data.item;
    console.log(address);
    $('#addressHeader').text(address.kategori);
    $('#addressName').text(address.nama);
    $('#addressKodePos').text("Kode Pos : " + address.kode_pos);
    $('#addressTelepon').text("No Telepon : " + address.no_telepon);
    $('#addressAddress').text(address.alamat);
    
    defaultLatLng = new google.maps.LatLng(address.latitude, address.longtitude);
    console.log("latLang = " + defaultLatLng);
}

function drawMap(latlng) {
    var myOptions = {
        zoom: 17,
        center: latlng,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
		
    var map = new google.maps.Map(document.getElementById("map-canvas"), myOptions);
		
    // Add an overlay to the map of current lat/lng
    var marker = new google.maps.Marker({
        position: latlng,
        map: map,
        title: "Greetings!"
    });
}

function displayMap() {
    console.log("callMap");
	
    //    var defaultLatLng = new google.maps.LatLng(34.0983425, -118.3267434);  // Default to Hollywood, CA when no geolocation support
	
    if ( navigator.geolocation ) {
        function success(pos) {
            // Location found, show map with these coordinates
            //            drawMap(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
            drawMap(defaultLatLng);
        }
		
        function fail(error) {
            console.log(error);
            drawMap(defaultLatLng);  // Failed to find location, show default map
        }
		
        // Find the users current position.  Cache the location for 5 minutes, timeout after 6 seconds
        navigator.geolocation.getCurrentPosition(success, fail, {
            maximumAge: 500000, 
            enableHighAccuracy:true, 
            timeout: 6000
        });
    } else {
        drawMap(defaultLatLng);  // No geolocation support, show default map	
    }
}