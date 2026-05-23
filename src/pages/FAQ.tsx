import { motion } from 'motion/react';
import { Helmet } from 'react-helmet-async';
import { Plus, Minus, Search, Sparkles, ShieldCheck, Zap } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const FAQS = [
  {
    question: "Is Earnandheal really free to use?",
    answer: "Yes, our core utility protocol is accessible for free. We monetize through precision affiliate nodes and specialized enterprise services, allowing us to keep the basic toolkit open to all users."
  },
  {
    question: "How do the AI tools work?",
    answer: "Our AI modules utilize the Google Gemini 3 Flash protocol, optimized for high-speed content generation, grammar correction, and data synthesis directly within your browser environment."
  },
  {
    question: "Is my data stored on your servers?",
    answer: "Zero retention is our primary security law. Most tools process data locally in your browser strings, and AI requests are encrypted in transit with no persistent server logs of your inputs."
  },
  {
    question: "Can I request a custom utility tool?",
    answer: "Absolutely. We actively scan for tool requests. Visit our Contact node and select 'Feature Node Request' to submit your ideas to our USA dev team."
  },
  {
    question: "Do you have an API for developers?",
    answer: "Our enterprise API cluster is currently in private beta. If you are a developer looking to integrate Earnandheal modules into your app, please reach out via the partner portal."
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="pt-40 pb-20 bg-[#F8FAFC] dark:bg-slate-950 min-h-screen">
      <Helmet>
        <title>FAQ & Knowledge Protocol - Earnandheal</title>
        <meta name="description" content="Find answers to common questions about Earnandheal tools, privacy, and technology." />
      </Helmet>

      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-50 dark:bg-blue-900/10 text-blue-600 rounded-full text-[10px] font-black uppercase tracking-widest mb-6 border border-blue-100 dark:border-blue-800">
               <Zap size={14} className="fill-blue-600/10" /> Knowledge Protocol
            </div>
            <h1 className="text-5xl md:text-6xl font-black text-slate-900 dark:text-white mb-6 tracking-tighter italic">COMMON <span className="text-blue-600 underline underline-offset-8">QUERIES</span></h1>
            <p className="text-slate-500 dark:text-slate-400 font-medium text-lg italic">Everything you need to know about the Earnandheal ecosystem.</p>
          </div>

          <div className="space-y-4 mb-20">
            {FAQS.map((faq, idx) => (
              <div 
                key={idx} 
                className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[2rem] overflow-hidden transition-all hover:border-blue-400"
              >
                <button 
                  onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                  className="w-full px-8 py-6 flex items-center justify-between text-left group"
                >
                  <span className="text-lg font-black text-slate-900 dark:text-white group-hover:text-blue-600 transition-colors uppercase tracking-tight italic">{faq.question}</span>
                  <div className="w-10 h-10 rounded-xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-slate-400 shrink-0">
                    {openIndex === idx ? <Minus size={20} /> : <Plus size={20} />}
                  </div>
                </button>
                <motion.div 
                  initial={false}
                  animate={{ height: openIndex === idx ? 'auto' : 0, opacity: openIndex === idx ? 1 : 0 }}
                  className="overflow-hidden"
                >
                  <div className="px-8 pb-8 text-slate-600 dark:text-slate-400 font-medium leading-relaxed border-t border-slate-50 dark:border-slate-800 pt-6">
                    {faq.answer}
                  </div>
                </motion.div>
              </div>
            ))}
          </div>

          {/* Call to action */}
          <div className="bg-slate-900 rounded-[3rem] p-12 text-center relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 blur-[100px] rounded-full" />
            <h2 className="text-3xl font-black text-white mb-6 italic tracking-tight">STILL HAVE QUESTIONS?</h2>
            <p className="text-blue-100/60 mb-10 max-w-sm mx-auto font-medium">Our node support agents are here to assist with your specific USA utility requirements.</p>
            <Link 
              to="/contact" 
              className="inline-flex bg-white text-slate-900 px-10 py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] shadow-xl hover:bg-blue-50 transition-all"
            >
              Contact Support Node
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
