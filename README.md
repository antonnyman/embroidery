# Embroidery

![npm bundle size](https://img.shields.io/bundlephobia/minzip/embroidery)
![npm version](https://img.shields.io/npm/v/embroidery)

> Note! This library is just an experiment and not intended for production use (yet).

## Install

```js
yarn add embroidery
or
npm i embroidery

```

## Usage

Add controller, target and action attributes to your HTML

```html
<!-- HTML somewhere in your web app -->
<div data-controller="myController">
  <input data-target="name" type="text" />

  <button data-action="click->greet">Greet</button>

  <span data-target="output"></span>
</div>
```

Create a controller in javascript.

```js
// my-controller.js
const myController = {
  greet({ name, output }) {
    output.textContent = name.value
  },
}
```

Register your controller in your main javascript file.

```js
import { Embroidery } from 'embroidery'
import { myController } from 'my-controller'
let app = Embroidery.start()
app.register({ myController })
```

### Partials

Add a _partial_ (async external html). This is good for inserting remote fragments into your HTML to keep page loads fast.

```html
<div data-partial="/endpoint-that-returns-html"></div>
```

### Actions

#### Default actions

Some elements have default actions, which means you don't have to specify click, submit etc.
For example:

```js
// Before
  <button data-action="click->hello">Hello</button>
// After
  <button data-action="hello">Hello</button>
```

| Element  | Event    |
| -------- | -------- |
| a        | 'click'  |
| button   | 'click'  |
| form     | 'submit' |
| input    | 'input'  |
| select   | 'change' |
| textarea | 'input'  |

#### Multiple actions

If you want to have multiple actions you can separate them with a blank space.

```html
<div data-controller="manyActions">
  <div data-action="mouseover->doThis mouseout->doThat">Do this or that</div>
</div>
```
