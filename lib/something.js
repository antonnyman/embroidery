var test = {
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

var biff = {
  init: function (targets) {
    console.log(targets)
    console.log('Kading')
  },
}

var bjorn = {
  svej: function ({ hej }) {
    console.log(hej)
    hej.style.cssText = 'background: #0f0;'
  },
  some: function ({ hej }) {
    hej.style.cssText = ''
  },
}
