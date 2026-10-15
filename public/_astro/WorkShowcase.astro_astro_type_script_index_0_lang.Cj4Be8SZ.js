import "./split-text.BsBuCwsp.js";
for (let e of document.querySelectorAll(`[data-work]`)) {
    let t = [...e.querySelectorAll(`[data-work-info]`)],
        n = [...e.querySelectorAll(`[data-work-media]`)],
        r = 0,
        i = () => {
            t[0] ? .dataset.text === `out` && (t[0].dataset.text = `in`)
        },
        a = document.documentElement;
    if (!a.classList.contains(`intro`)) i();
    else {
        let e = new MutationObserver(() => {
            a.classList.contains(`intro`) || (e.disconnect(), i())
        });
        e.observe(a, {
            attributeFilter: [`class`]
        })
    }
    let o = e => {
            e !== r && t[e] && (t.forEach((t, n) => {
                t.dataset.text = n === e ? `in` : n < e ? `out-above` : `out`
            }), r = e)
        },
        s = e => {
            n.forEach((t, n) => {
                let r = t.querySelector(`[data-clip-active]`);
                r && (r.dataset.clipActive = String(n === e))
            })
        },
        c = new IntersectionObserver(e => {
            for (let t of e) {
                let e = n.indexOf(t.target);
                t.isIntersecting ? (o(e), s(e)) : e === 0 && t.boundingClientRect.top > window.innerHeight / 2 && s(-1)
            }
        }, {
            rootMargin: `-50% 0px -50% 0px`
        });
    for (let e of n) c.observe(e)
}