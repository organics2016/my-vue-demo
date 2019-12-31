<template>
  <div class="layout">
    <Layout>
      <Header>
        <Menu mode="horizontal" theme="dark" @on-select="clickHeaderMenu">
          <div class="layout-logo"></div>
          <div class="layout-nav">
            <div :style="{float: 'right'}">
<!--              <MenuItem name="1">-->
<!--                <Icon type="ios-navigate"></Icon>-->
<!--                Item 1-->
<!--              </MenuItem>-->
<!--              <MenuItem name="2">-->
<!--                <Icon type="ios-keypad"></Icon>-->
<!--                Item 2-->
<!--              </MenuItem>-->
<!--              <MenuItem name="3">-->
<!--                <Icon type="ios-analytics"></Icon>-->
<!--                Item 3-->
<!--              </MenuItem>-->
              <MenuItem name="logout">
                <Icon type="ios-paper"></Icon>
                Logout
              </MenuItem>
            </div>
          </div>
        </Menu>
      </Header>
      <Layout>
        <Sider hide-trigger :style="{background: '#fff'}">
          <Menu theme="light" width="auto" @on-select="clickMenu" :active-name="userRouter.lastActiveRoute.name">
            <div v-for="menu in menus" :key="menu.id">
              <Submenu :name="menu.id" v-show="menu.children">
                <template slot="title">
                  <Icon :type="menu.icon"/>
                  {{menu.name}}
                </template>
                <MenuItem v-for="children in menu.children" :name="children.id" :key="children.id">
                  {{children.name}}
                </MenuItem>
              </Submenu>
              <MenuItem v-show="!menu.children" :name="menu.id">
                <Icon :type="menu.icon"/>
                {{menu.name}}
              </MenuItem>
            </div>
          </Menu>
        </Sider>
        <Layout :style="{padding: '0 24px 24px'}">
          <Breadcrumb :style="{margin: '24px 0'}">
            <BreadcrumbItem>Home</BreadcrumbItem>
            <BreadcrumbItem>Components</BreadcrumbItem>
            <BreadcrumbItem>Layout</BreadcrumbItem>
          </Breadcrumb>
          <Content :style="{padding: '24px', minHeight: '800px', background: '#fff'}">
            <router-view/>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'

import { menus } from '../../modules/menus'

const { mapState, mapMutations } = createNamespacedHelpers('session')

export default {
  name: 'home',
  data: function () {
    return {
      menus: []
    }
  },

  computed: {
    ...mapState(['userSession', 'userRouter'])
  },

  mounted () {
    this.menus = menus(this.userSession.permissions)
  },

  methods: {
    ...mapMutations(['unCacheSession']),

    clickHeaderMenu: function (methodsId) {
      this[methodsId]()
    },

    clickMenu: function (menuId) {
      this.$router.push({ name: menuId })
    },

    logout: function () {
      this.unCacheSession()
      this.$router.replace({ name: 'login' })
    }
  }
}
</script>

<style scoped>
  .layout {
    border: 1px solid #d7dde4;
    background: #f5f7f9;
    position: relative;
    border-radius: 4px;
    overflow: hidden;
  }

  .layout-logo {
    width: 100px;
    height: 30px;
    background: #5b6270;
    border-radius: 3px;
    float: left;
    position: relative;
    top: 15px;
    left: 20px;
  }

  .layout-nav {
    width: 420px;
    margin: 0 auto;
    margin-right: 20px;
  }
</style>
