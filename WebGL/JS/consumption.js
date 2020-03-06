data = [{
	type: "student",
	morning: 8/24,
	evening: 23/24,
	night: 16/24 },
	{
	type: "gamer",
	morning: 12/24,
	evening: 22/24,
	night: 40/24
	}];

class Household  {
	constructor(type, amount) {
		this.amount = amount;
		this.type = type;
		this.p = 0; //Consumption
	}

	//Connect type of household to correct data
	connect(type){
		 return(data.find(household => household.type === type));
	}

	calculateConsumption(simTime) {
		var data = this.connect(this.type);
		return(this.amount + " st " + data["type"] +
		" hushåll konsumerar " + data[this.timeOfDay(simTime)] +
		" kWh per hushåll och totalt " + 
		this.amount * data[this.timeOfDay(simTime)] + " kWh " );
	}

	update(dt, simTime) {
		this.p = this.calculateConsumption(simTime);
	}

	timeOfDay(simTime) {
	if (sunRise <= simTime && simTime <= noon) return("morning");
	else if (noon < simTime && simTime <= sunSet) return("evening");
	return("night");
	}
}