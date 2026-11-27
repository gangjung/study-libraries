// 공부 도서관 허브: 하단 탭으로 라이브러리를 골라 iframe으로 띄운다.
// - 각 라이브러리는 독립된 사이트(하위 폴더) 그대로 동작한다.
// - 3D 화면(WebGL)은 폰에서 동시에 띄울 수 있는 수가 제한되므로, 최근 쓴 탭 MAX_ALIVE개만 살려 둔다.
//   내린 탭은 마지막으로 보던 페이지(#해시)를 기억해 두었다가 다시 열 때 복원한다.
(function () {
  'use strict';

  var LIBS = [
    { id: 'tech', path: './tech/', icon: '🎮', label: '게임 기술' },
    { id: 'directing', path: './directing/', icon: '🎬', label: '게임 연출' },
    { id: 'car', path: './car/', icon: '🚗', label: '자동차' },
    { id: 'stock', path: './stock/', icon: '📈', label: '주식' },
    { id: 'hangul', path: './hangul/', icon: '✍️', label: '한글·소설' },
    { id: 'music', path: './music/', icon: '🎵', label: '작곡' },
    { id: 'talks', path: './talks/', icon: '🎤', label: '강연' },
  ];
  var MAX_ALIVE = 2;
  var KEY = 'hub-v1';

  var state = load();
  var frames = document.getElementById('frames');
  var loading = document.getElementById('loading');
  var nav = document.querySelector('nav');
  var alive = []; // 최근 사용 순 (앞이 최신)
  var iframes = {};
  var buttons = {};

  function load() {
    try {
      var s = JSON.parse(localStorage.getItem(KEY) || '{}');
      return { active: s.active || null, hash: s.hash || {} };
    } catch (e) {
      return { active: null, hash: {} };
    }
  }
  function save() {
    try { localStorage.setItem(KEY, JSON.stringify(state)); } catch (e) {}
  }
  function byId(id) {
    for (var i = 0; i < LIBS.length; i++) if (LIBS[i].id === id) return LIBS[i];
    return null;
  }

  // 같은 출처라 iframe 안의 주소(#해시)를 읽을 수 있다.
  function rememberHash(id) {
    var f = iframes[id];
    if (!f) return;
    try {
      var h = f.contentWindow.location.hash;
      if (h) { state.hash[id] = h; save(); }
    } catch (e) {}
  }

  function create(lib) {
    var f = document.createElement('iframe');
    f.title = lib.label;
    f.setAttribute('allow', 'fullscreen; accelerometer; gyroscope');
    f.setAttribute('allowfullscreen', '');
    f.src = lib.path + (state.hash[lib.id] || '');
    f.addEventListener('load', function () {
      loading.style.display = 'none';
      try {
        f.contentWindow.addEventListener('hashchange', function () { rememberHash(lib.id); });
      } catch (e) {}
      rememberHash(lib.id);
    });
    frames.appendChild(f);
    iframes[lib.id] = f;
    return f;
  }

  function evict(id) {
    rememberHash(id);
    var f = iframes[id];
    if (f) {
      try { f.src = 'about:blank'; } catch (e) {} // WebGL 컨텍스트를 확실히 놓아 준다
      f.remove();
    }
    delete iframes[id];
  }

  function show(id, fromUser) {
    var lib = byId(id) || LIBS[0];
    id = lib.id;
    if (fromUser && state.active === id && iframes[id]) {
      // 이미 보고 있는 탭을 다시 누르면 그 라이브러리 첫 화면으로
      try { iframes[id].contentWindow.location.hash = '#/'; } catch (e) {}
      return;
    }
    if (state.active && state.active !== id) rememberHash(state.active);

    var f = iframes[id];
    if (!f) {
      loading.style.display = 'grid';
      f = create(lib);
    }
    alive = alive.filter(function (x) { return x !== id; });
    alive.unshift(id);
    while (alive.length > MAX_ALIVE) evict(alive.pop());

    for (var k in iframes) iframes[k].classList.toggle('on', k === id);
    for (var b in buttons) {
      buttons[b].setAttribute('aria-selected', b === id ? 'true' : 'false');
      buttons[b].tabIndex = b === id ? 0 : -1;
    }
    document.title = lib.label + ' · 공부 도서관';
    state.active = id;
    save();
    if (location.hash !== '#' + id) history.replaceState(null, '', '#' + id);
  }

  LIBS.forEach(function (lib) {
    var b = document.createElement('button');
    b.type = 'button';
    b.setAttribute('role', 'tab');
    b.innerHTML = '<span class="ico" aria-hidden="true">' + lib.icon + '</span><span>' + lib.label + '</span>';
    b.addEventListener('click', function () { show(lib.id, true); });
    nav.appendChild(b);
    buttons[lib.id] = b;
  });

  // 라이브러리 안에서 다른 탭의 특정 페이지로 이동 요청: { type: 'hub-open', lib: 'tech', hash: '#/t/xxx' }
  window.addEventListener('message', function (e) {
    if (e.origin !== location.origin) return;
    var d = e.data;
    if (!d || d.type !== 'hub-open' || !byId(d.lib)) return;
    var hash = typeof d.hash === 'string' && d.hash.charAt(0) === '#' ? d.hash : '#/';
    state.hash[d.lib] = hash;
    save();
    if (iframes[d.lib]) {
      try { iframes[d.lib].contentWindow.location.hash = hash; } catch (err) {}
    }
    show(d.lib, false);
  });

  window.addEventListener('pagehide', function () { if (state.active) rememberHash(state.active); });
  window.addEventListener('hashchange', function () {
    var id = location.hash.slice(1);
    if (byId(id) && id !== state.active) show(id, false);
  });

  var initial = location.hash.slice(1);
  show(byId(initial) ? initial : state.active || LIBS[0].id, false);
})();
