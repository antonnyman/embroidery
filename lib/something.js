window.test = {
  show: function ({ mingo, zingo }) {
    zingo.innerHTML = mingo.value
    zingo.style.cssText = 'background: #f0f;'
  },
  hide: function ({ mingo, zingo }) {
    zingo.innerHTML = ''
  },
  copy: function ({ mingo, zingo }) {
    mingo.select()
    document.execCommand('copy')
    zingo.style.cssText = 'visibility: visible;'
  },
}

window.biff = {
  init: function () {
    console.log('Kading')
  },
}
