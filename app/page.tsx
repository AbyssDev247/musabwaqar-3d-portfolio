'use client';

import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { gsap } from 'gsap';

const scenes = [
  { name: 'BANKAI GATEWAY', title: 'MUSABWAQAR', sub: 'COMPUTER SCIENTIST • BUILDER • SYSTEMS THINKER', mode: 'ice' },
  { name: 'ZANPAKUTŌ ARCHIVE', title: 'WHAT I BUILD', sub: 'PROJECTS AS SYSTEMS', mode: 'blades' },
  { name: 'ESPADA INDEX', title: 'TECHNICAL UNIVERSE', sub: 'FOUNDATION → MECHANISM → IMPLEMENTATION', mode: 'void' },
  { name: 'SENBONZAKURA', title: 'EXPERIENCE', sub: 'MILESTONES IN MOTION', mode: 'petals' },
  { name: 'ZANKA NO TACHI', title: "LET'S BUILD", sub: 'CONTACT / COLLABORATION', mode: 'fire' },
  { name: 'FINAL FORM', title: 'MUSABWAQAR', sub: 'FROM HARDWARE TO INTELLIGENCE', mode: 'final' },
];

const projects = [
  ['HOSTEL MANAGEMENT SYSTEM', 'PHP • MySQL • Apache', 'A practical workflow for hostels, floors, rooms, seats, residents, billing and payments.'],
  ['KAFKA SYSTEMS', 'Docker • Apache Kafka', 'Event-driven producer / broker / consumer experiments focused on distributed systems.'],
  ['KNOWLEDGE GRAPH + RAG', 'Graph • AI • Retrieval', 'Structured knowledge, retrieval pipelines and language-model applications.'],
  ['NUTOMATE', 'Knowledge Graph • AI', 'Automation-oriented work connecting knowledge graphs with practical AI applications.'],
];

const skills = ['C', 'C++', 'Python', 'JavaScript', 'React', 'SQL', 'Docker', 'Kafka', 'Spark', 'PySpark', 'Hadoop', 'NLP', 'RAG', 'Neo4j', 'Knowledge Graphs', 'Databricks'];

const timeline = [
  ['FAST NUCES', 'BS Computer Science • Semester 7'],
  ['NUSyS LAB', 'Research / technical experience'],
  ['10DRIFT', 'Database quality assurance internship'],
  ['NUTOMATE', 'Knowledge Graph & AI applications'],
  ['NANOCODERS', 'Co-Founder & CTO'],
];

export default function Home() {
  const mount = useRef<HTMLDivElement>(null);
  const activeRef = useRef(0);
  const [active, setActive] = useState(0);
  const [menu, setMenu] = useState(false);
  const [muted, setMuted] = useState(false);

  const goTo = (next: number) => {
    const value = Math.max(0, Math.min(scenes.length - 1, next));
    activeRef.current = value;
    setActive(value);
  };

  useEffect(() => {
    if (!mount.current) return;

    const root = mount.current;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(55, innerWidth / innerHeight, 0.1, 100);
    camera.position.set(0, 0, 7.5);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setPixelRatio(Math.min(devicePixelRatio, 1.8));
    renderer.setSize(innerWidth, innerHeight);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    root.appendChild(renderer.domElement);

    const ambient = new THREE.AmbientLight(0xffffff, 0.55);
    scene.add(ambient);
    const key = new THREE.PointLight(0x9eeaff, 18, 28, 2);
    key.position.set(2, 3, 5);
    scene.add(key);

    const starCount = 1500;
    const starPositions = new Float32Array(starCount * 3);
    const starSizes = new Float32Array(starCount);
    for (let i = 0; i < starCount; i++) {
      starPositions[i * 3] = (Math.random() - 0.5) * 22;
      starPositions[i * 3 + 1] = (Math.random() - 0.5) * 14;
      starPositions[i * 3 + 2] = (Math.random() - 0.5) * 16;
      starSizes[i] = 0.02 + Math.random() * 0.055;
    }
    const starGeo = new THREE.BufferGeometry();
    starGeo.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
    starGeo.setAttribute('size', new THREE.BufferAttribute(starSizes, 1));
    const starMat = new THREE.PointsMaterial({ color: 0xd9f8ff, size: 0.035, transparent: true, opacity: 0.75, depthWrite: false });
    const stars = new THREE.Points(starGeo, starMat);
    scene.add(stars);

    const world = new THREE.Group();
    scene.add(world);
    const effectGroups: THREE.Group[] = scenes.map(() => new THREE.Group());
    effectGroups.forEach((group) => world.add(group));

    const makeRing = (radius: number, color: number, opacity: number) => {
      const geo = new THREE.TorusGeometry(radius, 0.018, 8, 96);
      const mat = new THREE.MeshBasicMaterial({ color, transparent: true, opacity });
      return new THREE.Mesh(geo, mat);
    };

    const gateway = new THREE.Group();
    gateway.add(makeRing(2.35, 0x9eeaff, 0.38));
    gateway.add(makeRing(2.9, 0xffffff, 0.12));
    gateway.rotation.x = Math.PI * 0.18;
    effectGroups[0].add(gateway);
    for (let i = 0; i < 9; i++) {
      const pillar = new THREE.Mesh(new THREE.BoxGeometry(0.06, 3.8, 0.06), new THREE.MeshBasicMaterial({ color: 0xbfefff, transparent: true, opacity: 0.16 }));
      const angle = (i / 9) * Math.PI * 2;
      pillar.position.set(Math.cos(angle) * 3.3, Math.sin(angle) * 2.1, -1.2);
      pillar.rotation.z = angle + Math.PI / 2;
      effectGroups[0].add(pillar);
    }

    for (let i = 0; i < 28; i++) {
      const blade = new THREE.Mesh(new THREE.BoxGeometry(0.035, 1.8 + Math.random() * 1.2, 0.035), new THREE.MeshBasicMaterial({ color: i % 3 === 0 ? 0xffffff : 0xa58cff, transparent: true, opacity: 0.28 }));
      blade.position.set((Math.random() - 0.5) * 9, (Math.random() - 0.5) * 6, (Math.random() - 0.5) * 4);
      blade.rotation.z = (Math.random() - 0.5) * 1.2;
      effectGroups[1].add(blade);
    }

    const voidRing = makeRing(2.1, 0x8895ff, 0.2);
    const voidRing2 = makeRing(3.4, 0x6c7cff, 0.09);
    effectGroups[2].add(voidRing, voidRing2);
    for (let i = 0; i < 10; i++) {
      const orb = new THREE.Mesh(new THREE.IcosahedronGeometry(0.15 + Math.random() * 0.22, 1), new THREE.MeshBasicMaterial({ color: 0xaeb8ff, wireframe: true, transparent: true, opacity: 0.28 }));
      orb.position.set((Math.random() - 0.5) * 8, (Math.random() - 0.5) * 5, (Math.random() - 0.5) * 4);
      effectGroups[2].add(orb);
    }

    for (let i = 0; i < 180; i++) {
      const petal = new THREE.Mesh(new THREE.PlaneGeometry(0.045, 0.09), new THREE.MeshBasicMaterial({ color: i % 2 ? 0xffb8e7 : 0xffd9f2, side: THREE.DoubleSide, transparent: true, opacity: 0.62 }));
      petal.position.set((Math.random() - 0.5) * 12, (Math.random() - 0.5) * 9, (Math.random() - 0.5) * 7);
      petal.rotation.set(Math.random() * 3, Math.random() * 3, Math.random() * 3);
      effectGroups[3].add(petal);
    }

    const fireCore = new THREE.Mesh(new THREE.SphereGeometry(1.45, 32, 32), new THREE.MeshBasicMaterial({ color: 0xff573d, transparent: true, opacity: 0.16 }));
    effectGroups[4].add(fireCore);
    for (let i = 0; i < 70; i++) {
      const ember = new THREE.Mesh(new THREE.SphereGeometry(0.025 + Math.random() * 0.055, 8, 8), new THREE.MeshBasicMaterial({ color: i % 3 ? 0xffaa54 : 0xff5c3d, transparent: true, opacity: 0.75 }));
      ember.position.set((Math.random() - 0.5) * 7, -2 + Math.random() * 6, (Math.random() - 0.5) * 5);
      effectGroups[4].add(ember);
    }

    const finalRing = makeRing(2.7, 0xffffff, 0.18);
    const finalRing2 = makeRing(4.1, 0x8edfff, 0.08);
    effectGroups[5].add(finalRing, finalRing2);

    const mouse = { x: 0, y: 0 };
    const onPointerMove = (event: PointerEvent) => {
      mouse.x = event.clientX / innerWidth - 0.5;
      mouse.y = event.clientY / innerHeight - 0.5;
    };
    addEventListener('pointermove', onPointerMove);

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowDown' || event.key === 'PageDown') goTo(activeRef.current + 1);
      if (event.key === 'ArrowUp' || event.key === 'PageUp') goTo(activeRef.current - 1);
      if (event.key === 'Escape') setMenu(false);
    };
    addEventListener('keydown', onKeyDown);

    const onWheel = (event: WheelEvent) => {
      if (Math.abs(event.deltaY) < 8) return;
      goTo(activeRef.current + (event.deltaY > 0 ? 1 : -1));
    };
    addEventListener('wheel', onWheel, { passive: true });

    const clock = new THREE.Clock();
    let raf = 0;
    const animate = () => {
      const t = clock.getElapsedTime();
      const current = activeRef.current;
      stars.rotation.y = t * 0.012 + mouse.x * 0.08;
      stars.rotation.x = Math.sin(t * 0.12) * 0.025 + mouse.y * 0.04;
      world.rotation.y += (mouse.x * 0.08 - world.rotation.y) * 0.025;
      world.rotation.x += (-mouse.y * 0.05 - world.rotation.x) * 0.025;
      key.position.x = 2 + mouse.x * 4;
      key.position.y = 3 - mouse.y * 2;

      effectGroups.forEach((group, index) => {
        const target = index === current ? 1 : 0;
        group.visible = target > 0;
        group.scale.x += ((0.96 + target * 0.08) - group.scale.x) * 0.035;
        group.scale.y += ((0.96 + target * 0.08) - group.scale.y) * 0.035;
        group.scale.z += ((0.96 + target * 0.08) - group.scale.z) * 0.035;
        group.rotation.y += (index === 3 ? 0.0008 : 0.002) * target;
      });

      gateway.rotation.z = Math.sin(t * 0.3) * 0.08;
      voidRing.rotation.x = t * 0.12;
      voidRing2.rotation.x = -t * 0.08;
      fireCore.scale.setScalar(1 + Math.sin(t * 3.5) * 0.08);
      finalRing.rotation.x = t * 0.15;
      finalRing2.rotation.y = -t * 0.1;

      effectGroups[3].children.forEach((petal, i) => {
        petal.position.y -= 0.003 + (i % 4) * 0.0008;
        petal.rotation.z += 0.004;
        if (petal.position.y < -5) petal.position.y = 5;
      });
      effectGroups[4].children.forEach((ember, i) => {
        if (i === 0) return;
        ember.position.y += 0.004 + (i % 5) * 0.0008;
        ember.position.x += Math.sin(t + i) * 0.0007;
        if (ember.position.y > 4) ember.position.y = -2;
      });

      renderer.render(scene, camera);
      raf = requestAnimationFrame(animate);
    };
    animate();

    const resize = () => {
      camera.aspect = innerWidth / innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(innerWidth, innerHeight);
    };
    addEventListener('resize', resize);

    return () => {
      cancelAnimationFrame(raf);
      removeEventListener('resize', resize);
      removeEventListener('pointermove', onPointerMove);
      removeEventListener('keydown', onKeyDown);
      removeEventListener('wheel', onWheel);
      renderer.dispose();
      starGeo.dispose();
      starMat.dispose();
      root.removeChild(renderer.domElement);
    };
  }, []);

  useEffect(() => {
    gsap.fromTo('.scene-content', { opacity: 0, y: active % 2 ? 24 : -24, scale: 0.985 }, { duration: 0.72, opacity: 1, y: 0, scale: 1, ease: 'power3.out' });
  }, [active]);

  const current = scenes[active];

  return (
    <main className={`portfolio ${current.mode}`}>
      <div ref={mount} className="webgl" />
      <div className="scanlines" />
      <div className="grain" />
      <div className="vignette" />

      <header>
        <button className="brand" onClick={() => goTo(0)} aria-label="Return to beginning">MW<span>.</span></button>
        <div className="top-center">SYSTEMS IN MOTION <span>•</span> 2026</div>
        <div className="top-actions">
          <button className="sound" onClick={() => setMuted(!muted)}>{muted ? 'SOUND OFF' : 'SOUND ON'}</button>
          <div className="progress">0{active + 1} / 06</div>
          <button className="menu" onClick={() => setMenu(!menu)}>MENU <i>{menu ? '×' : '☰'}</i></button>
        </div>
      </header>

      <div className="status-line"><span>REIATSU // {String((active + 1) * 17).padStart(3, '0')}</span><span>ONLINE</span></div>
      <div className="vertical-label">MUSABWAQAR // SYSTEMS THINKER</div>

      {menu && (
        <nav className="overlay-menu">
          <div className="menu-title">SOUL SOCIETY // NAVIGATION</div>
          {scenes.map((item, index) => (
            <button key={item.name} className={index === active ? 'active' : ''} onClick={() => { goTo(index); setMenu(false); }}>
              <span>{String(index + 1).padStart(2, '0')}</span>{item.name}<small>{item.sub}</small>
            </button>
          ))}
        </nav>
      )}

      <section className="scene-content" aria-live="polite">
        <p className="eyebrow"><span>◈</span> {current.name} <span>◈</span></p>
        <h1>{current.title}</h1>
        <p className="subtitle">{current.sub}</p>

        {active === 0 && (
          <div className="hero-copy">
            <span className="micro">INITIALIZE / PERSONAL FILE 001</span>
            <strong>BANKAI</strong>
            <p>I build from the foundation upward — hardware, operating systems, networks, data, distributed systems and AI.</p>
            <div className="hero-actions">
              <button onClick={() => goTo(1)}>ENTER ARCHIVE <span>↓</span></button>
              <a href="https://github.com/AbyssDev247" target="_blank" rel="noreferrer">OPEN GITHUB ↗</a>
            </div>
          </div>
        )}

        {active === 1 && (
          <div className="cards">
            {projects.map(([title, stack, description], index) => (
              <article key={title}>
                <div className="card-index">0{index + 1}</div>
                <small>{stack}</small>
                <h3>{title}</h3>
                <p>{description}</p>
                <span className="release">SYSTEM FILE / {String(index + 1).padStart(2, '0')}</span>
              </article>
            ))}
          </div>
        )}

        {active === 2 && (
          <div className="technical-panel">
            <div className="stack-path">HARDWARE <span>→</span> OS <span>→</span> NETWORKS <span>→</span> DATA <span>→</span> DISTRIBUTED <span>→</span> AI</div>
            <div className="skill-cloud">{skills.map((skill, index) => <span key={skill} style={{ '--delay': `${index * 0.04}s` } as React.CSSProperties}>{skill}</span>)}</div>
            <p className="philosophy">FOUNDATION → MECHANISM → IMPLEMENTATION → OPTIMIZATION → REAL-WORLD USAGE</p>
          </div>
        )}

        {active === 3 && (
          <div className="timeline">
            {timeline.map(([label, detail], index) => (
              <div key={label} className="timeline-item">
                <span className="timeline-number">0{index + 1}</span>
                <b>{label}</b>
                <span>{detail}</span>
              </div>
            ))}
          </div>
        )}

        {active === 4 && (
          <div className="contact">
            <p>Have a system worth building?</p>
            <h2>LET'S CREATE<br />SOMETHING THAT MOVES.</h2>
            <div className="contact-actions">
              <a href="https://github.com/AbyssDev247" target="_blank" rel="noreferrer">GITHUB ↗</a>
              <button onClick={() => navigator.clipboard?.writeText('Musabwaqar — Computer Scientist / Builder')}>COPY IDENTITY</button>
            </div>
          </div>
        )}

        {active === 5 && (
          <div className="final">
            <p>COMPUTER SCIENTIST • BUILDER • SYSTEMS THINKER</p>
            <div className="final-line">FROM THE MACHINE UNDERNEATH <span>→</span> THE INTELLIGENCE ON TOP</div>
            <div className="final-links"><a href="https://github.com/AbyssDev247" target="_blank" rel="noreferrer">GITHUB</a><button onClick={() => goTo(0)}>RESTART EXPERIENCE ↻</button></div>
          </div>
        )}
      </section>

      <div className="side-readout"><span>01</span><div /><span>06</span></div>
      <div className="scroll">SCROLL <span>↓</span></div>
      <div className="scene-dots">{scenes.map((_, index) => <button aria-label={`Scene ${index + 1}`} className={index === active ? 'on' : ''} key={index} onClick={() => goTo(index)} />)}</div>
      <footer><span>© 2026 MUSABWAQAR</span><span>PORTFOLIO // 001</span><span>BUILD WITH THREE.JS</span></footer>
    </main>
  );
}
