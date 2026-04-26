
// ─── SCREENS v3 — polished visuals, animations, Add Goal ──────────

// ─── CSS animations injected once ────────────────────────────────
(function injectStyles() {
  if (document.getElementById('penny-anim-styles')) return;
  const s = document.createElement('style');
  s.id = 'penny-anim-styles';
  s.textContent = `
    @keyframes pigFloat {
      0%,100% { transform: translateY(0px) scale(1); }
      50%      { transform: translateY(-5px) scale(1.04); }
    }
    @keyframes pigFloat2 {
      0%,100% { transform: translateY(0px) scale(1); }
      50%      { transform: translateY(-7px) scale(1.06); }
    }
    @keyframes pigFloat3 {
      0%,100% { transform: translateY(-2px) scale(1.02); }
      50%      { transform: translateY(3px) scale(0.98); }
    }
    @keyframes bubbleRise {
      0%   { transform: translateY(0px) translateX(0px); opacity: 0.7; }
      25%  { transform: translateY(-30px) translateX(4px); opacity: 0.9; }
      50%  { transform: translateY(-65px) translateX(-3px); opacity: 0.8; }
      75%  { transform: translateY(-100px) translateX(5px); opacity: 0.5; }
      100% { transform: translateY(-140px) translateX(0px); opacity: 0; }
    }
    @keyframes bottleBubble1 { 0%,100%{transform:translateY(0);opacity:.8} 50%{transform:translateY(-60px);opacity:.3} }
    @keyframes bottleBubble2 { 0%,100%{transform:translateY(0);opacity:.6} 50%{transform:translateY(-50px);opacity:.2} }
    @keyframes bottleBubble3 { 0%,100%{transform:translateY(0);opacity:.9} 50%{transform:translateY(-70px);opacity:.4} }
    @keyframes shimmer {
      0%   { background-position: -200% center; }
      100% { background-position: 200% center; }
    }
    @keyframes badgePop {
      0%   { transform: scale(0.85); opacity:0; }
      70%  { transform: scale(1.08); }
      100% { transform: scale(1); opacity:1; }
    }
    .badge-pop { animation: badgePop .35s cubic-bezier(.34,1.56,.64,1) both; }
    @keyframes fadeSlideUp {
      from { opacity:0; transform:translateY(16px); }
      to   { opacity:1; transform:translateY(0); }
    }
  `;
  document.head.appendChild(s);
})();

// ─── BOTTOM NAV matching mid-fi icon style ───────────────────────
function BottomNavV2({ active, onTab }) {
  const tabs = [
    { id:'home',     label:'Home',
      icon:<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1H4a1 1 0 01-1-1V9.5z"/><path d="M9 21V12h6v9"/></svg>},
    { id:'spending', label:'Spending',
      icon:<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l3 3"/><path d="M16.24 7.76a6 6 0 010 8.49"/></svg>},
    { id:'goals',    label:'Goals',
      icon:<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><rect x="5" y="2" width="14" height="20" rx="2"/><path d="M9 7h6M9 11h6M9 15h4"/></svg>},
    { id:'profile',  label:'Profile',
      icon:<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/></svg>},
  ];
  return (
    <div style={{ position:'absolute', bottom:0, left:0, right:0, height:84,
      backgroundColor:P.color.white, borderTop:`1px solid ${P.color.border}`,
      display:'flex', alignItems:'flex-start', paddingTop:6, zIndex:50 }}>
      {tabs.map(t=>{
        const on=active===t.id;
        return (
          <button key={t.id} onClick={()=>onTab(t.id)}
            style={{ flex:1, display:'flex', flexDirection:'column', alignItems:'center',
              gap:3, background:'none', border:'none', cursor:'pointer',
              color:on?P.color.green:P.color.ink4, transition:'color .2s' }}>
            <div style={{ width:44, height:36, borderRadius:P.r.pill,
              backgroundColor:on?P.color.greenLight:'transparent',
              display:'flex', alignItems:'center', justifyContent:'center' }}>
              {t.icon}
            </div>
            <span style={{ fontFamily:P.font.ui, fontSize:10,
              fontWeight:on?600:400, letterSpacing:.3 }}>{t.label}</span>
          </button>
        );
      })}
    </div>
  );
}

// ─── ACHIEVEMENT BADGE ───────────────────────────────────────────
function Badge({ category, points, earned=false, locked=false, size=76, delay=0 }) {
  const bg  = locked?'#EBEBEB':earned?P.color.black:'#D4D4D2';
  const tc  = locked?'#C0C0C0':earned?P.color.white:P.color.ink2;
  const ptc = locked?'#C8C8C8':P.color.black;
  return (
    <div className="badge-pop"
      style={{ display:'flex', flexDirection:'column', alignItems:'center',
        width:size+12, cursor:'pointer', animationDelay:`${delay}ms` }}>
      <div style={{ width:size, height:size, borderRadius:'50%', backgroundColor:bg,
        display:'flex', alignItems:'center', justifyContent:'center',
        boxShadow:earned?'0 6px 16px rgba(0,0,0,.22)':'0 2px 8px rgba(0,0,0,.08)',
        transition:'transform .15s', flexShrink:0 }}>
        <span style={{ fontFamily:P.font.display, fontSize:10, fontWeight:700,
          color:tc, textAlign:'center', lineHeight:1.3, padding:'0 8px',
          whiteSpace:'pre-line' }}>{category}</span>
      </div>
      <span style={{ fontFamily:P.font.display, fontWeight:700, fontSize:26,
        color:ptc, marginTop:-7, lineHeight:1, opacity:locked?.4:1 }}>{points}</span>
    </div>
  );
}

// ─── ANIMATED PIG BODY DIAGRAM ───────────────────────────────────
const SPEND_CATS_PIG = [
  { id:'rent',      label:'Rent',      amount:2500, type:'aligned',   bx:165, by:120, rx:36, ry:14, anim:'pigFloat'  },
  { id:'coffee',    label:'Coffee',    amount:140,  type:'impulsive', bx:228, by:136, rx:30, ry:13, anim:'pigFloat2' },
  { id:'dining',    label:'Dining',    amount:980,  type:'aligned',   bx:160, by:150, rx:37, ry:14, anim:'pigFloat3' },
  { id:'payments',  label:'payments',  amount:300,  type:'neutral',   bx:218, by:164, rx:40, ry:14, anim:'pigFloat'  },
  { id:'transport', label:'Transport', amount:300,  type:'aligned',   bx:128, by:180, rx:43, ry:14, anim:'pigFloat2' },
  { id:'shopping',  label:'Shopping',  amount:420,  type:'impulsive', bx:222, by:186, rx:44, ry:15, anim:'pigFloat3' },
];

function PigBodyDiagram({ onCatClick }) {
  // Each bubble gets its own animation
  const bubbleAnims = ['pigFloat','pigFloat2','pigFloat3'];
  return (
    <svg width="310" height="255" viewBox="0 0 310 255" style={{ overflow:'visible' }}>
      {/* Drop shadow for pig */}
      <defs>
        <filter id="pigShadow" x="-10%" y="-10%" width="120%" height="130%">
          <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="rgba(0,0,0,.1)"/>
        </filter>
      </defs>

      {/* Pig body — large oval */}
      <ellipse cx="165" cy="162" rx="138" ry="98"
        fill={P.color.pinkLight} stroke={P.color.black} strokeWidth="2"
        filter="url(#pigShadow)"/>

      {/* Ear — pointy flap */}
      <path d="M70 88 L50 50 L98 70 Z"
        fill={P.color.pink} stroke={P.color.black} strokeWidth="1.8"/>
      {/* Right ear */}
      <ellipse cx="115" cy="75" rx="13" ry="17"
        fill={P.color.pink} stroke={P.color.black} strokeWidth="1.5"
        transform="rotate(20 115 75)"/>

      {/* Head circle */}
      <circle cx="78" cy="110" r="38"
        fill={P.color.white} stroke={P.color.black} strokeWidth="2"/>
      {/* Eyes */}
      <circle cx="64" cy="102" r="5.5" fill="#D8D8D8"/>
      <circle cx="64" cy="102" r="2"   fill={P.color.black}/>
      <circle cx="88" cy="102" r="5.5" fill="#D8D8D8"/>
      <circle cx="88" cy="102" r="2"   fill={P.color.black}/>
      <circle cx="63" cy="101" r="1"   fill="white"/>
      <circle cx="87" cy="101" r="1"   fill="white"/>

      {/* Snout */}
      <ellipse cx="76" cy="120" rx="15" ry="10"
        fill="#ECC8C8" stroke={P.color.black} strokeWidth="1.2"/>
      <circle cx="71" cy="120" r="3" fill="#C08080"/>
      <circle cx="81" cy="120" r="3" fill="#C08080"/>

      {/* Coin slot */}
      <rect x="69" y="90" width="14" height="4" rx="2" fill={P.color.black} opacity=".7"/>

      {/* Animated category bubbles */}
      {SPEND_CATS_PIG.map((c,i)=>{
        const sw = c.type==='impulsive'?2.5:c.type==='neutral'?1.5:1;
        const fc = c.type==='impulsive'?P.color.impulsiveTint:c.type==='neutral'?P.color.neutralTint:P.color.greenLight;
        const sc = c.type==='impulsive'?P.color.impulsive:c.type==='neutral'?P.color.neutral:P.color.green;
        const dur = [2.8,3.4,2.4,3.1,2.6,3.8][i]+'s';
        const del = [0,.6,1.1,.3,.9,.4][i]+'s';
        return (
          <g key={c.id} onClick={()=>onCatClick&&onCatClick(c.id)}
            style={{ cursor:'pointer',
              animation:`${c.anim} ${dur} ease-in-out ${del} infinite` }}>
            {/* Bubble shadow */}
            <ellipse cx={c.bx} cy={c.by+c.ry+2} rx={c.rx*.7} ry={3}
              fill="rgba(0,0,0,.08)"/>
            <ellipse cx={c.bx} cy={c.by} rx={c.rx} ry={c.ry}
              fill={fc} stroke={sc} strokeWidth={sw}/>
            <text x={c.bx} y={c.by+4} textAnchor="middle"
              fontFamily={P.font.body} fontWeight="700" fontSize="10.5"
              fill={sc}>
              {c.label}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

// ─── ANIMATED WISH BOTTLE ─────────────────────────────────────────
const WISH_ITEMS = [
  { id:1, label:'Camera',         saved:420,  goal:1200 },
  { id:2, label:'Concert Ticket', saved:80,   goal:200  },
  { id:3, label:'Laptop',         saved:290,  goal:1400 },
  { id:4, label:'iPhone',         saved:150,  goal:1000 },
  { id:5, label:'Flight Ticket',  saved:800,  goal:3500 },
];

// Rising bubbles — sizes and positions
const BOTTLE_BUBBLES = [
  { cx:50,  cy:145, r:26, anim:'bottleBubble1', dur:'4s',  del:'0s'   },
  { cx:105, cy:158, r:20, anim:'bottleBubble2', dur:'5s',  del:'.8s'  },
  { cx:170, cy:148, r:30, anim:'bottleBubble3', dur:'4.5s',del:'1.6s' },
  { cx:235, cy:155, r:22, anim:'bottleBubble1', dur:'5.5s',del:'.4s'  },
  { cx:285, cy:150, r:16, anim:'bottleBubble2', dur:'3.8s',del:'2s'   },
  { cx:38,  cy:170, r:16, anim:'bottleBubble3', dur:'6s',  del:'1s'   },
  { cx:148, cy:170, r:16, anim:'bottleBubble1', dur:'4.2s',del:'2.5s' },
  { cx:215, cy:172, r:14, anim:'bottleBubble2', dur:'5.2s',del:'.2s'  },
  { cx:268, cy:168, r:12, anim:'bottleBubble3', dur:'4.8s',del:'1.8s' },
];

function WishBottle({ items, onAddWish }) {
  return (
    <div style={{ position:'relative', borderRadius:P.r.xl,
      overflow:'hidden', backgroundColor:P.color.stone,
      boxShadow:P.shadow.sm }}>
      <svg width="100%" height="190" viewBox="0 0 320 190"
        style={{ display:'block', width:'100%' }}>
        {/* Bottle fill — liquid level */}
        <rect x="0" y="80" width="320" height="110"
          fill={P.color.sandLight} rx="0"/>
        {/* Animated bubbles */}
        {BOTTLE_BUBBLES.map((b,i)=>(
          <circle key={i} cx={b.cx} cy={b.cy} r={b.r}
            fill={P.color.white} opacity=".85"
            style={{ animation:`${b.anim} ${b.dur} ease-in-out ${b.del} infinite` }}/>
        ))}
        {/* Bottle top highlight */}
        <rect x="0" y="0" width="320" height="82"
          fill={P.color.stone} rx="0"/>
        {/* Waterline wave */}
        <path d="M0 82 Q40 72 80 82 Q120 92 160 82 Q200 72 240 82 Q280 92 320 82 L320 88 Q280 98 240 88 Q200 78 160 88 Q120 98 80 88 Q40 78 0 88 Z"
          fill={P.color.sand} opacity=".6"/>
        {/* Save goal bubbles — sized by completion % */}
        {items.map((w,i)=>{
          const pct = w.saved/w.goal;
          const br = 14 + pct*18;
          const bx = [55,108,168,228,280][i];
          const by = 105 + (1-pct)*30;
          return (
            <g key={w.id}>
              <circle cx={bx} cy={by} r={br}
                fill="white" opacity=".9"
                stroke={P.color.sand} strokeWidth="1.5"/>
              <text x={bx} y={by-4} textAnchor="middle"
                fontFamily={P.font.ui} fontSize="8" fontWeight="700"
                fill={P.color.ink3}>
                {Math.round(pct*100)}%
              </text>
              <text x={bx} y={by+7} textAnchor="middle"
                fontFamily={P.font.body} fontSize="7" fill={P.color.ink3}>
                {w.label.split(' ')[0]}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

// ─── ADD GOAL SHEET ───────────────────────────────────────────────
function AddGoalSheet({ open, onClose, type='save', onSaved }) {
  const [form, setForm] = React.useState({
    name:'', cat:'travel', amount:'', plan:'Monthly', deadline:''
  });
  const set = k => v => setForm(f=>({...f,[k]:v}));
  const canSave = form.name && form.amount;

  const catOptions = ['travel','fitness','education','entertainment','health','shopping','home'];

  return (
    <BottomSheet open={open} onClose={onClose}
      title={type==='save' ? 'New Saving Goal' : 'New Routine'}
      height="90%">
      <div style={{ padding:'20px 24px 48px' }}>

        {/* Mascot header */}
        <div style={{ display:'flex', alignItems:'center', gap:14, marginBottom:24,
          backgroundColor:P.color.pinkLight, borderRadius:P.r.lg, padding:'14px 16px' }}>
          <PigMascot size={60}/>
          <div>
            <p style={{ fontFamily:P.font.display, fontWeight:700, fontSize:15,
              color:P.color.black, margin:'0 0 2px' }}>
              {type==='save' ? "What are you saving for?" : "New spending routine"}
            </p>
            <p style={{ fontFamily:P.font.body, fontSize:12, color:P.color.ink3, margin:0 }}>
              {type==='save' ? 'Give your goal a name and target' : 'Set a budget rhythm that works for you'}
            </p>
          </div>
        </div>

        {/* Goal name */}
        <div style={{ marginBottom:16 }}>
          <p style={{ fontFamily:P.font.body, fontSize:12, fontWeight:700,
            color:P.color.ink3, margin:'0 0 6px', textTransform:'uppercase', letterSpacing:.5 }}>
            Goal Name
          </p>
          <input placeholder={type==='save'?"e.g. Japan Trip":"e.g. Weekly Dining"}
            value={form.name} onChange={e=>set('name')(e.target.value)}
            style={{ width:'100%', height:52, borderRadius:P.r.md,
              border:`1.5px solid ${P.color.border}`, padding:'0 16px',
              fontFamily:P.font.body, fontSize:15, color:P.color.black,
              outline:'none', boxSizing:'border-box', backgroundColor:P.color.white,
              transition:'border .2s' }}
            onFocus={e=>e.target.style.borderColor=P.color.green}
            onBlur={e=>e.target.style.borderColor=P.color.border}/>
        </div>

        {/* Category picker */}
        <div style={{ marginBottom:16 }}>
          <p style={{ fontFamily:P.font.body, fontSize:12, fontWeight:700,
            color:P.color.ink3, margin:'0 0 8px', textTransform:'uppercase', letterSpacing:.5 }}>
            Category
          </p>
          <div style={{ display:'flex', flexWrap:'wrap', gap:8 }}>
            {catOptions.map(id=>{
              const m=CAT_META[id];
              const sel=form.cat===id;
              return (
                <button key={id} onClick={()=>set('cat')(id)}
                  style={{ display:'flex', alignItems:'center', gap:6, padding:'8px 14px',
                    borderRadius:P.r.pill, border:`1.5px solid ${sel?P.color.green:P.color.border}`,
                    backgroundColor:sel?P.color.green:P.color.white,
                    color:sel?P.color.white:P.color.black,
                    cursor:'pointer', transition:'all .15s',
                    fontFamily:P.font.body, fontSize:12, fontWeight:700 }}>
                  <Icon name={m.icon} size={14} color={sel?P.color.white:P.color.ink2}/>
                  {m.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Amount */}
        <div style={{ marginBottom:16 }}>
          <p style={{ fontFamily:P.font.body, fontSize:12, fontWeight:700,
            color:P.color.ink3, margin:'0 0 6px', textTransform:'uppercase', letterSpacing:.5 }}>
            {type==='save' ? 'Target Amount' : 'Budget Amount'}
          </p>
          <div style={{ position:'relative' }}>
            <span style={{ position:'absolute', left:16, top:'50%',
              transform:'translateY(-50%)', fontFamily:P.font.display,
              fontWeight:700, fontSize:18, color:P.color.ink3 }}>$</span>
            <input type="number" placeholder="0"
              value={form.amount} onChange={e=>set('amount')(e.target.value)}
              style={{ width:'100%', height:52, borderRadius:P.r.md,
                border:`1.5px solid ${P.color.border}`, paddingLeft:36, paddingRight:16,
                fontFamily:P.font.display, fontWeight:700, fontSize:18,
                color:P.color.black, outline:'none', boxSizing:'border-box',
                backgroundColor:P.color.white }}
              onFocus={e=>e.target.style.borderColor=P.color.green}
              onBlur={e=>e.target.style.borderColor=P.color.border}/>
          </div>
        </div>

        {/* Plan frequency (routine only) or Deadline (save) */}
        {type==='routine' ? (
          <div style={{ marginBottom:16 }}>
            <p style={{ fontFamily:P.font.body, fontSize:12, fontWeight:700,
              color:P.color.ink3, margin:'0 0 8px', textTransform:'uppercase', letterSpacing:.5 }}>
              Frequency
            </p>
            <div style={{ display:'flex', gap:8 }}>
              {['Daily','Weekly','Monthly'].map(p=>(
                <button key={p} onClick={()=>set('plan')(p)}
                  style={{ flex:1, height:44, borderRadius:P.r.md,
                    backgroundColor:form.plan===p?P.color.green:P.color.stone,
                    color:form.plan===p?P.color.white:P.color.black,
                    border:'none', cursor:'pointer', fontFamily:P.font.body,
                    fontSize:13, fontWeight:700, transition:'all .15s' }}>
                  {p}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div style={{ marginBottom:16 }}>
            <p style={{ fontFamily:P.font.body, fontSize:12, fontWeight:700,
              color:P.color.ink3, margin:'0 0 6px', textTransform:'uppercase', letterSpacing:.5 }}>
              Target Date (optional)
            </p>
            <input type="date" value={form.deadline}
              onChange={e=>set('deadline')(e.target.value)}
              style={{ width:'100%', height:52, borderRadius:P.r.md,
                border:`1.5px solid ${P.color.border}`, padding:'0 16px',
                fontFamily:P.font.body, fontSize:15, color:P.color.black,
                outline:'none', boxSizing:'border-box', backgroundColor:P.color.white }}
              onFocus={e=>e.target.style.borderColor=P.color.green}
              onBlur={e=>e.target.style.borderColor=P.color.border}/>
          </div>
        )}

        {/* Preview */}
        {canSave && (
          <div style={{ backgroundColor:P.color.greenLight, borderRadius:P.r.lg,
            padding:'14px 16px', marginBottom:20, animation:'fadeSlideUp .3s ease both' }}>
            <div style={{ display:'flex', alignItems:'center', gap:12 }}>
              <CatIcon id={form.cat} size={40} bg={P.color.green} color={P.color.white}/>
              <div>
                <p style={{ fontFamily:P.font.body, fontWeight:700, fontSize:14,
                  color:P.color.black, margin:'0 0 1px' }}>{form.name}</p>
                <p style={{ fontFamily:P.font.body, fontSize:12, color:P.color.ink3, margin:0 }}>
                  ${form.amount} {type==='routine' ? form.plan.toLowerCase() : 'target'}
                  {form.deadline ? ` · by ${form.deadline}` : ''}
                </p>
              </div>
            </div>
          </div>
        )}

        <PBtn label={canSave ? `Create ${type==='save'?'Goal':'Routine'}` : 'Fill in details above'}
          onClick={()=>{ if(canSave){ onSaved&&onSaved(form); onClose(); }}}
          style={{ opacity:canSave?1:.4, pointerEvents:canSave?'auto':'none' }}/>
      </div>
    </BottomSheet>
  );
}

// ─── SPENDING PAGE v2 ─────────────────────────────────────────────
function ScreenSpendingV2({ onTab, navCat }) {
  const [expanded, setExpanded] = React.useState(false);
  const topCategories = [
    { id:'dining', label:'Dining Out', amount:650, budget:800, color:P.color.green, bg:P.color.greenLight, rank:1 },
    { id:'transport', label:'Transport', amount:300, budget:400, color:P.color.green, bg:P.color.greenLight, rank:2 },
    { id:'shopping', label:'Shopping', amount:420, budget:300, color:P.color.impulsive, bg:P.color.impulsiveTint, rank:3 },
    { id:'rent', label:'Rent', amount:2500, budget:2500, color:P.color.neutral, bg:P.color.neutralTint, rank:4 },
    { id:'coffee', label:'Coffee', amount:140, budget:100, color:P.color.impulsive, bg:P.color.impulsiveTint, rank:5 },
    { id:'grocery', label:'Groceries', amount:110, budget:200, color:P.color.neutral, bg:P.color.neutralTint, rank:6 },
  ];
  const showCats = expanded ? topCategories : topCategories.slice(0,3);

  return (
    <div style={{ flex:1, backgroundColor:P.color.cream, overflowY:'auto', paddingBottom:110, position:'relative' }}>
      <StatusBar />

      <div style={{ width:325, margin:'56px auto 0', display:'flex', flexDirection:'column', gap:15 }}>
        <div style={{ height:52, position:'relative' }}>
          <div>
            <p style={{ fontFamily:P.font.body, fontSize:11, fontWeight:700, color:P.color.ink3, margin:0, letterSpacing:.8, textTransform:'uppercase' }}>Monthly Report</p>
            <h1 style={{ fontFamily:P.font.display, fontWeight:700, fontSize:28, color:P.color.black, margin:'2px 0 0', letterSpacing:'-.4px' }}>March, 2025</h1>
          </div>
          <div style={{ position:'absolute', right:0, top:8, height:27, borderRadius:100, backgroundColor:P.color.greenLight, padding:'0 14px', display:'flex', alignItems:'center', gap:6 }}>
            <Icon name="arrowDown" size={13} color={P.color.green} />
            <span style={{ fontFamily:P.font.body, fontSize:12, fontWeight:700, color:P.color.green }}>15% less</span>
          </div>
        </div>

        <div style={{ backgroundColor:P.color.white, borderRadius:28, height:112, boxShadow:'0 4px 8px rgba(44,44,40,.1)', padding:20, display:'flex', alignItems:'center', justifyContent:'space-between' }}>
          <div>
            <p style={{ fontFamily:P.font.body, fontSize:11, fontWeight:700, color:P.color.ink3, margin:0, letterSpacing:.5, textTransform:'uppercase' }}>Total Spending</p>
            <p style={{ fontFamily:P.font.display, fontWeight:700, fontSize:40, color:P.color.black, margin:'4px 0 0', letterSpacing:'-.5px' }}>$2,450</p>
          </div>
          <div style={{ width:72, height:72, position:'relative' }}>
            <svg viewBox="0 0 72 72" width="72" height="72">
              <circle cx="36" cy="36" r="28" fill="none" stroke={P.color.stone} strokeWidth="6" />
              <circle cx="36" cy="36" r="28" fill="none" stroke={P.color.green} strokeWidth="6" strokeLinecap="round" strokeDasharray="78 176" transform="rotate(-90 36 36)" />
            </svg>
            <span style={{ position:'absolute', inset:0, display:'flex', alignItems:'center', justifyContent:'center', fontFamily:P.font.body, fontSize:16, fontWeight:700, color:P.color.black }}>44%</span>
          </div>
        </div>

        <div style={{ backgroundColor:P.color.white, borderRadius:28, height:82, boxShadow:P.shadow.sm, padding:'16px 16px', display:'flex', gap:14, alignItems:'center' }}>
          <div style={{ width:50, height:50, borderRadius:12, backgroundColor:P.color.pinkLight, display:'flex', alignItems:'center', justifyContent:'center' }}>
            <Icon name="entertainment" size={22} color={P.color.green} />
          </div>
          <div style={{ flex:1 }}>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:6 }}>
              <div>
                <p style={{ fontFamily:P.font.body, fontWeight:700, fontSize:14, color:P.color.black, margin:0 }}>Camera Fund</p>
                <p style={{ fontFamily:P.font.body, fontSize:11, color:P.color.ink3, margin:0 }}>$420 / $1,200</p>
              </div>
              <p style={{ fontFamily:P.font.display, fontWeight:700, fontSize:22, color:P.color.black, margin:0 }}>35%</p>
            </div>
            <div style={{ width:'100%', height:8, borderRadius:100, backgroundColor:P.color.stone, overflow:'hidden' }}>
              <div style={{ width:'35%', height:'100%', backgroundColor:P.color.neutral, borderRadius:100 }} />
            </div>
          </div>
        </div>
      </div>

      <div style={{ width:343, margin:'12px auto 0', backgroundColor:P.color.white, borderRadius:28, boxShadow:P.shadow.sm, padding:'20px 8px 8px', position:'relative' }}>
        <p style={{ fontFamily:P.font.body, fontSize:11, fontWeight:700, color:P.color.ink3, margin:0, textTransform:'uppercase', letterSpacing:.8, textAlign:'center' }}>Where your money goes</p>
        <p style={{ fontFamily:P.font.body, fontSize:11, color:P.color.ink4, margin:'4px 0 0', textAlign:'center' }}>tap a category to explore</p>

        <div style={{ position:'relative', height:262, marginTop:8 }}>
          <img src="https://www.figma.com/api/mcp/asset/5ff59754-19a1-4e9d-8d7f-e8bf158d27f0" alt="" style={{ position:'absolute', left:21, top:0, width:301, height:263 }} />
          {[
            { id:'coffee', label:'Coffee', left:218, top:52, color:'#C14030', border:'#C14030' },
            { id:'rent', label:'Rent', left:127, top:72, color:'#0C4524', border:'#0C4524' },
            { id:'grocery', label:'Grocery', left:211, top:106, color:'#8B6A30', border:'#8B6A30' },
            { id:'shopping', label:'Shopping', left:117, top:118, color:'#C14030', border:'#C14030' },
            { id:'transport', label:'Transport', left:91, top:162, color:'#0C4524', border:'#0C4524' },
            { id:'rent', label:'Rent', left:182, top:156, color:'#8B6A30', border:'#8B6A30' },
          ].map((chip, i) => (
            <button key={`${chip.id}-${i}`} onClick={() => navCat && navCat(chip.id)} style={{ position:'absolute', left:chip.left, top:chip.top, minWidth:52, height:26, borderRadius:100, border:`2px solid ${chip.border}`, background:'#fff', color:chip.color, fontFamily:P.font.body, fontSize:10, fontWeight:700, padding:'0 14px', cursor:'pointer' }}>
              {chip.label}
            </button>
          ))}
        </div>

        <div style={{ display:'flex', justifyContent:'center', gap:20, paddingBottom:8 }}>
          <div style={{ display:'flex', alignItems:'center', gap:5 }}><div style={{ width:10, height:10, borderRadius:5, backgroundColor:P.color.green }} /><span style={{ fontFamily:P.font.body, fontSize:11, color:P.color.ink3 }}>Aligned</span></div>
          <div style={{ display:'flex', alignItems:'center', gap:5 }}><div style={{ width:10, height:10, borderRadius:5, backgroundColor:P.color.sand }} /><span style={{ fontFamily:P.font.body, fontSize:11, color:P.color.ink3 }}>Neutral</span></div>
          <div style={{ display:'flex', alignItems:'center', gap:5 }}><div style={{ width:10, height:10, borderRadius:5, backgroundColor:P.color.impulsive }} /><span style={{ fontFamily:P.font.body, fontSize:11, color:P.color.ink3 }}>Impulsive</span></div>
        </div>
      </div>

      <div style={{ width:343, margin:'16px auto 0', backgroundColor:P.color.white, borderRadius:28, boxShadow:P.shadow.sm, padding:'18px 18px 12px' }}>
        <h3 style={{ fontFamily:P.font.display, fontSize:16, fontWeight:700, color:P.color.black, margin:'0 0 14px' }}>Spending Alignment</h3>
        {[
          { label:'Aligned', val:980, color:P.color.green, pct:65 },
          { label:'Neutral', val:700, color:P.color.neutral, pct:47 },
          { label:'Impulsive', val:200, color:P.color.impulsive, pct:14 },
        ].map((r) => (
          <div key={r.label} style={{ marginBottom:12 }}>
            <div style={{ display:'flex', justifyContent:'space-between', marginBottom:5 }}>
              <div style={{ display:'flex', alignItems:'center', gap:8 }}>
                <div style={{ width:10, height:10, borderRadius:5, backgroundColor:r.color }} />
                <span style={{ fontFamily:P.font.body, fontSize:12, fontWeight:700, color:P.color.ink2 }}>{r.label}</span>
              </div>
              <span style={{ fontFamily:P.font.body, fontSize:12, color:P.color.ink3 }}>${r.val}</span>
            </div>
            <div style={{ width:'100%', height:8, borderRadius:100, backgroundColor:P.color.stone, overflow:'hidden' }}>
              <div style={{ width:`${r.pct}%`, height:'100%', borderRadius:100, backgroundColor:r.color }} />
            </div>
          </div>
        ))}
      </div>

      <div style={{ width:325, margin:'20px auto 0', backgroundColor:P.color.white, borderRadius:28, boxShadow:P.shadow.sm, padding:'18px 18px 10px' }}>
        <h3 style={{ fontFamily:P.font.display, fontSize:16, fontWeight:700, color:P.color.black, margin:'0 0 14px' }}>Top Categories</h3>
        {showCats.map((c, idx) => (
          <div key={c.rank} onClick={() => navCat && navCat(c.id)} style={{ display:'flex', alignItems:'center', gap:12, padding:'10px 0', borderBottom:idx < showCats.length - 1 ? `1px solid ${P.color.stone}` : 'none', cursor:'pointer' }}>
            <span style={{ width:22, fontFamily:P.font.body, fontSize:11, fontWeight:700, color:P.color.ink4 }}>#{c.rank}</span>
            <div style={{ width:38, height:38, borderRadius:12, backgroundColor:c.bg, display:'flex', alignItems:'center', justifyContent:'center' }}>
              <CatIcon id={c.id} size={22} bg="transparent" color={c.color} />
            </div>
            <div style={{ flex:1 }}>
              <p style={{ margin:0, fontFamily:P.font.body, fontSize:13, fontWeight:700, color:P.color.black }}>{c.label}</p>
              <div style={{ width:'100%', height:8, borderRadius:100, backgroundColor:P.color.stone, overflow:'hidden', marginTop:4 }}>
                <div style={{ width:`${Math.min(100, Math.round((c.amount / c.budget) * 100))}%`, height:'100%', borderRadius:100, backgroundColor:c.color }} />
              </div>
            </div>
            <div style={{ textAlign:'right' }}>
              <p style={{ margin:0, fontFamily:P.font.body, fontSize:13, fontWeight:700, color:P.color.black }}>${c.amount}</p>
              <p style={{ margin:0, fontFamily:P.font.body, fontSize:10.6, color:P.color.ink4 }}>/${c.budget}</p>
            </div>
          </div>
        ))}
        <button onClick={() => setExpanded((v) => !v)} style={{ width:'100%', background:'none', border:'none', fontFamily:P.font.body, fontSize:11, fontWeight:700, color:P.color.green, cursor:'pointer', paddingTop:10 }}>
          {expanded ? 'See fewer categories ↑' : 'See all categories ↓'}
        </button>
      </div>

      <div style={{ width:325, margin:'20px auto 0', display:'grid', gridTemplateColumns:'1fr 1fr', gap:13 }}>
        <div style={{ height:108, backgroundColor:P.color.impulsiveTint, borderRadius:28, boxShadow:P.shadow.sm, padding:'14px 15px' }}>
          <p style={{ margin:'0 0 2px', fontFamily:P.font.display, fontSize:38, fontWeight:700, color:P.color.impulsive, lineHeight:1 }}>8</p>
          <p style={{ margin:'4px 0 0', fontFamily:P.font.body, fontSize:12, fontWeight:700, color:P.color.black }}>Regretted purchases</p>
          <p style={{ margin:'2px 0 0', fontFamily:P.font.body, fontSize:11, color:P.color.ink3 }}>15% of total</p>
        </div>
        <div style={{ height:108, backgroundColor:P.color.greenLight, borderRadius:28, boxShadow:P.shadow.sm, padding:'18px 15px' }}>
          <p style={{ margin:0, fontFamily:P.font.display, fontSize:22, fontWeight:700, color:P.color.green }}>Tuesday</p>
          <p style={{ margin:'8px 0 0', fontFamily:P.font.body, fontSize:12, fontWeight:700, color:P.color.black }}>Best spending day</p>
          <p style={{ margin:'2px 0 0', fontFamily:P.font.body, fontSize:11, color:P.color.ink3 }}>Most aligned</p>
        </div>
      </div>

    </div>
  );
}

// ─── PROFILE v2 ───────────────────────────────────────────────────
function ScreenProfileV2({ nav }) {
  const [addWishOpen, setAddWishOpen] = React.useState(false);
  const [wishes, setWishes] = React.useState(WISH_ITEMS);
  const [toast, setToast] = React.useState('');
  const [toastVis, setToastVis] = React.useState(false);

  const showToast = msg => {
    setToast(msg); setToastVis(true);
    setTimeout(()=>setToastVis(false), 2200);
  };

  const achievements = [
    { category:'Financial\nDiscipline', points:10,  earned:true  },
    { category:'Awareness',             points:10,  earned:false },
    { category:'Goal\nCompletion',      points:20,  earned:true  },
    { category:'Consistency',           points:30,  earned:true  },
  ];

  return (
    <div style={{ flex:1, backgroundColor:P.color.cream, overflowY:'auto',
      paddingBottom:90, position:'relative' }}>
      <StatusBar />
      <div style={{ padding:'56px 24px 0' }}>

        {/* Hello + avatar */}
        <div style={{ display:'flex', alignItems:'flex-start',
          justifyContent:'space-between', marginBottom:20 }}>
          <div>
            <h1 style={{ fontFamily:P.font.display, fontWeight:700, fontSize:36,
              color:P.color.black, margin:'0 0 2px', letterSpacing:'-.5px' }}>Hello !</h1>
            <p style={{ fontFamily:P.font.body, fontSize:13, color:P.color.ink3, margin:0 }}>
              Alex Johnson · 28-day streak 🔥
            </p>
          </div>
          <div style={{ width:52, height:52, borderRadius:'50%',
            backgroundColor:P.color.pink, overflow:'hidden', border:`2px solid ${P.color.white}`,
            boxShadow:P.shadow.sm, display:'flex', alignItems:'center',
            justifyContent:'center', flexShrink:0 }}>
            <Icon name="user" size={24} color={P.color.black}/>
          </div>
        </div>

        {/* Pig + editorial quote */}
        <div style={{ position:'relative', marginBottom:24 }}>
          <div style={{ backgroundColor:P.color.stone, borderRadius:P.r.xl,
            padding:'16px 16px 16px 80px', minHeight:88,
            boxShadow:P.shadow.sm }}>
            <p style={{ fontFamily:P.font.body, fontWeight:700, fontSize:13,
              color:P.color.black, margin:'0 0 5px', lineHeight:1.4 }}>
              This is not just a profile.
            </p>
            <p style={{ fontFamily:P.font.body, fontSize:12, color:P.color.ink2,
              margin:0, lineHeight:1.6 }}>
              A space where you see your progress, your discipline, and the version of yourself you are becoming.
            </p>
          </div>
          <div style={{ position:'absolute', left:-4, bottom:0,
            transform:'translateY(0)' }}>
            <PigMascot size={88}/>
          </div>
        </div>

        {/* Stats row */}
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr',
          gap:10, marginBottom:24 }}>
          {[
            { label:'Days Active', value:'28', icon:'check',  bg:P.color.greenLight, c:P.color.green   },
            { label:'Aligned %',   value:'74%',icon:'star',   bg:P.color.pinkLight,  c:P.color.impulsive},
            { label:'Saved',       value:'$420',icon:'gift',  bg:P.color.sandLight,  c:P.color.neutral },
          ].map(s=>(
            <div key={s.label} style={{ backgroundColor:P.color.white, borderRadius:P.r.lg,
              padding:'14px 10px', textAlign:'center', boxShadow:P.shadow.sm }}>
              <div style={{ width:32, height:32, borderRadius:'50%',
                backgroundColor:s.bg, display:'flex', alignItems:'center',
                justifyContent:'center', margin:'0 auto 6px' }}>
                <Icon name={s.icon} size={15} color={s.c}/>
              </div>
              <p style={{ fontFamily:P.font.display, fontWeight:700, fontSize:18,
                color:P.color.black, margin:'0 0 1px' }}>{s.value}</p>
              <p style={{ fontFamily:P.font.body, fontSize:10, color:P.color.ink3, margin:0 }}>
                {s.label}
              </p>
            </div>
          ))}
        </div>

        {/* Wish Bottle */}
        <div style={{ display:'flex', justifyContent:'space-between',
          alignItems:'center', marginBottom:12 }}>
          <h2 style={{ fontFamily:P.font.display, fontWeight:700, fontSize:22,
            color:P.color.black, margin:0, letterSpacing:'-.3px' }}>
            Your Wish Bottle
          </h2>
          <button onClick={()=>nav('goals')}
            style={{ background:'none', border:'none', cursor:'pointer',
              fontFamily:P.font.body, fontSize:12, color:P.color.green, fontWeight:700 }}>
            View Goals →
          </button>
        </div>
        <WishBottle items={wishes} onAddWish={()=>setAddWishOpen(true)}/>

        {/* My Wish List */}
        <h3 style={{ fontFamily:P.font.display, fontWeight:700, fontSize:18,
          color:P.color.black, margin:'16px 0 10px', letterSpacing:'-.2px' }}>
          My Wish List
        </h3>
        <div style={{ overflowX:'auto', paddingBottom:4,
          marginLeft:-24, paddingLeft:24, marginRight:-24, paddingRight:24 }}>
          <div style={{ display:'flex', gap:10, alignItems:'flex-start',
            minWidth:'max-content' }}>
            <button onClick={()=>setAddWishOpen(true)}
              style={{ display:'flex', flexDirection:'column', alignItems:'center',
                gap:6, background:'none', border:'none', cursor:'pointer', flexShrink:0 }}>
              <div style={{ width:52, height:52, borderRadius:'50%',
                backgroundColor:P.color.white, border:`2px dashed ${P.color.border}`,
                display:'flex', alignItems:'center', justifyContent:'center' }}>
                <Icon name="plus" size={20} color={P.color.green}/>
              </div>
              <span style={{ fontFamily:P.font.body, fontSize:10,
                color:P.color.green, fontWeight:700 }}>Add</span>
            </button>
            {wishes.map(w=>{
              const pct=Math.round((w.saved/w.goal)*100);
              return (
                <div key={w.id} style={{ display:'flex', flexDirection:'column',
                  alignItems:'center', gap:5, flexShrink:0, width:62 }}>
                  <div style={{ position:'relative', width:52, height:52 }}>
                    {/* Circular progress ring */}
                    <svg width="52" height="52" viewBox="0 0 52 52"
                      style={{ position:'absolute', top:0, left:0 }}>
                      <circle cx="26" cy="26" r="22" fill="none"
                        stroke={P.color.stone} strokeWidth="3"/>
                      <circle cx="26" cy="26" r="22" fill="none"
                        stroke={P.color.green} strokeWidth="3"
                        strokeDasharray={`${pct/100*138} 138`}
                        strokeLinecap="round"
                        transform="rotate(-90 26 26)"/>
                    </svg>
                    <div style={{ position:'absolute', inset:5, borderRadius:'50%',
                      backgroundColor:P.color.sand, display:'flex',
                      alignItems:'center', justifyContent:'center' }}>
                      <span style={{ fontFamily:P.font.ui, fontSize:9, fontWeight:700,
                        color:P.color.black }}>{pct}%</span>
                    </div>
                  </div>
                  <span style={{ fontFamily:P.font.body, fontSize:9, color:P.color.ink3,
                    textAlign:'center', lineHeight:1.2, maxWidth:58 }}>
                    {w.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Achievement Categories */}
        <div style={{ display:'flex', alignItems:'center',
          justifyContent:'space-between', margin:'22px 0 12px' }}>
          <h2 style={{ fontFamily:P.font.display, fontWeight:700, fontSize:22,
            color:P.color.black, margin:0, letterSpacing:'-.3px' }}>
            Achievement Categories
          </h2>
          <button onClick={()=>nav('achievements')}
            style={{ background:'none', border:'none', cursor:'pointer',
              color:P.color.black, display:'flex', alignItems:'center', gap:2 }}>
            <Icon name="chevRight" size={22} color={P.color.black}/>
          </button>
        </div>

        {/* Streak card */}
        <div style={{ backgroundColor:P.color.green, borderRadius:P.r.xl,
          padding:'16px 20px', marginBottom:14, display:'flex',
          alignItems:'center', gap:14, boxShadow:P.shadow.md }}>
          <div style={{ width:44, height:44, borderRadius:P.r.md,
            backgroundColor:'rgba(255,255,255,.15)', display:'flex',
            alignItems:'center', justifyContent:'center', flexShrink:0 }}>
            <Icon name="star" size={22} color={P.color.sand}/>
          </div>
          <div>
            <p style={{ fontFamily:P.font.display, fontWeight:700, fontSize:18,
              color:P.color.white, margin:'0 0 2px' }}>28-Day Streak!</p>
            <p style={{ fontFamily:P.font.body, fontSize:12,
              color:'rgba(255,255,255,.65)', margin:0 }}>Keep it up — you're on a roll</p>
          </div>
          <PigMascot size={52} style={{ marginLeft:'auto', flexShrink:0 }}/>
        </div>

        <div style={{ display:'flex', gap:4, overflowX:'auto', paddingBottom:8,
          marginBottom:4, marginLeft:-4 }}>
          {achievements.map((a,i)=>(
            <div key={i} onClick={()=>nav('achievements')} style={{ cursor:'pointer', flexShrink:0 }}>
              <Badge category={a.category} points={a.points}
                earned={a.earned} size={70} delay={i*80}/>
            </div>
          ))}
        </div>

        {/* Settings */}
        <div style={{ backgroundColor:P.color.white, borderRadius:P.r.xl,
          marginTop:16, padding:'4px 0', boxShadow:P.shadow.sm }}>
          {[
            {label:'Spending Priorities', icon:'star',     screen:'prioritizeSelect'},
            {label:'Budget Settings',     icon:'settings', screen:'adjustment'     },
            {label:'Notifications',       icon:'bell',     screen:'notification'   },
          ].map((s,i)=>(
            <div key={s.label} onClick={()=>nav(s.screen)}
              style={{ display:'flex', alignItems:'center', gap:14, padding:'14px 16px',
                cursor:'pointer', borderBottom:i<2?`1px solid ${P.color.stone}`:'none' }}>
              <div style={{ width:36, height:36, borderRadius:P.r.sm,
                backgroundColor:P.color.pinkLight, display:'flex',
                alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                <Icon name={s.icon} size={18} color={P.color.green}/>
              </div>
              <span style={{ fontFamily:P.font.body, fontWeight:700, fontSize:14,
                color:P.color.black, flex:1 }}>{s.label}</span>
              <Icon name="chevRight" size={18} color={P.color.ink4}/>
            </div>
          ))}
        </div>

        <div style={{ padding:'16px 0 4px' }}>
          <PBtn label="Sign Out" variant="danger" onClick={()=>nav('welcome')}/>
        </div>
      </div>

      {/* Add wish sheet (reuse AddGoalSheet) */}
      <AddGoalSheet open={addWishOpen} onClose={()=>setAddWishOpen(false)}
        type="save" onSaved={g=>{ showToast(`"${g.name}" added to wish list ✓`); }}/>
      <Toast msg={toast} visible={toastVis}/>
    </div>
  );
}

// ─── ACHIEVEMENT SYSTEM OVERVIEW ────────────────────────────────
const ACHIEVEMENT_ROWS = [
  { category:'Financial\nDiscipline', tiers:[10,20,30,40], earned:2 },
  { category:'Awareness',             tiers:[10,20,30,40], earned:1 },
  { category:'Goal\nCompletion',      tiers:[10,20,30,40], earned:2 },
  { category:'Consistency',           tiers:[10,20,30,40], earned:3 },
];

const ACHIEVEMENT_DETAILS = {
  'Financial\nDiscipline': {
    10:{ condition:'Budget Basics',    desc:'Stayed within budget for 3 categories in one month' },
    20:{ condition:'Budget Builder',   desc:'Stayed within budget for 5 categories in one month' },
    30:{ condition:'Budget Boss',      desc:'100% budget adherence across all categories for 2 months' },
    40:{ condition:'Budget Master',    desc:'Perfect budget discipline for 3 consecutive months' },
  },
  Awareness: {
    10:{ condition:'First Glance',     desc:'Reviewed your spending report 3 times' },
    20:{ condition:'Mindful Choices',  desc:'Used it 15 times and avoided at least 5 purchases' },
    30:{ condition:'Spending Sage',    desc:'Tagged 50 transactions with alignment labels' },
    40:{ condition:'Clarity Champion', desc:'100% of transactions tagged for 2 consecutive months' },
  },
  'Goal\nCompletion': {
    10:{ condition:'First Step',       desc:'Completed your first saving goal' },
    20:{ condition:'On a Roll',        desc:'Completed 3 saving goals' },
    30:{ condition:'Goal Crusher',     desc:'Completed 5 saving goals' },
    40:{ condition:'Unstoppable',      desc:'Completed 10 saving goals' },
  },
  Consistency: {
    10:{ condition:'One Week',         desc:'Logged spending every day for 7 days' },
    20:{ condition:'Two Weeks',        desc:'Logged spending every day for 14 days' },
    30:{ condition:'Habit Formed',     desc:'Logged spending every day for 30 days' },
    40:{ condition:'Iron Discipline',  desc:'Logged spending every day for 90 consecutive days' },
  },
};

function ScreenAchievements({ nav }) {
  const [selected, setSelected] = React.useState(null);

  return (
    <div style={{ flex:1, backgroundColor:P.color.white, display:'flex',
      flexDirection:'column', position:'relative', overflow:'hidden' }}>
      <StatusBar />
      <div style={{ position:'absolute', top:0, left:0, right:0, height:94, zIndex:100,
        display:'flex', alignItems:'flex-end', padding:'0 20px 10px',
        borderBottom:`1px solid ${P.color.border}`,
        backgroundColor:P.color.white }}>
        <button onClick={()=>nav('profile')}
          style={{ background:'none', border:'none', cursor:'pointer',
            color:P.color.green, display:'flex', alignItems:'center' }}>
          <Icon name="chevLeft" size={22} color={P.color.green} strokeWidth={2.5}/>
        </button>
        <h1 style={{ flex:1, textAlign:'center', fontFamily:P.font.display,
          fontWeight:700, fontSize:18, color:P.color.black, margin:0 }}>
          Achievement System Overview
        </h1>
        <div style={{ width:36 }}/>
      </div>

      <div style={{ flex:1, overflowY:'auto', paddingTop:100, paddingBottom:90 }}>
        <div style={{ padding:'8px 20px' }}>
          {ACHIEVEMENT_ROWS.map((row,ri)=>(
            <div key={ri} style={{ marginBottom:28 }}>
              <div style={{ display:'flex', justifyContent:'space-between',
                alignItems:'center', marginBottom:10 }}>
                <p style={{ fontFamily:P.font.body, fontSize:11, fontWeight:700,
                  color:P.color.ink3, textTransform:'uppercase', letterSpacing:.8, margin:0 }}>
                  {row.category.replace('\n',' ')}
                </p>
                <span style={{ fontFamily:P.font.body, fontSize:11, color:P.color.green,
                  fontWeight:700 }}>{row.earned}/{row.tiers.length} earned</span>
              </div>
              <div style={{ display:'flex', justifyContent:'space-between', gap:4 }}>
                {row.tiers.map((pts,ti)=>(
                  <div key={ti} onClick={()=>setSelected({cat:row.category,pts,row})}
                    style={{ flex:1 }}>
                    <Badge category={row.category} points={pts}
                      earned={ti<row.earned} size={68} delay={ri*100+ti*60}/>
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* Coming soon */}
          <div style={{ marginTop:8, paddingTop:20, borderTop:`1px solid ${P.color.border}` }}>
            <p style={{ fontFamily:P.font.body, fontSize:14, color:P.color.ink4,
              margin:'0 0 14px', fontWeight:700 }}>More to come</p>
            <div style={{ display:'flex', gap:12 }}>
              {[10,20,30].map(pts=>(
                <Badge key={pts} category="Mindfulness" points={pts}
                  earned={false} locked={true} size={68}/>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Achievement detail overlay */}
      {selected && (()=>{
        const catKey = Object.keys(ACHIEVEMENT_DETAILS).find(k=>k===selected.cat)||'Awareness';
        const detail = (ACHIEVEMENT_DETAILS[catKey]||{})[selected.pts]||
          {condition:'Keep going',desc:`Reach ${selected.pts} pts in ${selected.cat}`};
        const isEarned = selected.row.tiers.indexOf(selected.pts) < selected.row.earned;

        return (
          <div style={{ position:'absolute', inset:0, zIndex:200,
            backgroundColor:P.color.white, display:'flex', flexDirection:'column',
            animation:'fadeSlideUp .3s ease both' }}>
            <StatusBar />
            <div style={{ display:'flex', alignItems:'flex-end', padding:'52px 20px 12px',
              borderBottom:`1px solid ${P.color.border}`, flexShrink:0 }}>
              <button onClick={()=>setSelected(null)}
                style={{ background:'none', border:'none', cursor:'pointer',
                  width:32, height:32, display:'flex', alignItems:'center', justifyContent:'center' }}>
                <Icon name="close" size={20} color={P.color.black}/>
              </button>
              <h1 style={{ flex:1, textAlign:'center', fontFamily:P.font.display,
                fontWeight:700, fontSize:17, color:P.color.black, margin:0 }}>
                Achievement Overview
              </h1>
              <div style={{ width:32 }}/>
            </div>

            <div style={{ flex:1, display:'flex', flexDirection:'column',
              alignItems:'center', justifyContent:'center', padding:'32px 40px 80px' }}>
              {/* Large badge */}
              <div style={{ position:'relative', marginBottom:32 }}>
                <div style={{ width:160, height:160, borderRadius:'50%',
                  backgroundColor:isEarned?P.color.black:'#D4D4D2',
                  display:'flex', alignItems:'center', justifyContent:'center',
                  boxShadow:isEarned?'0 12px 32px rgba(0,0,0,.25)':'0 4px 16px rgba(0,0,0,.1)',
                  animation:'badgePop .4s cubic-bezier(.34,1.56,.64,1) both' }}>
                  <span style={{ fontFamily:P.font.display, fontWeight:700, fontSize:20,
                    color:isEarned?P.color.white:P.color.ink3,
                    textAlign:'center', lineHeight:1.3, whiteSpace:'pre-line',
                    padding:'0 20px' }}>
                    {selected.cat}
                  </span>
                </div>
                <p style={{ fontFamily:P.font.display, fontWeight:700, fontSize:80,
                  color:P.color.black, textAlign:'center', margin:'-20px 0 0',
                  lineHeight:1, letterSpacing:'-3px' }}>
                  {selected.pts}
                </p>
              </div>

              <p style={{ fontFamily:P.font.body, fontWeight:700, fontSize:16,
                color:P.color.black, margin:'0 0 16px', textAlign:'center' }}>
                Unlock condition:
              </p>

              <div style={{ width:'100%', backgroundColor:P.color.stone,
                borderRadius:P.r.xl, padding:'22px 24px', textAlign:'center' }}>
                <p style={{ fontFamily:P.font.display, fontWeight:700, fontSize:20,
                  color:P.color.black, margin:'0 0 14px', letterSpacing:'-.2px' }}>
                  {detail.condition}
                </p>
                <p style={{ fontFamily:P.font.body, fontSize:15, color:P.color.ink2,
                  margin:0, lineHeight:1.65 }}>{detail.desc}</p>
              </div>

              {isEarned && (
                <div style={{ marginTop:20, backgroundColor:P.color.greenLight,
                  borderRadius:P.r.pill, padding:'8px 24px',
                  display:'flex', alignItems:'center', gap:8 }}>
                  <Icon name="check" size={16} color={P.color.green}/>
                  <span style={{ fontFamily:P.font.body, fontWeight:700,
                    fontSize:14, color:P.color.green }}>Achievement Unlocked!</span>
                </div>
              )}
            </div>
          </div>
        );
      })()}
    </div>
  );
}

Object.assign(window, {
  BottomNavV2, Badge, WishBottle, AddGoalSheet,
  PigBodyDiagram, SPEND_CATS_PIG,
  ScreenSpendingV2, ScreenProfileV2, ScreenAchievements,
  ACHIEVEMENT_ROWS, ACHIEVEMENT_DETAILS, WISH_ITEMS
});
