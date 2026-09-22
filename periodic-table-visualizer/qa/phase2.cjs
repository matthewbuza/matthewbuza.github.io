const {chromium}=require('C:/Users/arial/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const {pathToFileURL}=require('url'),path=require('path'),fs=require('fs'),assert=require('assert/strict');
(async()=>{
 const browser=await chromium.launch({executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:true});
 try{
 const context=await browser.newContext({viewport:{width:1366,height:900},hasTouch:true}),page=await context.newPage(),errors=[],requests=[];
 page.on('pageerror',e=>errors.push(e.message));page.on('console',m=>{if(m.type()==='error')errors.push(m.text());});page.on('request',r=>requests.push(r.url()));
 await page.goto(pathToFileURL(path.resolve('periodic-table-visualizer/index.html')).href+'#explore=Cu');await page.waitForFunction(()=>Copper.app.renderer);
 const original=await page.evaluate(()=>JSON.stringify(Copper.app.atom));
 const subs=await page.evaluate(()=>Copper.app.atom.subshells.map(s=>s.id+':'+s.occupancy));assert.deepEqual(subs,['1s:2','2s:2','2p:6','3s:2','3p:6','3d:10','4s:1']);
 await page.click('#pause');
 for(const level of ['elementary','middle','high']){
  await page.click('[data-level="'+level+'"]');
  for(const model of ['bohr','wave','quantum']){
   await page.click('[data-model="'+model+'"]');await page.waitForTimeout(340);
   assert.equal(await page.locator('[data-model][aria-pressed="true"]').count(),1);assert.equal(await page.evaluate(()=>Copper.app.state.level),level);
   assert.equal(await page.evaluate(()=>JSON.stringify(Copper.app.atom)),original);
   assert.ok((await page.locator('#model-description').innerText()).length>30);
   for(const category of ['proton','neutron','inner-electron','valence-electron']){
    await page.selectOption('#particle-list',category);
    const selection=await page.evaluate(()=>{const a=Copper.app,p=a.selectionTarget(a.state.selected);return {category:Copper.categoryFor(p),region:p.region||'particle'};});
    assert.equal(selection.category,category);assert.equal(selection.region,category.endsWith('electron')&&model!=='bohr'?(model==='wave'?'wave':'orbital'):'particle');
   }
   await page.click('#clear');assert.equal(await page.evaluate(()=>Copper.app.state.selected),null);
  }
 }
 // Every subshell updates occupancy/capacity and leaves the camera alone.
 for(const sub of ['all','1s','2s','2p','3s','3p','3d','4s']){
  const camera=await page.evaluate(()=>[Copper.app.state.yaw,Copper.app.state.pitch,Copper.app.state.zoom]);
  if(sub==='all')await page.click('[data-quantum="overview"]');else{await page.click('[data-quantum="explore"]');await page.selectOption('#subshell',sub);}assert.equal(await page.evaluate(()=>Copper.app.state.subshell),sub);
  assert.deepEqual(await page.evaluate(()=>[Copper.app.state.yaw,Copper.app.state.pitch,Copper.app.state.zoom]),camera);
  assert.ok((await page.locator('#subshell-info').textContent()).length>20);
 }
 // Selection retention and clearing across model boundaries.
 await page.selectOption('#particle-list','proton');const proton=await page.evaluate(()=>Copper.app.state.selected);await page.click('[data-model="wave"]');assert.equal(await page.evaluate(()=>Copper.app.state.selected),proton);
 await page.selectOption('#particle-list','valence-electron');await page.click('[data-model="quantum"]');assert.equal(await page.evaluate(()=>Copper.app.state.selected),null);
 // Direct region hits and nucleus clicks work in every model.
 for(const model of ['bohr','wave','quantum']){
  await page.click('[data-model="'+model+'"]');await page.waitForTimeout(350);
  await page.evaluate(()=>{Copper.app.state.zoom=1;Copper.app.draw();});
  const box=await page.locator('#atom').boundingBox();const target=await page.evaluate(()=>{const r=Copper.app.renderer;return (r.regionHits||r.hits.filter(h=>h.p.type==='electron')).find(h=>h.x>20&&h.x<r.w-60&&h.y>20&&h.y<r.h-40&&r.pick(h.x,h.y)===h.p.id);});
  assert.ok(target);await page.mouse.click(box.x+target.x,box.y+target.y);assert.ok(await page.evaluate(()=>Copper.app.state.selected));
  const nucleon=await page.evaluate(()=>{const r=Copper.app.renderer;return r.hits.find(h=>h.p.type==='proton'&&r.pick(h.x,h.y)===h.p.id);});assert.ok(nucleon);await page.mouse.click(box.x+nucleon.x,box.y+nucleon.y);assert.equal(await page.evaluate(()=>Copper.app.selectionTarget(Copper.app.state.selected).type),'proton');
 }
 // Renderer caches remain fixed after 60 switches; all share data and particles.
 const cache=await page.evaluate(()=>{const a=Copper.app;for(let i=0;i<60;i++)a.switchModel(['bohr','wave','quantum'][i%3]);return {count:Object.keys(a.renderers).length,shared:Object.values(a.renderers).every(r=>r.atom===a.atom&&r.particles===a.particles),particles:a.particles.length,points:a.renderers.quantum.clouds.reduce((n,c)=>n+c.points.length,0)};});assert.equal(cache.count,3);assert.equal(cache.shared,true);assert.equal(cache.particles,92);
 // Fixed wave nodes: selected node location is unchanged as time advances.
 const nodes=await page.evaluate(()=>{const a=Copper.app;a.switchModel('wave');a.state.time=0;a.draw();const first=a.renderer.regionHits[0];a.state.time=2;a.draw();const second=a.renderer.regionHits[0];return Math.hypot(first.x-second.x,first.y-second.y);});assert.equal(nodes,0);
 const motion=await page.evaluate(()=>{const a=Copper.app;a.state.time=0;a.draw();const first=a.renderer.regionHits[12];a.state.time=2;a.draw();const second=a.renderer.regionHits[12];return Math.hypot(first.x-second.x,first.y-second.y);});assert.ok(motion>0);
 for(const model of ['bohr','wave','quantum']){await page.click('[data-model="'+model+'"]');await page.click('#pause');const time=await page.evaluate(()=>Copper.app.state.time);await page.waitForTimeout(100);assert.ok(await page.evaluate(()=>Copper.app.state.time)>time);await page.click('#pause');}
 const pulseOnly=await page.evaluate(()=>{const a=Copper.app;a.switchModel('quantum');const before=JSON.stringify(a.renderer.clouds);a.state.time+=2;a.draw();return before===JSON.stringify(a.renderer.clouds)&&a.renderer.hits.every(h=>h.p.type!=='electron');});assert.equal(pulseOnly,true);
 // Native fullscreen, camera restoration, interaction, visible exit, hidden UI.
 await page.click('[data-level="middle"]');await page.click('[data-model="quantum"]');await page.waitForTimeout(350);
 const camera=await page.evaluate(()=>[Copper.app.state.yaw,Copper.app.state.pitch,Copper.app.state.zoom]);
 await page.click('#fullscreen');await page.waitForTimeout(100);assert.equal(await page.evaluate(()=>!!document.fullscreenElement),true);
 assert.equal(await page.locator('#exit-fullscreen').isVisible(),true);assert.equal(await page.locator('#explorer-page header').isVisible(),false);assert.equal(await page.locator('.zoom').isVisible(),false);
 await page.mouse.move(600,400);await page.mouse.down();await page.mouse.move(650,430);await page.mouse.up();await page.mouse.wheel(0,-150);await page.waitForTimeout(80);assert.notDeepEqual(await page.evaluate(()=>[Copper.app.state.yaw,Copper.app.state.pitch,Copper.app.state.zoom]),camera);
 await page.click('#exit-fullscreen');assert.equal(await page.evaluate(()=>Copper.app.state.presentation),false);assert.deepEqual(await page.evaluate(()=>[Copper.app.state.yaw,Copper.app.state.pitch,Copper.app.state.zoom]),camera);assert.equal(await page.evaluate(()=>Copper.app.state.level),'middle');
 await page.click('#fullscreen');await page.keyboard.press('Escape');await page.waitForTimeout(100);assert.equal(await page.evaluate(()=>Copper.app.state.presentation),false);
 // Browser-initiated exit event, independent of our Exit button.
 await page.click('#fullscreen');await page.evaluate(()=>document.exitFullscreen());await page.waitForTimeout(50);assert.equal(await page.evaluate(()=>Copper.app.state.presentation),false);
 // API absent and denied both retain the in-page fallback.
 for(const mode of ['absent','denied']){
  await page.evaluate(mode=>{document.getElementById('stage').requestFullscreen=mode==='absent'?undefined:()=>Promise.reject(new Error('Simulated denial'));},mode);
  await page.click('#fullscreen');assert.equal(await page.evaluate(()=>Copper.app.state.presentation),true);assert.equal(await page.evaluate(()=>!!document.fullscreenElement),false);
  await page.keyboard.press('Escape');assert.equal(await page.evaluate(()=>Copper.app.state.presentation),false);
 }
 for(const button of await page.locator('button:visible').all()){await button.focus();assert.equal(await button.evaluate(e=>document.activeElement===e),true);}
 // Reduced motion suppresses transition; Pause fixes time in all views.
 await page.emulateMedia({reducedMotion:'reduce'});
 for(const model of ['bohr','wave','quantum']){await page.click('[data-model="'+model+'"]');assert.equal(await page.locator('#transition-canvas').isVisible(),false);const time=await page.evaluate(()=>Copper.app.state.time);await page.waitForTimeout(70);assert.equal(await page.evaluate(()=>Copper.app.state.time),time);}
 // Touch drag/pinch with each renderer.
 const cdp=await context.newCDPSession(page);
 for(const model of ['bohr','wave','quantum']){await page.click('[data-model="'+model+'"]');await page.click('#reset');const box=await page.locator('#atom').boundingBox(),x=Math.round(box.x+200),y=Math.round(box.y+200);
  await cdp.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[{x,y,id:1}]});await cdp.send('Input.dispatchTouchEvent',{type:'touchMove',touchPoints:[{x:x+35,y:y+25,id:1}]});await cdp.send('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]});assert.ok(await page.evaluate(()=>Copper.app.state.yaw>.3&&Copper.app.state.pitch<.62));
  await cdp.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[{x,y,id:1},{x:x+100,y,id:2}]});await cdp.send('Input.dispatchTouchEvent',{type:'touchMove',touchPoints:[{x:x-25,y,id:1},{x:x+125,y,id:2}]});await cdp.send('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]});assert.ok(await page.evaluate(()=>Copper.app.state.zoom>1));
 }
 // Every model/level/category fits phone/tablet; save inspectable screenshots.
 for(const width of [320,390,768,1366]){await page.setViewportSize({width,height:900});for(const model of ['bohr','wave','quantum']){await page.click('[data-model="'+model+'"]');for(const level of ['elementary','middle','high']){await page.click('[data-level="'+level+'"]');for(const category of ['proton','neutron','inner-electron','valence-electron']){await page.selectOption('#particle-list',category);assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);assert.equal(await page.locator('#particle-info').evaluate(e=>e.scrollWidth>e.clientWidth),false);}}await page.screenshot({path:'qa/phase2-'+width+'-'+model+'.png',fullPage:true});}}
 const timings=await page.evaluate(()=>{const a=Copper.app,result={};for(const model of ['bohr','wave','quantum']){a.switchModel(model);const start=performance.now();for(let i=0;i<60;i++)a.draw();result[model]=(performance.now()-start)/60;}return result;});
 const detail=await page.evaluate(()=>{const a=Copper.app;const old=performance.now.bind(performance);let t=0;performance.now=()=>t+=40;for(let i=0;i<35;i++)a.draw();performance.now=old;return a.state.lowDetail;});assert.equal(detail,true);
 const html=fs.readFileSync('periodic-table-visualizer/index.html','utf8');for(const m of html.matchAll(/(?:src|href)="([^"]+)"/g))if(!m[1].startsWith('#'))assert.ok(fs.existsSync(path.join('periodic-table-visualizer',m[1])));
 assert.deepEqual(errors,[]);assert.equal(requests.some(url=>!url.startsWith('file:')),false);
 console.log(JSON.stringify({result:'PASS',cache,timings,errors,remoteRequests:0,checks:'3 models, 3 levels, 4 categories, 8 subshell choices, 60 switches, native/denied/absent fullscreen, exit/Escape/browser exit, touch/pinch, reduced motion, 4 widths, fallback performance'},null,2));
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exit(1);});
