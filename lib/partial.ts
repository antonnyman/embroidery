export default class Partial {
  private dataAttr: string
  private element: Element

  // TODO: implement auto-refresh (for polling etc)
  constructor(element: Element) {
    this.element = element
    this.dataAttr = element.getAttribute('data-partial')

    this.create()
  }

  async create() {
    const result = await fetch(this.dataAttr, {
      headers: { 'Content-Type': 'text/html' },
    })

    const html = await result.text()

    this.element.insertAdjacentHTML('beforeend', html)
  }
}
