(function(C){
 'use strict';
 C.NucleonRenderer=class extends C.models.bohr{
  constructor(canvas,state,atom,type){super(canvas,state,[],atom);this.type=type;this.components=C.nucleons[type].composition.map((flavor,i)=>({id:'quark-'+i,flavor}));this.hits=[];this.fieldHits=[];}
  render(){
   const c=this.canvas,g=this.ctx,s=this.state,dpr=Math.min(devicePixelRatio||1,2);this.w=c.clientWidth;this.h=c.clientHeight;
   if(c.width!==Math.round(this.w*dpr)||c.height!==Math.round(this.h*dpr)){c.width=Math.round(this.w*dpr);c.height=Math.round(this.h*dpr);}
   g.setTransform(dpr,0,0,dpr,0,0);g.clearRect(0,0,this.w,this.h);this.base=Math.min(this.w*.39,this.h*.39)/180;
   const t=s.reducedMotion?0:s.time,center=this.project({x:0,y:0,z:0}),radius=172*this.base*s.zoom;
   const envelope=g.createRadialGradient(center.x,center.y,radius*.12,center.x,center.y,radius);envelope.addColorStop(0,'#d6a47905');envelope.addColorStop(.73,'#bb98761b');envelope.addColorStop(.94,'#abcfe82a');envelope.addColorStop(1,'#8dbfdf00');g.fillStyle=envelope;g.beginPath();g.arc(center.x,center.y,radius,0,Math.PI*2);g.fill();
   g.strokeStyle=s.internalSelected==='whole'?'#ffe2a1':'#8facbd55';g.lineWidth=s.internalSelected==='whole'?2.5:1;g.setLineDash([4,8]);g.beginPath();g.arc(center.x,center.y,radius*.94,0,Math.PI*2);g.stroke();g.setLineDash([]);this.boundary={x:center.x,y:center.y,r:radius*.94};
   const anchors=[{x:-72,y:-49,z:28},{x:75,y:-35,z:-24},{x:0,y:77,z:15}];
   const positions=anchors.map((v,i)=>({x:v.x+Math.sin(t*.55+i*2)*9,y:v.y+Math.cos(t*.43+i*3)*8,z:v.z+Math.sin(t*.37+i)*11}));
   this.fieldHits=[];
   for(let strand=0;strand<7;strand++){
    const a=positions[strand%3],b=positions[(strand+1)%3],steps=s.lowDetail?24:40;let previous;
    for(let j=0;j<=steps;j++){
     const u=j/steps,bend=Math.sin(u*Math.PI),v={x:a.x*(1-u)+b.x*u+bend*Math.sin(t*.6+u*7+strand)*34,y:a.y*(1-u)+b.y*u+bend*Math.cos(t*.5+u*6+strand)*30,z:a.z*(1-u)+b.z*u+bend*Math.sin(t*.7+u*9+strand)*42};const h=this.project(v);
     if(previous){g.globalAlpha=.25+.35*(.5+.5*Math.sin(u*12-t*.8+strand));g.strokeStyle=s.internalSelected==='gluon'?'#ffe2a1':strand%2?'#9edbe2':'#d7b08b';g.lineWidth=s.internalSelected==='gluon'?3:1.7;g.beginPath();g.moveTo(previous.x,previous.y);g.lineTo(h.x,h.y);g.stroke();}previous=h;this.fieldHits.push(h);
    }
   }
   g.globalAlpha=1;
   // Sparse field fluctuations away from the connecting curves represent field
   // self-interaction. No wires, paths, or central orbiting object are implied.
   for(let i=0;i<18;i++){const h=this.project({x:Math.sin(i*7.1)*125,y:Math.cos(i*4.3)*110,z:Math.sin(i*2.7)*100}),r=(2+Math.sin(t*.8+i))*this.base*s.zoom;g.fillStyle='#b9d9e34d';g.beginPath();g.arc(h.x,h.y,Math.max(1,r),0,Math.PI*2);g.fill();}
   if(s.level==='high')for(let i=0;i<3;i++){const alpha=s.reducedMotion?.16:Math.pow(Math.max(0,Math.sin(t*.65+i*2)),8)*.45,h=this.project({x:Math.sin(i*5+1)*116,y:Math.cos(i*4+1)*107,z:20});g.globalAlpha=alpha;g.strokeStyle='#dac8e6';g.lineWidth=1.5;for(const offset of [-6,6]){g.beginPath();g.arc(h.x+offset,h.y,3,0,Math.PI*2);g.stroke();}g.beginPath();g.moveTo(h.x-3,h.y);g.lineTo(h.x+3,h.y);g.stroke();}g.globalAlpha=1;
   this.hits=positions.map((v,i)=>({...this.project(v),p:this.components[i],r:28*this.base*s.zoom}));
   for(const h of [...this.hits].sort((a,b)=>a.z-b.z)){
    const selected=s.internalSelected===h.p.id,glowRadius=h.r*(1.5+.06*Math.sin(t*.7+h.p.id.length));const glow=g.createRadialGradient(h.x,h.y,0,h.x,h.y,glowRadius);glow.addColorStop(0,selected?'#ffe2a1dd':'#ecc49cbb');glow.addColorStop(.35,'#e4b78a66');glow.addColorStop(1,'#e4b78a00');g.fillStyle=glow;g.fillRect(h.x-glowRadius,h.y-glowRadius,glowRadius*2,glowRadius*2);
    g.strokeStyle=selected?'#ffe2a1':'#f3d7b8';g.lineWidth=selected?2.8:1.5;g.beginPath();const r=h.r*.55;
    if(h.p.flavor==='up'){g.moveTo(h.x,h.y-r);g.lineTo(h.x+r,h.y+r*.8);g.lineTo(h.x-r,h.y+r*.8);}else{g.moveTo(h.x,h.y-r);g.lineTo(h.x+r,h.y);g.lineTo(h.x,h.y+r);g.lineTo(h.x-r,h.y);}g.closePath();g.stroke();
    if(s.labels&&!s.presentation){this.label(C.quarks[h.p.flavor].name+' '+(h.p.flavor==='up'?'+⅔e':'−⅓e'),h.x,h.y+h.r+17,'#f2e2ca');}
   }
  }
  pick(x,y){const hit=[...this.hits].sort((a,b)=>b.z-a.z).find(h=>Math.hypot(x-h.x,y-h.y)<Math.max(22,h.r));if(hit)return hit.p.id;if(this.fieldHits.some(h=>Math.hypot(x-h.x,y-h.y)<12))return 'gluon';if(this.boundary&&Math.abs(Math.hypot(x-this.boundary.x,y-this.boundary.y)-this.boundary.r)<Math.max(18,this.boundary.r*.1))return 'whole';return null;}
  dispose(){this.components=[];this.hits=[];this.fieldHits=[];this.boundary=null;}
 };
})(window.Copper);
