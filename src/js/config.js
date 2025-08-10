/* ==========================================================================
   QuickWordFinder - Configuration Management
   ========================================================================== */

/**
 * Application configuration
 * Handles environment variables and app settings
 */

const Config = {
    // Site Information
    site: {
        name: 'QuickWordFinder',
        url: 'https://quickwordfinder.com',
        description: 'Fast Word Finder for Wordle, Scrabble & Crosswords',
        version: '1.0.0'
    },

    // Environment Detection
    environment: {
        isDevelopment: window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1',
        isProduction: window.location.hostname === 'quickwordfinder.com',
        isVercelPreview: window.location.hostname.includes('vercel.app')
    },

    // Analytics Configuration (to be added later)
    analytics: {
        // Google Analytics will be added here
        // gaTrackingId: process.env.NEXT_PUBLIC_GA_TRACKING_ID || null,
        enabled: false // Will enable when ready
    },

    // API Configuration (for future features)
    api: {
        // Dictionary API settings
        // dictionaryApiKey: process.env.NEXT_PUBLIC_DICTIONARY_API_KEY || null,
        baseUrl: window.location.origin,
        timeout: 5000
    },

    // Feature Flags
    features: {
        enableAnalytics: false, // Enable when GA is set up
        enableSearch: true,
        enableWordleMode: true,
        enableScrabbleMode: true,
        enableCrosswordMode: true,
        enableBlog: false, // Enable when blog is ready
        enableUserAccounts: false, // Future feature
        enableOfflineMode: false // PWA feature
    },

    // Performance Settings
    performance: {
        searchDebounceTime: 300, // milliseconds
        maxSearchResults: 50,
        lazyLoadThreshold: 100 // pixels
    },

    // Social Media Links
    social: {
        twitter: null, // Will add when created
        facebook: null,
        instagram: null,
        github: 'https://github.com/julientrading/quickwordfinder'
    },

    // Contact Information
    contact: {
        email: null, // Will add when ready
        supportUrl: null
    },

    // Legal Pages
    legal: {
        privacyPolicy: '/privacy',
        termsOfService: '/terms',
        cookiePolicy: '/cookies'
    }
};

// Debug logging in development
if (Config.environment.isDevelopment) {
    console.log('🔧 QuickWordFinder Config:', Config);
    console.log('🌍 Environment:', {
        hostname: window.location.hostname,
        isDev: Config.environment.isDevelopment,
        isProd: Config.environment.isProduction,
        isPreview: Config.environment.isVercelPreview
    });
}

// Export for use in other modules
window.QuickWordFinderConfig = Config;

// Utility functions
Config.utils = {
    /**
     * Check if a feature is enabled
     * @param {string} featureName - Name of the feature
     * @returns {boolean}
     */
    isFeatureEnabled: function(featureName) {
        return Config.features[featureName] || false;
    },

    /**
     * Get the appropriate API URL
     * @param {string} endpoint - API endpoint
     * @returns {string}
     */
    getApiUrl: function(endpoint) {
        return `${Config.api.baseUrl}/api/${endpoint}`;
    },

    /**
     * Get environment-specific settings
     * @returns {object}
     */
    getEnvironment: function() {
        if (Config.environment.isDevelopment) return 'development';
        if (Config.environment.isProduction) return 'production';
        if (Config.environment.isVercelPreview) return 'preview';
        return 'unknown';
    }
};

// Environment-specific initialization
document.addEventListener('DOMContentLoaded', function() {
    // Add environment class to body for CSS targeting
    if (Config.environment.isDevelopment) {
        document.body.classList.add('env-development');
    } else if (Config.environment.isProduction) {
        document.body.classList.add('env-production');
    } else if (Config.environment.isVercelPreview) {
        document.body.classList.add('env-preview');
    }

    // Set up global error handling
    if (Config.environment.isProduction) {
        window.addEventListener('error', function(e) {
            // Log errors in production (will integrate with monitoring later)
            console.error('Production Error:', e.error);
        });
    }
});