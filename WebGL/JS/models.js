// TODO: Ingen aning om den här funkar på ett vettigt sätt. Vore bra att kunna visualisera denna på nåt sätt!
class Wind {
	constructor(baseWind, variation, speed) {
		this.baseWind = baseWind;
		this.variation = variation;
		this.speed = speed;

		this.x = 0;
		this.y = 0;

		this.windSpeed = baseWind + variation * noise.simplex2(this.x, this.y);
	}

	// TODO: Borde kanske inte bero på dt ändå
	update(dt) {
		this.x += dt * this.speed;
		this.y += dt * this.speed;
	}
}

class EulerModel {
	// Någon slags Euler-lösare
	solve(previousValue, expression, dt) {
		return previousValue + expression * dt;
	}
}

class RotatorModel extends EulerModel {
	constructor() {
		super();
		// Initial values
		this.pos = 0;
		this.vel = 0;
	}

	getVel() {
		return this.vel;
	}

	solve(accExpr, dt) {
		this.vel = super.solve(this.vel, accExpr, dt);
		this.pos = super.solve(this.pos, this.vel, dt);
	}
}

class WindMillModel extends RotatorModel {
	constructor(wind, mass, r, C, rho, tsr) {
		super();
		this.wind = wind;
		this.mass = mass;
		this.r = r;
		this.C = C;
		this.rho = rho;
		this.tsr = tsr;

		this.J = (mass * r * r) / 3;
		this.A = r * r * Math.PI;

		// Parametrar för inbromsning
		this.B = 1000;
		this.P = 1200;
		this.refVel = (wind.windSpeed * this.tsr) / this.r;

		let vel = super.getVel();
		let breakingTorque = this.calculateBreakingTorque(vel);

		this.windForce =
			0.5 * this.rho * this.C * this.A * Math.pow(wind.windSpeed, 2);
		this.windTorque = this.windForce * (r / 2);

		// TODO: Ordentlig inbromsning och ingen jäkla funktion för getVel ska behövas >:(
		this.torque = this.windTorque - breakingTorque;

		this.accExpr = this.torque / this.J;
	}

	calculateBreakingTorque(vel) {
		let breakingForce = vel * this.B;

		if (vel > this.refVel) {
			breakingForce += this.P * (vel - this.refVel);
		}

		return breakingForce;
	}

	update(dt) {
		super.solve(this.accExpr, dt);
	}
}

class GeneratorModel extends EulerModel {
	constructor(rotator, L, R, k1, k2) {
		super();
		this.rotator = rotator;
		this.L = L;
		this.R = R;
		this.k1 = k1;
		this.k2 = k2;

		// TODO: Torque är inte i RotatorModel utan i WindMillModel
		this.i = this.rotator.torque / k1;
		this.u = this.R * this.i + k2 * this.rotator.vel;

		this.pExpr = this.u * this.i;

		// Initial value
		this.powerOutput = 0;
	}

	update(dt) {
		this.powerOutput = super.solve(this.powerOutput, this.pExpr, dt);
	}
}

// Initialize models
let wind = new Wind(10, 2, 0.01);
let windMill = new WindMillModel(wind, 5000 * 3, 30, 0.04, 1.25);
let generator = new GeneratorModel(windMill, 0, 0.25, 1, 1);
