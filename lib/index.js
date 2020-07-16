;(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined'
    ? (module.exports = factory())
    : typeof define === 'function' && define.amd
    ? define(factory)
    : ((global = global || self), (global.Embroidery = factory()))
})(this, function () {
  'use strict'

  function domReady() {
    return new Promise((resolve) => {
      if (document.readyState == 'loading') {
        document.addEventListener('DOMContentLoaded', resolve)
      } else {
        resolve()
      }
    })
  }

  const defaultEventNames = {
    a: 'click',
    button: 'click',
    form: 'submit',
    input: 'input',
    select: 'change',
    textarea: 'input',
  }

  const Controller = {
    create: function (element) {
      const dataAttr = element.getAttribute('data-controller')
      const targetEls = element.querySelectorAll('[data-target]')
      const actionEls = element.querySelectorAll('[data-action]')

      let targets = {}

      targetEls.forEach((tEl) => {
        targets = {
          ...targets,
          [tEl.getAttribute('data-target')]: tEl,
        }
      })

      actionEls.forEach((aEl) => {
        const actions = aEl.getAttribute('data-action').split(' ')
        actions.map((action) => {
          let event = null
          let func = null

          if (!action.includes('->')) {
            const tagName = aEl.tagName.toLowerCase()
            event = defaultEventNames[tagName]
            func = action
          } else {
            ;[event, func] = action.split('->')
          }

          if (!event || !func) {
            console.error(
              'Missing event or function, for example click or change.'
            )
          }

          aEl.addEventListener(event, function () {
            window[dataAttr][func](targets)
          })
        })
      })

      if (window[dataAttr] && typeof window[dataAttr]['init'] === 'function') {
        window[dataAttr]['init'](targets)
      }
    },
  }

  const Partial = {
    create: async function (element) {
      const dataAttr = element.getAttribute('data-partial')

      const result = await window.fetch(dataAttr, {
        method: 'GET',
        headers: { 'Content-Type': 'text/html' },
      })
      const response = await result.text()
      element.insertAdjacentHTML('beforeend', response)
    },
  }

  const Embroidery = {
    start: async function () {
      await domReady()
      console.info('Embroidery initialized.')

      this.discoverControllers((el) => {
        this.initializeController(el)
      })

      this.discoverPartials(async (el) => {
        await this.initializePartial(el)
      })

      this.initializeRuntimeControllers((el) => {
        this.initializeController(el)
      })
    },
    discoverControllers: function (callback) {
      const rootControllers = document.querySelectorAll('[data-controller]')
      rootControllers.forEach((rC) => {
        callback(rC)
      })
    },
    discoverPartials: function (callback) {
      const rootPartials = document.querySelectorAll('[data-partial]')
      rootPartials.forEach((rP) => {
        callback(rP)
      })
    },

    initializeController: function (controller) {
      if (!controller.__embr) {
        try {
          controller.__embr = Object.create(Controller).create(controller)
        } catch (error) {
          setTimeout(() => {
            throw error
          }, 0)
        }
      }
    },
    initializePartial: async function (partial) {
      if (!partial.__embr) {
        try {
          partial.__embr = await Object.create(Partial).create(partial)
        } catch (error) {
          setTimeout(() => {
            throw error
          }, 0)
        }
      }
    },
    discoverUninitializedControllers: function (callback, el = null) {
      const rootEls = (el || document).querySelectorAll('[data-controller]')

      Array.from(rootEls)
        .filter((el) => el.__embr === undefined)
        .forEach((rootEl) => {
          callback(rootEl)
        })
    },
    initializeRuntimeControllers: function (callback) {
      const targetNode = document.querySelector('body')

      const observer = new MutationObserver((mutations) => {
        if (this.pauseMutationObserver) return

        mutations.forEach((mutation) =>
          mutation.addedNodes.forEach((node) => {
            // Discard non-element nodes (like line-breaks)
            if (node.nodeType !== 1) return

            // Discard any changes happening within an existing component.
            // They will take care of themselves.
            if (
              node.parentElement &&
              node.parentElement.closest('[data-controller]')
            )
              return

            this.discoverUninitializedControllers((el) => {
              this.initializeController(el)
            }, node.parentElement)
          })
        )
      })

      observer.observe(targetNode, {
        childList: true,
        attributes: true,
        subtree: true,
      })
    },
  }

  window.Embroidery = Embroidery

  window.Embroidery.start()

  return Embroidery
})
