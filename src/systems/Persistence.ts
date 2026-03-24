export interface GameProgress {
    gold: number;
    highestWave: number;
    currentLevel: number;
}

export class PersistenceManager {
    private static STORAGE_KEY = 'zombie_shooter_demo_v1';

    static save(progress: GameProgress) {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(progress));
    }

    static load(): GameProgress {
        const data = localStorage.getItem(this.STORAGE_KEY);
        if (data) {
            return JSON.parse(data);
        }
        return {
            gold: 0,
            highestWave: 0,
            currentLevel: 1
        };
    }

    static addGold(amount: number) {
        const p = this.load();
        p.gold += amount;
        this.save(p);
    }
}
