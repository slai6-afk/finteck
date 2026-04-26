
// ─── AUTH & ONBOARDING SCREENS v2 ────────────────────────────────

// ── Welcome ──────────────────────────────────────────────────────
function ScreenWelcome({ nav }) {
  return (
    <div style={{ flex:1, backgroundColor:'rgb(255,225,230)', display:'flex',
      flexDirection:'column', alignItems:'center', justifyContent:'space-between',
      padding:'64px 28px 44px', position:'relative' }}>
      <StatusBar />
      {/* Top wordmark */}
      <div style={{ alignSelf:'flex-start', marginTop:4 }}>
        <span style={{ fontFamily:P.font.display, fontWeight:700, fontSize:28,
          color:P.color.green, letterSpacing:'-.5px' }}>penny.</span>
      </div>
      <div style={{ flex:1, display:'flex', flexDirection:'column',
        alignItems:'center', justifyContent:'center', gap:24 }}>
        {/* Mascot on sand bg circle */}
        <div style={{ width:220, height:220, borderRadius:'50%',
          backgroundColor:'rgb(233,171,181)', display:'flex', alignItems:'center',
          justifyContent:'center', boxShadow:`0 8px 40px rgba(12,69,36,.12)` }}>
          <PigMascot size={190} />
        </div>
        <div style={{ textAlign:'center' }}>
          <h1 style={{ fontFamily:P.font.display, fontWeight:700, fontSize:32,
            color:P.color.black, margin:0, lineHeight:1.1, letterSpacing:'-.5px' }}>
            Hello, Welcome<br/>to Penny!
          </h1>
          <p style={{ fontFamily:P.font.body, fontSize:14, color:P.color.ink3,
            margin:'10px 0 0', lineHeight:1.5 }}>Your mindful spending companion</p>
        </div>
      </div>
      <div style={{ width:'100%', display:'flex', flexDirection:'column', gap:10 }}>
        <PBtn label="Get Started" onClick={() => nav('createAccount')} variant="primary" />
        <PBtn label="I already have an account" variant="ghost" onClick={() => nav('login')} />
      </div>
      <HomeIndicator />
    </div>
  );
}

// ── Login ─────────────────────────────────────────────────────────
function ScreenLogin({ nav }) {
  const [email, setEmail] = React.useState('');
  const [pass, setPass] = React.useState('');
  return (
    <div style={{ flex:1, backgroundColor:P.color.white, display:'flex',
      flexDirection:'column', padding:'0 28px', position:'relative' }}>
      <StatusBar />
      <BackBtn onClick={() => nav('welcome')} />
      <div style={{ paddingTop:108, flex:1 }}>
        <h1 style={{ fontFamily:P.font.display, fontWeight:700, fontSize:28,
          color:P.color.black, margin:'0 0 6px', letterSpacing:'-.4px' }}>Sign In</h1>
        <p style={{ fontFamily:P.font.body, fontSize:13, color:P.color.ink3, margin:'0 0 28px' }}>
          Welcome back — let's see how you're doing
        </p>
        <div style={{ display:'flex', flexDirection:'column', gap:12 }}>
          <PInput placeholder="Email address" type="email" value={email}
            onChange={e=>setEmail(e.target.value)} iconName="mail" />
          <PInput placeholder="Password" type="password" value={pass}
            onChange={e=>setPass(e.target.value)} iconName="lock" />
          <button style={{ background:'none', border:'none', cursor:'pointer',
            textAlign:'right', fontFamily:P.font.body, fontSize:13,
            color:P.color.ink3, padding:0 }}>Forgot password?</button>
        </div>
        <div style={{ marginTop:24 }}>
          <PBtn label="Sign In" onClick={() => nav('home')} />
        </div>
        <p style={{ textAlign:'center', fontFamily:P.font.body, fontSize:13,
          color:P.color.ink3, marginTop:20 }}>
          Don't have an account?{' '}
          <button onClick={() => nav('createAccount')} style={{ background:'none', border:'none',
            cursor:'pointer', color:P.color.green, fontWeight:700, fontFamily:P.font.body, fontSize:13 }}>
            Sign Up
          </button>
        </p>
      </div>
      <HomeIndicator />
    </div>
  );
}

// ── Create Account ────────────────────────────────────────────────
function ScreenCreateAccount({ nav }) {
  const [form, setForm] = React.useState({ name:'', email:'', phone:'', pass:'', confirm:'' });
  const set = k => e => setForm(f=>({...f,[k]:e.target.value}));
  return (
    <div style={{ flex:1, backgroundColor:P.color.white, display:'flex',
      flexDirection:'column', padding:'0 28px', position:'relative', overflowY:'auto' }}>
      <StatusBar />
      <BackBtn onClick={() => nav('welcome')} />
      <div style={{ paddingTop:108, paddingBottom:40 }}>
        <h1 style={{ fontFamily:P.font.display, fontWeight:700, fontSize:28,
          color:P.color.black, margin:'0 0 6px', letterSpacing:'-.4px' }}>Create Account</h1>
        <p style={{ fontFamily:P.font.body, fontSize:13, color:P.color.ink3, margin:'0 0 28px' }}>
          Start your journey toward intentional spending
        </p>
        <div style={{ display:'flex', flexDirection:'column', gap:12 }}>
          <PInput placeholder="Full Name" value={form.name} onChange={set('name')} iconName="user" />
          <PInput placeholder="Email Address" type="email" value={form.email} onChange={set('email')} iconName="mail" />
          <PInput placeholder="Phone Number" type="tel" value={form.phone} onChange={set('phone')} iconName="phone" />
          <PInput placeholder="Password" type="password" value={form.pass} onChange={set('pass')} iconName="lock" />
          <PInput placeholder="Confirm Password" type="password" value={form.confirm} onChange={set('confirm')} iconName="check" />
        </div>
        <div style={{ marginTop:28 }}>
          <PBtn label="Create Account" onClick={() => nav('verifyEmail')} />
        </div>
        <p style={{ textAlign:'center', fontFamily:P.font.body, fontSize:12,
          color:P.color.ink4, marginTop:16, lineHeight:1.5 }}>
          By continuing you agree to our{' '}
          <span style={{ color:P.color.green, fontWeight:700 }}>Terms</span> &{' '}
          <span style={{ color:P.color.green, fontWeight:700 }}>Privacy Policy</span>
        </p>
      </div>
      <HomeIndicator />
    </div>
  );
}

// ── Verify Email ──────────────────────────────────────────────────
function ScreenVerifyEmail({ nav }) {
  const [code, setCode] = React.useState(['','','','','','']);
  const refs = [0,1,2,3,4,5].map(() => React.useRef());
  const handleChange = (i,v) => {
    const next=[...code]; next[i]=v.slice(-1); setCode(next);
    if (v && i<5) refs[i+1].current?.focus();
  };
  return (
    <div style={{ flex:1, backgroundColor:P.color.white, display:'flex',
      flexDirection:'column', padding:'0 28px', position:'relative' }}>
      <StatusBar />
      <BackBtn onClick={() => nav('createAccount')} />
      <div style={{ paddingTop:108, flex:1 }}>
        <div style={{ width:64, height:64, borderRadius:P.r.xl,
          backgroundColor:P.color.pinkLight, display:'flex', alignItems:'center',
          justifyContent:'center', marginBottom:20 }}>
          <Icon name="mail" size={28} color={P.color.green} />
        </div>
        <h1 style={{ fontFamily:P.font.display, fontWeight:700, fontSize:26,
          color:P.color.black, margin:'0 0 8px', letterSpacing:'-.4px' }}>Check your email</h1>
        <p style={{ fontFamily:P.font.body, fontSize:13, color:P.color.ink3, margin:'0 0 32px', lineHeight:1.6 }}>
          We sent a 6-digit code to confirm your email address
        </p>
        <div style={{ display:'flex', gap:10, justifyContent:'center', marginBottom:32 }}>
          {code.map((d,i) => (
            <input key={i} ref={refs[i]} maxLength={1} value={d}
              onChange={e=>handleChange(i,e.target.value)}
              style={{ width:46, height:56, borderRadius:P.r.md, textAlign:'center',
                fontFamily:P.font.display, fontWeight:700, fontSize:22,
                border:`2px solid ${d ? P.color.green : P.color.border}`,
                outline:'none', backgroundColor:d ? P.color.greenLight : P.color.white,
                color:P.color.black, transition:'border .15s,background .15s' }}/>
          ))}
        </div>
        <PBtn label="Verify Email" onClick={() => nav('onboardTask')} />
        <p style={{ textAlign:'center', fontFamily:P.font.body, fontSize:13,
          color:P.color.ink3, marginTop:16 }}>
          Didn't receive it?{' '}
          <button style={{ background:'none', border:'none', cursor:'pointer',
            color:P.color.green, fontWeight:700, fontFamily:P.font.body, fontSize:13 }}>
            Resend
          </button>
        </p>
      </div>
      <HomeIndicator />
    </div>
  );
}

// ── Onboarding Task Intro ─────────────────────────────────────────
function ScreenOnboardTask({ nav }) {
  return (
    <div style={{ flex:1, backgroundColor:P.color.sandLight, display:'flex',
      flexDirection:'column', alignItems:'center', justifyContent:'space-between',
      padding:'80px 28px 48px', position:'relative' }}>
      <StatusBar />
      <div style={{ flex:1, display:'flex', flexDirection:'column',
        alignItems:'center', justifyContent:'center', gap:24, textAlign:'center' }}>
        <div style={{ display:'flex', gap:8 }}>
          {[0,1,2].map(i=>(
            <div key={i} style={{ width:i===0?28:8, height:8, borderRadius:P.r.pill,
              backgroundColor:i===0?P.color.green:P.color.border, transition:'width .3s' }}/>
          ))}
        </div>
        <div style={{ width:100, height:100, borderRadius:P.r.xl,
          backgroundColor:P.color.white, display:'flex', alignItems:'center',
          justifyContent:'center', boxShadow:P.shadow.md }}>
          <Icon name="award" size={46} color={P.color.green} />
        </div>
        <div>
          <h1 style={{ fontFamily:P.font.display, fontWeight:700, fontSize:26,
            color:P.color.black, margin:'0 0 12px', letterSpacing:'-.4px', lineHeight:1.2 }}>
            Let's set up your<br/>spending values
          </h1>
          <p style={{ fontFamily:P.font.body, fontSize:14, color:P.color.ink2, margin:0, lineHeight:1.6 }}>
            3 quick steps to personalize<br/>your Penny experience
          </p>
        </div>
        <div style={{ backgroundColor:P.color.white, borderRadius:P.r.lg,
          padding:'16px 20px', width:'100%', boxShadow:P.shadow.sm }}>
          {['Pick your spending priorities','Rank what matters most to you','Set your saving goals'].map((s,i)=>(
            <div key={i} style={{ display:'flex', alignItems:'center', gap:12,
              padding:'10px 0', borderBottom:i<2?`1px solid ${P.color.stone}`:'none' }}>
              <div style={{ width:26, height:26, borderRadius:'50%',
                backgroundColor:P.color.pinkLight, display:'flex', alignItems:'center',
                justifyContent:'center', flexShrink:0 }}>
                <span style={{ fontFamily:P.font.ui, fontSize:11, fontWeight:700,
                  color:P.color.green }}>{i+1}</span>
              </div>
              <span style={{ fontFamily:P.font.body, fontSize:13, color:P.color.ink2, fontWeight:700 }}>{s}</span>
            </div>
          ))}
        </div>
      </div>
      <div style={{ width:'100%' }}>
        <PBtn label="Let's Go" onClick={() => nav('prioritizeSelect')} />
      </div>
      <HomeIndicator />
    </div>
  );
}

// ─── PRIORITY CATEGORIES ─────────────────────────────────────────
const ALL_CATS = [
  { id:'dining',        label:'Dining Out'    },
  { id:'coffee',        label:'Coffee'        },
  { id:'grocery',       label:'Groceries'     },
  { id:'transport',     label:'Transport'     },
  { id:'shopping',      label:'Shopping'      },
  { id:'fitness',       label:'Fitness'       },
  { id:'travel',        label:'Travel'        },
  { id:'entertainment', label:'Entertainment' },
  { id:'home',          label:'Home & Living' },
  { id:'education',     label:'Education'     },
  { id:'social',        label:'Social Life'   },
  { id:'clothing',      label:'Clothing'      },
  { id:'rent',          label:'Rent'          },
  { id:'health',        label:'Health'        },
  { id:'subscriptions', label:'Subscriptions' },
  { id:'office',        label:'Office'        },
];

// ── Step 1: Select things you focus on ────────────────────────────
function ScreenPrioritizeSelect({ nav, setPriorities }) {
  const [selected, setSelected] = React.useState([]);
  const toggle = id => setSelected(s =>
    s.includes(id) ? s.filter(x=>x!==id) : [...s, id]
  );
  const minSel = 4;
  const canContinue = selected.length >= minSel;

  return (
    <div style={{ flex:1, backgroundColor:P.color.white, display:'flex',
      flexDirection:'column', position:'relative' }}>
      <StatusBar />
      <BackBtn onClick={() => nav('onboardTask')} />
      {/* Progress bar */}
      <div style={{ position:'absolute', top:48, left:60, right:24, height:6,
        borderRadius:P.r.pill, backgroundColor:P.color.stone, overflow:'hidden', zIndex:10 }}>
        <div style={{ width:'33%', height:'100%', borderRadius:P.r.pill,
          backgroundColor:P.color.green }}/>
      </div>

      <div style={{ paddingTop:72, flex:1, overflowY:'auto', paddingBottom:100 }}>
        <div style={{ padding:'16px 24px 20px' }}>
          <h1 style={{ fontFamily:P.font.display, fontWeight:700, fontSize:22,
            color:P.color.black, margin:'0 0 6px', letterSpacing:'-.3px', lineHeight:1.2 }}>
            Select {minSel}+ Things You<br/>Want to Focus on:
          </h1>
          <p style={{ fontFamily:P.font.body, fontSize:13, color:P.color.ink3, margin:0 }}>
            {selected.length} selected{selected.length >= minSel ? ' ✓' : ` (min ${minSel})`}
          </p>
        </div>

        {/* Chip grid - flowing layout */}
        <div style={{ padding:'0 20px', display:'flex', flexWrap:'wrap', gap:10 }}>
          {ALL_CATS.map(cat => {
            const isSel = selected.includes(cat.id);
            return (
              <button key={cat.id} onClick={() => toggle(cat.id)}
                style={{ display:'flex', alignItems:'center', gap:8,
                  padding:'10px 16px', borderRadius:P.r.pill, cursor:'pointer',
                  border:`1.5px solid ${isSel ? P.color.green : P.color.border}`,
                  backgroundColor: isSel ? P.color.green : P.color.white,
                  color: isSel ? P.color.white : P.color.black,
                  transition:'all .15s', fontFamily:P.font.body,
                  fontSize:13, fontWeight:700 }}>
                <Icon name={CAT_META[cat.id]?.icon||'shopping'} size={16}
                  color={isSel ? P.color.white : P.color.ink2} />
                {cat.label}
              </button>
            );
          })}
        </div>
      </div>

      <div style={{ position:'absolute', bottom:0, left:0, right:0,
        padding:'16px 24px 40px', backgroundColor:P.color.white,
        borderTop:`1px solid ${P.color.border}` }}>
        <PBtn label={`Continue (${selected.length} selected)`}
          onClick={() => { setPriorities(selected); nav('prioritizeTournament'); }}
          style={{ opacity: canContinue ? 1 : .4, pointerEvents: canContinue ? 'auto':'none' }} />
      </div>
      <HomeIndicator />
    </div>
  );
}

// ── Step 2: Tournament — 1v1 ranking ─────────────────────────────
function ScreenPrioritizeTournament({ nav, priorities, setRanked }) {
  // Build comparison pairs from selected items
  const items = React.useMemo(() => {
    const cats = priorities.length ? priorities : ['dining','travel','fitness','social','shopping'];
    return cats;
  }, [priorities]);

  // Generate N-1 matchups for a "king of the hill" style ranking
  const buildMatchups = (items) => {
    const matchups = [];
    for (let i = 0; i < items.length - 1; i++) {
      matchups.push([items[i], items[i+1]]);
    }
    // Add a few more cross comparisons for better ranking
    if (items.length > 3) {
      matchups.push([items[0], items[2]]);
      if (items.length > 4) matchups.push([items[1], items[3]]);
    }
    return matchups;
  };

  const [matchups] = React.useState(() => buildMatchups(items));
  const [round, setRound] = React.useState(0);
  const [wins, setWins] = React.useState(() => Object.fromEntries(items.map(id=>[id,0])));

  const choose = (winnerId) => {
    setWins(w => ({...w, [winnerId]: (w[winnerId]||0)+1}));
    if (round + 1 >= matchups.length) {
      // Done — sort by wins and go to result
      const sorted = [...items].sort((a,b) => ((wins[b]||0)+(b===winnerId?1:0)) - ((wins[a]||0)+(a===winnerId?1:0)));
      setRanked(sorted);
      nav('priorityResult');
    } else {
      setRound(r=>r+1);
    }
  };

  if (round >= matchups.length) return null;
  const [itemA, itemB] = matchups[round];
  const metaA = CAT_META[itemA] || { icon:'shopping', label:itemA };
  const metaB = CAT_META[itemB] || { icon:'shopping', label:itemB };
  const progress = (round / matchups.length) * 100;

  return (
    <div style={{ flex:1, backgroundColor:P.color.cream, display:'flex',
      flexDirection:'column', position:'relative', overflow:'hidden' }}>
      <StatusBar />
      {/* Progress */}
      <div style={{ position:'absolute', top:48, left:60, right:24, height:6,
        borderRadius:P.r.pill, backgroundColor:P.color.stone, overflow:'hidden', zIndex:10 }}>
        <div style={{ width:`${progress}%`, height:'100%', borderRadius:P.r.pill,
          backgroundColor:P.color.green, transition:'width .4s ease' }}/>
      </div>
      <BackBtn onClick={() => round > 0 ? setRound(r=>r-1) : nav('prioritizeSelect')} />

      <div style={{ paddingTop:72, flex:1, display:'flex', flexDirection:'column',
        padding:'72px 24px 24px' }}>
        <div style={{ marginBottom:8 }}>
          <span style={{ fontFamily:P.font.body, fontSize:11, color:P.color.ink3,
            fontWeight:700, textTransform:'uppercase', letterSpacing:.8 }}>
            Round {round+1} of {matchups.length}
          </span>
        </div>
        <h2 style={{ fontFamily:P.font.display, fontWeight:700, fontSize:24,
          color:P.color.black, margin:'0 0 8px', letterSpacing:'-.3px', lineHeight:1.2 }}>
          Which matters<br/>more to you?
        </h2>
        <p style={{ fontFamily:P.font.body, fontSize:13, color:P.color.ink3,
          margin:'0 0 22px', lineHeight:1.5 }}>
          Pick the one you care more.
        </p>

        {/* LEFT / RIGHT wrapper */}
        <div style={{ display:'flex', flexDirection:'row', gap:12,
          alignItems:'flex-start', position:'relative', justifyContent:'space-between' }}>
          {[{id:itemA,meta:metaA,side:'left'},{id:itemB,meta:metaB,side:'right'}].map(({id,meta,side})=>{
            const isLeft = side==='left';
            return (
              <button key={id} onClick={()=>choose(id)}
                onMouseDown={e=>{e.currentTarget.style.transform=`scale(.95) rotate(${isLeft?'-2deg':'2deg'})`;}}
                onMouseUp={e=>{e.currentTarget.style.transform='scale(1) rotate(0deg)';}}
                style={{ flex:'0 0 155px', height:300, backgroundColor:P.color.white, borderRadius:P.r.xl,
                  padding:'28px 16px', display:'flex', flexDirection:'column',
                  alignItems:'center', justifyContent:'center', gap:18,
                  border:`2px solid ${P.color.border}`, cursor:'pointer',
                  boxShadow:P.shadow.md, transition:'all .18s cubic-bezier(.4,0,.2,1)',
                  minHeight:300, maxHeight:300 }}>
                <div style={{ width:80, height:80, borderRadius:P.r.xl,
                  backgroundColor:isLeft?P.color.pinkLight:P.color.greenLight,
                  display:'flex', alignItems:'center', justifyContent:'center' }}>
                  <Icon name={meta.icon} size={40} color={isLeft?P.color.impulsive:P.color.green} />
                </div>
                <p style={{ fontFamily:P.font.display, fontWeight:700, fontSize:18,
                  color:P.color.black, margin:0, textAlign:'center',
                  letterSpacing:'-.2px', lineHeight:1.2 }}>
                  {meta.label}
                </p>
                <div style={{ width:40, height:40, borderRadius:'50%',
                  backgroundColor:isLeft?P.color.pinkLight:P.color.greenLight,
                  display:'flex', alignItems:'center', justifyContent:'center',
                  border:`2px solid ${isLeft?P.color.pink:P.color.green}` }}>
                  <Icon name={isLeft?'chevLeft':'chevRight'} size={20}
                    color={isLeft?P.color.impulsive:P.color.green} strokeWidth={2.5}/>
                </div>
              </button>
            );
          })}
        </div>

        {/* VS divider — between cards visually */}
        <div style={{ position:'absolute', left:'50%', top:250,
          transform:'translate(-50%,-50%)', zIndex:10,
          width:40, height:40, borderRadius:'50%',
          backgroundColor:P.color.sand, border:`2px solid ${P.color.border}`,
          display:'flex', alignItems:'center', justifyContent:'center',
          boxShadow:P.shadow.sm, pointerEvents:'none' }}>
          <span style={{ fontFamily:P.font.display, fontWeight:700, fontSize:11,
            color:P.color.black }}>VS</span>
        </div>

        <button onClick={()=>choose(itemA)}
          style={{ background:'none', border:'none', cursor:'pointer',
            fontFamily:P.font.body, fontSize:12, color:P.color.ink4,
            marginTop:8, textDecoration:'underline' }}>
          They're equally important →
        </button>
      </div>
      <HomeIndicator />
    </div>
  );
}

// ── Priority Result ───────────────────────────────────────────────
function ScreenPriorityResult({ nav, ranked, priorities }) {
  const list = ranked && ranked.length ? ranked : (priorities || []).slice(0,6);
  const fallback = ['dining','travel','fitness','social','shopping','education'];
  const finalList = list.length ? list : fallback;

  return (
    <div style={{ flex:1, backgroundColor:P.color.white, display:'flex',
      flexDirection:'column', position:'relative', overflowY:'auto' }}>
      <StatusBar />
      <div style={{ padding:'64px 24px 100px' }}>
        <div style={{ textAlign:'center', marginBottom:28 }}>
          <div style={{ width:64, height:64, borderRadius:'50%',
            backgroundColor:P.color.pinkLight, display:'flex', alignItems:'center',
            justifyContent:'center', margin:'0 auto 12px' }}>
            <Icon name="award" size={32} color={P.color.green} />
          </div>
          <h1 style={{ fontFamily:P.font.display, fontWeight:700, fontSize:26,
            color:P.color.black, margin:'0 0 6px', letterSpacing:'-.4px' }}>
            Your Priority List
          </h1>
          <p style={{ fontFamily:P.font.body, fontSize:13, color:P.color.ink3, margin:0 }}>
            We'll help you spend in line with what matters most
          </p>
        </div>

        <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
          {finalList.map((id, i) => {
            const meta = CAT_META[id] || { icon:'shopping', label:id };
            const rankColors = [P.color.sand, P.color.pink, P.color.greenLight];
            const bg = rankColors[i] || P.color.stone;
            return (
              <div key={id} style={{ backgroundColor:bg, borderRadius:P.r.lg,
                padding:'14px 16px', display:'flex', alignItems:'center', gap:14,
                boxShadow:P.shadow.sm }}>
                <span style={{ fontFamily:P.font.display, fontWeight:700, fontSize:24,
                  color:P.color.ink3, width:30, textAlign:'center', flexShrink:0 }}>
                  {i+1}
                </span>
                <div style={{ width:50, height:50, borderRadius:P.r.md,
                  backgroundColor:'rgba(255,255,255,.6)', display:'flex',
                  alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                  <Icon name={meta.icon} size={24} color={P.color.black} />
                </div>
                <div style={{ flex:1 }}>
                  <p style={{ fontFamily:P.font.body, fontWeight:700, fontSize:15,
                    color:P.color.black, margin:0 }}>{meta.label}</p>
                </div>
                <Icon name="chevRight" size={18} color={P.color.ink4} />
              </div>
            );
          })}
        </div>

        <div style={{ marginTop:28 }}>
          <PBtn label="Continue to Penny →" onClick={() => nav('home')} />
        </div>
      </div>
      <HomeIndicator />
    </div>
  );
}

Object.assign(window, {
  ScreenWelcome, ScreenLogin, ScreenCreateAccount, ScreenVerifyEmail,
  ScreenOnboardTask, ScreenPrioritizeSelect, ScreenPrioritizeTournament,
  ScreenPriorityResult, ALL_CATS
});
