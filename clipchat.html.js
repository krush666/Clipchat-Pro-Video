/**
 * ClipChat Pro - Video Intro Chat Bot
 * Extracted JavaScript for external use
 */

(function() {
    'use strict';

    // Configuration
    const CONFIG = {
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
        avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face',
        botName: 'Sarah',
        botTitle: 'Customer Success Manager',
        greeting: 'Hi there! 👋 I noticed you\'re interested in our services. How can I help you today?',
        placeholder: 'Ask me anything about our services...',
        primaryColor: '#6366f1',
        apiEndpoint: null,
        quickReplies: ['Book a call', 'Pricing info', 'Product demo', 'Support'],
        sessionKey: 'clipchat_session'
    };

    // State
    const state = {
        isOpen: false,
        isExpanded: false,
        isChatMode: false,
        isMinimized: false,
        isMuted: true,
        messages: [],
        sessionId: null,
        unreadCount: 0
    };

    let widget, videoElement;

    // Logging function for test page
    const log = window.log || function() {};

    function init() {
        checkSession();
        render();
        setupEventListeners();
        setupVideo('clipchat-video-collapsed', true);
    }

    function checkSession() {
        const session = localStorage.getItem(CONFIG.sessionKey);
        if (session) {
            const data = JSON.parse(session);
            state.sessionId = data.id;
            state.isChatMode = data.isChatMode || false;
            state.messages = data.messages || [];
        } else {
            state.sessionId = 'session_' + Date.now();
        }
    }

    function saveSession() {
        localStorage.setItem(CONFIG.sessionKey, JSON.stringify({
            id: state.sessionId,
            isChatMode: state.isChatMode,
            messages: state.messages,
            lastActive: Date.now()
        }));
    }

    function render() {
        widget = document.getElementById('clipchat-widget');
        if (!widget) return;
        
        if (state.isMinimized) {
            renderMinimized();
        } else if (!state.isOpen) {
            renderCollapsed();
        } else {
            renderExpanded();
        }
        
        updateStateDisplay();
    }

    function renderCollapsed() {
        widget.innerHTML = `
            <div class="clipchat-collapsed" id="clipchat-collapsed" role="button" tabindex="0" aria-label="Open video chat with ${CONFIG.botName}">
                <button class="clipchat-close-collapsed" id="clipchat-close-collapsed" aria-label="Close widget">×</button>
                <div class="clipchat-phone-frame">
                    <div class="clipchat-phone-screen">
                        <div class="clipchat-phone-notch"></div>
                        <video class="clipchat-video" id="clipchat-video-collapsed" muted loop playsinline aria-label="Video introduction">
                            <source src="${CONFIG.videoUrl}" type="video/mp4">
                        </video>
                    </div>
                </div>
                <div class="clipchat-overlay-label">Watch & Chat</div>
            </div>
        `;
        
        setupCollapsedListeners();
        setTimeout(() => {
            videoElement = document.getElementById('clipchat-video-collapsed');
            if (videoElement) {
                videoElement.muted = true;
                videoElement.play().catch(() => {});
            }
        }, 100);
    }

    function renderExpanded() {
        widget.innerHTML = `
            <div class="clipchat-expanded" id="clipchat-expanded">
                ${state.isChatMode ? renderChatContent() : renderVideoContent()}
            </div>
        `;
        
        if (state.isChatMode) {
            setupChatListeners();
            scrollToBottom();
        } else {
            setupVideoListeners();
            setTimeout(() => {
                videoElement = document.getElementById('clipchat-video-expanded');
                if (videoElement) {
                    videoElement.muted = state.isMuted;
                    videoElement.play().catch(() => {});
                }
            }, 100);
        }
    }

    function renderVideoContent() {
        return `
            <div class="clipchat-video-content">
                <div class="clipchat-video-header">
                    <button class="clipchat-header-btn" id="clipchat-minimize" aria-label="Minimize widget">−</button>
                    <button class="clipchat-header-btn" id="clipchat-close-expanded" aria-label="Close widget">×</button>
                </div>
                <div class="clipchat-video-wrapper">
                    <div class="clipchat-video-frame-large">
                        <div class="clipchat-video-screen-large">
                            <div class="clipchat-phone-notch"></div>
                            <video class="clipchat-video" id="clipchat-video-expanded" ${state.isMuted ? 'muted' : ''} loop playsinline aria-label="Video introduction">
                                <source src="${CONFIG.videoUrl}" type="video/mp4">
                            </video>
                        </div>
                    </div>
                </div>
                <div class="clipchat-cta-container">
                    <button class="clipchat-cta-button" id="clipchat-cta" aria-label="Start chatting with ${CONFIG.botName}">Let's chat</button>
                </div>
            </div>
        `;
    }

    function renderChatContent() {
        const messagesHtml = state.messages.map(msg => `
            <div class="clipchat-message clipchat-message-${msg.type}">${msg.text}<div class="clipchat-message-time">${msg.time}</div></div>
        `).join('');

        const quickRepliesHtml = CONFIG.quickReplies.map(reply => `
            <button class="clipchat-quick-reply" data-reply="${reply}">${reply}</button>
        `).join('');

        return `
            <div class="clipchat-chat-state">
                <div class="clipchat-chat-header">
                    <img src="${CONFIG.avatarUrl}" alt="${CONFIG.botName}" class="clipchat-avatar">
                    <div class="clipchat-header-info">
                        <div class="clipchat-header-name">${CONFIG.botName}</div>
                        <div class="clipchat-header-status"><span class="clipchat-status-dot"></span>Online now</div>
                    </div>
                    <div class="clipchat-chat-controls">
                        <button class="clipchat-control-btn" id="clipchat-minimize-chat">−</button>
                        <button class="clipchat-control-btn" id="clipchat-close-chat">×</button>
                    </div>
                </div>
                <div class="clipchat-messages" id="clipchat-messages" role="log" aria-live="polite">
                    ${messagesHtml}
                    <div id="clipchat-typing-indicator" class="clipchat-hidden"></div>
                </div>
                <div class="clipchat-quick-replies">${quickRepliesHtml}</div>
                <div class="clipchat-input-area">
                    <input type="text" class="clipchat-input" id="clipchat-input" placeholder="${CONFIG.placeholder}" autocomplete="off">
                    <button class="clipchat-send-btn" id="clipchat-send" disabled>➤</button>
                </div>
            </div>
        `;
    }

    function renderMinimized() {
        const badge = state.unreadCount > 0 ? `<div class="clipchat-notification-badge">${state.unreadCount}</div>` : '';
        widget.innerHTML = `
            <div class="clipchat-minimized" id="clipchat-minimized" role="button" tabindex="0">
                ${badge}
            </div>
        `;
        
        document.getElementById('clipchat-minimized').addEventListener('click', () => {
            state.isMinimized = false;
            state.isOpen = true;
            state.unreadCount = 0;
            render();
        });
    }

    function setupCollapsedListeners() {
        const collapsed = document.getElementById('clipchat-collapsed');
        const closeBtn = document.getElementById('clipchat-close-collapsed');

        if (collapsed) {
            collapsed.addEventListener('click', (e) => {
                if (e.target !== closeBtn) {
                    expandWidget();
                }
            });
        }

        if (closeBtn) {
            closeBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                closeWidget();
            });
        }
    }

    function setupVideoListeners() {
        const cta = document.getElementById('clipchat-cta');
        const minimize = document.getElementById('clipchat-minimize');
        const close = document.getElementById('clipchat-close-expanded');

        if (cta) cta.addEventListener('click', startChat);
        if (minimize) minimize.addEventListener('click', minimizeWidget);
        if (close) close.addEventListener('click', closeWidget);

        const video = document.getElementById('clipchat-video-expanded');
        if (video && state.isMuted) {
            video.addEventListener('click', () => {
                video.muted = false;
                state.isMuted = false;
                video.play();
            });
        }
    }

    function setupChatListeners() {
        const input = document.getElementById('clipchat-input');
        const sendBtn = document.getElementById('clipchat-send');
        const minimize = document.getElementById('clipchat-minimize-chat');
        const close = document.getElementById('clipchat-close-chat');
        const quickReplies = document.querySelectorAll('.clipchat-quick-reply');

        if (input) {
            input.addEventListener('input', () => {
                sendBtn.disabled = !input.value.trim();
            });
            input.addEventListener('keypress', (e) => {
                if (e.key === 'Enter' && input.value.trim()) {
                    sendMessage(input.value.trim());
                    input.value = '';
                    sendBtn.disabled = true;
                }
            });
        }

        if (sendBtn) {
            sendBtn.addEventListener('click', () => {
                if (input && input.value.trim()) {
                    sendMessage(input.value.trim());
                    input.value = '';
                    sendBtn.disabled = true;
                }
            });
        }

        quickReplies.forEach(btn => {
            btn.addEventListener('click', () => {
                sendMessage(btn.dataset.reply);
            });
        });

        if (minimize) minimize.addEventListener('click', minimizeWidget);
        if (close) close.addEventListener('click', closeWidget);
    }

    function setupEventListeners() {
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && state.isOpen) closeWidget();
        });
    }

    function expandWidget() {
        state.isOpen = true;
        state.isExpanded = true;
        state.isMuted = false;
        render();
    }

    function startChat() {
        state.isChatMode = true;
        if (state.messages.length === 0) {
            addMessage('bot', CONFIG.greeting);
        }
        saveSession();
        render();
    }

    function minimizeWidget() {
        state.isMinimized = true;
        state.isOpen = false;
        render();
    }

    function closeWidget() {
        state.isOpen = false;
        state.isExpanded = false;
        state.isChatMode = false;
        state.isMinimized = false;
        if (videoElement) videoElement.pause();
        render();
    }

    function sendMessage(text) {
        addMessage('user', text);
        showTyping();
        setTimeout(() => {
            hideTyping();
            const response = generateResponse(text);
            addMessage('bot', response);
        }, 1000 + Math.random() * 1000);
    }

    function addMessage(type, text) {
        const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        state.messages.push({ type, text, time });
        saveSession();
        if (state.isChatMode && document.getElementById('clipchat-messages')) {
            render();
        }
    }

    function showTyping() {
        const indicator = document.getElementById('clipchat-typing-indicator');
        if (indicator) {
            indicator.innerHTML = '<div class="clipchat-typing"><div class="clipchat-typing-dot"></div><div class="clipchat-typing-dot"></div><div class="clipchat-typing-dot"></div></div>';
            indicator.classList.remove('clipchat-hidden');
            scrollToBottom();
        }
    }

    function hideTyping() {
        const indicator = document.getElementById('clipchat-typing-indicator');
        if (indicator) indicator.classList.add('clipchat-hidden');
    }

    function scrollToBottom() {
        const messages = document.getElementById('clipchat-messages');
        if (messages) setTimeout(() => messages.scrollTop = messages.scrollHeight, 50);
    }

    function generateResponse(userText) {
        const lower = userText.toLowerCase();
        if (lower.includes('price') || lower.includes('cost') || lower.includes('pricing')) return 'Our pricing starts at $29/month. Would you like a detailed breakdown?';
        if (lower.includes('book') || lower.includes('call') || lower.includes('demo')) return 'I\'d love to set up a call! What\'s the best time for you?';
        if (lower.includes('support') || lower.includes('help')) return 'I\'m here to help! Tell me more about what you\'re having trouble with.';
        if (lower.includes('hello') || lower.includes('hi') || lower.includes('hey')) return 'Hello! Great to meet you. What brings you here today?';
        return 'That\'s interesting! Tell me more about what you\'re looking for.';
    }

    function setupVideo(elementId, muted) {
        setTimeout(() => {
            videoElement = document.getElementById(elementId);
            if (videoElement) {
                videoElement.muted = muted;
                videoElement.play().catch(() => {});
            }
        }, 100);
    }

    function updateStateDisplay() {
        const display = document.getElementById('stateDisplay');
        if (display) {
            display.innerHTML = `
                <div><span class="state-label">isOpen:</span> <span class="state-value">${state.isOpen}</span></div>
                <div><span class="state-label">isChatMode:</span> <span class="state-value">${state.isChatMode}</span></div>
                <div><span class="state-label">isMinimized:</span> <span class="state-value">${state.isMinimized}</span></div>
                <div><span class="state-label">isMuted:</span> <span class="state-value">${state.isMuted}</span></div>
                <div><span class="state-label">messages:</span> <span class="state-value">${state.messages.length}</span></div>
                <div><span class="state-label">sessionId:</span> <span class="state-value">${state.sessionId ? state.sessionId.substring(0,20) + '...' : 'none'}</span></div>
            `;
        }
    }

    // Initialize on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // Expose API
    window.ClipChat = {
        open: expandWidget,
        close: closeWidget,
        minimize: minimizeWidget,
        send: sendMessage,
        config: CONFIG
    };

})();
