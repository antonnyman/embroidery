// import { Controller } from "stimulus"

// export default class extends Controller {
//   static targets = [ "source" ]

//   initialize() {
//     if (document.queryCommandSupported("copy")) {
//       this.element.classList.add("clipboard--supported")
//     }
//   }

//   copy() {
//     this.sourceTarget.select()
//     document.execCommand("copy")
//   }
// }

export const clipboard = {
  init: () => {
    console.log('hello')
  },
  copy: ({ source }) => {
    console.log('clickety')
    if (document.queryCommandSupported('copy')) {
      console.log(source)
      source.select()
      document.execCommand('copy')
    }
  },
}
