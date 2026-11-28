# Kymlinge Station toolkit

Installed in this Lovable project, not automatically in the team's separate source repository.
The standalone `public/game.html` loads these scripts from the same origin.
No gameplay rules or appearance have been changed by this installation.

## Available browser APIs

| Library | Version | Purpose |
| --- | --- | --- |
| Three.js | 0.128.0 | Existing renderer, PBR materials, lighting, shadows, AnimationMixer, positional audio |
| GLTFLoader / SkeletonUtils | Matching r128 | GLB characters, animation clips and rigged model cloning |
| RGBELoader | Matching r128 | HDR environment maps for reflections and lighting |
| EffectComposer / RenderPass / ShaderPass | Matching r128 | Optional post-processing pipeline |
| UnrealBloomPass | Matching r128 | Controlled bloom around bright lights |
| FXAAShader | Matching r128 | Screen-space antialiasing |
| FilmPass / VignetteShader / ColorCorrectionShader | Matching r128 | Film grain, edge shading and color grading |
| Howler (`Howl`, `Howler`) | 2.2.4 | Audio loading, looping, volume and spatial positioning |
| lil-gui (`lil.GUI`) | 0.20.0 | Optional development-only parameter controls |
| GSAP (`gsap`) | 3.14.2 | Smooth non-skeletal transitions and timelines |

## Integration boundaries

- Three.js stays at r128 because the existing game uses `outputEncoding`, `sRGBEncoding` and a custom blood shader. Upgrade the game and tests together before upgrading Three.js.
- The scripts expose APIs only. No bloom, extra sound, HDR or tuning panel is active yet.
- Build post-processing into the existing render loop rather than adding another animation loop. Resize and dispose render targets; measure cost before enabling heavy effects.
- Use `THREE.AnimationMixer` for skeletal animation, not GSAP. Load and inspect actual models before integration.
- The game already has Web Audio and mute controls. Do not mix in a second uncontrolled audio system: choose one shared mixer when integrating Howler.
- GUI controls belong behind the existing localhost-only development guard.
- Textures, HDR images, models and recordings are separate assets, not included with these libraries.

## Updating local copies

Dependencies are pinned in `package.json` and `bun.lock`. Browser files are copied from `node_modules/three/build`, `node_modules/three/examples/js`, `node_modules/howler/dist`, `node_modules/lil-gui/dist` and `node_modules/gsap/dist` into this directory. Keep their license notices with the copied files and update copies when changing a package version. Do not hand-edit vendor distributions.

Three.js, Howler and lil-gui use MIT licenses (included). GSAP uses its Standard License, not MIT; its original copyright and license URL are preserved in `gsap.min.js`. See https://gsap.com/standard-license for its terms.