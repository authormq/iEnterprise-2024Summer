<template>
  <header class="container">
    <!-- <Color /> -->
    <div class="left">
      <h1 @click="jumpToMain">iEnterprise</h1>
      <div class="search">
        <input type="text" v-model="searchInput" @keydown.enter="jumpToSearch">
        <svg @click="jumpToSearch" t="1719286696638" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4636" id="mx_n_1719286696639" width="30" height="30"><path d="M966.4 924.8l-230.4-227.2c60.8-67.2 96-156.8 96-256 0-217.6-176-390.4-390.4-390.4-217.6 0-390.4 176-390.4 390.4 0 217.6 176 390.4 390.4 390.4 99.2 0 188.8-35.2 256-96l230.4 227.2c9.6 9.6 28.8 9.6 38.4 0C979.2 950.4 979.2 934.4 966.4 924.8zM102.4 441.6c0-185.6 150.4-339.2 339.2-339.2s339.2 150.4 339.2 339.2c0 89.6-35.2 172.8-92.8 233.6-3.2 0-3.2 3.2-6.4 3.2-3.2 3.2-3.2 3.2-3.2 6.4-60.8 57.6-144 92.8-233.6 92.8C256 780.8 102.4 627.2 102.4 441.6z" p-id="4637"></path></svg>
      </div>
    </div>
    <div class="right">
      <NotificationWebsocket />
      <div class="not-logged-in" v-if="logState === ''" @click="jumpToLogin">未登录</div>
      <div id="avatar"
        v-else class="avatar" @click="jumpToUser"
      ></div>
      <ul class="dropdown" v-if="logState !== ''">
        <li @click="logout">登出账号</li>
        <li @click="jumpToUnsubscribe">注销账号</li>
      </ul>
    </div>
  </header>
</template>

<script>
import Color from '../color/Color.vue'

import { Account } from "@/api/Account"
import MessageWebSocket from "@/api/MessageWebSocket";
import NotificationWebsocket from '@/components/notification/NotificationWebsocket.vue';
import { useMessage } from 'naive-ui';

export default {
  name: 'Banner',
  components: {
    Color, NotificationWebsocket
  },
  data() {
    return {
      logState: '',
      searchInput: '',
      avatarURL: '',
      message: useMessage()
    }
  },
  methods: {
    jumpToMain() {
      this.$router.push('/main')
    },
    jumpToUser() {
      this.$router.push('/user')
    },
    getLogState() {
      if (this.$cookies.get('user_id') !== null) {
        return this.$cookies.get('user_id')
      } else {
        return ''
      }
    },
    jumpToLogin() {
      this.$router.push('/login')
    },
    jumpToSearch() {
      this.$router.push(`/result/${this.searchInput}`)
    },
    logout() {
      Account.accounts_logout().then(
        (response) => {
          console.log('登出成功')
          this.message.success('登出成功')
          this.$router.push('/login')
          this.logState = this.getLogState()
          MessageWebSocket.disconnect()
        },
        (error) => {
          console.log('登出失败')
          this.message.error('登出失败')
        }
      )
    },
    jumpToUnsubscribe() {
      this.$router.push('/unsubscribe')
    }
  },
  mounted() {
    // 登录后更新头像
    this.$bus.on('already-login', () => {
      this.logState = this.getLogState()
      this.$nextTick(() => {
        document.getElementById('avatar').style.backgroundImage = "url('/api/users/" + this.logState + "/avatar/')";
      })
    })

    // 跳转搜索结果页保留搜索关键字
    this.$bus.on('set-content', (content) => {
      this.searchInput = content
    })

    this.logState = this.getLogState()
    this.$nextTick(() => {
      if (this.logState !== '') {
        document.getElementById('avatar').style.backgroundImage = "url('/api/users/" + this.logState + "/avatar/')";
        console.log(this.$route.params)
      }
    })
  }
}
</script>

<style scoped>
header.container {
  width: 100%;
  height: 60px;
  box-sizing: border-box;
  padding-top: 10px;
  /* background: skyblue; */
  display: flex;
  align-items: center;
  justify-content: space-between;
}

h1 {
  font-size: 30px;
  font-weight: bold;
  color: var(--theme-color);
  margin-left: 20px;
  cursor: pointer;
}

div.left {
  display: flex;
  align-items: center;
}

div.right {
  margin-right: 20px;
  display: flex;
  align-items: center;
}

div.search {
  margin-left: 30px;
  display: flex;
  align-items: center;
}

div.search svg {
  margin-left: 10px;
  fill: grey;
  cursor: pointer;
}

div.not-logged-in {
  width: 50px;
  height: 50px;
  border: 1px solid var(--theme-color);
  box-sizing: border-box;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 12px;
  color: var(--theme-color);
  font-weight: bold;
}

div.avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  cursor: pointer;
  background-size: cover;
}

.right {
  position: relative;
}

.dropdown {
  width: 100px;
  box-sizing: border-box;
  border-radius: 5px;
  padding: 5px 10px;
  background: var(--bg-grey);
  position: absolute;
  top: 100%;
  right: 0;
  display: none;
  z-index: 999;
}

.dropdown li {
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  font-weight: bold;
}

.right:hover .dropdown {
  display: block;
}

.dropdown li {
  padding: 5px 10px;
}

.dropdown li:hover {
  color: var(--theme-color);
}
</style>