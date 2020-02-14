/////////////////////////////////////////////////////
//						Init 					   //
/////////////////////////////////////////////////////
//Init renderer
var renderer = new THREE.WebGLRenderer({
	antialias : true
	});
renderer.setClearColor(new THREE.Color("lightgrey"), 1),
renderer.setSize (window.innerWidth, window.innerHeight),

//Stick renderer to document body
document.body.appendChild(renderer.domElement);

//Array of functions for the rendering loop, used for more "krånglig" renderingsloop
//var onRenderFcts = [];

//Init object loader (For importing .gltf blender files)
var loader = new THREE.GLTFLoader();

//Init scene and movable camera with OrbitControls
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(45, 
	window.innerWidth / window.innerHeight, 0.1, 20000 ); //FOV, Aspect Ratio, Near-clipping, Far-clipping
var controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.update();
camera.position.z = 30;

/////////////////////////////////////////////////////
//				Add objects to scene	   		   //
/////////////////////////////////////////////////////

loader.load(
	'/Assets/world.gltf',
	function(gltf) {
		scene.add(gltf.scene);
		gtlf.scene;
		gltf.cameras;
		gltf.asset;
	},
	function (xhr) {
		console.log((xhr.loader / xhr.total * 100) + '% loaded');
	},
	function (error) {
		console.log("Error loading objects!");
});

/////////////////////////////////////////////////////
//				Add lights & shadows to scene	   //
/////////////////////////////////////////////////////

// Ambient light not needed in sunlight
// var ambientLight = new THREE.AmbientLight (0x404040, 1);
// scene.add(ambientLight);

var sunLight = new THREE.DirectionalLight ( 0xffffff, 2);
sunLight.castShadow = true;
sunLight.position = (5,20,0);
scene.add (sunLight);

//Shadows, unsure about these
// renderer.shadowMap.enabled = true,
// renderer.shadowMap.type = THREE.PCFSoftShadowMap;

/////////////////////////////////////////////////////
//				Render scene	   		   		   //
/////////////////////////////////////////////////////

// Handle user resizing the window
window.addEventListener('resize', function(){
	renderer.setSize( window.innerWidth, window.innerHeight )
	camera.aspect = window.innerWidth / window.innerHeight
	camera.updateProjectionMatrix()
}, false)

// Real simple loop, put animations inside 
var animate = function () {
	requestAnimationFrame(animate);
	renderer.render(scene,camera);
}
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

