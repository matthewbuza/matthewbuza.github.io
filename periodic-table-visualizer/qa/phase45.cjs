const {chromium}=require('C:/Users/arial/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const {pathToFileURL}=require('url'),path=require('path'),assert=require('assert/strict'),fs=require('fs');
(async()=>{const browser=await chromium.launch({executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:true});try{
 const context=await browser.newContext({viewport:{width:1366,height:900},reducedMotion:'reduce',hasTouch:true}),page=await context.newPage(),errors=[],remote=[],missing=[];
 page.on('pageerror',e=>errors.push(e.message));page.on('console',m=>{if(m.type()==='error')errors.push(m.text());});page.on('request',r=>{if(!r.url().startsWith('file:'))remote.push(r.url());});page.on('requestfailed',r=>missing.push(r.url()));
 await page.goto(pathToFileURL(path.resolve('periodic-table-visualizer/tests/atom-engine-test.html')).href);
 const expected={1:[1,0,1,[1]],6:[6,6,6,[2,4]],29:[29,34,29,[2,8,18,1]],54:[54,78,54,[2,8,18,18,8]],92:[92,146,92,[2,8,18,32,21,9,2]]},timings={};
 for(const z of [1,6,29,54,92]){
  await page.selectOption('#test-element',String(z));assert.match(await page.locator('#validation-results').innerText(),/PASS/);
  const data=await page.evaluate(()=>{const a=Copper.app.atom;return [a.protons,a.neutrons,a.electrons,a.shells];});assert.deepEqual(data,expected[z]);
  assert.equal(await page.evaluate(()=>Copper.app.atom.subshells.reduce((n,s)=>n+s.occupancy,0)),z);
  const science=await page.evaluate(()=>JSON.stringify(Copper.app.atom));
  for(const model of ['bohr','wave','quantum']){
   await page.click('[data-model="'+model+'"]');await page.click('#reset');
   assert.deepEqual(await page.evaluate(()=>[Copper.app.state.yaw,Copper.app.state.pitch,Copper.app.state.zoom]),[.3,.62,1]);
   assert.equal(await page.locator('#quantum-modes').isVisible(),model==='quantum');
   for(const category of ['proton',...(z===1?[]:['neutron','inner-electron']),'valence-electron']){
    await page.selectOption('#particle-list',category);assert.equal(await page.evaluate(()=>Copper.categoryFor(Copper.app.selectionTarget(Copper.app.state.selected))),category);
    if(category==='proton'||category==='neutron'){
     await page.click('#explore-inside');await page.waitForTimeout(220);assert.equal(await page.evaluate(()=>Copper.app.state.view),'nucleon');assert.match(await page.locator('#breadcrumb').innerText(),new RegExp(z===1?'Hydrogen-1':z===6?'Carbon-12':z===29?'Copper-63':z===54?'Xenon-132':'Uranium-238'));
     await page.click('#back-atom');assert.equal(await page.evaluate(()=>Copper.app.atom.protons),z);
    }
   }
   if(model==='bohr')assert.equal(await page.evaluate(()=>Copper.app.renderer.hits.filter(h=>h.p.type==='electron').length),z);
   if(model==='wave'){await page.selectOption('#wave-shell',await page.locator('#wave-shell option').nth(1).getAttribute('value'));assert.equal(await page.evaluate(()=>new Set(Copper.app.renderer.regionHits.map(h=>h.p.shell)).size),1);await page.selectOption('#wave-shell','all');}
   if(model==='quantum'){
    await page.click('[data-quantum="overview"]');assert.equal(await page.locator('[data-quantum="overview"]').getAttribute('aria-pressed'),'true');
    const q=await page.evaluate(()=>{const r=Copper.app.renderer;return {layers:r.visibleLayers,limit:Copper.complexity(Copper.app.atom).overviewLayers,points:r.clouds.reduce((n,c)=>n+c.points.length,0),budget:Copper.complexity(Copper.app.atom).points};});assert.ok(q.layers<=q.limit&&q.points<=q.budget);
    await page.locator('#stage').screenshot({path:'qa/phase45-'+z+'-overview.png'});
    await page.click('[data-quantum="explore"]');const subs=await page.evaluate(()=>Copper.app.atom.subshells.map(s=>s.id));
    for(const sub of subs){const camera=await page.evaluate(()=>[Copper.app.state.yaw,Copper.app.state.pitch,Copper.app.state.zoom]);await page.selectOption('#subshell',sub);assert.equal(await page.evaluate(()=>Copper.app.renderer.visibleLayers),1);assert.match(await page.locator('#subshell-info').innerText(),new RegExp(sub));assert.deepEqual(await page.evaluate(()=>[Copper.app.state.yaw,Copper.app.state.pitch,Copper.app.state.zoom]),camera);assert.equal(await page.evaluate(()=>Copper.app.renderer.focusCloud.points.length),1200);}
    if(z===92){await page.selectOption('#subshell','5f');assert.match(await page.locator('#subshell-info').innerText(),/3 of 14/);await page.locator('#stage').screenshot({path:'qa/phase45-92-5f.png'});}
   }
   for(const level of ['elementary','middle','high']){await page.click('[data-level="'+level+'"]');assert.ok((await page.locator('#simplification-notice').textContent()).length>50);}
   assert.equal(await page.evaluate(()=>JSON.stringify(Copper.app.atom)),science);
  }
  if(z===1){assert.equal(await page.locator('#particle-list option[value="neutron"]').isDisabled(),true);assert.match(await page.locator('#category-note').innerText(),/Hydrogen-1 has no neutron/);}
  timings[z]=await page.evaluate(()=>{const a=Copper.app,out={};a.state.paused=true;for(const model of ['bohr','wave','quantum']){a.switchModel(model);a.select(null);const t=[];for(let i=0;i<40;i++){const start=performance.now();a.draw();t.push(performance.now()-start);}t.sort((a,b)=>a-b);out[model]={medianMs:+t[20].toFixed(2),p95Ms:+t[38].toFixed(2)};}return out;});
 }
 // Invalid records are rejected transactionally, and their fields are named.
 const validation=await page.evaluate(()=>{const C=Copper,a=C.app,element=C.developmentElements[6],isotope=C.developmentIsotopes['carbon-12'],old=a.atom;
  const cases=[{element:{...element,atomicNumber:0}},{element:{...element,neutralElectronCount:7}},{element:{...element,neutralShells:[2,5]}},{element:{...element,defaultIsotope:'hydrogen-1',availableIsotopes:['hydrogen-1']}},{isotope:{...isotope,massNumber:5}},{isotope:{...isotope,atomicNumber:1}},{isotope:{...isotope,stable:undefined}},{element:{...element,neutralSubshells:element.neutralSubshells.map(s=>s.id==='2p'?{...s,occupancy:7}:s)}},{element:{...element,name:''}},{element:{...element,neutralSubshells:[]}}];
  return cases.map(overrides=>{const r=a.loadAtom({element,isotope,...overrides});return {ok:r.ok,error:r.error,unchanged:a.atom===old};});});assert.equal(validation.length,10);validation.forEach(r=>{assert.equal(r.ok,false);assert.ok(r.unchanged&&r.error.length>10);});
 await page.click('#return-copper');assert.equal(await page.locator('#engine-error').isVisible(),false);
 const ions=await page.evaluate(()=>{const C=Copper,e=C.developmentElements[1],i=C.developmentIsotopes['hydrogen-1'];const positive=C.app.loadAtom({element:e,isotope:i,ion:{charge:1},electronStructure:{shells:[],subshells:[],valence:{shells:[]},configuration:'No electrons'}});return {ok:positive.ok,p:C.app.atom.protons,n:C.app.atom.neutrons,e:C.app.atom.electrons,charge:C.app.atom.charge};});assert.deepEqual(ions,{ok:true,p:1,n:0,e:0,charge:1});
 // Deliberately fail a detailed cloud; overview and accurate data survive.
 await page.selectOption('#test-element','92');await page.click('[data-model="quantum"]');
 await page.evaluate(()=>{const r=Copper.app.renderer;r.originalShape=r.shape;r.shape=()=>{throw Error('test detail failure');};});await page.click('[data-quantum="explore"]');assert.equal(await page.evaluate(()=>Copper.app.state.quantumMode),'overview');assert.match(await page.locator('#engine-error').innerText(),/simplified Overview/);await page.evaluate(()=>{const r=Copper.app.renderer;r.shape=r.originalShape;delete r.originalShape;});
 const cdp=await context.newCDPSession(page);await cdp.send('Performance.enable');
 const cycle=async n=>page.evaluate(n=>{const C=Copper,a=C.app;for(let j=0;j<n;j++)for(const z of [1,6,29,54,92]){const old=Object.values(a.renderers);if(!C.testLoad(z).ok)throw Error('Load failed');for(const r of old)if(r.particles.length||r.hits.length||r.clouds?.length)throw Error('Old renderer not disposed');for(const model of ['bohr','wave','quantum']){a.switchModel(model);a.draw();}if(new Set(a.particles.map(p=>p.id)).size!==a.particles.length)throw Error('Duplicate particle');}return {particles:a.particles.length,renderers:Object.keys(a.renderers).length,clouds:a.renderers.quantum.clouds.length};},n);
 await cycle(2);await cdp.send('HeapProfiler.collectGarbage');const heap=async()=>Object.fromEntries((await cdp.send('Performance.getMetrics')).metrics.map(m=>[m.name,m.value])).JSHeapUsedSize;const before=await heap();const resources=await cycle(12);await cdp.send('HeapProfiler.collectGarbage');const after=await heap();assert.deepEqual(resources,{particles:330,renderers:3,clouds:18});assert.ok(after-before<4*1024*1024,'retained heap growth');
 for(const width of [320,390,768,1366]){await page.setViewportSize({width,height:900});for(const z of [1,92]){await page.selectOption('#test-element',String(z));await page.click('[data-model="quantum"]');await page.click('[data-quantum="explore"]');await page.locator('#models-about summary').click();assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);assert.equal(await page.locator('#subshell-info').evaluate(e=>e.scrollWidth>e.clientWidth),false);await page.locator('#models-about summary').click();}await page.screenshot({path:'qa/phase45-'+width+'-harness.png',fullPage:true});}
 assert.deepEqual(errors,[]);assert.deepEqual(remote,[]);assert.deepEqual(missing,[]);
 const report={result:'PASS',atoms:5,models:3,validationFailuresRejected:validation.length,cycles:70,resources,heapBytes:{before,after,growth:after-before},timings,errors,remote,missing};fs.writeFileSync('qa/phase45-results.json',JSON.stringify(report,null,2));console.log(JSON.stringify(report,null,2));
}finally{await browser.close();}})().catch(e=>{console.error(e);process.exitCode=1;});
