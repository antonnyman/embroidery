export const clipboard = {
  copy({ source }) {
    if (document.queryCommandSupported('copy')) {
      source.select()
      document.execCommand('copy')
    }
  },
}
