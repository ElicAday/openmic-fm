"use client";
import { useState, useEffect } from "react";

export default function Home() {
  const [gf, setGf] = useState(0);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const i = setInterval(() => setGf(f => (f + 1) % 150), 80);
    return () => clearInterval(i);
  }, []);

  useEffect(() => {
    const h = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);

  const gl = gf % 40 < 2;
  const gx = gl ? (Math.random() * 8 - 4) : 0;
  const gy = gl ? (Math.random() * 4 - 2) : 0;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Rubik+Glitch&family=Space+Mono:wght@400;700&family=Permanent+Marker&family=Silkscreen:wght@400;700&family=Bagel+Fat+One&family=DM+Sans:wght@400;500;600;700&display=swap');

        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
        html{scroll-behavior:smooth}
        body{background:#0a0a0a;overflow-x:hidden}

        @keyframes scan{0%{transform:translateY(-100%)}100%{transform:translateY(100vh)}}
        @keyframes flicker{0%,96%,100%{opacity:1}97%{opacity:.6}98%{opacity:.9}}
        @keyframes blink{0%,49%{opacity:1}50%,100%{opacity:0}}
        @keyframes marquee{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}
        @keyframes drift{0%,100%{transform:translate(0,0)}25%{transform:translate(10px,-14px)}50%{transform:translate(-8px,8px)}75%{transform:translate(12px,4px)}}
        @keyframes drift2{0%,100%{transform:translate(0,0)}33%{transform:translate(-12px,10px)}66%{transform:translate(8px,-12px)}}
        @keyframes wobble{0%,100%{transform:rotate(-4deg)}50%{transform:rotate(4deg)}}
        @keyframes spinSlow{from{transform:rotate(0)}to{transform:rotate(360deg)}}
        @keyframes fadeUp{from{opacity:0;transform:translateY(30px)}to{opacity:1;transform:translateY(0)}}
        @keyframes fadeIn{from{opacity:0}to{opacity:1}}
        @keyframes pulseGlow{0%,100%{box-shadow:0 0 20px #00FF4444}50%{box-shadow:0 0 40px #00FF4488,0 0 80px #00FF4422}}
        @keyframes rgbShift{
          0%,88%,100%{text-shadow:4px 4px 0 #FF1111,-2px -2px 0 #00FF44}
          90%{text-shadow:-4px 2px 0 #FF1111,5px -3px 0 #00FF44,-2px 4px 0 #00CCFF}
          93%{text-shadow:3px -4px 0 #FF1111,-5px 2px 0 #00FF44}
          95%{text-shadow:4px 4px 0 #FF1111,-2px -2px 0 #00FF44}
        }
        @keyframes borderPulse{0%,100%{border-color:#00FF44}50%{border-color:#E020CC}}

        .hovp{transition:all .2s cubic-bezier(.34,1.56,.64,1);cursor:pointer}
        .hovp:hover{transform:translateY(-4px) rotate(-1.5deg) !important}
        .card-hover{transition:all .25s ease}
        .card-hover:hover{transform:translateY(-6px) !important;box-shadow:0 20px 60px rgba(0,255,68,.15),0 0 0 1px rgba(0,255,68,.3) !important}

        .section{opacity:0;transform:translateY(30px);transition:all .6s ease}
        .section.visible{opacity:1;transform:translateY(0)}

        ::selection{background:#00FF44;color:#0a0a0a}
        input::placeholder{color:rgba(255,255,255,.3)}
        input:focus{outline:none;border-color:#00FF44 !important;box-shadow:0 0 0 3px rgba(0,255,68,.2) !important}
      `}</style>

      <div style={{ minHeight:"100vh",background:"#0a0a0a",color:"#fff",fontFamily:"'DM Sans',sans-serif",position:"relative",overflow:"hidden" }}>

        {/* Scanline + Grain */}
        <div style={{ position:"fixed",top:0,left:0,right:0,height:2,background:"rgba(255,255,255,.03)",animation:"scan 8s linear infinite",zIndex:100,pointerEvents:"none" }} />
        <div style={{ position:"fixed",inset:0,zIndex:50,pointerEvents:"none",opacity:.35,mixBlendMode:"overlay",backgroundImage:`url("data:image/svg+xml;utf8,<svg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='1.5' numOctaves='4' stitchTiles='stitch'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>")` }} />

        {/* Ambient glow */}
        <div style={{ position:"fixed",inset:0,zIndex:0,pointerEvents:"none" }}>
          <div style={{ position:"absolute",top:"-20%",right:"-15%",width:700,height:700,borderRadius:"50%",background:"radial-gradient(circle,#E020CC15 0%,transparent 60%)",filter:"blur(40px)",animation:"drift 20s ease-in-out infinite" }} />
          <div style={{ position:"absolute",bottom:"-15%",left:"-10%",width:600,height:600,borderRadius:"50%",background:"radial-gradient(circle,#00FF4412 0%,transparent 60%)",filter:"blur(50px)",animation:"drift2 18s ease-in-out infinite" }} />
        </div>

        {/* Floating doodles */}
        <svg style={{ position:"fixed",top:"8%",left:"4%",zIndex:2,pointerEvents:"none",animation:"wobble 6s ease-in-out infinite",opacity:.3 }} viewBox="0 0 30 30" width="28" height="28"><path d="M15 2 L17 11 L26 11 L19 17 L22 26 L15 21 L8 26 L11 17 L4 11 L13 11 Z" fill="none" stroke="#E020CC" strokeWidth="1.5" /></svg>
        <svg style={{ position:"fixed",top:"60%",right:"5%",zIndex:2,pointerEvents:"none",animation:"drift 12s ease-in-out infinite",opacity:.25 }} viewBox="0 0 20 20" width="22" height="22"><path d="M4 4 L16 16 M16 4 L4 16" stroke="#00FF44" strokeWidth="2" strokeLinecap="round" /></svg>
        <svg style={{ position:"fixed",bottom:"15%",left:"6%",zIndex:2,pointerEvents:"none",animation:"spinSlow 30s linear infinite",opacity:.2 }} viewBox="0 0 30 30" width="32" height="32"><path d="M15 15 m-2 0 a2 2 0 1 1 4 0 a4 4 0 1 1-8 0 a6 6 0 1 1 12 0 a8 8 0 1 1-16 0" fill="none" stroke="#00CCFF" strokeWidth="1.5" strokeLinecap="round" /></svg>
        <svg style={{ position:"fixed",top:"35%",right:"10%",zIndex:2,pointerEvents:"none",animation:"drift2 10s ease-in-out infinite",opacity:.2 }} viewBox="0 0 20 36" width="14" height="25"><path d="M12 2 L4 18 L10 18 L7 34 L18 14 L12 14 Z" fill="none" stroke="#DDCC00" strokeWidth="1.5" strokeLinejoin="round" /></svg>

        {/* ===== HEADER ===== */}
        <header style={{
          position:"fixed",top:0,left:0,right:0,zIndex:80,
          background:"rgba(10,10,10,.85)",backdropFilter:"blur(16px)",
          borderBottom:"1px solid rgba(255,255,255,.06)",
          padding:"14px 32px",display:"flex",alignItems:"center",justifyContent:"space-between",
        }}>
          <div style={{ display:"flex",alignItems:"center",gap:10 }}>
            <div style={{ width:32,height:32,borderRadius:8,background:"linear-gradient(135deg,#E020CC,#00FF44)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:14,fontWeight:700,fontFamily:"'Bagel Fat One',cursive",color:"#0a0a0a",border:"2px solid #0a0a0a" }}>VF</div>
            <span style={{ fontFamily:"'Bagel Fat One',cursive",fontSize:18,letterSpacing:".02em" }}>
              <span style={{ color:"#E020CC" }}>VERSE</span><span style={{ color:"#00FF44" }}>FIEND</span>
            </span>
          </div>
          <div style={{ display:"flex",alignItems:"center",gap:20 }}>
            <a href="#how" style={{ fontSize:13,color:"rgba(255,255,255,.5)",textDecoration:"none",fontWeight:600,transition:"color .2s" }} onMouseEnter={e=>e.target.style.color="#fff"} onMouseLeave={e=>e.target.style.color="rgba(255,255,255,.5)"}>How it works</a>
            <a href="#waitlist" style={{ fontSize:13,color:"rgba(255,255,255,.5)",textDecoration:"none",fontWeight:600,transition:"color .2s" }} onMouseEnter={e=>e.target.style.color="#fff"} onMouseLeave={e=>e.target.style.color="rgba(255,255,255,.5)"}>Waitlist</a>
            <a href="#waitlist" className="hovp" style={{
              padding:"8px 18px",background:"#00FF44",color:"#0a0a0a",
              fontSize:12,fontWeight:700,fontFamily:"'Space Mono',monospace",
              letterSpacing:".08em",border:"2px solid #0a0a0a",
              textDecoration:"none",
            }}>JOIN ★</a>
          </div>
        </header>

        {/* ===== HERO ===== */}
        <section style={{ minHeight:"100vh",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:"120px 24px 80px",position:"relative",zIndex:5,textAlign:"center" }}>

          {/* Ticker */}
          <div style={{ position:"absolute",top:57,left:0,right:0,overflow:"hidden",height:32,background:"#E020CC",display:"flex",alignItems:"center",borderBottom:"2px solid rgba(0,0,0,.3)" }}>
            <div style={{ display:"flex",whiteSpace:"nowrap",animation:"marquee 22s linear infinite" }}>
              {Array(10).fill(null).map((_,i) => (
                <span key={i} style={{ fontSize:10,fontWeight:700,letterSpacing:".18em",color:"#0a0a0a",fontFamily:"'Silkscreen',monospace",padding:"0 24px" }}>
                  ★ VERSEFIEND ★ BOOK UR FEATURE ★ ARTISTS 4 HIRE ★ SET UR RATE ★ COMING SOON ★
                </span>
              ))}
            </div>
          </div>

          {/* Badge */}
          <div style={{ display:"inline-flex",alignItems:"center",gap:8,padding:"6px 16px",border:"1px solid rgba(0,255,68,.3)",borderRadius:100,marginBottom:28,animation:"fadeUp .8s ease both,borderPulse 4s ease infinite",background:"rgba(0,255,68,.06)" }}>
            <div style={{ width:6,height:6,borderRadius:"50%",background:"#00FF44",boxShadow:"0 0 8px #00FF44" }} />
            <span style={{ fontSize:12,fontFamily:"'Space Mono',monospace",letterSpacing:".1em",color:"#00FF44",fontWeight:700 }}>LAUNCHING SOON</span>
          </div>

          {/* Glitch title */}
          <div style={{ position:"relative",display:"inline-block",animation:"fadeUp .8s ease .1s both" }}>
            <h1 style={{ position:"absolute",top:0,left:0,fontFamily:"'Rubik Glitch',sans-serif",fontSize:"clamp(72px,15vw,200px)",fontWeight:400,lineHeight:.88,color:"#00FF44",opacity:.5,transform:`translate(${gl?-5:-2}px,${gl?3:1}px)`,transition:"transform .05s",pointerEvents:"none",userSelect:"none",mixBlendMode:"screen" }} aria-hidden="true">VERSE<br/>FIEND</h1>
            <h1 style={{ position:"absolute",top:0,left:0,fontFamily:"'Rubik Glitch',sans-serif",fontSize:"clamp(72px,15vw,200px)",fontWeight:400,lineHeight:.88,color:"#FF1111",opacity:.4,transform:`translate(${gl?5:2}px,${gl?-3:-1}px)`,transition:"transform .05s",pointerEvents:"none",userSelect:"none",mixBlendMode:"screen" }} aria-hidden="true">VERSE<br/>FIEND</h1>
            <h1 style={{ position:"relative",fontFamily:"'Rubik Glitch',sans-serif",fontSize:"clamp(72px,15vw,200px)",fontWeight:400,lineHeight:.88,color:"#fff",animation:"rgbShift 4s steps(2) infinite,flicker 6s infinite",transform:`translate(${gx}px,${gy}px)` }}>
              VERSE<br/>FIEND
            </h1>
          </div>

          {/* Subtitle */}
          <p style={{ marginTop:36,maxWidth:560,fontSize:18,lineHeight:1.7,color:"rgba(255,255,255,.6)",fontWeight:500,animation:"fadeUp .8s ease .3s both" }}>
            The marketplace where artists
            <span style={{ color:"#00FF44",fontWeight:700 }}> book features</span>,
            <span style={{ color:"#DDCC00",fontWeight:700 }}> verify through Spotify</span>,
            and <span style={{ color:"#00CCFF",fontWeight:700 }}>get paid</span>.
          </p>

          {/* Sticker tags */}
          <div style={{ display:"flex",gap:10,marginTop:32,flexWrap:"wrap",justifyContent:"center",animation:"fadeUp .8s ease .5s both" }}>
            {[
              { t:"BOOK UR FEATURE",bg:"#00FF44",r:-2 },
              { t:"SPOTIFY VERIFIED",bg:"#E020CC",r:1.5,tc:"#fff" },
              { t:"SET UR RATE",bg:"#DDCC00",r:-1 },
            ].map((s,i) => (
              <span key={i} className="hovp" style={{
                padding:"8px 16px",background:s.bg,color:s.tc||"#0a0a0a",
                fontFamily:"'Silkscreen',monospace",fontSize:10,fontWeight:700,
                letterSpacing:".1em",border:"2px solid #0a0a0a",
                boxShadow:"3px 3px 0 #0a0a0a",transform:`rotate(${s.r}deg)`,
              }}>{s.t}</span>
            ))}
          </div>

          {/* Scroll hint */}
          <div style={{ marginTop:60,animation:"fadeUp .8s ease .7s both",opacity:.4 }}>
            <div style={{ width:1,height:40,background:"linear-gradient(180deg,rgba(255,255,255,.3),transparent)",margin:"0 auto 8px" }} />
            <span style={{ fontSize:10,fontFamily:"'Space Mono',monospace",letterSpacing:".15em",color:"rgba(255,255,255,.4)" }}>SCROLL</span>
          </div>
        </section>

        {/* ===== HOW IT WORKS ===== */}
        <section id="how" style={{ padding:"100px 24px",position:"relative",zIndex:5 }}>
          <div style={{ maxWidth:1060,margin:"0 auto" }}>
            <div style={{ marginBottom:56 }}>
              <span style={{ fontSize:11,fontFamily:"'Space Mono',monospace",letterSpacing:".2em",color:"#E020CC",fontWeight:700 }}>HOW IT WORKS</span>
              <h2 style={{ fontFamily:"'Bagel Fat One',cursive",fontSize:"clamp(36px,6vw,64px)",marginTop:12,lineHeight:1,letterSpacing:".01em" }}>
                Three steps.<br/><span style={{ color:"#00FF44" }}>Zero friction.</span>
              </h2>
            </div>

            <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:56,alignItems:"center" }}>

              {/* LEFT — App preview visual */}
              <div style={{ position:"relative" }}>
                {/* Phone frame */}
                <div style={{
                  background:"#111114",border:"2px solid rgba(255,255,255,.12)",
                  borderRadius:32,padding:"16px 14px",maxWidth:340,margin:"0 auto",
                  boxShadow:"0 40px 80px rgba(0,0,0,.5),0 0 0 1px rgba(255,255,255,.05),0 0 60px rgba(224,32,204,.1)",
                  position:"relative",overflow:"hidden",
                }}>
                  {/* Notch */}
                  <div style={{ width:80,height:6,borderRadius:4,background:"rgba(255,255,255,.1)",margin:"0 auto 14px" }} />

                  {/* App header */}
                  <div style={{ display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:16,padding:"0 4px" }}>
                    <div style={{ display:"flex",alignItems:"center",gap:8 }}>
                      <div style={{ width:22,height:22,borderRadius:6,background:"linear-gradient(135deg,#E020CC,#00FF44)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:8,fontFamily:"'Bagel Fat One',cursive",color:"#0a0a0a" }}>VF</div>
                      <span style={{ fontFamily:"'Silkscreen',monospace",fontSize:9,letterSpacing:".1em",color:"rgba(255,255,255,.5)" }}>DISCOVER</span>
                    </div>
                    <div style={{ display:"flex",gap:4 }}>
                      <div style={{ width:6,height:6,borderRadius:"50%",background:"#00FF44" }} />
                    </div>
                  </div>

                  {/* Featured artist card */}
                  <div style={{
                    background:"rgba(255,255,255,.04)",border:"1px solid rgba(255,255,255,.08)",
                    borderRadius:16,padding:"20px 18px",marginBottom:12,position:"relative",overflow:"hidden",
                  }}>
                    <div style={{ position:"absolute",top:0,left:0,right:0,height:2,background:"linear-gradient(90deg,#E020CC,transparent)" }} />
                    <div style={{ display:"flex",alignItems:"center",gap:14,marginBottom:16 }}>
                      <div style={{ width:52,height:52,borderRadius:"50%",background:"linear-gradient(135deg,#E020CC,#AA00CC)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:26,border:"2px solid rgba(255,255,255,.1)" }}>🎙️</div>
                      <div>
                        <div style={{ fontFamily:"'Bagel Fat One',cursive",fontSize:20,color:"#fff",lineHeight:1 }}>NOVA</div>
                        <div style={{ display:"flex",gap:6,marginTop:6 }}>
                          <span style={{ fontSize:9,padding:"2px 8px",background:"#E020CC",color:"#0a0a0a",borderRadius:4,fontFamily:"'Silkscreen',monospace",fontWeight:700 }}>PLUGGNB</span>
                          <span style={{ fontSize:9,padding:"2px 8px",background:"rgba(255,255,255,.08)",color:"rgba(255,255,255,.5)",borderRadius:4,fontFamily:"'Space Mono',monospace" }}>⭐ 4.9</span>
                        </div>
                      </div>
                    </div>
                    <div style={{ fontSize:11,color:"rgba(255,255,255,.4)",lineHeight:1.5,marginBottom:16,fontWeight:500 }}>
                      smooth pluggnb vocals + ethereal melodies. floats over any production.
                    </div>
                    {/* Tiers */}
                    <div style={{ display:"flex",gap:6,marginBottom:16 }}>
                      {[{t:"VERSE",p:"$350"},{t:"HOOK",p:"$600"},{t:"FULL",p:"$1.2K"}].map((tier,ti) => (
                        <div key={ti} style={{
                          flex:1,padding:"10px 0",textAlign:"center",borderRadius:8,
                          background:ti===1?"rgba(224,32,204,.15)":"rgba(255,255,255,.04)",
                          border:ti===1?"1px solid #E020CC":"1px solid rgba(255,255,255,.06)",
                        }}>
                          <div style={{ fontSize:8,fontFamily:"'Space Mono',monospace",color:"rgba(255,255,255,.35)",letterSpacing:".1em",marginBottom:2 }}>{tier.t}</div>
                          <div style={{ fontSize:14,fontWeight:700,color:ti===1?"#E020CC":"rgba(255,255,255,.7)" }}>{tier.p}</div>
                        </div>
                      ))}
                    </div>
                    <div style={{
                      padding:"10px 0",textAlign:"center",borderRadius:10,
                      background:"#00FF44",color:"#0a0a0a",
                      fontFamily:"'Bagel Fat One',cursive",fontSize:13,letterSpacing:".05em",
                    }}>BOOK FEATURE ★</div>
                  </div>

                  {/* Second card peek */}
                  <div style={{
                    background:"rgba(255,255,255,.03)",border:"1px solid rgba(255,255,255,.06)",
                    borderRadius:16,padding:"16px 18px",opacity:.6,
                  }}>
                    <div style={{ display:"flex",alignItems:"center",gap:12 }}>
                      <div style={{ width:40,height:40,borderRadius:"50%",background:"linear-gradient(135deg,#FF1111,#DDCC00)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:20 }}>🔥</div>
                      <div>
                        <div style={{ fontFamily:"'Bagel Fat One',cursive",fontSize:16,color:"#fff",lineHeight:1 }}>BLKSMTH</div>
                        <span style={{ fontSize:8,fontFamily:"'Silkscreen',monospace",color:"rgba(255,255,255,.35)",letterSpacing:".1em" }}>TRAP · FROM $200</span>
                      </div>
                    </div>
                  </div>

                  {/* Bottom bar */}
                  <div style={{ display:"flex",justifyContent:"center",gap:24,marginTop:16,paddingTop:12,borderTop:"1px solid rgba(255,255,255,.06)" }}>
                    {["DISCOVER","BOOKED"].map((tab,ti) => (
                      <span key={ti} style={{ fontSize:9,fontFamily:"'Silkscreen',monospace",letterSpacing:".1em",color:ti===0?"#00FF44":"rgba(255,255,255,.25)",fontWeight:700 }}>{tab}</span>
                    ))}
                  </div>
                </div>

                {/* Decorative elements around phone */}
                <svg style={{ position:"absolute",top:-10,right:10,opacity:.4,animation:"wobble 5s ease-in-out infinite" }} viewBox="0 0 30 30" width="24" height="24"><path d="M15 2 L17 11 L26 11 L19 17 L22 26 L15 21 L8 26 L11 17 L4 11 L13 11 Z" fill="none" stroke="#E020CC" strokeWidth="1.5" /></svg>
                <svg style={{ position:"absolute",bottom:20,left:0,opacity:.3,animation:"drift 10s ease-in-out infinite" }} viewBox="0 0 20 20" width="20" height="20"><path d="M4 4 L16 16 M16 4 L4 16" stroke="#00FF44" strokeWidth="2" strokeLinecap="round" /></svg>
              </div>

              {/* RIGHT — Steps */}
              <div style={{ display:"flex",flexDirection:"column",gap:32 }}>
                {[
                  { n:"01",title:"DISCOVER",desc:"Browse Spotify-verified artists by genre. See their rates, monthly listeners, and what they sound like — all before you commit.",icon:"⚡",color:"#00FF44" },
                  { n:"02",title:"GET BOOKED",desc:"Connect your Spotify to verify. Set your verse, hook, and full feature rates. Your stats get pulled automatically — no cap needed.",icon:"💀",color:"#E020CC" },
                  { n:"03",title:"LOCK IT IN",desc:"Pick an artist, choose your tier, send the request. Once they accept, it's locked in. Real artists, real rates, no middlemen.",icon:"🔥",color:"#DDCC00" },
                ].map((c,i) => (
                  <div key={i} style={{ display:"flex",gap:20,alignItems:"flex-start" }}>
                    {/* Number + line */}
                    <div style={{ display:"flex",flexDirection:"column",alignItems:"center",flexShrink:0 }}>
                      <div style={{
                        width:56,height:56,borderRadius:14,
                        background:"rgba(255,255,255,.04)",
                        border:`1px solid ${c.color}44`,
                        display:"flex",alignItems:"center",justifyContent:"center",
                        fontFamily:"'Rubik Glitch',sans-serif",fontSize:24,color:c.color,
                      }}>{c.n}</div>
                      {i < 2 && <div style={{ width:1,height:32,background:`linear-gradient(180deg,${c.color}44,transparent)`,marginTop:4 }} />}
                    </div>
                    {/* Content */}
                    <div style={{ paddingTop:4 }}>
                      <div style={{ display:"flex",alignItems:"center",gap:10,marginBottom:8 }}>
                        <h3 style={{ fontFamily:"'Silkscreen',monospace",fontSize:14,color:c.color,letterSpacing:".12em" }}>{c.title}</h3>
                        <span style={{ fontSize:20 }}>{c.icon}</span>
                      </div>
                      <p style={{ fontSize:14,color:"rgba(255,255,255,.45)",lineHeight:1.7,fontWeight:500 }}>{c.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ===== GENRES ===== */}
        <section style={{ padding:"80px 24px",position:"relative",zIndex:5 }}>
          <div style={{ maxWidth:960,margin:"0 auto",textAlign:"center" }}>
            <span style={{ fontSize:11,fontFamily:"'Space Mono',monospace",letterSpacing:".2em",color:"#00CCFF",fontWeight:700 }}>GENRES</span>
            <h2 style={{ fontFamily:"'Bagel Fat One',cursive",fontSize:"clamp(28px,5vw,48px)",marginTop:12,marginBottom:40,lineHeight:1 }}>
              Every sound. <span style={{ color:"#E020CC" }}>Every scene.</span>
            </h2>

            <div style={{ display:"flex",gap:12,flexWrap:"wrap",justifyContent:"center" }}>
              {[
                { n:"RAGE",c:"#FF1111" },{ n:"HYPERPOP",c:"#E020CC" },{ n:"TRAP",c:"#DDCC00" },
                { n:"HIP-HOP",c:"#00FF44" },{ n:"PLUGGNB",c:"#00CCFF" },{ n:"DIGICORE",c:"#AA00CC" },
              ].map((g,i) => (
                <div key={g.n} className="hovp" style={{
                  padding:"14px 28px",
                  background:"rgba(255,255,255,.03)",
                  border:`1px solid ${g.c}44`,
                  borderRadius:12,
                  fontSize:13,fontWeight:700,
                  fontFamily:"'Silkscreen',monospace",
                  letterSpacing:".12em",color:g.c,
                  transition:"all .2s ease",
                  position:"relative",overflow:"hidden",
                }}>
                  <div style={{ position:"absolute",inset:0,background:`radial-gradient(circle at center,${g.c}11,transparent)`,opacity:0,transition:"opacity .2s" }} />
                  {g.n}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== STATS ===== */}
        <section style={{ padding:"60px 24px",position:"relative",zIndex:5 }}>
          <div style={{ maxWidth:700,margin:"0 auto",display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:24,textAlign:"center" }}>
            {[
              { val:"06",label:"GENRES",c:"#00FF44" },
              { val:"∞",label:"ARTISTS",c:"#E020CC" },
              { val:"SOON",label:"LAUNCH",c:"#DDCC00" },
            ].map((s,i) => (
              <div key={i} style={{ padding:"24px 0" }}>
                <div style={{ fontFamily:"'Rubik Glitch',sans-serif",fontSize:42,color:s.c,lineHeight:1,marginBottom:8 }}>{s.val}</div>
                <div style={{ fontSize:10,fontFamily:"'Space Mono',monospace",letterSpacing:".2em",color:"rgba(255,255,255,.35)",fontWeight:700 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ===== WAITLIST ===== */}
        <section id="waitlist" style={{ padding:"100px 24px",position:"relative",zIndex:5 }}>
          <div style={{ maxWidth:560,margin:"0 auto",textAlign:"center" }}>
            <span style={{ fontSize:11,fontFamily:"'Space Mono',monospace",letterSpacing:".2em",color:"#00FF44",fontWeight:700 }}>EARLY ACCESS</span>
            <h2 style={{ fontFamily:"'Bagel Fat One',cursive",fontSize:"clamp(32px,6vw,56px)",marginTop:12,marginBottom:16,lineHeight:1 }}>
              Get in <span style={{ color:"#00FF44" }}>first</span>.
            </h2>
            <p style={{ fontSize:15,color:"rgba(255,255,255,.5)",lineHeight:1.7,marginBottom:36,fontWeight:500 }}>
              Join the waitlist for early access. Be among the first artists to list, book, and earn on VERSEFIEND.
            </p>

            {!submitted ? (
              <div style={{ display:"flex",gap:0,maxWidth:480,margin:"0 auto",borderRadius:12,overflow:"hidden",border:"2px solid rgba(255,255,255,.12)",transition:"border-color .3s",boxShadow:"0 4px 24px rgba(0,0,0,.3)" }}>
                <input type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="ur@email.com"
                  style={{ flex:1,padding:"18px 20px",background:"rgba(255,255,255,.06)",border:"none",color:"#fff",fontSize:15,fontFamily:"'Space Mono',monospace",fontWeight:700,borderRadius:0 }} />
                <button onClick={()=>{if(email.includes("@"))setSubmitted(true)}} className="hovp"
                  style={{ padding:"18px 28px",background:"#00FF44",color:"#0a0a0a",border:"none",fontFamily:"'Bagel Fat One',cursive",fontSize:16,letterSpacing:".05em",cursor:"pointer",borderRadius:0,whiteSpace:"nowrap" }}>
                  JOIN ★
                </button>
              </div>
            ) : (
              <div style={{ display:"inline-flex",alignItems:"center",gap:10,padding:"18px 32px",border:"2px solid #00FF44",borderRadius:12,background:"rgba(0,255,68,.08)" }}>
                <div style={{ width:8,height:8,borderRadius:"50%",background:"#00FF44",boxShadow:"0 0 12px #00FF44" }} />
                <span style={{ fontFamily:"'Bagel Fat One',cursive",fontSize:18,color:"#00FF44",letterSpacing:".05em" }}>UR IN — WE&apos;LL HIT U UP ★</span>
              </div>
            )}

            <p style={{ marginTop:16,fontSize:12,color:"rgba(255,255,255,.25)",fontFamily:"'Space Mono',monospace" }}>
              No spam. Just early access + updates.
            </p>
          </div>
        </section>

        {/* ===== FOOTER ===== */}
        <footer style={{ padding:"48px 24px",borderTop:"1px solid rgba(255,255,255,.06)",position:"relative",zIndex:5 }}>
          <div style={{ maxWidth:960,margin:"0 auto",display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:20 }}>
            <div style={{ display:"flex",alignItems:"center",gap:10 }}>
              <div style={{ width:28,height:28,borderRadius:6,background:"linear-gradient(135deg,#E020CC,#00FF44)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:10,fontWeight:700,fontFamily:"'Bagel Fat One',cursive",color:"#0a0a0a" }}>VF</div>
              <span style={{ fontFamily:"'Bagel Fat One',cursive",fontSize:14,color:"rgba(255,255,255,.4)" }}>
                <span style={{ color:"#E020CC" }}>VERSE</span><span style={{ color:"#00FF44" }}>FIEND</span>
              </span>
            </div>
            <p style={{ fontSize:11,color:"rgba(255,255,255,.25)",fontFamily:"'Space Mono',monospace",letterSpacing:".08em" }}>
              © 2026 VERSEFIEND. ALL RIGHTS RESERVED.
            </p>
          </div>
        </footer>

        {/* Bottom ticker */}
        <div style={{ overflow:"hidden",height:28,background:"#E020CC",display:"flex",alignItems:"center",position:"relative",zIndex:5 }}>
          <div style={{ display:"flex",whiteSpace:"nowrap",animation:"marquee 30s linear infinite reverse" }}>
            {Array(12).fill(null).map((_,i) => (
              <span key={i} style={{ fontSize:9,letterSpacing:".18em",color:"#0a0a0a",fontFamily:"'Silkscreen',monospace",padding:"0 20px",fontWeight:700 }}>
                RAGE ★ HYPERPOP ★ TRAP ★ HIP-HOP ★ PLUGGNB ★ DIGICORE ★
              </span>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
