const {chromium}=require('C:/Users/arial/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const {pathToFileURL}=require('url'),path=require('path'),assert=require('assert/strict');
(async()=>{
 const browser=await chromium.launch({executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:true});
 try{
 const context=await browser.newContext({viewport:{width:1366,height:900},hasTouch:true,reducedMotion:'reduce'}),page=await context.newPage(),errors=[];
 page.on('pageerror',e=>errors.push(e.message));
 await page.goto(pathToFileURL(path.resolve('periodic-table-visualizer/index.html')).href+'#explore=Cu');
 const scientific=await page.evaluate(()=>JSON.stringify(Copper.app.atom));
 const options=await page.locator('#particle-list option:not([hidden])').allTextContents();assert.deepEqual(options,['Proton','Neutron','Inner electron','Valence electron']);
 // Track a point on the camera-facing surface, rather than merely checking
 // an Euler angle sign. Its screen displacement must follow the pointer.
 const cdp=await context.newCDPSession(page),box=await page.locator('#atom').boundingBox();
 for(const device of ['mouse','touch','pen'])for(const [dx,dy] of [[25,0],[-25,0],[0,25],[0,-25]]){
   await page.click('#reset');
   const before=await page.evaluate(()=>{const a=Copper.app,s=a.state,z=30;window.probe={x:-Math.sin(s.yaw)*Math.cos(s.pitch)*z,y:Math.sin(s.pitch)*z,z:Math.cos(s.yaw)*Math.cos(s.pitch)*z};return a.renderer.project(probe);});
   const x=Math.round(box.x+box.width/2),y=Math.round(box.y+box.height/2);
   if(device==='mouse'){await page.mouse.move(x,y);await page.mouse.down();await page.mouse.move(x+dx,y+dy,{steps:3});await page.mouse.up();}
   else if(device==='touch'){await cdp.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[{x,y,id:1}]});await cdp.send('Input.dispatchTouchEvent',{type:'touchMove',touchPoints:[{x:x+dx,y:y+dy,id:1}]});await cdp.send('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]});}
   else{await cdp.send('Input.dispatchMouseEvent',{type:'mousePressed',x,y,button:'left',buttons:1,clickCount:1,pointerType:'pen'});await cdp.send('Input.dispatchMouseEvent',{type:'mouseMoved',x:x+dx,y:y+dy,button:'left',buttons:1,pointerType:'pen'});await cdp.send('Input.dispatchMouseEvent',{type:'mouseReleased',x:x+dx,y:y+dy,button:'left',buttons:0,clickCount:1,pointerType:'pen'});}
   const after=await page.evaluate(()=>Copper.app.renderer.project(probe));assert.ok(dx?(after.x-before.x)*dx>0:(after.y-before.y)*dy>0,device+' drag '+dx+','+dy);
 }
 // Representatives must be on screen and exposed at varied orientations/zoom.
 for(const zoom of [1,7])for(const yaw of [.3,1.7,3.2])for(const category of ['proton','neutron','inner-electron','valence-electron']){
   const result=await page.evaluate(({zoom,yaw,category})=>{const a=Copper.app;a.state.zoom=zoom;a.state.yaw=yaw;a.selectCategory(category);const h=a.renderer.hits.find(h=>h.p.id===a.state.selected);return {category:Copper.categoryFor(h.p),visible:a.renderer.isVisible(h)};},{zoom,yaw,category});assert.deepEqual(result,{category,visible:true});
 }
 assert.equal(await page.evaluate(()=>JSON.stringify(Copper.app.atom)),scientific);
 const data=await page.evaluate(()=>{
   const C=Copper,a=C.app.atom,assert=(condition,message)=>{if(!condition)throw Error(message);};
   // Arithmetic-only fixture: no abundance, lifetime, or stability claims.
   const test65={id:'test-copper-65',atomicNumber:29,massNumber:65};
   const b=C.withIsotope(a,test65);assert(b.protons===29&&b.neutrons===36&&b.electrons===29&&b.charge===0,'isotope independence');
   const ion=C.createAtom({element:a.element,isotope:a.isotope,ion:{charge:1},electronStructure:{shells:[2,8,18],valence:{shells:[3]},configuration:'test structure'}});
   const ion65=C.withIsotope(ion,test65);assert(ion.electrons===28&&ion.protons===29&&ion.neutrons===34&&ion65.electrons===28&&ion65.charge===1,'ion independence');
   const negative=C.createAtom({element:a.element,isotope:a.isotope,ion:{charge:-1},electronStructure:{shells:[2,8,18,2],valence:{shells:[4]}}});assert(negative.electrons===30,'negative charge convention');
   const h=C.createAtom({element:{atomicNumber:1,name:'Hydrogen',symbol:'H',neutralShells:[1],valence:{shells:[1]}},isotope:{atomicNumber:1,massNumber:1}});
   const hp=C.makeParticles(h);assert(hp.filter(p=>p.type==='neutron').length===0&&!C.particleCategories(hp).find(c=>c.id==='neutron').available,'zero-neutron categories');
   assert(C.makeParticles(negative).filter(p=>p.valence).length===2,'multiple valence electrons');
   assert(C.commonIsotopes(a.element,{[a.isotope.id]:a.isotope}).length===1,'one common isotope');
   assert(Object.isFrozen(a)&&Object.isFrozen(a.element)&&Object.isFrozen(a.shells)&&Object.isFrozen(a.ion),'deep freeze');
   const invalid=[{element:{...a.element,atomicNumber:0}},{element:{...a.element,protons:28}},{isotope:{...a.isotope,massNumber:28}},{isotope:{...a.isotope,massNumber:63.5}},{isotope:{...a.isotope,neutrons:35}},{ion:{charge:30}},{ion:{charge:.5}},{ion:{charge:1,electrons:29},electronStructure:{shells:[2,8,18],valence:{shells:[3]}}},{electronStructure:{shells:[2,8,18],valence:{shells:[3]}}},{electronStructure:{shells:[2,8,18,1],valence:{shells:[5]}}}];
   const messages=invalid.map(overrides=>{try{C.createAtom({element:a.element,isotope:a.isotope,...overrides});throw Error('Accepted invalid record');}catch(e){assert(e.message.startsWith('Atom data:'),e.message);return e.message;}});
   const electrons=C.app.particles.filter(p=>p.type==='electron'),camera=JSON.stringify(C.app.state);C.app.select(null);const previousState=JSON.stringify(C.app.state);C.app.setIsotope(test65);
   assert(C.app.particles.filter(p=>p.type==='electron').every((p,i)=>p===electrons[i]),'electron objects preserved');assert(JSON.stringify(C.app.state)===previousState,'camera and charge unchanged');assert(document.getElementById('neutrons').textContent==='36','profile updated');assert(document.getElementById('atom').getAttribute('aria-label').includes('36 neutrons'),'accessible label updated');C.app.setIsotope(a.isotope);
   return {invalidRecordsRejected:messages.length,messages,counts:[a.protons,a.neutrons,a.electrons],shells:a.shells};
 });
 await page.click('#reset');await page.selectOption('#particle-list','valence-electron');await page.screenshot({path:'qa/phase11-desktop.png',fullPage:true});
 await page.setViewportSize({width:390,height:844});await page.screenshot({path:'qa/phase11-phone.png',fullPage:true});
 assert.deepEqual(errors,[]);console.log(JSON.stringify({result:'PASS',directions:'all four, mouse/touch/pen',representativeViews:24,scientificDataUnchanged:true,data},null,2));
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exit(1);});
