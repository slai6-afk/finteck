
// ─── MAIN APP SCREENS v2 ─────────────────────────────────────────

const TODAY_TASKS = [
  { id:1, name:'Dine Out',    avg:'$32', timesLeft:2, total:3, type:'aligned',   cat:'dining'        },
  { id:2, name:'Grocery',     avg:'$45', timesLeft:1, total:2, type:'neutral',   cat:'grocery'       },
  { id:3, name:'Coffee',      avg:'$6',  timesLeft:3, total:5, type:'neutral',   cat:'coffee'        },
  { id:4, name:'Transport',   avg:'$12', timesLeft:4, total:7, type:'aligned',   cat:'transport'     },
  { id:5, name:'Shopping',    avg:'$65', timesLeft:1, total:2, type:'impulsive', cat:'shopping'      },
  { id:6, name:'Fitness',     avg:'$25', timesLeft:2, total:3, type:'aligned',   cat:'fitness'       },
];

const CHALLENGES = [
  { day:1, title:'Caffeine Sober Day',  sub:'Skip the $7 coffee — stay hydrated instead', cat:'coffee',  color:P.color.green },
  { day:2, title:'Cook at Home',        sub:'Save $30+ by skipping takeout tonight',       cat:'dining',  color:'#5B3A29' },
  { day:3, title:'No Impulse Buys',     sub:'Avoid all non-essential purchases today',     cat:'shopping',color:P.color.black },
];

const MONTHLY_CATS = [
  { id:'dining',    name:'Dining Out',    amount:980,  budget:1200, type:'aligned'   },
  { id:'transport', name:'Transport',     amount:300,  budget:400,  type:'aligned'   },
  { id:'shopping',  name:'Shopping',      amount:420,  budget:500,  type:'neutral'   },
  { id:'coffee',    name:'Coffee',        amount:140,  budget:100,  type:'impulsive' },
  { id:'fitness',   name:'Fitness',       amount:200,  budget:250,  type:'aligned'   },
  { id:'rent',      name:'Rent',          amount:2500, budget:2500, type:'aligned'   },
];

const ROUTINE_GOALS = [
  { id:1, cat:'rent',          name:'Rent',          amount:2500, plan:'Monthly', priority:1 },
  { id:2, cat:'fitness',       name:'Fitness',       amount:225,  plan:'Weekly',  priority:2 },
  { id:3, cat:'social',        name:'Social Events', amount:142,  plan:'Weekly',  priority:3 },
  { id:4, cat:'education',     name:'Workshop',      amount:50,   plan:'Weekly',  priority:4 },
  { id:5, cat:'dining',        name:'Dine Out',      amount:32,   plan:'Weekly',  priority:5 },
  { id:6, cat:'coffee',        name:'Coffee',        amount:30,   plan:'Weekly',  priority:6 },
];

const SAVE_GOALS = [
  { id:1, cat:'entertainment', name:'Camera Fund',    current:420,  target:1200, color:P.color.green  },
  { id:2, cat:'health',        name:'Emergency Fund', current:3200, target:6000, color:P.color.neutral },
  { id:3, cat:'travel',        name:'Japan Trip',     current:800,  target:3500, color:P.color.black  },
  { id:4, cat:'education',     name:'New Laptop',     current:290,  target:1400, color:'#7B5EA7'      },
];

const NOTIFICATIONS = [
  { id:1, type:'warning', title:'Dine Out',      sub:'2 times left this week',  cat:'dining',   time:'2m ago',  amount:'$34.5' },
  { id:2, type:'info',    title:'Weekly Report', sub:'Your spending was 12% better than last week', cat:'education', time:'1h ago', amount:null },
  { id:3, type:'alert',   title:'Coffee Budget', sub:'You\'ve exceeded your coffee budget',  cat:'coffee',   time:'3h ago',  amount:null },
  { id:4, type:'success', title:'Challenge Done',sub:'Day 2 complete — you earned a reward!',cat:'award',    time:'5h ago',  amount:null },
  { id:5, type:'info',    title:'Shopping',      sub:'1 time left this month',   cat:'shopping', time:'1d ago',  amount:'$65' },
];

// ── Home Screen ───────────────────────────────────────────────────
function ScreenHome({ onTab, nav, navCat, navLog }) {
  const challenge = CHALLENGES[0];
  const today = new Date();
  const dayStr = today.toLocaleDateString('en-US',{weekday:'long',month:'short',day:'numeric'});

  return (
    <div style={{ flex:1, backgroundColor:P.color.cream, overflowY:'auto',
      paddingBottom:90, position:'relative' }}>
      <StatusBar />
      <div style={{ padding:'58px 24px 16px',
        display:'flex', justifyContent:'space-between', alignItems:'flex-start' }}>
        <div>
          <p style={{ fontFamily:P.font.body, fontSize:11, color:P.color.ink3,
            margin:'0 0 2px', fontWeight:700, letterSpacing:.8, textTransform:'uppercase' }}>
            Good morning
          </p>
          <h1 style={{ fontFamily:P.font.display, fontWeight:700, fontSize:26,
            color:P.color.black, margin:0, letterSpacing:'-.4px' }}>
            Day {challenge.day} Challenge
          </h1>
        </div>
        <button onClick={() => nav('notification')}
          style={{ width:42, height:42, borderRadius:'50%',
            backgroundColor:P.color.white, border:`1px solid ${P.color.border}`,
            display:'flex', alignItems:'center', justifyContent:'center',
            cursor:'pointer', position:'relative' }}>
          <Icon name="bell" size={20} color={P.color.black} />
          <div style={{ position:'absolute', top:9, right:9, width:8, height:8,
            borderRadius:'50%', backgroundColor:P.color.pink,
            border:`2px solid ${P.color.white}` }}/>
        </button>
      </div>

      <div style={{ margin:'0 24px 20px', borderRadius:P.r.xl, overflow:'hidden',
        backgroundColor:challenge.color, boxShadow:P.shadow.md, cursor:'pointer' }}
        onClick={() => nav('challengeDetail')}>
        <div style={{ padding:'24px 24px 20px' }}>
          <span style={{ fontFamily:P.font.body, fontSize:10, fontWeight:700,
            color:'rgba(255,255,255,.6)', letterSpacing:1.2, textTransform:'uppercase' }}>
            Today's Challenge — Tap to view
          </span>
          <div style={{ display:'flex', alignItems:'center', gap:16, margin:'14px 0 12px' }}>
            <div style={{ width:56, height:56, borderRadius:P.r.lg,
              backgroundColor:'rgba(255,255,255,.15)', display:'flex',
              alignItems:'center', justifyContent:'center', flexShrink:0 }}>
              <Icon name={CAT_META[challenge.cat]?.icon||'coffee'} size={28} color="white" />
            </div>
            <div>
              <h2 style={{ fontFamily:P.font.display, fontWeight:700, fontSize:22,
                color:P.color.white, margin:'0 0 4px', letterSpacing:'-.3px' }}>
                {challenge.title}
              </h2>
              <p style={{ fontFamily:P.font.body, fontSize:12, color:'rgba(255,255,255,.75)',
                margin:0 }}>{challenge.sub}</p>
            </div>
          </div>
          <div style={{ display:'flex', gap:8 }}>
            <button style={{ flex:1, height:38, borderRadius:P.r.pill,
              backgroundColor:'rgba(255,255,255,.18)', border:'1.5px solid rgba(255,255,255,.35)',
              color:P.color.white, fontFamily:P.font.body, fontSize:13, fontWeight:700,
              cursor:'pointer' }}>Skip</button>
            <button style={{ flex:2, height:38, borderRadius:P.r.pill,
              backgroundColor:P.color.white, border:'none',
              color:challenge.color, fontFamily:P.font.body, fontSize:13, fontWeight:700,
              cursor:'pointer' }}>Accept Challenge ✓</button>
          </div>
        </div>
      </div>

      <div style={{ padding:'0 24px' }}>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'baseline', marginBottom:12 }}>
          <h3 style={{ fontFamily:P.font.display, fontWeight:700, fontSize:18,
            color:P.color.black, margin:0, letterSpacing:'-.2px' }}>{dayStr}</h3>
          <button onClick={()=>nav('challengesList')}
            style={{ background:'none', border:'none', cursor:'pointer',
              fontFamily:P.font.body, fontSize:12, fontWeight:700, color:P.color.green }}>
            All Challenges →
          </button>
        </div>
        <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
          {TODAY_TASKS.map(task => (
            <div key={task.id} style={{ backgroundColor:P.color.white, borderRadius:P.r.lg,
              padding:'14px 16px', display:'flex', alignItems:'center', gap:14,
              boxShadow:P.shadow.sm, cursor:'pointer' }}
              onClick={() => navCat && navCat(task.cat)}>
              <CatIcon id={task.cat} size={46}
                bg={task.type==='aligned'?P.color.greenLight:task.type==='impulsive'?P.color.impulsiveTint:P.color.sandLight}
                color={task.type==='aligned'?P.color.green:task.type==='impulsive'?P.color.impulsive:P.color.neutral} />
              <div style={{ flex:1 }}>
                <p style={{ fontFamily:P.font.body, fontWeight:700, fontSize:14,
                  color:P.color.black, margin:'0 0 1px' }}>{task.name}</p>
                <p style={{ fontFamily:P.font.body, fontSize:12, color:P.color.ink3, margin:0 }}>
                  {task.avg} avg.
                </p>
              </div>
              <div style={{ display:'flex', alignItems:'center', gap:6 }}>
                <span style={{ fontFamily:P.font.display, fontWeight:700, fontSize:22,
                  color: task.timesLeft<=1?P.color.impulsive:P.color.black }}>{task.timesLeft}</span>
                <span style={{ fontFamily:P.font.body, fontSize:11, color:P.color.ink3 }}>left</span>
                <Icon name="chevRight" size={18} color={P.color.ink4} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Challenge Detail ──────────────────────────────────────────────
function ScreenChallengeDetail({ nav }) {
  const challenge = CHALLENGES[0];
  const steps = [false,false,true,true,true]; // completed steps (right to left visual)

  return (
    <div style={{ flex:1, backgroundColor:P.color.white, display:'flex',
      flexDirection:'column', position:'relative', overflowY:'auto' }}>
      <StatusBar />
      <BackBtn onClick={() => nav('home')} />

      {/* Hero image */}
      <div style={{ margin:'50px 24px 0', borderRadius:P.r.xl, overflow:'hidden',
        backgroundColor:challenge.color, height:160, position:'relative',
        display:'flex', alignItems:'flex-end', padding:'20px 24px' }}>
        <div style={{ position:'absolute', top:0, left:0, right:0, bottom:0,
          opacity:.15, backgroundImage:'repeating-linear-gradient(45deg,white 0,white 1px,transparent 0,transparent 50%)',
          backgroundSize:'20px 20px' }}/>
        <div style={{ position:'relative', zIndex:1 }}>
          <h2 style={{ fontFamily:P.font.display, fontWeight:700, fontSize:26,
            color:P.color.white, margin:'0 0 4px', letterSpacing:'-.3px' }}>
            {challenge.title}
          </h2>
          <p style={{ fontFamily:P.font.body, fontSize:13, color:'rgba(255,255,255,.8)', margin:0 }}>
            {challenge.sub}
          </p>
        </div>
      </div>

      {/* Main panel */}
      <div style={{ margin:'16px 0 0', backgroundColor:P.color.stone, flex:1,
        borderRadius:`${P.r.xl}px ${P.r.xl}px 0 0`, padding:'24px 24px 100px' }}>

        {/* Progress stones — stepping stones visual */}
        <div style={{ backgroundColor:P.color.white, borderRadius:P.r.xl,
          padding:'24px', marginBottom:16, boxShadow:P.shadow.sm, position:'relative',
          overflow:'hidden', minHeight:220 }}>
          <p style={{ fontFamily:P.font.body, fontSize:11, fontWeight:700,
            color:P.color.ink3, textTransform:'uppercase', letterSpacing:.8, margin:'0 0 20px' }}>
            Challenge Progress — Day {challenge.day} of 5
          </p>

          {/* Stepping stones in a diagonal path */}
          <div style={{ position:'relative', height:140 }}>
            {[{x:16,y:100,done:false},{x:60,y:75,done:false},{x:110,y:55,done:true},
              {x:165,y:42,done:true},{x:220,y:35,done:true}].map((s,i)=>(
              <div key={i} style={{ position:'absolute', left:s.x, top:s.y }}>
                <div style={{ width:44, height:18, borderRadius:'50%',
                  backgroundColor: s.done ? P.color.sand : P.color.border,
                  boxShadow: s.done ? '0 4px 12px rgba(233,218,171,.5)':'0 2px 4px rgba(0,0,0,.1)',
                  transition:'all .3s' }}/>
                <div style={{ width:44, height:28, borderRadius:'50%',
                  backgroundColor: s.done ? '#D4B86A' : P.color.stone,
                  marginTop:-4, boxShadow: s.done ? 'inset 0 2px 4px rgba(0,0,0,.15)':'inset 0 2px 4px rgba(0,0,0,.05)',
                  transition:'all .3s' }}/>
              </div>
            ))}
          </div>

          {/* Pig with speech bubble */}
          <div style={{ position:'absolute', right:16, bottom:16, display:'flex',
            alignItems:'flex-end', gap:8 }}>
            <div style={{ backgroundColor:P.color.stone, borderRadius:P.r.lg,
              padding:'10px 14px', maxWidth:180, position:'relative' }}>
              <p style={{ fontFamily:P.font.body, fontWeight:700, fontSize:12,
                color:P.color.black, margin:0, lineHeight:1.4 }}>
                OMG, look at you!<br/>Such a great work!
              </p>
              {/* Tail */}
              <div style={{ position:'absolute', bottom:-8, right:20, width:0, height:0,
                borderLeft:'8px solid transparent', borderRight:'8px solid transparent',
                borderTop:`8px solid ${P.color.stone}` }}/>
            </div>
            <PigMascot size={80} />
          </div>
        </div>

        {/* Reward ticket */}
        <div style={{ marginBottom:12 }}>
          <p style={{ fontFamily:P.font.display, fontWeight:700, fontSize:16,
            color:P.color.black, margin:'0 0 12px', letterSpacing:'-.2px' }}>
            Unlock Your Reward
          </p>
          <div style={{ backgroundColor:P.color.sand, borderRadius:P.r.xl,
            overflow:'hidden', display:'flex', boxShadow:P.shadow.md, position:'relative' }}>
            {/* Left part */}
            <div style={{ flex:1, padding:'22px 20px' }}>
              <h3 style={{ fontFamily:P.font.display, fontWeight:700, fontSize:28,
                color:P.color.black, margin:'0 0 8px', letterSpacing:'-.4px', lineHeight:1.1 }}>
                Broadway<br/>Show
              </h3>
              <p style={{ fontFamily:P.font.body, fontSize:12, color:P.color.ink3, margin:'0 0 12px' }}>
                Complete 5-day challenge to unlock
              </p>
              <span style={{ fontFamily:P.font.body, fontSize:11, fontWeight:700,
                color:P.color.black, backgroundColor:'rgba(255,255,255,.6)',
                borderRadius:P.r.pill, padding:'4px 12px' }}>4.18 – 4.25</span>
            </div>
            {/* Dashed divider */}
            <div style={{ width:1, backgroundImage:`repeating-linear-gradient(to bottom, ${P.color.black} 0, ${P.color.black} 6px, transparent 6px, transparent 12px)`,
              margin:'16px 0', opacity:.2 }}/>
            {/* Right stub */}
            <div style={{ width:72, display:'flex', flexDirection:'column',
              alignItems:'center', justifyContent:'center', gap:12, padding:'16px 12px' }}>
              <div style={{ width:24, height:24, borderRadius:'50%',
                backgroundColor:'rgba(255,255,255,.5)', boxShadow:'inset 0 1px 3px rgba(0,0,0,.1)' }}/>
              <Icon name="gift" size={22} color={P.color.black} />
              <p style={{ fontFamily:P.font.ui, fontSize:9, fontWeight:700,
                color:P.color.ink3, textAlign:'center', margin:0,
                writingMode:'vertical-rl', transform:'rotate(180deg)', letterSpacing:1 }}>
                REWARD
              </p>
            </div>
          </div>
        </div>

        {/* Challenge stats */}
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:10 }}>
          <div style={{ backgroundColor:P.color.white, borderRadius:P.r.lg, padding:16, boxShadow:P.shadow.sm }}>
            <p style={{ fontFamily:P.font.body, fontSize:11, color:P.color.ink3, margin:'0 0 2px', fontWeight:700 }}>Saved So Far</p>
            <p style={{ fontFamily:P.font.display, fontWeight:700, fontSize:22, color:P.color.green, margin:0 }}>$21</p>
          </div>
          <div style={{ backgroundColor:P.color.white, borderRadius:P.r.lg, padding:16, boxShadow:P.shadow.sm }}>
            <p style={{ fontFamily:P.font.body, fontSize:11, color:P.color.ink3, margin:'0 0 2px', fontWeight:700 }}>Days Left</p>
            <p style={{ fontFamily:P.font.display, fontWeight:700, fontSize:22, color:P.color.black, margin:0 }}>2 days</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Notification Screen ───────────────────────────────────────────
function ScreenNotification({ nav }) {
  const [dismissed, setDismissed] = React.useState([]);

  return (
    <div style={{ flex:1, backgroundColor:P.color.white, display:'flex',
      flexDirection:'column', position:'relative' }}>
      <StatusBar />
      {/* Floating banner (like Figma) */}
      <div style={{ margin:'50px 16px 0', borderRadius:P.r.lg,
        backgroundColor:P.color.black, padding:'14px 20px',
        display:'flex', alignItems:'center', justifyContent:'space-between',
        boxShadow:P.shadow.lg }}>
        <div>
          <p style={{ fontFamily:P.font.body, fontWeight:700, fontSize:16,
            color:P.color.white, margin:'0 0 1px' }}>Dine Out · $34.5</p>
          <p style={{ fontFamily:P.font.body, fontSize:13, color:'rgba(255,255,255,.6)', margin:0 }}>
            2 times left this week
          </p>
        </div>
        <div style={{ width:40, height:40, borderRadius:P.r.md,
          backgroundColor:'rgba(255,255,255,.12)', display:'flex',
          alignItems:'center', justifyContent:'center' }}>
          <Icon name="dining" size={20} color={P.color.white} />
        </div>
      </div>

      <div style={{ padding:'20px 24px 8px' }}>
        <h1 style={{ fontFamily:P.font.display, fontWeight:700, fontSize:24,
          color:P.color.black, margin:0, letterSpacing:'-.3px' }}>Notifications</h1>
      </div>

      <div style={{ flex:1, overflowY:'auto', padding:'0 16px 40px' }}>
        {NOTIFICATIONS.filter(n => !dismissed.includes(n.id)).map(n => {
          const typeColor = n.type==='alert'?P.color.impulsive : n.type==='success'?P.color.green : n.type==='warning'?P.color.neutral : P.color.ink3;
          const typeBg    = n.type==='alert'?P.color.impulsiveTint : n.type==='success'?P.color.greenLight : n.type==='warning'?P.color.neutralTint : P.color.stone;
          const iconName  = CAT_META[n.cat]?.icon || 'bell';
          return (
            <div key={n.id} style={{ backgroundColor:P.color.white, borderRadius:P.r.lg,
              padding:'14px 16px', marginBottom:10, display:'flex',
              alignItems:'center', gap:14, boxShadow:P.shadow.sm, position:'relative' }}>
              <div style={{ width:46, height:46, borderRadius:P.r.md,
                backgroundColor:typeBg, display:'flex', alignItems:'center',
                justifyContent:'center', flexShrink:0 }}>
                <Icon name={iconName} size={22} color={typeColor} />
              </div>
              <div style={{ flex:1 }}>
                <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:2 }}>
                  <p style={{ fontFamily:P.font.body, fontWeight:700, fontSize:14,
                    color:P.color.black, margin:0 }}>{n.title}</p>
                  {n.amount && (
                    <span style={{ fontFamily:P.font.ui, fontSize:11, fontWeight:600,
                      color:typeColor, backgroundColor:typeBg, borderRadius:P.r.pill,
                      padding:'1px 8px' }}>{n.amount}</span>
                  )}
                </div>
                <p style={{ fontFamily:P.font.body, fontSize:12, color:P.color.ink3, margin:0 }}>
                  {n.sub}
                </p>
              </div>
              <div style={{ display:'flex', flexDirection:'column', alignItems:'flex-end', gap:6 }}>
                <span style={{ fontFamily:P.font.body, fontSize:10, color:P.color.ink4 }}>{n.time}</span>
                <button onClick={() => setDismissed(d=>[...d,n.id])}
                  style={{ background:'none', border:'none', cursor:'pointer', padding:0,
                    color:P.color.ink4 }}>
                  <Icon name="close" size={14} color={P.color.ink4} />
                </button>
              </div>
            </div>
          );
        })}
        {dismissed.length > 0 && (
          <button onClick={() => setDismissed([])}
            style={{ width:'100%', padding:'10px', background:'none', border:'none',
              cursor:'pointer', fontFamily:P.font.body, fontSize:12, color:P.color.ink4,
              textDecoration:'underline' }}>
            Show {dismissed.length} dismissed
          </button>
        )}
      </div>
      <BackBtn onClick={() => nav('home')} />
      <HomeIndicator />
    </div>
  );
}

// ── Spending Screen ───────────────────────────────────────────────
function ScreenSpending({ onTab, navCat }) {
  const totalBudget = MONTHLY_CATS.reduce((a,c)=>a+c.budget,0);
  const totalSpent  = MONTHLY_CATS.reduce((a,c)=>a+c.amount,0);
  const donutData   = MONTHLY_CATS.slice(0,5);
  const donutTotal  = donutData.reduce((a,c)=>a+c.amount,0);
  const colors      = [P.color.green,P.color.neutral,P.color.impulsive,'#5B8FA8','#7B6BAA'];
  const r=68, cx=80, cy=80, circ=2*Math.PI*r;
  let offset=0;
  const slices = donutData.map((c,i)=>{
    const pct=c.amount/donutTotal, dash=pct*circ-2, gap=circ-dash;
    const s={...c, dash, gap, offset, color:colors[i]};
    offset+=pct*circ; return s;
  });

  return (
    <div style={{ flex:1, backgroundColor:P.color.cream, overflowY:'auto', paddingBottom:90 }}>
      <StatusBar />
      <div style={{ padding:'56px 24px 16px' }}>
        <p style={{ fontFamily:P.font.body, fontSize:11, color:P.color.ink3, margin:'0 0 2px',
          fontWeight:700, textTransform:'uppercase', letterSpacing:.8 }}>Monthly Report</p>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
          <h1 style={{ fontFamily:P.font.display, fontWeight:700, fontSize:24,
            color:P.color.black, margin:0, letterSpacing:'-.4px' }}>April 2026</h1>
          <button style={{ display:'flex', alignItems:'center', gap:6, background:'none',
            border:`1px solid ${P.color.border}`, borderRadius:P.r.pill,
            padding:'6px 14px', cursor:'pointer' }}>
            <Icon name="filter" size={14} color={P.color.ink2} />
            <span style={{ fontFamily:P.font.body, fontSize:12, color:P.color.ink2, fontWeight:700 }}>Filter</span>
          </button>
        </div>
      </div>

      {/* Total */}
      <div style={{ margin:'0 24px 14px', backgroundColor:P.color.white,
        borderRadius:P.r.xl, padding:20, boxShadow:P.shadow.sm }}>
        <p style={{ fontFamily:P.font.body, fontSize:11, color:P.color.ink3,
          margin:'0 0 4px', fontWeight:700, textTransform:'uppercase', letterSpacing:.6 }}>
          Total Spending
        </p>
        <div style={{ display:'flex', alignItems:'baseline', gap:12, marginBottom:12 }}>
          <span style={{ fontFamily:P.font.display, fontWeight:700, fontSize:34,
            color:P.color.black, letterSpacing:'-.5px' }}>
            ${totalSpent.toLocaleString()}
          </span>
          <span style={{ fontFamily:P.font.body, fontSize:12, color:P.color.green, fontWeight:700 }}>
            ↓ 15.2% vs last month
          </span>
        </div>
        <ProgressBar value={totalSpent} max={totalBudget} color={P.color.green} />
        <div style={{ display:'flex', justifyContent:'space-between', marginTop:6 }}>
          <span style={{ fontFamily:P.font.body, fontSize:11, color:P.color.ink3 }}>
            ${totalSpent.toLocaleString()} spent
          </span>
          <span style={{ fontFamily:P.font.body, fontSize:11, color:P.color.ink3 }}>
            of ${totalBudget.toLocaleString()} budget
          </span>
        </div>
      </div>

      {/* Donut */}
      <div style={{ margin:'0 24px 14px', backgroundColor:P.color.white,
        borderRadius:P.r.xl, padding:20, boxShadow:P.shadow.sm }}>
        <h3 style={{ fontFamily:P.font.display, fontWeight:700, fontSize:17,
          color:P.color.black, margin:'0 0 16px', letterSpacing:'-.2px' }}>
          Spending Breakdown
        </h3>
        <div style={{ display:'flex', alignItems:'center', gap:16 }}>
          <svg width="160" height="160" viewBox="0 0 160 160" style={{ flexShrink:0 }}>
            {slices.map((s,i) => (
              <circle key={i} cx={cx} cy={cy} r={r} fill="none"
                stroke={s.color} strokeWidth="22"
                strokeDasharray={`${s.dash} ${s.gap}`}
                strokeDashoffset={-s.offset+circ*.25}
                style={{ transition:'all .6s ease' }}/>
            ))}
            <text x={cx} y={cy-8} textAnchor="middle" fontFamily={P.font.display}
              fontWeight="700" fontSize="20" fill={P.color.black}>
              ${(totalSpent/1000).toFixed(1)}k
            </text>
            <text x={cx} y={cy+12} textAnchor="middle" fontFamily={P.font.body}
              fontSize="11" fill={P.color.ink3}>total</text>
          </svg>
          <div style={{ flex:1, display:'flex', flexDirection:'column', gap:9 }}>
            {slices.map((s,i) => (
              <div key={i} style={{ display:'flex', alignItems:'center', gap:8 }}>
                <div style={{ width:10, height:10, borderRadius:2,
                  backgroundColor:s.color, flexShrink:0 }}/>
                <span style={{ fontFamily:P.font.body, fontSize:12, color:P.color.ink2,
                  flex:1, fontWeight:700 }}>{s.name}</span>
                <span style={{ fontFamily:P.font.body, fontSize:12, color:P.color.ink3 }}>
                  ${s.amount}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Alignment bars */}
      <div style={{ margin:'0 24px 14px', backgroundColor:P.color.white,
        borderRadius:P.r.xl, padding:20, boxShadow:P.shadow.sm }}>
        <h3 style={{ fontFamily:P.font.display, fontWeight:700, fontSize:17,
          color:P.color.black, margin:'0 0 4px', letterSpacing:'-.2px' }}>
          Spending Alignment
        </h3>
        <p style={{ fontFamily:P.font.body, fontSize:12, color:P.color.ink3, margin:'0 0 16px' }}>
          How your spending maps to your values
        </p>
        {[
          {label:'Aligned',   value:980, max:1500, type:'aligned'  },
          {label:'Neutral',   value:700, max:1500, type:'neutral'  },
          {label:'Impulsive', value:200, max:1500, type:'impulsive'},
        ].map(r => (
          <div key={r.label} style={{ marginBottom:14 }}>
            <div style={{ display:'flex', justifyContent:'space-between', marginBottom:5 }}>
              <div style={{ display:'flex', alignItems:'center', gap:8 }}>
                <div style={{ width:10, height:10, borderRadius:'50%',
                  backgroundColor:P.color[r.type] }}/>
                <span style={{ fontFamily:P.font.body, fontSize:12, fontWeight:700,
                  color:P.color.ink2 }}>{r.label}</span>
              </div>
              <span style={{ fontFamily:P.font.body, fontSize:12, color:P.color.ink3 }}>${r.value}</span>
            </div>
            <ProgressBar value={r.value} max={r.max} color={P.color[r.type]} />
          </div>
        ))}
      </div>

      {/* Top categories */}
      <div style={{ margin:'0 24px', backgroundColor:P.color.white,
        borderRadius:P.r.xl, padding:20, boxShadow:P.shadow.sm }}>
        <h3 style={{ fontFamily:P.font.display, fontWeight:700, fontSize:17,
          color:P.color.black, margin:'0 0 16px', letterSpacing:'-.2px' }}>
          Top Categories
        </h3>
        {MONTHLY_CATS.map((c,i) => (
          <div key={c.id} onClick={() => navCat && navCat(c.id)}
            style={{ display:'flex', alignItems:'center', gap:12, cursor:'pointer',
            padding:'10px 0', borderBottom:i<MONTHLY_CATS.length-1?`1px solid ${P.color.stone}`:'none' }}>
            <span style={{ fontFamily:P.font.body, fontSize:11, color:P.color.ink4,
              width:20, textAlign:'center', fontWeight:700 }}>#{i+1}</span>
            <CatIcon id={c.id} size={36}
              bg={P.color[c.type+'Tint']||P.color.stone}
              color={P.color[c.type]||P.color.black} />
            <div style={{ flex:1 }}>
              <p style={{ fontFamily:P.font.body, fontWeight:700, fontSize:13,
                color:P.color.black, margin:'0 0 3px' }}>{c.name}</p>
              <ProgressBar value={c.amount} max={c.budget} color={P.color[c.type]} />
            </div>
            <div style={{ textAlign:'right', minWidth:50 }}>
              <p style={{ fontFamily:P.font.body, fontWeight:700, fontSize:13,
                color:P.color.black, margin:'0 0 1px' }}>${c.amount}</p>
              <p style={{ fontFamily:P.font.body, fontSize:10, color:P.color.ink4, margin:0 }}>
                /${c.budget}
              </p>
            </div>
          </div>
        ))}
        <div style={{ marginTop:14, display:'grid', gridTemplateColumns:'1fr 1fr', gap:10 }}>
          <div style={{ backgroundColor:P.color.impulsiveTint, borderRadius:P.r.md, padding:'14px 16px' }}>
            <p style={{ fontFamily:P.font.body, fontSize:10, color:P.color.ink3,
              margin:'0 0 2px', fontWeight:700, textTransform:'uppercase', letterSpacing:.5 }}>Regretted</p>
            <p style={{ fontFamily:P.font.display, fontWeight:700, fontSize:24,
              color:P.color.impulsive, margin:'0 0 2px' }}>8</p>
            <p style={{ fontFamily:P.font.body, fontSize:11, color:P.color.ink3, margin:0 }}>15% of purchases</p>
          </div>
          <div style={{ backgroundColor:P.color.alignedTint, borderRadius:P.r.md, padding:'14px 16px' }}>
            <p style={{ fontFamily:P.font.body, fontSize:10, color:P.color.ink3,
              margin:'0 0 2px', fontWeight:700, textTransform:'uppercase', letterSpacing:.5 }}>Best Day</p>
            <p style={{ fontFamily:P.font.display, fontWeight:700, fontSize:18,
              color:P.color.green, margin:'0 0 2px' }}>Tuesday</p>
            <p style={{ fontFamily:P.font.body, fontSize:11, color:P.color.ink3, margin:0 }}>Most aligned</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Goals Screen ──────────────────────────────────────────────────
function ScreenGoals({ onTab, nav }) {
  const [tab, setTab] = React.useState('routine');
  return (
    <div style={{ flex:1, backgroundColor:P.color.cream, overflowY:'auto', paddingBottom:90 }}>
      <StatusBar />
      <div style={{ padding:'56px 24px 16px' }}>
        <h1 style={{ fontFamily:P.font.display, fontWeight:700, fontSize:26,
          color:P.color.black, margin:'0 0 4px', letterSpacing:'-.4px' }}>Goals</h1>
        <p style={{ fontFamily:P.font.body, fontSize:13, color:P.color.ink3, margin:'0 0 18px' }}>
          Your spending routines & saving goals
        </p>
        <div style={{ display:'flex', backgroundColor:P.color.stone,
          borderRadius:P.r.pill, padding:4, marginBottom:20 }}>
          {['routine','save'].map(t => (
            <button key={t} onClick={() => setTab(t)}
              style={{ flex:1, height:38, borderRadius:P.r.pill,
                backgroundColor: tab===t ? P.color.green : 'transparent',
                color: tab===t ? P.color.white : P.color.ink3,
                border:'none', cursor:'pointer', fontFamily:P.font.body,
                fontSize:13, fontWeight:700, transition:'all .2s' }}>
              {t==='routine' ? 'Routine' : 'Saving Goals'}
            </button>
          ))}
        </div>
      </div>

      {tab === 'routine' ? (
        <div style={{ padding:'0 24px' }}>
          <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
            {ROUTINE_GOALS.map(g => (
              <div key={g.id} style={{ backgroundColor:P.color.white, borderRadius:P.r.lg,
                padding:'14px 16px', display:'flex', alignItems:'center', gap:12,
                boxShadow:P.shadow.sm, cursor:'pointer' }}>
                <span style={{ fontFamily:P.font.display, fontWeight:700, fontSize:18,
                  color:P.color.ink4, width:24, textAlign:'center', flexShrink:0 }}>
                  {g.priority}
                </span>
                <CatIcon id={g.cat} size={46} bg={P.color.greenLight} color={P.color.green} />
                <div style={{ flex:1 }}>
                  <p style={{ fontFamily:P.font.body, fontWeight:700, fontSize:14,
                    color:P.color.black, margin:'0 0 2px' }}>{g.name}</p>
                  <p style={{ fontFamily:P.font.body, fontSize:12, color:P.color.ink3, margin:0 }}>
                    ${g.amount} avg.
                  </p>
                  <span style={{ fontFamily:P.font.body, fontSize:10, fontWeight:700,
                    color:P.color.ink3, backgroundColor:P.color.stone,
                    borderRadius:P.r.pill, padding:'2px 8px', display:'inline-block', marginTop:3 }}>
                    {g.plan}
                  </span>
                </div>
                <button onClick={() => nav('adjustment')}
                  style={{ background:'none', border:'none', cursor:'pointer', padding:4 }}>
                  <Icon name="chevRight" size={18} color={P.color.ink4} />
                </button>
              </div>
            ))}
          </div>
          <button style={{ width:'100%', height:50, borderRadius:P.r.lg, marginTop:12,
            backgroundColor:'transparent', border:`2px dashed ${P.color.border}`,
            color:P.color.ink3, fontFamily:P.font.body, fontSize:13, fontWeight:700,
            cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', gap:8 }}>
            <Icon name="plus" size={18} color={P.color.ink4} /> Add Routine
          </button>
        </div>
      ) : (
        <div style={{ padding:'0 24px' }}>
          <div style={{ display:'flex', flexDirection:'column', gap:14 }}>
            {SAVE_GOALS.map(g => {
              const pct = Math.round((g.current/g.target)*100);
              return (
                <div key={g.id} style={{ backgroundColor:P.color.white, borderRadius:P.r.xl,
                  padding:'18px', boxShadow:P.shadow.sm, cursor:'pointer' }}>
                  <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:14 }}>
                    <CatIcon id={g.cat} size={48} bg={P.color.pinkLight} color={P.color.green} />
                    <div style={{ flex:1 }}>
                      <p style={{ fontFamily:P.font.body, fontWeight:700, fontSize:15,
                        color:P.color.black, margin:'0 0 1px' }}>{g.name}</p>
                      <p style={{ fontFamily:P.font.body, fontSize:12, color:P.color.ink3, margin:0 }}>
                        ${g.current.toLocaleString()} of ${g.target.toLocaleString()}
                      </p>
                    </div>
                    <span style={{ fontFamily:P.font.display, fontWeight:700, fontSize:22,
                      color:P.color.black }}>{pct}%</span>
                  </div>
                  <ProgressBar value={g.current} max={g.target} color={g.color} />
                  <p style={{ fontFamily:P.font.body, fontSize:11, color:P.color.ink3,
                    margin:'6px 0 0', textAlign:'right' }}>
                    ${(g.target-g.current).toLocaleString()} to go
                  </p>
                </div>
              );
            })}
          </div>
          <button style={{ width:'100%', height:50, borderRadius:P.r.lg, marginTop:12,
            backgroundColor:'transparent', border:`2px dashed ${P.color.border}`,
            color:P.color.ink3, fontFamily:P.font.body, fontSize:13, fontWeight:700,
            cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', gap:8 }}>
            <Icon name="plus" size={18} color={P.color.ink4} /> Add Saving Goal
          </button>
        </div>
      )}
    </div>
  );
}

// ── Adjustment Page ───────────────────────────────────────────────
function ScreenAdjustment({ nav }) {
  const [items, setItems] = React.useState([
    { id:'dining',    name:'Dining Out',    max:650, priority:1 },
    { id:'transport', name:'Transport',     max:300, priority:2 },
    { id:'shopping',  name:'Shopping',      max:200, priority:3 },
    { id:'grocery',   name:'Grocery',       max:200, priority:4 },
    { id:'social',    name:'Social',        max:150, priority:5, label:'Social Spending' },
    { id:'entertainment', name:'Entertainment', max:200, priority:6 },
    { id:'coffee',    name:'Coffee',        max:80,  priority:7 },
    { id:'office',    name:'Office',        max:100, priority:8 },
    { id:'clothing',  name:'Lifestyle',     max:200, priority:9, label:'Lifestyle Upgrades' },
    { id:'subscriptions', name:'Convenience', max:200, priority:10, label:'Convenience Spending' },
  ]);
  const [editing, setEditing] = React.useState(null);
  const [mode] = React.useState('routine'); // 'routine' or 'goal'

  const updateMax = (id, val) => {
    setItems(prev => prev.map(i => i.id===id ? {...i, max: parseInt(val)||0} : i));
  };

  return (
    <div style={{ flex:1, backgroundColor:P.color.white, display:'flex',
      flexDirection:'column', position:'relative', overflowY:'auto' }}>
      <StatusBar />
      <BackBtn onClick={() => nav('goals')} />

      {/* Image placeholder */}
      <div style={{ margin:'50px 24px 0', height:180, borderRadius:P.r.xl,
        backgroundColor:P.color.sand, overflow:'hidden', position:'relative',
        display:'flex', alignItems:'center', justifyContent:'center' }}>
        <div style={{ position:'absolute', top:0, left:0, right:0, bottom:0,
          opacity:.3, backgroundImage:`repeating-linear-gradient(-45deg,${P.color.black} 0,${P.color.black} 1px,transparent 0,transparent 50%)`,
          backgroundSize:'16px 16px' }}/>
        <div style={{ position:'relative', zIndex:1, textAlign:'center' }}>
          <Icon name="settings" size={36} color={P.color.black} />
          <p style={{ fontFamily:P.font.display, fontWeight:700, fontSize:18,
            color:P.color.black, margin:'8px 0 0' }}>Adjust Your {mode==='routine'?'Routine':'Goal'}</p>
        </div>
      </div>

      <div style={{ padding:'16px 24px 8px' }}>
        <h2 style={{ fontFamily:P.font.display, fontWeight:700, fontSize:20,
          color:P.color.black, margin:'0 0 2px', letterSpacing:'-.3px' }}>
          New {mode==='routine'?'Routine':'Goal'}
        </h2>
        <p style={{ fontFamily:P.font.body, fontSize:13, color:P.color.ink3, margin:'0 0 4px' }}>
          Let's adjust your priorities to create a new {mode==='routine'?'Routine':'Goal'}
        </p>
      </div>

      <div style={{ flex:1, padding:'0 24px 100px' }}>
        {items.map((item) => (
          <div key={item.id} style={{ padding:'12px 0',
            borderBottom:`1px solid ${P.color.border}`, display:'flex',
            alignItems:'center', gap:12 }}>
            <span style={{ fontFamily:P.font.body, fontWeight:700, fontSize:13,
              color:P.color.ink4, width:28, flexShrink:0 }}>#{item.priority}</span>
            <CatIcon id={item.id} size={40} bg={P.color.pinkLight} color={P.color.green} />
            <div style={{ flex:1 }}>
              <p style={{ fontFamily:P.font.body, fontWeight:700, fontSize:13,
                color:P.color.black, margin:'0 0 4px' }}>{item.label||item.name}</p>
              {/* Budget slider */}
              <div style={{ display:'flex', alignItems:'center', gap:8 }}>
                <div style={{ flex:1, height:8, borderRadius:P.r.pill,
                  backgroundColor:P.color.stone, position:'relative', overflow:'hidden' }}>
                  <div style={{ width:`${Math.min(100,(item.max/800)*100)}%`, height:'100%',
                    borderRadius:P.r.pill, backgroundColor:P.color.green }}/>
                </div>
              </div>
            </div>
            <div style={{ display:'flex', flexDirection:'column', alignItems:'flex-end', gap:2 }}>
              <span style={{ fontFamily:P.font.body, fontSize:10, color:P.color.ink3 }}>Max:</span>
              {editing===item.id ? (
                <input type="number" value={item.max}
                  onChange={e=>updateMax(item.id,e.target.value)}
                  onBlur={()=>setEditing(null)}
                  autoFocus
                  style={{ width:60, fontFamily:P.font.body, fontWeight:700, fontSize:13,
                    color:P.color.black, border:`1px solid ${P.color.green}`,
                    borderRadius:P.r.sm, padding:'2px 6px', outline:'none',
                    textAlign:'right' }}/>
              ) : (
                <button onClick={()=>setEditing(item.id)}
                  style={{ background:'none', border:'none', cursor:'pointer',
                    fontFamily:P.font.body, fontWeight:700, fontSize:14,
                    color:P.color.black, padding:0 }}>
                  ${item.max}
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      <div style={{ position:'absolute', bottom:0, left:0, right:0,
        padding:'16px 24px 40px', backgroundColor:P.color.white,
        borderTop:`1px solid ${P.color.border}` }}>
        <PBtn label="Save Routine" onClick={() => nav('goals')} />
      </div>
      <HomeIndicator />
    </div>
  );
}

// ── Profile Screen ────────────────────────────────────────────────
function ScreenProfile({ nav }) {
  const stats = [
    {label:'Days Active', value:'28', icon:'star'  },
    {label:'Aligned %',  value:'74%', icon:'check' },
    {label:'Saved',      value:'$420',icon:'gift'  },
  ];
  const settings = [
    {label:'Spending Priorities', icon:'star',    screen:'prioritizeSelect'},
    {label:'Budget Settings',     icon:'settings', screen:'adjustment'     },
    {label:'Notifications',       icon:'bell',     screen:'notification'   },
    {label:'Connect Accounts',    icon:'lock',     screen:null             },
    {label:'Privacy & Security',  icon:'lock',     screen:null             },
    {label:'Help & Support',      icon:'mail',     screen:null             },
  ];

  return (
    <div style={{ flex:1, backgroundColor:P.color.cream, overflowY:'auto', paddingBottom:90 }}>
      <StatusBar />
      <div style={{ padding:'56px 24px 20px', textAlign:'center' }}>
        <div style={{ width:80, height:80, borderRadius:'50%', margin:'0 auto 10px',
          backgroundColor:P.color.pink, display:'flex', alignItems:'center',
          justifyContent:'center', border:`3px solid ${P.color.white}`,
          boxShadow:P.shadow.md, overflow:'hidden' }}>
          <PigMascot size={70} />
        </div>
        <h2 style={{ fontFamily:P.font.display, fontWeight:700, fontSize:22,
          color:P.color.black, margin:'0 0 2px', letterSpacing:'-.3px' }}>Alex Johnson</h2>
        <p style={{ fontFamily:P.font.body, fontSize:13, color:P.color.ink3, margin:'0 0 20px' }}>
          Member since March 2025
        </p>
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:10, marginBottom:24 }}>
          {stats.map(s => (
            <div key={s.label} style={{ backgroundColor:P.color.white, borderRadius:P.r.lg,
              padding:'14px 8px', boxShadow:P.shadow.sm }}>
              <div style={{ width:32, height:32, borderRadius:'50%', margin:'0 auto 8px',
                backgroundColor:P.color.pinkLight, display:'flex', alignItems:'center',
                justifyContent:'center' }}>
                <Icon name={s.icon} size={16} color={P.color.green} />
              </div>
              <p style={{ fontFamily:P.font.display, fontWeight:700, fontSize:18,
                color:P.color.black, margin:'0 0 2px' }}>{s.value}</p>
              <p style={{ fontFamily:P.font.body, fontSize:10, color:P.color.ink3,
                margin:0, lineHeight:1.3 }}>{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Streak card */}
      <div style={{ margin:'0 24px 14px', backgroundColor:P.color.green, borderRadius:P.r.xl,
        padding:'18px 20px', display:'flex', alignItems:'center', gap:16 }}>
        <div style={{ width:48, height:48, borderRadius:P.r.md,
          backgroundColor:'rgba(255,255,255,.15)', display:'flex',
          alignItems:'center', justifyContent:'center' }}>
          <Icon name="star" size={24} color={P.color.sand} />
        </div>
        <div>
          <p style={{ fontFamily:P.font.display, fontWeight:700, fontSize:18,
            color:P.color.white, margin:'0 0 2px' }}>28-Day Streak!</p>
          <p style={{ fontFamily:P.font.body, fontSize:12, color:'rgba(255,255,255,.6)', margin:0 }}>
            Keep it up — you're on a roll
          </p>
        </div>
      </div>

      {/* Settings */}
      <div style={{ margin:'0 24px', backgroundColor:P.color.white,
        borderRadius:P.r.xl, padding:'4px 0', boxShadow:P.shadow.sm }}>
        {settings.map((s,i) => (
          <div key={s.label}
            onClick={() => s.screen && nav(s.screen)}
            style={{ display:'flex', alignItems:'center', gap:14,
              padding:'14px 16px', cursor: s.screen ? 'pointer' : 'default',
              borderBottom: i<settings.length-1?`1px solid ${P.color.stone}`:'none' }}>
            <div style={{ width:36, height:36, borderRadius:P.r.sm,
              backgroundColor:P.color.pinkLight, display:'flex',
              alignItems:'center', justifyContent:'center', flexShrink:0 }}>
              <Icon name={s.icon} size={18} color={P.color.green} />
            </div>
            <span style={{ fontFamily:P.font.body, fontWeight:700, fontSize:14,
              color:P.color.black, flex:1 }}>{s.label}</span>
            <Icon name="chevRight" size={18} color={P.color.ink4} />
          </div>
        ))}
      </div>

      <div style={{ padding:'16px 24px' }}>
        <PBtn label="Sign Out" variant="danger" onClick={() => nav('welcome')} />
      </div>
    </div>
  );
}

Object.assign(window, {
  ScreenHome, ScreenChallengeDetail, ScreenNotification,
  ScreenSpending, ScreenGoals, ScreenAdjustment, ScreenProfile,
  TODAY_TASKS, CHALLENGES, MONTHLY_CATS, ROUTINE_GOALS, SAVE_GOALS, NOTIFICATIONS
});
