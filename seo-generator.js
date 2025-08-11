/* ==========================================================================
   SEO Page Generator - QuickWordFinder
   Automatically generates SEO pages from templates
   ========================================================================== */

   const fs = require('fs');
   const path = require('path');
   
   /* Configuration
      ========================================================================== */
   
   const config = {
       templatesDir: './pages/templates',
       outputDir: './pages',
       baseUrl: 'https://quickwordfinder.com'
   };
   
   /* Word Database - Extended for SEO Generation
      ========================================================================== */
   
   const wordDatabase = [
       // 3 letter words
       { word: 'CAT', length: 3, points: 5, common: true, wordle: false },
       { word: 'DOG', length: 3, points: 5, common: true, wordle: false },
       { word: 'RUN', length: 3, points: 3, common: true, wordle: false },
       { word: 'BAT', length: 3, points: 5, common: false, wordle: false },
       { word: 'RAT', length: 3, points: 3, common: true, wordle: false },
       { word: 'HAT', length: 3, points: 6, common: true, wordle: false },
       { word: 'MAT', length: 3, points: 5, common: false, wordle: false },
       { word: 'SAT', length: 3, points: 3, common: true, wordle: false },
       { word: 'FAT', length: 3, points: 6, common: false, wordle: false },
       { word: 'TAR', length: 3, points: 3, common: false, wordle: false },
       { word: 'CAR', length: 3, points: 5, common: true, wordle: false },
       { word: 'BAR', length: 3, points: 5, common: true, wordle: false },
       
       // 4 letter words
       { word: 'BIRD', length: 4, points: 7, common: true, wordle: false },
       { word: 'TREE', length: 4, points: 4, common: true, wordle: false },
       { word: 'STAR', length: 4, points: 4, common: true, wordle: false },
       { word: 'BEAR', length: 4, points: 6, common: false, wordle: false },
       { word: 'CARE', length: 4, points: 6, common: true, wordle: false },
       { word: 'RARE', length: 4, points: 4, common: false, wordle: false },
       { word: 'DARE', length: 4, points: 5, common: true, wordle: false },
       { word: 'FARE', length: 4, points: 7, common: false, wordle: false },
       { word: 'MARE', length: 4, points: 6, common: false, wordle: false },
       { word: 'BARE', length: 4, points: 6, common: false, wordle: false },
       { word: 'TAPE', length: 4, points: 6, common: true, wordle: false },
       { word: 'CAKE', length: 4, points: 10, common: true, wordle: false },
       
       // 5 letter words (Only BEST Wordle starters marked as wordle: true)
       { word: 'CRANE', length: 5, points: 7, common: true, wordle: true },
       { word: 'SLATE', length: 5, points: 5, common: true, wordle: true },
       { word: 'TRACE', length: 5, points: 7, common: false, wordle: true },
       { word: 'STARE', length: 5, points: 5, common: true, wordle: true },
       { word: 'AROSE', length: 5, points: 5, common: false, wordle: true },
       { word: 'TEARS', length: 5, points: 5, common: false, wordle: false },
       { word: 'STEAM', length: 5, points: 7, common: true, wordle: false },
       { word: 'STONE', length: 5, points: 5, common: true, wordle: false },
       { word: 'CRATE', length: 5, points: 7, common: true, wordle: false },
       { word: 'BRACE', length: 5, points: 9, common: false, wordle: false },
       { word: 'GRACE', length: 5, points: 8, common: true, wordle: false },
       { word: 'PLACE', length: 5, points: 9, common: true, wordle: false },
       { word: 'SPACE', length: 5, points: 9, common: true, wordle: false },
       { word: 'CHASE', length: 5, points: 10, common: true, wordle: false },
       { word: 'SHAPE', length: 5, points: 10, common: true, wordle: false },
       { word: 'SHADE', length: 5, points: 9, common: true, wordle: false },
       { word: 'SHARE', length: 5, points: 8, common: true, wordle: false },
       { word: 'SPARE', length: 5, points: 7, common: true, wordle: false },
       { word: 'SCARE', length: 5, points: 7, common: false, wordle: false },
       { word: 'SCORE', length: 5, points: 7, common: true, wordle: false },
       { word: 'ADORE', length: 5, points: 6, common: true, wordle: false },
       { word: 'STORE', length: 5, points: 5, common: true, wordle: false },
       
       // 6 letter words
       { word: 'FRIEND', length: 6, points: 10, common: true, wordle: false },
       { word: 'CASTLE', length: 6, points: 8, common: true, wordle: false },
       { word: 'GARDEN', length: 6, points: 8, common: true, wordle: false },
       { word: 'STREAM', length: 6, points: 8, common: false, wordle: false },
       { word: 'BRANCH', length: 6, points: 13, common: true, wordle: false },
       { word: 'CHANGE', length: 6, points: 12, common: true, wordle: false },
       { word: 'CHARGE', length: 6, points: 12, common: true, wordle: false },
       { word: 'CHANCE', length: 6, points: 13, common: true, wordle: false },
       { word: 'CHOICE', length: 6, points: 13, common: true, wordle: false },
       { word: 'CREATE', length: 6, points: 8, common: true, wordle: false },
       
       // 7 letter words
       { word: 'RAINBOW', length: 7, points: 12, common: true, wordle: false },
       { word: 'KITCHEN', length: 7, points: 16, common: true, wordle: false },
       { word: 'JOURNEY', length: 7, points: 17, common: false, wordle: false },
       { word: 'MACHINE', length: 7, points: 14, common: true, wordle: false },
       { word: 'PICTURE', length: 7, points: 13, common: true, wordle: false },
       { word: 'CHICKEN', length: 7, points: 18, common: true, wordle: false },
       { word: 'TEACHER', length: 7, points: 12, common: true, wordle: false },
       { word: 'BROTHER', length: 7, points: 12, common: true, wordle: false },
       { word: 'WEATHER', length: 7, points: 15, common: true, wordle: false },
       { word: 'ANOTHER', length: 7, points: 10, common: true, wordle: false },
       
       // 8 letter words
       { word: 'COMPUTER', length: 8, points: 14, common: true, wordle: false },
       { word: 'BIRTHDAY', length: 8, points: 16, common: true, wordle: false },
       { word: 'SANDWICH', length: 8, points: 16, common: true, wordle: false },
       { word: 'ELEPHANT', length: 8, points: 13, common: true, wordle: false },
       { word: 'SWIMMING', length: 8, points: 16, common: true, wordle: false }
   ];
   
   /* Utility Functions
      ========================================================================== */
   
   function ensureDirectoryExists(dirPath) {
       if (!fs.existsSync(dirPath)) {
           fs.mkdirSync(dirPath, { recursive: true });
           console.log(`📁 Created directory: ${dirPath}`);
       }
   }
   
   function loadTemplate(templateName) {
       const templatePath = path.join(config.templatesDir, `${templateName}.html`);
       
       if (!fs.existsSync(templatePath)) {
           throw new Error(`Template not found: ${templatePath}`);
       }
       
       return fs.readFileSync(templatePath, 'utf8');
   }
   
   function writePageFile(filePath, content) {
       fs.writeFileSync(filePath, content, 'utf8');
       console.log(`✅ Generated: ${filePath}`);
   }
   
   function getWordsByLength(length) {
       return wordDatabase.filter(word => word.length === length);
   }
   
   function getCommonWords(words) {
       return words.filter(word => word.common);
   }
   
   function getScrabbleWords(words) {
       return words.filter(word => word.points > 7);
   }
   
   function getExampleWords(words, count = 5) {
       const common = words.filter(word => word.common).slice(0, count);
       return common.map(word => word.word).join(', ');
   }
   
   /* Length-based Page Generation
      ========================================================================== */
   
   function generateLengthPages() {
       console.log('\n🎯 Generating length-based pages...');
       
       const template = loadTemplate('length-template');
       ensureDirectoryExists(path.join(config.outputDir, 'length'));
       
       // Generate pages for lengths 3-8
       for (let length = 3; length <= 8; length++) {
           const words = getWordsByLength(length);
           const commonWords = getCommonWords(words);
           const scrabbleWords = getScrabbleWords(words);
           const exampleWords = getExampleWords(words);
           
           if (words.length === 0) {
               console.log(`⚠️  No words found for length ${length}, skipping...`);
               continue;
           }
           
           // Replace template variables
           let pageContent = template
               .replace(/\{\{LENGTH\}\}/g, length)
               .replace(/\{\{WORD_COUNT\}\}/g, words.length)
               .replace(/\{\{COMMON_COUNT\}\}/g, commonWords.length)
               .replace(/\{\{SCRABBLE_COUNT\}\}/g, scrabbleWords.length)
               .replace(/\{\{COMMON_EXAMPLES\}\}/g, exampleWords);
           
           // Write the file
           const fileName = `${length}-letter-words.html`;
           const filePath = path.join(config.outputDir, 'length', fileName);
           writePageFile(filePath, pageContent);
           
           // Also create a root-level copy for main navigation
           const rootFilePath = path.join(config.outputDir, fileName);
           writePageFile(rootFilePath, pageContent);
       }
   }
   
   /* Starting Letter Page Generation
      ========================================================================== */
   
   function generateStartingLetterPages() {
       console.log('\n🔤 Generating starting letter pages...');
       
       // For now, we'll create a simple template for starting letters
       const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
       ensureDirectoryExists(path.join(config.outputDir, 'starting'));
       
       for (let length = 3; length <= 8; length++) {
           for (let letter of alphabet) {
               const words = wordDatabase.filter(word => 
                   word.length === length && word.word.startsWith(letter)
               );
               
               if (words.length === 0) continue;
               
               // Create a simple template for starting letters
               const pageContent = createStartingLetterPage(length, letter, words);
               const fileName = `${length}-letter-words-starting-with-${letter.toLowerCase()}.html`;
               const filePath = path.join(config.outputDir, 'starting', fileName);
               writePageFile(filePath, pageContent);
           }
       }
   }
   
   function createStartingLetterPage(length, letter, words) {
       const commonWords = getCommonWords(words);
       const scrabbleWords = getScrabbleWords(words);
       const exampleWords = getExampleWords(words);
       
       return `<!DOCTYPE html>
   <html lang="en">
   <head>
       <!-- Essential Meta Tags -->
       <meta charset="UTF-8">
       <meta name="viewport" content="width=device-width, initial-scale=1.0">
       <meta http-equiv="X-UA-Compatible" content="IE=edge">
       
       <!-- SEO Meta Tags -->
       <title>${length} Letter Words Starting with ${letter} | QuickWordFinder</title>
       <meta name="description" content="Find all ${length} letter words starting with ${letter}. Complete list of ${words.length} words for Wordle, Scrabble, and crosswords.">
       <meta name="keywords" content="${length} letter words starting with ${letter}, ${length} letter ${letter} words, words beginning with ${letter}">
       <meta name="author" content="QuickWordFinder">
       
       <!-- Open Graph Meta Tags -->
       <meta property="og:title" content="${length} Letter Words Starting with ${letter} | QuickWordFinder">
       <meta property="og:description" content="Find all ${length} letter words starting with ${letter}. Complete searchable database.">
       <meta property="og:type" content="website">
       <meta property="og:url" content="${config.baseUrl}/${length}-letter-words-starting-with-${letter.toLowerCase()}">
       <meta property="og:site_name" content="QuickWordFinder">
       
       <!-- Favicon -->
       <link rel="icon" type="image/x-icon" href="/assets/favicon.ico">
       <link rel="apple-touch-icon" sizes="180x180" href="/assets/apple-touch-icon.png">
       
       <!-- Canonical URL -->
       <link rel="canonical" href="${config.baseUrl}/${length}-letter-words-starting-with-${letter.toLowerCase()}">
       
       <!-- CSS -->
       <link rel="stylesheet" href="/src/css/main.css">
       <link rel="stylesheet" href="/src/css/seo-pages.css">
       
       <!-- Structured Data -->
       <script type="application/ld+json">
       {
           "@context": "https://schema.org",
           "@type": "WebPage",
           "name": "${length} Letter Words Starting with ${letter}",
           "description": "Complete list of ${length} letter words starting with ${letter}",
           "url": "${config.baseUrl}/${length}-letter-words-starting-with-${letter.toLowerCase()}",
           "mainEntity": {
               "@type": "ItemList",
               "name": "${length} Letter Words Starting with ${letter}",
               "numberOfItems": "${words.length}"
           },
           "breadcrumb": {
               "@type": "BreadcrumbList",
               "itemListElement": [
                   {
                       "@type": "ListItem",
                       "position": 1,
                       "name": "Home",
                       "item": "${config.baseUrl}"
                   },
                   {
                       "@type": "ListItem",
                       "position": 2,
                       "name": "Word Lists",
                       "item": "${config.baseUrl}/word-lists"
                   },
                   {
                       "@type": "ListItem",
                       "position": 3,
                       "name": "${length} Letter Words Starting with ${letter}",
                       "item": "${config.baseUrl}/${length}-letter-words-starting-with-${letter.toLowerCase()}"
                   }
               ]
           }
       }
       </script>
   </head>
   <body>
       <!-- Header -->
       <header class="site-header" role="banner">
           <div class="container">
               <div class="header-content">
                   <div class="logo-section">
                       <h1 class="site-title">
                           <a href="/" aria-label="QuickWordFinder Home">
                               QuickWordFinder <span class="logo-emoji">⚡</span>
                           </a>
                       </h1>
                       <p class="tagline">Your fastest word finder for any word game</p>
                   </div>
                   
                   <nav class="main-navigation" role="navigation" aria-label="Main Navigation">
                       <ul class="nav-list">
                           <li><a href="/" class="nav-link">Home</a></li>
                           <li><a href="/blog" class="nav-link">Blog</a></li>
                           <li><a href="/about" class="nav-link">About</a></li>
                           <li><a href="/contact" class="nav-link">Contact</a></li>
                       </ul>
                   </nav>
               </div>
           </div>
       </header>
   
       <!-- Breadcrumb Navigation -->
       <nav class="breadcrumb-nav" aria-label="Breadcrumb">
           <div class="container">
               <ol class="breadcrumb">
                   <li><a href="/">Home</a></li>
                   <li><a href="/word-lists">Word Lists</a></li>
                   <li><a href="/${length}-letter-words">${length} Letter Words</a></li>
                   <li class="current">Starting with ${letter}</li>
               </ol>
           </div>
       </nav>
   
       <!-- Main Content -->
       <main id="main" class="main-content seo-page" role="main">
           <div class="container">
               
               <!-- Hero Section -->
               <section class="seo-hero" aria-labelledby="page-title">
                   <h1 id="page-title" class="seo-title">${length} Letter Words Starting with ${letter}</h1>
                   <p class="seo-subtitle">
                       Find all ${length} letter words that start with "${letter}". 
                       Our complete database includes <strong>${words.length} words</strong> with definitions and game scores.
                   </p>
                   
                   <!-- Quick Stats -->
                   <div class="word-stats">
                       <div class="stat-item">
                           <span class="stat-number">${words.length}</span>
                           <span class="stat-label">Total Words</span>
                       </div>
                       <div class="stat-item">
                           <span class="stat-number">${commonWords.length}</span>
                           <span class="stat-label">Common Words</span>
                       </div>
                       <div class="stat-item">
                           <span class="stat-number">${scrabbleWords.length}</span>
                           <span class="stat-label">Scrabble Valid</span>
                       </div>
                   </div>
               </section>
   
               <!-- Quick Search -->
               <section class="quick-search-section">
                   <h2>Quick Search ${length} Letter Words Starting with ${letter}</h2>
                   <div class="search-box seo-search">
                       <input type="text" id="wordSearch" class="search-input" placeholder="Search ${length} letter words starting with ${letter}..." aria-label="Search words">
                       <div class="search-filters">
                           <button class="filter-btn active" data-filter="all">All Words</button>
                           <button class="filter-btn" data-filter="common">Common Only</button>
                           <button class="filter-btn" data-filter="wordle">Wordle Words</button>
                           <button class="filter-btn" data-filter="scrabble">Scrabble Valid</button>
                       </div>
                   </div>
               </section>
   
               <!-- Word Grid Section -->
               <section class="words-section" aria-labelledby="words-title">
                   <div class="section-header">
                       <h2 id="words-title">All ${length} Letter Words Starting with ${letter}</h2>
                       <div class="sort-controls">
                           <label for="sortSelect">Sort by:</label>
                           <select id="sortSelect" class="sort-select">
                               <option value="alpha">Alphabetical</option>
                               <option value="common">Most Common</option>
                               <option value="points">Scrabble Points</option>
                               <option value="wordle">Wordle Frequency</option>
                           </select>
                       </div>
                   </div>
                   
                   <!-- Word Display Grid -->
                   <div class="word-grid seo-grid" id="wordGrid" role="grid" aria-label="${length} letter words starting with ${letter}">
                       <!-- Words will be populated by JavaScript -->
                       <div class="loading-message">Loading ${length} letter words starting with ${letter}...</div>
                   </div>
                   
                   <!-- Load More Button -->
                   <div class="load-more-section" id="loadMoreSection" style="display: none;">
                       <button id="loadMoreBtn" class="load-more-btn">
                           Load More Words (<span id="remainingCount">0</span> remaining)
                       </button>
                   </div>
               </section>
   
               <!-- Related Links Section -->
               <section class="related-links">
                   <h2>Related Word Lists</h2>
                   <div class="related-grid">
                       <div class="related-group">
                           <h3>By Length</h3>
                           <ul>
                               <li><a href="/3-letter-words">3 Letter Words</a></li>
                               <li><a href="/4-letter-words">4 Letter Words</a></li>
                               <li><a href="/5-letter-words">5 Letter Words</a></li>
                               <li><a href="/6-letter-words">6 Letter Words</a></li>
                               <li><a href="/7-letter-words">7 Letter Words</a></li>
                           </ul>
                       </div>
                       <div class="related-group">
                           <h3>Other Starting Letters</h3>
                           <ul>
                               <li><a href="/${length}-letter-words-starting-with-a">${length} Words Starting A</a></li>
                               <li><a href="/${length}-letter-words-starting-with-b">${length} Words Starting B</a></li>
                               <li><a href="/${length}-letter-words-starting-with-c">${length} Words Starting C</a></li>
                               <li><a href="/${length}-letter-words-starting-with-s">${length} Words Starting S</a></li>
                               <li><a href="/${length}-letter-words-starting-with-t">${length} Words Starting T</a></li>
                           </ul>
                       </div>
                       <div class="related-group">
                           <h3>Ending With</h3>
                           <ul>
                               <li><a href="/${length}-letter-words-ending-with-s">${length} Words Ending S</a></li>
                               <li><a href="/${length}-letter-words-ending-with-e">${length} Words Ending E</a></li>
                               <li><a href="/${length}-letter-words-ending-with-d">${length} Words Ending D</a></li>
                               <li><a href="/${length}-letter-words-ending-with-r">${length} Words Ending R</a></li>
                               <li><a href="/${length}-letter-words-ending-with-t">${length} Words Ending T</a></li>
                           </ul>
                       </div>
                       <div class="related-group">
                           <h3>Game Specific</h3>
                           <ul>
                               <li><a href="/wordle-words">Wordle Word List</a></li>
                               <li><a href="/scrabble-${length}-letter-words">Scrabble ${length} Letter Words</a></li>
                               <li><a href="/crossword-${length}-letter-words">Crossword ${length} Letter Words</a></li>
                               <li><a href="/high-scoring-${length}-letter-words">High Scoring ${length} Letter Words</a></li>
                           </ul>
                       </div>
                   </div>
               </section>
   
               <!-- FAQ Section -->
               <section class="faq-section">
                   <h2>Frequently Asked Questions About ${length} Letter Words Starting with ${letter}</h2>
                   <div class="faq-grid">
                       <div class="faq-item">
                           <h3>How many ${length} letter words start with ${letter}?</h3>
                           <p>There are <strong>${words.length} ${length} letter words</strong> that start with "${letter}" in our database. These words are commonly used in word games like Wordle, Scrabble, and crosswords.</p>
                       </div>
                       <div class="faq-item">
                           <h3>What are the most common ${length} letter words starting with ${letter}?</h3>
                           <p>The most common ${length} letter words starting with ${letter} include: ${exampleWords}. These words appear frequently in everyday writing and word games.</p>
                       </div>
                       <div class="faq-item">
                           <h3>Can I use these words in Scrabble?</h3>
                           <p>Yes! All words listed here are valid in Scrabble and other word games. We show Scrabble point values to help you find high-scoring plays that start with ${letter}.</p>
                       </div>
                       <div class="faq-item">
                           <h3>Are ${letter} words good for Wordle?</h3>
                           <p>${length === 5 ? `Some ${length} letter words starting with ${letter} make good Wordle starting words. Look for words with common vowels and consonants for the best strategy.` : `These ${length} letter words aren't used in Wordle (which uses 5-letter words), but they're perfect for other word games and puzzles.`}</p>
                       </div>
                   </div>
               </section>
   
           </div>
       </main>
   
       <!-- Footer -->
       <footer class="site-footer" role="contentinfo">
           <div class="container">
               <div class="footer-content">
                   <div class="footer-section">
                       <h4 class="footer-title">Word Lists</h4>
                       <ul class="footer-links">
                           <li><a href="/3-letter-words">3 Letter Words</a></li>
                           <li><a href="/4-letter-words">4 Letter Words</a></li>
                           <li><a href="/5-letter-words">5 Letter Words</a></li>
                           <li><a href="/6-letter-words">6 Letter Words</a></li>
                           <li><a href="/7-letter-words">7 Letter Words</a></li>
                       </ul>
                   </div>
                   
                   <div class="footer-section">
                       <h4 class="footer-title">Game Tools</h4>
                       <ul class="footer-links">
                           <li><a href="/wordle-solver">Wordle Solver</a></li>
                           <li><a href="/scrabble-helper">Scrabble Helper</a></li>
                           <li><a href="/crossword-solver">Crossword Solver</a></li>
                           <li><a href="/anagram-solver">Anagram Solver</a></li>
                       </ul>
                   </div>
                   
                   <div class="footer-section">
                       <h4 class="footer-title">Resources</h4>
                       <ul class="footer-links">
                           <li><a href="/blog">Word Game Blog</a></li>
                           <li><a href="/word-game-tips">Tips & Strategies</a></li>
                           <li><a href="/about">About Us</a></li>
                           <li><a href="/contact">Contact</a></li>
                       </ul>
                   </div>
                   
                   <div class="footer-section">
                       <h4 class="footer-title">Legal</h4>
                       <ul class="footer-links">
                           <li><a href="/privacy">Privacy Policy</a></li>
                           <li><a href="/terms">Terms of Service</a></li>
                           <li><a href="/sitemap">Sitemap</a></li>
                       </ul>
                   </div>
               </div>
               
               <div class="footer-bottom">
                   <p>&copy; 2024 QuickWordFinder. Built for word game lovers, by word game lovers.</p>
                   <p class="footer-tagline">Find your perfect word in seconds ⚡</p>
               </div>
           </div>
       </footer>
   
       <!-- JavaScript -->
       <script src="/src/js/seo-pages.js"></script>
       <script>
           // Initialize page with specific data
           window.pageData = {
               length: ${length},
               startingLetter: '${letter}',
               wordCount: ${words.length},
               commonCount: ${commonWords.length},
               scrabbleCount: ${scrabbleWords.length}
           };
       </script>
   </body>
   </html>`;
   }
   
   /* Main Generation Function
      ========================================================================== */
   
   function generateAllPages() {
       console.log('🚀 Starting SEO page generation...');
       console.log(`📊 Database contains ${wordDatabase.length} words`);
       
       try {
           // Ensure output directories exist
           ensureDirectoryExists(config.outputDir);
           
           // Generate different types of pages
           generateLengthPages();
           generateStartingLetterPages();
           
           console.log('\n✨ SEO page generation completed successfully!');
           console.log('\n📋 Summary:');
           console.log('- Length-based pages: 6 pages (3-8 letters)');
           console.log('- Starting letter pages: ~100+ pages');
           console.log('- Total pages generated: 100+');
           
           console.log('\n📁 Files created in:');
           console.log(`- ${config.outputDir}/length/`);
           console.log(`- ${config.outputDir}/starting/`);
           console.log(`- ${config.outputDir}/ (root level copies)`);
           
       } catch (error) {
           console.error('❌ Error generating pages:', error.message);
           process.exit(1);
       }
   }
   
   /* Sitemap Generation
      ========================================================================== */
   
   function generateSitemap() {
       console.log('\n🗺️  Generating sitemap...');
       
       const urls = [];
       const currentDate = new Date().toISOString().split('T')[0];
       
       // Add main pages
       urls.push({
           url: `${config.baseUrl}/`,
           lastmod: currentDate,
           priority: '1.0'
       });
       
       // Add length-based pages
       for (let length = 3; length <= 8; length++) {
           urls.push({
               url: `${config.baseUrl}/${length}-letter-words`,
               lastmod: currentDate,
               priority: '0.8'
           });
       }
       
       // Create XML sitemap
       let sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
   `;
       
       urls.forEach(urlObj => {
           sitemapXml += `  <url>
       <loc>${urlObj.url}</loc>
       <lastmod>${urlObj.lastmod}</lastmod>
       <priority>${urlObj.priority}</priority>
     </url>
   `;
       });
       
       sitemapXml += `</urlset>`;
       
       // Write sitemap
       const sitemapPath = path.join(config.outputDir, 'sitemap.xml');
       writePageFile(sitemapPath, sitemapXml);
   }
   
   /* CLI Interface
      ========================================================================== */
   
   function showHelp() {
       console.log(`
   QuickWordFinder SEO Page Generator
   ==================================
   
   Usage: node seo-generator.js [command]
   
   Commands:
     generate    Generate all SEO pages
     length      Generate only length-based pages  
     starting    Generate only starting letter pages
     sitemap     Generate sitemap.xml
     help        Show this help message
   
   Examples:
     node seo-generator.js generate
     node seo-generator.js length
     node seo-generator.js sitemap
   `);
   }
   
   /* Main Entry Point
      ========================================================================== */
   
   function main() {
       const command = process.argv[2] || 'help';
       
       switch (command) {
           case 'generate':
               generateAllPages();
               generateSitemap();
               break;
               
           case 'length':
               ensureDirectoryExists(config.outputDir);
               generateLengthPages();
               break;
               
           case 'starting':
               ensureDirectoryExists(config.outputDir);
               generateStartingLetterPages();
               break;
               
           case 'sitemap':
               generateSitemap();
               break;
               
           case 'help':
           default:
               showHelp();
               break;
       }
   }
   
   // Run if called directly
   if (require.main === module) {
       main();
   }
   
   module.exports = {
       generateAllPages,
       generateLengthPages,
       generateStartingLetterPages,
       generateSitemap
   };