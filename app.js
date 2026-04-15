const API_BASE = '/api/cafes';
let currentResults = [];

async function doSearch() {
    const area = document.getElementById('areaInput').value.trim();
    if (!area) return;

    const minRating   = document.getElementById('fRating').value;
    const maxPrice    = document.getElementById('fPrice').value;
    const maxDistance = document.getElementById('fDist').value;
    const sortBy      = document.getElementById('fSort').value;

    const params = new URLSearchParams({ area, sortBy });
    if (minRating)   params.append('minRating', minRating);
    if (maxPrice)    params.append('maxPrice', maxPrice);
    if (maxDistance) params.append('maxDistance', maxDistance);

    setCount('Searching...');
    setGrid('<div class="empty">Loading cafes...</div>');

    try {
        const res = await fetch(`${API_BASE}/search?${params}`);
        if (!res.ok) throw new Error('Server error: ' + res.status);
        currentResults = await res.json();
        render();
    } catch (err) {
        console.error(err);
        setGrid('<div class="empty">Could not load cafes. Is the server running?</div>');
        setCount('Error');
    }
}

function render() {
    const sortBy = document.getElementById('fSort').value;
    const sorted = [...currentResults].sort((a, b) => {
        if (sortBy === 'rating') return b.rating - a.rating;
        if (sortBy === 'price')  return a.priceForTwo - b.priceForTwo;
        return a.distanceKm - b.distanceKm;
    });

    const n = sorted.length;
    setCount(n > 0 ? n + ' cafe' + (n > 1 ? 's' : '') + ' found' : 'No cafes match — try adjusting filters');

    if (n === 0) {
        setGrid('<div class="empty">No results. Try a different area or broaden your filters.</div>');
        return;
    }

    const grid = document.getElementById('grid');
    grid.innerHTML = '';
    sorted.forEach(c => grid.appendChild(buildCard(c)));
}

function buildCard(c) {
    const card = el('div', 'card');
    card.onclick = () => openModal(c.id);

    const iw = el('div', 'img-wrap');
    iw.innerHTML = '<div class="shimmer"></div>';

    const img = new Image();
    img.alt = c.name;
    img.onload = () => {
        iw.innerHTML = '';
        iw.appendChild(img);
        iw.appendChild(badge('price-tag', '\u20B9' + c.priceForTwo + ' for 2'));
        if (c.todaySpecial) iw.appendChild(badge('special-dot', "Today's special"));
    };
    img.onerror = () => {
        iw.innerHTML = '<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;font-size:36px;background:var(--bg2)">&#x2615;</div>';
        iw.appendChild(badge('price-tag', '\u20B9' + c.priceForTwo + ' for 2'));
        if (c.todaySpecial) iw.appendChild(badge('special-dot', "Today's special"));
    };
    img.src = c.imageUrl && c.imageUrl.length > 0
        ? c.imageUrl
        : 'https://source.unsplash.com/600x300/?' + encodeURIComponent(c.name + ',cafe');

    const body = el('div', 'cbody');
    body.innerHTML =
        '<div class="ctop">' +
            '<div class="cname">' + esc(c.name) + '</div>' +
            '<div class="rbadge">' +
                '<svg viewBox="0 0 12 12"><polygon points="6,1 7.5,4.5 11,5 8.5,7.5 9,11 6,9 3,11 3.5,7.5 1,5 4.5,4.5"/></svg>' +
                c.rating.toFixed(1) +
            '</div>' +
        '</div>' +
        '<div class="carea">' + esc(titleCase(c.area)) + '</div>' +
        '<div class="cmeta">' +
            '<span>' + c.distanceKm.toFixed(1) + ' km away</span>' +
            '<span>' + openingTime(c.timings) + '</span>' +
        '</div>' +
        '<div class="tags">' + (c.tags || []).slice(0, 3).map(t => '<span class="tag">' + esc(t) + '</span>').join('') + '</div>';

    card.appendChild(iw);
    card.appendChild(body);
    return card;
}

async function openModal(id) {
    const box = document.getElementById('mbox');
    box.innerHTML = '';
    document.getElementById('overlay').classList.add('open');

    try {
        const res = await fetch(API_BASE + '/' + id);
        if (!res.ok) throw new Error('Not found');
        const c = await res.json();
        renderModal(c);
    } catch (err) {
        box.innerHTML = '<div style="padding:2rem;text-align:center;color:var(--muted)">Could not load cafe details.</div>';
    }
}

function renderModal(c) {
    const box = document.getElementById('mbox');
    box.innerHTML = '';

    const mimg = el('img', 'mimg');
    mimg.alt = c.name;
    mimg.src = c.imageUrl && c.imageUrl.length > 0
        ? c.imageUrl
        : 'https://source.unsplash.com/900x380/?' + encodeURIComponent(c.name + ',cafe');
    mimg.onerror = () => { mimg.style.display = 'none'; };
    box.appendChild(mimg);

    const s = c.todaySpecial;
    const save = s ? Math.round(((s.originalPrice - s.price) / s.originalPrice) * 100) : 0;

    const specialHtml = s
        ? '<div class="stitle">Today\'s special</div>' +
          '<div class="special-card">' +
            '<div class="special-header">' +
              '<svg viewBox="0 0 24 24" fill="var(--warn-text)"><path d="M12 2C9 7 6 8 6 13a6 6 0 0012 0c0-3-1.5-5-3-6-1 3-2.5 4-3 4.5C11 10 12 6 12 2z"/></svg>' +
              '<span>Today\'s special — limited availability</span>' +
            '</div>' +
            '<div class="special-body">' +
              '<img class="special-img" src="' + (s.imageUrl && s.imageUrl.length > 0 ? s.imageUrl : 'https://source.unsplash.com/120x120/?' + encodeURIComponent(s.name)) + '" alt="' + esc(s.name) + '" onerror="this.style.display=\'none\'">' +
              '<div class="special-info">' +
                '<div class="special-name">' + esc(s.name) + '</div>' +
                '<div class="special-desc">' + esc(s.description) + '</div>' +
                '<div class="special-footer">' +
                  '<span class="special-price">\u20B9' + s.price + '</span>' +
                  '<span class="special-og">\u20B9' + s.originalPrice + '</span>' +
                  '<span class="special-save">' + save + '% off</span>' +
                '</div>' +
              '</div>' +
            '</div>' +
          '</div>'
        : '';

    const inner = el('div');
    inner.innerHTML =
        '<div class="mhead">' +
            '<h2>' + esc(c.name) + '</h2>' +
            '<button class="mclose" onclick="closeModal()">&#x2715;</button>' +
        '</div>' +
        '<div class="mbody">' +
            '<div class="maddr">&#x1F4CD; ' + esc(c.address) + '</div>' +
            '<div class="irow">' +
                '<div class="ii"><span class="lbl">Rating</span><span class="val">&#x2605; ' + c.rating.toFixed(1) + ' / 5</span></div>' +
                '<div class="ii"><span class="lbl">Price for 2</span><span class="val">\u20B9' + c.priceForTwo + '</span></div>' +
                '<div class="ii"><span class="lbl">Distance</span><span class="val">' + c.distanceKm.toFixed(1) + ' km</span></div>' +
                '<div class="ii"><span class="lbl">Timings</span><span class="val">' + esc(c.timings) + '</span></div>' +
            '</div>' +
            '<div class="tags" style="margin-bottom:2px">' + (c.tags || []).map(t => '<span class="tag">' + esc(t) + '</span>').join('') + '</div>' +
            specialHtml +
            '<div class="stitle" style="margin-top:14px">Menu</div>' +
            '<table class="mtable">' +
                (c.menu || []).map(m => '<tr><td>' + esc(m.item) + '</td><td>\u20B9' + m.price + '</td></tr>').join('') +
            '</table>' +
            '<div class="stitle" style="margin-top:12px">API endpoint</div>' +
            '<div class="apipill">GET /api/cafes/' + c.id + '</div>' +
        '</div>';

    box.appendChild(inner);
}

function closeModal() {
    document.getElementById('overlay').classList.remove('open');
}

function maybeClose(e) {
    if (e.target === document.getElementById('overlay')) closeModal();
}

document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') closeModal();
});

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('areaInput').addEventListener('keydown', function(e) {
        if (e.key === 'Enter') doSearch();
    });
});

function el(tag, cls) {
    const node = document.createElement(tag);
    if (cls) node.className = cls;
    return node;
}

function badge(cls, text) {
    const b = el('div', cls);
    b.textContent = text;
    return b;
}

function esc(str) {
    if (!str) return '';
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
}

function titleCase(str) {
    return (str || '').split(' ').map(function(w) {
        return w.charAt(0).toUpperCase() + w.slice(1);
    }).join(' ');
}

function openingTime(timings) {
    if (!timings) return '';
    var parts = timings.split('–');
    return parts[0] ? 'Opens ' + parts[0].trim() : '';
}

function setGrid(html) { document.getElementById('grid').innerHTML = html; }
function setCount(text) { document.getElementById('resCount').textContent = text; }
