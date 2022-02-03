
//Creation du marker
var myIcon = L.icon({
    iconUrl:"../data/ico/fire_48px.png",
    iconSize: [30,25],
    popupAnchor: [1, -10],
});

// Couleurs de la carte choropèthe
function getColor(nombrePoints) {
    return nombrePoints > 7000 ? '#800026' :
        nombrePoints > 4500  ? '#BD0026' :
            nombrePoints > 3000 ? '#E31A1C' :
                nombrePoints > 1500  ? '#FC4E2A' :
                    nombrePoints > 700   ? '#FD8D3C' :
                        nombrePoints > 350   ? '#FEB24C' :
                            nombrePoints > 200   ? '#FED976' :
                                '#FFEDA0';
}

//var map_init = L.map('map').setView([9.4,9.03],7)
var map_init = L.map('map',{
    minZoom:0,
    maxZoom:20,
    zoomControl:false,
    doubleClickZoom: false,
    zoomAnimationThreshold: 5,
    fullscreenControl: true,
    fullscreenControlOptions: {
        title:"Plein écran!",
        titleCancel:"Quitter plein écran"
    },
    
}).setView([53.99999940307589,-69.01611328125],5,)



// Ajout des fonds de cates
var osmAttrib='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
var osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: osmAttrib
}).addTo(map_init);


var Esri_WorldImagery = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
    attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
});


// Ajout de la petite fond de carte

var osmUrl='http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
var osm2 = new L.TileLayer(osmUrl, {minZoom: 0, maxZoom: 18, attribution: osmAttrib});
var osm3 = new L.TileLayer(osmUrl, {minZoom: 0, maxZoom: 18, attribution: osmAttrib });
var miniMap = new L.Control.MiniMap(osm3, {
    toggleDisplay: true,
    minimized: true,
    zoomAnimation: true,
    collapsedWidth:50,
    collapsedHeight:50}).addTo(map_init);


// Création des clusters
let markers = L.markerClusterGroup({
    spiderfyOnMaxZoom: false,
    showCoverageOnHover: false,
    zoomToBoundsOnClick: true,
    spiderfyDistanceMultiplier: 1
});


// Lecture des données des points d'origine de feux
var points_feux = $.getJSON("../data/points_origines.geojson",function (data) {
    for (let i = 0; i < Object.keys(points_feux).length-21; i++) {
    var marker = L.geoJson(data, {
        pointToLayer: function (feature, latlng) {
            var marker = L.marker(latlng, {
                icon: myIcon,
                title: "Apercu",
                opacity: "0.8",

            });
            marker.bindPopup("<b>ANNEE:" + feature.properties.ANNEE+"</b><br>"+
            "<b>Section:" + feature.properties.SECTION+"</b><br>"+
                "<b>Date debut :" + feature.properties.DATE_DEBUT+"</b><br>"+
                "<b>Date fin :" + feature.properties.DATE_ETEIN+"</b><br>"+
                "<b>Superficie :" + feature.properties.SUP_HA+" hectares</b><br>"+
                "<b>Cause :" + feature.properties.CAUSE+"</b><br>",

            )
            return marker;
        }

    }).addTo(markers);
}});

markers.addTo(map_init);


let markerHomme = L.markerClusterGroup({
    spiderfyOnMaxZoom: false,
    showCoverageOnHover: false,
    zoomToBoundsOnClick: true,
    spiderfyDistanceMultiplier: 1,
   
});


// Lecture des données des points d'origine de feux causés par l'homme
var points_homme = $.getJSON("../data/points_origines.geojson",function (data) {
    for (let i = 0; i < Object.keys(points_homme).length-21; i++) {
        var marker = L.geoJson(data, {
            pointToLayer: function (feature, latlng) {
                if  (feature.properties.CAUSE === 'Humaine') {
                    var marker = L.marker(latlng, {
                        icon: myIcon,
                        title: "Apercu",
                        opacity: "0.8",

                    });
                    marker.bindPopup("<b>ANNEE:" + feature.properties.ANNEE+"</b><br>"+
                        "<b>Section:" + feature.properties.SECTION+"</b><br>"+
                        "<b>Date debut :" + feature.properties.DATE_DEBUT+"</b><br>"+
                        "<b>Date fin :" + feature.properties.DATE_ETEIN+"</b><br>"+
                        "<b>Superficie :" + feature.properties.SUP_HA+" hectares</b><br>"+
                        "<b>Cause :" + feature.properties.CAUSE+"</b><br>",

                    )
                    return marker;
                }



            }

        }).addTo(markerHomme);
    }});

//markerHomme.addTo(map_init);

let markerFoudre = L.markerClusterGroup({
    spiderfyOnMaxZoom: false,
    showCoverageOnHover: false,
    zoomToBoundsOnClick: true,
    spiderfyDistanceMultiplier: 1,

});
// Lecture des données des points d'origine de feux causés par l'homme
var points_foudre = $.getJSON("../data/points_origines.geojson",function (data) {
    for (let i = 0; i < Object.keys(points_foudre).length-21; i++) {
        var marker = L.geoJson(data, {
            pointToLayer: function (feature, latlng) {
                if  (feature.properties.CAUSE === 'Foudre') {
                    var marker = L.marker(latlng, {
                        icon: myIcon,
                        title: "Apercu",
                        opacity: "0.8",

                    });
                    marker.bindPopup("<b>ANNEE:" + feature.properties.ANNEE+"</b><br>"+
                        "<b>Section:" + feature.properties.SECTION+"</b><br>"+
                        "<b>Date debut :" + feature.properties.DATE_DEBUT+"</b><br>"+
                        "<b>Date fin :" + feature.properties.DATE_ETEIN+"</b><br>"+
                        "<b>Superficie :" + feature.properties.SUP_HA+" hectares</b><br>"+
                        "<b>Cause :" + feature.properties.CAUSE+"</b><br>",

                    )
                    return marker;
                }



            }

        }).addTo(markerFoudre);
    }});




// Leture des limites admistratives
var drawnItems = new L.FeatureGroup();

function style(feature) {
    return {
        fillColor: getColor(feature.properties.NUMPOINTS),
        weight: 2,
        opacity: 1,
        color: 'white',
        dashArray: '3',
        fillOpacity: 0.7
    };
};


// Zoom slorsqu'on clique
function zoomToFeature(e) {
    map_init.fitBounds(e.target.getBounds());
}


function onEachFeature(feature, layer) {
    layer.on({
        'click': zoomToFeature
        
    });
   
    layer.bindPopup(
        "<b>" + feature.properties.nom_unite_+"</b><br>"+
        "<b>Points:" + feature.properties.NUMPOINTS+"</b><br>");
}


geojson = $.getJSON("../data/territoireAdmistratifNBPoints.geojson",function (data) {
    L.geoJSON(data, {
        onEachFeature: onEachFeature,
        style: style,
    }).addTo(drawnItems);

});
drawnItems.addTo(map_init)

// Statistique des données




// Légende 
var legend = L.control({position: 'bottomright'});

legend.onAdd = function (map) {

    var div = L.DomUtil.create('div', 'info legend'),
        grades = [1, 350, 700, 1500, 3000, 4500, 7000],
        labels = [];

    // parcourir nos intervalles de points et générer une étiquette avec un carré de couleur pour chaque intervalle
    div.innerHTML = '<h2 style="text-align: center">Points des feux</h2>'
    for (var i = 0; i < grades.length; i++) {
        div.innerHTML +=
            
            '<i style="background:' + getColor(grades[i] + 1) + ' "></i> ' +
            grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
    }

    return div;
};

legend.addTo(map_init);
// Creation du tableau de bord


//Création de la basemap des fonds de cartes
var Basemaps = {
    "OSM": osm,
    "WorldImage": Esri_WorldImagery,
}

//Pour afficher une couche de marker
var Overlaymaps = {
    "Base": {
        "Regions": drawnItems,
        "Points origines": markers,
   
    },
    "Origines":{
        "Humaine": markerHomme,
        "Foudre": markerFoudre,

    }
}

//L.control.layers(Basemaps,Overlaymaps).addTo(map_init);

// Use the custom grouped layer control, not "L.control.layers"
L.control.groupedLayers(Basemaps, Overlaymaps,{collapsed:false}).addTo(map_init);


//Ajout de l'échelle graphique
var graphicScale = L.control.graphicScale({
    doubleLine: true,
    fill: 'hollow',
    showSubunits: true,
    minUnitWidth: 50,
    maxUnitWidth: 50,
    labelPlacement: "auto"

});
graphicScale.addTo(map_init);
var scaleText = L.DomUtil.create('div', 'scaleText' );
graphicScale._container.insertBefore(scaleText, graphicScale._container.firstChild);
scaleText.innerHTML = '<h1></h1><p>Choisir un style: <span class="choice">hollow</span>-<span class="choice">line</span>-<span class="choice">fill</span>-<span class="choice">nofill</span></p>';

var styleChoices = scaleText.querySelectorAll('.choice');

for (var i = 0; i < styleChoices.length; i++) {
    styleChoices[i].addEventListener('click', function(e) {
        graphicScale._setStyle( { fill: e.currentTarget.innerHTML } );
    });
}

L.control.zoom({
    zoomInText: "Z",
    zoomOutText: "D",
    zoomInTitle: "Zoomer",
    zoomOutTitle: "Dézoomer",

}).addTo(map_init);

// Ajout de la localisation
var gps = new L.Control.Gps({
    //autoActivation:true,
    autoCenter:true,
    maxZoom: 20,
    style: {radius:20,color:'#2d8000',fillColor:'#f23'},
    title: "Votre position actuelle"
});//initialisation du controle

gps.on('gps:located', function(e) {

        console.log(e.latlng, map_init.getCenter())
    })
    .on('gps:disabled', function(e) {
        e.marker.closePopup()
    });
gps.addTo(map_init);

// Reinitialiser la vue
L.control.resetView({
    position: "topleft",
    title: "Reset view",
    latlng: L.latLng([53.99999940307589,-69.01611328125]),
    zoom: 5,
}).addTo(map_init);

//Emplacement précédent
new L.HistoryControl({
    position: "topleft",
    maxMovesToSave:0,
    backText: '<-',
    backImage: 'glyphicon glyphicon-chevron-left',
    forwardText: '->',
    forwardImage: 'glyphicon glyphicon-chevron-right'
}).addTo(map_init);

// Affichage des meta données
L.control.viewMeta({
    position : "topright"
}).addTo(map_init);

// Utilisation du plein écran
// détection du plein écrant
map_init.on('enterFullscreen', function(){
    if(window.console) window.console.log('enterFullscreen');
});
map_init.on('exitFullscreen', function(){
    if(window.console) window.console.log('exitFullscreen');
});

//Imprimer une carte
L.control.browserPrint({
    printModes: [L.control.browserPrint.mode.landscape(), L.control.browserPrint.mode.custom("Séléctionnez la zone")]
}).addTo(map_init);