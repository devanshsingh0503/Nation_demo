import "./split-text.BsBuCwsp.js";
var e = document.documentElement,
    t = () => new Promise(e => requestAnimationFrame(() => e())),
    n = e => new Promise(t => setTimeout(t, e)),
    r = (t, n) => {
        let r = getComputedStyle(e).getPropertyValue(t).trim();
        try {
            return document.body.animate([{
                opacity: 1
            }], {
                duration: 1,
                easing: r
            }).cancel(), r
        } catch {
            return n
        }
    },
    i = e => {
        let t = [...e];
        for (let e = t.length - 1; e > 0; e--) {
            let n = Math.floor(Math.random() * (e + 1));
            [t[e], t[n]] = [t[n], t[e]]
        }
        return t
    },
    a = async e => {
        for (let n = 0; n < 30 && !e.every(e => e.querySelector(`.split-line`)); n++) await t()
    };
e.classList.contains(`intro`) && (async () => {
    window.scrollTo(0, 0), await document.fonts ? .ready, await t(), await t();
    let o = r(`--spring-gentle`, `cubic-bezier(0.25, 0.8, 0.25, 1)`),
        s = r(`--spring-smooth`, `cubic-bezier(0.22, 0.9, 0.3, 1)`),
        c = r(`--spring-dramatic`, `cubic-bezier(0.16, 1, 0.3, 1)`),
        l = [],
        u = (e, t, n, r = 550, i = o) => {
            l.push(e.animate(t, {
                duration: r,
                delay: n,
                easing: i,
                fill: `both`
            }))
        },
        d = !window.matchMedia(`(min-width: 48rem)`).matches,
        f = [...document.querySelectorAll(d ? `[data-morph-source] svg path` : `[data-nav-logo-mark] svg path`)];
    i(f).forEach((e, t) => u(e, [{
        opacity: 0,
        filter: `blur(12px)`
    }, {
        opacity: 1,
        filter: `blur(0px)`
    }], t * 35, 550));
    let p = Math.max(0, f.length - 1) * 35 + 550,
        m = Math.round(p * .65),
        h = {
            "mark-tl": `-12px -12px`,
            "mark-tr": `12px -12px`,
            "mark-bl": `-12px 12px`,
            "mark-br": `12px 12px`
        };
    [...document.querySelectorAll(`[data-nav-logo-marks] [data-corner]`)].forEach((e, t) => {
        let n = [...e.classList].find(e => e in h) ? ? `mark-tl`;
        u(e, [{
            opacity: 0,
            translate: h[n]
        }, {
            opacity: 1,
            translate: `0px 0px`
        }], m + t * 40, 700, c)
    });
    let g = d ? document.querySelector(`[data-morph-marks]`) : null;
    g && u(g, [{
        opacity: 0
    }, {
        opacity: 1
    }], m, 700, c);
    let _ = [...document.querySelectorAll(`[data-intro-copy][data-split]`)],
        v = document.querySelector(`[data-work-info][data-intro-work]`),
        y = v ? [..._, v] : _;
    await a(y);
    let b = y.flatMap(e => [...e.querySelectorAll(`.split-line`)]);
    for (let e of b) e.style.transition = `none`;
    for (let e of y) e.dataset.text = `out`;
    e.offsetHeight;
    for (let e of b) e.style.transition = ``;
    for (let e of _) e.removeAttribute(`data-intro-copy`);
    v ? .removeAttribute(`data-intro-work`);
    let x = m + 200,
        S = x,
        C = x;
    for (let e of _) {
        let t = e.querySelectorAll(`.split-line`).length || 1,
            n = S,
            r = (t * 80 + 120) * .8;
        setTimeout(() => e.dataset.text = `in`, n), S = n + r, C = n + r * .5
    }
    let w = document.querySelector(`[data-intro-button]`);
    w && (u(w, [{
        opacity: 0,
        filter: `blur(6px)`,
        translate: `0px 0.5rem`
    }, {
        opacity: 1,
        filter: `blur(0px)`,
        translate: `0px 0px`
    }], C, 440), w.removeAttribute(`data-intro-copy`));
    let T = C + 440,
        E = Math.round(T * .75),
        D = [...document.querySelectorAll(d ? `[data-nav-logo], [data-intro-nav]` : `[data-intro-nav]`)].filter(e => e.getClientRects().length > 0);
    D.forEach((e, t) => {
        u(e, [{
            opacity: 0,
            filter: `blur(4px)`,
            translate: `0px -0.5rem`
        }, {
            opacity: 1,
            filter: `blur(0px)`,
            translate: `0px 0px`
        }], E + t * 60, 700, s)
    });
    for (let e of document.querySelectorAll(`[data-intro-nav]`)) e.removeAttribute(`data-intro-nav`);
    let O = Math.max(0, D.length - 1) * 60 + 700,
        k = E + Math.round(O * .5),
        A = document.querySelector(`.work-label[data-intro-work]`);
    A && (u(A, [{
        opacity: 0,
        filter: `blur(4px)`,
        translate: `0px 0.5rem`
    }, {
        opacity: 1,
        filter: `blur(0px)`,
        translate: `0px 0px`
    }], k, 700, s), A.removeAttribute(`data-intro-work`)), v && setTimeout(() => v.dataset.text = `in`, k + 80);
    let j = document.querySelector(`[data-work-media][data-intro-work]`);
    j && (u(j, [{
        opacity: 0,
        translate: `0px 1.5rem`
    }, {
        opacity: 1,
        translate: `0px 0px`
    }], k + 160, 900, s), j.removeAttribute(`data-intro-work`)), await n(k + 400), e.classList.remove(`intro`), await Promise.all(l.map(e => e.finished.catch(() => void 0)));
    for (let e of l) e.cancel()
})();