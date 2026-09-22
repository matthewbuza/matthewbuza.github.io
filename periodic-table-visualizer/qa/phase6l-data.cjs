const fs=require('fs'),vm=require('vm'),assert=require('assert/strict');
const ctx={window:{},structuredClone,console};vm.createContext(ctx);
for(const [,file] of fs.readFileSync('periodic-table-visualizer/index.html','utf8').matchAll(/<script defer src="(js\/[^\"]+)"/g)){
 vm.runInContext(fs.readFileSync('periodic-table-visualizer/'+file,'utf8'),ctx,{filename:file});
 if(file==='js/periodic-data.js')break;
}
const C=ctx.window.Copper;assert.equal(C.enabledValidation.ok,true);assert.equal(C.actinideValidation.ok,true);
assert.equal(C.enabledValidation.elements,110);assert.equal(C.enabledValidation.isotopes,409);
assert.equal(C.isotopes['plutonium-244'].halfLife.value,8.13e7);
let rejected=0;
for(let z=89;z<=95;z++){
 const e=structuredClone(C.elements[z]);
 // A plausible filling-rule mistake preserves totals and capacities. The
 // explicit ground-state validator must still reject this 5f/6d substitution.
 const sub=e.neutralSubshells.find(s=>s.id==='6d')||e.neutralSubshells.find(s=>s.id==='5f'),old=sub.n;
 sub.n=old===6?5:6;sub.l=old===6?'f':'d';sub.id=sub.n+sub.l;
 e.neutralShells[old-1]-=sub.occupancy;e.neutralShells[sub.n-1]+=sub.occupancy;
 e.neutralConfiguration=e.fullConfiguration=C.fullConfiguration(e.neutralSubshells);
 assert.equal(e.neutralSubshells.reduce((a,s)=>a+s.occupancy,0),z);
 assert.equal(e.neutralShells.reduce((a,n)=>a+n,0),z);
 assert.equal(C.validateActinideData({[z]:e}).ok,false);rejected++;
}
const result={result:'PASS',enabled:C.enabledValidation,batch:C.actinideValidation,countPreservingConfigRejections:rejected,pu244:C.isotopes['plutonium-244'].halfLife};
fs.writeFileSync('qa/phase6l-data-results.json',JSON.stringify(result,null,2));console.log(result);
