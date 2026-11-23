/* DEVIANCE / ATELIER 3.1 SOLO — presentation-only UI, no project links. */
(() => {
 const root=document.documentElement;
 const body=document.body;
 const accent=body.dataset.accent||'#8d75ff';
 const titleText=body.dataset.projectName||'Interactive Studio';
 const moduleName=body.dataset.projectId||'studio';
 const accentRGB=[1,3,5].map(i=>parseInt(accent.slice(i,i+2),16)).join(',');
 root.style.setProperty('--ui-accent',accent);
 root.style.setProperty('--ui-rgb',accentRGB);
 body.classList.add('ds-v3','ds-solo');
 const brand=document.querySelector('.brand-group');
 if(brand){
  const title=brand.querySelector('.brand-title');
  const status=brand.querySelector('.badge-status,.fps-pill');
  const originalParent=title?.parentElement;
  brand.querySelector('.brand-badge')?.remove();
  brand.querySelector('.brand-sub')?.remove();
  if(title){
   title.textContent=titleText;
   const copy=document.createElement('div');copy.className='ds-brand-copy';
   const kicker=document.createElement('span');kicker.className='ds-brand-kicker';
   kicker.textContent='DEVIANCE / INTERACTIVE STUDIO';
   copy.append(kicker,title);
   const mark=document.createElement('span');mark.className='ds-project-mark';mark.setAttribute('aria-hidden','true');
   mark.innerHTML='<svg viewBox="0 0 24 24"><path d="M12 2.5 20.5 7v10L12 21.5 3.5 17V7z"/><path d="M12 2.5v10m0 0 8.5-5.5M12 12.5 3.5 7m8.5 5.5v9"/></svg>';
   brand.prepend(copy);brand.prepend(mark);
   if(originalParent&&originalParent!==brand&&originalParent.children.length===0)originalParent.remove();
  }
  if(status?.classList.contains('fps-pill')){
   const dot=document.createElement('span');dot.className='ds-fps-dot';status.prepend(dot);
  }
 }
 const icons={
  reset:'<path d="M3 11a9 9 0 1 1 2.3 6M3 5v6h6"/>',
  pause:'<rect x="6" y="5" width="4" height="14" rx="1"/><rect x="14" y="5" width="4" height="14" rx="1"/>',
  snow:'<path d="M12 2v20M4 6l16 12M20 6L4 18M8 4l4 3 4-3M8 20l4-3 4 3"/>',
  capture:'<rect x="3" y="6" width="18" height="14" rx="2"/><path d="M7 6l2-3h6l2 3"/><circle cx="12" cy="13" r="3"/>',
  inspector:'<path d="M4 6h16M4 12h16M4 18h16"/><circle cx="9" cy="6" r="2" fill="currentColor"/><circle cx="16" cy="12" r="2" fill="currentColor"/><circle cx="10" cy="18" r="2" fill="currentColor"/>',
  fullscreen:'<path d="M8 3H3v5M16 3h5v5M3 16v5h5M21 16v5h-5"/>',
  bolt:'<path d="M13 2L5 13h7l-1 9 8-12h-7l1-8z"/>',
  eye:'<path d="M2 12s4-6 10-6 10 6 10 6-4 6-10 6-10-6-10-6z"/><circle cx="12" cy="12" r="3"/>',
  guides:'<circle cx="12" cy="12" r="4"/><path d="M12 2v6M12 16v6M2 12h6M16 12h6"/>',
  stir:'<path d="M3 11c3-6 15-8 17-1 2 8-11 10-12 4-1-4 6-7 8-3"/><path d="M9 4l-3-1-2 3"/>'
 };
 function actionType(b){
  const s=((b.id||'')+' '+(b.title||'')+' '+b.textContent).toLowerCase();
  if(/substorm|reconnection/.test(s))return ['bolt','Trigger substorm'];
  if(/eruption/.test(s))return ['bolt','Trigger eruption'];
  if(/pulse/.test(s))return ['bolt','Trigger pulse'];
  if(/snow/.test(s))return ['snow','Snow'];
  if(/reset/.test(s))return ['reset','Reset'];
  if(/pause|resume/.test(s))return ['pause','Pause or resume'];
  if(/stir|inject|brush/.test(s))return ['stir', /inject/.test(s)?'Inject flow':'Stir flow'];
  if(/guide/.test(s))return ['guides','Guides'];
  if(/fullscreen/.test(s))return ['fullscreen','Fullscreen'];
  if(/drawer|inspector|settings|controls/.test(s))return ['inspector','Inspector'];
  if(/visibility|hide ui|toggle ui/.test(s))return ['eye','Toggle interface'];
  if(/snapshot|capture|screen|btn-snap/.test(s))return ['capture','Capture'];
  return ['inspector',b.title||'Tool'];
 }
 function paint(b){
  const [key,label]=actionType(b);
  b.dataset.uiTooltip=label;b.setAttribute('aria-label',label);
  const span=b.querySelector('.ds-action-icon')||document.createElement('span');
  span.className='ds-action-icon';span.setAttribute('aria-hidden','true');
  span.innerHTML=`<svg viewBox="0 0 24 24">${icons[key]}</svg>`;
  if(!span.parentElement)b.append(span);
 }
 for(const b of document.querySelectorAll('.top-bar .glass-btn,.top-bar .icon-btn')){
  paint(b);
  if(b.classList.contains('active'))b.setAttribute('aria-pressed','true');
  if(b.classList.contains('glass-btn'))new MutationObserver(()=>{
   if(!b.querySelector('.ds-action-icon'))paint(b);
  }).observe(b,{childList:true});
 }
 const inspector=document.querySelector('#inspector,.inspector');
 if(inspector){
  const head=inspector.querySelector('.drawer-header');
  if(head){
   const tabs=head.querySelector('.drawer-tabs');
   const title=head.querySelector('.drawer-title');
   if(title){
    const container=document.createElement('div');container.className='ds-inspector-id';
    const over=document.createElement('div');over.className='ds-inspector-overline';over.textContent='CONTROL DECK';
    title.textContent='Inspector';container.append(over,title);
    const live=document.createElement('span');live.className='ds-inspector-indicator';live.textContent='LIVE';
    head.replaceChildren(container,live);
    if(tabs)head.after(tabs);
   }
  }else{
   const top=document.createElement('div');top.className='ds-inspector-heading';
   top.innerHTML='<div class="ds-inspector-id"><span class="ds-inspector-overline">CONTROL DECK</span><div class="ds-inspector-title">Inspector</div></div><span class="ds-inspector-indicator">LIVE</span>';
   inspector.prepend(top);
  }
 }
 const dock=document.querySelector('.camera-dock');
 if(dock){
  dock.setAttribute('role','group');
  dock.setAttribute('aria-label',moduleName==='dimension-lab'?'Spatial dimensions':'Scene perspectives');
  for(const item of dock.querySelectorAll('.dock-btn,.cam-tab')){
    item.setAttribute('aria-pressed',String(item.classList.contains('active')));
  }
  new MutationObserver(changes=>{
    for(const change of changes){
      const el=change.target;
      if(el.matches?.('.dock-btn,.cam-tab'))el.setAttribute('aria-pressed',String(el.classList.contains('active')));
    }
  }).observe(dock,{subtree:true,attributes:true,attributeFilter:['class']});
  if(!dock.querySelector('.ds-dock-label')){
   const label=document.createElement('span');label.className='ds-dock-label';label.textContent=moduleName==='dimension-lab'?'DIMENSIONS':'PERSPECTIVES';dock.prepend(label);
  }
 }
 const oldHint=document.querySelector('.shortcut-hints,.keyboard-hint');
 const help=document.createElement('div');help.className='ds-help';
 help.innerHTML='<button type="button" class="ds-help-toggle" aria-label="Keyboard shortcuts" aria-expanded="false"><span class="ds-help-icon" aria-hidden="true"><svg viewBox="0 0 24 24"><rect x="2.5" y="5" width="19" height="14" rx="2.7"/><path d="M6.5 9h1m3 0h1m3 0h1m3 0h-1M6.5 12h1m3 0h1m3 0h1m3 0h-1M8 15.3h8"/></svg></span><span>Shortcuts</span></button><div class="ds-help-panel" role="region" aria-label="Keyboard reference"></div>';
 if(oldHint)help.querySelector('.ds-help-panel').append(oldHint);
 else help.querySelector('.ds-help-panel').textContent='Keyboard shortcuts are available within the scene.';
 body.append(help);
 const toggle=help.querySelector('button');
 const close=()=>{help.classList.remove('is-open');toggle.setAttribute('aria-expanded','false');};
 toggle.addEventListener('click',e=>{e.stopPropagation();const opened=help.classList.toggle('is-open');toggle.setAttribute('aria-expanded',String(opened));requestLayout()});
 document.addEventListener('pointerdown',e=>{if(!help.contains(e.target))close()});
 document.addEventListener('keydown',e=>{if(e.key==='Escape')close()});
 const hint=help.querySelector('.shortcut-hints,.keyboard-hint');
 if(hint){
  const raw=hint.innerHTML;
  const pieces=raw.split(/\s*(?:\||·)\s*/).filter(p=>p.trim());
  if(pieces.length>1)hint.innerHTML=pieces.map(p=>`<div class="ds-shortcut-row">${p.trim()}</div>`).join('');
 }
 // Geometry-aware layout: dock centers in the stage area that is actually visible.
 let prevNarrow=innerWidth<=1030, raf=0;
 if(inspector&&prevNarrow)inspector.classList.add('collapsed');
 function layout(){
  raf=0;
  const narrow=innerWidth<=1030;
  const panelOpen=!!inspector&&!inspector.classList.contains('collapsed');
  body.classList.toggle('ds-panel-open',panelOpen);
  body.classList.toggle('ds-panel-closed',!panelOpen);
  if(!dock)return;
  if(innerWidth<=650){dock.style.removeProperty('left');dock.style.removeProperty('max-width');return;}
  const panelBound=panelOpen&&!narrow?inspector.getBoundingClientRect().left:innerWidth-18;
  const helper=help.querySelector('.ds-help-toggle');
  const helperBound=helper?.getBoundingClientRect().right||0;
  const leftInset=innerWidth>=1200 ? 20+292+20 : 18;
  const stageLeft=Math.max(leftInset,helperBound+22);
  const stageRight=Math.max(stageLeft+165,Math.min(innerWidth-18,panelBound-20));
  const allowed=Math.max(165,stageRight-stageLeft);
  const width=Math.min(dock.scrollWidth,allowed);
  const idealCenter=(stageLeft+stageRight)*.5;
  const center=Math.max(stageLeft+width/2,Math.min(idealCenter,stageRight-width/2));
  dock.style.setProperty('left',center+'px','important');
  dock.style.setProperty('max-width',allowed+'px','important');
 }
 function requestLayout(){if(!raf)raf=requestAnimationFrame(layout)}
 if(inspector)new MutationObserver(requestLayout).observe(inspector,{attributes:true,attributeFilter:['class']});
 addEventListener('resize',()=>{
  const narrow=innerWidth<=1030;
  if(inspector&&narrow!==prevNarrow)inspector.classList.toggle('collapsed',narrow);
  prevNarrow=narrow;requestLayout();
 },{passive:true});
 addEventListener('load',requestLayout,{once:true});
 requestLayout();

 // Shared left-rail composition and deliberate scene-safe footer rhythm.
 const info=document.querySelector('.hud-overlay');
 let context=document.querySelector('.scene-caption');
 if(context){context.classList.add('ds-context-card');}
 const contentMap={
  'aurora-valley':{label:'SCENE NOTES / AURORA VALLEY',title:'Under the northern lights',description:'A snowbound valley beneath an active auroral oval. Choose a vantage point to study the sky.',footer:'WINTER SANCTUARY · LIVE ENVIRONMENT'},
  'zen-koi-pond':{label:'FIELD NOTES / GARDEN',title:'Stillness in motion',description:'Observe koi, surface ripples and changing light in a quiet garden.',footer:'NATURE STUDY · INTERACTIVE'},
  'prism-studio':{label:'FIELD NOTES / SCENE',title:'Geometry in space',description:'Explore the forms, materials and lighting of an interactive three-dimensional studio.',footer:'SPATIAL STUDIO · INTERACTIVE'}
 };
 if(!context && contentMap[moduleName]){
  const data=contentMap[moduleName];
  context=document.createElement('section');context.className='ds-context-card ds-context-generated';
  context.innerHTML='<div class="ds-context-kicker"></div><h1 class="ds-context-title"></h1><p class="ds-context-desc"></p><div class="ds-context-meta"></div>';
  context.querySelector('.ds-context-kicker').textContent=data.label;
  context.querySelector('.ds-context-title').textContent=data.title;
  context.querySelector('.ds-context-desc').textContent=data.description;
  context.querySelector('.ds-context-meta').textContent=data.footer;
  body.append(context);
 }
 if(moduleName==='quasar'){
  const note=document.createElement('section');note.className='ds-quasar-guide';
  note.innerHTML='<div class="ds-context-kicker">FIELD NOTES / RELATIVITY</div><p class="ds-context-desc">Anchored annotations · gravitational structures</p>';
  body.append(note);
  const labelToggle=document.querySelector('[data-k="labels"]');
  if(labelToggle){
    const sync=()=>{note.hidden=!labelToggle.checked;};
    labelToggle.addEventListener('change',sync);sync();
  }
 }
 let noteRaf=0;
 function alignContext(){
  noteRaf=0;
  if(!context)return;
  if(info){
   const bounds=info.getBoundingClientRect();
   context.style.setProperty('--ds-context-top',Math.round(bounds.bottom+14)+'px');
  }else{
   context.style.setProperty('--ds-context-top','86px');
  }
 }
 function queueNote(){if(!noteRaf)noteRaf=requestAnimationFrame(alignContext)}
 if(info&&typeof ResizeObserver!=='undefined')new ResizeObserver(queueNote).observe(info);
 addEventListener('resize',queueNote,{passive:true});
 queueNote();
 // Selected viewpoint belongs to scene context rather than an extra floating card.
 if(context?.classList.contains('ds-context-generated') && dock){
  const name=context.querySelector('.ds-context-title');
  const selection=dock.querySelector('.dock-btn.active,.cam-tab.active');
  if(selection)name.textContent=selection.textContent.trim();
  new MutationObserver(()=>{
   const active=dock.querySelector('.dock-btn.active,.cam-tab.active');
   if(active)name.textContent=active.textContent.trim();
  }).observe(dock,{subtree:true,attributes:true,attributeFilter:['class']});
 }

})();
