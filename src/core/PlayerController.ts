import { Entity, EntityType, Vector2, EntityManager } from './EntityManager';

export class Player extends Entity {
    shootCooldown: number = 1.0;
    currentCooldown: number = 0;
    damage: number = 10;
    range: number = 500;

    constructor(id: string, position: Vector2) {
        super(id, EntityType.PLAYER, position, 100);
    }

    update(deltaTime: number) {
        if (this.currentCooldown > 0) {
            this.currentCooldown -= deltaTime;
        }
    }

    canShoot(): boolean {
        return this.currentCooldown <= 0;
    }

    resetCooldown() {
        this.currentCooldown = this.shootCooldown;
    }
}

export class PlayerController {
    private entityManager: EntityManager;
    private player: Player;

    constructor(entityManager: EntityManager, player: Player) {
        this.entityManager = entityManager;
        this.player = player;
    }

    update(deltaTime: number) {
        this.player.update(deltaTime);

        if (this.player.canShoot()) {
            const target = this.findNearestEnemy();
            if (target) {
                this.shoot(target);
            }
        }
    }

    private findNearestEnemy(): Entity | null {
        const enemies = this.entityManager.getEntitiesByType(EntityType.ENEMY);
        let nearest: Entity | null = null;
        let minDistance = Infinity;

        for (const enemy of enemies) {
            const dist = this.getDistance(this.player.position, enemy.position);
            if (dist < minDistance && dist <= this.player.range) {
                minDistance = dist;
                nearest = enemy;
            }
        }

        return nearest;
    }

    private getDistance(v1: Vector2, v2: Vector2): number {
        return Math.sqrt(Math.pow(v1.x - v2.x, 2) + Math.pow(v1.y - v2.y, 2));
    }

    private shoot(target: Entity) {
        this.player.resetCooldown();
        target.takeDamage(this.player.damage);
    }
}
