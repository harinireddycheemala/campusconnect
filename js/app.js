// CampusConnect — prototype app logic (no framework, no build step).

const root = document.getElementById("view-root");
const railLinks = document.querySelectorAll(".rail-link");
const searchInput = document.getElementById("global-search");

const state = {
  view: "home",
  connectState: {},   // name -> "Connect" | "Pending" | "Connected"
  eventState: {},     // title -> boolean registered
  joinState: {},      // project name -> boolean requested
  communityState: {}, // community name -> "Join" | "Requested" | "Member"
  query: ""
};
// ---------- Supabase Authentication ----------
let currentSession = null;
let currentProfile = null;

async function loadAuthSession() {
  const { data: { session } } = await supabase.auth.getSession();

  currentSession = session;

  if (session?.user) {
    await loadProfile(session.user);
  }

  updateAuthButton();
}

async function loadProfile(user) {
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .maybeSingle();

  if (error) {
    console.error("Profile loading error:", error);
    return;
  }

  currentProfile = data;

  // Update existing demo user data with logged-in user's profile
  if (data && DATA.currentUser) {
    DATA.currentUser.name = data.name || user.email.split("@")[0];
    DATA.currentUser.email = data.email || user.email;
    DATA.currentUser.dept = data.course || "Student";
    DATA.currentUser.year = data.year || "";
    DATA.currentUser.bio = data.bio || "";
    DATA.currentUser.skills = data.skills || [];
    DATA.currentUser.interests = data.interests || [];
  }
}

async function createProfileIfNeeded(user, name, course, year) {
  const { data: existing } = await supabase
    .from("profiles")
    .select("id")
    .eq("id", user.id)
    .maybeSingle();

  if (existing) return;

  const { error } = await supabase
    .from("profiles")
    .insert({
      id: user.id,
      name: name,
      email: user.email,
      course: course,
      year: year,
      bio: "",
      skills: [],
      interests: []
    });

  if (error) {
    console.error("Profile creation error:", error);
  }
}

async function registerUser(name, email, password, course, year) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password
  });

  if (error) {
    alert(error.message);
    return;
  }

  if (data.user && data.session) {
    await createProfileIfNeeded(data.user, name, course, year);
    await loadAuthSession();

    closeModal();
    alert("Registration successful!");
    render();
  } else {
    alert(
      "Registration successful! Please check your email to verify your account, then log in."
    );
    closeModal();
  }
}

async function loginUser(email, password) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  });

  if (error) {
    alert(error.message);
    return;
  }

  currentSession = data.session;

  if (data.user) {
    await loadProfile(data.user);
  }

  closeModal();
  updateAuthButton();
  render();

  alert("Login successful!");
}

async function logoutUser() {
  await supabase.auth.signOut();

  currentSession = null;
  currentProfile = null;

  alert("Logged out successfully.");
  updateAuthButton();
  render();
}

function updateAuthButton() {
  let authBtn = document.getElementById("campus-auth-btn");

  if (!authBtn) {
    authBtn = document.createElement("button");
    authBtn.id = "campus-auth-btn";
    authBtn.className = "btn-outline";

    const createBtn = document.getElementById("btn-create");

    if (createBtn && createBtn.parentElement) {
      createBtn.parentElement.insertBefore(authBtn, createBtn);
    } else {
      document.body.appendChild(authBtn);
    }
  }

  if (currentSession?.user) {
    authBtn.textContent = "Logout";
    authBtn.onclick = logoutUser;
  } else {
    authBtn.textContent = "Login";
    authBtn.onclick = openAuthModal;
  }
}

function openAuthModal() {
  box.innerHTML = `
    <div class="modal-head">
      <h2>Login to CampusConnect</h2>
      <button class="modal-close" id="modal-close">&times;</button>
    </div>

    <p class="modal-sub">
      Connect with students, discover events and build together.
    </p>

    <form id="login-form">

      <label class="form-label">Email</label>
      <input
        id="login-email"
        type="email"
        placeholder="your@email.com"
        required
      >

      <label class="form-label">Password</label>
      <input
        id="login-password"
        type="password"
        placeholder="Password"
        required
      >

      <button class="btn-solid" type="submit">
        Login
      </button>

    </form>

    <p class="auth-switch">
      Don't have an account?
      <button class="link-btn" id="show-register">
        Register
      </button>
    </p>
  `;

  veil.classList.add("is-open");

  document
    .getElementById("modal-close")
    .addEventListener("click", closeModal);

  document
    .getElementById("login-form")
    .addEventListener("submit", async (e) => {
      e.preventDefault();

      const email = document.getElementById("login-email").value.trim();
      const password = document.getElementById("login-password").value;

      await loginUser(email, password);
    });

  document
    .getElementById("show-register")
    .addEventListener("click", openRegisterModal);
}

function openRegisterModal() {
  box.innerHTML = `
    <div class="modal-head">
      <h2>Create your account</h2>
      <button class="modal-close" id="modal-close">&times;</button>
    </div>

    <p class="modal-sub">
      Join your campus community.
    </p>

    <form id="register-form">

      <label class="form-label">Full Name</label>
      <input
        id="register-name"
        type="text"
        placeholder="Your full name"
        required
      >

      <label class="form-label">Email</label>
      <input
        id="register-email"
        type="email"
        placeholder="your@email.com"
        required
      >

      <label class="form-label">Password</label>
      <input
        id="register-password"
        type="password"
        placeholder="Minimum 6 characters"
        minlength="6"
        required
      >

      <label class="form-label">Course</label>
      <input
        id="register-course"
        type="text"
        placeholder="e.g. Computer Science"
        required
      >

      <label class="form-label">Year</label>
      <select id="register-year" required>
        <option value="">Select year</option>
        <option value="1st Year">1st Year</option>
        <option value="2nd Year">2nd Year</option>
        <option value="3rd Year">3rd Year</option>
        <option value="4th Year">4th Year</option>
      </select>

      <button class="btn-solid" type="submit">
        Create Account
      </button>

    </form>

    <p class="auth-switch">
      Already have an account?
      <button class="link-btn" id="show-login">
        Login
      </button>
    </p>
  `;

  veil.classList.add("is-open");

  document
    .getElementById("modal-close")
    .addEventListener("click", closeModal);

  document
    .getElementById("register-form")
    .addEventListener("submit", async (e) => {
      e.preventDefault();

      const name = document.getElementById("register-name").value.trim();
      const email = document.getElementById("register-email").value.trim();
      const password = document.getElementById("register-password").value;
      const course = document.getElementById("register-course").value.trim();
      const year = document.getElementById("register-year").value;

      await registerUser(
        name,
        email,
        password,
        course,
        year
      );
    });

  document
    .getElementById("show-login")
    .addEventListener("click", openAuthModal);
}
DATA.people.forEach(p => state.connectState[p.name] = "Connect");
DATA.communities.forEach(c => state.communityState[c.name] = c.role ? "Member" : "Join");

function iconFor(type) {
  const icons = {
    event: "📌", opportunity: "🎯", project: "🧩",
    achievement: "🏆", poll: "🗳️", announcement: "📢"
  };
  return icons[type] || "•";
}

// ---------- View: Home ----------
function viewHome() {
  const cards = DATA.feed.map(item => `
    <article class="feed-card feed-card--${item.type}">
      <div class="feed-card-head">
        <span class="feed-glyph">${iconFor(item.type)}</span>
        <div>
          <div class="feed-source">${item.community}</div>
          <div class="feed-time">${item.time}</div>
        </div>
        ${item.type === "announcement" ? '<span class="tag tag--official">Official</span>' : ""}
      </div>
      <h3 class="feed-title">${item.title}</h3>
      <p class="feed-body">${item.body}</p>
      <div class="feed-meta">${item.meta}</div>
      <div class="feed-foot">
        <span class="feed-stat">${item.stat}</span>
        <div class="feed-actions">
          <button class="link-btn">Interested</button>
          <button class="link-btn">Comment</button>
          <button class="link-btn">Share</button>
        </div>
      </div>
    </article>
  `).join("");

  return `
    <section class="view">
      <div class="view-head">
        <p class="eyebrow-free">Tuesday · your campus, at a glance</p>
        <h1 class="view-title">Everything happening around you</h1>
      </div>

      <div class="quick-row">
        <button class="quick-btn" data-view="discover">Find people</button>
        <button class="quick-btn" data-view="events">Explore events</button>
        <button class="quick-btn" data-view="opportunities">Find opportunities</button>
        <button class="quick-btn" data-view="projects">Find a team</button>
      </div>

      <div class="feed-col">${cards}</div>
    </section>
  `;
}

// ---------- View: Discover (people) ----------
function viewDiscover() {
  const list = DATA.people.filter(matchesQuery).map(p => `
    <article class="person-card">
      <div class="person-id">
        <div class="person-avatar">${initials(p.name)}</div>
        <div>
          <h3 class="person-name">${p.name}</h3>
          <p class="person-dept">${p.dept} · ${p.year}</p>
        </div>
      </div>
      <div class="chip-row">${p.skills.map(s => `<span class="chip">${s}</span>`).join("")}</div>
      <p class="person-match">${p.match}</p>
      <button class="btn-outline btn-connect" data-name="${p.name}">${state.connectState[p.name]}</button>
    </article>
  `).join("") || emptyState("No students match that search yet.");

  return `
    <section class="view">
      <div class="view-head">
        <p class="eyebrow-free">People discovery</p>
        <h1 class="view-title">Find your next teammate</h1>
        <p class="view-sub">Matched by skills, interests and what you're building — not follower counts.</p>
      </div>
      <div class="grid grid--people">${list}</div>
    </section>
  `;
}

async function viewEvents() {
  const { data: events, error } = await supabase
    .from("events")
    .select("*")
    .order("event_date", { ascending: true });

  if (error) {
    console.error("Events loading error:", error);
    return `
      <section class="view">
        <div class="view-head">
          <p class="eyebrow-free">Campus events</p>
          <h1 class="view-title">What's on this month</h1>
        </div>
        ${emptyState("Unable to load events right now.")}
      </section>
    `;
  }

  const filteredEvents = (events || []).filter(matchesQuery);

  const list = filteredEvents.map(e => {
    const going = !!state.eventState[e.id];

    return `
      <article class="ticket-card">
        <div class="ticket-main">
          <span class="tag tag--${(e.category || "event").toLowerCase()}">
            ${e.category || "Event"}
          </span>

          <h3 class="ticket-title">${e.title}</h3>

          <p class="ticket-org">
            ${e.organization || ""}
          </p>

          <p class="ticket-when">
            ${e.event_date || ""} ·
            ${e.event_time || ""} ·
            ${e.venue || ""}
          </p>

          <p>${e.description || ""}</p>
        </div>

        <div class="ticket-stub">
          <span class="ticket-mode">
            Capacity: ${e.capacity || 100}
          </span>

          <button
            class="btn-solid btn-register"
            data-id="${e.id}"
          >
            ${going ? "Registered ✓" : "Register"}
          </button>
        </div>
      </article>
    `;
  }).join("") || emptyState("No events match that search.");

  return `
    <section class="view">

      <div class="view-head">
        <p class="eyebrow-free">Campus events</p>

        <h1 class="view-title">
          What's on this month
        </h1>

        <p class="view-sub">
          Discover events happening around campus.
        </p>
      </div>

      <div class="grid grid--events">
        ${list}
      </div>

    </section>
  `;
}

// ---------- View: Opportunities ----------
function viewOpportunities() {
  const list = DATA.opportunities.filter(matchesQuery).map(o => `
    <article class="opp-card">
      <div class="opp-top">
        <span class="tag tag--${o.type.toLowerCase()}">${o.type}</span>
        <span class="opp-deadline">Deadline · ${o.deadline}</span>
      </div>
      <h3 class="opp-title">${o.title}</h3>
      <p class="opp-org">${o.org}</p>
      <ul class="opp-facts">
        <li>${o.detail}</li>
        <li>${o.mode}</li>
        <li>${o.extra}</li>
      </ul>
      <div class="opp-actions">
        <button class="btn-solid">View opportunity</button>
        <button class="btn-outline">Save</button>
      </div>
    </article>
  `).join("") || emptyState("No opportunities match that search.");

  return `
    <section class="view">
      <div class="view-head">
        <p class="eyebrow-free">Opportunities hub</p>
        <h1 class="view-title">Recommended for you</h1>
        <p class="view-sub">${DATA.opportunities.length} opportunities matched to your skills and year.</p>
      </div>
      <div class="grid grid--opps">${list}</div>
    </section>
  `;
}

// ---------- View: Projects ----------
function viewProjects() {
  const list = DATA.projects.filter(matchesQuery).map(p => {
    const requested = !!state.joinState[p.name];
    return `
    <article class="index-card">
      <h3 class="index-title">${p.name}</h3>
      <p class="index-owner">Started by ${p.owner} · Team ${p.team}</p>
      <p class="index-problem">${p.problem}</p>
      <div class="chip-row">${p.stack.map(s => `<span class="chip chip--muted">${s}</span>`).join("")}</div>
      <div class="index-looking">
        <span class="index-looking-label">Looking for</span>
        ${p.looking.map(r => `<span class="chip chip--role">${r}</span>`).join("")}
      </div>
      <div class="index-foot">
        <span class="index-deadline">Deadline ${p.deadline}</span>
        <button class="btn-solid btn-join" data-name="${p.name}">${requested ? "Requested ✓" : "Request to join"}</button>
      </div>
    </article>`;
  }).join("") || emptyState("No projects match that search.");

  return `
    <section class="view">
      <div class="view-head">
        <p class="eyebrow-free">Projects & teammate matching</p>
        <h1 class="view-title">Build something with campus talent</h1>
      </div>
      <div class="grid grid--projects">${list}</div>
    </section>
  `;
}

// ---------- View: Communities ----------
function viewCommunities() {
  const list = DATA.communities.filter(matchesQuery).map(c => {
    const status = state.communityState[c.name];
    return `
    <article class="community-card">
      <div class="community-top">
        <span class="tag tag--${c.category.toLowerCase()}">${c.category}</span>
        <span class="community-members">${c.members} members</span>
      </div>
      <h3 class="community-name">${c.name}</h3>
      <p class="community-desc">${c.desc}</p>
      <button class="btn-outline btn-join-community" data-name="${c.name}" ${status === "Member" ? "disabled" : ""}>${status}</button>
    </article>`;
  }).join("") || emptyState("No communities match that search.");

  return `
    <section class="view">
      <div class="view-head">
        <p class="eyebrow-free">Communities</p>
        <h1 class="view-title">Clubs and chapters on campus</h1>
      </div>
      <div class="grid grid--communities">${list}</div>
    </section>
  `;
}

// ---------- View: Profile ----------
function viewProfile() {
  const u = DATA.currentUser;
  return `
    <section class="view">
      <div class="profile-hero">
        <div class="profile-avatar">${initials(u.name)}</div>
        <div>
          <h1 class="profile-name">${u.name}</h1>
          <p class="profile-line">${u.dept} · ${u.year}</p>
          <p class="profile-bio">${u.bio}</p>
        </div>
        <div class="profile-points">
          <span class="profile-points-num">${u.points}</span>
          <span class="profile-points-label">contribution points</span>
        </div>
      </div>

      <div class="profile-grid">
        <div class="profile-block">
          <h2 class="block-title">Skills</h2>
          <div class="chip-row">${u.skills.map(s => `<span class="chip">${s}</span>`).join("")}</div>
        </div>
        <div class="profile-block">
          <h2 class="block-title">Interests</h2>
          <div class="chip-row">${u.interests.map(s => `<span class="chip chip--muted">${s}</span>`).join("")}</div>
        </div>
        <div class="profile-block">
          <h2 class="block-title">Projects</h2>
          <ul class="plain-list">${u.projects.map(p => `<li>${p}</li>`).join("")}</ul>
        </div>
        <div class="profile-block">
          <h2 class="block-title">Communities</h2>
          <ul class="plain-list">${u.communities.map(c => `<li>${c}</li>`).join("")}</ul>
        </div>
        <div class="profile-block profile-block--wide">
          <h2 class="block-title">Achievements</h2>
          <div class="achv-row">
            ${u.achievements.map(a => `
              <div class="achv-card">
                <span class="achv-icon">${a.icon === "trophy" ? "🏆" : "📜"}</span>
                <div>
                  <div class="achv-title">${a.title}</div>
                  <div class="achv-venue">${a.venue}</div>
                </div>
              </div>`).join("")}
          </div>
        </div>
        <div class="profile-block profile-block--wide">
          <h2 class="block-title">Badges</h2>
          <div class="chip-row">${u.badges.map(b => `<span class="chip chip--badge">${b}</span>`).join("")}</div>
        </div>
      </div>
    </section>
  `;
}

// ---------- Helpers ----------
function initials(name) {
  return name.split(" ").map(p => p[0]).join("").slice(0, 2).toUpperCase();
}

function emptyState(msg) {
  return `<div class="empty-state">${msg}</div>`;
}

function matchesQuery(item) {
  if (!state.query) return true;
  const q = state.query.toLowerCase();
  return JSON.stringify(item).toLowerCase().includes(q);
}

const VIEWS = {
  home: viewHome,
  discover: viewDiscover,
  events: viewEvents,
  opportunities: viewOpportunities,
  projects: viewProjects,
  communities: viewCommunities,
  profile: viewProfile
};

async function render() {
  root.innerHTML = `<div class="empty-state">Loading...</div>`;

  const content = await VIEWS[state.view]();

  root.innerHTML = content;

  bindDynamicButtons();

  window.scrollTo?.(0, 0);

  root.querySelectorAll(".quick-btn").forEach(btn => {
    btn.addEventListener("click", () => setView(btn.dataset.view));
  });
}

function bindDynamicButtons() {
  root.querySelectorAll(".btn-register").forEach(btn => {
  btn.addEventListener("click", async () => {

    if (!currentSession?.user) {
      alert("Please login to register for an event.");
      openAuthModal();
      return;
    }

    const eventId = btn.dataset.id;
    const userId = currentSession.user.id;

    const alreadyRegistered = state.eventState[eventId];

    if (alreadyRegistered) {
      const { error } = await supabase
        .from("event_registrations")
        .delete()
        .eq("event_id", eventId)
        .eq("user_id", userId);

      if (error) {
        alert(error.message);
        return;
      }

      state.eventState[eventId] = false;

    } else {

      const { error } = await supabase
        .from("event_registrations")
        .insert({
          event_id: eventId,
          user_id: userId
        });

      if (error) {
        alert(error.message);
        return;
      }

      state.eventState[eventId] = true;
    }

    render();
  });
});

function setView(view) {
  state.view = view;
  state.query = "";
  searchInput.value = "";
  railLinks.forEach(l => l.classList.toggle("is-active", l.dataset.view === view));
  render();
}

railLinks.forEach(link => {
  link.addEventListener("click", () => setView(link.dataset.view));
});

searchInput.addEventListener("input", (e) => {
  state.query = e.target.value.trim();
  if (state.view === "home" || state.view === "profile") {
    // Home & profile aren't filtered lists; jump to Discover once they start typing
    // only if there's meaningful input, otherwise leave them be.
  }
  render();
});

// ---------- Create modal ----------
const veil = document.getElementById("modal-veil");
const box = document.getElementById("modal-box");
const POST_TYPES = [
  { key: "general", label: "General post", hint: "Share an update, photo or thought" },
  { key: "question", label: "Question", hint: "Ask the campus something" },
  { key: "opportunity", label: "Opportunity", hint: "Internship, hackathon, competition" },
  { key: "project", label: "Project", hint: "Looking for collaborators" },
  { key: "achievement", label: "Achievement", hint: "A win, certification or publication" },
  { key: "poll", label: "Poll", hint: "Ask students to vote" }
];

document.getElementById("btn-create").addEventListener("click", () => {
  box.innerHTML = `
    <div class="modal-head">
      <h2>Create</h2>
      <button class="modal-close" id="modal-close">&times;</button>
    </div>
    <p class="modal-sub">What do you want to share with your campus?</p>
    <div class="modal-grid">
      ${POST_TYPES.map(t => `
        <button class="modal-option" data-key="${t.key}">
          <span class="modal-option-label">${t.label}</span>
          <span class="modal-option-hint">${t.hint}</span>
        </button>
      `).join("")}
    </div>
  `;
  veil.classList.add("is-open");
  document.getElementById("modal-close").addEventListener("click", closeModal);
  box.querySelectorAll(".modal-option").forEach(o => {
    o.addEventListener("click", () => {
      box.innerHTML = `
        <div class="modal-head">
          <h2>${POST_TYPES.find(t => t.key === o.dataset.key).label}</h2>
          <button class="modal-close" id="modal-close">&times;</button>
        </div>
        <p class="modal-sub">This is a prototype — posting isn't wired up to a backend yet.</p>
        <button class="btn-solid" id="modal-done">Got it</button>
      `;
      document.getElementById("modal-close").addEventListener("click", closeModal);
      document.getElementById("modal-done").addEventListener("click", closeModal);
    });
  });
});

veil.addEventListener("click", (e) => { if (e.target === veil) closeModal(); });
function closeModal() { veil.classList.remove("is-open"); }
// Initial paint
loadAuthSession().then(() => {
  render();
});

supabase.auth.onAuthStateChange(async (event, session) => {
  currentSession = session;

  if (session?.user) {
    await loadProfile(session.user);
  } else {
    currentProfile = null;
  }

  updateAuthButton();
});
