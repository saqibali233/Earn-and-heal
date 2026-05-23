import { motion } from 'motion/react';
import { Helmet } from 'react-helmet-async';
import { Mail, MessageSquare, MapPin, Send, Phone, Clock } from 'lucide-react';
import { useState } from 'react';

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="pt-40 pb-20 bg-[#F8FAFC] dark:bg-slate-950 min-h-screen">
      <Helmet>
        <title>Contact Support - Earnandheal</title>
        <meta name="description" content="Get in touch with the Earnandheal team for support, feature requests, or business inquiries." />
      </Helmet>

      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-16">
            {/* Contact Info */}
            <div className="flex-1 space-y-12">
              <div>
                <h1 className="text-5xl font-black text-slate-900 dark:text-white mb-6 tracking-tighter leading-none italic">GET IN <span className="text-blue-600 underline decoration-8 underline-offset-8">TOUCH</span></h1>
                <p className="text-slate-500 dark:text-slate-400 font-medium text-lg leading-relaxed">
                  Have questions about our Utility Protocol? Need a custom tool built for your business node? 
                  Our technical support team is standing by.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-white dark:bg-slate-900 p-8 rounded-[2rem] border border-slate-200 dark:border-slate-800 shadow-sm group hover:border-blue-400 transition-all">
                  <div className="w-12 h-12 bg-blue-50 dark:bg-blue-900/10 text-blue-600 rounded-xl flex items-center justify-center mb-6 group-hover:bg-blue-600 group-hover:text-white transition-all shadow-sm">
                    <Mail size={24} />
                  </div>
                  <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-2 px-1">Email Support</h3>
                  <p className="text-lg font-black text-slate-900 dark:text-white uppercase tracking-tight">support@earnandheal.com</p>
                </div>

                <div className="bg-white dark:bg-slate-900 p-8 rounded-[2rem] border border-slate-200 dark:border-slate-800 shadow-sm group hover:border-emerald-400 transition-all">
                  <div className="w-12 h-12 bg-emerald-50 dark:bg-emerald-900/10 text-emerald-600 rounded-xl flex items-center justify-center mb-6 group-hover:bg-emerald-600 group-hover:text-white transition-all shadow-sm">
                    <MessageSquare size={24} />
                  </div>
                  <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-2 px-1">Live Discord</h3>
                  <p className="text-lg font-black text-slate-900 dark:text-white uppercase tracking-tight">Community Node</p>
                </div>

                <div className="bg-white dark:bg-slate-900 p-8 rounded-[2rem] border border-slate-200 dark:border-slate-800 shadow-sm group hover:border-purple-400 transition-all">
                  <div className="w-12 h-12 bg-purple-50 dark:bg-purple-900/10 text-purple-600 rounded-xl flex items-center justify-center mb-6 group-hover:bg-purple-600 group-hover:text-white transition-all shadow-sm">
                    <MapPin size={24} />
                  </div>
                  <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-2 px-1">Headquarters</h3>
                  <p className="text-lg font-black text-slate-900 dark:text-white uppercase tracking-tight">Austin, Texas, USA</p>
                </div>

                <div className="bg-white dark:bg-slate-900 p-8 rounded-[2rem] border border-slate-200 dark:border-slate-800 shadow-sm group hover:border-orange-400 transition-all">
                  <div className="w-12 h-12 bg-orange-50 dark:bg-orange-900/10 text-orange-600 rounded-xl flex items-center justify-center mb-6 group-hover:bg-orange-600 group-hover:text-white transition-all shadow-sm">
                    <Clock size={24} />
                  </div>
                  <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-2 px-1">Active Hours</h3>
                  <p className="text-lg font-black text-slate-900 dark:text-white uppercase tracking-tight">9:00 AM - 6:00 PM CST</p>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="flex-1">
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[3rem] p-10 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/5 blur-[60px] rounded-full" />
                
                {submitted ? (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-20"
                  >
                    <div className="w-20 h-20 bg-emerald-500 text-white rounded-[2rem] flex items-center justify-center mx-auto mb-6 shadow-xl shadow-emerald-200/50">
                      <Send size={40} />
                    </div>
                    <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-4 italic tracking-tight">TRANSMISSION RECEIVED</h2>
                    <p className="text-slate-500 font-medium max-w-xs mx-auto">Your inquiry has been successfully indexed. An agent will respond shortly.</p>
                    <button 
                      onClick={() => setSubmitted(false)}
                      className="mt-10 text-[10px] font-black text-blue-600 uppercase tracking-widest hover:underline"
                    >
                      Send Another Message
                    </button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-3">
                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-1">Your Alias</label>
                        <input 
                          required 
                          type="text" 
                          placeholder="Node User" 
                          className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 rounded-2xl p-4 focus:ring-2 focus:ring-blue-400 focus:outline-none transition-all shadow-inner font-medium"
                        />
                      </div>
                      <div className="space-y-3">
                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-1">Email Coordinates</label>
                        <input 
                          required 
                          type="email" 
                          placeholder="user@network.com" 
                          className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 rounded-2xl p-4 focus:ring-2 focus:ring-blue-400 focus:outline-none transition-all shadow-inner font-medium"
                        />
                      </div>
                    </div>

                    <div className="space-y-3">
                      <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-1">Inquiry Purpose</label>
                      <select className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 rounded-2xl p-4 focus:ring-2 focus:ring-blue-400 focus:outline-none transition-all shadow-inner font-black uppercase tracking-widest text-[10px] text-slate-600 dark:text-slate-400">
                        <option>General Support</option>
                        <option>Feature Node Request</option>
                        <option>API & Partnership</option>
                        <option>USA Legal Inquiry</option>
                        <option>Other</option>
                      </select>
                    </div>

                    <div className="space-y-3">
                      <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-1">Message Buffer</label>
                      <textarea 
                        required 
                        rows={6}
                        placeholder="Detail your request here..." 
                        className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 rounded-2xl p-4 focus:ring-2 focus:ring-blue-400 focus:outline-none transition-all shadow-inner font-medium resize-none"
                      />
                    </div>

                    <button 
                      type="submit" 
                      className="w-full bg-blue-600 text-white py-5 rounded-2xl font-black uppercase tracking-[0.2em] text-xs shadow-xl shadow-blue-200/50 hover:bg-blue-500 transition-all active:scale-95 flex items-center justify-center gap-4"
                    >
                      <Send size={18} /> Initiate Transmission
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
