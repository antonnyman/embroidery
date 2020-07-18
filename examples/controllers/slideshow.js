// TODO: Embroidery can't handle targets with the same name
export const slideshow = {
  init({ slide }) {
    console.log(slide)
  },
  next({ slide }) {
    alert(slide.innerHTML)
  },
  previous() {},
  showCurrentSlide() {},
  get index() {},
  set index(value) {},
  get lastIndex() {},
}
