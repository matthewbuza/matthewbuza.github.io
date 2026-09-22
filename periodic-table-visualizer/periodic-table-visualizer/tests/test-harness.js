(function(C){
 'use strict';
 const app=C.app,$=id=>document.getElementById(id);
 C.testLoad=z=>{
  const element=C.developmentElements[z]||C.elements[z],isotope=element&&(C.developmentIsotopes[element.defaultIsotope]||C.isotopes[element.defaultIsotope]);
  const result=app.loadAtom({element,isotope});
  if(!result.ok){$('validation-results').textContent='FAIL: '+result.error;return result;}
  $('test-element').value=String(z);document.querySelector('.element-mark').textContent=element.symbol;document.querySelector('.conduction').hidden=z!==29;
  const a=app.atom;$('validation-results').textContent='Periodic table: '+(C.periodicValidation.ok?'118 records PASS':'FAIL '+C.periodicValidation.errors.join('; '))+'\nPASS: '+a.element.name+'-'+a.massNumber+'\nProtons: '+a.protons+' | Neutrons: '+a.neutrons+' | Electrons: '+a.electrons+'\nShells: '+a.shells.join(', ')+' | Total: '+a.shells.reduce((x,y)=>x+y,0)+'\nOccupied subshells: '+C.fullConfiguration(a.subshells)+'\nSubshell total: '+a.subshells.reduce((sum,s)=>sum+s.occupancy,0)+'\nStability: '+(a.isotope.stable?'Stable':'Radioactive')+'\nComplexity: '+result.tier+'\nValidated: identity, isotope ownership, signed charge, shell/subshell sums and capacities.\nCategories: '+C.particleCategories(app.particles,a).map(c=>c.label+(c.available?'':' (disabled: '+c.reason+')')).join('; ');
  $('performance-results').textContent='Use Measure 30 draws for this atom and model.';return result;
 };
 $('test-element').onchange=()=>C.testLoad(Number($('test-element').value));$('return-copper').onclick=()=>C.testLoad(29);
 $('benchmark').onclick=()=>{const times=[];for(let i=0;i<30;i++){const start=performance.now();app.draw();times.push(performance.now()-start);}times.sort((a,b)=>a-b);const r=app.renderer;$('performance-results').textContent='30 synchronous draws, current viewport (not a device frame-rate guarantee)\nMedian: '+times[15].toFixed(2)+' ms | p95: '+times[28].toFixed(2)+' ms\nCached renderers: '+Object.keys(app.renderers).length+' | Physical particles: '+app.particles.length+'\nCloud points cached: '+(r.clouds?.reduce((n,c)=>n+c.points.length,0)||0)+' | Visible cloud layers: '+(r.visibleLayers||0)+' | Drawn points: '+(r.drawnPoints||0);};
 C.testLoad(29);
})(window.Copper);
