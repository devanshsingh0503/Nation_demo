var e = new WeakMap,
    t = e => e.replace(/\s+/g, ` `).trim(),
    n = e => {
        let n = [``];
        for (let t of e.childNodes) t.nodeName === `BR` ? n.push(``) : n[n.length - 1] += t.textContent ? ? ``;
        return n.map(t).filter(Boolean)
    },
    r = t => {
        let r = e.get(t) ? ? {
            segments: n(t),
            width: -1
        };
        e.set(t, r);
        let i = t.clientWidth;
        if (!r.segments.length || i === r.width) return !1;
        r.width = i;
        let a = document.createElement(`span`);
        a.className = `sr-only`, a.textContent = r.segments.join(` `);
        let o = document.createElement(`span`);
        o.className = `split-lines`, o.setAttribute(`aria-hidden`, `true`);
        let s = [],
            c = [];
        r.segments.forEach((e, t) => {
            t && o.append(document.createElement(`br`)), e.split(` `).forEach((e, t, n) => {
                let r = document.createElement(`span`);
                r.textContent = e, r.style.whiteSpace = `nowrap`, o.append(r, t < n.length - 1 ? ` ` : ``), s.push(e), c.push(r)
            })
        }), t.replaceChildren(a, o);
        let l = [],
            u = NaN;
        return c.forEach((e, t) => {
            e.offsetTop !== u && (l.push([]), u = e.offsetTop), l[l.length - 1].push(s[t])
        }), o.replaceChildren(...l.map(e => {
            let t = document.createElement(`span`);
            return t.className = `split-line`, t.textContent = e.join(` `), t
        })), !0
    },
    i = e => {
        e.querySelectorAll(`.split-line, [data-reveal-block]`).forEach((e, t) => e.style.setProperty(`--reveal-line`, String(t)))
    },
    a = `[data-text], [data-reveal-scroll]`,
    o = e => e.closest(a) ? ? e,
    s = e => {
        let t = new Set;
        for (let n of e) r(n) && t.add(o(n));
        t.forEach(i)
    },
    c = [...document.querySelectorAll(`[data-split]`)];
if (document.querySelectorAll(a).forEach(i), c.length) {
    let e = new ResizeObserver(e => s(e.map(e => e.target))),
        t = () => {
            s(c), c.forEach(t => e.observe(t))
        };
    document.fonts ? document.fonts.ready.then(t) : t()
}