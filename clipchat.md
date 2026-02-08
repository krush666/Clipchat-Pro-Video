# ClipChat Pro - Video Intro Chat Bot

[![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)](https://github.com/yourusername/clipchat-pro)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)
[![Compatibility](https://img.shields.io/badge/browser-Modern%20Browsers-success.svg)]()

**Turn passive visitors into active conversations with video-powered chat**

ClipChat Pro is a floating website widget that combines the engagement of video with the interactivity of live chat. Visitors see a muted, looping video preview of your spokesperson; when they click, it expands to full size with audio, then seamlessly transitions into a fully functional chat interface.

---

## 🎬 Demo

![ClipChat Pro Demo](https://via.placeholder.com/800x400/6366f1/ffffff?text=ClipChat+Pro+Demo+Video)

**Live Demo:** [https://your-demo-link.com](https://your-demo-link.com)

---

## ✨ Features

### Core Experience
- **📱 iPhone-Style Video Frame** - Realistic smartphone mockup with notch and rounded corners
- **🔇 Muted Autoplay** - Compliant with browser autoplay policies
- **🔊 Audio on Expansion** - Unmutes automatically when user engages
- **💬 Seamless Transition** - Video fades into chat without closing the widget
- **🧠 Session Memory** - Returns to chat mode if user previously engaged

### Chat Interface
- **👤 Personal Avatar** - Human face builds trust and connection
- **⚡ Quick Replies** - Pre-built buttons for common intents
- **💬 Full Chat History** - Persistent conversation context
- **⏱️ Typing Indicators** - Animated dots show bot is responding
- **⌨️ Keyboard Support** - Full accessibility with Enter to send, Escape to close

### Widget Controls
- **➖ Minimize** - Collapses to floating bubble with notification badge
- **❌ Close** - Dismisses widget for current session
- **📱 Responsive** - Adapts from desktop (380px) to mobile (full-width)

### Technical
- **🎨 Fully Customizable** - CSS variables for all colors and branding
- **♿ Accessible** - ARIA labels, keyboard navigation, focus management
- **⚡ Performance** - Lazy-loaded video, efficient DOM updates
- **🔌 Backend Ready** - Hook up your own API or WebSocket endpoint
- **📦 Zero Dependencies** - Vanilla JS, no frameworks required

---

## 🚀 Quick Start

### Option 1: Copy-Paste (Easiest)

1. Copy the entire HTML file from the previous response
2. Save it as `index.html`
3. Open in your browser
4. Customize the `CONFIG` object (see Configuration section)

### Option 2: Separate Files (Recommended)

#### 1. Create File Structure

clipchat-pro/
├── index.html          # Demo page
├── clipchat-pro.css    # Widget styles
├── clipchat-pro.js     # Widget logic
└── README.md           # This file
Copy

#### 2. HTML Structure
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Your Website</title>
    <!-- ClipChat Pro CSS -->
    <link rel="stylesheet" href="clipchat-pro.css">
</head>
<body>
    <!-- Your website content here -->
    
    <!-- ClipChat Pro Widget Container -->
    <div id="clipchat-widget" role="dialog" aria-label="Chat widget"></div>
    
    <!-- ClipChat Pro JavaScript -->
    <script src="clipchat-pro.js"></script>
</body>
</html>
3. CSS File (clipchat-pro.css)
[Copy all CSS from the <style> tags in the original HTML]
4. JavaScript File (clipchat-pro.js)
[Copy all JavaScript from the <script> tags in the original HTML]
⚙️ Configuration
Edit the CONFIG object at the top of the JavaScript file:
JavaScript
Copy
const CONFIG = {
    // Media
    videoUrl: 'https://your-cdn.com/spokesperson-video.mp4',
    avatarUrl: 'https://your-cdn.com/avatar.jpg',
    
    // Text Content
    botName: 'Sarah',
    botTitle: 'Customer Success Manager',
    greeting: 'Hi there! 👋 How can I help you today?',
    placeholder: 'Ask me anything...',
    
    // Appearance
    primaryColor: '#6366f1',
    
    // Behavior
    quickReplies: [
        'Book a call',
        'Pricing info', 
        'Product demo',
        'Support'
    ],
    
    // Backend
    apiEndpoint: 'https://your-api.com/chat', // Optional
    
    // Storage
    sessionKey: 'clipchat_session'
};
Configuration Options
Table
Copy
Option	Type	Default	Description
videoUrl	string	Demo video	URL to your spokesperson video (MP4 recommended)
avatarUrl	string	Stock photo	Bot avatar image (1:1 ratio, 150x150px recommended)
botName	string	'Sarah'	Name displayed in chat header
botTitle	string	'Customer Success Manager'	Subtitle under name
greeting	string	'Hi there!...'	First message bot sends
placeholder	string	'Ask me anything...'	Input field placeholder text
primaryColor	string	'#6366f1'	Main brand color (buttons, accents)
quickReplies	array	[...]	Array of quick-reply button texts
apiEndpoint	string	null	Your backend API URL (optional)
sessionKey	string	'clipchat_session'	localStorage key for session data
🎨 Customization
CSS Variables
Modify these CSS custom properties to match your brand:
css
Copy
:root {
    /* Colors */
    --clipchat-primary: #6366f1;        /* Main buttons */
    --clipchat-primary-hover: #4f46e5;  /* Button hover state */
    --clipchat-accent: #ec4899;         /* Notification badges */
    --clipchat-bg: #ffffff;             /* Widget background */
    --clipchat-surface: #f8fafc;        /* Chat background */
    --clipchat-text: #1e293b;           /* Primary text */
    --clipchat-text-secondary: #64748b; /* Secondary text */
    --clipchat-border: #e2e8f0;         /* Borders/dividers */
    
    /* Effects */
    --clipchat-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
    --clipchat-shadow-lg: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
    
    /* Geometry */
    --clipchat-radius: 24px;            /* Corner roundness */
    --clipchat-radius-sm: 12px;         /* Smaller corners */
    --clipchat-transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}
Video Requirements
Format: MP4 (H.264 codec for maximum compatibility)
Aspect Ratio: 9:16 (vertical video, 1080x1920 recommended)
Duration: 10-30 seconds ideal
File Size: Under 5MB for fast loading
Audio: Include audio track (starts muted, unmutes on expand)
Tips:
Film in portrait mode (phone orientation)
Keep spokesperson centered
Ensure good lighting and clear audio
Add subtitles for accessibility
Avatar Requirements
Format: JPG or PNG
Size: 150x150px (displays at 48x48px, retina-ready)
Style: Professional headshot with face clearly visible
Background: Solid color or blurred background
🔌 Backend Integration
REST API Integration
Replace the generateResponse() function with an API call:
JavaScript
Copy
async function sendMessage(text) {
    // Add user message immediately
    addMessage('user', text);
    showTyping();
    
    try {
        const response = await fetch(CONFIG.apiEndpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                message: text,
                sessionId: state.sessionId,
                timestamp: new Date().toISOString()
            })
        });
        
        const data = await response.json();
        hideTyping();
        addMessage('bot', data.reply);
        
    } catch (error) {
        hideTyping();
        addMessage('bot', 'Sorry, I\'m having trouble connecting. Please try again!');
    }
}
WebSocket Integration
For real-time chat:
JavaScript
Copy
let ws;

function initWebSocket() {
    ws = new WebSocket('wss://your-websocket-server.com');
    
    ws.onmessage = (event) => {
        const data = JSON.parse(event.data);
        hideTyping();
        addMessage('bot', data.message);
    };
}

function sendMessage(text) {
    addMessage('user', text);
    showTyping();
    
    if (ws && ws.readyState === WebSocket.OPEN) {
        ws.send(JSON.stringify({
            type: 'message',
            content: text,
            sessionId: state.sessionId
        }));
    }
}
Webhook Support
Send conversation data to your CRM:
JavaScript
Copy
function saveSession() {
    // Existing localStorage save
    localStorage.setItem(CONFIG.sessionKey, JSON.stringify({
        id: state.sessionId,
        isChatMode: state.isChatMode,
        messages: state.messages,
        lastActive: Date.now()
    }));
    
    // Send to your backend
    fetch('https://your-crm.com/webhook', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            sessionId: state.sessionId,
            messages: state.messages,
            url: window.location.href,
            timestamp: new Date().toISOString()
        })
    });
}
📱 Responsive Behavior
Table
Copy
Device	Collapsed	Expanded Video	Chat
Desktop	180×320px (floating)	380×680px	380×680px
Tablet	160×280px	360×600px	360×600px
Mobile	140×250px (floating right)	100%×85vh	100%×85vh
Mobile Considerations:
Widget avoids covering critical UI (configurable margin)
Full-screen expansion for better video viewing
Bottom-sheet style chat interface
Touch-optimized buttons (min 44px tap targets)
♿ Accessibility
ClipChat Pro follows WCAG 2.1 AA guidelines:
Keyboard Navigation: Tab through all controls, Enter to activate
Screen Readers: ARIA labels on all interactive elements
Focus Management: Visible focus indicators, trapped focus in widget
Color Contrast: All text meets 4.5:1 contrast ratio
Motion: Respects prefers-reduced-motion (add media query)
Autoplay: Muted by default, user control for audio
Keyboard Shortcuts
Table
Copy
Key	Action
Tab	Navigate between controls
Enter / Space	Activate button or quick reply
Escape	Close/minimize widget
Enter (in input)	Send message
🛠️ Advanced Customization
Custom Animation Speed
css
Copy
:root {
    --clipchat-transition: all 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55); /* Bouncy */
}
Position Widget Left Side
css
Copy
#clipchat-widget {
    right: auto;
    left: 20px;
}
Custom Phone Frame Color
css
Copy
.clipchat-phone-frame {
    background: #your-color; /* Changes bezel color */
    border: 3px solid #your-accent-color;
}
Hide on Specific Pages
JavaScript
Copy
// Add to your page scripts
if (window.location.pathname.includes('/checkout')) {
    document.getElementById('clipchat-widget').style.display = 'none';
}
🌐 Browser Support
Table
Copy
Browser	Version	Support
Chrome	90+	✅ Full
Firefox	88+	✅ Full
Safari	14+	✅ Full
Edge	90+	✅ Full
Opera	76+	✅ Full
IE 11	-	❌ Not supported
Mobile:
iOS Safari 14+
Chrome Android 90+
Samsung Internet 15+
🚀 Deployment
CDN Hosting (Recommended)
Upload clipchat-pro.css and clipchat-pro.js to your CDN
Update URLs in your HTML:
HTML
Preview
Copy
<link rel="stylesheet" href="https://your-cdn.com/clipchat-pro.css">
<script src="https://your-cdn.com/clipchat-pro.js"></script>
NPM Package (Coming Soon)
bash
Copy
npm install clipchat-pro
JavaScript
Copy
import ClipChat from 'clipchat-pro';

ClipChat.init({
    videoUrl: '...',
    botName: 'Alex'
});
WordPress Plugin
Upload files to /wp-content/plugins/clipchat-pro/
Create clipchat-pro.php:
php
Copy
<?php
/**
 * Plugin Name: ClipChat Pro
 */

function clipchat_pro_enqueue() {
    wp_enqueue_style('clipchat-pro', plugin_dir_url(__FILE__) . 'clipchat-pro.css');
    wp_enqueue_script('clipchat-pro', plugin_dir_url(__FILE__) . 'clipchat-pro.js', [], '1.0', true);
}
add_action('wp_enqueue_scripts', 'clipchat_pro_enqueue');

function clipchat_pro_widget() {
    echo '<div id="clipchat-widget" role="dialog" aria-label="Chat widget"></div>';
}
add_action('wp_footer', 'clipchat_pro_widget');
📊 Analytics
Track widget interactions:
JavaScript
Copy
// Google Analytics 4
function trackEvent(eventName, params = {}) {
    if (typeof gtag !== 'undefined') {
        gtag('event', eventName, {
            'event_category': 'ClipChat Pro',
            ...params
        });
    }
}

// Track key events
document.getElementById('clipchat-collapsed')?.addEventListener('click', () => {
    trackEvent('clipchat_expand');
});

document.getElementById('clipchat-cta')?.addEventListener('click', () => {
    trackEvent('clipchat_start_chat');
});
Recommended Events to Track:
clipchat_expand - User clicked to expand video
clipchat_start_chat - User clicked "Let's chat"
clipchat_message_sent - User sent a message
clipchat_quick_reply - User clicked quick reply
clipchat_minimize - User minimized widget
clipchat_close - User closed widget
🐛 Troubleshooting
Video Not Autoplaying
Cause: Browser autoplay policies
Fix: Video is muted by default. Ensure muted attribute is present.
Widget Not Showing
Cause: z-index conflicts or CSS not loaded
Fix: Check that #clipchat-widget has z-index: 999999
Session Not Persisting
Cause: localStorage disabled or full
Fix: Check browser privacy settings, clear storage
Mobile Layout Issues
Cause: Viewport meta tag missing
Fix: Ensure <meta name="viewport" content="width=device-width, initial-scale=1.0"> is present
CORS Errors with Video
Cause: Video hosted on different domain without CORS headers
Fix: Add crossorigin="anonymous" to video tag and configure CORS on server
🤝 Contributing
We welcome contributions! Please follow these steps:
Fork the repository
Create a feature branch (git checkout -b feature/amazing-feature)
Commit your changes (git commit -m 'Add amazing feature')
Push to the branch (git push origin feature/amazing-feature)
Open a Pull Request
Development Setup
bash
Copy
git clone https://github.com/yourusername/clipchat-pro.git
cd clipchat-pro
npm install
npm run dev
📄 License
MIT License - see LICENSE file for details.
🆘 Support
Documentation: https://docs.clipchatpro.com
Issues: GitHub Issues
Email: support@clipchatpro.com
Discord: Join our community
🙏 Credits
Icons: Heroicons
Demo Video: Google Sample Videos
Inspiration: Intercom, Drift
Made with ❤️ by the ClipChat Pro Team
Copy

## Installation Instructions Summary

### Method 1: Single File (Fastest)
1. Save the provided HTML file
2. Open in any modern browser
3. Edit the `CONFIG` section to customize
4. Upload to your web server

### Method 2: Production Setup
1. **Separate the files:**
   - Extract CSS into `clipchat-pro.css`
   - Extract JavaScript into `clipchat-pro.js`
   - Keep HTML structure with container div

2. **Host the files:**
   - Upload to your CDN or web server
   - Ensure HTTPS for video and API calls

3. **Embed on your site:**
   ```html
   <div id="clipchat-widget"></div>
   <script src="path/to/clipchat-pro.js"></script>
Customize:
Replace video URL with your spokesperson video
Update avatar, colors, and text
Configure API endpoint for live chat
Test:
Check desktop and mobile views
Verify video plays muted initially
Test chat flow and session persistence
The widget is now ready to convert your visitors into conversations!