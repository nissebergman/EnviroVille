/////////////////////////////////////////////////////
//						Init 					   //
/////////////////////////////////////////////////////
//Init renderer
var renderer = new THREE.WebGLRenderer({
	antialias: true,
	shadowMap: true
});
renderer.setClearColor(new THREE.Color("lightgrey"), 1),
	renderer.setSize(window.innerWidth, window.innerHeight),
	//Stick renderer to document body
	document.body.appendChild(renderer.domElement);

//Array of functions for the rendering loop, used for more "krånglig" renderingsloop
//var onRenderFcts = [];

//Init object loader (For importing .gltf blender files)
var objectLoader = new THREE.GLTFLoader();

//Init texture loader
var textureLoader = new THREE.TextureLoader();

//Init scene and movable camera with OrbitControls
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(
	45,
	window.innerWidth / window.innerHeight,
	0.1,
	20000
); //FOV, Aspect Ratio, Near-clipping, Far-clipping
var controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.update();
camera.position.z = 30;

/////////////////////////////////////////////////////
//				Init objects	   		  		   //
/////////////////////////////////////////////////////
var world;
var table;

/////////////////////////////////////////////////////
//				Object Properties	   		   	   //
/////////////////////////////////////////////////////
var floorGeometry = new THREE.PlaneGeometry(15, 15, 2, 2);
var floorMaterial = new THREE.MeshStandardMaterial({
	roughness: 0.8,
	metalness: 0.2,
	bumpScale: 0.0005,
	color: 0xffffff,
	specular: 0xffffe5
});
var floor = new THREE.Mesh(floorGeometry, floorMaterial);
floor.material.side = THREE.DoubleSide;
floor.rotation.x = 90 * (Math.PI / 180);
floor.recieveShadow = true;

/////////////////////////////////////////////////////
//				Load textures	   		 		   //
/////////////////////////////////////////////////////
textureLoader.load("Assets/Textures/floor_diffuse.jpg", function(map) {
	map.wrapS = THREE.RepeatWrapping;
	map.wrapT = THREE.RepeatWrapping;
	map.repeat.set(4, 4);
	floorMaterial.map = map;
	floorMaterial.needsUpdate = true;
});

textureLoader.load("Assets/Textures/floor_bump.jpg", function(map) {
	map.wrapS = THREE.RepeatWrapping;
	map.wrapT = THREE.RepeatWrapping;
	map.repeat.set(4, 4);
	floorMaterial.bumpMap = map;
	floorMaterial.needsUpdate = true;
});

textureLoader.load("Assets/Textures/floor_roughness.jpg", function(map) {
	map.wrapS = THREE.RepeatWrapping;
	map.wrapT = THREE.RepeatWrapping;
	map.repeat.set(4, 4);
	floorMaterial.roughnessMap = map;
	floorMaterial.needsUpdate = true;
});

/////////////////////////////////////////////////////
//				Add objects to scene	   		   //
/////////////////////////////////////////////////////
scene.add(floor);

objectLoader.load(
	"/Assets/Models/world.gltf",
	function(gltf) {
		world = gltf.scene;
		world.castShadow = true;
		world.position.set(0, 0.75, 0);
		scene.add(gltf.scene);
		gtlf.scene;
		gltf.cameras;
		gltf.asset;
	},
	function(xhr) {
		console.log((xhr.loader / xhr.total) * 100 + "% loaded");
	},
	function(error) {
		console.log("Error loading objects!");
	}
);

objectLoader.load(
	"/Assets/Models/table.gltf",
	function(gltf) {
		table = gltf.scene;
		table.scale.set(1.5, 1.5, 1.5);
		table.castShadow = true;
		scene.add(gltf.scene);
		gtlf.scene;
		gltf.cameras;
		gltf.asset;
	},
	function(xhr) {
		console.log((xhr.loader / xhr.total) * 100 + "% loaded");
	},
	function(error) {
		console.log("Error loading objects!");
	}
);

/////////////////////////////////////////////////////
//				Add lights & shadows to scene	   //
/////////////////////////////////////////////////////

// Ambient light
// var ambientLight = new THREE.AmbientLight (0x404040, 1);
// scene.add(ambientLight);

// Sunlight, not needed indoors
// var sunLight = new THREE.DirectionalLight ( 0xffffff, 1);
// sunLight.castShadow = true;
// sunLight.position = (5,20,0);
// scene.add (sunLight);

// Pointlight
var lightBulb = new THREE.PointLight(0xffffff, 1.2, 100);
lightBulb.position.set(0, 10, 0);
lightBulb.decay = 5;
scene.add(lightBulb);

//Shadows, unsure about these
// renderer.shadowMap.enabled = true,
// renderer.shadowMap.type = THREE.PCFSoftShadowMap;

/////////////////////////////////////////////////////
//				Models	   		   		   		   //
/////////////////////////////////////////////////////

// TODO: Ingen aning om den här funkar på ett vettigt sätt. Vore bra att kunna visualisera denna på nåt sätt!
class Wind {
	constructor(baseWind, variation, speed) {
		this.baseWind = baseWind;
		this.variation = variation;
		this.speed = speed;

		this.x = 0;
		this.y = 0;
	}

	update = dt => {
		this.x += dt * speed;
		this.y += dt * speed;

		return baseWind + variation * noise.simplex2(this.x, this.y);
	};
}

// TODO: Fundera på hur Euler-lösaren solve(expr)(dt) borde funka
class Model {
	constructor() {
		// Initial values
		this.acc = 0;
		this.vel = 0;
		this.pos = 0;
	}

	// Någon slags Euler-lösare
	solve = expression => dt => {
		this.acc = expression;
		this.vel = this.vel + this.acc * dt;
		this.pos = this.pos + this.vel * dt;
	};
}

// TODO: Lägg till generatormodell som separat klass, eventuellt med arv från denna: WindMill --> WindMillGenerator
class WindMillModel extends Model {
	constructor(mass, r, C, rho) {
		super();
		this.mass = mass;
		this.r = r;
		this.C = C;
		this.rho = rho;

		this.J = (mass * r * r) / 3;
		this.A = r * r * Math.PI;
	}

	update = windSpeed => dt =>
		solve(this.J * this.C * this.rho * this.r * this.mass * windSpeed)(dt);
}

/////////////////////////////////////////////////////
//				Update scene 	   		   		   //
/////////////////////////////////////////////////////

// Initialize models
let wind = new Wind(10, 2, 0.01);
let windMill = new WindMillModel(5000 * 3, 30, 0.04, 1.25);

const update = dt => {
	// Handle simulation logic here, dt = time since last update
};

/////////////////////////////////////////////////////
//				Render scene	   		   		   //
/////////////////////////////////////////////////////

// Handle user resizing the window
window.addEventListener(
	"resize",
	function() {
		renderer.setSize(window.innerWidth, window.innerHeight);
		camera.aspect = window.innerWidth / window.innerHeight;
		camera.updateProjectionMatrix();
	},
	false
);

// Real simple loop, put animations inside
let last_time = 0;

var animate = function() {
	requestAnimationFrame(animate);
	renderer.render(scene, camera);

	// Handle simulation updates
	let time_now = Date.now();
	let dt = time_now - last_time;
	update(dt);

	last_time = time_now;
};
animate();

// More "krånglig" renderingsloop, not sure if better
// onRenderFcts.push(function(){
// 	renderer.render (scene, camera );
// })

// // Run rendering loop
// var lastTimeMsec = null;
// requestAnimationFrame(function animate(nowMsec){
// 	requestAnimationFrame( animate );
// 	lastTimeMsec = lastTimeMsec || nowMsec-1000/60
// 	var deltaMsec = Math.min(200, nowMsec - lastTimeMsec)
// 	lastTimeMsec = nowMsec

// 	onRenderFcts.forEach(function(onRenderFct){
// 		onRenderFct(deltaMsec/1000, nowMsec/1000)
// 	})
// })
