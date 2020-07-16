export const test = {
  init: () => {
    console.log('Bingo')
  },
  copy: ({ mingo, zingo }) => {
    mingo.select()
    document.execCommand('copy')
    zingo.style.cssText = 'visibility: visible;'
    mingo.style.cssText = 'background: #f0f;'
    console.log('Im here')
  },
}
