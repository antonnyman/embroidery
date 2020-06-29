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
      const targetEls = element.querySelectorAll(`[data-target]`)
      const actionEls = element.querySelectorAll(`[data-action]`)

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
            console.error('Missing event or function')
          }

          aEl.addEventListener(event, function () {
            window[dataAttr][func](targets)
          })
        })
      })
    },
  }

  const Embroidery = {
    start: async function () {
      await domReady()
      console.info('Embroidery initialized.')

      this.discoverControllers((el) => {
        this.initializeController(el)
      })
    },
    discoverControllers: function (callback) {
      const rootControllers = document.querySelectorAll('[data-controller]')
      rootControllers.forEach((rC) => {
        callback(rC)
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
  }

  window.Embroidery = Embroidery

  window.Embroidery.start()

  return Embroidery
})
