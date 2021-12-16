const miModulo = (() => {
    "use strict";
    let e = [];
    const t = ["C", "D", "H", "S"],
        n = ["J", "Q", "K", "A"];
    let a = [];
    const l = document.querySelector("#btnPedir"),
        o = document.querySelector("#btnDetener"),
        r = document.querySelector("#btnNuevo"),
        s = document.querySelectorAll(".player__divCartas"),
        d = document.querySelectorAll("small"),
        c = (t = 2) => {
            (e = u()), (a = []);
            for (let e = 0; e < t; e++) a.push(0), (d[e].innerText = 0), i(s[e]);
            (l.disabled = !1), (o.disabled = !1);
        },
        i = e => {
            for (; e.children.length > 0; ) e.removeChild(e.firstChild);
        },
        u = () => {
            e = [];
            for (let n = 2; n <= 10; n++) for (let a of t) e.push(n + a);
            for (let a of n) for (let n of t) e.push(a + n);
            return _.shuffle(e);
        },
        h = () => {
            if (0 === e.length) throw "No hay cartas en el deck";
            return e.shift();
        },
        m = (e, t) => (
            (a[t] =
                a[t] +
                (e => {
                    const t = e.substring(0, e.length - 1);
                    return isNaN(t) ? ("A" === t ? 11 : 10) : +t;
                })(e)),
            (d[t].innerText = a[t]),
            a[t]
        ),
        f = (e, t) => {
            const n = document.createElement("img");
            (n.src = `../images/cartas/${e}.png`), n.classList.add("carta"), s[t].append(n);
        },
        g = e => {
            let t = 0;
            do {
                const e = h();
                (t = m(e, a.length - 1)), f(e, a.length - 1);
            } while (t < e && e <= 21);
            (() => {
                const [e, t] = a;
                setTimeout(() => {
                    e > 21
                        ? alert(`Te pasaste, gana la computadora con ${t}`)
                        : t > 21
                        ? alert(`GANASTE! con ${e}. La computadora se pasó. `)
                        : t === e
                        ? alert("Nadie gana")
                        : alert(`Gana la computadora con ${t}`);
                }, 1e3);
            })();
        };
    return (
        l.addEventListener("click", () => {
            const e = h(),
                t = m(e, 0);
            f(e, 0),
                t > 21
                    ? (console.warn("Lo siento mucho, perdiste"), (l.disabled = !0), (o.disabled = !0), g(t))
                    : 21 === t && (console.warn("21, genial!"), (l.disabled = !0), (o.disabled = !0), g(t));
        }),
        o.addEventListener("click", () => {
            (l.disabled = !0), (o.disabled = !0), g(a[0]);
        }),
        r.addEventListener("click", () => {
            c();
        }),
        { nuevoJuego: c }
    );
})();
