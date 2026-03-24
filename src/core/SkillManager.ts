import { EntityManager } from './EntityManager';
import { BaseSkill } from '../skills/BaseSkill';

export class SkillManager {
    private entityManager: EntityManager;
    private availableSkills: BaseSkill[] = [];
    private activeSkills: BaseSkill[] = [];

    constructor(entityManager: EntityManager) {
        this.entityManager = entityManager;
    }

    addSkillToPool(skill: BaseSkill) {
        this.availableSkills.push(skill);
    }

    getSelectionOptions(count: number = 3): BaseSkill[] {
        const possibleOptions = this.availableSkills.filter(s => s.level < s.maxLevel);
        return possibleOptions
            .sort(() => Math.random() - 0.5)
            .slice(0, count);
    }

    chooseSkill(skillId: string) {
        const skill = this.availableSkills.find(s => s.id === skillId);
        if (skill) {
            if (skill.level === 0) {
                this.activeSkills.push(skill);
            }
            skill.upgrade();
            console.log(`Upgraded ${skill.name} to Level ${skill.level}`);
        }
    }

    update(deltaTime: number) {
        for (const skill of this.activeSkills) {
            skill.update(deltaTime, this.entityManager);
        }
    }

    getActiveSkills(): BaseSkill[] {
        return this.activeSkills;
    }
}
