'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import * as THREE from 'three';
import { gsap } from 'gsap';

type BankaiScene = {
  name: string;
  user: string;
  command: string;
  title: string;
  purpose: string;
  ability: string;
  theme: string;
  accent: number;
  projects: string[];
  mode: string;
};

const scenes: BankaiScene[] = [
  { name: 'TENSA ZANGETSU', user: 'ICHIGO KUROSAKI', command: 'BANKAI: TENSA ZANGETSU', title: 'SPEED & POWER', purpose: 'Fast systems. Focused execution. High-performance engineering.', ability: 'Compressed reiatsu becomes velocity, durability and destructive output.', theme: 'black / orange / white', accent: 0xff6b00, projects: ['Real-time systems', 'WebGL performance engine', 'Lightning-fast API work'], mode: 'tensa' },
  { name: 'TRUE BANKAI', user: 'ICHIGO KUROSAKI', command: 'TRUE BANKAI // HYBRID SOUL', title: 'HYBRID INTELLIGENCE', purpose: 'Full-stack systems that connect AI, backend infrastructure and interfaces.', ability: 'Black and white power merge into one adaptive architecture.', theme: 'black / white / violet', accent: 0xb8a5ff, projects: ['AI + backend integration', 'RAG applications', 'Distributed LLM experiments'], mode: 'hybrid' },
  { name: 'ZANKA NO TACHI', user: 'GENRYŪSAI YAMAMOTO', command: 'BANKAI: ZANKA NO TACHI', title: 'LEGACY & FIRE', purpose: 'The work that survives the moment: systems, research and hard-earned lessons.', ability: 'Four directions: erase, armor, legacy and final-range impact.', theme: 'red / gold / ash', accent: 0xff4b21, projects: ['Research systems', 'Infrastructure/security work', 'Long-lived engineering lessons'], mode: 'fire' },
  { name: 'KATEN KYŌKOTSU: KARAMATSU SHINJŪ', user: 'SHUNSUI KYŌRAKU', command: 'BANKAI: KATEN KYŌKOTSU', title: 'STORIES & CASE STUDIES', purpose: 'Every project has a constraint, a conflict, a decision and an outcome.', ability: 'A four-act narrative turns technical problems into readable stories.', theme: 'navy / violet / crimson', accent: 0x8d7cff, projects: ['Technical case studies', 'Failure → lesson → redesign', 'Team and client stories'], mode: 'story' },
  { name: 'SENBONZAKURA KAGEYOSHI', user: 'BYAKUYA KUCHIKI', command: 'BANKAI: SENBONZAKURA KAGEYOSHI', title: 'PRECISION & ELEGANCE', purpose: 'Clean architecture, deliberate abstractions and measurable quality.', ability: 'Countless fragments become one precise system.', theme: 'pink / white / lilac', accent: 0xff8fd5, projects: ['Clean architecture', 'Test-focused development', 'Scalable project design'], mode: 'petals' },
  { name: 'DAIGUREN HYŌRINMARU', user: 'TŌSHIRŌ HITSUGAYA', command: 'BANKAI: DAIGUREN HYŌRINMARU', title: 'TIME & OPTIMIZATION', purpose: 'Deadlines become visible systems: scope, time, risk and delivery.', ability: 'Ice petals track the remaining window; mastery arrives when the limit is reached.', theme: 'ice blue / violet / white', accent: 0x72d9ff, projects: ['Sprint planning', 'Performance optimization', 'Learning roadmaps'], mode: 'ice' },
  { name: 'KONJIKI ASHISOGI JIZŌ', user: 'MAYURI KUROTSUCHI', command: 'BANKAI: KONJIKI ASHISOGI JIZŌ', title: 'EXPERIMENTAL TECH', purpose: 'Research, prototypes and strange ideas that become useful tools.', ability: 'A customizable counter is generated for the problem in front of it.', theme: 'gold / toxic green / purple', accent: 0xd7ff3f, projects: ['Novel graph tooling', 'Custom algorithms', 'Experimental AI frameworks'], mode: 'poison' },
  { name: 'MINAZUKI', user: 'RETSU UNOHANA', command: 'BANKAI: MINAZUKI', title: 'REPAIR & RESILIENCE', purpose: 'Infrastructure that can recover, monitor itself and keep serving.', ability: 'Damage and healing coexist in a continuous reliability loop.', theme: 'acid green / deep violet', accent: 0x76ffb1, projects: ['Disaster recovery', 'Automated backups', 'Health monitoring / self-healing'], mode: 'acid' },
  { name: 'KOKUJŌ TENGEN MYŌŌ', user: 'SAJIN KOMAMURA', command: 'BANKAI: KOKUJŌ TENGEN MYŌŌ', title: 'LARGE-SCALE SYSTEMS', purpose: 'Distributed architecture, enterprise reliability and systems that think beyond one machine.', ability: 'A colossal guardian mirrors every action at a larger scale.', theme: 'red / iron / black', accent: 0xff3030, projects: ['Distributed recovery', 'Global load balancing', 'Cross-datacenter replication'], mode: 'giant' },
  { name: 'KAMISHINI NO YARI', user: 'GIN ICHIMARU', command: 'BANKAI: KAMISHINI NO YARI', title: 'LONG-RANGE IMPACT', purpose: 'Distributed systems where a small interface can move a huge system.', ability: 'A blade stretches across distance at extreme speed.', theme: 'silver / white / cyan', accent: 0xe8f8ff, projects: ['gRPC services', 'Message queues', 'Distributed databases'], mode: 'spear' },
  { name: 'SUZUMUSHI TSUISHIKI: ENMA KŌRO', user: 'KANAME TŌSEN', command: 'BANKAI: SUZUMUSHI TSUISHIKI', title: 'SENSORY ANALYTICS', purpose: 'Remove noise until the signal is impossible to miss.', ability: 'A black field suppresses everything except the insight being examined.', theme: 'black / indigo / electric blue', accent: 0x6578ff, projects: ['Pattern recognition', 'Data mining', 'Model explainability'], mode: 'void' },
  { name: 'KINSHARA BUTŌDAN', user: 'RŌJŪRŌ “ROSE” ŌTORIBASHI', command: 'BANKAI: KINSHARA BUTŌDAN', title: 'CREATIVE DIRECTION', purpose: 'Design systems, interaction, motion and interfaces that communicate.', ability: 'Music becomes an illusion; design becomes an experience.', theme: 'gold / ribbon / midnight', accent: 0xffcf6b, projects: ['Design systems', 'Motion libraries', 'Interactive visual work'], mode: 'gold' },
  { name: 'TEKKEN TACHIKAZE', user: 'KENSEI MUGURUMA', command: 'BANKAI: TEKKEN TACHIKAZE', title: 'RAW PERFORMANCE', purpose: 'Benchmarking, profiling and ruthless removal of bottlenecks.', ability: 'Continuous contact means continuous concussive force.', theme: 'red / steel / black', accent: 0xff5a3d, projects: ['Algorithm optimization', 'Benchmark suites', 'Runtime tuning'], mode: 'force' },
  { name: 'SŌŌ ZABIMARU', user: 'RENJI ABARAI', command: 'BANKAI: SŌŌ ZABIMARU', title: 'GROWTH TRAJECTORY', purpose: 'Skills accumulate through projects, experiments, internships and mentorship.', ability: 'A skeletal serpent grows with every completed milestone.', theme: 'purple / gold / bone', accent: 0xb979ff, projects: ['Career progression', 'Mentorship', 'Learning outcomes'], mode: 'snake' },
  { name: 'RYŪMON HŌZŌKUMARU', user: 'IKKAKU MADARAME', command: 'BANKAI: RYŪMON HŌZŌKUMARU', title: 'COMPOUNDING EFFORT', purpose: 'Long projects reward patience: each iteration stores energy for the final release.', ability: 'Damage and effort fill a crest until one decisive strike is possible.', theme: 'blood red / iron / ember', accent: 0xe74343, projects: ['Long-term initiatives', 'Compounding learning', 'Year-scale goals'], mode: 'dragon' },
  { name: 'KŌŌ MONSHŌ', user: 'CHŌJIRŌ SASAKIBE', command: 'BANKAI: KŌŌ MONSHŌ', title: 'LEADERSHIP', purpose: 'Architecture is also coordination: people, responsibilities and decisions.', ability: 'Lightning creates a visible hierarchy of roles and dependencies.', theme: 'yellow / storm / black', accent: 0xffe45c, projects: ['Team projects', 'Delegation', 'Strategic planning'], mode: 'lightning' },
  { name: 'HAKKA NO TOGAME', user: 'RUKIA KUCHIKI', command: 'BANKAI: HAKKA NO TOGAME', title: 'SACRIFICE & PERFECTION', purpose: 'Some breakthroughs require removing what no longer belongs.', ability: 'Absolute cold freezes the environment and forces a deliberate reset.', theme: 'pure white / ice / pale blue', accent: 0xdffaff, projects: ['Difficult technical decisions', 'Course corrections', 'Focused simplification'], mode: 'white' },
  { name: 'KANNONBIRAKI BENIHIME ARATAME', user: 'KISUKE URAHARA', command: 'BANKAI: KANNONBIRAKI BENIHIME ARATAME', title: 'RESTRUCTURE & FIX', purpose: 'Debugging is not destruction; it is opening the system and rebuilding the right part.', ability: 'Anything in range can be split, restructured and stitched together.', theme: 'wood / crimson / gold', accent: 0xff7652, projects: ['Debugging', 'Architectural refactoring', 'System redesign'], mode: 'repair' },
  { name: 'SAKAHade', user: 'SHINJI HIRAKO', command: 'INVERSION // CAN’T FEAR YOUR OWN WORLD', title: 'PERSPECTIVE SHIFT', purpose: 'Invert assumptions. Challenge the obvious solution. Reframe the problem.', ability: 'Friend and foe are reversed; perspective becomes the weapon.', theme: 'gold / inverted violet / black', accent: 0xffc45c, projects: ['Unconventional approaches', 'Blue-sky thinking', 'Paradigm shifts'], mode: 'invert' },
  { name: 'SHINKA HAKKŌ KEN', user: 'NANAO ISE / SHUNSUI KYŌRAKU', command: 'DIVINE EIGHT MIRROR SWORD', title: 'SECURITY & PROTECTION', purpose: 'Good systems defend their users, data and invariants.', ability: 'A mirror absorbs hostile spiritual force and reflects it back.', theme: 'mirror white / cyan / silver', accent: 0xbdeeff, projects: ['Cybersecurity', 'Encryption', 'Defensive architecture'], mode: 'mirror' },
  { name: 'UNNAMED BANKAI', user: 'KENPACHI ZARAKI', command: 'BANKAI // UNTAMED', title: 'RAW IMPACT', purpose: 'The work that changes the game: ambitious, difficult and impossible to ignore.', ability: 'Pure destructive output with no concern for elegance.', theme: 'blood red / black / ember', accent: 0xff1738, projects: ['Breakthrough builds', 'Highest-impact work', 'Game-changing experiments'], mode: 'berserk' },
  { name: 'RESURRECCIÓN // FINAL PORTAL', user: 'MUSAB WAQAR', command: 'FINAL FORM: OPEN THE GATE', title: 'CONTACT & NEXT ARC', purpose: 'A portfolio is a doorway. The next system can be built together.', ability: 'The Bankai archive collapses into a single portal to the next collaboration.', theme: 'crystal / black / gold', accent: 0xffd166, projects: ['Research collaboration', 'FYP / engineering collaboration', 'International MS / research opportunities'], mode: 'final' },
];

const profile = {
  name: 'Musab Waqar',
  role: 'Co-Founder & CTO @ NanoCoders',
  university: 'BS Computer Science · FAST NUCES Peshawar',
  graduation: 'June 2027',
  motto: 'Foundation → Mechanism → Implementation → Optimization → Real-world usage',
};

const tech = ['C', 'C++', 'Python', 'JavaScript', 'TypeScript', 'React', 'Next.js', 'SQL', 'Docker', 'Apache Kafka', 'Spark', 'PySpark', 'Hadoop', 'NLP', 'RAG', 'Neo4j', 'Apache AGE', 'PostgreSQL', 'Databricks', 'Linux'];

export default function Home() {
  const mount = useRef<HTMLDivElement>(null);
  const activeRef = useRef(0);
  const [active, setActive] = useState(0);
  const [menu, setMenu] = useState(false);
  const [muted, setMuted] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);

  const goTo = (index: number) => {
    const next = Math.max(0, Math.min(scenes.length - 1, index));
    activeRef.current = next;
    setActive(next);
  };

  const current = scenes[active];
  const progress = ((active + 1) / scenes.length) * 100;

  const sceneNumbers = useMemo(() => scenes.map((_, i) => String(i + 1).padStart(2, '0')), []);

  useEffect(() => {
    if (!mount.current) return;
    const root = mount.current;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(52, innerWidth / innerHeight, 0.1, 120);
    camera.position.set(0, 0, 8.5);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setPixelRatio(Math.min(devicePixelRatio, 1.6));
    renderer.setSize(innerWidth, innerHeight);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    root.appendChild(renderer.domElement);

    scene.add(new THREE.AmbientLight(0xffffff, 0.28));
    const key = new THREE.PointLight(0xffffff, 16, 35, 2);
    key.position.set(3, 3, 6);
    scene.add(key);

    const world = new THREE.Group();
    scene.add(world);

    const starGeo = new THREE.BufferGeometry();
    const starPositions = new Float32Array(1800 * 3);
    for (let i = 0; i < 1800; i++) {
      starPositions[i * 3] = (Math.random() - 0.5) * 30;
      starPositions[i * 3 + 1] = (Math.random() - 0.5) * 18;
      starPositions[i * 3 + 2] = (Math.random() - 0.5) * 22;
    }
    starGeo.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
    const starMat = new THREE.PointsMaterial({ color: 0xeaf6ff, size: 0.025, transparent: true, opacity: 0.68, depthWrite: false });
    const stars = new THREE.Points(starGeo, starMat);
    scene.add(stars);

    const groups = scenes.map(() => new THREE.Group());
    groups.forEach((g) => { g.visible = false; world.add(g); });

    const mat = (color: number, opacity = 0.65, wire = false) => new THREE.MeshBasicMaterial({ color, transparent: true, opacity, wireframe: wire, side: THREE.DoubleSide });
    const ring = (r: number, color: number, opacity = 0.45, tube = 0.025) => new THREE.Mesh(new THREE.TorusGeometry(r, tube, 8, 96), mat(color, opacity));
    const addParticleCloud = (group: THREE.Group, count: number, color: number, spread = 6) => {
      const geo = new THREE.BufferGeometry();
      const positions = new Float32Array(count * 3);
      for (let i = 0; i < count; i++) {
        const a = Math.random() * Math.PI * 2;
        const r = Math.pow(Math.random(), 0.55) * spread;
        positions[i * 3] = Math.cos(a) * r;
        positions[i * 3 + 1] = (Math.random() - 0.5) * spread * 0.9;
        positions[i * 3 + 2] = Math.sin(a) * r;
      }
      geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      group.add(new THREE.Points(geo, new THREE.PointsMaterial({ color, size: 0.035, transparent: true, opacity: 0.58, depthWrite: false })));
    };

    scenes.forEach((s, index) => {
      const g = groups[index];
      const c = s.accent;
      g.userData.pulse = Math.random() * 4;
      g.add(ring(2.2 + (index % 3) * 0.4, c, 0.34, 0.028));
      g.add(ring(3.5 + (index % 2) * 0.3, c, 0.10, 0.014));
      addParticleCloud(g, index === 4 ? 900 : 420, c, 5.5);

      if (s.mode === 'tensa' || s.mode === 'hybrid' || s.mode === 'spear' || s.mode === 'force') {
        const blade = new THREE.Mesh(new THREE.BoxGeometry(0.16, s.mode === 'spear' ? 6.8 : 3.7, 0.07), mat(s.mode === 'hybrid' ? 0xffffff : c, 0.88));
        blade.rotation.z = Math.PI * 0.06;
        g.add(blade);
        g.add(ring(1.1, 0xffffff, 0.18, 0.012));
      }
      if (s.mode === 'petals') {
        for (let i = 0; i < 90; i++) {
          const p = new THREE.Mesh(new THREE.PlaneGeometry(0.055, 0.11), mat(i % 3 ? 0xffa6d9 : 0xffffff, 0.64));
          p.position.set((Math.random() - 0.5) * 8, (Math.random() - 0.5) * 6, (Math.random() - 0.5) * 4);
          p.rotation.z = Math.random() * Math.PI;
          g.add(p);
        }
      }
      if (s.mode === 'ice' || s.mode === 'white') {
        for (let i = 0; i < 12; i++) {
          const ice = new THREE.Mesh(new THREE.ConeGeometry(0.18 + Math.random() * 0.15, 1.2 + Math.random(), 5), mat(c, 0.36));
          const a = i / 12 * Math.PI * 2;
          ice.position.set(Math.cos(a) * 2.7, Math.sin(a) * 2.1, (Math.random() - 0.5) * 2);
          ice.rotation.z = a;
          g.add(ice);
        }
      }
      if (s.mode === 'fire' || s.mode === 'berserk' || s.mode === 'dragon') {
        const core = new THREE.Mesh(new THREE.IcosahedronGeometry(1.35, 2), mat(c, 0.18, true));
        g.add(core);
        for (let i = 0; i < 35; i++) {
          const ember = new THREE.Mesh(new THREE.SphereGeometry(0.025 + Math.random() * 0.05, 6, 6), mat(0xffc56a, 0.75));
          ember.position.set((Math.random() - 0.5) * 6, (Math.random() - 0.5) * 7, (Math.random() - 0.5) * 4);
          g.add(ember);
        }
      }
      if (s.mode === 'giant') {
        const torso = new THREE.Mesh(new THREE.BoxGeometry(1.5, 3.5, 0.8), mat(c, 0.28, true));
        const head = new THREE.Mesh(new THREE.SphereGeometry(0.7, 16, 16), mat(c, 0.34, true));
        head.position.y = 2.25;
        g.add(torso, head);
      }
      if (s.mode === 'poison' || s.mode === 'acid') {
        const orb = new THREE.Mesh(new THREE.SphereGeometry(1.45, 24, 24), mat(c, 0.12));
        g.add(orb);
        for (let i = 0; i < 8; i++) g.add(ring(0.7 + i * 0.2, c, 0.10, 0.012));
      }
      if (s.mode === 'lightning') {
        for (let i = 0; i < 14; i++) {
          const bolt = new THREE.Mesh(new THREE.CylinderGeometry(0.018, 0.018, 3.8, 5), mat(c, 0.72));
          const a = i / 14 * Math.PI * 2;
          bolt.position.set(Math.cos(a) * 3, Math.sin(a) * 2, (Math.random() - 0.5) * 3);
          bolt.rotation.z = Math.sin(a) * 0.6;
          g.add(bolt);
        }
      }
      if (s.mode === 'mirror' || s.mode === 'final') {
        g.add(new THREE.Mesh(new THREE.OctahedronGeometry(1.8, 1), mat(c, 0.15, true)));
        g.add(ring(1.6, 0xffffff, 0.3, 0.018));
      }
      if (s.mode === 'invert') {
        const cube = new THREE.Mesh(new THREE.BoxGeometry(2.6, 2.6, 2.6), mat(c, 0.16, true));
        g.add(cube);
        g.add(new THREE.Mesh(new THREE.SphereGeometry(1.2, 24, 24), mat(0x7650ff, 0.12, true)));
      }
      if (s.mode === 'repair') {
        for (let i = 0; i < 5; i++) {
          const node = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.5, 0.5), mat(i % 2 ? c : 0xffffff, 0.5));
          const a = i / 5 * Math.PI * 2;
          node.position.set(Math.cos(a) * 2.1, Math.sin(a) * 2.1, 0);
          g.add(node);
        }
      }
      if (s.mode === 'story' || s.mode === 'gold') {
        for (let i = 0; i < 7; i++) {
          const arc = ring(0.65 + i * 0.34, c, 0.14, 0.012);
          arc.rotation.x = i * 0.2;
          arc.rotation.y = i * 0.35;
          g.add(arc);
        }
      }
      if (s.mode === 'snake') {
        for (let i = 0; i < 14; i++) {
          const n = new THREE.Mesh(new THREE.SphereGeometry(0.14 + i * 0.01, 10, 10), mat(i % 2 ? c : 0xffffff, 0.52));
          const a = i * 0.58;
          n.position.set(Math.cos(a) * (0.35 + i * 0.11), Math.sin(a) * (0.35 + i * 0.11), i * 0.05 - 0.35);
          g.add(n);
        }
      }
      if (s.mode === 'void') {
        g.add(new THREE.Mesh(new THREE.SphereGeometry(3.2, 32, 32), new THREE.MeshBasicMaterial({ color: 0x03030a, transparent: true, opacity: 0.72 })));
        g.add(ring(3.35, c, 0.35, 0.02));
      }
    });

    const mouse = { x: 0, y: 0 };
    const move = (e: PointerEvent) => { mouse.x = e.clientX / innerWidth - 0.5; mouse.y = e.clientY / innerHeight - 0.5; };
    const wheel = (e: WheelEvent) => { if (Math.abs(e.deltaY) > 18) goTo(activeRef.current + (e.deltaY > 0 ? 1 : -1)); };
    const keydown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown' || e.key === 'PageDown' || e.key === ' ') { e.preventDefault(); goTo(activeRef.current + 1); }
      if (e.key === 'ArrowUp' || e.key === 'PageUp') { e.preventDefault(); goTo(activeRef.current - 1); }
      if (e.key === 'Escape') { setMenu(false); setSelected(null); }
    };
    addEventListener('pointermove', move);
    addEventListener('wheel', wheel, { passive: true });
    addEventListener('keydown', keydown);

    const clock = new THREE.Clock();
    let raf = 0;
    const animate = () => {
      const t = clock.getElapsedTime();
      const index = activeRef.current;
      stars.rotation.y = t * 0.009 + mouse.x * 0.12;
      stars.rotation.x = mouse.y * 0.06;
      world.rotation.y += (mouse.x * 0.12 - world.rotation.y) * 0.025;
      world.rotation.x += (-mouse.y * 0.08 - world.rotation.x) * 0.025;
      key.position.x = 2 + mouse.x * 5;
      key.position.y = 2.5 - mouse.y * 3;
      groups.forEach((g, i) => {
        const on = i === index;
        g.visible = on;
        if (!on) return;
        const pulse = 1 + Math.sin(t * 2.1 + g.userData.pulse) * 0.035;
        g.scale.setScalar(pulse);
        g.rotation.y += 0.0025;
        g.rotation.z = Math.sin(t * 0.35 + i) * 0.025;
        g.children.forEach((child, childIndex) => {
          if (child instanceof THREE.Points) child.rotation.y += 0.001 + childIndex * 0.0001;
          if (child instanceof THREE.Mesh && (current.mode === 'petals' || current.mode === 'fire' || current.mode === 'berserk' || current.mode === 'dragon')) child.rotation.z += 0.002;
        });
      });
      camera.position.z += (8.5 - camera.position.z) * 0.03;
      renderer.render(scene, camera);
      raf = requestAnimationFrame(animate);
    };
    animate();

    const resize = () => { camera.aspect = innerWidth / innerHeight; camera.updateProjectionMatrix(); renderer.setSize(innerWidth, innerHeight); };
    addEventListener('resize', resize);
    return () => {
      cancelAnimationFrame(raf);
      removeEventListener('resize', resize);
      removeEventListener('pointermove', move);
      removeEventListener('wheel', wheel);
      removeEventListener('keydown', keydown);
      renderer.dispose();
      starGeo.dispose();
      starMat.dispose();
      root.removeChild(renderer.domElement);
    };
  }, []);

  useEffect(() => {
    gsap.fromTo('.scene-copy', { opacity: 0, y: 22 }, { opacity: 1, y: 0, duration: 0.55, ease: 'power3.out' });
    gsap.fromTo('.scene-card', { opacity: 0, scale: 0.97 }, { opacity: 1, scale: 1, duration: 0.5, stagger: 0.05, ease: 'power2.out' });
  }, [active]);

  return (
    <main className={`portfolio ${current.mode}`} style={{ '--scene-accent': `#${current.accent.toString(16).padStart(6, '0')}` } as React.CSSProperties}>
      <div ref={mount} className="webgl" />
      <div className="grain" />
      <div className="vignette" />
      <div className="scanlines" />

      <header className="topbar">
        <button className="brand" onClick={() => goTo(0)}>MW<span>.</span></button>
        <div className="system-label">BANKAI ARCHIVE <b>//</b> MUSAB WAQAR</div>
        <div className="top-actions">
          <button onClick={() => setMuted(!muted)}>{muted ? 'SOUND OFF' : 'SOUND ON'}</button>
          <button onClick={() => setMenu(!menu)}>MENU <span>{menu ? '×' : '☰'}</span></button>
        </div>
      </header>

      <div className="hud-top"><span>REIATSU // {String(Math.round(progress)).padStart(3, '0')}</span><span>ONLINE · 22 BANKAIS</span></div>
      <div className="hud-left">{profile.name.toUpperCase()}<br /><span>{profile.role.toUpperCase()}</span></div>

      <div className="scene-index">
        <span>{sceneNumbers[active]}</span>
        <div className="index-line"><i style={{ height: `${progress}%` }} /></div>
        <span>{sceneNumbers.length.toString().padStart(2, '0')}</span>
      </div>

      <section className="scene-copy">
        <div className="eyebrow">{current.user} · {current.theme}</div>
        <h1>{current.title}</h1>
        <div className="bankai-name">{current.name}</div>
        <p>{current.purpose}</p>
        <div className="command"><span>RELEASE</span>{current.command}</div>
        <div className="ability"><b>ABILITY</b>{current.ability}</div>
        <div className="actions">
          <button className="primary" onClick={() => setSelected(current.projects[0])}>OPEN ARCHIVE</button>
          {active < scenes.length - 1 && <button className="ghost" onClick={() => goTo(active + 1)}>NEXT BANKAI →</button>}
        </div>
      </section>

      <aside className="archive-panel">
        <div className="panel-kicker">{sceneNumbers[active]} / 22 · PORTFOLIO TRANSLATION</div>
        <h2>{current.title}</h2>
        {current.projects.map((project, i) => (
          <button className="scene-card" key={project} onClick={() => setSelected(project)}>
            <span>0{i + 1}</span><strong>{project}</strong><em>VIEW</em>
          </button>
        ))}
        <div className="tech-strip">{tech.slice((active * 3) % tech.length, (active * 3) % tech.length + 5).map((t) => <span key={t}>{t}</span>)}</div>
      </aside>

      <div className="bottom-meta">
        <span>FOUNDATION → MECHANISM → IMPLEMENTATION → OPTIMIZATION</span>
        <span>{profile.university} · {profile.graduation}</span>
      </div>

      {active === 0 && <div className="intro-mark">BANKAI<br /><small>THE PORTFOLIO AWAKENS</small></div>}

      {menu && (
        <div className="menu-overlay">
          <div className="menu-head"><span>GOTEI 13 // ARCHIVE</span><button onClick={() => setMenu(false)}>CLOSE ×</button></div>
          <div className="menu-grid">
            {scenes.map((s, i) => (
              <button key={s.name} className={i === active ? 'selected' : ''} onClick={() => { goTo(i); setMenu(false); }}>
                <small>{String(i + 1).padStart(2, '0')}</small><b>{s.name}</b><span>{s.title}</span>
              </button>
            ))}
          </div>
          <div className="menu-footer">{profile.motto}</div>
        </div>
      )}

      {selected && (
        <div className="modal-backdrop" onClick={() => setSelected(null)}>
          <article className="archive-modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelected(null)}>×</button>
            <div className="eyebrow">ARCHIVE NODE · {current.name}</div>
            <h2>{selected}</h2>
            <p>This portfolio node is mapped to Musab Waqar’s engineering journey: practical systems, AI, distributed infrastructure, research and continuous experimentation.</p>
            <div className="modal-tags">{current.projects.map((p) => <span key={p}>{p}</span>)}</div>
            <div className="modal-links">
              <a href="https://github.com/AbyssDev247/musabwaqar-3d-portfolio" target="_blank" rel="noreferrer">GITHUB →</a>
              <a href="https://musabwaqar-3d-portfolio.vercel.app" target="_blank" rel="noreferrer">LIVE PORTFOLIO →</a>
              <a href="https://github.com/Musab-Waqar" target="_blank" rel="noreferrer">GITHUB PROFILE →</a>
            </div>
          </article>
        </div>
      )}

      <div className="contact-dock">
        <a href="https://github.com/Musab-Waqar" target="_blank" rel="noreferrer">GITHUB</a>
        <a href="https://musab-waqar-portfolio.vercel.app" target="_blank" rel="noreferrer">PORTFOLIO</a>
        <a href="mailto:musab@fast.edu">EMAIL</a>
      </div>
    </main>
  );
}
