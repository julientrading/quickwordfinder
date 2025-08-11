/* ==========================================================================
   QuickWordFinder - Main JavaScript with Unified Active States
   ========================================================================== */

   (function() {
    'use strict';
    
    /* Word Database (Expanded Sample)
       ========================================================================== */
    
    const wordDatabase = [
        // 3 letter words
        { word: 'CAT', length: 3, points: 5, common: true },
        { word: 'DOG', length: 3, points: 5, common: true },
        { word: 'RUN', length: 3, points: 3, common: true },
        { word: 'BAT', length: 3, points: 5, common: false },
        { word: 'RAT', length: 3, points: 3, common: true },
        { word: 'HAT', length: 3, points: 6, common: true },
        { word: 'MAT', length: 3, points: 5, common: false },
        { word: 'SAT', length: 3, points: 3, common: true },
        { word: 'FAT', length: 3, points: 6, common: false },
        { word: 'TAR', length: 3, points: 3, common: false },
        
        // 4 letter words
        { word: 'BIRD', length: 4, points: 7, common: true },
        { word: 'TREE', length: 4, points: 4, common: true },
        { word: 'STAR', length: 4, points: 4, common: true },
        { word: 'BEAR', length: 4, points: 6, common: false },
        { word: 'CARE', length: 4, points: 6, common: true },
        { word: 'RARE', length: 4, points: 4, common: false },
        { word: 'DARE', length: 4, points: 5, common: true },
        { word: 'FARE', length: 4, points: 7, common: false },
        { word: 'MARE', length: 4, points: 6, common: false },
        { word: 'BARE', length: 4, points: 6, common: false },
        
        // 5 letter words (Only BEST Wordle starters marked as wordle: true)
        { word: 'CRANE', length: 5, points: 7, common: true },
        { word: 'SLATE', length: 5, points: 5, common: true },
        { word: 'TRACE', length: 5, points: 7, common: false },
        { word: 'STARE', length: 5, points: 5, common: true },
        { word: 'AROSE', length: 5, points: 5, common: false },
        { word: 'TEARS', length: 5, points: 5, common: false },
        { word: 'STEAM', length: 5, points: 7, common: true },
        { word: 'STONE', length: 5, points: 5, common: true },
        { word: 'CRATE', length: 5, points: 7, common: true },
        { word: 'BRACE', length: 5, points: 9, common: false },
        { word: 'GRACE', length: 5, points: 8, common: true },
        { word: 'PLACE', length: 5, points: 9, common: true },
        { word: 'SPACE', length: 5, points: 9, common: true },
        { word: 'CHASE', length: 5, points: 10, common: true },
        { word: 'SHAPE', length: 5, points: 10, common: true },
        { word: 'SHADE', length: 5, points: 9, common: true },
        { word: 'SHARE', length: 5, points: 8, common: true },
        { word: 'SPARE', length: 5, points: 7, common: true },
        { word: 'SCARE', length: 5, points: 7, common: false },
        { word: 'SCORE', length: 5, points: 7, common: true },
        { word: 'SHORE', length: 5, points: 8, common: true },
        { word: 'SNORE', length: 5, points: 5, common: false },
        { word: 'STORE', length: 5, points: 5, common: true },
        { word: 'SWORE', length: 5, points: 8, common: false },
        { word: 'ADORE', length: 5, points: 6, common: true },
        
        // 6 letter words
        { word: 'FRIEND', length: 6, points: 10, common: true },
        { word: 'CASTLE', length: 6, points: 8, common: true },
        { word: 'GARDEN', length: 6, points: 8, common: true },
        { word: 'STREAM', length: 6, points: 8, common: false },
        { word: 'BRANCH', length: 6, points: 13, common: true },
        { word: 'CHANGE', length: 6, points: 12, common: true },
        { word: 'CHARGE', length: 6, points: 12, common: true },
        { word: 'CHANCE', length: 6, points: 13, common: true },
        { word: 'CHOICE', length: 6, points: 13, common: true },
        { word: 'CREATE', length: 6, points: 8, common: true },
        
        // 7 letter words
        { word: 'RAINBOW', length: 7, points: 12, common: true },
        { word: 'KITCHEN', length: 7, points: 16, common: true },
        { word: 'JOURNEY', length: 7, points: 17, common: false },
        { word: 'MACHINE', length: 7, points: 14, common: true },
        { word: 'PICTURE', length: 7, points: 13, common: true },
        { word: 'CHICKEN', length: 7, points: 18, common: true },
        { word: 'TEACHER', length: 7, points: 12, common: true },
        { word: 'BROTHER', length: 7, points: 12, common: true },
        { word: 'WEATHER', length: 7, points: 15, common: true },
        { word: 'ANOTHER', length: 7, points: 10, common: true },
    ];
    
    /* Global State Management
       ========================================================================== */
    
    let currentSort = 'common';
    let currentGameMode = 'default';
    let searchTimeout = null;
    let currentResults = [];
    let displayedResults = [];
    let resultsPerPage = 50;
    let currentDisplayCount = 0;
    
    /* DOM Elements Cache
       ========================================================================== */
    
    let DOM = {};
    
    function cacheDOMElements() {
        DOM = {
            // Search elements (may not exist in all modes)
            wordLength: document.getElementById('wordLength'),
            containingLetters: document.getElementById('containingLetters'),
            startingLetter: document.getElementById('startingLetter'),
            endingLetter: document.getElementById('endingLetter'),
            excludingLetters: document.getElementById('excludingLetters'),
            resetBtn: document.getElementById('resetBtn'),
            
            // Results elements (always exist)
            wordGrid: document.getElementById('wordGrid'),
            resultCount: document.getElementById('resultCount'),
            
            // Sort buttons (always exist)
            sortButtons: document.querySelectorAll('.sort-pill'),
            
            // Game mode buttons (always exist)
            modeButtons: document.querySelectorAll('.mode-button'),
            
            // Dynamic elements that change based on mode
            searchTitle: document.querySelector('.search-title'),
            searchSentence: document.querySelector('.search-sentence'),
            filterPills: document.querySelector('.filter-pills'),
            
            // For mobile menu (future use)
            mobileMenuToggle: document.querySelector('.mobile-menu-toggle'),
            mainNavigation: document.querySelector('.main-navigation')
        };
    }
    
    /* Input Parsing Utilities
       ========================================================================== */
    
    function parseLetterInput(input) {
        if (!input) return [];
        return input.toUpperCase()
                   .replace(/[^A-Z]/g, '')
                   .split('');
    }
    
    function parseWordleGreenInput(input) {
        if (!input) return [];
        
        const results = [];
        
        // Try continuous format: "1s2d3r"
        const continuousMatches = input.toUpperCase().match(/(\d[A-Z])/g);
        if (continuousMatches) {
            for (let match of continuousMatches) {
                const position = parseInt(match[0]);
                const letter = match[1];
                if (position >= 1 && position <= 5) {
                    results.push({ position: position - 1, letter: letter });
                }
            }
            return results;
        }
        
        // Fallback to separated format: "1s, 2d, 3r" or "1:s, 3:d"
        const parts = input.split(/[,\s]+/).filter(part => part.trim());
        
        for (let part of parts) {
            part = part.trim().toUpperCase();
            const match = part.match(/(\d+)[\:\-\s]*([A-Z])/);
            if (match) {
                const position = parseInt(match[1]);
                const letter = match[2];
                if (position >= 1 && position <= 5) {
                    results.push({ position: position - 1, letter: letter });
                }
            }
        }
        
        return results;
    }
    
    /* Unified Active State System - CORE FEATURE
       ========================================================================== */
    
    function updateFilterStates() {
        // Get all filter pill containers
        const filterPills = document.querySelectorAll('.filter-pill');
        
        filterPills.forEach(pill => {
            const input = pill.querySelector('.pill-input');
            if (!input) return;
            
            // Remove all existing active classes
            pill.classList.remove('active', 'wordle-green', 'wordle-yellow', 'wordle-gray');
            
            // Check if input has content
            const hasContent = input.value.trim() !== '';
            
            if (hasContent) {
                // Add active class
                pill.classList.add('active');
                
                // Add mode-specific classes for Wordle
                if (currentGameMode === 'wordle') {
                    // Identify the Wordle pill type by its input ID
                    if (input.id === 'greenLetters') {
                        pill.classList.add('wordle-green');
                    } else if (input.id === 'yellowLetters') {
                        pill.classList.add('wordle-yellow');
                    } else if (input.id === 'grayLetters') {
                        pill.classList.add('wordle-gray');
                    }
                }
            }
        });
    }
    
    /* Styled Help Box Component
       ========================================================================== */
    
    function createStyledHelpBox(icon, title, content, theme = 'blue') {
        const helpBox = document.createElement('div');
        helpBox.className = 'styled-help-box';
        
        const themes = {
            blue: { bg: '#f0f9ff', border: '#0ea5e9', titleColor: '#0369a1', contentColor: '#075985' },
            green: { bg: '#f0fdf4', border: '#22c55e', titleColor: '#166534', contentColor: '#15803d' },
            purple: { bg: '#faf5ff', border: '#a855f7', titleColor: '#7c2d12', contentColor: '#92400e' },
            orange: { bg: '#fff7ed', border: '#f97316', titleColor: '#9a3412', contentColor: '#c2410c' }
        };
        
        const colors = themes[theme] || themes.blue;
        
        helpBox.style.cssText = `
            grid-column: 1 / -1;
            text-align: center;
            padding: 24px;
            background: ${colors.bg};
            border-radius: 12px;
            margin-top: 15px;
            border-left: 4px solid ${colors.border};
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        `;
        
        helpBox.innerHTML = `
            <p style="color: ${colors.titleColor}; font-weight: 600; margin-bottom: 12px; font-size: 16px;">${icon} ${title}</p>
            <p style="color: ${colors.contentColor}; font-size: 14px; line-height: 1.5;">${content}</p>
        `;
        
        helpBox.setAttribute('aria-live', 'polite');
        return helpBox;
    }
    
    /* Search Algorithm with Auto-Detection
       ========================================================================== */
    
    function searchWords() {
        if (!DOM.wordLength) return; // Only run in default mode
        
        const length = parseInt(DOM.wordLength.value);
        const containing = DOM.containingLetters?.value.trim() || '';
        const starting = DOM.startingLetter?.value.trim() || '';
        const ending = DOM.endingLetter?.value.trim() || '';
        const excluding = DOM.excludingLetters?.value.trim() || '';
        
        const hasFilters = containing || starting || ending || excluding;
        
        if (!hasFilters) {
            showSmartEmptyState();
            return;
        }
        
        let results = wordDatabase.filter(item => {
            if (item.length !== length) return false;
            
            if (containing) {
                const letters = parseLetterInput(containing);
                for (let letter of letters) {
                    if (!item.word.includes(letter)) return false;
                }
            }
            
            if (starting) {
                const letters = parseLetterInput(starting);
                if (letters.length > 0 && !item.word.startsWith(letters[0])) return false;
            }
            
            if (ending) {
                const letters = parseLetterInput(ending);
                if (letters.length > 0 && !item.word.endsWith(letters[0])) return false;
            }
            
            if (excluding) {
                const excluded = parseLetterInput(excluding);
                for (let letter of excluded) {
                    if (item.word.includes(letter)) return false;
                }
            }
            
            return true;
        });
        
        results = sortWords(results, currentSort);
        displayWords(results);
        updateFilterStates(); // Update active states after search
    }
    
    /* Sorting Functions
       ========================================================================== */
    
    function sortWords(words, sortType) {
        switch(sortType) {
            case 'alpha':
                return [...words].sort((a, b) => a.word.localeCompare(b.word));
            case 'points':
                return [...words].sort((a, b) => b.points - a.points);
            case 'common':
            default:
                return [...words].sort((a, b) => {
                    if (a.common && !b.common) return -1;
                    if (!a.common && b.common) return 1;
                    return a.word.localeCompare(b.word);
                });
        }
    }
    
    /* Display Functions with Pagination
       ========================================================================== */
    
    function displayWords(words, append = false) {
        DOM.resultCount.textContent = words.length;
        currentResults = words;
        
        if (!append) {
            DOM.wordGrid.innerHTML = '';
            currentDisplayCount = 0;
            displayedResults = [];
        }
        
        if (words.length === 0) {
            showNoResultsFound();
            return;
        }
        
        const startIndex = currentDisplayCount;
        const endIndex = Math.min(startIndex + resultsPerPage, words.length);
        const wordsToShow = words.slice(startIndex, endIndex);
        
        displayedResults = displayedResults.concat(wordsToShow);
        currentDisplayCount = endIndex;
        
        const fragment = document.createDocumentFragment();
        
        wordsToShow.forEach((item, index) => {
            const card = createWordCard(item, startIndex + index);
            fragment.appendChild(card);
        });
        
        if (!append) {
            DOM.wordGrid.appendChild(fragment);
        } else {
            const existingLoadMore = DOM.wordGrid.querySelector('.load-more-container');
            if (existingLoadMore) {
                existingLoadMore.remove();
            }
            DOM.wordGrid.appendChild(fragment);
        }
        
        if (currentDisplayCount < words.length) {
            addLoadMoreButton();
        }
    }
    
    function showNoResultsFound() {
        let helpBox;
        
        switch(currentGameMode) {
            case 'wordle':
                helpBox = createStyledHelpBox(
                    '🤔',
                    'No Matches Found',
                    'No words match your Wordle clues. Try removing some constraints or double-check your green/yellow letters.',
                    'blue'
                );
                break;
                
            case 'scrabble':
                helpBox = createStyledHelpBox(
                    '🎯',
                    'No Words Possible',
                    'No words can be made with those tiles. Try adding more letters or using a blank tile (?).',
                    'green'
                );
                break;
                
            case 'crossword':
                helpBox = createStyledHelpBox(
                    '✏️',
                    'Pattern Not Found',
                    'No words match that pattern. Double-check your pattern or try fewer constraints.',
                    'purple'
                );
                break;
                
            case 'default':
            default:
                helpBox = createStyledHelpBox(
                    '🔍',
                    'No Results Found',
                    'No words match your filters. Try adjusting your criteria or using fewer constraints.',
                    'orange'
                );
        }
        
        helpBox.setAttribute('role', 'gridcell');
        helpBox.setAttribute('aria-colspan', '100');
        DOM.wordGrid.appendChild(helpBox);
    }
    
    function addLoadMoreButton() {
        const loadMoreContainer = document.createElement('div');
        loadMoreContainer.className = 'load-more-container';
        loadMoreContainer.setAttribute('role', 'gridcell');
        loadMoreContainer.setAttribute('aria-colspan', '100');
        loadMoreContainer.style.cssText = `
            grid-column: 1 / -1;
            text-align: center;
            padding: 20px;
            margin-top: 10px;
        `;
        
        const remainingCount = currentResults.length - currentDisplayCount;
        const nextBatchSize = Math.min(remainingCount, resultsPerPage);
        
        loadMoreContainer.innerHTML = `
            <button class="load-more-btn" style="
                background: #667eea;
                color: white;
                border: none;
                padding: 12px 24px;
                border-radius: 25px;
                font-size: 16px;
                font-weight: 600;
                cursor: pointer;
                transition: all 0.3s ease;
                box-shadow: 0 2px 8px rgba(102, 126, 234, 0.3);
            ">
                Load ${nextBatchSize} More Words (${remainingCount} remaining)
            </button>
        `;
        
        const loadMoreBtn = loadMoreContainer.querySelector('.load-more-btn');
        loadMoreBtn.addEventListener('click', loadMoreResults);
        loadMoreBtn.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
            this.style.boxShadow = '0 4px 15px rgba(102, 126, 234, 0.4)';
        });
        loadMoreBtn.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 2px 8px rgba(102, 126, 234, 0.3)';
        });
        
        DOM.wordGrid.appendChild(loadMoreContainer);
    }
    
    function loadMoreResults() {
        displayWords(currentResults, true);
    }
    
    function showSmartEmptyState() {
        DOM.wordGrid.innerHTML = '';
        
        let helpBox;
        
        switch(currentGameMode) {
            case 'wordle':
                helpBox = createStyledHelpBox(
                    '🟩',
                    'Wordle Helper',
                    'Enter your green, yellow, and gray letters above to find possible words that match your Wordle results!'
                );
                break;
                
            case 'scrabble':
                helpBox = createStyledHelpBox(
                    '🎯',
                    'Scrabble Strategy',
                    'Enter your available tiles above to find the highest-scoring words you can make. Use ? for blank tiles!',
                    'green'
                );
                break;
                
            case 'crossword':
                helpBox = createStyledHelpBox(
                    '✏️',
                    'Crossword Solver',
                    'Enter your pattern using ? for unknown letters (like ?R?S?) to find words that fit your crossword grid.',
                    'purple'
                );
                break;
                
            case 'default':
            default:
                helpBox = createStyledHelpBox(
                    '⚡',
                    'Quick Word Finder',
                    'Use the filters above to find exactly the words you need. Try typing letters in "containing" or choose a starting letter!',
                    'blue'
                );
        }
        
        DOM.wordGrid.appendChild(helpBox);
        DOM.resultCount.textContent = '0';
    }
    
    function createWordCard(item, index) {
        const card = document.createElement('div');
        card.className = 'word-card' + (item.common ? ' popular' : '');
        card.setAttribute('role', 'gridcell');
        card.setAttribute('tabindex', '0');
        card.setAttribute('aria-label', `${item.word}${currentGameMode === 'scrabble' ? `, ${item.points} points` : ''}${item.common ? ', popular word' : ''}`);
        
        card.addEventListener('click', () => selectWord(item.word));
        card.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                selectWord(item.word);
            }
        });
        
        const pointsDisplay = currentGameMode === 'scrabble' 
            ? `<span class="word-score">${item.points} pts</span>` 
            : '';
        
        card.innerHTML = `
            <span class="word">${item.word}</span>
            ${pointsDisplay}
            ${item.common ? '<span class="word-badge">Popular</span>' : ''}
        `;
        
        card.style.animationDelay = `${index * 0.05}s`;
        return card;
    }
    
    function selectWord(word) {
        copyToClipboard(word);
        
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
    
    /* Filter Management
       ========================================================================== */
    
    function resetAllFilters() {
        switch(currentGameMode) {
            case 'wordle':
                const greenInput = document.getElementById('greenLetters');
                const yellowInput = document.getElementById('yellowLetters');
                const grayInput = document.getElementById('grayLetters');
                
                if (greenInput) greenInput.value = '';
                if (yellowInput) yellowInput.value = '';
                if (grayInput) grayInput.value = '';
                
                if (DOM.wordLength) DOM.wordLength.value = '5';
                wordleSearch();
                break;
                
            case 'scrabble':
                const scrabbleLengthSelect = document.getElementById('scrabbleLength');
                const tilesInput = document.getElementById('scrabbleTiles');
                const startInput = document.getElementById('scrabbleStartLetter');
                const endInput = document.getElementById('scrabbleEndLetter');
                
                if (scrabbleLengthSelect) scrabbleLengthSelect.value = '0';
                if (tilesInput) tilesInput.value = '';
                if (startInput) startInput.value = '';
                if (endInput) endInput.value = '';
                
                scrabbleSearch();
                break;
                
            case 'crossword':
                const patternInput = document.getElementById('crosswordPattern');
                const clueInput = document.getElementById('clueHint');
                
                if (patternInput) patternInput.value = '';
                if (clueInput) clueInput.value = '';
                
                crosswordSearch();
                break;
                
            case 'default':
            default:
                if (DOM.containingLetters) DOM.containingLetters.value = '';
                if (DOM.startingLetter) DOM.startingLetter.value = '';
                if (DOM.endingLetter) DOM.endingLetter.value = '';
                if (DOM.excludingLetters) DOM.excludingLetters.value = '';
                if (DOM.wordLength) DOM.wordLength.value = '5';
                
                searchWords();
                break;
        }
        
        // Update filter states after reset
        updateFilterStates();
    }
    
    /* Game Mode Functions
       ========================================================================== */
    
    function switchToWordleMode() {
        currentGameMode = 'wordle';
        
        DOM.searchTitle.innerHTML = '🟩 Wordle Mode';
        DOM.searchSentence.innerHTML = 'Help me solve today\'s Wordle!';
        
        // Update filter pills with Wordle-specific semantic colors
        DOM.filterPills.innerHTML = `
            <div class="filter-pill" style="width: 100%;">
                <label class="pill-label" style="display: block;">
                    <span class="wordle-green-text">Green letters</span> (correct position):
                    <input type="text" class="pill-input" style="width: 200px;" placeholder="1s3d4e" id="greenLetters">
                    <small style="display: block; color: #718096; margin-top: 5px;">Format: 1s3d4e (or 1s, 3d, 4e)</small>
                </label>
            </div>
            <div class="filter-pill" style="width: 100%;">
                <label class="pill-label" style="display: block;">
                    <span class="wordle-yellow-text">Yellow letters</span> (wrong position):
                    <input type="text" class="pill-input" style="width: 200px;" placeholder="rat" id="yellowLetters">
                    <small style="display: block; color: #718096; margin-top: 5px;">Letters in the word but wrong position</small>
                </label>
            </div>
            <div class="filter-pill" style="width: 100%;">
                <label class="pill-label" style="display: block;">
                    <span class="wordle-gray-text">Gray letters</span> (not in word):
                    <input type="text" class="pill-input" style="width: 200px;" placeholder="xzq" id="grayLetters">
                    <small style="display: block; color: #718096; margin-top: 5px;">Letters not in the word at all</small>
                </label>
            </div>
        `;
        
        if (DOM.wordLength) DOM.wordLength.value = '5';
        
        setTimeout(() => {
            setupWordleListeners();
            showWordleStarters();
        }, 50);
    }
    
    function showWordleStarters() {
        const wordleStarters = [
            { word: 'CRANE', length: 5, points: 7, common: true },
            { word: 'SLATE', length: 5, points: 5, common: true },
            { word: 'STARE', length: 5, points: 5, common: true },
            { word: 'AROSE', length: 5, points: 5, common: true },
            { word: 'RAISE', length: 5, points: 5, common: true },
            { word: 'CARET', length: 5, points: 7, common: false },
            { word: 'TRACE', length: 5, points: 7, common: false },
            { word: 'ADORE', length: 5, points: 6, common: true },
            { word: 'ALIEN', length: 5, points: 5, common: true },
            { word: 'AUDIO', length: 5, points: 6, common: true },
            { word: 'STEAM', length: 5, points: 7, common: true },
            { word: 'STONE', length: 5, points: 5, common: true },
            { word: 'EARTH', length: 5, points: 8, common: true },
            { word: 'ROAST', length: 5, points: 5, common: true },
            { word: 'LEARN', length: 5, points: 5, common: true }
        ];
        
        DOM.resultCount.textContent = `${wordleStarters.length} starter words`;
        
        DOM.wordGrid.innerHTML = '';
        currentDisplayCount = 0;
        displayedResults = [];
        
        const fragment = document.createDocumentFragment();
        
        wordleStarters.forEach((item, index) => {
            const card = createWordCard(item, index);
            fragment.appendChild(card);
        });
        
        DOM.wordGrid.appendChild(fragment);
        
        const helpBox = createStyledHelpBox(
            '💡',
            'Pro Tip',
            'These are the best Wordle starter words based on letter frequency and vowel coverage. Once you enter your clues above, we\'ll find words that match your results!',
            'blue'
        );
        
        DOM.wordGrid.appendChild(helpBox);
    }
    
    function setupWordleListeners() {
        const greenInput = document.getElementById('greenLetters');
        const yellowInput = document.getElementById('yellowLetters');
        const grayInput = document.getElementById('grayLetters');
        
        [greenInput, yellowInput, grayInput].forEach(input => {
            if (input) {
                input.addEventListener('input', debounce(() => {
                    wordleSearch();
                    updateFilterStates(); // Update active states on input
                }, 300));
            }
        });
    }
    
    function wordleSearch() {
        const greenInput = document.getElementById('greenLetters');
        const yellowInput = document.getElementById('yellowLetters');
        const grayInput = document.getElementById('grayLetters');
        
        let results = wordDatabase.filter(item => {
            if (item.length !== 5) return false;
            
            if (greenInput && greenInput.value) {
                const greens = parseWordleGreenInput(greenInput.value);
                for (let green of greens) {
                    if (item.word[green.position] !== green.letter) return false;
                }
            }
            
            if (yellowInput && yellowInput.value) {
                const yellows = parseLetterInput(yellowInput.value);
                for (let letter of yellows) {
                    if (!item.word.includes(letter)) return false;
                }
            }
            
            if (grayInput && grayInput.value) {
                const grays = parseLetterInput(grayInput.value);
                for (let letter of grays) {
                    if (item.word.includes(letter)) return false;
                }
            }
            
            return true;
        });
        
        currentResults = sortWords(results, currentSort);
        displayWords(currentResults);
        updateFilterStates(); // Update active states after search
    }
    
    function switchToScrabbleMode() {
        currentGameMode = 'scrabble';
        
        DOM.searchTitle.innerHTML = '🎯 Scrabble Helper';
        DOM.searchSentence.innerHTML = `
            I need a 
            <select id="scrabbleLength" class="inline-select">
                <option value="0">any</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
            </select>
            letter word
        `;
        
        DOM.filterPills.innerHTML = `
            <div class="filter-pill" style="width: 100%;">
                <label class="pill-label" style="display: block;">
                    My Scrabble tiles:
                    <input type="text" class="pill-input" style="width: 200px;" placeholder="ranest?" id="scrabbleTiles" autofocus>
                    <small style="display: block; color: #718096; margin-top: 5px;">Use ? for blank tiles. Words will use only these letters.</small>
                </label>
            </div>
            <div class="filter-pill">
                <label for="scrabbleStart" class="pill-label">
                    starting with
                    <input type="text" class="pill-input single-letter" placeholder="s" maxlength="1" id="scrabbleStartLetter">
                </label>
            </div>
            <div class="filter-pill">
                <label for="scrabbleEnd" class="pill-label">
                    ending with
                    <input type="text" class="pill-input single-letter" placeholder="t" maxlength="1" id="scrabbleEndLetter">
                </label>
            </div>
        `;
        
        setTimeout(() => {
            setupScrabbleListeners();
            showSmartEmptyState();
            
            const tilesInput = document.getElementById('scrabbleTiles');
            if (tilesInput) {
                tilesInput.focus();
            }
        }, 50);
    }
    
    function setupScrabbleListeners() {
        const lengthSelect = document.getElementById('scrabbleLength');
        const tilesInput = document.getElementById('scrabbleTiles');
        const startInput = document.getElementById('scrabbleStartLetter');
        const endInput = document.getElementById('scrabbleEndLetter');
        
        [tilesInput, startInput, endInput].forEach(input => {
            if (input) {
                input.addEventListener('input', debounce(() => {
                    scrabbleSearch();
                    updateFilterStates(); // Update active states on input
                }, 300));
            }
        });
        
        if (lengthSelect) {
            lengthSelect.addEventListener('change', () => {
                scrabbleSearch();
                updateFilterStates(); // Update active states on change
            });
        }
    }
    
    function scrabbleSearch() {
        const lengthSelect = document.getElementById('scrabbleLength');
        const tilesInput = document.getElementById('scrabbleTiles');
        const startInput = document.getElementById('scrabbleStartLetter');
        const endInput = document.getElementById('scrabbleEndLetter');
        
        const desiredLength = lengthSelect ? parseInt(lengthSelect.value) : 0;
        const tiles = tilesInput ? parseLetterInput(tilesInput.value + '?'.repeat((tilesInput.value.match(/\?/g) || []).length)) : [];
        const startLetter = startInput ? parseLetterInput(startInput.value)[0] : '';
        const endLetter = endInput ? parseLetterInput(endInput.value)[0] : '';
        
        let results = wordDatabase.filter(item => {
            if (desiredLength > 0 && item.length !== desiredLength) return false;
            
            if (tiles.length > 0) {
                const tileCopy = [...tiles];
                for (let letter of item.word) {
                    const index = tileCopy.indexOf(letter);
                    if (index === -1) {
                        const blankIndex = tileCopy.indexOf('?');
                        if (blankIndex === -1) return false;
                        tileCopy.splice(blankIndex, 1);
                    } else {
                        tileCopy.splice(index, 1);
                    }
                }
            }
            
            if (startLetter && !item.word.startsWith(startLetter)) return false;
            if (endLetter && !item.word.endsWith(endLetter)) return false;
            
            return true;
        });
        
        results = results.sort((a, b) => b.points - a.points);
        currentResults = results;
        displayWords(results);
        updateFilterStates(); // Update active states after search
    }
    
    function switchToCrosswordMode() {
        currentGameMode = 'crossword';
        
        DOM.searchTitle.innerHTML = '✏️ Crossword Solver';
        DOM.searchSentence.innerHTML = 'Enter your crossword pattern:';
        
        DOM.filterPills.innerHTML = `
            <div class="filter-pill" style="width: 100%;">
                <label class="pill-label" style="display: block;">
                    Pattern (use ? for unknown letters):
                    <input type="text" class="pill-input" style="width: 300px; font-family: monospace; font-size: 18px; letter-spacing: 3px;" placeholder="?r?s?" id="crosswordPattern" autofocus>
                    <small style="display: block; color: #718096; margin-top: 5px;">Example: ?r?s? finds BRASS, CROSS, DRESS, etc.</small>
                </label>
            </div>
            <div class="filter-pill" style="width: 100%;">
                <label class="pill-label" style="display: block;">
                    Clue keyword (optional):
                    <input type="text" class="pill-input" style="width: 200px;" placeholder="e.g., 'clothing' for DRESS" id="clueHint">
                    <small style="display: block; color: #718096; margin-top: 5px;">Coming soon: AI-powered clue matching!</small>
                </label>
            </div>
        `;
        
        setTimeout(() => {
            setupCrosswordListeners();
            showSmartEmptyState();
            
            const patternInput = document.getElementById('crosswordPattern');
            if (patternInput) {
                patternInput.focus();
            }
        }, 50);
    }
    
    function setupCrosswordListeners() {
        const patternInput = document.getElementById('crosswordPattern');
        const clueInput = document.getElementById('clueHint');
        
        if (patternInput) {
            patternInput.addEventListener('input', debounce(() => {
                crosswordSearch();
                updateFilterStates(); // Update active states on input
            }, 300));
        }
        
        if (clueInput) {
            clueInput.addEventListener('input', debounce(() => {
                crosswordSearch();
                updateFilterStates(); // Update active states on input
            }, 500));
        }
    }
    
    function crosswordSearch() {
        const patternInput = document.getElementById('crosswordPattern');
        const pattern = patternInput ? patternInput.value.toUpperCase() : '';
        
        if (!pattern) {
            displayWords([]);
            updateFilterStates(); // Update active states even for empty results
            return;
        }
        
        const length = pattern.length;
        
        let results = wordDatabase.filter(item => {
            if (item.length !== length) return false;
            
            for (let i = 0; i < pattern.length; i++) {
                if (pattern[i] !== '?' && pattern[i] !== item.word[i]) {
                    return false;
                }
            }
            return true;
        });
        
        results = results.sort((a, b) => a.word.localeCompare(b.word));
        currentResults = results;
        displayWords(results);
        updateFilterStates(); // Update active states after search
    }
    
    function resetToDefaultMode() {
        currentGameMode = 'default';
        
        document.querySelectorAll('.mode-button').forEach(btn => btn.classList.remove('active'));
        const defaultBtn = document.querySelector('.default-mode');
        if (defaultBtn) defaultBtn.classList.add('active');
        
        DOM.searchTitle.innerHTML = 'Quick Word Finder ⚡';
        DOM.searchSentence.innerHTML = `
            I need a 
            <select id="wordLength" class="inline-select" aria-label="Word length">
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5" selected>5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
            </select>
            letter word
        `;
        
        DOM.filterPills.innerHTML = `
            <div class="filter-pill">
                <label for="containingLetters" class="pill-label">
                    containing
                    <input type="text" id="containingLetters" class="pill-input" placeholder="rat" maxlength="15" aria-label="Letters to contain">
                </label>
            </div>
            <div class="filter-pill">
                <label for="startingLetter" class="pill-label">
                    starting with
                    <input type="text" id="startingLetter" class="pill-input single-letter" placeholder="s" maxlength="1" aria-label="Starting letter">
                </label>
            </div>
            <div class="filter-pill">
                <label for="endingLetter" class="pill-label">
                    ending with
                    <input type="text" id="endingLetter" class="pill-input single-letter" placeholder="t" maxlength="1" aria-label="Ending letter">
                </label>
            </div>
            <div class="filter-pill">
                <label for="excludingLetters" class="pill-label">
                    avoiding
                    <input type="text" id="excludingLetters" class="pill-input" placeholder="xz" maxlength="15" aria-label="Letters to exclude">
                </label>
            </div>
        `;
        
        setTimeout(() => {
            cacheDOMElements();
            setupEventListeners();
            showSmartEmptyState();
        }, 50);
    }
    
    /* Utility Functions
       ========================================================================== */
    
    function debounce(func, wait) {
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(searchTimeout);
                func(...args);
            };
            clearTimeout(searchTimeout);
            searchTimeout = setTimeout(later, wait);
        };
    }
    
    /* Event Listeners Setup
       ========================================================================== */
    
    function setupEventListeners() {
        // Search input listeners (with unified active state updates)
        if (DOM.wordLength) {
            DOM.wordLength.addEventListener('change', () => {
                searchWords();
                updateFilterStates();
            });
        }
        
        const searchInputs = [
            DOM.containingLetters,
            DOM.startingLetter,
            DOM.endingLetter,
            DOM.excludingLetters
        ].filter(input => input !== null);
        
        searchInputs.forEach(input => {
            input.addEventListener('input', debounce(() => {
                searchWords();
                updateFilterStates(); // Update active states on every input
            }, 300));
            
            input.addEventListener('focus', updateFilterStates);
            input.addEventListener('blur', updateFilterStates);
        });
        
        // Reset button
        const resetBtn = document.getElementById('resetBtn');
        if (resetBtn) {
            resetBtn.removeEventListener('click', resetAllFilters);
            resetBtn.addEventListener('click', resetAllFilters);
        }
        
        // Sort buttons
        DOM.sortButtons.forEach(button => {
            button.addEventListener('click', function() {
                DOM.sortButtons.forEach(btn => {
                    btn.classList.remove('active');
                    btn.setAttribute('aria-pressed', 'false');
                });
                this.classList.add('active');
                this.setAttribute('aria-pressed', 'true');
                
                currentSort = this.dataset.sort;
                
                if (currentResults.length > 0) {
                    const sortedResults = sortWords(currentResults, currentSort);
                    displayWords(sortedResults);
                }
            });
        });
        
        // Game mode buttons
        DOM.modeButtons.forEach(button => {
            button.addEventListener('click', function() {
                DOM.modeButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');
                
                const mode = this.dataset.mode;
                switch(mode) {
                    case 'wordle':
                        switchToWordleMode();
                        break;
                    case 'scrabble':
                        switchToScrabbleMode();
                        break;
                    case 'crossword':
                        switchToCrosswordMode();
                        break;
                    case 'default':
                    default:
                        resetToDefaultMode();
                }
            });
        });
        
        // Keyboard shortcuts
        document.addEventListener('keydown', function(e) {
            if ((e.ctrlKey || e.metaKey) && e.key === 'r') {
                e.preventDefault();
                resetAllFilters();
            }
            
            if ((e.ctrlKey || e.metaKey) && e.key === 'f') {
                e.preventDefault();
                if (DOM.containingLetters) {
                    DOM.containingLetters.focus();
                }
            }
        });
    }
    
    /* Initialization
       ========================================================================== */
    
    function initialize() {
        cacheDOMElements();
        setupEventListeners();
        
        currentGameMode = 'default';
        
        document.querySelectorAll('.mode-button').forEach(btn => btn.classList.remove('active'));
        const defaultBtn = document.querySelector('.default-mode');
        if (defaultBtn) {
            defaultBtn.classList.add('active');
        }
        
        showSmartEmptyState();
        document.body.classList.add('js-loaded');
        
        console.log('QuickWordFinder initialized with unified active states!');
    }
    
    /* Public API
       ========================================================================== */
    
    window.QuickWordFinder = {
        search: searchWords,
        reset: resetAllFilters,
        switchMode: function(mode) {
            const button = document.querySelector(`[data-mode="${mode}"]`);
            if (button) button.click();
        },
        getResults: () => currentResults,
        getCurrentMode: () => currentGameMode,
        updateFilterStates: updateFilterStates // Expose for debugging
    };
    
    window.resetAllFilters = resetAllFilters;
    
    /* Start the application
       ========================================================================== */
    
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initialize);
    } else {
        initialize();
    }
    
})();