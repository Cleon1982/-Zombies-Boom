import { BaseSkill } from './BaseSkill';
import { EntityManager, EntityType, Vector2 } from '../core/EntityManager';

export class ThermobaricBomb extends BaseSkill {
    radius: number = 100;
    damage: number = 50;

    constructor() {
        super('thermobaric_bomb', '温压弹', 5.0);
    }

    activate(entityManager: EntityManager) {
        const enemies = entityManager.getEntitiesByType(EntityType.ENEMY);
        if (enemies.length === 0) return;

        const target = enemies[Math.floor(Math.random() * enemies.length)];
        const center = target.position;

        console.log(`[ThermobaricBomb] Activating at (${center.x.toFixed(1)}, ${center.y.toFixed(1)})`);

        for (const enemy of enemies) {
            const dist = this.getDistance(center, enemy.position);
            if (dist <= this.radius) {
                enemy.takeDamage(this.damage);
            }
        }
    }

    onUpgrade() {
        this.damage += 20;
        this.radius += 20;
        this.cooldown *= 0.9;
    }

    getDescription() {
        return `造成爆炸伤害。伤害: ${this.damage}, 半径: ${this.radius}`;
    }

    private getDistance(v1: Vector2, v2: Vector2): number {
        return Math.sqrt(Math.pow(v1.x - v2.x, 2) + Math.pow(v1.y - v2.y, 2));
    }
}

export class ElectromagneticRing extends BaseSkill {
    radius: number = 150;
    damagePerSecond: number = 10;

    constructor() {
        super('electromagnetic_ring', '电磁圈', 0.5);
    }

    activate(entityManager: EntityManager) {
        const enemies = entityManager.getEntitiesByType(EntityType.ENEMY);
        const center: Vector2 = { x: 400, y: 0 };

        for (const enemy of enemies) {
            const dist = this.getDistance(center, enemy.position);
            if (dist <= this.radius) {
                enemy.takeDamage(this.damagePerSecond * 0.5);
            }
        }
    }

    onUpgrade() {
        this.radius += 30;
        this.damagePerSecond += 5;
    }

    getDescription() {
        return `基地周围电磁场。伤害/秒: ${this.damagePerSecond}, 半径: ${this.radius}`;
    }

    private getDistance(v1: Vector2, v2: Vector2): number {
        return Math.sqrt(Math.pow(v1.x - v2.x, 2) + Math.pow(v1.y - v2.y, 2));
    }
}
