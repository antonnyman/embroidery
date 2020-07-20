// TODO: Embroidery can't handle targets with the same name
export const slideshow = {
  init({ slideTargets }) {
    this.slideTargets = slideTargets
    this.showSlide(0)
  },
  next() {
    this.showSlide(this.index + 1)
  },

  previous() {
    this.showSlide(this.index - 1)
  },
  showSlide(index) {
    this.index = index
    this.slideTargets.forEach((el, i) => {
      el.classList.toggle('slide--current', this.index == i)
    })
  },
}
