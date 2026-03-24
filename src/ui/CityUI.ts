import { PersistenceManager } from '../systems/Persistence';

export class CityUI {
    private overlay: HTMLElement;
    private goldElem: HTMLElement;
    private waveElem: HTMLElement;

    constructor() {
        this.overlay = document.getElementById('menu-overlay')!;
        this.goldElem = document.getElementById('city-gold')!;
        this.waveElem = document.getElementById('city-wave')!;
    }

    show() {
        const progress = PersistenceManager.load();
        this.goldElem.innerText = progress.gold.toString();
        this.waveElem.innerText = progress.highestWave.toString();
        this.overlay.style.display = 'flex';
    }

    hide() {
        this.overlay.style.display = 'none';
    }
}
