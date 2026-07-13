/* =========================================================
   QOL2K — shared behavior
   Reusable components: nav, footer, credits, mod cards, modal.
   Every page loads data.js then this file.
   ========================================================= */

/* =========================================================
   Navigation Structures

   Two nav modes:
   - "portal": Simple top-level game hub links used on the homepage.
   - (default): Detailed dropdown archive nav used on NBA 2K14 pages.

   Nav item structure:
   - Simple items: { label, href, key }
   - Dropdown groups: { label, key, children: [{ label, href, key }, …] }
   The mobile menu renders all items flat; the desktop nav uses dropdowns.
   ========================================================= */

/* PBA 2K nav — minimal links for the PBA landing page */
const QOL2K_NAV_ITEMS_PBA = [
  { label: "Donate", href: "donations.html", key: "donations" },
  { label: "Cyberface Search", href: "pba-cyberface-search.html", key: "pba-cyberface-search" }
];

/* Portal nav — homepage as a game selection hub */
const QOL2K_NAV_ITEMS_PORTAL = [
  { label: "Home", href: "index.html", key: "home" },
  { label: "NBA 2K14", href: "nba2k14.html", key: "nba2k14" },
  { label: "NBA 2K23", href: "nba2k23.html", key: "nba2k23" },
  { label: "PBA 2K", href: "pba2k.html", key: "pba2k" },
  { label: "FIBA 2K", href: "fiba2k.html", key: "fiba2k" },
  { label: "Donate", href: "donations.html", key: "donations" }
];

/* Detailed NBA 2K14 archive nav — used on all archive sub-pages */
const QOL2K_NAV_ITEMS = [
  { label: "Donate", href: "donations.html", key: "donations" },
  { label: "Tools", href: "tools.html", key: "tools" },
  { label: "Rosters", href: "rosters.html", key: "rosters" },
  {
    label: "Players", key: "players",
    children: [
      { label: "Cyberfaces", href: "cyberfaces.html", key: "cyberfaces" },
      { label: "Cyberface Search", href: "cyberface-search.html", key: "cyberface-search" },
      { label: "Portraits", href: "portraits.html", key: "portraits" },
      { label: "Jerseys", href: "jerseys.html", key: "jerseys" },
      { label: "Shoes", href: "shoes.html", key: "shoes" }
    ]
  },
  {
    label: "Arenas", key: "arenas",
    children: [
      { label: "Courts", href: "courts.html", key: "courts" },
      { label: "Dornas", href: "dornas.html", key: "dornas" },
      { label: "Stadiums", href: "stadiums.html", key: "stadiums" }
    ]
  },
  {
    label: "Presentation", key: "presentation",
    children: [
      { label: "Presentations", href: "presentations.html", key: "presentations" },
      { label: "Scoreboards", href: "scoreboards.html", key: "scoreboards" },
      { label: "Globals", href: "globals.html", key: "globals" },
      { label: "ReShade", href: "reshade.html", key: "reshade" }
    ]
  },
];

const FACEBOOK_URL = "https://www.facebook.com/share/1CEVisA8rs/";

/* Breadcrumb context mapping — controls the nav context indicator */
const QOL2K_BREADCRUMB_MAP = {
  "home": ["HOME"],
  "nba2k14": ["NBA 2K14"],
  "nba2k23": ["NBA 2K23"],
  "pba2k": ["PBA 2K"],
  "fiba2k": ["FIBA 2K"],
  "donations": ["Donate"],
  "tools": ["NBA 2K14", "Tools"],
  "rosters": ["NBA 2K14", "Rosters"],
  "cyberfaces": ["NBA 2K14", "Cyberfaces"],
  "cyberface-search": ["NBA 2K14", "Cyberface Search"],
  "portraits": ["NBA 2K14", "Portraits"],
  "jerseys": ["NBA 2K14", "Jerseys"],
  "shoes": ["NBA 2K14", "Shoes"],
  "courts": ["NBA 2K14", "Courts"],
  "dornas": ["NBA 2K14", "Dornas"],
  "stadiums": ["NBA 2K14", "Stadiums"],
  "presentations": ["NBA 2K14", "Presentations"],
  "scoreboards": ["NBA 2K14", "Scoreboards"],
  "globals": ["NBA 2K14", "Globals"],
  "reshade": ["NBA 2K14", "ReShade"],
  "pba-cyberface-search": ["PBA 2K", "Cyberface Search"]
};

/* Map category keys to their preview image filenames */
const QOL2K_PREVIEW_IMAGES = {
  rosters: "roster-update.png",
  cyberfaces: "cyberfaces.png",
  portraits: "portraits.png",
  presentations: "presentations.png",
  globals: "global.png",
  jerseys: "jerseys.png",
  courts: "courts.png",
  dornas: "dornas.png",
  stadiums: "stadiums.png",
  shoes: "shoes.png",
  reshade: "reshade.png",
  scoreboards: "scoarboards.png"
};

const ICONS = {
  download: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3v12"/><path d="M7 10l5 5 5-5"/><path d="M4 19h16"/></svg>`,
  search: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/></svg>`,
  facebook: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M14 13.5h2.5l1-4H14v-2c0-1.03 0-2 2-2h1.5V2.14C17.17 2.1 15.9 2 14.6 2 11.9 2 10 3.66 10 6.7v2.8H7v4h3V22h4v-8.5z"/></svg>`
};

/* ---------------------------------------------------------
   Navigation
   --------------------------------------------------------- */

/* Flatten grouped items for mobile-menu rendering.
   Accepts the nav items array so portal and detailed navs both work. */
function qol2kFlattenNavItems(items) {
  const flat = [];
  items.forEach(item => {
    if (item.children) {
      item.children.forEach(child => flat.push(child));
    } else {
      flat.push(item);
    }
  });
  return flat;
}

/* Render a single nav anchor */
function qol2kNavLinkHTML(item, activeKey) {
  const active = item.key === activeKey ? " active" : "";
  return `<a href="${item.href}" class="${active.trim()}"${active ? ' aria-current="page"' : ""}>${item.label}</a>`;
}

/* Check if any child in a group matches the active key */
function qol2kGroupActive(group, activeKey) {
  return group.children && group.children.some(c => c.key === activeKey);
}

function qol2kRenderNav(activeKey, navType, breadcrumbKey) {
  const mount = document.getElementById("site-nav");
  if (!mount) return;

  /* Resolve breadcrumb key defaults to activeKey */
  const crumbKey = breadcrumbKey || activeKey;

  /* Choose nav structure based on page type */
  var navItems;
  if (navType === "portal") {
    navItems = QOL2K_NAV_ITEMS_PORTAL;
  } else if (navType === "pba") {
    navItems = QOL2K_NAV_ITEMS_PBA;
  } else {
    navItems = QOL2K_NAV_ITEMS;
  }

  /* Desktop nav – render groups as dropdowns */
  const desktopLinks = navItems.map(item => {
    if (item.children) {
      const groupActive = qol2kGroupActive(item, activeKey);
      const childLinks = item.children.map(c => qol2kNavLinkHTML(c, activeKey)).join("");
      return `
        <li class="nav-dropdown" data-key="${item.key}">
          <a href="#" class="nav-dropdown-trigger${groupActive ? " active" : ""}" role="button" aria-haspopup="true" aria-expanded="false">
            ${item.label}
            <svg class="dd-chevron" width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M2 3.5l3 3 3-3"/></svg>
          </a>
          <div class="nav-dropdown-menu" role="menu">${childLinks}</div>
        </li>`;
    }
    return `<li>${qol2kNavLinkHTML(item, activeKey)}</li>`;
  }).join("");

  /* Mobile nav – flat list of all items */
  const flatItems = qol2kFlattenNavItems(navItems);
  const mobileLinks = flatItems.map(item => qol2kNavLinkHTML(item, activeKey)).join("");

  /* Generate breadcrumb HTML */
  var crumbLabels = QOL2K_BREADCRUMB_MAP[crumbKey] || [crumbKey];
  var breadcrumbHTML = crumbLabels.map(function(label, i) {
    if (i === crumbLabels.length - 1) {
      return '<span class="nav-crumb current">' + label + '</span>';
    }
    return '<span class="nav-crumb">' + label + '</span>';
  }).join('<span class="nav-sep">/</span>');

  mount.innerHTML = `
    <nav class="nav" id="mainNav">
      <div class="container">
        <div class="nav-brand-group">
          <a href="index.html" class="brand">
            <span class="brand-mark">QOL<span>2K</span></span>
            <span class="brand-sub">Quality of Life Mods</span>
          </a>
          <div class="nav-breadcrumb">${breadcrumbHTML}</div>
        </div>
        <ul class="nav-links">${desktopLinks}</ul>
        <button class="nav-toggle" id="navToggle" aria-label="Open menu" aria-expanded="false">
          <span></span><span></span><span></span>
        </button>
      </div>
    </nav>
    <div class="mobile-menu" id="mobileMenu">
      <ul>${mobileLinks}</ul>
    </div>
  `;

  // Sticky shadow state
  const navEl = document.getElementById("mainNav");
  const onScroll = () => {
    if (window.scrollY > 8) navEl.classList.add("is-scrolled");
    else navEl.classList.remove("is-scrolled");
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // Mobile menu toggle
  const toggle = document.getElementById("navToggle");
  const menu = document.getElementById("mobileMenu");
  toggle.addEventListener("click", () => {
    const isOpen = menu.classList.toggle("is-open");
    toggle.classList.toggle("is-open", isOpen);
    toggle.setAttribute("aria-expanded", String(isOpen));
    toggle.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
    document.body.classList.toggle("modal-lock", isOpen);
  });
  menu.querySelectorAll("a").forEach(a => {
    a.addEventListener("click", () => {
      menu.classList.remove("is-open");
      toggle.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
      toggle.setAttribute("aria-label", "Open menu");
      document.body.classList.remove("modal-lock");
    });
  });

  // Dropdown hover + click accessibility
  const allDropdowns = document.querySelectorAll(".nav-dropdown");
  allDropdowns.forEach(dd => {
    const trigger = dd.querySelector(".nav-dropdown-trigger");
    const menu = dd.querySelector(".nav-dropdown-menu");

    // Prevent default anchor click
    trigger.addEventListener("click", e => {
      e.preventDefault();
      // Close sibling dropdowns
      allDropdowns.forEach(other => { if (other !== dd) {
        other.classList.remove("is-open");
        other.querySelector(".nav-dropdown-trigger").setAttribute("aria-expanded", "false");
      }});
      const isOpen = dd.classList.toggle("is-open");
      trigger.setAttribute("aria-expanded", String(isOpen));
      if (isOpen) menu.querySelector("a")?.focus();
    });

    // Close on Escape
    dd.addEventListener("keydown", e => {
      if (e.key === "Escape") {
        dd.classList.remove("is-open");
        trigger.setAttribute("aria-expanded", "false");
        trigger.focus();
      }
    });
  });

  // Single document listener for closing dropdowns on outside click
  document.addEventListener("click", e => {
    allDropdowns.forEach(dd => {
      if (!dd.contains(e.target)) {
        dd.classList.remove("is-open");
        dd.querySelector(".nav-dropdown-trigger").setAttribute("aria-expanded", "false");
      }
    });
  });
}

/* ---------------------------------------------------------
   Footer
   --------------------------------------------------------- */
function qol2kRenderFooter() {
  const mount = document.getElementById("site-footer");
  if (!mount) return;
  const year = new Date().getFullYear();

  mount.innerHTML = `
    <footer class="site-footer">
      <div class="container">
        <div class="footer-grid">
          <div class="footer-brand">
            <span class="brand-mark">QOL<span>2K</span></span>
            <p>Quality of Life Mods - 2K. A community mod archive keeping NBA 2K14 accurate, tidy, and worth booting up again.</p>
            <a class="footer-social" href="${FACEBOOK_URL}" target="_blank" rel="noopener">${ICONS.facebook} Facebook Page</a>
          </div>
          <div class="footer-col">
            <h4>Quick Links</h4>
            <ul>
              <li><a href="index.html">Home</a></li>
              <li><a href="rosters.html">Categories</a></li>
              <li><a href="donations.html">Donate</a></li>
              <li><a href="${FACEBOOK_URL}" target="_blank" rel="noopener">Facebook</a></li>
            </ul>
          </div>
          <div class="footer-col">
            <h4>Community</h4>
            <ul>
              <li><a href="${FACEBOOK_URL}" target="_blank" rel="noopener">NBA 2K14 Modding Community</a></li>
              <li><a href="rosters.html">Browse Mods</a></li>
              <li><a href="index.html#credits">Credits</a></li>
            </ul>
          </div>
        </div>
        <div class="footer-bottom">
          <span>© ${year} QOL2K — Quality of Life Mods for 2K.</span>
          <span>Built for the NBA 2K14 community.</span>
        </div>
      </div>
    </footer>
  `;
}

/* ---------------------------------------------------------
   Game Hub Cards (homepage)
   --------------------------------------------------------- */
function qol2kRenderGameHubs(mountId) {
  const mount = document.getElementById(mountId);
  if (!mount) return;
  mount.innerHTML = QOL2K_GAME_HUBS.map(function(hub) {
    var isAvailable = hub.href && hub.href !== "#";
    return '<a class="game-card reveal' + (isAvailable ? '' : ' coming-soon') + '" href="' + hub.href + '" data-game="' + hub.color + '">' +
      (!isAvailable ? '<span class="game-coming-badge">Coming Soon</span>' : '') +
      '<div class="game-card-icon">' + hub.title.charAt(0) + '</div>' +
      '<h3>' + hub.title + '</h3>' +
      '<p>' + hub.desc + '</p>' +
      '<span class="game-link">' + (isAvailable ? hub.btn : 'Coming Soon') + '</span>' +
      '</a>';
  }).join("");
}

/* ---------------------------------------------------------
   NBA 2K14 Landing Page Stats
   --------------------------------------------------------- */
function qol2kRenderN2KStats(mountId) {
  var mount = document.getElementById(mountId);
  if (!mount) return;
  mount.innerHTML = `
    <div class="n2k-stat reveal">
      <span class="num">12<span class="red">+</span></span>
      <span class="label">Categories</span>
    </div>
    <div class="n2k-stat reveal">
      <span class="num">500<span class="red">+</span></span>
      <span class="label">Archived Mods</span>
    </div>
    <div class="n2k-stat reveal">
      <span class="num">10<span class="red">+</span></span>
      <span class="label">Years of Support</span>
    </div>
    <div class="n2k-stat reveal">
      <span class="num">Active</span>
      <span class="label">Community</span>
    </div>
  `;
}

/* ---------------------------------------------------------
   NBA 2K14 Landing Page — Featured Categories
   --------------------------------------------------------- */
function qol2kRenderN2KCats(mountId) {
  var mount = document.getElementById(mountId);
  if (!mount) return;
  var cats = [
    { icon: "R", title: "Rosters", desc: "Updated season rosters, draft classes, and franchise files.", href: "rosters.html", image: "roster-update.png" },
    { icon: "F", title: "Cyberfaces", desc: "Player face scans and appearance upgrades for maximum realism.", href: "cyberfaces.html", image: "cyberfaces.png" },
    { icon: "P", title: "Portraits", desc: "Redrawn player portrait artwork for menus, rosters, and UI.", href: "portraits.html", image: "portraits.png" },
    { icon: "J", title: "Jerseys", desc: "Accurate and alternate jersey sets for teams across every era.", href: "jerseys.html", image: "jerseys.png" },
    { icon: "C", title: "Courts", desc: "Rebuilt arena floors matching current team branding and designs.", href: "courts.html", image: "courts.png" },
    { icon: "S", title: "Scoreboards", desc: "Modernized scoreboard and HUD designs for a cleaner in-game overlay.", href: "scoreboards.html", image: "scoarboards.png" }
  ];
  mount.innerHTML = cats.map(function(c) {
    var bgStyle = c.image ? ' style="background-image:linear-gradient(rgba(10,10,10,0.65),rgba(10,10,10,0.85)),url(images/' + c.image + ');background-size:cover;background-position:center;"' : '';
    return '<a class="n2k-cat-card reveal" href="' + c.href + '"' + bgStyle + '>' +
      '<div class="cat-icon">' + c.icon + '</div>' +
      '<h3>' + c.title + '</h3>' +
      '<p>' + c.desc + '</p>' +
      '<span class="cat-arrow">Browse</span>' +
      '</a>';
  }).join("");
}

/* ---------------------------------------------------------
   NBA 2K14 Landing Page — Tools Highlight
   --------------------------------------------------------- */
function qol2kRenderN2KTools(mountId) {
  var mount = document.getElementById(mountId);
  if (!mount) return;
  var tools = [
    { name: "RED MC", desc: "Roster editor for NBA 2K14", icon: "R" },
    { name: "Blender", desc: "3D modeling for cyberfaces & courts", icon: "B" },
    { name: "3DM Mod Tool", desc: "File extraction and repacking", icon: "3" },
    { name: "NBA 2K Audio Editor", desc: "Sound and audio file editing", icon: "A" },
    { name: "QOL2K Audio Studio", desc: "Custom audio packages and tools", icon: "Q" }
  ];
  mount.innerHTML = tools.map(function(t) {
    return '<div class="n2k-tool-card reveal">' +
      '<div class="tool-icon">' + t.icon + '</div>' +
      '<h4>' + t.name + '</h4>' +
      '<p style="font-size:12px;color:var(--text-dim);margin:0;line-height:1.4;">' + t.desc + '</p>' +
      '</div>';
  }).join("");
}

/* ---------------------------------------------------------
   PBA 2K — Stats
   --------------------------------------------------------- */
function qol2kRenderPBAStats(mountId) {
  var mount = document.getElementById(mountId);
  if (!mount) return;
  mount.innerHTML = `
    <div class="pba-stat reveal">
      <span class="num">12</span>
      <span class="label">PBA Teams</span>
    </div>
    <div class="pba-stat reveal">
      <span class="num">100<span class="accent">+</span></span>
      <span class="label">Player Models</span>
    </div>
    <div class="pba-stat reveal">
      <span class="num">All<span class="accent">-</span>in<span class="accent">-</span>One</span>
      <span class="label">Mega Pack</span>
    </div>
    <div class="pba-stat reveal">
      <span class="num">Extract</span>
      <span class="label">&amp; Play</span>
    </div>
  `;
}

/* ---------------------------------------------------------
   PBA 2K — Image Carousel
   --------------------------------------------------------- */
function qol2kInitCarousel(carouselId) {
  var carousel = document.getElementById(carouselId);
  if (!carousel) return;

  var track = carousel.querySelector(".carousel-track");
  var slides = track.querySelectorAll(".carousel-slide");
  var prevBtn = carousel.querySelector(".carousel-prev");
  var nextBtn = carousel.querySelector(".carousel-next");
  var dotsContainer = carousel.querySelector(".carousel-dots");

  if (!track || slides.length === 0) return;

  var currentIndex = 0;
  var totalSlides = slides.length;
  var autoAdvance = null;
  var AUTO_INTERVAL = 4500;

  /* Create dots */
  for (var i = 0; i < totalSlides; i++) {
    var dot = document.createElement("button");
    dot.className = "carousel-dot" + (i === 0 ? " is-active" : "");
    dot.setAttribute("role", "tab");
    dot.setAttribute("aria-label", "Screenshot " + (i + 1) + " of " + totalSlides);
    dot.setAttribute("aria-selected", i === 0 ? "true" : "false");
    dot.addEventListener("click", (function(idx) {
      return function() { goTo(idx); };
    })(i));
    dotsContainer.appendChild(dot);
  }

  var dots = dotsContainer.querySelectorAll(".carousel-dot");

  function goTo(index) {
    if (index < 0) index = totalSlides - 1;
    if (index >= totalSlides) index = 0;
    currentIndex = index;

    track.style.transform = "translateX(-" + (currentIndex * 100) + "%)";

    /* Update dots */
    dots.forEach(function(d, i) {
      var active = i === currentIndex;
      d.classList.toggle("is-active", active);
      d.setAttribute("aria-selected", active ? "true" : "false");
    });

    resetAutoAdvance();
  }

  function goNext() { goTo(currentIndex + 1); }
  function goPrev() { goTo(currentIndex - 1); }

  function resetAutoAdvance() {
    if (autoAdvance) clearInterval(autoAdvance);
    autoAdvance = setInterval(goNext, AUTO_INTERVAL);
  }

  /* Bind buttons */
  if (prevBtn) prevBtn.addEventListener("click", goPrev);
  if (nextBtn) nextBtn.addEventListener("click", goNext);

  /* Keyboard navigation */
  carousel.addEventListener("keydown", function(e) {
    if (e.key === "ArrowLeft") { goPrev(); e.preventDefault(); }
    if (e.key === "ArrowRight") { goNext(); e.preventDefault(); }
  });

  /* Pause on hover */
  carousel.addEventListener("mouseenter", function() {
    if (autoAdvance) clearInterval(autoAdvance);
  });
  carousel.addEventListener("mouseleave", function() {
    resetAutoAdvance();
  });

  /* Touch/swipe support */
  (function() {
    var startX = 0;
    var isDragging = false;

    carousel.addEventListener("mousedown", function(e) {
      startX = e.clientX;
      isDragging = true;
    });

    carousel.addEventListener("mousemove", function(e) {
      if (!isDragging) return;
      var diff = startX - e.clientX;
      if (Math.abs(diff) > 60) {
        if (diff > 0) goNext(); else goPrev();
        isDragging = false;
      }
    });

    carousel.addEventListener("mouseup", function() { isDragging = false; });
    carousel.addEventListener("mouseleave", function() { isDragging = false; });

    carousel.addEventListener("touchstart", function(e) {
      startX = e.touches[0].clientX;
      isDragging = true;
    }, { passive: true });

    carousel.addEventListener("touchmove", function(e) {
      if (!isDragging) return;
      var diff = startX - e.touches[0].clientX;
      if (Math.abs(diff) > 60) {
        if (diff > 0) goNext(); else goPrev();
        isDragging = false;
      }
    }, { passive: true });

    carousel.addEventListener("touchend", function() { isDragging = false; });
  })();

  /* Start auto-advance */
  resetAutoAdvance();

  /* Make carousel focusable */
  carousel.setAttribute("tabindex", "0");
}

/* ---------------------------------------------------------
   Home Stats Strip
   --------------------------------------------------------- */
function qol2kRenderHomeStats(mountId) {
  var mount = document.getElementById(mountId);
  if (!mount) return;
  mount.innerHTML = `
    <div class="home-stat reveal">
      <span class="num">10<span class="red">+</span></span>
      <span class="label">Years Modding</span>
    </div>
    <div class="home-stat reveal">
      <span class="num">500<span class="red">+</span></span>
      <span class="label">Mods Archived</span>
    </div>
    <div class="home-stat reveal">
      <span class="num">4</span>
      <span class="label">Game Platforms</span>
    </div>
    <div class="home-stat reveal">
      <span class="num">Active</span>
      <span class="label">Community</span>
    </div>
  `;
}

/* ---------------------------------------------------------
   Featured Projects (homepage)
   --------------------------------------------------------- */
function qol2kRenderFeaturedProjects(mountId) {
  var mount = document.getElementById(mountId);
  if (!mount) return;
  mount.innerHTML = QOL2K_FEATURED.map(function(item) {
    return '<article class="feat-card reveal">' +
      '<div class="feat-thumb">' +
      '<span class="feat-tag">' + item.category + '</span>' +
      '<span class="feat-thumb-img" style="display:flex;align-items:center;justify-content:center;font-family:var(--font-display);font-size:28px;color:var(--text-dim);opacity:0.3;">' + item.icon + '</span>' +
      '</div>' +
      '<div class="feat-body">' +
      '<h3>' + item.title + '</h3>' +
      '<p class="feat-desc">' + item.desc + '</p>' +
      '</div>' +
      '<a href="' + item.url + '" class="feat-btn">' +
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3v12"/><path d="M7 10l5 5 5-5"/><path d="M4 19h16"/></svg>' +
      'View Mods' +
      '</a>' +
      '</article>';
  }).join("");
}

/* ---------------------------------------------------------
   Donation floating CTA (Ko-fi)
   --------------------------------------------------------- */
function qol2kRenderDonationCTA() {
  /* Don't show the floating CTA on the donations page itself */
  if (window.location.pathname.includes("donations.html")) return;
  /* Avoid duplicates if called multiple times */
  if (document.getElementById("donationCta")) return;

  const coffeeIcon = `<svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M17 8h1a4 4 0 0 1 0 8h-1"/><path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V8z"/><line x1="6" y1="2" x2="6" y2="4"/><line x1="10" y1="2" x2="10" y2="4"/><line x1="14" y1="2" x2="14" y2="4"/></svg>`;

  const el = document.createElement("a");
  el.id = "donationCta";
  el.className = "donation-cta reveal";
  el.href = "donations.html";
  el.setAttribute("aria-label", "Support QOL2K");
  el.innerHTML = `${coffeeIcon}<span class="cta-label">Support QOL2K</span>`;
  document.body.appendChild(el);
}

/* ---------------------------------------------------------
   Credits block (shared across home + category pages)
   --------------------------------------------------------- */
function qol2kRenderCredits(mountId = "site-credits", customContent) {
  const mount = document.getElementById(mountId);
  if (!mount) return;
  if (customContent) {
    mount.innerHTML = `
      <section class="credits-block">
        <div class="container">
          <div class="credits-panel reveal">
            <h2>Credits</h2>
            <p>${customContent.text}</p>
            ${customContent.list ? `<ul class="credits-list">${customContent.list.map(item => `<li>${item}</li>`).join("")}</ul>` : ""}
          </div>
        </div>
      </section>
    `;
  } else {
    mount.innerHTML = `
      <section class="credits-block" id="credits">
        <div class="container">
          <div class="credits-panel reveal">
            <h2>Credits</h2>
            <p>QOL2K respects the work of the NBA 2K14 modding community. Featured mods are created by talented community modders. Full credits and author information are shown on each mod card.</p>
            <ul class="credits-list">
              <li>Kamatis 2K</li>
              <li>Mackubex</li>
              <li>AJF2K</li>
              <li>OMEL2K</li>
              <li>Community Contributors</li>
            </ul>
          </div>
        </div>
      </section>
    `;
  }
}

/* ---------------------------------------------------------
   Scroll reveal
   --------------------------------------------------------- */
function qol2kInitReveal() {
  const items = document.querySelectorAll(".reveal");
  if (!("IntersectionObserver" in window) || !items.length) {
    items.forEach(el => el.classList.add("is-visible"));
    return;
  }
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  items.forEach(el => obs.observe(el));
}

/* ---------------------------------------------------------
   Mod card + category card markup
   --------------------------------------------------------- */
/** Returns true if the mod's URL is NOT an ad-link shortener (exe.io). */
function qol2kIsAdFree(mod) {
  return mod.url && !mod.url.includes("exe.io");
}

function qol2kModCardHTML(mod, categoryKey, index) {
  const featuredFlag = mod.featured ? `<span class="featured-flag">Featured</span>` : "";
  const featuredClass = mod.featured ? " featured" : "";
  const creditHTML = mod.credits ? `<span><b>Credits:</b> ${mod.credits}</span>` : "";
  const noteHTML = mod.note ? `<p class="mod-note">${mod.note}</p>` : "";
  const adFree = qol2kIsAdFree(mod);
  const adFreeFlag = adFree ? `<span class="adfree-flag">Ad Free</span>` : "";
  const downloadLabel = adFree ? `${ICONS.download} Ad-Free Download` : `${ICONS.download} Download via MediaFire`;
  const previewFile = QOL2K_PREVIEW_IMAGES[categoryKey];
  const thumbContent = previewFile
    ? `<img class="mod-thumb-img" src="images/${previewFile}" alt="${mod.title}" loading="lazy">`
    : `<span class="placeholder-label">Preview Image</span>`;
  return `
    <article class="mod-card${featuredClass}" data-title="${mod.title.toLowerCase()}" data-author="${mod.author.toLowerCase()}">
      <div class="mod-thumb">
        ${featuredFlag}
        ${adFreeFlag}
        ${thumbContent}
      </div>
      <div class="mod-body">
        <h3>${mod.title}</h3>
        <p class="mod-desc">${mod.desc}</p>
        ${noteHTML}
        <div class="stat-line">
          <span><b>Author:</b> ${mod.author}</span>
          <span><b>Version:</b> ${mod.version}</span>
          <span><b>Date:</b> ${mod.date}</span>
          ${creditHTML}
        </div>
      </div>
      <div class="mod-actions">
        <a href="${mod.url || "#"}" class="btn-download" ${mod.url ? `target="_blank" rel="noopener"` : ""} ${!mod.url ? `data-cat="${categoryKey}" data-idx="${index}"` : ""}>
          ${downloadLabel}
        </a>
        <button class="btn-details" data-cat="${categoryKey}" data-idx="${index}">Details</button>
      </div>
    </article>
  `;
}

function qol2kRenderModGrid(mountId, categoryKey) {
  const mount = document.getElementById(mountId);
  if (!mount) return;
  const mods = QOL2K_MODS[categoryKey] || [];
  mount.innerHTML = mods.map((m, i) => qol2kModCardHTML(m, categoryKey, i)).join("");
  qol2kBindModActions(mount);
}

function qol2kCatCardHTML(cat, index) {
  const n = String(index + 1).padStart(2, "0");
  return `
    <a class="cat-card reveal" href="${cat.page}" data-index="${n}">
      <span class="cat-tag">Category</span>
      <h3>${cat.title}</h3>
      <p>${cat.desc}</p>
      <span class="cat-link">Browse</span>
    </a>
  `;
}

function qol2kRenderCategoryGrid(mountId, limit) {
  const mount = document.getElementById(mountId);
  if (!mount) return;
  const list = limit ? QOL2K_CATEGORIES.slice(0, limit) : QOL2K_CATEGORIES;
  mount.innerHTML = list.map((c, i) => qol2kCatCardHTML(c, i)).join("");
}

function qol2kRenderLatest(mountId) {
  const mount = document.getElementById(mountId);
  if (!mount) return;
  mount.innerHTML = QOL2K_LATEST.map(mod => qol2kModCardHTML(mod, mod.category, mod.idx)).join("");
  qol2kBindModActions(mount);
}

/* ---------------------------------------------------------
   Modal
   --------------------------------------------------------- */
function qol2kEnsureModal() {
  if (document.getElementById("modModal")) return;
  const div = document.createElement("div");
  div.innerHTML = `
    <div class="modal-overlay" id="modModal">
      <div class="modal-box" role="dialog" aria-modal="true" aria-labelledby="modModalTitle">
        <div class="modal-thumb">
          <button class="modal-close" id="modModalClose" aria-label="Close">✕</button>
          <img class="modal-thumb-img" id="modModalThumbImg" alt="" loading="lazy">
          <span class="modal-thumb-label">Large Preview Image</span>
        </div>
        <div class="modal-content">
          <h2 id="modModalTitle"></h2>
          <div class="stat-line" id="modModalStats"></div>
          <div class="modal-section">
            <h4>Description</h4>
            <p id="modModalDesc"></p>
          </div>
          <div class="modal-section">
            <h4>Changelog</h4>
            <ul id="modModalChangelog"></ul>
          </div>
          <div class="modal-section">
            <h4>Installation</h4>
            <ul id="modModalInstall"></ul>
          </div>
          <div class="modal-section">
            <h4>Credits</h4>
            <p id="modModalCredits"></p>
          </div>
          <div class="modal-actions">
            <button class="btn-download" id="modModalDownload">${ICONS.download} Download via MediaFire</button>
          </div>
        </div>
      </div>
    </div>
  `;
  document.body.appendChild(div.firstElementChild);

  const overlay = document.getElementById("modModal");
  document.getElementById("modModalClose").addEventListener("click", qol2kCloseModal);
  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) qol2kCloseModal();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") qol2kCloseModal();
  });
}

function qol2kOpenModal(mod, categoryKey) {
  qol2kEnsureModal();
  document.getElementById("modModalTitle").textContent = mod.title;
  document.getElementById("modModalStats").innerHTML =
    `<span><b>Author:</b> ${mod.author}</span><span><b>Version:</b> ${mod.version}</span><span><b>Date:</b> ${mod.date}</span>`;
  document.getElementById("modModalDesc").textContent = mod.desc;
  document.getElementById("modModalChangelog").innerHTML = `
    <li>v${mod.version} — Initial release of this mod pack.</li>
    <li>Compatibility: NBA 2K14 PC.</li>
  `;
  document.getElementById("modModalInstall").innerHTML = `
    <li>Back up your original game files before installing.</li>
    <li>Extract the download into your NBA 2K14 mod folder.</li>
    <li>Overwrite files when prompted and launch the game.</li>
  `;
  const creditsText = mod.credits || `Created by ${mod.author}.`;
  document.getElementById("modModalCredits").innerHTML = creditsText;

  const downloadBtn = document.getElementById("modModalDownload");
  if (mod.url) {
    downloadBtn.onclick = () => {
      window.open(mod.url, "_blank", "noopener");
    };
  } else {
    downloadBtn.onclick = (e) => {
      e.preventDefault();
      qol2kCloseModal();
      qol2kShowToast("Download link coming soon — check back after release.");
    };
  }

  // Set preview image in modal
  const thumbImg = document.getElementById("modModalThumbImg");
  const thumbLabel = document.querySelector(".modal-thumb-label");
  const modalPreviewFile = categoryKey ? QOL2K_PREVIEW_IMAGES[categoryKey] : null;
  if (modalPreviewFile && thumbImg) {
    thumbImg.src = `images/${modalPreviewFile}`;
    thumbImg.alt = `${mod.title} preview`;
    thumbImg.style.display = "block";
    if (thumbLabel) thumbLabel.style.display = "none";
  } else {
    if (thumbImg) thumbImg.style.display = "none";
    if (thumbLabel) thumbLabel.style.display = "block";
  }

  const overlay = document.getElementById("modModal");
  overlay.classList.add("is-open");
  document.body.classList.add("modal-lock");
}

function qol2kCloseModal() {
  const overlay = document.getElementById("modModal");
  if (!overlay) return;
  overlay.classList.remove("is-open");
  document.body.classList.remove("modal-lock");
}

function qol2kBindModActions(scope) {
  scope.querySelectorAll(".btn-details").forEach(btn => {
    btn.addEventListener("click", () => {
      const cat = btn.dataset.cat;
      const idx = Number(btn.dataset.idx);
      const mod = QOL2K_MODS[cat][idx];
      qol2kOpenModal(mod, cat);
    });
  });
  // Download buttons without a real URL show a placeholder toast.
  scope.querySelectorAll(".btn-download[data-cat]").forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      qol2kShowToast("Download link coming soon — check back after release.");
    });
  });
}

/* ---------------------------------------------------------
   Toast
   --------------------------------------------------------- */
let qol2kToastTimer = null;
function qol2kShowToast(message) {
  let toast = document.getElementById("qol2kToast");
  if (!toast) {
    toast = document.createElement("div");
    toast.id = "qol2kToast";
    toast.className = "qol2k-toast";
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.classList.add("is-visible");
  clearTimeout(qol2kToastTimer);
  qol2kToastTimer = setTimeout(() => toast.classList.remove("is-visible"), 2600);
}

/* ---------------------------------------------------------
   Local search (category pages)
   --------------------------------------------------------- */
function qol2kInitSearch(inputId, gridId, emptyId) {
  const input = document.getElementById(inputId);
  const grid = document.getElementById(gridId);
  const empty = document.getElementById(emptyId);
  if (!input || !grid) return;

  input.addEventListener("input", () => {
    const q = input.value.trim().toLowerCase();
    let visibleCount = 0;
    grid.querySelectorAll(".mod-card").forEach(card => {
      const matches = !q || card.dataset.title.includes(q) || card.dataset.author.includes(q);
      card.style.display = matches ? "" : "none";
      if (matches) visibleCount++;
    });
    if (empty) empty.classList.toggle("show", visibleCount === 0);
  });
}

/* ---------------------------------------------------------
   Hero typewriter (home page only)
   --------------------------------------------------------- */
function qol2kInitTypewriter(elId, words, opts = {}) {
  const el = document.getElementById(elId);
  if (!el) return;
  const typeSpeed = opts.typeSpeed || 65;
  const eraseSpeed = opts.eraseSpeed || 40;
  const holdTime = opts.holdTime || 1400;
  let wordIndex = 0;
  let charIndex = 0;
  let deleting = false;

  function tick() {
    const word = words[wordIndex];
    if (!deleting) {
      charIndex++;
      el.textContent = word.slice(0, charIndex);
      if (charIndex === word.length) {
        deleting = true;
        setTimeout(tick, holdTime);
        return;
      }
      setTimeout(tick, typeSpeed);
    } else {
      charIndex--;
      el.textContent = word.slice(0, charIndex);
      if (charIndex === 0) {
        deleting = false;
        wordIndex = (wordIndex + 1) % words.length;
      }
      setTimeout(tick, eraseSpeed);
    }
  }
  tick();
}

/* ---------------------------------------------------------
   Boot
   --------------------------------------------------------- */
document.addEventListener("DOMContentLoaded", () => {
  qol2kRenderDonationCTA();
  qol2kInitReveal();
});
