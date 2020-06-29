const Embroidery = require('embroidery')

const { waitFor, fireEvent } = require('@testing-library/dom')

test('do something', async () => {
  document.body.innerHTML = `
        <div data-controller="embroidery">
            <button data-action="click->run"></button>
            <span data-target="target">Kittens</span>
        </div>
    `

  global.test = {
    run: function ({ target }) {
      target.innerHTML = 'Mittens'
    },
  }

  Embroidery.start()

  document.querySelector('button').click()

  await waitFor(() => {
    expect(document.querySelector('span').textContent).toEqual('Mittens')
  })
})
