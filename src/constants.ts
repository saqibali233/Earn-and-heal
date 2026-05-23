import { Tool } from './types';

export const TOOLS: Tool[] = [
  // --- AI TOOLS ---
  {
    id: 'ai-content-generator',
    name: 'AI Content Generator',
    description: 'Generate high-quality articles and marketing copy using advanced AI.',
    category: 'ai',
    slug: 'ai-content-generator',
    icon: 'Sparkles',
    popular: true,
    featured: true
  },
  {
    id: 'ai-image-generator',
    name: 'AI Image Generator',
    description: 'Create stunning visuals and artistic images from text descriptions.',
    category: 'ai',
    slug: 'ai-image-generator',
    icon: 'Sparkles'
  },
  {
    id: 'ai-code-assistant',
    name: 'AI Code Assistant',
    description: 'Debug, optimize, and generate code snippets in multiple languages.',
    category: 'ai',
    slug: 'ai-code-assistant',
    icon: 'Sparkles'
  },
  {
    id: 'ai-grammar-corrector',
    name: 'AI Grammar Corrector',
    description: 'Eliminate typos and improve sentence structure instantly.',
    category: 'ai',
    slug: 'ai-grammar-corrector',
    icon: 'Sparkles'
  },
  {
    id: 'ai-summary-bot',
    name: 'AI Summary Bot',
    description: 'Condense long articles into concise, meaningful summaries.',
    category: 'ai',
    slug: 'ai-summary-bot',
    icon: 'Sparkles'
  },
  {
    id: 'ai-translation-tool',
    name: 'AI Multi-Translator',
    description: 'Translate text between 100+ languages with neural accuracy.',
    category: 'ai',
    slug: 'ai-translation',
    icon: 'Sparkles'
  },
  {
    id: 'ai-keyword-extractor',
    name: 'AI Keyword Extractor',
    description: 'Automatically extract relevant keywords from any text block.',
    category: 'ai',
    slug: 'ai-keyword-extractor',
    icon: 'Sparkles'
  },
  {
    id: 'ai-video-script',
    name: 'AI Script Writer',
    description: 'Craft engaging scripts for YouTube, TikTok, and Reels.',
    category: 'ai',
    slug: 'ai-video-script',
    icon: 'Sparkles'
  },
  {
    id: 'ai-sentiment-analysis',
    name: 'AI Sentiment Analysis',
    description: 'Analyze the emotional tone of reviews and social posts.',
    category: 'ai',
    slug: 'ai-sentiment-analysis',
    icon: 'Sparkles'
  },
  {
    id: 'ai-logo-designer',
    name: 'AI Logo Designer',
    description: 'Generate professional brand identities in seconds.',
    category: 'ai',
    slug: 'ai-logo-designer',
    icon: 'Sparkles'
  },
  {
    id: 'ai-story-generator',
    name: 'AI Story Writer',
    description: 'Generate creative stories and narratives with custom plot points.',
    category: 'ai',
    slug: 'ai-story-generator',
    icon: 'Sparkles'
  },
  {
    id: 'ai-business-name',
    name: 'AI Business Name',
    description: 'Generate catchy, memorable names for your USA startup.',
    category: 'ai',
    slug: 'ai-business-name',
    icon: 'Sparkles'
  },
  {
    id: 'ai-bio-generator',
    name: 'AI Social Bio',
    description: 'Craft professional bios for LinkedIn, Twitter, and Instagram.',
    category: 'ai',
    slug: 'ai-bio-generator',
    icon: 'Sparkles'
  },
  {
    id: 'ai-cover-letter',
    name: 'AI Cover Letter',
    description: 'Generate tailored cover letters for your job applications.',
    category: 'ai',
    slug: 'ai-cover-letter',
    icon: 'Sparkles'
  },
  {
    id: 'ai-job-desc',
    name: 'AI Job Description',
    description: 'Create detailed, SEO-friendly job postings for HR teams.',
    category: 'ai',
    slug: 'ai-job-desc',
    icon: 'Sparkles'
  },

  // --- SEO TOOLS ---
  {
    id: 'keyword-research',
    name: 'Keyword Research',
    description: 'Discover high-volume, low-competition keywords for your niche.',
    category: 'seo',
    slug: 'keyword-research',
    icon: 'Search',
    popular: true
  },
  {
    id: 'backlink-checker',
    name: 'Backlink Checker',
    description: 'Analyze your site\'s link profile and find new opportunities.',
    category: 'seo',
    slug: 'backlink-checker',
    icon: 'Search'
  },
  {
    id: 'meta-tag-generator',
    name: 'Meta Tag Generator',
    description: 'Create SEO-optimized title tags and meta descriptions.',
    category: 'seo',
    slug: 'meta-tag-generator',
    icon: 'Search'
  },
  {
    id: 'sitemap-generator',
    name: 'XML Sitemap Generator',
    description: 'Build valid XML sitemaps for Google and Bing scanning.',
    category: 'seo',
    slug: 'sitemap-generator',
    icon: 'Search'
  },
  {
    id: 'robots-txt-generator',
    name: 'Robots.txt Generator',
    description: 'Control search engine crawler access with custom robots rules.',
    category: 'seo',
    slug: 'robots-txt-generator',
    icon: 'Search'
  },
  {
    id: 'da-checker',
    name: 'Domain Authority',
    description: 'Check the ranking strength and reputation of any domain.',
    category: 'seo',
    slug: 'da-checker',
    icon: 'Search'
  },
  {
    id: 'serp-preview',
    name: 'SERP Previewer',
    description: 'See exactly how your page looks in Google search results.',
    category: 'seo',
    slug: 'serp-preview',
    icon: 'Search'
  },
  {
    id: 'broken-link-finder',
    name: 'Broken Link Finder',
    description: 'Scan your pages for 404 errors and dead URLs.',
    category: 'seo',
    slug: 'broken-link-finder',
    icon: 'Search'
  },
  {
    id: 'schema-generator',
    name: 'Schema Markup Gen',
    description: 'Generate JSON-LD structured data for rich results.',
    category: 'seo',
    slug: 'schema-generator',
    icon: 'Search'
  },
  {
    id: 'hreflang-tag-gen',
    name: 'Hreflang Generator',
    description: 'Create multi-language tags for international SEO.',
    category: 'seo',
    slug: 'hreflang-tag-gen',
    icon: 'Search'
  },
  {
    id: 'canonical-tag-gen',
    name: 'Canonical Tag Gen',
    description: 'Prevent duplicate content issues with canonical tags.',
    category: 'seo',
    slug: 'canonical-tag-generator',
    icon: 'Search'
  },
  {
    id: 'keyword-density',
    name: 'Keyword Density',
    description: 'Analyze keyword frequency in your content for optimization.',
    category: 'seo',
    slug: 'keyword-density',
    icon: 'Search'
  },
  {
    id: 'page-speed-test',
    name: 'Page Speed Insight',
    description: 'Get performance metrics for your web pages (Simulation).',
    category: 'seo',
    slug: 'page-speed-test',
    icon: 'Search'
  },

  // --- TEXT TOOLS ---
  {
    id: 'word-counter',
    name: 'Word Counter',
    description: 'Accurately count words, characters, and reading time.',
    category: 'text',
    slug: 'word-counter',
    icon: 'Type',
    popular: true
  },
  {
    id: 'case-converter',
    name: 'Case Converter',
    description: 'Convert text to UPPERCASE, lowercase, or Title Case.',
    category: 'text',
    slug: 'case-converter',
    icon: 'Type',
    popular: true
  },
  {
    id: 'plagiarism-checker',
    name: 'Plagiarism Checker',
    description: 'Verify content uniqueness against billion-page databases.',
    category: 'text',
    slug: 'plagiarism-checker',
    icon: 'Type'
  },
  {
    id: 'lorem-ipsum',
    name: 'Lorem Ipsum Gen',
    description: 'Generate dummy text for your design and layout needs.',
    category: 'text',
    slug: 'lorem-ipsum',
    icon: 'Type'
  },
  {
    id: 'slug-generator',
    name: 'Text to Slug',
    description: 'Transform titles into SEO-friendly URL slugs.',
    category: 'text',
    slug: 'slug-generator',
    icon: 'Type'
  },
  {
    id: 'remove-duplicates',
    name: 'Duplicate Remover',
    description: 'Clean your lists by removing all duplicate entries.',
    category: 'text',
    slug: 'remove-duplicates',
    icon: 'Type'
  },
  {
    id: 'alphabetizer',
    name: 'Alphabetizer',
    description: 'Sort your lists of names or items alphabetically.',
    category: 'text',
    slug: 'alphabetizer',
    icon: 'Type'
  },
  {
    id: 'line-counter',
    name: 'Line Counter',
    description: 'Count exactly how many lines are in your text block.',
    category: 'text',
    slug: 'line-counter',
    icon: 'Type'
  },
  {
    id: 'text-to-list',
    name: 'Text to List',
    description: 'Convert paragraphs into bulleted or numbered lists.',
    category: 'text',
    slug: 'text-to-list',
    icon: 'Type'
  },

  // --- IMAGE TOOLS ---
  {
    id: 'image-compressor',
    name: 'Image Compressor',
    description: 'Reduce file size without losing visual quality.',
    category: 'image',
    slug: 'image-compressor',
    icon: 'Image',
    popular: true
  },
  {
    id: 'image-to-webp',
    name: 'Image to WebP',
    description: 'Convert JPG/PNG to WebP for faster performance.',
    category: 'image',
    slug: 'image-to-webp',
    icon: 'Image'
  },
  {
    id: 'background-remover',
    name: 'BG Remover AI',
    description: 'Isolate subjects and remove backgrounds instantly.',
    category: 'image',
    slug: 'background-remover',
    icon: 'Image'
  },
  {
    id: 'image-resizer',
    name: 'Image Resizer',
    description: 'Change image dimensions with pixel-perfect control.',
    category: 'image',
    slug: 'image-resizer',
    icon: 'Image'
  },
  {
    id: 'png-to-jpg',
    name: 'PNG to JPG',
    description: 'Bulk convert transparent PNGs to solid JPG files.',
    category: 'image',
    slug: 'png-to-jpg',
    icon: 'Image'
  },
  {
    id: 'jpg-to-png',
    name: 'JPG to PNG',
    description: 'Convert compressed JPGs to lossless PNG format.',
    category: 'image',
    slug: 'jpg-to-png',
    icon: 'Image'
  },
  {
    id: 'image-color-picker',
    name: 'Color Picker',
    description: 'Extract HEX/RGB values from any uploaded image.',
    category: 'image',
    slug: 'image-color-picker',
    icon: 'Image'
  },
  {
    id: 'image-to-base64',
    name: 'Image to Base64',
    description: 'Convert binary images into browser-ready code.',
    category: 'image',
    slug: 'image-to-base64',
    icon: 'Image'
  },

  // --- PDF TOOLS ---
  {
    id: 'pdf-to-word',
    name: 'PDF to Word',
    description: 'Extract text from PDFs into editable DOCX files.',
    category: 'pdf',
    slug: 'pdf-to-word',
    icon: 'FileText'
  },
  {
    id: 'word-to-pdf',
    name: 'Word to PDF',
    description: 'Convert Word documents into secure, fixed PDF files.',
    category: 'pdf',
    slug: 'word-to-pdf',
    icon: 'FileText'
  },
  {
    id: 'merge-pdf',
    name: 'Merge PDF',
    description: 'Combine multiple PDF documents into a single file.',
    category: 'pdf',
    slug: 'merge-pdf',
    icon: 'FileText'
  },
  {
    id: 'split-pdf',
    name: 'Split PDF',
    description: 'Extract specific pages or ranges from any PDF.',
    category: 'pdf',
    slug: 'split-pdf',
    icon: 'FileText'
  },
  {
    id: 'pdf-compressor',
    name: 'PDF Compressor',
    description: 'Shrink PDF file size for easier email sharing.',
    category: 'pdf',
    slug: 'pdf-compressor',
    icon: 'FileText'
  },
  {
    id: 'protect-pdf',
    name: 'Protect PDF',
    description: 'Lock your files with strong AES encryption passwords.',
    category: 'pdf',
    slug: 'protect-pdf',
    icon: 'FileText'
  },
  {
    id: 'pdf-to-jpg',
    name: 'PDF to JPG',
    description: 'Export every page of a PDF as a high-quality image.',
    category: 'pdf',
    slug: 'pdf-to-jpg',
    icon: 'FileText'
  },
  {
    id: 'jpg-to-pdf',
    name: 'JPG to PDF',
    description: 'Convert your photo collection into a clean PDF doc.',
    category: 'pdf',
    slug: 'jpg-to-pdf',
    icon: 'FileText'
  },

  // --- FINANCE TOOLS ---
  {
    id: 'loan-calculator',
    name: 'Loan Calculator',
    description: 'Calculate monthly payments and total interest costs.',
    category: 'finance',
    slug: 'loan-calculator',
    icon: 'Calculator',
    popular: true
  },
  {
    id: 'mortgage-calc',
    name: 'Mortgage Calc',
    description: 'Estimate home loan payoffs and down payments.',
    category: 'finance',
    slug: 'mortgage-calc',
    icon: 'Calculator',
    popular: true
  },
  {
    id: 'vat-calculator',
    name: 'VAT/GST Calc',
    description: 'Add or remove tax from any price instantly.',
    category: 'finance',
    slug: 'vat-calculator',
    icon: 'Calculator'
  },
  {
    id: 'unit-converter',
    name: 'Unit Converter',
    description: 'Switch between Metric and Imperial measurements.',
    category: 'finance',
    slug: 'unit-converter',
    icon: 'Calculator'
  },
  {
    id: 'crypto-conv',
    name: 'Crypto Converter',
    description: 'Live rates for BTC, ETH, and 1000+ altcoins.',
    category: 'finance',
    slug: 'crypto-conv',
    icon: 'Calculator'
  },
  {
    id: 'percentage-calc',
    name: 'Percentage Calc',
    description: 'Quickly find increase, decrease, or share percents.',
    category: 'finance',
    slug: 'percentage-calc',
    icon: 'Calculator'
  },
  {
    id: 'salary-calc',
    name: 'Salary Calculator',
    description: 'Calculate net pay after taxes and deductions.',
    category: 'finance',
    slug: 'salary-calc',
    icon: 'Calculator',
    popular: true
  },
  {
    id: 'bmi-calculator',
    name: 'BMI Calculator',
    description: 'Determine health index using height and weight.',
    category: 'finance',
    slug: 'bmi-calculator',
    icon: 'Calculator'
  },
  {
    id: 'compound-interest',
    name: 'Compound Growth',
    description: 'Visualize how your savings grow over long periods.',
    category: 'finance',
    slug: 'compound-interest',
    icon: 'Calculator'
  },
  {
    id: 'discount-calc',
    name: 'Discount Calc',
    description: 'Final price calculations for sales and promos.',
    category: 'finance',
    slug: 'discount-calc',
    icon: 'Calculator'
  },
  {
    id: 'tip-calculator',
    name: 'Tip Calculator',
    description: 'Quickly calculate dining tips and split bills.',
    category: 'finance',
    slug: 'tip-calculator',
    icon: 'Calculator'
  },
  {
    id: 'sales-tax-calc',
    name: 'Sales Tax Calc',
    description: 'Calculate total cost after USA state sales tax.',
    category: 'finance',
    slug: 'sales-tax-calc',
    icon: 'Calculator',
    popular: true
  },
  {
    id: 'roi-calculator',
    name: 'ROI Calculator',
    description: 'Calculate Return on Investment for your projects.',
    category: 'finance',
    slug: 'roi-calculator',
    icon: 'Calculator'
  },
  {
    id: 'car-loan-calc',
    name: 'Car Loan Calc',
    description: 'Calculate monthly payments for US auto loans.',
    category: 'finance',
    slug: 'car-loan-calc',
    icon: 'Calculator'
  }
];

export const CATEGORIES = [
  { id: 'ai', name: 'AI Models', icon: 'Sparkles', description: 'Advanced AI-powered logic.' },
  { id: 'seo', name: 'SEO Engine', icon: 'Search', description: 'Optimization tools for growth.' },
  { id: 'text', name: 'Text Buffer', icon: 'Type', description: 'Raw content manipulation.' },
  { id: 'image', name: 'Image Nodes', icon: 'Image', description: 'Visual asset processing.' },
  { id: 'pdf', name: 'PDF Protocol', icon: 'FileText', description: 'Portable document control.' },
  { id: 'finance', name: 'Finance Ops', icon: 'Calculator', description: 'Precision financial math.' }
];
