// import { Controller } from "stimulus"

// export default class extends Controller {
//   static targets = ["name"]

//   greet() {
//     alert(`Hello, ${this.name}!`)
//   }

//   get name() {
//     return this.nameTarget.value
//   }
// }

export const hello = {
  greet: ({ name }) => {
    alert(`hello ${name.value}`)
  },
}
