var stats;

//Graphs
var windStrengthGraph;
var windElectricityGraph;

var sunIntensityGraph;
var sunElectricityGraph;

var waterElectricityGraph;

var graphCanvas;
var graphContext;

function initWindGraphs() {
	// Wind
	stats = new Stats();
	windStrengthGraph = stats.addPanel(
		new Stats.Panel("Wind m/s", "#ff8", "#221")
	);
	windElectricityGraph = stats.addPanel(
		new Stats.Panel("Electricity W", "#ff8", "#221")
	);
	createGraphCanvas();
	//windElectricityStats.domElement.style.cssText ="position:absolute;top:0px;left:160px; width: 300px !important";
	graphCounter = 1;
}

function initSunGraphs() {
	// Sun
	stats = new Stats();
	sunIntensityGraph = stats.addPanel(
		new Stats.Panel("Sun Intensity", "#ff8", "#221")
	);
	sunElectricityGraph = stats.addPanel(
		new Stats.Panel("Electricity W", "#ff8", "#221")
	);
	createGraphCanvas();
	graphCounter = 2;
	//electricityStats.domElement.style.cssText ="position:absolute;top:0px;left:160px; width: 300px !important";
}

function initWaterGraphs() {
	// Water
	stats = new Stats();
	createGraphCanvas();
	waterElectricityGraph = stats.addPanel(
		new Stats.Panel("Waterplant W", "#ff8", "#221")
	);
	graphCounter = 3;
	//electricityStats.domElement.style.cssText ="position:absolute;top:0px;left:160px; width: 300px !important";
}

function createGraphCanvas() {
	stats.showPanel(3);
	document.body.appendChild(stats.dom);
	graphCanvas = document.createElement("canvas");
	graphCanvas.width = 512;
	graphCanvas.height = 512;
	document.body.appendChild(graphCanvas);
	graphContext = graphCanvas.getContext("2d");
	graphContext.fillStyle = "rgba(127,0,255,0.05)";
}

function updateGraphs(graphCounter) {
	switch (graphCounter) {
		case 1:
			windStrengthGraph.update(wind.windSpeed, 20);
			// TOFIX: Måste kunna få totalproduktion för alla tre vindkraftverk
			//windElectricityGraph.update(windmillModel.p, Math.pow(10, 8));
			break;

		case 2:
			sunIntensityGraph.update(solarPanelModel.irradiation, 2000);
			sunElectricityGraph.update(solarPanelModel.p, Math.pow(10, 8));
			break;
		case 3:
			waterElectricityGraph.update(waterPlantModel.p, Math.pow(10, 7));
			break;
	}
}
