(function(C){
 'use strict';
 C.bindIsotopes=app=>{
  const $=id=>document.getElementById(id),s=app.state,profile=app.updateProfile,modelUI=app.updateModelUI,setIsotope=app.setIsotope.bind(app);let fadeTimer;
  const nuclearState=document.createElement('p');nuclearState.id='isotope-nuclear-state';$('isotope-why').after(nuclearState);
  const evidence=document.createElement('p');evidence.id='isotope-data-status';evidence.className='hint';$('isotope-half-life').after(evidence);
  const say=key=>(app.atom.element.isotopeEducation?.[key]||C.isotopeText[key])[s.level];
  // Replace early copper-63 examples with active-isotope wording.
  C.explanations.concepts.isotope={elementary:a=>'Isotopes are versions of '+a.element.name.toLowerCase()+' with different numbers of neutrons.',middle:a=>C.atomLabel(a)+' has '+a.protons+' protons and '+a.neutrons+' neutrons. Other isotopes have a different neutron count.',high:a=>'Isotopes share a proton count but differ in neutrons. '+C.atomLabel(a)+' has mass number '+a.massNumber+', the sum of its protons and neutrons.'};
  for(const level of ['elementary','middle','high'])C.explanations.concepts.massNumber[level]=a=>'Mass number counts protons and neutrons. '+C.atomLabel(a)+' has '+a.protons+' + '+a.neutrons+' = '+a.massNumber+'.';
  for(const level of ['elementary','middle','high'])C.explanations.compare[level]=C.explanations.compare[level].replaceAll('copper-63','selected');
  for(const [stable,label,observational] of [[true,'Stable',false],[true,'Observationally stable',true],[false,'Radioactive',false]]){const group=document.createElement('optgroup');group.label=label;for(const iso of Object.values(C.isotopes).filter(i=>i.atomicNumber===app.atom.element.atomicNumber&&i.common&&i.stable===stable&&(!stable||!!i.observationallyStable===observational)))group.append(new Option(iso.displayName||app.atom.element.name+'-'+iso.massNumber,iso.id));if(group.children.length)$('isotope-select').append(group);}
  app.updateIsotopeInfo=()=>{
   const a=app.atom,i=a.isotope;$('isotope-select').value=i.id;
   evidence.hidden=!i.measurementStatus;const uncertainty=i.halfLife?.uncertainty;evidence.textContent=i.measurementStatus?(s.level==='elementary'?'Scientists measured radioactive changes.':(i.measurementStatus==='measured'?'Measured decay data.':'Evaluated decay observations; limited data.')+(s.level==='high'&&uncertainty?' Half-life uncertainty: +'+uncertainty.plus+' / −'+uncertainty.minus+' '+uncertainty.unit+'.':'')):'';
   nuclearState.hidden=!i.nuclearStateDescriptions;nuclearState.textContent=i.nuclearStateDescriptions?.[s.level]||'';
   $('nuclear-symbol').textContent=String(a.massNumber).replace(/\d/g,d=>'⁰¹²³⁴⁵⁶⁷⁸⁹'[d])+(i.metastableStateLabel?'ᵐ':'')+String(a.protons).replace(/\d/g,d=>'₀₁₂₃₄₅₆₇₈₉'[d])+a.element.symbol;
   $('stability').textContent=i.stabilityClassification|| (i.stable?'Stable isotope':'Radioactive isotope');if(!i.stable){const icon=document.createElement('span');icon.className='radioactivity-icon';icon.textContent='☢';icon.setAttribute('role','img');icon.setAttribute('aria-label','Radioactivity');$('stability').prepend(icon);}
   $('isotope-half-life').hidden=!!(app.atom.element.heavyDExplorer||app.atom.element.heavyPExplorer)&&i.stable;
   $('isotope-half-life').textContent='Half-life: '+(i.stable?'Stable — no radioactive decay has been observed.':i.halfLife?.display||'Not specified');
   $('isotope-information').hidden=!C.isotopes[i.id];if(!C.isotopes[i.id])return;
   $('isotope-abundance').textContent=i.abundanceTextByLevel?.[s.level]||i.abundanceText||'Natural terrestrial abundance: '+(i.naturalAbundance?('Approximately '+i.naturalAbundance.percent+'%.'):'Not present in ordinary copper in a lasting measurable proportion; produced for research or medical use.');
   $('isotope-decay').hidden=i.stable;$('isotope-decay').textContent='Decay mode: '+(i.decayModes||[]).join('; ');
   $('isotope-why').textContent=i.descriptions?.[s.level]||i.why||i.note||'';$('isotope-uses').textContent=i.usesByLevel?.[s.level]||i.uses||'No specific application listed.';
   const natural=Object.values(C.isotopes).filter(record=>record.atomicNumber===a.protons&&(record.stable||record.naturalComponent)&&record.naturalAbundance);
   const bar=$('abundance-bar');bar.replaceChildren();const labels=document.querySelector('.abundance-labels');labels.replaceChildren();
   const ranges=natural.some(record=>record.naturalAbundance.rangePercent);bar.hidden=ranges||natural.length<2;
   natural.forEach((record,index)=>{const segment=document.createElement('span');segment.className=index%2?'abundance-65':'abundance-63';if(!ranges){segment.style.flexGrow=String(record.naturalAbundance.percent);bar.append(segment);}if(index)labels.append(document.createElement('br'));const abundance=record.naturalAbundance;labels.append(document.createTextNode((record.displayName||a.element.name+'-'+record.massNumber)+(!record.stable?(record.halfLife?.evidence?' (reported rare decay)':' (radioactive)'):'')+': '+(abundance.rangePercent?abundance.rangePercent.join('–'):abundance.percent+(abundance.uncertaintyPercentagePoints?' ± '+abundance.uncertaintyPercentagePoints:''))+'%')); });
   bar.setAttribute('aria-label','Terrestrial isotope comparison: '+natural.map(record=>(record.displayName||a.element.name+'-'+record.massNumber)+(!record.stable?(record.halfLife?.evidence?' reported rare decay':' radioactive'):'')+' '+(record.naturalAbundance.rangePercent?record.naturalAbundance.rangePercent.join(' to '):record.naturalAbundance.percent)+' percent').join('; '));
   $('abundance-comparison').hidden=natural.length<2;$('abundance-explanation').textContent=say('abundance')+(a.element.abundanceSuffix||'');
   $('weighted-explanation').textContent=say('weighted');$('cosmic-explanation').textContent=say('cosmic');
   const guide=$('isotope-guide');guide.replaceChildren();for(const [key,label] of Object.entries({isotope:'Isotope',stable:'Stable isotope',radioactive:'Radioactive isotope',abundance:'Natural abundance',halfLife:'Half-life',decay:'Decay mode',weighted:'Weighted average atomic mass',medical:'Medical isotope',cosmic:'Cosmic origin'})){if(a.element.isotopeGuideKeys&&!a.element.isotopeGuideKeys.includes(key))continue;const dt=document.createElement('dt'),dd=document.createElement('dd');dt.textContent=label;dd.textContent=say(key);guide.append(dt,dd);}
   const list=$('isotope-sources');list.replaceChildren();for(const key of [...new Set([...(i.sources||[]),...(a.element.isotopeSourceKeys||[])])]){const source=C.isotopeSources[key],li=document.createElement('li'),link=document.createElement('a');link.href=source.url;link.target='_blank';link.rel='noopener noreferrer';link.textContent=source.title;li.append(link,document.createTextNode(' — '+source.organization+'. Accessed '+source.accessed+'. '+source.supports));list.append(li);}
   if(s.view==='atom')$('presentation-model').textContent=C.modelNames[s.model]+' · '+C.atomLabel(a)+' · '+a.protons+'p · '+a.neutrons+'n';
  };
  app.updateProfile=()=>{profile();app.updateIsotopeInfo();};app.updateModelUI=()=>{modelUI();app.updateIsotopeInfo();};
  app.setIsotope=isotope=>{
   C.withIsotope(app.atom,isotope); // Validate before navigation or mutations.
   if(s.view==='nucleon')app.backToAtom();
   const paused=s.paused,selected=app.selectionTarget(s.selected),subshell=s.subshell,overlay=$('transition-canvas');clearTimeout(fadeTimer);
   if(!s.reducedMotion&&app.renderer){overlay.width=app.canvas.width;overlay.height=app.canvas.height;overlay.getContext('2d').clearRect(0,0,overlay.width,overlay.height);overlay.getContext('2d').drawImage(app.canvas,0,0);overlay.hidden=false;overlay.classList.remove('leaving');void overlay.offsetWidth;overlay.classList.add('leaving');s.transitioning=true;fadeTimer=setTimeout(()=>{s.transitioning=false;overlay.hidden=true;overlay.classList.remove('leaving');},320);}else{overlay.hidden=true;s.transitioning=false;}
   setIsotope(isotope);s.paused=paused;s.subshell=subshell;$('subshell').value=subshell;
   if(selected?.type==='electron')app.select(selected.id);app.updateSubshell();app.updateIsotopeInfo();app.updateControls();app.draw();
   app.message(C.atomLabel(app.atom)+' selected: '+app.atom.protons+' protons, '+app.atom.neutrons+' neutrons, '+app.atom.electrons+' electrons.');
  };
  $('isotope-select').onchange=()=>{app.setIsotope(C.isotopes[$('isotope-select').value]);$('isotope-select').focus({preventScroll:true});};
  app.updateProfile();
 };
})(window.Copper);
