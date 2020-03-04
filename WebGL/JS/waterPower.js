const N = 0.9;
const water_rho = 997;
const Q = 45;
const g = 9.82;
const H = 10;

class WaterPlant {
	constructor(solver) {
		this.p = 0;
		this.energy = 0;

		this.solver = solver;
	}

	update(dt) {
		this.p = N * water_rho * Q * g * H;
		this.energy = this.solver(this.p, dt, this.energy);
	}
}
