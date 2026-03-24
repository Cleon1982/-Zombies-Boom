# Game Demo: Zombie Shooter (Inspired by 《向僵尸开炮》)

This project is a core combat and system demo for a Roguelike + Tower Defense game.

## Directory Structure

- `src/core/`: Core game engine (Entity management, Player controller, Enemy spawner, Skill manager)
- `src/skills/`: Skill implementations and base classes
- `src/systems/`: Persistence (`localStorage`) and external system interfaces (Gems/Equipment)
- `src/ui/`: UI controllers for the Main City, Combat HUD, and Upgrade Selection
- `index.html`: Main game entry point and UI layout

## Features Implemented

1.  **Main City UI**: View gold reserves and highest wave reached.
2.  **Core Combat**: Auto-aiming player turret, wave-based enemy spawning with health bars.
3.  **Skill System**: 5 unique skills with upgrade logic and "3-choose-1" selection.
    - Thermobaric Bomb (温压弹)
    - Electromagnetic Ring (电磁圈)
    - Hail Generator (冰雹发生器)
    - Dry Ice Bomb (干冰弹)
    - High-energy Ray (高能射线)
4.  **Progression & Persistence**: `localStorage` records gold and wave progress. Gem/Equipment interfaces define how external stats influence combat.
5.  **Performance Guide**: `PERFORMANCE.md` detailing how to handle high unit counts and rendering optimizations.

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
