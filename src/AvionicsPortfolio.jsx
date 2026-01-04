import React, { useState, useEffect } from "react";
import {
    Target,
    CheckCircle2,
    User,
    ChevronRight,
    Play,
    ArrowLeft,
    Filter,
    ExternalLink
} from "lucide-react";

/* =========================
   DATA
========================= */

const data = {
    profile: {
        name: "CHAYAN AGARWAL",
        role: "DATA SCIENTIST",
        base: "BLR",
        sqawk: "2025",
        freq: "124.85"
    },
    executive: {
        kpis: [
            { id: "REV", val: "+15%", lbl: "REVENUE UPLIFT", color: "text-green-500", bar: "15%" },
            { id: "SPD", val: "+25%", lbl: "PROCESS SPEED", color: "text-cyan-400", bar: "25%" },
            { id: "ACC", val: "100%", lbl: "PAYROLL ACCURACY", color: "text-amber-400", bar: "100%" },
            { id: "PS", val: "99.7%", lbl: "PROBLEM SOLVING", color: "text-magenta-500", bar: "99%" }
        ],
        wins: [
            { id: "WIN-01", text: "BUILT AIRLINE REC ENGINE", sub: "GEN-AI / TENSORFLOW" },
            { id: "WIN-02", text: "REAL-TIME PROD MONITORING", sub: "GE AEROSPACE / TABLEAU" }
        ]
    },
    system: {
        skills: ["PYTHON", "SQL", "TABLEAU", "AWS/GCP", "GEN-AI", "SCIKIT"],
        exp: [
            { role: "DATA SCI INT", org: "BRITISH AIRWAYS", time: "JUN25-AUG25", stat: "VIRTUAL", color: "text-cyan-400" },
            { role: "DATA ENG INT", org: "GE AEROSPACE", time: "AUG23-OCT23", stat: "VIRTUAL", color: "text-cyan-400" }
        ],
        projects: [
            {
                id: "CST-01",
                name: "FEEDBACK INSIGHT ENG",
                cat: "CUSTOMER EXP",
                stack: "GEN-AI/NLP",
                desc: "Leveraged LLMs to analyze thousands of unstructured customer Feedback Forms. Automated summarization and sentiment tagging, reducing analysis time from weeks to hours.",
                tech: ["Generative AI", "NLP", "Sentiment Analysis", "Prompt Engineering"],
                demo: "#"
            },
            {
                id: "CST-02",
                name: "IFE VOICE ASSISTANT",
                cat: "CUSTOMER EXP",
                stack: "GEN-AI/NLU",
                desc: "Developed a voice-controlled In-Flight Entertainment system prototype allowing passengers to control media and service requests via natural language.",
                tech: ["Speech-to-Text", "NLU", "Python", "React"],
                demo: "#"
            },
            {
                id: "CST-03",
                name: "CHURN PREDICTION",
                cat: "CUSTOMER EXP",
                stack: "ML/PYTHON",
                desc: "Built a predictive model to identify high-risk churn customers based on usage patterns and support interactions, enabling proactive retention strategies.",
                tech: ["Scikit-learn", "XGBoost", "Pandas", "AWS SageMaker"],
                demo: "#"
            },
            {
                id: "CST-04",
                name: "MEAL RECOMMENDATION",
                cat: "CUSTOMER EXP",
                stack: "ML/DJANGO",
                desc: "Personalized in-flight meal recommendation engine based on passenger dietary preferences and past flight history.",
                tech: ["Collaborative Filtering", "Django", "PostgreSQL"],
                demo: "#"
            },
            {
                id: "CST-05",
                name: "A350 PAX SATISFACTION",
                cat: "CUSTOMER EXP",
                stack: "SQL/POWER BI",
                desc: "Comprehensive dashboard analyzing passenger satisfaction metrics specific to the A350 fleet, correlating seat configuration with NPS scores.",
                tech: ["SQL", "Power BI", "Data Visualization"],
                demo: "#"
            },
            {
                id: "CST-06",
                name: "DEMAND FORECASTING",
                cat: "CUSTOMER EXP",
                stack: "TIME-SERIES",
                desc: "Time-series forecasting model to predict seasonal demand for specific routes, optimizing crew allocation and inventory.",
                tech: ["ARIMA", "Prophet", "Python"],
                demo: "#"
            }
        ]
    },
    stalker: {
        bio: "CAPTAIN AT SCALER CC x BLR. FINANCE BG TURNED DATA SCIENTIST.",
        socials: [
            { label: "LINKEDIN", link: "https://www.linkedin.com/" },
            { label: "EMAIL", link: "mailto:test@email.com" },
            { label: "GITHUB", link: "https://github.com/" }
        ],
        hobbies: ["AVIATION", "FINANCE", "COMMUNITY"]
    }
};

/* =========================
   UTILS
========================= */

const CurrentTime = () => {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const t = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(t);
    }, []);

    return (
        <span className="text-green-500 font-mono">
            {time.toLocaleTimeString("en-US", { hour12: false })} <span className="text-xs">Z</span>
        </span>
    );
};

/* =========================
   HEADER
========================= */

const AvionicsHeader = () => (
    <div className="bg-black border-b border-gray-800 p-3 flex justify-between text-cyan-400 sticky top-0 z-50">
        <div className="flex gap-6">
            <div className="bg-gray-900 border border-gray-700 px-3 py-1 rounded-sm">
                <div className="text-[10px] text-gray-500 uppercase tracking-wider">COM 1</div>
                <div className="text-white font-bold font-mono text-xl">{data.profile.freq}</div>
            </div>
            <div className="bg-gray-900 border border-gray-700 px-3 py-1 rounded-sm">
                <div className="text-[10px] text-gray-500 uppercase tracking-wider">SQAWK</div>
                <div className="text-white font-bold font-mono text-xl">{data.profile.sqawk}</div>
            </div>
            <div className="hidden md:block pt-2">
                <div className="text-[10px] text-gray-500 uppercase tracking-wider">FLIGHT MODE</div>
                <div className="text-green-500 font-bold font-mono text-sm tracking-widest">
                    LNAV / VNAV / CMD
                </div>
            </div>
        </div>
        <div className="text-right flex flex-col justify-center">
            <div className="text-2xl font-bold">
                <CurrentTime />
            </div>
            <div className="text-xs text-cyan-600 font-bold tracking-widest">{data.profile.base} VOR</div>
        </div>
    </div>
);

/* =========================
   PAGES
========================= */

const MFDPage = ({ mode }) => {
    // State for Project Database in SYSTEM mode
    const [activeProject, setActiveProject] = useState(null);

    // Reset project view when mode changes
    useEffect(() => {
        setActiveProject(null);
    }, [mode]);

    if (mode === "EXEC") {
        return (
            <div className="p-6 overflow-y-auto h-full">
                <h2 className="text-magenta-500 text-3xl font-bold mb-6 tracking-widest">EXEC SUMMARY</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                    {data.executive.kpis.map(k => (
                        <div key={k.id} className="bg-gray-900/50 p-4 border border-gray-700 relative overflow-hidden group hover:border-cyan-500 transition-colors">
                            <div className="absolute top-0 right-0 p-1 opacity-20 group-hover:opacity-40 transition-opacity">
                                <Target size={40} />
                            </div>
                            <div className="text-xs text-gray-400 mb-1 tracking-wider">{k.lbl}</div>
                            <div className={`text-3xl font-bold font-mono ${k.color}`}>{k.val}</div>
                            <div className="h-1 bg-gray-800 mt-3 w-full">
                                <div className={`h-full ${k.color.replace('text-', 'bg-')}`} style={{ width: k.bar }} />
                            </div>
                        </div>
                    ))}
                </div>

                <div className="bg-black border border-gray-700 p-6">
                    <h3 className="text-cyan-400 font-bold mb-6 flex items-center gap-2 tracking-widest">
                        <Target size={18} /> MISSION WINS
                    </h3>
                    <div className="space-y-2">
                        {data.executive.wins.map(w => (
                            <div key={w.id} className="flex justify-between items-center border-b border-gray-900 py-3 hover:bg-gray-900/30 px-2 transition-colors">
                                <div>
                                    <div className="text-white font-bold tracking-wide">{w.text}</div>
                                    <div className="text-xs text-gray-500 mt-0.5">{w.sub}</div>
                                </div>
                                <CheckCircle2 className="text-green-500" size={20} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    if (mode === "SYSTEM") {
        return (
            <div className="h-full flex flex-col p-4 md:p-6 overflow-hidden">
                <div className="flex justify-between items-end mb-4 border-b border-gray-800 pb-2">
                    <h2 className="text-3xl font-bold tracking-widest">
                        <span className="text-cyan-500">SYSTEM STATUS</span>
                        <span className="text-gray-600 text-lg ml-2">/ PERSONNEL</span>
                    </h2>
                    <div className="text-cyan-600 font-mono text-sm">PG 1/1</div>
                </div>

                <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-6 overflow-hidden">
                    {/* LEFT PANEL: FLIGHT LOG & EQUIPMENT */}
                    <div className="lg:col-span-4 flex flex-col gap-6 overflow-y-auto pr-2">
                        {/* Flight Log */}
                        <div>
                            <h3 className="text-gray-400 font-bold text-xs tracking-widest mb-4 uppercase">Flight Log</h3>
                            <div className="space-y-3">
                                {data.system.exp.map((job, i) => (
                                    <div key={i} className="bg-gray-900/40 border-l-2 border-cyan-500/30 p-4 hover:border-cyan-400 hover:bg-gray-900/60 transition-all cursor-default group">
                                        <div className="flex justify-between items-start mb-2">
                                            <div className="font-bold text-cyan-100 font-mono tracking-wide group-hover:text-white">{job.role}</div>
                                            {job.stat === "COMPLETED" && <div className="text-[10px] text-green-500 font-bold tracking-wider">COMPLETED</div>}
                                            {job.stat === "VIRTUAL" && <div className="text-[10px] text-green-500 font-bold tracking-wider opacity-70">VIRTUAL</div>}
                                        </div>
                                        <div className="text-xs text-gray-400 uppercase tracking-wider mb-2">{job.org}</div>
                                        <div className="text-[10px] text-cyan-700 font-mono">{job.time}</div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Equipment */}
                        <div>
                            <h3 className="text-gray-400 font-bold text-xs tracking-widest mb-4 uppercase">Equipment</h3>
                            <div className="flex flex-wrap gap-2">
                                {data.system.skills.map(skill => (
                                    <span key={skill} className="bg-gray-800/50 border border-gray-700 text-cyan-500 text-[10px] font-bold px-3 py-2 rounded-sm tracking-wider uppercase hover:border-cyan-500/50 transition-colors">
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* RIGHT PANEL: PROJECT DATABASE */}
                    <div className="lg:col-span-8 bg-black border border-gray-800 rounded-sm relative flex flex-col overflow-hidden">
                        {/* Header Line */}
                        <div className="flex justify-between items-center p-3 border-b border-gray-800 bg-gray-900/20">
                            <h3 className="text-green-500 font-bold font-mono tracking-widest uppercase text-sm">
                                {activeProject ? `CST-${activeProject.id.split('-').pop()} // ${activeProject.cat}` : "PROJECT DATABASE"}
                            </h3>
                            <div className="flex gap-2">
                                {!activeProject && (
                                    <>
                                        <button className="flex items-center gap-1 bg-cyan-900/20 border border-cyan-800/50 text-cyan-400 px-3 py-1 text-[10px] uppercase tracking-wider hover:bg-cyan-900/40">
                                            <Filter size={10} /> Customer Exp
                                        </button>
                                        <button className="flex items-center gap-1 bg-cyan-900/20 border border-cyan-800/50 text-cyan-400 px-3 py-1 text-[10px] uppercase tracking-wider hover:bg-cyan-900/40">
                                            All
                                        </button>
                                    </>
                                )}
                                {activeProject && (
                                    <button
                                        onClick={() => setActiveProject(null)}
                                        className="flex items-center gap-2 bg-gray-800 text-white px-4 py-1.5 text-xs font-bold uppercase tracking-wider hover:bg-gray-700 transition-colors"
                                    >
                                        <ArrowLeft size={12} /> Return to List
                                    </button>
                                )}
                            </div>
                        </div>

                        {/* CONTENT AREA */}
                        <div className="flex-1 overflow-y-auto md:p-0">
                            {!activeProject ? (
                                /* LIST VIEW */
                                <table className="w-full text-left border-collapse">
                                    <thead className="bg-gray-900/50 text-[10px] text-gray-500 font-bold uppercase tracking-wider sticky top-0">
                                        <tr>
                                            <th className="p-4 border-b border-gray-800">ID</th>
                                            <th className="p-4 border-b border-gray-800">Project Name</th>
                                            <th className="p-4 border-b border-gray-800">Category</th>
                                            <th className="p-4 border-b border-gray-800 text-right">Stack</th>
                                        </tr>
                                    </thead>
                                    <tbody className="text-xs font-mono">
                                        {data.system.projects.map((proj) => (
                                            <tr
                                                key={proj.id}
                                                onClick={() => setActiveProject(proj)}
                                                className="border-b border-gray-800/50 hover:bg-cyan-900/10 hover:text-cyan-400 cursor-pointer transition-colors group"
                                            >
                                                <td className="p-4 text-gray-500 group-hover:text-cyan-600">{proj.id}</td>
                                                <td className="p-4 font-bold max-w-[150px] truncate">{proj.name}</td>
                                                <td className="p-4 text-gray-400 uppercase">{proj.cat}</td>
                                                <td className="p-4 text-right text-gray-400 uppercase group-hover:text-cyan-400">
                                                    {proj.stack}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            ) : (
                                /* DETAIL VIEW */
                                <div className="p-6 h-full flex flex-col">
                                    <h1 className="text-2xl md:text-3xl font-bold text-white mb-6 uppercase tracking-wider">
                                        {activeProject.name}
                                    </h1>

                                    {/* Video Placeholder */}
                                    <div className="w-full aspect-video bg-gray-900/50 border border-gray-700 mb-8 flex flex-col items-center justify-center text-gray-600 relative overflow-hidden group">
                                        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10"></div>
                                        <div className="z-10 flex flex-col items-center">
                                            <Play size={48} className="mb-4 text-gray-700 group-hover:text-cyan-500 transition-colors" />
                                            <span className="font-mono text-xs tracking-widest">VIDEO FEED OFFLINE (DEMO)</span>
                                        </div>
                                        {/* Scanlines effect */}
                                        <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-0 bg-[length:100%_2px,3px_100%] pointer-events-none"></div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        {/* Description */}
                                        <div>
                                            <h4 className="flex items-center gap-2 text-cyan-500 font-bold text-xs uppercase tracking-widest mb-3">
                                                <ChevronRight size={14} /> Mission Description
                                            </h4>
                                            <p className="text-gray-400 text-sm leading-relaxed font-mono">
                                                {activeProject.desc}
                                            </p>
                                        </div>

                                        {/* Tech Stack */}
                                        <div>
                                            <h4 className="flex items-center gap-2 text-cyan-500 font-bold text-xs uppercase tracking-widest mb-3">
                                                <ChevronRight size={14} /> Tech Stack
                                            </h4>
                                            <div className="flex flex-wrap gap-2 mb-6">
                                                {activeProject.tech.map(t => (
                                                    <span key={t} className="px-2 py-1 bg-gray-900 border border-gray-700 text-[10px] text-green-500 font-mono rounded-sm">
                                                        {t}
                                                    </span>
                                                ))}
                                            </div>

                                            <a
                                                href={activeProject.demo}
                                                className="inline-flex items-center gap-2 bg-green-900/20 border border-green-700/50 text-green-500 px-4 py-2 text-xs font-bold uppercase tracking-widest hover:bg-green-900/40 hover:border-green-500 transition-all"
                                            >
                                                Launch Demo <ExternalLink size={12} />
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (mode === "COMM") {
        return (
            <div className="p-6 h-full flex items-center justify-center">
                <div className="max-w-2xl w-full grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="bg-black border border-gray-700 p-8 text-center flex flex-col items-center justify-center relative group hover:border-amber-500 transition-colors">
                        <User size={64} className="text-amber-500 mb-4" />
                        <div className="text-2xl font-bold text-white mb-2 tracking-widest">{data.profile.name}</div>
                        <div className="text-xs text-gray-500 font-mono">{data.stalker.bio}</div>
                    </div>

                    <div className="space-y-4 flex flex-col justify-center">
                        <h3 className="text-cyan-500 font-bold text-sm tracking-widest mb-2 uppercase border-b border-gray-800 pb-2">Encrypted Channels</h3>
                        {data.stalker.socials.map(s => (
                            <a
                                key={s.label}
                                href={s.link}
                                target="_blank"
                                rel="noreferrer"
                                className="flex justify-between items-center bg-gray-900/50 border border-gray-700 p-4 hover:bg-gray-900 hover:border-amber-500/50 hover:text-amber-400 transition-all group"
                            >
                                <span className="font-bold tracking-wider text-xs">{s.label}</span>
                                <ExternalLink size={14} className="text-gray-600 group-hover:text-amber-500" />
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    return null;
};

/* =========================
   NAV PANEL
========================= */

const NavPanel = ({ mode, setMode }) => (
    <div className="bg-black border-t border-gray-800 p-2 flex justify-center gap-2">
        {["EXEC", "SYSTEM", "COMM"].map(m => (
            <button
                key={m}
                onClick={() => setMode(m)}
                className={`
                    px-8 py-3 font-bold text-sm tracking-widest uppercase transition-all
                    ${mode === m
                        ? "bg-cyan-900/30 text-cyan-400 border-t-2 border-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.3)]"
                        : "bg-gray-900 text-gray-600 border-t-2 border-transparent hover:bg-gray-800 hover:text-gray-400"
                    }
                `}
            >
                {m}
            </button>
        ))}
    </div>
);

/* =========================
   ROOT COMPONENT
========================= */

export default function AvionicsPortfolio() {
    const [mode, setMode] = useState("EXEC");
    const [boot, setBoot] = useState(true);

    useEffect(() => {
        const t = setTimeout(() => setBoot(false), 2000);
        return () => clearTimeout(t);
    }, []);

    if (boot) {
        return (
            <div className="fixed inset-0 bg-black flex flex-col items-center justify-center text-cyan-500 z-50">
                <div className="text-4xl font-mono animate-pulse tracking-widest font-bold">AVIONICS BOOT...</div>
                <div className="mt-4 text-xs font-mono text-cyan-800">SYSTEM CHECK: OK</div>
            </div>
        );
    }

    return (
        <div className="h-screen w-screen bg-black text-white font-sans flex flex-col overflow-hidden selection:bg-cyan-500/30 selection:text-cyan-100">
            {/* BACKGROUND GRID */}
            <div className="fixed inset-0 pointer-events-none z-0 opacity-20"
                style={{
                    backgroundImage: `
                        linear-gradient(rgba(34, 211, 238, 0.1) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(34, 211, 238, 0.1) 1px, transparent 1px)
                    `,
                    backgroundSize: '40px 40px'
                }}
            />

            <AvionicsHeader />

            <main className="flex-1 relative z-10 overflow-hidden">
                <MFDPage mode={mode} />
            </main>

            <NavPanel mode={mode} setMode={setMode} />
        </div>
    );
}