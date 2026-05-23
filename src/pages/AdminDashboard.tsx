import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Helmet } from 'react-helmet-async';
import { Navigate, Link } from 'react-router-dom';
import { 
  LayoutDashboard, FileText, Settings, Users, 
  BarChart3, Plus, Search, MoreVertical, 
  TrendingUp, ArrowUpRight, ArrowDownRight,
  Wrench as ToolIcon, Bell, Lock, Database, Trash2
} from 'lucide-react';
import { BLOG_POSTS as INITIAL_BLOGS } from '../blogData';
import { TOOLS as INITIAL_TOOLS } from '../constants';
import { cn } from '../lib/utils';
import { useAuth } from '../contexts/AuthContext';
import { blogService } from '../services/blogService';
import { BlogPost } from '../types';

export default function AdminDashboard() {
  const { isAdmin, loading, user } = useAuth();
  const [activeTab, setActiveTab] = useState<'overview' | 'blogs' | 'tools' | 'users' | 'seo'>('overview');
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [usersCount, setUsersCount] = useState(0);
  const [isSeeding, setIsSeeding] = useState(false);
  const [editingBlog, setEditingBlog] = useState<BlogPost | null>(null);
  const [isBlogModalOpen, setIsBlogModalOpen] = useState(false);
  const [blogForm, setBlogForm] = useState<Omit<BlogPost, 'id' | 'publishedAt'>>({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    author: 'Earnandheal Team',
    categoryId: 'utility',
    featuredImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800'
  });

  useEffect(() => {
    if (isAdmin) {
      fetchBlogs();
    }
  }, [isAdmin]);

  const fetchBlogs = async () => {
    try {
      const posts = await blogService.getAllPosts();
      setBlogs(posts);
    } catch (error) {
      console.error('Error fetching blogs:', error);
    }
  };

  const handleSaveBlog = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingBlog) {
        await blogService.updatePost(editingBlog.id!, blogForm);
      } else {
        await blogService.createPost(blogForm);
      }
      setIsBlogModalOpen(false);
      setEditingBlog(null);
      fetchBlogs();
    } catch (error) {
      alert('Failed to save blog post');
    }
  };

  const openEditBlog = (post: BlogPost) => {
    setEditingBlog(post);
    setBlogForm({
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt,
      content: post.content,
      author: post.author,
      categoryId: post.categoryId,
      featuredImage: post.featuredImage
    });
    setIsBlogModalOpen(true);
  };

  const openNewBlog = () => {
    setEditingBlog(null);
    setBlogForm({
      title: '',
      slug: '',
      excerpt: '',
      content: '',
      author: 'Earnandheal Team',
      categoryId: 'utility',
      featuredImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800'
    });
    setIsBlogModalOpen(true);
  };

  if (loading) return (
    <div className="pt-40 flex flex-col items-center justify-center">
      <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4" />
      <span className="font-black text-slate-400 uppercase tracking-widest text-[10px]">Authenticating Admin...</span>
    </div>
  );

  if (!user || !isAdmin) {
    return (
      <div className="pt-40 flex flex-col items-center justify-center container mx-auto px-6 text-center h-[80vh]">
        <div className="w-24 h-24 bg-red-50 text-red-500 rounded-[2rem] flex items-center justify-center mb-8 shadow-xl shadow-red-200/50">
          <Lock size={48} />
        </div>
        <h1 className="text-5xl font-black text-slate-900 mb-4 tracking-tight">Access Denied</h1>
        <p className="text-slate-500 max-w-md mx-auto mb-10 font-medium">
          Only authorized administrators can access this panel. Restricted area under Earnandheal security protocols.
        </p>
        <Link to="/" className="bg-blue-600 text-white px-10 py-4 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-blue-500 transition-all shadow-xl shadow-blue-200/50">Return Home</Link>
      </div>
    );
  }

  const stats = [
    { name: 'Tool Executions', value: '12,450', change: '+12.5%', trend: 'up', icon: TrendingUp, color: 'text-blue-600', bg: 'bg-blue-50' },
    { name: 'Hub Articles', value: blogs.length.toString(), change: '+24.2%', trend: 'up', icon: FileText, color: 'text-purple-600', bg: 'bg-purple-50' },
    { name: 'Active Nodes', value: '8,902', change: '-2.4%', trend: 'down', icon: Users, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { name: 'Estimated Rev', value: '$1,250.40', change: '+8.1%', trend: 'up', icon: BarChart3, color: 'text-orange-600', bg: 'bg-orange-50' },
  ];

  return (
    <div className="pt-24 min-h-screen bg-[#F8FAFC] dark:bg-slate-950">
      <Helmet>
        <title>Admin Command Center | Earnandheal</title>
      </Helmet>

      <div className="flex flex-col lg:flex-row min-h-[calc(100vh-6rem)]">
        {/* Sidebar Navigation */}
        <aside className="w-full lg:w-72 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 p-8 space-y-12">
          <div className="space-y-2">
            <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-6 px-4">Command Center</h4>
            <button 
              onClick={() => setActiveTab('overview')}
              className={cn(
                "w-full flex items-center gap-4 px-5 py-4 rounded-2xl text-sm font-bold transition-all",
                activeTab === 'overview' ? "bg-blue-600 text-white shadow-xl shadow-blue-200/50" : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800"
              )}
            >
              <LayoutDashboard size={20} /> Dashboard
            </button>
            <button 
              onClick={() => setActiveTab('blogs')}
              className={cn(
                "w-full flex items-center gap-4 px-5 py-4 rounded-2xl text-sm font-bold transition-all",
                activeTab === 'blogs' ? "bg-blue-600 text-white shadow-xl shadow-blue-200/50" : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800"
              )}
            >
              <FileText size={20} /> Content Hub
            </button>
            <button 
              onClick={() => setActiveTab('users')}
              className={cn(
                "w-full flex items-center gap-4 px-5 py-4 rounded-2xl text-sm font-bold transition-all",
                activeTab === 'users' ? "bg-blue-600 text-white shadow-xl shadow-blue-200/50" : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800"
              )}
            >
              <Users size={20} /> User Network
            </button>
            <button 
              onClick={() => setActiveTab('tools')}
              className={cn(
                "w-full flex items-center gap-4 px-5 py-4 rounded-2xl text-sm font-bold transition-all",
                activeTab === 'tools' ? "bg-blue-600 text-white shadow-xl shadow-blue-200/50" : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800"
              )}
            >
              <ToolIcon size={20} /> Tool Library
            </button>
            <button 
              onClick={() => setActiveTab('seo')}
              className={cn(
                "w-full flex items-center gap-4 px-5 py-4 rounded-2xl text-sm font-bold transition-all",
                activeTab === 'seo' ? "bg-blue-600 text-white shadow-xl shadow-blue-200/50" : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800"
              )}
            >
              <Settings size={20} /> SEO Node
            </button>
          </div>

          <div className="pt-8 border-t border-slate-100 dark:border-slate-800 space-y-6">
            <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-4">System Actions</h4>
            <button 
              onClick={handleSeedDatabase}
              disabled={isSeeding}
              className="w-full flex items-center gap-3 px-5 py-4 rounded-2xl text-xs font-black uppercase tracking-widest bg-emerald-50 text-emerald-600 hover:bg-emerald-100 transition-all border border-emerald-100 disabled:opacity-50"
            >
              <Database size={16} /> Seed Database
            </button>
          </div>
        </aside>

        {/* Main Workspace */}
        <main className="flex-1 p-8 lg:p-12 overflow-y-auto">
          <header className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-16">
            <div>
              <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-2">Systems <span className="text-blue-600 italic">Operational</span></h1>
              <p className="text-slate-500 font-medium">Monitoring Earnandheal core metrics and content clusters.</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <div className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-tighter">Admin Node 01</div>
                <div className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest">Connected</div>
              </div>
              <div className="w-14 h-14 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl flex items-center justify-center text-white font-black text-xl shadow-xl shadow-blue-200/50">
                {user.email?.[0].toUpperCase()}
              </div>
            </div>
          </header>

          <AnimatePresence mode="wait">
            {activeTab === 'overview' && (
              <motion.div 
                key="overview"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="space-y-12"
              >
                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {stats.map((stat, i) => (
                    <div key={i} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-8 rounded-[2.5rem] shadow-sm relative overflow-hidden group">
                      <div className={cn("absolute top-0 right-0 w-24 h-24 blur-[40px] opacity-20 rounded-full bg-current", stat.color)} />
                      <div className="flex justify-between items-start mb-6">
                        <div className={cn("p-4 rounded-2xl transition-all group-hover:scale-110", stat.bg, stat.color)}>
                          <stat.icon size={24} />
                        </div>
                        <div className={cn(
                          "flex items-center gap-1 text-[10px] font-black px-3 py-1.5 rounded-full uppercase tracking-widest shadow-sm",
                          stat.trend === 'up' ? "bg-emerald-50 text-emerald-600" : "bg-red-50 text-red-500"
                        )}>
                          {stat.trend === 'up' ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                          {stat.change}
                        </div>
                      </div>
                      <div className="text-4xl font-black text-slate-900 dark:text-white mb-2 tracking-tighter">{stat.value}</div>
                      <div className="text-[10px] text-slate-400 font-black uppercase tracking-[0.2em]">{stat.name}</div>
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                  {/* Recent Articles */}
                  <div className="xl:col-span-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[3rem] shadow-sm overflow-hidden">
                    <div className="p-8 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center bg-slate-50/50 dark:bg-slate-950/20">
                      <h3 className="font-black text-slate-900 dark:text-white flex items-center gap-3 uppercase tracking-widest text-xs"><FileText size={18} className="text-blue-600" /> Active Articles</h3>
                      <button onClick={openNewBlog} className="bg-blue-600 text-white px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-500 transition-all shadow-lg shadow-blue-200/50 flex items-center gap-2">
                        <Plus size={14} /> New Publication
                      </button>
                    </div>
                    <div className="overflow-x-auto">
                      <table className="w-full text-left">
                        <thead>
                          <tr className="border-b border-slate-50 dark:border-slate-800 text-[10px] uppercase tracking-widest font-black text-slate-400">
                            <th className="px-8 py-5">Article Meta</th>
                            <th className="px-8 py-5 text-center">Engagement</th>
                            <th className="px-8 py-5">Node Status</th>
                            <th className="px-8 py-5">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
                          {blogs.length > 0 ? blogs.map((post) => (
                            <tr key={post.id} className="group hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                              <td className="px-8 py-5">
                                <div className="font-extrabold text-slate-900 dark:text-white text-sm mb-1 group-hover:text-blue-600 transition-colors">{post.title}</div>
                                <div className="text-[10px] font-black uppercase tracking-widest text-slate-400">{post.categoryId}</div>
                              </td>
                              <td className="px-8 py-5 text-center">
                                <div className="text-sm font-black text-slate-900 dark:text-white tracking-widest">{(Math.random() * 5).toFixed(1)}k</div>
                                <div className="text-[9px] font-bold text-slate-400 uppercase">Total Views</div>
                              </td>
                              <td className="px-8 py-5">
                                <span className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-50 dark:bg-emerald-950/20 text-emerald-600 text-[9px] font-black uppercase tracking-widest rounded-full border border-emerald-100 dark:border-emerald-900/40">
                                  <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" /> Live
                                </span>
                              </td>
                              <td className="px-8 py-5">
                                <button onClick={() => openEditBlog(post)} className="p-2.5 bg-slate-100 dark:bg-slate-800 rounded-xl text-slate-500 dark:text-slate-400 hover:bg-blue-600 hover:text-white transition-all"><MoreVertical size={16} /></button>
                              </td>
                            </tr>
                          )) : (
                            <tr>
                              <td colSpan={4} className="px-8 py-20 text-center">
                                <div className="text-slate-400 font-bold italic">No articles found. Use "Seed Database" to populate.</div>
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Tool Metrics */}
                  <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[3rem] p-10 shadow-sm flex flex-col">
                    <h3 className="font-black text-slate-900 dark:text-white mb-10 uppercase tracking-widest text-xs flex items-center gap-3"><ToolIcon size={20} className="text-blue-600" /> Tool Clusters</h3>
                    <div className="space-y-8 flex-1">
                      {INITIAL_TOOLS.slice(0, 6).map((tool, i) => (
                        <div key={i} className="flex items-center justify-between group">
                          <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-slate-50 dark:bg-slate-800 rounded-xl flex items-center justify-center font-black text-blue-600 text-xs italic group-hover:bg-blue-600 group-hover:text-white transition-all shadow-sm">
                              0{i+1}
                            </div>
                            <div className="text-sm font-extrabold text-slate-900 dark:text-white group-hover:text-blue-600 transition-colors uppercase tracking-tight">{tool.name}</div>
                          </div>
                          <div className="text-[10px] font-black text-slate-400 font-mono">{(Math.random() * 1000).toFixed(0)} OPS/H</div>
                        </div>
                      ))}
                    </div>
                    <button className="mt-12 w-full py-4 bg-slate-50 dark:bg-slate-800 rounded-2xl text-[10px] font-black uppercase tracking-widest text-slate-500 hover:bg-slate-100 transition-all border border-slate-100 dark:border-slate-700">
                      View full stack report
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'blogs' && (
              <motion.div
                key="blogs"
                initial={{ opacity: 0, x: 15 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -15 }}
                className="space-y-8"
              >
                 <div className="flex justify-between items-center bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800">
                    <div>
                      <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-1">Article Inventory</h2>
                      <p className="text-slate-500 text-sm font-medium">Manage and deploy site content across all nodes.</p>
                    </div>
                    <button onClick={openNewBlog} className="bg-blue-600 text-white px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-xs shadow-xl shadow-blue-200/50 flex items-center gap-3">
                      <Plus size={18} /> Deploy New Node
                    </button>
                 </div>

                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                   {blogs.map(post => (
                     <div key={post.id} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[2rem] p-6 shadow-sm group">
                        <div className="aspect-video bg-slate-100 dark:bg-slate-800 rounded-2xl mb-6 overflow-hidden relative">
                          <img src={post.featuredImage} className="w-full h-full object-cover opacity-80 group-hover:scale-110 transition-transform duration-500" />
                          <div className="absolute top-4 left-4 flex gap-2">
                             <span className="px-3 py-1 bg-blue-600 text-white text-[9px] font-black uppercase tracking-widest rounded-full shadow-lg">{post.categoryId}</span>
                          </div>
                        </div>
                        <h4 className="font-extrabold text-slate-900 dark:text-white mb-2 line-clamp-2 uppercase tracking-tight group-hover:text-blue-600 transition-colors">{post.title}</h4>
                        <p className="text-xs text-slate-500 mb-6 line-clamp-2">{post.excerpt}</p>
                        <div className="flex gap-2">
                          <button onClick={() => openEditBlog(post)} className="flex-1 bg-slate-900 text-white py-3 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-700 transition-all">Edit Node</button>
                          <button onClick={() => {
                            if(window.confirm('Delete this article?')) {
                              blogService.deletePost(post.id!).then(fetchBlogs);
                            }
                          }} className="p-3 bg-red-50 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all"><Trash2 size={16} /></button>
                        </div>
                     </div>
                   ))}
                 </div>
              </motion.div>
            )}

            {activeTab === 'tools' && (
              <motion.div
                key="tools"
                initial={{ opacity: 0, x: 15 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -15 }}
                className="space-y-8"
              >
                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[3rem] overflow-hidden shadow-sm">
                   <div className="p-8 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/20">
                      <h3 className="font-black text-slate-900 dark:text-white uppercase tracking-widest text-xs">Utility Control Matrix</h3>
                   </div>
                   <div className="overflow-x-auto">
                      <table className="w-full text-left">
                        <thead>
                          <tr className="border-b border-slate-50 dark:border-slate-800 text-[10px] uppercase tracking-widest font-black text-slate-400">
                             <th className="px-8 py-5">Tool Name</th>
                             <th className="px-8 py-5">Classification</th>
                             <th className="px-8 py-5">USA Priority</th>
                             <th className="px-8 py-5">Endpoint Status</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
                          {INITIAL_TOOLS.map((tool) => (
                            <tr key={tool.id} className="group hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                               <td className="px-8 py-5 text-sm font-bold text-slate-900 dark:text-white">{tool.name}</td>
                               <td className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400">{tool.category}</td>
                               <td className="px-8 py-5">
                                  {tool.popular ? (
                                    <span className="px-2 py-0.5 bg-blue-600 text-white text-[8px] font-black rounded-full uppercase">High</span>
                                  ) : (
                                    <span className="px-2 py-0.5 bg-slate-100 dark:bg-slate-800 text-slate-400 text-[8px] font-black rounded-full uppercase">Standard</span>
                                  )}
                               </td>
                               <td className="px-8 py-5 text-xs text-emerald-500 font-bold italic">Active Cluster</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                   </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'users' && (
              <motion.div
                key="users"
                initial={{ opacity: 0, x: 15 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -15 }}
                className="space-y-8"
              >
                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[3rem] p-20 text-center shadow-sm">
                   <div className="w-24 h-24 bg-blue-50 dark:bg-blue-900/20 text-blue-600 rounded-[2rem] flex items-center justify-center mx-auto mb-8 shadow-xl shadow-blue-200/50">
                      <Users size={48} />
                   </div>
                   <h2 className="text-4xl font-black text-slate-900 dark:text-white mb-4 tracking-tight uppercase italic">User Network <span className="text-blue-600">Encrypted</span></h2>
                   <p className="text-slate-500 max-w-md mx-auto font-medium mb-10">Access to the global user matrix is restricted to Tier-1 administrators. User protocols are currently being optimized for USA privacy standards.</p>
                   <div className="inline-flex items-center gap-2 px-6 py-3 bg-slate-50 dark:bg-slate-800 rounded-full border border-slate-100 dark:border-slate-700">
                      <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                      <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Nodes Synchronizing...</span>
                   </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'seo' && (
              <motion.div
                key="seo"
                initial={{ opacity: 0, x: 15 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -15 }}
                className="space-y-8"
              >
                 <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[3rem] p-10 shadow-sm">
                       <h3 className="text-xl font-black text-slate-900 dark:text-white mb-8 uppercase tracking-tighter flex items-center gap-3"><Settings size={22} className="text-blue-600" /> Platform Metadata</h3>
                       <div className="space-y-6">
                          <div className="space-y-2">
                             <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-1">Global Site Title</label>
                             <input type="text" defaultValue="Earnandheal | USA Utility & Content Hub" className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 rounded-2xl p-4 font-bold text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-400" />
                          </div>
                          <div className="space-y-2">
                             <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-1">SEO Description</label>
                             <textarea defaultValue="The ultimate collection of high-performance tools, calculators, and professional articles optimized for the USA ecosystem." className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 rounded-2xl p-4 font-medium text-slate-600 dark:text-slate-400 outline-none focus:ring-2 focus:ring-blue-400 min-h-[120px]" />
                          </div>
                          <button className="w-full py-4 bg-slate-900 text-white rounded-2xl font-black uppercase tracking-widest text-xs shadow-xl shadow-slate-200 transition-all hover:bg-slate-800">Update Metadata Node</button>
                       </div>
                    </div>

                    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[3rem] p-10 shadow-sm">
                       <h3 className="text-xl font-black text-slate-900 dark:text-white mb-8 uppercase tracking-tighter flex items-center gap-3"><BarChart3 size={22} className="text-blue-600" /> SEO Performance</h3>
                       <div className="space-y-8">
                          {[
                            { label: 'Google Search Console Sync', status: 'Optimal', color: 'text-emerald-500' },
                            { label: 'Sitemap XML Deployment', status: 'Verified', color: 'text-emerald-500' },
                            { label: 'Robots.txt Configuration', status: 'Locked', color: 'text-blue-500' },
                            { label: 'Canonical URL Matrix', status: 'Operational', color: 'text-emerald-500' }
                          ].map((item, i) => (
                            <div key={i} className="flex justify-between items-center pb-4 border-b border-slate-50 dark:border-slate-800">
                               <span className="text-sm font-bold text-slate-600 dark:text-slate-400">{item.label}</span>
                               <span className={cn("text-[10px] font-black uppercase tracking-widest", item.color)}>{item.status}</span>
                            </div>
                          ))}
                       </div>
                       <div className="mt-8 p-6 bg-slate-50 dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700">
                          <p className="text-[10px] text-slate-400 font-bold uppercase leading-relaxed">System Note: SEO nodes are automatically optimized every 24 hours based on USA search trends and keyword density analysis.</p>
                       </div>
                    </div>
                 </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Blog Modal */}
          <AnimatePresence>
            {isBlogModalOpen && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-slate-950/60 backdrop-blur-md">
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="bg-white dark:bg-slate-900 w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-[3rem] shadow-2xl overflow-hidden"
                >
                  <div className="p-10 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center bg-slate-50/50 dark:bg-slate-950/20">
                    <h3 className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tighter italic">{editingBlog ? 'Update Content Node' : 'Initialize Content Node'}</h3>
                    <button onClick={() => setIsBlogModalOpen(false)} className="w-10 h-10 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center hover:bg-slate-200 transition-all">✕</button>
                  </div>
                  
                  <form onSubmit={handleSaveBlog} className="p-10 space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-3">
                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-1">Publication Title</label>
                        <input 
                          type="text" required
                          value={blogForm.title}
                          onChange={e => setBlogForm({...blogForm, title: e.target.value})}
                          className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 rounded-2xl p-4 font-bold text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-400 outline-none" 
                          placeholder="e.g. Master the USA Utility Landscape"
                        />
                      </div>
                      <div className="space-y-3">
                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-1">URL Endpoint (Slug)</label>
                        <input 
                          type="text" required
                          value={blogForm.slug}
                          onChange={e => setBlogForm({...blogForm, slug: e.target.value})}
                          className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 rounded-2xl p-4 font-bold text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-400 outline-none" 
                          placeholder="master-the-landscape"
                        />
                      </div>
                    </div>

                    <div className="space-y-3">
                      <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-1">Engagement Excerpt</label>
                      <textarea 
                        required
                        value={blogForm.excerpt}
                        onChange={e => setBlogForm({...blogForm, excerpt: e.target.value})}
                        className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 rounded-2xl p-4 font-medium text-slate-600 dark:text-slate-400 focus:ring-2 focus:ring-blue-400 outline-none min-h-[80px]" 
                        placeholder="A brief teaser to pull readers in..."
                      />
                    </div>

                    <div className="space-y-3">
                      <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-1">Featured Visual URL</label>
                      <input 
                        type="text" required
                        value={blogForm.featuredImage}
                        onChange={e => setBlogForm({...blogForm, featuredImage: e.target.value})}
                        className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 rounded-2xl p-4 font-medium text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-400 outline-none" 
                      />
                    </div>

                    <div className="space-y-3">
                      <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-1">Core Narrative (Markdown)</label>
                      <textarea 
                        required
                        value={blogForm.content}
                        onChange={e => setBlogForm({...blogForm, content: e.target.value})}
                        className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 rounded-2xl p-6 font-mono text-xs leading-relaxed text-slate-600 dark:text-slate-400 focus:ring-2 focus:ring-blue-400 outline-none min-h-[300px]" 
                        placeholder="# Heading&#10;&#10;Write your professional content here..."
                      />
                    </div>

                    <div className="flex gap-4 pt-6">
                      <button type="submit" className="flex-1 bg-blue-600 text-white py-5 rounded-[2rem] font-black uppercase tracking-widest text-sm shadow-xl shadow-blue-200/50 hover:bg-blue-500 transition-all">
                        {editingBlog ? 'Commit Updates' : 'Authorize Publication'}
                      </button>
                      <button type="button" onClick={() => setIsBlogModalOpen(false)} className="px-10 py-5 bg-slate-100 dark:bg-slate-800 rounded-[2rem] font-black uppercase tracking-widest text-sm text-slate-500 transition-all">
                        Cancel
                      </button>
                    </div>
                  </form>
                </motion.div>
              </div>
            )}
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}
