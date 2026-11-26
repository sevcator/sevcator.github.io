# sevcator.github.io

Interactive Rigid-Body Physics Playground for **sevcator**.

## Features

- **Built from Scratch**: Lightweight, high-performance 2D rigid-body physics simulation without audio.
- **Icons Drop from the Very Top**:
  - Pure borderless monochromatic vector icons (Telegram, YouTube, GitHub, Zapret Pocket, 5ubscrpt10n, Discord, Donate).
  - Each icon spawns with a **different randomized size** (diameters ~52px to 124px) and proportional mass.
- **Screen Boundary Enforcement**:
  - Automatically measures the user's viewport dimensions (`window.innerWidth`, `window.innerHeight`).
  - Sets up unbreakable physical boundaries (floor, ceiling, left and right walls) with visual boundary wall indicators.
  - Icons **cannot be thrown, dragged, or tossed outside the screen** under any circumstances.
- **"Иконки обратно не идут" (No Auto-Return)**:
  - Zero rubber-banding and no fixed magnetic slots.
  - Wherever icons fall, bounce, collide, or are tossed by the user, they stay right there.
- **Icon-to-Icon Elastic Collisions**:
  - Real circle-circle collision detection and impulse resolution—icons bounce off each other and pile up naturally.
- **Interactive Hold & Toss Mechanics**:
  - Click/touch and **hold** any icon to pick it up and move it around freely.
  - Toss with physical momentum; icons bounce off walls and floor with realistic restitution and friction.
  - Clicking an icon opens the respective project or profile link in a new tab.
- **Playground Controls**:
  - **DROP ICON**: Spawns an additional random icon from the very top.
  - **GRAVITY**: Toggles between Normal downward gravity, Inverted upward gravity, and Zero-G floating mode.
  - **RESET**: Clears and re-drops all icons from the top.

## Local Preview

Run a local server:

```bash
python -m http.server 8000
```

Then visit [http://localhost:8000](http://localhost:8000) in your browser.
