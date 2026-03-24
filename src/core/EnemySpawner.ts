import { Entity, EntityType, Vector2, EntityManager } from './EntityManager';

export class Enemy extends Entity {
    speed: number;
    damage: number;
    originalSpeed: number;
    freezeTimer: number = 0;

    constructor(id: string, position: Vector2, health: number, speed: number, damage: number) {
        super(id, EntityType.ENEMY, position, health);
        this.speed = speed;
        this.originalSpeed = speed;
        this.damage = damage;
    }

    update(deltaTime: number) {
        if (this.freezeTimer > 0) {
            this.freezeTimer -= deltaTime;
            if (this.freezeTimer <= 0) {
                this.speed = this.originalSpeed;
            }
        }

        // Move towards the wall (assuming wall is at y=0)
        this.position.y -= this.speed * deltaTime;
        if (this.position.y < 0) {
            this.position.y = 0;
        }
    }

    freeze(duration: number) {
        this.freezeTimer = duration;
        this.speed = 0;
    }
}

export class EnemySpawner {
    private entityManager: EntityManager;
    private wave: number = 0;
    private enemiesToSpawn: number = 0;
    private spawnCooldown: number = 0;
    private spawnRate: number = 1.0;

    constructor(entityManager: EntityManager) {
        this.entityManager = entityManager;
    }

    startWave() {
        this.wave++;
        this.enemiesToSpawn = 5 + this.wave * 2;
        this.spawnRate = Math.max(0.2, 1.0 - this.wave * 0.05);
        if (typeof process !== 'undefined' && process.stdout) {
            process.stdout.write(`Starting Wave ${this.wave}: Spawning ${this.enemiesToSpawn} enemies\n`);
        } else {
            console.log(`Starting Wave ${this.wave}: Spawning ${this.enemiesToSpawn} enemies`);
        }
    }

    update(deltaTime: number) {
        if (this.enemiesToSpawn > 0) {
            this.spawnCooldown -= deltaTime;
            if (this.spawnCooldown <= 0) {
                this.spawnEnemy();
                this.enemiesToSpawn--;
                this.spawnCooldown = this.spawnRate;
            }
        }
    }

    private spawnEnemy() {
        const id = this.entityManager.generateId();
        const position: Vector2 = {
            x: Math.random() * 800,
            y: 600
        };

        const health = 20 + this.wave * 5;
        const speed = 30 + this.wave * 2;
        const damage = 5 + this.wave;

        const enemy = new Enemy(id, position, health, speed, damage);
        this.entityManager.addEntity(enemy);
    }

    getWave(): number { return this.wave; }
    isWaveFinished(): boolean {
        return this.enemiesToSpawn === 0 && this.entityManager.getEntitiesByType(EntityType.ENEMY).length === 0;
    }
}
