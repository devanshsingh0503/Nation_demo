import {
    a as e,
    n as t,
    r as n
} from "./figure-motion.CcR6Purf.js";
if (!n) {
    let n = new Map;
    for (let t of document.querySelectorAll(`[data-process-card]`)) {
        let r = t.querySelector(`svg`);
        r && n.set(t, e(r))
    }
    let r = new IntersectionObserver(e => {
        for (let i of e) {
            if (!i.isIntersecting) continue;
            r.unobserve(i.target);
            let e = n.get(i.target);
            e && t(e)
        }
    }, {
        threshold: .45
    });
    n.forEach((e, t) => r.observe(t))
}