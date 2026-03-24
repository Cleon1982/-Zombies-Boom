import { EntityManager, EntityType } from './core/EntityManager';
import { Player, PlayerController } from './core/PlayerController';
import { EnemySpawner } from './core/EnemySpawner';
import { SkillManager } from './core/SkillManager';
import { ThermobaricBomb, ElectromagneticRing } from './skills/SkillsSet1';
import { HailGenerator, DryIceBomb, HighEnergyRay } from './skills/SkillsSet2';
import { CombatHUD, UpgradeUI } from './ui/UIControllers';

async function runSimulation() {
    process.stdout.write('Starting Simulation...\n');
    const em = new EntityManager();
    const player = new Player('player', { x: 400, y: 0 });
    em.addEntity(player);

    const pc = new PlayerController(em, player);
    const spawner = new EnemySpawner(em);
    const sm = new SkillManager(em);

    sm.addSkillToPool(new ThermobaricBomb());
    sm.addSkillToPool(new ElectromagneticRing());
    sm.addSkillToPool(new HailGenerator());
    sm.addSkillToPool(new DryIceBomb());
    sm.addSkillToPool(new HighEnergyRay());

    const hud = new CombatHUD(player, spawner);
    const upgradeUI = new UpgradeUI();

    let frame = 0;
    const deltaTime = 0.5;

    spawner.startWave();

    while (spawner.getWave() <= 2) {
        frame++;

        spawner.update(deltaTime);
        pc.update(deltaTime);
        sm.update(deltaTime);
        em.update(deltaTime);

        if (frame % 10 === 0) {
            hud.render();
            const enemies = em.getEntitiesByType(EntityType.ENEMY);
            process.stdout.write(`Live enemies: ${enemies.length}\n`);
        }

        if (frame % 40 === 0) {
            process.stdout.write('\n--- SIMULATING LEVEL UP ---\n');
            const options = sm.getSelectionOptions(3);
            upgradeUI.renderOptions(options);
            if (options.length > 0) {
                sm.chooseSkill(options[0].id);
            }
            process.stdout.write('---------------------------\n\n');
        }

        if (spawner.isWaveFinished()) {
            process.stdout.write(`Wave ${spawner.getWave()} Cleared!\n`);
            if (spawner.getWave() < 2) {
                spawner.startWave();
            } else {
                break;
            }
        }

        if (frame > 200) break;
    }

    process.stdout.write('Simulation complete.\n');
}

runSimulation();
