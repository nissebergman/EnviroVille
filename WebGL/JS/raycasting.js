var raycaster = new THREE.Raycaster();
var mouse = new THREE.Vector2(), INTERSECTED;
var houseType;
var tooltipIsEmpty;
var tooltipx;
var tooltipy;

// Calculate mouse position
function onMouseMove(event) {
	var divElement = $("#houseInfo");
	event.preventDefault();
	mouse.x = (event.clientX / window.innerWidth ) * 2 - 1;
	mouse.y = - (event.clientY / window.innerHeight ) * 2 + 1;
	tooltipx = event.pageX;
	tooltipy = event.pageY;
}

// Update the picking ray based on camera and mouse position
function updateRaycaster() {
	raycaster.setFromCamera ( mouse, camera);
	// Calculate objects intersecting pickingray
	var intersects = raycaster.intersectObjects( tooltipEnabledObjects, true);
	
	// If mouse is selecting any objects
	if (intersects.length > 0) {
		intersects.map(function(d) {
			//tak 016,001,017,018,019
			if (d.object.name == "tak001") {
				houseType = "gamer";
				showToolTip(houseType);
			}
			if (d.object.name == "tak016") {
				houseType = "student";
				showToolTip(houseType);
			}
			if (d.object.name == "tak018") {
				houseType = "rik";
				showToolTip(houseType);
			}
			if (d.object.name == "tak017") {
				houseType = "agneta";
				showToolTip(houseType);
			}
			if (d.object.name == "tak019") {
				houseType = "svensson";
				showToolTip(houseType);
			}
		})
	}
	if (intersects.length == 0) {
		hideToolTip();
	}
}

function showToolTip(type) {
	var divElement = $("#houseInfo");
		divElement.css({
		display: "block",
		opacity: 1,
		top: tooltipy,
		left: tooltipx
	});
		if (tooltipIsEmpty) divElement.append("Detta är " + type);
		tooltipIsEmpty = false;
}

function hideToolTip() {
		var divElement = $("#houseInfo");
		divElement.css({
		display: "none",
		opacity: 0
	});
		divElement.empty();
		tooltipIsEmpty = true;
}

	//var tooltipPosition = latestMouseProjection.clone().project(camera);
	
	//tooltipPosition.x = (tooltipPosition.x * canvasHalfWidth) + canvasHalfWidth + 

	//tooltipPosition.y = -(tooltipPosition.y * canvasHalfHeight) + canvasHalfHeight + 

