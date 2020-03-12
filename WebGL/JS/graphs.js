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
		new Stats.Panel("Electricity kW", "#ff8", "#221")
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
		new Stats.Panel("Electricity kW", "#ff8", "#221")
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
		new Stats.Panel("Waterplant kW", "#ff8", "#221")
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
			windElectricityGraph.update(powerProduction.totalWind, Math.pow(10, 6));
			break;

		case 2:
			sunIntensityGraph.update(solarPanelModel.irradiation, 2000);
			sunElectricityGraph.update(powerProduction.totalSolar, Math.pow(10, 1));
			break;
		case 3:
			waterElectricityGraph.update(powerProduction.totalWater, Math.pow(10, 7));
			break;
	}
}
