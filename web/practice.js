const themes = window.dutchThemes;
const sections = themes.flatMap(theme => theme.sections);
const words = sections.flatMap(section => section.words);
const normalize = value => value.normalize('NFC').toLocaleLowerCase('nl')
  .replace(/[’‘]/g, "'").trim().replace(/[.!?]+$/, '').trim().replace(/\s+/g, ' ');
const keyFor = word => normalize(word.answer);
const uniqueWords = [...new Map(words.map(word => [keyFor(word), word])).values()];
const storageKey = 'dutch-learning-vocabulary-v1';
let saved;
try { saved = JSON.parse(localStorage.getItem(storageKey)); } catch {}
const selected = new Set(saved?.selected ?? []);
const records = new Map(saved?.records ?? []);
const opened = new Set();
let question;
let lastWord;
function savePractice() {
  try { localStorage.setItem(storageKey, JSON.stringify({selected: [...selected], records: [...records]})); }
  catch { return false; }
  return true;
}
const escapeHtml = value => String(value).replace(/[&<>"']/g, char =>
  ({'&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;'})[char]);
const today = () => new Intl.DateTimeFormat('sv-SE', {timeZone:'Europe/Amsterdam'}).format(new Date());
const learnedWords = () => uniqueWords.filter(word => records.get(keyFor(word))?.streak >= 5);
function progressCards(linkVocabulary = false) {
  const learned = learnedWords();
  const daily = learned.filter(word => records.get(keyFor(word)).date === today()).length;
  return '<section class="card"><div class="progress-head"><h2>Daily Progress</h2><p>' +
    daily + '/20 söz</p></div><progress aria-label="Daily Progress" value="' +
    Math.min(daily,20) + '" max="20"></progress></section>' +
    '<section class="card"><div class="progress-head"><h2>' +
    (linkVocabulary ? '<a class="vocabulary-progress-link" href="#vocabulary">A1 Vocabulary</a>' : 'A1 Vocabulary') + '</h2><p>' +
    learned.length + '/' + uniqueWords.length + ' söz</p></div><progress aria-label="A1 Vocabulary" value="' +
    learned.length + '" max="' + uniqueWords.length + '"></progress></section>';
}
const vocabularyGroups = new Map(themes.flatMap(theme => [
  ['theme-' + theme.number, theme.sections.flatMap(section => section.words)],
  ...theme.sections.map(section => [section.id, section.words])
]));
function selectionControl(id, heading) {
  return '<label class="select-exercises"><input type="checkbox" data-group="' + id +
    '" aria-label="' + escapeHtml('Select for Exercises: ' + heading) +
    '"><span>Select for Exercises</span></label>';
}
function vocabularyPage() {
  return title('Vocabulary', 'Məşq etmək istədiyin mövzuları və ya alt bölmələri işarələ.') +
    '<div class="practice-toolbar"><span id="selected-count">' + selected.size +
    ' söz seçilib</span><div><a class="action" href="#exercises">Exercises</a> ' +
    '<button id="prepare-text" class="action" type="button"' + (storyBusy ? ' disabled' : '') +
    '>Prepare Text</button></div></div><p id="prepare-status" role="status">' + escapeHtml(storyStatus) + '</p>' +
    themes.map(theme => {
      const id = 'theme-' + theme.number;
      const heading = theme.number + '. ' + theme.title;
      return '<article class="card vocabulary-group">' + selectionControl(id, heading) +
        '<details class="disclosure" data-open="' + id + '"' + (opened.has(id) ? ' open' : '') +
        '><summary>' + escapeHtml(heading) + '</summary><div class="subsections">' +
        theme.sections.map(section => {
          const heading = section.id + ' ' + section.title;
          return '<div class="section-row vocabulary-group">' + selectionControl(section.id, heading) +
            '<details class="disclosure" data-open="' + section.id + '"' +
            (opened.has(section.id) ? ' open' : '') + '><summary>' + escapeHtml(heading) +
            '</summary><ol class="word-list">' + section.words.map(word =>
              '<li><strong lang="nl">' + escapeHtml(word.nl) + '</strong><small lang="en">' +
              escapeHtml(word.en) + '</small></li>').join('') + '</ol></details></div>';
        }).join('') + '</div></details></article>';
    }).join('');
}
function syncSelection() {
  for (const input of view.querySelectorAll('[data-group]')) {
    const group = vocabularyGroups.get(input.dataset.group);
    const count = group.filter(word => selected.has(word.id)).length;
    input.checked = count === group.length;
    input.indeterminate = count > 0 && !input.checked;
  }
  const counter = document.getElementById('selected-count');
  if (counter) counter.textContent = selected.size + ' söz seçilib';
}
const randomItem = list => list[Math.floor(Math.random() * list.length)];
const contexts = {
  'de naam':['Wat is ___ van je broer?', 'Schrijf ___ op het formulier.'],
  'het kind':['Waar is ___?', '___ leest een boek.'],
  'nederland':['Ik woon in ___.', 'Mijn familie woont in ___.'],
  'wonen':['Wij ___ in Voorburg.', 'Waar ___ jullie?'],
  'komen uit':['Wij ___ Nederland.', 'De cursisten ___ verschillende landen.'],
  'het nederlands':['Wij leren ___ op school.'],
  'de broer':['___ van Sara woont in Utrecht.'],
  'de moeder':['___ van Amir werkt vandaag.'],
  'de school':['Waar is ___?', '___ is vandaag dicht.'],
  'de sleutel':['Waar is ___ van de voordeur?'],
  'de soep':['___ is nog warm.', 'Ik eet ___ met brood.'],
  'de dokter':['___ heeft tijd om negen uur.'],
  'de jas':['___ hangt aan de deur.'],
  'het station':['Waar is ___?', '___ is naast de supermarkt.'],
  'de vakantie':['___ begint op maandag.'],
  'de foto':['Op ___ staat mijn familie.'],
  'het boek':['Ik lees ___ in de trein.'],
  'de fiets':['___ staat naast de auto.'],
  'de appel':['Ik eet ___ als fruit bij mijn lunch.'],
  'het raam':['Doe ___ dicht. Het is koud buiten.'],
  'het brood':['Ik eet ___ met kaas.'],
  'de trein':['___ vertrekt om negen uur.'],
  'het huis':['___ heeft drie slaapkamers.'],
  'het woord':['Wat betekent ___?'],
  'de klas':['De leerlingen zitten in ___.'],
  'de deur':['Doe ___ dicht als je weggaat.'],
  'de bus':['___ stopt hier om acht uur.'],
  'de winkel':['___ is vandaag open.']
};
const pictures = new Map(Object.entries({
  photo:'📷', book:'📚', bicycle:'🚲', car:'🚗', bus:'🚌', train:'🚆',
  apple:'🍎', banana:'🍌', bread:'🍞', cheese:'🧀', milk:'🥛', soup:'🥣',
  egg:'🥚', pizza:'🍕', potato:'🥔', tomato:'🍅', lemon:'🍋', pear:'🍐',
  coffee:'☕', beer:'🍺', fish:'🐟', dog:'🐕', cat:'🐈', horse:'🐴',
  cow:'🐄', bird:'🐦', flower:'🌷', tree:'🌳', rain:'🌧️', sun:'☀️',
  house:'🏠', key:'🔑', bed:'🛏️', door:'🚪', chair:'🪑', school:'🏫',
  pencil:'✏️', scissors:'✂️', pen:'🖊️', shoe:'👟', shoes:'👟',
  trousers:'👖', glasses:'👓', sock:'🧦', ring:'💍', tent:'⛺',
  nose:'👃', ear:'👂', eye:'👁️', tooth:'🦷', hand:'✋', foot:'🦶',
  phone:'📱', computer:'💻', newspaper:'📰', ball:'⚽', ship:'🚢',
  airplane:'✈️', umbrella:'☂️', 'traffic light':'🚦', 'swimming pool':'🏊'
}));
const exerciseTypes = ['en-nl', 'nl-en', 'picture', 'blank'];
const questionHistory = [];
let questionIndex = 0;
let typeIndex = 0;
function pictureFor(word) {
  return pictures.get(normalize(word.en).split(/[,;]/)[0]);
}
function choiceText(word, mode) {
  return mode === 'nl-en' ? word.en : word.answer;
}
function shuffle(items) {
  const result = [...items];
  for (let i = result.length - 1; i > 0; i--) {
    const other = Math.floor(Math.random() * (i + 1));
    [result[i], result[other]] = [result[other], result[i]];
  }
  return result;
}
function newQuestion() {
  const pool = [...new Map(words.filter(word => selected.has(word.id)).map(word => [keyFor(word),word])).values()];
  if (!pool.length) return undefined;
  for (let attempt = 0; attempt < exerciseTypes.length; attempt++) {
    const mode = exerciseTypes[typeIndex++ % exerciseTypes.length];
    const matching = pool.filter(word => mode === 'picture' ? pictureFor(word) :
      mode === 'blank' ? contexts[keyFor(word)] : true);
    if (!matching.length) continue;
    const alternatives = matching.filter(word => keyFor(word) !== lastWord);
    const word = randomItem(alternatives.length ? alternatives : matching);
    lastWord = keyFor(word);
    const visible = normalize(choiceText(word, mode));
    const meaning = normalize(word.en);
    const candidates = new Map();
    for (const item of [...shuffle(pool), ...shuffle(uniqueWords)]) {
      const label = normalize(choiceText(item, mode));
      if (keyFor(item) === lastWord || label === visible || normalize(item.en) === meaning) continue;
      if (mode === 'picture' && pictureFor(item) === pictureFor(word)) continue;
      if (!candidates.has(label)) candidates.set(label, item);
      if (candidates.size >= (mode === 'blank' ? 5 : 3)) break;
    }
    const options = shuffle([word, ...candidates.values()]);
    const sentence = mode === 'blank' ? randomItem(contexts[lastWord]) : '';
    return {word, mode, options, sentence, selectedIndex:null, answered:false};
  }
}
function exercisePage() {
  const heading = title('Exercises');
  question = questionHistory[questionIndex];
  if (!question) {
    question = newQuestion();
    if (question) questionHistory.push(question);
  }
  if (!question) return heading +
    '<section class="card"><p>Məşqə başlamaq üçün Vocabulary bölməsində mövzu və ya alt bölmə seç.</p>' +
    '</section>' + progressCards(true);
  const {word, mode, options, sentence, selectedIndex, answered, correct} = question;
  const prompt = {
    'en-nl':['Hollandca tərcüməni seç',word.en,'en'],
    'nl-en':['İngiliscə tərcüməni seç',word.answer,'nl'],
    picture:['Şəkildə nə var?',pictureFor(word),'az'],
    blank:['Boşluğa uyğun sözü seç',sentence,'nl']
  }[mode];
  const illustration = mode === 'picture' ? ' picture-prompt" role="img" aria-label="' + escapeHtml(word.en) : '';
  const promptMarkup = '<p class="sentence' + illustration + '" lang="' + prompt[2] + '">' + escapeHtml(prompt[1]) + '</p>' +
    (mode === 'blank' ? '<p class="hint" lang="en">' + escapeHtml(word.en) + '</p>' : '');
  const fields = options.map((item,index) => {
    const status = answered ? (item === word ? ' choice-correct' : selectedIndex === index ? ' choice-incorrect' : '') : '';
    return '<label class="choice' + status + '"><input type="radio" name="answer" value="' + index + '" required' +
      (selectedIndex === index ? ' checked' : '') + '><span lang="' + (mode === 'nl-en' ? 'en' : 'nl') + '">' +
      escapeHtml(choiceText(item, mode)) + '</span></label>';
  }).join('');
  return heading + '<section class="card"><form id="practice-form">' +
    '<fieldset' + (answered ? ' disabled' : '') + '><legend>' + prompt[0] + '</legend>' +
    promptMarkup + '<div class="exercise-options">' + fields + '</div></fieldset>' +
    '<p id="feedback" role="status" class="' + (answered ? (correct ? 'correct' : 'incorrect') : '') + '">' +
    escapeHtml(question.feedback ?? '') + '</p><div class="exercise-actions">' +
    '<button type="button" id="back-question">Back</button>' +
    '<button type="submit" class="submit-answer"' + (answered || selectedIndex === null ? ' disabled' : '') + '>Submit</button>' +
    '<button type="button" id="next-question">' + (answered ? 'Next' : 'Skip') +
    '</button></div></form></section><div id="exercise-progress">' + progressCards(true) + '</div>';
}
function progressPage() {
  const learned = learnedWords();
  return title('Progress') + progressCards() + '<section class="card"><h2>Öyrəndiyim sözlər</h2>' +
    (learned.length ? '<dl>' + learned.map(word => '<div><dt lang="nl">' + escapeHtml(word.answer) +
      '</dt><dd lang="en">' + escapeHtml(word.en) + '</dd></div>').join('') + '</dl>' :
      '<p>Bir sözü ardıcıl 5 suala düzgün cavab verəndə burada görünəcək.</p>') + '</section>';
}
function handlePracticeChange(event) {
  if (event.target.name === 'answer' && question && !question.answered) {
    question.selectedIndex = Number(event.target.value);
    event.target.form.querySelector('[type="submit"]').disabled = false;
    return;
  }
  const group = vocabularyGroups.get(event.target.dataset.group);
  if (!group) return;
  for (const {id} of group) {
    if (event.target.checked) selected.add(id);
    else selected.delete(id);
  }
  questionHistory.length = 0;
  questionIndex = 0;
  lastWord = undefined;
  syncSelection();
  if (!savePractice()) document.getElementById('selected-count').textContent += ' · seçim bu brauzerdə saxlanmadı';
}
function handlePracticeSubmit(event) {
  if (event.target.id !== 'practice-form') return;
  event.preventDefault();
  if (!question || question.answered || question.selectedIndex === null) return;
  const {word, mode, options, selectedIndex} = question;
  const key = keyFor(word);
  const correct = options[selectedIndex] === word;
  const before = records.get(key);
  const streak = correct ? Math.min(5, (before?.streak ?? 0) + 1) : 0;
  const date = streak === 5 ? (before?.streak === 5 ? before.date : today()) : null;
  records.set(key, {streak,date});
  const savedResult = savePractice();
  question.answered = true;
  question.correct = correct;
  question.feedback = (correct ? 'Düzdür. ' : 'Səhvdir. Düzgün cavab: ') + choiceText(word, mode) +
    ' · ' + streak + '/5 ardıcıl düz' + (savedResult ? '' : ' · Nəticə brauzerdə saxlanmadı.');
  renderExercise();
}
function renderExercise() {
  view.innerHTML = exercisePage();
  const feedback = document.getElementById('feedback');
  const heading = view.querySelector('legend, h1');
  const focus = question?.answered && feedback ? feedback : heading;
  focus.tabIndex = -1;
  focus.focus();
}
function handleExerciseNavigation(event) {
  if (event.target.id === 'back-question') {
    if (questionIndex === 0) {
      location.hash = 'vocabulary';
      return;
    }
    questionIndex--;
    renderExercise();
  } else if (event.target.id === 'next-question') {
    questionIndex++;
    renderExercise();
  }
}
