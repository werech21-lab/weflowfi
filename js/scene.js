(function () {
  const canvas = document.getElementById("neural-canvas");
  if (!canvas || !window.THREE) return;

  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.setClearColor(0x000000, 0);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(55, 1, 0.1, 100);
  camera.position.z = 28;

  const COUNT = reduce ? 80 : 220;
  const positions = new Float32Array(COUNT * 3);
  const velocities = new Float32Array(COUNT * 3);
  for (let i = 0; i < COUNT; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 48;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 28;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 24;
    velocities[i * 3] = (Math.random() - 0.5) * 0.01;
    velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.01;
    velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.008;
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  const material = new THREE.PointsMaterial({
    color: 0x22d3ee,
    size: 0.08,
    transparent: true,
    opacity: 0.85,
    depthWrite: false,
    blending: THREE.AdditiveBlending
  });
  const points = new THREE.Points(geometry, material);
  scene.add(points);

  const linePositions = new Float32Array(COUNT * COUNT * 6);
  const lineGeom = new THREE.BufferGeometry();
  lineGeom.setAttribute("position", new THREE.BufferAttribute(linePositions, 3));
  const lineMat = new THREE.LineBasicMaterial({
    color: 0x6366f1,
    transparent: true,
    opacity: 0.12,
    blending: THREE.AdditiveBlending,
    depthWrite: false
  });
  const lines = new THREE.LineSegments(lineGeom, lineMat);
  scene.add(lines);

  const mouse = { x: 0, y: 0, tx: 0, ty: 0 };
  window.addEventListener(
    "pointermove",
    (e) => {
      mouse.tx = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.ty = -(e.clientY / window.innerHeight) * 2 + 1;
    },
    { passive: true }
  );

  function resize() {
    const w = window.innerWidth;
    const h = window.innerHeight;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  }
  window.addEventListener("resize", resize);
  resize();

  const LINK_DIST = 4.8;
  function tick() {
    mouse.x += (mouse.tx - mouse.x) * 0.04;
    mouse.y += (mouse.ty - mouse.y) * 0.04;
    camera.position.x += (mouse.x * 3 - camera.position.x) * 0.03;
    camera.position.y += (mouse.y * 2 - camera.position.y) * 0.03;
    camera.lookAt(0, 0, 0);

    const pos = geometry.attributes.position.array;
    for (let i = 0; i < COUNT; i++) {
      pos[i * 3] += velocities[i * 3];
      pos[i * 3 + 1] += velocities[i * 3 + 1];
      pos[i * 3 + 2] += velocities[i * 3 + 2];
      if (Math.abs(pos[i * 3]) > 26) velocities[i * 3] *= -1;
      if (Math.abs(pos[i * 3 + 1]) > 16) velocities[i * 3 + 1] *= -1;
      if (Math.abs(pos[i * 3 + 2]) > 14) velocities[i * 3 + 2] *= -1;
    }
    geometry.attributes.position.needsUpdate = true;

    let ptr = 0;
    for (let i = 0; i < COUNT; i++) {
      for (let j = i + 1; j < COUNT; j++) {
        const dx = pos[i * 3] - pos[j * 3];
        const dy = pos[i * 3 + 1] - pos[j * 3 + 1];
        const dz = pos[i * 3 + 2] - pos[j * 3 + 2];
        const d2 = dx * dx + dy * dy + dz * dz;
        if (d2 < LINK_DIST * LINK_DIST) {
          linePositions[ptr++] = pos[i * 3];
          linePositions[ptr++] = pos[i * 3 + 1];
          linePositions[ptr++] = pos[i * 3 + 2];
          linePositions[ptr++] = pos[j * 3];
          linePositions[ptr++] = pos[j * 3 + 1];
          linePositions[ptr++] = pos[j * 3 + 2];
        }
      }
    }
    lineGeom.setDrawRange(0, ptr / 3);
    lineGeom.attributes.position.needsUpdate = true;

    points.rotation.y += 0.0008;
    renderer.render(scene, camera);
    requestAnimationFrame(tick);
  }
  tick();
})();
