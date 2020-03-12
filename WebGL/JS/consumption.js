data = [
	{
		type: "student",
		morning: 8 / 24,
		evening: 23 / 24,
		night: 16 / 24
	},
	{
		type: "gamer",
		morning: 12 / 24,
		evening: 22 / 24,
		night: 40 / 24
	},
	{
		type: "elder",
		morning: 18 / 24,
		evening: 18 / 24,
		night: 7 / 24
	},
	{
		type: "rich",
		morning: 30 / 24,
		evening: 50 / 24,
		night: 30 / 24
	},
	{
		type: "svensson",
		morning: 19 / 24,
		evening: 30 / 24,
		night: 19 / 24
	}
];

const householdParticleThreshold = 1;

class Household {
	constructor(type, amount, solver) {
		this.amount = amount;
		this.type = type;
		this.displayMessage = "";

		// Consumption
		this.totalConsumption = 0;
		this.perHouseholdConsumption = 0;

		// Used for particles, essentially a kW-count
		this.solver = solver;
		this.energy = 0;
	}

	// Connect type of household to correct data
	connect(type) {
		return data.find(household => household.type === type);
	}

	connectParticleStream(particleStream) {
		this.particleStream = particleStream;
	}

	calculatePerHousehold(simTime) {
		var data = this.connect(this.type);
		return data[this.timeOfDay(simTime)];
	}

	calculateTotal(simTime) {
		return this.calculatePerHousehold(simTime) * this.amount;
	}

	update(dt, simTime) {
		this.perHouseholdConsumption = this.calculatePerHousehold(simTime);
		this.totalConsumption = this.calculateTotal(simTime);
		this.displayMessage = `${this.amount}st ${this.type}-hushåll konsumerar ${this.perHouseholdConsumption}kW per hushåll och totalt ${this.totalConsumption}kW`;

		// Particle stream visualization
		this.energy = this.solver(this.energy, dt, this.totalConsumption);

		if (this.particleStream && this.energy >= householdParticleThreshold) {
			let toSpawn = Math.floor(this.energy / householdParticleThreshold);
			this.particleStream.queueParticleSpawns(toSpawn);
			this.energy -= householdParticleThreshold;
		}
	}

	timeOfDay(simTime) {
		if (sunRise <= simTime && simTime <= noon) return "morning";
		else if (noon < simTime && simTime <= sunSet) return "evening";
		return "night";
	}
}
