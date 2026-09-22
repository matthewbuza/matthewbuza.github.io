(function(C){
  'use strict';
  const defaultDescription=(a,level)=>a.element.conciseOverview?[a.element.descriptions[level]]:[
    C.atomLabel(a)+' contains '+a.protons+(a.protons===1?' proton, ':' protons, ')+a.neutrons+(a.neutrons===1?' neutron, and ':' neutrons, and ')+a.electrons+(a.electrons===1?' electron. ':' electrons. ')+(a.charge===0?'It is neutral because it has the same number of positive protons and negative electrons.':'It has a net charge because its numbers of protons and electrons are different.'),
    ...(a.element.descriptions?.[level]?[a.element.descriptions[level]]:[])
  ];
  C.bindUI=function(app){
    const $=id=>document.getElementById(id),s=app.state;let messageTimer;
    app.updateSubshell=()=>{
      const sub=app.atom.subshells.find(sub=>sub.id===s.subshell);
      $('subshell-info').textContent=sub?sub.id+': '+sub.occupancy+' of '+({s:2,p:6,d:10,f:14}[sub.l])+' electrons. '+({s:'Spherical region.',p:'Three paired-lobe orbitals; one orientation is brighter to show its shape.',d:'Multi-lobed character. One of five orientations is emphasized.',f:'Complex multi-lobed character. One representative of seven orientations is emphasized.'}[sub.l]||'Qualitative region.'):C.fullConfiguration(app.atom.subshells)+' · '+app.atom.electrons+' electrons. Simplified grouped density, not a calculated total density.';
    };
    for(const sub of app.atom.subshells.filter(sub=>sub.occupancy>0))$('subshell').append(new Option(sub.id,sub.id));
    app.updateModelUI=()=>{
      document.querySelectorAll('[data-model]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.model===s.model)));
      document.querySelectorAll('[data-level]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.level===s.level)));
      $('model-title').textContent=C.modelNames[s.model];$('presentation-model').textContent=C.modelNames[s.model];$('model-heading').textContent=({bohr:'01 / BOHR',wave:'02 / MATTER WAVES',quantum:'03 / PROBABILITY CLOUDS'}[s.model]);
      const context=app.atom.element.context,box=document.querySelector('.conduction');box.hidden=!context;
      if(context){box.querySelector('h3').textContent=context.title;box.querySelector('p').textContent=context.descriptions[s.level]||context.descriptions.high;}
      $('model-description').textContent=C.explain('models',s.model,s.level,app.atom);$('compare-text').textContent=C.explain('compare',null,s.level,app.atom);
      $('subshell-control').hidden=s.model!=='quantum';app.updateSubshell();
      $('model-note').textContent=({bohr:'This is a simplified model. Sizes and distances are not to scale. Real electrons do not follow fixed circular tracks.',wave:'Standing waves are a teaching picture of allowed states. Wave counts and sizes are illustrative, not calculated atomic states.',quantum:'Clouds show likelihood, not a mist. Dots are not individual electrons. Shapes, sizes, and pulsing are illustrative.'}[s.model]);
      const glossary=$('definitions');glossary.replaceChildren();
      for(const [key,label] of Object.entries({proton:'Proton',neutron:'Neutron','inner-electron':'Inner electron','valence-electron':'Valence electron',nucleus:'Nucleus',shell:'Electron shell',wave:'Matter wave',orbital:'Orbital',isotope:'Isotope',element:'Element',atomicNumber:'Atomic number',massNumber:'Mass number',ion:'Ion'})){const dt=document.createElement('dt'),dd=document.createElement('dd');dt.textContent=label;dd.textContent=C.explain('concepts',key,s.level,app.atom);glossary.append(dt,dd);}
    };
    app.updateProfile=()=>{
      const a=app.atom,name=C.atomLabel(a);
      for(const id of ['explorer-name','explorer-title'])if($(id))$(id).textContent=a.element.name+' Atom Explorer';
      if($('explorer-subtitle'))$('explorer-subtitle').textContent='Explore atomic structure, electrons and nucleon interiors';
      const mark=document.querySelector('.element-mark');mark.replaceChildren(document.createTextNode(a.element.symbol));const z=document.createElement('small');z.textContent=a.protons;mark.append(z);
      $('isotope-title').textContent=name;$('profile-isotope').textContent=name;
      $('charge-title').textContent=a.charge===0?'Neutral atom':'Ion';
      $('stability').textContent=a.isotope.stable===true?'Stable isotope':a.isotope.stable===false?'Radioactive isotope':'Stability not specified';
      $('nuclear-symbol').textContent=String(a.massNumber).replace(/\d/g,d=>'⁰¹²³⁴⁵⁶⁷⁸⁹'[Number(d)])+a.element.symbol;
      $('nuclear-symbol').setAttribute('aria-label',name+', atomic number '+a.protons);
      for(const [id,value] of Object.entries({'atomic-number':a.protons,'mass-number':a.massNumber,protons:a.protons,neutrons:a.neutrons,electrons:a.electrons,'net-charge':a.charge===0?'0 · neutral':String(a.charge)}))$(id).textContent=value;
      $('configuration').replaceChildren(document.createTextNode(a.shells.join(' – ')));const note=document.createElement('small');note.textContent='Electron shells · '+a.configuration;$('configuration').append(note);
      $('atom').setAttribute('aria-label','Three-dimensional conceptual '+name+' atom: '+a.protons+' protons, '+a.neutrons+' neutrons, '+a.electrons+' electrons. Arrow keys rotate, plus and minus zoom. Use the particle type list to inspect with a keyboard.');
      $('about-model').textContent='Particle sizes are not shown to scale, and nucleus-to-electron distances are compressed. Bohr-style paths are conceptual, not literal physical tracks. Protons and neutrons have internal structure, which will be explored in a later phase. '+name+' has a mass number of '+a.massNumber+', not a weighted average atomic mass. '+(a.isotope.note||'');
    };
    app.message=text=>{$('status').textContent=text;clearTimeout(messageTimer);messageTimer=setTimeout(()=>$('status').textContent='',5000);};
    app.updateControls=()=>{$('pause').textContent=s.paused?'Resume Animation':'Pause Animation';$('pause').setAttribute('aria-pressed',String(s.paused));$('labels').textContent=s.labels?'Hide Labels':'Show Labels';$('labels').setAttribute('aria-pressed',String(s.labels));$('zoom-level').textContent=s.zoom.toFixed(1)+'×';};
    app.updateCategories=()=>{
      $('particle-list').replaceChildren();const placeholder=new Option('Choose a particle type…','');placeholder.hidden=true;$('particle-list').append(placeholder);
      const unavailable=[];
      for(const category of C.particleCategories(app.particles,app.atom)){const option=new Option(category.label,category.id);option.disabled=!category.available;$('particle-list').append(option);if(!category.available)unavailable.push(category.reason);}
      $('category-note').textContent=unavailable.join(' ');
    };
    app.select=id=>{
      const p=app.selectionTarget(id);s.selected=p?p.id:null;$('clear').hidden=!p;$('particle-list').value=p?C.categoryFor(p):'';
      const panel=$('particle-info');panel.replaceChildren();const h=document.createElement('h3');
      h.textContent=p?.group?'Valence electrons · '+p.count:p?(p.type==='electron'?(p.valence?'Valence Electron':'Inner Electron')+' · '+(p.region==='orbital'?p.subshell:p.region==='wave'?(p.subshell?'Wave state '+p.subshell:'Wave level '+p.shell):'Shell '+p.shell):C.types[p.type].name):C.atomLabel(app.atom);panel.append(h);
      if(p?.type==='electron'&&(app.atom.element.period4Completion||app.atom.element.period5Completion))h.textContent=(p.filledCore?'Filled '+app.atom.element.filledCoreSubshells.join(', ')+' subshell':p.valence?'Valence electron'+(p.group?'s':''):'Inner electron')+' · '+(p.group?p.count:p.subshell||'Shell '+p.shell);
      if(p?.type==='electron'&&(app.atom.element.period4Detail||app.atom.element.period5Detail)&&!app.atom.element.period4Completion&&!app.atom.element.period5Completion)h.textContent=(p.transition?app.atom.element.transitionRegion+' transition electron'+(p.group?'s':''):p.valence?'Outermost '+app.atom.valence.shells.at(-1)+'s electron'+(p.group?'s':''):'Inner Electron')+' · '+(p.group?p.count:p.subshell||'Shell '+p.shell);
      if(p?.region&&!app.atom.element.period4Detail&&!app.atom.element.period5Detail&&app.atom.element.waveResolution==='subshell'&&!p.group)h.textContent=(p.valence?'Valence':'Inner')+' state · '+(p.subshell||'Level '+p.shell);
      if(p?.type==='electron'&&(app.atom.element.lanthanideExplorer||app.atom.element.heavyDExplorer||(app.atom.element.heavyPExplorer||(app.atom.element.actinideExplorer||app.atom.element.transactinideExplorer)))&&!p.combinedCore)h.textContent=(p.valence?((app.atom.element.heavyPExplorer||(app.atom.element.actinideExplorer||app.atom.element.transactinideExplorer))?'Outer-region electron':'Outermost 6s electron')+(p.group?'s':''):'Inner electron')+' · '+(p.group?p.count:p.subshell||'Shell '+p.shell);
      if(p?.combinedCore)h.textContent='Combined inner core · '+p.count+' electrons';
      const add=text=>{const el=document.createElement('p');el.textContent=text;panel.append(el);};
      if(p?.region==='orbital'){s.subshell=p.subshell;$('subshell').value=p.subshell;app.updateSubshell();}
      if(!p&&s.model==='quantum'){s.subshell='all';$('subshell').value='all';app.updateSubshell();}
      if(p){
        add((p.group?'Charge per electron: ':'Charge: ')+({proton:'Positive (+1)',neutron:'Neutral (0)',electron:'Negative (−1)'}[p.type]));
        add((p.group?'Mass per electron: ':'Mass: ')+(p.type==='electron'?(s.level==='elementary'?'Extremely small':'Extremely small — about 1/1836 the mass of a proton'):'About 1 atomic mass unit'));
        if(p.type==='electron'&&(app.atom.element.lanthanideExplorer||app.atom.element.heavyDExplorer||(app.atom.element.heavyPExplorer||(app.atom.element.actinideExplorer||app.atom.element.transactinideExplorer)))&&p.subshell){const sub=app.atom.subshells.find(sub=>sub.id===p.subshell);if(sub)add(sub.id+': '+sub.occupancy+' of '+C.capacity[sub.l]+' electrons in this subshell.');}
        if(p.combinedCore)add(app.atom.element.education.models.quantum[s.level]);
        else if(p.region){add(C.explain('regions',p.region+(p.filledCore?'Filled':p.transition?'Transition':p.valence?'Valence':'Inner'),s.level,app.atom));}
        else add(C.explain('concepts',C.categoryFor(p),s.level,app.atom));
      }
      else {defaultDescription(app.atom,s.level).forEach(add);if(app.atom.isotope.descriptions)add(app.atom.isotope.descriptions[s.level]);}app.draw();
    };
    app.selectCategory=category=>{
      if(!category){app.select(null);return;}
      const match=app.particles.find(p=>C.categoryFor(p)===category);if(!match)return;
      if(s.model!=='bohr'&&match.type==='electron'){
        if(s.model==='wave'){const shell=category==='valence-electron'?match.shell:Math.min(...app.atom.shells.map((n,i)=>n&&!app.atom.valence.shells.includes(i+1)?i+1:Infinity));app.draw();const wave=C.waveStates(app.atom).find(w=>w.shell===shell);app.select(wave?.id||'wave-'+shell);}
        else{const sub=app.atom.subshells.find(sub=>sub.occupancy>0&&(category==='valence-electron'?app.atom.valence.shells.includes(sub.n):!app.atom.valence.shells.includes(sub.n)));if(sub){s.subshell=sub.id;$('subshell').value=sub.id;app.select('orbital-'+sub.id);app.updateSubshell();}}
        return;
      }
      if(!app.renderer){app.select(match.id);return;}
      app.draw();let hit=app.renderer.representative(category);
      // Keep the current camera whenever possible. Zoom out incrementally only
      // for offscreen candidates, then search nearby angles for an exposed face.
      const hasOnscreen=()=>app.renderer.hits.some(h=>C.categoryFor(h.p)===category&&h.x>h.r+8&&h.x<app.renderer.w-h.r-8&&h.y>h.r+8&&h.y<app.renderer.h-h.r-8);
      while(!hit&&!hasOnscreen()&&s.zoom>.65){s.zoom=Math.max(.65,s.zoom*.9);app.draw();hit=app.renderer.representative(category);}
      const yaw=s.yaw;
      for(let step=1;!hit&&step<=36;step++){for(const direction of [1,-1]){s.yaw=yaw+direction*step*.09;app.draw();hit=app.renderer.representative(category);if(hit)break;}}
      if(!hit)s.yaw=yaw;
      app.updateControls();app.select(hit?hit.p.id:match.id);
    };
    app.updateProfile();app.updateCategories();app.updateModelUI();app.select(null);
    $('particle-list').addEventListener('change',e=>app.selectCategory(e.target.value));$('clear').onclick=()=>{app.select(null);$('particle-list').focus();};
    $('pause').onclick=()=>{s.paused=!s.paused;app.updateControls();app.draw();};$('labels').onclick=()=>{s.labels=!s.labels;app.updateControls();app.draw();};$('reset').onclick=()=>{s.yaw=.3;s.pitch=.62;s.zoom=1;app.select(null);app.updateControls();app.draw();};$('zoom-in').onclick=()=>app.zoom(1.2);$('zoom-out').onclick=()=>app.zoom(1/1.2);
    document.querySelectorAll('[data-model]').forEach(button=>button.onclick=()=>app.switchModel(button.dataset.model));
    document.querySelectorAll('[data-level]').forEach(button=>button.onclick=()=>{s.level=button.dataset.level;app.updateModelUI();app.select(s.selected);});
    $('subshell').onchange=()=>{s.subshell=$('subshell').value;app.select(s.subshell==='all'?null:'orbital-'+s.subshell);app.updateSubshell();};
    $('help').onclick=()=>$('help-dialog').showModal();$('close-help').onclick=()=>$('help-dialog').close();app.updateControls();
  };
})(window.Copper);
