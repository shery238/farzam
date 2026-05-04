import { useState, useEffect } from "react";
import logo1 from './assets/logo1.png'
import logo2 from './assets/logo2.png'
import logo3svg from './assets/logo3.svg'
import farazmLogo from './assets/image.png'

const C = {
  obsidian: "#07070C", onyx: "#0F0F1A", charcoal: "#161625",
  panel: "#1B1B2E", border: "#2A2A45", gold: "#C9A252",
  goldLt: "#E8C87A", goldDk: "#9B7A35", green: "#00693E",
  greenLt: "#00A860", white: "#F5F0E8", muted: "#8A8AA0", accent: "#4B6BFB",
};

const Icon = ({ name, size = 22, color = "currentColor" }) => {
  const icons = {
    cloud: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5"><path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" /></svg>,
    brain: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5"><path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96-.46 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 1.98-3A2.5 2.5 0 0 1 9.5 2Z" /><path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96-.46 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-1.98-3A2.5 2.5 0 0 0 14.5 2Z" /></svg>,
    users: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" /></svg>,
    building: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg>,
    code: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5"><polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" /></svg>,
    globe: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5"><circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" /></svg>,
    arrow: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7" /></svg>,
    check: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2"><polyline points="20 6 9 17 4 12" /></svg>,
    map: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>,
    mail: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>,
    phone: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13 19.79 19.79 0 0 1 1.61 4.36 2 2 0 0 1 3.58 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.08 6.08l1.07-1.07a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" /></svg>,
    briefcase: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5"><rect x="2" y="7" width="20" height="14" rx="2" /><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" /></svg>,
    upload: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5"><polyline points="16 16 12 12 8 16" /><line x1="12" y1="12" x2="12" y2="21" /><path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3" /></svg>,
    linkedin: <svg width={size} height={size} viewBox="0 0 24 24" fill={color}><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" /></svg>,
    zap: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" /></svg>,
    star: <svg width={size} height={size} viewBox="0 0 24 24" fill={color} stroke={color} strokeWidth="1"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>,
  };
  return icons[name] || null;
};

const IslamicPattern = () => (
  <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.04]" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <pattern id="ip" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
        <polygon points="40,5 55,20 75,20 75,40 55,55 40,70 25,55 5,55 5,20 25,20" fill="none" stroke={C.gold} strokeWidth="0.7" />
        <polygon points="40,18 50,28 62,28 62,38 50,48 40,58 30,48 18,48 18,28 30,28" fill="none" stroke={C.gold} strokeWidth="0.5" />
        <line x1="40" y1="5" x2="40" y2="18" stroke={C.gold} strokeWidth="0.4" />
        <line x1="75" y1="40" x2="62" y2="38" stroke={C.gold} strokeWidth="0.4" />
        <line x1="5" y1="40" x2="18" y2="38" stroke={C.gold} strokeWidth="0.4" />
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#ip)" />
  </svg>
);

const SectionHeader = ({ overline, title, highlight, desc }) => (
  <div className="text-center mb-16">
    <span className="block text-xs tracking-[0.25em] uppercase text-gold font-semibold mb-3">{overline}</span>
    <h2 className="font-serif text-4xl md:text-5xl font-light">{title} <span className="gold-text">{highlight}</span></h2>
    <div className="gold-divider" />
    {desc && <p className="text-white/90 text-sm leading-relaxed max-w-2xl mx-auto">{desc}</p>}
  </div>
);

const SECTORS = [
  { id: "agriculture", label: "🌾 Agriculture" },
  { id: "manufacturing", label: "🏭 Manufacturing" },
  { id: "services", label: "⚙️ Services" },
  { id: "technology", label: "💻 Technology" },
];

const AgricultureContent = () => (
  <div className="max-w-6xl mx-auto">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10 items-center">
      <div>
        <div className="text-xs tracking-[0.25em] uppercase font-semibold mb-2" style={{ color: "#00A860" }}>Agriculture Sector</div>
        <h3 className="font-serif text-3xl font-light mb-4">Saudi Arabia's <span className="green-text">Agricultural Excellence</span></h3>
        <p className="text-white/90 text-sm leading-relaxed mb-4">FARAZM Holdings has cultivated a proud agricultural heritage in the Kingdom, with operations spanning premium date palm cultivation, state-of-the-art cold storage, and international export of Saudi Arabia's finest dates to markets across three continents.</p>
        <p className="text-white/90 text-sm leading-relaxed">Our agricultural division embodies our commitment to purposeful investment, preserving Saudi Arabia's agricultural traditions while modernising operations for global competitiveness and Vision 2030 food security goals.</p>
      </div>
      <div className="grid grid-cols-2 gap-4">
        {[
          { num: "500K+", label: "sqm Farm Area", icon: "🌿" },
          { num: "50K+", label: "Date Palm Trees", icon: "🌴" },
          { num: "15+", label: "Export Countries", icon: "🌍" },
          { num: "5,000+", label: "Tonnes Annual Yield", icon: "📦" },
        ].map(s => (
          <div key={s.label} className="card text-center !p-5">
            <div className="text-3xl mb-2">{s.icon}</div>
            <div className="font-serif text-2xl font-light mb-1" style={{ color: "#00A860" }}>{s.num}</div>
            <div className="text-xs text-white/90 uppercase tracking-wider">{s.label}</div>
          </div>
        ))}
      </div>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {[
        { icon: "🌴", title: "Date Palm Farms", color: "#00A860", desc: "Our Al-Ahsa date palm farms span over 500,000 sqm, cultivating premium varieties including Medjool, Sukkari, and Ajwa — the most prized dates in the world.", points: ["Premium Date Varieties", "Organic Cultivation Methods", "Advanced Irrigation Systems", "Harvest & Processing Facilities", "Quality Grading & Packaging"] },
        { icon: "🏭", title: "Cold Storage Facilities", color: "#7B9BFF", desc: "State-of-the-art temperature-controlled cold storage infrastructure ensuring the highest quality preservation from harvest to delivery across global supply chains.", points: ["10,000+ Tonne Capacity", "Temperature-Controlled Zones", "ISO-Certified Facilities", "24/7 Monitoring Systems", "Last-Mile Cold Chain"] },
        { icon: "✈️", title: "International Date Export", color: "#C9A252", desc: "FARAZM Holdings exports premium Saudi dates to over 15 countries across Europe, North America, Asia, and the GCC — representing the finest of the Kingdom's agricultural heritage on the world stage.", points: ["15+ Export Markets", "UK & European Distribution", "USA & Canadian Markets", "Asian Market Penetration", "Custom Packaging & Branding"] },
      ].map(s => (
        <div key={s.title} className="card">
          <div className="text-4xl mb-4">{s.icon}</div>
          <h4 className="font-serif text-xl font-semibold mb-3" style={{ color: s.color }}>{s.title}</h4>
          <p className="text-white/90 text-xs leading-relaxed mb-4">{s.desc}</p>
          <ul className="flex flex-col gap-1.5">{s.points.map(p => <li key={p} className="flex items-center gap-2 text-xs text-white/90"><Icon name="check" size={12} color={s.color} />{p}</li>)}</ul>
        </div>
      ))}
    </div>
  </div>
);

const ManufacturingContent = () => (
  <div className="max-w-6xl mx-auto">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10 items-center">
      <div>
        <div className="text-xs tracking-[0.25em] uppercase font-semibold mb-2" style={{ color: "#4B6BFB" }}>Manufacturing Sector</div>
        <h3 className="font-serif text-3xl font-light mb-4">Industrial <span className="gold-text">Manufacturing</span> Excellence</h3>
        <p className="text-white/90 text-sm leading-relaxed mb-4">FARAZM Holdings operates comprehensive plastic manufacturing facilities and raw material trading operations that support Saudi Arabia's growing industrial economy. Our manufacturing division aligns with Vision 2030's industrial diversification strategy.</p>
        <p className="text-white/90 text-sm leading-relaxed">From plastic dana (raw material) sourcing and trading to finished product manufacturing, we deliver industrial solutions that serve local markets and international export customers across the GCC and beyond.</p>
      </div>
      <div className="grid grid-cols-2 gap-4">
        {[
          { num: "25,000+", label: "Tonnes Annual Production", icon: "⚙️" },
          { num: "40+", label: "Product Categories", icon: "📦" },
          { num: "12+", label: "Export Markets", icon: "🌍" },
          { num: "200+", label: "Industrial Clients", icon: "🏭" },
        ].map(s => (
          <div key={s.label} className="card text-center !p-5">
            <div className="text-3xl mb-2">{s.icon}</div>
            <div className="font-serif text-2xl font-light mb-1" style={{ color: "#4B6BFB" }}>{s.num}</div>
            <div className="text-xs text-white/90 uppercase tracking-wider">{s.label}</div>
          </div>
        ))}
      </div>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {[
        { icon: "🏭", title: "Plastic Manufacturing", color: "#7B9BFF", desc: "Advanced plastic manufacturing operations producing a wide range of industrial and consumer plastic products. Our facilities utilise modern injection moulding, extrusion, and blow moulding technologies.", points: ["Injection Moulding", "Extrusion Products", "Blow Moulding", "Custom Industrial Parts", "Consumer Product Lines", "ISO 9001 Certified"] },
        { icon: "🧪", title: "Raw Material (Plastic Dana) Trading", color: "#C9A252", desc: "We are a leading trader of plastic raw materials (dana) including HDPE, LDPE, PP, PVC, and PET granules — sourcing from global suppliers and distributing to manufacturers across Saudi Arabia, GCC, and international markets.", points: ["HDPE & LDPE Trading", "Polypropylene (PP)", "PVC & PET Granules", "International Sourcing", "GCC Distribution Network", "Export to 12+ Countries"] },
        { icon: "🔬", title: "Industrial R&D & Process Optimisation", color: "#00A860", desc: "Our manufacturing division continuously invests in research, process optimisation, and new product development to maintain competitive advantage and meet evolving industrial standards.", points: ["Process Optimisation", "New Product Development", "Sustainability Initiatives", "Waste Reduction Programs", "Energy Efficiency", "Environmental Compliance"] },
        { icon: "🚢", title: "Export & International Trade", color: "#C9A252", desc: "FARAZM Holdings exports manufactured goods and raw materials to international markets, leveraging our global partner network and logistics expertise to deliver Saudi industrial products worldwide.", points: ["GCC Export Network", "European Market Access", "Asian Distribution", "Trade Finance Solutions", "Customs & Compliance", "Freight & Logistics"] },
      ].map(s => (
        <div key={s.title} className="card">
          <div className="text-4xl mb-4">{s.icon}</div>
          <h4 className="font-serif text-xl font-semibold mb-3" style={{ color: s.color }}>{s.title}</h4>
          <p className="text-white/90 text-xs leading-relaxed mb-4">{s.desc}</p>
          <ul className="grid grid-cols-2 gap-1.5">{s.points.map(p => <li key={p} className="flex items-center gap-2 text-xs text-white/90"><Icon name="check" size={12} color={s.color} />{p}</li>)}</ul>
        </div>
      ))}
    </div>
  </div>
);

const ServicesContent = () => (
  <div className="max-w-6xl mx-auto">
    <div className="mb-10 text-center">
      <div className="text-xs tracking-[0.25em] uppercase font-semibold mb-2" style={{ color: "#C9A252" }}>Services Sector</div>
      <h3 className="font-serif text-3xl font-light mb-4">Comprehensive <span className="gold-text">Business Services</span></h3>
      <p className="text-white/90 text-sm leading-relaxed max-w-2xl mx-auto">FARAZM Holdings delivers a broad spectrum of professional services supporting Saudi Arabia's growing economy from real estate and transport to food & beverage and heavy machinery.</p>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[
        { icon: "🏢", title: "Real Estate Services", color: "#C9A252", desc: "Full-cycle real estate services including property development, investment advisory, asset management, and project consultancy across residential, commercial, and industrial segments.", points: ["Property Development", "Real Estate Investment", "Asset Management", "Project Consultancy"] },
        { icon: "💻", title: "IT Services", color: "#7B9BFF", desc: "End-to-end information technology services for enterprise and government clients from infrastructure and managed services to software development and digital transformation.", points: ["Enterprise IT Infrastructure", "Software Development", "Managed IT Services", "Digital Transformation"] },
        { icon: "🚛", title: "Transport & Logistics", color: "#00A860", desc: "Comprehensive transport and logistics solutions across the Kingdom, supporting industrial, commercial, and government clients with fleet management, freight, and supply chain services.", points: ["Fleet Management", "Freight & Cargo", "Supply Chain Solutions", "Last-Mile Delivery"] },
        { icon: "🚗", title: "Vehicle Import & Export", color: "#C9A252", desc: "Specialist vehicle trading operation handling import and export of commercial vehicles, heavy machinery carriers, and fleet solutions for corporate and government clients.", points: ["Commercial Vehicle Import", "Fleet Procurement", "Export Operations", "Customs Clearance"] },
        { icon: "📋", title: "Consultancy Services", color: "#7B9BFF", desc: "Strategic business and management consultancy drawing on 25+ years of Kingdom experience advising government entities, corporates, and international investors on Saudi market entry and operations.", points: ["Business Strategy", "Market Entry Advisory", "Government Relations", "Investment Planning"] },
        { icon: "🍽️", title: "Food & Restaurant Business", color: "#00A860", desc: "FARAZM Holdings operates premium food and hospitality establishments across the Kingdom, bringing world-class dining experiences and food production capabilities to the Saudi market.", points: ["Restaurant Operations", "Food Production", "Catering Services", "Hospitality Management"] },
        { icon: "🏗️", title: "Contracting Services", color: "#C9A252", desc: "Full-service general contracting capabilities covering civil works, MEP, fit-out, and specialist contracting across residential, commercial, and industrial projects throughout the Kingdom.", points: ["Civil Contracting", "MEP Works", "Interior Fit-Out", "Project Management"] },
        { icon: "🦺", title: "Heavy Machinery Import & Rental", color: "#7B9BFF", desc: "Comprehensive heavy machinery solutions importing, supplying, and renting construction equipment, industrial machinery, and specialist plant for major projects across Saudi Arabia.", points: ["Equipment Import", "Machinery Rental", "Fleet Maintenance", "Operator Services"] },
      ].map(s => (
        <div key={s.title} className="card">
          <div className="text-4xl mb-3">{s.icon}</div>
          <h4 className="font-serif text-lg font-semibold mb-2" style={{ color: s.color }}>{s.title}</h4>
          <p className="text-white/90 text-xs leading-relaxed mb-3">{s.desc}</p>
          <ul className="flex flex-col gap-1">{s.points.map(p => <li key={p} className="flex items-center gap-2 text-xs text-white/90"><Icon name="check" size={11} color={s.color} />{p}</li>)}</ul>
        </div>
      ))}
    </div>
  </div>
);

const TechnologyContent = () => (
  <div className="max-w-6xl mx-auto">
    <div className="mb-8 text-center">
      <div className="text-xs tracking-[0.25em] uppercase font-semibold mb-2" style={{ color: "#4B6BFB" }}>Technology Sector</div>
      <h3 className="font-serif text-3xl font-light mb-4">Digital <span className="gold-text">Excellence</span> for the Kingdom</h3>
      <p className="text-white/90 text-sm leading-relaxed max-w-2xl mx-auto">Our technology division, backed by elite UK partners, delivers cutting-edge IT solutions, cloud infrastructure, AI capabilities, and digital transformation programmes that power Saudi Arabia's digital future.</p>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[
        { icon: "code", color: "#C9A252", title: "IT Services & Infrastructure", desc: "Enterprise infrastructure, managed services, and bespoke software development for government and private sector.", points: ["Enterprise Infrastructure", "Managed IT Services", "Software Development", "ERP & CRM Integration"] },
        { icon: "cloud", color: "#7B9BFF", title: "Cloud & Cybersecurity", desc: "Multi-cloud architectures and world-class cybersecurity protecting critical national assets across AWS, Azure, and Google Cloud.", points: ["Multi-Cloud Architecture", "Security Operations (SOC)", "Compliance & Governance", "Disaster Recovery"] },
        { icon: "zap", color: "#C9A252", title: "Digital Transformation", desc: "End-to-end digital transformation reimagining legacy workflows and integrating RPA and intelligent automation.", points: ["Process Automation", "Digital Strategy", "Legacy Modernisation", "API Integration"] },
        { icon: "brain", color: "#00A860", title: "Artificial Intelligence", desc: "Arabic NLP, machine learning, computer vision, and predictive analytics delivering measurable ROI for Saudi clients.", points: ["Arabic NLP & Chatbots", "Predictive Analytics", "Computer Vision", "AI Strategy"] },
        { icon: "users", color: "#C9A252", title: "HR Technology & Outsourcing", desc: "Technology-enabled HR solutions including Nitaqat compliance platforms, talent management systems, and HR BPO.", points: ["Nitaqat Compliance Tech", "Talent Management", "HR BPO", "L&D Platforms"] },
        { icon: "building", color: "#7B9BFF", title: "Government Digital Services", desc: "National-scale digital government solutions, smart city platforms, and Vision 2030 programme delivery.", points: ["eGovernment Portals", "Smart City Platforms", "Vision 2030 Projects", "Programme Management"] },
      ].map(s => (
        <div key={s.title} className="card">
          <div className="svc-icon" style={{ background: `linear-gradient(135deg, ${s.color}18, ${s.color}06)`, borderColor: `${s.color}30` }}>
            <Icon name={s.icon} size={24} color={s.color} />
          </div>
          <h4 className="font-serif text-lg font-semibold mb-2">{s.title}</h4>
          <p className="text-white/90 text-xs leading-relaxed mb-3">{s.desc}</p>
          <ul className="flex flex-col gap-1">{s.points.map(p => <li key={p} className="flex items-center gap-2 text-xs text-white/90"><Icon name="check" size={11} color={s.color} />{p}</li>)}</ul>
        </div>
      ))}
    </div>
  </div>
);

const PARTNERS = [
  { name: "Business Technique Limited", abbr: "BT", bg: "#1a1a3e", accent: "#7B9BFF", country: "🇬🇧 United Kingdom", role: "Technology Consulting & Digital Transformation", desc: "A distinguished UK-based consultancy bringing world-class technology advisory, enterprise architecture expertise, and proven delivery methodologies to FARAZM's Saudi operations.", tags: ["Digital Strategy", "Enterprise Architecture", "Consulting"] },
  { name: "Go Agile Cloud Limited", abbr: "GAC", bg: "#0f2a1e", accent: C.greenLt, country: "🇬🇧 United Kingdom", role: "Agile Cloud Engineering", desc: "Specialists in cloud-native engineering, DevOps, and agile delivery. Empowering Saudi enterprises to deploy at speed and scale with best-in-class cloud infrastructure.", tags: ["Cloud Native", "DevOps", "Agile Delivery"] },
  { name: "GoAgile Academy Limited", abbr: "GAA", bg: "#1a2a0e", accent: C.gold, country: "🇬🇧 United Kingdom", role: "Professional Training & Certifications", desc: "Internationally accredited training academy delivering Agile, Scrum, cloud, and digital skills programmes upskilling Saudi workforce in alignment with Vision 2030 human capital goals.", tags: ["Agile Certification", "Scrum Master", "Cloud Training"] },
  { name: "Primacloud Solutions", abbr: "PC", bg: "#1a0f2a", accent: C.gold, country: "🇬🇧 United Kingdom", role: "Cloud Infrastructure & Managed Services", desc: "Premium cloud infrastructure specialists delivering robust, secure, and scalable managed cloud environments. Supporting FARAZM's delivery of enterprise-grade cloud solutions across KSA.", tags: ["Managed Cloud", "Infrastructure", "Security"] },
];

const TECH_PROJECTS = [
  { no: "01", sector: "Government Digital Services", title: "National Digital Portal Transformation", location: "Riyadh, KSA", scope: "Full-stack digital portal redesign serving 4M+ citizens, integrated with 14 government agencies.", year: "2022–2023", value: "SAR 45M+" },
  { no: "02", sector: "Healthcare Technology", title: "Smart Hospital Management System", location: "Jeddah, KSA", scope: "AI-assisted hospital information system across 3 hospital campuses, covering patient journey, clinical workflows, and analytics.", year: "2021–2022", value: "SAR 28M+" },
  { no: "03", sector: "Energy & Utilities", title: "Oil & Gas Field IoT Monitoring Platform", location: "Eastern Province, KSA", scope: "Real-time IoT sensor network and predictive maintenance platform for upstream oil field operations.", year: "2020–2021", value: "SAR 62M+" },
  { no: "04", sector: "Financial Services", title: "Core Banking Cloud Migration", location: "Riyadh, KSA", scope: "Led the cloud-first migration of a regional bank's core banking platform to a fully managed multi-cloud environment with SOC 2 compliance.", year: "2023–2024", value: "SAR 35M+" },
  { no: "05", sector: "Smart City & Infrastructure", title: "Integrated Smart City Command Centre", location: "NEOM, KSA", scope: "Design and delivery of centralised smart-city operations platform integrating traffic, utilities, public safety, and citizen services.", year: "2023–Ongoing", value: "SAR 90M+" },
  { no: "06", sector: "Education Technology", title: "National e-Learning Platform", location: "Kingdom-wide", scope: "Scalable e-learning ecosystem for 700,000+ students, Arabic-first, AI-powered personalisation, Ministry-integrated LMS.", year: "2022–2023", value: "SAR 22M+" },
];

const REAL_ESTATE_PROJECTS = [
  { no: "01", status: "Completed", title: "Al Olaya Mixed-Use Tower", location: "Riyadh, KSA", type: "Commercial & Residential", area: "42,000 sqm", desc: "A landmark 28-storey mixed-use development featuring Grade-A office space, luxury residential apartments, and ground-floor retail in the heart of Al Olaya District.", year: "2021" },
  { no: "02", status: "Completed", title: "Jeddah Waterfront Residences", location: "Jeddah, KSA", type: "Residential", area: "18,500 sqm", desc: "Premium residential compound comprising 120 luxury villas and 200 apartments with full amenities, landscaped gardens, and private beach access.", year: "2020" },
  { no: "03", status: "Ongoing", title: "Vision 2030 Industrial Park", location: "Dammam, KSA", type: "Industrial & Logistics", area: "250,000 sqm", desc: "Large-scale industrial park development with warehousing, logistics facilities, and light manufacturing units aligned with Vision 2030 industrial diversification goals.", year: "2023–Ongoing" },
  { no: "04", status: "Ongoing", title: "Smart Residential Community", location: "NEOM, KSA", type: "Smart City Residential", area: "85,000 sqm", desc: "Next-generation smart residential community featuring IoT-integrated homes, solar energy systems, community hubs, and sustainable infrastructure.", year: "2024–Ongoing" },
  { no: "05", status: "Completed", title: "Commercial Office Complex", location: "Riyadh, KSA", type: "Commercial", area: "31,000 sqm", desc: "Modern Grade-A office complex housing 35+ corporate tenants including government entities and multinational corporations, with full facilities management.", year: "2019" },
  { no: "06", status: "Planned", title: "Agricultural Investment Estate", location: "Al-Ahsa, KSA", type: "Agricultural", area: "500,000 sqm", desc: "Integrated agricultural estate combining date palm cultivation, cold storage facilities, and export processing hub for premium Saudi dates.", year: "2025" },
];

const JOBS = [
  { icon: "💻", title: "Senior Cloud Architect", type: "Full-Time", location: "Riyadh, KSA", exp: "8+ yrs", tags: ["AWS", "Azure", "SAR 35k/mo"] },
  { icon: "🤖", title: "AI/ML Engineer (Arabic NLP)", type: "Full-Time", location: "Riyadh, KSA", exp: "5+ yrs", tags: ["Python", "PyTorch", "LLMs"] },
  { icon: "🛡️", title: "Cybersecurity Consultant", type: "Contract", location: "Jeddah / Remote", exp: "7+ yrs", tags: ["CISSP", "ISO 27001", "SOC"] },
  { icon: "📊", title: "Digital Transformation Lead", type: "Full-Time", location: "Riyadh, KSA", exp: "10+ yrs", tags: ["Agile", "Change Mgmt"] },
  { icon: "🌾", title: "Agricultural Operations Manager", type: "Full-Time", location: "Al-Ahsa, KSA", exp: "8+ yrs", tags: ["Date Farming", "Export", "Cold Chain"] },
  { icon: "🏗️", title: "Programme Manager – Real Estate", type: "Full-Time", location: "Riyadh, KSA", exp: "12+ yrs", tags: ["PMP", "Real Estate", "Vision 2030"] },
];

const TALENT_POOL = [
  { flag: "🇬🇧", region: "United Kingdom", count: "340+", roles: "Cloud Engineers, AI Specialists, PMs", color: "#4B6BFB" },
  { flag: "🇺🇸", region: "United States", count: "180+", roles: "AI/ML Researchers, Architects, CTOs", color: C.gold },
  { flag: "🇩🇪", region: "Germany & Europe", count: "210+", roles: "IoT Engineers, SAP Specialists, DevOps", color: C.greenLt },
  { flag: "🇦🇺", region: "Australia & Asia-Pacific", count: "95+", roles: "Data Scientists, Cybersecurity Leads", color: C.gold },
];

const CONTRACTING_CLIENTS = [
  { name: "Al Ayuni Investment & Contracting", abbr: "AI", logo: logo1, bg: "#1a1a0e", accent: C.gold, sector: "Construction & Infrastructure", desc: "A major Saudi construction firm founded in the 1960s...", projects: "12+ joint projects", value: "SAR 180M+" },
  { name: "Saudi Binladin Group", abbr: "SBG", logo: "https://www.sbgom.com/wp-content/uploads/2019/05/SBGOM-Logo.png", bg: "#1a0e0e", accent: "#FF6B6B", sector: "Mega Construction", desc: "One of the largest construction conglomerates...", projects: "8+ joint projects", value: "SAR 240M+" },
  { name: "Saudi Oger Ltd", abbr: "SO", logo: logo2, bg: "#0e1a1a", accent: "#7B9BFF", sector: "Construction & Real Estate", desc: "A major Saudi construction company...", projects: "15+ joint projects", value: "SAR 320M+" },
  { name: "Saudi German Hospital", abbr: "SGH", logo: logo3svg, bg: "#0e1a0e", accent: C.greenLt, sector: "Healthcare Infrastructure", desc: "A leading private healthcare network...", projects: "6+ joint projects", value: "SAR 45M+" },
  { name: "MASCO General Contracting", abbr: "MGC", logo: "https://www.masco.com.sa/wp-content/uploads/2022/06/logo-2.png", bg: "#1a0e1a", accent: C.gold, sector: "General Contracting", desc: "A large Saudi infrastructure company...", projects: "20+ joint projects", value: "SAR 95M+" },
];
export default function FarazmHoldings() {
  const [navScrolled, setNavScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("vacancies");
  const [activeSector, setActiveSector] = useState("agriculture");
  const [hoveredSector, setHoveredSector] = useState(null);
  const [cvForm, setCvForm] = useState({ name: "", email: "", role: "", country: "", exp: "", msg: "" });
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

  const NAV_LINKS = [
    ["about", "About"], ["sectors", "Sectors"], ["realestate", "Real Estate"],
    ["projects", "Projects"], ["contracting", "Clients"], ["partners", "Partners"],
    ["talent", "Talent Hub"], ["contact", "Contact"]
  ];

  const getSectorBtnStyle = (id) => {
    const isActive = activeSector === id;
    const isHovered = hoveredSector === id;
    return {
      padding: "10px 24px",
      borderRadius: "9999px",
      fontSize: "0.75rem",
      fontWeight: "600",
      textTransform: "uppercase",
      letterSpacing: "0.1em",
      border: isActive ? "1px solid #C9A252" : isHovered ? "1px solid #C9A252" : "1px solid #2A2A45",
      background: isActive ? "#C9A252" : isHovered ? "rgba(201,162,82,0.1)" : "transparent",
      color: isActive ? "#07070C" : isHovered ? "#C9A252" : "rgba(245,240,232,0.9)",
      cursor: "pointer",
      transition: "all 0.3s",
      outline: "none",
    };
  };

  

  return (
    <>
      {/* ── RIBBON ── */}
      <div className="ribbon">
        ✦ &nbsp; FARAZM Holdings | Investments with a PURPOSE &nbsp; ✦ &nbsp; Bridging Excellence Across Saudi Arabia & the United Kingdom &nbsp; ✦
      </div>

      {/* ── NAVBAR ── */}
      <nav className={`fixed top-6 left-0 right-0 z-50 flex items-center justify-between px-[5%] h-[72px] transition-all duration-300 ${navScrolled ? "bg-obsidian/95 backdrop-blur-xl border-b border-border !top-0 h-16" : ""}`}>
        <a className="flex items-center gap-3 cursor-pointer no-underline" onClick={() => scrollTo("hero")}>
          <img src={farazmLogo} alt="FARAZM Logo" className="w-10 h-10 rounded-full object-cover flex-shrink-0" />
          <div>
            <div className="font-serif font-bold text-lg text-white tracking-wider leading-tight">FARAZM</div>
            <div className="text-xs tracking-[0.25em] uppercase text-gold leading-tight">HOLDINGS · KSA</div>
          </div>
        </a>
        <div className="hidden xl:flex items-center gap-6">
          {NAV_LINKS.map(([id, label]) => (
            <span key={id} className="text-white/80 text-xs font-medium uppercase tracking-wider transition-colors cursor-pointer hover:text-gold" onClick={() => scrollTo(id)}>{label}</span>
          ))}
          <span className="btn-gold cursor-pointer" style={{ padding: "10px 22px", fontSize: "0.78rem" }} onClick={() => scrollTo("contact")}>Get in Touch</span>
        </div>
        <div className="xl:hidden flex flex-col gap-1 cursor-pointer p-1" onClick={() => setMobileOpen(o => !o)}>
          <span className="block w-6 h-0.5 bg-gold rounded" />
          <span className="block w-6 h-0.5 bg-gold rounded" />
          <span className="block w-6 h-0.5 bg-gold rounded" />
        </div>
      </nav>

      {mobileOpen && (
        <div className="fixed top-16 left-0 right-0 bg-onyx border-b border-border z-40 px-[5%] py-6">
          {NAV_LINKS.map(([id, label]) => (
            <div key={id} onClick={() => scrollTo(id)} className="py-3 border-b border-border text-white cursor-pointer font-medium">{label}</div>
          ))}
        </div>
      )}

      {/* ── HERO ── */}
      <section id="hero" className="min-h-screen flex flex-col items-center justify-center text-center relative overflow-hidden pt-32 pb-20 px-[5%]">
        <div className="absolute inset-0" style={{ background: `radial-gradient(ellipse 80% 60% at 50% 40%, rgba(201,162,82,0.07) 0%, transparent 60%), radial-gradient(ellipse 60% 40% at 80% 80%, rgba(0,105,62,0.06) 0%, transparent 50%)` }} />
        <IslamicPattern />
        <div className="ornament">✦ ✧ ✦</div>
        <div className="font-arabic text-2xl md:text-3xl text-gold opacity-70 mb-2 relative z-10">شركة فرازم للاستثمارات القابضة</div>
        <h1 className="font-serif text-5xl md:text-7xl font-light leading-tight tracking-tighter relative z-10">
          <span className="gold-text">FARAZM</span><br /><span className="font-light">HOLDINGS</span>
        </h1>
        <div className="flex items-center gap-3 mt-2 relative z-10">
          <span className="w-8 h-px bg-gold opacity-60" />
          <span className="text-xs uppercase tracking-[0.28em] text-gold">Investments with a PURPOSE</span>
          <span className="w-8 h-px bg-gold opacity-60" />
        </div>
        <p className="text-base md:text-lg text-white/90 max-w-xl leading-relaxed relative z-10 my-8">
          A premier Saudi conglomerate spanning Agriculture, Manufacturing, Real Estate, Technology, and Services driving Vision 2030 transformation across the Kingdom in strategic alliance with leading United Kingdom partners.
        </p>
        <div className="flex gap-4 flex-wrap justify-center relative z-10">
          <span className="btn-gold cursor-pointer" onClick={() => scrollTo("sectors")}>Explore Our Sectors <Icon name="arrow" size={16} color={C.obsidian} /></span>
          <span className="btn-outline cursor-pointer" onClick={() => scrollTo("contact")}>Get in Touch <Icon name="briefcase" size={16} color={C.gold} /></span>
        </div>
        <div className="flex flex-wrap gap-3 justify-center relative z-10 mt-8">
          {["Vision 2030 Aligned", "UK–KSA Strategic Alliance", "Agriculture & Dates Export", "Real Estate & Construction", "Technology & AI"].map(b => (
            <span key={b} className="px-4 py-1.5 border border-border text-white rounded-full text-xs tracking-wider uppercase cursor-pointer transition-all duration-300 hover:border-gold hover:text-gold hover:bg-gold/10">{b}</span>
          ))}
        </div>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 opacity-40 animate-pulse">
          <div className="w-px h-10 bg-gradient-to-b from-gold to-transparent" />
          <span className="text-[0.65rem] tracking-[0.2em] text-gold uppercase">Scroll</span>
        </div>
      </section>

      {/* ── STATS ── */}
      <div className="px-[5%] pb-20">
        <div className="flex flex-wrap border border-border rounded overflow-hidden">
          {[
            { num: "25+", label: "Years in the Kingdom", icon: "✦" },
            { num: "SAR 400M+", label: "Project Portfolio Value", icon: "✧" },
            { num: "5", label: "Core Business Sectors", icon: "✦" },
            { num: "800+", label: "Global Talent Network", icon: "✧" },
            { num: "20+", label: "Major Projects Delivered", icon: "✦" },
          ].map(s => (
            <div key={s.label} className="flex-1 basis-[180px] px-6 py-10 text-center border-r border-border last:border-r-0">
              <div className="text-2xl mb-2 text-gold opacity-60 tracking-widest">{s.icon}</div>
              <div className="stat-num gold-text">{s.num}</div>
              <div className="text-xs uppercase tracking-widest text-white mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── ABOUT ── */}
      <section id="about" className="py-24 px-[5%] bg-onyx relative overflow-hidden">
        <IslamicPattern />
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
            <span className="block text-xs tracking-[0.25em] uppercase text-gold font-semibold mb-3">Who We Are</span>
            <h2 className="font-serif text-4xl md:text-5xl font-light mb-4">A Legacy of <span className="gold-text">Excellence</span><br />in the Kingdom</h2>
            <div className="gold-divider" style={{ margin: "0 0 2rem" }} />
            <p className="text-white/90 leading-relaxed mb-4 text-sm">FARAZM Holdings is a premier Saudi conglomerate with over 25 years of excellence across five core sectors: Agriculture, Manufacturing, Real Estate, Technology, and Services. Founded in the Kingdom, we are deeply embedded in Saudi Arabia's Vision 2030 transformation journey.</p>
            <p className="text-white/90 leading-relaxed mb-4 text-sm">From date palm farms in Al-Ahsa to plastic manufacturing facilities, landmark real estate developments to cutting-edge IT solutions — FARAZM Holdings delivers purposeful investments that build a stronger Kingdom.</p>
            <p className="text-sm font-medium italic" style={{ color: C.goldLt }}>"Investments with a PURPOSE" — every venture we undertake creates lasting value for Saudi Arabia's economy, its people, and its future.</p>
            <div className="flex flex-wrap gap-2 mt-6">
              {["Riyadh HQ", "Jeddah Office", "Al-Ahsa Agricultural Operations", "NEOM Project Base", "UK Office (London)"].map(l => (
                <span key={l} className="flex items-center gap-1.5 px-4 py-2 border border-border rounded-full text-xs text-white/90">
                  <Icon name="map" size={12} color={C.gold} />{l}
                </span>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-4">
            {[
              { icon: "🌾", title: "Agricultural Heritage", desc: "Deep roots in Saudi Arabia's agricultural sector with premium date palm farms, cold storage facilities, and international export operations spanning three continents." },
              { icon: "🏭", title: "Industrial Strength", desc: "Comprehensive manufacturing capabilities in plastic production and raw material trading, supporting Saudi Arabia's industrial diversification under Vision 2030." },
              { icon: "🏗️", title: "Real Estate Excellence", desc: "A portfolio of landmark residential, commercial, and industrial real estate developments across Riyadh, Jeddah, Dammam, and emerging Vision 2030 cities." },
              { icon: "🤝", title: "Trusted by the Best", desc: "Proven partnerships with Al Ayuni, Saudi Binladin Group, Saudi Oger, Saudi German Hospital, and MASCO — the Kingdom's most respected organisations." },
            ].map(item => (
              <div key={item.title} className="card flex gap-4 items-start !p-5">
                <div className="text-2xl flex-shrink-0">{item.icon}</div>
                <div>
                  <div className="font-semibold text-sm mb-1">{item.title}</div>
                  <div className="text-white/90 text-xs leading-relaxed">{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTORS ── */}
       {/* ── SECTORS ── */}
      <section id="sectors" className="py-24 px-[5%] overflow-hidden" style={{ position: "relative" }}>
        <div style={{ position: "absolute", inset: 0, background: `radial-gradient(ellipse 70% 50% at 50% 50%, rgba(201,162,82,0.04) 0%, transparent 70%)`, zIndex: 0, pointerEvents: "none" }} />
        
        <div style={{ position: "relative", zIndex: 5 }}>
          <SectionHeader overline="Our Business Sectors" title="Five Pillars of" highlight="Purposeful Investment" desc="FARAZM Holdings operates across five strategically chosen sectors, each contributing to Saudi Arabia's economic diversification and Vision 2030 objectives." />

          <div className="flex flex-wrap gap-2 justify-center mb-12">
            {SECTORS.map(t => (
              <button
                key={t.id}
                type="button"
                style={getSectorBtnStyle(t.id)}
                onMouseEnter={() => setHoveredSector(t.id)}
                onMouseLeave={() => setHoveredSector(null)}
                onClick={() => setActiveSector(t.id)}
              >
                {t.label}
              </button>
            ))}
          </div>

          <div style={{ minHeight: "400px" }}>
            {activeSector === "agriculture" && <AgricultureContent />}
            {activeSector === "manufacturing" && <ManufacturingContent />}
            {activeSector === "services" && <ServicesContent />}
            {activeSector === "technology" && <TechnologyContent />}
          </div>
        </div>
      </section>

      {/* ── REAL ESTATE PORTFOLIO ── */}
      <section id="realestate" className="py-24 px-[5%] bg-onyx relative overflow-hidden">
        <IslamicPattern />
        <SectionHeader overline="Real Estate Portfolio" title="Landmark Developments Across" highlight="the Kingdom" desc="FARAZM Holdings' real estate portfolio encompasses landmark residential, commercial, industrial, and smart city developments from completed flagship projects to ambitious ongoing developments shaping Saudi Arabia's urban future." />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {REAL_ESTATE_PROJECTS.map((p) => (
            <div key={p.no} className="project-card">
              <div className="project-header">
                <div className="project-number">{p.no}</div>
                <div className="w-full">
                  <div className="flex items-center justify-between mb-2">
                    <div className="text-xs tracking-[0.15em] uppercase text-gold">{p.type}</div>
                    <span style={{
                      fontSize: "0.75rem", padding: "4px 12px", borderRadius: "9999px",
                      border: p.status === "Completed" ? "1px solid rgba(0,168,96,0.4)" : p.status === "Ongoing" ? "1px solid rgba(201,162,82,0.4)" : "1px solid rgba(75,107,251,0.4)",
                      color: p.status === "Completed" ? "#00A860" : p.status === "Ongoing" ? "#C9A252" : "#4B6BFB",
                      background: p.status === "Completed" ? "rgba(0,105,62,0.1)" : p.status === "Ongoing" ? "rgba(201,162,82,0.1)" : "rgba(75,107,251,0.1)",
                    }}>{p.status}</span>
                  </div>
                  <h3 className="font-serif text-lg font-semibold leading-snug">{p.title}</h3>
                </div>
              </div>
              <div className="p-6">
                <div className="flex flex-wrap gap-3 mb-3">
                  <span className="flex items-center gap-1 text-xs text-white/90"><Icon name="map" size={11} color={C.gold} />{p.location}</span>
                  <span className="text-xs text-white/90">📅 {p.year}</span>
                  <span className="text-xs text-gold">📐 {p.area}</span>
                </div>
                <p className="text-white/90 text-xs leading-relaxed">{p.desc}</p>
                <div className="mt-4 pt-3 border-t border-border">
                  <span className="text-xs text-gold font-semibold cursor-pointer" onClick={() => scrollTo("contact")}>Request Details →</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 p-8 bg-panel border border-gold/20 rounded flex flex-wrap gap-6 items-center justify-between">
          <div>
            <h4 className="font-serif text-2xl mb-2">Interested in Our <span className="gold-text">Real Estate Portfolio</span>?</h4>
            <p className="text-white/90 text-sm max-w-lg leading-relaxed">Whether you're an investor, developer, or institutional buyer — our real estate division is open to strategic partnerships, joint ventures, and investment discussions.</p>
          </div>
          <button className="btn-gold" onClick={() => scrollTo("contact")}>Discuss Investment <Icon name="arrow" size={15} color={C.obsidian} /></button>
        </div>
      </section>

      {/* ── TECHNOLOGY PROJECTS ── */}
      <section id="projects" className="py-24 px-[5%] relative overflow-hidden">
        <SectionHeader overline="Technology Track Record" title="Landmark Technology" highlight="Projects" desc="A selection of major technology engagements FARAZM Holdings has delivered across the Kingdom from Vision 2030 giga-projects to critical national infrastructure." />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {TECH_PROJECTS.map((p) => (
            <div key={p.no} className="project-card">
              <div className="project-header">
                <div className="project-number">{p.no}</div>
                <div>
                  <div className="text-xs tracking-[0.15em] uppercase text-gold mb-1">{p.sector}</div>
                  <h3 className="font-serif text-xl font-semibold">{p.title}</h3>
                </div>
              </div>
              <div className="p-6">
                <div className="flex flex-wrap gap-3 mb-4">
                  <span className="flex items-center gap-1 text-xs text-white/90"><Icon name="map" size={11} color={C.gold} />{p.location}</span>
                  <span className="text-xs text-white/90">📅 {p.year}</span>
                  <span className="text-xs" style={{ color: C.greenLt }}>💰 {p.value}</span>
                </div>
                <p className="text-white/90 text-xs leading-relaxed">{p.scope}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-12">
          <span className="btn-outline cursor-pointer" onClick={() => scrollTo("contact")}>Discuss Your Project <Icon name="arrow" size={15} color={C.gold} /></span>
        </div>
      </section>

      {/* ── CONTRACTING & MAJOR CLIENTS ── */}
      <section id="contracting" className="py-24 px-[5%] bg-onyx relative overflow-hidden">
        <IslamicPattern />
        <SectionHeader overline="Contracting & Major Clients" title="Trusted by the Kingdom's" highlight="Best" desc="FARAZM Holdings has earned the trust of Saudi Arabia's most respected organisations — a testament to our unwavering commitment to quality, reliability, and excellence in delivery across all sectors." />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {CONTRACTING_CLIENTS.map((c) => (
            <div key={c.name} className="partner-card">
              <div className="flex items-start gap-4 mb-4">
                <div
                  style={{
                    width: "80px", height: "80px", borderRadius: "12px",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    flexShrink: 0, fontFamily: "serif", fontWeight: "bold",
                    fontSize: "0.875rem", overflow: "hidden",
                    background: c.logo ? "#ffffff" : c.bg,
                    border: `2px solid ${c.accent}30`,
                    color: c.accent, padding: "0",
                  }}
                >
                  {c.logo
                    ? <img src={c.logo} alt={c.name} style={{ width: "100%", height: "100%", objectFit: "contain", padding: "8px" }}
                        onError={(e) => { e.target.style.display = "none"; e.target.parentNode.innerHTML = c.abbr; }} />
                    : c.abbr
                  }
                </div>
                <div>
                  <h3 className="font-serif text-lg font-semibold mb-1 leading-tight">{c.name}</h3>
                  <div className="text-xs mb-1" style={{ color: c.accent }}>{c.sector}</div>
                </div>
              </div>
              <p className="text-white/90 text-sm leading-relaxed mb-4">{c.desc}</p>
              <div className="flex items-center justify-between pt-3 border-t border-border">
                <div>
                  <div className="text-xs text-white/90 mb-0.5">{c.projects}</div>
                  <div className="text-xs font-semibold" style={{ color: c.accent }}>{c.value} Contract Value</div>
                </div>
                <div className="flex">{[...Array(5)].map((_, i) => <Icon key={i} name="star" size={12} color={C.gold} />)}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="p-10 bg-panel border border-border rounded text-center">
          <div className="ornament">✦ ✧ ✦</div>
          <h3 className="font-serif text-3xl font-light mt-2 mb-4">Our <span className="gold-text">Reputation</span> is Our Greatest Asset</h3>
          <p className="text-white/90 text-sm leading-relaxed max-w-3xl mx-auto mb-6">For over 25 years, FARAZM Holdings has built an unmatched reputation for delivery excellence across contracting, real estate, technology, and services. Our partnerships with Saudi Arabia's most prestigious organisations are a testament to the trust we have earned through consistent, high-quality delivery.</p>
          <div className="flex flex-wrap gap-3 justify-center">
            {["Al Ayuni", "Saudi Binladin Group", "Saudi Oger", "Saudi German Hospital", "MASCO General Contracting"].map(name => (
              <span key={name} className="px-4 py-2 bg-gold/10 border border-gold/30 rounded-full text-xs text-gold font-semibold tracking-wider">{name}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ── UK PARTNERS ── */}
      <section id="partners" className="py-24 px-[5%] relative overflow-hidden">
        <SectionHeader overline="Strategic UK Partners" title="Our" highlight="Alliance Network" desc="FARAZM Holdings operates in formal strategic collaboration with four distinguished United Kingdom-based technology and consulting organisations." />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {PARTNERS.map((p) => (
            <div key={p.name} className="partner-card">
              <div className="flex items-start gap-5 mb-5">
                <div className="w-16 h-16 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: p.bg, border: `2px solid ${p.accent}30` }}>
                  <span className="font-serif font-bold text-lg" style={{ color: p.accent }}>{p.abbr}</span>
                </div>
                <div>
                  <h3 className="font-serif text-xl font-semibold mb-1">{p.name}</h3>
                  <div className="text-xs mb-1" style={{ color: p.accent }}>{p.role}</div>
                  <div className="text-xs text-white/90">{p.country}</div>
                </div>
              </div>
              <p className="text-white/90 text-sm leading-relaxed mb-4">{p.desc}</p>
              <div className="flex flex-wrap gap-2">
                {p.tags.map(t => <span key={t} className="px-3 py-1 rounded-full text-xs tracking-wider" style={{ background: `${p.accent}12`, border: `1px solid ${p.accent}30`, color: p.accent }}>{t}</span>)}
              </div>
              <div className="mt-5 pt-4 border-t border-border flex items-center justify-between">
                <span className="text-xs text-white/90">In Partnership with FARAZM Holdings KSA</span>
                <div className="w-7 h-7 rounded-full flex items-center justify-center" style={{ background: `${p.accent}15`, border: `1px solid ${p.accent}30` }}>
                  <Icon name="arrow" size={12} color={p.accent} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── TALENT HUB ── */}
      <section id="talent" className="py-24 px-[5%] bg-onyx relative overflow-hidden">
        <IslamicPattern />
        <SectionHeader overline="FARAZM Talent Hub" title="The Boutique Talent &" highlight="Careers Platform" desc="Saudi Arabia's premier boutique talent broker for high-calibre professionals from the UK, US, and Europe — ready to deploy across all five of our business sectors." />

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {TALENT_POOL.map(t => (
            <div key={t.region} className="card text-center">
              <div className="text-4xl mb-2">{t.flag}</div>
              <div className="font-serif text-3xl font-light mb-1" style={{ color: t.color }}>{t.count}</div>
              <div className="font-semibold text-sm mb-1">{t.region}</div>
              <div className="text-xs text-white/90">{t.roles}</div>
            </div>
          ))}
        </div>

        <div className="tabs">
          {[["vacancies", "Current Vacancies 🗂️"], ["submit", "Submit Your CV 📄"], ["onboarding", "Onboarding Journey 🚀"], ["employers", "For Employers 🏢"]].map(([id, label]) => (
            <button key={id} className={`tab${activeTab === id ? " active" : ""}`} onClick={() => setActiveTab(id)}>{label}</button>
          ))}
        </div>

        {activeTab === "vacancies" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {JOBS.map(j => (
              <div key={j.title} className="flex items-start gap-4 p-5 bg-panel border border-border rounded transition-all hover:border-gold-dark hover:shadow-xl">
                <div className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 bg-gold/10 border border-gold/20">
                  <span className="text-xl">{j.icon}</span>
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-sm mb-2">{j.title}</h4>
                  <div className="flex flex-wrap gap-1.5 mb-2">
                    <span className="job-tag">{j.type}</span>
                    <span className="job-tag">{j.exp}</span>
                    <span className="job-tag">{j.location}</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5 mb-3">{j.tags.map(t => <span key={t} className="job-tag">{t}</span>)}</div>
                  <button className="btn-gold" style={{ padding: "8px 18px", fontSize: "0.75rem" }} onClick={() => setActiveTab("submit")}>Apply Now</button>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === "submit" && (
          <div className="max-w-2xl mx-auto">
            {cvSubmitted ? (
              <div className="text-center p-16 bg-panel border border-green rounded">
                <div className="text-5xl mb-4">✅</div>
                <h3 className="font-serif text-3xl mb-3"><span className="green-text">Application Received</span></h3>
                <p className="text-white/90 leading-relaxed">Thank you. Our boutique talent team will be in touch within 3–5 business days.</p>
                <button className="btn-green mt-8" onClick={() => { setCvSubmitted(false); setCvForm({ name: "", email: "", role: "", country: "", exp: "", msg: "" }); }}>Submit Another</button>
              </div>
            ) : (
              <div className="card">
                <h3 className="font-serif text-2xl mb-1">Submit Your <span className="gold-text">CV & Profile</span></h3>
                <p className="text-white/90 text-xs mb-6">Join our exclusive talent network for premium opportunities across all five FARAZM sectors.</p>
                <div className="grid grid-cols-2 gap-5">
                  <div className="form-group"><label className="form-label">Full Name *</label><input className="form-input" value={cvForm.name} onChange={e => setCvForm(f => ({ ...f, name: e.target.value }))} placeholder="Your full name" /></div>
                  <div className="form-group"><label className="form-label">Email Address *</label><input className="form-input" type="email" value={cvForm.email} onChange={e => setCvForm(f => ({ ...f, email: e.target.value }))} placeholder="your@email.com" /></div>
                  <div className="form-group">
                    <label className="form-label">Desired Sector *</label>
                    <select className="form-select" value={cvForm.role} onChange={e => setCvForm(f => ({ ...f, role: e.target.value }))}>
                      <option value="">Select a sector</option>
                      <option>Agriculture & Date Export</option>
                      <option>Manufacturing & Industrial</option>
                      <option>Real Estate & Construction</option>
                      <option>Information Technology</option>
                      <option>Transport & Logistics</option>
                      <option>HR Consultancy</option>
                      <option>Government & Public Sector</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Current Country *</label>
                    <select className="form-select" value={cvForm.country} onChange={e => setCvForm(f => ({ ...f, country: e.target.value }))}>
                      <option value="">Select country</option>
                      <option>🇬🇧 United Kingdom</option>
                      <option>🇺🇸 United States</option>
                      <option>🇩🇪 Germany</option>
                      <option>🇨🇦 Canada</option>
                      <option>🇦🇺 Australia</option>
                      <option>🇸🇦 Saudi Arabia</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <div className="form-group col-span-2"><label className="form-label">Cover Note / Key Skills</label><textarea className="form-textarea" value={cvForm.msg} onChange={e => setCvForm(f => ({ ...f, msg: e.target.value }))} placeholder="Tell us about your expertise and the opportunities that interest you..." /></div>
                </div>
                <button className="btn-gold w-full justify-center mt-2" onClick={() => { if (cvForm.name && cvForm.email) setCvSubmitted(true); }}>Submit Application <Icon name="arrow" size={15} color={C.obsidian} /></button>
              </div>
            )}
          </div>
        )}

        {activeTab === "onboarding" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { step: "01", icon: "📄", title: "CV Submission & Profile Review", desc: "Our senior consultants personally review every application for suitability and alignment with live mandates across all sectors.", timeline: "Day 1–3" },
              { step: "02", icon: "📞", title: "Boutique Consultation Call", desc: "A dedicated FARAZM consultant conducts a deep-dive conversation about your aspirations and preferred opportunity types.", timeline: "Day 3–7" },
              { step: "03", icon: "🎯", title: "Opportunity Matching", desc: "We match you with the most suitable opportunities across our Saudi client portfolio across all 5 sectors.", timeline: "Week 2" },
              { step: "04", icon: "🛂", title: "KSA Visa & Relocation Support", desc: "Our mobility team guides you through Saudi work permit applications, Iqama processing, and housing assistance.", timeline: "Weeks 3–6" },
              { step: "05", icon: "🎓", title: "Cultural Briefing", desc: "Comprehensive briefing covering workplace norms, Islamic calendar, dress codes, and life in Saudi Arabia.", timeline: "Week 6–8" },
              { step: "06", icon: "🚀", title: "In-Kingdom Onboarding", desc: "Dedicated in-Kingdom support throughout your first 90 days including HR liaison and pastoral care from our Riyadh team.", timeline: "Ongoing" },
            ].map(s => (
              <div key={s.step} className="card">
                <div className="flex justify-between items-start mb-4">
                  <div className="font-serif text-5xl font-light opacity-10 text-gold leading-none">{s.step}</div>
                  <span style={{ fontSize: "0.7rem", letterSpacing: "0.05em", textTransform: "uppercase", color: C.greenLt, background: "rgba(0,105,62,0.1)", border: "1px solid rgba(0,168,96,0.25)", borderRadius: "9999px", padding: "4px 12px" }}>{s.timeline}</span>
                </div>
                <div className="text-3xl mb-3">{s.icon}</div>
                <h4 className="font-semibold text-sm mb-2">{s.title}</h4>
                <p className="text-white/90 text-xs leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        )}

        {activeTab === "employers" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { icon: "🔍", title: "Boutique Executive Search", desc: "For C-suite and Director-level appointments across all 5 FARAZM sectors — curated shortlists from our global network within 10 business days.", color: C.gold },
              { icon: "⚡", title: "Rapid Talent Deployment", desc: "Pre-screened specialists from our 800+ talent pool across Agriculture, Manufacturing, Real Estate, IT, and Services. Most roles filled within 4–6 weeks.", color: "#7B9BFF" },
              { icon: "🏭", title: "Workforce Outsourcing (BPO)", desc: "Full workforce solutions for large-scale programme delivery across all sectors — end-to-end employment, compliance, payroll, and HR administration.", color: C.greenLt },
              { icon: "📋", title: "Nitaqat & Saudisation Advisory", desc: "Expert guidance on Saudisation ratios, Nitaqat compliance strategy, and Saudi talent development programmes to achieve premium Nitaqat classification.", color: C.gold },
            ].map(s => (
              <div key={s.title} className="card">
                <div className="text-4xl mb-4">{s.icon}</div>
                <h4 className="font-serif text-xl font-semibold mb-2" style={{ color: s.color }}>{s.title}</h4>
                <p className="text-white/90 text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" className="py-24 px-[5%] relative overflow-hidden">
        <div className="absolute inset-0" style={{ background: `radial-gradient(ellipse 70% 50% at 50% 50%, rgba(201,162,82,0.03) 0%, transparent 70%)` }} />
        <SectionHeader overline="Get in Touch" title="Start a" highlight="Conversation" desc="Whether you're a business seeking transformation, an investor exploring opportunities, or a professional ready to build a career in Saudi Arabia — we'd love to hear from you." />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          <div>
            <h3 className="font-serif text-2xl font-light mb-5">Our Offices</h3>
            {[
              { city: "Riyadh : HQ", addr: "King Fahd Road, Al Olaya District, Riyadh 12213, KSA", phone: "+966 11 XXX XXXX", flag: "🇸🇦" },
              { city: "Jeddah", addr: "Prince Mohammed Bin Abdulaziz Road, Jeddah 23431, KSA", phone: "+966 12 XXX XXXX", flag: "🇸🇦" },
              { city: "Al-Ahsa : Agricultural Operations", addr: "Al-Ahsa Agricultural Zone, Eastern Province, KSA", phone: "+966 13 XXX XXXX", flag: "🇸🇦" },
              { city: "London : UK Office", addr: "Canary Wharf, London E14, United Kingdom", phone: "+44 20 XXXX XXXX", flag: "🇬🇧" },
            ].map(o => (
              <div key={o.city} className="p-4 bg-panel border border-border rounded mb-2">
                <div className="flex items-center gap-2 font-semibold text-sm mb-1"><span>{o.flag}</span>{o.city}</div>
                <div className="text-xs text-white/90 leading-relaxed">{o.addr}</div>
                <div className="flex items-center gap-1.5 mt-1.5 text-xs text-gold"><Icon name="phone" size={11} color={C.gold} />{o.phone}</div>
              </div>
            ))}
            <h3 className="font-serif text-xl font-light mt-8 mb-4">Email Enquiries</h3>
            {[
              { label: "General Enquiries", email: "info@farazmholdings.com" },
              { label: "Agriculture & Export", email: "agriculture@farazmholdings.com" },
              { label: "Real Estate & Investment", email: "realestate@farazmholdings.com" },
              { label: "Technology & IT", email: "tech@farazmholdings.com" },
              { label: "Contracting & Partnerships", email: "contracting@farazmholdings.com" },
              { label: "Talent & HR", email: "talent@farazmholdings.com" },
              { label: "UK Alliance", email: "uk@farazmholdings.com" },
            ].map(e => (
              <div key={e.label} className="flex justify-between py-2 border-b border-border text-xs">
                <span className="text-white/90">{e.label}</span>
                <span className="text-gold">{e.email}</span>
              </div>
            ))}
          </div>

          <div>
            {submitted ? (
              <div className="text-center p-12 bg-panel border border-gold rounded">
                <div className="text-5xl mb-4">✨</div>
                <h3 className="font-serif text-3xl mb-3"><span className="gold-text">Message Sent</span></h3>
                <p className="text-white/90 leading-relaxed text-sm">شكراً جزيلاً | Thank you for reaching out to FARAZM Holdings. A member of our team will respond within one business day.</p>
                <button className="btn-gold mt-6" onClick={() => { setSubmitted(false); setContactForm({ name: "", company: "", email: "", phone: "", service: "", msg: "" }); }}>Send Another Message</button>
              </div>
            ) : (
              <div className="card">
                <h3 className="font-serif text-2xl mb-1">Send Us a <span className="gold-text">Message</span></h3>
                <p className="text-white/90 text-xs mb-6">We respond to all enquiries within one business day.</p>
                <div className="grid grid-cols-2 gap-5">
                  <div className="form-group"><label className="form-label">Full Name *</label><input className="form-input" value={contactForm.name} onChange={e => setContactForm(f => ({ ...f, name: e.target.value }))} placeholder="Your name" /></div>
                  <div className="form-group"><label className="form-label">Company / Organisation</label><input className="form-input" value={contactForm.company} onChange={e => setContactForm(f => ({ ...f, company: e.target.value }))} placeholder="Your company" /></div>
                  <div className="form-group"><label className="form-label">Email Address *</label><input className="form-input" type="email" value={contactForm.email} onChange={e => setContactForm(f => ({ ...f, email: e.target.value }))} placeholder="your@email.com" /></div>
                  <div className="form-group"><label className="form-label">Phone Number</label><input className="form-input" value={contactForm.phone} onChange={e => setContactForm(f => ({ ...f, phone: e.target.value }))} placeholder="+966 or +44..." /></div>
                  <div className="form-group col-span-2">
                    <label className="form-label">I am interested in *</label>
                    <select className="form-select" value={contactForm.service} onChange={e => setContactForm(f => ({ ...f, service: e.target.value }))}>
                      <option value="">Select area of interest</option>
                      <option>Agriculture & Date Export</option>
                      <option>Manufacturing & Plastic Trading</option>
                      <option>Real Estate Development & Investment</option>
                      <option>IT Services & Digital Transformation</option>
                      <option>Transport & Logistics</option>
                      <option>Contracting Services</option>
                      <option>Heavy Machinery Import & Rental</option>
                      <option>Food & Restaurant Business</option>
                      <option>Vehicle Import & Export</option>
                      <option>Consultancy Services</option>
                      <option>HR Consultancy & Outsourcing</option>
                      <option>UK–KSA Partnership / Investment</option>
                      <option>Careers & Talent Hub</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <div className="form-group col-span-2"><label className="form-label">How Can We Help? *</label><textarea className="form-textarea" value={contactForm.msg} onChange={e => setContactForm(f => ({ ...f, msg: e.target.value }))} placeholder="Describe your project, requirement, or enquiry..." /></div>
                </div>
                <button className="btn-gold w-full justify-center mt-2" onClick={() => { if (contactForm.name && contactForm.email && contactForm.msg) setSubmitted(true); }}>
                  Send Message <Icon name="arrow" size={15} color={C.obsidian} />
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-obsidian border-t border-border py-16 px-[5%]">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-10 mb-10">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-5">
              <img src={farazmLogo} alt="FARAZM Logo" className="w-12 h-12 rounded-full object-cover flex-shrink-0" />
              <div>
                <div className="font-serif font-bold text-lg text-white">FARAZM HOLDINGS</div>
                <div className="text-xs tracking-[0.25em] uppercase text-gold">Kingdom of Saudi Arabia</div>
              </div>
            </div>
            <p className="text-white/90 text-xs leading-relaxed mb-3 max-w-xs">A premier Saudi conglomerate spanning Agriculture, Manufacturing, Real Estate, Technology, and Services delivering purposeful investments that build a stronger Kingdom.</p>
            <div className="text-xs font-semibold text-gold mb-4 tracking-wider italic">"Investments with a PURPOSE"</div>
            <div className="font-arabic text-sm text-gold opacity-60 mb-4">التميز في خدمة المملكة</div>
            <div className="flex gap-3">{["🇸🇦", "🇬🇧"].map(f => <span key={f} className="text-2xl">{f}</span>)}</div>
          </div>

          <div>
            <div className="text-xs tracking-[0.2em] uppercase text-gold mb-4 font-semibold">Our Sectors</div>
            {[["🌾 Agriculture & Dates", "sectors"], ["🏭 Manufacturing", "sectors"], ["🏗️ Real Estate", "realestate"], ["💻 Technology & IT", "sectors"], ["⚙️ Services", "sectors"]].map(([l, id]) => (
              <a key={l} className="block text-white/90 text-sm mb-2 cursor-pointer hover:text-gold transition-colors" onClick={() => scrollTo(id)}>{l}</a>
            ))}
          </div>

          <div>
            <div className="text-xs tracking-[0.2em] uppercase text-gold mb-4 font-semibold">Company</div>
            {[["About FARAZM", "about"], ["Real Estate Portfolio", "realestate"], ["Technology Projects", "projects"], ["Major Clients", "contracting"], ["UK Partnerships", "partners"], ["Talent Hub", "talent"], ["Contact Us", "contact"]].map(([l, id]) => (
              <a key={l} className="block text-white/90 text-sm mb-2 cursor-pointer hover:text-gold transition-colors" onClick={() => scrollTo(id)}>{l}</a>
            ))}
          </div>

          <div>
            <div className="text-xs tracking-[0.2em] uppercase text-gold mb-4 font-semibold">Major Clients</div>
            {["Al Ayuni", "Saudi Binladin Group", "Saudi Oger", "Saudi German Hospital", "MASCO General Contracting"].map(l => (
              <div key={l} className="text-white/90 text-xs mb-2">{l}</div>
            ))}
            <div className="mt-5 text-xs tracking-[0.2em] uppercase text-gold mb-3 font-semibold">Connect</div>
            <div className="flex gap-2">
              {[{ icon: "linkedin", color: "#0A66C2" }, { icon: "globe", color: C.gold }, { icon: "mail", color: C.green }].map(s => (
                <div key={s.icon} className="w-9 h-9 rounded-full bg-panel border border-border flex items-center justify-center cursor-pointer transition-colors hover:border-gold">
                  <Icon name={s.icon} size={15} color={s.color} />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-border pt-6 flex flex-wrap justify-between items-center gap-4 text-xs text-white/90">
          <div>© 2024 FARAZM Holdings. All rights reserved. Registered in the Kingdom of Saudi Arabia. | <span className="text-gold italic">Investments with a PURPOSE</span></div>
          <div className="flex gap-6">{["Privacy Policy", "Terms of Use", "Sitemap"].map(l => <a key={l} href="#" className="text-white/90 hover:text-gold transition-colors">{l}</a>)}</div>
        </div>
      </footer>
    </>
  );
}