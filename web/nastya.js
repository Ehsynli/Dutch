const nastyaHistoryKey = 'dutch-nastya-chat-v1';
const nastyaDraftKey = 'dutch-nastya-draft-v1';
function readNastyaDraft() {
  try { return localStorage.getItem(nastyaDraftKey) ?? ''; } catch { return ''; }
}
function saveNastyaDraft(value) {
  try {
    if (value) localStorage.setItem(nastyaDraftKey,value);
    else localStorage.removeItem(nastyaDraftKey);
  } catch {}
}
let nastyaChat = [];
let pendingChat = '';
try {
  const archive = JSON.parse(localStorage.getItem(nastyaHistoryKey));
  if (Array.isArray(archive)) nastyaChat = archive.filter(message =>
    message && ['assistant', 'user'].includes(message.role) && typeof message.content === 'string');
} catch {}
let nastyaBusy = false;
let storyBusy = false;
let chatStatus = '';
let storyStatus = '';
let generatedStory;
try { generatedStory = JSON.parse(localStorage.getItem('dutch-generated-story')); } catch {}

const nastyaConnectionKey = 'dutch-ai-connection';
const nastyaWorkerUrl = 'https://nastya-ai-assistant.huseynlielshad.workers.dev';

function readNastyaConnection() {
  try {
    return JSON.parse(sessionStorage.getItem(nastyaConnectionKey)) ??
      JSON.parse(localStorage.getItem(nastyaConnectionKey));
  } catch { return null; }
}
async function dutchRequest(action, body, connection) {
  const settings = connection ?? readNastyaConnection();
  if (!settings) {
    try { settings = JSON.parse(sessionStorage.getItem('dutch-ai-connection')); } catch {}
  }
  if (!settings) throw new Error('Əvvəlcə Profile bölməsində Nastya bağlantısını qur.');
  const response = await fetch(settings.url + '/api/dutch/' + action, {
    method:'POST', headers:{'Content-Type':'application/json',Authorization:'Bearer ' + settings.token},
    body:JSON.stringify(body), signal:AbortSignal.timeout(75000)
  });
  const result = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(result.error || 'Nastya Worker ilə əlaqə alınmadı.');
  return result;
}
function nastyaPage() {
  const messages = pendingChat ? [...nastyaChat, {role:'user',content:pendingChat}] : nastyaChat;
  return '<section class="nastya-screen" aria-labelledby="nastya-heading">' +
    '<header class="nastya-header"><a href="#home" aria-label="Ana səhifəyə qayıt">←</a>' +
    '<img class="nastya-avatar" src="nastya-avatar.png" alt=""><div class="nastya-identity"><h1 id="nastya-heading" tabindex="-1">Nastya</h1><span class="nastya-online">online</span></div><a class="nastya-task-link" href="#tasks">Tapşırıqlar</a></header>' +
    '<div id="nastya-thread" class="nastya-chat" role="log" aria-label="Söhbət tarixçəsi" tabindex="0">' +
    (messages.length ? messages.map(({role,content}) => '<p class="chat-' + role + '">' +
      escapeHtml(content) + '</p>').join('') : '<p class="chat-assistant">Salam! Mən Nastya. Sənə necə kömək edə bilərəm?</p>') +
    '</div><form id="nastya-message" class="nastya-composer">' +
    '<p class="nastya-status" role="status">' + escapeHtml(chatStatus) + '</p>' +
    '<div class="nastya-input-row"><textarea id="chat-message" name="message" rows="1" required maxlength="4000" ' +
    'aria-label="Mesaj yaz" placeholder="Mesaj yaz…"' + (nastyaBusy ? ' disabled' : '') + '>' + escapeHtml(nastyaBusy ? '' : readNastyaDraft()) + '</textarea>' +
    '<button type="submit"' + (nastyaBusy ? ' disabled' : '') + '>Göndər</button></div></form></section>';
}
function scrollNastyaChat() {
  const thread = document.getElementById('nastya-thread');
  if (thread) thread.scrollTop = thread.scrollHeight;
}
function nastyaSettings() {
  const connection = readNastyaConnection();
  return '<section class="card"><h2>Nastya bağlantısı</h2><form id="nastya-connect">' +
    '<label for="nastya-url">Worker ünvanı</label><input id="nastya-url" name="url" type="url" required value="' + escapeHtml(connection?.url ?? nastyaWorkerUrl) + '">' +
    '<label for="nastya-token">Tətbiq üçün giriş kodu</label><input id="nastya-token" name="token" type="password" required minlength="32" autocomplete="off">' +
    '<label><input name="remember" type="checkbox" checked> Bu cihazda yadda saxla</label><br>' +
    '<button type="submit">Qoş</button><p id="nastya-connect-status" role="status">' +
    (connection ? 'Nastya qoşulub.' : '') + '</p></form></section>';
}
const reminderClock = new Intl.DateTimeFormat('en-GB', {
  timeZone:'Europe/Amsterdam', year:'numeric', month:'2-digit', day:'2-digit',
  hour:'2-digit', minute:'2-digit', hourCycle:'h23'
});
function reminderClockParts(date) {
  return Object.fromEntries(reminderClock.formatToParts(date)
    .filter(part => part.type !== 'literal').map(part => [part.type, Number(part.value)]));
}
function parseNastyaReminder(message, now = new Date()) {
  const source = message.normalize('NFC');
  const folded = source.toLocaleLowerCase('az').replace(/ı/g,'i').replace(/ə/g,'e');
  const instruction = /\b(?:yadima sal|xatirlat)\b/.exec(folded);
  if (!instruction || /[?]|\bnece\b/.test(folded)) return null;
  const day = /\b(sabah|bu gun|bugun|bu gün|bugün)\b/.exec(folded);
  const time = /\bsaat\s+(\d{1,2})(?::(\d{2}))?(?:\s*-?\s*(?:da|de|ta|te))?(?=\s|[,.!;]|$)/.exec(folded);
  if (!day || !time) return {error:'Xatırlatma üçün günü və saatı yaz. Məsələn: «Sabah saat 10:00-da zəng etməyi yadıma sal».'};
  const hours = Number(time[1]), minutes = Number(time[2] ?? 0);
  if (hours > 23 || minutes > 59) return {error:'Saatı 24 saat formatında yaz. Məsələn, 10:00.'};
  const pieces = [day,time,instruction].sort((a,b) => b.index-a.index);
  let title = source;
  for (const part of pieces) title = title.slice(0,part.index) + ' ' + title.slice(part.index+part[0].length);
  title = title.replace(/^\s*nastya[,.!:\s]*/i,'').replace(/^[\s,.;!:-]+|[\s,.;!:-]+$/g,'').replace(/\s+/g,' ');
  if (!title || title.length > 200) return {error:'Nəyi xatırladacağımı qısa yaz.'};
  const today = reminderClockParts(now);
  const target = Date.UTC(today.year,today.month-1,today.day+(day[1] === 'sabah' ? 1 : 0),hours,minutes);
  let timestamp = target;
  for (let attempt = 0; attempt < 3; attempt++) {
    const local = reminderClockParts(new Date(timestamp));
    const observed = Date.UTC(local.year,local.month-1,local.day,local.hour,local.minute);
    if (observed === target) {
      if (timestamp <= now.getTime()) return {error:'Xatırlatma üçün gələcək vaxt seç.'};
      return {title,reminder:new Date(timestamp).toISOString()};
    }
    timestamp += target-observed;
  }
  return {error:'Bu saat yerli vaxtla mövcud deyil. Başqa saat seç.'};
}

function nastyaListRequest(message) {
  const text = message.toLocaleLowerCase('az').normalize('NFD').replace(/\p{M}/gu,'')
    .replace(/ı/g,'i').replace(/ə/g,'e').trim();
  if (/\b(?:seher|gundelik)\b.*\b(?:hesabat|bildiris)|\b(?:hesabat|bildiris)\b.*\b(?:seher|gundelik)/.test(text)) return 'briefing';
  if (text === '/tasks' || /\b(?:tapsiriq\w*|tasks?)\b/.test(text) &&
      /\b(?:goster|say|de|var|hansilar\w*|neler\w*|nedi\w*|neyim|siyahi\w*|list|show)\b/.test(text) &&
      !/\b(?:elave et|yarat|sil|deyis|tamamla)\b/.test(text)) {
    return /\b(?:bu gun|bugun|today)\b/.test(text) ? 'today' : 'tasks';
  }
  if (/\b(?:bu gun|bugun)\b.*\bne etmeli\w*/.test(text)) return 'today';
  return null;
}
async function replyWithNastyaList(kind) {
  if (kind === 'briefing') {
    const {notifications} = await dutchRequest('notifications',{});
    const report = notifications.find(item => item.kind === 'briefing' && item.text);
    return report ? report.text : 'Bildirişlərdə hələ səhər hesabatı görünmür.';
  }
  const {tasks} = await dutchRequest('tasks',{action:'list'});
  const today = amsterdamTime.formatToParts(new Date()).filter(part => ['day','month','year'].includes(part.type)).map(part => part.value).join('-');
  const shown = kind === 'today' ? tasks.filter(task => [task.due_at,task.reminder_at].some(stamp =>
    stamp && amsterdamTime.formatToParts(new Date(stamp)).filter(part => ['day','month','year'].includes(part.type)).map(part => part.value).join('-') === today)) : tasks;
  if (!shown.length) return kind === 'today' ? 'Bu günə tarix qoyulmuş aktiv tapşırıq yoxdur.' : 'Aktiv tapşırığın yoxdur.';
  return (kind === 'today' ? 'Bu günün tapşırıqları' : 'Aktiv tapşırıqların') + '\n' +
    shown.map(task => {
      const stamp = task.reminder_at ?? task.due_at;
      return '#' + task.id + ' ' + task.title + (stamp ? ' · ' + amsterdamTime.format(new Date(stamp)) : '');
    }).join('\n');
}

async function handleNastyaSubmit(event) {
  const form = event.target;
  if (form.id !== 'nastya-connect' && form.id !== 'nastya-message') return;
  event.preventDefault();
  const fields = new FormData(form);
  if (form.id === 'nastya-connect') {
    const status = form.querySelector('[role=status]');
    const button = form.querySelector('button');
    button.disabled = true;
    try {
      const url = new URL(fields.get('url'));
      if (url.origin !== nastyaWorkerUrl || url.username || url.password || url.pathname !== '/' || url.search || url.hash) {
        throw new Error('Worker-in HTTPS ünvanını daxil et.');
      }
      const settings = {url:url.origin,token:fields.get('token').trim()};
      await dutchRequest('connect', {}, settings);
      sessionStorage.setItem(nastyaConnectionKey,JSON.stringify(settings));
      if (fields.has('remember')) localStorage.setItem(nastyaConnectionKey,JSON.stringify(settings));
      else localStorage.removeItem(nastyaConnectionKey);
      form.elements.token.value = '';
      status.textContent = 'Nastya qoşuldu.';
    } catch (error) { status.textContent = error.message; }
    finally { button.disabled = false; }
    return;
  }
  if (nastyaBusy) return;
  const content = fields.get('message').trim();
  if (!content) return;
  nastyaBusy = true;
  pendingChat = content;
  saveNastyaDraft(content);
  chatStatus = 'Nastya yazır…';
  const previousLength = nastyaChat.length;
  const messages = [...nastyaChat.slice(-15), {role:'user',content}];
  render();
  try {
    const reminder = parseNastyaReminder(content);
    let reply;
    if (reminder?.error) {
      reply = reminder.error;
    } else if (reminder) {
      await dutchRequest('tasks',{action:'create',title:reminder.title,reminder:reminder.reminder});
      reply = 'Xatırlatma yadda saxlandı: ' + reminder.title + ' · ' +
        amsterdamTime.format(new Date(reminder.reminder)) + '.';
    } else {
      const list = nastyaListRequest(content);
      if (list) reply = await replyWithNastyaList(list);
      else ({reply} = await dutchRequest('chat',{messages}));
    }
    nastyaChat.push({role:'user',content},{role:'assistant',content:reply});
    saveNastyaDraft('');
    chatStatus = '';
    try { localStorage.setItem(nastyaHistoryKey, JSON.stringify(nastyaChat)); }
    catch { chatStatus = 'Yeni mesajlar bu cihazda yadda saxlanmadı.'; }
  } catch (error) { chatStatus = error.message; }
  finally {
    const sent = nastyaChat.at(-2)?.content === content && nastyaChat.length === previousLength + 2;
    nastyaBusy = false;
    pendingChat = '';
    if (location.hash === '#nastya') {
      render();
      if (!sent) document.getElementById('chat-message').value = content;
    }
  }
}
async function handlePrepareText(event) {
  if (event.target.id !== 'prepare-text' || storyBusy) return;
  const entries = [...new Map(words.filter(word => selected.has(word.id)).map(word => [keyFor(word),word])).values()];
  const status = document.getElementById('prepare-status');
  if (!readNastyaConnection()) {
    status.innerHTML = 'Əvvəlcə <a href="#profile">Profile → Nastya bağlantısı</a> bölməsində qoşul.';
    return;
  }
  if (!entries.length || entries.length > 200) {
    status.textContent = entries.length ? 'Bir hekayə üçün ən çox 200 fərqli söz seç.' : 'Əvvəlcə bir alt bölmə seç.';
    return;
  }
  const ranges = [...new Set(words.filter(word => selected.has(word.id)).map(word => word.id.split(':')[0]))];
  storyBusy = true;
  event.target.disabled = true;
  status.textContent = 'Hekayə hazırlanır…';
  storyStatus = status.textContent;
  try {
    const chapters = [];
    const batchSize = 30;
    const total = Math.ceil(entries.length / batchSize);
    let previousEnding = '';
    for (let start = 0; start < entries.length; start += batchSize) {
      const part = chapters.length + 1;
      storyStatus = 'Mətn hazırlanır · ' + part + '/' + total + ' hissə';
      const current = document.getElementById('prepare-status');
      if (current) current.textContent = storyStatus;
      const batch = entries.slice(start,start + batchSize);
      const instruction = [
        'Schrijf een creatief, samenhangend verhaal in eenvoudig Nederlands op niveau A1.',
        'Verwerk zo veel mogelijk van deze woorden op een natuurlijke manier. Gebruik verbuigingen of vervoegingen waar dat beter klinkt.',
        'Geef alleen de Nederlandse titel op de eerste regel, gevolgd door het verhaal in korte alinea’s. Geen markdown of woordenlijst.',
        total > 1 ? 'Dit is deel ' + part + ' van ' + total + ' van hetzelfde verhaal. ' +
          (part === total ? 'Geef het verhaal een slot.' : 'Laat het verhaal open voor het volgende deel.') : '',
        previousEnding ? 'Ga verder met dezelfde personages. Dit was het vorige einde: ' + previousEnding : '',
        'Woorden: ' + batch.map(word => word.answer).join('; ')
      ].filter(Boolean).join(' ');
      const {reply} = await dutchRequest('chat',{messages:[{role:'user',content:instruction}]});
      const lines = typeof reply === 'string' ? reply.trim().split(/\r?\n/).map(line => line.trim()).filter(Boolean) : [];
      if (!lines.length) throw new Error('Nastya boş cavab qaytardı.');
      const heading = lines.length > 1 ? lines.shift().replace(/^[#*]+\s*|\*+$/g,'').trim() : 'A1 · ' + ranges.join(', ');
      chapters.push({heading,paragraphs:lines});
      previousEnding = lines.at(-1).slice(-450);
    }
    generatedStory = chapters.length === 1 ? {...chapters[0],entries,range:ranges.join(', ')} :
      {heading:chapters[0].heading,chapters,entries,range:ranges.join(', ')};
    try { localStorage.setItem('dutch-generated-story',JSON.stringify(generatedStory)); } catch {}
    storyStatus = '';
    if (location.hash === '#vocabulary') location.hash = 'reading-generated';
  } catch (error) { storyStatus = error.message; }
  finally {
    storyBusy = false;
    const current = document.getElementById('prepare-status');
    if (current) {
      current.textContent = storyStatus;
      document.getElementById('prepare-text').disabled = false;
    }
  }
}

function nastyaTasksPage() {
  return title('Tapşırıqlar') + '<a class="action" href="#nastya">Ask Nastya</a>' +
    '<form id="nastya-task" class="card"><h2>Yeni tapşırıq</h2>' +
    '<label>Tapşırığın adı<input name="title" required maxlength="200"></label>' +
    '<label>Xatırlatma vaxtı (istəyə görə)<input name="reminder" type="datetime-local"></label>' +
    '<button type="submit">Yadda saxla</button><p id="task-save-status" role="status"></p></form>' +
    '<section class="card" id="nastya-feed" aria-live="polite"><p>Yüklənir…</p></section>';
}
const readNotificationKey = 'dutch-nastya-read-notifications';
let readNotifications = new Set();
let currentNotifications = [];
try {
  const stored = JSON.parse(localStorage.getItem(readNotificationKey));
  if (Array.isArray(stored)) readNotifications = new Set(stored);
} catch {}
function nastyaNotificationsPage() {
  return title('Bildirişlər') +
    '<section class="card" id="nastya-feed" aria-live="polite"><p>Yüklənir…</p></section>' +
    '<details class="card" id="notification-archive"><summary>Previous Notifications</summary>' +
    '<div id="notification-read-list"></div></details>' +
    '<dialog id="notification-detail" aria-labelledby="notification-heading"><form method="dialog">' +
    '<button type="submit">Bağla</button></form><h2 id="notification-heading">Bildiriş</h2>' +
    '<p id="notification-detail-text"></p></dialog>';
}
function notificationList(items, emptyText) {
  if (!items.length) return '<p>' + emptyText + '</p>';
  return '<ul class="nastya-feed-list notification-list">' + items.map(item => {
    const label = item.kind === 'briefing' ? 'Səhər hesabatı' : 'Xatırlatma';
    const stamp = item.created_at ? amsterdamTime.format(new Date(item.created_at)) : '';
    return '<li><button type="button" data-notification-id="' + escapeHtml(item.id) + '">' +
      '<strong>' + label + '</strong><span>' + escapeHtml(stamp) + '</span></button></li>';
  }).join('') + '</ul>';
}
function renderNotificationLists(feed) {
  feed.innerHTML = notificationList(currentNotifications.filter(item => !readNotifications.has(item.id)), 'Oxunmamış bildiriş yoxdur.');
  document.getElementById('notification-read-list').innerHTML =
    notificationList(currentNotifications.filter(item => readNotifications.has(item.id)), 'Əvvəlki bildiriş yoxdur.');
}
function handleNotificationOpen(event) {
  const button = event.target.closest('[data-notification-id]');
  if (!button) return;
  const item = currentNotifications.find(notification => String(notification.id) === button.dataset.notificationId);
  const feed = document.getElementById('nastya-feed');
  if (!item || !feed) return;
  const dialog = document.getElementById('notification-detail');
  document.getElementById('notification-heading').textContent = item.kind === 'briefing' ? 'Səhər hesabatı' : 'Xatırlatma';
  document.getElementById('notification-detail-text').textContent = item.text ?? '';
  readNotifications.add(item.id);
  try { localStorage.setItem(readNotificationKey, JSON.stringify([...readNotifications])); } catch {}
  renderNotificationLists(feed);
  dialog.showModal();
}
const amsterdamTime = new Intl.DateTimeFormat('az-AZ', {
  timeZone:'Europe/Amsterdam', dateStyle:'medium', timeStyle:'short'
});
function renderNastyaFeed(feed, items, route) {
  if (!items.length) {
    feed.innerHTML = '<p>' + (route === 'tasks' ? 'Aktiv tapşırıq yoxdur.' : 'Hələ bildiriş yoxdur.') + '</p>';
    return;
  }
  feed.innerHTML = '<ul class="nastya-feed-list">' + items.map(item => {
    const stamp = route === 'tasks' ? item.reminder_at ?? item.due_at : item.created_at;
    return '<li><strong>' + escapeHtml(route === 'tasks' ? item.title : item.text || '') +
      '</strong>' + (stamp ? '<p>' + escapeHtml(amsterdamTime.format(new Date(stamp))) + '</p>' : '') + '</li>';
  }).join('') + '</ul>';
}
async function loadNastyaFeed(route) {
  const feed = document.getElementById('nastya-feed');
  if (!feed) return;
  if (!readNastyaConnection()) {
    feed.innerHTML = '<p>Əvvəlcə <a href="#profile">Profile → Nastya bağlantısı</a> bölməsində qoşul.</p>';
    return;
  }
  try {
    const data = await dutchRequest(route,route === 'tasks' ? {action:'list'} : {});
    if (!feed.isConnected) return;
    if (route === 'notifications') {
      currentNotifications = (data.notifications ?? []).filter(item => item.text);
      renderNotificationLists(feed);
    } else {
      renderNastyaFeed(feed,data.tasks ?? [],route);
    }
  } catch (error) {
    feed.textContent = error.message;
  }
}
async function handleNastyaTask(event) {
  const form = event.target;
  if (form.id !== 'nastya-task') return;
  event.preventDefault();
  const button = form.querySelector('button');
  if (button.disabled) return;
  button.disabled = true;
  const fields = new FormData(form);
  const status = document.getElementById('task-save-status');
  try {
    const reminder = fields.get('reminder');
    const reply = await dutchRequest('tasks',{
      action:'create',title:fields.get('title').trim(),
      reminder:reminder ? new Date(reminder).toISOString() : null
    });
    form.reset();
    status.textContent = 'Tapşırıq yadda saxlandı.';
    const feed = document.getElementById('nastya-feed');
    if (form.isConnected && feed) renderNastyaFeed(feed,reply.tasks,'tasks');
  } catch (error) {
    status.textContent = error.message;
  } finally {
    button.disabled = false;
  }
}
