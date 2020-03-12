// Solar panel properties
const efficiency = 0.15;
const numPanels = 50; // Each panel is 1m^2

// Sun and irradiation properties
const maxIrradiation = 1000;
const n = 2;
const sunRise = 6; // Not really "set" here, but useful for checking ranges
const noon = 12;
const sunSet = 18;

class SolarPanel {
	constructor(particleThreshold, solver) {
		this.irradiation = 0;
		this.p = 0;
		this.energy = 0;

		this.solver = solver;
		this.particleThreshold = particleThreshold;
	}

	connectParticleStream(particleStream) {
		this.particleStream = particleStream;
	}

	update(dt, simTime, cloudiness) {
		// TODO: Cloudiness
		this.irradiation = this.calculateIrradiation(simTime) * (1 - cloudiness);
		this.p =
			(this.calculateIrradiation(simTime) * efficiency * numPanels) / 1000;
		this.energy = this.solver(this.energy, dt, this.p);

		// Particle stream visualization
		if (this.particleStream && this.energy >= this.particleThreshold) {
			let toSpawn = Math.floor(this.energy / this.particleThreshold);
			this.particleStream.queueParticleSpawns(toSpawn);
			this.energy -= this.particleThreshold;
		}
	}

	calculateIrradiation(simTime) {
		let t;

		if (this.isMorning(simTime)) {
			t = (simTime - sunRise) / (noon - sunRise); // 0-->1 during the morning
		} else if (this.isAfternoon(simTime)) {
			t = (simTime - sunSet) / (noon - sunSet); // 1-->0 during the afternoon
		} else {
			// It's night, no irradiation
			return 0;
		}

		return maxIrradiation * Math.sin(Math.pow((t * 4) / Math.PI, n));
	}

	// Range checkers
	isMorning(simTime) {
		return sunRise <= simTime && simTime <= noon;
	}

	isAfternoon(simTime) {
		return noon < simTime && simTime <= sunSet;
	}
}

class Clouds {
	constructor(maxClouds, speed) {
		this.maxClouds = maxClouds;
		this.speed = speed;

		this.x = 0;
		this.y = 0;

		this.cloudiness = 0;
	}

	update(dt) {
		this.x += dt * this.speed;
		this.y += dt * this.speed;

		this.cloudiness =
			this.maxClouds + (1 - this.maxClouds) * noise.simplex2(this.x, this.y);
	}
}
