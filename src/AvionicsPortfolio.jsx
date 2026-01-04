import React, { useState, useEffect } from "react";
import {
    Target,
    CheckCircle2,
    User
} from "lucide-react";

/* =========================
   DATA (plain JS objects)
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
            { id: "WIN-02", text: "AUTOMATED CZECH PAYROLL", sub: "AMAZON CLIENT / ADECCO" },
            { id: "WIN-03", text: "REAL-TIME PROD MONITORING", sub: "GE AEROSPACE / TABLEAU" }
        ]
    },
    hr: {
        skills: ["PYTHON", "SQL", "TABLEAU", "AWS/GCP", "GEN-AI", "SCIKIT"],
        categories: ["ALL", "MAINTENANCE", "LOGISTICS", "REVENUE", "CUSTOMER EXP", "FLIGHT OPS", "AIRPORT OPS", "STRATEGY", "SIMULATORS", "CREW MANAGEMENT", "CVR/FDR"],
        stackFilters: ["ALL", "PYTHON", "SQL", "GEN-AI", "TABLEAU", "POWER BI", "ML", "SPARK", "SIMULATION", "ANOMALY DETECTION"],
        exp: [
            { role: "OPS ANALYST", org: "ADECCO (AMAZON)", time: "AUG23-FEB24", stat: "COMPLETED" },
            { role: "DATA SCI INT", org: "BRITISH AIRWAYS", time: "JUN25-AUG25", stat: "VIRTUAL" },
            { role: "DATA ENG INT", org: "GE AEROSPACE", time: "AUG23-OCT23", stat: "VIRTUAL" }
        ],
        projects: [
            {
                id: "MNT-01",
                name: "ENGINE PDM & RUL EST",
                cat: "MAINTENANCE",
                stack: "ML/PYTHON",
                desc: "Predictive maintenance on turbofan engines using RUL estimation.",
                fullSkills: ["Python", "XGBoost", "Scikit-learn"],
                demo: "N/A"
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
        <span className="text-green-500">
            {time.toLocaleTimeString("en-US", { hour12: false })} <span className="text-xs">Z</span>
        </span>
    );
};

/* =========================
   HEADER
========================= */

const AvionicsHeader = () => (
    <div className="bg-black border-b border-gray-800 p-3 flex justify-between text-cyan-400">
        <div className="flex gap-6">
            <div>
                <div className="text-xs text-gray-400">COMM 1</div>
                <div className="text-white font-bold">{data.profile.freq}</div>
            </div>
            <div>
                <div className="text-xs text-gray-400">SQAWK</div>
                <div className="text-white font-bold">{data.profile.sqawk}</div>
            </div>
        </div>
        <div className="text-right">
            <CurrentTime />
            <div className="text-xs text-magenta-500">{data.profile.base} VOR</div>
        </div>
    </div>
);

/* =========================
   MAIN PAGE
========================= */

const MFDPage = ({ mode }) => {
    if (mode === "EXEC") {
        return (
            <div className="p-6">
                <h2 className="text-magenta-500 text-3xl font-bold mb-6">EXEC SUMMARY</h2>

                <div className="grid grid-cols-4 gap-4 mb-8">
                    {data.executive.kpis.map(k => (
                        <div key={k.id} className="bg-gray-900 p-4 border border-gray-700">
                            <div className="text-xs text-gray-400">{k.lbl}</div>
                            <div className={`text-3xl font-bold ${k.color}`}>{k.val}</div>
                            <div className="h-1 bg-gray-800 mt-2">
                                <div className="h-full bg-green-500" style={{ width: k.bar }} />
                            </div>
                        </div>
                    ))}
                </div>

                <div className="bg-black border border-gray-700 p-6">
                    <h3 className="text-cyan-400 font-bold mb-4 flex items-center gap-2">
                        <Target size={16} /> MISSION WINS
                    </h3>
                    {data.executive.wins.map(w => (
                        <div key={w.id} className="flex justify-between border-b border-gray-800 py-2">
                            <div>
                                <div className="text-white font-bold">{w.text}</div>
                                <div className="text-xs text-gray-400">{w.sub}</div>
                            </div>
                            <CheckCircle2 className="text-green-500" />
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    if (mode === "HR") {
        return (
            <div className="p-6 space-y-8">
                {/* SKILLS */}
                <div>
                    <h3 className="text-cyan-400 font-bold mb-4 text-sm tracking-wider flex items-center gap-2">
                        <span className="w-2 h-2 bg-cyan-400"></span> SKILLS_MATRIX
                    </h3>
                    <div className="flex flex-wrap gap-2">
                        {data.hr.skills.map(skill => (
                            <span key={skill} className="bg-gray-900 border border-gray-700 px-3 py-1 text-xs text-green-500 font-bold font-mono">
                                {skill}
                            </span>
                        ))}
                    </div>
                </div>

                {/* EXP */}
                <div>
                    <h3 className="text-magenta-500 font-bold mb-4 text-sm tracking-wider flex items-center gap-2">
                        <span className="w-2 h-2 bg-magenta-500"></span> FLIGHT_LOG (EXP)
                    </h3>
                    <div className="space-y-3">
                        {data.hr.exp.map((job, i) => (
                            <div key={i} className="bg-gray-900/50 border-l-2 border-gray-800 pl-4 py-2 hover:border-amber-500 transition-colors">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <div className="font-bold text-white text-sm">{job.role}</div>
                                        <div className="text-xs text-amber-500 mt-1">{job.org}</div>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-xs text-gray-500">{job.time}</div>
                                        <div className="text-[10px] text-green-500 uppercase tracking-widest mt-1">{job.stat}</div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* PROJECTS */}
                <div>
                    <h3 className="text-cyan-400 font-bold mb-4 text-sm tracking-wider flex items-center gap-2">
                        <span className="w-2 h-2 bg-cyan-400"></span> ACTIVE_TASKS
                    </h3>
                    <div className="grid gap-4">
                        {data.hr.projects.map(proj => (
                            <div key={proj.id} className="bg-black border border-gray-800 p-4 hover:border-cyan-500/50 transition-colors group">
                                <div className="flex justify-between items-start mb-3">
                                    <span className="font-bold text-white group-hover:text-cyan-400 transition-colors">{proj.name}</span>
                                    <span className="text-[10px] bg-gray-900 px-2 py-0.5 text-gray-400 border border-gray-800">{proj.stack}</span>
                                </div>
                                <div className="grid grid-cols-[1fr_auto] gap-4">
                                    <p className="text-xs text-gray-400 leading-relaxed font-mono">{proj.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    if (mode === "COMM") {
        return (
            <div className="p-6 grid grid-cols-2 gap-6">
                <div className="bg-black border border-gray-700 p-6 text-center">
                    <User size={48} className="mx-auto text-amber-500 mb-2" />
                    <div className="text-xl font-bold">{data.profile.name}</div>
                    <div className="text-xs text-gray-400">{data.stalker.bio}</div>
                </div>

                <div className="space-y-4">
                    {data.stalker.socials.map(s => (
                        <a
                            key={s.label}
                            href={s.link}
                            target="_blank"
                            rel="noreferrer"
                            className="block bg-black border border-gray-700 p-4 hover:border-amber-500"
                        >
                            {s.label}
                        </a>
                    ))}
                </div>
            </div>
        );
    }

    return <div className="p-6 text-gray-500">SYSTEM PAGE PLACEHOLDER</div>;
};

/* =========================
   NAV PANEL
========================= */

const NavPanel = ({ mode, setMode }) => (
    <div className="bg-gray-900 border-t border-gray-800 p-4 flex justify-center gap-4">
        {["EXEC", "HR", "COMM"].map(m => (
            <button
                key={m}
                onClick={() => setMode(m)}
                className={`px-6 py-3 font-bold ${mode === m ? "bg-cyan-900 text-white" : "bg-black text-gray-500"
                    }`}
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
            <div className="min-h-screen bg-black flex items-center justify-center text-cyan-500">
                <div className="text-4xl animate-pulse">AVIONICS BOOT...</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black text-white font-mono flex flex-col">
            <AvionicsHeader />
            <main className="flex-1 overflow-hidden">
                <MFDPage mode={mode} />
            </main>
            <NavPanel mode={mode} setMode={setMode} />
        </div>
    );
}