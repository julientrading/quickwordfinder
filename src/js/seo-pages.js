/* ==========================================================================
   SEO Pages JavaScript - QuickWordFinder
   ========================================================================== */

   (function() {
    'use strict';
    
    /* Extended Word Database for SEO Pages
       ========================================================================== */
    
    const extendedWordDatabase = [
        // 3 letter words
        { word: 'CAT', length: 3, points: 5, common: true, wordle: false, definition: 'Small domestic mammal' },
        { word: 'DOG', length: 3, points: 5, common: true, wordle: false, definition: 'Domestic animal companion' },
        { word: 'RUN', length: 3, points: 3, common: true, wordle: false, definition: 'Move quickly on foot' },
        { word: 'BAT', length: 3, points: 5, common: false, wordle: false, definition: 'Flying mammal or sports equipment' },
        { word: 'RAT', length: 3, points: 3, common: true, wordle: false, definition: 'Small rodent' },
        { word: 'HAT', length: 3, points: 6, common: true, wordle: false, definition: 'Head covering' },
        { word: 'MAT', length: 3, points: 5, common: false, wordle: false, definition: 'Floor covering' },
        { word: 'SAT', length: 3, points: 3, common: true, wordle: false, definition: 'Past tense of sit' },
        { word: 'FAT', length: 3, points: 6, common: false, wordle: false, definition: 'Containing much fat' },
        { word: 'TAR', length: 3, points: 3, common: false, wordle: false, definition: 'Dark sticky substance' },
        { word: 'CAR', length: 3, points: 5, common: true, wordle: false, definition: 'Motor vehicle' },
        { word: 'BAR', length: 3, points: 5, common: true, wordle: false, definition: 'Long rigid piece' },
        { word: 'JAR', length: 3, points: 10, common: true, wordle: false, definition: 'Container with lid' },
        { word: 'WAR', length: 3, points: 6, common: true, wordle: false, definition: 'State of conflict' },
        { word: 'EAR', length: 3, points: 3, common: true, wordle: false, definition: 'Organ of hearing' },
        
        // 4 letter words
        { word: 'BIRD', length: 4, points: 7, common: true, wordle: false, definition: 'Flying animal' },
        { word: 'TREE', length: 4, points: 4, common: true, wordle: false, definition: 'Large woody plant' },
        { word: 'STAR', length: 4, points: 4, common: true, wordle: false, definition: 'Celestial body' },
        { word: 'BEAR', length: 4, points: 6, common: false, wordle: false, definition: 'Large mammal' },
        { word: 'CARE', length: 4, points: 6, common: true, wordle: false, definition: 'Feel concern' },
        { word: 'RARE', length: 4, points: 4, common: false, wordle: false, definition: 'Uncommon' },
        { word: 'DARE', length: 4, points: 5, common: true, wordle: false, definition: 'Challenge to do' },
        { word: 'FARE', length: 4, points: 7, common: false, wordle: false, definition: 'Price of travel' },
        { word: 'MARE', length: 4, points: 6, common: false, wordle: false, definition: 'Female horse' },
        { word: 'BARE', length: 4, points: 6, common: false, wordle: false, definition: 'Uncovered' },
        { word: 'TAPE', length: 4, points: 6, common: true, wordle: false, definition: 'Adhesive strip' },
        { word: 'CAKE', length: 4, points: 10, common: true, wordle: false, definition: 'Sweet baked good' },
        { word: 'LAKE', length: 4, points: 8, common: true, wordle: false, definition: 'Body of water' },
        { word: 'MAKE', length: 4, points: 10, common: true, wordle: false, definition: 'Create or produce' },
        { word: 'TAKE', length: 4, points: 8, common: true, wordle: false, definition: 'Get hold of' },
        
        // 5 letter words (Only BEST Wordle starters marked as wordle: true)
        { word: 'CRANE', length: 5, points: 7, common: true, wordle: true, definition: 'Large wading bird' },
        { word: 'SLATE', length: 5, points: 5, common: true, wordle: true, definition: 'Rock used for roofing' },
        { word: 'TRACE', length: 5, points: 7, common: false, wordle: true, definition: 'Find or discover' },
        { word: 'STARE', length: 5, points: 5, common: true, wordle: true, definition: 'Look fixedly' },
        { word: 'AROSE', length: 5, points: 5, common: false, wordle: true, definition: 'Past tense of arise' },
        { word: 'TEARS', length: 5, points: 5, common: false, wordle: false, definition: 'Drops from eyes' },
        { word: 'STEAM', length: 5, points: 7, common: true, wordle: false, definition: 'Water vapor' },
        { word: 'STONE', length: 5, points: 5, common: true, wordle: false, definition: 'Hard mineral matter' },
        { word: 'CRATE', length: 5, points: 7, common: true, wordle: false, definition: 'Wooden container' },
        { word: 'BRACE', length: 5, points: 9, common: false, wordle: false, definition: 'Support or strengthen' },
        { word: 'GRACE', length: 5, points: 8, common: true, wordle: false, definition: 'Elegant movement' },
        { word: 'PLACE', length: 5, points: 9, common: true, wordle: false, definition: 'Location or position' },
        { word: 'SPACE', length: 5, points: 9, common: true, wordle: false, definition: 'Empty area' },
        { word: 'CHASE', length: 5, points: 10, common: true, wordle: false, definition: 'Pursue rapidly' },
        { word: 'SHAPE', length: 5, points: 10, common: true, wordle: false, definition: 'External form' },
        { word: 'SHADE', length: 5, points: 9, common: true, wordle: false, definition: 'Partial darkness' },
        { word: 'SHARE', length: 5, points: 8, common: true, wordle: false, definition: 'Give portion to others' },
        { word: 'SPARE', length: 5, points: 7, common: true, wordle: false, definition: 'Extra or additional' },
        { word: 'SCARE', length: 5, points: 7, common: false, wordle: false, definition: 'Frighten someone' },
        { word: 'SCORE', length: 5, points: 7, common: true, wordle: false, definition: 'Number of points' },
        { word: 'SHORE', length: 5, points: 8, common: true, wordle: false, definition: 'Land along water' },
        { word: 'SNORE', length: 5, points: 5, common: false, wordle: false, definition: 'Breathing sound while sleeping' },
        { word: 'STORE', length: 5, points: 5, common: true, wordle: false, definition: 'Retail establishment' },
        { word: 'SWORE', length: 5, points: 8, common: false, wordle: false, definition: 'Past tense of swear' },
        { word: 'ADORE', length: 5, points: 6, common: true, wordle: false, definition: 'Love deeply' },
        
        // 6 letter words
        { word: 'FRIEND', length: 6, points: 10, common: true, wordle: false, definition: 'Close companion' },
        { word: 'CASTLE', length: 6, points: 8, common: true, wordle: false, definition: 'Fortified building' },
        { word: 'GARDEN', length: 6, points: 8, common: true, wordle: false, definition: 'Cultivated outdoor space' },
        { word: 'STREAM', length: 6, points: 8, common: false, wordle: false, definition: 'Small river' },
        { word: 'BRANCH', length: 6, points: 13, common: true, wordle: false, definition: 'Part of tree' },
        { word: 'CHANGE', length: 6, points: 12, common: true, wordle: false, definition: 'Make different' },
        { word: 'CHARGE', length: 6, points: 12, common: true, wordle: false, definition: 'Ask payment' },
        { word: 'CHANCE', length: 6, points: 13, common: true, wordle: false, definition: 'Possibility' },
        { word: 'CHOICE', length: 6, points: 13, common: true, wordle: false, definition: 'Act of choosing' },
        { word: 'CREATE', length: 6, points: 8, common: true, wordle: false, definition: 'Bring into existence' },
        
        // 7 letter words
        { word: 'RAINBOW', length: 7, points: 12, common: true, wordle: false, definition: 'Colorful arc in sky' },
        { word: 'KITCHEN', length: 7, points: 16, common: true, wordle: false, definition: 'Room for cooking' },
        { word: 'JOURNEY', length: 7, points: 17, common: false, wordle: false, definition: 'Trip or travel' },
        { word: 'MACHINE', length: 7, points: 14, common: true, wordle: false, definition: 'Mechanical device' },
        { word: 'PICTURE', length: 7, points: 13, common: true, wordle: false, definition: 'Visual image' },
        { word: 'CHICKEN', length: 7, points: 18, common: true, wordle: false, definition: 'Domestic fowl' },
        { word: 'TEACHER', length: 7, points: 12, common: true, wordle: false, definition: 'Educational instructor' },
        { word: 'BROTHER', length: 7, points: 12, common: true, wordle: false, definition: 'Male sibling' },
        { word: 'WEATHER', length: 7, points: 15, common: true, wordle: false, definition: 'Atmospheric conditions' },
        { word: 'ANOTHER', length: 7, points: 10, common: true, wordle: false, definition: 'One more' },
        
        // 8 letter words
        { word: 'COMPUTER', length: 8, points: 14, common: true, wordle: false, definition: 'Electronic device' },
        { word: 'BIRTHDAY', length: 8, points: 16, common: true, wordle: false, definition: 'Anniversary of birth' },
        { word: 'SANDWICH', length: 8, points: 16, common: true, wordle: false, definition: 'Food between bread' },
        { word: 'ELEPHANT', length: 8, points: 13, common: true, wordle: false, definition: 'Large mammal' },
        { word: 'SWIMMING', length: 8, points: 16, common: true, wordle: false, definition: 'Moving through water' },
    ];
    
    /* Global State
       ========================================================================== */
    
    let currentWords = [];
    let filteredWords = [];
    let displayedWords = [];
    let currentPage = 0;
    let wordsPerPage = 50;
    let currentFilter = 'all';
    let currentSort = 'alpha';
    let searchTerm = '';
    
    /* DOM Elements Cache
       ========================================================================== */
    
    let DOM = {};
    
    function cacheDOMElements() {
        DOM = {
            wordGrid: document.getElementById('wordGrid'),
            wordSearch: document.getElementById('wordSearch'),
            loadMoreBtn: document.getElementById('loadMoreBtn'),
            loadMoreSection: document.getElementById('loadMoreSection'),
            remainingCount: document.getElementById('remainingCount'),
            sortSelect: document.getElementById('sortSelect'),
            filterButtons: document.querySelectorAll('.filter-btn')
        };
    }
    
    /* Word Filtering and Sorting
       ========================================================================== */
    
    function filterWords(words, filter, searchTerm = '') {
        let filtered = words.filter(word => {
            // Search term filter
            if (searchTerm && !word.word.toLowerCase().includes(searchTerm.toLowerCase())) {
                return false;
            }
            
            // Category filter
            switch(filter) {
                case 'common':
                    return word.common;
                case 'wordle':
                    return word.wordle;
                case 'scrabble':
                    return word.points > 7; // High scoring words
                case 'all':
                default:
                    return true;
            }
        });
        
        return filtered;
    }
    
    function sortWords(words, sortType) {
        switch(sortType) {
            case 'alpha':
                return [...words].sort((a, b) => a.word.localeCompare(b.word));
            case 'points':
                return [...words].sort((a, b) => b.points - a.points);
            case 'common':
                return [...words].sort((a, b) => {
                    if (a.common && !b.common) return -1;
                    if (!a.common && b.common) return 1;
                    return a.word.localeCompare(b.word);
                });
            case 'wordle':
                return [...words].sort((a, b) => {
                    if (a.wordle && !b.wordle) return -1;
                    if (!a.wordle && b.wordle) return 1;
                    return a.word.localeCompare(b.word);
                });
            default:
                return words;
        }
    }
    
    /* Word Display Functions
       ========================================================================== */
    
    function createWordCard(word, index) {
        const card = document.createElement('div');
        card.className = 'word-card';
        
        // Add special classes
        if (word.common) card.classList.add('popular');
        if (word.wordle) card.classList.add('wordle');
        if (word.points > 10) card.classList.add('scrabble');
        
        card.setAttribute('role', 'gridcell');
        card.setAttribute('tabindex', '0');
        card.setAttribute('aria-label', `${word.word}, ${word.points} points, ${word.definition}`);
        
        // Create badges
        let badges = '';
        if (word.common) badges += '<span class="word-badge">Popular</span>';
        if (word.wordle) badges += '<span class="word-badge">Wordle</span>';
        
        card.innerHTML = `
            <span class="word">${word.word}</span>
            <span class="word-score">${word.points} pts</span>
            <span class="word-definition">${word.definition}</span>
            ${badges}
        `;
        
        // Add click functionality
        card.addEventListener('click', () => selectWord(word.word));
        card.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                selectWord(word.word);
            }
        });
        
        // Add animation delay
        card.style.animationDelay = `${(index % 20) * 0.05}s`;
        return card;
    }
    
    function displayWords(append = false) {
        if (!append) {
            DOM.wordGrid.innerHTML = '';
            displayedWords = [];
            currentPage = 0;
        }
        
        const startIndex = currentPage * wordsPerPage;
        const endIndex = Math.min(startIndex + wordsPerPage, filteredWords.length);
        const wordsToShow = filteredWords.slice(startIndex, endIndex);
        
        if (wordsToShow.length === 0 && !append) {
            showNoResults();
            return;
        }
        
        const fragment = document.createDocumentFragment();
        
        wordsToShow.forEach((word, index) => {
            const card = createWordCard(word, displayedWords.length + index);
            fragment.appendChild(card);
        });
        
        DOM.wordGrid.appendChild(fragment);
        displayedWords = displayedWords.concat(wordsToShow);
        currentPage++;
        
        updateLoadMoreButton();
    }
    
    function showNoResults() {
        DOM.wordGrid.innerHTML = `
            <div class="loading-message">
                <p>🔍 No words found matching your criteria</p>
                <p>Try adjusting your search or filters</p>
            </div>
        `;
        updateLoadMoreButton();
    }
    
    function updateLoadMoreButton() {
        const totalDisplayed = displayedWords.length;
        const remaining = filteredWords.length - totalDisplayed;
        
        if (remaining > 0) {
            DOM.loadMoreSection.style.display = 'block';
            DOM.remainingCount.textContent = remaining;
        } else {
            DOM.loadMoreSection.style.display = 'none';
        }
    }
    
    /* Event Handlers
       ========================================================================== */
    
    function handleSearch() {
        searchTerm = DOM.wordSearch.value.trim();
        applyFiltersAndSort();
    }
    
    function handleFilterChange(filter) {
        currentFilter = filter;
        
        // Update button states
        DOM.filterButtons.forEach(btn => {
            btn.classList.remove('active');
            if (btn.dataset.filter === filter) {
                btn.classList.add('active');
            }
        });
        
        applyFiltersAndSort();
    }
    
    function handleSortChange() {
        currentSort = DOM.sortSelect.value;
        applyFiltersAndSort();
    }
    
    function handleLoadMore() {
        displayWords(true);
    }
    
    function applyFiltersAndSort() {
        filteredWords = filterWords(currentWords, currentFilter, searchTerm);
        filteredWords = sortWords(filteredWords, currentSort);
        displayWords(false);
    }
    
    function selectWord(word) {
        copyToClipboard(word);
        
        // Visual feedback
        const selectedCards = document.querySelectorAll('.word-card.selected');
        selectedCards.forEach(card => card.classList.remove('selected'));
        
        event.target.closest('.word-card').classList.add('selected');
        showCopyFeedback(word);
    }
    
    function copyToClipboard(text) {
        if (navigator.clipboard && window.isSecureContext) {
            navigator.clipboard.writeText(text).catch(err => {
                console.log('Clipboard copy failed:', err);
                fallbackCopyTextToClipboard(text);
            });
        } else {
            fallbackCopyTextToClipboard(text);
        }
    }
    
    function fallbackCopyTextToClipboard(text) {
        const textArea = document.createElement("textarea");
        textArea.value = text;
        textArea.style.top = "0";
        textArea.style.left = "0";
        textArea.style.position = "fixed";
        
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        
        try {
            document.execCommand('copy');
        } catch (err) {
            console.log('Fallback copy failed:', err);
        }
        
        document.body.removeChild(textArea);
    }
    
    function showCopyFeedback(word) {
        const feedback = document.createElement('div');
        feedback.className = 'copy-feedback';
        feedback.textContent = `"${word}" copied!`;
        feedback.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #48bb78;
            color: white;
            padding: 12px 20px;
            border-radius: 8px;
            font-weight: 600;
            z-index: 1000;
            animation: slideInRight 0.3s ease-out;
        `;
        
        document.body.appendChild(feedback);
        
        setTimeout(() => {
            feedback.style.animation = 'slideOutRight 0.3s ease-out';
            setTimeout(() => {
                if (feedback.parentNode) {
                    document.body.removeChild(feedback);
                }
            }, 300);
        }, 2000);
    }
    
    /* Utility Functions
       ========================================================================== */
    
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
    
    /* Initialize Page
       ========================================================================== */
    
    function initializePage() {
        // Get page data from global variable set in HTML
        const pageData = window.pageData || { length: 5 };
        const targetLength = pageData.length;
        const startingLetter = pageData.startingLetter;
        
        // Filter words for this page's requirements
        currentWords = extendedWordDatabase.filter(word => {
            // Always filter by length
            if (word.length !== targetLength) return false;
            
            // If starting letter is specified, filter by that too
            if (startingLetter && !word.word.startsWith(startingLetter)) return false;
            
            return true;
        });
        
        // If no words found, show message
        if (currentWords.length === 0) {
            const pageDescription = startingLetter 
                ? `${targetLength} letter words starting with ${startingLetter}`
                : `${targetLength} letter words`;
                
            DOM.wordGrid.innerHTML = `
                <div class="loading-message">
                    <p>📚 Loading ${pageDescription}...</p>
                    <p>Building word database...</p>
                </div>
            `;
            return;
        }
        
        // Apply initial filters and display
        applyFiltersAndSort();
        
        const pageDescription = startingLetter 
            ? `${currentWords.length} words of length ${targetLength} starting with ${startingLetter}`
            : `${currentWords.length} words of length ${targetLength}`;
            
        console.log(`SEO Page initialized: ${pageDescription}`);
    }
    
    function setupEventListeners() {
        // Search input
        if (DOM.wordSearch) {
            DOM.wordSearch.addEventListener('input', debounce(handleSearch, 300));
        }
        
        // Filter buttons
        DOM.filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                handleFilterChange(this.dataset.filter);
            });
        });
        
        // Sort select
        if (DOM.sortSelect) {
            DOM.sortSelect.addEventListener('change', handleSortChange);
        }
        
        // Load more button
        if (DOM.loadMoreBtn) {
            DOM.loadMoreBtn.addEventListener('click', handleLoadMore);
        }
        
        // Keyboard shortcuts
        document.addEventListener('keydown', function(e) {
            if ((e.ctrlKey || e.metaKey) && e.key === 'f') {
                e.preventDefault();
                if (DOM.wordSearch) {
                    DOM.wordSearch.focus();
                }
            }
        });
    }
    
    /* Public API
       ========================================================================== */
    
    window.SEOPageManager = {
        init: initializePage,
        getWords: () => currentWords,
        getFiltered: () => filteredWords,
        search: handleSearch,
        filter: handleFilterChange,
        sort: handleSortChange
    };
    
    /* Initialize on DOM Ready
       ========================================================================== */
    
    function initialize() {
        cacheDOMElements();
        setupEventListeners();
        initializePage();
        
        // Mark page as loaded
        document.body.classList.add('seo-page-loaded');
    }
    
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initialize);
    } else {
        initialize();
    }
    
})();