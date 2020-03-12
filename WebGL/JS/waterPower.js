const N = 0.9;
const water_rho = 997;
const Q = 45;
const g = 9.82;
const H = 10;

class WaterPlant {
	constructor(particleThreshold, solver) {
		this.p = 0;
		this.energy = 0;

		this.solver = solver;
		this.particleThreshold = particleThreshold;
	}

	connectParticleStream(particleStream) {
		this.particleStream = particleStream;
	}

	update(dt) {
		this.p = (N * water_rho * Q * g * H) / 1000;
		this.energy = this.solver(this.energy, dt, this.p);

		// Particle stream visualization
		if (this.particleStream && this.energy >= this.particleThreshold) {
			let toSpawn = Math.floor(this.energy / this.particleThreshold);
			this.particleStream.queueParticleSpawns(toSpawn);
			this.energy -= this.particleThreshold;
		}
	}
}
