import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Helmet } from 'react-helmet-async';
import { Calendar, User, ArrowLeft, Share2, Facebook, Twitter, Linkedin, List as ListIcon, Loader2, Tag } from 'lucide-react';
import { format } from 'date-fns';
import ReactMarkdown from 'react-markdown';
import { blogService } from '../services/blogService';
import { BlogPost as BlogPostType } from '../types';

export default function BlogPost() {
  const { slug } = useParams();
  const [post, setPost] = useState<BlogPostType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      if (!slug) return;
      try {
        const fetchedPost = await blogService.getPostBySlug(slug);
        setPost(fetchedPost);
      } catch (error) {
        console.error('Error fetching post:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [slug]);

  if (loading) {
    return (
      <div className="pt-60 pb-40 flex flex-col items-center justify-center bg-[#F8FAFC] dark:bg-slate-950 min-h-screen">
        <Loader2 className="w-12 h-12 text-blue-600 animate-spin mb-4" />
        <span className="font-black text-slate-400 uppercase tracking-widest text-xs">Accessing Knowledge Node...</span>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="pt-40 pb-20 container mx-auto px-6 text-center">
        <h1 className="text-4xl font-black text-slate-900 mb-6">Article Offline</h1>
        <p className="text-slate-500 mb-10">The requested article could not be retrieved from the network.</p>
        <Link to="/blog" className="text-blue-600 font-black uppercase tracking-widest text-xs flex items-center justify-center gap-2">
          <ArrowLeft size={16} /> Return to Hub
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-20 bg-[#F8FAFC] dark:bg-slate-950 min-h-screen">
      <Helmet>
        <title>{post.title} | Earnandheal Hub</title>
        <meta name="description" content={post.excerpt} />
      </Helmet>

      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <Link to="/blog" className="inline-flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-blue-600 transition-colors mb-10 bg-white dark:bg-slate-900 px-6 py-3 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800">
            <ArrowLeft size={14} /> Back to Hub
          </Link>

          <header className="mb-12">
            <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6">
              <span className="bg-blue-600 text-white px-5 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg shadow-blue-600/30">{post.categoryId}</span>
              <span className="flex items-center gap-2 font-black uppercase text-[10px] tracking-widest text-slate-400"><Calendar size={14} className="text-blue-600" /> {format(post.publishedAt, 'MMMM dd, yyyy')}</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white leading-[1.1] tracking-tight mb-10">
              {post.title}
            </h1>
            <div className="flex items-center justify-between border-y border-slate-100 dark:border-slate-800 py-8">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl flex items-center justify-center text-white font-black text-xl shadow-xl shadow-blue-200/50">
                  {post.authorId[0].toUpperCase()}
                </div>
                <div>
                  <div className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-tight italic">By {post.authorId}</div>
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Verified Specialist</div>
                </div>
              </div>
              <div className="flex gap-4">
                <button className="p-3 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-xl hover:bg-slate-50 transition-all shadow-sm"><Facebook size={18} /></button>
                <button className="p-3 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-xl hover:bg-slate-50 transition-all shadow-sm"><Twitter size={18} /></button>
                <button className="p-3 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-xl hover:bg-slate-50 transition-all shadow-sm"><Linkedin size={18} /></button>
                <button className="p-3 bg-blue-600 text-white rounded-xl hover:bg-blue-500 transition-all shadow-xl shadow-blue-200/50"><Share2 size={18} /></button>
              </div>
            </div>
          </header>

          <div className="flex flex-col lg:flex-row gap-12">
            {/* Table of Contents - Desktop Only Sidebar */}
            <aside className="hidden lg:block w-64 shrink-0 h-fit sticky top-32">
              <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-[2rem] p-8 shadow-sm">
                <h4 className="font-black mb-6 flex items-center gap-3 text-[10px] uppercase tracking-widest text-slate-900 dark:text-white">
                  <ListIcon size={16} className="text-blue-600" /> Contents
                </h4>
                <nav className="text-xs space-y-4 font-bold text-slate-500 uppercase tracking-tighter">
                  <a href="#" className="hover:text-blue-600 transition-colors block border-l-2 border-transparent hover:border-blue-600 pl-4">Introduction</a>
                  <a href="#" className="hover:text-blue-600 transition-colors block border-l-2 border-transparent hover:border-blue-600 pl-4">Key Insights</a>
                  <a href="#" className="hover:text-primary transition-colors block border-l-2 border-transparent hover:border-blue-600 pl-4">The Strategy</a>
                  <a href="#" className="hover:text-blue-600 transition-colors block border-l-2 border-transparent hover:border-blue-600 pl-4">Final Thoughts</a>
                </nav>
              </div>
            </aside>

            {/* Article Content */}
            <article className="flex-1">
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[3rem] overflow-hidden shadow-lg mb-12">
                <img 
                  src={post.featuredImage} 
                  alt={post.title} 
                  className="w-full aspect-video object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="p-8 md:p-14">
                  <div className="prose prose-slate dark:prose-invert max-w-none">
                    <div className="markdown-body">
                      <ReactMarkdown>{post.content}</ReactMarkdown>
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="mt-16 pt-12 border-t border-slate-50 dark:border-slate-800 flex flex-wrap gap-3">
                    {post.tags.map(tag => (
                      <span key={tag} className="flex items-center gap-2 px-5 py-2.5 bg-slate-50 dark:bg-slate-800 text-slate-500 text-[10px] font-black uppercase tracking-widest rounded-xl border border-slate-100 dark:border-slate-700">
                        <Tag size={12} className="text-blue-600" /> {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Affiliate CTA */}
              <div className="bg-gradient-to-br from-indigo-900 to-slate-900 rounded-[3rem] p-12 text-white shadow-2xl relative overflow-hidden group">
                <div className="absolute -top-24 -right-24 w-64 h-64 bg-blue-600/20 blur-[100px] rounded-full" />
                <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-10">
                  <div className="max-w-md text-center md:text-left">
                    <h4 className="text-3xl font-black mb-4 italic tracking-tight leading-none">Scale Your Business with <span className="text-blue-400 underline decoration-4 underline-offset-8">Pro SEO Tools</span></h4>
                    <p className="text-slate-300 font-medium mb-8">Get the premium stack used by Earnandheal experts. Verified for performance.</p>
                    <button className="bg-white text-indigo-900 px-10 py-4 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-blue-50 transition-all shadow-xl shadow-white/10 group-hover:scale-105">Upgrade Now</button>
                  </div>
                </div>
              </div>
            </article>
          </div>
        </div>
      </div>
    </div>
  );
}
