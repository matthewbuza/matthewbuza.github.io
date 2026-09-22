(function(C){
 'use strict';
 C.bindPresentation=app=>{
  const stage=document.getElementById('stage'),exit=document.getElementById('exit-fullscreen'),enter=document.getElementById('fullscreen');
  const hidden=[...document.querySelectorAll('header,aside,.reference,.scene-heading,.toolbar,.legend,#model-note')];let saved=null,nativeEntered=false;
  const restore=()=>{if(!app.state.presentation)return;app.state.presentation=false;document.body.classList.remove('presenting');hidden.forEach(el=>el.inert=false);if((app.state.view||'atom')===saved.view)Object.assign(app.state,{yaw:saved.yaw,pitch:saved.pitch,zoom:saved.zoom});nativeEntered=false;app.updateControls();app.draw();enter.focus();};
  app.exitPresentation=async()=>{if(document.fullscreenElement===stage){try{await document.exitFullscreen();}catch(_){}}restore();};
  enter.onclick=async()=>{
   if(app.state.presentation)return;saved={view:app.state.view||'atom',yaw:app.state.yaw,pitch:app.state.pitch,zoom:app.state.zoom};app.state.presentation=true;document.getElementById('transition-canvas').hidden=true;document.body.classList.add('presenting');hidden.forEach(el=>el.inert=true);app.draw();exit.focus();
   if(stage.requestFullscreen){try{await stage.requestFullscreen();nativeEntered=document.fullscreenElement===stage;if(!app.state.presentation&&nativeEntered)await document.exitFullscreen();}catch(_){/* The viewport presentation is already active. */}}
   app.draw();
  };
  exit.onclick=()=>app.exitPresentation();
  document.addEventListener('fullscreenchange',()=>{if(document.fullscreenElement===stage)nativeEntered=true;else if(nativeEntered)restore();app.draw();});
  document.addEventListener('keydown',e=>{if(e.key==='Escape'&&app.state.presentation&&!document.querySelector('dialog[open]')){e.preventDefault();e.stopImmediatePropagation();if(app.state.view==='nucleon')app.backToAtom();else app.exitPresentation();}},true);
 };
})(window.Copper);
