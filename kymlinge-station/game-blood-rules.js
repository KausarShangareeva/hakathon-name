/* Pure game rules; shared by the standalone page and its Vitest checks. */
(function (root) {
  "use strict";
  var STRIDE = 0.82, STRENGTHS = [0.92, 0.72, 0.52, 0.32, 0.14];
  function outline(seed) {
    var points = [];
    for (var i = 0; i <= 40; i++) {
      var a = Math.PI * i / 40;
      var ripple = 0.92 + 0.05 * Math.sin(a * 13 + seed) + 0.03 * Math.sin(a * 23 + seed * 2);
      points.push({ x: Math.cos(a) * 0.5 * ripple, z: Math.sin(a) * ripple });
    }
    return points;
  }
  function depthAt(pool, seconds) {
    return pool.maxDepth * (0.32 + 0.68 * (1 - Math.exp(-Math.max(0, seconds) / 75)));
  }
  function contains(pool, x, z, seconds) {
    var dx = x - pool.x, dz = z - pool.z;
    var u = (dx * pool.nz - dz * pool.nx) / pool.width;
    var v = (dx * pool.nx + dz * pool.nz) / depthAt(pool, seconds);
    var inside = false, pts = pool.outline;
    for (var i = 0, j = pts.length - 1; i < pts.length; j = i++) {
      var a = pts[i], b = pts[j];
      if ((a.z > v) !== (b.z > v) && u < (b.x - a.x) * (v - a.z) / (b.z - a.z) + a.x) inside = !inside;
    }
    return inside;
  }
  function placePools(grid, cell, start, random) {
    var candidates = [], dirs = [[1, 0], [-1, 0], [0, 1], [0, -1]];
    for (var z = 1; z < grid.length - 1; z++) for (var x = 1; x < grid[z].length - 1; x++) {
      if (grid[z][x] !== 0) continue;
      dirs.forEach(function (d) {
        if (grid[z + d[1]][x + d[0]] !== 1) return;
        var p = { x: (x + 0.5 + d[0] * 0.5) * cell, z: (z + 0.5 + d[1] * 0.5) * cell,
          nx: -d[0], nz: -d[1], width: 2.15 + random() * 0.4, maxDepth: 1.9 + random() * 0.45,
          outline: outline(random() * 10) };
        p.distance = Math.hypot(p.x - start.x, p.z - start.z);
        if (p.distance > 2.2) candidates.push(p);
      });
    }
    candidates.sort(function (a, b) { return a.distance - b.distance; });
    var chosen = [], limit = Math.min(7, 4 + Math.floor(grid.length / 8));
    // One nearby pool, then scattered sources, never a carpet of blood.
    if (candidates.length) chosen.push(candidates.shift());
    while (candidates.length && chosen.length < limit) {
      var p = candidates.splice(Math.floor(random() * candidates.length), 1)[0];
      if (chosen.every(function (q) { return Math.hypot(p.x - q.x, p.z - q.z) >= cell * 3; })) chosen.push(p);
    }
    return chosen;
  }
  function createTrail(x, z) { return { x: x, z: z, distance: 0, remaining: 0, side: -1, prints: [] }; }
  function advance(trail, x, z, pools, seconds) {
    var dx = x - trail.x, dz = z - trail.z, distance = Math.hypot(dx, dz), events = [];
    if (distance < 0.000001) return events;
    var direction = Math.atan2(dx, dz), ux = dx / distance, uz = dz / distance;
    var samples = Math.max(1, Math.ceil(distance / 0.08));
    for (var i = 1; i <= samples; i++) {
      var sx = trail.x + dx * i / samples, sz = trail.z + dz * i / samples;
      var wet = pools.some(function (p) { return contains(p, sx, sz, seconds); });
      if (wet) trail.remaining = STRENGTHS.length;
      trail.distance += distance / samples;
      if (trail.distance + 1e-8 < STRIDE) continue;
      trail.distance -= STRIDE;
      var footX = sx + uz * 0.13 * trail.side, footZ = sz - ux * 0.13 * trail.side;
      var footWet = wet || pools.some(function (p) { return contains(p, footX, footZ, seconds); });
      if (footWet) trail.remaining = STRENGTHS.length;
      var event = { wet: footWet, print: null };
      if (!footWet && trail.remaining > 0) {
        var print = { x: footX, z: footZ, direction: direction, side: trail.side,
          strength: STRENGTHS[STRENGTHS.length - trail.remaining] };
        trail.prints.push(print); event.print = print; trail.remaining--;
      }
      trail.side *= -1; events.push(event);
    }
    trail.x = x; trail.z = z;
    return events;
  }
  root.BloodRules = { STRIDE: STRIDE, outline: outline, depthAt: depthAt, contains: contains,
    placePools: placePools, createTrail: createTrail, advance: advance };
})(globalThis);