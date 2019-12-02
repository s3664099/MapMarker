
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
var icons = new Array();
var shut = new Array();

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

//tells the program to show the location info if mouse hovers over it
var showInfo = false;

//flag to determine whether icons are to be shown
var visibleIcons = false;

//Tells whether large icons are being used
var largeIcons = false;

//Tells whether the 'Google Maps' style icons are being used
var pointIcon = true;

//This listener listens from when the user stops zooming
map.events.register('zoomend',map, function(){

	displayIcon();
	checkZoom();
	
});

//A fuction that checks the zoom level and adjusts the markers accordingly
function checkZoom() {

	//the zoom level is recorded
	var zoomLevel = map.getZoom();

	//if it is greater than a certain point (14) then the icons are enlarged
	//and the use of the large icons is recorded
	if (zoomLevel>16)
	{
		hideMarkers();
		showLargeMarkers();
		largeIcons = true;
		showInfo = true;

	//if it is less than a certain point (15) then the icons are shrunk
	//and the use of the small icons is recorded. Further icons are only shown under
	//a certain point, otherwise we use 'Google Maps' markers
	} else if (zoomLevel<17 && zoomLevel>14) {

		hideLargeMarkers();
		showMarkers();
		largeIcons = false;
		showInfo = true;


	//this function changes all of the icons into 'Google Map' style markers
	} else {
		hideMarkers();

        //if the icons aren't being shown then the info won't
        //be displayed if the mouse hovers over the location
		if(!showIcons) {
			showInfo = false;
		}
	}

}

//This function adds the markers to the map
function addMarker(a, b, c, d, e, f, g)
{

	//setting the varibables due to isses
	//with passing variables through the function
	var lati = a;
	var long = b;
	var name = c;
	var address = d;
	var type = e;
	shut[f] = g;

	//Sets the location of the marker
	var location = new OpenLayers.LonLat(lati, long).transform(fromProjection,toProjection);
	
	var icon;

	//calls the marker image
	tag = getMarker();

	//sets the size of the marker in pixels
	var size = new OpenLayers.Size(20,20);

	//calls the icon image respresenting the type
	icon = getIcon(type, size);

	//Notes that the markers have now been set
	markSet = true;

	//this creates the layer with the name Marker
	var markerLayer = new OpenLayers.Layer.Markers("Markers");

	//Adds the layer to the map
	map.addLayer(markerLayer);

	//this creates a tag similar to the markers on google maps
	//for when the map is above a certain zoom level
	icons[f] = new OpenLayers.Marker(location, tag);
	markerLayer.addMarker(icons[f]);

    //hides the icons unless the flag has been set
	if (document.getElementById("icontype").value == "HideMarker") {
		icons[f].display(false);
	}

	//the marker is then created
	marker[f] = new OpenLayers.Marker(location, icon);

	//the marker is then hidden (unless the map is at a certain zoom level)
	marker[f].display(false);

	//the marker is then added to the layer
	markerLayer.addMarker(marker[f]);

	//A second marker is created and hidden
	//this is for when the icon is clicked and when the area is zoomed in beyond a certain point
	//the marker is then hidden, to be revealed only at certain times.
	var iconLarge = getIcon(type, new OpenLayers.Size(40,40));
	markerLarge[f] = new OpenLayers.Marker(location, iconLarge);
	markerLayer.addMarker(markerLarge[f]);
	markerLarge[f].display(false);

	//checks to see if the place is closed and whether we are displaying them
	if (displayClosed(shut[f])){

		//if it returns false, then the marker is not displayed
		icons[f].display(false);
	}

	//This is how events are added to the markers
	//This event will display the details of the marker when it is clicked
	//Unfortunately, I've noticed that the longitude and latitude characteristics are
	//a little off. The other issue is that I do not know what the other event types are
	//since I would like to have it hover
	markerLayer.events.register("mouseover", markerLayer, function(e){

		if (showInfo) {
			//All of the markers are hidden when the cursor goes over a location
			//This is to focus on the location
			hideMarkers();
			hideIcons();
			hideLargeMarkers();
			markerLarge[f].display(true);

			//This creates a popup which is called when the mouse moves over the marker.
			//The details of the popup is: name, location, size, what is displayed, and whether
			//an escape button is included
			popup = new OpenLayers.Popup(a, location,
				new OpenLayers.Size(150, 150),
				"<div style='border-style:solid;padding:5px'><b>"+name+"</b></br>"+address+"<div>",false);

			//the popup is added to the map
			map.addPopup(popup);
		}
	});

	//This event removes the popup when the mouse leaves the marker
	markerLayer.events.register("mouseout", markerLayer, function(e){

		if(showInfo) {
			markerLarge[f].display(false);
			checkZoom();

			if (visibleIcons) {
				showIcons();
			}
		
			map.removePopup(popup);
		}

	});

}

//this function checks to see whether a place has closed down, and whether we are displaying it or not
function displayClosed(closed){

	//gets the value of the list item regarding whether closed places are to be displayed
	var showClosed = document.getElementById("markertype").value;

	//value initially set to false, indicating that no, they won't be
	var showItem = false;

	//checks to see if the place is closed
	if (closed == "Y") {

		//if it hasn't shut down then it will be shown
		showItem = true;

	} else if (closed == "N" && showClosed == "NoClosed") {

		//if it has shut down, but the user wishes to see it, then it is displayed.
		showItem = true;
	}

	return showItem;

}

//This function checks to see if the 'display icon' tab has been set
//if it has, then it displays the marker icon, otherwise it doesn't
//this is called whenever the zoom function occurs.
function displayIcon() {

	var displayIcon = document.getElementById("icontype").value;

	if (displayIcon == "ShowMarker") {
		visibleIcons = true;
		showInfo = true;
		showIcons();
	} else {
		visibleIcons = false;
		showInfo = false;
		hideIcons();
	}
}

//These functions hide and display all the markers.
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
		if(displayClosed(shut[j])) {
			marker[j].display(true);
		}
	}
}

function hideIcons()
{
	for (j=1;j<marker.length;j++)
	{
		icons[j].display(false);
	}
}

function showIcons()
{
	for (j=1;j<marker.length;j++)
	{
		if(displayClosed(shut[j])){
	 		icons[j].display(true);
	 	}
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
		if(displayClosed(shut[j])){
			markerLarge[j].display(true);
		}
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

	try {
		var icon = new OpenLayers.Icon('icons/'+type, size);
	} catch (err) {
		var icon = new OpenLayers.Icon('icons/mark.png', size);
	}

	return icon;
}


//The fuction use to load the CSV file into the system
//This event fires once the file has been loaded after the button
//has been clicked and the file selected.
window.onload = function() {

		//This calls the input tag from the HTML code
		var fileInput = document.getElementById('docpicker');

		//This adds the event listener to listen to whether a file has been loaded
		fileInput.addEventListener('change', function(e) {
			var file = fileInput.files[0];

			//The file type is listed here. In this case only text files (.txt) can be used
			var textType = /text.*/;

			//If the file is a text file, then the code to read the file is executed
			if (file.type.match(textType)) {
				var reader = new FileReader();

				//the event (e) is fired when a load event occurs
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
							var lati = cells[7];
							var long = cells[8];
							var type = cells[11];
							var closed = cells[12];

							//markers for the places are then added to the map.
							//Note that the longitude goes first, and then the latitude
							//The location of the marker is also returned
							addMarker(long, lati, title, address, type, i, closed);
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
