import "./split-text.BsBuCwsp.js";
var e = [...document.querySelectorAll(`[data-reveal-scroll]`)],
    t = 120,
    n = () => {
        let n = e.flatMap(e => [...e.querySelectorAll(`.split-line, [data-reveal-block], [data-reveal-marks], [data-reveal-media] img`)]);
        for (let e of n) e.style.transition = `none`;
        for (let t of e) t.dataset.text = `out`;
        document.documentElement.offsetHeight;
        for (let e of n) e.style.transition = ``;
        let r = new IntersectionObserver(e => {
            let n = 0;
            for (let i of e) {
                if (!i.isIntersecting) continue;
                let e = i.target;
                e.hasAttribute(`data-reveal-item`) && e.style.setProperty(`--reveal-offset`, `${n++*t}ms`), e.dataset.text = `in`, r.unobserve(e)
            }
        }, {
            rootMargin: `0px 0px -15% 0px`
        });
        e.forEach(e => r.observe(e))
    };
e.length && (document.fonts ? document.fonts.ready.then(() => requestAnimationFrame(n)) : n());