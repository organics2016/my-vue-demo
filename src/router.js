import Vue from 'vue'
import Router from 'vue-router'

import { routes } from './menus.js'

const routerPush = Router.prototype.push
Router.prototype.push = function push (location) {
  return routerPush.call(this, location).catch(err => err)
}

const routerReplace = Router.prototype.replace
Router.prototype.replace = function replace (location) {
  return routerReplace.call(this, location).catch(err => err)
}

Vue.use(Router)

console.log(routes())

const routeConfig = {
  routes: routes()
}

export default new Router(routeConfig)
