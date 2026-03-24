import { BaseSkill } from './BaseSkill';
import { EntityManager, EntityType, Vector2 } from '../core/EntityManager';
import { Enemy } from '../core/EnemySpawner';

export class HailGenerator extends BaseSkill {
    hits: number = 3;
    damagePerHit: number = 20;

    constructor() {
        super('hail_generator', '冰雹发生器', 6.0);
    }

    activate(entityManager: EntityManager) {
        const enemies = entityManager.getEntitiesByType(EntityType.ENEMY) as Enemy[];
        if (enemies.length === 0) return;

        process.stdout.write(`[HailGenerator] Dropping ${this.hits} hails on random enemies\n`);
        for (let i = 0; i < this.hits; i++) {
            const target = enemies[Math.floor(Math.random() * enemies.length)];
            target.takeDamage(this.damagePerHit);
            target.freeze(0.5); // Minor freeze on hit
        }
    }

    onUpgrade() {
        this.hits += 2;
        this.damagePerHit += 10;
    }

    getDescription() {
        return `召唤大量冰雹攻击随机敌人并造成短暂微僵。次数: ${this.hits}, 伤害: ${this.damagePerHit}`;
    }
}

export class DryIceBomb extends BaseSkill {
    freezeDuration: number = 2.0;

    constructor() {
        super('dry_ice_bomb', '干冰弹', 8.0);
    }

    activate(entityManager: EntityManager) {
        const enemies = entityManager.getEntitiesByType(EntityType.ENEMY) as Enemy[];
        if (enemies.length === 0) return;

        process.stdout.write(`[DryIceBomb] Freezing enemies for ${this.freezeDuration}s\n`);
        for (const enemy of enemies) {
             enemy.takeDamage(5);
             enemy.freeze(this.freezeDuration);
        }
    }

    onUpgrade() {
        this.freezeDuration += 0.5;
        this.cooldown *= 0.95;
    }

    getDescription() {
        return `向前方发射干冰弹，冻结大范围内的敌人。时长: ${this.freezeDuration}s`;
    }
}

export class HighEnergyRay extends BaseSkill {
    damagePerSecond: number = 100;
    width: number = 50;

    constructor() {
        super('high_energy_ray', '高能射线', 10.0);
    }

    activate(entityManager: EntityManager) {
        const enemies = entityManager.getEntitiesByType(EntityType.ENEMY);
        if (enemies.length === 0) return;

        process.stdout.write(`[HighEnergyRay] Firing beam down the center\n`);
        const centerX = 400;
        for (const enemy of enemies) {
            if (Math.abs(enemy.position.x - centerX) < this.width / 2) {
                enemy.takeDamage(this.damagePerSecond * 0.5);
            }
        }
    }

    onUpgrade() {
        this.damagePerSecond += 50;
        this.width += 20;
    }

    getDescription() {
        return `发射一道贯穿全屏的高能射线。秒伤: ${this.damagePerSecond}, 宽度: ${this.width}`;
    }
}
