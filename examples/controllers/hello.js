export const hello = {
  init({ name }) {
    console.log(name)
  },
  greet({ name }) {
    console.log(name)
    alert(`hello ${name.value}`)
  },
}
