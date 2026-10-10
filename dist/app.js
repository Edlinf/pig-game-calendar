const app=document.getElementById('app');
const GAME_COLORS={wow:'#805600',ff14:'#245ea6',endfield:'#4c5700',arknights:'#8b4414',fgo:'#654597',genshin:'#075d4c'};
GAMES.forEach(g=>{g.color=GAME_COLORS[g.id]||g.color});
const mobileCalendar=window.matchMedia('(max-width:580px)');
const today=new Intl.DateTimeFormat('en-CA',{timeZone:'Asia/Shanghai',year:'numeric',month:'2-digit',day:'2-digit'}).format(new Date());
let selected=today,month=+today.slice(5,7)-1,year=+today.slice(0,4),mode='detail',role=-1,boss=0,dungeon=0,tw='dungeons',eventFilter='confirmed',scope='home',lastFocus=null,deadlinePickerOpen=false,deadlineRefreshAt=Infinity;
const deadlineGames=new Set(GAMES.map(g=>g.id));
const roleNames=['坦克','治疗','输出'];
const escapeHtml=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const ext=(url,label)=>`<a href="${escapeHtml(url)}" target="_blank" rel="noopener noreferrer">${label}</a>`;
const game=id=>GAMES.find(g=>g.id===id);
function roles(items){return `<div class="roles">${items.map((v,i)=>role<0||role===i?`<div class="role"><small>${['TANK','HEALER','DAMAGE'][i]}</small><h3>${roleNames[i]}</h3><p>${v}</p></div>`:'').join('')}</div>`}
function roleControls(){return `<div class="controls" aria-label="职责筛选">${['全部职责',...roleNames].map((n,i)=>`<button data-role="${i-1}" class="${role===i-1?'on':''}" aria-pressed="${role===i-1}">${n}</button>`).join('')}</div>`}
function heading(k,t,sub){return `<div class="eyebrow">${k}</div><h1>${t}</h1><p class="muted lead">${sub}</p>`}
const startTime=e=>new Date(e.startAt||e.start+'T00:00:00+08:00').getTime();
const endTime=e=>e.endAt?new Date(e.endAt).getTime():e.end?new Date(e.end+'T00:00:00+08:00').getTime():Infinity;
const dateAt=time=>new Intl.DateTimeFormat('en-CA',{timeZone:'Asia/Shanghai',year:'numeric',month:'2-digit',day:'2-digit'}).format(new Date(time));
function status(e,now=Date.now()){
 if(!e.confirmed)return '参考排期';
 if(e.milestone)return now<startTime(e)?'即将开放':'已到开放日期';
 if(now<startTime(e))return '即将开始';
 if(e.boundaryDate&&dateAt(now)>=e.boundaryDate)return '维护截止待复核';
 if(now>=endTime(e))return '已结束';
 const hours=(endTime(e)-now)/3600000;
 if(hours<=24)return '24小时内结束';
 if(hours<=72)return '3天内结束';
 return e.boundaryDate?'进行中 · 维护前截止':'进行中';
}
const isActive=e=>e.confirmed&&!e.milestone&&startTime(e)<=Date.now()&&endTime(e)>Date.now()&&(!e.boundaryDate||today<e.boundaryDate);
function matchesDay(e,date){
 if(e.milestone)return date===e.start;
 const dayStart=new Date(date+'T00:00:00+08:00').getTime();
 if(e.boundaryDate)return date>=e.start&&date<=e.boundaryDate;
 return dayStart<endTime(e)&&dayStart+86400000>startTime(e);
}
const visibleEvents=()=>GAME_EVENTS.filter(e=>!e.parentEvent);
function scopedEvents(){return visibleEvents().filter(e=>(scope==='home'||e.game===scope)&&(eventFilter==='all'||e.confirmed))}
function dateText(e){return e.dateLabel||e.start+' — '+(e.end||'截止待公告')}
function timingText(e){const rewards=GAME_EVENTS.filter(x=>x.parentEvent===e.id);return [e.timing,rewards.length?'领奖、兑换提醒：'+rewards.map(x=>x.short+'截止 '+deadlineText(x)).join('；')+'。':''].filter(Boolean).join(' ')}
function deadlineText(e){
 if(e.deadlineLabel)return e.deadlineLabel;
 if(e.datePrecision==='day')return e.lastDay.slice(5).replace('-','/')+' · 公告仅列日期';
 return new Date(endTime(e)-60000).toLocaleString('zh-CN',{timeZone:'Asia/Shanghai',month:'numeric',day:'numeric',hour:'2-digit',minute:'2-digit',hour12:false});
}
function card(e,full=false){const g=game(e.game),st=status(e);return `<article class="event-card" style="--accent:${g.color}"><div class="event-meta"><span class="game-label">${g.short}</span><span class="badge ${e.confirmed?'':'pending'}">${e.type}</span><span class="event-state ${st.includes('结束')&&st!=='已结束'?'urgent':''}">${st}</span></div><h3 ${full?'id="event-title"':''}>${escapeHtml(e.name)}</h3><div class="event-date">${escapeHtml(dateText(e))}</div><p>${escapeHtml(e.desc)}</p>${full?`<dl class="event-info"><dt>参与条件</dt><dd>${escapeHtml(e.condition||'以当期游戏内与官方说明为准')}</dd><dt>主要奖励</dt><dd>${escapeHtml(e.rewards||e.desc)}</dd><dt>活动详情</dt><dd>${escapeHtml(e.detail)}</dd>${timingText(e)?`<dt>时间说明</dt><dd>${escapeHtml(timingText(e))}</dd>`:''}</dl>`:`<button data-event="${e.id}" class="detail-button">查看详情</button>`}<div class="source">${ext(e.source,'资料来源')}${e.official?' · '+ext(e.official,'官方公告入口'):''}<br>${e.verification} · 核对 ${e.checked||'2026-09-17'}</div></article>`}
function wowNav(current='calendar'){return `<nav class="subnav" aria-label="魔兽世界内容">${[['wow','活动日历','calendar'],['raid','团队副本','raid'],['dungeon','大秘境','dungeon'],['timewalking','时光漫游','timewalking']].map(([path,label,key])=>`<a href="#${path}" class="${current===key?'active':''}">${label}</a>`).join('')}</nav>`}
function deadlines(events){const cutoff=Date.now()+7*86400000;const list=events.filter(e=>e.confirmed&&!e.milestone&&isActive(e)&&endTime(e)<=cutoff).sort((a,b)=>endTime(a)-endTime(b)).slice(0,4);return list.length?`<section class="deadline-strip" aria-label="未来七天截止提醒"><strong>近期截止</strong>${list.map(e=>`<button data-event="${e.id}" style="--accent:${game(e.game).color}"><span>${game(e.game).short} · ${e.short}</span><time>${escapeHtml(deadlineText(e))}</time></button>`).join('')}</section>`:''}
const clockAt=(time,seconds=false)=>new Intl.DateTimeFormat('en-GB',{timeZone:'Asia/Shanghai',hour:'2-digit',minute:'2-digit',...(seconds?{second:'2-digit'}:{}),hourCycle:'h23'}).format(new Date(time));
function deadlineInfo(e){
 if(e.boundaryDate)return {date:e.boundaryDate,time:'维护前',note:'具体时刻待公告',precise:false};
 if(!Number.isFinite(endTime(e)))return {date:'待公告',time:'',note:'',precise:false};
 if(e.datePrecision==='day')return {date:e.lastDay,time:'具体时刻待公告',note:'',precise:false};
 if(!e.endAt)return {date:e.end,time:'具体时刻待核实',note:e.confirmed?'':'参考排期',precise:false};
 const official=(e.deadlineLabel||e.dateLabel?.split(' — ').at(-1)||'').match(/\b(\d{1,2}:\d{2}(?::\d{2})?)\b/);
 const clock=official?.[1]||(e.timing?.includes('23:59:59')?'23:59:59':null);
 let moment=endTime(e);
 if(clock==='24:00')moment--;
 else if(clock){const matched=[0,60000,1000].find(delta=>clockAt(endTime(e)-delta,clock.length>5)===clock);if(matched!==undefined)moment-=matched;}
 return {date:dateAt(moment),time:clock||clockAt(moment),note:e.deadlineLabel?.includes('预计')?'预计':e.confirmed?'':'待核实',precise:!!e.confirmed};
}
function compareDeadlines(a,b){
 const da=deadlineInfo(a).date,db=deadlineInfo(b).date;
 // Unknown maintenance times sort at the end of their announced day; this is not an expiry time.
 return (da===db?0:da==='待公告'?1:db==='待公告'?-1:da.localeCompare(db))||
  ((a.boundaryDate||a.datePrecision==='day'?Infinity:endTime(a))-(b.boundaryDate||b.datePrecision==='day'?Infinity:endTime(b)))||a.id.localeCompare(b.id);
}
function homeEvents(){return visibleEvents().filter(e=>!e.milestone&&deadlineGames.has(e.game)&&(eventFilter==='all'||e.confirmed)).sort(compareDeadlines)}
function deadlineGamePicker(){
 const chosen=GAMES.filter(g=>deadlineGames.has(g.id));
 const label=chosen.length===GAMES.length?'全部游戏':!chosen.length?'未选择游戏':chosen.length<=3?chosen.map(g=>['wow','arknights'].includes(g.id)?g.name:g.short).join('、'):'已选 '+chosen.length+' 款游戏';
 return `<div class="deadline-game-filter"><span id="deadline-game-label">游戏</span><div class="deadline-game-picker"><button type="button" id="deadline-game-toggle" data-game-picker aria-labelledby="deadline-game-label deadline-game-summary" aria-expanded="${deadlinePickerOpen}" aria-controls="deadline-game-menu"><span id="deadline-game-summary">${escapeHtml(label)}</span><span aria-hidden="true">▾</span></button><div id="deadline-game-menu" class="deadline-game-menu"${deadlinePickerOpen?'':' hidden'}><div class="deadline-game-actions"><button type="button" id="deadline-game-all" data-game-selection="all"${chosen.length===GAMES.length?' disabled':''}>全选</button><button type="button" id="deadline-game-none" data-game-selection="none"${!chosen.length?' disabled':''}>全不选</button><span aria-live="polite">已选 ${chosen.length} / ${GAMES.length}</span></div><fieldset><legend class="sr-only">选择要显示的游戏</legend>${GAMES.map(g=>`<label class="deadline-game-option" for="deadline-game-${g.id}"><input type="checkbox" id="deadline-game-${g.id}" name="deadline-games" data-game-option value="${g.id}"${deadlineGames.has(g.id)?' checked':''}><span>${escapeHtml(g.name)}</span></label>`).join('')}</fieldset></div></div></div>`;
}
function setDeadlinePickerOpen(open,focus=false){
 deadlinePickerOpen=open;
 const toggle=document.getElementById('deadline-game-toggle'),menu=document.getElementById('deadline-game-menu');
 if(toggle)toggle.setAttribute('aria-expanded',String(open));
 if(menu)menu.hidden=!open;
 if(focus)toggle?.focus({preventScroll:true});
}
function countdownState(e,now=Date.now()){
 if(endTime(e)<=now)return {value:'已结束',note:'',urgent:false};
 if(!e.confirmed)return {value:'待核实',note:'参考排期',urgent:false};
 if(e.boundaryDate||!Number.isFinite(endTime(e)))return {value:'待公告',note:'截止时刻',urgent:false};
 if(e.datePrecision==='day'){
  const days=Math.round((Date.parse(e.lastDay+'T00:00:00+08:00')-Date.parse(dateAt(now)+'T00:00:00+08:00'))/86400000);
  return {value:days>0?days+' 天':'今天截止',note:'按公告日期',urgent:false};
 }
 if(!deadlineInfo(e).precise)return {value:'待核实',note:'截止时刻',urgent:false};
 const seconds=Math.ceil((endTime(e)-now)/1000),pad=n=>String(n).padStart(2,'0');
 return {value:pad(Math.floor(seconds/86400))+' 天 '+pad(Math.floor(seconds/3600)%24)+':'+pad(Math.floor(seconds/60)%60)+':'+pad(seconds%60),note:deadlineInfo(e).note==='预计'?'预计结束':'',urgent:seconds<=86400};
}
function countdownMarkup(e,now){const c=countdownState(e,now);return `<span class="countdown-value">${c.value}</span>${c.note?`<small>${c.note}</small>`:''}`}
function deadlineTable(events,now,label){return `<div class="deadline-table-wrap"><table class="deadline-table"><caption class="sr-only">${label}，按截止时间从近到远排列，北京时间</caption><colgroup><col class="col-game"><col class="col-event"><col class="col-type"><col class="col-period"><col class="col-deadline"><col class="col-countdown"></colgroup><thead><tr><th scope="col">游戏</th><th scope="col">活动</th><th scope="col">类型</th><th scope="col">活动时间</th><th scope="col" aria-sort="ascending">截止时间</th><th scope="col">倒计时</th></tr></thead><tbody>${events.length?events.map(e=>{const g=game(e.game),info=deadlineInfo(e),c=countdownState(e,now);return `<tr data-deadline-row="${e.id}" style="--accent:${g.color}"><td data-label="游戏"><a class="deadline-game-name" href="#${g.id}" title="${escapeHtml(g.name)}">${g.short}</a></td><td data-label="活动"><button class="deadline-event-name" data-event="${e.id}">${escapeHtml(e.name)}</button><span class="deadline-state" data-event-state="${e.id}">${status(e,now)}</span></td><td data-label="类型">${escapeHtml(e.type)}</td><td data-label="活动时间" class="deadline-period">${escapeHtml(dateText(e))}</td><td data-label="截止时间" class="deadline-date"><strong>${escapeHtml(info.date)}</strong>${info.time?`<span>${escapeHtml(info.time)}</span>`:''}${info.note?`<small>${escapeHtml(info.note)}</small>`:''}</td><td data-label="倒计时" class="deadline-countdown${c.urgent?' urgent':''}" data-countdown="${e.id}" aria-live="off">${countdownMarkup(e,now)}</td></tr>`}).join(''):'<tr><td colspan="6" class="deadline-empty">暂无符合筛选条件的活动。</td></tr>'}</tbody></table></div>`}
function deadlineHome(){
 const focused=document.activeElement?.closest('.deadline-game-picker')?document.activeElement.id:null;
 const now=Date.now(),events=homeEvents(),pending=events.filter(e=>endTime(e)>now),ended=events.filter(e=>endTime(e)<=now);
 deadlineRefreshAt=Math.min(Infinity,...pending.map(endTime).filter(t=>Number.isFinite(t)));
 app.innerHTML=`<section class="deadline-home"><div class="deadline-heading"><h1>Game Event Deadlines</h1><p>国服 · 北京时间（UTC+8）</p></div><div class="deadline-controls">${deadlineGamePicker()}<div class="controls deadline-verification" aria-label="排期核对筛选"><button data-filter="confirmed" class="${eventFilter==='confirmed'?'on':''}" aria-pressed="${eventFilter==='confirmed'}">已核对排期</button><button data-filter="all" class="${eventFilter==='all'?'on':''}" aria-pressed="${eventFilter==='all'}">含待核实参考</button></div><span class="deadline-result-count" aria-live="polite">${pending.length} 项 · 截止从近到远</span></div>${deadlineGames.size?deadlineTable(pending,now,'未结束活动'):'<div class="deadline-table-wrap"><p class="deadline-empty">未选择游戏，请在筛选中勾选要查看的游戏。</p></div>'}${ended.length?`<details class="archive deadline-archive"><summary>已结束活动 · ${ended.length} 项</summary>${deadlineTable(ended,now,'已结束活动')}</details>`:''}<details class="deadline-coverage"><summary>资料核对</summary><section class="panel coverage">${GAMES.filter(g=>deadlineGames.has(g.id)).map(g=>`<div class="coverage-row"><strong style="color:${g.color}">${g.name}</strong><p>${g.note}</p><span>${ext(g.source,'公告入口')} · 核对 ${g.checked}</span></div>`).join('')}</section></details></section>`;
 if(focused){const target=document.getElementById(focused);(target&&!target.disabled?target:document.getElementById('deadline-game-toggle'))?.focus({preventScroll:true});}
}
function tickDeadlines(){
 if(scope!=='home')return;
 const now=Date.now();
 if(now>=deadlineRefreshAt){deadlineHome();return;}
 document.querySelectorAll('[data-countdown]').forEach(node=>{const e=GAME_EVENTS.find(e=>e.id===node.dataset.countdown);if(!e)return;node.innerHTML=countdownMarkup(e,now);node.classList.toggle('urgent',countdownState(e,now).urgent)});
 document.querySelectorAll('[data-event-state]').forEach(node=>{const e=GAME_EVENTS.find(e=>e.id===node.dataset.eventState);if(e)node.textContent=status(e,now)});
}
const shiftDay=(date,days)=>new Date(Date.parse(date+'T00:00:00Z')+days*86400000).toISOString().slice(0,10);
function calendarWeeks(events){
 const first=new Date(Date.UTC(year,month,1));
 const offset=(first.getUTCDay()+6)%7;
 const dates=Array.from({length:42},(_,i)=>new Date(Date.UTC(year,month,1-offset+i)).toISOString().slice(0,10));
 const previousLanes=new Map(),maxLanes=mobileCalendar.matches?3:5;
 return Array.from({length:6},(_,w)=>{
  const days=dates.slice(w*7,w*7+7);
  const segments=events.flatMap(event=>{
   const columns=days.map((date,i)=>matchesDay(event,date)?i:-1).filter(i=>i>=0);
   return columns.length?[{event,first:columns[0],last:columns.at(-1),before:matchesDay(event,shiftDay(days[0],-1)),after:matchesDay(event,shiftDay(days[6],1))}]:[];
  });
  const byDeadline=(a,b)=>(endTime(a.event)-endTime(b.event))||(startTime(a.event)-startTime(b.event))||a.event.id.localeCompare(b.event.id);
  const groups=GAMES.map(g=>segments.filter(s=>s.event.game===g.id).sort(byDeadline));
  // Give each game a visible lane before filling the remaining space.
  const ordered=[];
  for(let i=0;i<Math.max(0,...groups.map(g=>g.length));i++)for(const group of groups)if(group[i])ordered.push(group[i]);
  const occupied=Array(maxLanes).fill(0),visible=[];
  for(const segment of ordered){
   const mask=((1<<(segment.last-segment.first+1))-1)<<segment.first;
   const preferred=segment.before?previousLanes.get(segment.event.id):undefined;
   const lanes=[...new Set([preferred,...Array.from({length:maxLanes},(_,i)=>i)].filter(i=>i!==undefined))];
   const lane=lanes.find(i=>!(occupied[i]&mask));
   if(lane===undefined)continue;
   occupied[lane]|=mask;visible.push({...segment,lane});
  }
  previousLanes.clear();
  visible.filter(s=>s.after).forEach(s=>previousLanes.set(s.event.id,s.lane));
  const overflow=days.map((date,i)=>events.filter(e=>matchesDay(e,date)).length-visible.filter(s=>s.first<=i&&s.last>=i).length);
  return {days,segments:visible,overflow,lanes:Math.max(2,...visible.map(s=>s.lane+1))};
 });
}
function monthCalendar(events){
 const weeks=calendarWeeks(events);
 return `<div class="calendar" aria-label="${year}年${month+1}月活动日历"><div class="weekday-row">${['一','二','三','四','五','六','日'].map(d=>`<div class="weekday">${d}</div>`).join('')}</div>${weeks.map(week=>`<div class="calendar-week" style="--lane-count:${week.lanes}"><div class="week-days">${week.days.map((date,i)=>{const count=events.filter(e=>matchesDay(e,date)).length;return `<button data-date="${date}" class="day${+date.slice(5,7)!==month+1?' out':''}${date===selected?' selected':''}${date===today?' today':''}" aria-pressed="${date===selected}" aria-label="${date}，${count}项活动${week.overflow[i]?'，另有'+week.overflow[i]+'项可点日期查看':''}"><span class="num">${+date.slice(8)}</span>${week.overflow[i]?`<span class="more-events">${mobileCalendar.matches?"+"+week.overflow[i]:"另 "+week.overflow[i]+" 项"}</span>`:''}</button>`}).join('')}</div><div class="week-events">${week.segments.map(s=>{const e=s.event,label=(scope==='home'?game(e.game).short+' · ':'')+e.short;return `<button data-event="${e.id}" class="event-band${s.before?' continues-before':''}${s.after?' continues-after':''}${e.confirmed?'':' unconfirmed'}" style="--accent:${game(e.game).color};grid-column:${s.first+1} / ${s.last+2};grid-row:${s.lane+1}" title="${escapeHtml(e.name+' · '+dateText(e))}" aria-label="${escapeHtml(game(e.game).name+'，'+e.name+'，'+dateText(e))}">${escapeHtml(label)}</button>`}).join('')}</div></div>`).join('')}</div>`;
}
function calendar(){
 const g=game(scope),events=scopedEvents();
 const monthView=monthCalendar(events);
 const onDay=events.filter(e=>matchesDay(e,selected));
 const upcoming=events.filter(e=>e.confirmed&&startTime(e)>Date.now()).sort((a,b)=>startTime(a)-startTime(b));
 const active=events.filter(isActive).sort((a,b)=>endTime(a)-endTime(b));
 const ended=events.filter(e=>!e.milestone&&endTime(e)<=Date.now());
 app.innerHTML=(scope==='wow'?wowNav():'')+heading(g?g.en:'GAME CALENDAR',g?g.name+' · 活动日历':'活动总览',g?g.region+' · 北京时间 · 核对 '+g.checked:'六款游戏 · 国服 · 北京时间')+deadlines(events)+`<div class="layout"><section class="panel calendar-panel"><div class="between"><h2>${year} 年 ${month+1} 月</h2><div class="month-controls"><button data-month="-1" aria-label="上个月">‹</button><button data-today>今天</button><button data-month="1" aria-label="下个月">›</button></div></div><div class="controls calendar-filters"><button data-filter="confirmed" class="${eventFilter==='confirmed'?'on':''}" aria-pressed="${eventFilter==='confirmed'}">已核对排期</button><button data-filter="all" class="${eventFilter==='all'?'on':''}" aria-pressed="${eventFilter==='all'}">含待核实参考</button><span>${events.length} 个已收录条目</span></div>${monthView}<p class="calendar-help">点日期查看全部活动，点色条查看详情与奖励截止提醒。</p></section><aside class="selected-day"><section class="panel gold"><div class="eyebrow">当日活动 · ${onDay.length} 项</div><h2>${selected.replaceAll('-',' / ')}</h2>${onDay.length?onDay.map(e=>card(e)).join(''):'<p class="empty">该日暂无已收录活动。</p>'}</section></aside></div><section class="event-section"><div class="between"><h2>正在进行</h2><span class="muted">${active.length} 项</span></div><div class="cards">${active.length?active.map(e=>card(e)).join(''):'<p class="empty">暂无已核对的进行中活动。</p>'}</div></section>${upcoming.length?`<section class="event-section"><h2>即将开始与解锁</h2><div class="cards">${upcoming.map(e=>card(e)).join('')}</div></section>`:''}${ended.length?`<details class="archive"><summary>近期已结束 · ${ended.length} 项</summary><div class="cards">${ended.map(e=>card(e)).join('')}</div></details>`:''}<section class="panel coverage"><h2>资料核对</h2>${(g?[g]:GAMES).map(x=>`<div class="coverage-row"><strong style="color:${x.color}">${x.name}</strong><p>${x.note}</p><span>${ext(x.source,'公告入口')} · 核对 ${x.checked}</span></div>`).join('')}</section>${scope==='wow'?`<div class="cards"><a class="card" href="#raid"><h2>烈毒之渊与潮缚石窟</h2><p>首领技能、阶段流程与三职责速查</p></a><a class="card" href="#dungeon"><h2>本季大秘境</h2><p>八座地下城的打断、驱散与首领处理</p></a><a class="card" href="#timewalking"><h2>时光漫游</h2><p>地下城与漫游团本备战资料</p></a></div>`:''}`;
}
function openEvent(id){const e=GAME_EVENTS.find(x=>x.id===id);if(!e)return;lastFocus=document.activeElement;document.getElementById('event-detail').innerHTML=`<div class="dialog-top"><span>${game(e.game).name} · ${game(e.game).region}</span><button data-closeevent aria-label="关闭活动详情">关闭</button></div>${card(e,true)}`;document.getElementById('event-dialog').showModal()}
function render(){
 const route=location.hash.slice(1).split('/'),key=route[0]||'home';scope=['raid','dungeon','timewalking','calendar'].includes(key)?'wow':game(key)?key:'home';
 document.body.dataset.game=scope;document.documentElement.style.setProperty('--accent',game(scope)?.color||'#805600');
 document.querySelectorAll('header nav a').forEach(a=>{const yes=a.hash==='#'+scope;a.classList.toggle('active',yes);if(yes)a.setAttribute('aria-current','page');else a.removeAttribute('aria-current')});
 document.title=`游戏活动手册 · ${game(scope)?.name||'Game Event Deadlines'}`;
 if(key==='raid'){boss=Math.max(0,Math.min(8,Number(route[1])||0));guide('raid');app.insertAdjacentHTML('afterbegin',wowNav('raid'))}
 else if(key==='dungeon'){dungeon=Math.max(0,Math.min(7,Number(route[1])||0));guide('dungeon');app.insertAdjacentHTML('afterbegin',wowNav('dungeon'))}
 else if(key==='timewalking'){timewalking();app.insertAdjacentHTML('afterbegin',wowNav('timewalking'))}
 else if(scope==='home')deadlineHome();
 else calendar();
}
app.addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;const d=b.dataset;
 if('gamePicker'in d){setDeadlinePickerOpen(!deadlinePickerOpen);return;}
 if(d.gameSelection==='all'||d.gameSelection==='none'){deadlineGames.clear();if(d.gameSelection==='all')GAMES.forEach(g=>deadlineGames.add(g.id));deadlineHome();return;}
 if(d.month){month+=Number(d.month);if(month<0){month=11;year--}if(month>11){month=0;year++}calendar()}
 if('today'in d){selected=today;year=+today.slice(0,4);month=+today.slice(5,7)-1;calendar()}
 if(d.date){selected=d.date;calendar()}
 if(d.filter){eventFilter=d.filter;scope==='home'?deadlineHome():calendar()}
 if(d.event)openEvent(d.event);
 if(d.guide!==undefined)location.hash=(location.hash.startsWith('#raid')?'raid/':'dungeon/')+d.guide;
 if(d.mode){mode=d.mode;render()}
 if(d.role!==undefined){role=+d.role;render()}
 if(d.tw){tw=d.tw;render()}
});
app.addEventListener('change',e=>{const input=e.target;if(input.matches('input[data-game-option]')&&game(input.value)){input.checked?deadlineGames.add(input.value):deadlineGames.delete(input.value);deadlineHome();}});
document.addEventListener('click',e=>{if(deadlinePickerOpen&&!e.target.closest('.deadline-game-picker'))setDeadlinePickerOpen(false);});
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&deadlinePickerOpen){e.preventDefault();setDeadlinePickerOpen(false,true);}});
const dialog=document.getElementById('event-dialog');
dialog.addEventListener('click',e=>{if(e.target.closest('[data-closeevent]')||e.target===dialog)dialog.close()});
dialog.addEventListener('close',()=>{if(lastFocus?.isConnected)lastFocus.focus()});
mobileCalendar.addEventListener('change',()=>render());
window.addEventListener('hashchange',()=>{deadlinePickerOpen=false;dialog.close();render();window.scrollTo({top:0})});render();setInterval(tickDeadlines,1000);
