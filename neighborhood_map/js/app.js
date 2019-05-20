//Menu control
var hidedMenu = true;

//Foursquare credentials
var clientId = "";
var clientSecret = "";
var errorMessage = "<h5>Sorry, we could not load the informations now.<br> Try again or contact our suport team.</h5>";

//Map variables
var map;
var mapCenter = { lat: -23.563174, lng: -46.653872 };
var markers = [];
var infowindow = null;
var mapZoom = 16;

//clean filter field
$("#filter").val("");

/***** BACKBONE MODELS *****/
var Place = Backbone.Model.extend({
    defaults: {
        position: null,
        title: "",
        selected: true
    }
});

/***** BACKBONE COLLECTIONS *****/
var PlacesCollection = Backbone.Collection.extend({
    model: Place,
    url: 'none.json'
});

//Init places collection
var placesCollection = new PlacesCollection([
    new Place({ position: { lat: -23.56145, lng: -46.655959 }, title: "Masp" }),
    new Place({ position: { lat: -23.5623978, lng: -46.6560147 }, title: "Starbucks" }),
    new Place({ position: { lat: -23.563817, lng: -46.653019 }, title: "Shopping Cidade São Paulo" })
]);

function initMap() {

    toogleMenu();

    //Init map
    map = new google.maps.Map(document.getElementById('map'), {
        center: mapCenter,
        zoom: mapZoom
    });

    infowindow = new google.maps.InfoWindow({
        content: ""
    });

    //Init markers
    placesCollection.forEach(function(place) {

        var marker = new google.maps.Marker({
            position: place.get("position"),
            map: map,
            title: place.get("title")
        });

        marker.addListener('click', function() {

            loadInfoWindow(marker, map);
        });

        markers.push(marker);
    });

    //Update visible marker maps when user type a letter at field value
    $("#filter").keyup(function(event) {

        infowindow.close();

        filterPlaces($("#filter").val());

        markers.forEach(function(marker) {

            var place = placesCollection.findWhere({ title: marker.getTitle() });

            if (!place.get("selected")) {

                marker.setMap(null);
            } else {

                marker.setMap(map);
                animateMarker(marker);
            }
        });
    });

    //Update places models that match or not with filter value
    var filterPlaces = function(filter) {

        placesCollection.forEach(function(place) {

            if (place.get("title").toLowerCase().search(filter.toLowerCase()) != -1) {

                place.set("selected", true);
            } else {

                place.set("selected", false);
            }
        });
    };

    //Search informations and images from Fousquare API
    var loadInfoWindow = function(selectedMarker) {

        var searchUrl = getSearchEndPoint(selectedMarker);
        animateMarker(selectedMarker);

        //Get infromations from Foursquare
        $.get(searchUrl, function(data) {

            var localId = data.response.venues[0].id;
            var altText = data.response.venues[0].name + "image";

            //Get images after get place ID from previous get
            $.get(getImageEndPoint(localId), function(photoData) {

                var src = photoData.response.photos.items[0].prefix + "120x120" + photoData.response.photos.items[0].suffix;

                infowindow.setContent('<h5>' + selectedMarker.title + '<h5><a href=' + data.response.venues[0].url +
                    '>Website</a><figure><img src="' + src + '" alt="' + altText + '"/><figcaption>' + data.response.venues[0].location.address +
                    '</figcaption></figure></div></div>');
                infowindow.open(map, selectedMarker);

            }).fail(function() {
                infowindow.setContent(errorMessage);
                infowindow.open(map, selectedMarker);
            });
        }).fail(function() {
            infowindow.setContent(errorMessage);
            infowindow.open(map, selectedMarker);
        });

        map.setCenter(selectedMarker.getPosition());
    };

    //Add animation effect to marker
    var animateMarker = function(marker) {

        marker.setAnimation(google.maps.Animation.BOUNCE);
        setTimeout(function() {
            marker.setAnimation(null);
        }, 3000);
    };

    //Return the URL to get informations about selected marker
    var getSearchEndPoint = function(selectedMarker) {

        var searchEndPoint = "https://api.foursquare.com/v2/venues/search?";
        var coordinates = selectedMarker.getPosition().lat() + "," + selectedMarker.getPosition().lng();
        var query = selectedMarker.title;

        return searchEndPoint + "query=" + query + "&ll=" + coordinates + "&client_id=" + clientId + "&client_secret=" + clientSecret + "&v=20180109";
    };

    //Return the URL of the local image
    var getImageEndPoint = function(localId) {

        var photosEndPoint = "https://api.foursquare.com/v2/venues/" + localId + "/photos?";

        return photosEndPoint + "&client_id=" + clientId + "&client_secret=" + clientSecret + "&v=20180109";
    };

    //Search for a marker in markers array by title
    var searchMarkerByTitle = function(title) {

        for (var i = 0; i < markers.length; i++) {

            if (markers[i].getTitle() == title) {

                return markers[i];
            }
        }
    };

    /***** BACKBONE VIEWS *****/
    //List item view
    var PlaceView = Backbone.View.extend({

        tagname: 'li',

        model: Place,

        template: _.template("<li role='menuitem' class='list-item'><%= title %></li>"),

        initialize: function() {

            this.render();
        },

        render: function() {

            this.$el.html(this.template(this.model.attributes))

            return this;
        },

        events: {
            'click': "selectItem"
        },

        selectItem: function() {

            $("div").each(function(index) {

                $(this).removeClass("selected-item");
            });
            this.$el.addClass("selected-item");
            var selectedMarker = searchMarkerByTitle(this.model.get('title'));
            loadInfoWindow(selectedMarker);
        }
    });

    //List view
    var PlacesCollectionView = Backbone.View.extend({

        el: $("#places-list"),

        model: PlacesCollection,

        initialize: function() {
            this.render();
            this.model.on('change', this.update, this);
        },

        render: function() {

            var self = this;

            this.model.forEach(function(place) {

                if (place.get("selected")) {

                    var placeView = new PlaceView({ model: place });

                    self.$el.append(placeView.$el);
                    placeView.render();
                }
            });

            return this;
        },

        update: function() {

            this.$el.html("");
            this.render();
        }
    });

    var placesCollectionView = new PlacesCollectionView({ model: placesCollection });
};

//Show/hide menu when user click on menu button
function toogleMenu() {

    if (hidedMenu) {

        $("#side-bar").css("width", "30%");
        $("#map").css("marginLeft", "30%");
        $("#top-bar").css("marginLeft", "30%");
        hidedMenu = false;

    } else {

        $("#side-bar").css("width", "0");
        $("#map").css("marginLeft", "0");
        $("#top-bar").css("marginLeft", "0");
        hidedMenu = true;
    }

    //Trigger change bounds event on menu resize
    if (map != null) {
        google.maps.event.trigger(map, 'bounds_changed');
    }
};

function showGoogleMapsError() {
    
    $("#map").prepend(errorMessage);
};