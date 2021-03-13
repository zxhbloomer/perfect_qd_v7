import drag from './fitColumns'

const install = function (Vue) {
  Vue.directive('fit-columns', drag)
}

if (window.Vue) {
  window['fit-columns'] = drag
  Vue.use(install); // eslint-disable-line
}

drag.install = install
export default drag
