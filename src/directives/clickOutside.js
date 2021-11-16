export default {
  bind(el, binding, vnode) {
    el.clickOutsideEvent = event => {
      if (!(el === event.target || el.contains(event.target))) {
        vnode.context[binding.expression](event)
      }
    };
    document.addEventListener("click", el.clickOutsideEvent);
  },
  unbind(el) {
    document.removeEventListener("click", el.clickOutsideEvent);
  },
};