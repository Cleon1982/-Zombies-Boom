import { EntityManager, EntityType } from '../core/EntityManager';
import { Player } from '../core/PlayerController';
import { Enemy } from '../core/EnemySpawner';

export class Renderer {
    private ctx: CanvasRenderingContext2D;
    private width: number;
    private height: number;

    constructor(canvas: HTMLCanvasElement) {
        this.ctx = canvas.getContext('2d')!;
        this.width = canvas.width;
        this.height = canvas.height;
    }

    clear() {
        this.ctx.fillStyle = '#111';
        this.ctx.fillRect(0, 0, this.width, this.height);
    }

    render(entityManager: EntityManager) {
        this.clear();

        // Draw Wall/Base
        this.ctx.fillStyle = '#555';
        this.ctx.fillRect(0, this.height - 20, this.width, 20);

        const entities = entityManager.getEntitiesByType(EntityType.ENEMY) as Enemy[];
        const players = entityManager.getEntitiesByType(EntityType.PLAYER) as Player[];

        // Render Enemies
        for (const enemy of entities) {
            this.ctx.fillStyle = enemy.freezeTimer > 0 ? '#0ff' : '#f00';
            this.ctx.fillRect(enemy.position.x - 10, this.height - enemy.position.y - 10, 20, 20);

            // Health bar
            const hpWidth = (enemy.health / enemy.maxHealth) * 20;
            this.ctx.fillStyle = '#0f0';
            this.ctx.fillRect(enemy.position.x - 10, this.height - enemy.position.y - 15, hpWidth, 3);
        }

        // Render Player/Turret
        for (const player of players) {
            this.ctx.fillStyle = '#0af';
            this.ctx.beginPath();
            this.ctx.arc(player.position.x, this.height - player.position.y - 10, 15, 0, Math.PI * 2);
            this.ctx.fill();
        }
    }

    drawEffect(name: string, data: any) {
        // Simple visual cues for skills
        if (name === 'thermobaric_bomb') {
            this.ctx.strokeStyle = '#f80';
            this.ctx.lineWidth = 3;
            this.ctx.beginPath();
            this.ctx.arc(data.x, this.height - data.y, data.radius, 0, Math.PI * 2);
            this.ctx.stroke();
        } else if (name === 'electromagnetic_ring') {
            this.ctx.strokeStyle = '#aaf';
            this.ctx.lineWidth = 2;
            this.ctx.beginPath();
            this.ctx.arc(400, this.height - 10, data.radius, 0, Math.PI, true);
            this.ctx.stroke();
        } else if (name === 'high_energy_ray') {
            this.ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
            this.ctx.fillRect(400 - data.width / 2, 0, data.width, this.height);
        }
    }
}
