/**
 * NEXUS GA4 OAuth 2.0 Authorization Handler
 * 
 * 该脚本处理Google Analytics (GA4) OAuth 2.0授权流程，允许供应商授权NEXUS平台
 * 访问其GA4数据。采用OAuth 2.0授权代码流程（Authorization Code Flow）。
 * 
 * 使用方式：
 * 1. 在NEXUS平台中配置OAuth 2.0客户端ID和客户端密钥
 * 2. 在供应商授权页面中调用 initializeOAuthFlow()
 * 3. 用户完成Google授权后，脚本将处理回调并存储授权令牌
 * 
 * 版本: 1.0
 * 作者: NEXUS Development Team
 * 日期: 2025-10-23
 */

// ============================================================================
// OAuth 2.0配置
// ============================================================================

const GA4_OAUTH_CONFIG = {
    // Google OAuth 2.0端点
    authEndpoint: 'https://accounts.google.com/o/oauth2/v2/auth',
    tokenEndpoint: 'https://oauth2.googleapis.com/token',
    revokeEndpoint: 'https://oauth2.googleapis.com/revoke',
    
    // NEXUS平台配置（需要由管理员设置）
    clientId: '', // 从Google Cloud Console获取
    clientSecret: '', // 从Google Cloud Console获取（仅在后端使用）
    redirectUri: '', // 例如 'https://nexusglobal.asia/ga4-callback.html'
    
    // GA4 API配置
    scopes: [
        'https://www.googleapis.com/auth/analytics.readonly',
        'https://www.googleapis.com/auth/analytics.manage.users'
    ],
    
    // 本地存储键
    storageKeys: {
        accessToken: 'ga4_access_token',
        refreshToken: 'ga4_refresh_token',
        tokenExpiry: 'ga4_token_expiry',
        measurementId: 'ga4_measurement_id',
        propertyId: 'ga4_property_id',
        authState: 'ga4_auth_state'
    }
};

// ============================================================================
// OAuth 2.0授权流程
// ============================================================================

/**
 * 初始化OAuth授权流程
 * 将用户重定向到Google授权页面
 */
function initializeOAuthFlow() {
    // 生成随机状态值，用于防止CSRF攻击
    const state = generateRandomString(32);
    localStorage.setItem(GA4_OAUTH_CONFIG.storageKeys.authState, state);
    
    // 构建授权URL
    const authUrl = new URL(GA4_OAUTH_CONFIG.authEndpoint);
    authUrl.searchParams.append('client_id', GA4_OAUTH_CONFIG.clientId);
    authUrl.searchParams.append('redirect_uri', GA4_OAUTH_CONFIG.redirectUri);
    authUrl.searchParams.append('response_type', 'code');
    authUrl.searchParams.append('scope', GA4_OAUTH_CONFIG.scopes.join(' '));
    authUrl.searchParams.append('state', state);
    authUrl.searchParams.append('access_type', 'offline'); // 获取刷新令牌
    authUrl.searchParams.append('prompt', 'consent'); // 强制显示同意屏幕
    
    // 重定向到Google授权页面
    window.location.href = authUrl.toString();
}

/**
 * 处理OAuth回调
 * 此函数应在回调页面（ga4-callback.html）中调用
 * 
 * @returns {boolean} 授权成功返回true，失败返回false
 */
function handleOAuthCallback() {
    // 从URL中提取授权代码和状态
    const urlParams = new URLSearchParams(window.location.search);
    const authCode = urlParams.get('code');
    const state = urlParams.get('state');
    const error = urlParams.get('error');
    
    // 检查是否有错误
    if (error) {
        console.error('OAuth authorization failed:', error);
        showErrorMessage(`授权失败: ${error}`);
        return false;
    }
    
    // 验证状态值
    const savedState = localStorage.getItem(GA4_OAUTH_CONFIG.storageKeys.authState);
    if (state !== savedState) {
        console.error('State mismatch. Possible CSRF attack.');
        showErrorMessage('安全验证失败，请重新授权。');
        return false;
    }
    
    // 交换授权代码获取访问令牌
    exchangeCodeForToken(authCode);
    return true;
}

/**
 * 交换授权代码获取访问令牌
 * 注意：此操作应在后端执行，以保护客户端密钥
 * 
 * @param {string} authCode - 授权代码
 */
function exchangeCodeForToken(authCode) {
    // 构建令牌请求
    const tokenRequest = {
        grant_type: 'authorization_code',
        code: authCode,
        redirect_uri: GA4_OAUTH_CONFIG.redirectUri,
        client_id: GA4_OAUTH_CONFIG.clientId,
        client_secret: GA4_OAUTH_CONFIG.clientSecret // 注意：不应在前端暴露
    };
    
    // 发送令牌请求到后端
    // 在实际应用中，应该通过NEXUS后端服务发送此请求，而不是直接从前端发送
    // 这里仅作为示例
    
    fetch(GA4_OAUTH_CONFIG.tokenEndpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams(tokenRequest).toString()
    })
    .then(response => response.json())
    .then(data => {
        if (data.access_token) {
            // 保存访问令牌和刷新令牌
            saveTokens(data);
            showSuccessMessage('授权成功！');
            // 重定向到供应商数据看板
            setTimeout(() => {
                window.location.href = '/supplier-dashboard.html';
            }, 2000);
        } else {
            console.error('Failed to obtain access token:', data);
            showErrorMessage('获取访问令牌失败，请重试。');
        }
    })
    .catch(error => {
        console.error('Token exchange error:', error);
        showErrorMessage('令牌交换失败，请重试。');
    });
}

/**
 * 保存OAuth令牌到本地存储
 * 
 * @param {object} tokenData - 包含access_token、refresh_token、expires_in等的对象
 */
function saveTokens(tokenData) {
    const expiryTime = Date.now() + (tokenData.expires_in * 1000);
    
    localStorage.setItem(GA4_OAUTH_CONFIG.storageKeys.accessToken, tokenData.access_token);
    
    if (tokenData.refresh_token) {
        localStorage.setItem(GA4_OAUTH_CONFIG.storageKeys.refreshToken, tokenData.refresh_token);
    }
    
    localStorage.setItem(GA4_OAUTH_CONFIG.storageKeys.tokenExpiry, expiryTime);
    
    console.log('Tokens saved successfully.');
}

/**
 * 获取有效的访问令牌
 * 如果令牌已过期，将尝试使用刷新令牌获取新的访问令牌
 * 
 * @returns {Promise<string>} 返回有效的访问令牌
 */
async function getValidAccessToken() {
    const accessToken = localStorage.getItem(GA4_OAUTH_CONFIG.storageKeys.accessToken);
    const tokenExpiry = localStorage.getItem(GA4_OAUTH_CONFIG.storageKeys.tokenExpiry);
    
    // 检查令牌是否存在
    if (!accessToken) {
        throw new Error('No access token found. Please authorize first.');
    }
    
    // 检查令牌是否已过期
    if (Date.now() < tokenExpiry) {
        return accessToken;
    }
    
    // 令牌已过期，尝试刷新
    const refreshToken = localStorage.getItem(GA4_OAUTH_CONFIG.storageKeys.refreshToken);
    if (!refreshToken) {
        throw new Error('Refresh token not found. Please re-authorize.');
    }
    
    return await refreshAccessToken(refreshToken);
}

/**
 * 使用刷新令牌获取新的访问令牌
 * 
 * @param {string} refreshToken - 刷新令牌
 * @returns {Promise<string>} 返回新的访问令牌
 */
async function refreshAccessToken(refreshToken) {
    const refreshRequest = {
        grant_type: 'refresh_token',
        refresh_token: refreshToken,
        client_id: GA4_OAUTH_CONFIG.clientId,
        client_secret: GA4_OAUTH_CONFIG.clientSecret
    };
    
    try {
        const response = await fetch(GA4_OAUTH_CONFIG.tokenEndpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: new URLSearchParams(refreshRequest).toString()
        });
        
        const data = await response.json();
        
        if (data.access_token) {
            saveTokens(data);
            return data.access_token;
        } else {
            throw new Error('Failed to refresh access token');
        }
    } catch (error) {
        console.error('Token refresh error:', error);
        // 刷新失败，需要重新授权
        clearAuthData();
        throw error;
    }
}

/**
 * 撤销OAuth授权
 * 删除本地存储的令牌，用户需要重新授权
 */
function revokeAuthorization() {
    const accessToken = localStorage.getItem(GA4_OAUTH_CONFIG.storageKeys.accessToken);
    
    if (!accessToken) {
        console.log('No access token to revoke.');
        return;
    }
    
    // 向Google发送撤销请求
    fetch(GA4_OAUTH_CONFIG.revokeEndpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: `token=${accessToken}`
    })
    .then(() => {
        clearAuthData();
        console.log('Authorization revoked successfully.');
        showSuccessMessage('授权已撤销。');
    })
    .catch(error => {
        console.error('Error revoking authorization:', error);
        // 即使撤销失败，也清除本地令牌
        clearAuthData();
    });
}

/**
 * 清除本地存储的授权数据
 */
function clearAuthData() {
    localStorage.removeItem(GA4_OAUTH_CONFIG.storageKeys.accessToken);
    localStorage.removeItem(GA4_OAUTH_CONFIG.storageKeys.refreshToken);
    localStorage.removeItem(GA4_OAUTH_CONFIG.storageKeys.tokenExpiry);
    localStorage.removeItem(GA4_OAUTH_CONFIG.storageKeys.authState);
    console.log('Authorization data cleared.');
}

/**
 * 检查用户是否已授权
 * 
 * @returns {boolean} 如果用户已授权且令牌有效，返回true
 */
function isAuthorized() {
    const accessToken = localStorage.getItem(GA4_OAUTH_CONFIG.storageKeys.accessToken);
    const tokenExpiry = localStorage.getItem(GA4_OAUTH_CONFIG.storageKeys.tokenExpiry);
    
    if (!accessToken || !tokenExpiry) {
        return false;
    }
    
    return Date.now() < parseInt(tokenExpiry);
}

/**
 * 保存GA4属性信息（测量ID和属性ID）
 * 
 * @param {string} measurementId - GA4测量ID
 * @param {string} propertyId - GA4属性ID
 */
function saveGA4PropertyInfo(measurementId, propertyId) {
    localStorage.setItem(GA4_OAUTH_CONFIG.storageKeys.measurementId, measurementId);
    localStorage.setItem(GA4_OAUTH_CONFIG.storageKeys.propertyId, propertyId);
    console.log('GA4 property info saved:', { measurementId, propertyId });
}

/**
 * 获取保存的GA4属性信息
 * 
 * @returns {object} 包含measurementId和propertyId的对象
 */
function getGA4PropertyInfo() {
    return {
        measurementId: localStorage.getItem(GA4_OAUTH_CONFIG.storageKeys.measurementId),
        propertyId: localStorage.getItem(GA4_OAUTH_CONFIG.storageKeys.propertyId)
    };
}

// ============================================================================
// GA4 Reporting API 调用
// ============================================================================

/**
 * 调用GA4 Reporting API获取数据
 * 
 * @param {string} propertyId - GA4属性ID
 * @param {object} requestBody - API请求体
 * @returns {Promise<object>} 返回API响应数据
 */
async function callGA4ReportingAPI(propertyId, requestBody) {
    try {
        const accessToken = await getValidAccessToken();
        
        const response = await fetch(
            `https://analyticsreporting.googleapis.com/v4/properties/${propertyId}:runReport`,
            {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(requestBody)
            }
        );
        
        if (!response.ok) {
            throw new Error(`API call failed: ${response.statusText}`);
        }
        
        return await response.json();
    } catch (error) {
        console.error('GA4 Reporting API error:', error);
        throw error;
    }
}

/**
 * 获取访客数据
 * 
 * @param {string} propertyId - GA4属性ID
 * @param {string} startDate - 开始日期（YYYY-MM-DD格式）
 * @param {string} endDate - 结束日期（YYYY-MM-DD格式）
 * @returns {Promise<object>} 返回访客数据
 */
async function getVisitorData(propertyId, startDate, endDate) {
    const requestBody = {
        dateRanges: [
            {
                startDate: startDate,
                endDate: endDate
            }
        ],
        metrics: [
            { name: 'activeUsers' },
            { name: 'sessions' },
            { name: 'screenPageViews' }
        ],
        dimensions: [
            { name: 'date' },
            { name: 'country' }
        ]
    };
    
    return await callGA4ReportingAPI(propertyId, requestBody);
}

/**
 * 获取事件数据
 * 
 * @param {string} propertyId - GA4属性ID
 * @param {string} eventName - 事件名称
 * @param {string} startDate - 开始日期
 * @param {string} endDate - 结束日期
 * @returns {Promise<object>} 返回事件数据
 */
async function getEventData(propertyId, eventName, startDate, endDate) {
    const requestBody = {
        dateRanges: [
            {
                startDate: startDate,
                endDate: endDate
            }
        ],
        metrics: [
            { name: 'eventCount' },
            { name: 'eventValue' }
        ],
        dimensions: [
            { name: 'eventName' },
            { name: 'date' }
        ],
        dimensionFilter: {
            filter: {
                fieldName: 'eventName',
                stringFilter: {
                    matchType: 'EXACT',
                    value: eventName
                }
            }
        }
    };
    
    return await callGA4ReportingAPI(propertyId, requestBody);
}

// ============================================================================
// 辅助函数
// ============================================================================

/**
 * 生成随机字符串，用于OAuth状态值
 * 
 * @param {number} length - 字符串长度
 * @returns {string} 随机字符串
 */
function generateRandomString(length) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
}

/**
 * 显示成功消息
 * 
 * @param {string} message - 消息文本
 */
function showSuccessMessage(message) {
    console.log('✓ ' + message);
    // 可以在这里添加UI通知逻辑，例如显示toast消息
    if (typeof showNotification === 'function') {
        showNotification(message, 'success');
    }
}

/**
 * 显示错误消息
 * 
 * @param {string} message - 消息文本
 */
function showErrorMessage(message) {
    console.error('✗ ' + message);
    // 可以在这里添加UI通知逻辑，例如显示toast消息
    if (typeof showNotification === 'function') {
        showNotification(message, 'error');
    }
}

// ============================================================================
// 导出函数供外部使用
// ============================================================================

if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        GA4_OAUTH_CONFIG,
        initializeOAuthFlow,
        handleOAuthCallback,
        exchangeCodeForToken,
        saveTokens,
        getValidAccessToken,
        refreshAccessToken,
        revokeAuthorization,
        clearAuthData,
        isAuthorized,
        saveGA4PropertyInfo,
        getGA4PropertyInfo,
        callGA4ReportingAPI,
        getVisitorData,
        getEventData,
        generateRandomString,
        showSuccessMessage,
        showErrorMessage
    };
}

