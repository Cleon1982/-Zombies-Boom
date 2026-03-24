import { EntityManager, EntityType } from './core/EntityManager';
import { Player, PlayerController } from './core/PlayerController';
import { EnemySpawner } from './core/EnemySpawner';
import { SkillManager } from './core/SkillManager';
import { ThermobaricBomb, ElectromagneticRing } from './skills/SkillsSet1';
import { HailGenerator, DryIceBomb, HighEnergyRay } from './skills/SkillsSet2';
import { Renderer } from './ui/Renderer';
import { CombatHUD, UpgradeUI } from './ui/UIControllers';
import { CityUI } from './ui/CityUI';
import { PersistenceManager } from './systems/Persistence';
import { ExternalSystemManager } from './systems/Interfaces';

class Game {
    private em: EntityManager;
    private player: Player;
    private pc: PlayerController;
    private spawner: EnemySpawner;
    private sm: SkillManager;
    private renderer: Renderer;
    private hud: CombatHUD;
    private upgradeUI: UpgradeUI;
    private lastTime: number = 0;
    private isPaused: boolean = false;
    private isGameOver: boolean = false;

    constructor() {
        const canvas = document.getElementById('gameCanvas') as HTMLCanvasElement;
        this.renderer = new Renderer(canvas);
        (window as any).gameRenderer = this.renderer;
        this.em = new EntityManager();
        this.player = new Player('p1', { x: 400, y: 10 });

        // Apply external bonuses
        const exManager = new ExternalSystemManager();
        // Example: Add a starter gem/equipment bonus
        const bonus = exManager.getTotalBonus();
        this.player.applyBonus(bonus);

        this.em.addEntity(this.player);
        this.pc = new PlayerController(this.em, this.player);
        this.spawner = new EnemySpawner(this.em);
        this.sm = new SkillManager(this.em);
        this.hud = new CombatHUD();
        this.upgradeUI = new UpgradeUI((id) => this.onSkillChoice(id));

        this.sm.addSkillToPool(new ThermobaricBomb());
        this.sm.addSkillToPool(new ElectromagneticRing());
        this.sm.addSkillToPool(new HailGenerator());
        this.sm.addSkillToPool(new DryIceBomb());
        this.sm.addSkillToPool(new HighEnergyRay());
    }

    start() {
        this.spawner.startWave();
        this.showUpgrade();
    }

    private onSkillChoice(id: string) {
        this.sm.chooseSkill(id);
        this.isPaused = false;
        requestAnimationFrame((t) => {
            this.lastTime = t;
            this.loop(t);
        });
    }

    private loop(timestamp: number) {
        if (this.isPaused || this.isGameOver) {
            this.lastTime = timestamp;
            return;
        }

        const deltaTime = Math.min(0.1, (timestamp - this.lastTime) / 1000);
        this.lastTime = timestamp;

        this.spawner.update(deltaTime);
        this.pc.update(deltaTime);
        this.sm.update(deltaTime);

        // Custom update for enemies reaching the wall
        const enemies = this.em.getEntitiesByType(EntityType.ENEMY);
        for (const enemy of enemies) {
            enemy.update(deltaTime);
            if (enemy.position.y <= 0) {
                this.player.takeDamage(1); // 1 damage per frame when touching wall
                if (this.player.isDead) {
                    this.gameOver();
                }
            }
        }
        this.em.update(deltaTime);

        // Every frame has a small chance to earn gold (demo purpose)
        if (Math.random() < 0.01) this.player.goldCollected++;

        this.renderer.render(this.em);
        this.hud.update(this.player, this.spawner, this.em);

        if (this.spawner.isWaveFinished()) {
            this.spawner.startWave();
            this.showUpgrade();
            return;
        }

        requestAnimationFrame((t) => this.loop(t));
    }

    private showUpgrade() {
        this.isPaused = true;
        const options = this.sm.getSelectionOptions(3);
        this.upgradeUI.show(options);
    }

    private gameOver() {
        this.isGameOver = true;

        // Save Progress
        const progress = PersistenceManager.load();
        progress.gold += this.player.goldCollected;
        if (this.spawner.getWave() > progress.highestWave) {
            progress.highestWave = this.spawner.getWave();
        }
        PersistenceManager.save(progress);

        const city = new CityUI();
        city.show();
        const h1 = document.querySelector('#menu-overlay h1') as HTMLElement;
        if (h1) h1.innerText = '游戏结束';
        const p = document.querySelector('#menu-overlay .subtitle') as HTMLElement;
        if (p) p.innerText = `获得黄金: ${this.player.goldCollected} | 最高波次: ${this.spawner.getWave()}`;
    }
}

const city = new CityUI();
city.show();

(window as any).startGame = () => {
    city.hide();
    const game = new Game();
    game.start();
};
