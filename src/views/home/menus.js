
const menuData = [
  {
    name: '控制台首页',
    icon: 'ios-navigate',
    path: '/home',
    auth: '/home'
  },
  {
    name: 'Item 1',
    icon: 'ios-navigate',
    path: '/item1',
    auth: '/item1',
    children: [{
      name: 'Option 1',
      path: '/item1/option1',
      auth: '/item1/option1'
    }]
  },
  {
    name: 'Item 2',
    icon: 'ios-navigate',
    path: '/item2',
    auth: '/item2',
    children: [{
      name: 'Option 1',
      path: '/item2/option1',
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

  return menus.map((item) => {
    if (permissions.includes(item.auth)) {
      let result = Object.assign({}, item)
      if (result.children) {
        result.children = matchAuth(result.children, permissions, false)
      }
      return result
    }
  })
}

export const menus = (permissions, admin) => matchAuth(menuData, permissions, admin)
