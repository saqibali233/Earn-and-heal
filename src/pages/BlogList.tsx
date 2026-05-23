import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Calendar, User, ArrowRight, Loader2 } from 'lucide-react';
import { format } from 'date-fns';
import { blogService } from '../services/blogService';
import { BlogPost } from '../types';

export default function BlogList() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const fetchedPosts = await blogService.getAllPosts();
        setPosts(fetchedPosts);
      } catch (error) {
        console.error('Error fetching blog posts:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  if (loading) {
    return (
      <div className="pt-60 pb-40 flex flex-col items-center justify-center bg-[#F8FAFC] dark:bg-slate-950 min-h-screen">
        <Loader2 className="w-12 h-12 text-blue-600 animate-spin mb-4" />
        <span className="font-black text-slate-400 uppercase tracking-widest text-xs">Syncing Knowledge Nodes...</span>
      </div>
    );
  }

  return (
    <div className="pt-40 pb-20 bg-[#F8FAFC] dark:bg-slate-950 min-h-screen">
      <Helmet>
        <title>SEO & Utility Blog | Earnandheal</title>
        <meta name="description" content="Stay updated with the latest SEO strategies, AI tools, and utility tips on the Earnandheal blog." />
      </Helmet>

      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-extrabold text-slate-900 dark:text-white mb-6 tracking-tight">The Earnandheal <span className="text-blue-600 font-black italic">Hub</span></h1>
          <p className="text-lg text-slate-500 dark:text-slate-400 max-w-2xl mx-auto font-medium">
            Insights, tutorials, and industry news to help you dominate the digital landscape.
          </p>
        </div>

        {posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post, idx) => (
              <motion.article 
                key={post.id}
                initial={{ opacity: 0, scale: 0.98 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.05 }}
                className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[2rem] overflow-hidden hover:shadow-xl transition-all group shadow-sm"
              >
                <Link to={`/blog/${post.slug}`}>
                  <div className="aspect-[16/10] overflow-hidden relative">
                    <img 
                      src={post.featuredImage} 
                      alt={post.title} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-6 left-6">
                      <span className="bg-blue-600 text-white px-5 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg shadow-blue-600/30">
                        {post.categoryId}
                      </span>
                    </div>
                  </div>
                  <div className="p-8">
                    <div className="flex items-center gap-6 text-[10px] font-black uppercase tracking-widest text-slate-400 mb-6 px-1">
                      <span className="flex items-center gap-2"><Calendar size={14} className="text-blue-600" /> {format(post.publishedAt, 'MMM dd, yyyy')}</span>
                      <span className="flex items-center gap-2"><User size={14} className="text-blue-600" /> By {post.authorId}</span>
                    </div>
                    <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white mb-4 group-hover:text-blue-600 transition-colors leading-tight tracking-tight">
                      {post.title}
                    </h2>
                    <p className="text-slate-500 dark:text-slate-400 text-xs line-clamp-3 mb-8 leading-relaxed font-medium">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center text-[10px] font-black text-blue-600 uppercase tracking-widest pt-4 border-t border-slate-50 dark:border-slate-800">
                      Read Full Article <ArrowRight size={14} className="ml-2 group-hover:translate-x-2 transition-transform" />
                    </div>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>
        ) : (
          <div className="text-center py-40">
            <h3 className="text-2xl font-black text-slate-300">No Articles Operational Yet</h3>
          </div>
        )}
      </div>
    </div>
  );
}
