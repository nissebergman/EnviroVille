const maxSpawnRate = 0.01;
const speed = 1.5;

class ParticleStream {
	constructor(startPos, endPos, scene) {
		this.startPos = startPos;
		this.endPos = endPos;
		this.direction = new THREE.Vector3()
			.subVectors(endPos, startPos)
			.normalize();

		this.toSpawn = 0;
		this.clock = 0.0;

		this.particleMaterial = new THREE.MeshBasicMaterial({
			color: 0xfeffd1,
			emissive: true
		});

		this.particles = new THREE.Group();
		scene.add(this.particles);
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
		let particleGeometry = new THREE.SphereGeometry(0.005, 4, 4);
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
