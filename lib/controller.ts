import groupBy from 'lodash.groupby'
import { defaultEventNames } from './utils'

type Context = {
  [key: string]: any
}

export default class Controller {
  private dataAttr: string
  private targetElements: NodeList
  private actionElements: NodeList
  private targetsElements: NodeList
  private actionsElements: NodeList

  private cache = {
    'data-target': {},
    'data-action': {},
    'data-targets': {},
    'data-actions': {},
  }

  constructor(element: Element, private readonly context: Context) {
    this.dataAttr = element.getAttribute('data-controller')
    this.targetElements = element.querySelectorAll('[data-target]')
    this.actionElements = element.querySelectorAll('[data-action]')

    this.targetsElements = element.querySelectorAll('[data-targets]')
    this.actionsElements = element.querySelectorAll('[data-actions]')

    this.updateCache(this.targetElements, 'data-target')
    this.updateCache(this.actionElements, 'data-action')
    this.updateCache(this.targetsElements, 'data-targets')
    this.updateCache(this.actionsElements, 'data-actions')

    this.create()

    if (typeof this.context[this.dataAttr]['init'] === 'function') {
      this.context[this.dataAttr].init(this.cache['data-target'])
    }
  }

  private getKey(el, element, attr) {
    return el.length > 0
      ? `${element.getAttribute(attr).slice(0, -2)}Targets`
      : element.getAttribute(attr)
  }

  private updateCache(elements: NodeList, attr: string) {
    let el = []
    elements?.forEach((element: HTMLElement) => {
      const target = element.getAttribute('data-target')

      if (target?.endsWith('[]')) {
        el = [...el, element]
      }
      this.cache = {
        ...this.cache,
        [attr]: {
          ...this.cache[attr],
          [this.getKey(el, element, attr)]: el.length > 0 ? el : element,
        },
      }
    })
  }

  private create() {
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
