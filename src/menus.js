import Home from './views/home/Home.vue'
import Test from './views/test/Test.vue'
import HelloWorld from './views/hello/HelloWorld.vue'

const menuData = [
  {
    id: '0',
    name: '控制台首页',
    icon: 'ios-navigate',
    path: '/home',
    auth: '/home',
    component: Home
  },
  {
    id: '1',
    name: 'Item 1',
    icon: 'ios-navigate',
    auth: '/item1',
    children: [{
      id: '1-1',
      name: 'Option 1',
      path: '/item1/option1',
      auth: '/item1/option1',
      component: Test
    }]
  },
  {
    id: '2',
    name: 'Item 2',
    icon: 'ios-navigate',
    auth: '/item2',
    children: [{
      id: '1-2',
      name: 'Option 1',
      path: '/item2/option1',
      auth: '/item2/option1',
      component: HelloWorld
    }]
  }
]

// const uuidv4 = require('uuid/v4')

function matchAuth (menus, permissions, admin) {
  if (admin) {
    return menuData
  }

  if (permissions === undefined || permissions.length === 0) {
    return []
  }

  return menus.filter((item) => {
    return permissions.includes(item.auth)
  }).map((item) => {
    const result = Object.assign({}, item)
    if (result.children) {
      result.children = matchAuth(result.children, permissions, false)
    }
    return result
  })
}

function menus2Router (menus) {
  const flatten = (menus) => [].concat(...menus)

  return flatten(
    menus.map((menu) => {
      const route = {
        path: menu.path,
        name: menu.path,
        component: menu.component
      }

      return Array.isArray(menu.children) ? menus2Router(menu.children) : route
    })

  ).filter(route => route.path !== undefined && Object.keys(route.path).length !== 0)
}

export const menus = (permissions) => matchAuth(menuData, permissions, false)

export const adminMenus = () => matchAuth(menuData, null, true)

export const routes = (permissions) => menus2Router(menus(permissions))

export const adminRoutes = () => menus2Router(adminMenus())
