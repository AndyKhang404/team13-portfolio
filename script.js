// Shared interactions for team + member pages — pure JS
(function(){
const root=document.documentElement;
const saved=localStorage.getItem('aurafamers-theme');
if(saved)root.setAttribute('data-theme',saved);
else if(window.matchMedia('(prefers-color-scheme: dark)').matches)root.setAttribute('data-theme','dark');
const tt=document.getElementById('themeToggle');
if(tt)tt.addEventListener('click',()=>{const n=root.getAttribute('data-theme')==='dark'?'light':'dark';root.setAttribute('data-theme',n);localStorage.setItem('aurafamers-theme',n);});

const navLinks=document.getElementById('navLinks'),menuBtn=document.getElementById('menuBtn');
if(menuBtn&&navLinks){menuBtn.addEventListener('click',()=>navLinks.classList.toggle('open'));navLinks.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>navLinks.classList.remove('open')));}

// Filter buttons
const btns=[...document.querySelectorAll('.filter-btn')];
const projects=[...document.querySelectorAll('.project')];
btns.forEach(b=>b.addEventListener('click',()=>{
  btns.forEach(x=>x.classList.remove('active'));b.classList.add('active');
  const f=b.dataset.filter;
  let vis=0;
  projects.forEach(p=>{const show=f==='all'||(p.dataset.category||'').includes(f);p.style.display=show?'':'none';if(show)vis++;});
  const nr=document.getElementById('noResult');if(nr)nr.style.display=vis===0?'':'none';
}));

// Live search (team page)
const search=document.getElementById('teamSearch');
if(search){search.addEventListener('input',()=>{
  const q=search.value.toLowerCase().trim();
  document.getElementById('team-projects').scrollIntoView({behavior:'smooth',block:'start'});
  let vis=0;
  projects.forEach(p=>{const t=((p.dataset.title||'')+' '+p.textContent).toLowerCase();const show=!q||t.includes(q);p.style.display=show?'':'none';if(show)vis++;});
  const nr=document.getElementById('noResult');if(nr)nr.style.display=vis===0?'':'none';
});}

// Tabs
document.querySelectorAll('.tabs').forEach(t=>{
  const b=t.querySelectorAll('.tab-btn');
  b.forEach(x=>x.addEventListener('click',()=>{
    b.forEach(y=>y.classList.remove('active'));x.classList.add('active');
    t.querySelectorAll('.tab-panel').forEach(p=>p.classList.toggle('active',p.id===x.dataset.tab));
  }));
});

// Accordion
document.querySelectorAll('.acc-btn').forEach(b=>b.addEventListener('click',()=>{
  const p=b.nextElementSibling;const open=p.classList.contains('open');
  document.querySelectorAll('.acc-panel').forEach(x=>x.classList.remove('open'));
  if(!open)p.classList.add('open');
}));

// Modals
document.querySelectorAll('.open-modal').forEach(b=>b.addEventListener('click',()=>{
  const m=document.getElementById(b.dataset.modal);if(m)m.classList.add('open');
}));
document.querySelectorAll('.modal').forEach(m=>{
  m.addEventListener('click',e=>{if(e.target===m||e.target.classList.contains('modal-x'))m.classList.remove('open');});
});
document.addEventListener('keydown',e=>{if(e.key==='Escape')document.querySelectorAll('.modal.open').forEach(m=>m.classList.remove('open'));});

// Counters
const counters=document.querySelectorAll('[data-count]');
const cio=new IntersectionObserver(es=>es.forEach(en=>{
  if(!en.isIntersecting)return;const el=en.target;cio.unobserve(el);
  const target=+el.dataset.count;let cur=0;const step=Math.max(1,Math.round(target/40));
  const t=setInterval(()=>{cur+=step;if(cur>=target){cur=target;clearInterval(t);}el.textContent=cur;},40);
}),{threshold:.5});
counters.forEach(c=>cio.observe(c));

// Reveal
const io=new IntersectionObserver(es=>es.forEach(en=>{if(en.isIntersecting)en.target.classList.add('visible');}),{threshold:.12});
document.querySelectorAll('.card,.hero-text').forEach(el=>{el.classList.add('reveal');io.observe(el);});

// Scroll spy
const secs=[...document.querySelectorAll('main section[id]')];
const links=[...document.querySelectorAll('.nav-links a[href^="#"]')];
if(secs.length&&links.length){const obs=new IntersectionObserver(es=>es.forEach(en=>{if(en.isIntersecting)links.forEach(l=>l.classList.toggle('active',l.getAttribute('href')==='#'+en.target.id));}),{rootMargin:'-40% 0px -55% 0px'});secs.forEach(s=>obs.observe(s));}

// Copy email (works on all pages)
const ce=document.getElementById('copyEmail');
if(ce)ce.addEventListener('click',async()=>{
  const mail=document.querySelector('a[href^="mailto:"]');
  const email=(mail?mail.getAttribute('href'): 'mailto:hunghuehy310506@gmail.com').replace('mailto:','').split('?')[0];
  try{await navigator.clipboard.writeText(email);alert('Copied: '+email);}catch{prompt('Copy email:',email);}
});
const ce2=document.getElementById('copyEmail2');if(ce2&&ce)ce2.addEventListener('click',()=>ce.click());

// Contact form -> mailto
const form=document.getElementById('contactForm');
if(form)form.addEventListener('submit',e=>{
  e.preventDefault();
  const n=(document.getElementById('fName')||{}).value||'friend';
  const m=(document.getElementById('fMsg')||{}).value||'';
  const to=(document.querySelector('a[href^="mailto:"]')||{getAttribute:()=>'mailto:aurafamers@hcmus.edu.vn'}).getAttribute('href').replace('mailto:','').split('?')[0];
  window.location.href=`mailto:${to}?subject=${encodeURIComponent('Hello AuraFamers — from '+n)}&body=${encodeURIComponent(m)}`;
});

// To top + year
const toTop=document.getElementById('toTop');
const prog=document.getElementById('progress');
if(toTop){window.addEventListener('scroll',()=>toTop.classList.toggle('show',window.scrollY>600));toTop.addEventListener('click',()=>window.scrollTo({top:0,behavior:'smooth'}));}
if(prog){window.addEventListener('scroll',()=>{const h=document.documentElement;prog.style.width=(h.scrollTop/(h.scrollHeight-h.clientHeight)*100)+'%';},{passive:true});}
const y=document.getElementById('year');if(y)y.textContent=new Date().getFullYear();

// Typing effect (team home)
const typing=document.getElementById('typing');
if(typing){const lines=['🌾 growing ideas into real products...','backend → AI → web → IoT → blockchain','Hung · Duc · Khang — HCMUS'];let li=0,ci=0,del=false;
(function tick(){const s=lines[li];typing.textContent=s.slice(0,ci);ci+=del?-1:1;
if(!del&&ci>s.length){del=true;setTimeout(tick,1200);return;}
if(del&&ci===0){del=false;li=(li+1)%lines.length;}
setTimeout(tick,del?32:62);})();}

// Tilt on cards (desktop only)
if(window.matchMedia('(pointer:fine)').matches){document.querySelectorAll('.member-card,.project').forEach(c=>{c.classList.add('tilt');
c.addEventListener('mousemove',e=>{const r=c.getBoundingClientRect();const x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;c.style.transform=`translateY(-6px) rotateX(${-y*8}deg) rotateY(${x*10}deg)`;});
c.addEventListener('mouseleave',()=>{c.style.transform='';});});}
})();
