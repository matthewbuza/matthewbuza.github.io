(function(C){
  'use strict';
  C.models={};
  // Perspective Canvas renderer: true 3D coordinates and depth sorting, no WebGL dependency.
  C.models.bohr=class {
    constructor(canvas,state,particles,atom){this.atom=atom;this.canvas=canvas;this.ctx=canvas.getContext('2d');if(!this.ctx)throw Error('Canvas unavailable');this.state=state;this.particles=particles;this.hits=[];if(atom.element.exactHeavyParticles){this.nucleonPath=new Path2D();this.nucleonPath.arc(0,0,1,0,Math.PI*2);}} 
    dispose(){this.nucleonPath=null;this.hits=[];this.regionHits=[];this.particles=[];if(this.clouds)this.clouds=[];if(this.sprites)this.sprites={};}
    orbit(shell,angle){const r=C.shellRadius(shell),tilt=Math.sin(shell*2.1)*.4;return {x:r*Math.cos(angle),y:r*Math.sin(angle)*Math.cos(tilt),z:r*Math.sin(angle)*Math.sin(tilt)};}
    project(v){const s=this.state,cy=Math.cos(s.yaw),sy=Math.sin(s.yaw),cx=Math.cos(s.pitch),sx=Math.sin(s.pitch);const x=v.x*cy+v.z*sy,z=-v.x*sy+v.z*cy,y=v.y*cx-z*sx,depth=v.y*sx+z*cx;const scale=this.base*s.zoom*900/(900-depth);return {x:this.w/2+x*scale,y:this.h/2+y*scale,z:depth,scale};}
    electronObjects(){
      const objects=[];
      for(let shell=1;shell<=this.atom.shells.length;shell++)for(let j=0;j<(this.atom.shells[shell-1]?120:0);j++){const a=this.project(this.orbit(shell,j*Math.PI/60)),b=this.project(this.orbit(shell,(j+1)*Math.PI/60));objects.push({kind:'line',a,b,z:(a.z+b.z)/2,shell});}
      const hits=this.particles.filter(p=>p.type==='electron').map(p=>{const v=this.project(this.orbit(p.shell,p.phase+this.state.time*([.22,-.14,.095,.065][p.shell-1]||.04)));return {...v,p,r:p.r*v.scale};});
      this.hits.push(...hits);objects.push(...hits.map(h=>({...h,kind:'particle'})));return objects;
    }
    drawRegions(){}
    render(){
      const c=this.canvas,g=this.ctx,s=this.state;this.w=c.clientWidth;this.h=c.clientHeight;
      const dpr=Math.min(window.devicePixelRatio||1,C.complexity(this.atom).dpr);if(c.width!==Math.round(this.w*dpr)||c.height!==Math.round(this.h*dpr)){c.width=Math.round(this.w*dpr);c.height=Math.round(this.h*dpr);}
      g.setTransform(dpr,0,0,dpr,0,0);g.clearRect(0,0,this.w,this.h);this.base=Math.min(this.w*.40,this.h*.42)/C.displayExtent(this.atom);
      this.hits=this.particles.filter(p=>p.type!=='electron').map(p=>({...this.project(p),p,r:p.r*this.project(p).scale}));
      this.drawRegions();
      const objects=this.hits.map(h=>({...h,kind:'particle'})),shellAlpha=Math.max(.09,1-(s.zoom-1)*.15);
      objects.push(...this.electronObjects());objects.sort((a,b)=>a.z-b.z);
      for(const o of objects){if(o.kind==='line'){g.globalAlpha=shellAlpha;g.strokeStyle=this.atom.valence.shells.includes(o.shell)?'#b68e65':'#63829f';g.lineWidth=this.atom.valence.shells.includes(o.shell)?1.2:.8;g.beginPath();g.moveTo(o.a.x,o.a.y);g.lineTo(o.b.x,o.b.y);g.stroke();continue;}
        g.globalAlpha=1;const {x,y,r,p}=o;g.fillStyle=C.palette[p.type];if(C.complexity(this.atom).nucleusGradient||p.type==='electron'){const gradient=g.createRadialGradient(x-r*.3,y-r*.4,r*.08,x,y,r);gradient.addColorStop(0,'#f1f6f9');gradient.addColorStop(.28,C.palette[p.type]);gradient.addColorStop(1,p.type==='proton'?'#743d46':p.type==='neutron'?'#294869':'#387b87');g.fillStyle=gradient;}if(this.nucleonPath&&p.type!=='electron'){g.save();g.translate(x,y);g.scale(r,r);g.fill(this.nucleonPath);g.strokeStyle='#07101c99';g.lineWidth=.7/r;g.stroke(this.nucleonPath);g.restore();}else{g.beginPath();g.arc(x,y,r,0,Math.PI*2);g.fill();g.strokeStyle='#07101c99';g.lineWidth=.7;g.stroke();}
        if(p.type==='electron'&&p.valence){g.strokeStyle='#dfb88b';g.lineWidth=1.3;g.beginPath();g.arc(x,y,r+4,0,Math.PI*2);g.stroke();}
        if(s.zoom>2.7&&p.type!=='electron'){g.fillStyle='#07101c';g.font=`bold ${Math.max(9,r)}px system-ui`;g.textAlign='center';g.textBaseline='middle';g.fillText(p.type==='proton'?'+':'0',x,y);}
      }
      g.globalAlpha=1;
      const group=s.selected==='group-valence'?this.hits.filter(h=>h.p.type==='electron'&&h.p.valence):s.selected==='group-transition'?this.hits.filter(h=>h.p.transition):[];
      for(const h of group){g.strokeStyle='#ffe2a1';g.lineWidth=3;g.beginPath();g.arc(h.x,h.y,h.r+6,0,Math.PI*2);g.stroke();}
      this.highlightedValenceCount=s.selected==='group-valence'?group.length:0;this.highlightedTransitionCount=s.selected==='group-transition'?group.length:0;
      if(group.length)this.label(group.length+' valence electrons',this.w/2,28,'#ffe2a1');
      const selected=this.hits.find(h=>h.p.id===s.selected);
      // Overlay lets selected interior nucleons remain identifiable without moving geometry.
      if(selected&&!selected.p.region){g.strokeStyle='#ffe2a1';g.lineWidth=2.5;g.beginPath();g.arc(selected.x,selected.y,selected.r+4,0,Math.PI*2);g.stroke();this.label(selected.p.valence?'Valence electron':C.types[selected.p.type].name,selected.x,selected.y-selected.r-15,'#ffe2a1');}
      if(s.labels&&!s.presentation){const v=this.hits.find(h=>h.p.type==='electron'&&h.p.valence);if(v&&!selected)this.label('Valence electron',v.x,v.y-21,'#e2bd96');if(s.zoom<1.6)this.label(this.atom.protons+(this.atom.protons===1?' proton · ':' protons · ')+this.atom.neutrons+(this.atom.neutrons===1?' neutron':' neutrons'),this.w/2,this.h/2+this.base*51*s.zoom,'#c5d3e0');}
    }
    label(text,x,y,color){if(this.state.presentation)return;const g=this.ctx;g.globalAlpha=1;g.font='12px system-ui';g.textAlign='center';g.textBaseline='middle';const width=g.measureText(text).width;x=Math.max(width/2+8,Math.min(this.w-width/2-8,x));if(y<8||y>this.h-8)return;g.fillStyle='#0b1320e8';g.fillRect(x-width/2-5,y-9,width+10,18);g.fillStyle=color;g.fillText(text,x,y);}
    isVisible(hit){
      if(hit.x-hit.r<8||hit.x+hit.r>this.w-8||hit.y-hit.r<8||hit.y+hit.r>this.h-8)return false;
      // Prefer particles whose central disk is unobscured by nearer particles.
      return !this.hits.some(other=>other.z>hit.z&&Math.hypot(other.x-hit.x,other.y-hit.y)<other.r+hit.r*.45);
    }
    representative(category){
      const candidates=this.hits.filter(h=>C.categoryFor(h.p)===category);
      return candidates.filter(h=>this.isVisible(h)).sort((a,b)=>b.z-a.z)[0]||null;
    }
    pick(x,y){return [...this.hits].sort((a,b)=>b.z-a.z).find(h=>Math.hypot(h.x-x,h.y-y)<=Math.max(h.r,9))?.p.id||null;}
  };
})(window.Copper);
