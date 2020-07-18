import { defaultEventNames } from './utils'

type Context = {
  [key: string]: Function
}

export default class Controller {
  private dataAttr: string
  private targetElements: NodeList
  private actionElements: NodeList

  private cache = {
    'data-target': [],
    'data-action': [],
  }

  constructor(element: Element, private readonly context: Context) {
    this.dataAttr = element.getAttribute('data-controller')
    this.targetElements = element.querySelectorAll('[data-target]')
    this.actionElements = element.querySelectorAll('[data-action]')

    this.updateCache(this.targetElements, 'data-target')
    this.updateCache(this.actionElements, 'data-action')

    this.create()

    if (typeof this.context[this.dataAttr]?.init === 'function') {
       this.context[this.dataAttr].init(this.cache['data-target'])
    }
  }

  updateCache(elements: NodeList, attr: string) {
    elements.forEach((element: Element) => {
      this.cache = {
        ...this.cache,
        [attr]: { ...this.cache[attr], [element.getAttribute(attr)]: element },
      }
    })
  }

  create() {
    this.actionElements.forEach((actionElement: Element) => {
      const actions = actionElement.getAttribute('data-action')

      // Make sure the attribute has an action
      if (!actions) {
        throw new Error(
          '[Embroidery]: An action attribute was specified without an action. Is the action an empty string or missing?'
        )
      }

      // Actions are separated by a blank space
      // Example: mouseover->dothis mouseout->dothat
      actions
        .trim()
        .split(/\s+/)
        .map((action) => {
          let event = null
          let func = null

          // We can assume some common actions by their tagname
          // For example button has the default action click
          if (!action.includes('->')) {
            const tagName = actionElement.tagName.toLowerCase()
            event = defaultEventNames[tagName]
            func = action
          } else {
            ;[event, func] = action.split('->')
          }

          if (!event) {
            throw new Error(
              `[Embroidery]: Missing event on ${actionElement}, for example click or change.`
            )
          }

          if (!func) {
            throw new Error(
              `[Embroidery]: Missing function on ${actionElement}. Specify your function in the controller.`
            )
          }
          actionElement.addEventListener(event, () => {
            // Invoke function
            this.context[this.dataAttr][func](this.cache['data-target'])
          })
        })
    })
  }
}
