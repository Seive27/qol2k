/* =========================================================
   QOL2K — shared placeholder data
   Categories + mod entries. Swap with real data/links later.
   ========================================================= */

const QOL2K_CATEGORIES = [
  { key: "rosters",       title: "Rosters",       short: "Rosters",       desc: "Updated team rosters, ratings, and accuracy overhauls for the current NBA landscape.",       page: "rosters.html" },
  { key: "cyberfaces",    title: "Cyberfaces",    short: "Cyberfaces",    desc: "High-detail player face models bringing more realism and likeness accuracy to the court.", page: "cyberfaces.html" },
  { key: "portraits",     title: "Portraits",     short: "Portraits",     desc: "Redrawn player portrait artwork for menus, rosters, and in-game UI.",                    page: "portraits.html" },
  { key: "presentations", title: "Presentations", short: "Presentations", desc: "Broadcast package overhauls — overlays, camera angles, and presentation elements.",       page: "presentations.html" },
  { key: "globals",       title: "Globals",       short: "Globals",       desc: "Core gameplay and engine-level tweaks that apply across every mode.",                    page: "globals.html" },
  { key: "jerseys",       title: "Jerseys",       short: "Jerseys",       desc: "Accurate and alternate jersey sets for teams across every era.",                        page: "jerseys.html" },
  { key: "courts",        title: "Courts",        short: "Courts",        desc: "Rebuilt arena floors matching current team branding and court designs.",                page: "courts.html" },
  { key: "dornas",        title: "Dornas",        short: "Dornas",        desc: "Arena floor artworks — custom dorna designs for an authentic game-day atmosphere.",      page: "dornas.html" },
  { key: "stadiums",      title: "Stadiums",      short: "Stadiums",      desc: "Full arena environment overhauls, from tunnel entrances to crowd details.",             page: "stadiums.html" },
  { key: "shoes",         title: "Shoes",         short: "Shoes",         desc: "Updated sneaker models and colorways for authentic on-court footwear.",                 page: "shoes.html" },
  { key: "reshade",       title: "ReShade",       short: "ReShade",       desc: "Visual presets and shader tweaks for improved lighting, color, and clarity.",           page: "reshade.html" },
  { key: "scoreboards",   title: "Scoreboards",   short: "Scoreboards",   desc: "Modernized scoreboard and HUD designs for a cleaner in-game overlay.",                  page: "scoreboards.html" }
];

// Mod entries per category with real download links and credits.
// Each entry can include: url (download link), credits (HTML), note (extra text).
const QOL2K_MODS = {
  rosters: [
    { title: "2026-27 Full Roster", desc: "Complete 2026-27 season roster update with corrected ratings, tendencies, and lineups. Full release coming after the off season.", author: "QOL2K", version: "1.0", date: "TBD", featured: true, note: "Full roster will be released on this website after the off season. Follow the Facebook page for mini-updates.", url: "https://www.facebook.com/share/1CEVisA8rs/" }
  ],
  cyberfaces: [
    { title: "Full Cyberface Pack", desc: "Complete cyberface collection with high-detail player face models for maximum realism.", author: "Community", version: "1.0", date: "Jul 2026", featured: true, url: "https://exe.io/fullcyberface" }
  ],
  portraits: [
    { title: "Portrait Pack", desc: "Redrawn player portrait artwork for menus, rosters, and in-game UI. Note: not yet updated for the latest season.", author: "Community", version: "1.0", date: "TBD", url: "https://exe.io/portraits" }
  ],
  presentations: [
    { title: "Bally Sports Presentation Pack", desc: "Broadcast package overhaul featuring Bally Sports-style overlays, transitions, and camera presets.", author: "Community", version: "1.0", date: "Jul 2026", featured: true, url: "https://exe.io/ballysportspres" }
  ],
  globals: [
    { title: "Global v1", desc: "Core gameplay and engine-level tweaks that apply across every mode.", author: "Community", version: "1.0", date: "Jul 2026", featured: true, url: "https://exe.io/globalv1" }
  ],
  jerseys: [
    { title: "City Jersey Compatible 2025-2026", desc: "City edition jersey set for the 2025-2026 season. Full compatible jersey pack.", author: "Kamatis 2K", version: "1.0", date: "Jul 2026", featured: true, url: "https://www.mediafire.com/file/o7bsgk7smsy9e5d/%255BKamatis_2K%255D_Jersey_Compatible_2025-2026_Pepis21_LJT2K_JTUM2K.rar/file", credits: '<a href="https://www.facebook.com/kamatis2k" target="_blank" rel="noopener">Kamatis 2K</a>' },
    { title: "Core Jersey Pack", desc: "Core jersey set by Mackubex — essential uniforms for the season.", author: "Mackubex", version: "1.0", date: "Jul 2026", url: "https://www.mediafire.com/file/hu6gn2o8lx5puel/MX_Roster_Core_Jersey_Pack.rar/file" }
  ],
  courts: [
    { title: "Core Courts", desc: "Essential court floor pack with accurate team branding and designs.", author: "AJF2K", version: "1.0", date: "Jul 2026", featured: true, url: "https://www.mediafire.com/file/90dm5mjszhbbvaz/core_courts.zip/file", credits: '<a href="https://www.facebook.com/aldrin.jay.fortuna.2024" target="_blank" rel="noopener">AJF2K</a>' },
    { title: "NBA City Court 2025", desc: "Special city edition court designs for the 2025 season by AJF2K.", author: "AJF2K", version: "1.0", date: "Jul 2026", url: "https://www.mediafire.com/file/eb955zv8xqh08a3/NBA_CITY_COURT_2025_BY_AJF2K.zip/file", credits: '<a href="https://www.facebook.com/aldrin.jay.fortuna.2024" target="_blank" rel="noopener">AJF2K</a>' }
  ],
  dornas: [
    { title: "Dornas Pack 1 (25-26 Season)", desc: "Custom dorna floor artwork pack 1 for the 2025-26 season by OMEL2K.", author: "OMEL2K", version: "1.0", date: "Jul 2026", featured: true, url: "https://www.mediafire.com/file/63pglfcm0lwcqih/DORNAS_PACK_1_25-26_SZN_BY_OMEL2K.rar/file" },
    { title: "Dornas Pack 2 (25-26 Season)", desc: "Custom dorna floor artwork pack 2 for the 2025-26 season by OMEL2K.", author: "OMEL2K", version: "1.0", date: "Jul 2026", url: "https://www.mediafire.com/file/qaworcx3n3ugzfk/DORNAS_PACK_2_25-26_SZN_BY_OMEL2K.rar/file" }
  ],
  stadiums: [
    { title: "Stadiums Pack 1 (25-26 Season)", desc: "Full arena environment overhaul pack 1 for the 2025-26 season by OMEL2K.", author: "OMEL2K", version: "1.0", date: "Jul 2026", featured: true, url: "https://www.mediafire.com/file/9pmnql5g49z6vqc/STADIUMS_PACK_1_25-26_SZN_BY_OMEL2K.rar/file" },
    { title: "Stadiums Pack 2 (25-26 Season)", desc: "Full arena environment overhaul pack 2 for the 2025-26 season by OMEL2K.", author: "OMEL2K", version: "1.0", date: "Jul 2026", url: "https://www.mediafire.com/file/2s00cfrhqu7yj8p/STADIUMS_PACK_2_25-26_SZN_BY_OMEL2K.rar/file" },
    { title: "Stadiums Pack 3 (25-26 Season)", desc: "Full arena environment overhaul pack 3 for the 2025-26 season by OMEL2K.", author: "OMEL2K", version: "1.0", date: "Jul 2026", url: "https://www.mediafire.com/file/divxsq4drfqvj5e/STADIUMS_PACK_3_25-26_SZN_BY_OMEL2K.rar/file" }
  ],
  shoes: [
    { title: "Shoe Package", desc: "Updated sneaker models and colorways for authentic on-court footwear.", author: "Community", version: "1.0", date: "Jul 2026", featured: true, url: "https://exe.io/shoepackages" }
  ],
  reshade: [
    { title: "ReShade Preset", desc: "Visual preset and shader tweaks for improved lighting, color, and clarity.", author: "Community", version: "1.0", date: "Jul 2026", featured: true, url: "https://exe.io/a2NrPjy" }
  ],
  scoreboards: [
    { title: "Scoreboard Pack", desc: "Modernized scoreboard and HUD designs for a cleaner in-game overlay.", author: "Community", version: "1.0", date: "Jul 2026", featured: true, url: "https://exe.io/sbpack" }
  ]
};

// Flattened "latest releases" feed for the home page, newest first.
const QOL2K_LATEST = [
  { category: "scoreboards", idx: 0, ...QOL2K_MODS.scoreboards[0] },
  { category: "reshade", idx: 0, ...QOL2K_MODS.reshade[0] },
  { category: "shoes", idx: 0, ...QOL2K_MODS.shoes[0] },
  { category: "rosters", idx: 0, ...QOL2K_MODS.rosters[0] },
  { category: "courts", idx: 0, ...QOL2K_MODS.courts[0] },
  { category: "jerseys", idx: 0, ...QOL2K_MODS.jerseys[0] },
  { category: "cyberfaces", idx: 0, ...QOL2K_MODS.cyberfaces[0] },
  { category: "presentations", idx: 0, ...QOL2K_MODS.presentations[0] }
];
