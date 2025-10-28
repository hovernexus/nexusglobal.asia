// nexus-ga4-oauth.js - Final Configuration

// OAuth 2.0 Credentials
// NOTE: CLIENT_SECRET is included here for static site functionality. 
// For enhanced security, consider moving to a server-side solution (e.g., Google Cloud Functions).
const CLIENT_ID = '555018121451-3k5vnr9bdku0tldcre76jt66c2ja5l3k.apps.googleusercontent.com';
const CLIENT_SECRET = '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';
const REDIRECT_URI = 'https://nexusglobal.asia/ga4-callback.html';

// Google API Scopes (Permissions)
const SCOPE = 'https://www.googleapis.com/auth/analytics.readonly';

/**
 * Initiates the Google OAuth 2.0 authorization flow.
 */
function initiateOAuthFlow() {
    const authUrl = 'https://accounts.google.com/o/oauth2/v2/auth?' +
        'client_id=' + CLIENT_ID +
        '&redirect_uri=' + REDIRECT_URI +
        '&scope=' + SCOPE +
        '&response_type=code' +
        '&access_type=offline' + // Request a refresh token for long-term access
        '&prompt=consent'; // Ensure consent screen is shown
    
    window.location.href = authUrl;
}

/**
 * Exchanges the authorization code for an access token and refresh token.
 * @param {string} code - The authorization code received from the OAuth redirect.
 * @returns {Promise<object>} - A promise that resolves with the token data.
 */
async function exchangeCodeForToken(code) {
    const tokenUrl = 'https://oauth2.googleapis.com/token';
    const body = new URLSearchParams();
    body.append('code', code);
    body.append('client_id', CLIENT_ID);
    body.append('client_secret', CLIENT_SECRET);
    body.append('redirect_uri', REDIRECT_URI);
    body.append('grant_type', 'authorization_code');

    const response = await fetch(tokenUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: body.toString()
    });

    if (!response.ok) {
        throw new Error(`Token exchange failed: ${response.statusText}`);
    }

    return response.json();
}

/**
 * Refreshes the access token using the refresh token.
 * @param {string} refreshToken - The refresh token.
 * @returns {Promise<object>} - A promise that resolves with the new token data.
 */
async function refreshToken(refreshToken) {
    const tokenUrl = 'https://oauth2.googleapis.com/token';
    const body = new URLSearchParams();
    body.append('client_id', CLIENT_ID);
    body.append('client_secret', CLIENT_SECRET);
    body.append('refresh_token', refreshToken);
    body.append('grant_type', 'refresh_token');

    const response = await fetch(tokenUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: body.toString()
    });

    if (!response.ok) {
        throw new Error(`Token refresh failed: ${response.statusText}`);
    }

    return response.json();
}

/**
 * Saves token data to localStorage.
 * @param {object} tokenData - The token data object.
 */
function saveTokenData(tokenData) {
    const expiryTime = Date.now() + (tokenData.expires_in * 1000);
    localStorage.setItem('ga4_access_token', tokenData.access_token);
    localStorage.setItem('ga4_token_expiry', expiryTime);
    if (tokenData.refresh_token) {
        localStorage.setItem('ga4_refresh_token', tokenData.refresh_token);
    }
}

/**
 * Retrieves a valid access token, refreshing it if necessary.
 * @returns {Promise<string|null>} - A promise that resolves with the valid access token or null.
 */
async function getValidAccessToken() {
    let accessToken = localStorage.getItem('ga4_access_token');
    const expiryTime = localStorage.getItem('ga4_token_expiry');
    const refreshTokenValue = localStorage.getItem('ga4_refresh_token');

    if (accessToken && expiryTime && Date.now() < parseInt(expiryTime) - 60000) {
        // Token is valid for at least another minute
        return accessToken;
    }

    if (refreshTokenValue) {
        try {
            const newTokenData = await refreshToken(refreshTokenValue);
            saveTokenData(newTokenData);
            return newTokenData.access_token;
        } catch (error) {
            console.error('Failed to refresh token:', error);
            // Clear invalid tokens and require re-authorization
            localStorage.removeItem('ga4_access_token');
            localStorage.removeItem('ga4_token_expiry');
            localStorage.removeItem('ga4_refresh_token');
            return null;
        }
    }

    return null;
}

/**
 * Checks if the user is currently authorized.
 * @returns {boolean}
 */
function isAuthorized() {
    return !!localStorage.getItem('ga4_refresh_token');
}



// Note: The actual GA4 Data API calls are handled by nexus-ga4-sync.js, 
// which will use the token provided by getValidAccessToken.
