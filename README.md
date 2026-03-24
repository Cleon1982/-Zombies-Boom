# Game Demo: Zombie Shooter (Inspired by 《向僵尸开炮》)

This project is a core combat and system demo for a Roguelike + Tower Defense game.

## Directory Structure

- `src/core/`: Core game engine (Entity management, Player controller, Enemy spawner, Skill manager)
- `src/skills/`: Skill implementations and base classes
- `src/systems/`: External systems (Gem and Equipment interfaces)
- `src/ui/`: UI controllers for combat and upgrades
- `src/test_game.ts`: Simulation script to verify core logic

## Features Implemented

1.  **Core Combat**: Auto-aiming player, wave-based enemy spawning, and health/damage systems.
2.  **Skill System**: 5 unique skills with upgrade logic and "3-choose-1" selection.
    - Thermobaric Bomb (温压弹)
    - Electromagnetic Ring (电磁圈)
    - Hail Generator (冰雹发生器)
    - Dry Ice Bomb (干冰弹)
    - High-energy Ray (高能射线)
3.  **Progression**: Mock Gem and Equipment systems to show how external stats influence combat.
4.  **Performance Guide**: `PERFORMANCE.md` detailing how to handle high unit counts and rendering optimizations.

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Run the simulation:
   ```bash
   npx ts-node src/test_game.ts
   ```
