(function () { function r (e, n, t) { function o (i, f) { if (!n[i]) { if (!e[i]) { const c = typeof require === 'function' && require; if (!f && c) return c(i, !0); if (u) return u(i, !0); const a = new Error("Cannot find module '" + i + "'"); throw a.code = 'MODULE_NOT_FOUND', a } const p = n[i] = { exports: {} }; e[i][0].call(p.exports, function (r) { const n = e[i][1][r]; return o(n || r) }, p, p.exports, r, e, n, t) } return n[i].exports } for (var u = typeof require === 'function' && require, i = 0; i < t.length; i++)o(t[i]); return o } return r })()({
  1: [function (require, module, exports) {
    const mainLineEl = document.querySelector('#mainLine')
    const numbersButtonEl = document.querySelectorAll('.numbers button')

    let interactiveDisplay = ''

    function showSymbol (arg) {
      interactiveDisplay += `${arg} `
      mainLineEl.innerHTML = interactiveDisplay
    }

    for (const i of numbersButtonEl) {
      i.addEventListener('click', () => {
        switch (i.id) {
          case 'one':
            console.log(1)
            break
          case 'two':
            console.log(2)
            break
          case 'three':

            break
          case 'four':
            ;
            break
          case 'five':
            day = 'Thursday'
            break
          case 'six':
            day = 'Friday'
            break
          case 6:
            day = 'Saturday'
          case 'seven':
            console.log(7)
          case 'eight':
            day = 'Saturday'
          case 'nine':
            console.log(7)
          case 'zero':
            day = 'Saturday'
          case 'doubleZero':
            console.log(7)
          case 'dot':
            showSymbol('.')
        }
      })
    }
  }, {}]
}, {}, [1])
