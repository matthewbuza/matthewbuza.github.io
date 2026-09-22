const {chromium}=require('C:/Users/arial/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const {pathToFileURL}=require('url');
const path=require('path');
const fs=require('fs');
const assert=require('assert/strict');
(async()=>{
 const browser=await chromium.launch({executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:true});
 const context=await browser.newContext({viewport:{width:1366,height:900},hasTouch:true});
 const page=await context.newPage(),errors=[],remote=[];
 page.on('pageerror',e=>errors.push(e.message));page.on('console',m=>{if(m.type()==='error')errors.push(m.text());});page.on('request',r=>{if(!r.url().startsWith('file:'))remote.push(r.url());});
 await page.goto(pathToFileURL(path.resolve('periodic-table-visualizer/index.html')).href+'#explore=Cu');
 await page.waitForFunction(()=>window.Copper?.app?.renderer?.hits.length===92);
 const facts=await page.evaluate(()=>{const a=Copper.app;return {counts:['proton','neutron','electron'].map(t=>a.particles.filter(p=>p.type===t).length),shells:[1,2,3,4].map(s=>a.particles.filter(p=>p.shell===s).length),charge:a.atom.charge,unique:new Set(a.particles.map(p=>p.id)).size};});
 assert.deepEqual(facts,{counts:[29,34,29],shells:[2,8,18,1],charge:0,unique:92});
 await page.click('#pause');const time=await page.evaluate(()=>Copper.app.state.time);await page.waitForTimeout(150);assert.equal(await page.evaluate(()=>Copper.app.state.time),time);
 const box=await page.locator('#atom').boundingBox();await page.mouse.move(box.x+180,box.y+150);await page.mouse.down();await page.mouse.move(box.x+240,box.y+180,{steps:5});await page.mouse.up();assert.notEqual(await page.evaluate(()=>Copper.app.state.yaw),.3);
 await page.mouse.wheel(0,-200);await page.waitForTimeout(100);assert.ok(await page.evaluate(()=>Copper.app.state.zoom>1));
 await page.click('#reset');assert.equal(await page.evaluate(()=>Copper.app.state.zoom),1);
 const point=await page.evaluate(()=>{const r=Copper.app.renderer;const h=r.hits.find(h=>h.p.shell===4);return {x:h.x,y:h.y};});await page.mouse.click(box.x+point.x,box.y+point.y);assert.match(await page.locator('#particle-info').innerText(),/Valence/);
 await page.mouse.click(box.x+8,box.y+8);assert.equal(await page.evaluate(()=>Copper.app.state.selected),null);
 for(const type of ['proton','neutron','inner-electron','valence-electron']){await page.selectOption('#particle-list',type);assert.equal(await page.evaluate(()=>Copper.categoryFor(Copper.app.particles.find(p=>p.id===Copper.app.state.selected))),type);}
 await page.click('#clear');assert.equal(await page.evaluate(()=>Copper.app.state.selected),null);
 await page.click('#labels');assert.equal(await page.evaluate(()=>Copper.app.state.labels),false);await page.click('#labels');
 await page.click('#help');assert.equal(await page.locator('#help-dialog').evaluate(e=>e.open),true);await page.keyboard.press('Escape');assert.equal(await page.locator('#help-dialog').evaluate(e=>e.open),false);
 await page.click('[data-model="wave"]');assert.match(await page.locator('#status').innerText(),/selected/);await page.click('[data-model="quantum"]');assert.match(await page.locator('#status').innerText(),/selected/);await page.click('[data-model="bohr"]');
 await page.locator('#atom').focus();await page.keyboard.press('ArrowRight');assert.ok(await page.evaluate(()=>Copper.app.state.yaw>.3));await page.keyboard.press('+');assert.ok(await page.evaluate(()=>Copper.app.state.zoom>1));await page.click('#reset');
 const cdp=await context.newCDPSession(page);const x=Math.round(box.x+200),y=Math.round(box.y+200);
 await cdp.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[{x,y,id:1}]});await cdp.send('Input.dispatchTouchEvent',{type:'touchMove',touchPoints:[{x:x+50,y:y+20,id:1}]});await cdp.send('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]});assert.ok(await page.evaluate(()=>Copper.app.state.yaw>.3));
 await cdp.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[{x,y,id:1},{x:x+100,y,id:2}]});await cdp.send('Input.dispatchTouchEvent',{type:'touchMove',touchPoints:[{x:x-30,y,id:1},{x:x+130,y,id:2}]});await cdp.send('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]});assert.ok(await page.evaluate(()=>Copper.app.state.zoom>1));
 await page.evaluate(()=>Copper.app.zoom(100));assert.equal(await page.evaluate(()=>Copper.app.state.zoom),7);await page.evaluate(()=>Copper.app.zoom(.0001));assert.equal(await page.evaluate(()=>Copper.app.state.zoom),.65);await page.click('#reset');
 for(const [name,width,height] of [['desktop',1366,900],['tablet',768,1024],['phone',390,844]]){await page.setViewportSize({width,height});await page.waitForTimeout(100);assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));await page.screenshot({path:'qa/'+name+'.png',fullPage:true});}
 for(const button of await page.locator('button:visible').all()){await button.focus();assert.equal(await button.evaluate(e=>document.activeElement===e),true);}
 await page.emulateMedia({reducedMotion:'reduce'});await page.reload();await page.waitForFunction(()=>window.Copper?.app?.renderer);assert.equal(await page.evaluate(()=>Copper.app.state.paused),true);
 await page.click('#pause');const before=await page.evaluate(()=>Copper.app.state.time);await page.waitForTimeout(120);assert.ok(await page.evaluate(()=>Copper.app.state.time)>before);
 const timing=await page.evaluate(()=>{const t=performance.now();for(let i=0;i<100;i++)Copper.app.draw();return (performance.now()-t)/100;});
 await page.addInitScript(()=>{HTMLCanvasElement.prototype.getContext=()=>null;});await page.reload();assert.equal(await page.locator('#fallback').isVisible(),true);await page.selectOption('#particle-list','proton');assert.match(await page.locator('#particle-info').innerText(),/Proton/);
 assert.deepEqual(remote,[]);assert.deepEqual(errors,[]);
 const html=fs.readFileSync('periodic-table-visualizer/index.html','utf8');for(const match of html.matchAll(/(?:src|href)="([^"]+)"/g))if(!match[1].startsWith('#'))assert.ok(fs.existsSync(path.join('periodic-table-visualizer',match[1])));
 console.log(JSON.stringify({result:'PASS',facts,remoteRequests:remote,errors,averageRenderMs:timing,checks:'file:// load, local paths, pause/resume, mouse drag, wheel, click selection, empty clearing, all particle types, list, clear, labels, help/Escape, model messaging, keyboard rotate/zoom, emulated touch drag/pinch, zoom bounds, responsive widths, reduced motion, Canvas failure fallback'},null,2));
 await browser.close();
})().catch(e=>{console.error(e);process.exit(1);});
