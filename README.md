# Game Demo: Zombie Shooter (Inspired by 《向僵尸开炮》)

This project is a core combat and system demo for a Roguelike + Tower Defense game.

## Features Implemented

1.  **Main City UI**: View gold reserves and highest wave reached.
2.  **Core Combat**: Auto-aiming player turret, wave-based enemy spawning with health bars.
3.  **Skill System**: 5 unique skills with upgrade logic and "3-choose-1" selection.
4.  **Progression & Persistence**: `localStorage` records gold and wave progress.

## Getting Started

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Build the game**:
   ```bash
   npm run build
   ```

3. **Run the game**:
   Open `index.html` in any modern web browser.

## Troubleshooting

### `EEXIST` error on Windows during `npm install`
If you encounter an error like `error code EEXIST` or `Refusing to delete ... tsc`, it is likely due to a conflict with existing global or local node_modules. To fix:
1. Delete the `node_modules` folder and `package-lock.json` file.
2. Run `npm install` again.

### Game won't start (Missing `dist/bundle.js`)
If you see a `404` error for `/dist/bundle.js` in the browser console, ensure you have run the build command:
```bash
npm run build
```
This command compiles the TypeScript source code and bundles it for the browser.
