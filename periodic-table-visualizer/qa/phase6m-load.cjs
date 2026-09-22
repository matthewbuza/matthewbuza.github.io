const {chromium}=require('C:/Users/arial/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright'),{pathToFileURL}=require('url'),path=require('path'),fs=require('fs'),assert=require('assert/strict');
(async()=>{const b=await chromium.launch({executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:true});try{
 const p=await b.newPage({viewport:{width:1366,height:900},reducedMotion:'reduce'}),url=pathToFileURL(path.resolve('periodic-table-visualizer/index.html')).href,errors=[],remote=[],loadMs=[];
 p.on('pageerror',e=>errors.push(e.message));p.on('request',r=>{if(!r.url().startsWith('file:'))remote.push(r.url());});
 for(let i=0;i<3;i++){const start=performance.now();await p.goto(url+'#explore=Lr');await p.waitForFunction(()=>Copper.app?.atom.electrons===103&&Copper.app.renderer.hits.length===369);loadMs.push(performance.now()-start);await p.goto('about:blank');}
 await p.goto(url+'#explore=Lr');
 const initial=await p.evaluate(()=>[Copper.app.state.reducedMotion,Copper.app.state.paused,Copper.app.state.time]);await p.waitForTimeout(250);assert.equal(initial[0],true);assert.equal(await p.evaluate(()=>Copper.app.state.time),initial[2]);
 await p.click('[data-model="wave"]');
 const labels=await p.evaluate(()=>{const a=Copper.app,r=a.renderer,original=r.label,labels=[];r.label=function(text,x,y,...args){if(/^7[sp] ·/.test(text))labels.push({text,x,y});return original.call(this,text,x,y,...args);};try{a.draw();}finally{r.label=original;}return labels;});
 assert.equal(labels.length,2);assert.ok(Math.abs(labels[0].y-labels[1].y)>=18,'7s/7p labels overlap');
 assert.deepEqual(await p.evaluate(()=>Copper.waveStates(Copper.app.atom).filter(s=>s.shell===7).map(s=>[s.subshell,s.occupancy,s.radialScale])),[['7s',2,.88],['7p',1,1]]);
 await p.locator('#stage').screenshot({path:'qa/phase6m-Lr-wave-reviewed.png'});
 await p.goto(url+'#explore=Md');await p.setViewportSize({width:320,height:900});assert.equal(await p.evaluate(()=>document.documentElement.scrollWidth),320);assert.equal(await p.locator('#profile-isotope').evaluate(e=>e.getBoundingClientRect().right<=innerWidth),true);
 await p.locator('#profile-isotope').locator('xpath=ancestor::section[1]').screenshot({path:'qa/phase6m-Md-profile-320.png'});
 await p.setViewportSize({width:1366,height:900});await p.goto(url);await p.locator('#tile-Lr').scrollIntoViewIfNeeded();await p.locator('#periodic-grid').screenshot({path:'qa/phase6m-periodic-table.png'});
 assert.deepEqual(errors,[]);assert.deepEqual(remote,[]);const out={result:'PASS',localLrNavigationMs:loadMs,reducedMotionTimeUnchanged:true,waveLabels:labels,mendelevium320Fits:true,errors,remote};fs.writeFileSync('qa/phase6m-load-results.json',JSON.stringify(out,null,2));console.log(out);
}finally{await b.close();}})().catch(e=>{console.error(e);process.exitCode=1;});
