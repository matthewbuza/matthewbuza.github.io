/* Basic records only. Values: CIAAW 2024; bracketed mass numbers: IUPAC 2022.
   These records do not authorize a finished atom visualization. */
(function(C){
 'use strict';
 const rows=`H Hydrogen 1.0080 0.0002
He Helium 4.0026 0.0001
Li Lithium 6.94 0.06
Be Beryllium 9.0122 0.0001
B Boron 10.81 0.02
C Carbon 12.011 0.002
N Nitrogen 14.007 0.001
O Oxygen 15.999 0.001
F Fluorine 18.998 0.001
Ne Neon 20.180 0.001
Na Sodium 22.990 0.001
Mg Magnesium 24.305 0.002
Al Aluminium 26.982 0.001
Si Silicon 28.085 0.001
P Phosphorus 30.974 0.001
S Sulfur 32.06 0.02
Cl Chlorine 35.45 0.01
Ar Argon 39.95 0.16
K Potassium 39.098 0.001
Ca Calcium 40.078 0.004
Sc Scandium 44.956 0.001
Ti Titanium 47.867 0.001
V Vanadium 50.942 0.001
Cr Chromium 51.996 0.001
Mn Manganese 54.938 0.001
Fe Iron 55.845 0.002
Co Cobalt 58.933 0.001
Ni Nickel 58.693 0.001
Cu Copper 63.546 0.003
Zn Zinc 65.38 0.02
Ga Gallium 69.723 0.001
Ge Germanium 72.630 0.008
As Arsenic 74.922 0.001
Se Selenium 78.971 0.008
Br Bromine 79.904 0.003
Kr Krypton 83.798 0.002
Rb Rubidium 85.468 0.001
Sr Strontium 87.62 0.01
Y Yttrium 88.906 0.001
Zr Zirconium 91.222 0.003
Nb Niobium 92.906 0.001
Mo Molybdenum 95.95 0.01
Tc Technetium [97]
Ru Ruthenium 101.07 0.02
Rh Rhodium 102.91 0.01
Pd Palladium 106.42 0.01
Ag Silver 107.87 0.01
Cd Cadmium 112.41 0.01
In Indium 114.82 0.01
Sn Tin 118.71 0.01
Sb Antimony 121.76 0.01
Te Tellurium 127.60 0.03
I Iodine 126.90 0.01
Xe Xenon 131.29 0.01
Cs Caesium 132.91 0.01
Ba Barium 137.33 0.01
La Lanthanum 138.91 0.01
Ce Cerium 140.12 0.01
Pr Praseodymium 140.91 0.01
Nd Neodymium 144.24 0.01
Pm Promethium [145]
Sm Samarium 150.36 0.02
Eu Europium 151.96 0.01
Gd Gadolinium 157.25 0.01
Tb Terbium 158.93 0.01
Dy Dysprosium 162.50 0.01
Ho Holmium 164.93 0.01
Er Erbium 167.26 0.01
Tm Thulium 168.93 0.01
Yb Ytterbium 173.05 0.02
Lu Lutetium 174.97 0.01
Hf Hafnium 178.49 0.01
Ta Tantalum 180.95 0.01
W Tungsten 183.84 0.01
Re Rhenium 186.21 0.01
Os Osmium 190.23 0.03
Ir Iridium 192.22 0.01
Pt Platinum 195.08 0.02
Au Gold 196.97 0.01
Hg Mercury 200.59 0.01
Tl Thallium 204.38 0.01
Pb Lead 207.2 1.1
Bi Bismuth 208.98 0.01
Po Polonium [209]
At Astatine [210]
Rn Radon [222]
Fr Francium [223]
Ra Radium [226]
Ac Actinium [227]
Th Thorium 232.04 0.01
Pa Protactinium 231.04 0.01
U Uranium 238.03 0.01
Np Neptunium [237]
Pu Plutonium [244]
Am Americium [243]
Cm Curium [247]
Bk Berkelium [247]
Cf Californium [251]
Es Einsteinium [252]
Fm Fermium [257]
Md Mendelevium [258]
No Nobelium [259]
Lr Lawrencium [262]
Rf Rutherfordium [267]
Db Dubnium [268]
Sg Seaborgium [269]
Bh Bohrium [270]
Hs Hassium [269]
Mt Meitnerium [277]
Ds Darmstadtium [281]
Rg Roentgenium [282]
Cn Copernicium [285]
Nh Nihonium [286]
Fl Flerovium [290]
Mc Moscovium [290]
Lv Livermorium [293]
Ts Tennessine [294]
Og Oganesson [294]`;
 C.families=C.deepFreeze({alkali:'Alkali metals',alkaline:'Alkaline-earth metals',transition:'Transition metals',post:'Post-transition metals',metalloid:'Metalloids',nonmetal:'Reactive nonmetals',halogen:'Halogens',noble:'Noble gases',lanthanide:'Lanthanides',actinide:'Actinides',unknown:'Unknown / uncertain properties'});
 C.periodicSources=C.deepFreeze([
  {organization:'CIAAW / IUPAC',title:'Abridged Standard Atomic Weights 2024',url:'https://ciaaw.org/abridged-atomic-weights.htm',accessed:'2026-09-09',supports:'Names, symbols, atomic numbers and abridged standard atomic weights with uncertainties, including the 2024 revisions.'},
  {organization:'IUPAC',title:'Periodic Table of the Elements, 4 May 2022',url:'https://iupac.org/wp-content/uploads/2022/07/IUPAC_Periodic_Table-04May22_CRA.pdf',accessed:'2026-09-09',supports:'Conventional 18-column layout and representative isotope mass numbers for elements without standard atomic weights. These are a dated reference selection, not a claim about the latest longest-lived isotope.'},
  {organization:'IUPAC',title:'Periodic Table of Elements: groups and collective names',url:'https://iupac.org/what-we-do/periodic-table-of-elements/',accessed:'2026-09-09',supports:'Groups 1–18, detached La–Lu and Ac–Lr series, and the group-3 convention discussion.'},
  {organization:'Royal Society of Chemistry',title:'Periodic Table: element fact boxes and natural abundance',url:'https://periodic-table.rsc.org/',accessed:'2026-09-09',supports:'Block conventions and occurrence context. The individual element reference appears on every card. Tc, Pm and Np include naturally occurring traces despite being mainly produced artificially.'}
 ]);
 C.completedExplorerSymbols=Object.freeze(['H','He','Li','Be','B','C','N','O','F','Ne','Na','Mg','Al','Si','P','S','Cl','Ar','K','Ca','Sc','Ti','V','Cr','Mn','Fe','Co','Ni','Cu','Zn','Ga','Ge','As','Se','Br','Kr','Rb','Sr','Y','Zr','Nb','Mo','Tc','Ru','Rh','Pd','Ag','Cd','In','Sn','Sb','Te','I','Xe','Cs','Ba','La','Ce','Pr','Nd','Pm','Sm','Eu','Gd','Tb','Dy','Ho','Er','Tm','Yb','Lu','Hf','Ta','W','Re','Os','Ir','Pt','Au','Hg','Tl','Pb','Bi','Po','At','Rn','Fr','Ra','Ac','Th','Pa','U','Np','Pu','Am','Cm','Bk','Cf','Es','Fm','Md','No','Lr','Rf','Db','Sg','Bh','Hs','Mt','Ds','Rg','Cn','Nh','Fl','Mc','Lv','Ts','Og']);
 const ends=[2,10,18,36,54,86,118],starts=[1,3,11,19,37,55,87];
 C.basicElements=C.deepFreeze(rows.split('\n').map((line,index)=>{
  const [symbol,name,value,uncertainty]=line.split(' '),atomicNumber=index+1,z=atomicNumber,period=ends.findIndex(end=>z<=end)+1;
  const series=z>=57&&z<=71?'lanthanide':z>=89&&z<=103?'actinide':null;
  let group=period===1?(z===1?1:18):z-starts[period-1]+1;
  if(period===2||period===3){if(group>2)group+=10;}
  if(period>=6&&group>17)group-=14;
  if(series)group=null;
  const block=series?([57,89].includes(z)?'d':'f'):(z===2||group<=2?'s':group>=13?'p':'d');
  let category=series||(z>=109?'unknown':z===1||[6,7,8,15,16,34].includes(z)?'nonmetal':[5,14,32,33,51,52].includes(z)?'metalloid':group===1?'alkali':group===2?'alkaline':group===17?'halogen':group===18?'noble':group>=3&&group<=12?'transition':'post');
  const occurrence=[43,61,93].includes(z)?'trace-produced':z>=94?'primarily-synthetic':z>=84&&z<=89?'natural-trace':'natural';
  const standard=!value.startsWith('['),mass=standard?{kind:'standard',value,uncertainty,source:'ciaaw-2024'}:{kind:'representative',massNumber:Number(value.slice(1,-1)),source:'iupac-2022'};
  return {atomicNumber,name,symbol,period,group,block,category,family:C.families[category],mass,occurrence,explorerAvailable:C.completedExplorerSymbols.includes(symbol),explorerStatus:C.completedExplorerSymbols.includes(symbol)?'complete':'coming-soon',series,grid:{row:series?(series==='lanthanide'?9:10):period,column:series?z-(series==='lanthanide'?57:89)+3:group},aliases:z===13?['aluminum']:z===55?['cesium']:[],reference:'https://periodic-table.rsc.org/element/'+z+'/'+name.toLowerCase()};
 }));
 C.basicBySymbol=Object.fromEntries(C.basicElements.map(e=>[e.symbol,e]));
 C.validatePeriodicData=(records=C.basicElements)=>{
  const errors=[],seen={number:new Set(),name:new Set(),symbol:new Set(),position:new Set()};
  if(records.length!==118)errors.push('Expected 118 elements.');
  for(const e of records){const z=e.atomicNumber,where=e.grid?.row+':'+e.grid?.column;
   for(const [key,value] of Object.entries({number:z,name:e.name,symbol:e.symbol,position:where})){if(seen[key].has(value))errors.push('Duplicate '+key+': '+value);seen[key].add(value);}
   if(!e.name||!/^([A-Z][a-z]?)$/.test(e.symbol))errors.push('Invalid name or symbol at '+z);
   if(!['natural','natural-trace','trace-produced','primarily-synthetic'].includes(e.occurrence))errors.push(e.symbol+': occurrence');
   if(!Number.isInteger(z)||z<1||z>118)errors.push('Invalid atomic number '+z);
   if(!Number.isInteger(e.period)||e.period<1||e.period>7)errors.push(e.symbol+': period');
   if(e.group===null?!e.series:!Number.isInteger(e.group)||e.group<1||e.group>18)errors.push(e.symbol+': group');
   if(!['s','p','d','f'].includes(e.block)||!C.families[e.category])errors.push(e.symbol+': block/category');
   if(!Number.isInteger(e.grid?.column)||e.grid.column<1||e.grid.column>18||e.grid.row!==(e.series?(e.series==='lanthanide'?9:10):e.period))errors.push(e.symbol+': grid');
   if(e.series&&(e.grid?.column<3||e.grid?.column>17||e.period!==(e.series==='lanthanide'?6:7)))errors.push(e.symbol+': detached series');
   if(!e.mass){errors.push(e.symbol+': missing mass field');continue;}
   if(e.mass.kind==='standard'){if(!(Number(e.mass.value)>0)||!(Number(e.mass.uncertainty)>0)||e.mass.massNumber!==undefined)errors.push(e.symbol+': standard atomic weight');}
   else if(e.mass.kind!=='representative'||!Number.isInteger(e.mass.massNumber)||e.mass.massNumber<z||e.mass.value!==undefined)errors.push(e.symbol+': representative isotope');
   const representative={84:209,85:210,86:222,89:227,93:237,94:244,95:243,96:247,97:247,98:251,99:252,100:257,101:258,102:259,103:262,104:267,105:268,106:269,107:270,108:269,109:277,110:281}[z];if(representative&&(e.mass.kind!=='representative'||e.mass.massNumber!==representative))errors.push(e.symbol+': required bracketed representative isotope');
   if(e.explorerAvailable!==C.completedExplorerSymbols.includes(e.symbol))errors.push(e.symbol+': Phase 5 availability');
  }
  for(let z=1;z<=118;z++)if(!seen.number.has(z))errors.push('Missing '+z);
  const cu=records.find(e=>e.symbol==='Cu');if(!cu||cu.atomicNumber!==29||cu.period!==4||cu.group!==11||cu.block!=='d')errors.push('Copper placement');
  return {ok:!errors.length,count:records.length,errors};
 };
 C.periodicValidation=C.validatePeriodicData();
 // Full explorer/test records inherit the same basic identity and placement.
 C.mergeBasic=element=>{const basic=C.basicElements.find(e=>e.atomicNumber===element.atomicNumber);return C.deepFreeze({...element,...basic,category:basic.family,displayCategory:basic.category});};
 C.elements=C.deepFreeze(Object.fromEntries(Object.entries(C.elements).map(([z,e])=>[z,C.mergeBasic(e)])));
})(window.Copper);
