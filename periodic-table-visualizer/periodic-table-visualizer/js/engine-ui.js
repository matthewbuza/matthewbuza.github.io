(function(C){
 'use strict';
 C.bindEngine=app=>{
  const $=id=>document.getElementById(id),s=app.state,update=app.updateModelUI,select=app.select,updateSub=app.updateSubshell;
  const progression=document.createElement('details'),progressionTitle=document.createElement('summary'),progressionText=document.createElement('p');
  progression.id='period-progression';progressionTitle.textContent='Across Period 3';progression.append(progressionTitle,progressionText);document.querySelector('.conduction').after(progression);
  const evidence=document.createElement('p');evidence.id='configuration-data-status';evidence.className='hint';$('configuration').after(evidence);
  app.rebuildChoices=()=>{
   $('subshell').replaceChildren(new Option('All occupied orbitals','all'));
   app.atom.subshells.filter(sub=>sub.occupancy).forEach(sub=>$('subshell').append(new Option(sub.id,sub.id)));
   $('wave-shell').replaceChildren(new Option('All occupied levels','all'));
   C.waveStates(app.atom).forEach(w=>$('wave-shell').append(new Option((w.subshell||'Level '+w.shell)+' · '+w.occupancy+' electron'+(w.occupancy===1?'':'s'),w.key)));
   $('isotope-select').replaceChildren();
   const records={...C.isotopes,...C.developmentIsotopes};
   for(const [stable,label,observational] of [[true,'Stable',false],[true,'Observationally stable',true],[false,'Radioactive',false]]){const group=document.createElement('optgroup');group.label=!stable&&Object.values(records).some(i=>i.atomicNumber===app.atom.protons&&i.halfLife?.evidence)?'Radioactive / reported decay':label;for(const iso of Object.values(records).filter(i=>i.atomicNumber===app.atom.protons&&i.stable===stable&&(!stable||!!i.observationallyStable===observational)))group.append(new Option(iso.displayName||app.atom.element.name+'-'+iso.massNumber,iso.id));if(group.children.length)$('isotope-select').append(group);}
   $('isotope-select').value=app.atom.isotope.id;
  };
  app.updateEngineUI=()=>{
   const status=app.atom.element.dataStatus;evidence.hidden=!status;evidence.textContent=status?(s.level==='elementary'?'Electron arrangement: based on calculations.':'Configuration primarily predicted. '+(status.chemistry==='partiallyMeasured'?'Some chemistry measured. ':'Chemistry mostly predicted. ')+'Bulk properties not measured.'):'';
   progression.hidden=!app.atom.element.periodProgression;progressionTitle.textContent=app.atom.element.periodProgressionTitle||'Across Period 3';progressionText.textContent=(app.atom.element.periodProgression?.[s.level]||'')+(app.atom.element.configurationNote?' '+app.atom.element.configurationNote[s.level]:'');
   const quantum=s.view==='atom'&&s.model==='quantum',wave=s.view==='atom'&&s.model==='wave';
   document.querySelector('[data-quantum="explore"]').disabled=!app.atom.electrons;
   $('quantum-modes').hidden=!quantum;$('quantum-summary').hidden=!quantum;
   $('subshell-control').hidden=!quantum||s.quantumMode!=='explore';$('wave-control').hidden=!wave;
   document.querySelectorAll('[data-quantum]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.quantum===s.quantumMode)));
   $('quantum-summary').textContent=s.quantumMode==='overview'?'Simplified Overview · '+app.atom.electrons+' electrons. Inner regions may be grouped; outer and important regions are emphasized.':'Explore one occupied subshell. Other regions are hidden for clarity.';
   if(C.complexity(app.atom).tier==='full'&&s.quantumMode==='overview')$('quantum-summary').textContent='Overview · All '+app.atom.subshells.length+' occupied subshells. Inner regions are subdued; valence regions are emphasized.';
   if(app.atom.electrons===1&&app.atom.configuration==='1s¹')$('quantum-summary').textContent='Occupied 1s¹ · One electron. The spherical cloud shows where it is more likely to be detected.';
   if(!app.atom.electrons)$('quantum-summary').textContent='This ion has no electrons, so no electron probability regions are shown.';
   const full=C.complexity(app.atom).tier==='full',notice=(app.atom.element.modelNotice||(full?C.fullDetailNotice:C.simplifications))[s.level],limits=(full?C.fullDetailLimits:C.modelLimits)[s.level];
   $('simplification-notice').textContent=notice;$('simplification-details').textContent=limits;
   $('about-model').textContent=notice+' '+limits;
   const option=$('subshell').querySelector('[value="all"]');if(option){option.hidden=s.quantumMode==='explore';option.disabled=s.quantumMode==='explore';}
  };
  app.updateSubshell=()=>{updateSub();const sub=app.atom.subshells.find(sub=>sub.id===s.subshell);if(sub&&(app.atom.element.actinideExplorer||app.atom.element.transactinideExplorer)){$('subshell-info').textContent+=' '+(sub.id==='5f'?'The f subshell has seven orbitals and room for 14 electrons. One representative shape is shown.':sub.id==='6d'?(app.atom.element.transactinideExplorer?'The d subshell has five orbitals and room for 10 electrons. These states matter in predicted chemistry.':'The d subshell has five orbitals and room for 10 electrons. These electrons also influence bonding.'):sub.id==='7p'?('The p subshell has three orbitals and room for six electrons. '+app.atom.element.name+' has '+sub.occupancy+' electron'+(sub.occupancy===1?'':'s')+' here.'):sub.id==='7s'?app.atom.valence.descriptions[s.level]:'Part of the 86-electron inner core.');}else if(sub&&app.atom.element.heavyPExplorer){$('subshell-info').textContent+=' '+(sub.id==='4f'?'This filled f subshell has seven orbitals holding 14 electrons. One representative shape is shown.':sub.id==='5d'?'This filled inner d subshell has five orbitals holding 10 electrons.':sub.n===6?app.atom.valence.descriptions[s.level]:'Part of the 78-electron inner core.');}else if(sub&&app.atom.element.heavyDExplorer){$('subshell-info').textContent+=' '+(sub.id==='4f'?'This filled f subshell has seven orbitals holding 14 electrons. One representative shape is shown.':sub.id==='5d'?'The d subshell has five orbitals and room for 10 electrons. These electrons also affect bonding.':sub.id==='6s'?app.atom.valence.descriptions[s.level]:'Part of the 68-electron inner core.');}else if(sub&&app.atom.element.lanthanideExplorer){$('subshell-info').textContent+=' '+(sub.id==='4f'?({elementary:'The f group has seven orbitals and room for 14 electrons. This shape is one simplified example.',middle:'An f subshell has seven orbitals and holds up to 14 electrons. One representative shape is shown, not the whole group as a rigid object.',high:'Seven orbitals make up an f subshell, with a maximum of 14 electrons. This qualitative shape represents one orientation, not a rigid object containing the entire subshell.'}[s.level]):sub.id==='5d'?'The occupied 5d state also matters for bonding.':sub.id==='6s'?app.atom.valence.descriptions[s.level]:'Part of the closed xenon core.');}else if(sub&&(app.atom.element.period4Completion||app.atom.element.period5Completion)){$('subshell-info').textContent+=' Principal energy level '+sub.n+'. Orbital type '+sub.l+'. '+(app.atom.element.filledCoreSubshells.includes(sub.id)?'Filled inner '+sub.id+' subshell: five related orbitals holding 10 electrons. ':app.atom.valence.shells.includes(sub.n)?'Valence region in the outer shell. ':'Inner core. ')+(app.atom.valence.shells.includes(sub.n)?app.atom.valence.descriptions[s.level]:'');}else if(sub&&(app.atom.element.period4Detail||app.atom.element.period5Detail)){$('subshell-info').textContent+=' Principal energy level '+sub.n+'. '+(sub.id===app.atom.element.transitionRegion?'Chemically important transition region. The '+sub.id+' subshell contains five related orbitals. ':app.atom.valence.shells.includes(sub.n)?'Outer shell. ':'Inner core. ')+(C.isImportant(app.atom,sub)?app.atom.valence.descriptions[s.level]:'');}else if(sub){$('subshell-info').textContent+=' Type '+sub.l+'. '+(C.isImportant(app.atom,sub)?'Valence subshell. ':'Inner subshell. ')+(C.isImportant(app.atom,sub)?(app.atom.valence.descriptions?.[s.level]||app.atom.valence.studentNote)||'This is an outer occupied subshell.':'');}app.updateEngineUI();};
  app.updateModelUI=()=>{update();app.updateEngineUI();};
  app.select=id=>{
   if(s.view==='atom'&&s.model==='quantum'){
    if(id?.startsWith('orbital-'))s.quantumMode='explore';
    else if(!id){s.quantumMode='overview';s.subshell='all';}
   }
   select(id);app.updateEngineUI();
   const target=app.selectionTarget(s.selected);
   if(s.view==='atom'&&target?.region==='wave'){const p=document.createElement('p');p.textContent=target.subshell?target.subshell+': '+target.occupancy+' of '+C.capacity[target.l]+' electrons. '+(target.filledCore?'Filled inner '+target.subshell:target.transition?'Chemically important '+target.subshell:target.valence?((app.atom.element.period4Completion||app.atom.element.period5Completion)?'Valence':(app.atom.element.period4Detail||app.atom.element.period5Detail)?'Outer '+target.shell+'s':'Valence'):'Inner')+' state. One band represents the subshell.':'Level '+target.shell+' contains '+app.atom.shells[target.shell-1]+' electrons. '+(target.group?'The occupied outer bands are highlighted.':'One band represents the level.');$('particle-info').append(p);}
   if(s.view==='atom'&&target?.type==='electron'&&!app.atom.element.period4Detail&&!app.atom.element.period5Detail&&app.atom.valence.studentNote&&(!(app.atom.element.actinideExplorer||app.atom.element.transactinideExplorer)||target.valence)&&(!app.atom.element.fullDetail||target.valence||target.transition)){const note=app.atom.valence.descriptions?.[s.level]||app.atom.valence.studentNote;if(!Array.from($('particle-info').querySelectorAll('p')).some(p=>p.textContent===note)){const p=document.createElement('p');p.textContent=note;$('particle-info').append(p);}}
  };
  document.querySelectorAll('[data-quantum]').forEach(b=>b.onclick=()=>{
   s.quantumMode=b.dataset.quantum;
   if(s.quantumMode==='overview')app.select(null);
   else {const sub=app.atom.subshells.find(sub=>sub.id===s.subshell)||app.atom.subshells.filter(sub=>sub.occupancy).at(-1);if(sub)app.select('orbital-'+sub.id);}
   app.updateSubshell();app.draw();
  });
  $('wave-shell').onchange=()=>{s.waveShell=$('wave-shell').value;app.select(null);app.draw();if(s.waveShell!=='all')app.select('wave-'+s.waveShell);};
  $('isotope-select').onchange=()=>{const iso=C.isotopes[$('isotope-select').value]||C.developmentIsotopes?.[$('isotope-select').value];app.setIsotope(iso);$('isotope-select').focus({preventScroll:true});};
  // Transactional entry point: validate and construct before disposing the old view.
  // Ion configurations are explicit; isotope replacement keeps the same electrons.
  app.loadAtom=(options={})=>{
   const result=C.validateRecord(options.element,options.isotope,options.ion,options.electronStructure);
   if(!result.ok){$('engine-error').hidden=false;$('engine-error').textContent=result.error+' Current atom retained. Choose a valid element or isotope to continue.';return result;}
   let nextRenderer;const nextParticles=C.makeParticles(result.atom),model=options.model||s.model;
   try{if(!C.models[model])throw Error('Unknown model '+model);nextRenderer=new C.models[model](app.canvas,s,nextParticles,result.atom);}
   catch(error){const message=result.atom.element.name+': renderer: '+error.message;$('engine-error').hidden=false;$('engine-error').textContent=message+' Current atom retained.';return {ok:false,error:message};}
   if(s.view==='nucleon')app.backToAtom();
   Object.values(app.renderers).forEach(r=>r.dispose());app.renderers={[model]:nextRenderer};app.renderer=nextRenderer;app.atom=result.atom;app.particles=nextParticles;
   Object.assign(s,{model,level:options.level||s.level,selected:null,subshell:'all',quantumMode:'overview',waveShell:'all',yaw:.3,pitch:.62,zoom:1,lowDetail:false});
   $('engine-error').hidden=true;app.message('');app.rebuildChoices();app.updateProfile();app.updateCategories();app.updateModelUI();app.select(null);app.updateControls();app.draw();return result;
  };
  const target=app.selectionTarget;app.selectionTarget=id=>id==='group-transition'?{id,type:'electron',group:true,transition:true,valence:false,count:app.atom.subshells.find(sub=>sub.id===app.atom.element.transitionRegion)?.occupancy||0,shell:app.atom.subshells.find(sub=>sub.id===app.atom.element.transitionRegion)?.n,subshell:app.atom.element.transitionRegion}:id==='group-valence'?{id,type:'electron',group:true,valence:true,count:C.valenceCount(app.atom),shell:app.atom.valence.shells.at(-1),...(s.model==='wave'?{region:'wave'}:{})}:target.call(app,id);
  const category=app.selectCategory;app.selectCategory=id=>{if(s.view==='atom'&&id==='filled-core-electron'){if(s.model==='bohr'){const match=app.particles.find(p=>p.filledCore);app.select(match?.id);return;}s.waveShell='all';$('wave-shell').value='all';app.draw();app.select((s.model==='wave'?'wave-':'orbital-')+app.atom.element.filledCoreSubshells[0]);return;}if(s.view==='atom'&&id==='transition-electron'&&app.atom.element.transitionRegion){s.waveShell='all';$('wave-shell').value='all';app.draw();app.select(s.model==='bohr'?'group-transition':s.model==='wave'?'wave-'+app.atom.element.transitionRegion:'orbital-'+app.atom.element.transitionRegion);return;}if(s.view==='atom'&&id==='valence-electron'&&C.valenceCount(app.atom)>1&&s.model!=='quantum'){s.waveShell='all';$('wave-shell').value='all';app.select('group-valence');return;}if(s.view==='atom'&&s.model==='wave'&&id?.includes('electron')){s.waveShell='all';$('wave-shell').value='all';}category(id);};
  app.rebuildChoices();app.updateModelUI();
 };
})(window.Copper);
