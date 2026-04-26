
// ─── EXTENDED SCREENS v4 — real pig, Log Transaction, Challenges list ─

// ─── iOS Bottom Sheet ────────────────────────────────────────────
function BottomSheet({ open, onClose, title, children, height='80%' }) {
  const [vis, setVis] = React.useState(false);
  React.useEffect(()=>{ if(open){setTimeout(()=>setVis(true),10);}else setVis(false); },[open]);
  if (!open && !vis) return null;
  return (
    <div style={{ position:'absolute', inset:0, zIndex:300 }}>
      <div onClick={onClose} style={{ position:'absolute', inset:0,
        backgroundColor:vis?'rgba(0,0,0,.45)':'rgba(0,0,0,0)',
        transition:'background .3s', backdropFilter:vis?'blur(3px)':'none' }}/>
      <div style={{ position:'absolute', bottom:0, left:0, right:0, height,
        backgroundColor:P.color.white, borderRadius:'24px 24px 0 0',
        transform:vis?'translateY(0)':'translateY(100%)',
        transition:'transform .35s cubic-bezier(.4,0,.2,1)',
        display:'flex', flexDirection:'column', overflow:'hidden',
        boxShadow:'0 -4px 40px rgba(0,0,0,.18)' }}>
        <div style={{ display:'flex', justifyContent:'center', padding:'12px 0 4px', flexShrink:0 }}>
          <div style={{ width:36, height:4, borderRadius:2, backgroundColor:P.color.border }}/>
        </div>
        {title && (
          <div style={{ padding:'4px 20px 14px', borderBottom:`1px solid ${P.color.border}`, flexShrink:0 }}>
            <h3 style={{ fontFamily:P.font.display, fontWeight:700, fontSize:18,
              color:P.color.black, margin:0, letterSpacing:'-.3px', textAlign:'center' }}>{title}</h3>
          </div>
        )}
        <div style={{ flex:1, overflowY:'auto' }}>{children}</div>
      </div>
    </div>
  );
}

// ─── Toast ────────────────────────────────────────────────────────
function Toast({ msg, visible }) {
  return (
    <div style={{ position:'absolute', bottom:96, left:'50%',
      transform:`translateX(-50%) translateY(${visible?0:16}px)`,
      opacity:visible?1:0, transition:'all .28s', zIndex:400,
      backgroundColor:P.color.black, color:P.color.white,
      fontFamily:P.font.body, fontSize:13, fontWeight:700,
      padding:'10px 22px', borderRadius:P.r.pill,
      boxShadow:P.shadow.lg, whiteSpace:'nowrap', pointerEvents:'none' }}>{msg}</div>
  );
}

// ─── NavBar (iOS-style) ───────────────────────────────────────────
function NavBar({ title, onBack, rightLabel, onRight, light=false }) {
  const c = light ? P.color.white : P.color.green;
  return (
    <div style={{ position:'absolute', top:0, left:0, right:0, height:94, zIndex:100,
      display:'flex', alignItems:'flex-end', padding:'0 16px 10px' }}>
      <button onClick={onBack}
        style={{ display:'flex', alignItems:'center', gap:2, background:'none',
          border:'none', cursor:'pointer', color:c, fontFamily:P.font.ui,
          fontSize:16, padding:'4px 0' }}>
        <Icon name="chevLeft" size={22} color={c} strokeWidth={2.5}/>
      </button>
      <h1 style={{ flex:1, textAlign:'center', fontFamily:P.font.ui, fontWeight:600,
        fontSize:17, color:light?P.color.white:P.color.black, margin:0,
        letterSpacing:'-.2px' }}>{title}</h1>
      {onRight
        ? <button onClick={onRight} style={{ background:'none', border:'none',
            cursor:'pointer', color:c, fontFamily:P.font.ui, fontSize:16,
            fontWeight:500 }}>{rightLabel||'Edit'}</button>
        : <div style={{ width:40 }}/>}
    </div>
  );
}

// ─── LOG TRANSACTION SHEET (core loop) ───────────────────────────
function LogTransactionSheet({ open, onClose, task, onLogged }) {
  const [amount, setAmount]     = React.useState('');
  const [place,  setPlace]      = React.useState('');
  const [align,  setAlign]      = React.useState('neutral');
  const [note,   setNote]       = React.useState('');
  const meta = task ? (CAT_META[task.cat]||CAT_META.dining) : CAT_META.dining;

  React.useEffect(()=>{ if(open){ setAmount(''); setPlace(''); setAlign('neutral'); setNote(''); }}, [open]);

  const canSave = amount.length > 0;

  return (
    <BottomSheet open={open} onClose={onClose} height="88%"
      title={task ? `Log ${meta.label}` : 'Log Expense'}>
      <div style={{ padding:'20px 24px 40px' }}>
        {/* Mascot header */}
        <div style={{ display:'flex', alignItems:'center', gap:14, marginBottom:20,
          backgroundColor:P.color.pinkLight, borderRadius:P.r.lg, padding:'14px 16px' }}>
          <PigMascot size={64} />
          <div>
            <p style={{ fontFamily:P.font.display, fontWeight:700, fontSize:16,
              color:P.color.black, margin:'0 0 2px' }}>
              {task ? `${task.timesLeft - 1 >= 0 ? task.timesLeft-1 : 0} times left after this` : 'Log a purchase'}
            </p>
            <p style={{ fontFamily:P.font.body, fontSize:12, color:P.color.ink3, margin:0 }}>
              {task ? `Budget: ${task.avg} avg · Was this worth it?` : 'Tag it to track your alignment'}
            </p>
          </div>
        </div>

        {/* Amount — big */}
        <div style={{ textAlign:'center', marginBottom:24 }}>
          <p style={{ fontFamily:P.font.body, fontSize:11, fontWeight:700,
            color:P.color.ink3, textTransform:'uppercase', letterSpacing:.8, margin:'0 0 8px' }}>
            Amount Spent
          </p>
          <div style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:4 }}>
            <span style={{ fontFamily:P.font.display, fontWeight:700, fontSize:40,
              color:P.color.black }}>$</span>
            <input type="number" placeholder="0.00" value={amount}
              onChange={e=>setAmount(e.target.value)}
              style={{ fontFamily:P.font.display, fontWeight:700, fontSize:40,
                color:P.color.black, border:'none', outline:'none', width:160,
                textAlign:'left', backgroundColor:'transparent' }}/>
          </div>
          <div style={{ width:200, height:2, backgroundColor:P.color.border,
            margin:'4px auto 0', borderRadius:1 }}/>
        </div>

        {/* Place */}
        <div style={{ marginBottom:14 }}>
          <p style={{ fontFamily:P.font.body, fontSize:12, fontWeight:700,
            color:P.color.ink3, margin:'0 0 6px' }}>Where?</p>
          <input type="text" placeholder={`e.g. ${meta.label} place…`} value={place}
            onChange={e=>setPlace(e.target.value)}
            style={{ width:'100%', height:48, borderRadius:P.r.md, border:`1.5px solid ${P.color.border}`,
              padding:'0 14px', fontFamily:P.font.body, fontSize:15, color:P.color.black,
              outline:'none', boxSizing:'border-box', backgroundColor:P.color.white }}/>
        </div>

        {/* Alignment tag */}
        <div style={{ marginBottom:16 }}>
          <p style={{ fontFamily:P.font.body, fontSize:12, fontWeight:700,
            color:P.color.ink3, margin:'0 0 8px' }}>How aligned was this?</p>
          <div style={{ display:'flex', gap:8 }}>
            {['aligned','neutral','impulsive'].map(t => {
              const colors = {
                aligned:  {bg:P.color.aligned,   light:P.color.alignedTint  },
                neutral:  {bg:P.color.neutral,   light:P.color.neutralTint  },
                impulsive:{bg:P.color.impulsive, light:P.color.impulsiveTint},
              };
              const desc = {
                aligned:'Worth it ✓', neutral:'So-so', impulsive:'Regret it'
              };
              return (
                <button key={t} onClick={()=>setAlign(t)}
                  style={{ flex:1, padding:'10px 6px', borderRadius:P.r.md,
                    backgroundColor:align===t ? colors[t].bg : colors[t].light,
                    color:align===t ? P.color.white : P.color[t],
                    border:`1.5px solid ${align===t ? colors[t].bg : 'transparent'}`,
                    cursor:'pointer', transition:'all .15s', textAlign:'center' }}>
                  <p style={{ fontFamily:P.font.body, fontWeight:700, fontSize:12,
                    margin:'0 0 1px', textTransform:'capitalize' }}>{t}</p>
                  <p style={{ fontFamily:P.font.body, fontSize:10, margin:0 }}>{desc[t]}</p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Note */}
        <div style={{ marginBottom:24 }}>
          <p style={{ fontFamily:P.font.body, fontSize:12, fontWeight:700,
            color:P.color.ink3, margin:'0 0 6px' }}>Note (optional)</p>
          <textarea placeholder="Why did you buy this?" value={note}
            onChange={e=>setNote(e.target.value)}
            style={{ width:'100%', height:72, borderRadius:P.r.md,
              border:`1.5px solid ${P.color.border}`, padding:'10px 14px',
              fontFamily:P.font.body, fontSize:14, color:P.color.black,
              outline:'none', resize:'none', boxSizing:'border-box',
              backgroundColor:P.color.white, lineHeight:1.5 }}/>
        </div>

        <PBtn label={canSave ? `Log $${amount}` : 'Enter amount to log'}
          onClick={()=>{ if(canSave){ onLogged({amount,place,align,note}); onClose(); }}}
          style={{ opacity:canSave?1:.45, pointerEvents:canSave?'auto':'none' }}/>
      </div>
    </BottomSheet>
  );
}

// ─── CHALLENGES LIST ─────────────────────────────────────────────
const ALL_CHALLENGES = [
  { id:'caffeine', cat:'coffee',     color:P.color.green,  days:5,  title:'Caffeine-Free Week',    sub:'Skip coffee for 5 days straight',      points:50,  active:true  },
  { id:'cook',     cat:'dining',     color:'#5B3A29',       days:7,  title:'Cook Every Day',        sub:'No takeout for a whole week',           points:70,  active:false },
  { id:'nobuy',    cat:'shopping',   color:P.color.black,   days:30, title:'No-Spend Month',        sub:'Zero non-essential purchases',          points:300, active:false },
  { id:'walk',     cat:'transport',  color:'#2B5B8B',       days:14, title:'Walk It Out',           sub:'Skip transit for 2 weeks',              points:140, active:false },
  { id:'social',   cat:'social',     color:'#7B3FA0',       days:3,  title:'3-Day Social Detox',    sub:'Skip expensive social plans',           points:30,  active:false },
  { id:'lunch',    cat:'dining',     color:'#8B5E3C',       days:5,  title:'Meal Prep Master',      sub:'Bring lunch to work every day',         points:50,  active:false },
  { id:'sub',      cat:'subscriptions',color:'#1A4B6E',     days:30, title:'Subscription Purge',    sub:'Audit & cancel unused subscriptions',   points:200, active:false },
  { id:'fitness',  cat:'fitness',    color:'#3A5F3A',       days:21, title:'Home Workout Month',    sub:'Cancel gym, workout at home',           points:210, active:false },
];

function ScreenChallengesList({ nav }) {
  const [joined, setJoined] = React.useState(['caffeine']);

  return (
    <div style={{ flex:1, backgroundColor:P.color.cream, display:'flex',
      flexDirection:'column', position:'relative' }}>
      <StatusBar />
      <NavBar title="Challenges" onBack={()=>nav('home')} rightLabel="History" onRight={()=>{}} />

      <div style={{ flex:1, overflowY:'auto', paddingTop:94, paddingBottom:24 }}>
        {/* Active challenge banner */}
        <div style={{ padding:'0 20px 16px' }}>
          <p style={{ fontFamily:P.font.body, fontSize:11, fontWeight:700,
            color:P.color.ink3, textTransform:'uppercase', letterSpacing:.8, margin:'0 0 10px' }}>
            Active
          </p>
          {ALL_CHALLENGES.filter(c=>joined.includes(c.id)).map(c=>(
            <div key={c.id} onClick={()=>nav('challengeDetail')}
              style={{ backgroundColor:c.color, borderRadius:P.r.xl, padding:'20px',
                marginBottom:10, cursor:'pointer', boxShadow:P.shadow.md,
                position:'relative', overflow:'hidden' }}>
              <div style={{ position:'absolute', inset:0, opacity:.08,
                backgroundImage:'repeating-linear-gradient(45deg,white 0,white 1px,transparent 0,transparent 50%)',
                backgroundSize:'18px 18px' }}/>
              <div style={{ position:'relative', display:'flex', alignItems:'center', gap:14 }}>
                <div style={{ width:52, height:52, borderRadius:P.r.md,
                  backgroundColor:'rgba(255,255,255,.18)', display:'flex',
                  alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                  <Icon name={CAT_META[c.cat]?.icon||'star'} size={26} color="white" />
                </div>
                <div style={{ flex:1 }}>
                  <p style={{ fontFamily:P.font.display, fontWeight:700, fontSize:18,
                    color:P.color.white, margin:'0 0 2px', letterSpacing:'-.2px' }}>{c.title}</p>
                  <p style={{ fontFamily:P.font.body, fontSize:12, color:'rgba(255,255,255,.75)', margin:'0 0 8px' }}>{c.sub}</p>
                  <div style={{ display:'flex', alignItems:'center', gap:8 }}>
                    <div style={{ flex:1, height:5, borderRadius:P.r.pill,
                      backgroundColor:'rgba(255,255,255,.25)' }}>
                      <div style={{ width:'17%', height:'100%', borderRadius:P.r.pill,
                        backgroundColor:P.color.white }}/>
                    </div>
                    <span style={{ fontFamily:P.font.body, fontSize:11, color:'rgba(255,255,255,.7)',
                      fontWeight:700 }}>Day 5/{c.days}</span>
                  </div>
                </div>
                <PigMascot size={56} style={{ flexShrink:0 }} />
              </div>
            </div>
          ))}
        </div>

        {/* Browse */}
        <div style={{ padding:'0 20px' }}>
          <p style={{ fontFamily:P.font.body, fontSize:11, fontWeight:700,
            color:P.color.ink3, textTransform:'uppercase', letterSpacing:.8, margin:'0 0 10px' }}>
            Browse All Challenges
          </p>
          <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
            {ALL_CHALLENGES.filter(c=>!joined.includes(c.id)).map(c => (
              <div key={c.id} style={{ backgroundColor:P.color.white, borderRadius:P.r.xl,
                padding:'16px', boxShadow:P.shadow.sm, display:'flex',
                alignItems:'center', gap:14 }}>
                <div style={{ width:52, height:52, borderRadius:P.r.md,
                  backgroundColor:c.color, display:'flex', alignItems:'center',
                  justifyContent:'center', flexShrink:0 }}>
                  <Icon name={CAT_META[c.cat]?.icon||'star'} size={24} color="white" />
                </div>
                <div style={{ flex:1 }}>
                  <p style={{ fontFamily:P.font.body, fontWeight:700, fontSize:14,
                    color:P.color.black, margin:'0 0 2px' }}>{c.title}</p>
                  <p style={{ fontFamily:P.font.body, fontSize:11, color:P.color.ink3, margin:'0 0 6px' }}>
                    {c.sub}
                  </p>
                  <div style={{ display:'flex', alignItems:'center', gap:6 }}>
                    <span style={{ fontFamily:P.font.body, fontSize:10, fontWeight:700,
                      color:P.color.ink3, backgroundColor:P.color.stone,
                      borderRadius:P.r.pill, padding:'2px 8px' }}>{c.days} days</span>
                    <span style={{ fontFamily:P.font.body, fontSize:10, fontWeight:700,
                      color:P.color.neutral, backgroundColor:P.color.neutralTint,
                      borderRadius:P.r.pill, padding:'2px 8px' }}>+{c.points} pts</span>
                  </div>
                </div>
                <button onClick={()=>setJoined(j=>[...j,c.id])}
                  style={{ height:36, padding:'0 16px', borderRadius:P.r.pill,
                    backgroundColor:P.color.green, color:P.color.white,
                    border:'none', cursor:'pointer', fontFamily:P.font.body,
                    fontSize:12, fontWeight:700, flexShrink:0 }}>
                  Join
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── CATEGORY DETAIL ─────────────────────────────────────────────
const TRANSACTIONS = {
  dining: [
    {id:1,name:"Mei Lai Wah",         date:"Fri, Apr 11",amount:7.50, type:'aligned'  },
    {id:2,name:"Emilio's Ballato",    date:"Thu, Apr 10",amount:62.50,type:'impulsive'},
    {id:3,name:"Amélie Bistro",       date:"Tue, Apr 8", amount:54.75,type:'neutral'  },
    {id:4,name:"Sunrise Coffee Shop", date:"Mon, Apr 7", amount:4.75, type:'aligned'  },
    {id:5,name:"Nobu Downtown",       date:"Sat, Apr 5", amount:88.30,type:'impulsive'},
  ],
  coffee:[
    {id:1,name:"Blue Bottle Coffee",  date:"Fri, Apr 11",amount:6.50, type:'neutral'  },
    {id:2,name:"Starbucks Reserve",   date:"Thu, Apr 10",amount:8.75, type:'impulsive'},
    {id:3,name:"Think Coffee",        date:"Tue, Apr 8", amount:5.00, type:'aligned'  },
  ],
  shopping:[
    {id:1,name:"Uniqlo",              date:"Fri, Apr 11",amount:65.00,type:'neutral'  },
    {id:2,name:"Zara",                date:"Wed, Apr 9", amount:120.00,type:'impulsive'},
  ],
  grocery:[
    {id:1,name:"Whole Foods",         date:"Fri, Apr 11",amount:54.30,type:'aligned'  },
    {id:2,name:"Trader Joe's",        date:"Tue, Apr 8", amount:38.90,type:'aligned'  },
  ],
  transport:[
    {id:1,name:"MetroCard",           date:"Fri, Apr 11",amount:33.00,type:'aligned'  },
    {id:2,name:"Uber",                date:"Wed, Apr 9", amount:18.40,type:'neutral'  },
  ],
};
const DEFAULT_TXN = [
  {id:1,name:"Transaction 1",date:"Fri, Apr 11",amount:45.00,type:'aligned'  },
  {id:2,name:"Transaction 2",date:"Thu, Apr 10",amount:32.00,type:'neutral'  },
  {id:3,name:"Transaction 3",date:"Tue, Apr 8", amount:28.50,type:'impulsive'},
];

function ScreenCategoryDetail({ nav, catId='dining' }) {
  const meta   = CAT_META[catId] || CAT_META.dining;
  const [txns, setTxns] = React.useState(TRANSACTIONS[catId] || DEFAULT_TXN);
  const total  = txns.reduce((s,t)=>s+t.amount,0);
  const budget = catId==='rent'?2500:catId==='grocery'?400:catId==='dining'?250:200;
  const timesLeft = 2;
  const [sheet,    setSheet]    = React.useState(null);
  const [toast,    setToast]    = React.useState('');
  const [toastVis, setToastVis] = React.useState(false);
  const [txnSel,   setTxnSel]   = React.useState(null);
  const [splitTimes, setSplitTimes] = React.useState(4);
  const [tradeCat,   setTradeCat]   = React.useState('fitness');

  const showToast = msg => {
    setToast(msg); setToastVis(true);
    setTimeout(()=>setToastVis(false), 2400);
  };

  const typeColor = t => t==='aligned'?P.color.green:t==='impulsive'?P.color.impulsive:P.color.neutral;
  const typeBg    = t => t==='aligned'?P.color.greenLight:t==='impulsive'?P.color.impulsiveTint:P.color.neutralTint;

  return (
    <div style={{ flex:1, backgroundColor:P.color.cream, display:'flex',
      flexDirection:'column', position:'relative', overflow:'hidden' }}>
      <StatusBar />
      <NavBar title={meta.label} onBack={()=>nav('spending')} rightLabel="Edit" onRight={()=>{}} />

      <div style={{ flex:1, overflowY:'auto', paddingTop:94, paddingBottom:24 }}>
        {/* Hero */}
        <div style={{ padding:'0 20px 14px' }}>
          <div style={{ background:`linear-gradient(135deg,${P.color.green} 0%,#1a6b3c 100%)`,
            borderRadius:P.r.xl, padding:'20px', boxShadow:P.shadow.md,
            position:'relative', overflow:'hidden' }}>
            <div style={{ position:'absolute', inset:0, opacity:.07,
              backgroundImage:'repeating-linear-gradient(45deg,white 0,white 1px,transparent 0,transparent 50%)',
              backgroundSize:'18px 18px' }}/>
            <div style={{ position:'relative', display:'flex', alignItems:'center', gap:14, marginBottom:14 }}>
              <div style={{ width:52, height:52, borderRadius:P.r.md,
                backgroundColor:'rgba(255,255,255,.15)', display:'flex',
                alignItems:'center', justifyContent:'center' }}>
                <Icon name={meta.icon} size={28} color="white" />
              </div>
              <div>
                <p style={{ fontFamily:P.font.body, fontSize:11, fontWeight:700,
                  color:'rgba(255,255,255,.6)', textTransform:'uppercase', letterSpacing:.8, margin:'0 0 1px' }}>
                  April 2026
                </p>
                <p style={{ fontFamily:P.font.display, fontWeight:700, fontSize:34,
                  color:P.color.white, margin:0, letterSpacing:'-.5px' }}>
                  ${total.toFixed(2)}
                </p>
              </div>
              <div style={{ marginLeft:'auto', textAlign:'right' }}>
                <p style={{ fontFamily:P.font.body, fontSize:11, color:'rgba(255,255,255,.6)', margin:'0 0 2px' }}>
                  Budget
                </p>
                <p style={{ fontFamily:P.font.display, fontWeight:700, fontSize:22,
                  color:'rgba(255,255,255,.85)', margin:0 }}>${budget}</p>
              </div>
            </div>
            <ProgressBar value={total} max={budget} color="rgba(255,255,255,.8)" />
          </div>
        </div>

        {/* Stats */}
        <div style={{ display:'flex', gap:10, padding:'0 20px 14px' }}>
          {[
            {label:'Times Left', value:timesLeft, sub:'This week', icon:'check', bg:P.color.pinkLight, c:P.color.green},
            {label:'Aligned',    value:`${Math.round((txns.filter(t=>t.type==='aligned').length/Math.max(txns.length,1))*100)}%`,
              sub:'of purchases', icon:'star', bg:P.color.greenLight, c:P.color.green},
            {label:'Avg Spend',  value:`$${txns.length?Math.round(total/txns.length):0}`,
              sub:'per visit', icon:'filter', bg:P.color.sandLight, c:P.color.neutral},
          ].map(s=>(
            <div key={s.label} style={{ flex:1, backgroundColor:P.color.white,
              borderRadius:P.r.lg, padding:'12px 10px', textAlign:'center', boxShadow:P.shadow.sm }}>
              <div style={{ width:30, height:30, borderRadius:'50%', backgroundColor:s.bg,
                display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto 6px' }}>
                <Icon name={s.icon} size={14} color={s.c} />
              </div>
              <p style={{ fontFamily:P.font.display, fontWeight:700, fontSize:18,
                color:P.color.black, margin:'0 0 1px' }}>{s.value}</p>
              <p style={{ fontFamily:P.font.body, fontSize:9, color:P.color.ink3,
                margin:0, lineHeight:1.3 }}>{s.label}</p>
            </div>
          ))}
        </div>

        {/* Split / Merge / Trade */}
        <div style={{ padding:'0 20px 14px' }}>
          <p style={{ fontFamily:P.font.body, fontSize:11, fontWeight:700,
            color:P.color.ink3, textTransform:'uppercase', letterSpacing:.8, margin:'0 0 10px' }}>
            Manage Budget
          </p>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:10 }}>
            {[
              {key:'split', label:'Split', sub:'More times,\nless each',  bg:P.color.pink,      icon:
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={P.color.black} strokeWidth="2" strokeLinecap="round"><line x1="12" y1="3" x2="12" y2="21"/><path d="M3 9l9-6 9 6"/><path d="M3 15l9 6 9-6"/></svg>},
              {key:'merge', label:'Merge', sub:'Plan to\nsplurge?',       bg:P.color.sand,      icon:
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={P.color.black} strokeWidth="2" strokeLinecap="round"><path d="M8 6H5a2 2 0 00-2 2v8a2 2 0 002 2h3M16 6h3a2 2 0 012 2v8a2 2 0 01-2 2h-3M8 12h8"/></svg>},
            ].map(btn=>(
              <button key={btn.key} onClick={()=>setSheet(btn.key)}
                style={{ backgroundColor:btn.bg, borderRadius:P.r.lg, padding:'18px 16px',
                  border:'none', cursor:'pointer', textAlign:'left', boxShadow:P.shadow.sm,
                  transition:'transform .1s' }}
                onMouseDown={e=>e.currentTarget.style.transform='scale(.95)'}
                onMouseUp={e=>e.currentTarget.style.transform='scale(1)'}>
                <div style={{ width:38, height:38, borderRadius:'50%',
                  backgroundColor:'rgba(255,255,255,.55)', display:'flex',
                  alignItems:'center', justifyContent:'center', marginBottom:10 }}>
                  {btn.icon}
                </div>
                <p style={{ fontFamily:P.font.display, fontWeight:700, fontSize:18,
                  color:P.color.black, margin:'0 0 3px' }}>{btn.label}</p>
                <p style={{ fontFamily:P.font.body, fontSize:11, color:P.color.ink2,
                  margin:0, lineHeight:1.4, whiteSpace:'pre-line' }}>{btn.sub}</p>
              </button>
            ))}
            <button onClick={()=>setSheet('trade')}
              style={{ gridColumn:'span 2', backgroundColor:P.color.greenLight,
                borderRadius:P.r.lg, padding:'14px 18px', border:'none', cursor:'pointer',
                display:'flex', alignItems:'center', gap:16, boxShadow:P.shadow.sm,
                transition:'transform .1s' }}
              onMouseDown={e=>e.currentTarget.style.transform='scale(.98)'}
              onMouseUp={e=>e.currentTarget.style.transform='scale(1)'}>
              <div style={{ width:42, height:42, borderRadius:'50%',
                backgroundColor:'rgba(255,255,255,.6)', display:'flex',
                alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
                  stroke={P.color.green} strokeWidth="2.2" strokeLinecap="round">
                  <path d="M7 16V4m0 0L3 8m4-4l4 4M17 8v12m0 0l4-4m-4 4l-4-4"/>
                </svg>
              </div>
              <div style={{ textAlign:'left' }}>
                <p style={{ fontFamily:P.font.display, fontWeight:700, fontSize:18,
                  color:P.color.black, margin:'0 0 1px' }}>Trade</p>
                <p style={{ fontFamily:P.font.body, fontSize:11, color:P.color.ink2, margin:0 }}>
                  Swap allowance to another category
                </p>
              </div>
              <Icon name="chevRight" size={18} color={P.color.green} style={{ marginLeft:'auto' }}/>
            </button>
          </div>
        </div>

        {/* Transactions */}
        <div style={{ padding:'0 20px' }}>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:10 }}>
            <p style={{ fontFamily:P.font.body, fontSize:11, fontWeight:700,
              color:P.color.ink3, textTransform:'uppercase', letterSpacing:.8, margin:0 }}>
              Transactions
            </p>
            <span style={{ fontFamily:P.font.body, fontSize:12, color:P.color.green,
              fontWeight:700 }}>{txns.length} this month</span>
          </div>
          <div style={{ backgroundColor:P.color.white, borderRadius:P.r.xl,
            overflow:'hidden', boxShadow:P.shadow.sm }}>
            {txns.map((txn,i)=>(
              <div key={txn.id} onClick={()=>setTxnSel(txn)}
                style={{ padding:'14px 16px', display:'flex', alignItems:'center',
                  gap:12, cursor:'pointer',
                  borderBottom:i<txns.length-1?`1px solid ${P.color.stone}`:'none',
                  transition:'background .1s' }}
                onMouseEnter={e=>e.currentTarget.style.backgroundColor=P.color.stone}
                onMouseLeave={e=>e.currentTarget.style.backgroundColor='transparent'}>
                <div style={{ width:40, height:40, borderRadius:'50%',
                  backgroundColor:typeBg(txn.type), display:'flex',
                  alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                  <Icon name={meta.icon} size={18} color={typeColor(txn.type)} />
                </div>
                <div style={{ flex:1 }}>
                  <p style={{ fontFamily:P.font.body, fontWeight:700, fontSize:14,
                    color:P.color.black, margin:'0 0 1px', textWrap:'pretty' }}>{txn.name}</p>
                  <p style={{ fontFamily:P.font.body, fontSize:11, color:P.color.ink3, margin:0 }}>
                    {txn.date}
                  </p>
                </div>
                <div style={{ display:'flex', flexDirection:'column', alignItems:'flex-end', gap:3 }}>
                  <span style={{ fontFamily:P.font.display, fontWeight:700, fontSize:16,
                    color:P.color.black }}>${txn.amount.toFixed(2)}</span>
                  <SpendTag type={txn.type} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── SPLIT ── */}
      <BottomSheet open={sheet==='split'} onClose={()=>setSheet(null)} title="Split Budget" height="58%">
        <div style={{ padding:'20px 24px' }}>
          <div style={{ display:'flex', alignItems:'center', gap:14, marginBottom:20,
            backgroundColor:P.color.pinkLight, borderRadius:P.r.lg, padding:'14px' }}>
            <PigMascot size={64} />
            <p style={{ fontFamily:P.font.body, fontSize:13, color:P.color.black,
              margin:0, lineHeight:1.5, fontWeight:700 }}>
              Spread {meta.label} into<br/>more smaller visits!
            </p>
          </div>
          <p style={{ fontFamily:P.font.body, fontSize:13, color:P.color.ink3, margin:'0 0 14px' }}>
            Current: <strong style={{color:P.color.black}}>{timesLeft}×/week</strong> · Increase frequency, lower avg
          </p>
          <p style={{ fontFamily:P.font.body, fontWeight:700, fontSize:14, color:P.color.black, margin:'0 0 10px' }}>
            Split into:
          </p>
          <div style={{ display:'flex', gap:8, marginBottom:20 }}>
            {[3,4,5,6,7].map(n=>(
              <button key={n} onClick={()=>setSplitTimes(n)}
                style={{ flex:1, height:46, borderRadius:P.r.md,
                  backgroundColor:splitTimes===n?P.color.green:P.color.stone,
                  color:splitTimes===n?P.color.white:P.color.black,
                  border:'none', cursor:'pointer', fontFamily:P.font.display,
                  fontWeight:700, fontSize:16, transition:'all .15s' }}>
                {n}×
              </button>
            ))}
          </div>
          <div style={{ backgroundColor:P.color.stone, borderRadius:P.r.lg, padding:'12px 16px', marginBottom:18 }}>
            <p style={{ fontFamily:P.font.body, fontSize:13, color:P.color.ink2, margin:0 }}>
              New avg: <strong style={{color:P.color.black}}>${Math.round(budget/splitTimes/4)}</strong>/visit
              · <strong style={{color:P.color.black}}>{splitTimes}×</strong>/week
            </p>
          </div>
          <PBtn label={`Apply — ${splitTimes}× per week`}
            onClick={()=>{ setSheet(null); showToast(`Split to ${splitTimes}×/week ✓`); }}/>
        </div>
      </BottomSheet>

      {/* ── MERGE ── */}
      <BottomSheet open={sheet==='merge'} onClose={()=>setSheet(null)} title="Merge Budget" height="58%">
        <div style={{ padding:'20px 24px' }}>
          <div style={{ display:'flex', alignItems:'center', gap:14, marginBottom:18,
            backgroundColor:P.color.sandLight, borderRadius:P.r.lg, padding:'14px' }}>
            <PigMascot size={64} />
            <p style={{ fontFamily:P.font.body, fontSize:13, color:P.color.black,
              margin:0, lineHeight:1.5, fontWeight:700 }}>
              Skip next week → double<br/>this week's allowance!
            </p>
          </div>
          <div style={{ backgroundColor:P.color.stone, borderRadius:P.r.lg, padding:'16px', marginBottom:16 }}>
            <div style={{ display:'flex', justifyContent:'space-between', marginBottom:8 }}>
              <span style={{ fontFamily:P.font.body, fontSize:13, color:P.color.ink3, fontWeight:700 }}>This week</span>
              <span style={{ fontFamily:P.font.display, fontWeight:700, fontSize:15, color:P.color.black }}>${budget/4}</span>
            </div>
            <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:8 }}>
              <div style={{ flex:1, height:1, backgroundColor:P.color.border }}/>
              <span style={{ fontFamily:P.font.body, fontSize:11, color:P.color.ink4 }}>+ skip next week</span>
              <div style={{ flex:1, height:1, backgroundColor:P.color.border }}/>
            </div>
            <div style={{ display:'flex', justifyContent:'space-between' }}>
              <span style={{ fontFamily:P.font.body, fontSize:13, color:P.color.green, fontWeight:700 }}>Merged total</span>
              <span style={{ fontFamily:P.font.display, fontWeight:700, fontSize:15, color:P.color.green }}>${budget/2}</span>
            </div>
          </div>
          <p style={{ fontFamily:P.font.body, fontSize:11, color:P.color.ink4, textAlign:'center', margin:'0 0 14px' }}>
            Next week's {meta.label} budget will be locked 🔒
          </p>
          <PBtn label="Merge Two Weeks"
            onClick={()=>{ setSheet(null); showToast('Merged! Enjoy the splurge 🎉'); }}/>
        </div>
      </BottomSheet>

      {/* ── TRADE ── */}
      <BottomSheet open={sheet==='trade'} onClose={()=>setSheet(null)} title="Trade Allowance" height="72%">
        <div style={{ padding:'20px 24px' }}>
          <div style={{ display:'flex', alignItems:'center', gap:14, marginBottom:18,
            backgroundColor:P.color.greenLight, borderRadius:P.r.lg, padding:'14px' }}>
            <PigMascot size={64} />
            <p style={{ fontFamily:P.font.body, fontSize:13, color:P.color.black,
              margin:0, lineHeight:1.5, fontWeight:700 }}>
              Trade your {meta.label}<br/>budget to somewhere else!
            </p>
          </div>
          <p style={{ fontFamily:P.font.body, fontWeight:700, fontSize:14,
            color:P.color.black, margin:'0 0 10px' }}>Trade to:</p>
          <div style={{ display:'flex', flexDirection:'column', gap:8, marginBottom:18 }}>
            {['fitness','travel','social','entertainment','education'].map(id=>{
              const m=CAT_META[id];
              return (
                <button key={id} onClick={()=>setTradeCat(id)}
                  style={{ display:'flex', alignItems:'center', gap:14, padding:'12px 14px',
                    borderRadius:P.r.lg,
                    border:`1.5px solid ${tradeCat===id?P.color.green:P.color.border}`,
                    backgroundColor:tradeCat===id?P.color.greenLight:P.color.white,
                    cursor:'pointer', transition:'all .15s' }}>
                  <div style={{ width:40, height:40, borderRadius:P.r.md,
                    backgroundColor:tradeCat===id?P.color.green:P.color.stone,
                    display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                    <Icon name={m.icon} size={20} color={tradeCat===id?P.color.white:P.color.black}/>
                  </div>
                  <span style={{ fontFamily:P.font.body, fontWeight:700, fontSize:14,
                    color:P.color.black, flex:1, textAlign:'left' }}>{m.label}</span>
                  {tradeCat===id && <Icon name="check" size={18} color={P.color.green}/>}
                </button>
              );
            })}
          </div>
          <div style={{ backgroundColor:P.color.stone, borderRadius:P.r.lg, padding:'12px 16px', marginBottom:14 }}>
            <p style={{ fontFamily:P.font.body, fontSize:12, color:P.color.ink2, margin:0 }}>
              ${Math.round(budget/4)} from <strong>{meta.label}</strong> → <strong>{CAT_META[tradeCat]?.label}</strong>
            </p>
          </div>
          <PBtn label={`Trade to ${CAT_META[tradeCat]?.label}`}
            onClick={()=>{ setSheet(null); showToast(`Traded to ${CAT_META[tradeCat]?.label} ✓`); }}/>
        </div>
      </BottomSheet>

      {/* ── TRANSACTION DETAIL ── */}
      <BottomSheet open={!!txnSel} onClose={()=>setTxnSel(null)} title="Transaction" height="52%">
        {txnSel && (
          <div style={{ padding:'20px 24px' }}>
            <div style={{ display:'flex', alignItems:'center', gap:14, marginBottom:20 }}>
              <div style={{ width:56, height:56, borderRadius:P.r.lg,
                backgroundColor:typeBg(txnSel.type), display:'flex',
                alignItems:'center', justifyContent:'center' }}>
                <Icon name={meta.icon} size={28} color={typeColor(txnSel.type)} />
              </div>
              <div style={{ flex:1 }}>
                <p style={{ fontFamily:P.font.body, fontWeight:700, fontSize:16,
                  color:P.color.black, margin:'0 0 2px' }}>{txnSel.name}</p>
                <p style={{ fontFamily:P.font.body, fontSize:12, color:P.color.ink3, margin:0 }}>
                  {txnSel.date}
                </p>
              </div>
              <p style={{ fontFamily:P.font.display, fontWeight:700, fontSize:28,
                color:P.color.black, margin:0 }}>${txnSel.amount.toFixed(2)}</p>
            </div>
            <p style={{ fontFamily:P.font.body, fontWeight:700, fontSize:13,
              color:P.color.ink3, margin:'0 0 10px' }}>Re-label alignment:</p>
            <div style={{ display:'flex', gap:8, marginBottom:20 }}>
              {['aligned','neutral','impulsive'].map(t=>(
                <button key={t} onClick={()=>{
                  setTxns(prev=>prev.map(x=>x.id===txnSel.id?{...x,type:t}:x));
                  setTxnSel(prev=>({...prev,type:t}));
                  showToast(`Marked as ${t}`);
                }}
                  style={{ flex:1, height:40, borderRadius:P.r.pill,
                    backgroundColor:txnSel.type===t?P.color[t]:P.color.stone,
                    color:txnSel.type===t?P.color.white:P.color.ink2,
                    border:'none', cursor:'pointer', fontFamily:P.font.body,
                    fontSize:12, fontWeight:700, textTransform:'capitalize',
                    transition:'all .15s' }}>
                  {t}
                </button>
              ))}
            </div>
            <PBtn label="Done" onClick={()=>setTxnSel(null)} variant="secondary"/>
          </div>
        )}
      </BottomSheet>

      <Toast msg={toast} visible={toastVis}/>
    </div>
  );
}

// ─── SPIRAL STREAK BOARD ─────────────────────────────────────────
const STREAK_DATA = Array.from({length:30},(_, i)=>({
  day:i+1, done:i<5, points:i<5?[10,12,8,15,10][i]:0,
  label:['Mon','Tue','Wed','Thu','Fri','Sat','Sun'][i%7]
}));

function SpiralBoard({ streak, currentDay, W=320, H=380 }) {
  const cols=5, padX=38, padY=40;
  const rows=Math.ceil(streak.length/cols);
  const cellW=(W-padX*2)/(cols-1);
  const cellH=(H-padY*2)/(rows-1);
  const pts=[];
  for(let r=0;r<rows;r++){
    const rowItems=Math.min(cols,streak.length-r*cols);
    const rev=r%2===1;
    for(let c=0;c<rowItems;c++){
      const ci=rev?(rowItems-1-c):c;
      pts.push({x:padX+ci*cellW, y:padY+r*cellH, idx:r*cols+c});
    }
  }
  const doneCount=streak.filter(d=>d.done).length;
  const pathD=pts.map((p,i)=>`${i===0?'M':'L'} ${p.x} ${p.y}`).join(' ');
  const donePts=pts.filter(p=>p.idx<doneCount);
  const doneD=donePts.length>1?donePts.map((p,i)=>`${i===0?'M':'L'} ${p.x} ${p.y}`).join(' '):'';

  const curPt=pts.find(p=>p.idx===doneCount); // current (today's) node

  return (
    <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`}>
      {/* Dashed road */}
      <path d={pathD} fill="none" stroke={P.color.border}
        strokeWidth="3" strokeDasharray="5 5" strokeLinecap="round"/>
      {/* Completed road */}
      {doneD && <path d={doneD} fill="none" stroke={P.color.green}
        strokeWidth="5" strokeLinecap="round" strokeLinejoin="round"/>}

      {/* Nodes */}
      {pts.map((p,i)=>{
        const s=streak[p.idx]; if(!s) return null;
        const isToday=p.idx===doneCount;
        const done=s.done;
        const nr=isToday?20:15;
        return (
          <g key={i} transform={`translate(${p.x},${p.y})`}>
            {isToday && <circle r={30} fill={P.color.green} opacity=".1"/>}
            <ellipse rx={nr+1} ry={5} cy={nr+2} fill="rgba(0,0,0,.1)"/>
            <circle r={nr}
              fill={done?P.color.green:isToday?P.color.sand:P.color.stone}
              stroke={done?'#0A3D1F':isToday?'#C4A44A':P.color.border}
              strokeWidth={isToday?2.5:1.5}/>
            {done
              ? <path d="M-5 0l3.5 3.5 7-7" fill="none" stroke="white"
                  strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              : <text x="0" y="5" textAnchor="middle"
                  fontFamily={P.font.ui} fontSize={isToday?11:9} fontWeight="700"
                  fill={isToday?P.color.black:P.color.ink3}>{s.day}</text>
            }
          </g>
        );
      })}

      {/* Real pig mascot at current position */}
      {curPt && (
        <foreignObject x={curPt.x-26} y={curPt.y-62} width="52" height="52">
          <img xmlns="http://www.w3.org/1999/xhtml"
            src="pig.png" width="52" height="38"
            style={{objectFit:'contain',display:'block'}}/>
        </foreignObject>
      )}
    </svg>
  );
}

function ScreenChallengeDetailV2({ nav }) {
  const [accepted, setAccepted] = React.useState(false);
  const [showReward, setShowReward] = React.useState(false);
  const done=STREAK_DATA.filter(d=>d.done).length;
  const totalPts=STREAK_DATA.reduce((s,d)=>s+d.points,0);
  const totalDays=30;

  return (
    <div style={{ flex:1, backgroundColor:P.color.white, display:'flex',
      flexDirection:'column', position:'relative', overflow:'hidden' }}>
      <StatusBar light />
      <div style={{ position:'relative', height:190, flexShrink:0,
        background:`linear-gradient(160deg,${P.color.green} 0%,#1a6b3c 100%)` }}>
        <div style={{ position:'absolute', inset:0, opacity:.08,
          backgroundImage:'repeating-linear-gradient(45deg,white 0,white 1px,transparent 0,transparent 50%)',
          backgroundSize:'18px 18px' }}/>
        <NavBar transparent title="" onBack={()=>nav('home')} light />
        <div style={{ position:'absolute', bottom:20, left:24, right:24,
          display:'flex', alignItems:'flex-end', justifyContent:'space-between' }}>
          <div>
            <span style={{ fontFamily:P.font.body, fontSize:10, fontWeight:700,
              color:'rgba(255,255,255,.6)', textTransform:'uppercase', letterSpacing:1.2 }}>
              Day {done} of {totalDays}
            </span>
            <h1 style={{ fontFamily:P.font.display, fontWeight:700, fontSize:24,
              color:P.color.white, margin:'4px 0 4px', letterSpacing:'-.4px', lineHeight:1.1 }}>
              No-Spend Challenge
            </h1>
            <p style={{ fontFamily:P.font.body, fontSize:12,
              color:'rgba(255,255,255,.75)', margin:0 }}>
              Zero non-essential purchases for 30 days
            </p>
          </div>
          <PigMascot size={72} style={{ flexShrink:0 }} />
        </div>
      </div>

      <div style={{ flex:1, overflowY:'auto', backgroundColor:P.color.cream }}>
        {/* Stats */}
        <div style={{ display:'flex', gap:10, padding:'14px 20px 0' }}>
          {[
            {label:'Days Done', value:done,       icon:'check', c:P.color.green  },
            {label:'Points',    value:totalPts,   icon:'star',  c:P.color.neutral},
            {label:'Days Left', value:totalDays-done,icon:'bell',c:P.color.ink3  },
          ].map(s=>(
            <div key={s.label} style={{ flex:1, backgroundColor:P.color.white,
              borderRadius:P.r.lg, padding:'12px 8px', textAlign:'center', boxShadow:P.shadow.sm }}>
              <div style={{ width:28, height:28, borderRadius:'50%', backgroundColor:P.color.pinkLight,
                display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto 4px' }}>
                <Icon name={s.icon} size={13} color={s.c}/>
              </div>
              <p style={{ fontFamily:P.font.display, fontWeight:700, fontSize:20,
                color:P.color.black, margin:'0 0 1px' }}>{s.value}</p>
              <p style={{ fontFamily:P.font.body, fontSize:9, color:P.color.ink3, margin:0 }}>{s.label}</p>
            </div>
          ))}
        </div>

        {/* Spiral board */}
        <div style={{ margin:'12px 20px 0', backgroundColor:P.color.white,
          borderRadius:P.r.xl, padding:'18px 12px 12px', boxShadow:P.shadow.sm }}>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:8 }}>
            <h3 style={{ fontFamily:P.font.display, fontWeight:700, fontSize:16,
              color:P.color.black, margin:0 }}>Your Streak Path</h3>
            <span style={{ fontFamily:P.font.body, fontSize:11, fontWeight:700,
              color:P.color.green, backgroundColor:P.color.greenLight,
              borderRadius:P.r.pill, padding:'3px 10px' }}>{done}/{totalDays}</span>
          </div>
          <div style={{ display:'flex', justifyContent:'center' }}>
            <SpiralBoard streak={STREAK_DATA} currentDay={done+1} W={312} H={350} />
          </div>
        </div>

        {/* Today's action */}
        <div style={{ margin:'12px 20px 0', backgroundColor:P.color.white,
          borderRadius:P.r.xl, padding:'18px', boxShadow:P.shadow.sm }}>
          <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:14 }}>
            <div style={{ width:48, height:48, borderRadius:P.r.lg, backgroundColor:P.color.pinkLight,
              display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
              <PigMascot size={42} />
            </div>
            <div>
              <p style={{ fontFamily:P.font.display, fontWeight:700, fontSize:15,
                color:P.color.black, margin:'0 0 2px' }}>
                {accepted ? "Great job! Day logged ✓" : "Complete today's challenge"}
              </p>
              <p style={{ fontFamily:P.font.body, fontSize:12, color:P.color.ink3, margin:0 }}>
                {accepted ? `+10 pts · ${done+1} days done` : 'No non-essential spending today'}
              </p>
            </div>
          </div>
          {!accepted ? (
            <div style={{ display:'flex', gap:10 }}>
              <PBtn label="Skip" variant="secondary" style={{height:42,fontSize:14}} onClick={()=>{}}/>
              <PBtn label="Complete ✓" style={{height:42,fontSize:14}} onClick={()=>setAccepted(true)}/>
            </div>
          ) : (
            <div style={{ backgroundColor:P.color.greenLight, borderRadius:P.r.md,
              padding:'10px', textAlign:'center' }}>
              <p style={{ fontFamily:P.font.body, fontWeight:700, fontSize:13,
                color:P.color.green, margin:0 }}>See you tomorrow! 🐷</p>
            </div>
          )}
        </div>

        {/* Reward ticket */}
        <div style={{ margin:'12px 20px' }}>
          <div style={{ backgroundColor:P.color.sand, borderRadius:P.r.xl,
            overflow:'hidden', display:'flex', boxShadow:P.shadow.md, cursor:'pointer' }}
            onClick={()=>setShowReward(true)}>
            <div style={{ flex:1, padding:'18px 18px' }}>
              <span style={{ fontFamily:P.font.body, fontSize:9, fontWeight:700,
                color:P.color.ink3, textTransform:'uppercase', letterSpacing:1,
                display:'block', marginBottom:4 }}>Complete 30 days</span>
              <h3 style={{ fontFamily:P.font.display, fontWeight:700, fontSize:22,
                color:P.color.black, margin:'0 0 6px', lineHeight:1.1 }}>
                Broadway Show
              </h3>
              <span style={{ fontFamily:P.font.body, fontSize:10, fontWeight:700,
                color:P.color.black, backgroundColor:'rgba(255,255,255,.6)',
                borderRadius:P.r.pill, padding:'3px 10px' }}>Apr 18–25</span>
            </div>
            <div style={{ width:1, margin:'14px 0',
              backgroundImage:`repeating-linear-gradient(to bottom,${P.color.ink4} 0,${P.color.ink4} 5px,transparent 5px,transparent 11px)`,
              opacity:.25 }}/>
            {/* Notch cutouts */}
            <div style={{ position:'relative' }}>
              <div style={{ position:'absolute', left:-8, top:-8, width:16, height:16,
                borderRadius:'50%', backgroundColor:P.color.cream }}/>
              <div style={{ position:'absolute', left:-8, bottom:-8, width:16, height:16,
                borderRadius:'50%', backgroundColor:P.color.cream }}/>
            </div>
            <div style={{ width:68, display:'flex', flexDirection:'column',
              alignItems:'center', justifyContent:'center', gap:6, padding:'16px 8px' }}>
              <div style={{ width:28, height:28, borderRadius:'50%',
                backgroundColor:done>=30?P.color.green:'rgba(255,255,255,.5)',
                display:'flex', alignItems:'center', justifyContent:'center' }}>
                <Icon name={done>=30?'check':'lock'} size={13}
                  color={done>=30?P.color.white:P.color.ink4}/>
              </div>
              <span style={{ fontFamily:P.font.display, fontWeight:700, fontSize:13,
                color:P.color.ink2 }}>{Math.round((done/30)*100)}%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Reward sheet */}
      <BottomSheet open={showReward} onClose={()=>setShowReward(false)} title="Your Reward" height="52%">
        <div style={{ padding:'24px', textAlign:'center' }}>
          <div style={{ width:100, height:72, margin:'0 auto 14px',
            display:'flex', alignItems:'center', justifyContent:'center' }}>
            <PigMascot size={100} />
          </div>
          <h2 style={{ fontFamily:P.font.display, fontWeight:700, fontSize:22,
            color:P.color.black, margin:'0 0 6px' }}>Broadway Show 🎭</h2>
          <p style={{ fontFamily:P.font.body, fontSize:13, color:P.color.ink3, margin:'0 0 8px' }}>
            Complete 30 days to unlock
          </p>
          <p style={{ fontFamily:P.font.display, fontWeight:700, fontSize:18,
            color:P.color.green, margin:'0 0 16px' }}>{done}/30 days</p>
          <ProgressBar value={done} max={30} color={P.color.green}/>
          <p style={{ fontFamily:P.font.body, fontSize:12, color:P.color.ink3, margin:'8px 0 16px' }}>
            {30-done} days remaining
          </p>
          <PBtn label="Keep Going!" onClick={()=>setShowReward(false)}/>
        </div>
      </BottomSheet>
    </div>
  );
}

Object.assign(window, {
  BottomSheet, Toast, NavBar,
  LogTransactionSheet,
  ScreenChallengesList,
  ScreenCategoryDetail,
  ScreenChallengeDetailV2,
  SpiralBoard, STREAK_DATA, TRANSACTIONS,
  ALL_CHALLENGES
});
