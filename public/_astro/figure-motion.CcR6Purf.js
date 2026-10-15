var e = .77,
    t = window.matchMedia(`(prefers-reduced-motion: reduce)`).matches,
    n = e => `linear(${Array.from({length:33},(t,n)=>+e(n/32).toFixed(4)).join(`,
    `)})`, r = {
        out3: [e => 1 - (1 - e) ** 3, `cubic-bezier(0.33, 1, 0.68, 1)`],
        out1: [e => 1 - (1 - e) ** 2, `cubic-bezier(0.5, 1, 0.89, 1)`],
        back: [e => 1 + (e - 1) ** 2 * (2.35 * (e - 1) + 1.35), `cubic-bezier(0.34, 1.4, 0.64, 1)`],
        inOut2: [e => e < .5 ? 2 * e * e : 1 - 2 * (1 - e) ** 2, `cubic-bezier(0.45, 0, 0.55, 1)`]
    },
    i = CSS.supports(`transition-timing-function`, `linear(0, 1)`),
    a = e => i ? n(r[e][0]) : r[e][1],
    o = t => {
        let n = [],
            r, i = 0,
            o = (t, r, a, o, s) => {
                i = Math.max(i, a + o), n.push(t.animate(r, {
                    delay: a / e * 1e3,
                    duration: o / e * 1e3,
                    easing: s,
                    fill: `both`
                }))
            },
            s = new Map;
        for (let e of t.querySelectorAll(`[data-ph]`)) {
            let t = Number(e.dataset.ph);
            s.set(t, [...s.get(t) ? ? [], e])
        }
        for (let t of [...s.keys()].sort((e, t) => e - t)) {
            let n = Math.max(i - .14, .05);
            s.get(t).forEach((t, s) => {
                let c = t.dataset.an,
                    l = n + s * (t.dataset.fs === `1` ? .018 : c === `bar` ? .095 : .05),
                    u = e => o(t, [{
                        transform: `${e}(0)`
                    }, {
                        transform: `${e}(1)`
                    }], l, c === `bar` || c === `pop` ? .26 : .34, a(c === `pop` ? `back` : `out3`));
                if (c === `growx`) u(`scaleX`);
                else if (c === `growy` || c === `growyb` || c === `bar`) u(`scaleY`);
                else if (c === `pop`) u(`scale`);
                else if (c === `dashin`) o(t, [{
                    opacity: 0
                }, {
                    opacity: 1
                }], l, .24, a(`out1`));
                else if (c === `sweep`) {
                    let e = Number(t.dataset.from) - Number(t.getAttribute(`y`));
                    o(t, [{
                        opacity: 0
                    }, {
                        opacity: 1
                    }], l, .12, a(`out1`)), o(t, [{
                        transform: `translateY(${e}px)`
                    }, {
                        transform: `none`
                    }], l + .08, .46, a(`inOut2`))
                } else o(t, [{
                    opacity: 0,
                    transform: c === `fadex` ? `translateX(-8px)` : `translateY(6px)`
                }, {
                    opacity: 1,
                    transform: `none`
                }], l, .3, a(`out3`));
                t.dataset.role === `cursor` && (i = Math.max(i, l + .3), r = t.animate([{
                    opacity: 1
                }, {
                    opacity: 1,
                    offset: .5
                }, {
                    opacity: 0,
                    offset: .5
                }, {
                    opacity: 0
                }], {
                    delay: (l + .3) / e * 1e3,
                    duration: 1100,
                    iterations: 1 / 0
                }))
            })
        }
        let c = r ? [...n, r] : n;
        for (let e of c) e.pause(), e.currentTime = 0;
        return {
            animations: n,
            blink: r
        }
    },
    s = ({
        animations: e,
        blink: t
    }) => {
        for (let n of t ? [...e, t] : e) n.currentTime = 0, n.play()
    },
    c = ({
        animations: e,
        blink: t
    }) => {
        for (let n of t ? [...e, t] : e) n.pause(), n.currentTime = 0
    },
    l = e => {
        c(e);
        for (let t of e.animations) t.currentTime = t.effect.getComputedTiming().endTime
    };
export {
    o as a, c as i, s as n, t as r, l as t
};