export type BankaiScene = {
  id: number;
  name: string;
  user: string;
  theme: string;
  command: string;
  purpose: string;
  ability: string;
  mode: string;
  accent: number;
  hex: string;
  projects: string[];
};

export const BANKAI_SCENES: BankaiScene[] = [
  {id:0,name:'MAIN PORTAL',user:'MUSAB WAQAR',theme:'IDENTITY / AWAKENING',command:'ENTER BANKAI',purpose:'Co-Founder & CTO at NanoCoders. BS Computer Science at FAST NUCES Peshawar.',ability:'A technical world built around foundations, mechanisms, implementation, optimization and real-world deployment.',mode:'portal',accent:0xff6b00,hex:'#ff6b00',projects:['Backend Engineering','AI / Machine Learning','Knowledge Graphs','Distributed Systems']},
  {id:1,name:'TENSA ZANGETSU',user:'ICHIGO KUROSAKI',theme:'SPEED / PERFORMANCE',command:'BANKAI: TENSA ZANGETSU',purpose:'High-performance engineering: backend systems, algorithms, APIs and real-time execution.',ability:'Velocity is disciplined execution: remove bottlenecks, shorten paths and make systems respond.',mode:'speed',accent:0xff6b00,hex:'#ff6b00',projects:['Backend Engineering','Performance Optimization','Real-time Systems']},
  {id:2,name:'TRUE BANKAI',user:'ICHIGO KUROSAKI',theme:'HYBRID SYSTEMS',command:'TRUE BANKAI // HYBRID',purpose:'AI, backend infrastructure and interfaces working as one system.',ability:'Hybrid architecture connects models, data, services and user-facing systems.',mode:'hybrid',accent:0xc8b8ff,hex:'#c8b8ff',projects:['AI Systems','RAG','Full-stack Engineering']},
  {id:3,name:'ZANKA NO TACHI',user:'GENRYŪSAI YAMAMOTO',theme:'LEGACY / INFRASTRUCTURE',command:'BANKAI: ZANKA NO TACHI',purpose:'Research, infrastructure, security and lessons that compound over time.',ability:'East removes technical debt, West protects the system, South preserves accumulated work, North points toward research.',mode:'fire',accent:0xff4b21,hex:'#ff4b21',projects:['Systems Research','Infrastructure','Security']},
  {id:4,name:'KATEN KYŌKOTSU',user:'SHUNSUI KYŌRAKU',theme:'STORY / CASE STUDIES',command:'BANKAI: KATEN KYŌKOTSU',purpose:'Technical decisions become readable stories: constraint, conflict, choice and lesson.',ability:'Four acts turn engineering experience into case studies instead of disconnected claims.',mode:'story',accent:0x9b7dff,hex:'#9b7dff',projects:['Case Studies','Technical Decisions','Lessons Learned']},
  {id:5,name:'SENBONZAKURA',user:'BYAKUYA KUCHIKI',theme:'PRECISION / ARCHITECTURE',command:'BANKAI: SENBONZAKURA KAGEYOSHI',purpose:'Clean code, algorithms, testing and maintainable architecture.',ability:'Many small decisions become one precise, coherent system.',mode:'petals',accent:0xff8fd5,hex:'#ff8fd5',projects:['Algorithms','Architecture','Testing & Quality']},
  {id:6,name:'DAIGUREN HYŌRINMARU',user:'TŌSHIRŌ HITSUGAYA',theme:'TIME / OPTIMIZATION',command:'BANKAI: DAIGUREN HYŌRINMARU',purpose:'Planning, deadlines, optimization and learning progression.',ability:'Time becomes a visible engineering constraint instead of an invisible pressure.',mode:'ice',accent:0x72d9ff,hex:'#72d9ff',projects:['Optimization','Project Planning','Learning Progression']},
  {id:7,name:'KONJIKI ASHISOGI JIZŌ',user:'MAYURI KUROTSUCHI',theme:'EXPERIMENTATION / R&D',command:'BANKAI: KONJIKI ASHISOGI JIZŌ',purpose:'Experimental algorithms, AI prototypes, graph tooling and unusual research ideas.',ability:'Prototype first, measure honestly, then decide whether the experiment deserves a system.',mode:'lab',accent:0xd7ff3f,hex:'#d7ff3f',projects:['Experimental AI','Graph Tooling','Research Prototypes']},
  {id:8,name:'MINAZUKI',user:'RETSU UNOHANA',theme:'RESTORATION / RESILIENCE',command:'BANKAI: MINAZUKI',purpose:'Infrastructure, backups, monitoring and recovery-oriented engineering.',ability:'Reliability is the ability to recover, observe failure and restore service.',mode:'acid',accent:0x76ffb1,hex:'#76ffb1',projects:['Monitoring','Backups','Reliability']},
  {id:9,name:'KOKUJŌ TENGEN MYŌŌ',user:'SAJIN KOMAMURA',theme:'SCALE / DISTRIBUTED SYSTEMS',command:'BANKAI: KOKUJŌ TENGEN MYŌŌ',purpose:'Distributed systems and large-scale architecture.',ability:'Scale changes the engineering problem: coordination, failure domains, throughput and consistency.',mode:'giant',accent:0xff3030,hex:'#ff3030',projects:['Distributed Systems','Apache Kafka','Docker / Services']},
  {id:10,name:'KAMISHINI NO YARI',user:'GIN ICHIMARU',theme:'DISTANCE / NETWORKS',command:'BANKAI: KAMISHINI NO YARI',purpose:'Service-to-service communication, queues and distributed data paths.',ability:'A long path can still be engineered as a precise interface.',mode:'spear',accent:0xe8f8ff,hex:'#e8f8ff',projects:['Message Queues','gRPC Concepts','Distributed Data']},
  {id:11,name:'SUZUMUSHI TSUISHIKI',user:'KANAME TŌSEN',theme:'DATA / SENSORY ANALYTICS',command:'BANKAI: SUZUMUSHI TSUISHIKI',purpose:'Pattern recognition, analytics, data mining and explainability.',ability:'Suppress noise until the signal becomes useful to a decision.',mode:'void',accent:0x6578ff,hex:'#6578ff',projects:['Machine Learning','Analytics','Pattern Recognition']},
  {id:12,name:'KINSHARA BUTŌDAN',user:'RŌJŪRŌ “ROSE” ŌTORIBASHI',theme:'CREATIVE DIRECTION',command:'BANKAI: KINSHARA BUTŌDAN',purpose:'Interactive design, motion, UI/UX and visual communication.',ability:'Engineering becomes an experience when interaction, motion and hierarchy work together.',mode:'gold',accent:0xffcf6b,hex:'#ffcf6b',projects:['UI / UX','Design Systems','Interactive Experiences']},
  {id:13,name:'TEKKEN TACHIKAZE',user:'KENSEI MUGURUMA',theme:'RAW PERFORMANCE',command:'BANKAI: TEKKEN TACHIKAZE',purpose:'Profiling, benchmarks and systematic removal of bottlenecks.',ability:'Measure first. Tune second. Repeat until the system behaves differently.',mode:'force',accent:0xff5a3d,hex:'#ff5a3d',projects:['Benchmarks','Algorithm Tuning','Runtime Performance']},
  {id:14,name:'SŌŌ ZABIMARU',user:'RENJI ABARAI',theme:'GROWTH / SKILLS',command:'BANKAI: SŌŌ ZABIMARU',purpose:'Education, internships, projects and increasing technical range.',ability:'Skills compound through deliberate practice and increasingly difficult systems.',mode:'snake',accent:0xb979ff,hex:'#b979ff',projects:['FAST NUCES','Internships','Technical Growth']},
  {id:15,name:'RYŪMON HŌZUKUMARU',user:'IKKAKU MADARAME',theme:'ACCUMULATION',command:'BANKAI: RYŪMON HŌZUKUMARU',purpose:'Long-running work and compounding engineering capability.',ability:'The crest fills one milestone at a time.',mode:'dragon',accent:0xe74343,hex:'#e74343',projects:['Long-term Projects','Compounding Skills','Persistent Work']},
  {id:16,name:'KŌŌ MONSHŌ',user:'CHŌJIRŌ SASAKIBE',theme:'LEADERSHIP',command:'BANKAI: KŌŌ MONSHŌ',purpose:'NanoCoders, team projects, coordination and strategic planning.',ability:'Leadership is architecture for people: roles, interfaces, ownership and decisions.',mode:'lightning',accent:0xffe45c,hex:'#ffe45c',projects:['NanoCoders','Team Projects','Strategic Planning']},
  {id:17,name:'HAKKA NO TOGAME',user:'RUKIA KUCHIKI',theme:'DECISIONS / TRANSFORMATION',command:'BANKAI: HAKKA NO TOGAME',purpose:'Difficult technical decisions, course corrections and deliberate simplification.',ability:'Sometimes progress means freezing the old path long enough to choose a better one.',mode:'white',accent:0xdffaff,hex:'#dffaff',projects:['Course Corrections','Trade-offs','Simplification']},
  {id:18,name:'KANNONBIRAKI BENIHIME ARATAME',user:'KISUKE URAHARA',theme:'PROBLEM SOLVING',command:'BANKAI: KANNONBIRAKI BENIHIME ARATAME',purpose:'Debugging, refactoring and system redesign.',ability:'Open the system, find the boundary that failed, reconstruct the smallest useful part.',mode:'repair',accent:0xff7652,hex:'#ff7652',projects:['Debugging','Refactoring','Architecture Fixes']},
  {id:19,name:'SAKAHADĒ',user:'SHINJI HIRAKO',theme:'PERSPECTIVE',command:'INVERSION // REFRAME THE PROBLEM',purpose:'Unconventional solutions and alternative architecture thinking.',ability:'Invert the assumptions before optimizing the implementation.',mode:'invert',accent:0xffc45c,hex:'#ffc45c',projects:['Alternative Designs','Blue-sky Thinking','Paradigm Shifts']},
  {id:20,name:'SHINKA HAKKŌ KEN',user:'NANAO ISE',theme:'SECURITY / PROTECTION',command:'DIVINE EIGHT MIRROR SWORD',purpose:'Secure architecture, authentication, encryption and protection of invariants.',ability:'Security is part of architecture, not a final decorative layer.',mode:'mirror',accent:0xbdeeff,hex:'#bdeeff',projects:['Security','Encryption','Defensive Architecture']},
  {id:21,name:'BANKAI // KENPACHI',user:'KENPACHI ZARAKI',theme:'RAW IMPACT',command:'BANKAI // UNTAMED',purpose:'The strongest verified projects and the work with the greatest demonstrated impact.',ability:'Intensity belongs at the end of the journey: fewer claims, stronger evidence.',mode:'berserk',accent:0xff1738,hex:'#ff1738',projects:['VisionGuard3WD','Urdu Shayari Compiler','High-impact Builds']},
  {id:22,name:'RESURRECCIÓN // FINAL PORTAL',user:'MUSAB WAQAR',theme:'CONTACT / NEXT ARC',command:'OPEN THE GATE',purpose:'Research, engineering and collaboration opportunities.',ability:'The portfolio ends where the next system begins.',mode:'final',accent:0xffd166,hex:'#ffd166',projects:['GitHub','Research','Let’s Build Something']},
];

export const PROFILE = {name:'Musab Waqar',role:'Co-Founder & CTO at NanoCoders',education:'BS Computer Science · FAST NUCES Peshawar',graduation:'Expected June 2027',motto:'Foundation → Mechanism → Implementation → Optimization → Real-world usage'};
export const TECH = ['C','C++','Python','TypeScript','React','Next.js','Docker','Apache Kafka','Spark','PySpark','Hadoop','NLP','RAG','Neo4j','Apache AGE','PostgreSQL','Linux'];
export const PROJECTS = [
 {name:'Linear_regression',status:'COMPLETED',description:'C++17 + Qt 6 desktop linear regression tool with custom least-squares math, live charting and prediction.',stack:['C++17','Qt 6','CMake'],url:'https://github.com/Musab-Waqar/Linear_regression'},
 {name:'urdu_compiler_poetry',status:'ACTIVELY DEVELOPED',description:'C++20 backend and PyQt6 frontend for Urdu poetry meter analysis using a compiler-style Lexer → Syllable Analyzer → Parser → Semantic Analyzer → Behr Matcher pipeline.',stack:['C++20','PyQt6','Compiler Construction'],url:'https://github.com/Musab-Waqar/urdu_compiler_poetry'},
 {name:'VisionGuard3WD',status:'PROJECT',description:'Computer-vision-oriented project repository from Musab Waqar’s GitHub portfolio.',stack:['Computer Vision'],url:'https://github.com/Musab-Waqar/VisionGuard3WD'},
 {name:'portfolio',status:'COMPLETED',description:'Previous portfolio implementation and source of professional context for the current Bankai portfolio.',stack:['Web','Portfolio'],url:'https://github.com/Musab-Waqar/portfolio'},
 {name:'Jugaadu-Flex-2',status:'PROJECT',description:'Public project repository from Musab Waqar’s GitHub profile.',stack:['Software Project'],url:'https://github.com/Musab-Waqar/Jugaadu-Flex-2'},
 {name:'tab_workspace_FMA',status:'PROJECT',description:'Public browser/workspace project repository from Musab Waqar’s GitHub profile.',stack:['Web'],url:'https://github.com/Musab-Waqar/tab_workspace_FMA'},
];

export const EXPERIENCE = [
 'Co-Founder & CTO · NanoCoders',
 'NUSyS Lab · Internship',
 'NUtomate · Knowledge Graph & AI Applications',
 'Database Quality Assurance Internship · MySQL / PostgreSQL / MariaDB / ProxySQL / ColumnStore / Galera / Apache Doris',
 'Italian Kitchen · Kitchen customization/design application'
];
