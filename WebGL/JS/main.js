///////////////////////
//      Globals      //
///////////////////////
var scene, camera, renderer, controls;
var lastTime = 0;
var pageHasGraph = 0;
var graphCounter = 1;

var dt = 0;
var t = 0;
var simTime = 0;

// 3D Models
var windmills,
	floor,
	table,
	world,
	houseStudent,
	houseRich,
	houseGamer,
	houseSvensson,
	houseElder,
	SolarPanels,
	water;

// Moa leker
var mixer;

// Lights
var sunLight, ambientLight;
const dayLength = 60;
const lightDistance = 10;
const sunIntensity = 1.5;
const moonIntensity = 1.2;

// Geometry
var sun, moon;
const sunDistance = 2;

// Simulation models
var wind = new Wind(10, 5, 0.1);
var windmillModels = [];
var waterPlantModel = new WaterPlant(euler);
var solarPanelModel = new SolarPanel(euler);

//
var studentConsumption = new HouseHold("student", 1);
var gamerConsumption = new HouseHold("gamer", 1);
var elderConsumption = new HouseHold("elder",1);
var richConsumption = new HouseHold("rich",1);
var svenssonConsumption

var powerProduction = {
	totalWind: 0,
	totalWater: 0,
	totalSolar: 0
};

// Colors
// const skyColors = [
//     {
//         // Dawn color
//         color: new THREE.Color("gold"),
//         start:
//     }
//     {
//         // Day color
//         color: new THREE.Color("lightskyblue"),
//         start: 0.2
//     },
//     {
//         // Dusk color
//         color: new THREE.Color("pink"),
//         start: 0.8
//     },
//     {
//         // Night color
//         color: new THREE.Color("midnightblue"),
//         start: 0
//     }
// ];

/////////////////////
//      Setup      //
/////////////////////
function init() {
	// Camera parameters
	const fov = 45;
	const ratio = window.innerWidth / window.innerHeight;
	const near = 0.1;
	const far = 1000;

	// THREE.js setup
	scene = new THREE.Scene();
	camera = new THREE.PerspectiveCamera(fov, ratio, near, far);
	renderer = new THREE.WebGLRenderer({ antialias: true });
	controls = new THREE.OrbitControls(camera, renderer.domElement);

	// Set up scene
	loadModels();
	setupLights();
	setupGeometry();

	// Simulation models setup
	windmillModels.push(new WindMill(Math.PI / 2, 0, euler));
	windmillModels.push(new WindMill(Math.PI, (2 * Math.PI) / 3, euler));
	windmillModels.push(new WindMill(Math.PI / 3, (4 * Math.PI) / 3, euler));

	renderer.shadowMap.enabled = true;
	renderer.shadowMap.type = THREE.PCFSoftShadowMap;
	renderer.outputEncoding = THREE.sRGBEncoding;

	scene.background = new THREE.Color("skyblue");

	camera.position.set(2, 7, 2);
	controls.target = new THREE.Vector3(0, 2.2, 0);
	controls.enableDamping = true;
	controls.dampingFactor = 0.05;
	controls.update();

	// Append renderer
	resizeRenderer();
	document.body.appendChild(renderer.domElement);

	initWindGraphs();

	// Handle window resize
	window.addEventListener("resize", resizeRenderer);

	// Start animation loop
	requestAnimationFrame(animate);
}

function loadModels() {
	const loader = new THREE.GLTFLoader();

	// Plank floor
	loader.load("Assets/Models/floor.gltf", function(gltf) {
		floor = gltf.scene;
		floor.traverse(function(child) {
			if (child.isMesh) {
				child.castShadow = false;
				child.receiveShadow = true;
			}
		});
		scene.add(floor);
	});

	// Table
	loader.load("Assets/Models/table.gltf", function(gltf) {
		table = gltf.scene;
		table.traverse(function(child) {
			if (child.isMesh) {
				child.castShadow = true;
				child.receiveShadow = true;
			}
		});
		scene.add(table);
	});

	// World
	loader.load("Assets/Models/world.gltf", function(gltf) {
		world = gltf.scene;

		// World plane
		world.children[0].castShadow = false;
		world.children[0].receiveShadow = true;

		// World box
		world.children[1].castShadow = true;
		world.children[1].receiveShadow = false;

		scene.add(world);
	});

	// Student Nisse
	loader.load("Assets/Models/hus_Nisse.gltf", function(gltf) {
		houseStudent = gltf.scene;
		houseStudent.traverse(function(child) {
			if (child.isMesh) {
				child.castShadow = false;
				child.receiveShadow = true;
			}
		});
		scene.add(houseStudent);
	});

	// Gamer Jönnson
	loader.load("Assets/Models/hus_GamerJon.gltf", function(gltf) {
		houseGamer = gltf.scene;
		houseGamer.traverse(function(child) {
			if (child.isMesh) {
				child.castShadow = false;
				child.receiveShadow = true;
			}
		});
		scene.add(houseGamer);
	});

	// Familjen Rik
	loader.load("Assets/Models/hus_rik.gltf", function(gltf) {
		houseRich = gltf.scene;
		houseRich.traverse(function(child) {
			if (child.isMesh) {
				child.castShadow = false;
				child.receiveShadow = true;
			}
		});
		scene.add(houseRich);
	});

	// Ensamma Agneta
	loader.load("Assets/Models/hus_Agneta.gltf", function(gltf) {
		houseElder = gltf.scene;
		houseElder.traverse(function(child) {
			if (child.isMesh) {
				child.castShadow = false;
				child.receiveShadow = true;
			}
		});
		scene.add(houseElder);
	});

	// Familjen Svensson
	loader.load("Assets/Models/hus_svensson.gltf", function(gltf) {
		houseSvensson = gltf.scene;
		houseSvensson.traverse(function(child) {
			if (child.isMesh) {
				child.castShadow = false;
				child.receiveShadow = true;
			}
		});
		scene.add(houseSvensson);
	});

	// Windmills
	loader.load("Assets/Models/windmills.gltf", function(gltf) {
		windmills = gltf.scene;
		windmills.traverse(function(child) {
			if (child.isMesh) {
				child.castShadow = false;
				child.receiveShadow = true;
			}
		});
		scene.add(windmills);
	});

	// Solarpanels
	loader.load("Assets/Models/SolarPanels.gltf", function(gltf) {
		SolarPanels = gltf.scene;
		SolarPanels.traverse(function(child) {
			if (child.isMesh) {
				child.castShadow = false;
				child.receiveShadow = true;
			}
		});
		scene.add(SolarPanels);
	});

	// Water
	loader.load("Assets/Models/wateranimation.gltf", function(gltf) {
		water = gltf.scene;
		water.traverse(function(child) {
			if (child.isMesh) {
				child.castShadow = false;
				child.receiveShadow = true;
			}
		});
		/*mixer = new THREE.AnimationMixer(water);
  		var clip1 = gltf.animations[0];
  		var action1 = mixer.clipAction(clip1);
  		action1.play();*/
		scene.add(water);
	});
}

function setupLights() {
	ambientLight = new THREE.AmbientLight("skyblue", 0.8);

	sunLight = new THREE.DirectionalLight("lightyellow", sunIntensity);
	sunLight.castShadow = true;
	sunLight.shadow.bias = -0.0001;

	moonLight = new THREE.DirectionalLight("royalblue", moonIntensity);
	moonLight.castShadow = true;
	moonLight.shadow.bias = -0.0001;

	sunHelper = new THREE.CameraHelper(sunLight.shadow.camera);
	moonHelper = new THREE.CameraHelper(moonLight.shadow.camera);

	scene.add(ambientLight);
	scene.add(sunLight);
	scene.add(moonLight);
	// scene.add(sunHelper);
	// scene.add(moonHelper);
}

function setupGeometry() {
	sunGeo = new THREE.SphereGeometry(0.1, 16, 16);
	sunMat = new THREE.MeshStandardMaterial({
		color: "lightyellow",
		emissive: "lightyellow",
		emissiveIntensity: 0.6,
		transparent: true
	});
	sun = new THREE.Mesh(sunGeo, sunMat);
	sun.position.set(2, 2, 0);

	moonGeo = new THREE.SphereGeometry(0.1, 16, 16);
	moonMat = new THREE.MeshStandardMaterial({
		color: "royalblue",
		emissive: "royalblue",
		emissiveIntensity: 0.6,
		transparent: true
	});
	moon = new THREE.Mesh(moonGeo, moonMat);
	moon.position.set(-2, -2, 0);
	moon.receiveShadow = true;

	scene.add(sun);
	scene.add(moon);
}


/////////////////////////
//      Rendering      //
/////////////////////////
function animate(time) {
	// Time is passed in milliseconds, calculate delta time
	let timeNow = time / 1000;
	dt = timeNow - lastTime;

	// Simulation time in hours driven by t which is between 0 and 1
	t = (timeNow % dayLength) / dayLength;
	simTime = Math.round((6 + t * 24) % 24);

	// Start graphs
	stats.begin();

	handleDayNightCycle();
	handleSimulationUpdates();

	// Handle animation
	if (windmills) {
		windmillModels.forEach((model, idx) => {
			// const rps = model.omega / (2 * Math.PI);
			// windmills.children[idx * 2].rotateX(dt * 2 * Math.PI * rps);
			let windmill = windmills.children[idx * 2];
			windmill.rotation.set(
				model.theta,
				windmill.rotation.y,
				windmill.rotation.z,
				"ZYX"
			);
		});
	}

	// Moa leker runt här hej hopp
	/*var deltatid = clock.getDelta()
	mixer.update(deltatid); */

	// Draw graphs
	graphContext.beginPath();
	graphContext.fill();

	renderer.render(scene, camera);

	// End graphs
	stats.end();

	updateGraphs(graphCounter);

	// Set up next iteration of the render loop
	lastTime = timeNow;
	requestAnimationFrame(animate);
}

///////////////////////
//      Helpers      //
///////////////////////
function euler(previousValue, dt, expression) {
	return previousValue + expression * dt;
}

function resizeRenderer() {
	renderer.setSize(window.innerWidth, window.innerHeight);
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
}

function clamp(value) {
	return Math.max(0, Math.min(1, value));
}

function lerp(from, to, t) {
	// Clamp t between 0 and 1
	t = clamp(t);
	return (1 - t) * from + to * t;
}

function handleDayNightCycle() {
	let dayX = Math.cos(t * 2 * Math.PI);
	let dayY = Math.sin(t * 2 * Math.PI);

	let sunX = dayX * sunDistance;
	let sunY = dayY * sunDistance;
	let lightX = dayX * lightDistance;
	let lightY = dayY * lightDistance;

	// TODO: Make intensity and opacity depend on simTime
	sunLight.position.set(lightX, lightY, 0);
	sunLight.intensity = lerp(0, sunIntensity, dayY + 0.6);
	moonLight.position.set(-lightX, -lightY, 0);
	moonLight.intensity = lerp(0, moonIntensity, -dayY + 0.6);

	sun.visible = dayY > -0.6;
	sun.position.set(sunX, sunY + 2, 0);
	moon.visible = dayY < 0.6;
	moon.position.set(-sunX, -sunY + 2, 0);

	sun.material.opacity = lerp(0, 1, dayY + 0.6);
	moon.material.opacity = lerp(0, 1, -dayY + 0.6);

	scene.background = new THREE.Color("lightskyblue").lerp(
		new THREE.Color(0x26265c),
		clamp(0.4 + (-dayY + 1) / 2)
	);
}

function handleSimulationUpdates() {
	// Handle windmills simulation
	wind.update(dt);
	windmillModels.forEach(model => model.update(wind.windSpeed, dt));

	// Handle water plant simulation
	waterPlantModel.update(dt);

	// Handle solar panel simulation
	solarPanelModel.update(dt, simTime);

	powerProduction.totalSolar = solarPanelModel.p;
	powerProduction.totalWater = waterPlantModel.p;
	powerProduction.totalWind = windmillModels.reduce(
		(total, current) => total + current.p,
		0
	);
}
