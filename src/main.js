// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import jQuery from 'jquery'
window.jQuery = window.$ = jQuery

import 'babel-polyfill'
import Vue from 'vue'
import App from './components/App'
import router from './router'
import store from './store'

require('bootstrap-sass')
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  store,
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})

$(function () {
  $('.navbar-toggle').click(function () {
    $('.navbar-nav').toggleClass('slide-in')
    $('.side-body').toggleClass('body-slide-in')
    $('#search').removeClass('in').addClass('collapse').slideUp(200)
  })
  $('#search-trigger').click(function () {
    $('.navbar-nav').removeClass('slide-in')
    $('.side-body').removeClass('body-slide-in')
  })
})
