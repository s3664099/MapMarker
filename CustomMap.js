
//TO DO: When the mouse goes over the marker that marker remains and becomes bigger
//TO DO: When zoom becomes 15 all of the markers become bigger
//TO DO: Change Markers when change select box


//Creates the map
map = new OpenLayers.Map("demoMap");
var mapnik         = new OpenLayers.Layer.OSM();

//variables for setting the position that the map initially opens up on
//This is centred on Melbourne
var lon = 144.9531764;
var lat = -37.8167717;
var zoom = 10;
var marker = new Array();
var markerLarge = new Array();

//Not entirely sure what these are for, though this does have something to do
//with the way the map is located. Details are found on the OpenLayers documentation
//http://dev.openlayers.org/releases/OpenLayers-2.13.1/doc/apidocs/files/OpenLayers-js.html
var fromProjection = new OpenLayers.Projection("EPSG:4326");   // Transform from WGS 1984
var toProjection   = new OpenLayers.Projection("EPSG:900913"); // to Spherical Mercator Projection

//This sets the position of the map and the initial zoom. The transform is required for the
//map to be displayed
var position       = new OpenLayers.LonLat(lon,lat).transform( fromProjection, toProjection);
map.addLayer(mapnik);

//Sets the centre of the map, and the zoom
map.setCenter(position, zoom);

var markType;

//tells program whether markers have been set or not
var markSet = false;

//Tells whether large icons are being used
var largeIcons = false;

//This listener listens from when the user stops zooming
map.events.register('zoomend',map, function(){

	//the zoom level is recorded
	var zoomLevel = map.getZoom();

	//if it is greater than a certain point (14) then the icons are enlarged
	//and the use of the large icons is recorded
	if (zoomLevel>14 && markSet && !largeIcons)
	{
		hideMarkers();
		showLargeMarkers();
		largeIcons = true;

	//if it is kless than a certain point (15) then the icons are shrunk
	//and the use of the small icons is recorded
	} else if (zoomLevel<15 && markSet && largeIcons) {

		hideLargeMarkers();
		showMarkers();
		largeIcons = false;
	}


});


//This function adds the markers to the map
function addMarker(a, b, c, d, e, f)
{

	//setting the varibables due to isses
	//with passing variables through the function
	var lati = a;
	var long = b;
	var name = c;
	var address = d.substring(1,d.length-1);
	var type = e;

	//Sets the location of the marker
	var location = new OpenLayers.LonLat(lati, long).transform(fromProjection,toProjection);
	
	var icon;

	if (markType == "marker")
	{
		//calls the marker image
		icon = getMarker();

	} else {

		//sets the size of the marker in pixels
		var size = new OpenLayers.Size(20,20);

		//calls the icon image respresenting the type
		icon = getIcon(type, size);

		//Notes that the markers have now been set
		markSet = true;

	}

	//this creates the layer with the name Marker
	var markerLayer = new OpenLayers.Layer.Markers("Markers");

	//Adds the layer to the map
	map.addLayer(markerLayer);

	//the marker is then created
	marker[f] = new OpenLayers.Marker(location, icon);

	//the marker is then added to the layer
	markerLayer.addMarker(marker[f]);


	//A second marker is created and hidden
	//this is for when the icon is clicked and when the area is zoomed in beyond a certain point
	//the marker is then hidden, to be revealed only at certain times.
	var iconLarge = getIcon(type, new OpenLayers.Size(40,40));
	markerLarge[f] = new OpenLayers.Marker(location, iconLarge);
	markerLayer.addMarker(markerLarge[f]);
	markerLarge[f].display(false);

	//This is how events are added to the markers
	//This event will display the details of the marker when it is clicked
	//Unfortunately, I've noticed that the longitude and latitude characteristics are
	//a little off. The other issue is that I do not know what the other event types are
	//since I would like to have it hover
	markerLayer.events.register("mouseover", markerLayer, function(e){

		hideMarkers();
		markerLarge[f].display(true);

		//This creates a popup which is called when the mouse moves over the marker.
		//The details of the popup is: name, location, size, what is displayed, and whether
		//an escape button is included
		popup = new OpenLayers.Popup(a, location,
			new OpenLayers.Size(150, 150),
			"<div style='border-style:solid;padding:5px'><b>"+name+"</b></br>"+address+"<div>",false);

		//the popup is added to the map
		map.addPopup(popup);
	});

	//This event removes the popup when the mouse leaves the marker
	markerLayer.events.register("mouseout", markerLayer, function(e){

		showMarkers();
		markerLarge[f].display(false);

		map.removePopup(popup);

	});

}

//These two functions hide and display all the markers.
//This is because it has been difficult to determine how to prevent
//the markers from overriding the popups.
function hideMarkers()
{
	for (j=1;j<marker.length;j++)
	{
		marker[j].display(false);
	}
}

function showMarkers()
{
	for (j=1;j<marker.length;j++)
	{
		marker[j].display(true);
	}
}

function hideLargeMarkers()
{
	for (j=1;j<marker.length;j++)
	{
		markerLarge[j].display(false);
	}
}

function showLargeMarkers()
{
	for (j=1;j<marker.length;j++)
	{
		markerLarge[j].display(true);
	}
}

function getMarker()
{
	var size = new OpenLayers.Size(20,20);
	var icon = new OpenLayers.Icon('icons/mapmarker.png');

	return icon;
}

function getIcon(type, size)
{

	//Generates an icon based on the type of place at the marker
	switch (type) {
		case "Airport":
			var icon = new OpenLayers.Icon('icons/aeroplane.png', size);
			break;
		case "Bakery":
			var icon = new OpenLayers.Icon('icons/loaf.png', size);
			break;
		case "Beach":
			var icon = new OpenLayers.Icon('icons/beach.png', size);
			break;
		case "Books":
			var icon = new OpenLayers.Icon('icons/bookshelf.png', size);
			break;
		case "Bottle Shop":
			var icon = new OpenLayers.Icon('icons/wine-bottle.png', size);
			break;
		case "Bridge":
			var icon = new OpenLayers.Icon('icons/bridge.png', size);
			break;
		case "Cafe":
			var icon = new OpenLayers.Icon('icons/coffee.png', size);
			break;
		case "Casino":
			var icon = new OpenLayers.Icon('icons/roulette.png', size);
			break;
		case "Castle":
			var icon = new OpenLayers.Icon('icons/castle.png', size);
			break;
		case "Clothes":
			var icon = new OpenLayers.Icon('icons/suit.png', size);
			break;
		case "Computer":
			var icon = new OpenLayers.Icon('icons/computer.png', size);
			break;
		case "Government":
			var icon = new OpenLayers.Icon('icons/court.png', size);
			break;
		case "Health":
			var icon = new OpenLayers.Icon('icons/hospital.png', size);
			break;
		case "Hotel":
			var icon = new OpenLayers.Icon('icons/bed.png', size);
			break;
		case "Icecream Bar":
			var icon = new OpenLayers.Icon('icons/ice-cream.png', size);
			break;
		case "Juice Bar":
			var icon = new OpenLayers.Icon('icons/juice.png', size);
			break;
		case "Lolly Shop":
			var icon = new OpenLayers.Icon('icons/lollipop.png', size);
			break;
		case "Lookout":
			var icon = new OpenLayers.Icon('icons/lookout.png', size);
			break;
		case "Monument":
			var icon = new OpenLayers.Icon('icons/obelisk.png', size);
			break;
		case "Museum":
			var icon = new OpenLayers.Icon('icons/exhibition.png', size);
			break;
		case "Park":
			var icon = new OpenLayers.Icon('icons/forest.png', size);
			break;
		case "Professional":
			var icon = new OpenLayers.Icon('icons/briefcase.png', size);
			break;		
		case "Pub/Bar":
			var icon = new OpenLayers.Icon('icons/beers.png', size);
			break;
		case "Public Transport Station":
			var icon = new OpenLayers.Icon('icons/platform.png', size);
			break;
		case "Restaurant, American":
			var icon = new OpenLayers.Icon('icons/burger.png', size);
			break;
		case "Restaurant, Asian":
			var icon = new OpenLayers.Icon('icons/noodles.png', size);
			break;
		case "Restaurant, French":
			var icon = new OpenLayers.Icon('icons/croissant.png', size);
			break;
		case "Restaurant, Indian":
			var icon = new OpenLayers.Icon('icons/curry.png', size);
			break;
		case "Restaurant, Italian":
			var icon = new OpenLayers.Icon('icons/pizza.png', size);
			break;
		case "Restaurant, Mexican":
			var icon = new OpenLayers.Icon('icons/burrito.png', size);
			break;
		case "Restaurant, Middle Eastern":
			var icon = new OpenLayers.Icon('icons/kebab.png', size);
			break;
		case "Restaurant, Seafood":
			var icon = new OpenLayers.Icon('icons/lobster.png', size);
			break;
		case "Restaurant, Takeaway":
			var icon = new OpenLayers.Icon('icons/fast-food.png', size);
			break;
		case "Shopping Centre":
			var icon = new OpenLayers.Icon('icons/goods.png', size);
			break;
		case "Stadium":
			var icon = new OpenLayers.Icon('icons/stadium.png', size);
			break;
		case "Souveniers":
			var icon = new OpenLayers.Icon('icons/souvenir.png', size);
			break;
		case "Theatre/Cinema":
			var icon = new OpenLayers.Icon('icons/theater.png', size);
			break;
		case "Variety":
			var icon = new OpenLayers.Icon('icons/sale.png', size);
			break;
		case "Waiting Room":
			var icon = new OpenLayers.Icon('icons/lounge.png', size);
			break;
		case "Zoo":
			var icon = new OpenLayers.Icon('icons/rhino.png', size);
			break;
		default:
			var icon = new OpenLayers.Icon('icons/mark.png', size);
	}

	return icon;
}


//The fuction use to load the CSV file into the system
//This even fires once the file has been loaded after the button
//has been clicked and the file selected.
window.onload = function() {

		//This calls the input tag from the HTML code
		var fileInput = document.getElementById('docpicker');

		//This calls the select box from the HTML code to determine whether it will be
		//markers or icons
		markType = document.getElementById('markertype').value;

		//This adds the event listener to listen to whether a file has been loaded
		fileInput.addEventListener('change', function(e) {
			var file = fileInput.files[0];

			//The file type is listed here. In this case only text files (.txt) can be used
			var textType = /text.*/;

			//If the file is a text file, then the code to read the file is executed
			if (file.type.match(textType)) {
				var reader = new FileReader();

				//the event (e) is fired when a load even occurs
				reader.onload = function (e) {

					//The number of rows are determined and stored in an array
					//A new row is created when a newline (\n) is detected
					var rows = e.target.result.split("\n");

					//the code now cycles through each of the rows
					for (var i = 0; i < rows.length; i++) {
						
						if (i!=0)
						{
							//the cells are now defined, and determed based on the number of tab spaces (/t)
							var cells = rows[i].split("\t");

							//The data is then places into variables for data manipulation
							//Titles are used so as we know what value is going where
							var title = cells[0];
							var address = cells[1];
							var lati = cells[4];
							var long = cells[5];
							var type = cells[8];

							//markers for the places are then added to the map.
							//Note that the longitude goes first, and then the latitude
							//The location of the marker is also returned
							addMarker(long,lati, title, address, type, i);
						}
					}
				}
				reader.readAsText(file);
			} else {
				fileDisplayArea.innerText = "File not supported!"
			}
		});
}

// Code to display map and markers used from: https://wiki.openstreetmap.org/wiki/API_v0.6
// Code to load CSV/Text file used from: https://www.quora.com/What-is-the-best-way-to-read-a-CSV-file-using-JavaScript-not-JQuery
// (yeah, I didn't expect to find code ofn QUORA either), and also from: https://codepen.io/matt-west/pen/KjEHg