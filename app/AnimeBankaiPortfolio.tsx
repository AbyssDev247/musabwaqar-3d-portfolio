'use client';

import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { BANKAI_SCENES, EXPERIENCE, PROFILE, PROJECTS, TECH, type BankaiScene } from './data/bankaiScenes';

const ids = BANKAI_SCENES.map((_, i) => String(i).padStart(2, '0'));

function clamp(n: number, a = 0, b = 1) { return Math.min(b, Math.max(a, n)); }

function makeVisual(scene: BankaiScene, quality: number) {
  const group = new THREE.Group();
  const material = new THREE.MeshStandardMaterial({ color: scene.accent, roughness: 0.3, metalness: 0.58, emissive: scene.accent, emissiveIntensity: 0.12 });
  const glow = new THREE.MeshBasicMaterial({ color: scene.accent, transparent: true, opacity: 0.48, blending: THREE.AdditiveBlending, depthWrite: false, side: THREE.DoubleSide });
  const outline = (mesh: THREE.Mesh) => mesh.add(new THREE.LineSegments(new THREE.EdgesGeometry(mesh.geometry, 18), new THREE.LineBasicMaterial({ color: 0x020304, transparent: true, opacity: 0.78 })));

  const halo = new THREE.Mesh(new THREE.TorusGeometry(2.1, 0.035, 10, 96), glow);
  halo.rotation.x = Math.PI / 2;
  group.add(halo);

  const core = new THREE.Mesh(new THREE.IcosahedronGeometry(1.05, 2), material);
  core.scale.set(0.9, 1.25, 0.9);
  outline(core);
  group.add(core);

  const blade = new THREE.Mesh(new THREE.BoxGeometry(0.16, 4.8, 0.07), material);
  blade.position.set(0.05, -0.25, 0.2);
  blade.rotation.z = -0.08;
  blade.scale.setScalar(0.82);
  outline(blade);
  group.add(blade);

  const particleCount = Math.max(70, Math.floor(quality * (scene.mode === 'petals' ? 520 : 230)));
  const positions = new Float32Array(particleCount * 3);
  const velocities = new Float32Array(particleCount * 3);
  for (let i = 0; i < particleCount; i++) {
    const a = Math.random() * Math.PI * 2;
    const r = Math.pow(Math.random(), 0.55) * (2.2 + Math.random() * 3.8);
    positions[i * 3] = Math.cos(a) * r;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 6.5;
    positions[i * 3 + 2] = Math.sin(a) * r - 1.5;
    velocities[i * 3] = (Math.random() - 0.5) * 0.004;
    velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.006;
    velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.004;
  }
  const particleGeometry = new THREE.BufferGeometry();
  particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  particleGeometry.userData.velocities = velocities;
  const points = new THREE.Points(particleGeometry, new THREE.PointsMaterial({ color: scene.accent, size: scene.mode === 'petals' ? 0.032 : 0.024, transparent: true, opacity: 0.72, depthWrite: false, blending: THREE.AdditiveBlending }));
  group.add(points);

  if (scene.mode === 'giant') {
    const body = new THREE.Mesh(new THREE.BoxGeometry(2.2, 4.6, 0.9), material);
    body.position.y = 0.3; body.scale.set(1, 1.5, 1); outline(body); group.add(body);
    for (const x of [-1.55, 1.55]) { const arm = new THREE.Mesh(new THREE.BoxGeometry(0.55, 4.4, 0.55), material); arm.position.set(x, 0.25, 0); arm.rotation.z = x < 0 ? -0.18 : 0.18; group.add(arm); }
  }
  if (scene.mode === 'spear') { const spear = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.035, 12, 12), glow); spear.rotation.z = Math.PI / 2; spear.position.z = -0.4; group.add(spear); }
  if (scene.mode === 'fire' || scene.mode === 'berserk') { for (let i = 0; i < 5; i++) { const shard = new THREE.Mesh(new THREE.ConeGeometry(0.08 + i * 0.02, 2.8 + i * 0.45, 6), glow); shard.position.set((i - 2) * 0.6, 1 + i * 0.1, -0.2); shard.rotation.z = (i - 2) * 0.12; group.add(shard); } }
  if (scene.mode === 'mirror') { const mirror = new THREE.Mesh(new THREE.OctahedronGeometry(1.65, 1), glow); mirror.scale.set(1, 0.08, 1); group.add(mirror); }
  if (scene.mode === 'ice' || scene.mode === 'white') { for (let i = 0; i < 7; i++) { const shard = new THREE.Mesh(new THREE.ConeGeometry(0.05, 1.2 + Math.random() * 1.5, 5), glow); shard.position.set((Math.random() - 0.5) * 4, Math.random() * 3 - 1, (Math.random() - 0.5) * 2); shard.rotation.z = Math.random(); group.add(shard); } }
  if (scene.mode === 'repair' || scene.mode === 'lab') { for (let i = 0; i < 8; i++) { const joint = new THREE.Mesh(new THREE.TorusGeometry(0.28 + i * 0.03, 0.035, 8, 32), material); joint.position.set((Math.random() - 0.5) * 3, (Math.random() - 0.5) * 3, Math.random() * 1.5); joint.rotation.x = Math.random(); group.add(joint); } }
  if (scene.mode === 'lightning') { for (let i = 0; i < 6; i++) { const bolt = new THREE.Mesh(new THREE.BoxGeometry(0.04, 2.8, 0.04), glow); bolt.position.set((i - 2.5) * 0.55, 1.2, 0); bolt.rotation.z = (Math.random() - 0.5) * 0.55; group.add(bolt); } }
  if (scene.mode === 'portal' || scene.mode === 'final') { const outer = new THREE.Mesh(new THREE.TorusGeometry(2.9, 0.08, 12, 128), glow); outer.rotation.x = Math.PI / 2; group.add(outer); const inner = new THREE.Mesh(new THREE.CircleGeometry(2.65, 64), new THREE.MeshBasicMaterial({ color: 0x03050a, transparent: true, opacity: 0.78, side: THREE.DoubleSide })); inner.rotation.x = Math.PI / 2; group.add(inner); }

  group.userData = { particles: points, baseAccent: scene.accent };
  return group;
}

export default function AnimeBankaiPortfolio() {
  const mount = useRef<HTMLDivElement>(null);
  const targetScroll = useRef(0);
  const targetMouse = useRef(new THREE.Vector2());
  const smoothMouse = useRef(new THREE.Vector2());
  const activeRef = useRef(0);
  const [active, setActive] = useState(0);
  const [menu, setMenu] = useState(false);
  const [selected, setSelected] = useState<{ scene: BankaiScene; project?: string } | null>(null);
  const [impact, setImpact] = useState(false);
  const current = BANKAI_SCENES[active];
  const reducedMotion = useRef(false);

  const jump = (index: number) => {
    const max = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
    window.scrollTo({ top: max * (index / (BANKAI_SCENES.length - 1)), behavior: reducedMotion.current ? 'auto' : 'smooth' });
    setMenu(false);
  };

  useEffect(() => {
    reducedMotion.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') { setSelected(null); setMenu(false); }
      if (event.key === 'ArrowDown') { event.preventDefault(); jump(Math.min(activeRef.current + 1, BANKAI_SCENES.length - 1)); }
      if (event.key === 'ArrowUp') { event.preventDefault(); jump(Math.max(activeRef.current - 1, 0)); }
      if (event.key.toLowerCase() === 'r') { event.preventDefault(); jump(0); }
      if (event.key === 'Enter' || event.key === ' ') { if (!selected && !menu) jump(Math.min(activeRef.current + 1, BANKAI_SCENES.length - 1)); }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [selected, menu]);

  useEffect(() => {
    if (!mount.current) return;
    const root = mount.current;
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(current.accent, 0.018);
    const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 140);
    camera.position.set(0, 0.1, 9.5);
    const renderer = new THREE.WebGLRenderer({ antialias: !reducedMotion.current, alpha: true, powerPreference: 'high-performance' });
    const mobile = window.innerWidth < 700;
    const quality = mobile ? 0.52 : window.innerWidth < 1200 ? 0.78 : 1;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, mobile ? 1.15 : 1.65));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    root.appendChild(renderer.domElement);

    const resize = () => { const w = root.clientWidth || innerWidth; const h = root.clientHeight || innerHeight; camera.aspect = w / h; camera.updateProjectionMatrix(); renderer.setSize(w, h, false); };
    resize(); window.addEventListener('resize', resize);
    const ambient = new THREE.HemisphereLight(0xa9c8ff, 0x030406, 1.15); scene.add(ambient);
    const key = new THREE.DirectionalLight(0xffffff, 1.8); key.position.set(4, 7, 6); scene.add(key);
    const accentLight = new THREE.PointLight(current.accent, 8, 18); accentLight.position.set(2, 1, 4); scene.add(accentLight);
    const world = new THREE.Group(); scene.add(world);

    // Keep this WebGL world dedicated to the scroll-driven Bankai forms.
    // The old floor/city/star background has been removed; BankaiInstancedBackground owns the background layer.
    const visuals = BANKAI_SCENES.map((bankai) => { const visual = makeVisual(bankai, quality); world.add(visual); return visual; });

    const onScroll = () => {
      const max = Math.max(1, document.documentElement.scrollHeight - innerHeight);
      targetScroll.current = clamp(scrollY / max) * (BANKAI_SCENES.length - 1);
      const next = Math.min(BANKAI_SCENES.length - 1, Math.round(targetScroll.current));
      if (next !== activeRef.current) { activeRef.current = next; setActive(next); setImpact(true); window.setTimeout(() => setImpact(false), 120); }
    };
    const onPointer = (event: PointerEvent) => { targetMouse.current.x = (event.clientX / innerWidth) * 2 - 1; targetMouse.current.y = -(event.clientY / innerHeight) * 2 + 1; };
    window.addEventListener('scroll', onScroll, { passive: true }); window.addEventListener('pointermove', onPointer, { passive: true }); onScroll();

    let raf = 0;
    const tick = () => {
      raf = requestAnimationFrame(tick);
      const t = targetScroll.current;
      smoothMouse.current.lerp(targetMouse.current, reducedMotion.current ? 0.2 : 0.055);
      const sceneIndex = Math.round(t);
      const bankai = BANKAI_SCENES[sceneIndex];
      const local = t - sceneIndex;
      scene.fog = new THREE.FogExp2(bankai.accent, mobile ? 0.024 : 0.017);
      accentLight.color.setHex(bankai.accent);
      accentLight.position.x += (smoothMouse.current.x * 4 - accentLight.position.x) * 0.04;
      accentLight.position.y += (1 + smoothMouse.current.y * 3 - accentLight.position.y) * 0.04;
      camera.position.x += (smoothMouse.current.x * 0.7 + local * 0.75 - camera.position.x) * 0.045;
      camera.position.y += (-smoothMouse.current.y * 0.35 + Math.sin(t * 0.8) * 0.08 - camera.position.y) * 0.045;
      camera.position.z += (9.5 - Math.abs(local) * 0.9 - camera.position.z) * 0.045;
      world.rotation.y += (smoothMouse.current.x * 0.055 - world.rotation.y) * 0.035;
      world.rotation.x += (-smoothMouse.current.y * 0.025 - world.rotation.x) * 0.035;

      visuals.forEach((visual, i) => {
        const d = i - t;
        const proximity = clamp(1 - Math.abs(d) / 1.55);
        visual.visible = Math.abs(d) < 1.65;
        visual.position.x += (d * 2.8 - visual.position.x) * 0.055;
        visual.position.y += (Math.sin(d * 1.7) * 0.35 - visual.position.y) * 0.055;
        visual.position.z += ((1 - proximity) * -1.5 - visual.position.z) * 0.055;
        visual.scale.setScalar(0.58 + proximity * 0.95);
        visual.rotation.y += ((d * 0.22) + smoothMouse.current.x * 0.18 - visual.rotation.y) * 0.05;
        visual.rotation.z += ((bankai.mode === 'invert' ? local * 0.6 : 0) - visual.rotation.z) * 0.04;
        const points = visual.userData.particles as THREE.Points;
        points.rotation.y += 0.0015 + proximity * 0.0025;
        const geo = points.geometry as THREE.BufferGeometry;
        const pos = geo.attributes.position as THREE.BufferAttribute;
        const vel = geo.userData.velocities as Float32Array;
        if (!reducedMotion.current) {
          for (let p = 0; p < pos.count; p++) {
            const base = p * 3;
            pos.array[base] += vel[base]; pos.array[base + 1] += vel[base + 1]; pos.array[base + 2] += vel[base + 2];
            if (pos.array[base + 1] > 3.5) pos.array[base + 1] = -3.5;
            if (pos.array[base + 1] < -3.5) pos.array[base + 1] = 3.5;
          }
          pos.needsUpdate = true;
        }
      });
      renderer.render(scene, camera);
    };
    tick();
    return () => {
      cancelAnimationFrame(raf); window.removeEventListener('resize', resize); window.removeEventListener('scroll', onScroll); window.removeEventListener('pointermove', onPointer);
      renderer.dispose();
      scene.traverse((object) => { const mesh = object as THREE.Mesh; if (mesh.geometry) mesh.geometry.dispose(); const material = mesh.material; if (Array.isArray(material)) material.forEach((m) => m.dispose()); else if (material) material.dispose(); });
      if (root.contains(renderer.domElement)) root.removeChild(renderer.domElement);
    };
  }, []);

  const openProject = (scene: BankaiScene, project?: string) => setSelected({ scene, project });
  const projectForScene = (scene: BankaiScene) => PROJECTS.find((p) => scene.projects.some((tag) => p.name.toLowerCase().includes(tag.toLowerCase().split(' ')[0]))) || PROJECTS[0];

  return (
    <main className="portfolio" style={{ '--scene-accent': current.hex } as React.CSSProperties}>
      <div className="webgl-stage" ref={mount} aria-hidden="true" />
      <div className="anime-speedlines" aria-hidden="true" /><div className="anime-ink" aria-hidden="true" /><div className="vignette" aria-hidden="true" /><div className="scanlines" aria-hidden="true" />
      {impact && !reducedMotion.current && <div className="impact-frame" aria-hidden="true" />}
      <header className="topbar">
        <a className="brand" href="#top" aria-label="Musab Waqar home">MUSAB<span>.</span>WAQAR</a>
        <div className="system-label">BANKAI ARCHITECT <b>23 FORMS</b> · SCROLL-DRIVEN 3D</div>
        <button className="menu-button" onClick={() => setMenu(true)} aria-label="Open Bankai archive">ARCHIVE <span>☰</span></button>
      </header>
      <aside className="rail" aria-label="Portfolio progress"><span>00</span><div><i style={{ height: `${((active + 1) / BANKAI_SCENES.length) * 100}%` }} /></div><span>22</span></aside>
      <div className="chapter-count" aria-live="polite">{ids[active]} / 22</div>
      <div className="progress-line" aria-hidden="true"><i style={{ width: `${(active / (BANKAI_SCENES.length - 1)) * 100}%` }} /></div>

      <div id="top" className="scroll-space">
        {BANKAI_SCENES.map((s, i) => {
          const linked = projectForScene(s);
          return (
            <section className="bankai-section" key={s.name} aria-labelledby={`bankai-${i}`}>
              <div className="section-inner">
                <div className="scene-copy">
                  <div className="eyebrow">BANKAI ARCHIVE // {ids[i]} · {s.theme}</div>
                  <h1 id={`bankai-${i}`}>{s.name}</h1>
                  <div className="user-line">{s.user}</div>
                  <p>{s.purpose}</p>
                  <div className="command"><b>RELEASE</b>{s.command}</div>
                  <div className="ability"><b>PORTFOLIO TRANSLATION</b>{s.ability}</div>
                  <div className="actions">
                    <button className="primary" onClick={() => openProject(s, linked.name)}>OPEN PROJECT CORE ↗</button>
                    <button className="ghost" onClick={() => jump(Math.min(i + 1, BANKAI_SCENES.length - 1))}>NEXT BANKAI ↓</button>
                  </div>
                </div>
                <div className="project-panel">
                  <div className="panel-kicker">ACTIVE FORM / PROFESSIONAL CAPABILITY</div>
                  <h2>{s.theme}</h2>
                  {s.projects.map((p, j) => <button className="project-row" key={p} onClick={() => openProject(s, p)}><span>{String(j + 1).padStart(2, '0')}</span><strong>{p}</strong><em>VIEW</em></button>)}
                  <div className="tech-strip">{TECH.slice((i * 2) % TECH.length, (i * 2) % TECH.length + 6).map((tech) => <span key={tech}>{tech}</span>)}</div>
                  {i === 0 && <div className="tech-strip"><span>{PROFILE.role}</span><span>{PROFILE.graduation}</span></div>}
                  {i === 22 && <div className="tech-strip">{EXPERIENCE.slice(0, 3).map((item) => <span key={item}>{item}</span>)}</div>}
                </div>
                <div className="scroll-cue">SCROLL TO AWAKEN <span>↓</span></div>
              </div>
            </section>
          );
        })}
        <section className="about-section" aria-labelledby="about-musab">
          <div>
            <div className="eyebrow">FINAL PORTAL // NEXT ARC</div>
            <h2 id="about-musab">{PROFILE.name}</h2>
            <p>{PROFILE.role}<br />{PROFILE.education}<br />{PROFILE.graduation}</p>
            <p className="motto">“{PROFILE.motto}”</p>
            <p>Backend Engineer · AI Developer · Systems Researcher</p>
            <div className="final-links">
              <a href="https://github.com/Musab-Waqar" target="_blank" rel="noreferrer">GITHUB</a>
              <a href="https://musab-waqar-portfolio.vercel.app/" target="_blank" rel="noreferrer">OLDER PORTFOLIO</a>
              <a href="https://www.linkedin.com/in/musab-waqar" target="_blank" rel="noreferrer">LINKEDIN</a>
              <a href="mailto:musab@fast.edu">EMAIL</a>
              <button onClick={() => openProject(BANKAI_SCENES[22])}>PROJECT ARCHIVE</button>
            </div>
          </div>
        </section>
      </div>

      {menu && <div className="menu-overlay" role="dialog" aria-modal="true" aria-label="Bankai archive">
        <div className="menu-head"><span>BANKAI ARCHIVE / SELECT FORM</span><button onClick={() => setMenu(false)} aria-label="Close archive">CLOSE ×</button></div>
        <div className="menu-grid">{BANKAI_SCENES.map((s, i) => <button key={s.name} className={i === active ? 'selected' : ''} onClick={() => jump(i)}><small>{ids[i]}</small><b>{s.name}</b><span>{s.theme}</span></button>)}</div>
      </div>}

      {selected && <div className="modal-backdrop" onClick={() => setSelected(null)}>
        <article className="archive-modal" onClick={(event) => event.stopPropagation()} role="dialog" aria-modal="true" aria-labelledby="project-title">
          <button className="modal-close" onClick={() => setSelected(null)} aria-label="Close project">×</button>
          <div className="eyebrow">PROJECT CORE / BANKAI {String(selected.scene.id).padStart(2, '0')}</div>
          <h2 id="project-title">{selected.project || selected.scene.name}</h2>
          <p>{selected.scene.purpose}</p>
          <p>{selected.scene.ability}</p>
          <div className="modal-tags">{selected.scene.projects.map((tag) => <span key={tag}>{tag}</span>)}</div>
          {(() => { const p = PROJECTS.find((item) => item.name === selected.project); return p ? <><p><strong>{p.status}</strong> · {p.description}</p><div className="modal-tags">{p.stack.map((item) => <span key={item}>{item}</span>)}</div><div className="modal-links"><a href={p.url} target="_blank" rel="noreferrer">OPEN REPOSITORY ↗</a></div></> : <div className="modal-links"><a href="https://github.com/Musab-Waqar" target="_blank" rel="noreferrer">EXPLORE GITHUB ↗</a></div>; })()}
        </article>
      </div>}
    </main>
  );
}
