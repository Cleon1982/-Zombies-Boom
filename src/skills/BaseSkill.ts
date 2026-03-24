import { EntityManager } from '../core/EntityManager';

export abstract class BaseSkill {
    id: string;
    name: string;
    level: number = 0;
    maxLevel: number = 5;
    cooldown: number;
    currentCooldown: number = 0;

    constructor(id: string, name: string, cooldown: number) {
        this.id = id;
        this.name = name;
        this.cooldown = cooldown;
    }

    upgrade() {
        if (this.level < this.maxLevel) {
            this.level++;
            this.onUpgrade();
        }
    }

    update(deltaTime: number, entityManager: EntityManager) {
        if (this.level === 0) return;

        if (this.currentCooldown > 0) {
            this.currentCooldown -= deltaTime;
        }

        if (this.currentCooldown <= 0) {
            this.activate(entityManager);
            this.currentCooldown = this.cooldown;
        }
    }

    abstract activate(entityManager: EntityManager): void;
    abstract onUpgrade(): void;
    abstract getDescription(): string;
}
