import { BaseSkill } from '../skills/BaseSkill';
import { Player } from '../core/PlayerController';
import { EnemySpawner } from '../core/EnemySpawner';

export class CombatHUD {
    private player: Player;
    private spawner: EnemySpawner;

    constructor(player: Player, spawner: EnemySpawner) {
        this.player = player;
        this.spawner = spawner;
    }

    render() {
        console.log(`--- Combat HUD ---`);
        console.log(`HP: ${this.player.health}/${this.player.maxHealth} | Wave: ${this.spawner.getWave()}`);
    }
}

export class UpgradeUI {
    renderOptions(skills: BaseSkill[]) {
        console.log(`--- Upgrade Selection (Choose 1) ---`);
        skills.forEach((skill, index) => {
            console.log(`${index + 1}. [${skill.name} LVL ${skill.level}] -> LVL ${skill.level + 1}`);
            console.log(`   ${skill.getDescription()}`);
        });
    }

    onSelectionMade(skillId: string) {
        console.log(`Selected skill: ${skillId}`);
    }
}

export class MainMenuUI {
    render() {
        console.log(`--- Main Menu ---`);
        console.log(`1. Start Combat`);
        console.log(`2. Equipment & Gems`);
        console.log(`3. Shop`);
    }
}
