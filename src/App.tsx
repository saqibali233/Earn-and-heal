import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sun, Moon, Search, Menu, X, 
  ChevronRight, Sparkles, Type, Image as ImageIcon, 
  FileText, Calculator, Search as SearchIcon,
  Github, Twitter, Mail, User as UserIcon, LogOut, Settings,
  Zap, Lock, TrendingUp
} from 'lucide-react';
import { useState, useEffect } from 'react';
import { useTheme } from './hooks/useTheme';
import { cn } from './lib/utils';
import { CATEGORIES, TOOLS } from './constants';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import ToolPage from './pages/ToolPage';
import BlogList from './pages/BlogList';
import BlogPost from './pages/BlogPost';
import ToolsList from './pages/ToolsList';
import AdminDashboard from './pages/AdminDashboard';
import Contact from './pages/Contact';
import FAQ from './pages/FAQ';

function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const { user, profile, signIn, logout, isAdmin } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b",
      isScrolled 
        ? "bg-white/90 dark:bg-slate-950/90 backdrop-blur-md py-3 border-slate-200 dark:border-slate-800 shadow-sm" 
        : "bg-transparent py-5 border-transparent"
    )}>
      <div className="container mx-auto px-6 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white font-black italic shadow-lg shadow-blue-200/50 transform group-hover:rotate-6 group-hover:scale-110 transition-all">
            E
          </div>
          <span className="text-xl font-black tracking-tighter text-slate-900 dark:text-white">
            Earnand<span className="text-blue-600 italic">heal</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-10">
          <div className="flex items-center gap-8">
            <Link to="/tools" className="text-xs font-black uppercase tracking-widest text-slate-500 hover:text-blue-600 transition-colors">All Tools</Link>
            <Link to="/blog" className="text-xs font-black uppercase tracking-widest text-slate-500 hover:text-blue-600 transition-colors">Digital Hub</Link>
          </div>
          
          <div className="flex items-center gap-4 pl-8 border-l border-slate-200 dark:border-slate-800">
            <button 
              onClick={toggleTheme}
              className="p-2.5 hover:bg-slate-100 dark:hover:bg-slate-900 rounded-xl transition-colors text-slate-400"
            >
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <div className="h-6 w-px bg-slate-200 dark:bg-slate-800 mx-2" />
            
            {user ? (
              <div className="relative">
                <button 
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="w-10 h-10 bg-blue-50 dark:bg-blue-900/10 rounded-xl flex items-center justify-center text-blue-600 font-bold border border-blue-100 dark:border-blue-900 transition-all hover:shadow-lg"
                >
                  <UserIcon size={18} />
                </button>
                <AnimatePresence>
                  {isProfileOpen && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      className="absolute top-full right-0 mt-4 w-64 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl p-4 z-50 overflow-hidden"
                    >
                       <div className="p-4 bg-slate-50 dark:bg-slate-950 rounded-xl mb-4 text-center">
                          <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-black mx-auto mb-3 shadow-lg">{user.email?.[0].toUpperCase()}</div>
                          <div className="text-sm font-black text-slate-900 dark:text-white truncate">{user.email}</div>
                          <div className="text-[10px] font-bold text-blue-500 uppercase tracking-widest mt-1">{isAdmin ? 'Super Admin' : 'Free Member'}</div>
                       </div>
                       <div className="space-y-1">
                          {isAdmin && (
                            <Link to="/admin" onClick={() => setIsProfileOpen(false)} className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 text-sm font-bold text-slate-700 dark:text-slate-300">
                               <Settings size={18} className="text-blue-600" /> Admin Console
                            </Link>
                          )}
                          <Link to="/tools" onClick={() => setIsProfileOpen(false)} className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 text-sm font-bold text-slate-700 dark:text-slate-300">
                             <Sparkles size={18} className="text-purple-600" /> Premium Tools
                          </Link>
                          <button 
                            onClick={() => { logout(); setIsProfileOpen(false); }}
                            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-red-50 dark:hover:bg-red-950/20 text-sm font-bold text-red-500 transition-colors"
                          >
                             <LogOut size={18} /> Sign Out
                          </button>
                       </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <button 
                onClick={signIn}
                className="bg-blue-600 text-white px-8 py-3 rounded-xl font-black text-xs uppercase tracking-widest shadow-xl shadow-blue-200/50 hover:bg-blue-500 transition-all hover:-translate-y-0.5"
              >
                Launch Cloud
              </button>
            )}
          </div>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden p-3 bg-slate-50 dark:bg-slate-900 rounded-xl"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 overflow-hidden shadow-2xl"
          >
            <div className="container mx-auto px-6 py-8 flex flex-col gap-4">
              <Link to="/tools" onClick={() => setIsMobileMenuOpen(false)} className="text-2xl font-black text-slate-900 dark:text-white italic tracking-tighter">All Tools</Link>
              <Link to="/blog" onClick={() => setIsMobileMenuOpen(false)} className="text-2xl font-black text-slate-900 dark:text-white italic tracking-tighter">SEO Blog</Link>
              <Link to="/admin" onClick={() => setIsMobileMenuOpen(false)} className="text-2xl font-black text-slate-900 dark:text-white italic tracking-tighter">Admin Panel</Link>
              <div className="h-px bg-slate-100 dark:bg-slate-800 my-4" />
              {!user ? (
                <button 
                  onClick={() => { signIn(); setIsMobileMenuOpen(false); }}
                  className="w-full bg-blue-600 text-white py-4 rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl"
                >
                  Sign In with Google
                </button>
              ) : (
                <button 
                  onClick={() => { logout(); setIsMobileMenuOpen(false); }}
                  className="w-full bg-red-500 text-white py-4 rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl"
                >
                  Sign Out
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

function Footer() {
  return (
    <footer className="bg-white dark:bg-slate-950 border-t border-slate-100 dark:border-slate-800 px-8 py-16">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
        <div className="col-span-1 md:col-span-1">
           <Link to="/" className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white font-black italic shadow-lg">E</div>
            <span className="text-xl font-black tracking-tighter text-slate-900 dark:text-white">Earnand<span className="text-blue-600 italic">heal</span></span>
          </Link>
          <p className="text-slate-500 dark:text-slate-400 text-sm font-medium leading-relaxed mb-8">Professional-grade online utilities for the modern digital landscape. Built for speed, precision, and SEO performance.</p>
          <div className="flex gap-4">
            <a href="#" className="w-10 h-10 bg-slate-50 dark:bg-slate-900 rounded-xl flex items-center justify-center text-slate-500 hover:bg-blue-600 hover:text-white transition-all"><Twitter size={18} /></a>
            <a href="#" className="w-10 h-10 bg-slate-50 dark:bg-slate-900 rounded-xl flex items-center justify-center text-slate-500 hover:bg-blue-600 hover:text-white transition-all"><Github size={18} /></a>
          </div>
        </div>

        <div>
          <h5 className="text-[10px] font-black uppercase tracking-widest text-slate-900 dark:text-white mb-6">Utility Nodes</h5>
          <ul className="space-y-4 text-sm font-bold text-slate-500 dark:text-slate-400">
            <li><Link to="/tools" className="hover:text-blue-600 transition-colors uppercase tracking-tight">All Tools</Link></li>
            <li><Link to="/category/text" className="hover:text-blue-600 transition-colors uppercase tracking-tight">Text Processing</Link></li>
            <li><Link to="/category/seo" className="hover:text-blue-600 transition-colors uppercase tracking-tight">SEO Toolkit</Link></li>
            <li><Link to="/category/finance" className="hover:text-blue-600 transition-colors uppercase tracking-tight">Finance Ops</Link></li>
          </ul>
        </div>

        <div>
          <h5 className="text-[10px] font-black uppercase tracking-widest text-slate-900 dark:text-white mb-6">Resource Hub</h5>
          <ul className="space-y-4 text-sm font-bold text-slate-500 dark:text-slate-400">
            <li><Link to="/blog" className="hover:text-blue-600 transition-colors uppercase tracking-tight">Knowledge Hub</Link></li>
            <li><Link to="/faq" className="hover:text-blue-600 transition-colors uppercase tracking-tight">FAQ Protocol</Link></li>
            <li><Link to="/contact" className="hover:text-blue-600 transition-colors uppercase tracking-tight">Contact Support</Link></li>
            <li><Link to="#" className="hover:text-blue-600 transition-colors uppercase tracking-tight">Affiliate API</Link></li>
          </ul>
        </div>

        <div>
          <h5 className="text-[10px] font-black uppercase tracking-widest text-slate-900 dark:text-white mb-6">Legal Cluster</h5>
          <ul className="space-y-4 text-sm font-bold text-slate-500 dark:text-slate-400">
            <li><Link to="#" className="hover:text-blue-600 transition-colors uppercase tracking-tight">Privacy Protocol</Link></li>
            <li><Link to="#" className="hover:text-blue-600 transition-colors uppercase tracking-tight">Terms of Utility</Link></li>
            <li><Link to="#" className="hover:text-blue-600 transition-colors uppercase tracking-tight">Sitemap XML</Link></li>
            <li className="flex items-center gap-2 pt-4 border-t border-slate-50 dark:border-slate-800">
              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
              <span className="text-[9px] uppercase tracking-widest font-black text-emerald-500">Service Optimal</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="container mx-auto pt-8 border-t border-slate-50 dark:border-slate-800 text-center text-[10px] font-bold text-slate-400 uppercase tracking-widest">
        &copy; {new Date().getFullYear()} Earnandheal Enterprise. Precision Utilities Delivered.
      </div>
    </footer>
  );
}

function HomePage() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="bg-[#F8FAFC] dark:bg-slate-950 font-sans text-slate-800 dark:text-slate-200">
      {/* Hero Section */}
      <section className="relative pt-44 pb-32 px-8 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-700 via-indigo-900 to-slate-950" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20 pointer-events-none" />
        
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="container mx-auto text-center relative z-10"
        >
          <div className="inline-flex items-center gap-2 px-5 py-2 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full text-blue-300 text-[10px] font-black uppercase tracking-[0.2em] mb-10 shadow-2xl">
            <Sparkles size={14} className="fill-blue-300" /> Utility Protocol V2.0
          </div>
          <h1 className="text-5xl md:text-8xl font-black text-white mb-8 tracking-tighter leading-[0.9] flex flex-col items-center">
            <span>UNLEASH</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400 italic">PRECISION</span>
          </h1>
          <p className="text-blue-100/60 text-lg md:text-2xl mb-12 max-w-2xl mx-auto font-medium leading-relaxed uppercase tracking-tighter">
            Fast, secure, and professional utility tools for creators, developers, and analysts.
          </p>
          
          <div className="relative max-w-3xl mx-auto flex flex-col md:flex-row shadow-2xl rounded-3xl overflow-hidden bg-white dark:bg-slate-900 p-2 border border-white/10">
            <div className="flex-1 relative flex items-center">
              <SearchIcon className="absolute left-6 text-slate-300" size={24} />
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search tools: AI, SEO, Text, PDF..." 
                className="w-full py-6 pl-16 pr-6 bg-transparent text-slate-900 dark:text-white font-bold text-lg outline-none"
              />
            </div>
            <button className="bg-blue-600 hover:bg-blue-500 text-white px-12 py-6 rounded-2xl font-black uppercase tracking-widest text-sm transition-all shadow-xl shadow-blue-600/20 active:scale-95">
              Launch Search
            </button>
          </div>

          <div className="mt-12 flex flex-wrap justify-center gap-6 opacity-40 grayscale hover:grayscale-0 transition-all duration-700">
             <div className="flex items-center gap-2 text-white font-black text-xs uppercase tracking-widest bg-white/5 px-6 py-3 rounded-2xl border border-white/10"><TrendingUp size={16} /> SEO Optimized</div>
             <div className="flex items-center gap-2 text-white font-black text-xs uppercase tracking-widest bg-white/5 px-6 py-3 rounded-2xl border border-white/10"><Lock size={16} /> Privacy First</div>
             <div className="flex items-center gap-2 text-white font-black text-xs uppercase tracking-widest bg-white/5 px-6 py-3 rounded-2xl border border-white/10"><Zap size={16} /> Instant Result</div>
          </div>
        </motion.div>
      </section>

      {/* Stats Bar */}
      <div className="container mx-auto px-6 -mt-16 relative z-20">
         <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[3rem] p-4 shadow-2xl shadow-slate-200/50 dark:shadow-none flex flex-col md:flex-row items-center divide-y md:divide-y-0 md:divide-x divide-slate-100 dark:divide-slate-800">
            <div className="flex-1 p-8 text-center">
               <div className="text-3xl font-black text-slate-900 dark:text-white mb-1">100+</div>
               <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Active Tools</div>
            </div>
            <div className="flex-1 p-8 text-center">
               <div className="text-3xl font-black text-blue-600 mb-1">2M+</div>
               <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Requests/Mo</div>
            </div>
            <div className="flex-1 p-8 text-center">
               <div className="text-3xl font-black text-emerald-500 mb-1">99.9%</div>
               <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Uptime Nodes</div>
            </div>
            <div className="flex-1 p-8 text-center bg-blue-50 dark:bg-blue-900/10 rounded-[2.5rem] border border-blue-100 dark:border-blue-900/30">
               <div className="text-3xl font-black text-slate-900 dark:text-white mb-1 flex items-center justify-center gap-2 italic">A+ <span className="text-xs bg-blue-600 text-white px-2 py-0.5 rounded not-italic">SCORE</span></div>
               <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Security Audit</div>
            </div>
         </div>
      </div>

      {/* Main Content Layout */}
      <main className="container mx-auto px-6 py-24 flex flex-col lg:flex-row gap-12">
        {/* Sidebar Categories */}
        <aside className="w-full lg:w-72 flex flex-col gap-12 mt-10">
          <div className="space-y-6">
            <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] px-4">Utility Clusters</h3>
            <div className="space-y-1.5">
              <Link to="/tools" className="w-full flex items-center space-x-4 px-5 py-4 bg-blue-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-blue-200/50">
                 <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center"><Sparkles size={16} /></div>
                 <span>All Systems</span>
              </Link>
              {CATEGORIES.map((cat, i) => (
                <Link
                  key={cat.id}
                  to={`/category/${cat.id}`}
                  className="w-full flex items-center space-x-4 px-5 py-4 border border-transparent rounded-2xl transition-all font-black text-xs uppercase tracking-widest text-slate-600 dark:text-slate-400 hover:bg-white dark:hover:bg-slate-900 hover:border-slate-100 dark:hover:border-slate-800 hover:shadow-sm group"
                >
                  <div className="w-8 h-8 bg-slate-100 dark:bg-slate-800 rounded-lg flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-all">
                    {cat.id === 'ai' ? <Sparkles size={16} /> : 
                     cat.id === 'text' ? <Type size={16} /> :
                     cat.id === 'image' ? <ImageIcon size={16} /> :
                     cat.id === 'pdf' ? <FileText size={16} /> :
                     cat.id === 'finance' ? <Calculator size={16} /> : <SearchIcon size={16} />}
                  </div> 
                  <span>{cat.name}</span>
                </Link>
              ))}
            </div>
          </div>
          
          {/* Affiliate Marketplace */}
          <div className="p-8 bg-gradient-to-br from-orange-500 to-red-600 rounded-[2.5rem] shadow-2xl shadow-orange-200/50 text-white relative overflow-hidden group">
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 blur-3xl rounded-full group-hover:scale-150 transition-transform duration-700" />
            <h5 className="text-[10px] font-black uppercase tracking-widest mb-4 opacity-70">Gear Audit</h5>
            <h4 className="text-xl font-black italic mb-6 leading-tight tracking-tight">UPGRADE YOUR<br/>WORK STATION</h4>
            <div className="w-full aspect-square bg-white/10 backdrop-blur-md rounded-3xl flex flex-col items-center justify-center border border-white/20 mb-8 p-4 text-center">
               <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center mb-4"><Settings size={40} className="animate-spin-slow opacity-20" /></div>
               <div className="text-[10px] font-black uppercase">Referral Node 082</div>
            </div>
            <button className="w-full bg-white text-orange-600 py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] shadow-xl hover:scale-105 transition-all">Check Marketplace</button>
          </div>
        </aside>

        {/* Primary Content Grid */}
        <div className="flex-1 space-y-20">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-100 dark:border-slate-800 pb-10">
            <div>
              <h2 className="text-4xl font-black text-slate-900 dark:text-white tracking-tighter mb-2 italic">POPULAR <span className="text-blue-600 underline decoration-8 underline-offset-8">MODULES</span></h2>
              <p className="text-slate-400 font-bold uppercase text-[10px] tracking-widest">Most executed nodes this week</p>
            </div>
            <Link to="/tools" className="text-[10px] font-black text-blue-600 uppercase tracking-widest hover:underline flex items-center gap-2">View Full Directory <ChevronRight size={14} /></Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {TOOLS.filter(t => t.popular).map((tool, idx) => (
              <motion.div
                key={tool.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="bg-white dark:bg-slate-900 p-10 rounded-[3rem] border border-slate-200 dark:border-slate-800 hover:border-blue-400 dark:hover:border-blue-700 transition-all shadow-sm hover:shadow-xl group cursor-pointer relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-slate-50 dark:bg-slate-800/50 -rotate-45 translate-x-12 -translate-y-12 transition-all group-hover:bg-blue-600 group-hover:translate-x-10 group-hover:-translate-y-10" />
                <Link to={`/tool/${tool.slug}`} className="absolute inset-0 z-10" />
                
                <div className={cn(
                  "w-16 h-16 rounded-2xl flex items-center justify-center text-3xl mb-10 transition-all shadow-sm group-hover:scale-110",
                  idx % 3 === 0 ? "bg-blue-50 dark:bg-blue-900/10 text-blue-600" :
                  idx % 3 === 1 ? "bg-purple-50 dark:bg-purple-900/10 text-purple-600" :
                  "bg-emerald-50 dark:bg-emerald-900/10 text-emerald-600"
                )}>
                   {tool.category === 'ai' ? <Sparkles size={32} /> : 
                    tool.category === 'text' ? <Type size={32} /> :
                    tool.category === 'seo' ? <SearchIcon size={32} /> :
                    tool.category === 'image' ? <ImageIcon size={32} /> :
                    tool.category === 'pdf' ? <FileText size={32} /> :
                    tool.category === 'finance' ? <Calculator size={32} /> : <Zap size={32} />}
                </div>
                <h4 className="text-xl font-black text-slate-900 dark:text-white mb-4 group-hover:text-blue-600 transition-colors uppercase tracking-tight italic">{tool.name}</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-medium mb-10 line-clamp-2">{tool.description}</p>
                <div className="flex items-center text-[10px] uppercase font-black text-blue-600 tracking-widest pt-6 border-t border-slate-50 dark:border-slate-800">
                  Boot Module <ChevronRight size={14} className="ml-2 group-hover:translate-x-2 transition-transform" />
                </div>
              </motion.div>
            ))}
          </div>

          {/* AdSense Long Banner */}
          <div className="bg-slate-100 dark:bg-slate-900 h-32 rounded-[2.5rem] flex items-center justify-center border-2 border-dashed border-slate-200 dark:border-slate-800 group relative">
             <div className="text-[10px] font-black text-slate-300 uppercase tracking-widest group-hover:text-blue-600 transition-colors">728x90 Google AdSense Module</div>
          </div>

          {/* Featured Hub Article */}
          <div className="bg-slate-900 dark:bg-blue-950 rounded-[3rem] p-12 flex flex-col md:flex-row items-center justify-between gap-12 shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 blur-[100px] rounded-full group-hover:scale-150 transition-transform duration-1000" />
            <div className="relative z-10 flex-1">
              <span className="inline-flex items-center gap-2 text-emerald-400 text-[10px] font-black uppercase tracking-[0.3em] mb-6">
                <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" /> Trending Knowledge
              </span>
              <h5 className="text-white text-3xl md:text-5xl font-black italic tracking-tighter mb-10 leading-none">HOW TO DOMINATE<br/>SEARCH IN 2026</h5>
              <Link to="/blog" className="inline-flex bg-white text-slate-900 px-10 py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] shadow-xl hover:bg-blue-50 transition-all hover:scale-105">
                Access Guide
              </Link>
            </div>
            <div className="w-full md:w-64 aspect-square bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2.5rem] flex items-center justify-center text-white p-8 relative">
               <FileText size={80} className="text-white/10 group-hover:scale-110 transition-transform" />
               <div className="absolute top-6 left-6 text-[10px] font-black uppercase opacity-20">Hub Protocol</div>
            </div>
          </div>
        </div>

        {/* AdSense Sidebar */}
        <aside className="hidden xl:flex w-56 flex-col gap-8 mt-10">
          <div className="flex-1 bg-white dark:bg-slate-900 rounded-[2.5rem] flex flex-col items-center justify-center border border-slate-200 dark:border-slate-800 p-8 shadow-sm">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-8 px-2 text-center">SPONSORED NODE</span>
            <div className="w-full h-[480px] bg-slate-50 dark:bg-slate-950 rounded-2xl flex flex-col items-center justify-center border-2 border-dashed border-slate-100 dark:border-slate-800 p-4">
               <div className="text-[8px] font-black text-slate-300 uppercase tracking-widest text-center">160x600<br/>ADSENSE UNIT</div>
            </div>
          </div>
          
          <div className="bg-blue-600 rounded-[2.5rem] p-10 flex flex-col justify-center text-white relative overflow-hidden group shadow-2xl shadow-blue-200/50">
            <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-white/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-1000" />
            <h5 className="text-[10px] font-black uppercase tracking-[0.2em] mb-4 opacity-70">Protocol Update</h5>
            <p className="text-xl font-black italic tracking-tighter mb-8 leading-none">JOIN OUR<br/>DEVELOPER LIST</p>
            <div className="relative">
              <input 
                type="text" 
                placeholder="YOUR NODE EMAIL" 
                className="w-full py-4 px-6 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl text-[10px] font-black uppercase tracking-widest text-white placeholder:text-white/50 focus:bg-white/20 transition-all outline-none"
              />
              <button className="absolute right-2 top-2 h-[calc(100%-1rem)] aspect-square bg-white text-blue-600 rounded-xl flex items-center justify-center shadow-lg active:scale-95 transition-all">
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </aside>
      </main>
    </div>
  );
}

export default function App() {
  return (
    <HelmetProvider>
      <AuthProvider>
        <Router>
          <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary/20">
            <Navbar />
            <main>
              <AnimatePresence mode="wait">
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/tool/:slug" element={<ToolPage />} />
                  <Route path="/tools" element={<ToolsList />} />
                  <Route path="/category/:id" element={<ToolsList />} />
                  <Route path="/blog" element={<BlogList />} />
                  <Route path="/blog/:slug" element={<BlogPost />} />
                  <Route path="/admin" element={<AdminDashboard />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/faq" element={<FAQ />} />
                </Routes>
              </AnimatePresence>
            </main>
            <Footer />
          </div>
        </Router>
      </AuthProvider>
    </HelmetProvider>
  );
}

