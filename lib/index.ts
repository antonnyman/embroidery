import Controller from './controller'
import Partial from './partial'
import { domReady } from './utils'

enum Data {
  Controller = '[data-controller]',
  Partial = '[data-partial]',
}

enum DataAttribute {
  Controller = 'controller',
  Partial = 'partial',
}

type Callback = (el: Element) => void

type Cache = {
  [DataAttribute.Controller]: Element[]
  [DataAttribute.Partial]: Element[]
}

export class Embroidery {
  private cache: Cache = {
    [DataAttribute.Controller]: [],
    [DataAttribute.Partial]: [],
  }

  private context

  static start() {
    const app = new Embroidery()
    app.start()
    return app
  }


  async start() {
    await domReady()
    console.info('Embroidery started.')

    this.discover((el) => {
      this.initialize(el)
    }, Data.Controller)

    this.discover((el) => {
      this.initialize(el)
    }, Data.Partial)

    this.listenForNewUninitializedControllersAtRuntime((el) => {
      this.initialize(el)
    })
  }

  register(controller: Element) {
    this.context = { ...this.context, ...controller }
  }

  discover(callback: Callback, type: Data) {
    document
      .querySelectorAll(type)
      .forEach((controller: Element) => callback(controller))
  }

  updateCache(element, type) {
    this.cache = { ...this.cache, [type]: [...this.cache[type], element] }
  }

  initialize(e: Element) {
    const element = e as HTMLElement
    if (element.dataset) {
      try {
        Object.keys(element.dataset).forEach((el) => {
          switch (el) {
            case DataAttribute.Controller:
              this.updateCache(element, DataAttribute.Controller)
              return new Controller(element, this.context)

            case DataAttribute.Partial:
              this.updateCache(element, DataAttribute.Partial)
              return new Partial(element)

            default:
              throw new Error(
                'Element is not a specified data type, like controller or partial. Did you forget to register it?'
              )
          }
        })
      } catch (error) {
        setTimeout(() => {
          throw error
        }, 0)
      }
    } else {
      console.error(
        `An element ${element} was picked up but could not be initialized`
      )
    }
  }

  discoverUninitializedControllers(
    callback: Callback,
    parentElement: Element = null
  ) {
    return Array.from(
      (parentElement || document).querySelectorAll(Data.Controller)
    )
      .filter((element) => !this.cache[Data.Controller]?.includes(element))
      .map((element) => callback(element))
  }

  listenForNewUninitializedControllersAtRuntime(callback: Callback) {
    return new MutationObserver((mutations) =>
      mutations.map(({ addedNodes }) => {
        if (addedNodes.length > 0) {
          addedNodes.forEach((node) => {
            // Ignore non-elements
            if (node.nodeType !== 1) return
            // Don't listen for changes that happen in discovered controllers
            if (node.parentElement?.closest(Data.Controller)) return

            this.discoverUninitializedControllers((el: Element) => {
              callback(el)
            }, node.parentElement)
          })
        }
      })
    ).observe(document.querySelector('body'), {
      childList: true,
      attributes: true,
      subtree: true,
    })
  }
}
