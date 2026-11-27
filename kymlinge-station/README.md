# Kymlinge Station

A short first-person horror game set on the last Stockholm subway home. You wake in a dark, closed, empty station lit only by green exit signs, with something long dead walking it. Inspired by Silverpilen and the unopened Kymlinge station, and by the Norse draugr.

## Play

Serve this folder over HTTP (for example `python3 -m http.server`) and open `index.html`. No build step. Three.js, GLTFLoader and SkeletonUtils load from a CDN.

The draugr is a rigged GLB (`draugr.glb`, 2.5 m tall, feet on the floor) with `walk_clip.glb` and `run_clip.glb`. It walks or runs when you are not looking, and freezes in its current pose when you are. Textures are the original maps resized to 1024 px. If the files cannot load, a built-in draugr is used instead.

Add `?demo` to the URL to watch an autopilot play all three levels and the armed hunt.

## Rules

- Hold **Space** to close your eyes. You stop, and it moves.
- It moves whenever you are not looking at it, including while you read signs, and freezes when seen.
- Signs only show their arrow when you look straight at them.
- Eye strain builds while your eyes are open and forces a blink at 100.
- Clear three levels, then leave or go back inside, armed with an iron axe, and hunt the dead.

Controls: WASD or arrows to walk, drag to look, Space to blink. On touch, use the on-screen buttons.

Status: not yet play-tested. Speed, fog and lighting values are untuned.
