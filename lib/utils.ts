// https://github.com/stimulusjs/stimulus/blob/master/packages/%40stimulus/core/src/application.ts
export function domReady() {
  return new Promise((resolve) => {
    if (document.readyState == 'loading') {
      document.addEventListener('DOMContentLoaded', resolve)
    } else {
      resolve()
    }
  })
}

export const defaultEventNames = {
  a: 'click',
  button: 'click',
  form: 'submit',
  input: 'input',
  select: 'change',
  textarea: 'input',
}
