const $=(s,p=document)=>p.querySelector(s);
const $$=(s,p=document)=>[...p.querySelectorAll(s)];

let idx=0;
const slides=$$('.hero-slide');
const dots=$$('.dots button');

function show(i){
  if(!slides.length) return;
  idx=(i+slides.length)%slides.length;
  slides.forEach((s,n)=>s.classList.toggle('active',n===idx));
  dots.forEach((d,n)=>d.classList.toggle('active',n===idx));
}

$('.prev')?.addEventListener('click',()=>show(idx-1));
$('.next')?.addEventListener('click',()=>show(idx+1));
dots.forEach((d,n)=>d.addEventListener('click',()=>show(n)));
setInterval(()=>show(idx+1),5000);

const drawer=$('.drawer');
const hamburger=$('.hamburger');

function closeMenu(){
  drawer?.classList.remove('open');
  drawer?.setAttribute('aria-hidden','true');
  hamburger?.setAttribute('aria-expanded','false');
  document.body.classList.remove('menu-open');
}

hamburger?.addEventListener('click',()=>{
  const open=!drawer.classList.contains('open');
  drawer.classList.toggle('open',open);
  drawer.setAttribute('aria-hidden',String(!open));
  hamburger.setAttribute('aria-expanded',String(open));
  document.body.classList.toggle('menu-open',open);
});

$$('.drawer a').forEach(a=>a.addEventListener('click',closeMenu));
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeMenu()});

$$('[data-scroll]').forEach(b=>b.addEventListener('click',()=>$(b.dataset.scroll)?.scrollIntoView({behavior:'smooth'})));

const filters=$$('.filter-row button');
const items=$$('.gallery-item');
filters.forEach(btn=>btn.addEventListener('click',()=>{
  filters.forEach(b=>b.classList.remove('active'));
  btn.classList.add('active');
  const f=btn.dataset.filter;
  items.forEach(it=>{
    it.classList.toggle('hide',f!=='all'&&it.dataset.cat!==f&&it.dataset.cat!=='all');
  });
}));

const light=$('.lightbox');
const lightImg=$('.lightbox img');

items.forEach(it=>it.addEventListener('click',()=>{
  const img=$('img',it);
  lightImg.src=img.src;
  lightImg.alt=img.alt;
  light.classList.add('open');
  light.setAttribute('aria-hidden','false');
}));

$('.lightbox-close')?.addEventListener('click',()=>{
  light.classList.remove('open');
  light.setAttribute('aria-hidden','true');
  lightImg.src='';
});

light?.addEventListener('click',e=>{
  if(e.target===light)$('.lightbox-close').click();
});

const topBtn=$('.to-top');
window.addEventListener('scroll',()=>topBtn?.classList.toggle('show',scrollY>600));
topBtn?.addEventListener('click',()=>scrollTo({top:0,behavior:'smooth'}));

const observer=new IntersectionObserver(entries=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      entry.target.classList.add('show');
      observer.unobserve(entry.target);
    }
  });
},{threshold:.13});

$$('.reveal').forEach(el=>observer.observe(el));
