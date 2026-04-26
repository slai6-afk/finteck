
// ─── PENNY DESIGN TOKENS v2 ──────────────────────────────────────
const P = {
  color: {
    // Brand palette
    pink:      '#F8B2BD',
    green:     '#0C4524',
    sand:      '#E9DAAB',
    black:     '#2D2D2D',
    white:     '#FFFFFF',
    // Surfaces
    cream:     '#FDF8F6',
    pinkLight: '#FEF1F3',
    sandLight: '#FAF6E8',
    greenLight:'#E5EFE9',
    // Ink scale
    ink2:      '#4A4A46',
    ink3:      '#7E7E79',
    ink4:      '#B2AFA8',
    border:    '#EAE6DE',
    stone:     '#F0EDE5',
    // Semantic
    aligned:      '#0C4524',
    neutral:      '#8B6A30',
    impulsive:    '#C14030',
    alignedTint:  '#E5EFE9',
    neutralTint:  '#F4EDE1',
    impulsiveTint:'#FAEBE5',
    // Pig
    pigPink:    '#F5B0B9',
    pigPinkDark:'#E8ABBF',
  },
  font: {
    display: '"Playfair Display", Georgia, serif',
    body:    '"Mulish", system-ui, sans-serif',
    ui:      '"Poppins", system-ui, sans-serif',
  },
  r: { sm:8, md:12, lg:20, xl:28, pill:100 },
  sp: { xs:4, sm:8, md:16, lg:24, xl:32 },
  shadow: {
    sm: '0 1px 4px rgba(44,44,40,.07)',
    md: '0 4px 16px rgba(44,44,40,.10)',
    lg: '0 8px 32px rgba(44,44,40,.14)',
  },
};

// ─── SVG ICON SYSTEM ─────────────────────────────────────────────
// All icons: 24×24, 2px stroke, round caps/joins
const ICON_PATHS = {
  dining:    <><path d="M3 2v7c0 1.1.9 2 2 2h1v11h2V11h1c1.1 0 2-.9 2-2V2h-2v5H7V2H5v5H4V2H3z"/><path d="M19 2c0 0-2 1.5-2 5.5S19 13 19 13v9h-2V2h2z"/></>,
  coffee:    <><path d="M18 8h1a4 4 0 010 8h-1"/><path d="M2 8h16v9a4 4 0 01-4 4H6a4 4 0 01-4-4V8z"/><line x1="6" y1="1" x2="6" y2="4"/><line x1="10" y1="1" x2="10" y2="4"/><line x1="14" y1="1" x2="14" y2="4"/></>,
  grocery:   <><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6"/></>,
  transport: <><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16"/><path d="M6 12h4m4 0h4"/></>,
  shopping:  <><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/></>,
  fitness:   <><path d="M6.5 6.5h11M6.5 17.5h11M3 10.5h3.5v3H3zM17.5 10.5H21v3h-3.5zM6.5 12h11"/></>,
  travel:    <><path d="M22 16.92v3a2 2 0 01-2.18 2 19.8 19.8 0 01-8.63-3.07A19.5 19.5 0 013.07 9.8a19.8 19.8 0 01-3.07-8.64A2 2 0 012 .82h3a2 2 0 012 1.72c.13.96.36 1.9.7 2.81a2 2 0 01-.45 2.11L6.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0122 16.92z"/></>,
  entertainment:<><polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2"/></>,
  home:      <><path d="M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1H4a1 1 0 01-1-1V9.5z"/><path d="M9 21V12h6v9"/></>,
  education: <><path d="M4 19.5A2.5 2.5 0 016.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z"/></>,
  social:    <><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></>,
  clothing:  <><path d="M20.38 3.46L16 2a4 4 0 01-8 0L3.62 3.46a2 2 0 00-1.34 2.23l.58 3.57a1 1 0 00.99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 002-2V10h2.15a1 1 0 00.99-.84l.58-3.57a2 2 0 00-1.34-2.23z"/></>,
  rent:      <><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><path d="M9 22V12h6v10"/><circle cx="12" cy="8" r="1.5"/></>,
  health:    <><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></>,
  office:    <><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16"/></>,
  subscriptions:<><rect x="5" y="2" width="14" height="20" rx="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></>,
  // UI icons
  bell:      <><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 01-3.46 0"/></>,
  chevRight: <path d="M9 18l6-6-6-6"/>,
  chevLeft:  <path d="M15 18l-6-6 6-6"/>,
  chevDown:  <path d="M6 9l6 6 6-6"/>,
  check:     <path d="M20 6L9 17l-5-5"/>,
  close:     <><path d="M18 6L6 18"/><path d="M6 6l12 12"/></>,
  plus:      <><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></>,
  settings:  <><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/></>,
  user:      <><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/></>,
  mail:      <><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M2 7l10 7 10-7"/></>,
  lock:      <><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></>,
  phone:     <path d="M22 16.92v3a2 2 0 01-2.18 2 19.8 19.8 0 01-8.63-3.07A19.5 19.5 0 013.07 9.8a19.8 19.8 0 01-3.07-8.64A2 2 0 012 .82h3a2 2 0 012 1.72c.13.96.36 1.9.7 2.81a2 2 0 01-.45 2.11L6.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0122 16.92z"/>,
  filter:    <><line x1="4" y1="6" x2="20" y2="6"/><line x1="8" y1="12" x2="16" y2="12"/><line x1="11" y1="18" x2="13" y2="18"/></>,
  arrowUp:   <><polyline points="18 15 12 9 6 15"/></>,
  arrowDown: <><polyline points="6 9 12 15 18 9"/></>,
  star:      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>,
  trash:     <><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6"/><path d="M10 11v6m4-6v6"/><path d="M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2"/></>,
  award:     <><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11"/></>,
  gift:      <><polyline points="20 12 20 22 4 22 4 12"/><rect x="2" y="7" width="20" height="5"/><path d="M12 22V7"/><path d="M12 7H7.5a2.5 2.5 0 010-5C11 2 12 7 12 7z"/><path d="M12 7h4.5a2.5 2.5 0 000-5C13 2 12 7 12 7z"/></>,
};

function Icon({ name, size=22, color='currentColor', strokeWidth=2 }) {
  const paths = ICON_PATHS[name];
  if (!paths) return null;
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
      {paths}
    </svg>
  );
}

// Category metadata (icon name + display label)
const CAT_META = {
  dining:        { icon:'dining',        label:'Dining Out'   },
  coffee:        { icon:'coffee',        label:'Coffee'       },
  grocery:       { icon:'grocery',       label:'Groceries'    },
  transport:     { icon:'transport',     label:'Transport'    },
  shopping:      { icon:'shopping',      label:'Shopping'     },
  fitness:       { icon:'fitness',       label:'Fitness'      },
  travel:        { icon:'travel',        label:'Travel'       },
  entertainment: { icon:'entertainment', label:'Entertainment'},
  home:          { icon:'home',          label:'Home & Living'},
  education:     { icon:'education',     label:'Education'    },
  social:        { icon:'social',        label:'Social Life'  },
  clothing:      { icon:'clothing',      label:'Clothing'     },
  rent:          { icon:'rent',          label:'Rent'         },
  health:        { icon:'health',        label:'Health'       },
  office:        { icon:'office',        label:'Office'       },
  subscriptions: { icon:'subscriptions', label:'Subscriptions'},
};

// ─── STATUS BAR (iOS, Figma-matched) ────────────────────────────
function StatusBar() {
  return (
    <div style={{ position:'absolute', top:0, left:0, right:0, height:60,
      display:'flex', alignItems:'center', zIndex:100, pointerEvents:'none' }}>
      <div style={{ width:'100%', height:44, position:'relative' }}>
        <span style={{
          position:'absolute',
          left:20,
          top:'50%',
          transform:'translateY(-50%)',
          fontFamily:'"SF Pro Text","Mulish",system-ui,sans-serif',
          fontWeight:600,
          fontSize:15,
          letterSpacing:'-0.165px',
          color:'#000',
        }}>9:41</span>
        <img
          src="https://www.figma.com/api/mcp/asset/5cca50cc-136b-49d7-921a-ac0d33e27a27"
          alt=""
          style={{
            position:'absolute',
            right:14,
            top:'50%',
            transform:'translateY(-50%)',
            width:68,
            height:14,
            display:'block',
          }}
        />
      </div>
    </div>
  );
}

// ─── HOME INDICATOR ──────────────────────────────────────────────
function HomeIndicator({ light=false }) {
  return (
    <div style={{ position:'absolute', bottom:8, left:0, right:0,
      display:'flex', justifyContent:'center' }}>
      <div style={{ width:134, height:5, borderRadius:3,
        backgroundColor: light ? 'rgba(255,255,255,.4)' : 'rgba(45,45,45,.2)' }}/>
    </div>
  );
}

// ─── BOTTOM NAV ──────────────────────────────────────────────────
function BottomNav({ active, onTab }) {
  const tabs = [
    { id:'home',     label:'Home',    icon:<><path d="M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1H4a1 1 0 01-1-1V9.5z"/><path d="M9 21V12h6v9"/></> },
    { id:'spending', label:'Spending',icon:<><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 3"/><path d="M16.5 3.5a9 9 0 010 17"/></> },
    { id:'goals',    label:'Goals',   icon:<><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/></> },
    { id:'profile',  label:'Profile', icon:<><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/></> },
  ];
  return (
    <div style={{ position:'absolute', bottom:0, left:0, right:0, height:84,
      backgroundColor:P.color.white, borderTop:`1px solid ${P.color.border}`,
      display:'flex', alignItems:'flex-start', paddingTop:8, zIndex:50 }}>
      {tabs.map(t => {
        const isActive = active === t.id;
        return (
          <button key={t.id} onClick={() => onTab(t.id)}
            style={{ flex:1, display:'flex', flexDirection:'column', alignItems:'center',
              gap:3, background:'none', border:'none', cursor:'pointer',
              color: isActive ? P.color.green : P.color.ink4, transition:'color .2s' }}>
            <div style={{ width:42, height:36, borderRadius:P.r.pill,
              backgroundColor: isActive ? P.color.greenLight : 'transparent',
              display:'flex', alignItems:'center', justifyContent:'center', transition:'background .2s' }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth={isActive?2.2:1.8} strokeLinecap="round" strokeLinejoin="round">
                {t.icon}
              </svg>
            </div>
            <span style={{ fontFamily:P.font.ui, fontSize:10,
              fontWeight: isActive ? 600 : 400, letterSpacing:.3 }}>
              {t.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}

// ─── BUTTON ──────────────────────────────────────────────────────
function PBtn({ label, onClick, variant='primary', icon, style:s={} }) {
  const base = { width:'100%', height:56, borderRadius:P.r.md, cursor:'pointer',
    fontFamily:P.font.display, fontSize:17, letterSpacing:'.3px', border:'none',
    transition:'opacity .15s, transform .1s', display:'flex',
    alignItems:'center', justifyContent:'center', gap:8 };
  const vars = {
    primary:   { backgroundColor:P.color.green,  color:P.color.white  },
    secondary: { backgroundColor:'transparent',   color:P.color.green,
                 border:`1.5px solid ${P.color.green}` },
    pink:      { backgroundColor:P.color.pink,    color:P.color.black  },
    sand:      { backgroundColor:P.color.sand,    color:P.color.black  },
    ghost:     { backgroundColor:'transparent',   color:P.color.ink3, border:'none' },
    dark:      { backgroundColor:P.color.black,   color:P.color.white  },
    danger:    { backgroundColor:'transparent',   color:P.color.impulsive,
                 border:`1.5px solid ${P.color.impulsive}` },
  };
  return (
    <button onClick={onClick}
      onMouseDown={e=>e.currentTarget.style.transform='scale(.97)'}
      onMouseUp={e=>e.currentTarget.style.transform='scale(1)'}
      style={{...base,...vars[variant],...s}}>
      {icon && icon}{label}
    </button>
  );
}

// ─── BACK BUTTON ─────────────────────────────────────────────────
function BackBtn({ onClick, light=false }) {
  return (
    <button onClick={onClick} style={{ position:'absolute', top:54, left:20,
      width:38, height:38, borderRadius:'50%',
      backgroundColor: light ? 'rgba(255,255,255,.25)' : P.color.stone,
      border:'none', cursor:'pointer', display:'flex', alignItems:'center',
      justifyContent:'center', zIndex:10 }}>
      <Icon name="chevLeft" size={20} color={light ? P.color.white : P.color.black} />
    </button>
  );
}

// ─── INPUT ───────────────────────────────────────────────────────
function PInput({ placeholder, type='text', value, onChange, iconName }) {
  const [focused, setFocused] = React.useState(false);
  return (
    <div style={{ position:'relative', width:'100%' }}>
      {iconName && (
        <div style={{ position:'absolute', left:14, top:'50%', transform:'translateY(-50%)',
          color:P.color.ink4, display:'flex', pointerEvents:'none' }}>
          <Icon name={iconName} size={18} color={P.color.ink4} />
        </div>
      )}
      <input type={type} placeholder={placeholder} value={value} onChange={onChange}
        onFocus={()=>setFocused(true)} onBlur={()=>setFocused(false)}
        style={{ width:'100%', height:52, borderRadius:P.r.md,
          border:`1.5px solid ${focused ? P.color.green : P.color.border}`,
          backgroundColor:P.color.white, fontFamily:P.font.body, fontSize:15,
          color:P.color.black, paddingLeft:iconName?44:16, paddingRight:16,
          outline:'none', transition:'border .2s', boxSizing:'border-box' }}/>
    </div>
  );
}

// ─── SPEND TAG ───────────────────────────────────────────────────
function SpendTag({ type }) {
  const map = {
    aligned:   { label:'Aligned',   bg:P.color.alignedTint,   color:P.color.aligned   },
    neutral:   { label:'Neutral',   bg:P.color.neutralTint,   color:P.color.neutral   },
    impulsive: { label:'Impulsive', bg:P.color.impulsiveTint, color:P.color.impulsive },
  };
  const t = map[type]||map.neutral;
  return (
    <span style={{ fontFamily:P.font.body, fontSize:11, fontWeight:700,
      color:t.color, backgroundColor:t.bg, borderRadius:P.r.pill,
      padding:'3px 10px', letterSpacing:.4, display:'inline-block' }}>
      {t.label}
    </span>
  );
}

// ─── PROGRESS BAR ────────────────────────────────────────────────
function ProgressBar({ value, max, color=P.color.green }) {
  const pct = Math.min(100, (value/max)*100);
  return (
    <div style={{ width:'100%', height:8, borderRadius:P.r.pill,
      backgroundColor:P.color.stone, overflow:'hidden' }}>
      <div style={{ width:`${pct}%`, height:'100%', borderRadius:P.r.pill,
        backgroundColor:color, transition:'width .6s ease' }}/>
    </div>
  );
}

// ─── CATEGORY ICON BOX ───────────────────────────────────────────
function CatIcon({ id, size=44, bg=P.color.stone, color=P.color.black }) {
  const meta = CAT_META[id] || { icon:'shopping', label:id };
  return (
    <div style={{ width:size, height:size, borderRadius:P.r.md,
      backgroundColor:bg, display:'flex', alignItems:'center',
      justifyContent:'center', flexShrink:0 }}>
      <Icon name={meta.icon} size={size*0.48} color={color} />
    </div>
  );
}

// ─── PIG MASCOT ──────────────────────────────────────────────────
function PigMascot({ size=120, style:s={} }) {
  // aspect ratio: 185×134 → width:height = 1.38:1
  const h = Math.round(size / 1.38);
  return (
    <img src="pig.png" width={size} height={h}
      style={{ objectFit:'contain', display:'block', ...s }}
      alt="Penny the pig" />
  );
}

Object.assign(window, {
  P, Icon, ICON_PATHS, CAT_META,
  StatusBar, HomeIndicator, BottomNav,
  PBtn, BackBtn, PInput, SpendTag, ProgressBar, CatIcon, PigMascot
});
