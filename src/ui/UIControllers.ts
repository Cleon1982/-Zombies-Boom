import { BaseSkill } from '../skills/BaseSkill';
import { Player } from '../core/PlayerController';
import { EnemySpawner } from '../core/EnemySpawner';
import { EntityManager, EntityType } from '../core/EntityManager';

export class CombatHUD {
    private hpElem: HTMLElement;
    private waveElem: HTMLElement;
    private enemiesElem: HTMLElement;

    constructor() {
        this.hpElem = document.getElementById('hp')!;
        this.waveElem = document.getElementById('wave')!;
        this.enemiesElem = document.getElementById('enemies')!;
    }

    update(player: Player, spawner: EnemySpawner, entityManager: EntityManager) {
        this.hpElem.innerText = Math.ceil(player.health).toString();
        this.waveElem.innerText = spawner.getWave().toString();
        this.enemiesElem.innerText = entityManager.getEntitiesByType(EntityType.ENEMY).length.toString();
    }
}

export class UpgradeUI {
    private modal: HTMLElement;
    private container: HTMLElement;
    private onChoice: (skillId: string) => void;

    constructor(onChoice: (skillId: string) => void) {
        this.modal = document.getElementById('upgrade-modal')!;
        this.container = document.getElementById('options-container')!;
        this.onChoice = onChoice;
    }

    show(options: BaseSkill[]) {
        this.container.innerHTML = '';
        options.forEach(skill => {
            const div = document.createElement('div');
            div.className = 'skill-option';
            div.innerHTML = `
                <div class="skill-name">${skill.name} (LVL ${skill.level} -> ${skill.level + 1})</div>
                <div class="skill-desc">${skill.getDescription()}</div>
            `;
            div.onclick = () => {
                this.modal.style.display = 'none';
                this.onChoice(skill.id);
            };
            this.container.appendChild(div);
        });
        this.modal.style.display = 'block';
    }

    hide() {
        this.modal.style.display = 'none';
    }
}
