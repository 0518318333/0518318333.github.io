const slides=[...document.querySelectorAll('.hero-bg')];
const dots=[...document.querySelectorAll('.dots button')];
let current=0;
function showSlide(i){current=(i+slides.length)%slides.length;slides.forEach((s,idx)=>s.classList.toggle('active',idx===current));dots.forEach((d,idx)=>d.classList.toggle('on',idx===current));}
document.querySelector('.next').addEventListener('click',()=>showSlide(current+1));
document.querySelector('.prev').addEventListener('click',()=>showSlide(current-1));
dots.forEach((d,i)=>d.addEventListener('click',()=>showSlide(i)));
setInterval(()=>showSlide(current+1),4500);

const filterBtns=document.querySelectorAll('.filter button');
const galleryImgs=document.querySelectorAll('.gallery-grid img');
filterBtns.forEach(btn=>btn.addEventListener('click',()=>{filterBtns.forEach(b=>b.classList.remove('active'));btn.classList.add('active');const f=btn.dataset.filter;galleryImgs.forEach(img=>img.classList.toggle('hide',f!=='all'&&img.dataset.cat!==f));}));

const lightbox=document.querySelector('.lightbox');
const lightImg=document.querySelector('.lightbox img');
galleryImgs.forEach(img=>img.addEventListener('click',()=>{lightImg.src=img.src;lightImg.alt=img.alt;lightbox.classList.add('show');lightbox.setAttribute('aria-hidden','false');}));
document.querySelector('.lightbox button').addEventListener('click',()=>{lightbox.classList.remove('show');lightbox.setAttribute('aria-hidden','true');});
lightbox.addEventListener('click',e=>{if(e.target===lightbox)document.querySelector('.lightbox button').click();});

document.querySelector('.top-btn').addEventListener('click',()=>scrollTo({top:0,behavior:'smooth'}));
