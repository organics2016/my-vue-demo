import Home from './views/home/Home.vue'
import Test from './views/test/Test.vue'

const menuData = [
  {
    name: '控制台首页',
    icon: 'ios-navigate',
    path: '/home',
    auth: '/home',
    component: Home
  },
  {
    name: 'Item 1',
    icon: 'ios-navigate',
    auth: '/item1',
    children: [{
      name: 'Option 1',
      path: '/item1/option1',
      auth: '/item1/option1',
      component: Test
    }]
  },
  {
    name: 'Item 2',
    icon: 'ios-navigate',
    auth: '/item2',
    children: [{
      name: 'Option 1',
      auth: '/item2/option1'
    }]
  }
]

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
        name: menu.name,
        component: menu.component
      }

      return Array.isArray(menu.children) ? menus2Router(menu.children) : route
    })

  ).filter(route => route.path !== undefined)
}

export const menus = (permissions) => matchAuth(menuData, permissions, false)

export const adminMenus = () => matchAuth(menuData, null, true)

export const routes = () => menus2Router(menuData)
