export interface ExternalStatBonus {
    playerDamageBonus: number;
    playerRangeBonus: number;
    skillDamageBonus: number;
    cooldownReduction: number;
}

export interface Gem {
    id: string;
    name: string;
    description: string;
    bonus: Partial<ExternalStatBonus>;
}

export interface Equipment {
    id: string;
    slot: 'weapon' | 'armor' | 'accessory';
    gems: Gem[];
    baseBonus: Partial<ExternalStatBonus>;
}

export class ExternalSystemManager {
    private equipment: Map<string, Equipment> = new Map();

    getTotalBonus(): ExternalStatBonus {
        const total: ExternalStatBonus = {
            playerDamageBonus: 0,
            playerRangeBonus: 0,
            skillDamageBonus: 0,
            cooldownReduction: 0
        };

        for (const equip of this.equipment.values()) {
            this.applyBonus(total, equip.baseBonus);
            for (const gem of equip.gems) {
                this.applyBonus(total, gem.bonus);
            }
        }

        return total;
    }

    private applyBonus(target: ExternalStatBonus, bonus: Partial<ExternalStatBonus>) {
        if (bonus.playerDamageBonus) target.playerDamageBonus += bonus.playerDamageBonus;
        if (bonus.playerRangeBonus) target.playerRangeBonus += bonus.playerRangeBonus;
        if (bonus.skillDamageBonus) target.skillDamageBonus += bonus.skillDamageBonus;
        if (bonus.cooldownReduction) target.cooldownReduction += bonus.cooldownReduction;
    }

    equipItem(equip: Equipment) {
        this.equipment.set(equip.slot, equip);
    }
}
