(function(C){
 'use strict';
 C.bindSubatomic=app=>{
  const $=id=>document.getElementById(id),s=app.state;s.view='atom';s.internalSelected=null;s.nucleon=null;s.transitioning=false;
  let saved=null,frame=0,source=null;const atomSelect=app.select,atomCategory=app.selectCategory,modelUI=app.updateModelUI,switchModel=app.switchModel.bind(app),zoom=app.zoom.bind(app),reset=$('reset').onclick;
  const stopTransition=()=>{cancelAnimationFrame(frame);frame=0;source=null;s.transitioning=false;$('transition-canvas').hidden=true;};
  const text=key=>C.internalExplain(key,s.level);
  app.updateInternal=()=>{
   if(s.view!=='nucleon')return;
   const name=C.nucleons[s.nucleon].name;
   $('isotope-title').textContent=name;$('charge-title').textContent='Charge '+(C.nucleonCharge(s.nucleon).value===0?'0':'+1e');
   $('internal-title').textContent='Inside a '+name.toLowerCase();$('internal-description').textContent=text(s.nucleon);
   $('charge-parts').textContent=C.nucleons[s.nucleon].composition.map(flavor=>C.quarks[flavor].name+': '+(flavor==='up'?'+⅔e':'−⅓e')).join(' · ');
   $('charge-equation').textContent=C.chargeEquation(s.nucleon);$('charge-equation').setAttribute('aria-label',s.nucleon==='proton'?'Two thirds plus two thirds minus one third equals positive one':'Two thirds minus one third minus one third equals zero');
   $('charge-guidance').textContent=text('charge');$('strong-description').textContent=text('strong');$('mass-description').textContent=text('mass');$('sea-description').textContent=text('sea');$('color-description').textContent=text('color');$('internal-limits').textContent=text('limits');$('nucleon-compare').textContent=text('compare');
   $('model-title').textContent='Inside a '+name.toLowerCase();$('model-description').textContent=text(s.nucleon);$('model-heading').textContent='SUBATOMIC / '+name.toUpperCase();$('model-note').textContent='Not to scale. Shifting regions and curves are a conceptual picture, not actual quark paths.';
   $('presentation-model').textContent='Inside a '+name.toLowerCase();$('breadcrumb').textContent=C.atomLabel(app.atom)+' Atom › Nucleus › '+name;
   $('internal-selector').querySelector('[value="whole"]').textContent='Whole '+name.toLowerCase();
   $('atom').setAttribute('aria-label','Conceptual interior of a '+name.toLowerCase()+'. Three valence quark regions and a gluon field. Drag or use arrow keys to rotate. Escape returns to atom.');
   const component=app.renderer?.components?.find(c=>c.id===s.internalSelected),category=component?.flavor||s.internalSelected;
   $('internal-selector').value=category||'';$('internal-clear').hidden=!category;
   const panel=$('internal-component');panel.replaceChildren();if(category){const h=document.createElement('h3'),p=document.createElement('p');h.textContent=category==='whole'?'Whole '+name.toLowerCase():category==='gluon'?'Gluon field':C.quarks[category].name;p.textContent=text(category==='whole'?s.nucleon:category);panel.append(h,p);}
   app.draw();
  };
  app.selectInternal=id=>{s.internalSelected=id;app.updateInternal();};
  app.select=id=>{if(s.view==='nucleon'){if(id===s.selected){app.updateInternal();return;}app.selectInternal(id);return;}atomSelect(id);const p=app.selectionTarget(s.selected);$('explore-inside').hidden=!p||!['proton','neutron'].includes(p.type);};
  app.updateModelUI=()=>{modelUI();app.updateInternal();};
  app.switchModel=model=>{if(s.view==='nucleon')return;switchModel(model);};
  app.zoom=factor=>{if(s.view==='nucleon'){s.zoom=Math.max(.65,Math.min(2.5,s.zoom*factor));app.updateControls();app.draw();}else zoom(factor);};
  app.enterNucleon=id=>{
   if(s.view!=='atom'||s.transitioning||!app.renderer)return;
   const particle=app.particles.find(p=>p.id===id);if(!particle||!C.nucleons[particle.type])return;
   app.select(id);const hit=app.renderer.hits.find(h=>h.p.id===id),oldCanvas=app.canvas;
   source=document.createElement('canvas');source.width=oldCanvas.width;source.height=oldCanvas.height;source.getContext('2d').drawImage(oldCanvas,0,0);
   saved={scrollY:window.scrollY,renderer:app.renderer,model:s.model,yaw:s.yaw,pitch:s.pitch,zoom:s.zoom,selected:s.selected,subshell:s.subshell,paused:s.paused};
   s.view='nucleon';s.nucleon=particle.type;s.internalSelected=null;s.yaw=.3;s.pitch=.2;s.zoom=1;
   app.renderer=new C.NucleonRenderer(app.canvas,s,app.atom,particle.type);document.body.classList.add('inside');$('internal-panel').hidden=false;$('scale-nav').hidden=false;$('presentation-back').hidden=false;document.querySelectorAll('[data-model]').forEach(b=>b.disabled=true);
   if(!s.presentation)window.scrollTo({top:document.querySelector('main').offsetTop,behavior:'instant'});
   app.updateInternal();app.updateControls();app.message('Exploring inside a '+particle.type+'. Not to scale.');
   const overlay=$('transition-canvas');overlay.classList.remove('leaving');overlay.hidden=false;overlay.width=source.width;overlay.height=source.height;const g=overlay.getContext('2d'),start=performance.now(),duration=s.reducedMotion?180:1500;const px=hit?hit.x*source.width/oldCanvas.clientWidth:source.width/2,py=hit?hit.y*source.height/oldCanvas.clientHeight:source.height/2;
   s.transitioning=true;
   function transition(now){if(!source)return;const p=Math.min(1,(now-start)/duration),ease=p*p*(3-2*p),scale=s.reducedMotion?1:1+ease*7;g.clearRect(0,0,overlay.width,overlay.height);g.globalAlpha=s.reducedMotion?1-p:1-Math.max(0,(p-.35)/.65);const x=s.reducedMotion?0:(overlay.width/2-px)*ease+px*(1-scale),y=s.reducedMotion?0:(overlay.height/2-py)*ease+py*(1-scale);g.drawImage(source,x,y,source.width*scale,source.height*scale);if(p<1)frame=requestAnimationFrame(transition);else{stopTransition();if(!s.presentation)$('internal-selector').focus({preventScroll:true});}}
   frame=requestAnimationFrame(transition);
  };
  app.backToAtom=(nucleus=false)=>{
   if(s.view!=='nucleon')return;stopTransition();app.renderer.dispose();app.renderer=saved.renderer;Object.assign(s,{model:saved.model,yaw:saved.yaw,pitch:saved.pitch,zoom:nucleus?Math.max(3.2,saved.zoom):saved.zoom,selected:saved.selected,subshell:saved.subshell,paused:saved.paused,view:'atom',nucleon:null,internalSelected:null});saved=null;
   document.body.classList.remove('inside');$('internal-panel').hidden=true;$('scale-nav').hidden=true;$('presentation-back').hidden=true;document.querySelectorAll('[data-model]').forEach(b=>b.disabled=false);
   app.updateProfile();app.updateModelUI();app.select(s.selected);app.updateControls();app.draw();if(!s.presentation)$('explore-inside').focus({preventScroll:true});
  };
  $('explore-inside').onclick=()=>app.enterNucleon(s.selected);$('back-atom').onclick=()=>app.backToAtom();$('back-nucleus').onclick=()=>app.backToAtom(true);$('presentation-back').onclick=()=>app.backToAtom();
  $('internal-selector').onchange=()=>{const category=$('internal-selector').value;app.selectInternal(['up','down'].includes(category)?app.renderer.components.find(c=>c.flavor===category).id:category||null);};$('internal-clear').onclick=()=>{app.selectInternal(null);$('internal-selector').focus();};
  $('reset').onclick=()=>{if(s.view==='atom'){reset();return;}s.yaw=.3;s.pitch=.2;s.zoom=1;app.selectInternal(null);app.updateControls();};
  document.addEventListener('keydown',e=>{if(e.key==='Escape'&&s.view==='nucleon'&&!document.querySelector('dialog[open]')){e.preventDefault();e.stopImmediatePropagation();app.backToAtom();}},true);
 };
})(window.Copper);
