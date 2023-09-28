import P5 from 'p5/lib/p5.min'
import barba from '@barba/core'

/**
 * p5.js
 */
const canvasWrapper = document.querySelector('.canvasWrapper')
const bgColor = '#f7f7f7'
const sketch = (p) => {
  const step = 10

  const fire = () => {
    p.background(bgColor)
    p.stroke(p.color(p.random(1), 1, 0.6))
    p.strokeWeight(0.5)
    for (let i = 0; i < p.width; i += step) {
      for (let j = 0; j < p.height; j += step) {
        let x1 = p.random(i, i + step)
        let y1 = p.random(j, j + step)
        let x2 = p.random(i, i + step)
        let y2 = p.random(j, j + step)
        p.line(x1, y1, x2, y2)
      }
    }
  }

  p.setup = () => {
    const w = p.windowWidth
    const h = p.windowHeight
    p.createCanvas(w, h)
    p.colorMode(p.HSB, 1)
    p.noLoop()
  }

  p.draw = () => {
    fire()
  }

  p.mousePressed = () => {
    fire()
  }

  p.windowResized = () => {
    p.resizeCanvas(p.windowWidth, p.windowHeight)
  }
}

window.addEventListener('load', () => {
  new P5(sketch, canvasWrapper)
})

// meta系の更新
const updateMeta = (next) => {
  const { head } = document
  const targetHead = next.html.match(/<head[^>]*>([\s\S.]*)<\/head>/i)[0]
  const newPageHead = document.createElement('head')
  newPageHead.innerHTML = targetHead
  const removeHeadTags = [
    "meta[name='description']",
    "meta[property='og:title']",
    "meta[property='og:site_name']",
    "meta[property='og:description']",
    "meta[property='og:url']",
    "meta[property='og:image']",
  ].join(',')
  const headTags = [...head.querySelectorAll(removeHeadTags)]
  const newHeadTags = [...newPageHead.querySelectorAll(removeHeadTags)]
  headTags.forEach((item) => head.removeChild(item))
  newHeadTags.forEach((item) => head.appendChild(item))

  if (typeof ga === 'function') ga('send', 'pageview', window.location.pathname)
  if (typeof gtag === 'function')
    gtag('config', 'G-EME748N118', { page_path: window.location.pathname })
}

/**
 * barba.js
 * 初期設定
 */
barba.hooks.before(() => {
  document.querySelector('html').classList.add('is-transitioning')
  barba.wrapper.classList.add('is-animating')
})
barba.hooks.after(() => {
  document.querySelector('html').classList.remove('is-transitioning')
  barba.wrapper.classList.remove('is-animating')
  window.scrollTo(0, 0)
})

barba.init({
  debug: false,
  sync: true,
  views: [],
  transitions: [
    {
      async leave() {},
      beforeEnter({ next }) {
        updateMeta(next)
      },
      enter() {},
    },
  ],
})
