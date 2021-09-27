const myModule = (() => {
  "use strict";
  let e = [];
  const t = ["C", "D", "H", "S"],
    r = ["A", "J", "Q", "K"];
  let n = [];
  const s = document.querySelector("#btHit"),
    o = document.querySelector("#btnStand"),
    l = document.querySelector("#btnNew");
  let c = document.querySelectorAll(".divCards"),
    a = document.querySelectorAll("small"),
    d = document.querySelector("#player-cards"),
    i = document.querySelector("#computer-cards");
  const u = () => {
      e = [];
      for (let r = 2; r <= 10; r++) for (let n of t) e.push(r + n);
      for (let n of t) for (let t of r) e.push(t + n);
      return _.shuffle(e);
    },
    m = () => (0 === e.length && alert('Please, clic "New game"'), e.pop()),
    p = (e, t) => (
      (n[t] =
        n[t] +
        ((e) => {
          const t = e.substring(0, e.length - 1);
          return isNaN(t) ? ("A" === t ? 11 : 10) : parseInt(t);
        })(e)),
      (a[t].innerText = "Score: " + n[t]),
      n[t]
    ),
    b = (e) => {
      let t = 0;
      do {
        const e = m();
        t = p(e, n.length - 1);
        const r = document.createElement("img");
        (r.src = `assets/cartas/${e}.png`),
          r.classList.add("cards"),
          i.append(r);
      } while (t < e && e <= 21);
      (() => {
        const [e, t] = n;
        setTimeout(() => {
          t > 21
            ? alert("You've won :)")
            : t === e
            ? alert("Nobody wins :( ¡Try again!")
            : alert("Computer won. Try again!");
        }, 100);
      })();
    };
  s.addEventListener("click", () => {
    const e = m(),
      t = p(e, 0),
      r = document.createElement("img");
    (r.src = `assets/cartas/${e}.png`),
      r.classList.add("cards"),
      d.append(r),
      t > 21
        ? (console.warn("Sorry, you lost. Try again!"),
          (s.disabled = !0),
          (o.disabled = !0),
          b(t))
        : 21 === t &&
          (console.warn("Wow, 21 points!"),
          (s.disabled = !0),
          (o.disabled = !0),
          b(t));
  }),
    o.addEventListener("click", () => {
      (s.disabled = !0), (o.disabled = !0), b(n[0]);
    }),
    l.addEventListener("click", () => {
      ((t = 2) => {
        (e = u()), (n = []);
        for (let e = 0; e < t; e++) n.push(0);
        a.forEach((e) => (e.innerText = 0)),
          c.forEach((e) => (e.innerHTML = "")),
          (s.disabled = !0),
          (o.disable = !0);
      })(),
        (e = []),
        (e = u()),
        (n[0] = 0),
        (n[1] = 0),
        (a[0].innerText = "Score: 0"),
        (a[1].innerText = "Score: 0"),
        (d.innerHTML = ""),
        (i.innerHTML = ""),
        (s.disabled = !1),
        (o.disabled = !1);
    });
})();
