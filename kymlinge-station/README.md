# Kymlinge Station

A short first-person horror game set in the closed, empty Kymlinge station on the Stockholm subway. You wake on a bench by the track with something long dead walking the station. Find the nödutgång (emergency exit), collect what you can, and get out before it reaches you. Inspired by Silverpilen and the unopened Kymlinge station.

## Play

Open `index.html` in a browser. No build step. Three.js loads from a CDN; the entity model and sounds are the `.glb` and `.mp3` files next to it.

Add `?demo` to the URL to watch an autopilot play a run.

## Rules

- Hold **Space** to close your eyes. You stop, and it moves.
- It only freezes while you look at it, and it moves whenever you look away, including while you read signs.
- Signs only show their arrow when you look straight at them. The green nödutgång signs follow the official route; shortcuts (some marked GENVÄG) are not on it.
- Eye strain builds while your eyes are open and forces a blink at 100.
- Loot: kanelbullar (+2), rare kardemummabullar (+5) and one golden Dalahäst deep in the maze (+50, +1 sprint, +25 more if you escape with it).
- Sprint once per run. Shift or the Sprint button.
- Escape at sunrise, then walk away into Stockholm or go back in with an iron axe to destroy it for +100.
- Modes: Easy (smaller maze, fewer false alarms, 4 hits on the ghost) and Medium. High scores and ranks are saved per mode in the browser.
- Full screen with the button or **F**.
