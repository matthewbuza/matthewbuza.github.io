const {chromium}=require('C:/Users/arial/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const {pathToFileURL}=require('url'),path=require('path'),fs=require('fs'),assert=require('assert/strict');
(async()=>{const browser=await chromium.launch({executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:true});try{
 const p=await browser.newPage({viewport:{width:1366,height:900},reducedMotion:'reduce'}),errors=[],remote=[];
 p.on('pageerror',e=>errors.push(e.message));p.on('request',r=>{if(!r.url().startsWith('file:'))remote.push(r.url());});
 const url=pathToFileURL(path.resolve('periodic-table-visualizer/index.html')).href;let doubleClicks=0,mouseGestures=0;
 for(const symbol of ['Tb','Dy','Ho','Er','Tm','Yb','Lu']){
  await p.goto(url+'#explore='+symbol);await p.waitForFunction(s=>Copper.app?.atom.element.symbol===s,symbol);
  for(const model of ['bohr','wave','quantum']){
   await p.click('[data-model="'+model+'"]');await p.click('#reset');
   for(const type of ['proton','neutron']){
    await p.locator('#atom').scrollIntoViewIfNeeded();const hit=await p.evaluate(type=>{const a=Copper.app;a.draw();const h=a.renderer.hits.find(h=>h.p.type===type&&a.renderer.pick(h.x,h.y)===h.p.id);return h?{x:h.x,y:h.y}:null;},type);assert.ok(hit);
    const box=await p.locator('#atom').boundingBox();await p.mouse.dblclick(box.x+hit.x,box.y+hit.y);await p.waitForFunction(()=>Copper.app.state.view==='nucleon'&&!Copper.app.state.transitioning);assert.equal(await p.evaluate(()=>Copper.app.state.nucleon),type);
    await p.click('#back-atom');await p.waitForFunction(()=>Copper.app.state.view==='atom');doubleClicks++;
   }
   await p.locator('#atom').scrollIntoViewIfNeeded();const box=await p.locator('#atom').boundingBox(),x=box.x+80,y=box.y+80;
   const pitch=await p.evaluate(()=>Copper.app.state.pitch);await p.mouse.move(x,y);await p.mouse.down();await p.mouse.move(x+30,y+35,{steps:5});await p.mouse.up();assert.ok(await p.evaluate(old=>Copper.app.state.pitch<old,pitch));
   const zoom=await p.evaluate(()=>Copper.app.state.zoom);await p.mouse.wheel(0,-180);await p.waitForFunction(old=>Copper.app.state.zoom>old,zoom);mouseGestures++;
  }
 }
 // Cross-element loading safely leaves interiors, clears particle and isotope state,
 // retains the chosen model/reading level, and fits the new atom.
 await p.click('[data-level="middle"]');await p.selectOption('#isotope-select','lutetium-177');await p.selectOption('#particle-list','neutron');await p.click('#explore-inside');await p.waitForFunction(()=>Copper.app.state.view==='nucleon'&&!Copper.app.state.transitioning);
 await p.evaluate(()=>{location.hash='explore=Tb';});await p.waitForFunction(()=>Copper.app.atom.element.symbol==='Tb');
 assert.deepEqual(await p.evaluate(()=>{const a=Copper.app,s=a.state;return [s.view,s.selected,s.model,s.level,s.zoom,s.yaw,s.pitch,a.atom.isotope.id];}),['atom',null,'quantum','middle',1,.3,.62,'terbium-159']);
 assert.equal(await p.locator('#isotope-select option[value="lutetium-177"]').count(),0);
 // Representative schema rejects wrong names/symbols as well as numerical errors.
 const identities=await p.evaluate(()=>{const C=Copper;let n=0;for(let z=65;z<=71;z++)for(const field of ['name','symbol']){const e=structuredClone(C.elements[z]);e[field]='Wrong';if(C.validateLanthanideData({[z]:e}).ok)throw Error('Identity accepted');n++;}return n;});assert.equal(identities,14);
 await p.goto(url+'#explore=Lu');await p.waitForFunction(()=>Copper.app.atom.element.symbol==='Lu');await p.click('#fullscreen');
 const fullscreen=await p.evaluate(()=>{const a=Copper.app,out={};for(const model of ['bohr','wave','quantum']){a.switchModel(model);const geometry=a.renderer.nucleonPath,t=[];for(let i=0;i<30;i++){const start=performance.now();a.draw();t.push(performance.now()-start);if(a.renderer.nucleonPath!==geometry)throw Error('Static geometry rebuilt');}t.sort((a,b)=>a-b);out[model]={medianMs:t[15],p95Ms:t[28]};}return out;});
 await p.locator('#stage').screenshot({path:'qa/phase6i-Lu-fullscreen.png'});await p.click('#exit-fullscreen');assert.equal(await p.evaluate(()=>Copper.app.state.presentation),false);
 assert.deepEqual(errors,[]);assert.deepEqual(remote,[]);const out={result:'PASS',doubleClicks,mouseGestures,identityNegativeCases:identities,fullscreen,errors,remote};fs.writeFileSync('qa/phase6i-state-results.json',JSON.stringify(out,null,2));console.log(out);
}finally{await browser.close();}})().catch(e=>{console.error(e);process.exitCode=1;});
