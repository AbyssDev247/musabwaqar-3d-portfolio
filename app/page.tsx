'use client';

import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { gsap } from 'gsap';

const scenes = [
  { name: 'BANKAI GATEWAY', title: 'MUSABWAQAR', sub: 'COMPUTER SCIENTIST • BUILDER • SYSTEMS THINKER', mode: 'ice' },
  { name: 'ZANPAKUTŌ ARCHIVE', title: 'WHAT I BUILD', sub: 'PROJECTS AS SYSTEMS', mode: 'blades' },
  { name: 'ESPADA INDEX', title: 'TECHNICAL UNIVERSE', sub: 'FOUNDATION → MECHANISM → IMPLEMENTATION', mode: 'void' },
  { name: 'SENBONZAKURA', title: 'EXPERIENCE', sub: 'MILESTONES IN MOTION', mode: 'petals' },
  { name: 'ZANKA NO TACHI', title: 'LET’S BUILD', sub: 'CONTACT / COLLABORATION', mode: 'fire' },
  { name: 'FINAL FORM', title: 'MUSABWAQAR', sub: 'FROM THE MACHINE UNDERNEATH TO THE INTELLIGENCE ON TOP', mode: 'final' },
];

const projects = [
  ['HOSTEL MANAGEMENT SYSTEM','PHP • MySQL • Apache','A practical management workflow for hostels, rooms, seats, residents and payments.'],
  ['KAFKA SYSTEMS','Docker • Apache Kafka','Event-driven producer / broker / consumer experiments and distributed-system exploration.'],
  ['KNOWLEDGE GRAPH + RAG','Graph • AI • Retrieval','Exploring structured knowledge with retrieval and language-model applications.'],
  ['NUtomate','Knowledge Graph • AI','Automation-oriented work connecting knowledge graphs and AI applications.'],
];

const skills = ['C','C++','Python','JavaScript','React','SQL','Docker','Kafka','Spark','PySpark','Hadoop','NLP','RAG','Neo4j','Knowledge Graphs','Databricks'];

export default function Home() {
  const mount = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [menu, setMenu] = useState(false);

  useEffect(() => {
    if (!mount.current) return;
    const root = mount.current;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, innerWidth / innerHeight, 0.1, 100);
    camera.position.z = 7;
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(devicePixelRatio, 1.8));
    renderer.setSize(innerWidth, innerHeight);
    root.appendChild(renderer.domElement);

    const count = 1200;
    const positions = new Float32Array(count * 3);
    for (let i=0;i<count;i++) {
      positions[i*3] = (Math.random()-.5)*18;
      positions[i*3+1] = (Math.random()-.5)*12;
      positions[i*3+2] = (Math.random()-.5)*12;
    }
    const geo = new THREE.BufferGeometry(); geo.setAttribute('position', new THREE.BufferAttribute(positions,3));
    const mat = new THREE.PointsMaterial({ size:.025, color:0xd8f6ff, transparent:true, opacity:.8 });
    const points = new THREE.Points(geo,mat); scene.add(points);

    const group = new THREE.Group(); scene.add(group);
    for(let i=0;i<12;i++){
      const g = new THREE.IcosahedronGeometry(.22 + Math.random()*.35,1);
      const m = new THREE.MeshBasicMaterial({ color: i%2 ? 0x73d7ff : 0xffffff, wireframe:true, transparent:true, opacity:.4 });
      const mesh = new THREE.Mesh(g,m);
      mesh.position.set((Math.random()-.5)*9,(Math.random()-.5)*6,(Math.random()-.5)*5);
      group.add(mesh);
    }
    const clock = new THREE.Clock();
    let raf = 0;
    const animate=()=>{ const t=clock.getElapsedTime(); points.rotation.y=t*.018; points.rotation.x=Math.sin(t*.15)*.03; group.rotation.y=-t*.06; group.children.forEach((m,i)=>{m.rotation.x=t*(.15+i*.01);m.rotation.z=-t*(.12+i*.008)}); renderer.render(scene,camera); raf=requestAnimationFrame(animate); };
    animate();
    const resize=()=>{camera.aspect=innerWidth/innerHeight;camera.updateProjectionMatrix();renderer.setSize(innerWidth,innerHeight)};
    addEventListener('resize',resize);
    return()=>{cancelAnimationFrame(raf);removeEventListener('resize',resize);renderer.dispose();geo.dispose();mat.dispose();root.removeChild(renderer.domElement)};
  },[]);

  useEffect(()=>{
    const onWheel=(e:WheelEvent)=>{ if(Math.abs(e.deltaY)<5)return; setActive(v=>Math.max(0,Math.min(5,v+(e.deltaY>0?1:-1)))) };
    addEventListener('wheel',onWheel,{passive:true}); return()=>removeEventListener('wheel',onWheel);
  },[]);

  useEffect(()=>{ gsap.to('.scene-content',{duration:.65,opacity:0,y:active%2?20:-20,onComplete:()=>gsap.to('.scene-content',{duration:.7,opacity:1,y:0,ease:'power3.out'})}); },[active]);

  const s=scenes[active];
  return <main className={`portfolio ${s.mode}`}>
    <div ref={mount} className="webgl" />
    <div className="grain" />
    <header><button className="brand" onClick={()=>setActive(0)}>MW<span>.</span></button><div className="progress">0{active+1} / 06</div><button className="menu" onClick={()=>setMenu(!menu)}>MENU <i>{menu?'×':'☰'}</i></button></header>
    {menu && <nav className="overlay-menu">{scenes.map((x,i)=><button key={x.name} onClick={()=>{setActive(i);setMenu(false)}}>{String(i+1).padStart(2,'0')} — {x.name}</button>)}</nav>}
    <div className="vertical-label">SYSTEMS IN MOTION</div>
    <section className="scene-content">
      <p className="eyebrow">{s.name}</p><h1>{s.title}</h1><p className="subtitle">{s.sub}</p>
      {active===0 && <div className="hero-copy"><span>INITIALIZE</span><strong>BANKAI</strong><p>I want to understand systems from the machine underneath to the intelligence built on top.</p></div>}
      {active===1 && <div className="cards">{projects.map(([a,b,c])=><article key={a}><small>{b}</small><h3>{a}</h3><p>{c}</p><span className="release">RELEASE ↗</span></article>)}</div>}
      {active===2 && <div className="skill-cloud">{skills.map((x,i)=><span key={x} style={{transform:`translate(${Math.sin(i*3)*25}px,${Math.cos(i*2)*18}px)`}}>{x}</span>)}</div>}
      {active===3 && <div className="timeline"><div><b>FAST NUCES</b><span>BS Computer Science • Semester 7</span></div><div><b>NUSyS LAB</b><span>Research / technical experience</span></div><div><b>10DRIFT</b><span>Database quality assurance internship</span></div><div><b>NUTOMATE</b><span>Knowledge Graph & AI applications</span></div><div><b>NANOCODERS</b><span>Co-Founder & CTO</span></div></div>}
      {active===4 && <div className="contact"><p>Have a system worth building?</p><a href="mailto:contact@example.com">START A CONVERSATION ↗</a></div>}
      {active===5 && <div className="final"><p>COMPUTER SCIENTIST • BUILDER • SYSTEMS THINKER</p><div><a href="https://github.com/AbyssDev247">GITHUB</a><a href="https://www.linkedin.com/">LINKEDIN</a></div></div>}
    </section>
    <div className="scroll">SCROLL <span>↓</span></div>
    <div className="scene-dots">{scenes.map((_,i)=><button aria-label={`Scene ${i+1}`} className={i===active?'on':''} key={i} onClick={()=>setActive(i)} />)}</div>
  </main>
}
