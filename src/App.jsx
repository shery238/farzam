import { useState, useEffect, useRef } from "react";

// ── palette & helpers ──────────────────────────────────────────────────────
const C = {
  obsidian: "#07070C",
  onyx:     "#0F0F1A",
  charcoal: "#161625",
  panel:    "#1B1B2E",
  border:   "#2A2A45",
  gold:     "#C9A252",
  goldLt:   "#E8C87A",
  goldDk:   "#9B7A35",
  green:    "#00693E",
  greenLt:  "#00A860",
  white:    "#F5F0E8",
  muted:    "#8A8AA0",
  accent:   "#4B6BFB",
};

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;0,700;1,400&family=Outfit:wght@300;400;500;600;700&family=Noto+Naskh+Arabic:wght@400;700&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; }

  body {
    background: ${C.obsidian};
    color: ${C.white};
    font-family: 'Outfit', sans-serif;
    overflow-x: hidden;
  }

  .display { font-family: 'Cormorant Garamond', serif; }
  .arabic  { font-family: 'Noto Naskh Arabic', serif; direction: rtl; }

  /* ── scrollbar ── */
  ::-webkit-scrollbar { width: 4px; }
  ::-webkit-scrollbar-track { background: ${C.obsidian}; }
  ::-webkit-scrollbar-thumb { background: ${C.goldDk}; border-radius: 2px; }

  /* ── geometric pattern bg ── */
  .geo-bg {
    background-image:
      repeating-conic-gradient(${C.border} 0% 25%, transparent 0% 50%);
    background-size: 40px 40px;
    opacity: 0.18;
  }

  /* ── gold gradient text ── */
  .gold-text {
    background: linear-gradient(135deg, ${C.goldDk} 0%, ${C.gold} 50%, ${C.goldLt} 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .green-text {
    background: linear-gradient(135deg, ${C.green} 0%, ${C.greenLt} 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  /* ── divider ── */
  .gold-divider {
    width: 80px; height: 2px;
    background: linear-gradient(90deg, transparent, ${C.gold}, transparent);
    margin: 0 auto 1.5rem;
  }

  /* ── buttons ── */
  .btn-gold {
    display: inline-flex; align-items: center; gap: 8px;
    padding: 14px 32px;
    background: linear-gradient(135deg, ${C.goldDk}, ${C.gold});
    color: ${C.obsidian};
    font-family: 'Outfit', sans-serif;
    font-weight: 600; font-size: 0.9rem; letter-spacing: 0.08em; text-transform: uppercase;
    border: none; cursor: pointer; border-radius: 2px;
    transition: all 0.3s ease;
    text-decoration: none;
  }
  .btn-gold:hover {
    background: linear-gradient(135deg, ${C.gold}, ${C.goldLt});
    transform: translateY(-2px);
    box-shadow: 0 8px 32px rgba(201,162,82,0.35);
  }

  .btn-outline {
    display: inline-flex; align-items: center; gap: 8px;
    padding: 13px 32px;
    border: 1px solid ${C.gold};
    color: ${C.gold};
    font-family: 'Outfit', sans-serif;
    font-weight: 600; font-size: 0.9rem; letter-spacing: 0.08em; text-transform: uppercase;
    background: transparent; cursor: pointer; border-radius: 2px;
    transition: all 0.3s ease;
    text-decoration: none;
  }
  .btn-outline:hover {
    background: rgba(201,162,82,0.1);
    transform: translateY(-2px);
  }

  .btn-green {
    display: inline-flex; align-items: center; gap: 8px;
    padding: 14px 32px;
    background: linear-gradient(135deg, ${C.green}, ${C.greenLt});
    color: #fff;
    font-family: 'Outfit', sans-serif;
    font-weight: 600; font-size: 0.9rem; letter-spacing: 0.08em; text-transform: uppercase;
    border: none; cursor: pointer; border-radius: 2px;
    transition: all 0.3s ease;
    text-decoration: none;
  }
  .btn-green:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 32px rgba(0,168,96,0.3);
  }

  /* ── card ── */
  .card {
    background: ${C.panel};
    border: 1px solid ${C.border};
    border-radius: 4px;
    padding: 2rem;
    transition: all 0.35s ease;
    position: relative;
    overflow: hidden;
  }
  .card::before {
    content: '';
    position: absolute; top: 0; left: 0; right: 0; height: 2px;
    background: linear-gradient(90deg, transparent, ${C.gold}, transparent);
    opacity: 0;
    transition: opacity 0.35s;
  }
  .card:hover { border-color: ${C.goldDk}; transform: translateY(-4px); box-shadow: 0 16px 48px rgba(0,0,0,0.5); }
  .card:hover::before { opacity: 1; }

  .card-green::before { background: linear-gradient(90deg, transparent, ${C.greenLt}, transparent); }
  .card-green:hover { border-color: ${C.green}; box-shadow: 0 16px 48px rgba(0,105,62,0.3); }

  /* ── nav ── */
  .nav {
    position: fixed; top: 0; left: 0; right: 0; z-index: 1000;
    display: flex; align-items: center; justify-content: space-between;
    padding: 0 5%;
    height: 72px;
    transition: all 0.4s ease;
  }
  .nav.scrolled {
    background: rgba(7,7,12,0.95);
    backdrop-filter: blur(20px);
    border-bottom: 1px solid ${C.border};
    height: 64px;
  }
  .nav-logo { display: flex; align-items: center; gap: 12px; text-decoration: none; }
  .nav-emblem {
    width: 42px; height: 42px;
    background: linear-gradient(135deg, ${C.goldDk}, ${C.gold});
    border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.1rem; font-weight: 700; color: ${C.obsidian};
    flex-shrink: 0;
  }
  .nav-links { display: flex; align-items: center; gap: 2rem; }
  .nav-link {
    color: ${C.muted}; text-decoration: none; font-size: 0.85rem;
    font-weight: 500; letter-spacing: 0.05em; text-transform: uppercase;
    transition: color 0.2s;
    cursor: pointer;
  }
  .nav-link:hover { color: ${C.gold}; }

  /* ── section layout ── */
  .section { padding: 100px 5%; position: relative; }
  .section-header { text-align: center; margin-bottom: 4rem; }
  .overline {
    font-size: 0.75rem; letter-spacing: 0.25em; text-transform: uppercase;
    color: ${C.gold}; font-weight: 600; margin-bottom: 1rem;
    display: block;
  }
  .section-title {
    font-size: clamp(2rem, 4vw, 3.2rem);
    line-height: 1.15; font-weight: 300;
    font-family: 'Cormorant Garamond', serif;
  }
  .section-sub {
    color: ${C.muted}; max-width: 620px; margin: 1rem auto 0;
    line-height: 1.7; font-size: 0.95rem;
  }

  /* ── hero ── */
  .hero {
    min-height: 100vh; display: flex; flex-direction: column;
    align-items: center; justify-content: center;
    text-align: center; position: relative; overflow: hidden;
    padding: 120px 5% 80px;
  }
  .hero-pattern {
    position: absolute; inset: 0; pointer-events: none;
  }
  .hero-title {
    font-size: clamp(3rem, 8vw, 7rem);
    font-family: 'Cormorant Garamond', serif;
    font-weight: 300; line-height: 1.05;
    letter-spacing: -0.02em;
    position: relative; z-index: 1;
  }
  .hero-sub {
    font-size: clamp(0.9rem, 2vw, 1.15rem);
    color: ${C.muted}; max-width: 580px; line-height: 1.75;
    position: relative; z-index: 1; margin: 1.5rem auto 2.5rem;
  }
  .hero-arabic {
    font-family: 'Noto Naskh Arabic', serif;
    font-size: clamp(1.2rem, 3vw, 1.8rem);
    color: ${C.gold}; opacity: 0.7; margin-bottom: 0.5rem;
    position: relative; z-index: 1;
  }
  .hero-badges { display: flex; gap: 1rem; flex-wrap: wrap; justify-content: center; position: relative; z-index: 1; margin-top: 2rem; }
  .hero-badge {
    padding: 6px 18px; border: 1px solid ${C.border};
    font-size: 0.75rem; letter-spacing: 0.1em; text-transform: uppercase;
    color: ${C.muted}; border-radius: 100px;
  }
  .hero-badge.active { border-color: ${C.gold}; color: ${C.gold}; background: rgba(201,162,82,0.08); }

  /* ── grid layouts ── */
  .grid-3 { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 1.5rem; }
  .grid-2 { display: grid; grid-template-columns: repeat(auto-fit, minmax(380px, 1fr)); gap: 1.5rem; }
  .grid-4 { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 1.5rem; }

  /* ── service icon ── */
  .svc-icon {
    width: 56px; height: 56px; border-radius: 8px;
    display: flex; align-items: center; justify-content: center;
    font-size: 1.6rem; margin-bottom: 1.2rem;
    background: linear-gradient(135deg, rgba(201,162,82,0.12), rgba(201,162,82,0.04));
    border: 1px solid rgba(201,162,82,0.2);
  }

  /* ── stat bar ── */
  .stats-row { display: flex; flex-wrap: wrap; gap: 0; border: 1px solid ${C.border}; border-radius: 4px; overflow: hidden; }
  .stat-item { flex: 1 1 180px; padding: 2.5rem; text-align: center; border-right: 1px solid ${C.border}; }
  .stat-item:last-child { border-right: none; }
  .stat-num { font-family: 'Cormorant Garamond', serif; font-size: 3.5rem; font-weight: 300; line-height: 1; }
  .stat-label { font-size: 0.78rem; letter-spacing: 0.12em; text-transform: uppercase; color: ${C.muted}; margin-top: 0.4rem; }

  /* ── partner card ── */
  .partner-card {
    background: ${C.panel}; border: 1px solid ${C.border};
    border-radius: 4px; padding: 2.5rem 2rem; text-align: center;
    transition: all 0.35s;
  }
  .partner-card:hover { border-color: ${C.gold}; transform: translateY(-4px); box-shadow: 0 16px 40px rgba(0,0,0,0.5); }
  .partner-logo {
    width: 64px; height: 64px; border-radius: 12px; margin: 0 auto 1.2rem;
    display: flex; align-items: center; justify-content: center;
    font-size: 1.5rem; font-weight: 700; color: ${C.white};
  }

  /* ── job card ── */
  .job-card {
    background: ${C.panel}; border: 1px solid ${C.border};
    border-radius: 4px; padding: 1.8rem;
    display: flex; align-items: flex-start; gap: 1.2rem;
    transition: all 0.3s;
  }
  .job-card:hover { border-color: ${C.goldDk}; box-shadow: 0 8px 32px rgba(0,0,0,0.4); }
  .job-icon { width: 48px; height: 48px; border-radius: 8px; display: flex; align-items: center; justify-content: center; font-size: 1.3rem; flex-shrink: 0; background: rgba(201,162,82,0.1); border: 1px solid rgba(201,162,82,0.2); }
  .job-tag { display: inline-block; padding: 3px 10px; background: rgba(201,162,82,0.12); border: 1px solid rgba(201,162,82,0.3); border-radius: 100px; font-size: 0.7rem; letter-spacing: 0.08em; color: ${C.gold}; text-transform: uppercase; margin-right: 6px; margin-bottom: 6px; }
  .job-tag.green { background: rgba(0,105,62,0.15); border-color: rgba(0,168,96,0.3); color: ${C.greenLt}; }
  .job-tag.blue { background: rgba(75,107,251,0.12); border-color: rgba(75,107,251,0.3); color: #7B9BFF; }

  /* ── project card ── */
  .project-card {
    background: ${C.panel}; border: 1px solid ${C.border};
    border-radius: 4px; overflow: hidden;
    transition: all 0.35s;
  }
  .project-card:hover { border-color: ${C.gold}; transform: translateY(-4px); box-shadow: 0 20px 50px rgba(0,0,0,0.5); }
  .project-header { padding: 2rem; background: linear-gradient(135deg, ${C.charcoal}, ${C.panel}); position: relative; min-height: 140px; display: flex; align-items: flex-end; }
  .project-number { position: absolute; top: 1rem; right: 1.5rem; font-family: 'Cormorant Garamond', serif; font-size: 4rem; font-weight: 700; opacity: 0.06; color: ${C.gold}; }
  .project-body { padding: 1.8rem; }
  .project-sector { font-size: 0.72rem; letter-spacing: 0.15em; text-transform: uppercase; color: ${C.gold}; margin-bottom: 0.5rem; }

  /* ── UK section ── */
  .uk-card {
    background: linear-gradient(135deg, ${C.panel} 0%, rgba(75,107,251,0.06) 100%);
    border: 1px solid rgba(75,107,251,0.25); border-radius: 4px; padding: 2.5rem;
    transition: all 0.35s;
  }
  .uk-card:hover { border-color: rgba(75,107,251,0.5); box-shadow: 0 16px 48px rgba(75,107,251,0.1); }

  /* ── talent card ── */
  .talent-card {
    background: ${C.panel}; border: 1px solid ${C.border}; border-radius: 4px;
    padding: 1.5rem; display: flex; align-items: center; gap: 1rem;
    transition: all 0.3s;
  }
  .talent-card:hover { border-color: ${C.gold}; }
  .talent-avatar { width: 52px; height: 52px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 1.3rem; font-weight: 700; flex-shrink: 0; }

  /* ── form ── */
  .form-group { margin-bottom: 1.5rem; }
  .form-label { display: block; font-size: 0.78rem; letter-spacing: 0.12em; text-transform: uppercase; color: ${C.muted}; margin-bottom: 0.6rem; }
  .form-input, .form-select, .form-textarea {
    width: 100%; padding: 14px 16px;
    background: ${C.charcoal}; border: 1px solid ${C.border};
    border-radius: 2px; color: ${C.white}; font-family: 'Outfit', sans-serif; font-size: 0.9rem;
    transition: border-color 0.2s; outline: none;
  }
  .form-input:focus, .form-select:focus, .form-textarea:focus { border-color: ${C.gold}; }
  .form-textarea { resize: vertical; min-height: 120px; }
  .form-select option { background: ${C.charcoal}; }

  /* ── footer ── */
  .footer { background: ${C.obsidian}; border-top: 1px solid ${C.border}; padding: 60px 5% 30px; }
  .footer-grid { display: grid; grid-template-columns: 2fr 1fr 1fr 1fr; gap: 3rem; margin-bottom: 3rem; }
  .footer-link { display: block; color: ${C.muted}; text-decoration: none; font-size: 0.88rem; margin-bottom: 0.7rem; transition: color 0.2s; }
  .footer-link:hover { color: ${C.gold}; }
  .footer-bottom { border-top: 1px solid ${C.border}; padding-top: 1.5rem; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem; font-size: 0.8rem; color: ${C.muted}; }

  /* ── Islamic border ornament ── */
  .ornament { text-align: center; font-size: 1.5rem; color: ${C.gold}; opacity: 0.4; margin: 0.5rem 0; letter-spacing: 0.3em; }

  /* ── tabs ── */
  .tabs { display: flex; gap: 0; border: 1px solid ${C.border}; border-radius: 4px; overflow: hidden; margin-bottom: 2.5rem; flex-wrap: wrap; }
  .tab { flex: 1 1 auto; padding: 12px 24px; cursor: pointer; border: none; background: transparent; color: ${C.muted}; font-family: 'Outfit', sans-serif; font-size: 0.85rem; font-weight: 500; letter-spacing: 0.05em; text-transform: uppercase; transition: all 0.2s; text-align: center; }
  .tab.active { background: linear-gradient(135deg, ${C.goldDk}, ${C.gold}); color: ${C.obsidian}; font-weight: 700; }
  .tab:hover:not(.active) { background: rgba(201,162,82,0.07); color: ${C.gold}; }

  /* ── mobile hamburger ── */
  .hamburger { display: none; flex-direction: column; gap: 5px; cursor: pointer; padding: 4px; }
  .hamburger span { display: block; width: 24px; height: 2px; background: ${C.gold}; border-radius: 2px; transition: all 0.3s; }

  /* ── scroll reveal animation ── */
  @keyframes fadeUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
  @keyframes shimmer { 0% { opacity: 0.5; } 50% { opacity: 1; } 100% { opacity: 0.5; } }
  @keyframes rotateGeo { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
  @keyframes pulse { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.05); } }
  @keyframes slideIn { from { opacity: 0; transform: translateX(-20px); } to { opacity: 1; transform: translateX(0); } }

  .fade-up { animation: fadeUp 0.7s ease forwards; }
  .anim-1 { animation-delay: 0.1s; opacity: 0; }
  .anim-2 { animation-delay: 0.2s; opacity: 0; }
  .anim-3 { animation-delay: 0.3s; opacity: 0; }
  .anim-4 { animation-delay: 0.4s; opacity: 0; }
  .anim-5 { animation-delay: 0.5s; opacity: 0; }

  /* ── ribbon ── */
  .ribbon {
    background: linear-gradient(90deg, ${C.green} 0%, ${C.green} 40%, ${C.goldDk} 60%, ${C.gold} 100%);
    padding: 10px 5%; text-align: center; font-size: 0.8rem; letter-spacing: 0.12em;
    text-transform: uppercase; font-weight: 600; color: ${C.obsidian};
  }

  /* ── geo ornament SVG ── */
  .geo-ornament { position: absolute; opacity: 0.04; pointer-events: none; }

  @media (max-width: 900px) {
    .nav-links { display: none; }
    .hamburger { display: flex; }
    .footer-grid { grid-template-columns: 1fr 1fr; }
    .stats-row { flex-direction: column; }
    .stat-item { border-right: none; border-bottom: 1px solid ${C.border}; }
    .stat-item:last-child { border-bottom: none; }
  }
  @media (max-width: 600px) {
    .section { padding: 70px 4%; }
    .footer-grid { grid-template-columns: 1fr; }
  }
`;

// ── SVG icons ─────────────────────────────────────────────────────────────
const Icon = ({ name, size = 22, color = "currentColor" }) => {
  const icons = {
    cloud: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5"><path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"/></svg>,
    shield: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
    cpu: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5"><rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/><path d="M9 1v3M15 1v3M9 20v3M15 20v3M1 9h3M1 15h3M20 9h3M20 15h3"/></svg>,
    brain: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5"><path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96-.46 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 1.98-3A2.5 2.5 0 0 1 9.5 2Z"/><path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96-.46 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-1.98-3A2.5 2.5 0 0 0 14.5 2Z"/></svg>,
    users: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
    building: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>,
    code: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>,
    globe: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>,
    arrow: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>,
    check: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg>,
    star: <svg width={size} height={size} viewBox="0 0 24 24" fill={color} stroke={color} strokeWidth="1"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>,
    map: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>,
    mail: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>,
    phone: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13 19.79 19.79 0 0 1 1.61 4.36 2 2 0 0 1 3.58 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.08 6.08l1.07-1.07a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>,
    linkedin: <svg width={size} height={size} viewBox="0 0 24 24" fill={color}><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>,
    briefcase: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>,
    zap: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>,
    award: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5"><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11"/></svg>,
    handshake: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5"><path d="M20.42 4.58a5.4 5.4 0 0 0-7.65 0l-.77.78-.77-.78a5.4 5.4 0 0 0-7.65 7.65l8.42 8.42 8.42-8.42a5.4 5.4 0 0 0 0-7.65z"/></svg>,
    trending: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>,
    upload: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5"><polyline points="16 16 12 12 8 16"/><line x1="12" y1="12" x2="12" y2="21"/><path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3"/></svg>,
  };
  return icons[name] || null;
};

// ── Islamic Geometric SVG background ─────────────────────────────────────
const IslamicPattern = () => (
  <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.04 }} xmlns="http://www.w3.org/2000/svg">
    <defs>
      <pattern id="ip" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
        <polygon points="40,5 55,20 75,20 75,40 55,55 40,70 25,55 5,55 5,20 25,20" fill="none" stroke={C.gold} strokeWidth="0.7"/>
        <polygon points="40,18 50,28 62,28 62,38 50,48 40,58 30,48 18,48 18,28 30,28" fill="none" stroke={C.gold} strokeWidth="0.5"/>
        <line x1="40" y1="5" x2="40" y2="18" stroke={C.gold} strokeWidth="0.4"/>
        <line x1="75" y1="40" x2="62" y2="38" stroke={C.gold} strokeWidth="0.4"/>
        <line x1="5" y1="40" x2="18" y2="38" stroke={C.gold} strokeWidth="0.4"/>
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#ip)"/>
  </svg>
);

// ── data ───────────────────────────────────────────────────────────────────
const SERVICES = [
  { icon: "code",     color: "#C9A252", title: "Information Technology Services",
    desc: "Full-spectrum IT solutions tailored for Vision 2030 — from enterprise infrastructure design and managed services to bespoke software development for public and private sector clients across the Kingdom.",
    points: ["Enterprise Infrastructure", "Managed IT Services", "Software Development", "ERP & CRM Integration"] },
  { icon: "cloud",    color: "#7B9BFF", title: "Cloud Solutions & Cybersecurity",
    desc: "Multi-cloud architectures, migration strategies, and world-class cybersecurity postures that protect critical national assets. Certified partnerships with AWS, Azure, and Google Cloud.",
    points: ["Multi-Cloud Architecture", "Security Operations (SOC)", "Compliance & Governance", "Disaster Recovery"] },
  { icon: "zap",      color: "#C9A252", title: "Digital Transformation & Automation",
    desc: "End-to-end digital transformation programmes that reimagine legacy workflows, integrate RPA and intelligent automation, and position organisations for the digital economy of Saudi Arabia.",
    points: ["Process Automation (RPA)", "Digital Strategy", "Legacy Modernisation", "API & Integration Layer"] },
  { icon: "brain",    color: "#00A860", title: "Artificial Intelligence Solutions",
    desc: "From Arabic NLP and machine-learning models to computer-vision and predictive analytics — we build AI that speaks the language of the Kingdom and delivers measurable ROI.",
    points: ["Arabic NLP & Chatbots", "Predictive Analytics", "Computer Vision", "AI Strategy & Roadmaps"] },
  { icon: "users",    color: "#C9A252", title: "HR Consultancy & Outsourcing",
    desc: "Comprehensive human capital solutions — talent acquisition, Saudisation (Nitaqat) compliance, payroll outsourcing, performance frameworks, and C-suite executive search across all industries.",
    points: ["Executive Search", "Nitaqat Compliance", "Payroll Outsourcing", "Learning & Development"] },
  { icon: "building", color: "#7B9BFF", title: "Government & Private Sector Projects",
    desc: "Decades of trust with ministries, Vision 2030 giga-projects, and leading corporates. Programme management, digital government initiatives, and smart-city consulting at national scale.",
    points: ["Vision 2030 Programmes", "Smart City Consulting", "PPP Project Advisory", "Programme Management"] },
];

const PARTNERS = [
  { name: "Business Technique Limited", abbr: "BT", bg: "#1a1a3e", accent: "#7B9BFF",
    country: "🇬🇧 United Kingdom", role: "Technology Consulting & Digital Transformation",
    desc: "A distinguished UK-based consultancy bringing world-class technology advisory, enterprise architecture expertise, and proven delivery methodologies to FARAZM's Saudi operations.",
    tags: ["Digital Strategy", "Enterprise Architecture", "Consulting"] },
  { name: "Go Agile Cloud Limited", abbr: "GAC", bg: "#0f2a1e", accent: "#00A860",
    country: "🇬🇧 United Kingdom", role: "Agile Cloud Engineering",
    desc: "Specialists in cloud-native engineering, DevOps, and agile delivery. Empowering Saudi enterprises to deploy at speed and scale with best-in-class cloud infrastructure.",
    tags: ["Cloud Native", "DevOps", "Agile Delivery"] },
  { name: "GoAgile Academy Limited", abbr: "GAA", bg: "#1a2a0e", accent: "#C9A252",
    country: "🇬🇧 United Kingdom", role: "Professional Training & Certifications",
    desc: "Internationally accredited training academy delivering Agile, Scrum, cloud, and digital skills programmes — upskilling Saudi workforce in alignment with Vision 2030 human capital goals.",
    tags: ["Agile Certification", "Scrum Master", "Cloud Training"] },
  { name: "Primacloud Solutions", abbr: "PC", bg: "#1a0f2a", accent: "#C9A252",
    country: "🇬🇧 United Kingdom", role: "Cloud Infrastructure & Managed Services",
    desc: "Premium cloud infrastructure specialists delivering robust, secure, and scalable managed cloud environments. Supporting FARAZM's delivery of enterprise-grade cloud solutions across KSA.",
    tags: ["Managed Cloud", "Infrastructure", "Security"] },
];

const PROJECTS = [
  { no: "01", sector: "Government Digital Services", title: "National Digital Portal Transformation", location: "Riyadh, KSA", scope: "Full-stack digital portal redesign serving 4M+ citizens, integrated with 14 government agencies.", year: "2022–2023", value: "SAR 45M+" },
  { no: "02", sector: "Healthcare Technology", title: "Smart Hospital Management System", location: "Jeddah, KSA", scope: "AI-assisted hospital information system across 3 hospital campuses, covering patient journey, clinical workflows, and analytics.", year: "2021–2022", value: "SAR 28M+" },
  { no: "03", sector: "Energy & Utilities", title: "Oil & Gas Field IoT Monitoring Platform", location: "Eastern Province, KSA", scope: "Real-time IoT sensor network and predictive maintenance platform for upstream oil field operations.", year: "2020–2021", value: "SAR 62M+" },
  { no: "04", sector: "Financial Services", title: "Core Banking Cloud Migration", location: "Riyadh, KSA", scope: "Led the cloud-first migration of a regional bank's core banking platform to a fully managed multi-cloud environment with SOC 2 compliance.", year: "2023–2024", value: "SAR 35M+" },
  { no: "05", sector: "Smart City & Infrastructure", title: "Integrated Smart City Command Centre", location: "NEOM, KSA", scope: "Design and delivery of centralised smart-city operations platform integrating traffic, utilities, public safety, and citizen services.", year: "2023–Ongoing", value: "SAR 90M+" },
  { no: "06", sector: "Education Technology", title: "National e-Learning Platform", location: "Kingdom-wide", scope: "Scalable e-learning ecosystem for 700,000+ students — Arabic-first, AI-powered personalisation, Ministry-integrated LMS.", year: "2022–2023", value: "SAR 22M+" },
];

const JOBS = [
  { icon: "💻", title: "Senior Cloud Architect", type: "Full-Time", location: "Riyadh, KSA", exp: "8+ yrs", tags: ["AWS", "Azure", "SAR 35k/mo"], color: C.gold },
  { icon: "🤖", title: "AI/ML Engineer (Arabic NLP)", type: "Full-Time", location: "Riyadh, KSA", exp: "5+ yrs", tags: ["Python", "PyTorch", "LLMs"], color: C.greenLt },
  { icon: "🛡️", title: "Cybersecurity Consultant", type: "Contract", location: "Jeddah / Remote", exp: "7+ yrs", tags: ["CISSP", "ISO 27001", "SOC"], color: "#7B9BFF" },
  { icon: "📊", title: "Digital Transformation Lead", type: "Full-Time", location: "Riyadh, KSA", exp: "10+ yrs", tags: ["Agile", "Change Mgmt"], color: C.gold },
  { icon: "🧑‍💼", title: "HR Business Partner (Tech Sector)", type: "Full-Time", location: "Riyadh, KSA", exp: "5+ yrs", tags: ["Nitaqat", "Recruitment", "L&D"], color: C.greenLt },
  { icon: "🏗️", title: "Programme Manager – Giga Projects", type: "Contract", location: "NEOM / Riyadh", exp: "12+ yrs", tags: ["PMP", "Prince2", "Vision 2030"], color: "#7B9BFF" },
  { icon: "🌐", title: "Full-Stack Developer (React/Node)", type: "Full-Time", location: "Riyadh, KSA", exp: "4+ yrs", tags: ["React", "Node.js", "Arabic UI"], color: C.gold },
  { icon: "📱", title: "Mobile App Developer (iOS/Android)", type: "Full-Time", location: "Jeddah, KSA", exp: "4+ yrs", tags: ["Flutter", "React Native"], color: C.greenLt },
];

const TALENT_POOL = [
  { flag: "🇬🇧", region: "United Kingdom", count: "340+", roles: "Cloud Engineers, AI Specialists, PMs", color: "#4B6BFB" },
  { flag: "🇺🇸", region: "United States", count: "180+", roles: "AI/ML Researchers, Architects, CTOs", color: "#C9A252" },
  { flag: "🇩🇪", region: "Germany & Europe", count: "210+", roles: "IoT Engineers, SAP Specialists, DevOps", color: "#00A860" },
  { flag: "🇦🇺", region: "Australia & Asia-Pacific", count: "95+", roles: "Data Scientists, Cybersecurity Leads", color: "#C9A252" },
];

// ── main component ─────────────────────────────────────────────────────────
export default function FarazmHoldings() {
  const [navScrolled, setNavScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("vacancies");
  const [cvForm, setCvForm] = useState({ name: "", email: "", role: "", country: "", exp: "", file: null, msg: "" });
  const [contactForm, setContactForm] = useState({ name: "", company: "", email: "", phone: "", service: "", msg: "" });
  const [submitted, setSubmitted] = useState(false);
  const [cvSubmitted, setCvSubmitted] = useState(false);

  useEffect(() => {
    const onScroll = () => setNavScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMobileOpen(false);
  };

  return (
    <>
      <style>{styles}</style>

      {/* ── top ribbon ── */}
      <div className="ribbon">
        🌟 &nbsp; FARAZM Holdings — Bridging Excellence Across Saudi Arabia & the United Kingdom &nbsp; 🌟
      </div>

      {/* ── NAVBAR ── */}
      <nav className={`nav${navScrolled ? " scrolled" : ""}`}>
        <a className="nav-logo" onClick={() => scrollTo("hero")} style={{ cursor: "pointer" }}>
          <div className="nav-emblem">FH</div>
          <div>
            <div style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 700, fontSize: "1.1rem", color: C.white, letterSpacing: "0.04em", lineHeight: 1.1 }}>FARAZM</div>
            <div style={{ fontSize: "0.62rem", letterSpacing: "0.25em", textTransform: "uppercase", color: C.gold, lineHeight: 1.2 }}>HOLDINGS · KSA</div>
          </div>
        </a>

        <div className="nav-links">
          {[["about","About"],["services","Services"],["projects","Projects"],["partners","Partners"],["talent","Talent Hub"],["contact","Contact"]].map(([id,label]) => (
            <span key={id} className="nav-link" onClick={() => scrollTo(id)}>{label}</span>
          ))}
          <span className="btn-gold" onClick={() => scrollTo("contact")} style={{ padding: "10px 22px", fontSize: "0.78rem" }}>Get in Touch</span>
        </div>

        <div className="hamburger" onClick={() => setMobileOpen(o => !o)}>
          <span/><span/><span/>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div style={{ position: "fixed", top: 64, left: 0, right: 0, background: C.onyx, borderBottom: `1px solid ${C.border}`, zIndex: 999, padding: "1.5rem 5%" }}>
          {[["about","About"],["services","Services"],["projects","Projects"],["partners","Partners"],["talent","Talent Hub"],["contact","Contact"]].map(([id,label]) => (
            <div key={id} onClick={() => scrollTo(id)} style={{ padding: "12px 0", borderBottom: `1px solid ${C.border}`, color: C.white, cursor: "pointer", fontWeight: 500 }}>{label}</div>
          ))}
        </div>
      )}

      {/* ── HERO ── */}
      <section id="hero" className="hero">
        <div style={{ position: "absolute", inset: 0, background: `radial-gradient(ellipse 80% 60% at 50% 40%, rgba(201,162,82,0.07) 0%, transparent 60%), radial-gradient(ellipse 60% 40% at 80% 80%, rgba(0,105,62,0.06) 0%, transparent 50%)` }} />
        <IslamicPattern />

        <div className="ornament fade-up anim-1">✦ ✧ ✦</div>
        <div className="hero-arabic fade-up anim-1">شركة فرازم للاستثمارات القابضة</div>

        <h1 className="hero-title fade-up anim-2">
          <span className="gold-text">FARAZM</span><br/>
          <span style={{ fontWeight: 300 }}>HOLDINGS</span>
        </h1>

        <div style={{ display: "flex", alignItems: "center", gap: "12px", marginTop: "0.5rem", position: "relative", zIndex: 1 }} className="fade-up anim-3">
          <span style={{ width: 32, height: 1, background: C.gold, opacity: 0.6 }}/>
          <span style={{ fontSize: "0.8rem", letterSpacing: "0.28em", textTransform: "uppercase", color: C.gold }}>Kingdom of Saudi Arabia</span>
          <span style={{ width: 32, height: 1, background: C.gold, opacity: 0.6 }}/>
        </div>

        <p className="hero-sub fade-up anim-3">
          A premier Saudi conglomerate driving digital excellence, AI innovation, and human capital transformation across the Kingdom — in strategic alliance with leading United Kingdom partners.
        </p>

        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", justifyContent: "center", position: "relative", zIndex: 1 }} className="fade-up anim-4">
          <span className="btn-gold" onClick={() => scrollTo("services")}>Explore Services <Icon name="arrow" size={16} color={C.obsidian}/></span>
          <span className="btn-outline" onClick={() => scrollTo("talent")}>Browse Opportunities <Icon name="briefcase" size={16} color={C.gold}/></span>
        </div>

        <div className="hero-badges fade-up anim-5">
          {["Vision 2030 Aligned","UK–KSA Strategic Alliance","400+ Global Talent Pool","6 Core Sectors","20+ Major Projects"].map(b => (
            <span key={b} className={`hero-badge${b.includes("Vision") ? " active" : ""}`}>{b}</span>
          ))}
        </div>

        {/* scroll cue */}
        <div style={{ position: "absolute", bottom: "2rem", left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: 6, opacity: 0.4, animation: "pulse 2s ease infinite" }}>
          <div style={{ width: 1, height: 40, background: `linear-gradient(${C.gold}, transparent)` }}/>
          <span style={{ fontSize: "0.65rem", letterSpacing: "0.2em", color: C.gold, textTransform: "uppercase" }}>Scroll</span>
        </div>
      </section>

      {/* ── STATS ── */}
      <div style={{ padding: "0 5% 80px" }}>
        <div className="stats-row">
          {[
            { num: "25+", label: "Years in the Kingdom", icon: "⏳" },
            { num: "SAR 400M+", label: "Project Portfolio Value", icon: "💰" },
            { num: "4", label: "UK Strategic Partners", icon: "🤝" },
            { num: "800+", label: "Global Talent Network", icon: "🌍" },
            { num: "6", label: "Core Business Verticals", icon: "📊" },
          ].map(s => (
            <div key={s.label} className="stat-item">
              <div style={{ fontSize: "1.5rem", marginBottom: "0.4rem" }}>{s.icon}</div>
              <div className="stat-num gold-text">{s.num}</div>
              <div className="stat-label">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── ABOUT ── */}
      <section id="about" className="section" style={{ background: C.onyx, position: "relative", overflow: "hidden" }}>
        <IslamicPattern />
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))", gap: "4rem", alignItems: "center" }}>
          <div>
            <span className="overline">Who We Are</span>
            <h2 className="section-title" style={{ textAlign: "left", marginBottom: "1.5rem" }}>
              A Legacy of <span className="gold-text">Excellence</span><br/>in the Kingdom
            </h2>
            <div className="gold-divider" style={{ margin: "0 0 2rem" }}/>
            <p style={{ color: C.muted, lineHeight: 1.85, marginBottom: "1.2rem", fontSize: "0.95rem" }}>
              FARAZM Holdings has been a trusted pillar of Saudi Arabia's commercial landscape for over two decades. Founded in the Kingdom, we have grown from a regional technology services firm into a multi-vertical conglomerate deeply embedded in the nation's Vision 2030 transformation journey.
            </p>
            <p style={{ color: C.muted, lineHeight: 1.85, marginBottom: "1.2rem", fontSize: "0.95rem" }}>
              Our roots are Saudi, our vision is global. We have delivered landmark projects for government ministries, giga-project authorities, energy giants, financial institutions, and healthcare leaders across the Kingdom. Today, through our strategic alliances with elite United Kingdom technology and consulting firms, we bring the world's best talent and methodologies directly to our clients.
            </p>
            <p style={{ color: C.muted, lineHeight: 1.85, fontSize: "0.95rem" }}>
              We are proud custodians of the trust our clients place in us — building not just systems, but futures.
            </p>
            <div style={{ marginTop: "2rem", display: "flex", flexWrap: "wrap", gap: "0.8rem" }}>
              {["Riyadh HQ","Jeddah Office","NEOM Project Base","UK Office (London)"].map(l => (
                <span key={l} style={{ display: "flex", alignItems: "center", gap: 6, padding: "8px 16px", border: `1px solid ${C.border}`, borderRadius: 100, fontSize: "0.78rem", color: C.muted }}>
                  <Icon name="map" size={13} color={C.gold}/>{l}
                </span>
              ))}
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "1.2rem" }}>
            {[
              { icon: "🏆", title: "Vision 2030 Aligned", desc: "Every solution we deliver is designed to advance Saudi Arabia's national transformation objectives across digitalisation, human capital, and economic diversification." },
              { icon: "🌍", title: "Global Standards, Local Wisdom", desc: "We combine international best practices from our UK and global partners with deep in-Kingdom relationships, cultural intelligence, and regulatory expertise." },
              { icon: "🤝", title: "Trusted by Government & Industry", desc: "From Royal Commission projects to leading private conglomerates, FARAZM's reputation for delivery excellence is unmatched in the region." },
              { icon: "🎓", title: "Committed to Saudisation", desc: "We actively champion Nitaqat compliance, invest in Saudi talent development, and build pathways for the next generation of Saudi leaders in tech and business." },
            ].map(i => (
              <div key={i.title} className="card" style={{ display: "flex", gap: "1rem", alignItems: "flex-start", padding: "1.4rem" }}>
                <div style={{ fontSize: "1.6rem", flexShrink: 0 }}>{i.icon}</div>
                <div>
                  <div style={{ fontWeight: 600, fontSize: "0.95rem", marginBottom: "0.4rem" }}>{i.title}</div>
                  <div style={{ color: C.muted, fontSize: "0.85rem", lineHeight: 1.65 }}>{i.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section id="services" className="section" style={{ position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, background: `radial-gradient(ellipse 70% 50% at 50% 50%, rgba(201,162,82,0.04) 0%, transparent 70%)` }}/>
        <div className="section-header">
          <span className="overline">Our Capabilities</span>
          <h2 className="section-title">Six Pillars of <span className="gold-text">Transformation</span></h2>
          <div className="gold-divider"/>
          <p className="section-sub">From infrastructure to intelligence — we deliver comprehensive solutions that drive Saudi Arabia's digital future at every level of the enterprise and government ecosystem.</p>
        </div>

        <div className="grid-3">
          {SERVICES.map((s, i) => (
            <div key={s.title} className="card fade-up" style={{ animationDelay: `${0.1 * i}s`, opacity: 0 }}>
              <div className="svc-icon" style={{ background: `linear-gradient(135deg, ${s.color}18, ${s.color}06)`, borderColor: `${s.color}30` }}>
                <Icon name={s.icon} size={24} color={s.color}/>
              </div>
              <h3 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "1.3rem", fontWeight: 600, marginBottom: "0.8rem", lineHeight: 1.2 }}>{s.title}</h3>
              <p style={{ color: C.muted, fontSize: "0.88rem", lineHeight: 1.75, marginBottom: "1.2rem" }}>{s.desc}</p>
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.4rem" }}>
                {s.points.map(p => (
                  <li key={p} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: "0.82rem", color: C.muted }}>
                    <Icon name="check" size={13} color={s.color}/> {p}
                  </li>
                ))}
              </ul>
              <div style={{ marginTop: "1.5rem", paddingTop: "1rem", borderTop: `1px solid ${C.border}`, display: "flex", alignItems: "center", gap: 6, color: s.color, fontSize: "0.8rem", cursor: "pointer", fontWeight: 600, letterSpacing: "0.05em" }} onClick={() => scrollTo("contact")}>
                Learn More <Icon name="arrow" size={14} color={s.color}/>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── UK ALLIANCE ── */}
      <section style={{ padding: "80px 5%", background: C.onyx, position: "relative", overflow: "hidden" }}>
        <IslamicPattern />
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div className="section-header">
            <span className="overline">International Alliance</span>
            <h2 className="section-title">Bridging <span style={{ background: "linear-gradient(135deg,#012169,#CF142B)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>United Kingdom</span> Excellence to Saudi Arabia</h2>
            <div className="gold-divider"/>
            <p className="section-sub">FARAZM Holdings has forged deep strategic partnerships with elite British technology and consulting firms, creating a powerful conduit for global expertise, proven methodologies, and world-class talent to serve the Kingdom's transformation ambitions.</p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))", gap: "1.5rem", marginBottom: "3rem" }}>
            {[
              { flag: "🇸🇦", title: "Saudi Vision & Delivery", text: "Deep Kingdom relationships, government access, regulatory know-how, and 25+ years of on-the-ground project delivery experience.", color: C.green },
              { flag: "🇬🇧", title: "UK Expertise & Innovation", text: "Access to the UK's world-leading technology talent, agile delivery frameworks, AI research capability, and internationally accredited training programmes.", color: "#4B6BFB" },
              { flag: "🌐", title: "Global Talent Pipeline", text: "An exclusive pipeline of 800+ screened senior professionals from the UK, US, Europe, and beyond — ready to deploy to Saudi projects within weeks.", color: C.gold },
            ].map(c => (
              <div key={c.title} className="uk-card">
                <div style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>{c.flag}</div>
                <h3 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "1.35rem", fontWeight: 600, marginBottom: "0.7rem", color: c.color }}>{c.title}</h3>
                <p style={{ color: C.muted, lineHeight: 1.75, fontSize: "0.9rem" }}>{c.text}</p>
              </div>
            ))}
          </div>

          <div style={{ background: C.panel, border: `1px solid ${C.border}`, borderRadius: 4, padding: "2.5rem", display: "flex", flexWrap: "wrap", gap: "2rem", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ flex: "1 1 400px" }}>
              <div style={{ fontSize: "0.75rem", letterSpacing: "0.2em", textTransform: "uppercase", color: C.gold, marginBottom: "0.8rem" }}>Partnership Model</div>
              <h3 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "1.8rem", fontWeight: 300, marginBottom: "1rem" }}>A True <span className="gold-text">Co-Delivery</span> Alliance</h3>
              <p style={{ color: C.muted, lineHeight: 1.8, fontSize: "0.9rem" }}>Our UK partners are not sub-contractors — they are equity-aligned co-delivery partners. Together we form integrated project teams with shared accountability, blended KSA–UK leadership, and a single point of accountability for our clients.</p>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.8rem", flex: "0 0 auto" }}>
              {["Co-delivery Teams","Joint IP Development","Shared Governance","Regulatory Compliance","UK–KSA Talent Mobility","Cultural Integration"].map(t => (
                <span key={t} style={{ padding: "8px 16px", border: `1px solid rgba(75,107,251,0.3)`, borderRadius: 100, fontSize: "0.78rem", color: "#7B9BFF", background: "rgba(75,107,251,0.07)" }}>{t}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── PROJECTS ── */}
      <section id="projects" className="section" style={{ position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, background: `radial-gradient(ellipse 60% 40% at 30% 60%, rgba(0,105,62,0.04) 0%, transparent 60%)` }}/>
        <div className="section-header">
          <span className="overline">Track Record</span>
          <h2 className="section-title">Landmark <span className="gold-text">Projects</span> Across the Kingdom</h2>
          <div className="gold-divider"/>
          <p className="section-sub">From Vision 2030 giga-projects to critical national infrastructure — a selection of the major engagements FARAZM Holdings has delivered for Saudi Arabia's most prominent clients.</p>
        </div>

        <div className="grid-3">
          {PROJECTS.map((p, i) => (
            <div key={p.no} className="project-card fade-up" style={{ animationDelay: `${0.1 * i}s`, opacity: 0 }}>
              <div className="project-header">
                <div className="project-number">{p.no}</div>
                <div>
                  <div style={{ fontSize: "0.7rem", letterSpacing: "0.15em", textTransform: "uppercase", color: C.gold, marginBottom: "0.4rem" }}>{p.sector}</div>
                  <h3 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "1.2rem", fontWeight: 600 }}>{p.title}</h3>
                </div>
              </div>
              <div className="project-body">
                <div style={{ display: "flex", gap: "0.6rem", flexWrap: "wrap", marginBottom: "1rem" }}>
                  <span style={{ display: "flex", alignItems: "center", gap: 5, fontSize: "0.75rem", color: C.muted }}><Icon name="map" size={11} color={C.gold}/>{p.location}</span>
                  <span style={{ display: "flex", alignItems: "center", gap: 5, fontSize: "0.75rem", color: C.muted }}>📅 {p.year}</span>
                  <span style={{ display: "flex", alignItems: "center", gap: 5, fontSize: "0.75rem", color: C.greenLt }}>💰 {p.value}</span>
                </div>
                <p style={{ color: C.muted, fontSize: "0.85rem", lineHeight: 1.7 }}>{p.scope}</p>
              </div>
            </div>
          ))}
        </div>

        <div style={{ textAlign: "center", marginTop: "3rem" }}>
          <span className="btn-outline" onClick={() => scrollTo("contact")}>Discuss Your Project <Icon name="arrow" size={15} color={C.gold}/></span>
        </div>
      </section>

      {/* ── PARTNERS ── */}
      <section id="partners" className="section" style={{ background: C.onyx, position: "relative", overflow: "hidden" }}>
        <IslamicPattern />
        <div className="section-header">
          <span className="overline">Strategic Partners</span>
          <h2 className="section-title">Our <span className="gold-text">Alliance</span> Network</h2>
          <div className="gold-divider"/>
          <p className="section-sub">FARAZM Holdings operates in formal strategic collaboration with four distinguished United Kingdom-based technology and consulting organisations — creating a uniquely powerful KSA–UK delivery capability.</p>
        </div>

        <div className="grid-2">
          {PARTNERS.map((p, i) => (
            <div key={p.name} className="partner-card fade-up" style={{ animationDelay: `${0.1 * i}s`, opacity: 0 }}>
              <div style={{ display: "flex", alignItems: "flex-start", gap: "1.2rem", marginBottom: "1.5rem" }}>
                <div className="partner-logo" style={{ background: p.bg, border: `2px solid ${p.accent}30` }}>
                  <span style={{ color: p.accent, fontFamily: "'Cormorant Garamond',serif", fontSize: "1.1rem", fontWeight: 700 }}>{p.abbr}</span>
                </div>
                <div>
                  <h3 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "1.25rem", fontWeight: 600, marginBottom: "0.3rem" }}>{p.name}</h3>
                  <div style={{ fontSize: "0.8rem", color: p.accent, marginBottom: "0.2rem" }}>{p.role}</div>
                  <div style={{ fontSize: "0.75rem", color: C.muted }}>{p.country}</div>
                </div>
              </div>
              <p style={{ color: C.muted, fontSize: "0.88rem", lineHeight: 1.75, marginBottom: "1.2rem" }}>{p.desc}</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                {p.tags.map(t => (
                  <span key={t} style={{ padding: "4px 12px", background: `${p.accent}12`, border: `1px solid ${p.accent}30`, borderRadius: 100, fontSize: "0.72rem", color: p.accent, letterSpacing: "0.06em" }}>{t}</span>
                ))}
              </div>
              <div style={{ marginTop: "1.5rem", paddingTop: "1rem", borderTop: `1px solid ${C.border}`, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <span style={{ fontSize: "0.75rem", color: C.muted }}>In Partnership with FARAZM Holdings KSA</span>
                <div style={{ width: 28, height: 28, borderRadius: "50%", background: `${p.accent}15`, border: `1px solid ${p.accent}30`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Icon name="arrow" size={13} color={p.accent}/>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: "3rem", padding: "2.5rem", background: C.panel, border: `1px solid ${C.border}`, borderRadius: 4, textAlign: "center" }}>
          <div className="ornament">✦ ✧ ✦</div>
          <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "1.4rem", fontWeight: 300, fontStyle: "italic", color: C.white, maxWidth: 700, margin: "0 auto", lineHeight: 1.6 }}>
            "Together, we represent a new standard of delivery excellence for the Kingdom — combining Saudi roots, global reach, and an unwavering commitment to Vision 2030."
          </p>
          <div style={{ marginTop: "1rem", fontSize: "0.78rem", letterSpacing: "0.15em", textTransform: "uppercase", color: C.gold }}>FARAZM Holdings Leadership</div>
        </div>
      </section>

      {/* ── TALENT HUB ── */}
      <section id="talent" className="section" style={{ position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, background: `radial-gradient(ellipse 70% 50% at 70% 30%, rgba(201,162,82,0.04) 0%, transparent 60%)` }}/>
        <div className="section-header">
          <span className="overline">FARAZM Talent Hub</span>
          <h2 className="section-title">The <span className="gold-text">Boutique</span> Talent & Careers Platform</h2>
          <div className="gold-divider"/>
          <p className="section-sub">We are Saudi Arabia's premier boutique talent broker for high-calibre technology, digital, and business professionals from across the United Kingdom, United States, and Europe — ready to deploy to the Kingdom's most exciting projects.</p>
        </div>

        {/* Global talent stats */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "1.2rem", marginBottom: "3rem" }}>
          {TALENT_POOL.map(t => (
            <div key={t.region} className="card" style={{ textAlign: "center" }}>
              <div style={{ fontSize: "2.5rem", marginBottom: "0.5rem" }}>{t.flag}</div>
              <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "2.2rem", fontWeight: 300, background: `linear-gradient(135deg, ${t.color}, #fff)`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>{t.count}</div>
              <div style={{ fontWeight: 600, fontSize: "0.9rem", marginBottom: "0.3rem" }}>{t.region}</div>
              <div style={{ fontSize: "0.78rem", color: C.muted }}>{t.roles}</div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="tabs">
          {[["vacancies","Current Vacancies 🗂️"],["submit","Submit Your CV 📄"],["onboarding","Onboarding Journey 🚀"],["employers","For Employers 🏢"]].map(([id,label]) => (
            <button key={id} className={`tab${activeTab === id ? " active" : ""}`} onClick={() => setActiveTab(id)}>{label}</button>
          ))}
        </div>

        {/* VACANCIES */}
        {activeTab === "vacancies" && (
          <div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))", gap: "1rem" }}>
              {JOBS.map((j, i) => (
                <div key={j.title} className="job-card" style={{ animationDelay: `${0.07 * i}s` }}>
                  <div className="job-icon" style={{ background: `${j.color}12`, borderColor: `${j.color}25` }}>
                    <span style={{ fontSize: "1.3rem" }}>{j.icon}</span>
                  </div>
                  <div style={{ flex: 1 }}>
                    <h4 style={{ fontWeight: 600, fontSize: "0.95rem", marginBottom: "0.3rem" }}>{j.title}</h4>
                    <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", marginBottom: "0.6rem" }}>
                      <span className="job-tag">{j.type}</span>
                      <span className="job-tag green">{j.exp}</span>
                      <span className="job-tag blue">{j.location}</span>
                    </div>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
                      {j.tags.map(t => <span key={t} className="job-tag">{t}</span>)}
                    </div>
                    <div style={{ marginTop: "0.8rem" }}>
                      <button className="btn-gold" style={{ padding: "8px 18px", fontSize: "0.75rem" }} onClick={() => setActiveTab("submit")}>Apply Now</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ marginTop: "2rem", padding: "1.5rem 2rem", background: C.panel, border: `1px solid ${C.border}`, borderRadius: 4, display: "flex", flexWrap: "wrap", gap: "1rem", alignItems: "center", justifyContent: "space-between" }}>
              <div>
                <div style={{ fontWeight: 600, marginBottom: "0.3rem" }}>Don't see your role listed?</div>
                <div style={{ color: C.muted, fontSize: "0.88rem" }}>We place exceptional talent across all levels. Submit your CV and our boutique team will match you with the perfect Saudi opportunity.</div>
              </div>
              <button className="btn-gold" onClick={() => setActiveTab("submit")}>Submit Speculatively <Icon name="arrow" size={15} color={C.obsidian}/></button>
            </div>
          </div>
        )}

        {/* SUBMIT CV */}
        {activeTab === "submit" && (
          <div style={{ maxWidth: 720, margin: "0 auto" }}>
            {cvSubmitted ? (
              <div style={{ textAlign: "center", padding: "4rem 2rem", background: C.panel, border: `1px solid ${C.green}`, borderRadius: 4 }}>
                <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>✅</div>
                <h3 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "2rem", marginBottom: "0.8rem" }}>
                  <span className="green-text">Application Received</span>
                </h3>
                <p style={{ color: C.muted, lineHeight: 1.7, fontSize: "0.95rem" }}>Thank you for submitting your profile to FARAZM Holdings. Our boutique talent team will review your application and be in touch within 3–5 business days.</p>
                <button className="btn-green" style={{ marginTop: "2rem" }} onClick={() => { setCvSubmitted(false); setCvForm({ name:"",email:"",role:"",country:"",exp:"",file:null,msg:"" }); }}>Submit Another</button>
              </div>
            ) : (
              <div className="card">
                <h3 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "1.6rem", marginBottom: "0.5rem" }}>Submit Your <span className="gold-text">CV & Profile</span></h3>
                <p style={{ color: C.muted, fontSize: "0.88rem", marginBottom: "2rem", lineHeight: 1.6 }}>Join our exclusive talent network for premium opportunities across Saudi Arabia's most exciting projects. Our boutique consultants handle each application personally.</p>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.2rem" }}>
                  <div className="form-group">
                    <label className="form-label">Full Name *</label>
                    <input className="form-input" value={cvForm.name} onChange={e => setCvForm(f => ({...f,name:e.target.value}))} placeholder="Your full name"/>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Email Address *</label>
                    <input className="form-input" type="email" value={cvForm.email} onChange={e => setCvForm(f => ({...f,email:e.target.value}))} placeholder="your@email.com"/>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Desired Role / Sector *</label>
                    <select className="form-select" value={cvForm.role} onChange={e => setCvForm(f => ({...f,role:e.target.value}))}>
                      <option value="">Select a sector</option>
                      <option>Information Technology Services</option>
                      <option>Cloud Solutions & Cybersecurity</option>
                      <option>Digital Transformation & Automation</option>
                      <option>Artificial Intelligence Solutions</option>
                      <option>HR Consultancy & Outsourcing</option>
                      <option>Government & Public Sector Projects</option>
                      <option>Programme & Project Management</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Current Country *</label>
                    <select className="form-select" value={cvForm.country} onChange={e => setCvForm(f => ({...f,country:e.target.value}))}>
                      <option value="">Select country</option>
                      <option>🇬🇧 United Kingdom</option>
                      <option>🇺🇸 United States</option>
                      <option>🇩🇪 Germany</option>
                      <option>🇫🇷 France</option>
                      <option>🇨🇦 Canada</option>
                      <option>🇦🇺 Australia</option>
                      <option>🇸🇦 Saudi Arabia</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <div className="form-group" style={{ gridColumn: "1/-1" }}>
                    <label className="form-label">Years of Experience</label>
                    <select className="form-select" value={cvForm.exp} onChange={e => setCvForm(f => ({...f,exp:e.target.value}))}>
                      <option value="">Select experience level</option>
                      <option>3–5 years (Mid-level)</option>
                      <option>5–8 years (Senior)</option>
                      <option>8–12 years (Principal / Lead)</option>
                      <option>12–15 years (Director level)</option>
                      <option>15+ years (C-Suite / Executive)</option>
                    </select>
                  </div>
                  <div className="form-group" style={{ gridColumn: "1/-1" }}>
                    <label className="form-label">Cover Note / Key Skills</label>
                    <textarea className="form-textarea" value={cvForm.msg} onChange={e => setCvForm(f => ({...f,msg:e.target.value}))} placeholder="Tell us about your expertise, key achievements, and what type of Saudi opportunity interests you most..."/>
                  </div>
                  <div className="form-group" style={{ gridColumn: "1/-1" }}>
                    <label className="form-label">Upload CV / Resume</label>
                    <div style={{ border: `2px dashed ${C.border}`, borderRadius: 4, padding: "2rem", textAlign: "center", cursor: "pointer", transition: "border-color 0.2s" }}
                      onMouseOver={e => e.currentTarget.style.borderColor = C.gold}
                      onMouseOut={e => e.currentTarget.style.borderColor = C.border}>
                      <Icon name="upload" size={28} color={C.gold}/>
                      <div style={{ marginTop: "0.6rem", fontSize: "0.85rem", color: C.muted }}>Drag & drop your CV here, or <span style={{ color: C.gold }}>browse files</span></div>
                      <div style={{ fontSize: "0.72rem", color: C.muted, marginTop: "0.3rem" }}>PDF, DOC, DOCX — Max 5MB</div>
                    </div>
                  </div>
                </div>
                <button className="btn-gold" style={{ width: "100%", justifyContent: "center", marginTop: "0.5rem" }}
                  onClick={() => { if(cvForm.name && cvForm.email) setCvSubmitted(true); }}>
                  Submit Application <Icon name="arrow" size={15} color={C.obsidian}/>
                </button>
              </div>
            )}
          </div>
        )}

        {/* ONBOARDING */}
        {activeTab === "onboarding" && (
          <div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.5rem", marginBottom: "2.5rem" }}>
              {[
                { step: "01", icon: "📄", title: "CV Submission & Profile Review", desc: "Submit your CV via our boutique platform. Our senior consultants personally review every application for suitability, cultural fit, and alignment with live mandates.", timeline: "Day 1–3" },
                { step: "02", icon: "📞", title: "Boutique Consultation Call", desc: "A dedicated FARAZM consultant conducts a deep-dive conversation to understand your aspirations, expertise, salary expectations, and preferred project types.", timeline: "Day 3–7" },
                { step: "03", icon: "🎯", title: "Opportunity Matching & Client Introduction", desc: "We match you with the most suitable current opportunities across our Saudi client portfolio and arrange introductions with hiring managers and project leads.", timeline: "Week 2" },
                { step: "04", icon: "🛂", title: "KSA Visa & Relocation Support", desc: "Our dedicated mobility team guides you through Saudi work permit applications, Iqama processing, housing assistance, and cultural orientation programmes.", timeline: "Weeks 3–6" },
                { step: "05", icon: "🎓", title: "Pre-Deployment Cultural Briefing", desc: "Comprehensive cultural, legal, and professional briefing package covering workplace norms, Islamic calendar, dress codes, and life in Saudi Arabia.", timeline: "Week 6–8" },
                { step: "06", icon: "🚀", title: "In-Kingdom Onboarding & Support", desc: "Dedicated in-Kingdom support throughout your first 90 days. HR liaison, payroll setup, banking assistance, and ongoing pastoral care from our Riyadh team.", timeline: "Ongoing" },
              ].map(s => (
                <div key={s.step} className="card card-green">
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1rem" }}>
                    <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "3rem", fontWeight: 300, opacity: 0.15, color: C.gold, lineHeight: 1 }}>{s.step}</div>
                    <div style={{ fontSize: "0.68rem", letterSpacing: "0.12em", textTransform: "uppercase", color: C.greenLt, background: "rgba(0,168,96,0.12)", border: `1px solid rgba(0,168,96,0.25)`, borderRadius: 100, padding: "3px 10px" }}>{s.timeline}</div>
                  </div>
                  <div style={{ fontSize: "2rem", marginBottom: "0.7rem" }}>{s.icon}</div>
                  <h4 style={{ fontWeight: 600, fontSize: "0.95rem", marginBottom: "0.6rem" }}>{s.title}</h4>
                  <p style={{ color: C.muted, fontSize: "0.85rem", lineHeight: 1.7 }}>{s.desc}</p>
                </div>
              ))}
            </div>
            <div style={{ background: C.panel, border: `1px solid ${C.green}20`, borderRadius: 4, padding: "2rem", textAlign: "center" }}>
              <div style={{ fontSize: "1.5rem", marginBottom: "0.8rem" }}>🌟</div>
              <h4 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "1.4rem", marginBottom: "0.6rem" }}>Average <span className="green-text">8-Week</span> Time to Deployment</h4>
              <p style={{ color: C.muted, fontSize: "0.9rem", maxWidth: 500, margin: "0 auto 1.5rem", lineHeight: 1.7 }}>From first contact to in-Kingdom deployment — our streamlined boutique process gets exceptional talent where they're needed, fast.</p>
              <button className="btn-green" onClick={() => setActiveTab("submit")}>Begin Your Journey <Icon name="arrow" size={15} color="#fff"/></button>
            </div>
          </div>
        )}

        {/* FOR EMPLOYERS */}
        {activeTab === "employers" && (
          <div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))", gap: "1.5rem", marginBottom: "2.5rem" }}>
              {[
                { icon: "🔍", title: "Boutique Executive Search", desc: "For C-suite, VP, and Director-level appointments — our retained search service delivers curated shortlists of exceptional candidates from our global network within 10 business days.", color: C.gold },
                { icon: "⚡", title: "Rapid Talent Deployment", desc: "For project-critical hires — contract, interim, or permanent — we mobilise pre-screened specialists from our 800+ talent pool with unmatched speed. Most roles filled within 4–6 weeks.", color: "#7B9BFF" },
                { icon: "🏭", title: "Workforce Outsourcing (BPO)", desc: "Full workforce solutions for large-scale programme delivery. We manage end-to-end employment, compliance, payroll, and HR administration for project teams of any size.", color: C.greenLt },
                { icon: "📋", title: "Nitaqat & Saudisation Advisory", desc: "Expert guidance on Saudisation ratios, Nitaqat compliance strategy, and Saudi talent development programmes to achieve and maintain premium Nitaqat classification.", color: C.gold },
              ].map(s => (
                <div key={s.title} className="card">
                  <div style={{ fontSize: "2.2rem", marginBottom: "1rem" }}>{s.icon}</div>
                  <h4 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "1.25rem", fontWeight: 600, marginBottom: "0.7rem", color: s.color }}>{s.title}</h4>
                  <p style={{ color: C.muted, fontSize: "0.88rem", lineHeight: 1.75 }}>{s.desc}</p>
                </div>
              ))}
            </div>
            <div style={{ background: `linear-gradient(135deg, ${C.panel} 0%, rgba(201,162,82,0.05) 100%)`, border: `1px solid ${C.gold}30`, borderRadius: 4, padding: "2.5rem", display: "flex", flexWrap: "wrap", gap: "2rem", alignItems: "center", justifyContent: "space-between" }}>
              <div>
                <h4 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "1.6rem", marginBottom: "0.5rem" }}>Looking to <span className="gold-text">Hire Top Talent</span>?</h4>
                <p style={{ color: C.muted, fontSize: "0.9rem", maxWidth: 500, lineHeight: 1.7 }}>Whether you need a single specialist or a 50-person project team, our boutique HR division will source, screen, and deploy the right people — on time, every time.</p>
              </div>
              <button className="btn-gold" onClick={() => scrollTo("contact")}>Speak to Our HR Team <Icon name="arrow" size={15} color={C.obsidian}/></button>
            </div>
          </div>
        )}
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" className="section" style={{ background: C.onyx, position: "relative", overflow: "hidden" }}>
        <IslamicPattern />
        <div className="section-header">
          <span className="overline">Get in Touch</span>
          <h2 className="section-title">Start a <span className="gold-text">Conversation</span></h2>
          <div className="gold-divider"/>
          <p className="section-sub">Whether you're a business seeking transformation, a government entity looking for a trusted technology partner, or a professional ready to build a career in Saudi Arabia — we'd love to hear from you.</p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))", gap: "3rem", maxWidth: 1100, margin: "0 auto" }}>
          {/* Contact info */}
          <div>
            <div style={{ marginBottom: "2.5rem" }}>
              <h3 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "1.5rem", fontWeight: 400, marginBottom: "1.2rem" }}>Our Offices</h3>
              {[
                { city: "Riyadh — HQ", addr: "King Fahd Road, Al Olaya District, Riyadh 12213, KSA", phone: "+966 11 XXX XXXX", flag: "🇸🇦" },
                { city: "Jeddah", addr: "Prince Mohammed Bin Abdulaziz Road, Jeddah 23431, KSA", phone: "+966 12 XXX XXXX", flag: "🇸🇦" },
                { city: "London — UK Office", addr: "Canary Wharf, London E14, United Kingdom", phone: "+44 20 XXXX XXXX", flag: "🇬🇧" },
              ].map(o => (
                <div key={o.city} style={{ padding: "1.2rem", background: C.panel, border: `1px solid ${C.border}`, borderRadius: 4, marginBottom: "0.8rem" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, fontWeight: 600, marginBottom: "0.4rem" }}>
                    <span>{o.flag}</span> {o.city}
                  </div>
                  <div style={{ fontSize: "0.83rem", color: C.muted, lineHeight: 1.6 }}>{o.addr}</div>
                  <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: "0.5rem", fontSize: "0.82rem", color: C.gold }}>
                    <Icon name="phone" size={12} color={C.gold}/> {o.phone}
                  </div>
                </div>
              ))}
            </div>

            <div>
              <h3 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "1.3rem", fontWeight: 400, marginBottom: "1rem" }}>Email Enquiries</h3>
              {[
                { label: "General Enquiries", email: "info@farazmholdings.com" },
                { label: "Business Development", email: "partnerships@farazmholdings.com" },
                { label: "Talent & HR", email: "talent@farazmholdings.com" },
                { label: "UK Alliance", email: "uk@farazmholdings.com" },
              ].map(e => (
                <div key={e.label} style={{ display: "flex", justifyContent: "space-between", padding: "0.8rem 0", borderBottom: `1px solid ${C.border}`, fontSize: "0.85rem" }}>
                  <span style={{ color: C.muted }}>{e.label}</span>
                  <span style={{ color: C.gold }}>{e.email}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Contact form */}
          <div>
            {submitted ? (
              <div style={{ textAlign: "center", padding: "3rem 2rem", background: C.panel, border: `1px solid ${C.gold}`, borderRadius: 4 }}>
                <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>✨</div>
                <h3 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "2rem", marginBottom: "0.8rem" }}>
                  <span className="gold-text">Message Sent</span>
                </h3>
                <p style={{ color: C.muted, lineHeight: 1.7, fontSize: "0.95rem" }}>شكراً جزيلاً — Thank you for reaching out to FARAZM Holdings. A member of our team will respond within one business day.</p>
                <button className="btn-gold" style={{ marginTop: "1.5rem" }} onClick={() => { setSubmitted(false); setContactForm({name:"",company:"",email:"",phone:"",service:"",msg:""}); }}>Send Another Message</button>
              </div>
            ) : (
              <div className="card">
                <h3 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "1.5rem", marginBottom: "0.4rem" }}>Send Us a <span className="gold-text">Message</span></h3>
                <p style={{ color: C.muted, fontSize: "0.85rem", marginBottom: "1.8rem" }}>We respond to all enquiries within one business day.</p>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.2rem" }}>
                  <div className="form-group">
                    <label className="form-label">Full Name *</label>
                    <input className="form-input" value={contactForm.name} onChange={e => setContactForm(f=>({...f,name:e.target.value}))} placeholder="Your name"/>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Company / Organisation</label>
                    <input className="form-input" value={contactForm.company} onChange={e => setContactForm(f=>({...f,company:e.target.value}))} placeholder="Your company"/>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Email Address *</label>
                    <input className="form-input" type="email" value={contactForm.email} onChange={e => setContactForm(f=>({...f,email:e.target.value}))} placeholder="your@email.com"/>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Phone Number</label>
                    <input className="form-input" value={contactForm.phone} onChange={e => setContactForm(f=>({...f,phone:e.target.value}))} placeholder="+966 or +44..."/>
                  </div>
                  <div className="form-group" style={{ gridColumn: "1/-1" }}>
                    <label className="form-label">I am interested in *</label>
                    <select className="form-select" value={contactForm.service} onChange={e => setContactForm(f=>({...f,service:e.target.value}))}>
                      <option value="">Select area of interest</option>
                      <option>IT Services & Infrastructure</option>
                      <option>Cloud Solutions & Cybersecurity</option>
                      <option>Digital Transformation</option>
                      <option>AI & Data Solutions</option>
                      <option>HR Consultancy & Outsourcing</option>
                      <option>Government / Giga-Project Support</option>
                      <option>UK–KSA Partnership / Investment</option>
                      <option>Careers & Talent Hub</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <div className="form-group" style={{ gridColumn: "1/-1" }}>
                    <label className="form-label">How Can We Help? *</label>
                    <textarea className="form-textarea" value={contactForm.msg} onChange={e => setContactForm(f=>({...f,msg:e.target.value}))} placeholder="Describe your project, requirement, or enquiry..."/>
                  </div>
                </div>
                <button className="btn-gold" style={{ width: "100%", justifyContent: "center", marginTop: "0.5rem" }}
                  onClick={() => { if(contactForm.name && contactForm.email && contactForm.msg) setSubmitted(true); }}>
                  Send Message <Icon name="arrow" size={15} color={C.obsidian}/>
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="footer">
        <div className="footer-grid">
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: "1.2rem" }}>
              <div className="nav-emblem" style={{ width: 48, height: 48, fontSize: "1.2rem" }}>FH</div>
              <div>
                <div style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 700, fontSize: "1.2rem", color: C.white }}>FARAZM HOLDINGS</div>
                <div style={{ fontSize: "0.62rem", letterSpacing: "0.25em", textTransform: "uppercase", color: C.gold }}>Kingdom of Saudi Arabia</div>
              </div>
            </div>
            <p style={{ color: C.muted, fontSize: "0.85rem", lineHeight: 1.8, marginBottom: "1.2rem", maxWidth: 320 }}>A premier Saudi conglomerate delivering technology excellence, AI innovation, and world-class human capital solutions — bridging the Kingdom with global expertise through our UK strategic alliances.</p>
            <div className="arabic" style={{ fontSize: "1rem", color: C.gold, opacity: 0.6, marginBottom: "1.2rem" }}>التميز في خدمة المملكة</div>
            <div style={{ display: "flex", gap: "0.8rem" }}>
              {["🇸🇦","🇬🇧"].map(f => <span key={f} style={{ fontSize: "1.4rem" }}>{f}</span>)}
            </div>
          </div>

          <div>
            <div style={{ fontSize: "0.72rem", letterSpacing: "0.2em", textTransform: "uppercase", color: C.gold, marginBottom: "1.2rem", fontWeight: 600 }}>Services</div>
            {["IT Services","Cloud & Cybersecurity","Digital Transformation","AI Solutions","HR Consultancy","Government Projects"].map(l => (
              <a key={l} className="footer-link" onClick={() => scrollTo("services")}>{l}</a>
            ))}
          </div>

          <div>
            <div style={{ fontSize: "0.72rem", letterSpacing: "0.2em", textTransform: "uppercase", color: C.gold, marginBottom: "1.2rem", fontWeight: 600 }}>Company</div>
            {["About FARAZM","Our Projects","UK Partnerships","Talent Hub","Careers","Contact Us"].map(l => (
              <a key={l} className="footer-link" onClick={() => scrollTo(l.toLowerCase().includes("project") ? "projects" : l.toLowerCase().includes("partner") ? "partners" : l.toLowerCase().includes("talent") || l.toLowerCase().includes("career") ? "talent" : l.toLowerCase().includes("about") ? "about" : "contact")}>{l}</a>
            ))}
          </div>

          <div>
            <div style={{ fontSize: "0.72rem", letterSpacing: "0.2em", textTransform: "uppercase", color: C.gold, marginBottom: "1.2rem", fontWeight: 600 }}>UK Partners</div>
            {PARTNERS.map(p => (
              <div key={p.name} className="footer-link" style={{ cursor: "default" }}>{p.name}</div>
            ))}
            <div style={{ marginTop: "1.5rem", fontSize: "0.72rem", letterSpacing: "0.2em", textTransform: "uppercase", color: C.gold, marginBottom: "0.8rem", fontWeight: 600 }}>Connect</div>
            <div style={{ display: "flex", gap: "0.7rem" }}>
              {[{ icon: "linkedin", color: "#0A66C2" }, { icon: "globe", color: C.gold }, { icon: "mail", color: C.green }].map(s => (
                <div key={s.icon} style={{ width: 36, height: 36, borderRadius: "50%", background: C.panel, border: `1px solid ${C.border}`, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", transition: "border-color 0.2s" }}
                  onMouseOver={e => e.currentTarget.style.borderColor = s.color}
                  onMouseOut={e => e.currentTarget.style.borderColor = C.border}>
                  <Icon name={s.icon} size={15} color={s.color}/>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <div>© 2024 FARAZM Holdings. All rights reserved. Registered in the Kingdom of Saudi Arabia.</div>
          <div style={{ display: "flex", gap: "1.5rem" }}>
            {["Privacy Policy","Terms of Use","Sitemap"].map(l => <a key={l} href="#" style={{ color: C.muted, textDecoration: "none", fontSize: "0.78rem" }}>{l}</a>)}
          </div>
        </div>
      </footer>
    </>
  );
}
