<?php
	
	$filename = "places.txt";
	$fp = fopen($filename, "r");
	flock($fp,LOCK_SH);
	$headings = fgetcsv($fp);
	$id=0;
	while($aLineOfCells = fgetcsv($fp,0,"\t")) {
	$records[]=$aLineOfCells;
	}


	foreach ($records as $value) {

		$name[] = $value[0];
		$address[]=$value[1];
		$town[]=$value[2];
		$state[]=$value[3];
		$country[]=$value[4];
		$phone[]=$value[5];
		$website[]=$value[6];
		$x_coord[]=$value[7];
		$y_coord[]=$value[8];
		$rating[]=$value[9];
		$type[]=$value[10];
		$open[]=$value[12];
		$review[]=$value[13];

	}

	flock($fp,LOCK_UN);
	fclose($fp);

	$link = mysqli_connect("localhost", "root", "root", "mapmarker");

	if($link === false) {
		echo "Error - failure to connect</br>";
	} else {
		echo "connected to database</br>";
	}

	for ($i=0; $i<count($name); $i++) {

		$_town = mysqli_real_escape_string($link, $town[$i]);
		$_state = mysqli_real_escape_string($link, $state[$i]);
		$_country = mysqli_real_escape_string($link, $country[$i]);

		$sql = "INSERT IGNORE INTO location(town, state, country) VALUES ('$_town', '$_state','$_country')";

		if(mysqli_query($link, $sql)) {
			#echo "Records inserted successfully</br>";
		} else {
			echo "Error: could not execule $sql. ".mysqli_error($link)."</br>";
		}
	}

	for ($i=0; $i<count($name); $i++) {

		$_name = mysqli_real_escape_string($link, $name[$i]);
		$_address = mysqli_real_escape_string($link, $address[$i]);
		$_town = mysqli_real_escape_string($link, $town[$i]);
		$_state = mysqli_real_escape_string($link, $state[$i]);

		$sql = "INSERT INTO locale(localename, address, town, state, telephone,website, x_coord, y_coord, localtype) VALUES ('$_name','$_address','$_town','$_state','$phone[$i]','$website[$i]','$x_coord[$i]','$y_coord[$i]','$type[$i]')";

		if(mysqli_query($link, $sql)) {
			#echo "Records inserted successfully</br>";
		} else {
			echo "Error: could not execule $sql. ".mysqli_error($link)."</br>";
		}
	}

	mysqli_close($link);

	echo "Database Updated";

?>
