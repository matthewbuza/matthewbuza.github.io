(function(C){
 'use strict';
 C.startExplorer=()=>{if(C.app)return C.app;
 const reduced=matchMedia('(prefers-reduced-motion: reduce)');
 const atom=C.createAtom({element:C.elements[29],isotope:C.isotopes['copper-63']});
 let slowFrames=0,transitionTimer;
 const app=C.app={canvas:document.getElementById('atom'),atom,particles:C.makeParticles(atom),renderers:{},state:{model:'bohr',level:'high',subshell:'all',quantumMode:'overview',waveShell:'all',presentation:false,reducedMotion:reduced.matches,lowDetail:false,yaw:.3,pitch:.62,zoom:1,time:0,paused:reduced.matches,labels:true,selected:null},
  draw(){if(this.active===false||!this.renderer)return;const start=performance.now();this.renderer.render();if(performance.now()-start>28){if(++slowFrames>30)this.state.lowDetail=true;}else slowFrames=Math.max(0,slowFrames-1);},
  zoom(factor){this.state.zoom=Math.max(.65,Math.min(7,this.state.zoom*factor));this.updateControls();this.draw();},
  selectionTarget(id){return this.renderer?.target?.(id)||this.particles.find(p=>p.id===id);},
  switchModel(model){
   if(!C.models[model]||model===this.state.model)return;
   const overlay=document.getElementById('transition-canvas');clearTimeout(transitionTimer);
   if(!this.state.reducedMotion&&this.renderer){overlay.width=this.canvas.width;overlay.height=this.canvas.height;overlay.getContext('2d').clearRect(0,0,overlay.width,overlay.height);overlay.getContext('2d').drawImage(this.canvas,0,0);overlay.hidden=false;overlay.classList.remove('leaving');void overlay.offsetWidth;overlay.classList.add('leaving');transitionTimer=setTimeout(()=>{if(!this.state.transitioning){overlay.hidden=true;overlay.classList.remove('leaving');}},320);}else overlay.hidden=true;
   const selected=this.selectionTarget(this.state.selected);this.state.model=model;
   try{this.renderer=this.renderers[model]||(this.renderers[model]=new C.models[model](this.canvas,this.state,this.particles,this.atom));this.canvas.hidden=false;document.getElementById('fallback').hidden=true;}catch(error){this.renderer=null;this.canvas.hidden=true;document.getElementById('fallback').hidden=false;}
   this.state.selected=selected&&selected.type!=='electron'?selected.id:null;
   this.updateModelUI();this.select(this.state.selected);this.message(C.modelNames[model]+' selected. Same '+C.atomLabel(this.atom)+' atom.');
  }
 };
 C.bindUI(app);C.bindPresentation(app);C.bindSubatomic(app);
 app.setIsotope=function(isotope){
  const next=C.withIsotope(this.atom,isotope),sameNucleus=next.massNumber===this.atom.massNumber;
  if(!sameNucleus)this.particles=[...C.makeNucleus(next),...this.particles.filter(p=>p.type==='electron')];this.atom=next;
  Object.values(this.renderers).forEach(renderer=>{renderer.atom=next;renderer.particles=this.particles;});
  this.updateProfile();this.updateCategories();this.select(sameNucleus||this.state.selected?.startsWith('electron-')?this.state.selected:null);
 };
 C.bindIsotopes(app);C.bindEngine(app);
 try{app.renderer=app.renderers.bohr=new C.models.bohr(app.canvas,app.state,app.particles,app.atom);C.bindInteractions(app);app.draw();}catch(error){document.getElementById('fallback').hidden=false;app.canvas.hidden=true;}
 let last=0,frame=0;
 function tick(now){if(app.active===false||document.hidden){frame=0;last=0;return;}const delta=last?Math.min((now-last)/1000,.05):0;last=now;if(!app.state.paused){app.state.time+=delta;app.draw();}frame=requestAnimationFrame(tick);}
 document.addEventListener('visibilitychange',()=>{cancelAnimationFrame(frame);last=0;if(!document.hidden&&app.active!==false)frame=requestAnimationFrame(tick);});
 window.addEventListener('resize',()=>app.draw());
 reduced.addEventListener('change',e=>{app.state.reducedMotion=e.matches;if(e.matches){app.state.paused=true;document.getElementById('transition-canvas').hidden=true;app.updateControls();app.draw();}});
 app.setActive=active=>{app.active=active;cancelAnimationFrame(frame);frame=0;last=0;if(active&&!document.hidden){app.draw();frame=requestAnimationFrame(tick);}};
 app.setActive(true);return app;
 };
 if(!document.getElementById('periodic-page'))C.startExplorer();
})(window.Copper);
