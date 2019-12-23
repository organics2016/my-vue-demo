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

function deepFlatten (routes) {
  const flatten = (routes) => [].concat(...routes)
  return flatten(
    routes.map(route => Array.isArray(route.children) ? deepFlatten(route.children) : route)
      .filter(route => 'path' in route)
  )
}

export const getMenus = (permissions, admin) => matchAuth(menuData, permissions, admin)

export const getRouter = () => deepFlatten(menuData)
