import "./split-text.BsBuCwsp.js";
var e = window.matchMedia(`(prefers-reduced-motion: reduce)`).matches;
for (let t of document.querySelectorAll(`[data-slider]`)) {
    let n = [...t.querySelectorAll(`[role="tab"]`)],
        r = n.map(e => document.getElementById(e.getAttribute(`aria-controls`) ? ? ``)),
        i = 0,
        a = (e, t = !1) => {
            e !== i && (n.forEach((t, n) => {
                let a = n === e;
                t.setAttribute(`aria-selected`, String(a)), t.tabIndex = a ? 0 : -1;
                let o = r[n];
                o && (o.dataset.text = a ? `in` : n === i ? `out-above` : `out`)
            }), i = e, t && n[e].focus())
        };
    t.addEventListener(`click`, e => {
        let t = e.target.closest(`[role="tab"]`);
        t && a(n.indexOf(t))
    }), t.addEventListener(`keydown`, e => {
        if (!e.target.closest(`[role="tab"]`)) return;
        let t = n.length - 1,
            r = {
                ArrowRight: i === t ? 0 : i + 1,
                ArrowLeft: i === 0 ? t : i - 1,
                Home: 0,
                End: t
            };
        e.key in r && (e.preventDefault(), a(r[e.key], !0))
    }), t.addEventListener(`animationend`, t => {
        !e && t.target.classList.contains(`slider-progress`) && a(i === n.length - 1 ? 0 : i + 1)
    });
    let o = t.querySelector(`[data-slider-bar]`),
        s = new IntersectionObserver(([e]) => {
            e.isIntersecting && (o && (o.dataset.text = `in`), r[i] && (r[i].dataset.text = `in`), s.disconnect())
        }, {
            rootMargin: `0px 0px -20% 0px`
        });
    s.observe(t), new IntersectionObserver(([e]) => t.toggleAttribute(`data-inview`, e.isIntersecting), {
        rootMargin: `0px 0px -50% 0px`
    }).observe(t.closest(`section`) ? ? t), (e || n.length < 2) && t.setAttribute(`data-paused`, ``)
}