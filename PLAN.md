# ClipChat Pro SaaS - Project Plan

**A video-to-chat widget platform for converting website visitors into conversations**

---

## 🚀 Vision

Build a SaaS platform where businesses can:
1. Upload a spokesperson video introduction
2. Connect their AI (OpenAI/Anthropic) API key
3. Get an embed code for their website
4. Watch visitors engage through video and chat with their AI assistant

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────────────┐
│                        CUSTOMER WEBSITE                              │
│                                                                     │
│   <script src="https://cdn.clipchat.pro/widget.js"></script>      │
│   <div id="clipchat-widget" data-customer-id="ABC123"></div>      │
│                                                                     │
│   ┌─────────────────────────────────────────────────────────────┐   │
│   │                    CLIPCHAT WIDGET                          │   │
│   │   📱 iPhone-style video frame (muted autoplay)             │   │
│   │       ↓ user clicks ↓                                       │   │
│   │   📺 Full video with audio                                  │   │
│   │       ↓ user clicks "Let's Chat" ↓                         │   │
│   │   💬 AI Chat interface                                       │   │
│   └─────────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────┐
│                      CLIPCHAT PRO PLATFORM                          │
│                                                                     │
│   ┌──────────────────┐    ┌──────────────────┐    ┌─────────────┐  │
│   │   Dashboard      │───▶│   API Server     │───▶│  AI APIs    │  │
│   │   (Frontend)     │    │   (Cloudflare)   │    │  OpenAI     │  │
│   └──────────────────┘    │                  │    │  Claude     │  │
│                           │  - Auth          │    └─────────────┘  │
│   ┌──────────────────┐    │  - API Key Store │                     │
│   │   Database       │    │  - Usage Track  │    ┌─────────────┐  │
│   │   (PostgreSQL)   │◀───│  - Chat History │───▶│  Storage    │  │
│   └──────────────────┘    └──────────────────┘    │  (S3/R2)    │  │
│                                                   └─────────────┘  │
└─────────────────────────────────────────────────────────────────────┘
```

---

## 📋 Feature Roadmap

### Phase 1: MVP (Weeks 1-2)

#### Core Widget
- [x] Video-to-chat widget (existing)
- [ ] iPhone-style phone frame
- [ ] Muted autoplay video
- [ ] Expand on click
- [ ] "Let's Chat" CTA transition
- [ ] Chat interface with messages
- [ ] Quick reply buttons
- [ ] Typing indicators
- [ ] Session persistence (localStorage)

#### Customer Dashboard
- [ ] User authentication (email/password + OAuth)
- [ ] Customer settings page
- [ ] Video upload functionality
- [ ] API key input (encrypted)
- [ ] Bot name & avatar configuration
- [ ] Quick replies customization
- [ ] Color theming

#### Embed System
- [ ] Embed code generator
- [ ] Customer ID authentication
- [ ] Widget JS hosted on CDN (Cloudflare Pages)
- [ ] Per-customer configuration loading

### Phase 2: AI Integration (Weeks 3-4)

#### AI Chat Backend
- [ ] API proxy server (Cloudflare Workers)
- [ ] OpenAI API integration
- [ ] Anthropic Claude integration
- [ ] Chat context/memory management
- [ ] System prompt customization
- [ ] Temperature/settings control
- [ ] Streaming responses

#### Chat Enhancements
- [ ] Chat history storage (database)
- [ ] Conversation context
- [ ] Lead capture (email collection)
- [ ] Custom data injection (FAQ, pricing, etc.)

### Phase 3: Growth Features (Weeks 5-8)

#### Analytics
- [ ] Chat metrics dashboard
- [ ] Conversion tracking
- [ ] Peak engagement times
- [ ] Popular topics/queries
- [ ] Export reports (PDF/CSV)

#### Widget Customization
- [ ] Multiple widget positions
- [ ] Custom colors (brand matching)
- [ ] Widget size options
- [ ] Mobile-specific settings
- [ ] Custom trigger button

#### Integrations
- [ ] Webhooks (CRM, email marketing)
- [ ] Slack notifications
- [ ] Zapier integration
- [ ] Email notifications for leads

### Phase 4: Enterprise (Weeks 9-12)

#### Advanced Features
- [ ] Team accounts & collaboration
- [ ] Multiple widgets per account
- [ ] A/B testing (video variants)
- [ ] White-label option
- [ ] Custom domain for embed
- [ ] API access for developers
- [ ] SAML/SSO for enterprise

#### Performance & Scale
- [ ] Edge caching
- [ ] Video optimization
- [ ] CDN distribution
- [ ] 99.9% uptime SLA

---

## 💰 Pricing Model

### Tier 1: Starter - $29/month
- 1 website/domain
- 1 widget
- 100 chat messages/month
- Standard response time
- Basic analytics
- Email support

### Tier 2: Pro - $79/month
- 5 websites/domains
- 3 widgets per site
- 1,000 chat messages/month
- Fast response time
- Advanced analytics
- Custom colors
- Lead capture
- Priority support

### Tier 3: Business - $199/month
- Unlimited websites
- Unlimited widgets
- 10,000 chat messages/month
- Fastest response time
- Full analytics suite
- A/B testing
- White-label
- Custom domain
- API access
- Dedicated support

### Enterprise - Custom
- Unlimited everything
- Custom integrations
- SLA guarantee
- Dedicated account manager
- Onboarding support

---

## 🔐 Security Considerations

### API Key Storage
```
┌─────────────────────────────────────────┐
│         ENCRYPTED STORAGE FLOW           │
│                                          │
│  1. Customer enters API key in dashboard │
│  2. Encrypt with AES-256 before storage  │
│  3. Store in database (encrypted)       │
│  4. Decrypt only when making API call   │
│  5. Never expose in frontend/JS         │
└─────────────────────────────────────────┘
```

### Security Measures
- [ ] HTTPS everywhere
- [ ] API key encryption at rest
- [ ] Rate limiting per customer
- [ ] Input sanitization
- [ ] SQL injection protection
- [ ] XSS prevention
- [ ] CORS configuration
- [ ] Authentication tokens (JWT)
- [ ] Session management
- [ ] Audit logging

---

## 🛠️ Tech Stack (Simplified - No React!)

### Frontend
- **Landing Page (clipchat.com)**: HTML + TailwindCSS (via CDN)
- **Dashboard (app.clipchat.com)**: HTML + Alpine.js + TailwindCSS
- **Widget**: Vanilla JS (no framework deps)
- **Why?**: Simple, fast, no build step, easy to maintain

### Backend
- **API Server**: Cloudflare Workers (Node.js runtime)
- **Database + Auth**: Supabase (PostgreSQL + Auth + Storage)
- **Why?**: Handles auth, database, AND file storage in one service

### Infrastructure
- **CDN**: Cloudflare (Pages + Workers + R2 Storage)
- **Video Hosting**: Cloudflare R2 (S3-compatible, cheap)
- **AI APIs**: OpenAI GPT-4, Anthropic Claude
- **Payments**: Stripe

### DevOps
- **GitHub**: Repository hosting
- **CI/CD**: GitHub Actions or manual deploy
- **Monitoring**: Cloudflare Analytics
- **Error Tracking**: Console logs for now

### Why This Stack?
| Feature | Old Stack | New Stack |
|---------|-----------|-----------|
| Learning curve | Steep (React) | Easy (HTML/JS) |
| Build step | Complex (Node/Webpack) | None (direct deploy) |
| Auth | Separate service | Built into Supabase |
| Storage | Separate S3 | Built into Supabase |
| Cost | $50+/mo | <$10/mo |
| Dev speed | Slower | Faster |

---

## 📊 Development Timeline

### Week 1-2: MVP Foundation
| Day | Tasks |
|-----|-------|
| 1-2 | Set up project repo, CI/CD pipeline |
| 3-4 | Build dashboard UI (React + Tailwind) |
| 5-6 | Implement authentication |
| 7-8 | Create video upload system |

### Week 3-4: AI Integration
| Day | Tasks |
|-----|-------|
| 9-10 | Set up Cloudflare Workers |
| 11-12 | Build OpenAI API integration |
| 13-14 | Add chat history storage |
| 15 | Test end-to-end flow |

### Week 5-8: Polish & Growth
| Day | Tasks |
|-----|-------|
| 16-20 | Analytics dashboard |
| 21-24 | Custom theming |
| 25-28 | Webhooks & integrations |
| 29-32 | Performance optimization |

### Week 9-12: Enterprise
| Day | Tasks |
|-----|-------|
| 33-36 | White-label features |
| 37-40 | Team accounts |
| 41-44 | A/B testing |
| 45-48 | Launch prep |

---

## 🎯 Success Metrics

### Launch Metrics
- [ ] 10 paying customers in first month
- [ ] < 100ms widget load time
- [ ] 99.9% uptime
- [ ] < 2s AI response time
- [ ] NPS score > 50

### Growth Metrics
- [ ] $10K MRR by month 3
- [ ] 50+ active customers by month 6
- [ ] < 5% churn rate
- [ ] 100+ chat conversations per customer/month

---

## 📝 Next Steps (Immediate Actions)

### 1. Create GitHub Issues
- [ ] Set up issue templates
- [ ] Create milestones for each phase
- [ ] Add tasks for MVP

### 2. Development Setup
- [ ] Set up Cloudflare account
- [ ] Create staging environment
- [ ] Configure Stripe (test mode)
- [ ] Set up Supabase project

### 3. MVP Priorities
1. Customer dashboard (settings only)
2. Video upload to R2/S3
3. API key storage (encrypted)
4. Embed code generation
5. Basic widget with demo responses

---

## 💡 Key Differentiators

1. **Video First** - Unlike text-only chatbots, we start with engaging video
2. **Simple Embed** - Single script tag, no coding required
3. **AI Native** - Built for LLMs from day one
4. **Fast & Light** - Vanilla JS widget, no framework bloat
5. **Affordable** - Competitive pricing for small businesses

---

## 🤝 Contributing

This is a proprietary project. For questions or partnership opportunities, contact the owner.

---

**Document Version:** 1.0  
**Last Updated:** 2026-02-08  
**Status:** Planning Complete - Ready for Development
