const maxSpawnRate = 0.2;
const speed = 1.4;

class ParticleStream {
	constructor(scene, color, size) {
		this.startPos = new THREE.Vector3();
		this.endPos = new THREE.Vector3();
		this.calculateDirection();

		this.size = size;

		this.toSpawn = 0;
		this.clock = 0.0;

		this.particleMaterial = new THREE.MeshBasicMaterial({
			color: color,
			emissive: true
		});

		this.particles = new THREE.Group();
		scene.add(this.particles);
	}

	setStartPos(startPos) {
		this.startPos = startPos;
		this.calculateDirection();
	}

	setEndPos(endPos) {
		this.endPos = endPos;
		this.calculateDirection();
	}

	calculateDirection() {
		this.direction = new THREE.Vector3()
			.subVectors(this.endPos, this.startPos)
			.normalize();
	}

	queueParticleSpawns(amount) {
		this.toSpawn += amount;
	}

	update(dt) {
		this.clock += dt;

		if (this.toSpawn > 0 && this.clock >= maxSpawnRate) {
			this.spawnParticle();
			this.toSpawn--;
			this.clock -= maxSpawnRate;
		}

		this.killParticles();
		this.moveParticles(dt);
	}

	spawnParticle() {
		let particleGeometry = new THREE.SphereGeometry(this.size, 5, 5);
		let newParticle = new THREE.Mesh(particleGeometry, this.particleMaterial);
		newParticle.position.set(this.startPos.x, this.startPos.y, this.startPos.z);
		newParticle.lookAt(this.endPos);

		this.particles.add(newParticle);
	}

	killParticles() {
		this.particles.children.forEach(particle => {
			if (
				new THREE.Vector3()
					.subVectors(this.endPos, particle.position)
					.dot(this.direction) < 0
			) {
				this.particles.remove(particle);
			}
		});
	}

	moveParticles(dt) {
		this.particles.children.forEach(particle =>
			particle.translateZ(dt * speed)
		);
	}
}
