
const menuData = [
  {
    id: '0',
    name: '茵蒂克丝',
    icon: 'ios-navigate',
    path: 'index',
    auth: 'index',
    component: () => import(/* webpackChunkName: "about" */ './views/index/Index.vue')
  },
  {
    id: '1',
    name: 'Item 1',
    icon: 'ios-navigate',
    auth: '/item1',
    children: [{
      id: '1-1',
      name: 'Option 1',
      path: 'item1/option1',
      auth: 'item1/option1',
      component: () => import(/* webpackChunkName: "about" */ './views/upload/Upload.vue')
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
      path: 'item2/option1',
      auth: 'item2/option1',
      component: () => import(/* webpackChunkName: "about" */ './views/hello/HelloWorld.vue')
    }]
  }
]

// const uuidv4 = require('uuid/v4')

function matchAuth (menus, permissions) {
  if (permissions === undefined || permissions.length === 0) {
    return []
  } else if (permissions.length === 1 && permissions[0] === '*') {
    return menuData
  }

  return menus.filter((item) => {
    return permissions.includes(item.auth)
  }).map((item) => {
    const result = Object.assign({}, item)
    if (result.children) {
      result.children = matchAuth(result.children, permissions)
    }
    return result
  })
}

function menus2Router (menus) {
  const flatten = (menus) => [].concat(...menus)

  return flatten(
    menus.map((menu) => {
      const route = {
        name: menu.id,
        path: menu.path,
        component: menu.component
      }

      return Array.isArray(menu.children) ? menus2Router(menu.children) : route
    })

  ).filter(route => route.path !== undefined && Object.keys(route.path).length !== 0)
}

// 根据权限获取菜单
export const menus = (permissions) => matchAuth(menuData, permissions)

// 管理员获取菜单
export const adminMenus = () => matchAuth(menuData, ['*'])

// 根据权限获取路由
export const routes = (permissions) => menus2Router(menus(permissions))

// 管理员获取路由
export const adminRoutes = () => menus2Router(adminMenus())
