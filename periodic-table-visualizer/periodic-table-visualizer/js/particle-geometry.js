/* Display geometry is deliberately compressed, not a scientific size record. */
(function(C){
  'use strict';
  C.palette={proton:'#f18b83',neutron:'#83b2e6',electron:'#a0edee'};
  C.makeNucleus=function(atom){
    const count=atom.massNumber,sites=[],extent=Math.ceil(Math.cbrt(count))+1;
    for(let x=-extent;x<=extent;x++)for(let y=-extent;y<=extent;y++)for(let z=-extent;z<=extent;z++)if((x+y+z)%2===0)sites.push({x:x*10.8,y:y*10.8,z:z*10.8});
    sites.sort((a,b)=>(a.x*a.x+a.y*a.y+a.z*a.z)-(b.x*b.x+b.y*b.y+b.z*b.z));
    let protons=0,neutrons=0;
    return sites.slice(0,count).map((v,i)=>{
      // Balanced allocation also works when atomic and mass numbers share factors.
      const type=Math.floor((i+1)*atom.protons/count)>Math.floor(i*atom.protons/count)?'proton':'neutron';
      const number=type==='proton'?++protons:++neutrons;
      return {id:type+'-'+number,type,x:v.x*.83-v.z*.56+Math.sin(i*7)*2.1,y:v.y+Math.cos(i*5)*2.1,z:v.x*.56+v.z*.83+Math.sin(i*3)*2.1,r:7.8};
    });
  };
  C.makeElectrons=function(atom){const particles=[];atom.shells.forEach((count,shell)=>{for(let i=0;i<count;i++)particles.push({id:'electron-'+(particles.length+1),type:'electron',shell:shell+1,valence:atom.valence.shells.includes(shell+1),phase:i*Math.PI*2/count,r:(atom.valence.shells.includes(shell+1)?5.8:4.3)*C.complexity(atom).electronScale});});return particles;};
  // Role metadata is opt-in; existing copper display geometry is unchanged.
  const makeElectrons=C.makeElectrons;C.makeElectrons=atom=>{const particles=makeElectrons(atom);if(atom.element.period4Detail||atom.element.period5Detail||atom.element.outerSExplorer||(atom.element.lanthanideExplorer||atom.element.heavyDExplorer||(atom.element.heavyPExplorer||(atom.element.actinideExplorer||atom.element.transactinideExplorer)))){for(const shell of atom.shells.map((_,i)=>i+1)){const electrons=particles.filter(p=>p.shell===shell);let index=0;for(const sub of atom.subshells.filter(sub=>sub.n===shell))for(let i=0;i<sub.occupancy;i++){const p=electrons[index++];p.subshell=sub.id;p.transition=sub.id===atom.element.transitionRegion;p.filledCore=atom.element.filledCoreSubshells?.includes(sub.id)||false;}}}return particles;};
  C.makeParticles=atom=>[...C.makeNucleus(atom),...C.makeElectrons(atom)];
  C.valenceCount=atom=>atom?atom.valence.shells.reduce((sum,n)=>sum+(atom.shells[n-1]||0),0):0;
  C.categoryFor=p=>p.type==='electron'?(p.filledCore?'filled-core-electron':p.transition?'transition-electron':p.valence?'valence-electron':'inner-electron'):p.type;
  C.particleCategories=(particles,atom)=>[
    ['proton','Proton','This atom contains no protons.'],['neutron','Neutron','This isotope contains no neutrons.'],
    ...(atom?.element.filledCoreSubshells?.length?[['filled-core-electron','Filled '+atom.element.filledCoreSubshells.join(', ')+' subshell','This atom has no filled core region.']]:[]),
    ...(atom?.element.transitionRegion?[['transition-electron',atom.element.transitionRegion+' electrons','This atom has no occupied 3d state.']]:[]),
    ['inner-electron','Inner electron','This atom has no inner electrons in this representation.'],['valence-electron','Valence electron','This atom has no valence electrons in this representation.']
  ].filter(([id])=>!(atom?.shells.length===1&&id==='inner-electron')&&!(atom?.element.noOuterS&&id==='valence-electron')).map(([id,label,reason])=>({id,label:(atom?.element.actinideExplorer||atom?.element.transactinideExplorer)?(id==='valence-electron'?'Outer-region electron':id==='inner-electron'?'Electron':label):id==='valence-electron'&&(atom?.element.transitionRegion||(atom?.element.lanthanideExplorer||atom?.element.heavyDExplorer))?'Outermost '+atom.valence.shells.at(-1)+'s electron'+(C.valenceCount(atom)>1?'s':''):id==='valence-electron'&&C.valenceCount(atom)>1?'Valence electrons':label,available:particles.some(p=>C.categoryFor(p)===id),reason:atom&&id==='neutron'&&!atom.neutrons?atom.element.name+'-'+atom.massNumber+' has no neutron.':reason}));
})(window.Copper);
