/* ==========================================================================
   AceeStats Application Engine & State Controller
   Implements persistent client-side relational storage (MockDB)
   and simulated RESTful API router matching sdd.md specifications.
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  
  // ------------------------------------------------------------------------
  // 1. Mock DB Engine (Persistent client-side Relational Model via localStorage)
  // ------------------------------------------------------------------------
  const MOCK_ORGS = [
    { id: 1, name: "Student Council", category: "Student Government", description: "The governing body representing student interests and organizing school-wide campaigns.", logo_url: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=150&q=80" },
    { id: 2, name: "Debate Society", category: "Academic Clubs", description: "Fostering critical thinking, public speaking, and competitive debate excellence.", logo_url: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?auto=format&fit=crop&w=150&q=80" },
    { id: 3, name: "Science & Robotics Club", category: "Academic Clubs", description: "Hands-on engineering, coding microcontrollers, and building competitive bots.", logo_url: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=150&q=80" },
    { id: 4, name: "Performing Arts Collective", category: "Arts & Culture", description: "Connecting dancers, musicians, painters, and actors for creative showcases.", logo_url: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=150&q=80" },
    { id: 5, name: "Green Earth Coalition", category: "Community Service", description: "Advocating for campus environmental sustainability and community recycling initiatives.", logo_url: "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?auto=format&fit=crop&w=150&q=80" }
  ];

  const MOCK_FRIENDS = [
    { id: 101, username: "sarah_jennings", name: "Sarah Jennings", avatar_url: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&q=80", status: "online", statusText: "Active Logger" },
    { id: 102, username: "alex_mercer", name: "Alex Mercer", avatar_url: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80", status: "active-logger", statusText: "Just Logged" },
    { id: 103, username: "carlos_ruiz", name: "Carlos Ruiz", avatar_url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80", status: "online", statusText: "Online" },
    { id: 104, username: "aisha_patel", name: "Aisha Patel", avatar_url: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80", status: "offline", statusText: "Offline" },
    { id: 105, username: "marcus_vance", name: "Marcus Vance", avatar_url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80", status: "online", statusText: "Online" }
  ];

  const MOCK_ACTIVITIES = [
    {
      id: 201,
      user_id: 101, // Sarah
      organization_id: 2, // Debate
      title: "Championship Finals Moderator",
      description: "Moderated the junior debate finals. Keeping track of prep times and introducing speakers was a fast-paced but rewarding experience.",
      category: "Academic Clubs",
      activity_date: "2026-05-18",
      rating: 5,
      image_url: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=600&q=80"
    },
    {
      id: 202,
      user_id: 102, // Alex
      organization_id: 3, // Robotics
      title: "Printed Circuit Board Soldering",
      description: "Completed soldering our custom power controller shield for the autonomous chassis. Everything powered on successfully during testing!",
      category: "Academic Clubs",
      activity_date: "2026-05-20",
      rating: 5,
      image_url: "https://images.unsplash.com/photo-1581092334651-ddf26d9aae9d?auto=format&fit=crop&w=600&q=80"
    },
    {
      id: 203,
      user_id: 103, // Carlos
      organization_id: 4, // Arts Collective
      title: "Jazz Ensemble Bassist Practice",
      description: "Practiced standard walk patterns on upright bass for our upcoming performance night. Got through our 4 key setlists perfectly.",
      category: "Arts & Culture",
      activity_date: "2026-05-21",
      rating: 4,
      image_url: "https://images.unsplash.com/photo-1511192336575-5a79af67a629?auto=format&fit=crop&w=600&q=80"
    },
    {
      id: 204,
      user_id: 101, // Sarah
      organization_id: 1, // Student Council
      title: "School Dance Decorating Committee",
      description: "Spent 4 hours hanging streamers and assembling balloon structures. Hard physical work but the gymnasium layout looks spectacular.",
      category: "Student Government",
      activity_date: "2026-05-15",
      rating: 4,
      image_url: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=600&q=80"
    },
    {
      id: 205,
      user_id: 105, // Marcus
      organization_id: 5, // Green Earth
      title: "Campus Tree Planting Event",
      description: "Coordinated volunteers to plant 15 saplings in the west fields. Great collaboration with local nurseries and volunteers.",
      category: "Community Service",
      activity_date: "2026-05-22",
      rating: 5,
      image_url: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=600&q=80"
    }
  ];

  class MockDatabase {
    constructor() {
      this.init();
    }

    init() {
      const CURRENT_VERSION = 'v2.3';
      const storedVersion = localStorage.getItem('acee_db_version');

      // Schema/content auto-update block: clear stale localStorage cache to force clean reload of working images
      if (storedVersion !== CURRENT_VERSION) {
        localStorage.removeItem('acee_user');
        localStorage.removeItem('acee_orgs');
        localStorage.removeItem('acee_friends');
        localStorage.removeItem('acee_activities');
        localStorage.removeItem('acee_interests');
        localStorage.setItem('acee_db_version', CURRENT_VERSION);
      }

      if (!localStorage.getItem('acee_user')) {
        localStorage.setItem('acee_user', JSON.stringify({
          id: 100, // Current user
          username: "ethan_sterling",
          name: "Ethan Sterling",
          avatar_url: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=150&q=80",
          bio: "Extracurricular enthusiast focused on academic science research, community organization, and technology builds."
        }));
      }

      if (!localStorage.getItem('acee_orgs')) {
        localStorage.setItem('acee_orgs', JSON.stringify(MOCK_ORGS));
      }

      if (!localStorage.getItem('acee_friends')) {
        localStorage.setItem('acee_friends', JSON.stringify(MOCK_FRIENDS));
      }

      if (!localStorage.getItem('acee_activities')) {
        // Seed default user logs alongside friend logs
        const seedActivities = [
          ...MOCK_ACTIVITIES,
          {
            id: 301,
            user_id: 100,
            organization_id: 3, // Robotics
            title: "Autonomous Pathing Calibration",
            description: "Spent the afternoon tweaking PID controllers on our rover chassis. Finally achieved smooth line tracking with zero oscillation!",
            category: "Academic Clubs",
            activity_date: "2026-05-19",
            rating: 5,
            image_url: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=600&q=80"
          },
          {
            id: 302,
            user_id: 100,
            organization_id: 1, // Student Council
            title: "Hosted Student Activity Council",
            description: "Chaired our bi-weekly activity council meeting. Successfully aligned schedule dates for the upcoming club fair next month.",
            category: "Student Government",
            activity_date: "2026-05-22",
            rating: 4,
            image_url: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=600&q=80"
          },
          {
            id: 303,
            user_id: 100,
            organization_id: 5, // Green Earth
            title: "Composting Station Setup",
            description: "Installed our first multi-bin organic composting setup behind the campus dining hall. Walked kitchen staff through disposal sorting.",
            category: "Community Service",
            activity_date: "2026-05-10",
            rating: 5,
            image_url: "https://images.unsplash.com/photo-1530587191325-3db32d826c18?auto=format&fit=crop&w=600&q=80"
          },
          {
            id: 304,
            user_id: 100,
            organization_id: 2, // Debate
            title: "Mock Mock-Trial Debate Match",
            description: "Faced senior debaters in a mock courtroom setup representing environmental compliance policies. Tough opponent but learned a ton on defense arguments.",
            category: "Academic Clubs",
            activity_date: "2026-05-14",
            rating: 3,
            image_url: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=600&q=80"
          }
        ];
        localStorage.setItem('acee_activities', JSON.stringify(seedActivities));
      }

      if (!localStorage.getItem('acee_interests')) {
        // Seed default expressed interests for trending logic (user expressed interest in debate & science)
        localStorage.setItem('acee_interests', JSON.stringify([
          { user_id: 100, organization_id: 2 },
          { user_id: 100, organization_id: 3 },
          { user_id: 101, organization_id: 1 },
          { user_id: 102, organization_id: 3 },
          { user_id: 103, organization_id: 4 },
          { user_id: 104, organization_id: 5 },
          { user_id: 105, organization_id: 5 }
        ]));
      }
    }

    // Relational select helper
    get(key) {
      return JSON.parse(localStorage.getItem(key));
    }

    // Relational save helper
    set(key, data) {
      localStorage.setItem(key, JSON.stringify(data));
    }
  }

  const db = new MockDatabase();

  // ------------------------------------------------------------------------
  // 2. Simulated REST API Router (Async network delays returning relational JSON)
  // ------------------------------------------------------------------------
  class API {
    static async request(callback) {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(callback());
        }, 150); // Authentic server-side network delay
      });
    }

    static async getProfile() {
      return this.request(() => {
        const user = db.get('acee_user');
        const activities = db.get('acee_activities').filter(a => a.user_id === user.id);
        
        // Compute ratings breakdown
        const ratingCounts = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
        activities.forEach(a => {
          if (ratingCounts[a.rating] !== undefined) ratingCounts[a.rating]++;
        });

        return { user, activities, ratingCounts };
      });
    }

    static async updateProfile(name, bio, avatarUrl) {
      return this.request(() => {
        const user = db.get('acee_user');
        user.name = name;
        user.bio = bio;
        if (avatarUrl) user.avatar_url = avatarUrl;
        db.set('acee_user', user);
        return { success: true, user };
      });
    }

    static async getOrganizations() {
      return this.request(() => db.get('acee_orgs'));
    }

    static async getActivities() {
      return this.request(() => {
        const user = db.get('acee_user');
        return db.get('acee_activities').filter(a => a.user_id === user.id);
      });
    }

    static async createActivity(title, orgId, category, date, rating, description, imageUrl) {
      return this.request(() => {
        const user = db.get('acee_user');
        const activities = db.get('acee_activities');
        const newLog = {
          id: Date.now(),
          user_id: user.id,
          organization_id: parseInt(orgId),
          title,
          description,
          category,
          activity_date: date,
          rating: parseInt(rating),
          image_url: imageUrl || "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80"
        };
        activities.push(newLog);
        db.set('acee_activities', activities);
        return { success: true, activity: newLog };
      });
    }

    static async getFriends() {
      return this.request(() => db.get('acee_friends'));
    }

    static async getSocialFeed() {
      return this.request(() => {
        const activities = db.get('acee_activities');
        const friends = db.get('acee_friends');
        const orgs = db.get('acee_orgs');
        const user = db.get('acee_user');

        // Compile feed chronologically. Maps author details and org tags.
        return activities.map(act => {
          let author = null;
          if (act.user_id === user.id) {
            author = { ...user, isSelf: true };
          } else {
            author = friends.find(f => f.id === act.user_id) || { name: "Classmate", avatar_url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80" };
          }
          const org = orgs.find(o => o.id === act.organization_id) || { name: "Extracurricular" };

          return { ...act, author, org };
        }).sort((a, b) => new Date(b.activity_date) - new Date(a.activity_date));
      });
    }

    static async getTrendingOrganizations() {
      return this.request(() => {
        const orgs = db.get('acee_orgs');
        const activities = db.get('acee_activities');
        const interests = db.get('acee_interests');
        const user = db.get('acee_user');

        return orgs.map(org => {
          const orgActivities = activities.filter(a => a.organization_id === org.id);
          const orgInterests = interests.filter(i => i.organization_id === org.id);
          const isInterested = interests.some(i => i.organization_id === org.id && i.user_id === user.id);
          
          // SDD formula: logs * 2 + interests
          const engagementScore = (orgActivities.length * 2) + orgInterests.length;

          return {
            ...org,
            total_activities: orgActivities.length,
            total_interested_students: orgInterests.length,
            engagement_score: engagementScore,
            is_user_interested: isInterested
          };
        }).sort((a, b) => b.engagement_score - a.engagement_score);
      });
    }

    static async toggleOrganizationInterest(orgId) {
      return this.request(() => {
        const user = db.get('acee_user');
        let interests = db.get('acee_interests');
        const existsIndex = interests.findIndex(i => i.organization_id === parseInt(orgId) && i.user_id === user.id);

        let activeState = false;
        if (existsIndex > -1) {
          interests.splice(existsIndex, 1);
          activeState = false;
        } else {
          interests.push({ user_id: user.id, organization_id: parseInt(orgId) });
          activeState = true;
        }

        db.set('acee_interests', interests);
        return { success: true, is_user_interested: activeState };
      });
    }
  }

  // ------------------------------------------------------------------------
  // 3. View Switcher Controller (SPA dynamic DOM controller)
  // ------------------------------------------------------------------------
  class ViewController {
    constructor() {
      this.navItems = document.querySelectorAll('.navbar .nav-item');
      this.views = document.querySelectorAll('.view-wrapper .app-view');
      this.currentView = 'log';
      this.init();
    }

    init() {
      // Bind navbar click actions
      this.navItems.forEach(item => {
        item.addEventListener('click', () => {
          const viewName = item.getAttribute('data-view');
          this.switchView(viewName);
        });
      });

      // Quicklinks triggers
      document.querySelectorAll('.quicklink-item').forEach(item => {
        item.addEventListener('click', () => {
          const action = item.getAttribute('data-action');
          this.switchView(action);
        });
      });

      // Boot first load view
      this.switchView('log');
    }

    switchView(viewName) {
      this.currentView = viewName;

      // Update Nav active indicator
      this.navItems.forEach(item => {
        if (item.getAttribute('data-view') === viewName) {
          item.classList.add('active');
        } else {
          item.classList.remove('active');
        }
      });

      // Update active view shell
      this.views.forEach(view => {
        if (view.id === `${viewName}-view`) {
          view.classList.add('active');
        } else {
          view.classList.remove('active');
        }
      });

      // Trigger respective API loads dynamically to refresh states
      if (viewName === 'profile') this.renderProfileView();
      if (viewName === 'feed') this.renderFeedView();
      if (viewName === 'trending') this.renderTrendingView();
      if (viewName === 'log') this.populateLogOrgs();
    }

    // View Populators
    async populateLogOrgs() {
      const orgsSelect = document.getElementById('log-org');
      if (!orgsSelect) return;
      orgsSelect.innerHTML = '<option value="" disabled selected>Choose a Host Club...</option>';
      const orgs = await API.getOrganizations();
      orgs.forEach(o => {
        const opt = document.createElement('option');
        opt.value = o.id;
        opt.textContent = `${o.name} (${o.category})`;
        orgsSelect.appendChild(opt);
      });
    }

    async renderProfileView() {
      const data = await API.getProfile();
      if (!data) return;

      // Bind metadata details
      document.getElementById('user-avatar').src = data.user.avatar_url;
      document.getElementById('user-display-name').textContent = data.user.name;
      document.getElementById('user-bio-text').textContent = data.user.bio;

      // Render star rating progress bars
      const barsContainer = document.getElementById('breakdown-bars-container');
      if (barsContainer) {
        barsContainer.innerHTML = '';
        const totalLogs = data.activities.length;
        
        // Loop stars from 5 down to 1
        for (let star = 5; star >= 1; star--) {
          const count = data.ratingCounts[star] || 0;
          const pct = totalLogs > 0 ? (count / totalLogs) * 100 : 0;
          
          const row = document.createElement('div');
          row.className = 'rating-row';
          row.innerHTML = `
            <span class="rating-label">${star} ★</span>
            <div class="progress-bar-bg">
              <div class="progress-bar-fill" style="width: 0%"></div>
            </div>
            <span class="rating-count">${count}</span>
          `;
          barsContainer.appendChild(row);

          // Force micro-stagger render trigger for dynamic fill animation
          setTimeout(() => {
            row.querySelector('.progress-bar-fill').style.width = `${pct}%`;
          }, 50);
        }
      }

      // Render Top 4 Favorites (Activities with highest rating)
      const favoritesGrid = document.getElementById('favorites-grid-container');
      if (favoritesGrid) {
        favoritesGrid.innerHTML = '';
        const orgs = await API.getOrganizations();

        // Sort by highest rating, then date. Take top 4.
        const favs = [...data.activities]
          .sort((a, b) => b.rating - a.rating || new Date(b.activity_date) - new Date(a.activity_date))
          .slice(0, 4);

        if (favs.length === 0) {
          favoritesGrid.innerHTML = `
            <div style="grid-column: span 2; padding: 24px; text-align: center; color: var(--text-muted); font-size:14px; font-weight:600;">
              No activities logged yet! Log your first high-rated activity to highlight it here.
            </div>`;
        } else {
          favs.forEach(f => {
            const org = orgs.find(o => o.id === f.organization_id) || { name: "Extracurricular" };
            
            // Build star indicators
            let starsHTML = '';
            for (let i = 0; i < f.rating; i++) {
              starsHTML += `<svg viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>`;
            }

            const card = document.createElement('div');
            card.className = 'favorite-card';
            card.innerHTML = `
              <img class="favorite-card-bg" src="${f.image_url}" alt="Favorite background">
              <div class="favorite-card-overlay">
                <span class="favorite-card-org">${org.name}</span>
                <h4 class="favorite-card-title">${f.title}</h4>
                <div class="favorite-card-rating">${starsHTML}</div>
              </div>
            `;
            favoritesGrid.appendChild(card);
          });
        }
      }

      // Render archive timeline
      const timeline = document.getElementById('personal-timeline-container');
      if (timeline) {
        timeline.innerHTML = '';
        const orgs = await API.getOrganizations();
        
        // Sort user logs chronologically
        const archive = [...data.activities].sort((a,b) => new Date(b.activity_date) - new Date(a.activity_date));

        if (archive.length === 0) {
          timeline.innerHTML = `
            <div style="padding: 12px; text-align: center; color: var(--text-muted); font-size:14px; font-weight:600;">
              No archived timeline logs found.
            </div>`;
        } else {
          archive.forEach(log => {
            const org = orgs.find(o => o.id === log.organization_id) || { name: "Extracurricular" };
            
            let starsHTML = '';
            for (let i = 0; i < log.rating; i++) {
              starsHTML += `<svg viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>`;
            }

            const item = document.createElement('div');
            item.className = 'timeline-item';
            item.innerHTML = `
              <div class="timeline-card">
                <div class="timeline-info">
                  <h4 class="timeline-title">${log.title}</h4>
                  <span class="timeline-meta">${org.name} • ${log.category} • ${log.activity_date}</span>
                </div>
                <div class="timeline-rating">${starsHTML}</div>
              </div>
            `;
            timeline.appendChild(item);
          });
        }
      }
    }

    async renderFeedView() {
      const feedContainer = document.getElementById('social-feed-container');
      const friendsContainer = document.getElementById('friends-list-container');
      if (!feedContainer || !friendsContainer) return;

      // Populate Classmates sidebar
      const friends = await API.getFriends();
      friendsContainer.innerHTML = '';
      friends.forEach(f => {
        const item = document.createElement('div');
        item.className = 'directory-item';
        item.innerHTML = `
          <div class="avatar-wrapper">
            <img class="directory-avatar" src="${f.avatar_url}" alt="friend avatar">
            <span class="status-dot ${f.status}"></span>
          </div>
          <div class="directory-info">
            <span class="directory-name">${f.name}</span>
            <span class="directory-status">${f.statusText}</span>
          </div>
        `;
        friendsContainer.appendChild(item);
      });

      // Populate center Activity Stream
      const feed = await API.getSocialFeed();
      feedContainer.innerHTML = '';

      if (feed.length === 0) {
        feedContainer.innerHTML = '<div class="premium-card" style="text-align:center; color:var(--text-muted);">No activity logs on the community scoreboard yet.</div>';
      } else {
        feed.forEach(post => {
          let starsHTML = '';
          for (let i = 0; i < post.rating; i++) {
            starsHTML += `<svg viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>`;
          }

          const card = document.createElement('article');
          card.className = 'premium-card feed-card hover-lift';
          card.innerHTML = `
            <div class="feed-card-header">
              <div class="feed-card-author-info">
                <img class="feed-card-avatar" src="${post.author.avatar_url}" alt="author avatar">
                <div class="feed-card-meta">
                  <span class="feed-card-name">${post.author.name} ${post.author.isSelf ? '<span style="font-weight:normal; font-size:11px; padding:2px 6px; background:var(--accent-light); color:var(--accent-primary); border-radius:10px; margin-left:4px;">You</span>' : ''}</span>
                  <span class="feed-card-org-tag">${post.org.name}</span>
                </div>
              </div>
              <div style="display:flex; flex-direction:column; align-items:flex-end; gap:6px;">
                <span class="feed-card-date">${post.activity_date}</span>
                <div class="feed-card-stars">${starsHTML}</div>
              </div>
            </div>
            
            <div class="feed-card-body">
              <h3 class="feed-card-title">${post.title}</h3>
              <p class="feed-card-desc">${post.description}</p>
              ${post.image_url ? `<img class="feed-card-img" src="${post.image_url}" alt="Activity image proof">` : ''}
            </div>

            <div class="feed-card-footer">
              <div class="reaction-group">
                <button class="btn-reaction" onclick="this.classList.toggle('active')">
                  <span>👏</span>
                  <span style="font-weight:700;">Clap</span>
                </button>
                <button class="btn-reaction" onclick="this.classList.toggle('active')">
                  <span>✊</span>
                  <span style="font-weight:700;">Support</span>
                </button>
              </div>
              <span style="font-size:12px; color:var(--text-muted); font-weight:600;">Category: ${post.category}</span>
            </div>
          `;
          feedContainer.appendChild(card);
        });
      }
    }

    async renderTrendingView() {
      const podiumContainer = document.getElementById('podium-cards-container');
      const scoreboardContainer = document.getElementById('scoreboard-rows-container');
      if (!podiumContainer || !scoreboardContainer) return;

      const rankedOrgs = await API.getTrendingOrganizations();

      // Separate Top 3 from remainder
      const top3 = rankedOrgs.slice(0, 3);
      const remainders = rankedOrgs.slice(3);

      // Render Top 3 Podium
      podiumContainer.innerHTML = '';
      const orderClasses = ['podium-2nd', 'podium-1st', 'podium-3rd'];
      const rankDesignations = [2, 1, 3];
      const rankGolds = ['rank-2', 'rank-1', 'rank-3'];

      // Populate podium by re-ordering array: 2nd place on left, 1st place center, 3rd place right
      const podiumOrder = [top3[1], top3[0], top3[2]]; // maps 2nd, 1st, 3rd
      
      podiumOrder.forEach((org, idx) => {
        if (!org) return; // safety in case fewer than 3 orgs
        
        const rank = rankDesignations[idx];
        const ordClass = orderClasses[idx];
        const goldClass = rankGolds[idx];
        
        const card = document.createElement('div');
        card.className = `podium-card ${ordClass}`;
        card.innerHTML = `
          <div class="podium-rank ${goldClass}">${rank}</div>
          <img class="podium-logo" src="${org.logo_url}" alt="Club Logo">
          <h3 class="podium-title">${org.name}</h3>
          <div class="podium-score">Score: ${org.engagement_score}</div>
          <button class="btn-interest ${org.is_user_interested ? 'active' : ''}" data-id="${org.id}">
            Want to Join
          </button>
          <div style="height: 12px;"></div>
          <div class="podium-stats">
            <div class="podium-stat">
              <span class="podium-stat-val">${org.total_activities}</span>
              <span>Logs</span>
            </div>
            <div class="podium-stat">
              <span class="podium-stat-val">${org.total_interested_students}</span>
              <span>Interest</span>
            </div>
          </div>
        `;
        podiumContainer.appendChild(card);
      });

      // Render remainder list
      scoreboardContainer.innerHTML = '';
      const listToRender = rankedOrgs; // Scoreboard list renders all rows to show comprehensive ranks!

      listToRender.forEach((org, idx) => {
        const row = document.createElement('div');
        row.className = 'scoreboard-row';
        row.style.animationDelay = `${idx * 0.05}s`; // slide stagger effect
        row.innerHTML = `
          <div class="row-left">
            <span class="row-rank">#${idx + 1}</span>
            <img class="row-logo" src="${org.logo_url}" alt="Logo">
            <div class="row-info">
              <span class="row-name">${org.name}</span>
              <span class="row-category">${org.category}</span>
            </div>
          </div>
          <div class="row-right">
            <div class="row-stats">
              <div class="row-stat">
                <span class="row-stat-val">${org.total_activities}</span>
                <span>Logs</span>
              </div>
              <div class="row-stat">
                <span class="row-stat-val">${org.total_interested_students}</span>
                <span>Interested</span>
              </div>
              <div class="row-stat">
                <span class="row-stat-val" style="color:var(--accent-primary);">${org.engagement_score}</span>
                <span>Rank Score</span>
              </div>
            </div>
            <button class="btn-interest ${org.is_user_interested ? 'active' : ''}" data-id="${org.id}">
              Want to Join
            </button>
          </div>
        `;
        scoreboardContainer.appendChild(row);
      });

      // Bind dynamic interest toggle events
      document.querySelectorAll('.btn-interest').forEach(btn => {
        btn.addEventListener('click', async (e) => {
          e.stopPropagation();
          const orgId = btn.getAttribute('data-id');
          
          // Trigger API toggle
          const res = await API.toggleOrganizationInterest(orgId);
          
          // Re-render trending board dynamically so cards move places based on recalculated scores
          this.renderTrendingView();
        });
      });
    }
  }

  // ------------------------------------------------------------------------
  // 4. Form Submission & Input Controllers
  // ------------------------------------------------------------------------
  class FormController {
    constructor(viewController) {
      this.viewController = viewController;
      this.currentRating = 0;
      this.selectedImageBase64 = '';
      this.init();
    }

    init() {
      // Star selection trigger
      const stars = document.querySelectorAll('#star-input-group svg');
      const starDesc = document.getElementById('star-desc-text');
      
      const ratingDescs = {
        5: "Excellent! Unparalleled learning and fun",
        4: "Very good involvement and value",
        3: "Good experience, average involvement",
        2: "Fair experience, could have been better",
        1: "Low satisfaction or minimal involvement"
      };

      stars.forEach(star => {
        star.addEventListener('click', () => {
          const val = parseInt(star.getAttribute('data-val'));
          this.currentRating = val;
          
          // Remove selected class from all
          stars.forEach(s => s.classList.remove('selected'));
          
          // Add selected class to chosen star and its backward siblings
          star.classList.add('selected');
          starDesc.textContent = ratingDescs[val];
          starDesc.style.color = 'var(--text-main)';
        });
      });

      // Drag and Drop / Image Upload trigger
      const imgInput = document.getElementById('log-image');
      const imgPreview = document.getElementById('image-upload-preview');
      const dropZone = document.querySelector('.image-upload-wrapper');

      if (imgInput) {
        imgInput.addEventListener('change', (e) => {
          const file = e.target.files[0];
          if (file) this.processImageFile(file, imgPreview);
        });
      }

      // Submit Log form action
      const logForm = document.getElementById('activity-log-form');
      if (logForm) {
        logForm.addEventListener('submit', async (e) => {
          e.preventDefault();

          const title = document.getElementById('log-title').value.trim();
          const orgId = document.getElementById('log-org').value;
          const category = document.getElementById('log-category').value;
          const date = document.getElementById('log-date').value;
          const desc = document.getElementById('log-desc').value.trim();

          if (!orgId) {
            alert("Please select a Host Club/Organization.");
            return;
          }
          if (this.currentRating === 0) {
            alert("Please choose a rating score.");
            return;
          }

          // Trigger API call
          const res = await API.createActivity(
            title, 
            orgId, 
            category, 
            date, 
            this.currentRating, 
            desc, 
            this.selectedImageBase64
          );

          if (res.success) {
            alert("Activity successfully logged and shared to the community feed!");
            
            // Reset form elements
            logForm.reset();
            this.currentRating = 0;
            this.selectedImageBase64 = '';
            imgPreview.style.display = 'none';
            imgPreview.src = '';
            stars.forEach(s => s.classList.remove('selected'));
            starDesc.textContent = "Select a rating";
            starDesc.style.color = "var(--text-muted)";

            // Redirect smoothly to social feed page to reveal published post
            this.viewController.switchView('feed');
          }
        });
      }

      // Edit Profile Modal handlers
      const openModalBtn = document.getElementById('open-edit-modal-btn');
      const modal = document.getElementById('edit-profile-modal');
      const closeModalBtn = document.getElementById('close-modal-btn');
      const cancelModalBtn = document.getElementById('cancel-edit-btn');
      const editProfileForm = document.getElementById('edit-profile-form');

      if (openModalBtn && modal) {
        openModalBtn.addEventListener('click', async () => {
          const user = db.get('acee_user');
          document.getElementById('edit-display-name').value = user.name;
          document.getElementById('edit-bio').value = user.bio;
          document.getElementById('edit-avatar').value = user.avatar_url;
          
          modal.style.display = 'flex';
        });

        const closeModal = () => { modal.style.display = 'none'; };
        closeModalBtn.addEventListener('click', closeModal);
        cancelModalBtn.addEventListener('click', closeModal);

        editProfileForm.addEventListener('submit', async (e) => {
          e.preventDefault();
          const name = document.getElementById('edit-display-name').value.trim();
          const bio = document.getElementById('edit-bio').value.trim();
          const avatar = document.getElementById('edit-avatar').value.trim();

          const res = await API.updateProfile(name, bio, avatar);
          if (res.success) {
            closeModal();
            this.viewController.renderProfileView(); // Update profile page layout reactive-ly
          }
        });
      }
    }

    processImageFile(file, previewElement) {
      if (!file.type.match('image.*')) {
        alert("Attached file is not a valid image format.");
        return;
      }

      const reader = new FileReader();
      reader.onload = (event) => {
        this.selectedImageBase64 = event.target.result;
        previewElement.src = event.target.result;
        previewElement.style.display = 'block';
      };
      reader.readAsDataURL(file);
    }
  }

  // ------------------------------------------------------------------------
  // 5. Global Theme Selector (Synchronizes and persists light vs dark mode)
  // ------------------------------------------------------------------------
  class ThemeController {
    constructor() {
      this.toggleBtn = document.getElementById('theme-toggle-btn');
      this.init();
    }

    init() {
      // Check stored choice or system theme preference
      const savedTheme = localStorage.getItem('acee_theme');
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      
      if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
        this.applyTheme('dark');
      } else {
        this.applyTheme('light');
      }

      if (this.toggleBtn) {
        this.toggleBtn.addEventListener('click', () => {
          const currentTheme = document.body.getAttribute('data-theme');
          const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
          this.applyTheme(nextTheme);
        });
      }
    }

    applyTheme(theme) {
      if (theme === 'dark') {
        document.body.setAttribute('data-theme', 'dark');
        localStorage.setItem('acee_theme', 'dark');
        if (this.toggleBtn) {
          this.toggleBtn.innerHTML = `
            <!-- Moon Icon -->
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></svg>
          `;
        }
      } else {
        document.body.removeAttribute('data-theme');
        localStorage.setItem('acee_theme', 'light');
        if (this.toggleBtn) {
          this.toggleBtn.innerHTML = `
            <!-- Sun Icon -->
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>
          `;
        }
      }
    }
  }

  // ------------------------------------------------------------------------
  // 6. Application Instantiation
  // ------------------------------------------------------------------------
  const themeController = new ThemeController();
  const viewController = new ViewController();
  const formController = new FormController(viewController);

});
