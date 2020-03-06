houseHoldConsumption = [{
	type: "student",
	morning: 8,
	evening: 23,
	night: 16 },
	{
	type: "gamer",
	morning: 12,
	evening: 22,
	night: 40
	}];

class Household  {
	constructor(amount, type) {
		this.amount = amount;
		this.type = type;
		this.p = 0; //Consumption
	}

	//Connect type of household to correct data
	connect(type){
		 return(houseHoldConsumption.find(household => household.type === type));
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