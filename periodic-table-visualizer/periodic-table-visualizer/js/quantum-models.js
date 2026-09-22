(function(C){
 'use strict';
 // Existing large atoms use grouped shell bands; curated light atoms expose each occupied subshell.
 C.waveStates=atom=>atom.element.waveResolution==='subshell'?atom.subshells.filter(s=>s.occupancy).map(sub=>({id:'wave-'+sub.id,key:sub.id,type:'electron',region:'wave',shell:sub.n,subshell:sub.id,l:sub.l,occupancy:sub.occupancy,transition:sub.id===atom.element.transitionRegion,filledCore:atom.element.filledCoreSubshells?.includes(sub.id)||false,important:C.isImportant(atom,sub),valence:atom.valence.shells.includes(sub.n),radialScale:atom.element.lateActinideExplorer&&sub.id==='7s'&&atom.shells[6]>2?.88:(atom.element.outerSExplorer||(atom.element.lanthanideExplorer||atom.element.heavyDExplorer||(atom.element.heavyPExplorer||(atom.element.actinideExplorer||atom.element.transactinideExplorer))))?(C.isImportant(atom,sub)?1:({s:.62,p:.75,d:.88,f:1}[sub.l])):atom.element.period5Detail&&[3,4].includes(sub.n)?({s:.70,p:.84,d:1}[sub.l]):atom.element.period4Detail&&sub.n===3?({'3s':.70,'3p':.84,'3d':1}[sub.id]):sub.l==='s'&&atom.subshells.some(s=>s.id===sub.n+'p')?.82:1})):atom.shells.flatMap((count,i)=>count?[{id:'wave-'+(i+1),key:String(i+1),type:'electron',region:'wave',shell:i+1,occupancy:count,valence:atom.valence.shells.includes(i+1),radialScale:1}]:[]);
 C.models.wave=class extends C.models.bohr{
  electronObjects(){return [];}
  drawRegions(){
   const g=this.ctx,s=this.state,count=s.lowDetail?48:C.complexity(this.atom).waveSegments;this.regionHits=[];
   const states=C.waveStates(this.atom);for(const p of states){
    const shell=p.shell;if(s.waveShell!=='all'&&s.waveShell!==p.key)continue;
    const selected=s.selected===p.id||(s.selected==='group-valence'&&p.valence)||(s.selected==='group-transition'&&p.transition);
    const frequency=this.atom.shells.length===1?1:shell+1,amplitude=14+shell*2,pulse=s.reducedMotion?1:Math.cos(s.time*.85);
    let previous;
    for(let j=0;j<=count;j++){
     const angle=j/count*Math.PI*2,position=this.orbit(shell,angle),wave=Math.sin(frequency*angle);
     // sin(m*angle)*cos(time): fixed nodes, no traveling angular phase.
     const scale=p.radialScale+amplitude*wave*pulse/C.shellRadius(shell);
     const h=this.project({x:position.x*scale,y:position.y*scale,z:position.z*scale});
     if(previous){g.globalAlpha=selected?.95:((this.atom.element.outerSExplorer||(this.atom.element.lanthanideExplorer||this.atom.element.heavyDExplorer||(this.atom.element.heavyPExplorer||(this.atom.element.actinideExplorer||this.atom.element.transactinideExplorer))))&&!p.important?(s.waveShell==='all'?.10:.48):(this.atom.element.period4Detail||this.atom.element.period5Detail)&&!p.important?.30:.48)+Math.abs(wave)*.35;g.strokeStyle=selected?'#ffe2a1':(p.valence||p.transition||((this.atom.element.lanthanideExplorer||this.atom.element.heavyDExplorer||(this.atom.element.heavyPExplorer||(this.atom.element.actinideExplorer||this.atom.element.transactinideExplorer)))&&p.important))?'#e2aa7d':'#8ed9df';g.lineWidth=selected?3:1.2+Math.abs(wave)*1.5;g.beginPath();g.moveTo(previous.x,previous.y);g.lineTo(h.x,h.y);g.stroke();}
     this.regionHits.push({...h,r:7,p});previous=h;
    }
    if(s.labels&&!s.presentation&&s.zoom<1.7&&(selected||shell===this.atom.shells.length)){this.label(p.subshell?p.subshell+' · '+p.occupancy+' of '+C.capacity[p.l]+' electrons':'Level '+shell+' · '+frequency+(frequency===1?' standing-wave cycle':' standing waves'),this.w/2,this.h-36-(this.atom.element.lateActinideExplorer&&this.atom.shells[6]>2&&p.subshell==='7s'&&states.length>1?18:0)-((this.atom.element.outerSExplorer||(this.atom.element.lanthanideExplorer||this.atom.element.heavyDExplorer||(this.atom.element.heavyPExplorer||(this.atom.element.actinideExplorer||this.atom.element.transactinideExplorer))))?(selected&&!p.important?18:0):p.subshell?states.indexOf(p)*18:0),selected?'#ffe2a1':'#c6d7e2');}
   }
   g.globalAlpha=1;
  }
  pick(x,y){return super.pick(x,y)||this.regionHits.find(h=>Math.hypot(h.x-x,h.y-y)<10)?.p.id||null;}
  target(id){return this.regionHits?.find(h=>h.p.id===id)?.p;}
 };
 // Deterministic teaching shapes. No cloud is generated per electron.
 const colors=['#f0ddbf','#a3d9e2','#87b7e2','#b8d7d8','#a2c6e7','#d0b3e0','#e5b184'];
 C.models.quantum=class extends C.models.bohr{
  constructor(...args){super(...args);this.detail=C.complexity(this.atom);this.clouds=this.makeClouds();this.focusCloud=null;this.sprites={};for(const color of [...colors,'#ffe2a1']){const sprite=document.createElement('canvas');sprite.width=sprite.height=32;const g=sprite.getContext('2d'),gradient=g.createRadialGradient(16,16,0,16,16,16);gradient.addColorStop(0,color+'bb');gradient.addColorStop(.4,color+'55');gradient.addColorStop(1,color+'00');g.fillStyle=gradient;g.fillRect(0,0,32,32);this.sprites[color]=sprite;}}
  shape(sub,total,radius,representative=false){
   if(!C.capacity[sub.l])throw Error('Unsupported orbital type '+sub.l);
   let seed=sub.n*1531+sub.l.charCodeAt(0);const random=()=>{seed=(Math.imul(seed,1664525)+1013904223)>>>0;return seed/4294967296;},points=[];
   for(let i=0;i<total;i++){
    const z=2*random()-1,phi=random()*Math.PI*2,rxy=Math.sqrt(1-z*z),x=rxy*Math.cos(phi),y=rxy*Math.sin(phi),orientation=representative?0:i%({s:1,p:3,d:5,f:7}[sub.l]);let angular=1;
    if(sub.l==='p')angular=Math.abs([x,y,z][orientation]);
    if(sub.l==='d')angular=Math.abs([2*x*y,2*x*z,2*y*z,x*x-y*y,(3*z*z-1)/2][orientation]);
    if(sub.l==='f')angular=Math.abs([z*(5*z*z-3)/2,x*(5*z*z-1)/2,y*(5*z*z-1)/2,z*(x*x-y*y)*2,4*x*y*z,x*(x*x-3*y*y),y*(3*x*x-y*y)][orientation]);
    let r;
    if((this.atom.protons===1||this.atom.element.waveResolution==='subshell')&&sub.id==='1s'){
     do{r=-Math.log(Math.max(1e-12,random()*random()*random()))*radius/7;}while(r>radius);
    }else r=radius*(.25+.75*Math.cbrt(random()))*angular;points.push({x:x*r,y:y*r,z:z*r,orientation});
   }return points;
  }
  makeClouds(){const occupied=this.atom.subshells.filter(s=>s.occupancy),total=Math.max(1,Math.floor(this.detail.points/Math.max(1,occupied.length)));return occupied.map((sub,i)=>{const radius=this.atom.shells.length===1?C.displayExtent(this.atom):(this.atom.element.lanthanideExplorer||this.atom.element.heavyDExplorer||(this.atom.element.heavyPExplorer||(this.atom.element.actinideExplorer||this.atom.element.transactinideExplorer)))?C.displayExtent(this.atom)*((this.atom.element.actinideExplorer||this.atom.element.transactinideExplorer)?({'5f':.68,'6d':.84,'7s':this.atom.shells[6]>2?.88:1,'7p':1}[sub.id]||(.12+.025*i)):this.atom.element.heavyPExplorer?({'4f':.55,'5d':.72,'6s':this.atom.shells[5]>2?.88:1,'6p':1}[sub.id]||(.13+.025*i)):({'4f':.68,'5d':.84,'6s':1}[sub.id]||(.16+.035*i))):(this.atom.element.outerSExplorer||(this.atom.element.lanthanideExplorer||this.atom.element.heavyDExplorer||(this.atom.element.heavyPExplorer||(this.atom.element.actinideExplorer||this.atom.element.transactinideExplorer))))?C.displayExtent(this.atom)*(.20+.80*i/(occupied.length-1)):this.atom.element.waveResolution==='subshell'?C.displayExtent(this.atom)*((this.atom.element.period5Completion?{'1s':.24,'2s':.30,'2p':.36,'3s':.42,'3p':.48,'3d':.56,'4s':.64,'4p':.70,'4d':.78,'5s':.88,'5p':1}:this.atom.element.period5Detail?{'1s':.28,'2s':.34,'2p':.40,'3s':.46,'3p':.52,'3d':.60,'4s':.68,'4p':.76,'4d':.88,'5s':1}:this.atom.element.period4Completion?{'1s':.34,'2s':.42,'2p':.50,'3s':.58,'3p':.65,'3d':.76,'4s':.88,'4p':1}:this.atom.shells.length===4?{'1s':.36,'2s':.44,'2p':.52,'3s':.60,'3p':.68,'3d':.83,'4s':1}:this.atom.shells.length===3?{'1s':.48,'2s':.62,'2p':.72,'3s':.84,'3p':1}:{'1s':.65,'2s':.82,'2p':1})[sub.id]||1):C.subshellRadius(this.atom,sub);return {sub,radius,color:(this.atom.element.outerSExplorer||(this.atom.element.lanthanideExplorer||this.atom.element.heavyDExplorer||(this.atom.element.heavyPExplorer||(this.atom.element.actinideExplorer||this.atom.element.transactinideExplorer))))&&C.isImportant(this.atom,sub)?'#ffe2a1':colors[i%colors.length],points:this.shape(sub,total,radius)};});}
  electronObjects(){return [];}
  drawRegions(){
   const g=this.ctx,s=this.state;this.regionHits=[];
   const active=s.subshell!=='all'?s.subshell:(s.selected?.startsWith('orbital-')?s.selected.slice(8):null);
   const focusedCloud=this.clouds.find(c=>c.sub.id===active),explore=s.quantumMode==='explore'||!!focusedCloud;
   let layers=[];
   if(explore&&focusedCloud){
    try{if(this.focusCloud?.sub.id!==active)this.focusCloud={...focusedCloud,points:this.shape(focusedCloud.sub,1200,focusedCloud.radius,true)};layers=[this.focusCloud];}
    catch(error){s.quantumMode='overview';s.subshell='all';s.selected=null;this.focusCloud=null;document.getElementById('engine-error').hidden=false;document.getElementById('engine-error').textContent='Detailed orbital unavailable. Showing simplified Overview. '+error.message;}
   }
   if(!layers.length&&this.detail.tier==='full')layers=this.clouds;
   if(!layers.length){
    const important=this.clouds.filter(c=>C.isImportant(this.atom,c.sub));
    const outer=this.atom.element.period7pExplorer?important:important.slice(-(this.detail.overviewLayers-1));
    const inner=this.clouds.filter(c=>!outer.includes(c));
    if(inner.length){if(!this.coreCloud){const radius=Math.max(...inner.map(c=>c.radius))*.82;this.coreCloud={sub:inner[inner.length-1].sub,radius,color:colors[1],points:this.shape({n:1,l:'s'},700,radius),grouped:true};}layers.push(this.coreCloud);}
    layers.push(...outer);if(!layers.length)layers=this.clouds.slice(0,1);
   }
   this.visibleLayers=layers.length;this.drawnPoints=0;
   for(const cloud of layers){const {sub,points}=cloud,focused=explore&&active===sub.id,p={id:'orbital-'+sub.id,type:'electron',region:'orbital',shell:sub.n,subshell:sub.id,transition:sub.id===this.atom.element.transitionRegion,filledCore:this.atom.element.filledCoreSubshells?.includes(sub.id)||false,valence:this.atom.valence.shells.includes(sub.n),important:C.isImportant(this.atom,sub)};
    if(cloud.grouped&&this.atom.element.exactHeavyParticles)Object.assign(p,{id:'core-overview',region:'core',combinedCore:true,group:true,count:(this.atom.element.groupedCoreElectronCount??(this.atom.electrons-C.valenceCount(this.atom))),subshell:undefined,valence:false});
    const pulse=s.reducedMotion?1:.94+.06*Math.cos(s.time*.7),alpha=(focused?.65:cloud.grouped?.10:(this.atom.element.outerSExplorer||(this.atom.element.lanthanideExplorer||this.atom.element.heavyDExplorer||(this.atom.element.heavyPExplorer||(this.atom.element.actinideExplorer||this.atom.element.transactinideExplorer))))&&C.isImportant(this.atom,sub)?.28:this.detail.tier==='full'?(C.isImportant(this.atom,sub)?.17:.09):.19)*pulse,step=s.lowDetail&&!focused?2:1;
    for(let i=0;i<points.length;i+=step){const point=points[i],h=this.project(point),r=Math.max(1.2,Math.min(22,(focused?10:6)*h.scale));g.globalAlpha=alpha*(focused&&sub.l!=='s'&&point.orientation!==0?.06:1);g.drawImage(this.sprites[focused?'#ffe2a1':cloud.color],h.x-r,h.y-r,r*2,r*2);this.regionHits.push({...h,r:6,p});this.drawnPoints++;}
    if(focused&&s.labels&&!s.presentation){const h=this.project({x:cloud.radius*.72,y:-cloud.radius*.65,z:0});this.label(sub.id+' · '+sub.occupancy+' electron'+(sub.occupancy===1?'':'s'),h.x,h.y,'#ffe2a1');}
   }g.globalAlpha=1;
  }
  pick(x,y){return super.pick(x,y)||this.regionHits.filter(h=>Math.hypot(h.x-x,h.y-y)<8).sort((a,b)=>b.z-a.z)[0]?.p.id||null;}
  target(id){if(id==='core-overview'&&this.atom.element.exactHeavyParticles)return {id,type:'electron',region:'core',combinedCore:true,group:true,valence:false,count:(this.atom.element.groupedCoreElectronCount??(this.atom.electrons-C.valenceCount(this.atom)))};const sub=this.atom.subshells.find(sub=>'orbital-'+sub.id===id);return sub?{id,type:'electron',region:'orbital',shell:sub.n,subshell:sub.id,transition:sub.id===this.atom.element.transitionRegion,filledCore:this.atom.element.filledCoreSubshells?.includes(sub.id)||false,valence:this.atom.valence.shells.includes(sub.n)}:null;}
  dispose(){super.dispose();this.focusCloud=null;this.coreCloud=null;}
 };
})(window.Copper);
