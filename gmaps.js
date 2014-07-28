/*
gmaps.js - https://github.com/bacchilu/gmaps

See http://www.lucabacchi.it/apps/gmaps for an example


Luca Bacchi <bacchilu@gmail.com> - http://www.lucabacchi.it
*/


var GMaps = function (idDiv) {

    var geocoder;
    var map;
    var lastMarker;

    function initialize() {
        geocoder = new google.maps.Geocoder();
        var mapOptions = {
            zoom: 8,
            center: new google.maps.LatLng(44.2227398, 12.040731199999982)
        };

        map = new google.maps.Map(document.getElementById(idDiv), mapOptions);
    }

    google.maps.event.addDomListener(window, "load", initialize);

    return {
        goTo: function (address, success, error) {
            if (lastMarker !== undefined)
                lastMarker.setMap(null);

            geocoder.geocode({"address": address}, function (results, status) {
                if (status === google.maps.GeocoderStatus.OK) {
                    map.setCenter(results[0].geometry.location);
                    lastMarker = new google.maps.Marker({map: map, position: results[0].geometry.location});
                    var normalizedAddress = results[0].formatted_address;
                    success(normalizedAddress);

                    var infowindow = new google.maps.InfoWindow({content: normalizedAddress});
                    google.maps.event.addListener(lastMarker, "click", function() {
                        infowindow.open(lastMarker.get("map"), lastMarker);
                    });

                    google.maps.event.trigger(map, "resize");
                }
                else
                    error(status);
            });
        }
    };
};