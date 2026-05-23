import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Helmet } from 'react-helmet-async';
import { 
  ArrowLeft, Share2, Bookmark, Info, 
  MessageSquare, Star, Clock, Zap,
  Copy, CheckCircle2, RotateCcw,
  Sparkles, Search, Type, Image as ImageIcon,
  FileText, Calculator, ShieldCheck, Download
} from 'lucide-react';
import { TOOLS } from '../constants';
import { useState, useEffect } from 'react';
import { generateContent } from '../services/ai';
import { cn } from '../lib/utils';

export default function ToolPage() {
  const { slug } = useParams();
  const tool = TOOLS.find(t => t.slug === slug);
  
  // State for different tools
  const [inputText, setInputText] = useState('');
  const [aiResult, setAiResult] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [imageUrl, setImageUrl] = useState('');

  // Word Counter States
  const [stats, setStats] = useState({ words: 0, chars: 0, sentences: 0, readTime: 0 });

  // Finance Tools States
  const [loanAmount, setLoanAmount] = useState('10000');
  const [interestRate, setInterestRate] = useState('5');
  const [loanTerm, setLoanTerm] = useState('12');
  const [monthlyPayment, setMonthlyPayment] = useState<number | null>(null);

  const [tipBill, setTipBill] = useState('50');
  const [tipPerc, setTipPerc] = useState('15');
  const [tipPeople, setTipPeople] = useState('1');
  const [tipResult, setTipResult] = useState<{ tip: number, total: number, each: number } | null>(null);

  const [price, setPrice] = useState('100');
  const [taxRate, setTaxRate] = useState('7.5');
  const [taxResult, setTaxResult] = useState<number | null>(null);

  const [weight, setWeight] = useState('160');
  const [height, setHeight] = useState('70');
  const [bmiResult, setBmiResult] = useState<number | null>(null);

  const [unitValue, setUnitValue] = useState('1');
  const [unitFrom, setUnitFrom] = useState('miles');
  const [unitTo, setUnitTo] = useState('km');
  const [unitResult, setUnitResult] = useState<number | null>(null);

  const [discountPrice, setDiscountPrice] = useState('100');
  const [discountPerc, setDiscountPerc] = useState('20');
  const [discountResult, setDiscountResult] = useState<number | null>(null);

  const [compoundPrincipal, setCompoundPrincipal] = useState('1000');
  const [compoundRate, setCompoundRate] = useState('7');
  const [compoundTime, setCompoundTime] = useState('10');
  const [compoundResult, setCompoundResult] = useState<number | null>(null);

  const [roiInvestment, setRoiInvestment] = useState('1000');
  const [roiReturn, setRoiReturn] = useState('1200');
  const [roiResult, setRoiResult] = useState<number | null>(null);

  const [vatPrice, setVatPrice] = useState('100');
  const [vatRate, setVatRate] = useState('20');
  const [vatResult, setVatResult] = useState<{ vat: number, total: number } | null>(null);

  const [salaryGross, setSalaryGross] = useState('50000');
  const [salaryTax, setSalaryTax] = useState('20');
  const [salaryResult, setSalaryResult] = useState<number | null>(null);

  const [hreflangUrl, setHreflangUrl] = useState('https://example.com');
  const [hreflangLang, setHreflangLang] = useState('en-us');
  const [hreflangResult, setHreflangResult] = useState('');
  
  // File Upload States
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [processResult, setProcessResult] = useState<{ name: string, size: string, url: string } | null>(null);

  // SEO States
  const [robotsResult, setRobotsResult] = useState('');
  const [densityResult, setDensityResult] = useState<{ word: string, count: number, percent: string }[]>([]);
  const [serpTitle, setSerpTitle] = useState('Page Title Example');
  const [serpUrl, setSerpUrl] = useState('example.com/page');
  const [serpDesc, setSerpDesc] = useState('This is how your page description will look in Google search results...');
  const [schemaCode, setSchemaCode] = useState('');

  // Percentage Calculator States
  const [percVal1, setPercVal1] = useState('10');
  const [percVal2, setPercVal2] = useState('100');
  const [percResult, setPercResult] = useState<number | null>(null);

  // Lorem Ipsum States
  const [loremParas, setLoremParas] = useState('3');
  const [loremResult, setLoremResult] = useState('');

  // Slug Generator State
  const [slugResult, setSlugResult] = useState('');

  // Meta Tag Generator State
  const [metaTitle, setMetaTitle] = useState('');
  const [metaDesc, setMetaDesc] = useState('');
  const [metaTagsCode, setMetaTagsCode] = useState('');

  // Sitemap Generator State
  const [sitemapUrl, setSitemapUrl] = useState('');
  const [sitemapCode, setSitemapCode] = useState('');

  useEffect(() => {
    if (tool?.id === 'word-counter' || tool?.id === 'plagiarism-checker') {
      const words = inputText.trim() ? inputText.trim().split(/\s+/).length : 0;
      const chars = inputText.length;
      const sentences = inputText.split(/[.!?]+/).filter(Boolean).length;
      const readTime = Math.ceil(words / 200); // Average 200 wpm
      setStats({ words, chars, sentences, readTime });
    }
    
    if (tool?.id === 'slug-generator') {
      const slug = inputText
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, '')
        .replace(/[\s_-]+/g, '-')
        .replace(/^-+|-+$/g, '');
      setSlugResult(slug);
    }
  }, [inputText, tool?.id]);

  if (!tool) {
    return (
      <div className="pt-40 text-center container mx-auto px-6">
        <h1 className="text-4xl font-bold mb-4">Tool Not Found</h1>
        <p className="text-muted-foreground mb-8">The tool you are looking for does not exist or has been moved.</p>
        <Link to="/" className="text-primary font-bold">Return Home</Link>
      </div>
    );
  }

  const handleAiGenerate = async () => {
    if (!inputText) return;
    setIsGenerating(true);
    setAiResult('');
    try {
      let prompt = `Write a detailed article about: ${inputText}`;
      
      if (tool.id === 'ai-grammar-corrector') {
        prompt = `Correct the grammar and improve the sentence structure of the following text:\n\n${inputText}`;
      } else if (tool.id === 'ai-summary-bot') {
        prompt = `Summarize the following text in a concise and professional manner:\n\n${inputText}`;
      } else if (tool.id === 'ai-keyword-extractor') {
        prompt = `Extract the most relevant SEO keywords from the following text and present them as a comma-separated list:\n\n${inputText}`;
      } else if (tool.id === 'ai-translation-tool') {
        prompt = `Translate the following text into professional English (if not already in English) or suggest alternative translations if it is already in English:\n\n${inputText}`;
      } else if (tool.id === 'ai-code-assistant') {
        prompt = `Explain or debug this code snippet, providing optimized versions if possible:\n\n${inputText}`;
      } else if (tool.id === 'ai-video-script') {
        prompt = `Write an engaging video script for TikTok/YouTube Shorts based on: ${inputText}`;
      } else if (tool.id === 'ai-story-generator') {
        prompt = `Write a creative short story based on these points: ${inputText}`;
      } else if (tool.id === 'ai-business-name') {
        prompt = `Suggest 10 unique and catchy business names for a brand related to: ${inputText}`;
      } else if (tool.id === 'ai-bio-generator') {
        prompt = `Write 3 professional social media bios (LinkedIn, Twitter, IG) for someone who is: ${inputText}`;
      } else if (tool.id === 'ai-cover-letter') {
        prompt = `Write a professional cover letter for the following job/person context: ${inputText}`;
      } else if (tool.id === 'ai-job-desc') {
        prompt = `Write a detailed and professional job description for: ${inputText}`;
      } else if (tool.id === 'ai-sentiment-analysis') {
        prompt = `Analyze the sentiment of this text (Positive, Negative, or Neutral) and explain why: ${inputText}`;
      } else if (tool.id === 'keyword-research') {
        prompt = `Provide a list of 15 high-potential SEO keywords, their intent, and suggested content ideas for the topic: ${inputText}`;
      } else if (tool.id === 'ai-logo-designer') {
        prompt = `Creative logo design concepts and visual identity ideas for: ${inputText}`;
      } else if (tool.id === 'schema-generator') {
        prompt = `Generate a valid JSON-LD Schema markup for the following content/business info: ${inputText}`;
      } else if (tool.id === 'backlink-checker') {
        prompt = `Explain the importance of backlinks for this niche and suggest 10 specific link-building strategies for: ${inputText}`;
      } else if (tool.id === 'da-checker') {
        prompt = `Analyze the potential ranking factors and perceived domain authority for a site in this category: ${inputText}`;
      } else if (tool.id === 'page-speed-test') {
        prompt = `List 10 specific technical optimizations to improve Core Web Vitals and page speed for a site regarding: ${inputText}`;
      } else if (tool.id === 'broken-link-finder') {
        prompt = `Analyze the provided text/URL for potential dead links and suggest an internal linking strategy for: ${inputText}`;
      } else if (tool.id === 'canonical-tag-gen') {
        prompt = `Generate a canonical URL tag for: ${inputText}`;
      } else if (tool.id === 'crypto-conv') {
        prompt = `Convert ${inputText} to equivalent values in BTC, ETH, and USD based on current market dynamics.`;
      }

      const result = await generateContent(prompt);
      setAiResult(result || '');
    } catch (error) {
      console.error(error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleAiImageGenerate = async () => {
    if (!inputText) return;
    setIsGenerating(true);
    setImageUrl('');
    try {
      setTimeout(() => {
        setImageUrl(`https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1000&auto=format&fit=crop`);
        setIsGenerating(false);
      }, 3000);
    } catch (error) {
      console.error(error);
      setIsGenerating(false);
    }
  };

  const generateMetaTags = () => {
    const code = `
<!-- Primary Meta Tags -->
<title>${metaTitle}</title>
<meta name="title" content="${metaTitle}">
<meta name="description" content="${metaDesc}">

<!-- Open Graph / Facebook -->
<meta property="og:type" content="website">
<meta property="og:url" content="https://earnandheal.com/">
<meta property="og:title" content="${metaTitle}">
<meta property="og:description" content="${metaDesc}">
<meta property="og:image" content="https://earnandheal.com/og-image.png">

<!-- Twitter -->
<meta property="twitter:card" content="summary_large_image">
<meta property="twitter:url" content="https://earnandheal.com/">
<meta property="twitter:title" content="${metaTitle}">
<meta property="twitter:description" content="${metaDesc}">
<meta property="twitter:image" content="https://earnandheal.com/og-image.png">`.trim();
    setMetaTagsCode(code);
  };

  const generateSitemap = () => {
    const url = sitemapUrl.startsWith('http') ? sitemapUrl : `https://${sitemapUrl}`;
    const code = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${url}/</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <priority>1.00</priority>
  </url>
</urlset>`.trim();
    setSitemapCode(code);
  };

  const handleCopy = (text: string) => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleCaseConvert = (type: 'upper' | 'lower' | 'title' | 'sentence' | 'slug') => {
    let result = inputText;
    if (type === 'upper') result = inputText.toUpperCase();
    if (type === 'lower') result = inputText.toLowerCase();
    if (type === 'title') {
      result = inputText.toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    }
    if (type === 'sentence') {
      result = inputText.toLowerCase().replace(/(^\w|\.\s+\w)/gm, letter => letter.toUpperCase());
    }
    if (type === 'slug') {
      result = inputText.toLowerCase().trim().replace(/[^\w\s-]/g, '').replace(/[\s_-]+/g, '-').replace(/^-+|-+$/g, '');
    }
    setInputText(result);
  };

  const calculateLoan = () => {
    const p = parseFloat(loanAmount);
    const r = parseFloat(interestRate) / 100 / 12;
    const n = parseFloat(loanTerm);
    if (p > 0 && r > 0 && n > 0) {
      const m = (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
      setMonthlyPayment(parseFloat(m.toFixed(2)));
    }
  };

  const calculatePercentage = () => {
    const v1 = parseFloat(percVal1);
    const v2 = parseFloat(percVal2);
    if (!isNaN(v1) && !isNaN(v2)) {
      setPercResult((v1 / 100) * v2);
    }
  };

  const calculateTip = () => {
    const bill = parseFloat(tipBill);
    const tipP = parseFloat(tipPerc);
    const people = parseInt(tipPeople);
    if (!isNaN(bill) && !isNaN(tipP) && people > 0) {
      const tip = (bill * (tipP / 100));
      const total = bill + tip;
      setTipResult({
        tip: parseFloat(tip.toFixed(2)),
        total: parseFloat(total.toFixed(2)),
        each: parseFloat((total / people).toFixed(2))
      });
    }
  };

  const calculateTax = () => {
    const p = parseFloat(price);
    const r = parseFloat(taxRate);
    if (!isNaN(p) && !isNaN(r)) {
      setTaxResult(parseFloat((p * (1 + r / 100)).toFixed(2)));
    }
  };

  const calculateDiscount = () => {
    const p = parseFloat(discountPrice);
    const d = parseFloat(discountPerc);
    if (!isNaN(p) && !isNaN(d)) {
      setDiscountResult(parseFloat((p - (p * d / 100)).toFixed(2)));
    }
  };

  const calculateCompound = () => {
    const p = parseFloat(compoundPrincipal);
    const r = parseFloat(compoundRate) / 100;
    const t = parseFloat(compoundTime);
    if (!isNaN(p) && !isNaN(r) && !isNaN(t)) {
      // A = P(1 + r/n)^(nt) -> assuming n=1 (yearly)
      setCompoundResult(parseFloat((p * Math.pow(1 + r, t)).toFixed(2)));
    }
  };

  const calculateBmi = () => {
    const w = parseFloat(weight);
    const h = parseFloat(height);
    if (!isNaN(w) && !isNaN(h)) {
      // BMI = Weight (lb) / [Height (in)]^2 * 703
      setBmiResult(parseFloat(((w / (h * h)) * 703).toFixed(1)));
    }
  };

  const convertUnit = () => {
    const val = parseFloat(unitValue);
    if (isNaN(val)) return;
    let result = val;
    if (unitFrom === 'miles' && unitTo === 'km') result = val * 1.60934;
    if (unitFrom === 'km' && unitTo === 'miles') result = val / 1.60934;
    if (unitFrom === 'pounds' && unitTo === 'kg') result = val / 2.20462;
    if (unitFrom === 'kg' && unitTo === 'pounds') result = val * 2.20462;
    setUnitResult(parseFloat(result.toFixed(2)));
  };

  const calculateRoi = () => {
    const inv = parseFloat(roiInvestment);
    const ret = parseFloat(roiReturn);
    if (!isNaN(inv) && !isNaN(ret) && inv > 0) {
      setRoiResult(parseFloat(((ret - inv) / inv * 100).toFixed(2)));
    }
  };

  const calculateVat = () => {
    const p = parseFloat(vatPrice);
    const r = parseFloat(vatRate);
    if (!isNaN(p) && !isNaN(r)) {
      const vat = p * (r / 100);
      setVatResult({ vat: parseFloat(vat.toFixed(2)), total: parseFloat((p + vat).toFixed(2)) });
    }
  };

  const calculateSalary = () => {
    const cross = parseFloat(salaryGross);
    const tax = parseFloat(salaryTax);
    if (!isNaN(cross) && !isNaN(tax)) {
      setSalaryResult(parseFloat((cross * (1 - tax / 100)).toFixed(2)));
    }
  };

  const generateHreflang = () => {
    setHreflangResult(`<link rel="alternate" hreflang="${hreflangLang}" href="${hreflangUrl}" />`);
  };

  const handleRobotsGen = () => {
    setRobotsResult(`User-agent: *\nAllow: /\nDisallow: /admin/\nSitemap: https://earnandheal.com/sitemap.xml`);
  };

  const analyzeDensity = () => {
    const words = inputText.toLowerCase().replace(/[^\w\s]/g, '').split(/\s+/).filter(w => w.length > 2);
    const freq: Record<string, number> = {};
    words.forEach(w => freq[w] = (freq[w] || 0) + 1);
    const sorted = Object.entries(freq)
      .map(([word, count]) => ({ word, count, percent: ((count / words.length) * 100).toFixed(1) + '%' }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);
    setDensityResult(sorted);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setSelectedFile(file);
    setIsUploading(true);
    setUploadProgress(0);
    setProcessResult(null);

    // Simulate Upload
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 30;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
        setTimeout(() => setIsUploading(false), 500);
      }
      setUploadProgress(progress);
    }, 200);
  };

  const processFile = () => {
    if (!selectedFile) return;
    setIsProcessing(true);
    
    // Simulate processing time
    setTimeout(() => {
      setIsProcessing(false);
      setProcessResult({
        name: `processed_${selectedFile.name}`,
        size: `${(selectedFile.size * 0.8 / 1024 / 1024).toFixed(2)} MB`,
        url: '#'
      });
    }, 2000);
  };

  const handleTextTool = (type: 'alphabetize' | 'duplicates' | 'list' | 'lines') => {
    let result = inputText;
    if (type === 'alphabetize') {
      result = inputText.split('\n').sort().join('\n');
    } else if (type === 'duplicates') {
      result = Array.from(new Set(inputText.split('\n'))).join('\n');
    } else if (type === 'list') {
      result = inputText.split('\n').map(line => `• ${line}`).join('\n');
    } else if (type === 'lines') {
      alert(`Total Lines: ${inputText.split('\n').length}`);
      return;
    }
    setInputText(result);
  };

  const generateLorem = () => {
    const count = parseInt(loremParas);
    const text = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";
    const result = Array(count).fill(text).join('\n\n');
    setLoremResult(result);
  };

  return (
    <div className="pt-40 pb-20 bg-[#F8FAFC] dark:bg-slate-950 min-h-screen">
      <Helmet>
        <title>{tool.name} - Free Online Tool | Earnandheal</title>
        <meta name="description" content={tool.description} />
      </Helmet>

      <div className="container mx-auto px-6">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-8">
          <Link to="/" className="hover:text-blue-600 transition-colors">Home</Link>
          <span className="opacity-50">/</span>
          <Link to="/tools" className="hover:text-blue-600 transition-colors">Tools</Link>
          <span className="opacity-50">/</span>
          <span className="text-slate-900 dark:text-slate-200">{tool.name}</span>
        </nav>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content Area */}
          <div className="flex-1">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                <div className="flex items-center gap-5">
                  <div className="w-16 h-16 bg-blue-600 text-white rounded-2xl flex items-center justify-center shadow-lg shadow-blue-200/50">
                    <Zap size={32} />
                  </div>
                  <div>
                    <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-1">{tool.name}</h1>
                    <p className="text-slate-500 dark:text-slate-400 font-medium">{tool.description}</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <button className="p-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl hover:border-blue-400 transition-all shadow-sm"><Share2 size={18} /></button>
                  <button className="p-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl hover:border-blue-400 transition-all shadow-sm"><Bookmark size={18} /></button>
                </div>
              </div>

              {/* Tool Interface Card */}
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[32px] p-8 md:p-10 shadow-xl shadow-slate-200/50 dark:shadow-none mb-12">
                
                {/* AI TOOLS (TEXT BASED) */}
                {['ai-content-generator', 'ai-grammar-corrector', 'ai-summary-bot', 'ai-keyword-extractor', 'ai-translation-tool', 'ai-code-assistant', 'ai-video-script', 'ai-sentiment-analysis'].includes(tool.id) && (
                  <div className="space-y-8">
                    <div>
                      <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-4 px-1">
                        {tool.id === 'ai-code-assistant' ? 'Paste Code Snippet' : 'Input Context or Topic'}
                      </label>
                      <textarea 
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        placeholder={`e.g. ${tool.description.slice(0, 40)}...`} 
                        className="w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 min-h-[150px] focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all text-lg shadow-inner text-slate-900 dark:text-white"
                      />
                    </div>
                    <button 
                      onClick={handleAiGenerate}
                      disabled={isGenerating}
                      className="w-full bg-blue-600 text-white py-5 rounded-2xl font-black text-lg hover:bg-blue-500 transition-all disabled:opacity-50 flex items-center justify-center gap-3 shadow-xl shadow-blue-200/50"
                    >
                      {isGenerating ? (
                        <>
                          <div className="w-6 h-6 border-4 border-white/20 border-t-white rounded-full animate-spin" />
                          AI Engine Processing...
                        </>
                      ) : (
                        <>
                          <Sparkles size={24} className="fill-current" /> Run AI Transformation
                        </>
                      )}
                    </button>

                    <AnimatePresence>
                      {aiResult && (
                        <motion.div 
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, scale: 0.95 }}
                          className="mt-12 p-8 bg-slate-50 dark:bg-slate-950 rounded-3xl border border-slate-100 dark:border-slate-800 prose dark:prose-invert max-w-none"
                        >
                          <div className="flex justify-between items-center mb-6 border-b border-slate-200 dark:border-slate-800 pb-4">
                            <span className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
                              <CheckCircle2 size={16} className="text-emerald-500" /> 
                              Output Generated
                            </span>
                            <button 
                              onClick={() => handleCopy(aiResult)}
                              className="flex items-center gap-2 text-[10px] font-black text-blue-600 uppercase tracking-widest hover:underline"
                            >
                              {isCopied ? <><CheckCircle2 size={14} /> Copied!</> : <><Copy size={14} /> Copy Results</>}
                            </button>
                          </div>
                          <div className="whitespace-pre-wrap leading-relaxed text-slate-700 dark:text-slate-300 font-medium">{aiResult}</div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )}

                {/* AI IMAGE GENERATOR */}
                {tool.id === 'ai-image-generator' && (
                  <div className="space-y-8">
                    <div>
                      <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-4 px-1">Image Prompt</label>
                      <input 
                        type="text"
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        placeholder="e.g. A futuristic workspace in the heart of Texas, cinematic lighting..." 
                        className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 rounded-2xl p-6 focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-inner"
                      />
                    </div>
                    <button 
                      onClick={handleAiImageGenerate}
                      disabled={isGenerating}
                      className="w-full bg-emerald-600 text-white py-5 rounded-2xl font-black text-lg hover:bg-emerald-500 transition-all disabled:opacity-50 flex items-center justify-center gap-3 shadow-xl shadow-emerald-200/50"
                    >
                      {isGenerating ? (
                        <>
                          <div className="w-6 h-6 border-4 border-white/20 border-t-white rounded-full animate-spin" />
                          Synthesizing Visuals...
                        </>
                      ) : (
                        <>
                          <ImageIcon size={24} /> Generate High-Res Image
                        </>
                      )}
                    </button>

                    {imageUrl && (
                      <motion.div 
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="mt-12 space-y-6"
                      >
                        <div className="rounded-3xl overflow-hidden shadow-2xl border-4 border-white dark:border-slate-800">
                          <img src={imageUrl} alt="AI Generated" className="w-full h-auto" />
                        </div>
                        <div className="flex gap-4">
                          <button className="flex-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-slate-50 transition-all">
                            <Download size={18} /> Download 4K
                          </button>
                          <button onClick={() => setImageUrl('')} className="p-4 bg-red-50 dark:bg-red-950/20 text-red-500 rounded-xl hover:bg-red-100 transition-all">
                            <RotateCcw size={18} />
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </div>
                )}

                {/* META TAG GENERATOR */}
                {tool.id === 'meta-tag-generator' && (
                  <div className="space-y-8">
                    <div className="grid gap-6">
                      <div className="space-y-3">
                        <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 px-1">Page Title</label>
                        <input 
                          type="text" 
                          value={metaTitle}
                          onChange={(e) => setMetaTitle(e.target.value)}
                          placeholder="e.g. Best Pizza in New York" 
                          className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div className="space-y-3">
                        <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 px-1">Meta Description</label>
                        <textarea 
                          value={metaDesc}
                          onChange={(e) => setMetaDesc(e.target.value)}
                          placeholder="What is your page about?" 
                          className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 min-h-[100px] text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>
                    <button 
                      onClick={generateMetaTags}
                      className="w-full bg-blue-600 text-white py-4 rounded-2xl font-black uppercase tracking-widest shadow-lg"
                    >
                      Compile HTML Meta Tags
                    </button>
                    {metaTagsCode && (
                       <div className="relative">
                         <div className="bg-slate-900 rounded-2xl p-6 text-emerald-400 font-mono text-sm overflow-x-auto whitespace-pre">
                           {metaTagsCode}
                         </div>
                         <button 
                            onClick={() => handleCopy(metaTagsCode)}
                            className="absolute right-4 top-4 px-3 py-1.5 bg-white/10 hover:bg-white/20 text-white rounded-lg text-[10px] font-black uppercase tracking-widest border border-white/20"
                          >
                            {isCopied ? 'Copied' : 'Copy Code'}
                          </button>
                       </div>
                    )}
                  </div>
                )}

                {/* SITEMAP GENERATOR */}
                {tool.id === 'sitemap-generator' && (
                  <div className="space-y-8">
                    <div className="space-y-3">
                      <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 px-1">Website Root URL</label>
                      <input 
                        type="text" 
                        value={sitemapUrl}
                        onChange={(e) => setSitemapUrl(e.target.value)}
                        placeholder="e.g. https://example.com" 
                        className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <button 
                      onClick={generateSitemap}
                      className="w-full bg-blue-600 text-white py-4 rounded-2xl font-black uppercase tracking-widest"
                    >
                      Index Nodes & Build Map
                    </button>
                    {sitemapCode && (
                       <div className="relative">
                         <div className="bg-slate-900 rounded-2xl p-6 text-blue-400 font-mono text-sm overflow-x-auto whitespace-pre">
                           {sitemapCode}
                         </div>
                         <button 
                            onClick={() => handleCopy(sitemapCode)}
                            className="absolute right-4 top-4 px-3 py-1.5 bg-white/10 hover:bg-white/20 text-white rounded-lg text-[10px] font-black uppercase tracking-widest border border-white/20"
                          >
                            {isCopied ? 'Copied' : 'Copy XML'}
                          </button>
                       </div>
                    )}
                  </div>
                )}

                {/* WORD COUNTER & PLAGIARISM CHECKER */}
                {['word-counter', 'plagiarism-checker'].includes(tool.id) && (
                  <div className="space-y-8">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="bg-slate-50 dark:bg-slate-950 p-4 rounded-2xl text-center border border-slate-100 dark:border-slate-800">
                        <div className="text-2xl font-black text-blue-600">{stats.words}</div>
                        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Words</div>
                      </div>
                      <div className="bg-slate-50 dark:bg-slate-950 p-4 rounded-2xl text-center border border-slate-100 dark:border-slate-800">
                        <div className="text-2xl font-black text-purple-600">{stats.chars}</div>
                        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Characters</div>
                      </div>
                      <div className="bg-slate-50 dark:bg-slate-950 p-4 rounded-2xl text-center border border-slate-100 dark:border-slate-800">
                        <div className="text-2xl font-black text-emerald-600">{stats.sentences}</div>
                        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Sentences</div>
                      </div>
                      <div className="bg-slate-50 dark:bg-slate-950 p-4 rounded-2xl text-center border border-slate-100 dark:border-slate-800">
                        <div className="text-2xl font-black text-orange-600">{stats.readTime}m</div>
                        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Read Time</div>
                      </div>
                    </div>
                    <div className="relative">
                      <textarea 
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        placeholder={`Paste your ${tool.name === 'Plagiarism Checker' ? 'content to verify uniqueness' : 'content to analyze' } instantly...`} 
                        className="w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 min-h-[300px] focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all text-base shadow-inner resize-none font-medium text-slate-900 dark:text-white"
                      />
                      <button 
                        onClick={() => handleCopy(inputText)}
                        className="absolute right-4 bottom-4 px-4 py-2 bg-white/80 dark:bg-slate-900/80 backdrop-blur shadow-sm rounded-xl text-[10px] font-black uppercase tracking-widest text-blue-600 border border-slate-100 dark:border-slate-800 hover:bg-white transition-all flex items-center gap-2"
                      >
                         {isCopied ? <><CheckCircle2 size={12} /> Copied</> : <><Copy size={12} /> Copy Text</>}
                      </button>
                    </div>
                    <div className="flex flex-wrap gap-3">
                      <button onClick={() => setInputText('')} className="px-6 py-3 rounded-xl bg-red-50 dark:bg-red-950/20 text-red-500 font-bold text-[10px] uppercase tracking-widest hover:bg-red-100 transition-all flex items-center gap-2 ml-auto border border-red-100 dark:border-red-900/30">
                        <RotateCcw size={12} /> Purge Buffer
                      </button>
                    </div>
                  </div>
                )}

                {/* CASE CONVERTER */}
                {tool.id === 'case-converter' && (
                  <div className="space-y-8">
                    <div className="relative">
                      <textarea 
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        placeholder="Type or paste text to convert its case..." 
                        className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 rounded-2xl p-6 min-h-[300px] focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all text-base shadow-inner resize-none font-medium"
                      />
                      {inputText && (
                         <button 
                            onClick={() => handleCopy(inputText)}
                            className="absolute right-4 bottom-4 px-4 py-2 bg-white/80 dark:bg-slate-900/80 backdrop-blur shadow-sm rounded-xl text-[10px] font-black uppercase tracking-widest text-blue-600 border border-slate-100 dark:border-slate-800 hover:bg-white transition-all flex items-center gap-2"
                          >
                            {isCopied ? <><CheckCircle2 size={12} /> Copied</> : <><Copy size={12} /> Copy Result</>}
                          </button>
                      )}
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      <button onClick={() => handleCaseConvert('upper')} className="px-4 py-3 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 font-bold text-[10px] uppercase tracking-widest hover:bg-slate-200 transition-all">UPPERCASE</button>
                      <button onClick={() => handleCaseConvert('lower')} className="px-4 py-3 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 font-bold text-[10px] uppercase tracking-widest hover:bg-slate-200 transition-all">lowercase</button>
                      <button onClick={() => handleCaseConvert('title')} className="px-4 py-3 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 font-bold text-[10px] uppercase tracking-widest hover:bg-slate-200 transition-all">Title Case</button>
                      <button onClick={() => handleCaseConvert('slug')} className="px-4 py-3 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 font-bold text-[10px] uppercase tracking-widest hover:bg-slate-200 transition-all">URL-slug</button>
                    </div>
                  </div>
                )}

                {/* SLUG GENERATOR */}
                {tool.id === 'slug-generator' && (
                  <div className="space-y-8">
                    <div>
                      <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-4 px-1">Original Text</label>
                      <input 
                        type="text" 
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        placeholder="e.g. My Awesome Blog Post Title" 
                        className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 rounded-2xl p-6 focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-inner"
                      />
                    </div>
                    {slugResult && (
                       <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-8 bg-slate-50 dark:bg-slate-950 rounded-2xl border border-blue-100 dark:border-blue-900/30"
                       >
                         <div className="flex justify-between items-center mb-4">
                            <label className="text-[10px] font-black uppercase tracking-widest text-blue-600">Generated URL Slug</label>
                            <button onClick={() => handleCopy(slugResult)} className="text-[10px] font-black text-slate-400 uppercase tracking-widest hover:text-blue-600 transition-colors flex items-center gap-2">
                               {isCopied ? <CheckCircle2 size={12} /> : <Copy size={12} />} Copy
                            </button>
                         </div>
                         <div className="text-xl font-mono font-bold text-slate-900 dark:text-white break-all">{slugResult}</div>
                       </motion.div>
                    )}
                  </div>
                )}

                {/* LOREM IPSUM GENERATOR */}
                {tool.id === 'lorem-ipsum' && (
                  <div className="space-y-8">
                    <div className="flex flex-col md:flex-row gap-6">
                       <div className="flex-1 space-y-3">
                          <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 px-1">Number of Paragraphs</label>
                          <input 
                            type="number" 
                            min="1" 
                            max="20"
                            value={loremParas}
                            onChange={(e) => setLoremParas(e.target.value)}
                            className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
                          />
                       </div>
                       <button 
                        onClick={generateLorem}
                        className="flex-[2] bg-blue-600 text-white font-black uppercase tracking-widest rounded-2xl hover:bg-blue-500 transition-all shadow-xl shadow-blue-200/50"
                       >
                         Generate Dummy Text
                       </button>
                    </div>

                    {loremResult && (
                       <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="relative"
                       >
                         <textarea 
                           readOnly
                           value={loremResult}
                           className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 rounded-2xl p-6 min-h-[300px] focus:outline-none text-slate-700 dark:text-slate-300 font-medium"
                         />
                         <button 
                            onClick={() => handleCopy(loremResult)}
                            className="absolute right-4 bottom-4 px-4 py-2 bg-white/80 dark:bg-slate-900/80 backdrop-blur shadow-sm rounded-xl text-[10px] font-black uppercase tracking-widest text-blue-600 border border-slate-100 dark:border-slate-800 hover:bg-white transition-all flex items-center gap-2"
                          >
                            {isCopied ? <CheckCircle2 size={12} /> : <Copy size={12} />} Copy All
                          </button>
                       </motion.div>
                    )}
                  </div>
                )}

                {/* PERCENTAGE CALCULATOR */}
                {tool.id === 'percentage-calc' && (
                  <div className="space-y-8">
                    <div className="flex flex-col md:flex-row items-center gap-6 text-xl font-black text-slate-400 italic">
                       <span>What is</span>
                       <input 
                          type="number" 
                          value={percVal1}
                          onChange={(e) => setPercVal1(e.target.value)}
                          className="w-24 bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 rounded-xl p-4 text-center text-slate-900 dark:text-white"
                       />
                       <span>% of</span>
                       <input 
                          type="number" 
                          value={percVal2}
                          onChange={(e) => setPercVal2(e.target.value)}
                          className="w-40 bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 rounded-xl p-4 text-center text-slate-900 dark:text-white"
                       />
                       <button 
                        onClick={calculatePercentage}
                        className="bg-blue-600 text-white p-4 rounded-xl shadow-lg hover:bg-blue-500 transition-all font-black uppercase tracking-widest text-xs"
                       >
                         Calculate
                       </button>
                    </div>

                    {percResult !== null && (
                       <motion.div 
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-emerald-500 rounded-[2rem] p-10 text-white text-center shadow-2xl shadow-emerald-200/50"
                       >
                         <div className="text-[10px] font-black uppercase tracking-widest opacity-70 mb-4 px-1">Resulting Value</div>
                         <div className="text-7xl font-black italic tracking-tighter">{percResult.toLocaleString()}</div>
                       </motion.div>
                    )}
                  </div>
                )}

                {/* LOAN CALCULATOR & MORTGAGE CALC */}
                {['loan-calculator', 'mortgage-calc', 'car-loan-calc'].includes(tool.id) && (
                  <div className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="space-y-3">
                        <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 px-1">Loan Amount ($)</label>
                        <input 
                          type="number" 
                          value={loanAmount}
                          onChange={(e) => setLoanAmount(e.target.value)}
                          className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-blue-400 text-slate-900 dark:text-white"
                        />
                      </div>
                      <div className="space-y-3">
                        <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 px-1">Interest Rate (%)</label>
                        <input 
                          type="number" 
                          value={interestRate}
                          onChange={(e) => setInterestRate(e.target.value)}
                          className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-blue-400 text-slate-900 dark:text-white"
                        />
                      </div>
                      <div className="space-y-3">
                        <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 px-1">Term (Months)</label>
                        <input 
                          type="number" 
                          value={loanTerm}
                          onChange={(e) => setLoanTerm(e.target.value)}
                          className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-blue-400 text-slate-900 dark:text-white"
                        />
                      </div>
                    </div>
                    
                    <button 
                      onClick={calculateLoan}
                      className="w-full bg-blue-600 text-white py-5 rounded-2xl font-black text-lg hover:bg-blue-500 transition-all shadow-xl shadow-blue-200/50"
                    >
                      Calculate Payment
                    </button>

                    {monthlyPayment !== null && (
                      <motion.div 
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="p-8 bg-blue-600 rounded-3xl text-white text-center shadow-2xl shadow-blue-200/50"
                      >
                        <div className="text-[10px] uppercase font-black tracking-[0.2em] mb-4 opacity-70">Estimated Monthly Payment</div>
                        <div className="text-6xl font-black mb-4">${monthlyPayment.toLocaleString()}</div>
                        <p className="text-sm opacity-80 max-w-sm mx-auto">Total repayable: ${(monthlyPayment * parseFloat(loanTerm)).toLocaleString()}</p>
                      </motion.div>
                    )}
                  </div>
                )}

                {/* TIP CALCULATOR */}
                {tool.id === 'tip-calculator' && (
                  <div className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="space-y-3">
                        <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 px-1">Bill Amount ($)</label>
                        <input type="number" value={tipBill} onChange={(e) => setTipBill(e.target.value)} className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 rounded-xl p-4" />
                      </div>
                      <div className="space-y-3">
                        <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 px-1">Tip Percentage (%)</label>
                        <input type="number" value={tipPerc} onChange={(e) => setTipPerc(e.target.value)} className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 rounded-xl p-4" />
                      </div>
                      <div className="space-y-3">
                        <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 px-1">Number of People</label>
                        <input type="number" value={tipPeople} onChange={(e) => setTipPeople(e.target.value)} className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 rounded-xl p-4" />
                      </div>
                    </div>
                    <button onClick={calculateTip} className="w-full bg-emerald-600 text-white py-4 rounded-2xl font-black shadow-lg">Calculate Split</button>
                    {tipResult && (
                      <div className="grid grid-cols-3 gap-4">
                        <div className="bg-slate-50 p-6 rounded-2xl text-center">
                          <div className="text-xl font-black">${tipResult.tip}</div>
                          <div className="text-[10px] font-bold text-slate-400 uppercase">Total Tip</div>
                        </div>
                        <div className="bg-slate-50 p-6 rounded-2xl text-center">
                          <div className="text-xl font-black">${tipResult.total}</div>
                          <div className="text-[10px] font-bold text-slate-400 uppercase">Total Bill</div>
                        </div>
                        <div className="bg-blue-600 p-6 rounded-2xl text-center text-white">
                          <div className="text-xl font-black">${tipResult.each}</div>
                          <div className="text-[10px] font-bold opacity-80 uppercase">Each Person</div>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* SALES TAX CALCULATOR */}
                {tool.id === 'sales-tax-calc' && (
                  <div className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-3">
                        <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 px-1">Net Price ($)</label>
                        <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 rounded-xl p-4" />
                      </div>
                      <div className="space-y-3">
                        <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 px-1">Tax Rate (%)</label>
                        <input type="number" value={taxRate} onChange={(e) => setTaxRate(e.target.value)} className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 rounded-xl p-4" />
                      </div>
                    </div>
                    <button onClick={calculateTax} className="w-full bg-blue-600 text-white py-4 rounded-2xl font-black">Final Price</button>
                    {taxResult && (
                      <div className="bg-slate-950 p-10 rounded-[2rem] text-center text-white">
                        <div className="text-5xl font-black italic tracking-tighter">${taxResult.toLocaleString()}</div>
                        <div className="text-[10px] font-black uppercase tracking-widest text-slate-500 mt-4">Calculated Total with Tax</div>
                      </div>
                    )}
                  </div>
                )}

                {/* BMI CALCULATOR */}
                {tool.id === 'bmi-calculator' && (
                  <div className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-3">
                        <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 px-1">Weight (lbs)</label>
                        <input type="number" value={weight} onChange={(e) => setWeight(e.target.value)} className="w-full bg-slate-50 border border-slate-100 rounded-xl p-4" />
                      </div>
                      <div className="space-y-3">
                        <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 px-1">Height (inches)</label>
                        <input type="number" value={height} onChange={(e) => setHeight(e.target.value)} className="w-full bg-slate-50 border border-slate-100 rounded-xl p-4" />
                      </div>
                    </div>
                    <button onClick={calculateBmi} className="w-full bg-emerald-600 text-white py-4 rounded-2xl font-black">Calculate BMI</button>
                    {bmiResult && (
                      <div className="bg-emerald-500 p-10 rounded-3xl text-center text-white">
                        <div className="text-6xl font-black">{bmiResult}</div>
                        <div className="text-[10px] font-black uppercase tracking-widest opacity-80 mt-2">Your BMI Index</div>
                        <p className="mt-4 text-xs font-bold">{bmiResult < 18.5 ? 'Underweight' : bmiResult < 25 ? 'Healthy Weight' : bmiResult < 30 ? 'Overweight' : 'Obese'}</p>
                      </div>
                    )}
                  </div>
                )}

                {/* UNIT CONVERTER */}
                {tool.id === 'unit-converter' && (
                  <div className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <input type="number" value={unitValue} onChange={(e) => setUnitValue(e.target.value)} className="w-full bg-slate-50 border border-slate-100 rounded-xl p-4" />
                      <select value={unitFrom} onChange={(e) => setUnitFrom(e.target.value)} className="w-full bg-slate-50 border border-slate-100 rounded-xl p-4">
                        <option value="miles">Miles</option>
                        <option value="km">Kilometers</option>
                        <option value="pounds">Pounds</option>
                        <option value="kg">Kilograms</option>
                      </select>
                      <select value={unitTo} onChange={(e) => setUnitTo(e.target.value)} className="w-full bg-slate-50 border border-slate-100 rounded-xl p-4">
                        <option value="km">Kilometers</option>
                        <option value="miles">Miles</option>
                        <option value="kg">Kilograms</option>
                        <option value="pounds">Pounds</option>
                      </select>
                    </div>
                    <button onClick={convertUnit} className="w-full bg-blue-600 text-white py-4 rounded-2xl font-black">Convert Units</button>
                    {unitResult !== null && (
                      <div className="bg-slate-900 p-8 rounded-2xl text-center text-white">
                        <div className="text-4xl font-black">{unitResult} {unitTo}</div>
                      </div>
                    )}
                  </div>
                )}

                {/* KEYWORD RESEARCH */}
                {tool.id === 'keyword-research' && (
                  <div className="space-y-8">
                     <textarea 
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        placeholder="Enter primary topic or niche..." 
                        className="w-full bg-slate-50 border border-slate-100 rounded-2xl p-6 min-h-[100px]"
                      />
                      <button onClick={handleAiGenerate} disabled={isGenerating} className="w-full bg-blue-600 text-white py-5 rounded-2xl font-black shadow-lg flex items-center justify-center gap-3">
                        {isGenerating ? <div className="w-6 h-6 border-4 border-white/20 border-t-white rounded-full animate-spin" /> : 'Run Global Research'}
                      </button>
                      {aiResult && (
                         <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100 prose prose-sm max-w-none">
                            <div className="flex justify-between items-center mb-4">
                                <span className="font-extrabold uppercase text-[10px] tracking-widest text-blue-600">Keyword Cluster Data</span>
                                <button onClick={() => handleCopy(aiResult)} className="text-[10px] font-black uppercase text-slate-400 underline">Export</button>
                            </div>
                            {aiResult}
                         </div>
                      )}
                  </div>
                )}

                {/* COMPOUND INTEREST */}
                {tool.id === 'compound-interest' && (
                  <div className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="space-y-3">
                        <label className="block text-xs font-bold text-slate-400">Principal ($)</label>
                        <input type="number" value={compoundPrincipal} onChange={(e) => setCompoundPrincipal(e.target.value)} className="w-full bg-slate-50 border border-slate-100 rounded-xl p-4" />
                      </div>
                      <div className="space-y-3">
                        <label className="block text-xs font-bold text-slate-400">Annual Rate (%)</label>
                        <input type="number" value={compoundRate} onChange={(e) => setCompoundRate(e.target.value)} className="w-full bg-slate-50 border border-slate-100 rounded-xl p-4" />
                      </div>
                      <div className="space-y-3">
                        <label className="block text-xs font-bold text-slate-400">Years</label>
                        <input type="number" value={compoundTime} onChange={(e) => setCompoundTime(e.target.value)} className="w-full bg-slate-50 border border-slate-100 rounded-xl p-4" />
                      </div>
                    </div>
                    <button onClick={calculateCompound} className="w-full bg-blue-600 text-white py-4 rounded-xl font-black">Forecast Growth</button>
                    {compoundResult && (
                       <div className="bg-slate-900 p-10 rounded-3xl text-center text-white">
                          <div className="text-5xl font-black">${compoundResult.toLocaleString()}</div>
                          <div className="text-[10px] font-bold text-slate-500 uppercase mt-4">Estimated Future Balance</div>
                       </div>
                    )}
                  </div>
                )}

                {/* DISCOUNT CALCULATOR */}
                {tool.id === 'discount-calc' && (
                  <div className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-3">
                        <label className="block text-xs font-bold text-slate-400">Original Price ($)</label>
                        <input type="number" value={discountPrice} onChange={(e) => setDiscountPrice(e.target.value)} className="w-full bg-slate-50 border border-slate-100 rounded-xl p-4" />
                      </div>
                      <div className="space-y-3">
                        <label className="block text-xs font-bold text-slate-400">Discount (%)</label>
                        <input type="number" value={discountPerc} onChange={(e) => setDiscountPerc(e.target.value)} className="w-full bg-slate-50 border border-slate-100 rounded-xl p-4" />
                      </div>
                    </div>
                    <button onClick={calculateDiscount} className="w-full bg-emerald-600 text-white py-4 rounded-xl font-black">Calculate Savings</button>
                    {discountResult && (
                       <div className="bg-emerald-500 p-10 rounded-3xl text-center text-white">
                          <div className="text-5xl font-black">${discountResult.toLocaleString()}</div>
                          <div className="text-[10px] font-bold opacity-70 uppercase mt-4">Final Price after {(parseFloat(discountPrice) - discountResult).toFixed(2)} savings</div>
                       </div>
                    )}
                  </div>
                )}

                {/* SERP PREVIEW */}
                {tool.id === 'serp-preview' && (
                  <div className="space-y-8">
                    <div className="space-y-4">
                      <input type="text" value={serpTitle} onChange={(e) => setSerpTitle(e.target.value)} placeholder="Enter Title" className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 text-slate-900 dark:text-white focus:outline-none" />
                      <input type="text" value={serpUrl} onChange={(e) => setSerpUrl(e.target.value)} placeholder="Enter URL" className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 text-slate-900 dark:text-white focus:outline-none" />
                      <textarea value={serpDesc} onChange={(e) => setSerpDesc(e.target.value)} placeholder="Enter Description" className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 min-h-[100px] text-slate-900 dark:text-white focus:outline-none" />
                    </div>
                    <div className="p-8 bg-white border border-slate-200 rounded-2xl shadow-sm">
                      <div className="text-[10px] font-bold text-slate-400 uppercase mb-4">Google Search Preview</div>
                      <div className="text-[#1a0dab] text-xl font-medium hover:underline cursor-pointer mb-1 truncate">{serpTitle}</div>
                      <div className="text-[#006621] text-sm mb-1 truncate">{serpUrl}</div>
                      <div className="text-[#545454] text-sm line-clamp-2">{serpDesc}</div>
                    </div>
                  </div>
                )}

                {/* ROI CALCULATOR */}
                {tool.id === 'roi-calculator' && (
                  <div className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-3">
                        <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 px-1">Initial Investment ($)</label>
                        <input type="number" value={roiInvestment} onChange={(e) => setRoiInvestment(e.target.value)} className="w-full bg-slate-50 border border-slate-100 rounded-xl p-4" />
                      </div>
                      <div className="space-y-3">
                        <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 px-1">Final Value ($)</label>
                        <input type="number" value={roiReturn} onChange={(e) => setRoiReturn(e.target.value)} className="w-full bg-slate-50 border border-slate-100 rounded-xl p-4" />
                      </div>
                    </div>
                    <button onClick={calculateRoi} className="w-full bg-blue-600 text-white py-4 rounded-2xl font-black">Analyze ROI</button>
                    {roiResult !== null && (
                      <div className="bg-slate-900 p-10 rounded-3xl text-center text-white">
                        <div className="text-6xl font-black text-emerald-400">{roiResult}%</div>
                        <div className="text-[10px] font-black uppercase tracking-widest text-slate-500 mt-2">Return on Investment</div>
                      </div>
                    )}
                  </div>
                )}

                {/* VAT/GST CALCULATOR */}
                {tool.id === 'vat-calculator' && (
                  <div className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-3">
                        <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 px-1">Price Subtotal ($)</label>
                        <input type="number" value={vatPrice} onChange={(e) => setVatPrice(e.target.value)} className="w-full bg-slate-50 border border-slate-100 rounded-xl p-4" />
                      </div>
                      <div className="space-y-3">
                        <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 px-1">Tax Rate (%)</label>
                        <input type="number" value={vatRate} onChange={(e) => setVatRate(e.target.value)} className="w-full bg-slate-50 border border-slate-100 rounded-xl p-4" />
                      </div>
                    </div>
                    <button onClick={calculateVat} className="w-full bg-blue-600 text-white py-4 rounded-2xl font-black">Add Tax</button>
                    {vatResult && (
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-slate-50 p-6 rounded-2xl text-center">
                          <div className="text-xl font-black text-blue-600">${vatResult.vat}</div>
                          <div className="text-[10px] font-bold text-slate-400 uppercase">Tax Amount</div>
                        </div>
                        <div className="bg-slate-900 p-6 rounded-2xl text-center text-white">
                          <div className="text-xl font-black">${vatResult.total}</div>
                          <div className="text-[10px] font-bold text-slate-500 uppercase">Total Incl. Tax</div>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* SALARY CALCULATOR */}
                {tool.id === 'salary-calc' && (
                  <div className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-3">
                        <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 px-1">Annual Gross Salary ($)</label>
                        <input type="number" value={salaryGross} onChange={(e) => setSalaryGross(e.target.value)} className="w-full bg-slate-50 border border-slate-100 rounded-xl p-4" />
                      </div>
                      <div className="space-y-3">
                        <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 px-1">Estimated Tax Rate (%)</label>
                        <input type="number" value={salaryTax} onChange={(e) => setSalaryTax(e.target.value)} className="w-full bg-slate-50 border border-slate-100 rounded-xl p-4" />
                      </div>
                    </div>
                    <button onClick={calculateSalary} className="w-full bg-blue-600 text-white py-4 rounded-2xl font-black">Forecast Net Pay</button>
                    {salaryResult !== null && (
                      <div className="bg-emerald-500 p-10 rounded-3xl text-center text-white">
                        <div className="text-5xl font-black">${salaryResult.toLocaleString()}</div>
                        <div className="text-[10px] font-black uppercase tracking-widest opacity-80 mt-2">Estimated Annual Net Pay</div>
                        <div className="text-xs mt-4 opacity-70">Monthly: ${(salaryResult / 12).toLocaleString()} | Weekly: ${(salaryResult / 52).toLocaleString()}</div>
                      </div>
                    )}
                  </div>
                )}

                {/* HREFLANG GENERATOR */}
                {tool.id === 'hreflang-tag-gen' && (
                  <div className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-3">
                        <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 px-1">Target URL</label>
                        <input type="text" value={hreflangUrl} onChange={(e) => setHreflangUrl(e.target.value)} className="w-full bg-slate-50 border border-slate-100 rounded-xl p-4" />
                      </div>
                      <div className="space-y-3">
                        <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 px-1">Language Code (e.g. en-us)</label>
                        <input type="text" value={hreflangLang} onChange={(e) => setHreflangLang(e.target.value)} className="w-full bg-slate-50 border border-slate-100 rounded-xl p-4" />
                      </div>
                    </div>
                    <button onClick={generateHreflang} className="w-full bg-slate-900 text-white py-4 rounded-2xl font-black">Generate Tag</button>
                    {hreflangResult && (
                      <div className="relative">
                        <div className="bg-slate-50 p-6 rounded-2xl font-mono text-xs text-blue-600">{hreflangResult}</div>
                        <button onClick={() => handleCopy(hreflangResult)} className="absolute top-4 right-4 text-[10px] font-black uppercase text-slate-400 underline">Copy</button>
                      </div>
                    )}
                  </div>
                )}

                 {/* SCHEMA GENERATOR / DA CHECKER / BACKLINK / PAGE SPEED / BROKEN LINK / CANONICAL / CRYPTO (AI POWERED) */}
                 {['schema-generator', 'da-checker', 'backlink-checker', 'page-speed-test', 'broken-link-finder', 'canonical-tag-gen', 'crypto-conv'].includes(tool.id) && (
                  <div className="space-y-8">
                     <textarea 
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        placeholder={tool.id === 'crypto-conv' ? "e.g. 500 USD or 1 BTC" : "Enter details or URL..."} 
                        className="w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 min-h-[150px] text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                      />
                      <button onClick={handleAiGenerate} disabled={isGenerating} className="w-full bg-slate-900 text-white py-5 rounded-2xl font-black shadow-lg flex items-center justify-center gap-3">
                        {isGenerating ? <div className="w-6 h-6 border-4 border-white/20 border-t-white rounded-full animate-spin" /> : 'Run Neural Analysis'}
                      </button>
                      {aiResult && (
                         <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100 prose prose-sm max-w-none">
                            <div className="flex justify-between items-center mb-4 pb-4 border-b border-slate-200">
                                <span className="font-extrabold uppercase text-[10px] tracking-widest text-blue-600">AI Verified Results</span>
                                <button onClick={() => handleCopy(aiResult)} className="text-[10px] font-black uppercase text-slate-400 underline">{isCopied ? 'Copied' : 'Export Data'}</button>
                            </div>
                            <div className="whitespace-pre-wrap font-medium text-slate-600 dark:text-slate-400">{aiResult}</div>
                         </div>
                      )}
                  </div>
                )}

                {/* PDF TOOLS SIMULATION */}
                {tool.category === 'pdf' && (
                  <div className="space-y-8">
                    {!selectedFile ? (
                      <div 
                        onClick={() => document.getElementById('pdf-upload')?.click()}
                        className="border-4 border-dashed border-slate-100 dark:border-slate-800 rounded-[32px] p-20 text-center hover:bg-slate-50 dark:hover:bg-slate-950 transition-all cursor-pointer group"
                      >
                        <input 
                          id="pdf-upload" 
                          type="file" 
                          accept=".pdf" 
                          className="hidden" 
                          onChange={handleFileUpload}
                        />
                        <div className="w-20 h-20 bg-red-50 dark:bg-red-950/20 text-red-500 rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                          <FileText size={40} />
                        </div>
                        <h3 className="text-xl font-black text-slate-900 dark:text-white mb-2">Drop your PDF here</h3>
                        <p className="text-slate-400 font-bold uppercase text-[10px] tracking-[0.2em]">or click to select file from node</p>
                      </div>
                    ) : (
                      <div className="space-y-6">
                        <div className="bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 rounded-2xl p-6 flex items-center gap-4">
                          <div className="w-12 h-12 bg-red-500 text-white rounded-xl flex items-center justify-center">
                            <FileText size={24} />
                          </div>
                          <div className="flex-1 overflow-hidden">
                            <div className="font-bold text-slate-900 dark:text-white truncate">{selectedFile.name}</div>
                            <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{(selectedFile.size / 1024 / 1024).toFixed(2)} MB</div>
                          </div>
                          <button onClick={() => setSelectedFile(null)} className="text-red-500 hover:text-red-600 font-black text-[10px] uppercase underline">Remove</button>
                        </div>

                        {isUploading && (
                          <div className="space-y-2">
                             <div className="flex justify-between text-[9px] font-black uppercase tracking-widest text-slate-400">
                                <span>Uploading Storage Node</span>
                                <span>{Math.round(uploadProgress)}%</span>
                             </div>
                             <div className="h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                               <motion.div initial={{ width: 0 }} animate={{ width: `${uploadProgress}%` }} className="h-full bg-blue-600" />
                             </div>
                          </div>
                        )}

                        {!isUploading && !processResult && (
                           <button 
                            onClick={processFile}
                            disabled={isProcessing}
                            className="w-full bg-slate-900 text-white py-5 rounded-2xl font-black shadow-lg flex items-center justify-center gap-3"
                           >
                            {isProcessing ? (
                              <><div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" /> Analyzing PDF Content...</>
                            ) : `Begin ${tool.name}`}
                           </button>
                        )}

                        {processResult && (
                          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="p-8 bg-emerald-500 rounded-3xl text-white text-center shadow-xl shadow-emerald-200">
                             <CheckCircle2 className="mx-auto mb-4" size={40} />
                             <h4 className="text-xl font-black mb-2">Process Complete!</h4>
                             <p className="text-xs opacity-80 mb-6 font-bold uppercase tracking-widest">Ready for final node deployment</p>
                             <button className="w-full bg-white text-emerald-600 py-4 rounded-xl font-black shadow-lg hover:bg-emerald-50 transition-all flex items-center justify-center gap-2">
                               <Download size={20} /> Download Ready File
                             </button>
                          </motion.div>
                        )}
                      </div>
                    )}
                    <div className="bg-blue-50 dark:bg-blue-900/10 p-6 rounded-2xl border border-blue-100 dark:border-blue-900/30">
                      <p className="text-xs text-blue-700 dark:text-blue-300 font-bold leading-relaxed">
                        <Info size={14} className="inline mr-2" />
                        Our {tool.name.toLowerCase()} technology uses localized node processing to ensure your data never leaves your device. Secure, fast, and 100% free.
                      </p>
                    </div>
                  </div>
                )}

                {/* IMAGE TOOLS SIMULATION */}
                {tool.category === 'image' && tool.id !== 'ai-image-generator' && (
                  <div className="space-y-8">
                     {!selectedFile ? (
                       <div 
                        onClick={() => document.getElementById('image-upload')?.click()}
                        className="border-4 border-dashed border-slate-100 dark:border-slate-800 rounded-[32px] p-20 text-center hover:bg-slate-50 dark:hover:bg-slate-950 transition-all cursor-pointer group"
                       >
                        <input 
                          id="image-upload" 
                          type="file" 
                          accept="image/*" 
                          className="hidden" 
                          onChange={handleFileUpload}
                        />
                        <div className="w-20 h-20 bg-emerald-50 dark:bg-emerald-950/20 text-emerald-500 rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                          <ImageIcon size={40} />
                        </div>
                        <h3 className="text-xl font-black text-slate-900 dark:text-white mb-2">Upload Image to Process</h3>
                        <p className="text-slate-400 font-bold uppercase text-[10px] tracking-[0.2em]">Support for JPG, PNG, WEBP, and AVIF</p>
                      </div>
                     ) : (
                       <div className="space-y-6">
                        <div className="bg-white dark:bg-slate-950 border border-slate-100 dark:border-slate-800 rounded-[32px] overflow-hidden shadow-inner p-4">
                           <img 
                            src={URL.createObjectURL(selectedFile)} 
                            alt="Selected" 
                            className="w-full h-48 object-cover rounded-2xl"
                           />
                           <div className="mt-4 flex justify-between items-center px-2">
                              <div>
                                <div className="font-bold text-slate-900 truncate max-w-[200px]">{selectedFile.name}</div>
                                <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{(selectedFile.size / 1024 / 1024).toFixed(2)} MB</div>
                              </div>
                              <button onClick={() => setSelectedFile(null)} className="text-red-500 hover:text-red-600 font-black text-[10px] uppercase underline">Cancel</button>
                           </div>
                        </div>

                        {isUploading && (
                          <div className="space-y-2">
                             <div className="flex justify-between text-[9px] font-black uppercase tracking-widest text-slate-400">
                                <span>Neural Loading Node</span>
                                <span>{Math.round(uploadProgress)}%</span>
                             </div>
                             <div className="h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                               <motion.div initial={{ width: 0 }} animate={{ width: `${uploadProgress}%` }} className="h-full bg-emerald-600" />
                             </div>
                          </div>
                        )}

                        {!isUploading && !processResult && (
                           <button 
                            onClick={processFile}
                            disabled={isProcessing}
                            className="w-full bg-blue-600 text-white py-5 rounded-2xl font-black shadow-lg flex items-center justify-center gap-3"
                           >
                            {isProcessing ? (
                              <><div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" /> High-Performance Processing...</>
                            ) : `Optimize & ${tool.name}`}
                           </button>
                        )}

                        {processResult && (
                           <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-4">
                              <div className="bg-slate-900 rounded-[2.5rem] p-10 text-white text-center">
                                 <CheckCircle2 className="mx-auto mb-4 text-emerald-400" size={48} />
                                 <h4 className="text-2xl font-black mb-2 italic">Image Ready!</h4>
                                 <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-8">Reduced to Node Efficient {processResult.size}</div>
                                 <button className="w-full bg-white text-slate-900 py-5 rounded-3xl font-black text-lg shadow-2xl hover:scale-[1.02] transition-transform flex items-center justify-center gap-3">
                                   <Download size={24} /> Download Processed Node
                                 </button>
                              </div>
                              <button onClick={() => { setSelectedFile(null); setProcessResult(null); }} className="w-full py-4 text-[10px] font-black uppercase text-slate-400 hover:text-blue-600 transition-colors">Start New Process</button>
                           </motion.div>
                        )}
                       </div>
                     )}
                  </div>
                )}

                {/* ROBOTS.TXT GENERATOR */}
                {tool.id === 'robots-txt-generator' && (
                  <div className="space-y-8">
                    <p className="text-sm text-slate-500 font-medium italic">Click generate to build a standard USA-optimized robots.txt for your root node.</p>
                    <button onClick={handleRobotsGen} className="w-full bg-slate-900 text-white py-4 rounded-2xl font-black uppercase tracking-widest">Generate Robots Data</button>
                    {robotsResult && (
                      <div className="relative">
                        <pre className="bg-slate-50 p-6 rounded-2xl font-mono text-xs">{robotsResult}</pre>
                        <button onClick={() => handleCopy(robotsResult)} className="absolute top-4 right-4 text-[10px] font-black text-blue-600 uppercase">Copy</button>
                      </div>
                    )}
                  </div>
                )}

                {/* KEYWORD DENSITY */}
                {tool.id === 'keyword-density' && (
                  <div className="space-y-8">
                    <textarea 
                      value={inputText}
                      onChange={(e) => setInputText(e.target.value)}
                      placeholder="Paste content to analyze density..." 
                      className="w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 min-h-[200px] text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                    <button onClick={analyzeDensity} className="w-full bg-blue-600 text-white py-4 rounded-2xl font-black">Analyze Density</button>
                    {densityResult.length > 0 && (
                      <div className="grid gap-2">
                        {densityResult.map((res, i) => (
                          <div key={i} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-100">
                            <span className="font-bold text-slate-700">{res.word}</span>
                            <div className="flex gap-4 text-[10px] font-black uppercase tracking-widest text-slate-400">
                              <span>{res.count} Times</span>
                              <span className="text-blue-600">{res.percent}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* LIST TOOLS & LINE COUNTER */}
                {['alphabetizer', 'remove-duplicates', 'text-to-list', 'line-counter'].includes(tool.id) && (
                  <div className="space-y-8">
                    <textarea 
                      value={inputText}
                      onChange={(e) => setInputText(e.target.value)}
                      placeholder="Enter text or list items (one per line)..." 
                      className="w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 min-h-[250px] text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                    <div className="grid grid-cols-2 gap-4">
                      {tool.id === 'alphabetizer' && <button onClick={() => handleTextTool('alphabetize')} className="w-full bg-blue-600 text-white py-4 rounded-2xl font-black shadow-lg">Sort A-Z</button>}
                      {tool.id === 'remove-duplicates' && <button onClick={() => handleTextTool('duplicates')} className="w-full bg-emerald-600 text-white py-4 rounded-2xl font-black shadow-lg">Clean Duplicates</button>}
                      {tool.id === 'text-to-list' && <button onClick={() => handleTextTool('list')} className="w-full bg-purple-600 text-white py-4 rounded-2xl font-black shadow-lg">Bulletize</button>}
                      {tool.id === 'line-counter' && <button onClick={() => handleTextTool('lines')} className="w-full bg-slate-900 text-white py-4 rounded-2xl font-black shadow-lg">Count Lines</button>}
                    </div>
                  </div>
                )}

                {/* AI TOOLS (ALL REMAINING) */}
                {tool.category === 'ai' && !['ai-content-generator', 'ai-image-generator'].includes(tool.id) && (
                   <div className="space-y-8">
                    <div>
                      <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-4 px-1">Describe your {tool.name.toLowerCase()} context</label>
                      <textarea 
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        placeholder={`Provide details for your ${tool.name}...`} 
                        className="w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 min-h-[150px] focus:outline-none focus:ring-2 focus:ring-blue-400 text-slate-900 dark:text-white"
                      />
                    </div>
                    <button 
                      onClick={handleAiGenerate}
                      disabled={isGenerating}
                      className="w-full bg-slate-900 text-white py-5 rounded-2xl font-black disabled:opacity-50 flex items-center justify-center gap-3 shadow-xl"
                    >
                      {isGenerating ? <div className="w-6 h-6 border-4 border-white/20 border-t-white rounded-full animate-spin" /> : <><Sparkles size={24} /> Generate with AI</>}
                    </button>
                    {aiResult && (
                      <motion.div 
                        initial={{ opacity: 0 }} 
                        animate={{ opacity: 1 }} 
                        className="mt-12 p-8 bg-slate-50 dark:bg-slate-950 rounded-3xl border border-slate-100 dark:border-slate-800 whitespace-pre-wrap leading-relaxed font-medium text-slate-700 dark:text-slate-300"
                      >
                        <div className="flex justify-between items-center mb-6 border-b border-slate-200 dark:border-slate-800 pb-4">
                           <span className="font-bold text-slate-900 dark:text-white">AI Intelligence Result</span>
                           <button onClick={() => handleCopy(aiResult)} className="text-[10px] font-black text-blue-600 dark:text-blue-400 uppercase tracking-widest underline">{isCopied ? 'Copied' : 'Copy Output'}</button>
                        </div>
                        {aiResult}
                      </motion.div>
                    )}
                  </div>
                )}

                {/* FALLBACK FOR TOOLS NOT EXPLICITLY WRITTEN */}
                {!['ai-content-generator', 'ai-grammar-corrector', 'ai-summary-bot', 'ai-keyword-extractor', 'ai-translation-tool', 'ai-code-assistant', 'ai-video-script', 'ai-sentiment-analysis', 'ai-image-generator', 'meta-tag-generator', 'sitemap-generator', 'word-counter', 'plagiarism-checker', 'case-converter', 'slug-generator', 'lorem-ipsum', 'percentage-calc', 'loan-calculator', 'mortgage-calc', 'car-loan-calc', 'tip-calculator', 'sales-tax-calc', 'robots-txt-generator', 'keyword-density', 'alphabetizer', 'remove-duplicates', 'text-to-list', 'line-counter', 'ai-story-generator', 'ai-business-name', 'ai-bio-generator', 'ai-cover-letter', 'ai-job-desc', 'ai-logo-designer', 'keyword-research', 'bmi-calculator', 'unit-converter', 'compound-interest', 'discount-calc', 'serp-preview', 'roi-calculator', 'vat-calculator', 'salary-calc', 'hreflang-tag-gen', 'schema-generator', 'da-checker', 'backlink-checker', 'page-speed-test', 'broken-link-finder', 'canonical-tag-gen', 'crypto-conv'].includes(tool.id) && tool.category !== 'pdf' && tool.category !== 'image' && tool.category !== 'ai' && (
                  <div className="text-center py-20">
                    <div className="w-20 h-20 bg-slate-50 dark:bg-slate-950 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-300">
                      <Clock size={40} />
                    </div>
                    <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white mb-4">Tool Implementation in Progress</h2>
                    <p className="text-slate-500 dark:text-slate-400 max-w-md mx-auto font-medium">
                      This tool is part of our USA Utility Release scheduled for next week. 
                      Stay tuned for the full functional version.
                    </p>
                  </div>
                )}
              </div>

              {/* Informational Content */}
              <div className="prose dark:prose-invert max-w-none prose-h2:text-3xl prose-h2:font-black prose-h2:tracking-tight prose-p:text-slate-600 prose-p:dark:text-slate-400 prose-p:leading-relaxed">
                <h2>How our {tool.name} works</h2>
                <p>
                  Built with high-performance servers, our {tool.name} provides instant results without any data retention. 
                  We prioritize privacy and speed for professional workflows.
                </p>
                <h3>Why choose Earnandheal?</h3>
                <ul>
                  <li><strong>Instant Processing:</strong> No waiting or queues.</li>
                  <li><strong>Zero Data Storage:</strong> Your input stays in your browser.</li>
                  <li><strong>SEO Optimized:</strong> Perfect for digital marketers and web owners.</li>
                  <li><strong>Mobile Ready:</strong> Use it on your phone or tablet on the go.</li>
                </ul>
              </div>
            </motion.div>
          </div>

          {/* Sidebar Area */}
          <div className="w-full lg:w-80 space-y-8">
            {/* Affiliate Widget */}
            <div className="bg-slate-900 rounded-[2rem] p-8 text-white relative overflow-hidden shadow-2xl">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/20 blur-[60px] rounded-full" />
              <div className="relative z-10">
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-400 mb-4 block">Partner Deal</span>
                <h4 className="text-xl font-bold mb-4 leading-tight italic">Scale Your SEO with Cloud Pro</h4>
                <p className="text-xs text-slate-400 mb-8 leading-relaxed">Specialized hosting for USA content creators. Fast, secure, and reliable.</p>
                <button className="w-full bg-white text-slate-900 py-3.5 rounded-xl font-black text-[11px] uppercase tracking-widest hover:bg-blue-50 transition-colors">
                  Claim 60% Discount
                </button>
              </div>
            </div>

            {/* Related Tools */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-8 rounded-[2rem] shadow-sm">
              <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-8 flex items-center gap-2">
                <Info size={14} className="text-blue-600" /> Related Utilities
              </h4>
              <div className="space-y-4">
                {TOOLS.filter(t => t.id !== tool.id).slice(0, 5).map(t => (
                  <Link 
                    key={t.id} 
                    to={`/tool/${t.slug}`}
                    className="flex items-center gap-4 group p-3 hover:bg-slate-50 dark:hover:bg-slate-950 rounded-2xl transition-all border border-transparent hover:border-slate-100 dark:hover:border-slate-800"
                  >
                    <div className="w-10 h-10 bg-slate-50 dark:bg-slate-800 rounded-xl flex items-center justify-center text-slate-400 group-hover:bg-blue-600 group-hover:text-white transition-all shadow-sm">
                      <Zap size={18} />
                    </div>
                    <div>
                      <div className="text-xs font-black text-slate-900 dark:text-white group-hover:text-blue-600 transition-colors">{t.name}</div>
                      <div className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">{t.category}</div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Support Widget */}
            <div className="bg-blue-50 dark:bg-blue-900/10 p-8 rounded-[2rem] text-center border border-blue-100 dark:border-blue-900/30">
              <MessageSquare className="mx-auto mb-4 text-blue-600" size={32} />
              <h5 className="font-black text-slate-900 dark:text-white text-sm mb-2">Need a Custom Tool?</h5>
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-6 leading-relaxed">Our expert developers can build bespoke utility solutions for your business nodes.</p>
              <Link to="/contact" className="text-[10px] font-black text-blue-600 uppercase tracking-widest hover:underline">Contact Support</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
