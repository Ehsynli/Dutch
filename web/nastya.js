const nastyaHistoryKey = 'dutch-nastya-chat-v1';
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
    '<span class="nastya-avatar" aria-hidden="true">N</span><h1 id="nastya-heading" tabindex="-1">Nastya</h1></header>' +
    '<div id="nastya-thread" class="nastya-chat" role="log" aria-label="Söhbət tarixçəsi" tabindex="0">' +
    (messages.length ? messages.map(({role,content}) => '<p class="chat-' + role + '">' +
      escapeHtml(content) + '</p>').join('') : '<p class="chat-assistant">Salam! Mən Nastya. Sənə necə kömək edə bilərəm?</p>') +
    '</div><form id="nastya-message" class="nastya-composer">' +
    '<p class="nastya-status" role="status">' + escapeHtml(chatStatus) + '</p>' +
    '<div class="nastya-input-row"><textarea id="chat-message" name="message" rows="1" required maxlength="4000" ' +
    'aria-label="Mesaj yaz" placeholder="Mesaj yaz…"' + (nastyaBusy ? ' disabled' : '') + '></textarea>' +
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
  chatStatus = 'Nastya yazır…';
  const previousLength = nastyaChat.length;
  const messages = [...nastyaChat.slice(-15), {role:'user',content}];
  render();
  try {
    const {reply} = await dutchRequest('chat',{messages});
    nastyaChat.push({role:'user',content},{role:'assistant',content:reply});
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
