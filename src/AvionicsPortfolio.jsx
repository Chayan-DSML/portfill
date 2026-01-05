import React, { useState, useEffect } from "react";
import {
    Target,
    CheckCircle2,
    User,
    ChevronRight,
    Play,
    ArrowLeft,
    Filter,
    ExternalLink,
    FileText
} from "lucide-react";

/* =========================
   DATA
========================= */

const data = {
    profile: {
        name: "CHAYAN AGARWAL",
        role: "DATA SCIENTIST",
        base: "BLR",
        sqawk: "2026",
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
            { id: "WIN-01", text: "BUILT AIRLINE REC ENG", sub: "GEN-AI / TENSORFLOW" },
            { id: "WIN-02", text: "REAL-TIME PROD MONITORING", sub: "GE AEROSPACE / TABLEAU" }
        ]
    },
    acars: [
        {
            id: "RPT-001",
            title: "PREDICTIVE MAINTENANCE: BEYOND THE BUZZWORD",
            date: "14-OCT-2025",
            tag: "MRO ANALYTICS",
            priority: "HIGH",
            content: `Predictive maintenance (PdM) is revolutionizing the MRO industry, moving from scheduled checks to condition-based interventions. By leveraging sensor telemetry from modern turbofans (like the GEnx-1B), we can identify thermal distress signals up to 200 cycles before failure.

The key challenge isn't data volume—it's noise. A vibration spike might be a sensor glitch or a bearing failure. Using XGBoost classifiers trained on 'hard' failure data allows us to distinguish between signal and noise with 94% accuracy. The future of MRO lies not just in predicting failure, but in optimizing the supply chain to have the spare part ready exactly when the prediction model says it's needed.`
        },
        {
            id: "RPT-002",
            title: "INVENTORY DILUTION IN POST-COVID MARKETS",
            date: "02-NOV-2025",
            tag: "REVENUE MGMT",
            priority: "MED",
            content: `The post-COVID recovery curve has introduced significant volatility in cargo load factors. Traditional forecasting models (ARIMA) failed to account for supply chain shocks.

By implementing LSTM networks on booking data, we observed a 15% reduction in inventory spoilage. The key is analyzing 'booking velocity'—the rate at which cargo space fills up 72 hours prior to departure.`
        },
        {
            id: "RPT-003",
            title: "THE HIDDEN COST OF TAXI TIMES",
            date: "28-DEC-2025",
            tag: "FLIGHT OPS",
            priority: "LOW",
            content: `Fuel burn during taxi operations accounts for 4-6% of total trip fuel. Analysis of surface movement radar data reveals that 30% of hold times are purely scheduling inefficiencies.

Optimizing pushback times using a genetic algorithm scheduler can save an estimated $2M annually per major hub.`
        }
    ],
    system: {
        skills: ["PYTHON", "SQL", "TABLEAU", "AWS/GCP", "GEN-AI", "SCIKIT"],
        exp: [
            { role: "OPS ANALYST", org: "ADECCO (AMAZON)", time: "AUG23-FEB24", stat: "COMPLETED", color: "text-green-500" },
            { role: "DATA SCI INT", org: "BRITISH AIRWAYS", time: "JUN25-AUG25", stat: "VIRTUAL", color: "text-cyan-400" },
            { role: "DATA ENG INT", org: "GE AEROSPACE", time: "AUG23-OCT23", stat: "VIRTUAL", color: "text-cyan-400" }
        ],
        projects: [
            // 1. MAINTENANCE
            {
                id: "MNT-01",
                name: "ENGINE PDM & RUL EST",
                cat: "MAINTENANCE",
                stack: "ML/PYTHON",
                desc: "Developed a predictive maintenance system to analyze sensor telemetry from turbofan engines. Predicted Remaining Useful Life (RUL) using XGBoost/Random Forest to prevent in-service failures and optimize schedules.",
                video: "video_placeholder",
                tech: ["Python", "XGBoost", "Scikit-learn", "Time-Series", "Pandas"],
                demo: "N/A"
            },
            {
                id: "MNT-02",
                name: "AEROSPACE DATA ENG",
                cat: "MAINTENANCE",
                stack: "SQL/TABLEAU",
                desc: "Optimized data pipelines and visualization tools for real-time tracking of jet engine performance metrics (GEnx-1B, GE9X). Enhanced data literacy and provided unified operational KPIs.",
                video: "video_placeholder",
                tech: ["SQL", "Tableau", "Data Engineering", "Performance Tracking"],
                demo: "N/A"
            },
            // 2. LOGISTICS
            {
                id: "LOG-01",
                name: "DRONE NET ROUTE OPT",
                cat: "LOGISTICS",
                stack: "PYTHON/SIM",
                desc: "Designed a routing optimization framework for an autonomous drone delivery network. Minimized energy consumption and latency using Network Optimization Algorithms, reducing delivery time by 55%.",
                video: "video_placeholder",
                tech: ["Python", "Operations Research", "Simulation", "Algorithms", "Matplotlib"],
                demo: "N/A"
            },
            {
                id: "LOG-02",
                name: "CARGO YIELD & DILUTION",
                cat: "LOGISTICS",
                stack: "SQL/POWER BI",
                desc: "Analyzed cargo booking datasets to tackle Inventory Dilution. Built SQL pipelines and Power BI dashboards to correlate Load Factor vs. Yield, identifying underperforming routes.",
                video: "video_placeholder",
                tech: ["SQL", "Power BI", "Yield Analysis", "Revenue Mgmt"],
                demo: "N/A"
            },
            {
                id: "LOG-03",
                name: "LOGISTICS DOC ASSIST",
                cat: "LOGISTICS",
                stack: "GEN-AI",
                desc: "Developed an Intelligent Document Processing (IDP) system using LLMs to automate data extraction from unstructured logistics docs (invoices, Airway Bills), reducing processing time by 40%.",
                video: "video_placeholder",
                tech: ["Generative AI", "LLMs", "LangChain", "OCR", "Python"],
                demo: "N/A"
            },
            {
                id: "LOG-04",
                name: "CARGO NET ROUTE EFF",
                cat: "LOGISTICS",
                stack: "ML/PYTHON",
                desc: "Analyzed historical flight data to optimize cargo routing for UPS Airlines. Feature engineered 500K records to improve route timing accuracy by 20% and reduce fuel burn.",
                video: "video_placeholder",
                tech: ["Python", "Scikit-learn", "Predictive Modeling", "Logistics Analytics"],
                demo: "N/A"
            },
            // 3. REVENUE / STRATEGY
            {
                id: "REV-01",
                name: "ANCILLARY CROSS-SELL",
                cat: "REVENUE",
                stack: "ML/TENSORFLOW",
                desc: "Developed a Content-Based Filtering algorithm using TensorFlow to suggest add-ons (hotels, cars) during booking. Projected 15% uplift in ancillary revenue by targeting passenger personas.",
                video: "video_placeholder",
                tech: ["Python", "TensorFlow", "Recommender Systems", "A/B Testing", "Flask"],
                demo: "N/A"
            },
            {
                id: "STR-01",
                name: "TURKISH AIR STRATEGY",
                cat: "STRATEGY",
                stack: "BI/PYTHON",
                desc: "Deep-dive analysis of financial/operational metrics for Turkish Airlines. Synthesized reports to evaluate market positioning, profitability, and sustainability goals.",
                video: "video_placeholder",
                tech: ["Strategic Analysis", "Business Intelligence", "Market Research", "Data Viz"],
                demo: "N/A"
            },
            // 4. CUSTOMER EXPERIENCE
            {
                id: "CST-01",
                name: "FEEDBACK INSIGHT ENG",
                cat: "CUSTOMER EXP",
                stack: "GEN-AI/NLP",
                desc: "Leveraged LLMs to analyze thousands of unstructured customer Feedback Forms. Automated summarization and sentiment tagging, reducing analysis time from weeks to hours.",
                video: "video_placeholder",
                tech: ["Generative AI", "NLP", "Sentiment Analysis", "Prompt Engineering"],
                demo: "N/A"
            },
            {
                id: "CST-02",
                name: "IFE VOICE ASSISTANT",
                cat: "CUSTOMER EXP",
                stack: "GEN-AI/NLU",
                desc: "Designed a conversational AI interface for In-Flight Entertainment. Allowed passengers to find movies via natural language, projected to increase engagement by 25%.",
                video: "video_placeholder",
                tech: ["Generative AI", "PySpark", "NLU", "Prompt Engineering"],
                demo: "N/A"
            },
            {
                id: "CST-03",
                name: "CHURN PREDICTION",
                cat: "CUSTOMER EXP",
                stack: "ML/PYTHON",
                desc: "Developed a classification framework (Random Forest) to identify high-value passengers at risk of churning. Improved prediction accuracy by 12% to aid retention campaigns.",
                video: "video_placeholder",
                tech: ["Python", "Pandas", "Scikit-learn", "Classification", "Customer Analytics"],
                demo: "N/A"
            },
            {
                id: "CST-04",
                name: "MEAL RECOMMENDATION",
                cat: "CUSTOMER EXP",
                stack: "ML/DJANGO",
                desc: "Created a recommendation engine using K-Means and Collaborative Filtering to personalize in-flight meals. Facilitated an estimated 18% increase in satisfaction scores.",
                video: "video_placeholder",
                tech: ["Python", "Clustering", "Django", "Scikit-learn", "Personalization"],
                demo: "N/A"
            },
            {
                id: "CST-05",
                name: "A350 PAX SATISFACTION",
                cat: "CUSTOMER EXP",
                stack: "SQL/POWER BI",
                desc: "Analyzed passenger sentiment for Air India's new A350 fleet using NLP on reviews. Identified a 20% positive shift in sentiment regarding Cabin Comfort vs legacy fleet.",
                video: "video_placeholder",
                tech: ["Python", "SQL", "Power BI", "Sentiment Analysis", "NPS Analysis"],
                demo: "N/A"
            },
            {
                id: "CST-06",
                name: "DEMAND FORECASTING",
                cat: "CUSTOMER EXP",
                stack: "TIME-SERIES",
                desc: "Built a Time-Series (ARIMA/Prophet) model to forecast travel demand on key routes. Improved forecast accuracy for better inventory management and dynamic pricing.",
                video: "video_placeholder",
                tech: ["Time-Series", "ARIMA", "Python", "Scikit-learn", "Data Viz"],
                demo: "N/A"
            },
            // 5. FLIGHT OPS
            {
                id: "OPS-01",
                name: "STAR AIR OPS ANALYSIS",
                cat: "FLIGHT OPS",
                stack: "PYTHON/EDA",
                desc: "Analyzed flight schedules for a regional carrier to maximize fleet efficiency. Identified high-demand routes for frequency increases using EDA on turnaround times.",
                video: "video_placeholder",
                tech: ["Python", "Operational Analytics", "Fleet Planning", "Pandas"],
                demo: "N/A"
            },
            {
                id: "OPS-02",
                name: "DELAY FORECAST IROPS",
                cat: "FLIGHT OPS",
                stack: "SPARK/ML",
                desc: "Built a system to predict flight delays using weather/ops data via PySpark. Triggered automated rebooking workflows, reducing manual time by 12%.",
                video: "video_placeholder",
                tech: ["PySpark", "Predictive Modeling", "Flask", "Automation"],
                demo: "N/A"
            },
            {
                id: "OPS-03",
                name: "RYANAIR EFFICIENCY",
                cat: "FLIGHT OPS",
                stack: "SQL/POWER BI",
                desc: "Examined historical flight data to find correlations between strict schedules and delays. Pinpointed seasonal routes where tight turnarounds caused cascading delays.",
                video: "video_placeholder",
                tech: ["Python", "SQL", "Power BI", "Operational Analytics"],
                demo: "N/A"
            },
            // 6. AIRPORT OPS
            {
                id: "APT-01",
                name: "COVID TRAFFIC RECOV",
                cat: "AIRPORT OPS",
                stack: "SQL/PYTHON",
                desc: "Conducted analysis of global air traffic recovery post-COVID. Used SQL joins and EDA to visualize recovery curves, aiding airport planners in forecasting surges.",
                video: "video_placeholder",
                tech: ["SQL", "EDA", "Python", "Seaborn", "Data Cleaning"],
                demo: "N/A"
            },
            {
                id: "APT-02",
                name: "RETAIL REV OPTIMIZER",
                cat: "AIRPORT OPS",
                stack: "ML/CLUSTERING",
                desc: "Analyzed passenger dwell time vs. spending. Used clustering to identify that passengers arriving >2hrs early spend more, suggesting targeted digital coupon strategies.",
                video: "video_placeholder",
                tech: ["Python", "Clustering", "Scikit-learn", "Optimization"],
                demo: "N/A"
            },
            // 7. SIMULATORS
            {
                id: "SIM-01",
                name: "AIRLINE REV SIM",
                cat: "SIMULATORS",
                stack: "PYTHON/SIM",
                desc: "Developed a Monte Carlo Simulation environment to model various passenger booking scenarios and their impact on Inventory Dilution. Allowed Revenue Management to simulate pricing strategies before live implementation.",
                video: "video_placeholder",
                tech: ["Simulation", "Python", "Revenue Management", "Statistical Modeling", "Yield Analysis"],
                demo: "N/A"
            },
            // 8. CREW MANAGEMENT
            {
                id: "CRW-01",
                name: "CREW ROSTER OPT",
                cat: "CREW MANAGEMENT",
                stack: "SQL/POWER BI",
                desc: "Examined the impact of strict turnaround times on crew fatigue and schedule adherence. Analyzed historical roster data against flight delays to recommend schedule buffers, improving utilization and reducing risks.",
                video: "video_placeholder",
                tech: ["CRM Analytics", "SQL", "Schedule Optimization", "Power BI"],
                demo: "N/A"
            },
            // 9. CVR/FDR
            {
                id: "FDR-01",
                name: "REGIONAL FDR ANALYSIS",
                cat: "CVR/FDR",
                stack: "PYTHON/PANDAS",
                desc: "Analyzed Flight Data Recorder (FDR) parameters and aircraft system alert signals to identify operational anomalies in a regional fleet (Star Air). Correlated specific alert patterns with 'hard landings' and 'unstable approaches' for safety feedback.",
                video: "video_placeholder",
                tech: ["FDR Data Analysis", "Anomaly Detection", "Python", "Operational Safety", "Pandas"],
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
   COMPONENTS
========================= */

const FilterDropdown = ({ options, value, onChange, icon: Icon }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center justify-between gap-2 bg-cyan-900/20 border border-cyan-800/50 text-cyan-400 px-3 py-1 text-[10px] uppercase tracking-wider hover:bg-cyan-900/40 transition-colors min-w-[140px]"
            >
                <div className="flex items-center gap-2"><Icon size={10} /> {value}</div>
                <ChevronRight size={10} className={`transition-transform duration-200 ${isOpen ? "rotate-90" : ""}`} />
            </button>

            {isOpen && (
                <div className="absolute top-full left-0 mt-1 w-full bg-black border border-gray-700 z-50 max-h-60 overflow-y-auto shadow-xl shadow-black/80">
                    {options.map((opt) => (
                        <div
                            key={opt}
                            onClick={() => { onChange(opt); setIsOpen(false); }}
                            className={`px-3 py-2 text-[10px] cursor-pointer hover:bg-cyan-900/20 transition-colors border-b border-gray-900 last:border-0 ${value === opt ? "text-cyan-400 font-bold bg-cyan-900/10" : "text-gray-500"}`}
                        >
                            {opt}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

/* =========================
   PAGES
========================= */

const MFDPage = ({ mode }) => {
    // State for Project Database in SYSTEM mode
    const [activeProject, setActiveProject] = useState(null);
    const [categoryFilter, setCategoryFilter] = useState("ALL");
    const [stackFilter, setStackFilter] = useState("ALL");
    const [activeReport, setActiveReport] = useState(data.acars[0]);

    // Get unique categories and stacks for filters
    const categories = ["ALL", ...new Set(data.system.projects.map(p => p.cat))];
    const techStacks = ["ALL", ...new Set(data.system.projects.map(p => p.stack ? p.stack.split('/')[0] : "OTHER"))];

    // Filter projects based on selection
    const filteredProjects = data.system.projects.filter(p => {
        const catMatch = categoryFilter === "ALL" || p.cat === categoryFilter;
        const stackMatch = stackFilter === "ALL" || (p.stack && p.stack.includes(stackFilter));
        return catMatch && stackMatch;
    });

    // Reset view when mode changes
    useEffect(() => {
        setActiveProject(null);
        setCategoryFilter("ALL");
        setStackFilter("ALL");
        setActiveReport(data.acars[0]);
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
                                        <FilterDropdown
                                            options={categories}
                                            value={categoryFilter}
                                            onChange={setCategoryFilter}
                                            icon={Filter}
                                        />
                                        <FilterDropdown
                                            options={techStacks}
                                            value={stackFilter}
                                            onChange={setStackFilter}
                                            icon={Target}
                                        />
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
                                /* TILE VIEW (GRID) */
                                <div className="p-4 overflow-y-auto h-full grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-3 content-start">
                                    {filteredProjects.length > 0 ? (
                                        filteredProjects.map((proj) => (
                                            <div
                                                key={proj.id}
                                                onClick={() => setActiveProject(proj)}
                                                className="bg-gray-900/30 border border-gray-800 hover:border-cyan-500 p-3 flex flex-col justify-between h-[120px] transition-all cursor-pointer group hover:bg-gray-900/60"
                                            >
                                                <div className="flex justify-between items-start">
                                                    <span className="text-[10px] text-cyan-600 font-mono group-hover:text-cyan-400">{proj.id}</span>
                                                    <div className="w-1.5 h-1.5 bg-gray-800 rounded-full group-hover:bg-green-500 transition-colors"></div>
                                                </div>

                                                <div className="font-bold text-xs text-gray-300 leading-tight group-hover:text-white uppercase line-clamp-2">
                                                    {proj.name}
                                                </div>

                                                <div className="text-[9px] text-gray-500 font-mono border-t border-gray-800 pt-2 mt-1 truncate group-hover:text-gray-400 group-hover:border-cyan-900">
                                                    {proj.stack}
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="col-span-full h-40 flex items-center justify-center text-gray-500 text-sm">
                                            NO PROJECTS FOUND MATCHING FILTERS
                                        </div>
                                    )}
                                </div>
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

    if (mode === "ACARS") {


        return (
            <div className="h-full flex flex-col p-4 md:p-6 overflow-hidden">
                <div className="flex justify-between items-end mb-6 border-b border-gray-800 pb-2">
                    <h2 className="text-3xl font-bold tracking-widest text-amber-500">
                        OPERATIONAL REPORTS <span className="text-gray-500 text-lg ml-2 text-white">/ ACARS LOG</span>
                    </h2>
                    <div className="text-cyan-600 font-mono text-sm">PG 1/1</div>
                </div>

                <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-6 overflow-hidden">
                    {/* LEFT PANEL: LIST */}
                    <div className="lg:col-span-4 flex flex-col overflow-hidden border-r border-gray-800 pr-4">
                        <div className="flex items-center gap-2 mb-4 text-green-500 font-bold tracking-widest text-xs uppercase">
                            <FileText size={14} /> Incoming Messages
                        </div>
                        <div className="flex-1 overflow-y-auto space-y-2">
                            {data.acars.map(rep => (
                                <div
                                    key={rep.id}
                                    onClick={() => setActiveReport(rep)}
                                    className={`
                                        p-4 border-l-2 cursor-pointer transition-all group relative
                                        ${activeReport.id === rep.id
                                            ? "bg-gray-900 border-amber-500"
                                            : "border-gray-800 hover:bg-gray-900/50 hover:border-cyan-500"
                                        }
                                    `}
                                >
                                    <div className="flex justify-between items-start mb-1">
                                        <span className={`text-[10px] font-mono ${activeReport.id === rep.id ? "text-amber-500" : "text-gray-500"}`}>{rep.id}</span>
                                        <span className="text-[10px] text-gray-600 font-mono">{rep.date}</span>
                                    </div>
                                    <div className={`font-bold text-xs uppercase leading-tight mb-2 ${activeReport.id === rep.id ? "text-white" : "text-gray-400 group-hover:text-gray-200"}`}>
                                        {rep.title}
                                    </div>
                                    <div className="text-[9px] text-cyan-600 font-bold uppercase tracking-wider">{rep.tag}</div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* RIGHT PANEL: CONTENT */}
                    <div className="lg:col-span-8 flex flex-col overflow-hidden bg-black border border-gray-800 p-6 relative">
                        {/* CRT Scanline effect */}
                        <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%] z-20 opacity-20"></div>

                        {activeReport ? (
                            <div className="h-full flex flex-col relative z-10">
                                <div className="flex justify-between items-start border-b border-gray-800 pb-4 mb-6">
                                    <h1 className="text-xl md:text-2xl font-bold text-white tracking-widest uppercase max-w-2xl leading-relaxed">
                                        {activeReport.title}
                                    </h1>
                                    <div className="text-right">
                                        <div className="text-[10px] text-amber-500 font-bold tracking-widest uppercase mb-1">PRIORITY: {activeReport.priority}</div>
                                        <div className="text-[10px] text-gray-600 font-mono">{activeReport.date}</div>
                                    </div>
                                </div>

                                <div className="flex gap-2 mb-8">
                                    <span className="bg-cyan-900/30 text-cyan-400 border border-cyan-800/50 px-2 py-1 text-[10px] font-mono uppercase tracking-wider">
                                        {activeReport.tag}
                                    </span>
                                    <span className="bg-gray-900 text-gray-500 border border-gray-800 px-2 py-1 text-[10px] font-mono uppercase tracking-wider">
                                        ID: {activeReport.id}
                                    </span>
                                </div>

                                <div className="flex-1 overflow-y-auto pr-4">
                                    <p className="font-mono text-sm text-gray-300 leading-loose whitespace-pre-wrap">
                                        {activeReport.content}
                                    </p>
                                    <div className="mt-12 text-center text-[10px] text-gray-600 font-mono tracking-widest uppercase">
                                        -- END OF TRANSMISSION --
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="flex items-center justify-center h-full text-gray-600 font-mono text-xs tracking-widest uppercase">
                                Awaiting Selection...
                            </div>
                        )}
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
        {["EXEC", "SYSTEM", "ACARS", "COMM"].map(m => (
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