/* Scientific records only. Geometry, camera, and selection belong elsewhere. */
window.Copper = {};
(function(C){
  'use strict';
  function freeze(value){if(value&&typeof value==='object'){Object.values(value).forEach(freeze);Object.freeze(value);}return value;}
  C.elements=freeze({29:{atomicNumber:29,name:'Copper',symbol:'Cu',defaultIsotope:'copper-63',neutralConfiguration:'[Ar] 3d¹⁰ 4s¹',neutralShells:[2,8,18,1],neutralSubshells:[{id:'1s',n:1,l:'s',occupancy:2},{id:'2s',n:2,l:'s',occupancy:2},{id:'2p',n:2,l:'p',occupancy:6},{id:'3s',n:3,l:'s',occupancy:2},{id:'3p',n:3,l:'p',occupancy:6},{id:'3d',n:3,l:'d',occupancy:10},{id:'4s',n:4,l:'s',occupancy:1}],valence:{shells:[4],description:'One outer 4s electron in this simplified representation. Chemically relevant valence states in transition metals are not always limited to the outermost shell.'},classroomNote:'Copper’s electronic structure contributes to its usefulness as an electrical conductor. Conduction is a collective behavior of a solid, not a property demonstrated by one isolated atom.'}});
  const fail=message=>{throw new Error('Atom data: '+message);};
  const integer=(n,min,label)=>{if(!Number.isInteger(n)||n<min)fail(label+' must be an integer ≥ '+min+'.');};
  C.atomLabel=a=>a.isotope.displayName||a.element.name+'-'+a.massNumber;
  // Ion electron structures must be explicitly supplied, never guessed.
  C.createAtom=function({element,isotope,ion={charge:0},electronStructure}){
    integer(element.atomicNumber,1,'Atomic number');const z=element.atomicNumber;
    integer(isotope.massNumber,z,'Mass number');
    if(isotope.atomicNumber!==z)fail('Isotope must belong to the selected element.');
    if(isotope.neutralElectronCount!==undefined&&isotope.neutralElectronCount!==z)fail('Neutral electron count must match atomic number.');
    if(isotope.metastableStateLabel){
      const g=isotope.groundState;
      if(isotope.metastableStateLabel!=='m'||!isotope.excitationStateId||isotope.excitationStateId==='ground'||!(isotope.excitationEnergyKeV>0))fail('Nuclear isomer requires an excited nuclear state.');
      if(isotope.observationallyStable){if(!isotope.stable||isotope.halfLife!==null||isotope.decayModes?.length!==0||isotope.primaryDecay!==null||!isotope.naturalComponent)fail('Observationally stable natural isomer must not claim measured decay.');}
      else if(isotope.stable||!(isotope.halfLife?.value>0)||!isotope.decayModes?.length)fail('Radioactive isomer requires decay data.');
      if(!g?.id||g.atomicNumber!==z||g.massNumber!==isotope.massNumber||g.excitationStateId!=='ground'||g.id===isotope.id)fail('Nuclear isomer must link to a ground state with the same proton and neutron counts.');
      if(isotope.naturalAbundance&&!(isotope.observationallyStable&&isotope.naturalComponent))fail('These produced isomers must not receive an ordinary natural abundance.');
    }
    if(!Number.isInteger(ion.charge))fail('Signed ionic charge must be an integer.');
    const neutrons=isotope.massNumber-z,electrons=z-ion.charge;
    integer(electrons,0,'Electron count');
    for(const record of [element,isotope])if(record.protons!==undefined&&record.protons!==z)fail('Stored proton count must match atomic number.');
    if(isotope.neutrons!==undefined&&isotope.neutrons!==neutrons)fail('Stored neutron count must equal mass number minus atomic number.');
    if(ion.electrons!==undefined&&ion.electrons!==electrons)fail('Stored electron count must equal atomic number minus signed charge.');
    const structure=electronStructure||(ion.charge===0?{shells:element.neutralShells,configuration:element.neutralConfiguration,valence:element.valence,subshells:element.neutralSubshells}:null);
    if(!structure)fail('Ion states require an explicit electron structure.');
    if(!Array.isArray(structure.shells))fail('Shell populations must be an array.');
    structure.shells.forEach((n,i)=>{integer(n,0,'Shell '+(i+1)+' population');if(n>2*(i+1)**2)fail('Shell '+(i+1)+' exceeds its capacity.');});
    if(structure.shells.reduce((a,b)=>a+b,0)!==electrons)fail('Shell populations must add up to the electron count.');
    if(!structure.valence||!Array.isArray(structure.valence.shells))fail('Supply explicit valence-shell metadata.');
    structure.valence.shells.forEach(shell=>{integer(shell,1,'Valence shell');if(!structure.shells[shell-1])fail('Valence shell must be occupied.');});
    const subshells=structure.subshells||[];
    if(subshells.length){
      const totals=structure.shells.map(()=>0),ids=new Set();
      for(const sub of subshells){const capacity={s:2,p:6,d:10,f:14}[sub.l];integer(sub.n,1,'Subshell level');integer(sub.occupancy,0,'Subshell occupancy');if(!capacity||sub.occupancy>capacity||'spdf'.indexOf(sub.l)>=sub.n||sub.id!==sub.n+sub.l||ids.has(sub.id)||sub.n>totals.length)fail('Invalid subshell '+sub.id+': check id, level, type, occupancy and capacity.');ids.add(sub.id);totals[sub.n-1]+=sub.occupancy;}
      if(totals.some((n,i)=>n!==structure.shells[i]))fail('Subshell populations must match shell populations.');
    }
    return freeze({subshells:structuredClone(subshells),element:structuredClone(element),isotope:structuredClone(isotope),ion:{charge:ion.charge},protons:z,neutrons,electrons,massNumber:isotope.massNumber,charge:ion.charge,configuration:structure.configuration||'',shells:[...structure.shells],valence:structuredClone(structure.valence)});
  };
  C.commonIsotopes=(element,records=C.isotopes)=>Object.values(records).filter(i=>i.atomicNumber===element.atomicNumber&&i.common).map(i=>({id:i.id,label:element.name.toLowerCase()+'-'+i.massNumber+(i.metastableStateLabel||''),accessibleLabel:element.name+' '+i.massNumber+(i.metastableStateLabel?'m nuclear isomer':'')+', atomic number '+element.atomicNumber,stable:i.stable,naturalAbundance:i.naturalAbundance,halfLife:i.halfLife}));
  C.withIsotope=(atom,isotope)=>C.createAtom({element:atom.element,isotope,ion:atom.ion,electronStructure:{shells:atom.shells,configuration:atom.configuration,valence:atom.valence,subshells:atom.subshells}});
  C.types=freeze({
    proton:{name:'Proton',charge:'+1 e',mass:'≈ 1 u',role:'A positively charged nucleon. The number of protons defines the element.',note:'Internal proton exploration will be added in a later phase.'},
    neutron:{name:'Neutron',charge:'0',mass:'≈ 1 u',role:'A neutral nucleon that contributes to nuclear binding and mass. Neutron count distinguishes isotopes.'},
    electron:{name:'Electron',charge:'−1 e',mass:'≈ 0.00055 u (about 1/1836 of a proton)',role:'Electrons participate in bonding and electrical conduction. Real electrons occupy quantum states, not fixed tracks.'}
  });
})(window.Copper);
