const fs=require('fs'),vm=require('vm'),assert=require('assert/strict');
const ctx={window:{},structuredClone,console};vm.createContext(ctx);
for(const [,file] of fs.readFileSync('periodic-table-visualizer/index.html','utf8').matchAll(/<script defer src="(js\/[^\"]+)"/g)){
 vm.runInContext(fs.readFileSync('periodic-table-visualizer/'+file,'utf8'),ctx,{filename:file});if(file==='js/periodic-data.js')break;
}
const C=ctx.window.Copper,plain=x=>JSON.parse(JSON.stringify(x)),prior=JSON.parse(fs.readFileSync('qa/phase6m-prior-data.json'));
for(const kind of ['elements','isotopes'])for(const [id,record]of Object.entries(prior[kind]))assert.deepEqual(plain(C[kind][id]),record,kind+' '+id+' changed');
assert.deepEqual(plain(C.enabledValidation),{ok:true,elements:110,isotopes:409,errors:[]});
assert.deepEqual(plain(C.actinideValidation),{ok:true,elements:7,isotopes:16,errors:[]});
assert.deepEqual(plain(C.lateActinideValidation),{ok:true,elements:8,isotopes:13,errors:[]});
const expected=[['Curium','Cm',247,7,1,0,[244,247]],['Berkelium','Bk',247,9,0,0,[247,249]],['Californium','Cf',251,10,0,0,[249,251,252]],['Einsteinium','Es',252,11,0,0,[252]],['Fermium','Fm',257,12,0,0,[257]],['Mendelevium','Md',258,13,0,0,[258]],['Nobelium','No',259,14,0,0,[259]],['Lawrencium','Lr',266,14,0,1,[262,266]]];
let negativeCases=0,isotopeCases=0;
for(let j=0;j<8;j++){
 const [name,symbol,mass,f,d,p,masses]=expected[j],z=j+96,e=C.elements[z];
 assert.deepEqual([e.name,e.symbol,e.neutralElectronCount],[name,symbol,z]);assert.deepEqual(plain(e.neutralShells),[2,8,18,32,18+f,8+d,2+p]);
 assert.deepEqual(plain(e.neutralSubshells.slice(15).map(s=>[s.id,s.occupancy])),[['5f',f],...(d?[['6d',1]]:[]),['7s',2],...(p?[['7p',1]]:[])]);
 assert.equal(e.neutralSubshells.reduce((n,s)=>n+s.occupancy,0),z);assert.equal(C.isotopes[e.defaultIsotope].massNumber,mass);
 assert.deepEqual(plain(e.availableIsotopes.map(id=>C.isotopes[id].massNumber)),masses);
 for(const mutate of [x=>x.name='wrong',x=>x.symbol='wrong',x=>x.neutralShells[6]++,x=>x.neutralElectronCount--,x=>x.defaultIsotope='wrong',x=>x.neutralSubshells.at(-1).occupancy=20]){
  const copy=structuredClone(e);mutate(copy);assert.equal(C.validateLateActinideData({[z]:copy}).ok,false);negativeCases++;
 }
 // A plausible wrong filling configuration retains both totals and capacities.
 const wrong=structuredClone(e),sub=wrong.neutralSubshells.find(s=>s.id===(p?'7p':d?'6d':'5f')),from=sub.n,to=p?6:d?5:6;
 sub.n=to;sub.l=to===5?'f':'d';sub.id=to+sub.l;wrong.neutralShells[from-1]-=sub.occupancy;wrong.neutralShells[to-1]+=sub.occupancy;
 wrong.neutralConfiguration=wrong.fullConfiguration=C.fullConfiguration(wrong.neutralSubshells);
 assert.equal(wrong.neutralShells.reduce((n,v)=>n+v,0),z);assert.equal(C.validateLateActinideData({[z]:wrong}).ok,false);negativeCases++;
 for(const id of e.availableIsotopes){const i=C.isotopes[id];isotopeCases++;
  assert.equal(i.stable,false);assert.equal(i.neutrons,i.massNumber-z);assert.equal(i.neutralElectronCount,z);assert.equal(i.naturalAbundance,null);assert.equal(i.naturalComponent,false);assert.match(i.origin,/Produced/);assert.match(i.safety,/trained personnel/);assert.ok(i.halfLife.value>0&&i.decayModes.length);
  for(const mutate of [x=>x.stable=true,x=>x.halfLife=null,x=>x.safety='',x=>x.origin='',x=>x.decayModes=[],x=>x.neutrons++]){const bad=structuredClone(i);mutate(bad);assert.equal(C.validateLateActinideData({[z]:e},{...C.isotopes,[id]:bad}).ok,false);negativeCases++;}
 }
 for(const key of e.sources){const source=C.isotopeSources[key];assert.ok(source?.title&&source.organization&&source.accessed&&source.supports&&source.url.startsWith('https://'));}
}
assert.equal(C.isotopes['lawrencium-262'].halfLife.approximate,true);assert.deepEqual(plain(C.isotopes['lawrencium-266'].halfLife.uncertainty),{minus:5,plus:21,unit:'hours'});assert.equal(C.isotopes['lawrencium-266'].halfLife.tentative,true);
assert.equal(C.isotopes['mendelevium-258'].halfLife.value,51.59);assert.equal(C.isotopes['curium-247'].halfLife.value,15600000);
const out={result:'PASS',enabled:plain(C.enabledValidation),batch:plain(C.lateActinideValidation),unchangedPriorElements:Object.keys(prior.elements).length,unchangedPriorIsotopes:Object.keys(prior.isotopes).length,isotopeCases,negativeCases};fs.writeFileSync('qa/phase6m-data-results.json',JSON.stringify(out,null,2));console.log(out);
