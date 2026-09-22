(function(C){
  'use strict';
  C.bindInteractions=function(app){const canvas=app.canvas,s=app.state,pointers=new Map();let gesture=false,moved=false,start=null,lastTap=null;
    const distance=()=>{const v=[...pointers.values()];return Math.hypot(v[0].x-v[1].x,v[0].y-v[1].y);};
    canvas.addEventListener('pointerdown',e=>{if(app.state.transitioning)return;canvas.focus({preventScroll:true});canvas.setPointerCapture(e.pointerId);pointers.set(e.pointerId,{x:e.clientX,y:e.clientY});if(pointers.size===1){start={x:e.clientX,y:e.clientY};moved=false;gesture=false;}else{gesture=true;lastTap=null;}});
    canvas.addEventListener('pointermove',e=>{if(!pointers.has(e.pointerId))return;const old=pointers.get(e.pointerId),before=pointers.size===2?distance():0;pointers.set(e.pointerId,{x:e.clientX,y:e.clientY});if(start&&Math.hypot(e.clientX-start.x,e.clientY-start.y)>5){moved=true;lastTap=null;}if(pointers.size===2){app.zoom(before>0?distance()/before:1);}else if(!gesture){s.yaw+=(e.clientX-old.x)*.007;s.pitch=Math.max(-1.3,Math.min(1.3,s.pitch-(e.clientY-old.y)*.007));app.draw();}});
    canvas.addEventListener('pointerup',e=>{if(!pointers.has(e.pointerId))return;if(!moved&&!gesture){const r=canvas.getBoundingClientRect();const id=app.renderer.pick(e.clientX-r.left,e.clientY-r.top);app.select(id);const now=performance.now(),particle=app.particles.find(p=>p.id===id);if(app.state.view==='atom'&&particle&&['proton','neutron'].includes(particle.type)){if(lastTap&&lastTap.id===id&&lastTap.kind===e.pointerType&&now-lastTap.time<650&&Math.hypot(e.clientX-lastTap.x,e.clientY-lastTap.y)<24){lastTap=null;app.enterNucleon(id);}else lastTap={id,kind:e.pointerType,time:now,x:e.clientX,y:e.clientY};}else lastTap=null;}pointers.delete(e.pointerId);});
    canvas.addEventListener('pointercancel',e=>{pointers.delete(e.pointerId);gesture=true;lastTap=null;});
    canvas.addEventListener('lostpointercapture',e=>pointers.delete(e.pointerId));
    canvas.addEventListener('wheel',e=>{e.preventDefault();const delta=e.deltaY*(e.deltaMode===1?16:e.deltaMode===2?canvas.clientHeight:1);app.zoom(Math.exp(-Math.max(-150,Math.min(150,delta))*.002));},{passive:false});
    canvas.addEventListener('keydown',e=>{const actions={ArrowLeft:()=>s.yaw-=.12,ArrowRight:()=>s.yaw+=.12,ArrowUp:()=>s.pitch=Math.min(1.3,s.pitch+.12),ArrowDown:()=>s.pitch=Math.max(-1.3,s.pitch-.12),'+':()=>app.zoom(1.15),'=':()=>app.zoom(1.15),'-':()=>app.zoom(1/1.15),Escape:()=>app.select(null)};if(actions[e.key]){e.preventDefault();actions[e.key]();app.draw();}});
  };
})(window.Copper);
