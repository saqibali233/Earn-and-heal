import { useState, useMemo, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Helmet } from 'react-helmet-async';
import { 
  Search as SearchIcon, Filter, 
  Grid, List as ListIcon, 
  Sparkles, ChevronRight, Zap,
  Type, ImageIcon, Calculator, 
  ShieldCheck, Globe, FileCode,
  Layout, Search as SEOCheck,
  FileText, Briefcase
} from 'lucide-react';
import { TOOLS, CATEGORIES } from '../constants';
import { cn } from '../lib/utils';

const CATEGORY_ICONS: Record<string, any> = {
  'ai': Sparkles,
  'text': Type,
  'seo': Globe,
  'image': ImageIcon,
  'pdf': FileText,
  'finance': Calculator
};

export default function ToolsList() {
  const { id } = useParams();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  useEffect(() => {
    if (id) {
      setSelectedCategory(id);
    }
  }, [id]);

  const filteredTools = useMemo(() => {
    return TOOLS.filter(tool => {
      const matchesSearch = tool.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          tool.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = !selectedCategory || tool.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <div className="pt-40 pb-20 bg-[#F8FAFC] dark:bg-slate-950 min-h-screen">
      <Helmet>
        <title>All Online Tools & Utilities | Earnandheal</title>
        <meta name="description" content="Explore our library of free, professional online tools for SEO, content creation, and utility functions." />
      </Helmet>

      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-16">
          <div className="flex-1">
            <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white mb-4 tracking-tight">Utility <span className="text-blue-600 font-black italic">Directory</span></h1>
            <p className="text-slate-500 dark:text-slate-400 font-medium">Discover professional-grade tools designed for speed and reliability.</p>
          </div>
          
          <div className="flex items-center gap-4 w-full md:w-auto">
            <div className="relative flex-1 md:flex-none">
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search tools..." 
                className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl py-4 px-12 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 md:w-80 shadow-sm"
              />
              <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
            </div>
            <div className="hidden sm:flex border border-slate-200 dark:border-slate-800 rounded-xl p-1 bg-white dark:bg-slate-900 shadow-sm h-full">
              <button 
                onClick={() => setViewMode('grid')}
                className={cn("p-3 rounded-lg transition-all", viewMode === 'grid' ? "bg-blue-600 text-white shadow-lg shadow-blue-200/50" : "text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800")}
              >
                <Grid size={20} />
              </button>
              <button 
                onClick={() => setViewMode('list')}
                className={cn("p-3 rounded-lg transition-all", viewMode === 'list' ? "bg-blue-600 text-white shadow-lg shadow-blue-200/50" : "text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800")}
              >
                <ListIcon size={20} />
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <aside className="w-full lg:w-64 h-fit lg:sticky lg:top-32 space-y-10">
            <div>
              <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-6 px-4">Categories</h4>
              <div className="space-y-1">
                <button 
                  onClick={() => setSelectedCategory(null)}
                  className={cn(
                    "w-full text-left px-4 py-3 rounded-xl text-sm font-bold transition-all",
                    !selectedCategory ? "bg-blue-600 text-white shadow-lg shadow-blue-200/50" : "text-slate-600 dark:text-slate-400 hover:bg-white dark:hover:bg-slate-900"
                  )}
                >
                  All Tools
                </button>
                {CATEGORIES.map(cat => (
                  <button 
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={cn(
                      "w-full text-left px-4 py-3 rounded-xl text-sm font-bold transition-all flex justify-between items-center group",
                      selectedCategory === cat.id ? "bg-blue-600 text-white shadow-lg shadow-blue-200/50" : "text-slate-600 dark:text-slate-400 hover:bg-white dark:hover:bg-slate-900"
                    )}
                  >
                    <span>{cat.name}</span>
                    <span className={cn("text-[10px] opacity-40 font-black", selectedCategory === cat.id ? "text-white" : "")}>{TOOLS.filter(t => t.category === cat.id).length}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-orange-50 dark:bg-orange-950/20 p-6 rounded-2xl border border-orange-100 dark:border-orange-900/40">
              <h5 className="font-black text-xs text-orange-500 uppercase tracking-widest mb-2">Request Tool</h5>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mb-4">Need a specific utility? Suggest it and our dev team will build it.</p>
              <Link to="/contact" className="text-[10px] font-black text-orange-600 uppercase tracking-widest hover:underline flex items-center gap-1">Suggest Now <ChevronRight size={12} /></Link>
            </div>
          </aside>

          {/* Tools Grid/List */}
          <div className="flex-1">
            <AnimatePresence mode="popLayout">
              {filteredTools.length > 0 ? (
                <motion.div 
                  layout
                  className={cn(
                    "grid gap-6",
                    viewMode === 'grid' ? "grid-cols-1 md:grid-cols-2 xl:grid-cols-3" : "grid-cols-1"
                  )}
                >
                  {filteredTools.map((tool, idx) => (
                    <motion.div
                      key={tool.id}
                      layout
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.98 }}
                      className={cn(
                        "group border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-blue-400 dark:hover:border-blue-700 transition-all relative overflow-hidden shadow-sm",
                        viewMode === 'grid' ? "p-8 rounded-[2rem]" : "p-4 px-6 rounded-2xl flex items-center justify-between"
                      )}
                    >
                      <Link to={`/tool/${tool.slug}`} className="absolute inset-0 z-10" />
                      <div className={cn("flex items-center gap-5", viewMode === 'grid' ? "flex-col items-start" : "flex-row")}>
                        <div className={cn(
                          "rounded-2xl flex items-center justify-center transition-all shadow-sm relative", 
                          viewMode === 'grid' ? "w-14 h-14 bg-blue-50 dark:bg-blue-900/10 text-blue-600" : "w-10 h-10 shrink-0 bg-slate-50 dark:bg-slate-800 text-slate-400 group-hover:bg-blue-600 group-hover:text-white"
                        )}>
                          {(() => {
                            const Icon = CATEGORY_ICONS[tool.category] || Zap;
                            return <Icon size={viewMode === 'grid' ? 28 : 20} className={viewMode === 'grid' ? "fill-blue-600/10" : ""} />;
                          })()}
                        </div>
                        {tool.popular && viewMode === 'grid' && (
                          <div className="absolute top-6 right-6 bg-blue-600 text-[8px] font-black text-white px-2 py-1 rounded-full uppercase tracking-tighter">USA Popular</div>
                        )}
                        <div>
                          <h3 className={cn("font-extrabold tracking-tight group-hover:text-blue-600 transition-colors", viewMode === 'grid' ? "text-xl mb-2" : "text-base")}>{tool.name}</h3>
                          {viewMode === 'grid' && <p className="text-slate-500 dark:text-slate-400 text-xs leading-relaxed line-clamp-2">{tool.description}</p>}
                        </div>
                      </div>
                      
                      <div className={cn("flex items-center text-[10px] uppercase font-black text-blue-600 tracking-widest", viewMode === 'grid' ? "mt-6" : "")}>
                        {viewMode === 'grid' ? "Launch Tool" : <ChevronRight size={18} />}
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              ) : (
                <div className="text-center py-40 bg-slate-50 dark:bg-slate-900/50 rounded-[3rem] border-2 border-dashed border-slate-200 dark:border-slate-800">
                  <SearchIcon className="mx-auto mb-6 text-slate-200 dark:text-slate-800" size={80} />
                  <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-2">No tools found</h3>
                  <p className="text-slate-500 dark:text-slate-400 font-medium italic">Try adjusting your search for 'utilities' or 'SEO tools'.</p>
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
