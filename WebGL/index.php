<!DOCTYPE HTML>
<html>

<head>
    <meta name="viewport" content="width=device-width, user-scalable=no, minimum-scale=1.0, maximum-scale=1.0">
    <script src='JS/three.min.js'></script>
    <script src='JS/OrbitControls.js'></script>
    <script src='JS/GLTFLoader.js'></script>
    <script src='Extern/noisejs/perlin.js'></script>
    <script src='Extern/statsjs/stats.min.js'></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/tween.js/17.2.0/Tween.js"></script>
    
    <link rel="stylesheet" href="style/style.css">
</head>

<body>
    <script src="JS/main.js"></script>
    <div id="GUISplash">
    	<div id="GUIContent">
    		<button onclick="timeOfDay('day')"> Day (08:00 - 16:00)</button>
    		<button onclick="timeOfDay('evening')"> Evening (06:00 - 00:00)</button>
    		<button onclick="timeOfDay('night')"> Night (00:00 - 08:00)</button>
    	</div>
</div>
</body>

</html>