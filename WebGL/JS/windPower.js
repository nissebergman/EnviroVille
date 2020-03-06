// Wind mill properties
const m = 5000 * 3;
const r = 30;
const A = Math.pow(r, 2) * Math.PI;
const J = Math.pow(m * r, 2) / 3;
const C = 0.04;
const wind_rho = 1.25;
const tsr = 8;

// Breaking properties
const B = 12000;
const P = 3500;

// Generator properties
const K1 = 10;
const K2 = 0.2;
const R = 0.25;
const L = 0.01;

class WindMill {
	constructor(particleThreshold, startingVelocity, startingRotation, solver) {
		this.alpha = 0;
		this.omega = startingVelocity;
		this.theta = startingRotation;

		this.i = 0;
		this.u = 0;
		this.p = 0;
		this.energy = 0;

		this.solver = solver;
		this.particleThreshold = particleThreshold;
	}

	connectParticleStream(particleStream) {
		this.particleStream = particleStream;
	}

	update(windSpeed, dt) {
		let windForce = 0.5 * wind_rho * C * A * Math.pow(windSpeed, 2);
		let windTorque = windForce * (r / 2);

		let breakingTorque = this.calculateBreakingTorque(windSpeed);
		let torque = Math.max(0, windTorque - breakingTorque);

		// Do windmill updates
		this.alpha = torque / J;
		this.omega = this.solver(this.omega, dt, this.alpha);
		this.theta = this.solver(this.theta, dt, this.omega);

		// Do generator updates
		this.i = torque / K1;
		this.u = R * this.i + K2 * this.omega;
		this.p = (this.u * this.i) / 1000;
		this.energy = this.solver(this.energy, dt, this.p);

		// Particle stream visualization
		if (this.particleStream && this.energy >= this.particleThreshold) {
			let toSpawn = Math.floor(this.energy / this.particleThreshold);
			this.particleStream.queueParticleSpawns(toSpawn);
			this.energy -= this.particleThreshold;
		}
	}

	calculateBreakingTorque(windSpeed) {
		let ref = (windSpeed * tsr) / r;
		let breakingForce = this.omega * B;

		if (this.omega > ref) {
			breakingForce += P * (this.omega - ref);
		}

		return breakingForce;
	}
}

class Wind {
	constructor(baseWind, variation, speed) {
		this.baseWind = baseWind;
		this.variation = variation;
		this.speed = speed;

		this.x = 0;
		this.y = 0;

		this.windSpeed = this.baseWind;
	}

	// TODO: Borde kanske inte bero på dt ändå
	update(dt) {
		this.x += dt * this.speed;
		this.y += dt * this.speed;

		this.windSpeed =
			this.baseWind + this.variation * noise.simplex2(this.x, this.y);
	}
}
