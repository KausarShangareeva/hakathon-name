# Kymlinge Station

A short first-person horror game set on the last Stockholm subway home. You wake in a dark, closed, empty station lit only by green exit signs, with something long dead walking it. Inspired by Silverpilen and the unopened Kymlinge station, and by the Norse draugr.

## Play

Open `index.html` in a browser. No build step. Three.js loads from a CDN.

The entity is a hooded black figure, 1.85 m tall, with two white eyes and a torn hem, drawn after the team's ink illustration. It is built from simple shapes in code, so there are no model files.

Add `?demo` to the URL to watch an autopilot play all three levels and the armed hunt.

## Rules

- Hold **Space** to close your eyes. You stop, and it moves.
- It moves whenever you are not looking at it, including while you read signs, and freezes when seen.
- Signs only show their arrow when you look straight at them.
- Eye strain builds while your eyes are open and forces a blink at 100.
- Clear three levels, then leave or go back inside, armed with an iron axe, and hunt the dead.

Controls: WASD or arrows to walk, drag to look, Space to blink. On touch, use the on-screen buttons.

Status: not yet play-tested. Speed, fog and lighting values are untuned.
