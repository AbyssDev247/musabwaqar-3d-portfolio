'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import * as THREE from 'three';
import { gsap } from 'gsap';

type Bankai = {
  name: string;
  user: string;
  section: string;
  command: string;
  purpose: string;
  ability: string;
  accent: number;
  hex: string;
  mode: string;
  projects: string[];
};

const BANKAIS: Bankai[] = [
  {name:'TENSA ZANGETSU',user:'ICHIGO KUROSAKI',section:'SPEED & POWER',command:'BANKAI: TENSA ZANGETSU',purpose:'Fast systems. Focused execution. High-performance engineering.',ability:'Compressed reiatsu becomes velocity, durability and destructive output.',accent:0xff6b00,hex:'#ff6b00',mode:'tensa',projects:['Real-time systems','WebGL performance engine','Lightning-fast API work']},
  {name:'TRUE BANKAI',user:'ICHIGO KUROSAKI',section:'HYBRID INTELLIGENCE',command:'TRUE BANKAI // HYBRID SOUL',purpose:'Full-stack systems connecting AI, backend infrastructure and interfaces.',ability:'Black and white power merge into one adaptive architecture.',accent:0xc8b8ff,hex:'#c8b8ff',mode:'hybrid',projects:['AI + backend integration','RAG applications','Distributed LLM experiments']},
  {name:'ZANKA NO TACHI',user:'GENRYŪSAI YAMAMOTO',section:'LEGACY & FIRE',command:'BANKAI: ZANKA NO TACHI',purpose:'Systems, research and lessons designed to survive the moment.',ability:'Four directional powers become one concentrated destructive edge.',accent:0xff4b21,hex:'#ff4b21',mode:'fire',projects:['Research systems','Infrastructure / security work','Long-lived engineering lessons']},
  {name:'KATEN KYŌKOTSU: KARAMATSU SHINJŪ',user:'SHUNSUI KYŌRAKU',section:'STORIES & CASE STUDIES',command:'BANKAI: KATEN KYŌKOTSU: KARAMATSU SHINJŪ',purpose:'Every project has a constraint, conflict, decision and outcome.',ability:'A four-act narrative turns technical problems into readable stories.',accent:0x9b7dff,hex:'#9b7dff',mode:'story',projects:['Technical case studies','Failure → lesson → redesign','Team and client stories']},
  {name:'SENBONZAKURA KAGEYOSHI',user:'BYAKUYA KUCHIKI',section:'PRECISION & ELEGANCE',command:'BANKAI: SENBONZAKURA KAGEYOSHI',purpose:'Clean architecture, deliberate abstractions and measurable quality.',ability:'Countless fragments become one precise system.',accent:0xff8fd5,hex:'#ff8fd5',mode:'petals',projects:['Clean architecture','Test-focused development','Scalable project design']},
  {name:'DAIGUREN HYŌRINMARU',user:'TŌSHIRŌ HITSUGAYA',section:'TIME & OPTIMIZATION',command:'BANKAI: DAIGUREN HYŌRINMARU',purpose:'Deadlines become visible systems: scope, time, risk and delivery.',ability:'Ice petals track the remaining window until mastery arrives.',accent:0x72d9ff,hex:'#72d9ff',mode:'ice',projects:['Sprint planning','Performance optimization','Learning roadmaps']},
  {name:'KONJIKI ASHISOGI JIZŌ',user:'MAYURI KUROTSUCHI',section:'EXPERIMENTAL TECH',command:'BANKAI: KONJIKI ASHISOGI JIZŌ',purpose:'Research, prototypes and strange ideas that become useful tools.',ability:'A customizable counter is generated for the problem in front of it.',accent:0xd7ff3f,hex:'#d7ff3f',mode:'poison',projects:['Novel graph tooling','Custom algorithms','Experimental AI frameworks']},
  {name:'MINAZUKI',user:'RETSU UNOHANA',section:'REPAIR & RESILIENCE',command:'BANKAI: MINAZUKI',purpose:'Infrastructure that can recover, monitor itself and keep serving.',ability:'Damage and healing coexist in a continuous reliability loop.',accent:0x76ffb1,hex:'#76ffb1',mode:'acid',projects:['Disaster recovery','Automated backups','Health monitoring / self-healing']},
  {name:'KOKUJŌ TENGEN MYŌŌ',user:'SAJIN KOMAMURA',section:'LARGE-SCALE SYSTEMS',command:'BANKAI: KOKUJŌ TENGEN MYŌŌ',purpose:'Distributed architecture and enterprise reliability beyond one machine.',ability:'A colossal guardian mirrors the scale of the system.',accent:0xff3030,hex:'#ff3030',mode:'giant',projects:['Distributed recovery','Global load balancing','Cross-datacenter replication']},
  {name:'KAMISHINI NO YARI',user:'GIN ICHIMARU',section:'LONG-RANGE IMPACT',command:'BANKAI: KAMISHINI NO YARI',purpose:'A small interface can move a huge distributed system.',ability:'A blade stretches across distance at extreme speed.',accent:0xe8f8ff,hex:'#e8f8ff',mode:'spear',projects:['gRPC services','Message queues','Distributed databases']},
  {name:'SUZUMUSHI TSUISHIKI: ENMA KŌRO',user:'KANAME TŌSEN',section:'SENSORY ANALYTICS',command:'BANKAI: SUZUMUSHI TSUISHIKI: ENMA KŌRO',purpose:'Remove noise until the signal is impossible to miss.',ability:'A black field suppresses everything except the insight.',accent:0x6578ff,hex:'#6578ff',mode:'void',projects:['Pattern recognition','Data mining','Model explainability']},
  {name:'KINSHARA BUTŌDAN',user:'RŌJŪRŌ “ROSE” ŌTORIBASHI',section:'CREATIVE DIRECTION',command:'BANKAI: KINSHARA BUTŌDAN',purpose:'Design systems, interaction, motion and interfaces that communicate.',ability:'Music becomes illusion; design becomes an experience.',accent:0xffcf6b,hex:'#ffcf6b',mode:'gold',projects:['Design systems','Motion libraries','Interactive visual work']},
  {name:'TEKKEN TACHIKAZE',user:'KENSEI MUGURUMA',section:'RAW PERFORMANCE',command:'BANKAI: TEKKEN TACHIKAZE',purpose:'Benchmarking, profiling and ruthless removal of bottlenecks.',ability:'Continuous contact means continuous concussive force.',accent:0xff5a3d,hex:'#ff5a3d',mode:'force',projects:['Algorithm optimization','Benchmark suites','Runtime tuning']},
  {name:'SŌŌ ZABIMARU',user:'RENJI ABARAI',section:'GROWTH TRAJECTORY',command:'BANKAI: SŌŌ ZABIMARU',purpose:'Skills accumulate through projects, experiments and mentorship.',ability:'A skeletal serpent grows with every completed milestone.',accent:0xb979ff,hex:'#b979ff',mode:'snake',projects:['Career progression','Mentorship','Learning outcomes']},
  {name:'RYŪMON HŌZŌKUMARU',user:'IKKAKU MADARAME',section:'COMPOUNDING EFFORT',command:'BANKAI: RYŪMON HŌZŌKUMARU',purpose:'Long projects reward patience and accumulated effort.',ability:'A crest fills until one decisive strike is possible.',accent:0xe74343,hex:'#e74343',mode:'dragon',projects:['Long-term initiatives','Compounding learning','Year-scale goals']},
  {name:'KŌŌ MONSHŌ',user:'CHŌJIRŌ SASAKIBE',section:'LEADERSHIP',command:'BANKAI: KŌŌ MONSHŌ',purpose:'Architecture is coordination: people, responsibilities and decisions.',ability:'Lightning creates a visible hierarchy of roles and dependencies.',accent:0xffe45c,hex:'#ffe45c',mode:'lightning',projects:['Team projects','Delegation','Strategic planning']},
  {name:'HAKKA NO TOGAME',user:'RUKIA KUCHIKI',section:'SACRIFICE & PERFECTION',command:'BANKAI: HAKKA NO TOGAME',purpose:'Some breakthroughs require removing what no longer belongs.',ability:'Absolute cold freezes the environment and forces a deliberate reset.',accent:0xdffaff,hex:'#dffaff',mode:'white',projects:['Difficult technical decisions','Course corrections','Focused simplification']},
  {name:'KANNONBIRAKI BENIHIME ARATAME',user:'KISUKE URAHARA',section:'RESTRUCTURE & FIX',command:'BANKAI: KANNONBIRAKI BENIHIME ARATAME',purpose:'Debugging means opening the system and rebuilding the right part.',ability:'Anything in range can be split, restructured and stitched together.',accent:0xff7652,hex:'#ff7652',mode:'repair',projects:['Debugging','Architectural refactoring','System redesign']},
  {name:'SAKAHADĒ',user:'SHINJI HIRAKO',section:'PERSPECTIVE SHIFT',command:'INVERSION // CAN’T FEAR YOUR OWN WORLD',purpose:'Invert assumptions. Reframe the problem.',ability:'Perspective itself becomes the weapon.',accent:0xffc45c,hex:'#ffc45c',mode:'invert',projects:['Unconventional approaches','Blue-sky thinking','Paradigm shifts']},
  {name:'SHINKA HAKKŌ KEN',user:'NANAO ISE / SHUNSUI KYŌRAKU',section:'SECURITY & PROTECTION',command:'DIVINE EIGHT MIRROR SWORD',purpose:'Good systems defend users, data and invariants.',ability:'A mirror absorbs hostile force and reflects it back.',accent:0xbdeeff,hex:'#bdeeff',mode:'mirror',projects:['Cybersecurity','Encryption','Defensive architecture']},
  {name:'UNNAMED BANKAI',user:'KENPACHI ZARAKI',section:'RAW IMPACT',command:'BANKAI // UNTAMED',purpose:'Ambitious work that changes the game.',ability:'Pure destructive output with no concern for elegance.',accent:0xff1738,hex:'#ff1738',mode:'berserk',projects:['Breakthrough builds','Highest-impact work','Game-changing experiments']},
  {name:'RESURRECCIÓN // FINAL PORTAL',user:'MUSAB WAQAR',section:'CONTACT & NEXT ARC',command:'FINAL FORM: OPEN THE GATE',purpose:'A portfolio is a doorway. The next system can be built together.',ability:'The Bankai archive collapses into a single portal.',accent:0xffd166,hex:'#ffd166',mode:'final',projects:['Research collaboration','FYP / engineering collaboration','International MS / research opportunities']},
];

const profile={name:'Musab Waqar',role:'Co-Founder & CTO @ NanoCoders',university:'BS Computer Science · FAST NUCES Peshawar',graduation:'June 2027',motto:'Foundation → Mechanism → Implementation → Optimization → Real-world usage'};
const tech=['C','C++','Python','TypeScript','React','Next.js','Docker','Apache Kafka','Spark','PySpark','Hadoop','NLP','RAG','Neo4j','Apache AGE','PostgreSQL','Databricks','Linux'];

function colorToCss(n:number){return `#${n.toString(16).padStart(6,'0')}`}

export default function AnimeBankaiPortfolio(){
  const mount=useRef<HTMLDivElement>(null);
  const activeRef=useRef(0);
  const [active,setActive]=useState(0);
  const [impact,setImpact]=useState(false);
  const [selected,setSelected]=useState<string|null>(null);
  const current=BANKAIS[active];
  const numbers=useMemo(()=>BANKAIS.map((_,i)=>String(i+1).padStart(2,'0')),[]);

  useEffect(()=>{
    if(!mount.current)return;
    const root=mount.current;
    const scene=new THREE.Scene();
    const camera=new THREE.PerspectiveCamera(44,innerWidth/innerHeight,.1,180);
    camera.position.set(0,.1,10);
    const renderer=new THREE.WebGLRenderer({antialias:true,alpha:true,powerPreference:'high-performance'});
    renderer.setPixelRatio(Math.min(devicePixelRatio,1.6)); renderer.setSize(innerWidth,innerHeight); renderer.outputColorSpace=THREE.SRGBColorSpace; root.appendChild(renderer.domElement);
    const world=new THREE.Group(); scene.add(world);
    scene.add(new THREE.AmbientLight(0xffffff,.35));
    const key=new THREE.DirectionalLight(0xffffff,2.4); key.position.set(4,7,8); scene.add(key);
    const toon=(c:number,o=.9)=>new THREE.MeshToonMaterial({color:c,transparent:true,opacity:o,side:THREE.DoubleSide});
    const glow=(c:number,o=.55)=>new THREE.MeshBasicMaterial({color:c,transparent:true,opacity:o,side:THREE.DoubleSide,blending:THREE.AdditiveBlending,depthWrite:false});
    const groups=BANKAIS.map(()=>new THREE.Group()); groups.forEach((g,i)=>{g.visible=i===0;world.add(g)});
    const outline=(m:THREE.Mesh)=>{const e=new THREE.EdgesGeometry(m.geometry);m.add(new THREE.LineSegments(e,new THREE.LineBasicMaterial({color:0x030303,transparent:true,opacity:.9})))};
    const addRing=(g:THREE.Group,r:number,c:number)=>{const m=new THREE.Mesh(new THREE.TorusGeometry(r,.035,8,96),glow(c,.65));g.add(m)};
    const addParticles=(g:THREE.Group,c:number,count=260,spread=6)=>{const geo=new THREE.BufferGeometry();const p=new Float32Array(count*3);for(let i=0;i<count;i++){const a=Math.random()*Math.PI*2,r=Math.sqrt(Math.random())*spread;p[i*3]=Math.cos(a)*r;p[i*3+1]=(Math.random()-.5)*spread;p[i*3+2]=Math.sin(a)*r}geo.setAttribute('position',new THREE.BufferAttribute(p,3));g.add(new THREE.Points(geo,new THREE.PointsMaterial({color:c,size:.035,transparent:true,opacity:.75,blending:THREE.AdditiveBlending,depthWrite:false})))};
    const blade=(g:THREE.Group,c:number,h=4,white=false)=>{const m=new THREE.Mesh(new THREE.BoxGeometry(.16,h,.07),toon(white?0xf7f7f7:c));outline(m);g.add(m)};

    // Permanent deep 3D anime stage. It is rendered continuously, but nothing animates by time.
    const floor=new THREE.Mesh(new THREE.PlaneGeometry(58,58,34,34),new THREE.MeshBasicMaterial({color:0x020305,transparent:true,opacity:.65,wireframe:true}));floor.rotation.x=-Math.PI/2;floor.position.y=-3.3;world.add(floor);
    for(let i=0;i<36;i++){const b=new THREE.Mesh(new THREE.BoxGeometry(.4+Math.random(),.4+Math.random()*3,.5+Math.random()),new THREE.MeshBasicMaterial({color:0x0b1015,wireframe:true,transparent:true,opacity:.34}));b.position.set((Math.random()-.5)*25,-2.8,-7-Math.random()*35);world.add(b)}
    const starGeo=new THREE.BufferGeometry(),starP=new Float32Array(1200*3);for(let i=0;i<1200;i++){starP[i*3]=(Math.random()-.5)*34;starP[i*3+1]=(Math.random()-.5)*18;starP[i*3+2]=-Math.random()*60}starGeo.setAttribute('position',new THREE.BufferAttribute(starP,3));scene.add(new THREE.Points(starGeo,new THREE.PointsMaterial({color:0xe8efff,size:.024,transparent:true,opacity:.7})));

    BANKAIS.forEach((s,i)=>{
      const g=groups[i],c=s.accent;
      addRing(g,2.2+(i%3)*.28,c);addRing(g,3.45,c);addParticles(g,c,i===4?650:280,5.5);
      const core=new THREE.Mesh(new THREE.IcosahedronGeometry(1.15,1),toon(c,.88));core.scale.set(.72,1.45,.72);outline(core);g.add(core);
      if(['tensa','hybrid','spear','force'].includes(s.mode)){blade(g,c,s.mode==='spear'?7:4,s.mode==='hybrid');}
      if(s.mode==='hybrid'){const w=new THREE.Mesh(new THREE.BoxGeometry(.28,5,.08),toon(0xffffff,.95));w.position.x=.55;w.rotation.z=-.1;outline(w);g.add(w)}
      if(s.mode==='tensa'){for(let n=0;n<10;n++){const ch=new THREE.Mesh(new THREE.TorusGeometry(.08,.024,6,16),glow(0xdde8ef,.8));ch.position.set(.2+n*.08,-2+n*.2,.1);ch.rotation.x=n*.55;g.add(ch)}}
      if(s.mode==='fire'||s.mode==='berserk'){for(let n=0;n<18;n++){const flame=new THREE.Mesh(new THREE.ConeGeometry(.08+Math.random()*.18,.8+Math.random()*1.8,5),glow(c,.5));flame.position.set((Math.random()-.5)*4,-.7+Math.random()*2,.2);flame.rotation.z=(Math.random()-.5)*.8;g.add(flame)}}
      if(s.mode==='petals'||s.mode==='gold'){for(let n=0;n<85;n++){const p=new THREE.Mesh(new THREE.PlaneGeometry(.07,.18),glow(s.mode==='petals'?(n%5?0xff6ebc:0xffffff):c,.75));p.position.set((Math.random()-.5)*7,(Math.random()-.5)*7,(Math.random()-.5)*3);p.rotation.z=Math.random()*Math.PI;g.add(p)}}
      if(s.mode==='ice'||s.mode==='white'){for(let n=0;n<14;n++){const ic=new THREE.Mesh(new THREE.OctahedronGeometry(.25+Math.random()*.4),toon(c,.72));ic.position.set((Math.random()-.5)*6,(Math.random()-.5)*6,.2);ic.rotation.set(Math.random(),Math.random(),Math.random());outline(ic);g.add(ic)}}
      if(s.mode==='poison'||s.mode==='acid'){const cloud=new THREE.Mesh(new THREE.SphereGeometry(2.7,18,12),glow(c,.16));cloud.scale.y=.65;g.add(cloud);for(let n=0;n<14;n++){const droplet=new THREE.Mesh(new THREE.SphereGeometry(.18+Math.random()*.25,8,8),glow(c,.55));droplet.position.set((Math.random()-.5)*5,-2+Math.random()*4,.2);g.add(droplet)}}
      if(s.mode==='giant'){const torso=new THREE.Mesh(new THREE.BoxGeometry(2.4,4,1.2),toon(0x292929,.95));torso.position.y=.2;outline(torso);g.add(torso);const head=new THREE.Mesh(new THREE.SphereGeometry(.65,16,12),toon(0x3b3b3b));head.position.y=2.7;outline(head);g.add(head);for(const x of [-1.65,1.65]){const arm=new THREE.Mesh(new THREE.BoxGeometry(.55,3.5,.65),toon(0x303030));arm.position.set(x,.2,0);arm.rotation.z=x<0?-.18:.18;outline(arm);g.add(arm)}}
      if(s.mode==='spear'){const long=new THREE.Mesh(new THREE.BoxGeometry(.08,9,.05),toon(0xffffff,.95));long.rotation.z=Math.PI/2;long.position.x=2.8;outline(long);g.add(long)}
      if(s.mode==='void'||s.mode==='invert'){const dome=new THREE.Mesh(new THREE.SphereGeometry(3.7,24,12,0,Math.PI*2,0,Math.PI/2),glow(c,.12));g.add(dome);addRing(g,2.8,c)}
      if(s.mode==='snake'||s.mode==='dragon'){for(let n=0;n<12;n++){const seg=new THREE.Mesh(new THREE.TorusGeometry(.22,.09,7,20),toon(c,.82));seg.position.set(Math.sin(n*.65)*1.4,-1.8+n*.28,.2);seg.rotation.y=n*.5;g.add(seg)}}
      if(s.mode==='lightning'){for(let n=0;n<9;n++){const bolt=new THREE.Mesh(new THREE.BoxGeometry(.06,2.2,.06),glow(c,.9));bolt.position.set((Math.random()-.5)*6,Math.random()*3-1,.1);bolt.rotation.z=(Math.random()-.5)*1.2;g.add(bolt)}}
      if(s.mode==='repair'){for(let n=0;n<5;n++){const arc=new THREE.Mesh(new THREE.TorusGeometry(1.2+n*.35,.045,6,48,Math.PI),glow(c,.7));arc.rotation.x=n*.35;g.add(arc)}}
      if(s.mode==='mirror'){const mir=new THREE.Mesh(new THREE.CircleGeometry(2.2,64),new THREE.MeshBasicMaterial({color:0xbdeeff,transparent:true,opacity:.12,side:THREE.DoubleSide}));mir.position.z=.4;g.add(mir);addRing(g,2.2,c)}
      if(s.mode==='final'){const portal=new THREE.Mesh(new THREE.TorusGeometry(2.6,.22,12,96),glow(c,.8));g.add(portal);const inner=new THREE.Mesh(new THREE.CircleGeometry(2.35,64),glow(0x0b0715,.28));inner.position.z=-.1;g.add(inner)}
    });

    const render=()=>{renderer.render(scene,camera)}; render();
    const onResize=()=>{camera.aspect=innerWidth/innerHeight;camera.updateProjectionMatrix();renderer.setSize(innerWidth,innerHeight)};
    addEventListener('resize',onResize);
    return()=>{removeEventListener('resize',onResize);renderer.dispose();root.removeChild(renderer.domElement);groups.forEach(g=>g.traverse(o=>{const m=o as THREE.Mesh;if(m.geometry)m.geometry.dispose();const mat=m.material as THREE.Material|THREE.Material[];if(Array.isArray(mat))mat.forEach(x=>x.dispose());else if(mat)mat.dispose()}))};
  },[]);

  useEffect(()=>{
    const onScroll=()=>{
      const h=Math.max(1,document.documentElement.scrollHeight-innerHeight);
      const p=window.scrollY/h;
      const next=Math.max(0,Math.min(BANKAIS.length-1,Math.round(p*(BANKAIS.length-1))));
      if(next!==activeRef.current){activeRef.current=next;setActive(next);setImpact(true);window.setTimeout(()=>setImpact(false),300)}
    };
    addEventListener('scroll',onScroll,{passive:true});onScroll();return()=>removeEventListener('scroll',onScroll);
  },[]);

  useEffect(()=>{
    const sections=[...document.querySelectorAll<HTMLElement>('[data-bankai]')];
    const target=sections[active];
    if(target)gsap.to(window,{duration:.85,scrollTo:{y:target,autoKill:true},ease:'power3.out'});
  },[active]);

  return <main className="bankai-page" style={{'--accent':current.hex} as React.CSSProperties}>
    <div ref={mount} className="three-layer"/>
    <div className="anime-grain"/>
    <div className="speed-lines" aria-hidden="true"/>
    <div className={`impact-frame ${impact?'impact-on':''}`} aria-hidden="true"><span>卍</span></div>

    <header className="hud">
      <div className="brand"><span className="kanji">斬</span><div><b>MUSAB WAQAR</b><small>THE BANKAI ARCHIVE</small></div></div>
      <div className="hud-right"><span>{numbers[active]} / {numbers.length}</span><button onClick={()=>document.querySelector('[data-bankai="0"]')?.scrollIntoView({behavior:'smooth'})}>RESTART ARC</button></div>
    </header>

    <aside className="chapter-rail">{BANKAIS.map((b,i)=><button key={b.name} aria-label={`Go to ${b.name}`} className={i===active?'on':''} style={{'--c':b.hex} as React.CSSProperties} onClick={()=>document.querySelector(`[data-bankai="${i}"]`)?.scrollIntoView({behavior:'smooth'})}><span>{numbers[i]}</span></button>)}</aside>

    <section className="hero-spacer" data-bankai="0">
      <div className="hero-copy"><div className="eyebrow">SOUL REAPER // ENGINEER // BUILDER</div><h1>MUSAB<br/><em>WAQAR</em></h1><p>{profile.role} · {profile.university}</p><div className="scroll-prompt">SCROLL TO AWAKEN <span>↓</span></div></div>
    </section>

    {BANKAIS.map((b,i)=><section key={b.name} data-bankai={i} className={`bankai-section ${i===active?'is-active':''}`}>
      <div className="scene-number">{numbers[i]}</div>
      <div className="bankai-copy">
        <div className="label" style={{color:b.hex}}>BANKAI // {b.user}</div>
        <h2>{b.name}</h2>
        <div className="section-title">{b.section}</div>
        <div className="command">{b.command}</div>
        <p className="purpose">{b.purpose}</p>
        <p className="ability"><b>ABILITY</b> {b.ability}</p>
        <div className="project-grid">{b.projects.map((p,j)=><button key={p} onClick={()=>setSelected(p)}><span>0{j+1}</span>{p}<i>↗</i></button>)}</div>
      </div>
      <div className="awakening"><span>BANKAI</span><strong>{b.section}</strong><small>SCROLL // NEXT AWAKENING</small></div>
    </section>)}

    <section className="profile-section" data-bankai="profile">
      <div><div className="label">THE SOUL REAPER BEHIND THE ARCHIVE</div><h2>{profile.name}</h2><p>{profile.motto}</p><div className="bio-lines"><span>{profile.role}</span><span>{profile.university}</span><span>Graduating {profile.graduation}</span></div></div>
      <div className="tech-cloud">{tech.map(t=><span key={t}>{t}</span>)}</div>
      <div className="contact-box"><b>OPEN THE NEXT GATE</b><a href="https://github.com/Musab-Waqar" target="_blank">GITHUB</a><a href="https://musab-waqar-portfolio.vercel.app/" target="_blank">PORTFOLIO</a><a href="https://linkedin.com/in/musab-waqar" target="_blank">LINKEDIN</a></div>
    </section>

    {selected&&<div className="modal-backdrop" onClick={()=>setSelected(null)}><div className="project-modal" onClick={e=>e.stopPropagation()}><button className="close" onClick={()=>setSelected(null)}>×</button><div className="label" style={{color:current.hex}}>BANKAI PROJECT</div><h3>{selected}</h3><p>{current.purpose}</p><p>{current.ability}</p><span>SCROLL BACK TO CONTINUE THE ARC</span></div></div>}

    <style jsx global>{`
      *{box-sizing:border-box}html{scroll-behavior:smooth;background:#030405}body{margin:0;background:#030405;color:#f3f0e9;font-family:Inter,ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif}.bankai-page{--accent:#ff6b00;position:relative;min-height:100vh;overflow-x:hidden;background:radial-gradient(circle at 50% 30%,#10151b 0%,#030405 55%,#000 100%)}
      .three-layer{position:fixed;inset:0;z-index:0;pointer-events:none}.three-layer canvas{display:block;width:100%;height:100%}.anime-grain{position:fixed;inset:0;z-index:2;pointer-events:none;opacity:.13;background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 180 180' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.45'/%3E%3C/svg%3E")}.speed-lines{position:fixed;inset:-20%;z-index:1;pointer-events:none;opacity:.12;background:repeating-conic-gradient(from 0deg,transparent 0 3deg,#fff 3.2deg 3.5deg,transparent 3.7deg 11deg);mask-image:radial-gradient(circle,#000 0 20%,transparent 62%)}
      .impact-frame{position:fixed;inset:0;z-index:10;pointer-events:none;opacity:0;background:#fff;mix-blend-mode:screen}.impact-frame span{position:absolute;left:50%;top:50%;transform:translate(-50%,-50%) scale(0);font-size:16vw;font-weight:1000;color:#000;text-shadow:12px 12px 0 var(--accent)}.impact-frame.impact-on{animation:impact .3s steps(3) both}.impact-frame.impact-on span{animation:impact-symbol .3s cubic-bezier(.2,1.5,.3,1) both}@keyframes impact{0%{opacity:0}12%{opacity:1}32%{opacity:.1}52%{opacity:.9}100%{opacity:0}}@keyframes impact-symbol{0%{transform:translate(-50%,-50%) scale(0)}35%{transform:translate(-50%,-50%) scale(1.15)}100%{transform:translate(-50%,-50%) scale(.9)}}
      .hud{position:fixed;z-index:8;top:0;left:0;right:0;padding:24px 32px;display:flex;justify-content:space-between;align-items:center;background:linear-gradient(#020305dd,transparent);pointer-events:none}.brand{display:flex;gap:12px;align-items:center}.kanji{font-size:32px;color:var(--accent);text-shadow:0 0 20px var(--accent);font-weight:900}.brand b{display:block;font-size:12px;letter-spacing:.25em}.brand small{display:block;color:#777;font-size:8px;letter-spacing:.35em;margin-top:4px}.hud-right{display:flex;gap:18px;align-items:center;color:#888;font-size:10px;letter-spacing:.2em}.hud-right button{pointer-events:auto;background:transparent;color:#aaa;border:1px solid #333;padding:8px 12px;font-size:9px;letter-spacing:.18em}.chapter-rail{position:fixed;right:22px;top:50%;transform:translateY(-50%);z-index:8;display:flex;flex-direction:column;gap:7px}.chapter-rail button{width:22px;height:3px;border:0;background:#333;padding:0;cursor:pointer;transition:.25s}.chapter-rail button span{display:none}.chapter-rail button.on{width:42px;background:var(--c);box-shadow:0 0 15px var(--c)}
      .hero-spacer,.bankai-section,.profile-section{position:relative;z-index:4;min-height:100vh;scroll-snap-align:start}.hero-spacer{display:flex;align-items:center;padding:10vh 10vw}.hero-copy{max-width:760px}.eyebrow,.label{font-size:10px;letter-spacing:.32em;font-weight:800}.hero-copy h1{font-size:clamp(70px,13vw,180px);line-height:.78;margin:20px 0;font-weight:950;letter-spacing:-.07em;text-shadow:8px 8px 0 #000}.hero-copy h1 em{font-style:normal;color:transparent;-webkit-text-stroke:2px #fff}.hero-copy p{max-width:560px;color:#a5a5a5;font-size:14px;letter-spacing:.04em}.scroll-prompt{margin-top:60px;font-size:10px;letter-spacing:.3em;color:#999}.scroll-prompt span{display:inline-block;margin-left:12px;color:var(--accent);font-size:20px}
      .bankai-section{display:flex;align-items:center;padding:12vh 11vw;isolation:isolate}.bankai-copy{width:min(700px,58vw);margin-left:4vw}.scene-number{position:absolute;left:5vw;top:15vh;font-size:12vw;font-weight:1000;color:#fff;opacity:.035;line-height:1}.bankai-copy h2{font-family:Georgia,serif;font-size:clamp(36px,5vw,78px);line-height:.94;margin:14px 0 7px;letter-spacing:-.05em;text-shadow:5px 5px 0 #000}.section-title{font-size:13px;letter-spacing:.35em;font-weight:900;color:#ddd}.command{display:inline-block;margin:20px 0;padding:9px 12px;border-left:3px solid var(--accent);background:#050607b8;color:#ddd;font-family:monospace;font-size:10px;letter-spacing:.08em}.purpose{font-size:18px;line-height:1.55;color:#e7e3da;max-width:650px}.ability{font-size:12px;line-height:1.7;color:#aaa;max-width:620px}.ability b{color:var(--accent);letter-spacing:.15em;margin-right:8px}.project-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:7px;margin-top:30px}.project-grid button{min-height:78px;text-align:left;padding:12px;border:1px solid #252525;background:#050607c9;color:#ddd;cursor:pointer;font-size:11px;transition:.25s}.project-grid button:hover{border-color:var(--accent);transform:translateY(-3px);box-shadow:0 12px 30px #000}.project-grid span{display:block;color:var(--accent);font-size:9px;margin-bottom:10px}.project-grid i{float:right;color:#666}.awakening{position:absolute;right:8vw;bottom:14vh;writing-mode:vertical-rl;display:flex;gap:10px;align-items:center;color:#777}.awakening span{font-size:9px;letter-spacing:.35em;color:var(--accent)}.awakening strong{font-size:11px;letter-spacing:.18em}.awakening small{font-size:7px;letter-spacing:.3em}
      .profile-section{padding:15vh 10vw;display:grid;grid-template-columns:1fr 1fr;gap:60px;align-items:center;background:linear-gradient(180deg,transparent,#07090d 30%,#020305)}.profile-section h2{font-family:Georgia,serif;font-size:clamp(52px,7vw,100px);margin:12px 0}.profile-section p{color:#aaa;max-width:600px}.bio-lines{display:flex;gap:10px;flex-wrap:wrap;margin-top:25px}.bio-lines span,.tech-cloud span{border:1px solid #252525;padding:8px 10px;font-size:9px;letter-spacing:.12em;color:#aaa}.tech-cloud{display:flex;flex-wrap:wrap;gap:7px}.tech-cloud span{color:#ddd}.contact-box{grid-column:1/-1;border-top:1px solid #292929;padding-top:28px;display:flex;gap:18px;align-items:center}.contact-box b{margin-right:auto;font-size:12px;letter-spacing:.25em}.contact-box a{color:#ddd;text-decoration:none;border:1px solid #333;padding:12px 16px;font-size:9px;letter-spacing:.2em}.contact-box a:hover{color:var(--accent);border-color:var(--accent)}
      .modal-backdrop{position:fixed;inset:0;z-index:20;background:#000c;display:grid;place-items:center;padding:20px}.project-modal{position:relative;width:min(620px,92vw);background:#080a0d;border:1px solid var(--accent);box-shadow:0 30px 100px #000;padding:44px}.project-modal h3{font-family:Georgia,serif;font-size:40px;margin:15px 0}.project-modal p{color:#aaa;line-height:1.7}.project-modal span{font-size:8px;letter-spacing:.25em;color:#666}.close{position:absolute;right:15px;top:10px;background:none;border:0;color:#aaa;font-size:28px;cursor:pointer}
      @media(max-width:800px){.hud{padding:18px}.chapter-rail{right:9px}.hero-spacer,.bankai-section{padding:15vh 9vw}.bankai-copy{width:100%;margin-left:0}.awakening{display:none}.project-grid{grid-template-columns:1fr}.profile-section{grid-template-columns:1fr;padding:14vh 9vw}.contact-box{flex-wrap:wrap}.contact-box b{width:100%}.speed-lines{opacity:.08}.hero-copy h1{text-shadow:4px 4px 0 #000}}
      @media(prefers-reduced-motion:reduce){html{scroll-behavior:auto}.impact-frame{display:none}.project-grid button{transition:none}}
    `}</style>
  </main>;
}
