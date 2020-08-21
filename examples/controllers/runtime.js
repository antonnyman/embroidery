export const runtime = {
  init(all) {
    const { form } = all
    form.addEventListener('submit', (e) => e.preventDefault())
  },
  simpleAdd({ simple }) {
    const el = document.createElement('p')
    el.innerText = 'World'
    simple.appendChild(el)
  },
  add({ inputTargets }) {
    const el = document.createElement('input')
    el.setAttribute('data-target', 'input[]')
    el.value = Math.random().toString()
    inputTargets[inputTargets.length - 1].insertAdjacentElement(
      'beforebegin',
      el
    )
  },
  submit({ inputTargets }) {
    console.log(inputTargets)
    inputTargets.map((iT) => {
      console.log(iT.value)
    })
  },
}
