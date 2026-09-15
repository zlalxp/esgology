(() => {
  'use strict';
  const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
  const reduced=matchMedia('(prefers-reduced-motion: reduce)'), mobile=matchMedia('(max-width:600px)');
  let ticking=false;
  const clamp=(v,min=0,max=1)=>Math.min(max,Math.max(min,v));
  function renderScroll(){
    const hero=$('.hero-track'), h=innerHeight, progress=clamp(-hero.getBoundingClientRect().top/Math.max(1,hero.offsetHeight-h));
    if(!reduced.matches){const inset=(mobile.matches?8:16)*(1-clamp(progress*3));$('.hero-sticky').style.padding=inset+'px';$('#hero-frame').style.borderRadius=(mobile.matches?20:28)*(1-clamp(progress*3))+'px';$('.hero-copy').style.opacity=1-clamp((progress-.12)*3);$('.hero-copy').style.transform=`translateY(${-progress*45}px)`;$('.hero-after').style.opacity=clamp((progress-.40)*4)*(1-clamp((progress-.90)*8));}
    const approach=$('.approach'), p=clamp(-approach.getBoundingClientRect().top/Math.max(1,approach.offsetHeight-h));
    const stage=Math.min(2,Math.floor(p*3));
    if(!mobile.matches&&!reduced.matches){$$('.scene').forEach((el,i)=>el.classList.toggle('active',i===stage));$$('.scene-copy').forEach((el,i)=>{el.classList.toggle('active',i===stage);el.setAttribute('aria-hidden',String(i!==stage))});$$('[data-scene]').forEach((el,i)=>{el.classList.toggle('active',i===stage);el.setAttribute('aria-pressed',String(i===stage))});$('#scene-counter').textContent=`0${stage+1} / 03`;}
    else $$('.scene-copy').forEach(el=>el.removeAttribute('aria-hidden'));
    ticking=false;
  }
  function schedule(){if(!ticking){ticking=true;requestAnimationFrame(renderScroll)}}
  addEventListener('scroll',schedule,{passive:true});addEventListener('resize',schedule);renderScroll();
  reduced.addEventListener('change',()=>{document.querySelectorAll('.hero-copy,.hero-after,.hero-sticky,#hero-frame').forEach(el=>el.removeAttribute('style'));schedule()});
  $$('[data-scene]').forEach(el=>el.addEventListener('click',()=>{const s=$('.approach'),i=Number(el.dataset.scene),max=s.offsetHeight-innerHeight;scrollTo({top:scrollY+s.getBoundingClientRect().top+max*(i/3+.1),behavior:reduced.matches?'instant':'smooth'})}));
  const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('visible')}),{threshold:.45});$$('.statement span,.product-stage').forEach(el=>observer.observe(el));
  $$('[data-contact]').forEach(b=>b.addEventListener('click',()=>$('#contact-dialog').showModal()));$('#credits-open').addEventListener('click',()=>$('#credits-dialog').showModal());$$('[data-close]').forEach(b=>b.addEventListener('click',()=>b.closest('dialog').close()));$$('dialog').forEach(d=>d.addEventListener('click',e=>{if(e.target===d){const r=d.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)d.close()}}));
})();
