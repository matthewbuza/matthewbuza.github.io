(function(C){
 'use strict';
 C.deepFreeze=value=>{if(value&&typeof value==='object'){Object.values(value).forEach(C.deepFreeze);Object.freeze(value);}return value;};
 C.capacity=Object.freeze({s:2,p:6,d:10,f:14});
 C.complexityTiers=C.deepFreeze({
  full:{points:3600,overviewLayers:12,waveSegments:140,nucleusGradient:true,electronScale:1,dpr:2},
  light:{points:2400,overviewLayers:4,waveSegments:140,nucleusGradient:true,electronScale:1,dpr:2},
  medium:{points:3600,overviewLayers:4,waveSegments:120,nucleusGradient:true,electronScale:1,dpr:2},
  heavy:{points:4200,overviewLayers:4,waveSegments:72,nucleusGradient:false,electronScale:.78,dpr:1.5}
 });
 C.complexity=atom=>{const tier=atom.protons>=11&&atom.protons<=56?'full':atom.massNumber>150||atom.subshells.length>12?'heavy':atom.protons>10||atom.massNumber>30?'medium':'light';return {...C.complexityTiers[tier],tier};};
 C.shellRadius=n=>76+(n-1)*46;
 C.displayExtent=atom=>Math.max(76,C.shellRadius(Math.max(1,atom.shells.length)));
 C.subshellRadius=(atom,sub)=>C.displayExtent(atom)*(.20+.80*(sub.n-1+'spdf'.indexOf(sub.l)*.31)/Math.max(1,atom.shells.length-1));
 C.isImportant=(atom,sub)=>atom.valence.importantSubshells?.includes(sub.id)||atom.valence.shells.includes(sub.n);
 C.fullConfiguration=subshells=>subshells.filter(s=>s.occupancy).map(s=>s.id+String(s.occupancy).replace(/\d/g,d=>'⁰¹²³⁴⁵⁶⁷⁸⁹'[d])).join(' ');
 C.validateRecord=(element,isotope,ion={charge:0},electronStructure)=>{
  const label=element?.name||'Unnamed element';
  try{
   if(!element||!isotope)throw Error('element and isotope records are required');
   if(!element.name||!element.symbol)throw Error('name and symbol are required');
   if(typeof isotope.stable!=='boolean')throw Error('isotope.stable must be true or false');
   if(element.neutralElectronCount!==undefined&&element.neutralElectronCount!==element.atomicNumber)throw Error('neutralElectronCount must equal atomicNumber');
   if(!element.defaultIsotope||!element.availableIsotopes?.includes(element.defaultIsotope))throw Error('defaultIsotope must appear in availableIsotopes');
   const record=C.isotopes[element.defaultIsotope]||C.developmentIsotopes?.[element.defaultIsotope];
   if(!record||record.atomicNumber!==element.atomicNumber)throw Error('defaultIsotope must belong to the element');
   C.createAtom({element,isotope,ion:{charge:0}});
   const atom=C.createAtom({element,isotope,ion,electronStructure});
   if(atom.electrons&&!atom.subshells.length)throw Error('occupied subshells are required');
   return {ok:true,atom,tier:C.complexity(atom).tier};
  }catch(error){return {ok:false,error:label+': '+error.message};}
 };
 // Enrich the existing copper record without making these fields mandatory
 // for unrelated classroom notes. Scientific objects remain immutable.
 const copper=C.elements[29];
 C.elements=C.deepFreeze({29:{...copper,context:{title:'One outer electron. A starting point.',descriptions:{elementary:'Copper has one outer electron in this model. Outer electrons help solid copper carry electricity.',middle:'Copper has one electron in its outer shell in this simplified model. In solid copper, outer electrons can move through the material and carry electrical current.',high:'Copper has one electron in its outer shell in this simplified model. In solid copper, outer electrons can move through the material and carry electrical current.'}},isotopeSourceKeys:['ciaaw','nasa','copperStars'],abundanceSuffix:' The ordinary terrestrial mixture contains copper-63 and copper-65, not a lasting measurable share of copper-64 or copper-67.',category:'Transition metal',period:4,group:11,block:'d',neutralElectronCount:29,fullConfiguration:C.fullConfiguration(copper.neutralSubshells),availableIsotopes:['copper-63','copper-64','copper-65','copper-67'],valence:{...copper.valence,importantSubshells:['3d','4s'],studentNote:'The outermost shell has one 4s electron. The occupied 3d subshell also matters when copper forms bonds.'},descriptions:{high:'Copper has one electron in its outer shell in this simplified model. Copper’s electron arrangement helps make it a good electrical conductor.'}}});
 C.simplifications={
  elementary:'Large atoms have many electrons. We simplify the picture so you can see the most important ideas clearly.',
  middle:'Larger atoms contain many electrons and energy levels. This explorer simplifies their arrangement so the major patterns remain easy to see.',
  high:'Complex atoms contain many occupied orbitals that would overlap if displayed simultaneously. This explorer uses a simplified representation while preserving electron counts, configurations, energy levels, and important valence structure.'
 };
 C.fullDetailNotice={
  elementary:'Every electron is shown in Bohr mode. Wave and cloud views show all occupied states.',
  middle:'All occupied states are available. Inner regions are subdued so you can see the outer states and nucleus.',
  high:'Full detail preserves every Bohr electron and all occupied states. Transparency separates overlapping cloud regions.'
 };
 C.fullDetailLimits={
  elementary:'Sizes are not to scale. Rings are not real tracks. Clouds show where electrons might be found.',
  middle:'Sizes and distances are not to scale. Waves are teaching patterns. Cloud dots are not individual electrons; Explore Subshells isolates one occupied state.',
  high:'Sizes and distances are not to scale. Waves and clouds are qualitative teaching pictures, not calculated many-electron solutions. Overview retains every occupied subshell; Explore Subshells isolates one.'
 };
 C.modelLimits={
  elementary:'Sizes are not to scale. Rings are not real tracks. Waves show a standing pattern. Clouds show where electrons might be, not mist. Overview groups the picture. Explore Subshells looks at one part. Nuclear positions are just a picture.',
  middle:'Sizes and distances are not to scale. Bohr rings are not literal tracks. De Broglie waves are conceptual standing patterns. Clouds show chances of finding electrons, not physical mist. Overview groups regions for clarity; Explore Subshells isolates one occupied group. Nuclear positions are illustrative.',
  high:'Sizes and distances are not to scale. Bohr rings are not literal tracks; de Broglie waves are conceptual standing-wave representations, not exact many-electron wavefunctions. Clouds represent probabilities, not physical mist. Overview groups inner density and emphasizes outer or chemically important regions. Explore Subshells isolates one occupied subshell. Nuclear positions are illustrative, not calculated nuclear configurations.'
 };
})(window.Copper);
