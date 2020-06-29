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

  function Controller(element) {
    this.el = element
    const dataAttr = this.el.getAttribute('data-controller')
    const targetEls = this.el.querySelectorAll(`[data-target]`)
    const actionEls = this.el.querySelectorAll(`[data-action]`)

    let targets = {}

    targetEls.forEach((tEl) => {
      targets = {
        ...targets,
        [tEl.getAttribute('data-target').substring(dataAttr.length + 1)]: tEl,
      }
    }),
      window['something'](targets)
  }

  const Embroidery = {
    start: async function start() {
      await domReady()
      console.info('Embroidery initialized.')

      this.discoverControllers((el) => {
        this.initializeController(el)
      })
    },
    discoverControllers: function discoverControllers(callback) {
      const rootControllers = document.querySelectorAll('[data-controller]')
      rootControllers.forEach((rC) => {
        callback(rC)
      })
    },
    // listenForNewRuntimeControllers: function listenForNewRuntimeControllers(
    //   callback
    // ) {
    //   const rootNode = document.querySelector('body')

    //   //https://github.com/alpinejs/alpine/blob/a0fab06379b5427df82a8a32e495e373f51c7a16/dist/alpine.js#L1710
    //   const observer = new MutationObserver((muts) => {
    //     for (let i = 0; i < muts.length; i++) {
    //       if (muts[i].addedNodes.length > 0) {
    //         muts[i].addedNodes.forEach((node) => {
    //           // Discard non-element nodes (like line-breaks)
    //           if (node.nodeType !== 1) return // Discard any changes happening within an existing component.
    //           // They will take care of themselves.

    //           if (
    //             node.parentElement &&
    //             node.parentElement.closest('[x-controller]')
    //           )
    //             return
    //           this.discoverUninitializedComponents((el) => {
    //             this.initializeComponent(el)
    //           }, node.parentElement)
    //         })
    //       }
    //     }
    //   })
    //   observer.observe(rootNode, {
    //     childList: true,
    //     attributes: true,
    //     subtree: true,
    //   })
    // },
    initializeController: function initializeController(controller) {
      if (!controller.__embr) {
        try {
          controller.__embr = new Controller(controller)
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
