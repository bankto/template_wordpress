import barba from '@barba/core'

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
    gtag('config', '******', { page_path: window.location.pathname })
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
