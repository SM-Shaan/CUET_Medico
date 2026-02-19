import { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaPhone,
  FaCalendarAlt,
  FaHeartbeat,
  FaStar,
  FaArrowRight,
  FaBrain,
  FaCheckCircle,
  FaLightbulb,
  FaShieldAlt,
  FaRunning,
  FaMoon,
  FaUsers,
  FaBookOpen,
} from "react-icons/fa";
import { MdLocalHospital, MdEmergency, MdVaccines } from "react-icons/md";
import Footer from "../components/Footer";

// ── Mental Health Check — Data ────────────────────────────────────────────────
const CATEGORIES = [
  {
    id: "mood",
    label: "Mood",
    emoji: "😔",
    color: "bg-blue-500",
    lightColor: "bg-blue-50",
    borderColor: "border-blue-300",
    textColor: "text-blue-600",
    questions: [
      "Over the past 2 weeks, how often have you felt down, depressed, or hopeless?",
      "How often have you felt little interest or pleasure in doing things you usually enjoy?",
      "How often have you felt worthless or like a burden to others?",
    ],
  },
  {
    id: "anxiety",
    label: "Anxiety",
    emoji: "😰",
    color: "bg-purple-500",
    lightColor: "bg-purple-50",
    borderColor: "border-purple-300",
    textColor: "text-purple-600",
    questions: [
      "How often have you felt nervous, anxious, or on edge?",
      "How often have you felt unable to stop or control worrying?",
      "How often have you experienced sudden feelings of panic or dread?",
    ],
  },
  {
    id: "sleep",
    label: "Sleep & Energy",
    emoji: "😴",
    color: "bg-indigo-500",
    lightColor: "bg-indigo-50",
    borderColor: "border-indigo-300",
    textColor: "text-indigo-600",
    questions: [
      "How often have you had trouble falling or staying asleep, or slept too much?",
      "How often have you felt tired or had little energy throughout the day?",
    ],
  },
  {
    id: "focus",
    label: "Focus & Daily Life",
    emoji: "🧠",
    color: "bg-pink-500",
    lightColor: "bg-pink-50",
    borderColor: "border-pink-300",
    textColor: "text-pink-600",
    questions: [
      "How often have you had difficulty concentrating on studying or daily tasks?",
      "How often have you withdrawn from friends, family, or activities you care about?",
    ],
  },
];

const OPTIONS = [
  { label: "Not at all", score: 0, emoji: "🟢" },
  { label: "Several days", score: 1, emoji: "🟡" },
  { label: "More than half the days", score: 2, emoji: "🟠" },
  { label: "Nearly every day", score: 3, emoji: "🔴" },
];

const ALL_QUESTIONS = CATEGORIES.flatMap((cat) =>
  cat.questions.map((q) => ({ question: q, categoryId: cat.id }))
);
const MAX_SCORE = ALL_QUESTIONS.length * 3;

const TIPS = [
  { icon: <FaRunning />, title: "Stay Active", desc: "Even a 20-min walk daily can significantly reduce anxiety and low mood." },
  { icon: <FaMoon />, title: "Prioritize Sleep", desc: "Aim for 7–8 hours. A consistent sleep schedule restores mental energy." },
  { icon: <FaUsers />, title: "Stay Connected", desc: "Reach out to a friend or family member. Social bonds protect mental health." },
  { icon: <FaBookOpen />, title: "Mindful Breaks", desc: "Take short breaks while studying. 5 minutes of deep breathing reduces stress." },
  { icon: <FaShieldAlt />, title: "Set Boundaries", desc: "It is okay to say no. Protecting your time reduces overwhelm." },
  { icon: <FaLightbulb />, title: "Seek Support", desc: "Talking to a counselor is a sign of strength, not weakness." },
];

const getResult = (score, categoryScores) => {
  const pct = (score / MAX_SCORE) * 100;
  const base =
    pct <= 20
      ? { level: "Minimal", color: "text-green-600", barColor: "bg-green-500", bg: "bg-green-50 border-green-300", icon: "😊", message: "Your responses suggest minimal or no signs of distress. You seem to be managing well.", advice: "Keep up your healthy routines. Regular sleep, movement, and social connection go a long way." }
      : pct <= 45
      ? { level: "Mild", color: "text-yellow-600", barColor: "bg-yellow-400", bg: "bg-yellow-50 border-yellow-300", icon: "🙂", message: "Mild symptoms detected. It is common to feel this way during stressful periods like exams or deadlines.", advice: "Consider mindfulness, journaling, or a casual chat with CUET Medical's counseling team." }
      : pct <= 70
      ? { level: "Moderate", color: "text-orange-600", barColor: "bg-orange-500", bg: "bg-orange-50 border-orange-300", icon: "😐", message: "Moderate symptoms that may be affecting your studies and daily life were identified.", advice: "We recommend booking an appointment with our counseling team. Early support makes a real difference." }
      : { level: "Severe", color: "text-red-600", barColor: "bg-red-500", bg: "bg-red-50 border-red-300", icon: "😔", message: "Significant symptoms that warrant professional attention were found. Please know — you are not alone.", advice: "Please visit CUET Medical Center or call our emergency line today. Confidential help is available." };

  return { ...base, score, pct: Math.round(pct), categoryScores };
};

// ── Mental Health Check — Component ──────────────────────────────────────────
const MentalHealthCheck = () => {
  const [phase, setPhase] = useState("landing"); // landing | category-intro | questions | result
  const [catIndex, setCatIndex] = useState(0);
  const [qIndex, setQIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [result, setResult] = useState(null);
  const [selected, setSelected] = useState(null);
  const [animating, setAnimating] = useState(false);

  const currentCat = CATEGORIES[catIndex];
  const currentCatQuestions = currentCat?.questions || [];
  const globalIndex = CATEGORIES.slice(0, catIndex).reduce((a, c) => a + c.questions.length, 0) + qIndex;
  const totalQuestions = ALL_QUESTIONS.length;
  const progress = Math.round((globalIndex / totalQuestions) * 100);

  const confirmAnswer = () => {
    if (selected === null) return;
    setAnimating(true);
    const newAnswers = [...answers, { score: selected, categoryId: currentCat.id }];

    setTimeout(() => {
      setAnimating(false);
      setSelected(null);

      if (qIndex < currentCatQuestions.length - 1) {
        setQIndex(qIndex + 1);
      } else if (catIndex < CATEGORIES.length - 1) {
        setAnswers(newAnswers);
        setCatIndex(catIndex + 1);
        setQIndex(0);
        setPhase("category-intro");
      } else {
        // Done
        const total = newAnswers.reduce((a, b) => a + b.score, 0);
        const categoryScores = CATEGORIES.map((cat) => {
          const catAnswers = newAnswers.filter((a) => a.categoryId === cat.id);
          const catMax = cat.questions.length * 3;
          const catScore = catAnswers.reduce((a, b) => a + b.score, 0);
          return { ...cat, score: catScore, max: catMax, pct: Math.round((catScore / catMax) * 100) };
        });
        setAnswers(newAnswers);
        setResult(getResult(total, categoryScores));
        setPhase("result");
      }
    }, 300);
  };

  const reset = () => {
    setPhase("landing");
    setCatIndex(0);
    setQIndex(0);
    setAnswers([]);
    setResult(null);
    setSelected(null);
  };

  return (
    <section className="py-20 bg-gradient-to-br from-slate-900 via-purple-950 to-indigo-950 relative overflow-hidden">
      {/* decorative blobs */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-purple-600 opacity-10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-600 opacity-10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-3xl mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-10">
          <span className="inline-flex items-center gap-2 bg-purple-500 bg-opacity-20 text-purple-300 text-sm font-semibold px-4 py-1 rounded-full mb-4 border border-purple-500 border-opacity-30">
            <FaBrain /> Mental Health Check
          </span>
          <h2 className="text-4xl font-extrabold text-white mb-3">How Are You Feeling?</h2>
          <p className="text-slate-400 max-w-xl mx-auto">
            A confidential screening across 4 key areas — Mood, Anxiety, Sleep, and Focus.
            Based on PHQ-9 &amp; GAD-7 scales. Takes about 3 minutes.
          </p>
        </div>

        <div className="bg-white bg-opacity-5 backdrop-blur-sm border border-white border-opacity-10 rounded-3xl overflow-hidden shadow-2xl">

          {/* ── Landing ── */}
          {phase === "landing" && (
            <div className="p-10 text-center">
              <div className="text-7xl mb-6">🧠</div>
              <h3 className="text-2xl font-bold text-white mb-3">Ready to check in with yourself?</h3>
              <p className="text-slate-400 mb-8 max-w-md mx-auto">
                {totalQuestions} questions across 4 areas. Your answers are never stored or shared.
              </p>

              {/* Category pills */}
              <div className="flex flex-wrap justify-center gap-3 mb-10">
                {CATEGORIES.map((cat) => (
                  <span key={cat.id} className={`${cat.color} text-white text-sm font-semibold px-4 py-1.5 rounded-full flex items-center gap-1.5`}>
                    {cat.emoji} {cat.label}
                  </span>
                ))}
              </div>

              <button
                onClick={() => setPhase("category-intro")}
                className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white px-10 py-4 rounded-full font-bold text-lg hover:opacity-90 transition-opacity shadow-lg shadow-purple-900"
              >
                Begin Check-in →
              </button>
            </div>
          )}

          {/* ── Category Intro ── */}
          {phase === "category-intro" && currentCat && (
            <div className="p-10 text-center">
              <div className="text-7xl mb-4">{currentCat.emoji}</div>
              <div className={`inline-block ${currentCat.color} text-white text-xs font-bold px-3 py-1 rounded-full mb-3`}>
                Section {catIndex + 1} of {CATEGORIES.length}
              </div>
              <h3 className="text-3xl font-extrabold text-white mb-3">{currentCat.label}</h3>
              <p className="text-slate-400 mb-8">
                {currentCatQuestions.length} questions in this section.
              </p>
              <button
                onClick={() => setPhase("questions")}
                className="bg-white text-slate-900 px-8 py-3 rounded-full font-bold hover:bg-opacity-90 transition-opacity shadow-md"
              >
                Continue →
              </button>
            </div>
          )}

          {/* ── Questions ── */}
          {phase === "questions" && currentCat && (
            <div className={`p-8 transition-opacity duration-300 ${animating ? "opacity-0" : "opacity-100"}`}>
              {/* Progress */}
              <div className="mb-6">
                <div className="flex justify-between text-xs text-slate-400 mb-2">
                  <span className={`${currentCat.textColor} font-semibold`}>{currentCat.emoji} {currentCat.label}</span>
                  <span>{globalIndex + 1} / {totalQuestions} questions</span>
                </div>
                <div className="w-full bg-white bg-opacity-10 rounded-full h-2">
                  <div
                    className={`${currentCat.color} h-2 rounded-full transition-all duration-500`}
                    style={{ width: `${((globalIndex + 1) / totalQuestions) * 100}%` }}
                  />
                </div>
              </div>

              {/* Question */}
              <div className="mb-8">
                <p className="text-sm text-slate-400 mb-2">Q{qIndex + 1} of {currentCatQuestions.length} in this section</p>
                <p className="text-xl font-semibold text-white leading-relaxed">
                  {currentCatQuestions[qIndex]}
                </p>
              </div>

              {/* Options */}
              <div className="space-y-3 mb-8">
                {OPTIONS.map((opt, i) => (
                  <button
                    key={i}
                    onClick={() => setSelected(opt.score)}
                    className={`w-full text-left px-5 py-4 rounded-xl border-2 transition-all duration-200 font-medium flex items-center gap-4
                      ${selected === opt.score
                        ? "border-purple-400 bg-purple-500 bg-opacity-20 text-white"
                        : "border-white border-opacity-10 text-slate-300 hover:border-purple-400 hover:bg-white hover:bg-opacity-5"
                      }`}
                  >
                    <span className="text-xl">{opt.emoji}</span>
                    <span className="flex-1">{opt.label}</span>
                    {selected === opt.score && <FaCheckCircle className="text-purple-400 shrink-0" />}
                  </button>
                ))}
              </div>

              <button
                onClick={confirmAnswer}
                disabled={selected === null}
                className={`w-full py-4 rounded-full font-bold text-lg transition-all duration-200
                  ${selected !== null
                    ? "bg-gradient-to-r from-purple-500 to-indigo-500 text-white hover:opacity-90 shadow-lg cursor-pointer"
                    : "bg-white bg-opacity-10 text-slate-500 cursor-not-allowed"
                  }`}
              >
                {globalIndex < totalQuestions - 1 ? "Next Question →" : "See My Results →"}
              </button>
            </div>
          )}

          {/* ── Result ── */}
          {phase === "result" && result && (
            <div className="p-8">
              {/* Score header */}
              <div className="text-center mb-8">
                <div className="text-6xl mb-3">{result.icon}</div>
                <h3 className="text-3xl font-extrabold text-white mb-1">
                  <span className={result.color}>{result.level}</span> Wellbeing
                </h3>
                <p className="text-slate-400 text-sm">Overall score: {result.score} / {MAX_SCORE}</p>

                {/* Score meter */}
                <div className="mt-4 max-w-xs mx-auto">
                  <div className="w-full bg-white bg-opacity-10 rounded-full h-4 overflow-hidden">
                    <div
                      className={`${result.barColor} h-4 rounded-full transition-all duration-700`}
                      style={{ width: `${result.pct}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-xs text-slate-500 mt-1">
                    <span>Minimal</span><span>Mild</span><span>Moderate</span><span>Severe</span>
                  </div>
                </div>
              </div>

              {/* Per-category breakdown */}
              <div className="mb-6">
                <h4 className="text-white font-bold mb-3 text-sm uppercase tracking-wide">Breakdown by Area</h4>
                <div className="grid grid-cols-2 gap-3">
                  {result.categoryScores.map((cat) => (
                    <div key={cat.id} className={`rounded-xl p-4 border ${cat.lightColor} ${cat.borderColor} bg-opacity-10`}>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-lg">{cat.emoji}</span>
                        <span className={`text-sm font-bold ${cat.textColor}`}>{cat.label}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-1.5">
                        <div className={`${cat.color} h-1.5 rounded-full`} style={{ width: `${cat.pct}%` }} />
                      </div>
                      <p className="text-xs text-gray-500 mt-1">{cat.score}/{cat.max} points</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Message */}
              <div className={`border-2 rounded-2xl p-5 mb-5 ${result.bg}`}>
                <p className="text-gray-700 mb-3">{result.message}</p>
                <div className="flex items-start gap-2">
                  <FaCheckCircle className={`mt-0.5 shrink-0 ${result.color}`} />
                  <p className={`font-semibold text-sm ${result.color}`}>{result.advice}</p>
                </div>
              </div>

              {/* Self-help tips */}
              <div className="mb-6">
                <h4 className="text-white font-bold mb-3 text-sm uppercase tracking-wide flex items-center gap-2">
                  <FaLightbulb className="text-yellow-400" /> Self-Care Tips
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {TIPS.map((tip, i) => (
                    <div key={i} className="flex items-start gap-3 bg-white bg-opacity-5 border border-white border-opacity-10 rounded-xl p-3">
                      <span className="text-purple-400 text-lg mt-0.5 shrink-0">{tip.icon}</span>
                      <div>
                        <p className="text-white text-sm font-semibold">{tip.title}</p>
                        <p className="text-slate-400 text-xs leading-relaxed">{tip.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Disclaimer */}
              <div className="bg-white bg-opacity-5 border border-white border-opacity-10 rounded-xl p-4 mb-6 text-xs text-slate-500">
                <strong className="text-slate-400">Disclaimer:</strong> This tool is for informational purposes only and is not a clinical diagnosis.
                Please consult a qualified healthcare professional for medical advice.
              </div>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  to="/appointmentform"
                  className="flex-1 text-center bg-gradient-to-r from-purple-500 to-indigo-500 text-white px-6 py-3 rounded-full font-bold hover:opacity-90 transition-opacity shadow-lg"
                >
                  Book Counseling Appointment
                </Link>
                <button
                  onClick={reset}
                  className="flex-1 text-center border-2 border-white border-opacity-20 text-slate-300 px-6 py-3 rounded-full font-bold hover:border-purple-400 hover:text-purple-300 transition-colors"
                >
                  Retake Check-in
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

// ── FAQ Accordion ────────────────────────────────────────────────────────────
const FAQItem = ({ question, answer }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex justify-between items-center px-6 py-4 text-left font-semibold text-gray-800 hover:bg-gray-50 transition-colors"
      >
        {question}
        <span className={`text-2xl text-indigo-500 leading-none transition-transform duration-200 ${open ? "rotate-45" : ""}`}>+</span>
      </button>
      {open && (
        <div className="px-6 pb-5 pt-1 text-gray-500 text-sm leading-relaxed border-t border-gray-100">
          {answer}
        </div>
      )}
    </div>
  );
};

// ── Main Page ────────────────────────────────────────────────────────────────
const Home = () => {
  const doctors = [
    { name: "Dr. John Doe", specialization: "General Medicine", available: "9:00 AM – 5:00 PM", avatar: "JD" },
    { name: "Dr. Jane Smith", specialization: "Psychiatry & Counseling", available: "10:00 AM – 6:00 PM", avatar: "JS" },
    { name: "Dr. Rafiq Ahmed", specialization: "Cardiology", available: "8:00 AM – 2:00 PM", avatar: "RA" },
  ];

  const services = [
    { icon: <MdLocalHospital className="text-3xl" />, title: "Primary Care", desc: "Comprehensive healthcare for students & staff", color: "bg-blue-500" },
    { icon: <MdEmergency className="text-3xl" />, title: "Emergency 24/7", desc: "Round-the-clock emergency medical support", color: "bg-red-500" },
    { icon: <FaHeartbeat className="text-3xl" />, title: "Counseling", desc: "Mental health support & psychological care", color: "bg-purple-500" },
    { icon: <FaCalendarAlt className="text-3xl" />, title: "Health Checkups", desc: "Regular preventive health screenings", color: "bg-green-500" },
    { icon: <MdVaccines className="text-3xl" />, title: "Vaccination", desc: "Immunization drives & vaccine programs", color: "bg-yellow-500" },
    { icon: <FaPhone className="text-3xl" />, title: "Ambulance", desc: "On-call ambulance for emergencies", color: "bg-orange-500" },
  ];

  const stats = [
    { value: "5,000+", label: "Patients Served" },
    { value: "15+", label: "Specialist Doctors" },
    { value: "24/7", label: "Emergency Care" },
    { value: "10+", label: "Years of Service" },
  ];

  const testimonials = [
    { name: "Sarah Rahman", dept: "CSE, 3rd Year", text: "The doctors at CUET Medical Center are professional and caring. I had a great experience!", rating: 5 },
    { name: "Ahmed Hossain", dept: "EEE, 2nd Year", text: "Quick service and friendly staff. The counseling sessions really helped me during exam stress.", rating: 5 },
    { name: "Fatima Begum", dept: "Civil, 4th Year", text: "Got immediate attention during an emergency. Truly reliable healthcare on campus.", rating: 4 },
  ];

  const faqs = [
    { q: "What are the operating hours?", a: "CUET Medical Center is open 8:00 AM – 8:00 PM Monday to Friday, with shorter hours on weekends. Emergency services run 24/7." },
    { q: "Do I need an appointment?", a: "Walk-ins are welcome for general consultations, but we recommend booking for specialist visits to reduce wait times." },
    { q: "Is counseling confidential?", a: "Yes. All counseling sessions are completely confidential. Your privacy and wellbeing are our top priority." },
    { q: "Are services free for CUET students?", a: "Basic consultations and emergency services are covered for registered CUET students. Some specialist services may have nominal charges." },
  ];

  return (
    <div className="font-sans">

      {/* ── Hero ── */}
      <section className="relative min-h-[88vh] flex items-center bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 text-white overflow-hidden">
        <div className="absolute top-[-80px] right-[-80px] w-96 h-96 bg-white opacity-5 rounded-full pointer-events-none" />
        <div className="absolute bottom-[-60px] left-[-60px] w-72 h-72 bg-white opacity-5 rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 lg:px-8 grid md:grid-cols-2 gap-12 items-center py-20 w-full">
          <div>
            <span className="inline-block bg-white bg-opacity-20 text-white text-sm font-semibold px-4 py-1 rounded-full mb-6">
              CUET Campus Healthcare
            </span>
            <h1 className="text-5xl md:text-6xl font-extrabold leading-tight mb-6">
              Your Health,<br />
              <span className="text-yellow-300">Our Priority</span>
            </h1>
            <p className="text-xl text-blue-100 mb-8 leading-relaxed">
              Modern healthcare facilities dedicated to the CUET community — from primary care to mental health support, we are here for you.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/appointmentform"
                className="bg-white text-blue-600 px-7 py-3 rounded-full font-bold shadow-lg hover:bg-yellow-300 hover:text-blue-800 transition-colors"
              >
                Book Appointment
              </Link>
              <Link
                to="/doctors"
                className="border-2 border-white text-white px-7 py-3 rounded-full font-bold hover:bg-white hover:text-blue-600 transition-colors"
              >
                Meet Our Doctors
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {stats.map((s, i) => (
              <div key={i} className="bg-white bg-opacity-10 backdrop-blur-sm rounded-2xl p-6 text-center border border-white border-opacity-20">
                <div className="text-4xl font-extrabold text-yellow-300 mb-1">{s.value}</div>
                <div className="text-blue-100 text-sm font-medium">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Services ── */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <span className="inline-block bg-blue-100 text-blue-700 text-sm font-semibold px-4 py-1 rounded-full mb-3">What We Offer</span>
            <h2 className="text-4xl font-extrabold text-gray-800 mb-3">Our Services</h2>
            <p className="text-gray-500 max-w-xl mx-auto">Comprehensive medical services to keep the CUET community healthy and thriving.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((s, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-shadow group cursor-default">
                <div className={`${s.color} text-white w-14 h-14 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  {s.icon}
                </div>
                <h3 className="text-lg font-bold text-gray-800 mb-2">{s.title}</h3>
                <p className="text-gray-500 text-sm">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Available Doctors ── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between mb-10">
            <div>
              <span className="inline-block bg-green-100 text-green-700 text-sm font-semibold px-4 py-1 rounded-full mb-2">On Duty Today</span>
              <h2 className="text-3xl font-extrabold text-gray-800">Available Doctors</h2>
            </div>
            <Link to="/doctors" className="text-blue-600 font-semibold flex items-center gap-2 hover:gap-3 transition-all">
              View All <FaArrowRight />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {doctors.map((doc, i) => (
              <div key={i} className="border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center text-white font-bold text-lg shrink-0">
                  {doc.avatar}
                </div>
                <div>
                  <h3 className="font-bold text-gray-800">{doc.name}</h3>
                  <p className="text-sm text-indigo-600 font-medium">{doc.specialization}</p>
                  <p className="text-xs text-gray-400 mt-1">🕐 {doc.available}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Mental Health Check ── */}
      <MentalHealthCheck />

      {/* ── Testimonials ── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <span className="inline-block bg-yellow-100 text-yellow-700 text-sm font-semibold px-4 py-1 rounded-full mb-3">What Students Say</span>
            <h2 className="text-4xl font-extrabold text-gray-800">Testimonials</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <div key={i} className="bg-gray-50 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex mb-3">
                  {[...Array(t.rating)].map((_, j) => <FaStar key={j} className="text-yellow-400 mr-0.5" />)}
                </div>
                <p className="text-gray-600 italic mb-4">"{t.text}"</p>
                <p className="font-bold text-gray-800">{t.name}</p>
                <p className="text-sm text-gray-400">{t.dept}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Working Hours + Emergency ── */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="bg-white rounded-2xl p-8 shadow-sm">
            <h2 className="text-2xl font-extrabold text-gray-800 mb-6">Working Hours</h2>
            <div className="space-y-1">
              {[
                { day: "Monday – Friday", hours: "8:00 AM – 8:00 PM" },
                { day: "Saturday", hours: "9:00 AM – 6:00 PM" },
                { day: "Sunday", hours: "10:00 AM – 4:00 PM" },
              ].map((row, i) => (
                <div key={i} className="flex justify-between items-center py-3 border-b border-gray-100 last:border-0">
                  <span className="text-gray-600 font-medium">{row.day}</span>
                  <span className="font-bold text-gray-800">{row.hours}</span>
                </div>
              ))}
              <p className="text-blue-600 font-semibold pt-3">* Emergency services available 24/7</p>
            </div>
          </div>

          <div className="bg-gradient-to-br from-red-500 to-pink-600 text-white rounded-2xl p-8 shadow-lg flex flex-col justify-center">
            <h2 className="text-3xl font-extrabold mb-3">Medical Emergency?</h2>
            <p className="text-red-100 mb-6">Our emergency team is available around the clock. Do not wait — call us immediately.</p>
            <div className="flex items-center gap-4 bg-white bg-opacity-20 rounded-xl px-5 py-4">
              <FaPhone className="text-yellow-300 text-2xl animate-pulse shrink-0" />
              <div>
                <p className="text-xs text-red-200 font-medium">Emergency Hotline</p>
                <p className="text-2xl font-extrabold">+880 123 456 789</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQs ── */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center mb-12">
            <span className="inline-block bg-indigo-100 text-indigo-700 text-sm font-semibold px-4 py-1 rounded-full mb-3">Common Questions</span>
            <h2 className="text-4xl font-extrabold text-gray-800">FAQs</h2>
          </div>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <FAQItem key={i} question={faq.q} answer={faq.a} />
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
