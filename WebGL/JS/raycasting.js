var raycaster = new THREE.Raycaster();
var mouse = new THREE.Vector2(), INTERSECTED;

// Calculate mouse position
function onMouseMove(event) {
	event.preventDefault();
	mouse.x = (event.clientX / window.innerWidth ) * 2 - 1;
	mouse.y = - (event.clientY / window.innerHeight ) * 2 + 1;
}


// Update the picking ray based on camera and mouse position
function updateRaycaster() {
	raycaster.setFromCamera ( mouse, camera);
	// Calculate objects intersecting pickingray
	var intersects = raycaster.intersectObjects( scene.children, true);
	
	// If mouse is selecting any objects
	if (intersects.length > 0) {
		intersects.map(function(d) {
			//tak 016,001,017,018,019
			if (d.object.name == "tak001") {
				console.log("Hus 1");
			}
			if (d.object.name == "tak016") {
				console.log("Hus 2");
			}
			if (d.object.name == "tak018") {
				console.log("Hus 3");
			}
			if (d.object.name == "tak017") {
				console.log("Hus 4");
			}
			if (d.object.name == "tak019") {
				console.log("Hus 5");
			}
		})
	}
}


