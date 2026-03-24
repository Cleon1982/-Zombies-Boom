export interface Vector2 {
    x: number;
    y: number;
}

export enum EntityType {
    PLAYER,
    ENEMY,
    PROJECTILE
}

export abstract class Entity {
    id: string;
    type: EntityType;
    position: Vector2;
    health: number;
    maxHealth: number;
    isDead: boolean = false;

    constructor(id: string, type: EntityType, position: Vector2, health: number) {
        this.id = id;
        this.type = type;
        this.position = position;
        this.health = health;
        this.maxHealth = health;
    }

    abstract update(deltaTime: number): void;

    takeDamage(amount: number) {
        this.health -= amount;
        if (this.health <= 0) {
            this.health = 0;
            this.isDead = true;
        }
    }
}

export class EntityManager {
    private entities: Map<string, Entity> = new Map();
    private nextId: number = 0;

    addEntity(entity: Entity) {
        this.entities.set(entity.id, entity);
    }

    removeEntity(id: string) {
        this.entities.delete(id);
    }

    getEntity(id: string): Entity | undefined {
        return this.entities.get(id);
    }

    getEntitiesByType(type: EntityType): Entity[] {
        return Array.from(this.entities.values()).filter(e => e.type === type);
    }

    update(deltaTime: number) {
        for (const entity of this.entities.values()) {
            if (!entity.isDead) {
                entity.update(deltaTime);
            }
        }

        // Clean up dead entities
        for (const [id, entity] of this.entities.entries()) {
            if (entity.isDead) {
                this.entities.delete(id);
            }
        }
    }

    generateId(): string {
        return (this.nextId++).toString();
    }
}
