;(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined'
    ? (module.exports = factory())
    : typeof define === 'function' && define.amd
    ? define(factory)
    : ((global = global || self), (global.DragReduction = factory()))
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

  function stripHead(html) {
    const doc = new DOMParser().parseFromString(html, 'text/html')
    return doc.head.textContent || ''
  }

  let cache = {}

  async function load(link, method = 'push') {
    let result
    let data

    if (method === 'push') {
      result = await window.fetch(link)
      data = await result.text()

      cache = { ...cache, [link]: data }
    } else if (method === 'pop') {
      data = cache[link]
    }

    const htmlString = data.trim()
    const headString = htmlString.match(/<head[^>]*>[\s\S]*<\/head>/gi)[0]
    const titleString = headString.match(/<title[^>]*>[\s\S]*<\/title>/gi)[0]

    const title = stripHead(titleString)

    const bodyString = htmlString.match(/<body[^>]*>[\s\S]*<\/body>/gi)[0]

    const body = document.querySelector('body')
    body.innerHTML = bodyString
    document.title = title

    console.log(cache)
  }

  const Link = {
    create: function (element) {
      element.addEventListener('click', async function (event) {
        const link = element.getAttribute('href')

        if (window.history && history.pushState) {
          event.preventDefault()
          if (!link.startsWith('/')) return
          window.history.pushState(null, null, link)

          console.log('clickster')

          await load(link)
        }
      })
    },
  }

  const DragReduction = {
    start: async function () {
      await domReady()

      this.discoverLinks((el) => {
        this.initializeLink(el)
      })

      // this.initializeRuntimeLinks((el) => {
      //   this.initializeLink(el)
      // })

      window.onpopstate = () => {
        load(window.location.pathname, 'pop')
      }

      window.onload = () => {
        cache = {
          ...cache,
          [window.location.pathname]: document.documentElement.innerHTML,
        }
      }
      console.log('DRS initialized.')
    },
    discoverLinks: function (callback) {
      const rootLinks = document.querySelectorAll('a')
      rootLinks.forEach((rL) => {
        callback(rL)
      })
    },
    initializeLink: function (a) {
      if (!a.__embr) {
        try {
          a.__embr = Object.create(Link).create(a)
        } catch (error) {
          setTimeout(() => {
            throw error
          }, 0)
        }
      }
    },
    discoverUninitializedLinks: function (callback) {
      const rootEls = document.querySelectorAll('a[href^="/"]')
      Array.from(new Set(rootEls))
        .filter(Boolean)
        .filter((el) => el.__embr === undefined)
        .forEach((rootEl) => {
          callback(rootEl)
        })
    },
    initializeRuntimeLinks: function (callback) {
      const targetNode = document.querySelector('body')

      const observer = new MutationObserver((mutations) => {
        if (this.pauseMutationObserver) return

        for (let i = 0; i < mutations.length; i++) {
          if (mutations[i].addedNodes.length > 0) {
            mutations[i].addedNodes.forEach((node) => {
              // Discard non-element nodes (like line-breaks)
              if (node.nodeType !== 1) return

              // Discard any changes happening within an existing component.
              // They will take care of themselves.
              if (node.parentElement && node.parentElement.closest('a')) return

              this.discoverUninitializedLinks((el) => {
                console.log(el)
                callback(el)
              }, node.parentElement)
            })
          }
        }
      })

      observer.observe(targetNode, {
        childList: true,
        attributes: true,
        subtree: true,
      })
    },
  }

  window.DragReduction = DragReduction

  window.DragReduction.start()

  return DragReduction
})
