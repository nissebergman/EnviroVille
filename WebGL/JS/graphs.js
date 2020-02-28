var stats;

//Graphs
var windStrengthGraph;
var windStrengthGraphCanvas;
var windStrengthGraphContext;

var windElectricityGraph;
var windElectricityGraphCanvas;
var windElectricityGraphContext;

function initGraphs() {

// Set up graphs
strengthStats = new Stats();
electricityStats = new Stats();

windStrengthGraph = strengthStats.addPanel( new Stats.Panel( 'Wind m/s', '#ff8', '#221' ) );
windElectricityGraph= electricityStats.addPanel( new Stats.Panel( 'Electricity W', '#ff8', '#221' ) );
strengthStats.showPanel( 3 );
electricityStats.showPanel(3);
electricityStats.domElement.style.cssText ="position:absolute;top:0px;left:160px; width: 300px !important";

document.body.appendChild( strengthStats.dom );
document.body.appendChild( electricityStats.dom );

windStrengthGraphCanvas = document.createElement("canvas");
windStrengthGraphCanvas.width = 512;
windStrengthGraphCanvas.height = 512;
document.body.appendChild(windStrengthGraphCanvas);

windElectricityGraphCanvas = document.createElement("canvas");
windElectricityGraphCanvas.width = 512;
windElectricityGraphCanvas.height = 512;
document.body.appendChild(windElectricityGraphCanvas);

windGraphContext = windStrengthGraphCanvas.getContext("2d");
windGraphContext.fillStyle = "rgba(127,0,255,0.05)";

windElectricityGraphContext = windElectricityGraphCanvas.getContext("2d");
windElectricityGraphContext.fillStyle = "rgba(127,0,255,0.05)";
}